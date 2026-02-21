// Register Screen - Blood Donation App
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { User, Phone, Lock, ShieldCheck, Mail } from 'lucide-react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomDropdown from '../../components/CustomDropdown';
import COLORS from '../../styles/colors';
import { addUser, findUserByEmail } from '../../data/auth/users';

const { width } = Dimensions.get('window');
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const Register = ({ navigation }) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      bloodGroup: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onRegisterPress = (data) => {
    // Check if email already exists
    const existingUser = findUserByEmail(data.email);
    if (existingUser) {
      Alert.alert(
        '⚠️ Already Registered',
        'This email is already registered. Please login instead.',
        [{ text: 'Go to Login', onPress: () => navigation.goBack() }]
      );
      return;
    }

    // Add new user to static list
    const newUser = addUser({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      bloodGroup: data.bloodGroup,
    });

    Alert.alert(
      '🎉 Registration Successful!',
      `Welcome ${data.fullName}! Your account has been created. Please verify your OTP.`,
      [{ text: 'Verify OTP', onPress: () => navigation.navigate('OTP') }]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        {/* Hero Image */}
        <View style={styles.imageSection}>
          <Image
            source={require('../../../assets/login/man.jpg')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
          <View style={styles.imageTextContainer}>
            <Text style={styles.imageTitle}>Create Account</Text>
            <Text style={styles.imageSubtitle}>
              Join our community of life savers
            </Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <CustomInput
            control={control}
            name="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            rules={{
              required: 'Full name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters',
              },
            }}
            icon={<User size={20} color={COLORS.grey} />}
          />

          <CustomInput
            control={control}
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            keyboardType="email-address"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Enter a valid email address',
              },
            }}
            icon={<Mail size={20} color={COLORS.grey} />}
          />

          <CustomInput
            control={control}
            name="phone"
            label="Phone Number"
            placeholder="+880 1XXXXXXXXX"
            keyboardType="phone-pad"
            maxLength={14}
            rules={{
              required: 'Phone number is required',
              pattern: {
                value: /^(\+880|880|0)?1[3-9][0-9]{8}$/,
                message: 'Enter a valid BD number (e.g. +8801703059461)',
              },
            }}
            icon={<Phone size={20} color={COLORS.grey} />}
          />

          <CustomDropdown
            control={control}
            name="bloodGroup"
            label="Blood Group"
            placeholder="Select your blood group"
            options={BLOOD_GROUPS}
            rules={{ required: 'Blood group is required' }}
          />

          <CustomInput
            control={control}
            name="password"
            label="Password"
            placeholder="Create a strong password"
            secureTextEntry
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
            icon={<Lock size={20} color={COLORS.grey} />}
          />

          <CustomInput
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Re-enter your password"
            secureTextEntry
            rules={{
              required: 'Please confirm your password',
              validate: (value) =>
                value === password || 'Passwords do not match',
            }}
            icon={<Lock size={20} color={COLORS.grey} />}
          />

          {/* Terms */}
          <Text style={styles.termsText}>
            By signing up, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>

          {/* Register Button */}
          <CustomButton
            title="Create Account"
            onPress={handleSubmit(onRegisterPress)}
            style={styles.registerButton}
          />
        </View>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  // Hero Image
  imageSection: {
    width: width,
    height: 200,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(229, 57, 53, 0.55)',
  },
  imageTextContainer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
  },
  imageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 4,
  },
  imageSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  termsText: {
    fontSize: 13,
    color: COLORS.grey,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  termsLink: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  registerButton: {
    marginBottom: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  loginText: {
    fontSize: 15,
    color: COLORS.grey,
  },
  loginLink: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: '700',
  },
});

export default Register;
