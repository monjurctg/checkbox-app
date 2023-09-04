import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { TextInputBase } from "react-native";
import cartServices from "../services/cartServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomerBillingInfo = ({ carts, setIsBill }) => {
  const [billFromCustomer, setBillFromCustomer] = useState(
    carts?.reseller_to_customer_price?.toString()
  );
  const [adVance, setAdvance] = useState(
    carts?.advance_from_customer?.toString()
  );
  // const [total, setTotal] = useState(bi);

  let saveBillingInfo = async () => {
    let data = {
      cart_id: carts?.id,
      type: "bill_info ",
      reseller_to_customer_price: billFromCustomer,
      advance_from_customer: adVance,
    };
    // console.log(data);
    if (billFromCustomer - adVance == 0) {
      alert("Total Collection Amount can not be 0", "top-right");
    } else {
      let res = await cartServices.updateCartBilling(data);
      if (res.status === 200) {
        alert(res?.data?.message, "top-right");
        setAdvance(res?.data?.data?.advance_from_customer);
        setBillFromCustomer(res?.data?.data?.reseller_to_customer_price);
        await AsyncStorage.setItem("billingInfo", `${carts.items[0].cart_id}`);
        setIsBill(true);
        // setdisabled(true);
        // setshowUpdateBtn(true);
        // changeDisable({
        //   billing: 0,
        //   shipping: 1,
        // });

        // dispatch(shippingChange(0));

        // showUpdateBtnLocal({
        //   billing: 1,
        //   shipping: 0,
        // });

        // setactive(false);
      }
    }
  };

  return (
    <View style={{ marginTop: 40 }}>
      <View
        style={{
          backgroundColor: "#C7C7C7",
          padding: 10,
          borderLeftWidth: 4,
        }}
      >
        <Text style={{ color: "gray", fontSize: 16 }}>Billing Info</Text>
      </View>
      <View
        style={{
          // borderWidth:1,
          marginTop: 10,
          borderColor: "#e6e7e8",
          backgroundColor: "#FFFFFF",
          padding: 16,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor: "#e6e7e8",
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}
        >
          <Text>Total Supplier Rate </Text>
          <View
            style={{
              minWidth: 120,
              padding: 10,
              borderWidth: 1,
              borderColor: "hsla(0,0%,50%,.329)",
              position: "relative",
            }}
          >
            <Text>{carts?.customerRate} BDT</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor: "#e6e7e8",
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}
        >
          <Text>Bill from Customer </Text>
          <TextInput
            placeholder=""
            value={billFromCustomer}
            onChangeText={(text) => setBillFromCustomer(text)}
            keyboardType="numeric"
            style={{
              minWidth: 120,
              padding: 6,
              borderWidth: 1,
              borderColor: "hsla(0,0%,50%,.329)",
              position: "relative",
            }}
          />
        </View>
        <View
          style={{
            display: "flex",
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor: "#e6e7e8",
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}
        >
          <Text>Advance Amount </Text>
          <TextInput
            placeholder=""
            keyboardType="numeric"
            onChangeText={(text) => setAdvance(text)}
            value={adVance}
            style={{
              minWidth: 120,
              padding: 6,
              borderWidth: 1,
              borderColor: "hsla(0,0%,50%,.329)",
              position: "relative",
            }}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16,
            borderBottomColor: "#e6e7e8",
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}
        >
          <Text>Total Collection Amount </Text>
          <View
            style={{
              minWidth: 120,
              padding: 10,
              borderWidth: 1,
              borderColor: "hsla(0,0%,50%,.329)",
              position: "relative",
            }}
          >
            <Text>{billFromCustomer - adVance} BDT</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={saveBillingInfo}
        style={{
          backgroundColor: "black",
          marginTop: 10,
          justifyContent: "center",
          padding: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          Proceed to shipping information
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomerBillingInfo;

const styles = StyleSheet.create({});
