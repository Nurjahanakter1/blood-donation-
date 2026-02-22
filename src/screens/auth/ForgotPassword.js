// Forgot Password Screen - Blood Donation App
import React from 'react';
import {
  View,
  Text,
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
import styles from '../../styles/forgotPasswordStyles';
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
        '📩 OTP Sent',
        'Password reset OTP has been sent to your email.',
        [{ text: 'Enter OTP', onPress: () => navigation.navigate('OTP', { email: data.email, flow: 'forgot_password' }) }]
      );
    } else {
      Alert.alert(
        '❌ User Not Found',
        'No user found with this email or mobile number.',
        [{ text: 'OK' }]
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

export default ForgotPassword;
