import { useNavigate } from 'react-router-dom'
import GladiatorForm from '../components/GladiatorForm.jsx'
import Header from '../components/Header.jsx'

const startingStats = [
  ['HP', '100'],
  ['Attack', '15'],
  ['Defense', '10'],
  ['Accuracy', '75%'],
  ['Evasion', '10%'],
  ['Critical Chance', '5%'],
]

function CreateGladiator({ onAdd }) {
  const navigate = useNavigate()

  function handleAdd(gladiator) {
    onAdd(gladiator)
    navigate('/hub')
  }

  return (
    <>
      <Header
        title="Create Your Gladiator"
        subtitle="Choose a name and fighting style before entering the arena."
      />

      <main className="mx-auto grid w-full max-w-5xl flex-1 grid-cols-1 gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-2">
        <GladiatorForm onAdd={handleAdd} />

        <section
          className="rounded-xl border border-amber-900 bg-stone-900/90 p-5 shadow-xl sm:p-6"
          aria-labelledby="stats-heading"
        >
          <h2
            className="border-b border-amber-800 pb-3 font-serif text-2xl font-bold text-amber-300"
            id="stats-heading"
          >
            Starting Statistics Preview
          </h2>
          <dl className="mt-5 grid grid-cols-2 gap-3">
            {startingStats.map(([label, value]) => (
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
          <p className="mt-5 text-sm leading-6 text-stone-400">
            Balanced offers even stats. Heavy favors attack and defense, while Agile
            favors accuracy and evasion.
          </p>
        </section>
      </main>
    </>
  )
}

export default CreateGladiator
