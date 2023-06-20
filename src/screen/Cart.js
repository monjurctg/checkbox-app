import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import View from "../components/tags/View";
import Text from "../components/tags/Text";
import { scale } from "../../utils/funtions";
import CustomTouchBtn from "../components/tags/CustomTouchBtn";
import { colors } from "../theme/colors";
import img1 from "../../assets/img/redShoe.png";
import SingleCart from "../components/cart/SingleCart";
import { Feather } from "@expo/vector-icons";
import FullScreenLoader from "../components/loader/FullScreenLoader ";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  if (loading) {
    return <FullScreenLoader visible={loading} />;
  }
  const item = {
    image: "../../../assets/img/redShoe.png",
    name: "Nike Super Jordan 615 Shoe for Men",
    price: "8520.24",
    color: "Black",
    size: "44",
    type: "Leather",
    origin: "Bangladesh",
    quantity: "120",
    customerRate: "12000.50",
  };
  return (
    <SafeAreaView>
      <ScrollView style={{ paddingHorizontal: scale(10) }}>
        <View
          preset={[" ph_10 mt_5 "]}
          style={{
            // borderBottomWidth: 1,
            // borderBottomColor: "#DDDDDD",
            paddingBottom: scale(5),
          }}
        >
          {/* <Text preset={["bold fs_16"]}>Cart{"(5)"}</Text> */}
          <CustomTouchBtn onPress={() => navigation?.navigate("home")}>
            {/* <Entypo
             
              name="cross"
              size={24}
              color="black"
            /> */}
            <AntDesign
              style={{ textAlign: "right" }}
              name="close"
              size={24}
              color="black"
            />
          </CustomTouchBtn>
        </View>
        <View preset={["mt_10 ph_10 row jc_between"]}>
          <Text preset={["bold  fs_20"]}>Current Cart</Text>
          <View preset={["flex row center"]}>
            <TouchableOpacity
              style={{
                borderColor: "#BE202E",
                borderWidth: 1,
                padding: 8,
                borderRadius: 10,
                marginRight: 10,
              }}
            >
              <Text
                style={{
                  // fontFamily: "Gotham",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: 12,
                  lineHeight: 12,
                  color: "#BE202E",
                  textAlign: "center",
                }}
              >
                Copy Cart Link
              </Text>
            </TouchableOpacity>
            <CustomTouchBtn>
              <Feather name="edit" size={scale(20)} color="black" />
            </CustomTouchBtn>
          </View>
        </View>

        <View
          preset={["mt_10 border_1 row center"]}
          style={{ borderColor: "black", borderRadius: 10 }}
        >
          <Text preset={["fs_11"]} style={{ color: "#414042" }}>
            Switch Cart
          </Text>
        </View>

        <View preset={["mt_10"]}>
          <SingleCart item={item} />
          <SingleCart item={item} />
          <SingleCart item={item} />
        </View>
        <View preset={["mt_35 p_5 flex row jc_between"]}>
          <TouchableOpacity
            style={{
              borderColor: "#BE202E",
              borderWidth: 1,
              padding: scale(8),
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: "#BE202E",
                textAlign: "center",
              }}
              preset={["fs_12 bold"]}
            >
              Save Cart
            </Text>
          </TouchableOpacity>
          <CustomTouchBtn
            preset={["center"]}
            style={{
              borderColor: "#BE202E",
              borderWidth: 1,
              backgroundColor: "#BE202E",
              borderRadius: 4,
              padding: scale(8),
            }}
          >
            <Text style={{ color: "white" }} preset={["fs_12 bold"]}>
              Proceed to Customer Details Page
            </Text>
          </CustomTouchBtn>
        </View>
        <View style={{ height: scale(20) }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
