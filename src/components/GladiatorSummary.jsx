function GladiatorSummary({ gladiators }) {
  const alive = gladiators.filter((gladiator) => gladiator.status === 'Alive').length
  const dead = gladiators.length - alive
  const summary = [
    { label: 'Total Gladiator', value: gladiators.length, color: 'text-amber-300' },
    { label: 'Gladiator Hidup', value: alive, color: 'text-emerald-400' },
    { label: 'Gladiator Gugur', value: dead, color: 'text-red-400' },
  ]

  return (
    <section
      className="rounded-xl border border-amber-900 bg-stone-900/90 p-5 shadow-xl sm:p-6"
      aria-labelledby="summary-heading"
    >
      <h2
        className="border-b border-amber-800 pb-3 font-serif text-2xl font-bold text-amber-300"
        id="summary-heading"
      >
        Ringkasan Gladiator
      </h2>
      <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {summary.map((item) => (
          <div className="rounded-lg border border-amber-900 bg-stone-950 p-4" key={item.label}>
            <dt className="text-sm font-bold text-stone-400">{item.label}</dt>
            <dd className={`mt-2 text-3xl font-black ${item.color}`}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default GladiatorSummary
