// OTP Verification Screen - Blood Donation App
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { ArrowLeft, ShieldCheck } from 'lucide-react-native';
import COLORS from '../../styles/colors';
import { STATIC_OTP } from '../../data/auth/users';

const OTP_LENGTH = 4;

const OTP = ({ navigation }) => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  // Auto-focus management
  const handleChange = (text, index) => {
    const newOtp = [...otp];

    // Handle paste of full OTP
    if (text.length > 1) {
      const digits = text.replace(/[^0-9]/g, '').split('').slice(0, OTP_LENGTH);
      digits.forEach((digit, i) => {
        newOtp[i] = digit;
      });
      setOtp(newOtp);
      // Focus last filled input
      const lastIndex = Math.min(digits.length - 1, OTP_LENGTH - 1);
      inputRefs.current[lastIndex]?.focus();
      return;
    }

    newOtp[index] = text.replace(/[^0-9]/g, '');
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
    }
  };

  const onVerifyPress = () => {
    const code = otp.join('');
    if (code === STATIC_OTP) {
      Alert.alert(
        '✅ Verified!',
        'Your account has been verified successfully. Password recovery complete!',
        [{ text: 'Go to Login', onPress: () => navigation.navigate('Login') }]
      );
    } else {
      Alert.alert(
        '❌ Invalid OTP',
        'The code you entered is incorrect. Please try again. (Hint: use 1234)',
        [{ text: 'Try Again' }]
      );
    }
  };

  const onResendPress = () => {
    setTimer(30);
    setOtp(new Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
    Alert.alert('📩 OTP Resent', 'A new verification code has been sent. Use code: 1234');
  };

  const isComplete = otp.every((digit) => digit !== '');

  // Timer countdown effect (simplified for UI)
  React.useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft size={22} color={COLORS.text} />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <ShieldCheck size={36} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>Verification Code</Text>
          <Text style={styles.subtitle}>
            We've sent a 4-digit code to your registered email/phone
          </Text>
          <Text style={styles.emailHint}>j***@gmail.com</Text>
        </View>

        {/* OTP Input Boxes */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                digit && styles.otpInputFilled,
              ]}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              textContentType="oneTimeCode"
              autoComplete="sms-otp"
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Timer & Resend */}
        <View style={styles.resendContainer}>
          {timer > 0 ? (
            <Text style={styles.timerText}>
              Resend code in{' '}
              <Text style={styles.timerBold}>00:{timer.toString().padStart(2, '0')}</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={onResendPress}>
              <Text style={styles.resendText}>Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Verify Button */}
        <CustomButton
          title="Verify & Continue"
          onPress={onVerifyPress}
          disabled={!isComplete}
          style={styles.verifyButton}
        />

        {/* Help */}
        <TouchableOpacity style={styles.helpContainer}>
          <Text style={styles.helpText}>Didn't receive the code?</Text>
          <Text style={styles.helpLink}>Try different method</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
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
  header: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 36,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.grey,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  emailHint: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 8,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 28,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: COLORS.inputBg,
    borderWidth: 2,
    borderColor: COLORS.border,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
  },
  otpInputFilled: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  timerText: {
    fontSize: 15,
    color: COLORS.grey,
  },
  timerBold: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  resendText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  verifyButton: {
    marginBottom: 24,
  },
  helpContainer: {
    alignItems: 'center',
    gap: 6,
  },
  helpText: {
    fontSize: 14,
    color: COLORS.grey,
  },
  helpLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default OTP;
