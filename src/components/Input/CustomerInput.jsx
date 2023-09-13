import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const CustomerInput = ({ title, value, setValue, placeholder, editable }) => {
  const handleInputChange = (text) => {
    setValue(text);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        editable={editable}
        onChangeText={handleInputChange}
        placeholder={placeholder}
        value={value}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    padding: 10,
    fontSize: 14,
    color: "#58595B",
  },
});

export default CustomerInput;
