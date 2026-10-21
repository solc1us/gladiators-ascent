import GladiatorCard from './GladiatorCard.jsx'

function GladiatorList({ gladiators, showDead = true }) {
  const sortedGladiators = [...gladiators].sort((a, b) => b.kills - a.kills)
  const visibleGladiators = sortedGladiators.filter(
    (gladiator) => showDead || gladiator.status !== 'Dead',
  )

  if (visibleGladiators.length === 0) {
    return (
      <p className="rounded-lg border border-amber-900 bg-stone-950 p-5 text-center text-stone-400">
        Belum ada data gladiator
      </p>
    )
  }

  return (
    <div
      className="max-w-full overflow-x-auto rounded-lg border border-amber-900"
      role="region"
      aria-label="Scrollable gladiator leaderboard"
      tabIndex="0"
    >
      <table className="w-full min-w-160 border-collapse text-sm sm:text-base">
        <caption className="bg-stone-950 px-4 py-3 text-left text-sm italic text-stone-400">
          Current gladiator rankings
        </caption>
        <thead className="bg-red-950 font-serif text-amber-50">
          <tr>
            <th className="px-4 py-3 text-center" scope="col">Rank</th>
            <th className="px-4 py-3 text-left" scope="col">Gladiator</th>
            <th className="px-4 py-3 text-left" scope="col">Style</th>
            <th className="px-4 py-3 text-center" scope="col">Kills</th>
            <th className="px-4 py-3 text-center" scope="col">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-amber-900 bg-amber-50 text-stone-950">
          {sortedGladiators.map((gladiator, index) =>
            showDead || gladiator.status !== 'Dead' ? (
              <GladiatorCard gladiator={gladiator} key={gladiator.id} rank={index + 1} />
            ) : null,
          )}
        </tbody>
      </table>
    </div>
  )
}

export default GladiatorList
