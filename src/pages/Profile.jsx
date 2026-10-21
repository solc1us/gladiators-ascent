import Header from '../components/Header.jsx'

function Profile({ profile }) {
  return (
    <>
      <Header title="Player Profile" />

      <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-3">
        <section className="panel" aria-labelledby="information-heading">
          <h2 className="section-heading" id="information-heading">Player Information</h2>
          <p className="text-lg">
            Player Name:{' '}
            <span className="font-serif text-xl font-bold text-amber-300">{profile.name}</span>
          </p>
          <p className="mt-3 leading-7 text-stone-400">
            This profile remains available even when a gladiator dies.
          </p>
        </section>

        <section className="panel lg:col-span-2" aria-labelledby="career-heading">
          <h2 className="section-heading" id="career-heading">Career Statistics</h2>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {profile.careerStats.map(([label, value]) => (
              <div className="rounded-lg bg-stone-950 p-4" key={label}>
                <dt className="text-sm font-bold text-stone-500">{label}</dt>
                <dd className="mt-1 text-2xl font-black text-amber-100">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="panel lg:col-span-3" aria-labelledby="history-heading">
          <h2 className="section-heading" id="history-heading">Gladiator History</h2>
          <p className="mb-5 text-stone-400">
            Previous gladiators remain part of the player&apos;s career history after death.
          </p>
          <div
            className="max-w-full overflow-x-auto rounded-lg border border-amber-900"
            role="region"
            aria-label="Scrollable gladiator career history"
            tabIndex="0"
          >
            <table className="w-full min-w-170 border-collapse text-sm sm:text-base">
              <caption className="bg-stone-950 px-4 py-3 text-left text-sm italic text-stone-400">
                {profile.name}&apos;s gladiator career history
              </caption>
              <thead className="bg-red-950 font-serif text-amber-50">
                <tr>
                  <th className="px-4 py-3 text-left" scope="col">Gladiator</th>
                  <th className="px-4 py-3 text-center" scope="col">Kills</th>
                  <th className="px-4 py-3 text-center" scope="col">Battles</th>
                  <th className="px-4 py-3 text-center" scope="col">Highest Rank</th>
                  <th className="px-4 py-3 text-center" scope="col">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-900 bg-amber-50 text-stone-950">
                {profile.history.map((gladiator) => {
                  const isDead = gladiator.status === 'Dead'

                  return (
                    <tr className={isDead ? 'bg-stone-300 text-stone-700' : ''} key={gladiator.id}>
                      <th className={`px-4 py-3 text-left ${isDead ? 'line-through' : ''}`} scope="row">
                        {gladiator.name}
                      </th>
                      <td className="px-4 py-3 text-center">{gladiator.kills}</td>
                      <td className="px-4 py-3 text-center">{gladiator.battles}</td>
                      <td className="px-4 py-3 text-center">{gladiator.rank}</td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            isDead
                              ? 'bg-stone-700 text-stone-100'
                              : 'bg-emerald-800 text-emerald-100'
                          }`}
                        >
                          {gladiator.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  )
}

export default Profile
