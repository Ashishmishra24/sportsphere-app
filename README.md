# SportSphere - Comprehensive Sports App

A modern, feature-rich sports application built with React, Firebase, and Tailwind CSS. SportSphere connects athletes, enables match creation, tournament management, live streaming, and community building.

## 🏆 Features

### Authentication & Onboarding
- **Welcome Screen**: Beautiful landing page with app introduction
- **Onboarding Flow**: Interactive guide through app features
- **Sign Up/Login**: Email, phone, and social media authentication
- **Password Recovery**: Secure password reset functionality

### User Dashboard & Profile
- **Home Dashboard**: Personalized overview with stats, upcoming matches, and quick actions
- **User Profile**: Editable profile with achievements, stats, and bio
- **Friends & Rivals**: Network management with detailed stats and head-to-head records

### Match & Tournament Management
- **Match Creation**: Comprehensive match setup with teams, venues, and settings
- **Tournament Creation**: Full tournament management with brackets and scheduling
- **Match Overview**: Detailed match information and participant management
- **Live Scoring**: Real-time score and stats entry during matches

### Live Streaming & Content
- **Live Match Streaming**: Watch matches with real-time chat and overlays
- **Highlights**: Post-match highlights and memorable moments
- **Historical Matches**: Access to past matches with detailed analytics

### Community & Social Features
- **Community Feed**: Dynamic social feed with posts, achievements, and updates
- **Chat & Messaging**: Built-in messaging for teams and friends
- **Performance Analytics**: Deep insights into performance metrics

### Venue Management
- **Venue Directory**: Searchable directory of sports venues
- **Venue Booking**: Direct booking with availability and payment

### Settings & Support
- **App Settings**: Account management, privacy, and preferences
- **Help & Support**: FAQs, live chat, and support system

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sportsphere-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a Firebase project
   - Enable Authentication (Email/Password, Google, Facebook, Apple)
   - Set up Firestore Database
   - Configure Firebase Storage
   - Update `src/firebaseConfig.js` with your Firebase credentials

4. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

## 📱 App Structure

### Screens
```
src/screens/
├── Welcome.js              # Landing page
├── Onboarding.js           # Feature introduction
├── SignUp.js              # User registration
├── Login.js               # User authentication
├── ForgotPassword.js      # Password recovery
├── Home.js                # Main dashboard
├── UserProfile.js         # Profile management
├── FriendsAndRivals.js    # Network management
├── MatchCreation.js       # Match setup
├── TournamentCreation.js  # Tournament setup
├── MatchOverview.js       # Match details
├── ScoringAndStats.js     # Live scoring
├── LiveMatch.js           # Live streaming
├── Highlights.js          # Match highlights
├── HistoricalMatches.js   # Match history
├── PerformanceAnalytics.js # Analytics
├── CommunityFeed.js       # Social feed
├── ChatAndMessaging.js    # Messaging
├── VenueDirectory.js      # Venue search
├── VenueBooking.js        # Venue booking
├── Settings.js            # App settings
└── SupportAndHelp.js      # Support system
```

### Components
```
src/components/
├── Navigation.js          # Bottom navigation
└── ProtectedRoute.js      # Route protection
```

### Utilities
```
src/utils/
├── auth.js               # Authentication utilities
├── database.js           # Database operations
└── storage.js            # File storage
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Purple**: (#8B5CF6)

### Typography
- **Headings**: Inter, system fonts
- **Body**: System fonts
- **Icons**: React Icons (FontAwesome)

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Consistent styling with hover effects
- **Forms**: Clean, accessible input fields
- **Navigation**: Bottom tab navigation for mobile

## 🔧 Technologies Used

### Frontend
- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Icon library
- **React Hot Toast**: Toast notifications

### Backend & Services
- **Firebase Authentication**: User management
- **Firestore**: Real-time database
- **Firebase Storage**: File storage
- **Firebase Hosting**: App deployment

### Development Tools
- **Create React App**: Development environment
- **ESLint**: Code linting
- **Prettier**: Code formatting

## 📱 Mobile-First Design

SportSphere is designed with a mobile-first approach, featuring:
- Responsive design for all screen sizes
- Touch-friendly interface
- Bottom navigation for easy thumb access
- Optimized performance for mobile devices

## 🔐 Security Features

- **Authentication**: Secure user authentication with Firebase
- **Route Protection**: Protected routes for authenticated users
- **Input Validation**: Form validation and sanitization
- **Error Handling**: Comprehensive error handling and user feedback

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Check the [Issues](https://github.com/your-repo/issues) page
- Contact the development team
- Review the documentation

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core authentication
- ✅ Basic match creation
- ✅ User profiles
- ✅ Community feed

### Phase 2 (Planned)
- 🔄 Live streaming integration
- 🔄 Advanced tournament management
- 🔄 Real-time chat
- 🔄 Payment processing

### Phase 3 (Future)
- 📋 AI-powered matchmaking
- 📋 Advanced analytics
- 📋 Mobile app (React Native)
- 📋 API for third-party integrations

---

**SportSphere** - Where Sports Come Alive! 🏆⚽🏀🎾 