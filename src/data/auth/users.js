// Static User Data - Authentication (No backend)
// Demo accounts for testing login/register flow

const STATIC_USERS = [
  {
    id: '1',
    fullName: 'Oxshipon Ahmed',
    email: 'oxshipon1@gmail.com',
    phone: '0171234567',
    password: '123456',
    bloodGroup: 'A+',
  },
  {
    id: '2',
    fullName: 'Nur Jahan',
    email: 'oxjahan@gmail.com',
    phone: '0181234567',
    password: '123456',
    bloodGroup: 'O+',
  },
  {
    id: '3',
    fullName: 'Test User',
    email: 'test@gmail.com',
    phone: '0191234567',
    password: 'test123',
    bloodGroup: 'A+',
  },
  {
    id: '4',
    fullName: 'Admin',
    email: 'admin@gmail.com',
    phone: '0191234568',
    password: 'admin123',
    bloodGroup: 'B-',
  },
  {
    id: '5',
    fullName: 'User',
    email: 'user@gmail.com',
    phone: '0191234569',
    password: 'user123',
    bloodGroup: 'B+',
  },
];

// Simulated registered users list (new registrations will be pushed here in memory)
let registeredUsers = [...STATIC_USERS];

export const getUsers = () => registeredUsers;

export const findUserByEmail = (email) =>
  registeredUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() || u.phone === email
  );

export const addUser = (user) => {
  const newUser = {
    id: String(registeredUsers.length + 1),
    ...user,
  };
  registeredUsers.push(newUser);
  return newUser;
};

export const validateLogin = (emailOrPhone, password) => {
  const user = findUserByEmail(emailOrPhone);
  if (!user) {
    return { success: false, user: null, message: 'Account not found.' };
  }
  if (user.password !== password) {
    return { success: false, user, message: 'Incorrect password.' };
  }
  return { success: true, message: 'Login successful!', user };
};

export const isEmailRegistered = (email) => {
  return !!findUserByEmail(email);
};

// Change user password (after OTP verification)
export const changeUserPassword = (email, newPassword) => {
  const user = findUserByEmail(email);
  if (!user) {
    return { success: false, message: 'User not found.' };
  }
  user.password = newPassword;
  return { success: true, message: 'Password changed successfully.' };
};

// Static OTP for testing
export const STATIC_OTP = '1234';

export default STATIC_USERS;
