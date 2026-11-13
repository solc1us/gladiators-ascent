import { useState } from 'react'
import Header from '../components/Header.jsx'
import WeaponCatalog from '../components/WeaponCatalog.jsx'

const shopSections = [
  {
    name: 'Weapons',
    items: [
      { name: 'Iron Sword', effects: ['Attack +8', 'Accuracy +3'], price: 300 },
      { name: 'Heavy Axe', effects: ['Attack +14', 'Accuracy -5'], price: 500 },
      { name: 'Steel Sword', effects: ['Attack +12', 'Accuracy +2'], price: 650 },
    ],
  },
  {
    name: 'Armor',
    items: [
      { name: 'Leather Armor', effects: ['Defense +6', 'Evasion +2'], price: 250 },
      { name: 'Iron Cuirass', effects: ['Defense +12', 'Evasion -3'], price: 600 },
    ],
  },
  {
    name: 'Helmets',
    items: [
      { name: 'Leather Cap', effects: ['Defense +2'], price: 150 },
      { name: 'Bronze Helmet', effects: ['Defense +5', 'Critical Chance +1'], price: 350 },
    ],
  },
  {
    name: 'Shields',
    items: [
      { name: 'Round Shield', effects: ['Defense +4', 'Block Chance +8'], price: 300 },
      { name: 'Tower Shield', effects: ['Defense +8', 'Block Chance +12', 'Evasion -4'], price: 550 },
    ],
  },
]

function Shop({ playerGold, onPurchase }) {
  const [feedback, setFeedback] = useState(null)

  function handlePurchase(item) {
    if (playerGold < item.price) {
      setFeedback({ type: 'error', text: `Not enough gold to buy ${item.name}.` })
      return
    }

    if (!window.confirm(`Buy ${item.name} for ${item.price} Gold?`)) {
      return
    }

    onPurchase(item.price)
    setFeedback({ type: 'success', text: `${item.name} purchased successfully.` })
  }

  return (
    <>
      <Header title="Gladiator Shop" />

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-8 sm:px-6 sm:py-12">
        <p className="rounded-lg border border-amber-600 bg-stone-900 px-5 py-4 text-right font-bold shadow-xl">
          Current Gold: <span className="ml-2 text-xl text-amber-300">{playerGold}</span>
        </p>

        {feedback && (
          <p
            className={`rounded-lg border px-5 py-4 font-bold ${
              feedback.type === 'success'
                ? 'border-emerald-700 bg-emerald-950 text-emerald-200'
                : 'border-red-700 bg-red-950 text-red-200'
            }`}
            role="status"
          >
            {feedback.text}
          </p>
        )}

        {shopSections.map((section) => (
          <section className="panel" key={section.name} aria-labelledby={`${section.name}-heading`}>
            <h2 className="section-heading" id={`${section.name}-heading`}>{section.name}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <article
                  className="flex flex-col rounded-lg border border-amber-900 border-t-4 border-t-amber-600 bg-stone-950 p-5"
                  key={item.name}
                >
                  <h3 className="font-serif text-xl font-bold text-amber-300">{item.name}</h3>
                  <ul className="my-4 flex-1 list-disc space-y-2 pl-5 text-stone-300">
                    {item.effects.map((effect) => <li key={effect}>{effect}</li>)}
                    <li className="font-bold text-amber-300">Price: {item.price} Gold</li>
                  </ul>
                  <button
                    className="min-h-11 rounded-md border border-amber-600 bg-red-950 px-4 py-2 font-bold hover:bg-red-900"
                    type="button"
                    onClick={() => handlePurchase(item)}
                  >
                    Buy {item.name}
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
        <WeaponCatalog />
      </main>
    </>
  )
}

export default Shop
