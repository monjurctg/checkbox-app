import {Image, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import Mainlayout from "../components/layout/Mainlayout";
import {height, scale, width} from "../../utils/funtions";
import Text from "../components/tags/Text";
import {colors} from "../theme/colors";
import View from "../components/tags/View";

const ProductDetails = () => {
  return (
    <Mainlayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={{
            width: scale(360),
            height: scale(500),
            resizeMode: "cover",
            marginBottom: scale(10),
          }}
          source={require("../../assets/img/shoe-red.png")}
        />
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity>
            <Image
              style={{
                height: scale(60),
                width: scale(62),
                marginRight: scale(5),
              }}
              source={require("../../assets/img/sunglass.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={{
                height: scale(60),
                width: scale(62),
                marginRight: scale(5),
              }}
              source={require("../../assets/img/shoe1.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={{
                height: scale(60),
                width: scale(62),
                marginRight: scale(5),
              }}
              source={require("../../assets/img/camera.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={{
                height: scale(60),
                width: scale(62),
                marginRight: scale(5),
              }}
              source={require("../../assets/img/redShoe.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={{
                height: scale(60),
                width: scale(62),
                marginRight: scale(5),
              }}
              source={require("../../assets/img/headphone.png")}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: scale(20),
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text preset={["h3"]} style={{width: "70%"}}>
            Nike Super Red Commercial Shoe for Men
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              flexDirection: "row",
              width: "30%",
              borderRadius: 4,
              justifyContent: "flex-start",
              alignItems: "center",
              paddingLeft: scale(6),
              borderColor: colors.primary_3,
              height: scale(40),
            }}>
            <Text preset={["p3"]} style={{color: colors.primary_3}}>
              Copy Text
            </Text>
            <Image />
          </TouchableOpacity>
        </View>
        <Text preset={["h2 bold mt_5"]}>৳ 8520.24</Text>
        <View preset={["row"]} style={styles.text}>
          <Text preset={["p1"]}>M.S.R.P :</Text>
          <Text>9200</Text>
        </View>

        <View style={{height: scale(200)}}></View>
      </ScrollView>
    </Mainlayout>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
