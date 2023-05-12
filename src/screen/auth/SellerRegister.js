import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import InputLayout from "../../components/layout/InputLayout";
import InputTestCustom from "../../components/Input/InputTestCustom";
import { height, scale, width } from "../../../utils/funtions";
import authServices from "../../services/authServices";
import { showMessage } from "react-native-flash-message";

const SellerRegister = ({ route, navigation }) => {
  const [shopName, setShopName] = useState("");
  // const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const { phone } = route.params;
  const [loading, setLoading] = useState(false);

  const checkError = () => {
    if (!shopName) {
      showMessage({
        style: { alignItems: "center" },
        message: "Shop  name is required",
        type: "danger",
        position: "top",
        statusBarHeight: scale(20),
      });
      return true;
    } else if (!email) {
      showMessage({
        style: { alignItems: "center" },
        message: "Email is required",
        type: "danger",
        position: "top",
        duration: 2500,
        statusBarHeight: scale(20),
      });
      return true;
    } else if (!gender) {
      showMessage({
        style: { alignItems: "center" },
        message: "Gender is required",
        type: "danger",
        position: "top",
        duration: 2500,
        statusBarHeight: scale(20),
      });
      return true;
    } else if (!address) {
      showMessage({
        style: { alignItems: "center" },
        message: "Address is required",
        type: "danger",
        position: "top",
        duration: 2500,
        statusBarHeight: scale(20),
      });
      return true;
    } else if (!password || password.length <= 7) {
      showMessage({
        style: { alignItems: "center" },
        message: "Password is required & must be at least 8 characters",
        type: "danger",
        position: "top",
        duration: 2500,
        statusBarHeight: scale(20),
      });
      return true;
    } else if (!confirmPassword) {
      showMessage({
        style: { alignItems: "center" },
        message: "Confirm password is required",
        type: "danger",
        position: "top",
        duration: 2500,
        statusBarHeight: scale(20),
      });
      return true;
    } else if (password !== confirmPassword) {
      showMessage({
        style: { alignItems: "center" },
        message: " password & Confirm password does not matched",
        type: "danger",
        position: "top",
        duration: 2500,
        statusBarHeight: scale(20),
      });
      return true;
    }
  };

  const handleShopInfo = async () => {
    const error = checkError();

    if (error) return;
    let data = {
      shop_name: shopName,
      email: email,
      phone: phone,
      password: password,
      address: address,
      gender: gender,
      password_confirmation: confirmPassword,
    };
    setLoading(true);
    const res = await authServices
      .addShopInfo(data)
      .then((res) => res)
      .catch((err) => err);
    // console.log(res, "res from seller");
    if (res.status === 200) {
      setLoading(false);
      showMessage({
        style: { alignItems: "center" },
        message: res.data.message,
        type: "success",
        position: "top",
        icon: "success",
        duration: 2500,
        statusBarHeight: scale(20),
      });
      navigation.navigate("login");
    } else {
      setLoading(false);
      showMessage({
        style: { alignItems: "center" },
        message: res.message,
        type: "danger",
        position: "top",
        duration: 2500,
        statusBarHeight: scale(20),
      });
    }
  };

  return (
    <InputLayout>
      <View style={{ marginVertical: scale(20) }}>
        <Text
          style={{
            fontSize: 24,
            lineHeight: 24,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Shop Information
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputTestCustom
          placeholder={"Shop Name"}
          label={"Shop Name"}
          value={shopName}
          onChange={(text) => setShopName(text)}
        />
        <InputTestCustom
          placeholder={"Email"}
          label={"Email*"}
          value={email}
          onChange={(text) => setEmail(text)}
        />

        <InputTestCustom
          placeholder={"Phone Nmuber"}
          label={"Phone Number"}
          value={phone}
          editable={false}
          onChange={(text) => setPhone(text)}
        />
        {/* <InputTestCustom placeholder={"Phone Nmuber"} label={"Phone Number*"} value={phone} onChange={(text) => setPhone(text)} /> */}

        <InputTestCustom
          // type={"password"}
          placeholder={"Address"}
          label={"Address "}
          value={address}
          onChange={(text) => setAddress(text)}
        />
        <InputTestCustom
          type={"dropdown"}
          option={["male", "female"]}
          label={"Gender"}
          value={gender}
          onChange={(text) => setGender(text)}
        />
        <InputTestCustom
          type={"password"}
          placeholder={"Password"}
          label={"Password "}
          value={password}
          onChange={(text) => setPassword(text)}
        />

        <InputTestCustom
          type={"password"}
          placeholder={"Confirm Password"}
          label={"ConfirmPassword "}
          value={confirmPassword}
          onChange={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity
          onPress={handleShopInfo}
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
              Submit
            </Text>
          )}
        </TouchableOpacity>
        <View style={{ height: scale(100) }}></View>
      </ScrollView>
    </InputLayout>
  );
};

export default SellerRegister;

const styles = StyleSheet.create({});
