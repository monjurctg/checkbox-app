import {StyleSheet} from "react-native";
import React from "react";
import Rating from "../Rating";
import View from "../tags/View";
import Text from "../tags/Text";

const ClientReview = ({rating, auther, review, date}) => {
  return (
    <View preset={["mt_10"]}>
      <Rating maxStars={5} defaultStars={rating} />
      <Text preset={["lh_24 mt_5 fs_16 fw_400"]}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, ipsam.
      </Text>
      <View preset={["row   mt_15"]}>
        <Text preset={["fs_14 lh_24 fw_400"]}>by </Text>
        <Text preset={["  fs_14 lh_24 fw_500 "]}> Syed Najmul Hasan </Text>
        <Text preset={["  fs_14 fw_400 lh_24 "]}> on 16 Nov 2020</Text>
      </View>
    </View>
  );
};

export default ClientReview;

const styles = StyleSheet.create({});
