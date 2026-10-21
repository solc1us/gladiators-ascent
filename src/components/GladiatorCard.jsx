function GladiatorCard({ gladiator, rank }) {
  const isDead = gladiator.status === 'Dead'
  const rowStyle = gladiator.isPlayer
    ? 'bg-amber-200 font-bold ring-3 ring-inset ring-amber-600'
    : isDead
      ? 'bg-stone-400 text-stone-700'
      : 'hover:bg-amber-100'
  const statusStyle = isDead
    ? 'bg-stone-700 text-stone-100'
    : 'bg-emerald-800 text-emerald-100'

  return (
    <tr className={rowStyle}>
      <td className="px-4 py-3 text-center font-bold">{rank}</td>
      <th className={`px-4 py-3 text-left ${isDead ? 'line-through' : ''}`} scope="row">
        {gladiator.name}
        {gladiator.isPlayer && (
          <span className="block text-xs uppercase tracking-wide text-red-950 sm:inline">
            {' '}(Your Gladiator)
          </span>
        )}
      </th>
      <td className="px-4 py-3">{gladiator.style}</td>
      <td className="px-4 py-3 text-center font-bold">{gladiator.kills}</td>
      <td className="px-4 py-3 text-center">
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyle}`}>
          {gladiator.status}
        </span>
      </td>
    </tr>
  )
}

export default GladiatorCard
