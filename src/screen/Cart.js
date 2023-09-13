import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import View from "../components/tags/View";
import Text from "../components/tags/Text";
import { scale, setSwichCartIdInLocal } from "../../utils/funtions";
import CustomTouchBtn from "../components/tags/CustomTouchBtn";
import { colors } from "../theme/colors";
import img1 from "../../assets/img/redShoe.png";
import SingleCart from "../components/cart/SingleCart";
import { Feather } from "@expo/vector-icons";
import FullScreenLoader from "../components/loader/FullScreenLoader ";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cartServices from "../services/cartServices";
import { showMessage } from "react-native-flash-message";
import { useMemo } from "react";
import { setCartSize } from "../redux/reducers/cartSlice";
import { useDispatch } from "react-redux";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [updateCartModalVisible, setUpdateCartModalVisible] = useState(false);
  const [switchCartModalVisible, setSwitchCartModalVisible] = useState(false);
  const [activeSwichCartId, setActiveSwichCartId] = useState();
  const [inputValue, setInputValue] = useState("");
  const [carts, setCarts] = useState();
  const [switchCartData, setSwitchCartData] = useState([]);
  const dispatch = useDispatch();
  const handleCancel = () => {
    setUpdateCartModalVisible(false);
    setInputValue("");
  };

  const handleOk = () => {
    // Handle the input value
    // console.log("Input value:", inputValue);
    saveCartname();
  };
  const navigation = useNavigation();

  const saveCartname = async () => {
    // setisModalOpen(true)
    let data = {
      id: activeSwichCartId,
      name: inputValue,
      type: "name",
    };
    let res = await cartServices.saveCart(data);
    if (res.status === 200) {
      setUpdateCartModalVisible(false);
      fetchSingCart();
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
        message: "Added to Cart",
        icon: "success",
        type: "success",
        position: "top",
        duration: 2500,
        statusBarHeight: scale(40),
      });
      fetchSwithcCartData();
      //   setisModalOpen(false);
    } else {
      // errorNotification("Cart name not updated", "top-right");
    }

    // console.log('res name', res)
  };

  const fetchSingCart = async () => {
    console.log("calling");
    const cart_id = activeSwichCartId
      ? activeSwichCartId
      : await AsyncStorage.getItem("cart_id");

    // console.log(cart_id,"cart id from sing")
    const res = await cartServices.getSingleCarts(cart_id);
    // console.log(res.data.data.items[0], "response  from calling");uy
    if (res.status === 200) {
      setCarts(res.data.data);
      setSwitchCartModalVisible(false);

      dispatch(setCartSize(res.data.data.items.length));
      setInputValue(res?.data?.data.name);
      setSwichCartIdInLocal(activeSwichCartId ? activeSwichCartId : cart_id);
    }
  };

  const saveCart = async () => {
    let cart_id = activeSwichCartId;
    let data = {
      id: cart_id,
      type: "save",
      is_saved: 1,
    };
    let res = await cartServices.saveCart(data);
    // console.log('res save', res)

    if (res.status === 200) {
      await AsyncStorage.setItem("cart_id", cart_id);
      showMessage({
        style: {
          alignItems: "center",
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 15,
        },
        message: res?.data?.message,
        icon: "success",
        type: "success",
        position: "top",
        duration: 2500,
        statusBarHeight: scale(40),
      });

      // successNotification("Cart Saved", "top-right");
    } else {
      // errorNotification("Cart not Saved", "top-right");
    }
  };

  const fetchSwithcCartData = async () => {
    const res = await cartServices.getAllCarts();

    if (res.status === 200) {
      setSwitchCartData(res?.data?.data);
    } else {
      console.error(res);
    }
  };

  useEffect(() => {
    fetchSwithcCartData();

    (async () => {
      let cart_id = await AsyncStorage.getItem("cart_id");
      // console.log(cart_id, "cart_id");
      setActiveSwichCartId(cart_id);
    })();
  }, []);

  useEffect(() => {
    // alert("dfdjj")
    fetchSingCart();
  }, [activeSwichCartId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchSingCart();
      // console.log("hello world calling ");
    });
    return unsubscribe;
  }, [navigation]);

  const handleSwitchCart = async (id) => {
    if (id) {
      if (id == (await AsyncStorage.getItem("billingInfo"))) {
        console.log(id, "id match");
      } else {
        console.log("id remove");
        await AsyncStorage.removeItem("billingInfo ");
      }
      setActiveSwichCartId(id);
    }
  };

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
          <Text preset={["bold  fs_18"]}>{carts?.name}</Text>
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
            <CustomTouchBtn onPress={() => setUpdateCartModalVisible(true)}>
              <Feather name="edit" size={scale(20)} color="black" />
            </CustomTouchBtn>
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
                <Text preset={["bold fs_14 mt_10"]}>Edit cart name</Text>
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
                    <Text preset={["fs_14"]} style={{ color: "#FFF" }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.okButton} onPress={handleOk}>
                    <Text preset={["fs_14"]} style={styles.buttonText}>
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <TouchableOpacity onPress={() => setSwitchCartModalVisible(true)}>
          <View
            preset={["mt_10 border_1 row center"]}
            style={{ borderColor: "black", borderRadius: 10 }}
          >
            <Text preset={["fs_11"]} style={{ color: "#414042" }}>
              Switch Cart
            </Text>
          </View>
        </TouchableOpacity>
        <Modal
          visible={switchCartModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSwitchCartModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={[styles.closeButton]}
                onPress={() => setSwitchCartModalVisible(false)}
              >
                <AntDesign
                  style={styles.closeButtonText}
                  name="close"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <View style={{ marginTop: 10 }}>
                {/* <TouchableOpacity>
                  <Text style={styles.cartName}>My Favourite Products</Text>
                </TouchableOpacity>
            
                <TouchableOpacity>
                  <Text style={styles.cartName}>Cloth Collection</Text>
                </TouchableOpacity> */}
                {switchCartData?.map((cart, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSwitchCart(cart?.id)}
                  >
                    <Text style={styles.cartName}>{cart?.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <CustomTouchBtn
                preset={["mt_10 center"]}
                style={styles.ViewAllCartButton}
                // onPress={onProceedPress}
              >
                <Text style={styles.ViewAllCartButtonText}>View All Cart</Text>
              </CustomTouchBtn>
            </View>
          </View>
        </Modal>
        <View preset={["mt_10"]}>
          {carts?.items.map((item, index) => (
            <SingleCart key={index} item={item} />
          ))}
          {/*          
          <SingleCart item={item} />
          <SingleCart item={item} /> */}
        </View>
        <View preset={["mt_35 p_5 flex row jc_between"]}>
          <TouchableOpacity
            onPress={saveCart}
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
            onPress={() => navigation.navigate("cart-information", { carts })}
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
              Proceed to Cart Details
            </Text>
          </CustomTouchBtn>
        </View>
        <View style={{ height: scale(20) }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;

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
    width: "80%",
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
    fontWeight: "bold",
  },
});
