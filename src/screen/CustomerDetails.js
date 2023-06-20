import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CustomTouchBtn from "../components/tags/CustomTouchBtn";
import { scale } from "../../utils/funtions";
import CustomerInput from "../components/Input/CustomerInput";
import Mainlayout from "../components/layout/Mainlayout";
import SaveSingleCart from "../components/cart/SaveSingleCart";

const CustomerDetails = () => {
  return (
    <Mainlayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 180 }}>
          <View preset={["mt_10"]}>
            <SaveSingleCart title={"Untitled Cart 1"} />
          </View>
          <View style={styles.searchContainer}>
            <AntDesign name="search1" size={24} color="black" />
            <Text style={styles.searchText}>Search for Previous Customers</Text>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              <CustomerInput title="Name" value="eg. Chawkbazar" />
              <CustomerInput title="Phone Number" value="eg. +880 12343453" />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Delivery Address</Text>
              <CustomerInput title="Country" value="Bangladesh" />
              <CustomerInput title="City" value="eg. Dhaka" />
              <CustomerInput title="Thana" value="eg. Raozan" />
              <CustomerInput title="Road" value="eg. Chawkbazar" />
            </View>
            <CustomTouchBtn
              preset={["mt_10 center"]}
              style={styles.proceedButton}
            >
              <Text style={styles.proceedButtonText}>
                Proceed to Confirmation Page
              </Text>
            </CustomTouchBtn>
          </View>
        </View>
      </ScrollView>
    </Mainlayout>
  );
};

const styles = StyleSheet.create({
  // ...
  searchContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#DDDDDD",
    padding: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchText: {
    fontSize: 16,
    paddingLeft: 10,
  },
  detailsContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#DDDDDD",
    padding: 10,
    marginVertical: 10,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  proceedButton: {
    backgroundColor: "#BE202E",
    borderRadius: 4,
    padding: scale(14),
    marginTop: 10,
    alignItems: "center",
  },
  proceedButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CustomerDetails;
