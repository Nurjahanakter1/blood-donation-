// App Navigator - Stack Navigation Setup
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import COLORS from '../styles/colors';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OTPScreen from '../screens/OTPScreen';
import HomeScreen from '../screens/HomeScreen';
import DonorListScreen from '../screens/DonorListScreen';
import DonorDetailScreen from '../screens/DonorDetailScreen';

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
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Sign Up',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          title: 'Reset Password',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OTP"
        component={OTPScreen}
        options={{
          title: 'Verify OTP',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          gestureEnabled: false, // Prevent going back to login
        }}
      />
      <Stack.Screen
        name="DonorList"
        component={DonorListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DonorDetail"
        component={DonorDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
