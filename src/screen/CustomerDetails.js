import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CustomTouchBtn from "../components/tags/CustomTouchBtn";
import { scale } from "../../utils/funtions";
import CustomerInput from "../components/Input/CustomerInput";
import Mainlayout from "../components/layout/Mainlayout";
import SaveSingleCart from "../components/cart/SaveSingleCart";

const CustomerDetails = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [thana, setThana] = useState("");
  const [road, setRoad] = useState("");

  const handleProceed = () => {
    if (!name || !phoneNumber || !country || !city || !thana || !road) {
      console.log("Please enter all data!");
    } else {
      const data = {
        name: name,
        phoneNumber: phoneNumber,
        country: country,
        city: city,
        thana: thana,
        road: road,
      };
      console.log(data);
    }
  };
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
              <CustomerInput
                setValue={setName}
                title="Name"
                placeholder="eg. Chawkbazar"
                value={name}
              />
              <CustomerInput
                setValue={setPhoneNumber}
                title="Phone Number"
                placeholder="eg. +880 12343453"
                value={phoneNumber}
              />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Delivery Address</Text>
              <CustomerInput
                setValue={setCountry}
                title="Country"
                placeholder="Bangladesh"
                value={country}
              />
              <CustomerInput
                setValue={setCity}
                title="City"
                placeholder="eg. Dhaka"
                value={city}
              />
              <CustomerInput
                setValue={setThana}
                title="Thana"
                placeholder="eg. Raozan"
                value={thana}
              />
              <CustomerInput
                setValue={setRoad}
                title="Road"
                placeholder="eg. Chawkbazar"
                value={road}
              />
            </View>
            <CustomTouchBtn
              preset={["mt_10 center"]}
              style={styles.proceedButton}
              onPress={handleProceed}
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
