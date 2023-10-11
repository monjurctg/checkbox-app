import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,Image
} from 'react-native';
import React, { useEffect, useState } from 'react';
import InputLayout from '../../components/layout/InputLayout';
import InputTestCustom from '../../components/Input/InputTestCustom';
import { formatDate, height, scale, width } from '../../../utils/funtions';
import { useNavigation } from '@react-navigation/native';
import authServices from '../../services/authServices';
// import { isLoading } from "expo-font";
import { showMessage, hideMessage } from 'react-native-flash-message';

const SiginUp = () => {
  const [phone, setPhone] = useState('');
  // const [option, setOption] = useState("");
  const [date, setDate] = useState(formatDate(new Date()));
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

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
    if (!phone) {
      showMessage({
        style: { alignItems: 'center' },
        message: 'Phone Field Required',
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

  const handleSignup = async () => {
    const error = handleError();
    if (error) return;
    const data = {
      phone: phone,
      password: password,
      password_confirmation: confirmPassword,
      is_seller: false,
    };
    setLoading(true);
    const res = await authServices
      .signup(data)
      .then((res) => res)
      .catch((err) => err);

    // console.log('res  signup ', res, data);
    if (res.status === 201) {
      setLoading(false);
      navigation.navigate('otp_verify', data);
    } else {
      // console.log(res, "res ");
      showMessage({
        style: { alignItems: 'center' },
        message: res.message,
        type: 'danger',
        position: 'top',
        duration: 2500,

        statusBarHeight: scale(20),
      });

      setLoading(false);

      if (res.data.redirect) {
        navigation.navigate(res.data.redirect, { ...res.data.user, phone });
      }
      // if (res.message) {
      //   // navigation.navigate("otp");
      //   showMessage({
      //     style:{alignItems:"center"},
      //     message: res.message,
      //     type: "success",
      //     position:"top",
      //     icon:"success",
      //     statusBarHeight:scale(30)
      //   });
      // }
    }
  };

  return (
    <View style={{alignSelf:"center",flex:1,justifyContent:"center",alignItems:"center"}}>
   <View  style={{backgroundColor:"#FFF",elevation:5,padding:10,borderRadius:10,paddingVertical:20}}>
   <Image source={require("../../../assets/logo.png")} style={{alignSelf:"center",width:200,resizeMode:"contain"}}/>
  
       
        <Text
          style={{
            fontSize: 24,
            lineHeight: 24,
            fontWeight: '400',
            textAlign: 'center',
            marginBottom:1
          }}
        >
          {' '}
          Create your free account
        </Text>
     
      <InputTestCustom
        keyboardType={'numeric'}
        placeholder={'Phone Nmuber'}
        label={'Phone Number'}
        value={phone}
        onChange={(text) => setPhone(text)}
      />
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
        onPress={handleSignup}
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
            Sign Up
          </Text>
        )}
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 14 }}>Already have an Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Text style={{ fontSize: 14, fontWeight: '600' }}>Log In</Text>
        </TouchableOpacity>
      </View>
   </View>
    </View>
  );
};

export default SiginUp;

const styles = StyleSheet.create({});
