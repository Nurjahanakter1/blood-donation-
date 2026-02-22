// Login Screen - Blood Donation App
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { Mail, Lock } from 'lucide-react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import COLORS from '../../styles/colors';
import styles from '../../styles/loginStyles';
import { validateLogin } from '../../data';

const Login = ({ navigation }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLoginPress = (data) => {
    const result = validateLogin(data.email, data.password);
    if (result.success) {
      Alert.alert(
        '✅ Login Successful',
        'Welcome back! You are now logged in.',
        [{ text: 'Continue', onPress: () => navigation.navigate('Home') }]
      );
    } else if (!result.user) {
      Alert.alert(
        '❌ Account Not Found',
        'No account found. Please register first.',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        '❌ Login Failed',
        'Invalid email or password. Please try again.',
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
        {/* Hero Image Section */}
        <View style={styles.imageSection}>
          <Image
            source={require('../../../assets/login/man-women.jpg')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
          <View style={styles.imageTextContainer}>
            <Text style={styles.imageTitle}>Blood<Text style={styles.imageTitleBold}>Bank</Text></Text>
            <Text style={styles.imageSubtitle}>Donate Blood, Save Lives</Text>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue saving lives</Text>

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
                  value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(\+880|880|0)?1[3-9][0-9]{8})$/,
                  message: 'Enter a valid email or BD phone (+880...)',
                },
              }}
              icon={<Mail size={20} color={COLORS.grey} />}
            />

            <CustomInput
              control={control}
              name="password"
              label="Password"
              placeholder="Enter your password"
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

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotContainer}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <CustomButton
              title="Login"
              onPress={handleSubmit(onLoginPress)}
              style={styles.loginButton}
            />

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
                <Image
                  source={require('../../../assets/login/google.png')}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
                <Text style={styles.socialBtnText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
                <Image
                  source={require('../../../assets/login/facebook.png')}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
                <Text style={styles.socialBtnText}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Register Link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
