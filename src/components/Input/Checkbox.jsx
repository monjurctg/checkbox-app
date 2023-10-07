import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

const Checkbox = ({ onValueChange, value, label, passingData, from, filterData }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxPress = (data) => {
    console.log(data,"v")
    onValueChange(data);
    if (from === "colors") {
      if (filterData.includes(data.code)) {

        setIsChecked(false);
      }
      else {
        setIsChecked(true)
      }
    }

  };

  let CheckboxData = ""
  if(from=="colors"){
    CheckboxData= <TouchableOpacity style={styles.checkboxContainer} onPress={() => handleCheckboxPress(passingData)}>
    <View style={[styles.checkbox, filterData.includes(passingData.code) && styles.checkedCheckbox]}>
      {filterData.includes(passingData.code) && (
        <Ionicons name="md-checkmark" style={{ fontWeight: "bold" }} size={16} color="#FFF" />
      )}
    </View>
    <Text>{label}</Text>
   <View style={{ height: 15, width: 15, borderRadius: 10, backgroundColor: label?.toLowerCase(), marginLeft: 20, borderWidth: 1 }}></View>
  </TouchableOpacity>
  }
  else if(from=="brand"){
    CheckboxData =  <TouchableOpacity style={styles.checkboxContainer} onPress={() => handleCheckboxPress(passingData)}>
    <View style={[styles.checkbox, filterData.includes(passingData.id ) && styles.checkedCheckbox]}>
      {filterData.includes(passingData.id )&& (
        <Ionicons name="md-checkmark" style={{ fontWeight: "bold" }} size={16} color="#FFF" />
      )}
    </View>
    <Text>{label}</Text>

  </TouchableOpacity>
  }

  else if(from=="category"){
    CheckboxData =  <TouchableOpacity style={styles.checkboxContainer} onPress={() => handleCheckboxPress(passingData)}>
    {/* <View style={[styles.radio, isChecked && styles.checkedCheckbox]}>
      {filterData.includes(passingData.id )&& (
        <Ionicons name="md-checkmark" style={{ fontWeight: "bold" }} size={16} color="#FFF" />
      )}
    </View> */}
    <Image source={{uri:passingData?.icon_path}} style={{height:20,width:20}}/>
    <Text>{label}</Text>

  </TouchableOpacity>
  }
  else{
    CheckboxData =  <TouchableOpacity style={styles.checkboxContainer} onPress={() => handleCheckboxPress(passingData)}>
    <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
      {isChecked && (
        <Ionicons name="md-checkmark" style={{ fontWeight: "bold" }} size={16} color="#FFF" />
      )}
    </View>
    <Text>{label}</Text>
    {from == "colors" && <View style={{ height: 15, width: 15, borderRadius: 10, backgroundColor: label?.toLowerCase(), marginLeft: 20, borderWidth: 1 }}></View>}
  </TouchableOpacity>
  }
 

  return (
    <>
    {CheckboxData}
    </>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap:10,
    marginLeft:20
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#c5c3c3',
    marginRight: 10,
    justifyContent: 'center',
    borderRadius: 3,
    alignItems: 'center',
  },
  radio: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: '#c5c3c3',
    marginRight: 10,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#0073cf',
  },
});

export default React.memo(Checkbox);
