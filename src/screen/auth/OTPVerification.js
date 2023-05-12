import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { scale, width } from "../../../utils/funtions";
import InputLayout from "../../components/layout/InputLayout";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import authServices from "../../services/authServices";

const OTPVerification = ({ route }) => {
  const [otp, setOTP] = useState(["", "", "", ""]);
  const otpInputs = useRef([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { phone } = route.params??{};

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
      console.log(otpInputs.current[index - 1].focus());

      otpInputs.current[index - 1].focus();
    } else if (index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleOTPVerification = async () => {
    // const enteredOTP = otp.join('');

    // // Implement your custom OTP verification logic here
    // if (enteredOTP === '1234') {
    //   Alert.alert('Success', 'OTP verified successfully!');
    // } else {
    //   Alert.alert('Error', 'Invalid OTP. Please try again.');
    // }
    const enteredOTP = otp.join("");
    if (!enteredOTP || enteredOTP.length !== 4) {
      // setLoading(false)
      showMessage({
        style: { alignItems: "center" },
        message: "Enter your OTP",
        type: "danger",
        position: "top",
        statusBarHeight: scale(20),
        duration: 2500,
      });
      return true;
    }

    const data = {
      phone: phone,
      verification_code: enteredOTP,
    };
    setLoading(true);

    const res = await authServices
      .confirmCode(data)
      .then((res) => res)
      .catch((err) => err);
    if (res.status === 200) {
      setLoading(false);
      navigation.navigate("otp_verify");
    } else {
      setLoading(false);

      showMessage({
        style: { alignItems: "center" },
        message: res.message,
        type: "danger",
        position: "top",
        statusBarHeight: scale(20),
      });
    }
  };

  const handleResend = async () => {
    const data = {
      phone: phone,
    };

    const res = await authServices
      .resendCode(data)
      .then((res) => res)
      .catch((err) => err);
    console.log(res, "res rended code");
    if (res.status === 200) {
      showMessage({
        style: { alignItems: "center" },
        message: "OTP ",
        type: "success",
        position: "top",
        statusBarHeight: scale(20),
        duration: 2500,
      });
    }
  };

  return (
    <InputLayout>
      <View style={styles.container}>
        {/* icon */}

        {/*  */}

        <View style={{ marginBottom: 20 }}>
          <Text style={styles.title}>Phone Number </Text>
          <Text style={styles.title}>Verification </Text>
          <Text
            style={{
              marginTop: 10,
              color: "#667085",
              fontSize: 14,
              fontWeight: "400",
            }}
          >
            Enter the verification code sent to your registered mobile number
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            columnGap: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600" }}>50s</Text>
          <Text style={{ fontSize: 14, fontWeight: "400" }}>reminig</Text>
        </View>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              onChangeText={(value) => handleOTPChange(value, index)}
              value={digit}
              maxLength={1}
              keyboardType="numeric"
              ref={(ref) => (otpInputs.current[index] = ref)}
              autoFocus={index === 0}
              // secureTextEntry
            />
          ))}
        </View>
        {/* <Button title="Verify OTP"  onPress={handleOTPVerification} /> */}
        <TouchableOpacity
          onPress={handleOTPVerification}
          style={{
            backgroundColor: "#BE202E",
            height: scale(45),
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            width: scale(300),
          }}
        >
          {loading ? (
            <ActivityIndicator
              color="white"
              size="small"
              style={styles.spinner}
            />
          ) : (
            <Text style={{ fontSize: 18, fontWeight: "400", color: "#FFFFFF" }}>
              Verify
            </Text>
          )}
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            gap: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Didn’t receive the OTP?</Text>
          {/* <Button title="Click to resend" onPress={handleResend} /> */}
          <TouchableOpacity onPress={handleResend}>
            <Text style={{ fontWeight: "600" }}>Click to resend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </InputLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: scale(100),
    // justifyContent: 'center',
    alignItems: "center",
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    // marginBottom: 20,
    alignSelf: "center",
    // width:'50%',
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 20,
    // marginTop:50
  },
  otpInput: {
    width: scale(65),
    height: scale(60),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EF405E",
    shadowColor: "#101828",
    fontWeight: "700",
    color: "#EF405E",
  },
});

export default OTPVerification;
