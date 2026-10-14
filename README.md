# 🎬 Javinflix - Free Streaming Hub

A free streaming aggregator for personal use. Watch movies & TV shows from 15+ legal free sources — no subscriptions, no credit cards!

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher) - Download from https://nodejs.org

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:5173
   ```

## 📦 Build for Production

```bash
npm run build
```

The optimized files will be in the `dist/` folder.

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run typecheck` | Check TypeScript types |

## 🎁 Free Streaming Sources

- 🟡 Tubi
- 🌐 Pluto TV
- 🟢 Amazon Freevee
- 🔶 Crackle
- 🍿 PopcornFlix
- ▶️ YouTube Movies
- 🏛️ Internet Archive
- 📚 Kanopy
- 📖 Hoopla
- 🟠 Plex
- 🟣 The Roku Channel
- 🔵 Vudu (Free)
- 🟧 Crunchyroll
- 🦚 Peacock (Free)
- 🎬 Filmzie

## 📁 Project Structure

```
javinflix/
├── index.html
├── package.json
├── vite.config.js
├── tsconfig.json
├── src/
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── ContentCard.tsx
│   │   ├── ContentRow.tsx
│   │   └── ContentDetail.tsx
│   ├── pages/               # Page components
│   │   ├── Home.tsx
│   │   ├── Movies.tsx
│   │   ├── Series.tsx
│   │   ├── Sources.tsx
│   │   ├── Search.tsx
│   │   └── MyList.tsx
│   └── data/
│       └── content.ts       # Movie/series data & sources
```

## 🎯 Features

- ✅ 100% Free streaming sources
- ✅ Browse movies & TV series
- ✅ Search by title, actor, genre
- ✅ Save to personal watchlist
- ✅ View all available free sources per title
- ✅ Quality & region information
- ✅ Responsive design (mobile & desktop)
- ✅ Dark theme

## 📝 Disclaimer

Javinflix is a personal-use aggregation tool. All content is sourced from legitimate free streaming platforms. We do not host, store, or distribute any copyrighted content.

## 📄 License

For personal use only.
