import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import InputLayout from '../../components/layout/InputLayout';
import InputTestCustom from '../../components/Input/InputTestCustom';
import { formatDate, height, scale, width } from '../../../utils/funtions';
import { useNavigation } from '@react-navigation/native';
import authServices from '../../services/authServices';
// import { isLoading } from "expo-font";
import { showMessage, hideMessage } from 'react-native-flash-message';

const ResetPassword = ({ route }) => {
  // const [option, setOption] = useState("");
  const [date, setDate] = useState(formatDate(new Date()));
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const { phone, enteredOTP } = route?.params ?? {};

  const handleError = () => {
    if (!password) {
      showMessage({
        style: { alignItems: 'center' },
        message: 'Password Field Required',
        type: 'danger',
        position: 'top',
        statusBarHeight: scale(20),
        duration: 2500,
      });
      return true;
    }
    if (!confirmPassword) {
      showMessage({
        style: { alignItems: 'center' },
        message: 'Confirm Password Field Required',
        type: 'danger',
        position: 'top',
        statusBarHeight: scale(20),
        duration: 2500,
      });
      return true;
    }

    if (password !== confirmPassword) {
      showMessage({
        style: { alignItems: 'center' },
        message: 'Please provide same password!',
        type: 'danger',
        position: 'top',
        statusBarHeight: scale(20),
        duration: 2500,
      });
      return true;
    }
  };

  const handleResetPassword = async () => {
    const error = handleError();
    if (error) return;
    const data = {
      phone: phone,
      verification_code: enteredOTP,
      password: password,
      password_confirmation: confirmPassword,
    };
    setLoading(true);
    const res = await authServices
      .resetPassword(data)
      .then((res) => res)
      .catch((err) => err);

    console.log('reset res', res.data);

    if (res?.data.code === 200) {
      setLoading(false);
      showMessage({
        style: { alignItems: 'center' },
        message: res?.data.message,
        type: 'success',
        position: 'top',
        duration: 2500,

        statusBarHeight: scale(20),
      });
      navigation.navigate('login');
    } else {
      setLoading(false);
      showMessage({
        style: { alignItems: 'center' },
        message: res?.data.message,
        type: 'danger',
        position: 'top',
        duration: 2500,

        statusBarHeight: scale(20),
      });
    }
  };

  return (
    <InputLayout>
      <View style={{ marginTop: scale(50), marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 24,
            lineHeight: 24,
            fontWeight: '700',
            textAlign: 'center',
          }}
        >
          Reset Password
        </Text>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 24,
            fontWeight: '400',
            textAlign: 'center',
          }}
        >
          {' '}
          Update your password
        </Text>
      </View>
      <InputTestCustom
        type={'password'}
        placeholder={'Password'}
        label={'Password '}
        value={password}
        onChange={(text) => setPassword(text)}
      />
      <InputTestCustom
        type={'password'}
        placeholder={'Confirm password'}
        label={'Confirm password '}
        value={confirmPassword}
        onChange={(text) => setConfirmPassword(text)}
      />

      {/* <InputTestCustom
        type={"dropdown"}
        option={["Customer", "Seller"]}
        label={"User Type"}
        value={option}
        onChange={(text) => setOption(text)}
      /> */}

      <TouchableOpacity
        onPress={handleResetPassword}
        style={{
          backgroundColor: '#BE202E',
          height: 52,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          width: scale(320),
        }}
      >
        {loading ? (
          <ActivityIndicator
            color="white"
            size="small"
            style={styles.spinner}
          />
        ) : (
          <Text style={{ fontSize: 18, fontWeight: '400', color: '#FFFFFF' }}>
            Reset
          </Text>
        )}
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}
      ></View>
    </InputLayout>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
