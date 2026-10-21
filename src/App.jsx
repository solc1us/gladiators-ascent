import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Arena from './pages/Arena.jsx'
import CreateGladiator from './pages/CreateGladiator.jsx'
import Home from './pages/Home.jsx'
import Hub from './pages/Hub.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import Profile from './pages/Profile.jsx'
import Shop from './pages/Shop.jsx'

const initialGladiators = [
  { id: 1, name: 'Maximus', style: 'Heavy', kills: 58, status: 'Alive', isPlayer: false },
  { id: 2, name: 'Aurelius', style: 'Balanced', kills: 53, status: 'Alive', isPlayer: false },
  { id: 3, name: 'Cassius', style: 'Agile', kills: 47, status: 'Alive', isPlayer: false },
  { id: 4, name: 'Brutus', style: 'Heavy', kills: 43, status: 'Dead', isPlayer: false },
  { id: 5, name: 'Titus', style: 'Balanced', kills: 39, status: 'Alive', isPlayer: false },
  { id: 6, name: 'Spartacus', style: 'Heavy', kills: 35, status: 'Dead', isPlayer: false },
  { id: 7, name: 'Lucius', style: 'Agile', kills: 31, status: 'Alive', isPlayer: false },
  { id: 8, name: 'Decimus', style: 'Balanced', kills: 26, status: 'Alive', isPlayer: false },
  { id: 9, name: 'Gaius', style: 'Heavy', kills: 22, status: 'Dead', isPlayer: false },
  { id: 10, name: 'Flavius', style: 'Agile', kills: 18, status: 'Alive', isPlayer: false },
  {
    id: 11,
    name: 'Marcus',
    style: 'Balanced',
    kills: 12,
    status: 'Alive',
    isPlayer: true,
    hp: 100,
    maxHp: 100,
    attack: 18,
    defense: 14,
    accuracy: 78,
    evasion: 12,
    critical: 8,
    block: 15,
    equipment: {
      weapon: 'Iron Sword',
      armor: 'Leather Armor',
      helmet: 'None',
      shield: 'Round Shield',
    },
  },
]

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
  const [gladiators, setGladiators] = useState(initialGladiators)
  const [activeGladiator, setActiveGladiator] = useState(initialGladiators[10])
  const [playerGold, setPlayerGold] = useState(850)
  const [profile] = useState(initialProfile)

  function addGladiator({ name, style }) {
    const nextId = Math.max(0, ...gladiators.map((gladiator) => gladiator.id)) + 1
    const newGladiator = {
      id: nextId,
      name,
      style,
      kills: 0,
      status: 'Alive',
      isPlayer: true,
      hp: 100,
      maxHp: 100,
      ...styleStats[style],
      critical: 5,
      block: 5,
      equipment: {
        weapon: 'Iron Sword',
        armor: 'Leather Armor',
        helmet: 'None',
        shield: 'Round Shield',
      },
    }

    setGladiators((currentGladiators) => [...currentGladiators, newGladiator])
    setActiveGladiator(newGladiator)
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
        <Route path="/arena" element={<Arena activeGladiator={activeGladiator} />} />
        <Route path="/leaderboard" element={<Leaderboard gladiators={gladiators} />} />
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
