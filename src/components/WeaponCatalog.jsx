import { useEffect, useState } from 'react'
import axios from 'axios'

function WeaponCatalog() {
  const [weapons, setWeapons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  async function fetchWeapons() {
    setLoading(true)
    setError(false)
    setWeapons([])

    try {
      const response = await axios.get('https://www.dnd5eapi.co/api/2014/equipment-categories/weapon')
      if (!Array.isArray(response.data.equipment)) throw new Error('Invalid response')
      setWeapons(response.data.equipment)
    } catch {
      setWeapons([])
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    Promise.resolve().then(fetchWeapons)
  }, [])

  return (
    <section className="panel" aria-labelledby="weapon-catalog-heading">
      <h2 className="section-heading" id="weapon-catalog-heading">Weapon Encyclopedia</h2>
      <p className="mb-5 text-stone-400">Weapons from the D&amp;D 5e API are shown for reference only.</p>
      {loading ? (
        <p role="status">Loading weapons...</p>
      ) : error ? (
        <div role="alert">
          <p className="text-red-300">Failed to load weapons. Please try again.</p>
          <button className="mt-4 min-h-11 rounded-md border border-amber-600 bg-red-950 px-4 py-2 font-bold hover:bg-red-900" type="button" onClick={fetchWeapons}>
            Coba Lagi
          </button>
        </div>
      ) : weapons.length === 0 ? (
        <p>No weapons found.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {weapons.map((weapon) => (
            <li className="rounded-lg border border-amber-900 border-t-4 border-t-amber-600 bg-stone-950 p-5 font-serif text-lg font-bold text-amber-300" key={weapon.index}>
              {weapon.name}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default WeaponCatalog
