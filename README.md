# 🩸 Blood Donation App

A modern Blood Donation mobile application built with **React Native (Expo)**. This app helps connect blood donors with recipients, making it easier to find and request blood donations.

> 📱 This is a **UI-only** project with static data — no backend or database is used.

---

## 📸 Screenshots

| Login Screen | Home Screen | Donor List | Donor Detail |
|:---:|:---:|:---:|:---:|
| Hero Image + Form | Dashboard + Quick Actions | Search + Filter + Cards | Full Profile + Request |

---

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| **React Native** | 0.81.5 | Mobile app framework (Android + iOS) |
| **Expo** | SDK 54 | Development & build tool for React Native |
| **React Navigation (Stack)** | 7.7.2 | Screen-to-screen navigation |
| **React Hook Form** | 7.71.2 | Form validation (email, password, phone) |
| **NativeWind** | 4.2.2 | Tailwind CSS for React Native styling |
| **Lucide React Native** | 0.575.0 | Modern SVG icon library |
| **React Native SVG** | 15.12.1 | SVG rendering support |
| **React Native Gesture Handler** | 2.28.0 | Touch & gesture support |
| **React Native Reanimated** | 4.1.1 | Smooth animations |

---

## 📁 Project Folder Structure

```
blood-donation/
│
├── App.js                          # Entry point — app starts here
├── package.json                    # Dependencies & scripts
├── app.json                        # Expo configuration (icon, splash)
├── babel.config.js                 # Babel configuration
├── metro.config.js                 # Metro bundler config (NativeWind)
├── tailwind.config.js              # Tailwind CSS config
├── global.css                      # Tailwind CSS imports
│
├── assets/                         # Static assets (images, icons)
│   ├── blood-image-logo.jpg        # App icon & splash screen
│   ├── login/
│   │   ├── man-women.jpg           # Login page hero image
│   │   ├── man.jpg                 # Register page hero image
│   │   ├── google.png              # Google social login icon
│   │   └── facebook.png            # Facebook social login icon
│   └── home/
│       ├── doctor.jpg              # "Find Donor" card image
│       └── mans.jpg                # "Request Blood" card image
│
└── src/                            # Main source code
    │
    ├── components/                 # ♻️ Reusable UI Components
    │   ├── CustomInput.js          # Input field with validation
    │   ├── CustomButton.js         # Button with variants (primary/outline)
    │   ├── CustomDropdown.js       # Dropdown selector (Blood Group)
    │   ├── DonorCard.js            # Donor info card (used in FlatList)
    │   └── BloodDropLogo.js        # Blood drop logo component
    │
  ├── screens/                    # 📱 App Screens (Pages)
  │   ├── auth/                   # Authentication screens
  │   │   ├── Login.js            # User login
  │   │   ├── Register.js         # Registration form
  │   │   ├── ForgotPassword.js   # Password recovery
  │   │   ├── OTP.js              # OTP verification
  │   │   └── index.js            # Barrel export for auth screens
  │   ├── donor/                  # Donor screens
  │   │   ├── DonorList.js        # Searchable donor list
  │   │   ├── DonorDetail.js      # Donor profile view
  │   │   └── index.js            # Barrel export for donor screens
  │   ├── home/                   # Home/dashboard screen
  │   │   ├── Home.js             # Main dashboard
  │   │   └── index.js            # Barrel export for home screens
  │
  ├── navigation/                 # 🧭 Navigation Setup
  │   └── AppNavigator.js         # Stack Navigator with all routes
  │
  ├── data/                       # 💾 Static Data (No Backend)
  │   ├── auth/                   # Auth data
  │   │   ├── users.js            # Demo user accounts
  │   │   └── index.js            # Barrel export for auth data
  │   ├── donor/                  # Donor data
  │   │   ├── donors.js           # 24 donor profiles
  │   │   └── index.js            # Barrel export for donor data
  │   ├── home/                   # Home screen data
  │   │   ├── homeData.js         # Static dashboard data
  │   │   └── index.js            # Barrel export for home data
  │
  └── styles/                     # 🎨 Theme & Styling
    ├── colors.js               # Color constants (Red theme #E53935)
    └── globalStyles.js         # Shared StyleSheet styles
```

---

