import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type CustomCardProps = {
  title: string | null;
  description?: string | null;
  onPress?: () => void;
  children?: React.ReactNode;
};

const CustomCard: React.FC<CustomCardProps> = ({ title, description, onPress, children }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        onPress && pressed ? { opacity: 0.7 } : null
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});

export default CustomCard;