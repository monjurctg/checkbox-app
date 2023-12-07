import { Alert, Image, StyleSheet, TextInput } from "react-native";
import React, { memo, useState } from "react";
import View from "../tags/View";
import Text from "../tags/Text";
import { scale } from "../../../utils/funtions";
import { colors } from "../../theme/colors";
import { MaterialIcons } from "@expo/vector-icons";
import useDebounce from "../../hooks/useDebounce";
import cartServices from "../../services/cartServices";
import { useEffect } from "react";
// import { TouchableOpacity } from "react-native-web";
import CustomTouchBtn from "../tags/CustomTouchBtn";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const SingleCart = ({ item,from }) => {
  // console.log(item, "item");
  const navigation = useNavigation();
  const [customerRate, setCustomerRate] = useState(
    item?.customer_rate?.toString()
  );
  const [quantity, setQuantity] = useState(item?.quantity);


  const handleCustomRate = (text) => {
    setCustomerRate(text);
  };

  let updateQuantity = async (type) => {
    if(item.quantity>0){

      // console.log(item)
      let data = {
        id: item?.id,
        cart_id: item?.cart_id,
        type: "quantity",
        quantity: type=="plus"?item?.quantity+1:item?.quantity-1,
      };

      let res = await cartServices.updateProductFromCart(data);
      if (res?.status === 200) {
        if(type=="plus"){
          setQuantity(quantity+1)
        }
        else if(type=="minus"){
          setQuantity(quantity-1)

        }

        showMessage({
          style: { alignItems: "center" },
          message: res.data.message,
          type: "success",
          position: "top",
          duration: 2500,
          statusBarHeight: scale(20),
        });

      } else {

      }

    }


  };
  let updateCustomerRate = async () => {
    // if (previousrate !== null) {

    // }
    let data = {
      id: item?.id,
      cart_id: item?.cart_id,
      type: "customer_rate ",
      customer_rate: debouncedCustomrate,
    };

    try {
      let res = await cartServices.updateProductFromCart(data);
      if (res?.status === 200) {

      } else {

      }
    } catch (err) {
      console.error(err, "error from catch");
    }
  };
  return (
    <View
      style={{
        borderColor: colors.cartBorder,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        elevation:3,
        backgroundColor:"#FFF"

      }}
    >
      <View preset={["row"]}>
        <View style={{ width: scale(80) }}>
          <CustomTouchBtn
            onPress={() => {
              const isConfirm = Alert.prompt("Are sure?");
              // console.log(isConfirm);
            }}
            style={{
              backgroundColor: "white",
              position: "absolute",
              zIndex: 50,
              right: 4,
              top: 4,
              padding: 4,
              borderRadius: 32,
            }}
          >
            <MaterialIcons
              style={{
                fontSize: scale(14),
                color: "#EE2349",
              }}
              name="delete-outline"
              size={24}
              color="black"
            />
          </CustomTouchBtn>

          <Image
            style={{
              width: scale(80),
              height: scale(90),
              borderRadius:10

            }}
            source={{ uri: item?.product_thumbnail_image }}

          />
        </View>

        <View
          style={{
            width: scale(220),
            marginLeft: scale(15),
            display: "flex",
            gap:10
            // justifyContent: "space-between",
          }}
        >
          <Text numberOfLines={2} ellipsizeMode="tail" style={{width:scale(190)}} preset={["RB lh_20  fs_13 "]}>{item?.product_name}</Text>
          <Text preset={["mt_5 lh_20 fs_14"]}>
            ৳ <Text style={{ fontWeight: "bold" }}>{item?.price}</Text>
          </Text>
          {
            from !="ConfirmOrder" && <View style={{flexDirection:"row"}}>
            <TouchableOpacity disabled={quantity<=1?true:false} onPress={()=>{
              updateQuantity("minus")

            }}   style={{borderWidth:1,borderColor:"#DDD",width:scale(60),height:35,justifyContent:"center",alignItems:"center",backgroundColor:quantity<=1?"#DDD":"#FFF"}}><AntDesign name="minus" size={24} color="black" /></TouchableOpacity>
            <View  style={{borderWidth:1,width:scale(60),height:35,justifyContent:"center",alignItems:"center",borderColor:"#DDD"}}>
              <Text>{quantity}</Text>
            </View>

            <TouchableOpacity onPress={()=>{
              updateQuantity("plus")

            }}   style={{borderWidth:1,width:scale(60),height:35,justifyContent:"center",alignItems:"center",borderColor:"#DDD"}}><AntDesign name="plus" size={24} color="black" /></TouchableOpacity>

          </View>
          }


        </View>
      </View>

    </View>
  );
};

export default memo(SingleCart);

const styles = StyleSheet.create({
  content: {
    float: "left",
    justifyContent: "space-between",
  },
});
