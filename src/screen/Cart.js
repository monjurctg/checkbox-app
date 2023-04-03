import {Image, ScrollView, StyleSheet, TextInput} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import View from "../components/tags/View";
import Text from "../components/tags/Text";
import {scale} from "../../utils/funtions";
import CustomTouchBtn from "../components/tags/CustomTouchBtn";
import {colors} from "../theme/colors";
import img1 from "../../assets/img/redShoe.png";
import SingleCart from "../components/cart/SingleCart";
import {Feather} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import FullScreenLoader from "../components/loader/FullScreenLoader ";

const Cart = () => {
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
          preset={["row jc_between ph_10 mt_5 "]}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#DDDDDD",
            paddingBottom: scale(5),
          }}>
          <Text preset={["bold fs_16"]}>Cart{"(5)"}</Text>
          <CustomTouchBtn>
            <AntDesign name="closecircleo" size={scale(20)} color="black" />
          </CustomTouchBtn>
        </View>

        <View
          preset={["mt_10 border_1 row jc_between"]}
          style={{borderColor: colors.cartBorder}}>
          <Text preset={["bold fs_16"]}>Untitled Cart 4</Text>
          <CustomTouchBtn>
            <Feather name="edit" size={scale(20)} color="black" />
          </CustomTouchBtn>
        </View>

        <View preset={["mt_10"]}>
          <SingleCart src={img1} />
          <SingleCart src={img1} />

          <SingleCart src={img1} />

          <SingleCart src={img1} />
          <SingleCart src={img1} />

          <SingleCart src={img1} />

          <SingleCart src={img1} />

          <SingleCart src={img1} />
        </View>
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
            <Text preset={["bold"]}>Total</Text>
            <Text preset={["bold"]}>৳ 1220</Text>
          </View>
          <CustomTouchBtn
            preset={["mt_10 center"]}
            style={{
              backgroundColor: "#BE202E",
              borderRadius: 4,
              padding: scale(8),
            }}>
            <Text style={{color: "white"}} preset={["fs_16 bold"]}>
              Save & Copy Cart Link
            </Text>
          </CustomTouchBtn>
        </View>
        <View style={{height: scale(130)}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
