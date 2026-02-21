// Login Screen - Blood Donation App
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
import { Mail, Lock } from 'lucide-react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import COLORS from '../../styles/colors';
import { validateLogin } from '../../data/auth/users';

const { width } = Dimensions.get('window');

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
        '✅ Login Successful!',
        `Welcome back, ${result.user.fullName}!`,
        [{ text: 'Continue', onPress: () => navigation.navigate('Home') }]
      );
    } else {
      Alert.alert('❌ Login Failed', result.message, [{ text: 'Try Again' }]);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Hero Image
  imageSection: {
    width: width,
    height: 220,
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
    fontSize: 28,
    fontWeight: '400',
    color: COLORS.white,
    letterSpacing: 1,
  },
  imageTitleBold: {
    fontWeight: '800',
  },
  imageSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },

  // Form
  formSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.grey,
    marginBottom: 28,
  },
  formContainer: {},
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: -4,
  },
  forgotText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  loginButton: {
    marginBottom: 20,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 13,
    color: COLORS.grey,
    fontWeight: '600',
  },

  // Social Login
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.inputBg,
    borderRadius: 10,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  socialIcon: {
    width: 22,
    height: 22,
  },
  socialBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },

  // Register
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  registerText: {
    fontSize: 15,
    color: COLORS.grey,
  },
  registerLink: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: '700',
  },
});

export default Login;
