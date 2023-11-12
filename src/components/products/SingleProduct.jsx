import { Button, Image, StyleSheet } from "react-native";
import React, { useRef } from "react";
import View from "../tags/View";
import { height, scale } from "../../../utils/funtions";
import Text from "../tags/Text";
import CustomTouchBtn from "../tags/CustomTouchBtn";
import { colors } from "../../theme/colors";
import { Feather } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";
import Rating from "../Rating";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const SingleProduct = ({
  navigation,
  title,
  price,
  view,
  rate,
  src,
  from,
  toggleBottomNavigationView,
  visible,
  name,
  sales,
  id,item
}) => {
  const bottomSheetRef = useRef(null);
  // const navigation = useNavigation()
  // console.log(id,"id")

  const onPress = (id) => {
    // alert(id)
    navigation.navigate("product-details",{productId:id});
  };
  const handleRate = (rating) => {
    // console.log(`User rated item with ${rating} stars`);
  };

  return (
    <View
      preset={["mt_5 mr_5   "]}
      style={{
        width: scale(from=="home"?157:160),
        height:scale(230),
        backgroundColor:colors.white,
        // shadowColor: "rgba(0, 0, 0,0.5)",
      //  borderColor:"#f2e9e9",
      //  borderWidth:1,
       borderRadius:5,
       
       elevation:2,shadowOpacity: 0.8,
       shadowRadius: 5,shadowOffset: {
        width: 0,
        height: 1,
      },
      }}
    >
      <CustomTouchBtn preset={["  p_5"]} onPress={()=>onPress(id)}>
        <Image
          style={{ width: scale(150), height: scale(150), resizeMode: "cover",borderRadius:5 }}
          source={{ uri: src }}
        />
        {/* <Feather name="heart" size={34} color="black" /> */}
        <View preset={["mt_5"]}>
          <Text preset={["p3 lh_14 RR"]} numberOfLines={1} ellipsizeMode={"tail"}>{name}</Text>
          <Text style={{color:"green"}} preset={["mt_5 p3"]}>{price}</Text>
        </View>
      </CustomTouchBtn>
      <View preset={["ph_5"]}>
      <Rating
        sales={sales}
        from={from}
        maxStars={5}
        defaultStars={rate}
        onRate={handleRate}
      />
      </View>
     
    </View>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  addtocart: {
    width: scale(160),
    alignSelf:"center",
    position:"absolute",

    height: scale(45),
    bottom:0,

    borderRadius: 5,
    borderColor: colors.primary_2,
  },
});
