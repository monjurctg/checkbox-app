import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import React from "react";
import Mainlayout from "../components/layout/Mainlayout";
import { Feather, EvilIcons, AntDesign } from "@expo/vector-icons";
import SingleProduct from "../components/products/SingleProduct";
import SingleCart from "../components/cart/SingleCart";
import { colors } from "../theme/colors";
import { scale } from "../../utils/funtions";

const ConfirmOrder = ({ navigation, route }) => {
  const { data, carts } = route.params;
  // console.log(data, "data from confirm order");
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
        {carts?.items.map((item, index) => (
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
              <Text style={{ fontSize: 17, fontWeight: "600" }}>300BDT</Text>
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
              <Text style={{ fontSize: 15, color: "red" }}>(-) 10000 BDT</Text>
            </View>
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
              <Text style={{ fontSize: 15, color: "red" }}>(-) 30 BDT</Text>
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
              <Text style={{ fontSize: 15, color: "red" }}>(-) 100 BDT</Text>
            </View>
          </View>
        </View>
        <View
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
            // onChangeText={(text) => setQuantity(text)}
            keyboardType="decimal-pad"
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
          <Text style={{ fontSize: 15, color: "red" }}>Proccessing Fee</Text>
          <Text style={{ fontSize: 15, color: "red" }}>(-) 30 BDT</Text>
        </View>
        <View style={{ height: 200 }}></View>
      </ScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          backgroundColor: colors.primary_2,
          width: Dimensions.get("window").width,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          marginTop: Dimensions.get("window").height - 50,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>
          Pay and Confirm Order
        </Text>
      </TouchableOpacity>
    </Mainlayout>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({});
