import { useState } from 'react'
import GladiatorList from '../components/GladiatorList.jsx'
import GladiatorSummary from '../components/GladiatorSummary.jsx'
import Header from '../components/Header.jsx'

function Leaderboard({ gladiators }) {
  const [showDead, setShowDead] = useState(true)

  return (
    <>
      <Header title="Gladiator Leaderboard" />

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-8 sm:px-6 sm:py-12">
        <GladiatorSummary gladiators={gladiators} />

        <section className="panel" aria-labelledby="rankings-heading">
          <h2 className="section-heading" id="rankings-heading">Rankings</h2>
          <p className="mb-5 max-w-3xl leading-7 text-stone-400">
            Dead gladiators remain permanently recorded on the leaderboard but can no
            longer earn kills.
          </p>
          <button
            className="mb-5 min-h-11 rounded-md border border-amber-600 bg-red-950 px-4 py-2 font-bold hover:bg-red-900"
            type="button"
            onClick={() => setShowDead((currentValue) => !currentValue)}
          >
            {showDead ? 'Hide Dead Gladiators' : 'Show Dead Gladiators'}
          </button>
          <GladiatorList gladiators={gladiators} showDead={showDead} />
        </section>
      </main>
    </>
  )
}

export default Leaderboard
