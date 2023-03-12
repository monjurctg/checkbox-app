import {Image, StyleSheet} from "react-native";
import React from "react";
import View from "../tags/View";
import {scale} from "../../../utils/funtions";
import Text from "../tags/Text";
import CustomTouchBtn from "../tags/CustomTouchBtn";
import {colors} from "../../theme/colors";

const SingleProduct = ({navigation, title, price, view, rate, src}) => {
  const onPress = () => {
    navigation.navigate("product-details");
  };
  return (
    <View style={{width: scale(160)}}>
      <CustomTouchBtn preset={[" mt_20"]} onPress={onPress}>
        <Image style={{width: scale(160), height: scale(220)}} source={src} />
        <View preset={["mt_5"]}>
          <Text preset={["p1"]}>Nike Super Red Shoe for Men</Text>
          <Text preset={["mt_5 p1"]}>৳ 94894.00</Text>
        </View>
      </CustomTouchBtn>
      <CustomTouchBtn
        preset={["center border_1 mt_10"]}
        style={styles.addtocart}>
        <Text preset={["p2 text_primary2 radius_5 "]}>Add to Cart</Text>
      </CustomTouchBtn>
    </View>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  addtocart: {
    width: "100%",
    height: scale(45),
    borderRadius: 5,
    borderColor: colors.primary_2,
  },
});
