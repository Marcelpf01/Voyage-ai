# Voyage AI — Your AI Travel Companion

A premium full-stack SaaS application that creates personalized AI-generated travel itineraries. Describe your dream trip and let Voyage AI design a flawless day-by-day plan — complete with hidden gems, budget breakdowns, and a live travel concierge.

**Live at: [voyage-ai.vercel.app](https://voyage-ai.vercel.app)** (deploy your own below)

---

## Features

- **AI Trip Generator** — Multi-step form that feeds into Gemini to produce complete day-by-day itineraries with real coordinates, cost estimates, and curated recommendations.
- **Interactive Day-by-Day View** — Morning, afternoon, and evening segments with place cards, categories, durations, and travel times.
- **Live Travel Concierge** — Embedded AI chat that answers questions about your itinerary, suggests alternatives, and can regenerate days.
- **AI Actions** — Make it cheaper, more luxurious, more relaxed, or regenerate any day with one click.
- **Budget Tracker** — Visual breakdown across hotels, flights, food, transportation, entertainment, and shopping.
- **Trip Management** — Save, favorite, duplicate, rename, archive, delete, and share trips.
- **Demo Mode** — Explore the app instantly with pre-seeded luxury trips (Amalfi Coast, Tokyo, Bali) — no account needed.
- **Export & Share** — Print-friendly itineraries, copy to clipboard, share public links.
- **Dashboard** — Quick stats, upcoming trips, past journeys, recently viewed, favorites, and continue-planning cards.
- **Auth System** — Local-first authentication with Google and email login, registration, password reset, and protected routes.
- **Dark Mode** — Full light/dark theme with premium emerald-gold design system.
- **Responsive** — Desktop, tablet, and mobile layouts with sidebar navigation.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Animation | Framer Motion |
| Routing | React Router v7 |
| State | Zustand (persisted) |
| Forms | React Hook Form + Zod |
| Data | React Query |
| AI | Gemini via Rork Toolkit Proxy |
| Icons | Lucide |
| Charts | Recharts |
| Deployment | Vercel |

---

## Setup

### Prerequisites

- [Bun](https://bun.sh) (package manager)
- A [Rork](https://rork.app) account for the AI proxy

### Installation

```bash
# Clone the repository
git clone https://github.com/marcelpividal/voyage-ai.git
cd voyage-ai/web

# Install dependencies
bun install

# Copy environment variables
cp .env.example .env
```

### Environment Variables

Edit `.env` and set:

```env
VITE_TOOLKIT_URL=https://toolkit.rork.app
VITE_RORK_TOOLKIT_SECRET_KEY=your-key-here
```

The app uses Rork's AI proxy for Gemini — no separate API key needed for the AI features.

### Development

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build

```bash
bun run build
```

Outputs to `dist/`.

---

## Firebase Setup (Optional)

The app uses a local-first auth store by default. To add real Firebase Auth:

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable Email/Password and Google sign-in
3. Add your config to `.env`
4. Replace the `useAuthStore` implementation with Firebase SDK calls

---

## Google Maps Setup (Optional)

The app currently uses Leaflet for maps. To add Google Maps:

1. Get an API key from [Google Cloud Console](https://console.cloud.google.com)
2. Enable Maps JavaScript API, Places API, and Geocoding API
3. Add `VITE_GOOGLE_MAPS_API_KEY` to `.env`

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

---

## Project Structure

```
web/
├── src/
│   ├── components/
│   │   ├── brand/          # Logo
│   │   ├── common/         # ErrorBoundary, RequireAuth, Reveal, Skeleton
│   │   ├── layout/         # DashboardLayout (sidebar + topbar)
│   │   ├── marketing/      # Hero, Features, Destinations, Pricing, FAQ, Footer, Nav
│   │   └── ui/             # shadcn/ui primitives
│   ├── data/               # Sample seed data (demo trips)
│   ├── hooks/              # Custom hooks
│   ├── lib/                # AI client, formatters, utils
│   ├── pages/              # Route pages
│   ├── services/           # Trip generation, AI assistant
│   ├── store/              # Zustand stores (auth, trips, settings)
│   └── types/              # TypeScript types
├── public/                 # Static assets (logo, favicon)
├── .env.example
├── tailwind.config.ts
└── vite.config.ts
```

---

## Architecture

The app follows a feature-based architecture:

- **Stores** (`zustand`): Client state persisted to localStorage. Auth, trips, and settings each have their own store.
- **Services**: Business logic layer. `tripService.ts` wraps the AI client to generate itineraries and handle the travel concierge chat.
- **AI Client** (`lib/ai.ts`): Thin wrapper around the Rork Toolkit Proxy with JSON extraction for structured itinerary responses.
- **Pages**: Route-level components that compose UI primitives and call store actions.
- **Components**: Reusable UI — marketing sections for the landing page, shadcn/ui primitives, and layout wrappers.

Authentication is local-first with a clean interface so Firebase can be dropped in without touching the UI layer.

---

## Future Improvements

- [ ] Firebase Auth + Firestore integration for real persistence
- [ ] Google Maps with interactive pins and directions
- [ ] Real-time weather API integration
- [ ] Social sharing with public trip pages
- [ ] Multi-language support
- [ ] Mobile app via React Native
- [ ] Stripe payments for premium plans
- [ ] Collaborative trip planning
- [ ] Offline support with service workers

---

## License

MIT — built by [Marcel Pividal](https://marcelpividal.dev)
