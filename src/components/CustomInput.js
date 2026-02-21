// Reusable Custom Input Component with React Hook Form support
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Controller } from 'react-hook-form';
import COLORS from '../styles/colors';

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  rules = {},
  icon,
  multiline = false,
  editable = true,
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}
          <View
            style={[
              styles.inputWrapper,
              isFocused && styles.inputWrapperFocused,
              error && styles.inputWrapperError,
              !editable && styles.inputWrapperDisabled,
            ]}
          >
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <TextInput
              style={[
                styles.input,
                icon && styles.inputWithIcon,
                multiline && styles.multiline,
              ]}
              placeholder={placeholder}
              placeholderTextColor={COLORS.grey}
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              onFocus={() => setIsFocused(true)}
              secureTextEntry={secureTextEntry && !showPassword}
              keyboardType={keyboardType}
              multiline={multiline}
              editable={editable}
              maxLength={maxLength}
              autoCapitalize="none"
            />
            {secureTextEntry && (
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Text style={styles.eyeText}>
                  {showPassword ? '🙈' : '👁️'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {error && (
            <Text style={styles.errorText}>{error.message || 'Required'}</Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGrey,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
    paddingHorizontal: 14,
    minHeight: 52,
  },
  inputWrapperFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  inputWrapperError: {
    borderColor: COLORS.danger,
    backgroundColor: '#FFF5F5',
  },
  inputWrapperDisabled: {
    backgroundColor: COLORS.mediumGrey,
    opacity: 0.7,
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 12,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  eyeButton: {
    padding: 8,
    marginLeft: 4,
  },
  eyeText: {
    fontSize: 18,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default CustomInput;