## 🔄 Navigation Flow

```
┌─────────────────────────────────────────────────────┐
│                    APP STARTS                        │
│                       ↓                              │
│               ┌──────────────┐                       │
│               │ Login Screen │ ← First screen        │
│               └──────┬───────┘                       │
│                      │                               │
│         ┌────────────┼────────────┐                  │
│         ↓            ↓            ↓                  │
│   ┌──────────┐ ┌──────────┐ ┌──────────────┐        │
│   │ Register │ │ Forgot   │ │ Home Screen  │        │
│   │ Screen   │ │ Password │ │ (Dashboard)  │        │
│   └────┬─────┘ └────┬─────┘ └──────┬───────┘        │
│        ↓            ↓              ↓                 │
│   ┌──────────┐ ┌──────────┐ ┌──────────────┐        │
│   │   OTP    │ │   OTP    │ │  Donor List  │        │
│   │  Screen  │ │  Screen  │ │   Screen     │        │
│   └────┬─────┘ └────┬─────┘ └──────┬───────┘        │
│        ↓            ↓              ↓                 │
│   Back to Login  Back to Login  ┌──────────────┐     │
│                                 │ Donor Detail │     │
│                                 │   Screen     │     │
│                                 └──────────────┘     │
└─────────────────────────────────────────────────────┘
```

---

## 📱 Screen Details

### 1. 🔐 Login Screen (`LoginScreen.js`)
- Hero image with red overlay and "BloodBank" branding
- Email/Phone input with validation
- Password input with show/hide toggle (Eye/EyeOff icon)
- "Forgot Password?" link
- Login button with authentication check
- Google & Facebook social login buttons (UI only)
- "Sign Up" link to navigate to Register screen

### 2. 📝 Register Screen (`RegisterScreen.js`)
- Hero image with "Create Account" text
- **Form Fields:**
  - Full Name (minimum 3 characters)
  - Email Address (valid email format)
  - Phone Number (+880 Bangladesh format)
  - Blood Group (dropdown: A+, A-, B+, B-, O+, O-, AB+, AB-)
  - Password (minimum 6 characters)
  - Confirm Password (must match password)
- Duplicate email check before registration
- On success → navigates to OTP verification screen

### 3. 🔑 Forgot Password Screen (`ForgotPasswordScreen.js`)
- Key icon illustration
- Email input field
- Checks if email is registered in static data
- If found → sends to OTP verification
- If not found → shows "Account Not Found" error alert

### 4. 🔢 OTP Verification Screen (`OTPScreen.js`)
- Shield icon header with description
- 4 individual input boxes with auto-focus feature
- Paste support (paste full 4-digit code at once)
- 30-second countdown timer for resend
- Resend Code button (appears after timer expires)
- Static OTP for testing: **`1234`**

### 5. 🏠 Home Screen (`HomeScreen.js`)
- **Header:** "Hello, Donor! 👋" greeting + notification bell icon
- **Search Bar:** Placeholder search (UI only)
- **Emergency Banner:** SOS button → navigates to Donor List
- **Quick Actions Grid:** Find Donor, Request Blood, Donate Now, History
- **Blood Availability:** Horizontal scroll showing 8 blood type statistics
- **Feature Cards:**
  - "Find a Donor" card with doctor image → Donor List
  - "Request Blood" card with group image
- **Nearby Donors Section:** 5 donor cards + "View All" link

### 6. 📋 Donor List Screen (`DonorListScreen.js`)
- **Header:** "Available Donors" title with total count badge (24)
- **Search Input:** Real-time filtering by name, location, blood group, phone
- **Blood Group Filter:** Horizontal scrollable chips (All, A+, A-, B+, B-...)
- **Results Counter:** Shows "X donors found" with "Clear Filter" option
- **Donor FlatList:** Renders 24 donor cards with profile images from Pexels
- **Empty State:** Shown when no donors match search/filter criteria
- **Card Press:** Navigates to Donor Detail Screen with donor data

### 7. 👤 Donor Detail Screen (`DonorDetailScreen.js`)
- **Profile Header:** Large profile photo + donor name + location + availability
- **Blood Group Badge:** Prominent blood type display (white badge on red)
- **3 Stat Cards:** Total Donations | Last Donated | Age
- **Contact Information:**
  - Phone number (tappable — opens dialer)
  - Email address (tappable — opens email client)
  - Location
