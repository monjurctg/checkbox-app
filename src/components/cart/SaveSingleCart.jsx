import {Modal, StyleSheet, TouchableOpacity,TextInput} from "react-native";
import React, { useState } from "react";
import View from "../tags/View";
import Text from "../tags/Text";
import {scale} from "../../../utils/funtions";
import CustomTouchBtn from "../tags/CustomTouchBtn";

import {FontAwesome,AntDesign} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import cartServices from "../../services/cartServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const SaveSingleCart = ({title,cart,refatch}) => {
  const navigation = useNavigation()
  // console.log(cart.id,"djkfjdkjfkdjk")
  const dateTime= new Date(cart?.created_at).toISOString().split("T")
  // console.log(dateTime)
  const [inputValue, setInputValue] = useState("");

  const [updateCartModalVisible, setUpdateCartModalVisible] = useState(false);

  const date = dateTime[0]
  const time=dateTime[1].split(".000Z")[0]

  const deleteCart = async(id)=>{
    const cart_id = await AsyncStorage.getItem("cart_id");
    // console.log(id,cart_id)
   
    const res = await cartServices.removeCart({id})
   
    if(res.status==200){
      if(id==cart_id){
        await AsyncStorage.removeItem("cart_id")
      }
  
      refatch()
    }
   
  }
  const handleCancel = () => {
    setUpdateCartModalVisible(false);
    setInputValue("");
  };

  const handleOk = (id) => {
    // Handle the input value
    // console.log("Input value:", inputValue);
    saveCartname(id);
  };

  const saveCartname = async (id) => {
    // setisModalOpen(true)
    // console.log(first)
    let data = {
      id: id,
      name: inputValue,
      type: "name",
    };
    let res = await cartServices.saveCart(data);
    if (res.status === 200) {
      setUpdateCartModalVisible(false);
      // fetchSingCart();
      setInputValue("");
      showMessage({
        style: {
          alignItems: "center",
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 15,
        },
        message: "Cart name updated!",
        icon: "success",
        type: "success",
        position: "top",
        duration: 2500,
        statusBarHeight: scale(20),
      });
      // fetchSwithcCartData();
      refatch()
      //   setisModalOpen(false);
    } else {
      // errorNotification("Cart name not updated", "top-right");
    }

    // console.log('res name', res)
  };
  return (
    <View
      preset={[" p_10 mt_5 "]}
      style={{
        borderWidth: 1,
        borderColor: "#DDDDDD",
        paddingBottom: scale(5),
        elevation:4,backgroundColor:"#FFF",borderRadius:10
      }}>
      <View preset={["row jc_between ac"]}>
        <Text preset={["RM lh_20   fs_16"]} numberOfLines={1} style={{color:"#be202e",width:200}}>{cart?.name}</Text>
        <View style={{flexDirection:"row",gap:10}}>
        <CustomTouchBtn onPress={()=>{
          navigation.navigate("")
          
        }}>
        <AntDesign name="eyeo" size={22} color="black" />
        </CustomTouchBtn>

        <CustomTouchBtn onPress={()=>setUpdateCartModalVisible(true)}>
          <FontAwesome name="edit" size={20} color="black" />
        </CustomTouchBtn>
        <CustomTouchBtn onPress={()=>deleteCart(cart?.id)}>
        <AntDesign name="delete" size={20} color="black" />
        </CustomTouchBtn>
        </View>
      </View>
      <View style={{flexDirection:"row",gap:10}}>
        <Text preset={["fs_13 ph_10 "]} style={{paddingVertical:5, backgroundColor:"#4caf50",marginTop:10,color:"#FFF",borderRadius:5}}>items {cart?.itemsCount}</Text>
        <Text preset={["fs_13 ph_10 "]} style={{paddingVertical:5, backgroundColor:"#ff9800",marginTop:10,color:"#FFF",borderRadius:5}}>৳{cart?.price}</Text>

      </View>
      <Text preset={["  mt_10 lh_14 fs_11"]} style={{color: "#58595B"}}>
        {date}  at {time}
      </Text>
      <View style={{flexDirection:"row",gap:10,alignItems:"center",marginTop:10}}>
        <TouchableOpacity style={{backgroundColor:"#DDD",padding:7,borderRadius:10}}>
          <Text style={{fontSize:14}}>Copy Cart Link</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("cart-information", { carts:cart})} style={{backgroundColor:"#be202e",justifyContent:"center",alignItems:"center",padding:7,borderRadius:10}}>
          <Text preset={["fs_13"]} style={{color:"#FFF"}}>Proceed to Customer Details</Text>
        </TouchableOpacity>
      </View>
      <Modal
            visible={updateCartModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setUpdateCartModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setUpdateCartModalVisible(false)}
                >
                  <AntDesign
                    style={styles.closeButtonText}
                    name="close"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <Text preset={[" fs_14 mt_10 RB"]}>Edit cart name</Text>
                <TextInput
                  style={styles.input}
                  value={inputValue}
                  onChangeText={(text) => setInputValue(text)}
                  placeholder="Add cart name"
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancel}
                  >
                    <Text preset={["fs_14 RR"]} style={{ color: "#FFF" }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.okButton} onPress={()=>handleOk(cart?.id)}>
                    <Text preset={["fs_14 RR"]} style={styles.buttonText}>
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
    </View>
  );
};

export default SaveSingleCart;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    position:"absolute",
    width: "90%",
    top:"30%",
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
    fontFamily:"RR"
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
  cartName: {
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    padding: scale(8),
    fontSize: 18,
    fontWeight: "bold",
  },
  ViewAllCartButton: {
    backgroundColor: "#BE202E",
    borderRadius: 4,
    padding: scale(10),
  },
  ViewAllCartButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily:"RM"
    // fontWeight: "bold",
  },
});

