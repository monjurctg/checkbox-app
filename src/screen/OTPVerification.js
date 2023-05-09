import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { scale, width } from '../../utils/funtions';
import InputLayout from '../components/layout/InputLayout';

const OTPVerification = () => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const otpInputs = useRef([]);

//   const handleOTPChange = (value, index) => {
//     const newOTP = [...otp];
//     newOTP[index] = value;
//     setOTP(newOTP);

//     if (value && index < otpInputs.current.length - 1) {
//       otpInputs.current[index + 1].focus();
//     }
//   };

const handleOTPChange = (value, index) => {
    const newOTP = [...otp];
    
    newOTP[index] = value;
    setOTP(newOTP);
  
    if (!value && index > 0) {
    console.log(otpInputs.current[index-1].focus())

      otpInputs.current[index - 1].focus();
    } else if (index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };
   

  const handleOTPVerification = () => {
    const enteredOTP = otp.join('');

    // Implement your custom OTP verification logic here
    if (enteredOTP === '1234') {
      Alert.alert('Success', 'OTP verified successfully!');
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  return (
    <InputLayout>
     <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            onChangeText={value => handleOTPChange(value, index)}
            value={digit}
            maxLength={1}
            keyboardType="numeric"
            ref={ref => (otpInputs.current[index] = ref)}
            autoFocus={index === 0}
            // secureTextEntry
          />
        ))}
      </View>
      <Button title="Verify OTP"  onPress={handleOTPVerification} />
    </View>
    </InputLayout>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginBottom: 20,
  },
  otpInput: {
    width: scale(60),
    height: scale(60),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical:10,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EF405E',
    shadowColor: '#101828',
    fontWeight:"700",
    color:"#EF405E"

  },
});

export default OTPVerification;
