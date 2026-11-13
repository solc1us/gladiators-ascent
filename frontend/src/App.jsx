import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Arena from './pages/Arena.jsx'
import CreateGladiator from './pages/CreateGladiator.jsx'
import Home from './pages/Home.jsx'
import Hub from './pages/Hub.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import Profile from './pages/Profile.jsx'
import Shop from './pages/Shop.jsx'
import { getGladiators, createGladiator, updateGladiator, deleteGladiator } from './services/gladiatorApi.js'

const initialProfile = {
  name: 'Player One',
  careerStats: [
    ['Total Career Kills', '74'],
    ['Gladiators Created', '6'],
    ['Gladiators Lost', '5'],
    ['Total Battles', '91'],
    ['Total Victories', '63'],
    ['Highest Leaderboard Rank', '#3'],
    ['Best Gladiator', 'Marcus'],
    ['Best Gladiator Kills', '29'],
    ['Total Gold Earned', '8,450'],
  ],
  history: [
    { id: 1, name: 'Marcus', kills: 29, battles: 37, rank: '#3', status: 'Dead' },
    { id: 2, name: 'Darius', kills: 18, battles: 21, rank: '#8', status: 'Dead' },
    { id: 3, name: 'Cassian', kills: 11, battles: 14, rank: '#15', status: 'Dead' },
    { id: 4, name: 'Lucius', kills: 9, battles: 12, rank: '#20', status: 'Dead' },
    { id: 5, name: 'Aelius', kills: 7, battles: 7, rank: '#25', status: 'Alive' },
  ],
}

const styleStats = {
  Balanced: { attack: 15, defense: 10, accuracy: 75, evasion: 10 },
  Heavy: { attack: 19, defense: 14, accuracy: 65, evasion: 6 },
  Agile: { attack: 13, defense: 8, accuracy: 85, evasion: 16 },
}

function App() {
  const [gladiators, setGladiators] = useState([])
  const [activeId, setActiveId] = useState(11)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [playerGold, setPlayerGold] = useState(850)
  const [profile] = useState(initialProfile)

  useEffect(() => {
    getGladiators().then(setGladiators).catch(() => setError('Failed to load gladiators.'))
      .finally(() => setLoading(false))
  }, [])

  const activeRecord = gladiators.find((gladiator) => gladiator.id === activeId)
  const activeGladiator = activeRecord ? {
    ...activeRecord, hp: 100, maxHp: 100, ...styleStats[activeRecord.style], critical: 5, block: 5,
    equipment: { weapon: 'Iron Sword', armor: 'Leather Armor', helmet: 'None', shield: 'Round Shield' },
  } : null

  async function addGladiator(data) {
    const created = await createGladiator(data)
    setGladiators((current) => [...current, created])
    setActiveId(created.id)
  }

  async function editGladiator(id, data) {
    const updated = await updateGladiator(id, data)
    setGladiators((current) => current.map((item) => item.id === id ? updated : item))
  }

  async function removeGladiator(id) {
    await deleteGladiator(id)
    setGladiators((current) => current.filter((item) => item.id !== id))
    if (id === activeId) setActiveId(null)
  }

  function purchaseItem(price) {
    setPlayerGold((currentGold) => Math.max(0, currentGold - price))
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-stone-950 font-sans text-amber-50 antialiased">
      <Routes>
        <Route path="/" element={<Home activeGladiator={activeGladiator} />} />
        <Route path="/create-gladiator" element={<CreateGladiator onAdd={addGladiator} />} />
        <Route
          path="/hub"
          element={
            <Hub
              activeGladiator={activeGladiator}
              gladiators={gladiators}
              playerGold={playerGold}
            />
          }
        />
        <Route path="/arena" element={activeGladiator ? <Arena key={activeId} activeGladiator={activeGladiator} /> : <Navigate to="/hub" replace />} />
        <Route path="/leaderboard" element={<Leaderboard gladiators={gladiators} loading={loading} error={error} onEdit={editGladiator} onDelete={removeGladiator} />} />
        <Route
          path="/shop"
          element={<Shop onPurchase={purchaseItem} playerGold={playerGold} />}
        />
        <Route path="/profile" element={<Profile profile={profile} />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>

      <footer className="mt-auto border-t border-amber-900 bg-stone-950 px-4 py-6 text-center font-serif text-sm text-stone-500">
        Gladiator&apos;s Ascent
      </footer>
    </div>
  )
}

export default App
