import {Image, StyleSheet, TextInput} from "react-native";
import React from "react";
import View from "../tags/View";
import Text from "../tags/Text";
import {scale} from "../../../utils/funtions";
import {colors} from "../../theme/colors";

const SingleCart = ({src}) => {
  return (
    <View
      preset={["row mt_10 "]}
      style={{height: scale(108), borderColor: colors.cartBorder}}>
      <View style={{width: scale(110)}}>
        <Image style={{width: scale(110), height: scale(110)}} source={src} />
      </View>

      <View style={{width: scale(220), marginLeft: scale(15)}}>
        <Text preset={["bold lh_20  fs_14 "]}>Nike Super Red Shoe for Men</Text>
        <Text preset={["mt_5 lh_20 fs_14"]}>৳ 1600.00</Text>
        <View preset={["mt_10 row"]}>
          <Text preset={["lh_20 fs_14"]}>Quantity</Text>
          <TextInput
            keyboardType="decimal-pad"
            style={{
              borderColor: "#E6E7E8",
              borderWidth: 1,
              paddingLeft: scale(10),
              marginLeft: scale(5),
              width: scale(120),
              backgroundColor: "#FFFFFF",
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default SingleCart;

const styles = StyleSheet.create({});
