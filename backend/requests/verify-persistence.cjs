// Run from backend/ after npm run build. Requires port 3000 to be free.
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const { randomUUID } = require('node:crypto');
const net = require('node:net');
const { resolve } = require('node:path');
const { pathToFileURL } = require('node:url');
require('dotenv/config');
const { Pool } = require('pg');

const base = 'http://localhost:3000';
let server;
let createdId;
let api;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function request(method, path, body, expected) {
  const response = await fetch(`${base}/gladiators${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:5173' },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  assert.equal(response.status, expected, `${method} ${path}`);
  assert.equal(response.headers.get('access-control-allow-origin'), 'http://localhost:5173');
  return response.json();
}

async function start() {
  server = spawn(process.execPath, ['dist/main.js'], { stdio: ['ignore', 'pipe', 'pipe'] });
  // Do not print server output, which could include connection details on failure.
  server.stdout.resume();
  server.stderr.resume();
  let lastFailure;
  for (let i = 0; i < 100; i++) {
    if (server.exitCode !== null) throw new Error('NestJS exited before becoming ready');
    try {
      const response = await fetch(`${base}/gladiators`);
      if (response.ok) return;
      lastFailure = `HTTP ${response.status}`;
    } catch (error) {
      lastFailure = `${error.message} (${error.cause?.code ?? 'unknown'})`;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`NestJS did not become ready: ${lastFailure}`);
}

async function stop() {
  if (server && server.exitCode === null) {
    const exited = once(server, 'exit');
    server.kill('SIGTERM');
    await exited;
  }
  server = undefined;
}

async function main() {
  await new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once('error', reject);
    probe.listen(3000, () => probe.close(resolve));
  });
  // Exercise the actual Axios functions imported by the React app, not a replacement client.
  api = await import(pathToFileURL(resolve('../frontend/src/services/gladiatorApi.js')).href);
  await start();
  const initial = await api.getGladiators();
  assert.ok(Array.isArray(initial));
  const names = ['Maximus', 'Aurelius', 'Cassius', 'Brutus', 'Titus', 'Spartacus', 'Lucius', 'Decimus', 'Gaius', 'Flavius', 'Marcus'];
  for (const name of names) assert.equal(initial.filter((g) => g.name === name).length, 1);
  const marcus = initial.find((g) => g.name === 'Marcus');
  assert.equal((await api.getGladiator(marcus.id)).name, 'Marcus');
  console.log('PASS: GET all, 11 seed names, GET by actual ID, frontend Axios reads');

  const name = `Persistence-${randomUUID()}`;
  const created = await api.createGladiator({ name: `  ${name}  `, style: 'Agile' });
  createdId = created.id;
  assert.deepEqual(created, { id: createdId, name, style: 'Agile', kills: 0, status: 'Alive', isPlayer: true });
  const row = await pool.query('SELECT * FROM "Gladiator" WHERE id = $1', [createdId]);
  assert.deepEqual(row.rows[0], created);
  await request('POST', '', { name: name.toUpperCase(), style: 'Heavy' }, 409);
  await request('PATCH', `/${createdId}`, { name: '  MAXIMUS  ' }, 409);
  console.log('PASS: POST, defaults, trimming, PostgreSQL row, case-insensitive POST/PATCH conflicts');

  const updated = await api.updateGladiator(createdId, { name: `  ${name}-edited  `, kills: 4 });
  assert.equal(updated.name, `${name}-edited`);
  assert.equal(updated.kills, 4);
  assert.equal(updated.style, 'Agile');
  assert.equal(updated.status, 'Alive');
  console.log('PASS: PATCH supplied fields only, name trimming, frontend Axios writes');

  const invalid = [
    { name: 'AB', style: 'Agile' },
    { name: 'Valid', style: 'Unknown' },
    { name: 'Valid', style: 'Heavy', kills: -1 },
    { name: 'Valid', style: 'Heavy', kills: 1.5 },
    { name: 'Valid', style: 'Heavy', status: 'Unknown' },
    { name: 'Valid', style: 'Heavy', isPlayer: 'true' },
  ];
  for (const body of invalid) await request('POST', '', body, 400);
  await request('PATCH', `/${createdId}`, { kills: null }, 400);
  await request('GET', '/not-an-integer', undefined, 400);
  let missingId = 2147483647;
  while (initial.some((g) => g.id === missingId) || createdId === missingId) missingId--;
  await request('GET', `/${missingId}`, undefined, 404);
  await request('PATCH', `/${missingId}`, { kills: 1 }, 404);
  await request('DELETE', `/${missingId}`, undefined, 404);
  console.log('PASS: DTO 400s, malformed ID 400, missing GET/PATCH/DELETE 404, CORS');

  await stop();
  await start();
  assert.deepEqual(await api.getGladiator(createdId), updated);
  assert.deepEqual((await pool.query('SELECT * FROM "Gladiator" WHERE id = $1', [createdId])).rows[0], updated);
  console.log('PASS: data survives backend process restart');

  assert.deepEqual(await api.deleteGladiator(createdId), updated);
  await request('GET', `/${createdId}`, undefined, 404);
  assert.equal((await pool.query('SELECT id FROM "Gladiator" WHERE id = $1', [createdId])).rowCount, 0);
  createdId = undefined;
  const final = await api.getGladiators();
  assert.deepEqual(final, initial);
  console.log(`PASS: DELETE returns deleted record, PostgreSQL deletion, original ${initial.length} records unchanged`);
}

main().catch((error) => {
  console.error('FAIL:', error.message);
  process.exitCode = 1;
}).finally(async () => {
  try {
    // Clean up this run's record only, even when an assertion fails.
    if (createdId !== undefined) await pool.query('DELETE FROM "Gladiator" WHERE id = $1', [createdId]);
  } finally {
    await pool.end();
    await stop();
  }
});
