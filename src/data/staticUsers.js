// Static temporary user data for UI testing (No backend)
// These are demo accounts for testing login/register flow

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
    id: '3',
    fullName: 'Admin',
    email: 'admin@gmail.com',
    phone: '0191234567',
    password: 'admin123',
    bloodGroup: 'B-',
  },
  {
    id: '3',
    fullName: 'User',
    email: 'user@gmail.com',
    phone: '0191234567',
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
    return { success: false, message: 'Account not found! Please check your email or phone.' };
  }
  if (user.password !== password) {
    return { success: false, message: 'Incorrect password! Please try again.' };
  }
  return { success: true, message: 'Login successful!', user };
};

export const isEmailRegistered = (email) => {
  return !!findUserByEmail(email);
};

// Static OTP for testing
export const STATIC_OTP = '1234';

export default STATIC_USERS;
