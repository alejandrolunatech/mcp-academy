# 🏰 MCP Academy: The Three Magic Paths

> A story-driven click adventure that teaches kids (ages 8–14) the fundamentals of the **Model Context Protocol (MCP)** through exploration, dialogue, and interactive challenges — in three languages.

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)
![Deploy](https://github.com/YOUR_USERNAME/mcp-academy/actions/workflows/deploy.yml/badge.svg)

🎮 **[Play it live → https://alejandrolunatech.github.io/mcp-academy/](https://alejandrolunatech.github.io/mcp-academy/)**

---

## 🎮 What is this?

**MCP Academy** is a browser-based educational game where players take on the role of a young apprentice sent to restore balance to a magical academy. The academy's three paths have been scrambled by the *Fog of Confusion*, and only by exploring each wing, talking to its characters, and solving challenges can the player set things right.

Along the way, players learn the three core concepts of the **Model Context Protocol**:

| Path | Emoji | Concept | Teaches |
|---|---|---|---|
| Toolcraft | ⚒️ | **Tools DO things** | Tools execute actions (web search, send email, run code) |
| Lorekeeping | 📚 | **Resources KNOW things** | Resources hold information (files, databases, documents) |
| Spellguidance | ✨ | **Prompts GUIDE things** | Prompts shape AI behaviour, tone, and personality |

---

## 🌍 Languages

The full game — all dialogue, hotspot descriptions, UI labels, and boss fight content — is available in:

- 🇬🇧 **English**
- 🇪🇸 **Spanish**
- 🇳🇱 **Dutch**

Players can switch language at any time from the World Map or the in-game navigation bar. The selected language is persisted via `localStorage`.

---

## 🗺️ Game Structure

| Room | What you learn |
|---|---|
| 🏛️ Great Entrance Hall | Introduction to MCP and the three paths |
| ⚒️ Artifact Hall | Tools — things that DO |
| 📚 Grand Library | Resources — things that KNOW |
| ✨ Spell Tower | Prompts — things that GUIDE |
| 🪞 Hall of Mirrors | Comparing all three paths side by side |
| 💻 Rune Console Chamber | How `tools/list`, `tools/describe`, `tools/call` work |
| 🌫️ Fog Chamber | **Boss fight** — drag-and-drop sorting challenge |
| 🏆 Victory Screen | Celebration, badge collection, and key lesson recap |

Each room awards **XP ⭐** and a **badge 🏅** on completion. Rooms unlock sequentially as you progress.

---

## 🕹️ Gameplay Features

- **Typewriter dialogue engine** — character-by-character text with branching choices
- **Interactive hotspots** — click glowing objects to discover information
- **Completion system** — talk + inspect → "Complete Room" → earn XP and unlock next rooms
- **Boss fight** — drag-and-drop (with click fallback) sorting of 9 items into 3 zones; boss HP drains with each correct placement
- **Progress persistence** — full game state saved to `localStorage`
- **XP & badge tracking** — visible in the navigation bar and on the World Map

---

## 🛠️ Tech Stack

| Technology | Version | Role |
|---|---|---|
| [React](https://react.dev) | 19 | UI framework |
| [TypeScript](https://www.typescriptlang.org) | 5.9 | Type safety throughout |
| [Vite](https://vite.dev) | 8 | Build tool & dev server |
| CSS Modules | — | Scoped component styles |
| React Context + `useReducer` | — | Global game state (no external state library) |
| `localStorage` | — | Save persistence |
| HTML5 Drag-and-Drop API | — | Boss fight mechanics |
| Google Fonts (Cinzel + Nunito) | — | Fantasy display + kid-friendly body text |

No routing library. No UI component library. No i18n library — the translation system is a lightweight custom hook (`useTranslation`) backed by typed locale objects.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── dialogue/       # DialogueBox — typewriter + branching choices
│   ├── navigation/     # NavigationBar — sticky top bar
│   ├── scene/          # WorldMap, SceneRenderer, FogChamberScene, VictoryScreen
│   └── ui/             # Button, Card, Badge, XPStars, HotspotModal, LanguageSwitcher
├── context/
│   └── GameContext.tsx # useReducer state, all actions, localStorage persistence
├── data/
│   ├── characters.ts           # Character definitions
│   ├── characters.localized.ts # Translated character names & roles
│   ├── scenes.ts               # Base scene data
│   └── scenes.localized.ts     # All scene text in EN / ES / NL + getLocalizedScene()
├── i18n/
│   ├── types.ts    # Translations interface
│   ├── en.ts       # English strings
│   ├── es.ts       # Spanish strings
│   ├── nl.ts       # Dutch strings
│   └── index.ts    # useTranslation() hook + t() interpolation helper
└── types/
    └── game.ts     # All core TypeScript types
```

---

## 🚀 Running Locally

**Prerequisites:** Node.js 18+ and npm 9+

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/mcp-academy.git
cd mcp-academy

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check and build for production (`dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## 🧩 How the i18n System Works

All UI strings live in typed locale files (`src/i18n/*.ts`). Components call the `useTranslation()` hook to get the current language's string object (`tr`) and an interpolation helper (`t`):

```tsx
const { tr, t } = useTranslation();

// Simple key
<button>{tr.gotIt}</button>  // "Got it! ✓" / "¡Entendido! ✓" / "Begrepen! ✓"

// With variable interpolation
<p>{t(tr.worldMapWelcome, { name: playerName })}</p>
// → "Welcome, Alice! Choose a room to enter."
// → "¡Bienvenido, Alice! Elige una sala para entrar."
```

Scene content (dialogue, hotspot text, titles) is handled separately in `scenes.localized.ts` via `getLocalizedScene(sceneId, lang)`, which is called in `App.tsx` before passing the scene to `SceneRenderer`.

---

## 🚢 Deployment (GitHub Pages)

The game auto-deploys to `https://YOUR_USERNAME.github.io/mcp-academy/` on every push to `main` via GitHub Actions.

### One-time setup (do this once after pushing the code)

1. Go to your repository on GitHub → **Settings → Pages**
2. Under **Build and deployment → Source**, select **GitHub Actions**
3. Save — that's it. The next push to `main` will trigger the workflow

The workflow file lives at [.github/workflows/deploy.yml](.github/workflows/deploy.yml) and:
- Runs `npm ci` + `npm run build`
- Uploads the `dist/` folder as a Pages artifact
- Deploys it to GitHub Pages via the official `actions/deploy-pages` action

> **Note:** Replace `YOUR_USERNAME` in the README badges and links with your actual GitHub username.

---

## 🤝 Contributing

Contributions are welcome! Some ideas for future work:

- Additional languages
- Mini-games for the Hall of Mirrors and Rune Console Chamber
- Accessibility improvements (screen reader support, high-contrast mode)
- Sound effects and background music
- A teacher/classroom mode with progress tracking

Please open an issue to discuss before submitting a pull request.

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.
