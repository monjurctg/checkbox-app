import {StyleSheet, Image, TouchableOpacity} from "react-native";
import React from "react";
import {scale} from "../../../utils/funtions";
import Text from "../tags/Text";
import CustomTouchBtn from "../tags/CustomTouchBtn";
import View from "../tags/View";

const Cards = ({navigation, name}) => {
  console.log(navigation, "navigation");

  return (
    <View>
      <View style={styles.newProducts}>
        <Text preset={["p1 bold"]}>{name}</Text>
        <CustomTouchBtn
          preset={["row center"]}
          onPress={() => navigation.navigate("ProductList", {name: "Jane"})}>
          <Text preset={["p2 mr_5"]}>Explore all</Text>
          <Image source={require("../../../assets/icons/right-icon.png")} />
        </CustomTouchBtn>
      </View>
      <View style={styles.products}>
        <View
          style={{
            width: scale(108),
          }}>
          <Image source={require("../../../assets/img/temp/temp1.png")} />
          <Text preset={["p3 lh_14 mt_5"]}>Nike Super Red Shoe for Men</Text>
        </View>
        <View
          style={{
            width: scale(108),
          }}>
          <Image source={require("../../../assets/img/temp/temp2.png")} />
          <Text preset={["p3 lh_14 mt_5"]}>Nike Super Red Shoe for Men</Text>
        </View>
        <View
          preset={["center"]}
          style={{
            width: scale(108),
          }}>
          <Image source={require("../../../assets/img/temp/temp3.png")} />
          <Text preset={["p3 lh_14 mt_5 "]}>Nike Super Red Shoe for Men</Text>
        </View>
      </View>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  newProducts: {
    padding: scale(12),
    marginTop: scale(15),
    backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    // borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#E5E5E5",
  },

  products: {
    flexDirection: "row",
    // flexWrap: "wrap",
    justifyContent: "space-between",
    // marginTop: 12,
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});
