// Reusable Custom Input Component with React Hook Form support
import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
} from 'react-native';
import { Controller } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react-native';
import COLORS from '../styles/colors';
import styles from '../styles/customInputStyles';

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
  const inputRef = useRef(null);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}
          <Pressable
            style={[
              styles.inputWrapper,
              isFocused && styles.inputWrapperFocused,
              error && styles.inputWrapperError,
              !editable && styles.inputWrapperDisabled,
            ]}
            onPress={() => {
              if (editable && inputRef.current) {
                inputRef.current.focus();
              }
            }}
          >
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <TextInput
              ref={inputRef}
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
              autoCorrect={false}
            />
            {secureTextEntry && (
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                hitSlop={8}
              >
                {showPassword ? (
                  <EyeOff size={20} color={COLORS.grey} />
                ) : (
                  <Eye size={20} color={COLORS.grey} />
                )}
              </Pressable>
            )}
          </Pressable>
          {error && (
            <Text style={styles.errorText}>{error.message || 'Required'}</Text>
          )}
        </View>
      )}
    />
  );
};

export default CustomInput;
