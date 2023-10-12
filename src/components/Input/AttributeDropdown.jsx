import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Checkbox from "./Checkbox";

const AttributeDropdown = ({ title, options = [],handelChage,filterData ,handelReset}) => {
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

const entriesArray = Object.keys(filterData);
// const count = entriesArray.length;
// console.log())
  return (
    <View style={styles.container}>

    {
      entriesArray.includes(`${options[0]?.attribute_id}`) &&<View style={{height:7,width:7,backgroundColor:"red",right:5,position:"absolute",top:0,zIndex:999,borderRadius:10}}></View>


    }

     
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdown}>
        <Text style={styles.dropdownText}>
          {selectedValue ? selectedValue : title}
        </Text>
        <AntDesign name={isOpen ? "up" : "down"} size={20} color="#a09d9d" />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={()=>handelReset(options[0]?.attribute_id)} style={{position:"absolute",right:10,top:-15,backgroundColor:"red",paddingHorizontal:10,paddingVertical:3,borderRadius:20}}>
            <Text style={{color:"#FFF"}}>Reset</Text>
            </TouchableOpacity>
          {options?.map((option,index) => {
            // console.log(option)
            return (
              <View key={index}>
              
              <TouchableOpacity
                style={styles.checkBox}
                // onPress={() => handleCheckboxPress(item?.id, option?.id)}
              >
                <Checkbox
                  onValueChange={handelChage}
                  label={option?.value}
                  passingData={option}
                  filterData={filterData}
                />
             
              </TouchableOpacity>
              </View>
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
    marginTop:10,
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
