// ─── Unified Data Export ─────────────────────────────────────────
// Import everything from one place:
//   import { validateLogin, DONORS, QUICK_ACTIONS } from '../../data';

// Auth Data
export {
  default as STATIC_USERS,
  getUsers,
  findUserByEmail,
  addUser,
  validateLogin,
  isEmailRegistered,
  changeUserPassword,
  STATIC_OTP,
} from './auth/users';

// Donor Data
export { default as DONORS, BLOOD_GROUPS } from './donor/donors';

// Home Data
export { QUICK_ACTIONS, STATIC_DONORS, BLOOD_STATS } from './home/homeData';
