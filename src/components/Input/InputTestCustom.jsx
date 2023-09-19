import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { scale } from '../../../utils/funtions';
import { AntDesign } from '@expo/vector-icons';
import CustomDatePicker from './CustomDatePicker';

const InputTestCustom = ({ label, onChange,editable, value,option, placeholder, type,keyboardType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSelectOption = (option) => {
    console.log('option: ' ,option)
    onChange(option);
    toggleDropdown();
  };

  const renderInput = () => {
    if (type === 'date') {
      return <CustomDatePicker editable={editable} onChange={onChange} value={value} />;
    } else if (type === 'password') {
      return (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={placeholder}
            secureTextEntry={!isPasswordVisible}
            onChangeText={onChange}
            value={value}
            
            style={styles.textInput}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
            <AntDesign name={isPasswordVisible ? 'eye' : 'eyeo'} size={20} color="#000" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={placeholder}
            onChangeText={onChange}
            value={value}
            keyboardType={keyboardType}
            editable={editable}
            
            style={styles.textInput}
          />
        </View>
      );
    }
  };

  const renderDropdown = () => (
    <>
      <TouchableOpacity onPress={toggleDropdown} style={styles.inputContainer}>
        <Text style={styles.dropdownValue}>{value || 'Select an option'}</Text>
        <AntDesign name={isOpen ? 'up' : 'down'} size={16} color="#000" />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownContainer}>
            {
                option.map((op,index)=><TouchableOpacity key={index} onPress={() => handleSelectOption(op)} style={styles.option}>
                <Text>{op}</Text>
              </TouchableOpacity>)
            }
          
          
        </View>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        <Text style={{ color: 'red' }}>*</Text> {label}
      </Text>
      {type === 'dropdown' ? renderDropdown() : renderInput()}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: scale(320),
    marginBottom: 8,
  },
  label: {
    fontWeight: '400',
    marginBottom: 4,
    fontSize: 16,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderColor: 'hsla(0,0%,50%,.28)',
    borderWidth: 1,
    height:scale(55),
    borderRadius:5,
    fontSize:16,
    marginBottom:15

  },
  textInput: {
    flex: 1,
    
   
  },
  dropdownValue: {
    flex: 1,
  },
  dropdownContainer: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    // borderWidth: 1,
  },
  option: {
    padding: 8,
    // borderBottomWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    margin:2,
    borderBottomColor: '#000000',
  },
});

export default InputTestCustom;
