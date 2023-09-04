import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";

import CustomTouchBtn from "../components/tags/CustomTouchBtn";
import { scale } from "../../utils/funtions";
import CustomerInput from "../components/Input/CustomerInput";
import Mainlayout from "../components/layout/Mainlayout";
import SaveSingleCart from "../components/cart/SaveSingleCart";
import SingleCart from "../components/cart/SingleCart";
import CustomerBillingInfo from "../components/CustomerBillingInfo";
import ShippingInfo from "../components/ShippingInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native";
import { Feather,EvilIcons,AntDesign } from "@expo/vector-icons";

// import { TouchableOpacity } from "react-native-web";

const CustomerDetails = ({ route }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [thana, setThana] = useState("");
  const [road, setRoad] = useState("");
  const { carts } = route?.params;
  const [isBill, setIsBill] = useState();
  const [searchPreCustomer, setSearchPreCustomer] = useState();

  const getPreBillInfo = async () => {
    const billInfo = await AsyncStorage.getItem("billingInfo");
    console.log(billInfo);
    if (billInfo) {
      setIsBill(true);
    } else {
      setIsBill(false);
    }
  };

  useEffect(() => {
    getPreBillInfo();
  }, []);

  const handleProceed = () => {
    if (!name || !phoneNumber || !country || !city || !thana || !road) {
      // console.log("Please enter all data!");
    } else {
      const data = {
        name: name,
        phoneNumber: phoneNumber,
        country: country,
        city: city,
        thana: thana,
        road: road,
      };
    }
  };

  return (
    <Mainlayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isBill ? (
          <View style={{ paddingBottom: 180 }}>
            <View preset={["mt_10"]}>
              <SaveSingleCart title={"Untitled Cart 1"} />
            </View>
            <View
              style={{
                backgroundColor: "#C7C7C7",
                padding: 7,
                borderLeftWidth: 4,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "gray", fontSize: 16 }}>Billing Info</Text>
              <TouchableOpacity
                onPress={() => setIsBill(false)}
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 20,
                  paddingVertical: 7,
                  borderRadius: 7,
                }}
              >
                <Text>Update</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#C7C7C7",
                padding: 12,
                borderLeftWidth: 4,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ color: "gray", fontSize: 16 }}>
                Shipping Information
              </Text>
            </View>

            <TouchableOpacity
              style={styles.searchContainer}
              onPress={() => {
                setSearchPreCustomer(true);
              }}
            >
              <AntDesign name="search1" size={24} color="black" />
              <Text style={styles.searchText}>
                Search for Previous Customers
              </Text>
            </TouchableOpacity>
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
        ) : (
          <CustomerBillingInfo carts={carts} setIsBill={setIsBill} />
        )}
        <Modal
          visible={searchPreCustomer}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSearchPreCustomer(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSearchPreCustomer(false)}
              >
                <AntDesign
                  style={styles.closeButtonText}
                  name="close"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: "#dddd",
                  marginTop: 20,

                  padding: 10,
                  height: "90%",
                }}
              >
                <Text preset={["bold fs_14 mt_10"]}>Customer List</Text>
                <TextInput
                  style={styles.input}
                  // value={inputValue}
                  // onChangeText={(text) => setInputValue(text)}
                  placeholder="Search Customer"
                />
                <ScrollView>
                  <View
                    style={{
                      marginTop: 1,
                      backgroundColor: "#EEEEEE",
                      minHeight: 120,
                      marginTop: 10,
                      borderRadius: 10,
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
                      <Text style={{ fontSize: 16, color: "gray" }}>
                        Monjurul alam
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <Feather name="phone" size={22} color="gray" />
                      <Text style={{ fontSize: 16, color: "gray" }}>
                        01829940853
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", gap: 10, marginTop: 10 }}
                    >
                      <EvilIcons name="location" size={22} color="gray" />
                      <Text style={{ fontSize: 16, color: "gray" }}>
                        abc,abc,abc
                      </Text>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ececec",
    padding: 10,
    borderRadius: 10,
    paddingTop: 20,
    width: "95%",
    height: "90%",
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3E4DAC",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#BE202E",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
  },
  okButton: {
    marginLeft: 10,
    backgroundColor: "#3E4DAC",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default CustomerDetails;
