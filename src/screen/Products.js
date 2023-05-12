import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Mainlayout from "../components/layout/Mainlayout";

import Cards from "../components/products/Cards";
import { scale } from "../../utils/funtions";
import FullScreenLoader from "../components/loader/FullScreenLoader ";
import { AntDesign } from "@expo/vector-icons";
import SingleProduct from "../components/products/SingleProduct";

import img1 from "../../assets/img/redShoe.png";
import img2 from "../../assets/img/camera.png";
import img3 from "../../assets/img/headphone.png";
import img4 from "../../assets/img/sunglass.png";
import img5 from "../../assets/img/watch.png";
import img6 from "../../assets/img/shoe1.png";

const Products = ({ navigation }) => {
  // console.log(navigation, "products navigatio");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  if (loading) {
    return <FullScreenLoader visible={loading} />;
  }

  return (
    <Mainlayout navigation={navigation}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={{
              // fontFamily: "Gotham",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: 18,
              lineHeight: 22,
              color: "#000000",
            }}
          >
            Sub-Categories
          </Text>
          <View style={styles.products}>
            <View
              style={{
                alignItems: "center",
                width: "25%",
                // marginRight: scale(12),
              }}
            >
              <Image
                source={require("../../assets/img/shoe1.png")}
                style={{
                  width: "90%",
                  height: scale(100),
                  resizeMode: "contain",
                }}
              />
              <Text preset={["p3"]}>Camera</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                width: "25%",
                // marginRight: scale(12),
              }}
            >
              <Image
                source={require("../../assets/img/headphone.png")}
                style={{
                  width: "90%",
                  height: scale(100),
                  resizeMode: "contain",
                }}
              />
              <Text preset={["p3"]}>Head Phone</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                width: "25%",
                // marginRight: scale(12),
              }}
            >
              <Image
                source={require("../../assets/img/sunglass.png")}
                style={{
                  width: "90%",
                  height: scale(100),
                  resizeMode: "contain",
                }}
              />
              <Text preset={["p3"]}>Women's Dress</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                width: "25%",
                // marginRight: scale(12),
              }}
            >
              <Image
                source={require("../../assets/img/redShoe.png")}
                style={{
                  width: "90%",
                  height: scale(100),
                  resizeMode: "contain",
                }}
              />
              <Text preset={["p3"]}>Shoe</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                width: "25%",
                // marginRight: scale(12),
              }}
            >
              <Image
                source={require("../../assets/img/sunglass.png")}
                style={{
                  width: "90%",
                  height: scale(100),
                  resizeMode: "contain",
                }}
              />
              <Text preset={["p3"]}>Women's Dress</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                width: "25%",
                // marginRight: scale(12),
              }}
            >
              <Image
                source={require("../../assets/img/redShoe.png")}
                style={{
                  width: "90%",
                  height: scale(100),
                  resizeMode: "contain",
                }}
              />
              <Text preset={["p3"]}>Shoe</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                width: "25%",
                // marginRight: scale(12),
              }}
            >
              <Image
                source={require("../../assets/img/camera.png")}
                style={{
                  width: "90%",
                  height: scale(100),
                  resizeMode: "contain",
                }}
              />
              <Text preset={["p3"]}>Camera</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                width: "25%",
                // marginRight: scale(12),
              }}
            >
              <Image
                source={require("../../assets/img/headphone.png")}
                style={{
                  width: "90%",
                  height: scale(100),
                  resizeMode: "contain",
                }}
              />
              <Text preset={["p3"]}>Head Phone</Text>
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 40,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                // fontFamily: "Gotham",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: 20,
                lineHeight: 24,
              }}
            >
              Collection
            </Text>
            <TouchableOpacity
              style={{
                borderColor: "#BE202E",
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
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
                }}
              >
                View All Collections{" "}
                <AntDesign name="arrowright" size={12} color="#BE202E" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Cards name={"Tech Collection"} navigation={navigation} />
        <Cards name={"Winter Collection"} navigation={navigation} />
        <View>
          <View
            style={{
              marginTop: 40,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                // fontFamily: "Gotham",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: 20,
                lineHeight: 24,
              }}
            >
              All Products
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                width: scale(114),
                height: scale(24),
                justifyContent: "space-around",
                alignSelf: "center",
                alignItems: "center",
                marginLeft: scale(10),
                backgroundColor: "#F7F7F7",
                borderRadius: scale(4),
                paddingVertical: scale(5),
                paddingHorizontal: scale(12),
              }}
            >
              <Text preset={["fs_14  lh_14  fw_400 pl_5 center"]}>
                Best sellers
              </Text>
              <AntDesign name="down" size={11} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              flexWrap: "wrap",
            }}
          >
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
        </View>
        <View style={{ height: scale(280) }}></View>
      </ScrollView>
    </Mainlayout>
  );
};

export default Products;

const styles = StyleSheet.create({
  products: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
