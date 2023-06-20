import { Image, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import View from "../tags/View";
import Text from "../tags/Text";
import { scale } from "../../../utils/funtions";
import { colors } from "../../theme/colors";
import { MaterialIcons } from "@expo/vector-icons";

const SingleCart = ({ item }) => {
  return (
    <View style={{ borderColor: colors.cartBorder }}>
      <View preset={["row mt_15 "]}>
        <View style={{ width: scale(110) }}>
          <MaterialIcons
            style={{
              backgroundColor: "white",
              position: "absolute",
              zIndex: 50,
              right: 4,
              top: 4,
              padding: 4,
              fontSize: scale(14),
              color: "#EE2349",
              borderRadius: 32,
            }}
            name="delete-outline"
            size={24}
            color="black"
          />
          <Image
            style={{
              width: scale(110),
              height: scale(110),
              borderColor: "#231F20",
              borderWidth: 1,
            }}
            // source={{ uri: item?.image }}
            // source={require(`${item?.image}`)}
            source={require("../../../assets/img/redShoe.png")}
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
          <Text preset={["bold lh_20  fs_14 "]}>{item?.name}</Text>
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
          Quantity{"    "}
        </Text>
        <TextInput
          value={item?.quantity}
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
          {"    "}x Customer Rate
        </Text>
        <TextInput
          keyboardType="decimal-pad"
          value={item?.customerRate}
          style={{
            borderColor: "#E6E7E8",
            borderWidth: 1,
            marginLeft: scale(5),
            width: scale(110),
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
