import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Checkbox from "./Checkbox";

const AttributeDropdown = ({ title, options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
//   console.log(options, "options");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  //   const options = [
  //     { label: 'Option 1', value: 'option1' },
  //     { label: 'Option 2', value: 'option2' },
  //     { label: 'Option 3', value: 'option3' },
  //   ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdown}>
        <Text style={styles.dropdownText}>
          {selectedValue ? selectedValue : title}
        </Text>
        <AntDesign name={isOpen ? "up" : "down"} size={20} color="#a09d9d" />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          {options?.map((option) => {
            return (
              <TouchableOpacity
                key={option?.id}
                style={styles.checkBox}
                // onPress={() => handleCheckboxPress(item?.id, option?.id)}
              >
                <Checkbox
                  onValueChange={(data) => console.log(data)}
                  label={option?.value}
                />
                <Text></Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingHorizontal:5
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#e9e3e3",
    borderRadius: 5,
    elevation:2,
    backgroundColor: "#fafafa",
  },
  dropdownText: {
    flex: 1,
    marginRight: 10,
  },
  optionsContainer: {
    // position: 'absolute',
    // top: '100%',
    // left: 0,
    // right: 0,
    zIndex: 1,
    // backgroundColor: '#fafafa',
    // borderWidth: 1,
    // borderColor: 'gray',
    // borderRadius: 5,
    marginTop: 20,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
  },
  checkBoxes: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  checkBox: {
    marginRight: 10,
    marginBottom: 10,
    flexDirection: "row",
  },
  viewMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 6,
  },
  smallText: {
    fontSize: 12,
    marginLeft: 20,
  },
  icon: {
    width: 12,
    height: 6,
  },
});

export default AttributeDropdown;
