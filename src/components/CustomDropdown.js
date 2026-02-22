// Reusable Dropdown Component for Blood Group selection
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Controller } from 'react-hook-form';
import styles from '../styles/customDropdownStyles';

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

export default CustomDropdown;
