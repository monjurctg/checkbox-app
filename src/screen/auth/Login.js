import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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

    setLoading(true);
    const res = await authServices.login(data);
    // console.log(res, "res fjdkfj");

    // console.log(res,"res",res?.data?.data?.access_token,"tokne")
    // console.log("res: ", res);
    // console.log(res?.data?.data?.redirect);
    if (res.status === 200) {
      await AsyncStorage.setItem("token", res.data?.data?.access_token);

      setLoading(false);
      dispatch(setAuth(true));
      // dispatch(setUser(res.data.data))
      showMessage({
        style: { alignItems: "center" },
        message: res.data.message,
        type: "success",
        position: "top",
        duration: 2500,
        statusBarHeight: scale(20),
      });
      // setAuth(true)

      navigation.navigate("home");
    } else {
      // setAuth(false)
      //otp_verify
      if (res.code == 400) {
        showMessage({
          style: { alignItems: "center" },
          message: res.message ? res.message : "Login field try again",
          type: "danger",
          position: "top",
          duration: 2500,
          statusBarHeight: scale(20),
        });
      }
      setLoading(false);
      if (res?.data?.data?.redirect === "otp_verify") {
        showMessage({
          style: { alignItems: "center" },
          message: res.message ? res.message : "Login field try again",
          type: "danger",
          position: "top",
          duration: 2500,
          statusBarHeight: scale(20),
        });
        navigation.navigate(res?.data?.data?.redirect, {
          ...res.data.user,
          phone,
        });
      } else {
        if (res.data?.redirect) {
          navigation.navigate(res.data?.redirect, {
            ...res.data.user,
            phone,
          });
        }
      }
    }
  };

  return (
    <InputLayout>
      <View style={{ marginTop: scale(70) }}>
        <Text
          style={{
            fontSize: 34,
            // lineHeight: 24,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Log In
        </Text>
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
            Log In
          </Text>
        )}
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("forget_password")}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              color: "red",
              fontWeight: 600,
            }}
          >
            {" "}
            Forget Password
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
