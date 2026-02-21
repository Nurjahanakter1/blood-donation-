// Reusable Custom Button Component
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import COLORS from '../styles/colors';

const CustomButton = ({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'outline' | 'text'
  size = 'large',       // 'large' | 'medium' | 'small'
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.baseText,
    styles[`${variant}Text`],
    styles[`size_${size}_text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? COLORS.white : COLORS.primary}
          size="small"
        />
      ) : (
        <>
          {icon && icon}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

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

export default CustomButton;
