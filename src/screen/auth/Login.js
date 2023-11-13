import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,Image
} from "react-native";
import React, { useState, useContext } from "react";
import InputLayout from "../../components/layout/InputLayout";
import InputTestCustom from "../../components/Input/InputTestCustom";
import { height, scale, width } from "../../../utils/funtions";
import { useNavigation } from "@react-navigation/native";
import authServices from "../../services/authServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { CheckboxContext } from "../../context/CheckboxProvider";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../redux/reducers/authSlice";
import { useFonts } from "expo-font";

const Login = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const[buttonLoading,setButtonLoading]=useState(false)

  const handleLogin = async () => {
  
    const data = {
      phone,
      password,
      user_type: "customer",
    };

    if (!phone) {
      showMessage({
        style: { alignItems: "center" },
        message: "Phone Field Required",
        type: "danger",
        position: "top",
        statusBarHeight: scale(20),
        duration: 2500,
      });
      return;
    }
    if (!password) {
      showMessage({
        style: { alignItems: "center" },
        message: "Name Field Required",
        type: "danger",
        position: "top",
        statusBarHeight: scale(20),
        duration: 2500,
      });
      return;
    }
    try{
      setButtonLoading(true)
      const res = await authServices
      .login(data)
      .then((res) => res)
      .catch((err) => err);
   
      if (res.status === 200) {
       
        await AsyncStorage.setItem('token', res.data?.data?.access_token);
        if (res.data?.data?.access_token) {
          const res = await authServices.getUserinfo();
          // console.log(res.data,"fjdjf")
          if (res.status == 200) {
           
            dispatch(setUser(res.data.data));
            dispatch(setAuth(true));
            // setLoading(false);
          } 
        }
        // setButtonLoading(false)
        dispatch(setAuth(true));
        showMessage({
          style: { alignItems: 'center' },
          message: res.data.message,
          type: 'success',
          position: 'top',
          duration: 2500,
          statusBarHeight: scale(20),
        });
        navigation.navigate('home');
      } else {
        // setAuth(false)
        //otp_verify

        setLoading(false);
        // setButtonLoading(false)

        
        if (res?.data?.data?.redirect === 'otp_verify') {
          showMessage({
            style: { alignItems: 'center' },
            message: res.message ? res.message : 'Login field try again',
            type: 'danger',
            position: 'top',
            duration: 2500,
            statusBarHeight: scale(20),
          });
          navigation.navigate(res?.data?.data?.redirect, {
            ...res.data.user,
            phone,
          });
        } else {
          // console.log('res.data: ', res);
        // setButtonLoading(false)

          if (res.data.redirect) {
            showMessage({
              style: { alignItems: 'center' },
              message: res?.message,
              type: 'danger',
              position: 'top',
              duration: 2500,
              statusBarHeight: scale(20),
            });
            // console.log('res.data.redirect', res.data.redirect);
            navigation.navigate(res.data.redirect, {
              ...res.data.user,
              phone,
            });
          } else if (res?.message === 'User not found') {
            showMessage({
              style: { alignItems: 'center' },
              message: res?.message ? res?.message : 'Login field try again',
              type: 'danger',
              position: 'top',
              duration: 2500,
              statusBarHeight: scale(20),
            });
          }
        }
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setButtonLoading(false)
    }

 
    
  };

  return (
    <View style={{alignSelf:"center",justifyContent:"center",alignItems:"center",flex:1,width:200}}> 
 <View style={{backgroundColor:"#FFF",elevation:1,padding:10,paddingVertical:30,borderRadius:10,width:scale(310)}}>
   <Image source={require("../../../assets/logo.png")} style={{alignSelf:"center",width:200,resizeMode:"contain"}}/>

        <Text style={{ fontSize: 24, fontWeight: "400",textAlign: "center", fontFamily:"RR"}}>
          Welcome Back
        </Text>
 
      <InputTestCustom
        placeholder={"Phone Number"}
        label={"Phone "}
        value={phone}
        keyboardType={"numeric"}
        onChange={(text) => setPhone(text)}
      />

      <InputTestCustom
        type={"password"}
        placeholder={"Password"}
        label={"Password "}
        value={password}
        onChange={(text) => setPassword(text)}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#BE202E",
          height: scale(45),
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          // width: scale(320),
        }}
      >
        {buttonLoading ? (
          <ActivityIndicator
            color="white"
            size="small"
            style={styles.spinner}
          />
        ) : (
          <Text style={{ fontSize: 18, fontWeight: "500", color: "#FFFFFF",fontFamily:"RM" }}>
            Log In
          </Text>
        )}
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          // justifyContent: "flex-end",
          marginTop: 10,
          marginBottom:20
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("forget_password")}
        >
          <Text
            style={{
              // fontWeight: "600",
              fontSize: 14,
              fontFamily:"RR"
              // color: "red",
              // fontWeight: "500",
            }}
          >
            {" "}
            Forget your Password?
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          // marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 14,fontFamily:"RM" }}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
          <Text style={{  fontSize: 14,color:"#BE202E",fontFamily:"RB" }}> Sign Up</Text>
        </TouchableOpacity>
      </View>
 </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
