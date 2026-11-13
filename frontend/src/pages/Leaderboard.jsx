import { useState } from 'react'
import GladiatorList from '../components/GladiatorList.jsx'
import GladiatorSummary from '../components/GladiatorSummary.jsx'
import Header from '../components/Header.jsx'

function Leaderboard({ gladiators, loading, error, onEdit, onDelete }) {
  const [showDead, setShowDead] = useState(true)
  const [editing, setEditing] = useState(null)
  const [name, setName] = useState('')
  const [style, setStyle] = useState('Balanced')
  const [actionError, setActionError] = useState('')
  const [saving, setSaving] = useState(false)

  async function saveEdit(event) {
    event.preventDefault()
    setSaving(true)
    setActionError('')
    try {
      await onEdit(editing, { name: name.trim(), style })
      setEditing(null)
    } catch (requestError) {
      const message = requestError.response?.data?.message
      setActionError(Array.isArray(message) ? message.join(', ') : message || 'Failed to update gladiator.')
    } finally { setSaving(false) }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this gladiator?')) return
    setActionError('')
    try { await onDelete(id) } catch { setActionError('Failed to delete gladiator.') }
  }

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
          {actionError && <p className="mb-4 text-red-400" role="alert">{actionError}</p>}
          {editing !== null && <form className="mb-5 flex flex-wrap gap-3" onSubmit={saveEdit}>
            <label>Name <input className="rounded bg-amber-50 p-2 text-stone-950" value={name} onChange={(event) => setName(event.target.value)} required minLength={3} /></label>
            <label>Style <select className="rounded bg-stone-800 p-2" value={style} onChange={(event) => setStyle(event.target.value)}><option>Balanced</option><option>Heavy</option><option>Agile</option></select></label>
            <button className="rounded bg-red-900 px-4 py-2" disabled={saving}>Save</button>
            <button className="rounded bg-stone-700 px-4 py-2" type="button" onClick={() => setEditing(null)}>Cancel</button>
          </form>}
          {loading ? <p>Loading gladiators...</p> : error ? <p role="alert" className="text-red-400">{error}</p> : <GladiatorList gladiators={gladiators} showDead={showDead} onEdit={(gladiator) => { setEditing(gladiator.id); setName(gladiator.name); setStyle(gladiator.style); setActionError('') }} onDelete={handleDelete} />}
        </section>
      </main>
    </>
  )
}

export default Leaderboard
