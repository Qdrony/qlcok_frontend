import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const NumberStepper = ({ initialValue = 0, min = 0, max = 100, step = 1, onValueChange }) => {
  const [value, setValue] = useState(initialValue);

  const updateValue = (newValue) => {
    if (newValue >= min && newValue <= max) {
      setValue(newValue);
      if (onValueChange) onValueChange(newValue);
    }
  };

  return (
    <View style={styles.container}>
      {/* Csökkentés (-) */}
      <TouchableOpacity onPress={() => updateValue(value - step)} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      {/* Szám beviteli mező */}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={value.toString()}
        onChangeText={(text) => updateValue(parseInt(text) || 0)}
      />

      {/* Növelés (+) */}
      <TouchableOpacity onPress={() => updateValue(value + step)} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  input: {
    width: 60,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
  },
});

export default NumberStepper;