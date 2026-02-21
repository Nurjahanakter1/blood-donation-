// Home Screen Static Data - Extracted for clean code organization
import {
  UserSearch,
  Droplets,
  HandHeart,
  ClipboardList,
} from 'lucide-react-native';

// ─── Quick Actions ───────────────────────────────────────────────
export const QUICK_ACTIONS = [
  { id: '1', title: 'Find Donor', Icon: UserSearch, color: '#E53935' },
  { id: '2', title: 'Request Blood', Icon: Droplets, color: '#1E88E5' },
  { id: '3', title: 'Donate Now', Icon: HandHeart, color: '#43A047' },
  { id: '4', title: 'History', Icon: ClipboardList, color: '#FB8C00' },
];

// ─── Nearby Donors (Static) ─────────────────────────────────────
export const STATIC_DONORS = [
  {
    id: '1',
    name: 'Hasan Khan',
    bloodGroup: 'A+',
    location: 'Cumila Bangladesh',
    lastDonated: '2 months ago',
    avatar: '👨',
    available: true,
  },
  {
    id: '2',
    name: 'Umme Hani ',
    bloodGroup: 'O+',
    location: 'Nokhali Bangladesh',
    lastDonated: '1 month ago',
    avatar: '👩',
    available: true,
  },
  {
    id: '3',
    name: 'Rahat Chowdhury',
    bloodGroup: 'B+',
    location: 'khulan Bangladesh',
    lastDonated: '3 months ago',
    avatar: '👨',
    available: false,
  },
  {
    id: '4',
    name: 'Nusrat Jahan',
    bloodGroup: 'AB-',
    location: 'Chittogong Bangladesh',
    lastDonated: '2 weeks ago',
    avatar: '👩',
    available: true,
  },
  {
    id: '5',
    name: 'Reshima Akter',
    bloodGroup: 'O-',
    location: 'Narayanganj Bangladesh',
    lastDonated: '6 months ago',
    avatar: '👨',
    available: true,
  },
];

// ─── Blood Availability Stats ────────────────────────────────────
export const BLOOD_STATS = [
  { type: 'A+', units: 24 },
  { type: 'B+', units: 18 },
  { type: 'O+', units: 32 },
  { type: 'AB+', units: 8 },
  { type: 'A-', units: 12 },
  { type: 'B-', units: 6 },
  { type: 'O-', units: 15 },
  { type: 'AB-', units: 4 },
];
