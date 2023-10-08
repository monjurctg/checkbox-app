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

const SingleCart = ({ item }) => {
  // console.log(item, "item");
  const navigation = useNavigation();
  const [customerRate, setCustomerRate] = useState(
    item?.customer_rate?.toString()
  );
  const [quantity, setQuantity] = useState(item?.quantity);

  // const debouncedCustomrate = useDebounce(customerRate, 400);
  // const debouncedQuantity = useDebounce(quantity, 600);

  const handleCustomRate = (text) => {
    setCustomerRate(text);
  };

  let updateQuantity = async (type) => {
    // if (previousQuality !== null) {

    // }
    // if (!debouncedQuantity?.trim()) return;
   
    let data = {
      id: item?.id,
      cart_id: item?.cart_id,
      type: "quantity",
      quantity: type=="plus"?item?.quantity+1:item?.quantity-1,
    };

    let res = await cartServices.updateProductFromCart(data);
    // console.log(res.data.data,"res from api")

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
      // dispatch(singlecart(res?.data?.data?.cart_id));
      // setpreviousQuality(null);
    } else {
      // setpreviousQuality(null);
      // errorNotification(res?.data?.message, "top-right");
    }
    // console.log('data res', res)
    // console.log('data', data)
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
    // console.log(data);
    try {
      let res = await cartServices.updateProductFromCart(data);
      if (res?.status === 200) {
        // dispatch(singlecart(res?.data?.data?.cart_id));
        // successNotification(res?.data?.message, "top-righ");
      } else {
        // setCustomerRate(item?.customer_rate);
      }
    } catch (err) {
      console.error(err, "error from catch");
    }
  };


  // useEffect(() => {
  //   updateQuantity(debouncedQuantity);

  //   // }
  // }, []);

  // useEffect(() => {

  //   updateCustomerRate(customerRate);
  //   // }
  // }, [ debouncedCustomrate]);

  // console.log(customerRate,"customer rate")
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
        <View style={{ width: scale(110) }}>
          <CustomTouchBtn
            onPress={() => {
              const isConfirm = Alert.prompt("Are sure?");
              console.log(isConfirm);
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
              width: scale(110),
              height: scale(110),
              // borderColor: "#231F20",
              // borderWidth: 1,
              borderRadius:10

            }}
            source={{ uri: item?.product_thumbnail_image }}
            // source={require(`${item?.image}`)}
            // source={require("../../../assets/img/redShoe.png")}
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
          <Text numberOfLines={2} ellipsizeMode="tail" style={{width:scale(190)}} preset={["bold lh_20  fs_14 "]}>{item?.product_name}</Text>
          <Text preset={["mt_5 lh_20 fs_16"]}>
            ৳ <Text style={{ fontWeight: "bold" }}>{item?.price}</Text>
          </Text>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity onPress={()=>{
              updateQuantity("minus")

            }}   style={{borderWidth:1,borderColor:"#DDD",width:scale(60),height:40,justifyContent:"center",alignItems:"center"}}><AntDesign name="minus" size={24} color="black" /></TouchableOpacity>
            <View  style={{borderWidth:1,width:scale(60),height:40,justifyContent:"center",alignItems:"center",borderColor:"#DDD"}}>
              <Text>{quantity}</Text>
            </View>
           
            <TouchableOpacity onPress={()=>{
              updateQuantity("plus")

            }}   style={{borderWidth:1,width:scale(60),height:40,justifyContent:"center",alignItems:"center",borderColor:"#DDD"}}><AntDesign name="plus" size={24} color="black" /></TouchableOpacity>

          </View>
          {/* <Text style={{ color: "#58595B" }} preset={["fs_11"]}>
            Color{"  "}
            <Text
              preset={["fs_11"]}
              style={{ fontWeight: "bold", color: "#000" }}
            >
              {item?.color}
            </Text>
            {"     "}
            Size{"  "}
            <Text
              preset={["fs_11"]}
              style={{ fontWeight: "bold", color: "#000" }}
            >
              {item?.size}
            </Text>
          </Text> */}
          {/* <Text style={{ color: "#58595B" }} preset={["fs_11"]}>
            Type{"  "}
            <Text
              preset={["fs_11"]}
              style={{ fontWeight: "bold", color: "#000" }}
            >
              {item?.type}
            </Text>
            {"     "}
            Origin{"  "}
            <Text
              preset={["fs_11"]}
              style={{ fontWeight: "bold", color: "#000" }}
            >
              {item?.origin}
            </Text>
          </Text> */}
        </View>
      </View>
      {/* <View preset={["mt_10 row"]} style={{ justifyContent: "space-between" }}>
        <Text style={{ color: "#231F20" }} preset={["lh_20 fs_11"]}>
          Quantity
        </Text>
        <TextInput
          value={quantity}
          onChangeText={(text) => setQuantity(text)}
          keyboardType="decimal-pad"
          style={{
            textAlign: "center",
            borderColor: "#E6E7E8",
            borderWidth: 1,
            width: scale(50),
            backgroundColor: "#FFFFFF",
            fontSize: 14,
          }}
        />
        <Text style={{ color: "#231F20" }} preset={["lh_20 fs_11"]}>
          x Customer Rate
        </Text>
        <TextInput
          keyboardType="numeric"
          // value={item?.customer_rate}
          editable={false}
          onChangeText={handleCustomRate}
          value={customerRate}
          style={{
            borderColor: "#E6E7E8",
            borderWidth: 1,
            marginLeft: scale(5),
            width: scale(100),
            backgroundColor: "#FFFFFF",
            textAlign: "center",
            fontSize: 14,
          }}
        />
      </View> */}
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
