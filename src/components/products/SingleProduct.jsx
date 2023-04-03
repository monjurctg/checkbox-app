import {Button, Image, StyleSheet} from "react-native";
import React, {useRef} from "react";
import View from "../tags/View";
import {scale} from "../../../utils/funtions";
import Text from "../tags/Text";
import CustomTouchBtn from "../tags/CustomTouchBtn";
import {colors} from "../../theme/colors";
import {Feather} from "@expo/vector-icons";
import {BottomSheet} from "react-native-btr";
import Rating from "../Rating";

const SingleProduct = ({
  navigation,
  title,
  price,
  view,
  rate,
  src,
  toggleBottomNavigationView,
  visible,
}) => {
  const bottomSheetRef = useRef(null);

  const onPress = () => {
    navigation.navigate("product-details");
  };
  const handleRate = (rating) => {
    console.log(`User rated item with ${rating} stars`);
  };

  return (
    <View style={{width: scale(160)}}>
      <CustomTouchBtn preset={[" mt_20"]} onPress={onPress}>
        <Image style={{width: scale(160), height: scale(220)}} source={src} />
        {/* <Feather name="heart" size={34} color="black" /> */}
        <View preset={["mt_5"]}>
          <Text preset={["p1"]}>Nike Super Red Shoe for Men</Text>
          <Text preset={["mt_5 p1"]}>৳ 94894.00</Text>
        </View>
      </CustomTouchBtn>
      <Rating maxStars={5} defaultStars={3} onRate={handleRate} />
      <CustomTouchBtn
        preset={["center border_1 mt_10"]}
        // onPress={() => bottomSheetRef.current.expand()}
        onPress={() => {
          toggleBottomNavigationView();
          // alert("twitter");
        }}
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
