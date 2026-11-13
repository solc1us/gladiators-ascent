import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'

const menuLinks = [
  ['New Game', '/create-gladiator'],
  ['Continue', '/hub'],
  ['Leaderboard', '/leaderboard'],
  ['Player Profile', '/profile'],
]

function Home({ activeGladiator }) {
  return (
    <>
      <Header
        eyebrow="The arena awaits"
        title="GLADIATOR'S ASCENT"
        subtitle="Rise. Fight. Survive. Become a Legend."
      />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6 sm:py-16">
        <section
          className="grid items-center gap-8 rounded-xl border border-amber-900 bg-stone-900/90 p-6 shadow-xl md:grid-cols-[minmax(220px,320px)_1fr] sm:p-10"
          aria-labelledby="introduction-heading"
        >
          <img
            className="mx-auto h-auto w-full max-w-72"
            src="/assets/gladiator.png"
            alt="Roman gladiator holding a sword and shield, ready for the arena"
          />
          <div className="text-center md:text-left">
            <h2
              className="font-serif text-3xl font-bold text-amber-300 sm:text-4xl"
              id="introduction-heading"
            >
              Welcome to the Arena
            </h2>
            <p className="mt-4 leading-7 text-stone-300">
              Create gladiators, equip them for battle, and fight your way to become the
              #1 gladiator on the leaderboard.
            </p>
            <p className="mt-3 text-sm text-stone-500">
              Current gladiator: {activeGladiator?.name ?? 'None'}
            </p>
          </div>
        </section>

        <nav
          className="mx-auto w-full max-w-2xl rounded-xl border border-amber-900 bg-stone-900/90 p-6 text-center shadow-xl"
          aria-label="Main menu"
        >
          <h2 className="mb-5 font-serif text-2xl font-bold text-amber-300">Main Menu</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {menuLinks.map(([label, path]) => (
              <li key={path}>
                <Link
                  className="flex min-h-12 items-center justify-center rounded-md border border-amber-600 bg-red-950 px-5 py-3 font-bold transition hover:border-amber-300 hover:bg-red-900"
                  to={path}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </>
  )
}

export default Home
