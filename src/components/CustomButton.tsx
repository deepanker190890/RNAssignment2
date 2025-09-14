import React, { FC } from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';

// Define props interface
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle; // Optional custom styles
}

// Functional component with TypeScript
const CustomButton: FC<CustomButtonProps> = ({ title, onPress, style }) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF', // iOS-like blue
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;