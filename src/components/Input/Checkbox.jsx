import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Checkbox = ({ onValueChange, value, label }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxPress = () => {
    onValueChange(value);
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={handleCheckboxPress}>
      <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
        {isChecked && ( 
          <Ionicons name="md-checkmark" style={{fontWeight:"bold"}} size={16} color="#FFF" />
        )}
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#c5c3c3',
    marginRight: 10,
    justifyContent: 'center',
    borderRadius:3,
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#0073cf',
  },
});

export default Checkbox;
