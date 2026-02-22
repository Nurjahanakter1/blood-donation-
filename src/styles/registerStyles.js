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

export default styles;
