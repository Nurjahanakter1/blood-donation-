// App Navigator - Stack Navigation Setup
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import COLORS from '../styles/colors';

// Auth Screens
import { Login, Register, ForgotPassword, OTP, ResetPassword } from '../screens/auth';
// Home Screen
import { Home } from '../screens/home';
// Donor Screens
import { DonorList, DonorDetail } from '../screens/donor';

const Stack = createStackNavigator();

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: COLORS.white,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTintColor: COLORS.text,
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: 18,
  },
  headerBackTitleVisible: false,
  cardStyle: {
    backgroundColor: COLORS.white,
  },
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={defaultScreenOptions}
    >
      {/* Auth Flow */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Sign Up',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: 'Reset Password',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OTP"
        component={OTP}
        options={{
          title: 'Verify OTP',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          title: 'Reset Password',
          headerShown: false,
        }}
      />

      {/* Main App */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          gestureEnabled: false, // Prevent going back to login
        }}
      />

      {/* Donor Flow */}
      <Stack.Screen
        name="DonorList"
        component={DonorList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DonorDetail"
        component={DonorDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
