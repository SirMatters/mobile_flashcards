import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const TextButton = ({ children, onPress, style = {}, ...other }) => {
  return (
    <TouchableOpacity onPress={onPress} {...other}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: 'blue',
  },
});

export default TextButton;
