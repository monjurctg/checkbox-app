import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Mainlayout from "../components/layout/Mainlayout";
import { AntDesign } from "@expo/vector-icons";
import { scale } from "../../utils/funtions";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setSelectDistricts, setThana } from "../redux/reducers/utilsSlice";

const WebViewUrl = ({ route }) => {
  const { url } = route.params;
  const [paymentStatus, setPaymentStatus] = useState(0);
  const [paymentData, setPaymentData] = useState();
  const [queryParams, setQueryParams] = useState({});
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // console.log(url);
  const _onNavigationStateChange = async (webViewState) => {
    const geturl = webViewState.url;
    // console.log(geturl, "geturl");
    const getsplit = geturl.split("&");
    // console.log(getsplit);
    // console.log(getsplit[0].split("/"), "geturl");
    const succes = getsplit[0]?.split("?")[0]?.split("/")[4];
    // console.log(succes);
    if (succes == "payment-order") {
      await AsyncStorage.removeItem("cart_id");

      setPaymentStatus(1);
      setPaymentData(getsplit);
      const extractedParams = extractQueryParams(geturl);
      setQueryParams(extractedParams);
      dispatch(setSelectDistricts({}));
      dispatch(setThana({}));
    }

    // getsplit.map((item,index)=>{
    //     const itemsplit = item.split("=");
    //     //console.log(itemsplit[1]);
    //     if(itemsplit[0]=='status'){
    //         setPaymentStatus(itemsplit[1]);
    //     }
    // })
  };
  function extractQueryParams(url) {
    const params = {};
    const query = url.split("?")[1];
    if (query) {
      const paramPairs = query.split("&");
      for (const pair of paramPairs) {
        const [key, value] = pair.split("=");
        params[key] = decodeURIComponent(value);
      }
    }
    return params;
  }

  const testFunc = () => {
    // console.log("clik");
    const url =
      "https://checkbox-rosy.vercel.app/cart/payment-order?amount=6490.70&currency=BDT&order_code=ORD-1695061307565&tran_id=CHK-2023091865089533e083c&store_name=Checkbox&payment_method=TRUST%20BANK,%20LTD.&time=Sep%2018,%202023%2018:21:47&sender=monjur";

    // Extract query parameters from the URL and set them in state
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      // Call your function here when navigating back
      yourFunction(e);
    });

    return unsubscribe;
  }, []);

  const yourFunction = (e) => {
    e.preventDefault();
    // console.log("hello calling");
    // Reset the navigation stack to the home screen
    navigation.reset({
      index: 0,
      routes: [{ name: "home" }], // Replace 'Home' with the name of your home screen
    });
    navigation.navigate("Products");
  };

  return (
    <>
      {paymentStatus == 0 ? (
        <WebView
          source={{ uri: url }}
          onNavigationStateChange={_onNavigationStateChange.bind(this)}
          style={{ flex: 1 }}
        />
      ) : (
        <Mainlayout>
          <ScrollView>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={{ marginTop: 50, alignItems: "center" }}>
                <AntDesign name="checkcircle" size={64} color="green" />
                <Text
                  style={{ textAlign: "center", fontSize: 24, marginTop: 10 }}
                >
                  Payment Success
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 10,
                    fontWeight: 300,
                    color: "gray",
                  }}
                >
                  Your payment has been successfully processed
                </Text>
                <TouchableOpacity
                  onPress={testFunc}
                  style={{
                    paddingVertical: 15,
                    backgroundColor: "#000",
                    paddingHorizontal: 70,
                    borderRadius: 10,
                    marginTop: 20,
                  }}
                >
                  <Text style={{ color: "white" }}>Buy Again</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  backgroundColor: "#DDD",
                  width: scale(330),
                  height: scale(320),
                  marginTop: 20,
                  borderRadius: 20,
                }}
              >
                <View style={{ padding: 15, flexDirection: "column", gap: 15 }}>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>Amount</Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {queryParams.amount} {queryParams.currency}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>Payment Method</Text>
                    <Text
                      style={{
                        fontSize: 13,
                        backgroundColor: "#f6ffed",
                        // fontWeight: "bold",
                        padding: 3,
                        borderRadius: 10,
                        color: "##389e0d",
                        borderWidth: 1,
                        borderColor: "##b7eb8f",
                      }}
                    >
                      {queryParams.payment_method}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>Store Name</Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {queryParams.store_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>Sender</Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {queryParams.sender}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>Order Code</Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {queryParams.order_code}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>Transaction ID</Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {queryParams.tran_id}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>Time</Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {queryParams.time}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </Mainlayout>
      )}
    </>
  );
};

export default WebViewUrl;

const styles = StyleSheet.create({});
