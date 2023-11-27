import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import cartServices from "../services/cartServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const CustomerBillingInfo = ({ carts, setIsBill,refatch }) => {
  const [billFromCustomer, setBillFromCustomer] = useState(carts?.reseller_to_customer_price?.toString());
  const [adVance, setAdvance] = useState(carts?.advance_from_customer?.toString());
  const [errorMessage,setErroMessage]=useState("")


  let saveBillingInfo2 = async () => {
    const min = singlecartData?.cart_min_selling_price;
    const max = singlecartData?.cart_max_selling_price;
    if (!singlecartData?.id) {
      errorNotification("Please add product to cart");
      router.push("/product-list");
    } else {

      // console.log('reseller_to_customer_price',  reseller_to_customer_price <= min)
      if (
        reseller_to_customer_price < min ||
        reseller_to_customer_price > max
      ) {
        errorNotification(
          "Please enter a value between " + min + " and " + max,
          "top-right"
        );
      }

      else {
        let data = {
          cart_id: singlecartData?.id,
          type: "bill_info ",
          reseller_to_customer_price: reseller_to_customer_price,
          advance_from_customer: advance_from_customer,
        };
        if (reseller_to_customer_price - advance_from_customer == 0) {
          errorNotification(
            "Total Collection Amount can not be 0",
            "top-right"
          );
        }

        else {
          let res = await cartServices.updateCartBilling(data);
          if (res.status === 200) {
            successNotification(res?.data?.message, "top-right");
            setadvance_from_customer(res?.data?.data?.advance_from_customer);
            setreseller_to_customer_price(
              res?.data?.data?.reseller_to_customer_price
            );
            setdisabled(true);
            setshowUpdateBtn(true);
            changeDisable({
              billing: 0,
              shipping: 1,
            });

            dispatch(shippingChange(0));

            showUpdateBtnLocal({
              billing: 1,
              shipping: 0,
            });

            // setactive(false);
          }
        }
      }
    }
  };

  const saveBillingInfo = async () => {
    const min = carts?.cart_min_selling_price;
    const max = carts?.cart_max_selling_price;
    if (billFromCustomer < min ||billFromCustomer > max) {
      setErroMessage("Please enter a value between " + min + " and " + max)

      return

    }


    let data = {
      cart_id: carts?.id,
      type: "bill_info",
      reseller_to_customer_price: billFromCustomer,
      advance_from_customer: adVance,
    };

    if (billFromCustomer - adVance === 0) {
      setErroMessage('Total Collection Amount can not be 0.')

      // alert("Total Collection Amount can not be 0");
      return
    } else {
      console.log(data)
      let res = await cartServices.updateCartBilling(data);
      if (res.status === 200) {
        // alert(res?.data?.message, "top-right");
        refatch()
        Toast.show({
          type: "success",
          text1: "Successfull",
          text2: res?.data?.message,
          visibilityTime: 4000,
          autoHide: true,
          bottomOffset: 280,
          onShow: () => { },
          onHide: () => { },
        });

        setAdvance(res?.data?.data?.advance_from_customer);
        setBillFromCustomer(res?.data?.data?.reseller_to_customer_price);
        setIsBill(false);
        await AsyncStorage.setItem("billingInfo", `${carts.items[0].cart_id}`);
      }
    }
  };

  return (
    <View style={{ marginTop: 40 }}>
      <View style={{ backgroundColor: "#C7C7C7", padding: 10, borderLeftWidth: 4 }}>
        <Text style={{ color: "gray", fontSize: 16 }}>Billing Info</Text>
      </View>
      <View style={{ marginTop: 10, borderColor: "#e6e7e8", backgroundColor: "#FFFFFF", padding: 16 }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#e6e7e8", borderBottomWidth: 1, paddingBottom: 10 }}>
          <Text>Total Product Cost</Text>
          <View style={{ minWidth: 120, padding: 10, borderWidth: 1, borderColor: "hsla(0,0%,50%,.329)", position: "relative" }}>
            <Text>{carts?.customerRate} BDT</Text>
          </View>
        </View>
        <View style={{ display: "flex", marginTop: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#e6e7e8", borderBottomWidth: 1, paddingBottom: 10 }}>
          <Text> Total selling price</Text>
          <TextInput
            placeholder=""
            value={billFromCustomer}
            onChangeText={(text) => {
              setBillFromCustomer(text)
              setErroMessage("")
            }}
            keyboardType="numeric"
            style={{ minWidth: 120, padding: 6, borderWidth: 1, borderColor: "hsla(0,0%,50%,.329)", position: "relative" }}
          />
        </View>
        <View style={{ display: "flex", marginTop: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#e6e7e8", borderBottomWidth: 1, paddingBottom: 10 }}>
          <Text>Advance From Customer</Text>
          <TextInput
            placeholder=""
            keyboardType="numeric"
            onChangeText={(text) => setAdvance(text)}
            value={adVance}
            style={{ minWidth: 120, padding: 6, borderWidth: 1, borderColor: "hsla(0,0%,50%,.329)", position: "relative" }}
          />
        </View>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16, borderBottomColor: "#e6e7e8", borderBottomWidth: 1, paddingBottom: 10 }}>
          <Text> To be collected from customer</Text>
          <View style={{ minWidth: 120, padding: 10, borderWidth: 1, borderColor: "hsla(0,0%,50%,.329)", position: "relative" }}>
            <Text>{billFromCustomer - adVance} BDT</Text>
          </View>
        </View>
      </View>
      {
        errorMessage.trim() && <Text style={{color:"red",fontSize:12,padding:5}}>{errorMessage}</Text>
      }
      <TouchableOpacity onPress={saveBillingInfo} style={{ backgroundColor: "black", marginTop: 10, justifyContent: "center", padding: 10 }}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>Proceed to shipping information</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(CustomerBillingInfo);

const styles = StyleSheet.create({});
