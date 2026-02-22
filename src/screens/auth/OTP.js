// OTP Verification Screen - Blood Donation App
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { ArrowLeft, ShieldCheck } from 'lucide-react-native';
import COLORS from '../../styles/colors';
import styles from '../../styles/otpStyles';
import { STATIC_OTP } from '../../data/auth/users';

const OTP_LENGTH = 4;

const OTP = ({ navigation, route }) => {
  const email = route?.params?.email || '';
  const flow = route?.params?.flow || 'register';
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];

    if (text.length > 1) {
      const digits = text.replace(/[^0-9]/g, '').split('').slice(0, OTP_LENGTH);
      digits.forEach((digit, i) => {
        newOtp[i] = digit;
      });
      setOtp(newOtp);
      const lastIndex = Math.min(digits.length - 1, OTP_LENGTH - 1);
      inputRefs.current[lastIndex]?.focus();
      return;
    }

    newOtp[index] = text.replace(/[^0-9]/g, '');
    setOtp(newOtp);

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
      if (flow === 'forgot_password') {
        Alert.alert(
          '✅ OTP Verified',
          'OTP verified successfully.',
          [{ text: 'Reset Password', onPress: () => navigation.navigate('ResetPassword', { email }) }]
        );
      } else {
        Alert.alert(
          '✅ OTP Verified',
          'OTP verified successfully. You can now login.',
          [{ text: 'Login', onPress: () => navigation.navigate('Login') }]
        );
      }
    } else {
      Alert.alert(
        '❌ Invalid OTP',
        'Invalid OTP. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const onResendPress = () => {
    setTimer(30);
    setOtp(new Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
    Alert.alert(
      '📩 OTP Resent',
      'A new OTP has been sent to your email/phone.',
      [{ text: 'OK' }]
    );
  };

  const isComplete = otp.every((digit) => digit !== '');

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

export default OTP;
