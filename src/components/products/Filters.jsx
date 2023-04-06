import {Image, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import View from "../tags/View";
import Text from "../tags/Text";
import {scale} from "../../../utils/funtions";
import CustomTouchBtn from "../tags/CustomTouchBtn";
import {Feather} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import {Foundation} from "@expo/vector-icons";

const Filters = ({navigation}) => {
  return (
    <View preset={["mt-5"]}>
      <View preset={["row jc_between"]}>
        <View preset={["row center"]}>
          <CustomTouchBtn style={{height: scale(16), width: scale(16)}}>
            {/* <Image
              style={{height: scale(16), width: scale(16)}}
              source={require("../../../assets/icons/bar2.png")}
            /> */}
            <Foundation name="list" size={24} color="black" />
          </CustomTouchBtn>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: scale(177),
              height: scale(24),
              justifyContent: "space-around",
              alignSelf: "center",
              alignItems: "center",
              marginLeft: scale(10),
              backgroundColor: "#E6E7E8",
              borderRadius: scale(4),
              paddingVertical: scale(5),
              paddingHorizontal: scale(12),
            }}>
            <Text preset={["fs_14  lh_14  fw_400 pl_5 center"]}>
              Price: Low to High
            </Text>
            <AntDesign name="caretdown" size={16} color="black" />
          </TouchableOpacity>
        </View>
        <View preset={["row center "]}>
          <CustomTouchBtn style={{marginRight: 20}}>
            <Feather
              name="search"
              size={24}
              style={{fontWeight: "700"}}
              color="black"
            />
            {/* <Image
              source={require("../../../assets/icons/search.png")}
              style={{width: scale(16), height: scale(16)}}
            /> */}
          </CustomTouchBtn>
          <CustomTouchBtn>
            {/* <Image
              style={{
                marginLeft: scale(20),
                height: scale(16),
                width: scale(16),
              }}
              source={require("../../../assets/icons/filter.png")}
            /> */}
            <Feather name="filter" size={24} color="black" />
          </CustomTouchBtn>
        </View>
      </View>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  filterBtn: {
    height: scale(177),
    width: scale(32),
    paddingVertical: scale(4),
    paddingHorizontal: scale(12),
    /* Secondary/04 */

    background: "black",
    borderRadius: scale(4),
  },
});
