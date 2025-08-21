# SportSphere Universal - Cross-Platform Sports App

A modern, cross-platform sports application built with **Expo (React Native)** and **Next.js**, featuring shared codebase, Tamagui UI components, and Supabase backend. **Now with enhanced UX and community-first design!**

## 🚀 Features

- **Cross-Platform**: iOS, Android, and Web from a single codebase
- **Modern UI**: Tamagui for consistent, performant UI components
- **Enhanced UX**: Interactive onboarding, live scores, and community features
- **Real-time Backend**: Supabase for authentication, database, and real-time features
- **Type Safety**: Full TypeScript support
- **State Management**: Zustand for lightweight state management
- **Data Fetching**: TanStack Query for efficient data fetching and caching
- **Internationalization**: i18next for multi-language support
- **PWA Support**: Progressive Web App capabilities for web

## 🎨 New UX Enhancements

### Interactive Onboarding Experience
- **3D Sports Selection Wheel**: Gamified sport selection with interactive wheel
- **Progressive Disclosure**: Step-by-step onboarding with skip options
- **Personalization**: User profile creation and goal setting
- **Community Introduction**: Preview of relevant communities

### Live Score Experience
- **Animated Score Cards**: Real-time updates with smooth animations
- **Community Reactions**: Live emoji reactions (fire, heart, thumbs up)
- **Interactive Elements**: Tap to expand, swipe to navigate
- **Real-time Updates**: Sub-3 second latency for live scores

### Community-First Design
- **Visual Community Cards**: Rich previews with activity indicators
- **Player Discovery Map**: Interactive map for finding nearby players
- **Smart Matching**: AI-powered player and team recommendations
- **Activity Feeds**: Real-time community updates and discussions

### Enhanced Navigation
- **Floating Action Button**: Context-sensitive quick actions
- **Gesture Navigation**: Swipe, tap, and long-press gestures
- **Adaptive Interface**: Changes based on user context
- **Smooth Transitions**: 60fps animations throughout the app

## 📁 Project Structure

```
sportsphere-universal/
├── apps/
│   ├── mobile/              # Expo React Native app
│   │   ├── app/            # Expo Router pages
│   │   │   ├── onboarding.tsx    # Enhanced onboarding flow
│   │   │   ├── home.tsx          # Community-first home screen
│   │   │   ├── discover.tsx      # Player discovery with map
│   │   │   └── ...              # Other enhanced screens
│   │   ├── assets/         # Images, fonts, etc.
│   │   └── package.json
│   └── web/                # Next.js web app
│       ├── app/            # Next.js App Router
│       ├── public/         # Static assets
│       └── package.json
├── packages/
│   ├── ui/                 # Shared UI components (Tamagui)
│   │   ├── components/     # Enhanced cross-platform components
│   │   │   ├── OnboardingWheel.tsx      # Interactive sport selection
│   │   │   ├── LiveScoreCard.tsx        # Animated live scores
│   │   │   ├── CommunityCard.tsx        # Community previews
│   │   │   ├── PlayerDiscoveryMap.tsx   # Interactive player discovery
│   │   │   ├── FloatingActionButton.tsx # Context-sensitive actions
│   │   │   └── ...                     # Other enhanced components
│   │   ├── tamagui.config.ts
│   │   └── package.json
│   └── api/                # API services and state management
│       ├── services/       # Supabase services
│       ├── stores/         # Zustand stores
│       ├── providers/      # React providers
│       └── package.json
├── turbo.json              # Monorepo configuration
├── package.json            # Root package.json
├── env.example             # Environment variables template
└── UX_IMPROVEMENTS.md      # Comprehensive UX documentation
```

## 🛠️ Tech Stack

### Core Technologies
- **React Native** (via Expo) - Mobile development
- **Next.js 14** - Web development
- **Tamagui** - Cross-platform UI framework
- **Supabase** - Backend as a Service
- **TypeScript** - Type safety

### State & Data
- **Zustand** - State management
- **TanStack Query** - Data fetching and caching
- **React Query** - Server state management

### Development Tools
- **Turbo** - Monorepo build system
- **Expo Router** - File-based routing for mobile
- **Next.js App Router** - File-based routing for web

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+
- Expo CLI (`npm install -g @expo/cli`)
- Supabase account

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd sportsphere-universal

# Install dependencies
npm install

# Copy environment variables
cp env.example .env
```

### 2. Configure Environment Variables

Edit `.env` file with your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_APP_NAME=SportSphere
EXPO_PUBLIC_APP_VERSION=1.0.0
```