- **Donation Details:** Blood group, last donation date, total donations, age
- **Action Buttons:** "Call Now" (green) + "Email" (outlined)
- **Big CTA Button:** "Request Blood" (red, full width)
- **Share:** Share donor info via alert

---

## ♻️ Reusable Components

### `CustomInput.js`
A fully-featured input component integrated with React Hook Form.
- **Icon support** — displays Lucide icon on the left side
- **Error states** — red border + error message when validation fails
- **Focus animation** — border color changes on focus
- **Password toggle** — Eye/EyeOff Lucide icons for show/hide password
- **Pressable wrapper** — uses `Pressable` + `useRef` for Android touch fix

### `CustomButton.js`
A versatile button component with multiple styles.
- **Variants:** `primary` (solid red), `outline` (white + red border), `text` (no background)
- **Loading state:** Shows ActivityIndicator spinner when loading
- **Disabled state:** Reduced opacity when disabled

### `CustomDropdown.js`
A modal-based dropdown picker for selection.
- Used for **Blood Group** selection in Registration
- Opens full-screen modal with list of options
- Integrates with React Hook Form via Controller

### `DonorCard.js`
A card component to display donor information in lists.
- **Profile image** from Pexels URL with fallback
- **Availability dot** indicator (green = available, grey = unavailable)
- **Blood group badge** (red background)
- **Location** with MapPin icon
- **Call** button (green) + **Request** button (red)
- **Chevron arrow** indicating the card is tappable

---

## 💾 Data Management

### Authentication Data (`staticUsers.js`)

Since there is no backend/database, authentication uses **in-memory static data**.

**Demo Accounts for Testing:**

| Email | Password | Name | Blood Group |
|---|---|---|---|
| `oxshipon1@gmail.com` | `123456` | Oxshipon Ahmed | A+ |
| `oxjahan@gmail.com` | `123456` | Nur Jahan | O+ |
| `test@gmail.com` | `test123` | Test User | A+ |
| `admin@gmail.com` | `admin123` | Admin | B- |
| `user@gmail.com` | `user123` | User | B+ |

**Static OTP Code:** `1234` (used for all OTP verifications)

**Exported Functions:**

| Function | What It Does |
|---|---|
| `validateLogin(email, password)` | Checks if email exists and password matches. Returns success/failure with message. |
| `findUserByEmail(email)` | Searches for a user by email or phone number. |
| `addUser(user)` | Adds a new user to the in-memory array (used during registration). |
| `isEmailRegistered(email)` | Returns true/false if email already exists (used in Forgot Password). |
| `STATIC_OTP` | The static OTP code `'1234'` for verification testing. |

### Donor Data (`donors.js`)

Contains **24 donor profiles** with realistic Bangladeshi data:

| Field | Example | Description |
|---|---|---|
| `id` | "1" | Unique identifier |
| `name` | "Rahim Ahmed" | Full name of donor |
| `bloodGroup` | "A+" | Blood type (A+, A-, B+, B-, O+, O-, AB+, AB-) |
| `age` | 25 | Age in years |
| `location` | "Dhaka, Bangladesh" | City & country |
| `phone` | "01712345678" | Bangladesh phone number |
| `email` | "rahim.ahmed@gmail.com" | Email address |
| `available` | true/false | Current availability status |
| `lastDonation` | "12 Jan 2025" | Date of last donation |
| `totalDonations` | 5 | Total number of donations made |
| `image` | Pexels URL | Profile photo from Pexels (300x300) |

---

## 🎨 Design System

### Color Theme (`colors.js`)

| Color Name | Hex Code | Usage |
|---|---|---|
| 🔴 Primary | `#E53935` | Main red theme — buttons, headers, badges |
| 🔴 Primary Dark | `#C62828` | Pressed/active button states |
| 🩷 Primary Light | `#FFCDD2` | Light red backgrounds (icon circles) |
| ⬛ Text | `#212121` | Main text color |
| ⚫ Grey | `#757575` | Secondary text, placeholders |
| 🟢 Success | `#4CAF50` | Available status, Call button |
| 🟡 Warning | `#FF9800` | Warning messages |
| 🔴 Danger | `#F44336` | Error messages, validation errors |
| ⬜ Background | `#FAFAFA` | Screen backgrounds |
| ⬜ Input BG | `#F5F5F5` | Input field backgrounds |

