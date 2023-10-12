import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { height, scale, width } from "../../utils/funtions";
import { colors } from "../theme/colors";
import { Feather } from "@expo/vector-icons";
import CustomTouchBtn from "../components/tags/CustomTouchBtn";
import Card from "../components/SavedCart/Card";
import Mainlayout from "../components/layout/Mainlayout";

const SavedCart = () => {
  const handleViewPress = () => {
    // console.log("View pressed");
  };

  const handleEditPress = () => {
    // console.log("Edit pressed");
  };

  const handleDeletePress = () => {
    // console.log("Delete pressed");
  };

  const handleCopyLinkPress = () => {
    // console.log("Copy Link pressed");
  };

  const handleProceedPress = () => {
    // console.log("Proceed pressed");
  };
  return (
    <Mainlayout>
      {/* <SafeAreaView style={[styles.container]}> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: scale(5) }}
      >
        <View style={{ paddingBottom: 180 }}>
          <Text
            style={{
              // fontFamily: "Gotham",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: 20,
              lineHeight: 24,
            }}
          >
            Saved Cart{" "}
            <Text style={{ fontWeight: "400", fontSize: 18 }}>(4)</Text>
          </Text>
          <View style={{ paddingVertical: 15 }}>
            <Card
              title="Untitled Cart 1"
              date="22 Dec 2022 at 03:20 PM"
              items="2 items"
              price="৳1221220.00"
              onViewPress={handleViewPress}
              onEditPress={handleEditPress}
              onDeletePress={handleDeletePress}
              onCopyLinkPress={handleCopyLinkPress}
              onProceedPress={handleProceedPress}
            />
            <Card
              title="Untitled Cart 1"
              date="22 Dec 2022 at 03:20 PM"
              items="2 items"
              price="৳1221220.00"
              onViewPress={handleViewPress}
              onEditPress={handleEditPress}
              onDeletePress={handleDeletePress}
              onCopyLinkPress={handleCopyLinkPress}
              onProceedPress={handleProceedPress}
            />
            <Card
              title="Untitled Cart 1"
              date="22 Dec 2022 at 03:20 PM"
              items="2 items"
              price="৳1221220.00"
              onViewPress={handleViewPress}
              onEditPress={handleEditPress}
              onDeletePress={handleDeletePress}
              onCopyLinkPress={handleCopyLinkPress}
              onProceedPress={handleProceedPress}
            />
            <Card
              title="Untitled Cart 1"
              date="22 Dec 2022 at 03:20 PM"
              items="2 items"
              price="৳1221220.00"
              onViewPress={handleViewPress}
              onEditPress={handleEditPress}
              onDeletePress={handleDeletePress}
              onCopyLinkPress={handleCopyLinkPress}
              onProceedPress={handleProceedPress}
            />
          </View>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </Mainlayout>
  );
};

export default SavedCart;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "#211f1f",
    height: height,
    width: width,
    backgroundColor: colors.white,

    // paddingTop: scale(10),
  },
});
