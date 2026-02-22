// Reset Password Screen - Blood Donation App
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
import { Lock, ArrowLeft, KeyRound } from 'lucide-react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import COLORS from '../../styles/colors';
import styles from '../../styles/resetPasswordStyles';
import { changeUserPassword } from '../../data';

const ResetPassword = ({ route, navigation }) => {
  const email = route?.params?.email || '';

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');

  const onResetPress = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      Alert.alert(
        '❌ Password Mismatch',
        'New password and confirm password do not match.',
        [{ text: 'OK' }]
      );
      return;
    }

    const result = changeUserPassword(email, data.newPassword);
    if (result.success) {
      Alert.alert(
        '✅ Password Changed',
        'Password changed successfully. Please login again.',
        [{ text: 'Login', onPress: () => navigation.navigate('Login') }]
      );
    } else {
      Alert.alert(
        '❌ Failed',
        'Something went wrong. Please try again.',
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
        <Text style={styles.title}>Create New Password 🔐</Text>
        <Text style={styles.description}>
          Your new password must be different from your previous password.
        </Text>

        {/* Form */}
        <View style={styles.formContainer}>
          <CustomInput
            control={control}
            name="newPassword"
            label="New Password"
            placeholder="Enter new password"
            secureTextEntry
            rules={{
              required: 'New password is required',
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
            placeholder="Re-enter new password"
            secureTextEntry
            rules={{
              required: 'Please confirm your password',
              validate: (value) =>
                value === newPassword || 'Passwords do not match',
            }}
            icon={<Lock size={20} color={COLORS.grey} />}
          />

          <CustomButton
            title="Reset Password"
            onPress={handleSubmit(onResetPress)}
            style={styles.resetButton}
          />
        </View>

        {/* Back to Login */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
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

export default ResetPassword;
