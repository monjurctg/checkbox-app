import { Alert, Image, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import View from "../tags/View";
import Text from "../tags/Text";
import { scale } from "../../../utils/funtions";
import { colors } from "../../theme/colors";
import { MaterialIcons } from "@expo/vector-icons";
import useDebounce from "../../hooks/useDebounce";
import cartServices from "../../services/cartServices";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native-web";
import CustomTouchBtn from "../tags/CustomTouchBtn";

const SingleCart = ({ item }) => {
  // console.log(item, "item");
  const [customerRate, setCustomerRate] = useState(
    item?.customer_rate?.toString()
  );
  const [quantity, setQuantity] = useState(item?.quantity?.toString());

  const debouncedCustomrate = useDebounce(customerRate, 400);
  const debouncedQuantity = useDebounce(quantity, 400);

  const handleCustomRate = (text) => {
    setCustomerRate(text)

  };


  let updateQuantity = async () => {
    // if (previousQuality !== null) {

    // }
    if (!debouncedQuantity?.trim()) return;
    let data = {
      id: item?.id,
      cart_id: item?.cart_id,
      type: "quantity",
      quantity: debouncedQuantity,
    };
 
    let res = await cartServices.updateProductFromCart(data);
    
    if (res?.status === 200) {
    
      // dispatch(singlecart(res?.data?.data?.cart_id));
      // setpreviousQuality(null);
      // successNotification(res?.data?.message, "top-right");
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
   
    let res = await cartServices.updateProductFromCart(data);
    if (res?.status === 200) {
      // dispatch(singlecart(res?.data?.data?.cart_id));
      // successNotification(res?.data?.message, "top-righ");
    } else {
      setCustomerRate(item?.customer_rate);
      // setpreviousRate(null);
      // errorNotification(res?.data?.message, "top-right");
    }
  };

  useEffect(() => {
    updateQuantity(debouncedQuantity);
  
    // }
  }, [ debouncedQuantity]);

  
  useEffect(() => {
   
    updateCustomerRate(debouncedCustomrate);
    // }
  }, [debouncedCustomrate, ]);

  // console.log(customerRate,"customer rate")
  return (
    <View
      style={{
        borderColor: colors.cartBorder,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
      }}
    >
      <View preset={["row mt_15 "]}>
        <View style={{ width: scale(110) }}>
      <CustomTouchBtn onPress={()=>{
        const isConfirm = Alert.prompt("Are sure?")
        console.log(isConfirm)
      }} style={{
        backgroundColor: "white",
        position: "absolute",
        zIndex: 50,
        right: 4,
        top: 4,
        padding: 4,
        borderRadius: 32,
      }}>
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
              borderColor: "#231F20",
              borderWidth: 1,
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
            justifyContent: "space-between",
          }}
        >
          <Text preset={["bold lh_20  fs_14 "]}>{item?.product_name}</Text>
          <Text preset={["mt_5 lh_20 fs_16"]}>
            ৳ <Text style={{ fontWeight: "bold" }}>{item?.price}</Text>
          </Text>
          <Text style={{ color: "#58595B" }} preset={["fs_11"]}>
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
          </Text>
          <Text style={{ color: "#58595B" }} preset={["fs_11"]}>
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
          </Text>
        </View>
      </View>
      <View preset={["mt_10 row"]} style={{ justifyContent: "space-between" }}>
        <Text style={{ color: "#231F20" }} preset={["lh_20 fs_11"]}>
          Quantity
        </Text>
        <TextInput
          value={quantity}
          onChange={(text) => setQuantity(text)}
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
          onChange={handleCustomRate}
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
      </View>
    </View>
  );
};

export default SingleCart;

const styles = StyleSheet.create({
  content: {
    float: "left",
    justifyContent: "space-between",
  },
});
