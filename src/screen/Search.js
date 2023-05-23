import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InputLayout from "../components/layout/InputLayout";

const Search = () => {
  const [searchText, setSearchText] = useState("");

  const handleClearSearch = () => {
    setSearchText("");
  };

  return (
    <InputLayout>
      <View style={styles.container}>
        <Ionicons name="search" size={24} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch}>
            <Ionicons
              name="close"
              size={24}
              color="#999"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
    </InputLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    color: "#000",
    height:40
  },
});

export default Search;
