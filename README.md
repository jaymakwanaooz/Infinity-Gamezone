# 🎮 INFINITYGZ PLATFORM

![Project Status](https://img.shields.io/badge/Status-Active_Development-brightgreen?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-Next.js_16_|_Tailwind_v4_|_React_19-00f3ff?style=for-the-badge)
![Auth](https://img.shields.io/badge/Auth-Context_API_|_LocalStorage-a855f7?style=for-the-badge)

**InfinityGZ** is a premium, high-performance gaming platform designed for the modern eSports era. From high-end battle stations to immersive VR arenas, this platform provides everything a competitive gamer needs — including tournament registration, membership packages, and a full user dashboard.

---

## 🚀 Key Features

### 💻 Pro Gaming Setup
- **Ultimate Hardware**: RTX 4090 configurations with Intel i9-14900K processors.
- **Ultra-High Refresh**: 360Hz & 500Hz Zowie monitors for millisecond advantages.
- **Precision Gear**: Professional-grade peripherals from Razer, Zowie, and Logitech.

### 👓 Immersive Arenas
- **Console Lounge**: PS5 & Xbox Series X setups with 75" 4K OLED displays.
- **VR Arena**: Fully wireless, large-scale VR tracking systems for total immersion.

### 🔐 Authentication System
- **Integrated Access Terminal**: In-place login and registration flows that preserve the dashboard layout.
- **Auth Shell Integration**: No more floating modals — auth fields are seamlessly embedded within the command center.
- **Credential Validation**: Username & password validation with custom error state animations.
- **Persistent Sessions**: Global auth state via React Context API + localStorage.
- **Empty Credentials**: All fields are now un-filled by default for a realistic, professional login experience.

### 📊 User Dashboard
- **Welcome Header**: Personalized greeting with the logged-in username.
- **Stat Cards**: Balance, Loyalty Points, Time Played, and Top Games — each with unique color glows (cyan, purple, green, red).
- **Tabbed History Panel**: Switch between three history views via the sidebar:
  - 💰 **Credits History** — Top-ups, deductions, bonuses with directional icons.
  - 🏆 **Tournaments History** — Past entries, placements, and prizes won.
  - 💳 **Payments History** — Payment methods, amounts, and refund statuses.
- **Logout Button**: One-click session termination.

### 🏆 Tournament System
- **Active Tournaments**: Live cards with date, prize pool, team slots, and status badges.
- **Info Modal**: Detailed view with format, schedule, venue, requirements, and numbered rules list.
- **Registration Form**: Team name, captain, email, phone, custom team-size dropdown, and message — all in a themed glassmorphic modal.
- **Success Confirmation**: Animated "You're In!" screen after registration.
- **Wall of Fame**: Historical leaderboard of past champions.

### 💎 Battle Passes & Packages
- **Hourly Tiers**: Standard, Pro, and VIP booth pricing.
- **Night Owl Pass**: Exclusive night-long gaming access.
- **Pro Membership**: Monthly subscriptions with tournament discounts.
- **Multi-Method Checkout**:
  - 💳 **Credit/Debit Card** — Cardholder, Number, Expiry, CVV.
  - 📱 **UPI** — Integrated UPI ID and Account Holder fields.
- **Auth Gate**: Unauthenticated users are prompted to login/signup before purchasing.
- **Homepage Preview**: Top 2 packages displayed on homepage with "Explore More" CTA.

### 🔔 Notification System
- **Notification Bell**: Icon with animated ring indicator in the navbar.
- **Popup Panel**: Mini overlay showing new tournaments, events, and system upgrade alerts.

### 🎬 Intro Animation
- **Homepage Exclusive**: Cinematic joystick logo reveal animation on first load.
- **Scroll Reset**: All pages scroll to top on navigation/reload.

### 🗺️ Dynamic Interface Improvements
- **Interactive Game Grid**: Smooth, staggered expansion for the "Top Titles" section using `framer-motion` spring physics.
- **Aesthetic Density**: Optimized padding and layout spacing in the Dashboard and Footer for a professional, space-efficient feel.
- **Interactive States**: Hover effects, glow animations, and responsive interactive elements across all modules.
- **Contact & Map**: Embedded location finder and social connectivity.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Library** | [React 19](https://reactjs.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://greensock.com/gsap/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **State** | React Context API + localStorage |
| **Images** | [Next/Image](https://nextjs.org/docs/api-reference/next/image) with Unsplash |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage with intro animation
│   ├── dashboard/page.tsx    # User dashboard with auth gate
│   ├── packages/page.tsx     # Membership packages & checkout
│   ├── tournaments/page.tsx  # Tournament listings & registration
│   ├── leaderboard/page.tsx  # Competitive rankings
│   ├── contact/page.tsx      # Contact & map
│   └── layout.tsx            # Root layout with AuthProvider
├── components/
│   ├── Navbar.tsx             # Navigation with notification bell
│   ├── IntroScreen.tsx        # Homepage intro animation
│   ├── SectionHeading.tsx     # Reusable section header
│   └── ...
├── context/
│   └── AuthContext.tsx         # Global auth state management
└── ...
```

---

## 🏃 Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jaymakwanaooz/Infinity-Gamezone.git
   cd Infinity-Gamezone
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Launch Dev Server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**: Navigate to `http://localhost:3000`

---

## 🔑 Auth Policy
- **Initialize**: Use the 'Register' tab to create a new session.
- **Fields**: All authentication fields are empty by default to ensure a clean state upon entry.

---

## 📋 Roadmap

- [ ] Admin Panel for tournament management
- [ ] Backend integration (NextAuth.js, Stripe API)
- [ ] Real-time notifications via WebSocket
- [ ] Form validation with Zod
- [ ] Production deployment

---

*Developed for the next generation of gamers.* 🎮
