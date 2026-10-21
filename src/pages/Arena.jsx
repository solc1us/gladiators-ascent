import { useState } from 'react'
import Header from '../components/Header.jsx'

const enemy = {
  name: 'Cassian',
  maxHp: 90,
  attack: 16,
  defense: 12,
  accuracy: 74,
  evasion: 15,
}

function calculateAttack(attacker, defender) {
  const hitChance = Math.max(5, Math.min(95, attacker.accuracy - defender.evasion))

  if (Math.random() * 100 >= hitChance) {
    return { hit: false, damage: 0 }
  }

  return {
    hit: true,
    damage: Math.max(1, attacker.attack - Math.floor(defender.defense / 2)),
  }
}

function Arena({ activeGladiator }) {
  const [playerHp, setPlayerHp] = useState(() => Math.min(activeGladiator.hp, 82))
  const [enemyHp, setEnemyHp] = useState(61)
  const [round, setRound] = useState(1)
  const [battleLog, setBattleLog] = useState([
    `Battle begins. ${activeGladiator.name} attacks first.`,
  ])
  const [battleResult, setBattleResult] = useState('')

  function handleAttack() {
    if (battleResult) {
      return
    }

    const events = []
    const playerAttack = calculateAttack(activeGladiator, enemy)
    const nextEnemyHp = Math.max(0, enemyHp - playerAttack.damage)

    events.push(
      playerAttack.hit
        ? `${activeGladiator.name} hits ${enemy.name} for ${playerAttack.damage} damage.`
        : `${activeGladiator.name} misses ${enemy.name}.`,
    )
    setEnemyHp(nextEnemyHp)

    if (nextEnemyHp === 0) {
      const result = `Victory! ${enemy.name} has been defeated.`
      setBattleResult(result)
      setBattleLog((currentLog) => [...currentLog, ...events, result])
      return
    }

    const enemyAttack = calculateAttack(enemy, activeGladiator)
    const nextPlayerHp = Math.max(0, playerHp - enemyAttack.damage)

    events.push(
      enemyAttack.hit
        ? `${enemy.name} hits ${activeGladiator.name} for ${enemyAttack.damage} damage.`
        : `${enemy.name} misses ${activeGladiator.name}.`,
    )
    setPlayerHp(nextPlayerHp)

    if (nextPlayerHp === 0) {
      const result = `Defeat! ${activeGladiator.name} has fallen.`
      setBattleResult(result)
      setBattleLog((currentLog) => [...currentLog, ...events, result])
      return
    }

    setRound((currentRound) => currentRound + 1)
    setBattleLog((currentLog) => [...currentLog, ...events])
  }

  return (
    <>
      <Header title="Arena Battle" />

      <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-6 px-4 py-8 sm:px-6 sm:py-12">
        <section className="panel" aria-labelledby="battle-status-heading">
          <h2 className="section-heading" id="battle-status-heading">Battle Status</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <p className="rounded-md border border-amber-900 bg-stone-950 px-4 py-3 text-center font-bold">
              Turn: <span className="text-amber-300">{battleResult || 'Player'}</span>
            </p>
            <p className="rounded-md border border-amber-900 bg-stone-950 px-4 py-3 text-center font-bold">
              Round: <span className="text-amber-300">{round}</span>
            </p>
            {battleResult && (
              <p
                className="rounded-md border border-amber-600 bg-stone-950 px-4 py-3 text-center font-bold text-amber-300 sm:col-span-2"
                role="status"
              >
                {battleResult}
              </p>
            )}
          </div>
        </section>

        <section className="panel" aria-labelledby="combatants-heading">
          <h2 className="section-heading" id="combatants-heading">Combatants</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <article className="rounded-lg border border-amber-900 border-t-4 border-t-amber-600 bg-stone-950 p-5">
              <h3 className="font-serif text-2xl font-bold text-amber-300">
                {activeGladiator.name}
              </h3>
              <p className="mt-2 font-bold">
                HP: <span className="text-emerald-400">{playerHp} / {activeGladiator.maxHp}</span>
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <dt className="text-stone-400">Attack</dt><dd className="text-right font-bold">{activeGladiator.attack}</dd>
                <dt className="text-stone-400">Defense</dt><dd className="text-right font-bold">{activeGladiator.defense}</dd>
                <dt className="text-stone-400">Accuracy</dt><dd className="text-right font-bold">{activeGladiator.accuracy}%</dd>
                <dt className="text-stone-400">Evasion</dt><dd className="text-right font-bold">{activeGladiator.evasion}%</dd>
              </dl>
            </article>

            <article className="rounded-lg border border-amber-900 border-t-4 border-t-red-700 bg-stone-950 p-5">
              <h3 className="font-serif text-2xl font-bold text-red-300">{enemy.name}</h3>
              <p className="mt-2 font-bold">
                HP: <span className="text-red-400">{enemyHp} / {enemy.maxHp}</span>
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <dt className="text-stone-400">Attack</dt><dd className="text-right font-bold">{enemy.attack}</dd>
                <dt className="text-stone-400">Defense</dt><dd className="text-right font-bold">{enemy.defense}</dd>
                <dt className="text-stone-400">Accuracy</dt><dd className="text-right font-bold">{enemy.accuracy}%</dd>
                <dt className="text-stone-400">Evasion</dt><dd className="text-right font-bold">{enemy.evasion}%</dd>
              </dl>
            </article>
          </div>
        </section>

        <section className="panel" aria-labelledby="actions-heading">
          <h2 className="section-heading" id="actions-heading">Battle Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <article className="flex flex-col rounded-lg border border-amber-900 bg-stone-950 p-4">
              <h3 className="font-serif text-lg font-bold text-amber-300">Attack</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-stone-400">
                Standard attack with normal accuracy and damage.
              </p>
              <button
                className="mt-4 min-h-11 rounded-md border border-amber-600 bg-red-950 px-3 py-2 font-bold hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={handleAttack}
                disabled={Boolean(battleResult)}
              >
                Attack
              </button>
            </article>
            {[
              ['Heavy Attack', 'Higher damage but lower accuracy.'],
              ['Defend', 'Increase defense for one turn.'],
              ['Focus', 'Increase accuracy and critical chance for the next attack.'],
              ['Recover', 'Recover a small amount of HP. Limited uses per battle.'],
            ].map(([name, description]) => (
              <article className="flex flex-col rounded-lg border border-amber-900 bg-stone-950 p-4" key={name}>
                <h3 className="font-serif text-lg font-bold text-amber-300">{name}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-stone-400">{description}</p>
                <button
                  className="mt-4 min-h-11 cursor-not-allowed rounded-md border border-stone-700 bg-stone-800 px-3 py-2 font-bold opacity-50"
                  type="button"
                  disabled
                >
                  {name}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="panel" aria-labelledby="battle-log-heading">
          <h2 className="section-heading" id="battle-log-heading">Battle Log</h2>
          <ol
            className="list-decimal space-y-2 rounded-lg border-l-4 border-amber-600 bg-stone-950 py-4 pr-4 pl-12 text-sm text-stone-300 sm:text-base"
            aria-live="polite"
          >
            {battleLog.map((event, index) => <li key={`${index}-${event}`}>{event}</li>)}
          </ol>
        </section>
      </main>
    </>
  )
}

export default Arena
