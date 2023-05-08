import {ScrollView, StyleSheet, TextInput} from "react-native";
import React, {useState} from "react";
import FullScreenLoader from "../components/loader/FullScreenLoader ";
import {SafeAreaView} from "react-native-safe-area-context";
import View from "../components/tags/View";
import Text from "../components/tags/Text";
import CustomTouchBtn from "../components/tags/CustomTouchBtn";
import SaveSingleCart from "../components/cart/SaveSingleCart";
import {scale} from "../../utils/funtions";
import {AntDesign} from "@expo/vector-icons";

const Checkout = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  if (loading) {
    return <FullScreenLoader visible={loading} />;
  }
  return (
    <SafeAreaView>
      <ScrollView style={{paddingHorizontal: scale(10)}}>
        <View
          preset={["row jc_between  mt_15 "]}
          style={{
            borderWidth: 1,
            borderColor: "#DDDDDD",
            padding: scale(5),
          }}>
          <Text preset={["bold fs_16"]}>Shipping Details</Text>
          <CustomTouchBtn>
            <AntDesign name="down" size={scale(18)} color="black" />
          </CustomTouchBtn>
        </View>

        <View preset={["row p_5"]} style={styles.borderBottom}>
          <Text preset={["fs_16 fw_400 lh_20"]} style={{width: scale(120)}}>
            Name
          </Text>
          <TextInput
            style={styles.input}

            // onChangeText={onChangeText}
            // value={text}
          />
        </View>
        <View preset={["row p_5"]} style={styles.borderBottom}>
          <Text preset={["fs_16 fw_400 lh_20"]}>Phone Number</Text>
          <TextInput
            style={styles.input}

            // onChangeText={onChangeText}
            // value={text}
          />
        </View>
        {/* country and city */}
        <View preset={["row mt_10 jc_between"]}>
          <CustomTouchBtn
            preset={["row ph_5 jc_between"]}
            style={[styles.borderBottom, {width: scale(140)}]}>
            <Text>Country</Text>
            <AntDesign name="down" size={scale(18)} color="black" />
          </CustomTouchBtn>
          <CustomTouchBtn
            preset={["row ph_5 jc_between"]}
            style={[
              styles.borderBottom,
              {width: scale(140), marginLeft: scale(10)},
            ]}>
            <Text>City</Text>
            <AntDesign name="down" size={scale(18)} color="black" />
          </CustomTouchBtn>
        </View>

        {/* Thana Road */}
        <View preset={["row mt_15 jc_between"]}>
          <CustomTouchBtn
            preset={["row ph_5 jc_between"]}
            style={[styles.borderBottom, {width: scale(140)}]}>
            <Text>Thana</Text>
            <AntDesign name="down" size={scale(18)} color="black" />
          </CustomTouchBtn>
          <CustomTouchBtn
            preset={["row ph_5 jc_between"]}
            style={[
              styles.borderBottom,
              {width: scale(140), marginLeft: scale(10)},
            ]}>
            <Text>Road</Text>
            <AntDesign name="down" size={scale(18)} color="black" />
          </CustomTouchBtn>
        </View>

        {/*  */}

        <View
          preset={[" p_10 mt_15 "]}
          style={{
            borderWidth: 1,
            borderColor: "#DDDDDD",
            paddingBottom: scale(5),
          }}>
          <View preset={["row jc_between"]}>
            <Text preset={["bold lh_20   fs_16"]}>
              Md Ajharul Islam (01615001811)
            </Text>
            <CustomTouchBtn>
              <AntDesign name="down" size={scale(18)} color="black" />
            </CustomTouchBtn>
          </View>
          <Text preset={[" mt_10 lh_14 fs_11"]} style={{color: "#58595B"}}>
            22 Dec 2022 at 03:20 PM, 2 items, ৳1221220.00
          </Text>
        </View>

        {/*  */}
        <View preset={["mt_10 p_5"]}>
          <View
            preset={["row jc_between"]}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#DDDDDD",
              paddingBottom: scale(10),
            }}>
            <Text>Subtotal</Text>
            <Text>৳ 1200</Text>
          </View>
          <View
            preset={["row mt_15 jc_between"]}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#DDDDDD",
              paddingBottom: scale(10),
            }}>
            <Text>Tax(%)</Text>
            <Text>৳ 20</Text>
          </View>
          <View
            preset={["row mt_15 jc_between"]}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#DDDDDD",
              paddingBottom: scale(10),
            }}>
            <Text>shipping</Text>
            <Text>৳ 20</Text>
          </View>
          <View
            preset={["row mt_15 jc_between"]}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#DDDDDD",
              paddingBottom: scale(10),
            }}>
            <Text preset={["bold fs_14"]}>Total</Text>
            <Text preset={["bold fs_14"]}>৳ 1220</Text>
          </View>
          <View
            preset={["row mt_15 jc_between"]}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#DDDDDD",
              paddingBottom: scale(10),
            }}>
            <Text>Paid to Reseller</Text>
            <View preset={["row"]}>
              <Text preset={["mr_10 fs_16"]}>৳ </Text>
              <TextInput
                keyboardType="decimal-pad"
                style={{
                  borderColor: "#E6E7E8",
                  borderWidth: 1,
                  paddingLeft: scale(10),
                  // marginLeft: scale(5),
                  fontSize: scale(16),
                  width: scale(120),
                  backgroundColor: "#FFFFFF",
                }}
              />
            </View>
          </View>

          <View
            preset={["row mt_15 jc_between"]}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#DDDDDD",
              paddingBottom: scale(10),
            }}>
            <Text preset={["bold fs_14"]}>Amount to Pay</Text>
            <Text preset={["bold fs_14"]}>৳ 122,320</Text>
          </View>
          <CustomTouchBtn
            preset={["mt_10 center"]}
            style={{
              backgroundColor: "#BE202E",
              borderRadius: 4,
              padding: scale(8),
            }}>
            <Text style={{color: "white"}} preset={["fs_16 bold"]}>
              Place Order
            </Text>
          </CustomTouchBtn>
        </View>

        <View style={{height: scale(60)}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Checkout;

const styles = StyleSheet.create({
  borderBottom: {
    borderBottomWidth: 1,
    marginTop: scale(10),
    borderBottomColor: "#DDDDDD",
    paddingBottom: scale(5),
  },
  input: {
    height: scale(30),
    width: scale(210),
    paddingLeft: scale(10),
  },
});
