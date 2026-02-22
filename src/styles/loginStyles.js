import { StyleSheet, Dimensions } from 'react-native';
import COLORS from './colors';

const { width } = Dimensions.get('window');

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

export default styles;
