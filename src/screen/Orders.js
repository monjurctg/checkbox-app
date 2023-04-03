import {Image, ScrollView, StyleSheet, TextInput} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import View from "../components/tags/View";
import Text from "../components/tags/Text";
import {scale} from "../../utils/funtions";
import CustomTouchBtn from "../components/tags/CustomTouchBtn";
import {colors} from "../theme/colors";
import img1 from "../../assets/img/redShoe.png";
import SingleCart from "../components/cart/SingleCart";
import {Feather} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import SaveSingleCart from "../components/cart/SaveSingleCart";

const Orders = () => {
  return (
    <SafeAreaView>
      <ScrollView style={{paddingHorizontal: scale(10)}}>
        <View
          preset={["row jc_between ph_10 mt_5 "]}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#DDDDDD",
            paddingBottom: scale(5),
          }}>
          <Text preset={["bold fs_16"]}>Saved Cart (5)</Text>
          <CustomTouchBtn>
            <AntDesign name="closecircleo" size={scale(20)} color="black" />
          </CustomTouchBtn>
        </View>

        <View preset={["mt_10 "]}>
          <SaveSingleCart title={"Untitled Cart 1"} />
          <SaveSingleCart title={"Md Ajharul Islam (01615001811)"} />
          <SaveSingleCart title={"Untitled Cart 1"} />
          <SaveSingleCart title={"Untitled Cart 1"} />
          <SaveSingleCart title={"Md Ajharul Islam (01615001811)"} />
          <SaveSingleCart title={"Untitled Cart 1"} />
          <SaveSingleCart title={"Untitled Cart 1"} />
        </View>

        <View style={{height: scale(110)}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({});
