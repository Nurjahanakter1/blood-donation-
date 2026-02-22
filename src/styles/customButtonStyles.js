import { StyleSheet } from 'react-native';
import COLORS from './colors';

const styles = StyleSheet.create({
  base: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  // Variants
  primary: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  text: {
    backgroundColor: 'transparent',
  },
  // Sizes
  size_large: {
    height: 54,
    paddingHorizontal: 24,
  },
  size_medium: {
    height: 46,
    paddingHorizontal: 20,
  },
  size_small: {
    height: 38,
    paddingHorizontal: 16,
  },
  // Text Base
  baseText: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  primaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
  textText: {
    color: COLORS.primary,
  },
  // Text Sizes
  size_large_text: {
    fontSize: 17,
  },
  size_medium_text: {
    fontSize: 15,
  },
  size_small_text: {
    fontSize: 13,
  },
  // Disabled
  disabled: {
    backgroundColor: COLORS.mediumGrey,
    borderColor: COLORS.mediumGrey,
    shadowOpacity: 0,
    elevation: 0,
  },
  disabledText: {
    color: COLORS.grey,
  },
});

export default styles;
