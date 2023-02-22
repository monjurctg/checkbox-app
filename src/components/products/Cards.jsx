import {StyleSheet, View, Image, TouchableOpacity} from "react-native";
import React from "react";
import {scale} from "../../../utils/funtions";
import Text from "../tags/Text";

const Cards = ({name}) => {
  return (
    <View>
      <View style={styles.newProducts}>
        <Text preset={["p1 bold"]}>{name}</Text>
        <TouchableOpacity
        //    onPress={() =>
        //     navigation.navigate('ProductListing', {name: 'Jane'})
        //   }
        >
          <Image source={require("../../../assets/icons/right-icon.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.products}>
        <View
          style={{
            width: scale(108),
          }}>
          <Image source={require("../../../assets/img/temp/temp1.png")} />
          <Text preset={["p3 mt_5"]}>Nike Super Red Shoe for Men</Text>
        </View>
        <View
          style={{
            width: scale(108),
          }}>
          <Image source={require("../../../assets/img/temp/temp2.png")} />
          <Text preset={["p3 mt_5"]}>Nike Super Red Shoe for Men</Text>
        </View>
        <View
          style={{
            width: scale(108),
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Image source={require("../../../assets/img/temp/temp3.png")} />
          <Text preset={["p3 text_center"]}>Nike Super Red Shoe for Men</Text>
        </View>
      </View>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  newProducts: {
    padding: 12,
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
