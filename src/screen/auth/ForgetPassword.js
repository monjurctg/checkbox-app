import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import InputLayout from '../../components/layout/InputLayout';
import InputTestCustom from '../../components/Input/InputTestCustom';
import { scale } from '../../../utils/funtions';
import { useNavigation } from '@react-navigation/native';
import authServices from '../../services/authServices';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleResend = async () => {
    if (!phone) {
      showMessage({
        style: { alignItems: 'center' },
        message: 'Phone Field Required',
        type: 'danger',
        position: 'top',
        statusBarHeight: scale(20),
        duration: 2500,
      });
      return;
    } else {
      const data = {
        phone: phone,
      };

      const res = await authServices
        .sendForgetPasswordOtp(data)
        .then((res) => res)
        .catch((err) => err);
      console.log('forgot password res', res);
      if (res.status === 200) {
        showMessage({
          style: { alignItems: 'center' },
          message: 'OTP Sent ',
          type: 'success',
          position: 'top',
          statusBarHeight: scale(20),
          duration: 2500,
        });
        navigation.navigate('otp_forget_password', { phone });
      }
    }
  };

  return (
    <InputLayout>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 24,
            // lineHeight: 24,
            fontWeight: '700',
            textAlign: 'center',
          }}
        >
          Forget Password
        </Text>
        <InputTestCustom
          placeholder={'Phone Nmuber'}
          label={'Phone '}
          value={phone}
          keyboardType={'numeric'}
          onChange={(text) => setPhone(text)}
        />

        <TouchableOpacity
          onPress={handleResend}
          style={{
            backgroundColor: '#BE202E',
            height: scale(45),
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
              Send Otp
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </InputLayout>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
});
