// Forgot Password Screen - Blood Donation App
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import COLORS from '../../styles/colors';
import { isEmailRegistered } from '../../data/auth/users';

const ForgotPassword = ({ navigation }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSendOTP = (data) => {
    const exists = isEmailRegistered(data.email);
    if (exists) {
      Alert.alert(
        '✅ OTP Sent!',
        `A verification code has been sent to ${data.email}. Use code: 1234`,
        [{ text: 'Enter OTP', onPress: () => navigation.navigate('OTP') }]
      );
    } else {
      Alert.alert(
        '❌ Account Not Found',
        'No account found with this email/phone. Please check and try again.',
        [{ text: 'Try Again' }]
      );
    }
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
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft size={22} color={COLORS.text} />
        </TouchableOpacity>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.iconCircle}>
            <KeyRound size={42} color={COLORS.primary} />
          </View>
        </View>

        {/* Header */}
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.description}>
          Don't worry! Enter the email address or phone number associated with
          your account. We'll send you a verification code.
        </Text>

        {/* Form */}
        <View style={styles.formContainer}>
          <CustomInput
            control={control}
            name="email"
            label="Email or Phone"
            placeholder="Enter your email or phone"
            keyboardType="email-address"
            rules={{
              required: 'Email or phone is required',
              pattern: {
                value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[0-9]{10})$/,
                message: 'Enter a valid email or 10-digit phone',
              },
            }}
              icon={<Mail size={20} color={COLORS.grey} />}
          />

          <CustomButton
            title="Send Verification Code"
            onPress={handleSubmit(onSendOTP)}
            style={styles.sendButton}
          />
        </View>

        {/* Back to Login */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backToLogin}
        >
          <Text style={styles.backToLoginText}>
            ← Back to <Text style={styles.backToLoginLink}>Login</Text>
          </Text>
        </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  backButton: {
    marginTop: 50,
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: COLORS.grey,
    lineHeight: 23,
    marginBottom: 32,
  },
  formContainer: {},
  sendButton: {
    marginTop: 8,
  },
  backToLogin: {
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 10,
  },
  backToLoginText: {
    fontSize: 15,
    color: COLORS.grey,
  },
  backToLoginLink: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});

export default ForgotPassword;
