import {Image, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import View from "../tags/View";
import Text from "../tags/Text";
import {scale} from "../../../utils/funtions";
import CustomTouchBtn from "../tags/CustomTouchBtn";
import {Feather} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import {Foundation} from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
const Filters = ({navigation,onFilterClick}) => {
  return (
    <View preset={["mt-5"]} style={{paddingTop:20}}>
      <View preset={["row jc_between"]}>
        {/* <View preset={["row center"]}> */}
          <CustomTouchBtn onPress={onFilterClick}>
           <Ionicons name="options" size={24} color="black" />
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
            <Text preset={["fs_12  lh_14  fw_400 pl_5 center"]}>
              Price: Low to High
            </Text>
            <AntDesign name="caretdown" size={14} color="black" />
          </TouchableOpacity>
        {/* </View> */}
        {/* <View preset={["row center "]}>
          
          <CustomTouchBtn>
            <Feather name="filter" size={24} color="black" />
          </CustomTouchBtn>
        </View> */}
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
