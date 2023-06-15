import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState,useContext } from "react";
import InputLayout from "../../components/layout/InputLayout";
import InputTestCustom from "../../components/Input/InputTestCustom";
import { height, scale, width } from "../../../utils/funtions";
import { useNavigation } from "@react-navigation/native";
import authServices from "../../services/authServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { CheckboxContext } from "../../context/CheckboxProvider";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/reducers/authSlice";

const Login = () => {
  // const {setAuth} = useContext(CheckboxContext);
  const dispatch = useDispatch()

  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  // const [option, setOption] = useState("");
  const [loading,setLoading]=useState(false)
  const navigation = useNavigation();


  const handleLogin = async()=>{
    const data ={
        phone,password, user_type: "customer",
    }
   
    if (!phone) {
      showMessage({
        style: { alignItems: "center" },
        message: "Phone Field Required",
        type: "danger",
        position: "top",
        statusBarHeight: scale(20),
        duration: 2500,
      });
      return ;
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
      return ;
    }
    
setLoading(true)
    const res = await authServices.login(data).then(res=>res).catch(err=>err)
    // console.log(res,"res",res?.data?.data?.access_token,"tokne")
    if(res.status===200){
        setLoading(false)
       dispatch(setAuth(true)) 
        showMessage({
            style: { alignItems: "center" },
            message: res.data.message,
            type: "success",
            position: "top",
            duration: 2500,
            statusBarHeight: scale(20),
          });
        // setAuth(true)

           await AsyncStorage.setItem('token',res.data?.data?.access_token);

          navigation.navigate("home")

    }

    else{
      // setAuth(false)
      setLoading(false)


        showMessage({
            style: { alignItems: "center" },
            message: res.message?res.message:"Login field try again",
            type: "danger",
            position: "top",
            duration: 2500,
            statusBarHeight: scale(20),
          });
    
        if (res.data.redirect) {
            navigation.navigate(res.data.redirect, { ...res.data.user, phone });
          }


    }

  }

  return (
    <InputLayout>
      <View style={{ marginTop: scale(100) }}>
        <Text
          style={{
            fontSize: 24,
            lineHeight: 24,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Login
        </Text>
        {/* <Text style={{ fontSize: 16, lineHeight: 24, fontWeight: "400", textAlign: "center" }}> Lorem ipsum dolor sit amet adipiscing elit.</Text> */}
      </View>

      <InputTestCustom
        placeholder={"Phone Nmuber"}
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

      {/* <InputTestCustom

        type={"dropdown"}
        option={["customer", "seller"]}
        label={"User Type"}
        value={option}
        onChange={(text) => setOption(text)}
      /> */}

     
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#BE202E",
          height: scale(45),
          justifyContent: "center",
          alignItems: "center",
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
          <Text style={{ fontSize: 18, fontWeight: "400", color: "#FFFFFF" }}>
            Login
          </Text>
        )}
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 14 }}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
          <Text style={{ fontWeight: "600", fontSize: 14 }}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </InputLayout>
  );
};

export default Login;

const styles = StyleSheet.create({});
