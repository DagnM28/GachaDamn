# GachaDamn Wiki

A comprehensive Wikipedia-style platform for [Genshin Impact](https://genshin-impact.fandom.com/wiki/Genshin_Impact_Wiki) and [Honkai: Star Rail](https://en.wikipedia.org/wiki/Honkai:_Star_Rail), providing detailed information about characters, gameplay mechanics, lore, and game content.

## About the Games

### Genshin Impact

An open-world action RPG developed by HoYoverse (miHoYo), featuring an anime-inspired fantasy world called Teyvat. Players explore seven nations, each tied to different elements and ruled by Archons. The game combines real-time elemental combat, character collection through a gacha system, and an expansive storyline following the Traveler's journey to find their lost sibling.

**Key Features:**

- Open-world exploration with climbing, swimming, and gliding mechanics
- Real-time combat with elemental reactions system
- 100+ playable characters with unique abilities
- Co-op multiplayer mode
- Regular content updates with new regions and story chapters

### Honkai: Star Rail

A turn-based RPG set in a sci-fi universe, where players travel across worlds aboard the Astral Express. The game features strategic turn-based combat, deep character progression, and a story-driven narrative involving Stellarons and cosmic entities called Aeons.

**Key Features:**

- Strategic turn-based combat system
- Space exploration across multiple worlds
- Path system with unique philosophies and powers
- Cinematic storytelling with high production value
- Character collection through gacha mechanics

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules + Tailwind CSS
- **Internationalization:** next-intl (English & Vietnamese)
- **Font:** Exo 2 (Google Fonts)
- **Theme:** Light/Dark mode support

## Features

- Multi-language support (EN/VI)
- Theme switching (Light/Dark mode)
- Responsive design
- Type-safe development
- Server-side rendering

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3030](http://localhost:3030) to view the application.

## Project Structure

```
apps/web/
├── app/
│   ├── [locale]/          # Localized routes
│   ├── globals.css        # Global styles
│   └── page.tsx           # Root redirect
├── messages/              # Translation files
│   ├── en.json
│   └── vi.json
├── src/
│   ├── components/        # React components
│   ├── contexts/          # Context providers (Theme, Locale)
│   ├── i18n/             # i18n configuration
│   └── lib/              # Utility functions
└── public/               # Static assets
```

## Development

The project uses a monorepo structure with Turborepo. Key commands:

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
```

## Contributing

This is a community-driven wiki project. Contributions are welcome!

## License

This project is for educational and informational purposes. Game content and trademarks belong to HoYoverse.

---

_Content sourced from official game materials and community contributions. Not affiliated with HoYoverse._