### Design Principles
- **Consistent padding:** 16px standard spacing, 24px for form sections
- **Border radius:** 10-14px for cards and inputs, 20-24px for chips and badges
- **Shadows:** Subtle elevation for cards (elevation: 2-3) and buttons (elevation: 4-8)
- **Typography:** Bold headings (fontWeight 700-800), regular body text (400-600)
- **Medical Red Theme:** `#E53935` used consistently across the app

---

## 🚀 How to Run the Project

### Prerequisites
- **Node.js** v18 or higher installed
- **npm** or **yarn** package manager
- **Expo Go** app installed on your Android/iOS phone
- Phone and computer connected to the **same WiFi network**

### Installation Steps

```bash
# Step 1: Clone the repository
git clone https://github.com/Nurjahanakter1/blood-donation-.git

# Step 2: Navigate to project directory
cd blood-donation

# Step 3: Install all dependencies
npm install

# Step 4: Start the Expo development server
npx expo start

# Step 5: Scan the QR code with Expo Go app on your phone
```

### PowerShell Execution Policy Fix (Windows)
If you get a script execution error in PowerShell:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npx expo start
```

### Clear Cache & Restart
If changes are not reflecting on phone:
```bash
npx expo start --clear
```

---

## 🧪 How to Test

### ✅ Login Test
1. Open the app on your phone
2. Enter email: `oxshipon1@gmail.com`
3. Enter password: `123456`
4. Tap **"Login"** button
5. You should see a ✅ success alert
6. Tap "Continue" → Home Screen appears

### ✅ Registration Test
1. Tap **"Sign Up"** on Login screen
2. Fill in: Name, Email (new), Phone (+880...), Blood Group, Password
3. Tap **"Register"** button
4. OTP Screen appears → Enter: `1234`
5. ✅ Verification complete → Back to Login

### ✅ Donor List Test
1. From Home Screen, tap **"Find Donor"** or **"View All"**
2. Try typing a name in the search bar
3. Try tapping blood group filter chips (A+, B+, O-...)
4. Tap any donor card → See full donor profile

### ✅ Donor Detail Test
1. On Donor Detail screen, tap **"Call Now"** → Shows phone alert
2. Tap **"Email"** → Shows email alert
3. Tap **"Request Blood"** → Shows request confirmation
4. Tap **Share icon** → Shows donor info

---

## 📦 Dependencies List

```json
{
  "expo": "~54.0.33",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "@react-navigation/native": "^7.1.28",
  "@react-navigation/stack": "^7.7.2",
  "react-hook-form": "^7.71.2",
  "nativewind": "^4.2.2",
  "tailwindcss": "^3.3.2",
  "lucide-react-native": "^0.575.0",
  "react-native-svg": "15.12.1",
  "react-native-gesture-handler": "~2.28.0",
  "react-native-reanimated": "~4.1.1",
  "react-native-safe-area-context": "^5.6.2",
  "react-native-screens": "~4.16.0",
  "@react-native-masked-view/masked-view": "^0.3.2",
  "babel-preset-expo": "^54.0.10",
  "expo-status-bar": "~3.0.9"
}
```

---

## 🔮 Future Scope (If Backend Added)

- [ ] Firebase / Supabase authentication integration
- [ ] Real-time donor database (Firestore / PostgreSQL)
- [ ] Push notifications for blood requests
- [ ] Google Maps integration for nearby donors
- [ ] Real-time chat between donors and recipients
- [ ] Blood request history & tracking
- [ ] Admin dashboard for donor management
- [ ] SMS OTP verification (Twilio / Firebase)
- [ ] Dark mode theme support

---

## 👩‍💻 Developer

**Nur Jahan Akter**
- GitHub: [@Nurjahanakter1](https://github.com/Nurjahanakter1)
- Repository: [blood-donation-](https://github.com/Nurjahanakter1/blood-donation-)

---

## 📄 License

This project is created for **educational purposes**.

---

> 🩸 *"Every blood donor is a hero. Donate blood, save lives!"*
