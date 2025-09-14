import React, { FC } from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

// Define props interface, extending TextInputProps for all native props
interface CustomInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean; // Optional for password fields
}

// Functional component with TypeScript
const CustomInput: FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false, // Default to false
  ...props // Spread other TextInput props
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize={secureTextEntry ? 'none' : 'sentences'} // No auto-capitalize for passwords
      {...props} // Pass additional props (e.g., keyboardType)
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 16,
  },
});

export default CustomInput;