// Blood Donation App - Global Styles
import { StyleSheet } from 'react-native';
import COLORS from './colors';

const globalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Padding
  screenPadding: {
    paddingHorizontal: 16,
  },
  padding16: {
    padding: 16,
  },

  // Card
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  // Typography
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  body: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
  caption: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  link: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },

  // Shadows
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
});

export default globalStyles;
