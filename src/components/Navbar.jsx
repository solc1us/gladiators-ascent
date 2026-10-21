import { NavLink } from 'react-router-dom'

const links = [
  ['Home', '/'],
  ['Gladiator Hub', '/hub'],
  ['Arena', '/arena'],
  ['Shop', '/shop'],
  ['Leaderboard', '/leaderboard'],
  ['Player Profile', '/profile'],
]

function Navbar() {
  return (
    <nav className="mx-auto mt-7 max-w-6xl border-t border-amber-900" aria-label="Primary navigation">
      <ul className="flex flex-col gap-1 py-3 sm:flex-row sm:flex-wrap sm:justify-center">
        {links.map(([label, path]) => (
          <li key={path}>
            <NavLink
              className={({ isActive }) =>
                `block min-h-11 rounded-md px-4 py-2.5 font-bold transition ${
                  isActive
                    ? 'bg-amber-600 text-stone-950'
                    : 'text-amber-50 hover:bg-stone-800 hover:text-amber-300'
                }`
              }
              end={path === '/'}
              to={path}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
