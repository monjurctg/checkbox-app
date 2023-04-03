import {StyleSheet} from "react-native";
import React from "react";
import View from "../tags/View";
import Text from "../tags/Text";
import {scale} from "../../../utils/funtions";
import CustomTouchBtn from "../tags/CustomTouchBtn";
import {AntDesign} from "@expo/vector-icons";

const SaveSingleCart = ({title}) => {
  return (
    <View
      preset={[" p_10 mt_5 "]}
      style={{
        borderWidth: 1,
        borderColor: "#DDDDDD",
        paddingBottom: scale(5),
      }}>
      <View preset={["row jc_between"]}>
        <Text preset={["bold fs_16"]}>{title}</Text>
        <CustomTouchBtn>
          <AntDesign name="closecircleo" size={scale(20)} color="black" />
        </CustomTouchBtn>
      </View>
      <Text preset={[" mt_10 fs_11"]} style={{color: "#58595B"}}>
        22 Dec 2022 at 03:20 PM, 2 items, ৳1221220.00
      </Text>
    </View>
  );
};

export default SaveSingleCart;

const styles = StyleSheet.create({});