### 3. Start Development

```bash
# Start all apps
npm run dev

# Start specific apps
npm run dev:mobile    # Mobile app
npm run dev:web       # Web app
```

### 4. Build for Production

```bash
# Build all apps
npm run build

# Build specific apps
npm run build --filter=mobile
npm run build --filter=web
```

## 📱 Mobile Development

### Expo Development
```bash
cd apps/mobile
npm start
```

### Platform-specific
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 🌐 Web Development

### Next.js Development
```bash
cd apps/web
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## 🎨 UI Components

The app uses enhanced Tamagui components with new UX features:

```tsx
import { 
  OnboardingWheel, 
  LiveScoreCard, 
  CommunityCard, 
  PlayerDiscoveryMap,
  FloatingActionButton 
} from '@sportsphere/ui'

// Interactive onboarding
<OnboardingWheel
  sports={sports}
  onSportSelect={handleSportSelect}
  selectedSports={selectedSports}
/>

// Animated live scores
<LiveScoreCard
  matchId={match.id}
  homeTeam={match.homeTeam}
  awayTeam={match.awayTeam}
  status="live"
  reactions={reactions}
  onReaction={handleReaction}
/>

// Community cards
<CommunityCard
  id={community.id}
  name={community.name}
  memberCount={community.memberCount}
  isActive={community.isActive}
  onJoin={handleJoin}
/>

// Player discovery
<PlayerDiscoveryMap
  players={players}
  onPlayerSelect={handlePlayerSelect}
  onInvitePlayer={handleInvite}
/>

// Context-sensitive actions
<FloatingActionButton
  actions={fabActions}
  context="home"
/>
```

## 🔐 Authentication

Authentication is handled through Supabase:

```tsx
import { useAuthStore, AuthService } from '@sportsphere/api'

// In your component
const { user, isLoading } = useAuthStore()

// Sign in
const authService = new AuthService()
await authService.signIn(email, password)
```

## 📊 State Management

Zustand is used for client-side state:

```tsx
import { useAuthStore } from '@sportsphere/api'

const { user, setUser } = useAuthStore()
```

## 🔄 Data Fetching

TanStack Query for server state:

```tsx
import { useQuery } from '@tanstack/react-query'

const { data, isLoading } = useQuery({
  queryKey: ['matches'],
  queryFn: fetchMatches
})
```

## 🌍 Internationalization

i18next for multi-language support:

```tsx
import { useTranslation } from 'react-i18next'

const { t } = useTranslation()
return <Text>{t('welcome.message')}</Text>
```

## 📦 Package Management

### Adding Dependencies

```bash
# Add to specific app
npm install package-name --workspace=apps/mobile

# Add to shared package
npm install package-name --workspace=packages/ui

# Add to all packages
npm install package-name -W
```

### Building Packages

```bash
# Build all packages
npm run build

# Build specific package
npm run build --filter=@sportsphere/ui
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests for specific app
npm run test --filter=mobile
```

## 📝 Scripts

### Root Scripts
- `npm run dev` - Start all development servers
- `npm run build` - Build all apps and packages
- `npm run lint` - Lint all code
- `npm run test` - Run all tests
- `npm run clean` - Clean all build artifacts

### App-specific Scripts
- `npm run dev:mobile` - Start mobile development
- `npm run dev:web` - Start web development
- `npm run build:mobile` - Build mobile app
- `npm run build:web` - Build web app

## 🚀 Deployment

### Mobile (Expo)
```bash
cd apps/mobile
expo build:android  # For Android
expo build:ios      # For iOS
```

### Web (Vercel/Netlify)
```bash
cd apps/web
npm run build
# Deploy the .next folder
```

## 🔧 Configuration

### Tamagui Configuration
Edit `packages/ui/tamagui.config.ts` to customize themes, tokens, and media queries.

### Supabase Setup
1. Create a Supabase project
2. Enable Authentication
3. Set up database tables
4. Configure Row Level Security (RLS)

### Environment Variables
All environment variables are prefixed with `EXPO_PUBLIC_` for client-side access.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Join our community Discord

## 📚 Additional Documentation

- [UX Improvements Guide](./UX_IMPROVEMENTS.md) - Comprehensive UX implementation details
- [API Documentation](./packages/api/README.md) - Backend services documentation
- [UI Components Guide](./packages/ui/README.md) - Component library documentation

---

Built with ❤️ using modern cross-platform technologies and enhanced UX design principles
