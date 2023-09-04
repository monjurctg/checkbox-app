import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Mainlayout from "../components/layout/Mainlayout";
import { Feather, EvilIcons, AntDesign } from "@expo/vector-icons";
import SingleProduct from "../components/products/SingleProduct";
import SingleCart from "../components/cart/SingleCart";
const ConfirmOrder = ({ navigation }) => {
  return (
    <Mainlayout>
      <ScrollView>
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
              <Text style={{ fontSize: 16, color: "gray" }}>Monjurul alam</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Feather name="phone" size={22} color="gray" />
              <Text style={{ fontSize: 16, color: "gray" }}>01829940853</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
              <EvilIcons name="location" size={22} color="gray" />
              <Text style={{ fontSize: 16, color: "gray" }}>abc,abc,abc</Text>
            </View>
          </View>
        </View>
        {/* products */}
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,

              backgroundColor: "#FFF",
            }}
          >
            <Text>Customer Information</Text>
          </View>
          <View
            style={{
              marginTop: 10,
              borderRadius: 10,
              backgroundColor: "#FFFFFF",
            }}
          >
            <SingleCart item={{ product_name: "product1" }} />
            <SingleCart item={{ product_name: "product1" }} />
          </View>
        </View>
      </ScrollView>
    </Mainlayout>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({});
