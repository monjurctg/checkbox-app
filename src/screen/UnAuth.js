import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {colors} from "../theme/colors";

import Text from "../components/tags/Text";
import {height, scale, width} from "../../utils/funtions";

const UnAuth = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={{paddingHorizontal: scale(10)}}>
          <View style={styles.header}>
            <Image
              source={require("../../assets/img/checkbox-logo.png")}
              style={{width: scale(200), height: scale(32)}}
            />
            <TouchableOpacity style={styles.loginBtn}>
              <Text
                preset="p"
                style={{textAlign: "center", color: colors.white}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <Image
              style={{width: "100%", marginTop: scale(20), height: scale(155)}}
              source={require("../../assets/img/banner_1.png")}
            />
            <View style={styles.products}>
              <View style={styles.product}>
                <Image
                  source={require("../../assets/img/shoe1.png")}
                  style={{width: "100%", height: scale(112)}}
                />
                <Text preset="p">Nike Super Red Shoe for Men</Text>
              </View>
              <View style={styles.product}>
                <Image
                  source={require("../../assets/img/sunglass.png")}
                  style={{width: "100%", height: scale(112)}}
                />
                <Text preset="p">Nike Super Red Shoe for Men</Text>
              </View>
              <View style={styles.product}>
                <Image
                  source={require("../../assets/img/redShoe.png")}
                  style={{width: "100%", height: scale(112)}}
                />
                <Text preset="p">Nike Super Red Shoe for Men</Text>
              </View>
              <View style={styles.product}>
                <Image
                  source={require("../../assets/img/watch.png")}
                  style={{width: "100%", height: scale(112)}}
                />
                <Text preset="p">Nike Super Red Shoe for Men</Text>
              </View>
              <View style={styles.product}>
                <Image
                  source={require("../../assets/img/headphone.png")}
                  style={{width: "100%", height: scale(112)}}
                />
                <Text preset="p">Nike Super Red Shoe for Men</Text>
              </View>
              <View style={styles.product}>
                <Image
                  source={require("../../assets/img/camera.png")}
                  style={{width: "100%", height: scale(112)}}
                />
                <Text preset="p">Nike Super Red Shoe for Men</Text>
              </View>
              <Image
                style={{
                  width: "100%",
                  marginTop: scale(20),
                  height: scale(114),
                }}
                source={require("../../assets/img/map_banner.png")}
              />
            </View>
            <View style={{height: scale(150)}}></View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default UnAuth;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "#211f1f",
    height: height,
    width: width,

    paddingTop: scale(10),
  },
  bodyContainer: {
    // backgroundColor: "#303030",
    marginTop: scale(10),
    paddingVertical: scale(10),
    borderRadius: scale(10),
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    display: "flex",
  },
  loginBtn: {
    width: scale(100),
    height: scale(40),

    backgroundColor: colors.primary_1,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  products: {
    flexDirection: "row",
    columnGap: scale(40),
    marginTop: scale(20),
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  product: {
    width: scale(105),
  },
});
