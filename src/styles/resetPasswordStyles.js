import { StyleSheet } from 'react-native';
import COLORS from './colors';

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
    fontSize: 24,
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
  resetButton: {
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

export default styles;
