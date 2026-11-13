import Navbar from './Navbar.jsx'

function Header({ title, subtitle, eyebrow }) {
  return (
    <header className="border-b border-amber-800 bg-stone-950/95 px-4 pt-8 text-center shadow-lg sm:pt-12">
      {eyebrow && (
        <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-amber-500">
          {eyebrow}
        </p>
      )}
      <h1 className="font-serif text-3xl font-black tracking-wide text-amber-300 drop-shadow-lg sm:text-5xl">
        {title}
      </h1>
      {subtitle && <p className="mt-3 text-stone-300 sm:text-lg">{subtitle}</p>}
      <Navbar />
    </header>
  )
}

export default Header
