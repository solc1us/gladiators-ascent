import { useState } from 'react'

function GladiatorForm({ onAdd }) {
  const [name, setName] = useState('')
  const [style, setStyle] = useState('Balanced')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedName = name.trim()

    if (!trimmedName) {
      setError('Nama gladiator tidak boleh kosong.')
      return
    }

    onAdd({ name: trimmedName, style })
    setName('')
    setStyle('Balanced')
    setError('')
  }

  return (
    <form
      className="rounded-xl border border-amber-900 bg-stone-900/90 p-5 shadow-xl sm:p-6"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="border-b border-amber-800 pb-3 font-serif text-2xl font-bold text-amber-300">
        Gladiator Identity
      </h2>

      <div className="mt-5">
        <label className="mb-2 block font-bold" htmlFor="gladiator-name">
          Gladiator Name
        </label>
        <input
          className="min-h-12 w-full rounded-md border border-amber-800 bg-amber-50 px-4 py-3 text-stone-950 focus:border-amber-400 focus:outline-2 focus:outline-offset-2 focus:outline-amber-300"
          id="gladiator-name"
          name="gladiator-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-describedby={error ? 'name-error' : undefined}
          aria-invalid={Boolean(error)}
        />
        {error && (
          <p className="mt-2 text-sm font-bold text-red-400" id="name-error" role="alert">
            {error}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label className="mb-2 block font-bold" htmlFor="fighting-style">
          Fighting Style
        </label>
        <select
          className="min-h-12 w-full rounded-md border border-amber-800 bg-stone-950 px-4 py-3 text-amber-50 focus:border-amber-400 focus:outline-2 focus:outline-offset-2 focus:outline-amber-300"
          id="fighting-style"
          name="fighting-style"
          value={style}
          onChange={(event) => setStyle(event.target.value)}
        >
          <option value="Balanced">Balanced</option>
          <option value="Heavy">Heavy</option>
          <option value="Agile">Agile</option>
        </select>
      </div>

      <button
        className="mt-6 min-h-12 w-full rounded-md border border-amber-500 bg-red-950 px-5 py-3 font-bold transition hover:bg-red-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
        type="submit"
      >
        Enter the Arena
      </button>
    </form>
  )
}

export default GladiatorForm
