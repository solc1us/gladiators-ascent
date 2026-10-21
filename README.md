# Gladiator's Ascent

Gladiator's Ascent adalah game arcade berbasis web dengan sistem pertarungan gladiator secara turn-based. Pemain dapat membuat gladiator, melihat statistik dan perlengkapan, bertarung di arena, membeli perlengkapan, dan mengejar peringkat tertinggi di leaderboard.

Proyek ini dibuat sebagai tugas pengembangan web.

## Halaman

- `index.html` - menu utama.
- `create-gladiator.html` - form pembuatan gladiator.
- `hub.html` - ringkasan gladiator, statistik, dan perlengkapan.
- `arena.html` - tampilan pertarungan berbasis giliran.
- `shop.html` - daftar perlengkapan yang dapat dibeli.
- `leaderboard.html` - peringkat gladiator hidup dan mati.
- `profile.html` - profil pemain dan riwayat gladiator.

## Struktur Proyek

```text
gladiators-ascent/
|-- assets/
|   `-- images/
|-- docs/
|   `-- screenshot/
|-- arena.html
|-- create-gladiator.html
|-- hub.html
|-- index.html
|-- leaderboard.html
|-- profile.html
|-- shop.html
`-- README.md
```

## Cara Menjalankan

1. Clone projek github.
2. Buka `index.html` menggunakan browser.
3. Gunakan menu dan navigasi untuk berpindah halaman.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
