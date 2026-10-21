import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'

function Hub({ activeGladiator, gladiators, playerGold }) {
  const sortedGladiators = [...gladiators].sort((a, b) => b.kills - a.kills)
  const rank = sortedGladiators.findIndex((gladiator) => gladiator.id === activeGladiator.id) + 1
  const summary = [
    ['Name', activeGladiator.name],
    ['Status', activeGladiator.status],
    ['HP', `${activeGladiator.hp} / ${activeGladiator.maxHp}`],
    ['Kills', activeGladiator.kills],
    ['Gold', playerGold],
    ['Leaderboard Rank', `#${rank}`],
  ]
  const stats = [
    ['Attack', activeGladiator.attack],
    ['Defense', activeGladiator.defense],
    ['Accuracy', `${activeGladiator.accuracy}%`],
    ['Evasion', `${activeGladiator.evasion}%`],
    ['Critical Chance', `${activeGladiator.critical}%`],
    ['Block Chance', `${activeGladiator.block}%`],
  ]

  return (
    <>
      <Header title="Gladiator Hub" />

      <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-3">
        <section
          className="rounded-xl border border-amber-900 bg-stone-900/90 p-4 shadow-xl sm:p-6 lg:col-span-2"
          aria-labelledby="active-summary-heading"
        >
          <h2
            className="mb-5 border-b border-amber-800 pb-3 font-serif text-2xl font-bold text-amber-300"
            id="active-summary-heading"
          >
            Gladiator Summary
          </h2>
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[minmax(200px,280px)_1fr]">
            <img
              className="mx-auto h-auto w-full max-w-70 rounded-lg border-2 border-amber-600 bg-stone-950 object-contain p-3 shadow-xl"
              src="/assets/gladiator.png"
              alt={`${activeGladiator.name}, the active player gladiator, ready for battle`}
            />
            <dl className="grid grid-cols-2 gap-3">
              {summary.map(([label, value]) => (
                <div className="contents" key={label}>
                  <dt className="rounded-l-md bg-stone-950 px-3 py-2 font-bold text-stone-400">
                    {label}
                  </dt>
                  <dd className="rounded-r-md bg-stone-950 px-3 py-2 text-right font-black text-amber-100">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          className="rounded-xl border border-amber-900 bg-stone-900/90 p-4 shadow-xl sm:p-6"
          aria-labelledby="gladiator-stats-heading"
        >
          <h2
            className="mb-5 border-b border-amber-800 pb-3 font-serif text-2xl font-bold text-amber-300"
            id="gladiator-stats-heading"
          >
            Gladiator Statistics
          </h2>
          <dl className="grid grid-cols-2 gap-3">
            {stats.map(([label, value]) => (
              <div className="contents" key={label}>
                <dt className="rounded-l-md bg-stone-950 px-3 py-2 font-bold text-stone-400">
                  {label}
                </dt>
                <dd className="rounded-r-md bg-stone-950 px-3 py-2 text-right font-black">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className="rounded-xl border border-amber-900 bg-stone-900/90 p-4 shadow-xl sm:p-6 lg:col-span-3"
          aria-labelledby="equipment-heading"
        >
          <h2
            className="mb-5 border-b border-amber-800 pb-3 font-serif text-2xl font-bold text-amber-300"
            id="equipment-heading"
          >
            Equipment
          </h2>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(activeGladiator.equipment).map(([slot, item]) => (
              <div className="rounded-lg border border-amber-900 bg-stone-950 p-4" key={slot}>
                <dt className="text-sm font-bold uppercase tracking-wide text-stone-500">
                  {slot}
                </dt>
                <dd className="mt-1 font-bold">{item}</dd>
              </div>
            ))}
          </dl>
        </section>

        <nav
          className="rounded-xl border border-amber-900 bg-stone-900/90 p-4 shadow-xl sm:p-6 lg:col-span-3"
          aria-label="Gladiator actions"
        >
          <h2 className="mb-5 border-b border-amber-800 pb-3 text-center font-serif text-2xl font-bold text-amber-300">
            Main Actions
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <Link className="action-link" to="/arena">Enter Arena</Link>
            <button className="action-placeholder" type="button" disabled>Tournament</button>
            <Link className="action-link" to="/shop">Shop</Link>
            <button className="action-placeholder" type="button" disabled>Equipment</button>
            <Link className="action-link" to="/leaderboard">Leaderboard</Link>
            <Link className="action-link" to="/profile">Player Profile</Link>
          </div>
        </nav>
      </main>
    </>
  )
}

export default Hub
