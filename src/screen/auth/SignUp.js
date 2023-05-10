import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import InputLayout from "../../components/layout/InputLayout";
import InputTestCustom from "../../components/Input/InputTestCustom";
import { formatDate, height, scale, width } from "../../../utils/funtions";
import { useNavigation } from "@react-navigation/native";
import authServices from "../../services/authServices";
// import { isLoading } from "expo-font";
import { showMessage, hideMessage } from "react-native-flash-message";

const SiginUp = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [option, setOption] = useState("");
  const [date, setDate] = useState(formatDate(new Date()));
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleError = () => {
    if (!name) {
      showMessage({
        style: { alignItems: "center" },
        message: "Name Field Required",
        type: "danger",
        position: "top",
        statusBarHeight: scale(20),
        duration: 2500,
      });
      return true;
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
      return true;
    }
  };

  const handleSignup = async () => {
    const error = handleError();
    if (error) return;
    const data = {
      name: name,
      phone: phone,
      dob: date,
      is_seller: option === "Seller" ? true : false,
    };
    setLoading(true);
    const res = await authServices
      .signup(data)
      .then((res) => res)
      .catch((err) => err);

    console.log(res, data, "res  signup ");
    if (res.status === 201) {
      setLoading(false);
      navigation.navigate("otp_verify", data);
    } else {
      // console.log(res, "res ");
      showMessage({
        style: { alignItems: "center" },
        message: res.message,
        type: "danger",
        position: "top",
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
    <InputLayout>
      <View style={{ marginTop: scale(50), marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 24,
            lineHeight: 24,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Sign Up
        </Text>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 24,
            fontWeight: "400",
            textAlign: "center",
          }}
        >
          {" "}
          Lorem ipsum dolor sit amet adipiscing elit.
        </Text>
      </View>
      <InputTestCustom
        placeholder={"Name"}
        label={"Name"}
        value={name}
        onChange={(text) => setName(text)}
      />
      <InputTestCustom
        keyboardType={"numeric"}
        placeholder={"Phone Nmuber"}
        label={"Phone Number"}
        value={phone}
        onChange={(text) => setPhone(text)}
      />

      <InputTestCustom
        type={"date"}
        label={"Date of Birth "}
        value={date}
        onChange={setDate}
      />

      <InputTestCustom
        type={"dropdown"}
        option={["Customer", "Seller"]}
        label={"User Type"}
        value={option}
        onChange={(text) => setOption(text)}
      />

      <TouchableOpacity
        onPress={handleSignup}
        style={{
          backgroundColor: "#BE202E",
          height: 52,
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
            Sign Up
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
        <Text style={{ fontSize: 14 }}>Already have an Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text style={{ fontSize: 14, fontWeight: "600" }}>Log In</Text>
        </TouchableOpacity>
      </View>
    </InputLayout>
  );
};

export default SiginUp;

const styles = StyleSheet.create({});
