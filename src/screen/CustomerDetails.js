import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, SafeAreaView } from "react-native";
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
import { Feather, EvilIcons, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import cartServices from "../services/cartServices";
import { setSelectDistricts, setThana as setThanaDispatch } from "../redux/reducers/utilsSlice";
import { showMessage } from "react-native-flash-message";




const CustomerDetails = ({ navigation, route }) => {
  const { customerSelectedDistricts, customerSelectedThana } = useSelector((state) => state.utils);
  const { carts:ca ,fetchData} = route?.params??{};
  const[carts,setCarts]=useState()
  // console.log(carts?.id, "cartd");

  const [name, setName] = useState("");
  const[errors,setErrors]=useState({})
  const [phoneNumber, setPhoneNumber] = useState("");
  const [district, setDistrict] = useState({});
  const [thana, setThana] = useState({});
  const [address, setAddress] = useState("");
  const [selectedCustomer, setselectedCustomer] = useState();
  const [isBill, setIsBill] = useState();
  const [searchPreCustomer, setSearchPreCustomer] = useState(false);
  const [allCustomer, setAllCustomer] = useState([]);
  const dispatch = useDispatch();

  // const getPreBillInfo = async () => {
  //   const billInfo = await AsyncStorage.getItem("billingInfo");
  //   console.log(billInfo, "billingInfo");
  //   if (!billInfo) {
  //     setIsBill(true);
  //   } else {
  //     setIsBill(false);
  //   }
  // };
  const fetchSingCart = async () => {

    const res = await cartServices.getSingleCarts(ca?.id);
    // console.log(res.data.data.items[0], "response  from calling");uy
    if (res.status === 200) {
      setCarts(res.data.data);
      if(res.data.data?.reseller_to_customer_price==0){
        console.log("modal")
        setIsBill(true)
      }else{
        setIsBill(false)
      }

    }
  };

  const validate = ()=>{
    let errors2 = {}
    // console.log(name)
    if(!name){
      // console.log("inside ! name")
      errors2.name="*Name is required"
    }
    if(!phoneNumber){
      errors2.phoneNumber="*Phone is required"
    }
    if(!address){
      errors2.address="*Address is required"
    }
    if(!customerSelectedDistricts?.name){
      errors2.district="*District is required"
    }
    if(!customerSelectedThana?.name || customerSelectedThana.name=="Select Thana"){
      errors2.thana="*Thana is required"
    }
    // console.log(errors2,"errors2")
    return  errors2
  }

  const getAllCustomers = async () => {

    const res = await cartServices.getCustomer();
    if (res.status === 200) {
      setAllCustomer(res.data.data);

    } else {
      // console.log(res.data);
    }
  };

  useEffect(() => {
    // getPreBillInfo();
    // fetchData()
    fetchSingCart()
    getAllCustomers();
    // console.log(carts?.reseller_to_customer_price,"cjdfkjdkj")

  }, []);

  useEffect(() => {
    if (carts?.customer?.name) {
      setselectedCustomer(carts?.customer);
    }
  }, [carts?.customer]);

  useEffect(() => {
    if (selectedCustomer?.name) {
      setName(selectedCustomer?.name);
      setPhoneNumber(selectedCustomer?.phone);
      setDistrict(selectedCustomer?.address?.district);
      setThana(selectedCustomer?.address.area);
      setAddress(selectedCustomer?.address?.address);
      dispatch(setSelectDistricts(selectedCustomer?.address?.district));
      dispatch(setThanaDispatch(selectedCustomer?.address.area));
    }
    // console.log(selectedCustomer?.address.area, "area");
  }, [selectedCustomer]);

  const handleProceed = async () => {
    const errors = validate()
    // console.log(errors,"error")
    if(errors){
      if(Object.keys(errors)?.length){
        return setErrors(errors)
      }

    }
    // return
    let data = {
      id: carts?.id,
      name: name,
      full_name: name,
      phone_number: phoneNumber,
      district: customerSelectedDistricts?.id,
      type: "address",
      area: customerSelectedThana?.id,
      address: address,
    };
    let res = await cartServices.saveCart(data);
    if (res.status === 200) {
      // console.log(res.status);

      // showMessage({
      //   style: { alignItems: "center", alignContent: "center", display: "flex", flexDirection: "column", justifyContent: "center", gap: 15 },
      //   message: "Added to Cart",
      //   icon: "success",
      //   type: "success",
      //   position: "top",
      //   duration: 2500,
      //   statusBarHeight: scale(40),
      // });
      navigation.navigate("confirm-order", { data, carts });
    } else {
      // console.log(res, "error");
    }
  };

  return (
    <SafeAreaView style={{flex:1,padding:10}}>
      <TouchableOpacity style={{marginTop:10,marginBottom:10}} onPress={()=>{
        navigation.goBack()
      }}>
      <AntDesign name="arrowleft" size={27} color="black" />
      </TouchableOpacity>
      {/* <SafeAreaView/> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{marginVertical:10,fontSize:18,fontWeight:"500"}}>{carts?.name}</Text>
        {!isBill ? (
          <View style={{ paddingBottom: 10 }}>
            <View preset={["mt_10"]}>
              {/* <SaveSingleCart title={"Untitled Cart 1"} /> */}
            </View>
            <View style={{ backgroundColor: "#C7C7C7", padding: 7, borderLeftWidth: 4, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ color: "gray", fontSize: 16 }}>Billing Info</Text>
              <TouchableOpacity onPress={() => setIsBill(true)} style={{ backgroundColor: "white", paddingHorizontal: 20, paddingVertical: 7, borderRadius: 7 }}>
                <Text>Update</Text>
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: "#C7C7C7", padding: 12, borderLeftWidth: 4, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
              <Text style={{ color: "gray", fontSize: 16 }}>Shipping Information</Text>
            </View>
            <TouchableOpacity style={styles.searchContainer} onPress={() => setSearchPreCustomer(true)}>
              <AntDesign name="search1" size={24} color="black" />
              <Text style={styles.searchText}>Search for Previous Customers</Text>
            </TouchableOpacity>
            <View style={styles.detailsContainer}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <CustomerInput setValue={setName} title="Name" placeholder="eg. Chawkbazar" value={name} />
                <Text style={{fontSize:12,fontWeight:"500",color:"red",bottom:10}}>{errors?.name?errors?.name:null}</Text>

              <CustomerInput setValue={setPhoneNumber} title="Phone Number" placeholder="eg. +880 12343453" value={phoneNumber} />
              <Text style={{fontSize:12,fontWeight:"500",color:"red",bottom:10}}>{errors?.phoneNumber?errors?.phoneNumber:null}</Text>

              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Delivery Address</Text>
                <TouchableOpacity onPress={() => navigation.navigate("select-address", { from: "Districts" })}>
                  <CustomerInput editable={false} title="Districts" placeholder="eg:Chattagram" value={customerSelectedDistricts?.name} />
                </TouchableOpacity>
                <Text style={{fontSize:12,fontWeight:"500",color:"red",bottom:10}}>{errors?.district?errors?.district:null}</Text>

                <TouchableOpacity onPress={() =>{
                  if(customerSelectedDistricts?.name){
                    navigation.navigate("select-address", { from: "Thana" })

                  }

                }}>
                  <CustomerInput title="Thana" placeholder="eg. Raozan" editable={false} value={customerSelectedThana?.name} />
                </TouchableOpacity>

                <Text style={{fontSize:12,fontWeight:"500",color:"red",bottom:10}}>{errors?.thana?errors?.thana:null}</Text>

                <CustomerInput setValue={setAddress} title="Address" placeholder="eg. Chawkbazar" value={address} editable={true} />
                <Text style={{fontSize:12,fontWeight:"500",color:"red",bottom:10}}>{errors?.address?errors?.address:null}</Text>
              </View>
              <CustomTouchBtn preset={["mt_10 center"]} style={styles.proceedButton} onPress={handleProceed}>
                <Text style={styles.proceedButtonText}>Proceed to Confirmation Page</Text>
              </CustomTouchBtn>
            </View>
          </View>
        ) : (
          <CustomerBillingInfo carts={carts} refatch={fetchSingCart} setIsBill={setIsBill} />
        )}
        <Modal visible={searchPreCustomer} animationType="slide" transparent={true} onRequestClose={() => setSearchPreCustomer(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setSearchPreCustomer(false)}>
                <AntDesign style={styles.closeButtonText} name="close" size={24} color="black" />
              </TouchableOpacity>
              <View style={{ backgroundColor: "#dddd", marginTop: 20, padding: 10, height: "90%" }}>
                <Text preset={["bold fs_14 mt_10"]}>Customer List</Text>
                <TextInput style={styles.input} placeholder="Search Customer" />
                <ScrollView>
                  {allCustomer.map((customer, index) => {
                    // console.log(customer)
                    return (
                      <TouchableOpacity onPress={() => { setselectedCustomer(customer); setSearchPreCustomer(false); }} key={index} style={{ marginTop: 1, backgroundColor: "#EEEEEE", minHeight: 120, marginTop: 10, borderRadius: 10, padding: 10 }}>
                        <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
                          <AntDesign name="user" size={22} color="gray" />
                          <Text style={{ fontSize: 16, color: "gray" }}>{customer?.name}</Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                          <Feather name="phone" size={22} color="gray" />
                          <Text style={{ fontSize: 16, color: "gray" }}>{customer?.phone}</Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                          <EvilIcons name="location" size={22} color="gray" />
                          <Text style={{ fontSize: 16, color: "gray",width:"90%" }}>{customer?.address?.address},{customer?.address?.area?.name},{customer?.address.district?.name}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: { borderWidth: 1, borderRadius: 10, borderColor: "#DDDDDD", padding: 10, marginVertical: 10, flexDirection: "row", alignItems: "center" },
  searchText: { fontSize: 16, paddingLeft: 10 },
  detailsContainer: { borderWidth: 1, borderRadius: 10, borderColor: "#DDDDDD", padding: 10, marginVertical: 10 },
  sectionContainer: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  proceedButton: { backgroundColor: "#BE202E", borderRadius: 4, padding: 12, marginTop: 10, alignItems: "center" },
  proceedButtonText: { color: "white", fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { backgroundColor: "#ececec", padding: 10, borderRadius: 10, paddingTop: 20, width: "95%", height: "90%", overflow: "hidden" },
  closeButton: { position: "absolute", top: 10, right: 10, padding: 5 },
  closeButtonText: { fontSize: 18, fontWeight: "bold", color: "#3E4DAC" },
  input: { height: 40, borderColor: "gray", borderWidth: 1, marginTop: 5, marginBottom: 10, paddingHorizontal: 10, borderRadius: 7 },
  buttonContainer: { flexDirection: "row", justifyContent: "flex-end", alignItems: "center" },
  cancelButton: { backgroundColor: "#BE202E", paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5 },
  buttonText: { color: "#FFF" },
  okButton: { marginLeft: 10, backgroundColor: "#3E4DAC", paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5 },
});

export default CustomerDetails;
