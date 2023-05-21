import {ScrollView, StyleSheet, TextInput} from "react-native";
import React, {useState} from "react";
import Mainlayout from "../components/layout/Mainlayout";
import Filters from "../components/products/Filters";
import SingleProduct from "../components/products/SingleProduct";
import View from "../components/tags/View";
import {scale} from "../../utils/funtions";
import img1 from "../../assets/img/redShoe.png";
import img2 from "../../assets/img/camera.png";
import img3 from "../../assets/img/headphone.png";
import img4 from "../../assets/img/sunglass.png";
import img5 from "../../assets/img/watch.png";
import {Feather} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";

import img6 from "../../assets/img/shoe1.png";
import {BottomSheet} from "react-native-btr";
import CustomTouchBtn from "../components/tags/CustomTouchBtn";
import Text from "../components/tags/Text";
import SingleCart from "../components/cart/SingleCart";
import {colors} from "../theme/colors";
import FullScreenLoader from "../components/loader/FullScreenLoader ";

const ProductList = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  // setTimeout(() => {
  //   setLoading(false);
  // }, 1000);
  // if (loading) {
  //   return <FullScreenLoader visible={loading} />;
  // }

  return (
    <Mainlayout navigation={navigation}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Filters navigation={navigation} />
        <View preset={["mt_10 d_flex row wrap jc_between"]}>
          <SingleProduct
            from={"product"}
            navigation={navigation}
            src={img1}
            toggleBottomNavigationView={toggleBottomNavigationView}
            visible={visible}
          />
          <SingleProduct
            from={"product"}
            navigation={navigation}
            src={img2}
            toggleBottomNavigationView={toggleBottomNavigationView}
            visible={visible}
          />
          <SingleProduct
            from={"product"}
            navigation={navigation}
            src={img3}
            toggleBottomNavigationView={toggleBottomNavigationView}
            visible={visible}
          />
          <SingleProduct
            from={"product"}
            navigation={navigation}
            src={img4}
            toggleBottomNavigationView={toggleBottomNavigationView}
            visible={visible}
          />
          <SingleProduct
            from={"product"}
            navigation={navigation}
            src={img5}
            toggleBottomNavigationView={toggleBottomNavigationView}
            visible={visible}
          />
          <SingleProduct
            from={"product"}
            navigation={navigation}
            src={img6}
            toggleBottomNavigationView={toggleBottomNavigationView}
            visible={visible}
          />
        </View>

        <View style={{height: scale(270)}}></View>
      </ScrollView>

      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
        //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}
        <View style={styles.bottomNavigationView} preset={["p_10"]}>
          <View
            preset={["row jc_between p_10 mt_5 "]}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#DDDDDD",
              paddingBottom: scale(5),
            }}>
            <Text preset={[" fs_16"]}>Product Details</Text>
            <CustomTouchBtn onPress={() => toggleBottomNavigationView()}>
              <AntDesign name="closecircleo" size={scale(20)} color="black" />
            </CustomTouchBtn>
          </View>
          <View preset={["mt_10 "]}>
            <SingleCart src={img1} />
          </View>
          <View preset={["mt_10 center row"]}>
            <Text>Customer Rate</Text>
            <TextInput
              keyboardType="number-pad"
              style={{
                borderColor: "#E6E7E8",
                borderWidth: 1,
                marginLeft: scale(5),
                width: scale(210),
                height: scale(40),
                paddingLeft: scale(20),
                backgroundColor: "#FFFFFF",
              }}
            />
          </View>
          <View preset={["row mt_15 p_5 jc_between"]}>
            <Text preset={["bold fs_16"]}>Total</Text>
            <Text preset={["bold fs_16"]}>৳ 1220</Text>
          </View>
          <View preset={["row  mt_15"]}>
            <CustomTouchBtn
              preset={["center"]}
              style={{
                width: scale(128),
                backgroundColor: colors.primary_2,
                padding: scale(8),
                borderRadius: 4,
                // alignSelf: "center",
              }}>
              <Text preset={["fs_14 fw_500"]} style={{color: "white"}}>
                Add to Cart
              </Text>
            </CustomTouchBtn>
            <CustomTouchBtn
              onPress={() => navigation.navigate("checkout")}
              preset={["center fs_16 bold"]}
              style={{
                width: scale(194),
                borderWidth: 1,
                borderColor: colors.primary_2,
                // backgroundColor: colors.primary_2,
                padding: scale(8),
                borderRadius: 4,
                marginLeft: scale(5),
                // alignSelf: "center",
              }}>
              <Text preset={["fs_14 fw_500"]} style={{color: colors.primary_2}}>
                Checkout
              </Text>
            </CustomTouchBtn>
          </View>
        </View>
      </BottomSheet>
    </Mainlayout>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#E0F7FA",
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    minHeight: scale(300),
    borderTopEndRadius: scale(15),
    borderTopStartRadius: scale(15),

    // justifyContent: "center",
    // alignItems: "center",
  },
});
