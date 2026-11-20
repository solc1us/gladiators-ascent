import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const gladiators = [
  { name: 'Maximus', style: 'Heavy', kills: 58, status: 'Alive', isPlayer: false },
  { name: 'Aurelius', style: 'Balanced', kills: 53, status: 'Alive', isPlayer: false },
  { name: 'Cassius', style: 'Agile', kills: 47, status: 'Alive', isPlayer: false },
  { name: 'Brutus', style: 'Heavy', kills: 43, status: 'Dead', isPlayer: false },
  { name: 'Titus', style: 'Balanced', kills: 39, status: 'Alive', isPlayer: false },
  { name: 'Spartacus', style: 'Heavy', kills: 35, status: 'Dead', isPlayer: false },
  { name: 'Lucius', style: 'Agile', kills: 31, status: 'Alive', isPlayer: false },
  { name: 'Decimus', style: 'Balanced', kills: 26, status: 'Alive', isPlayer: false },
  { name: 'Gaius', style: 'Heavy', kills: 22, status: 'Dead', isPlayer: false },
  { name: 'Flavius', style: 'Agile', kills: 18, status: 'Alive', isPlayer: false },
  { name: 'Marcus', style: 'Balanced', kills: 12, status: 'Alive', isPlayer: true },
];

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL must be set in backend/.env');
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
  try {
    // Sequential inserts preserve the original order on a fresh database.
    for (const gladiator of gladiators) {
      const existing = await prisma.gladiator.findFirst({
        where: { name: { equals: gladiator.name, mode: 'insensitive' } },
      });
      if (!existing) {
        await prisma.gladiator.upsert({
          where: { name: gladiator.name },
          update: {},
          create: gladiator,
        });
      }
    }
    const count = await prisma.gladiator.count({
      where: { OR: gladiators.map(({ name }) => ({ name: { equals: name, mode: 'insensitive' } })) },
    });
    console.log(`Verified ${count}/11 initial Gladiators; total records: ${await prisma.gladiator.count()}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(() => {
  console.error('Seed failed. Check database availability, DATABASE_URL, and applied migrations.');
  process.exitCode = 1;
});
