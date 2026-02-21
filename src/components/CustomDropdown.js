// Reusable Dropdown Component for Blood Group selection
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Controller } from 'react-hook-form';
import COLORS from '../styles/colors';

const CustomDropdown = ({
  control,
  name,
  label,
  placeholder = 'Select an option',
  options = [],
  rules = {},
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}
          <TouchableOpacity
            style={[
              styles.selector,
              error && styles.selectorError,
            ]}
            onPress={() => setVisible(true)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.selectorText,
                !value && styles.placeholderText,
              ]}
            >
              {value || placeholder}
            </Text>
            <Text style={styles.arrow}>▼</Text>
          </TouchableOpacity>
          {error && (
            <Text style={styles.errorText}>{error.message || 'Required'}</Text>
          )}

          <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={() => setVisible(false)}
          >
            <TouchableOpacity
              style={styles.overlay}
              activeOpacity={1}
              onPress={() => setVisible(false)}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{label || 'Select'}</Text>
                <View style={styles.divider} />
                <FlatList
                  data={options}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.option,
                        value === item && styles.optionSelected,
                      ]}
                      onPress={() => {
                        onChange(item);
                        setVisible(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          value === item && styles.optionTextSelected,
                        ]}
                      >
                        {item}
                      </Text>
                      {value === item && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>
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
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.inputBg,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
    paddingHorizontal: 14,
    minHeight: 52,
  },
  selectorError: {
    borderColor: COLORS.danger,
    backgroundColor: '#FFF5F5',
  },
  selectorText: {
    fontSize: 16,
    color: COLORS.text,
  },
  placeholderText: {
    color: COLORS.grey,
  },
  arrow: {
    fontSize: 12,
    color: COLORS.grey,
  },
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    width: '100%',
    maxHeight: 400,
    paddingVertical: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  optionSelected: {
    backgroundColor: COLORS.primaryLight,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.text,
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default CustomDropdown;
