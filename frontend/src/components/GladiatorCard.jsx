function GladiatorCard({ gladiator, rank, onEdit, onDelete }) {
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
      <td className="px-4 py-3 text-center">{gladiator.isPlayer && <div className="flex gap-2"><button type="button" className="rounded bg-stone-700 px-3 py-2 text-white" onClick={() => onEdit(gladiator)}>Edit</button><button type="button" className="rounded bg-red-900 px-3 py-2 text-white" onClick={() => onDelete(gladiator.id)}>Delete</button></div>}</td>
    </tr>
  )
}

export default GladiatorCard
