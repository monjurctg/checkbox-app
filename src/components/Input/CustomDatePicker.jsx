import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AntDesign } from '@expo/vector-icons';
import { scale } from '../../../utils/funtions';

const CustomDatePicker = ({ onChange ,value,editable}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);


  const showDatePicker = () => {
    if(!editable) return
    setDatePickerVisible(true);
    // alert(isDatePickerVisible?"TRue":"false")

  };

  // const hideDatePicker = () => {
  //   setDatePickerVisible(false);
  // };

  const handleConfirm = (date) => {
    if (date) {
      setSelectedDate(date);
      onChange(date.toISOString().split('T')[0]); 
      setDatePickerVisible(false);

    }
    // setDatePickerVisible(false);

  };

  const handleCancel = () => {
    // alert(isDatePickerVisible?"TRue":"FA")
    setDatePickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
        <TextInput
          placeholder="Select a date"
          value={value?value:selectedDate.toDateString()}
          style={styles.textInput}
          editable={false}
        />
        <AntDesign name="calendar" size={20} color="#000" />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"

        date={selectedDate}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        // onHide={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 4,
    height:scale(45)
  },
  textInput: {
    flex: 1, 
    marginLeft: 8,
    color:"black",
    // fontWeight:"600"
  },
});

export default CustomDatePicker;
