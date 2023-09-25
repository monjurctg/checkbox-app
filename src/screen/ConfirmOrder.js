import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  Modal,
  Linking,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Mainlayout from "../components/layout/Mainlayout";
import { Feather, EvilIcons, AntDesign } from "@expo/vector-icons";
import SingleProduct from "../components/products/SingleProduct";
import SingleCart from "../components/cart/SingleCart";
import { colors } from "../theme/colors";
import { scale } from "../../utils/funtions";
import cartServices from "../services/cartServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import WebView from "react-native-webview";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
// import { AntDesign } from '@expo/vector-icons';
import authServices from "../services/authServices";

const ConfirmOrder = ({ navigation, route }) => {
  const { data, carts   } = route.params;
  // const [showSuccessModal, setshowSuccessModal] = useState(false);
  const [processingFee, setProcessingFee] = useState();
  const [toolTip, settoolTip] = useState();
  const [shippingFee, setshippingFee] = useState();
  const [isShopModal, setIsShopModal] = useState(false);
  const [imageAssets, setImageAssets] = useState();
  const [orderSuccess, setOrederSuccess] = useState([]);
  const {  user } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(null);
  const [shopName, setShopName] = useState("");
  const [bkash, setBkash] = useState("");
  const[couponText,setCouponText]=useState("")
  const[singleCart,setSingCart]=useState(carts)

  // console.log(data, "data from confirm order");
  // console.log(carts.id, "card");
  let getOtherFee = async () => {
    let res = await cartServices.getOtherFees(carts.id);
    // console.log("res", res);
    if (res?.status === 200) {
      setProcessingFee(res.data.data.processing_fee?.amount);
      settoolTip(res.data.data.processing_fee?.tooltip);
      setshippingFee(res.data.data.shipping_fee);
      // console.log("singlecartData", singlecartData);
    }
  };

  
  const fetchSingCart = async () => {
   

    // console.log(cart_id,"cart id from sing")
    const res = await cartServices.getSingleCarts(carts?.id);
    // console.log(res.data.data.items[0], "response  from calling");uy
    if (res.status === 200) {
      setSingCart(res.data.data);
      // setSwitchCartModalVisible(false);

      // dispatch(setCartSize(res.data.data.items.length));
      // setInputValue(res?.data?.data.name);
      // setSwichCartIdInLocal(activeSwichCartId ? activeSwichCartId : cart_id);
    }
  };

  useEffect(() => {
    // dispatch(singlecart(localStorage.getItem("cart_id")));
    getOtherFee();
    fetchSingCart()
    // refetch();
  }, []);
  let orderPlace = () => {
    console.log(user);
    if (!user?.shop) {
      setIsShopModal(true);
    } else {
      if (user?.numb_of_orders > 0) {
        calculateTotal() > 0 ? placeOrder() : payMoney();
      } else {
        payMoney();
      }
    }
  };
  let getAmount = () => {
    let amount = 0;
    if (user?.numb_of_orders > 0) {
      amount = Math.abs(calculateTotal()).toFixed(2);
    } else {
      if (calculateTotal() > 0) {
        amount = shippingFee;
      } else {
        amount = Math.abs(calculateTotal()).toFixed(2);
      }
    }
    return amount;
  };
  let payMoney = async () => {
    let data = {
      cart_id: carts?.id,
      amount: getAmount(),
      processing_fee: processingFee,
      delivery_charge: shippingFee,
      payment_type: "due_payment",
      success_url: "https://checkbox-rosy.vercel.app/cart/payment-order",
      cancel_url:
        "https://checkbox-rosy.vercel.app/cart/order-confirmation/" + carts.id,
      fail_url:
        "https://checkbox-rosy.vercel.app/cart/order-confirmation/" + carts.id,
    };
    // console.log("data paymony", data);

    let res = await cartServices.payWithSsl(data);
    if (res.status === 200) {
      // console.log(res.data, "res.data pay mony")
      navigation.navigate("send", { url: res.data.url });
      // Linking.openURL(res.data.url);
      // return <WebView source={{ uri: res.data.url }} style={{ flex: 1 }} />;

      // window.location.href = res?.data?.url;
    }
    // console.log("data", res);

    // payWithSsl
  };
  let calculateTotal = () => {
    let total = 0;
    // singlecartData?.items?.map((item) => {
    //   total += item.price * item.quantity;
    // });
    if (singleCart?.cashback_discount === "cashback") {
      total =
      singleCart?.reseller_to_customer_price -
        (singleCart?.advance_from_customer +
          singleCart?.price +
          processingFee +
          shippingFee) +
          singleCart?.coupon?.discount;
    } else {
      total =
      singleCart?.reseller_to_customer_price -
        (singleCart?.advance_from_customer +
          singleCart?.price +
          processingFee +
          shippingFee);
    }
    console.log("total", singleCart?.coupon?.discount_amount);
    return total;
  };
  let placeOrder = async () => {
    let data = {
      cart_id: carts?.id,
      payment_type: 1,
      advanced_payment: singleCart?.advance_from_customer,
      amount_to_collect: calculateTotal(),
      processing_fee: processingFee,
      delivery_charge: shippingFee,
    };

    console.log("data placeorder", data);

    let res = await cartServices.orderStore(data);
    console.log("ressss", res);
    if (res.status === 200) {
      console.log(res);
      // successNotification(res.data.message, "top-right");
      // setshippingFee(true);
      // dispatch(successDataStore({ ...data, ...res?.data?.data }));
      // await AsyncStorage.removeItem("cart_id");
      // localStorage.removeItem("sub");
      // localStorage.removeItem("dsab");
      // localStorage.removeItem("currentAddress");
      // refetch();
      // router.push("/cart/order-confirmation/success/");
      // dispatch(singlecart(localStorage.getItem("cart_id")));
      // router.push("/product-list");
    } else {
      alert(res.data.message, "top-right");
    }
  };
  let applyVoucher = async () => {
    let data = {
      cart_id: carts.id,
      coupon_code: couponText,
    };
    let res = await cartServices.voucherApply(data);
    if (res.status === 200) {
      Alert.alert(res.data.message, "top-right");
      // refetch();
      // dispatch(singlecart(localStorage.getItem("cart_id")));
      setCouponText("");
      fetchSingCart()
      // setapplyCoupon(true);
    } else {
      alert(res.data.message, "top-right");
    }
  };
  let couponRemove = async () => {
    let data = {
      cart_id: carts?.id,
    };
    
    let res = await cartServices.couponRemove(data);
    if (res.status === 200) {
      alert(res.data.message, "top-right");
      fetchSingCart()
      // dispatch(singlecart(localStorage.getItem("cart_id")));
    } else {
      alert(res.data.message, "top-right");
    }
  };

  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    // console.log(pickerResult.uri, pickerResult.assets[0].uri, "picker");
    if (!pickerResult?.cancelled) {
      setSelectedImage({ localUri: pickerResult.assets[0].uri });
      setImageAssets(pickerResult.assets[0]);
    }
  };
  const submit = async () => {
    // console.log("e", e);
    let formdata = new FormData();
    if (shopName) formdata.append("shop_name", shopName);
    if (bkash) formdata.append("bkash", bkash);

    if (imageAssets?.uri) {
      formdata.append("shop_image", {
        uri: imageAssets.uri,
        type: "image/jpeg",
        name: new Date().getTime() + ".jpg",
      });
    }
    // console.log("monjur", bkash, shopName);
    // setloading(true);
    const res = await authServices.addShop(formdata);
    // console.log("formdata res", res);
    if (res?.status === 200) {
      // setloading(false);
      // console.log(res, "after info shop");
      // alert(res?.data?.message || "api message changed", "top-right");
      // dispatch(getUserDetails());
      // setModalOpen(false);
    } else {
      // setloading(false);
      // console.log(res, "after info error");
      // alert(res?.data?.message || "api message changed", "top-right");
    }
  };

  let showTotalProfit = "";
  if (calculateTotal() > 0) {
    showTotalProfit = (
      <Text
        style={{
          fontSize: 18,
        }}
        color="green"
      >
        {Math.abs(calculateTotal()).toFixed(2)}
      </Text>
    );
  } else {
    showTotalProfit = (
      <Text
        color="red"
        style={{
          fontSize: 18,
        }}
      >
        {Math.abs(calculateTotal()).toFixed(2)}
      </Text>
    );
  }

  return (
    <Mainlayout>

      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              backgroundColor: "#FFF",
              //   borderBottomColor: "#DDD",
              //   borderBottomWidth: 1,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <Text>Customer Information</Text>
            <TouchableOpacity>
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 1,
              backgroundColor: "#ffff",
              minHeight: 120,
              //   marginTop: 10,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,

              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <AntDesign name="user" size={22} color="gray" />
              <Text style={{ fontSize: 16, color: "gray" }}>{data?.name}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Feather name="phone" size={22} color="gray" />
              <Text style={{ fontSize: 16, color: "gray" }}>
                {data?.phone_number}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
              <EvilIcons name="location" size={22} color="gray" />
              <Text style={{ fontSize: 16, color: "gray" }}>
                {data?.address}
              </Text>
            </View>
          </View>
        </View>
        {/* products */}
        {singleCart?.items.map((item, index) => (
          <SingleCart key={index} item={item} />
        ))}

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,

              backgroundColor: "#222222",
              borderRadius: 3,
            }}
          >
            <Text style={{ color: "white" }}>Total earnings</Text>
          </View>
          <View
            style={{
              marginTop: 10,
              borderRadius: 10,
              // backgroundColor: "#FFFFFF",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 7,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "600" }}>
                Total collection amount
              </Text>
              <Text style={{ fontSize: 17, fontWeight: "600" }}>
                {/* {" "} */}
                {singleCart?.reseller_to_customer_price -
                  singleCart?.advance_from_customer}
                BDT
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 7,
              }}
            >
              <Text style={{ fontSize: 15, color: "red" }}>
                Supplier amount
              </Text>
              <Text style={{ fontSize: 15, color: "red" }}>
                (-) {singleCart?.price} BDT
              </Text>
            </View>
            {/* if discount then show  */}
            {
              singleCart.coupon?.cashback_discount ===
              "discount" &&  <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 7,
              }}
            >
              <Text style={{ fontSize: 15, color: "green" }}>
              (+) 190 BDT discount applied
              </Text>
              <Text style={{ fontSize: 15, color: "red" }}>
                (-) {singleCart?.price-singleCart?.discount} BDT
              </Text>
            </View>
            }
           
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 7,
              }}
            >
              <Text style={{ fontSize: 15, color: "red" }}>
                Proccessing Fee
              </Text>
              <Text style={{ fontSize: 15, color: "red" }}>
                (-) {processingFee} BDT
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 7,
              }}
            >
              <Text style={{ fontSize: 15, color: "red" }}>
                Shipping Charge
              </Text>
              <Text style={{ fontSize: 15, color: "red" }}>
                (-) {shippingFee} BDT
              </Text>
            </View>
            {/* if cashback then show */}
            {
              singleCart?.coupon?.cashback_discount ===
              "cashback" &&  <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 7,
              }}
            >
              <Text style={{ fontSize: 15, color: "green" }}>
              Cashback
              </Text>
              <Text style={{ fontSize: 15, color: "green" }}>
                (+) {singleCart?.discount} BDT
              </Text>
            </View>
            }
           
          </View>
        </View>
        {/* if not copon code   */}
        {
         !singleCart?.coupon_code &&   <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            alignItems: "center",
            gap: 7,
            marginTop: 10,
          }}
        >
          <TextInput
            // value={quantity}
            onChangeText={(text) => setCouponText (text)}
            // keyboardType="decimal-pad"
            style={{
              textAlign: "center",
              borderColor: "#E6E7E8",
              borderWidth: 1,
              width: scale(200),
              height: 40,
              backgroundColor: "#FFFFFF",
              fontSize: 14,
            }}
          />
          <TouchableOpacity
          onPress={applyVoucher}
        
            style={{
              backgroundColor: "black",
              paddingHorizontal: 25,
              height: 40,
            }}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                marginTop: 10,
                fontWeight: "500",
              }}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
        }

        {/* if coupon code  */}
        {singleCart?.coupon_code && (
                <View style={{alignSelf:"flex-end",flexDirection:"row",gap:10,alignItems:"center"}}>
                  <Text style={{fontSize:16,fontWeight:"bold"}}>Applied Coupon:

                    <Text style={{fontSize:14,fontWeight:"500",color:"red"}}>{singleCart?.coupon_code}</Text>
                  </Text>
                  <TouchableOpacity onPress={couponRemove} style={{borderWidth:1,padding:2,borderRadius:5,borderColor:"red"}} >
                  <AntDesign name="delete" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              )}
       
      
        
       
        <View
          style={{
            borderTopColor: "#DDD",
            borderTopWidth: 1,
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 7,
          }}
        >
          <Text style={{ fontSize: 15, color: "red" }}>{calculateTotal() > 0 ? "Total Profit" : "Due Amount"}</Text>
          <Text style={{ fontSize: 15, color: "red" }}>{showTotalProfit||0}   BDT</Text>
        </View>
        <View style={{ height: 200 }}></View>
      </ScrollView>
     


      <TouchableOpacity
        onPress={orderPlace}
        style={{
          position: "absolute",
          backgroundColor: calculateTotal() > 0 ? "green" : "#be202e",
          width: Dimensions.get("window").width,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          marginTop: Dimensions.get("window").height - 50,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>
        {calculateTotal() > 0
                  ? "Order Now"
                  : "Pay BDT " +
                    Math.abs(calculateTotal()).toFixed(2) +
                    " and Confirm Order"}
        </Text>
      </TouchableOpacity>

      {/* modal */}
      <Modal
        visible={isShopModal}
        animationType="slide"
        transparent={true}
        // onRequestClose={() => setSearchPreCustomer(false)}
      >
        {/* <Text>jEDJFDJKFJSDKJ </Text> */}
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsShopModal(false)}
            >
              <AntDesign
                style={styles.closeButtonText}
                name="close"
                size={24}
                color="black"
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                borderBottomWidth: 1,
                borderBottomColor: "#cccc",
                padding: 10,
              }}
            >
              Shop Information
            </Text>

            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.container}
            >
              <TouchableOpacity
                onPress={openImagePickerAsync}
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  width: 150,
                  height: 150,
                  justifyContent: "center",
                  borderWidth: 1,
                  marginVertical: 10,
                  borderColor: "#ccc",
                }}
              >
                {/* <Text>+</Text> */}
                {selectedImage !== null ? (
                  <Image
                    source={{ uri: selectedImage.localUri }}
                    style={{
                      width: 150,
                      height: 150,
                      resizeMode: "cover",
                      // marginTop: 20,
                    }}
                  />
                ) : (
                  <Text>+</Text>
                )}
              </TouchableOpacity>
              <TextInput
                onChangeText={(text) => setShopName(text)}
                placeholder="Enter shop name"
                style={styles.input}
              />
              <TextInput
                onChangeText={(text) => setBkash(text)}
                placeholder="Enter bkash number"
                style={[styles.input, { marginTop: 20 }]}
                keyboardType="decimal-pad"
              />
              <TouchableOpacity style={styles.submitButton} onPress={submit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    </Mainlayout>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ececec",
    padding: 10,
    borderRadius: 10,
    paddingTop: 20,
    width: "95%",
    height: 500,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    height: 55,
    borderWidth: 1,
    borderColor: "#bbbb",
    borderRadius: 7,
    paddingHorizontal: 10,
  },
  submitButton: {
    height: 55,
    backgroundColor: "#BE202E",
    marginTop: 20,
    borderRadius: 7,
    justifyContent: "center",
    width: "100%",
  },
  submitButtonText: {
    textAlign: "center",
    color: "white",
  },
});
