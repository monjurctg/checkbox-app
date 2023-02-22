import {Image, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import Mainlayout from "../components/layout/Mainlayout";
import {height, scale, width} from "../../utils/funtions";
import Text from "../components/tags/Text";
import {colors} from "../theme/colors";
import View from "../components/tags/View";
import CustomTouchBtn from "../components/tags/CustomTouchBtn";

const ProductDetails = () => {
  let [activeSize, setActiveSize] = useState(6);
  let [activeColor, setActiveColor] = useState("Red");

  <View preset={["mt_10"]}>
    <Text preset={["fs_16 bold "]}>Select Your Size</Text>
    <View preset={["row wrap"]}>
      {[6, 7, 8, 9, 10, 11, 12].map((size, index) => (
        <CustomTouchBtn
          key={index}
          onPress={() => {
            setActive(size);
            console.log("hello press");
          }}
          preset={[
            `center  border_1 mr_10 mt_10 ph_15 ${
              activeSize === size ? "active" : ""
            }`,
          ]}
          style={{width: scale(67), height: scale(48)}}>
          <Text preset={[` ${activeSize === size && "text_white "}  fs_16`]}>
            {size}
          </Text>
        </CustomTouchBtn>
      ))}
    </View>
  </View>;
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
        <View preset={["row"]}>
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
        <View preset={[`row center mt_20`]}>
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
        <Text preset={["h2 bold mt_10"]}>৳ 8520.24</Text>
        <View preset={["row"]} style={styles.text}>
          <Text preset={["p1 fs_20 "]}>M.S.R.P :</Text>
          <Text preset={[" fs_20  text_second3"]}>9200</Text>
        </View>
        <View preset={[" row mt_10"]}>
          <Text>rating</Text>
          <Text preset={["p1"]}>(3.5 stars) • 10 reviews</Text>
        </View>

        <CustomTouchBtn
          preset={["row mt_10 radius_5 center   border_1 "]}
          style={{height: scale(48), width: scale(293)}}>
          <Image source={require("../../assets/icons/dload.png")} />
          <Text preset={["p1 ml_10 fw_325"]}>Download Product Details</Text>
        </CustomTouchBtn>
        <CustomTouchBtn
          preset={["row mt_10  radius_5 center border_1 "]}
          style={{height: scale(48), width: scale(222)}}>
          <Image source={require("../../assets/icons/facebook.png")} />
          <Text preset={["p1 ml_10 fw_325 "]}>Post in Facebook</Text>
        </CustomTouchBtn>

        {/* size */}
        <View preset={["mt_10"]}>
          <Text preset={["fs_16 bold "]}>Select Your Size</Text>
          <View preset={["row wrap"]}>
            {[6, 7, 8, 9, 10, 11, 12].map((size, index) => (
              <CustomTouchBtn
                key={index}
                onPress={() => {
                  setActiveSize(size);
                  console.log("hello press");
                }}
                preset={[
                  `center  border_1 mr_10 mt_10 ph_15 ${
                    activeSize === size ? "active" : ""
                  }`,
                ]}
                style={{width: scale(67), height: scale(48)}}>
                <Text
                  preset={[` ${activeSize === size && "text_white "}  fs_16`]}>
                  {size}
                </Text>
              </CustomTouchBtn>
            ))}
          </View>
        </View>

        {/* color */}
        <View preset={["mt_10"]}>
          <Text preset={["fs_16 bold "]}>Select Color</Text>
          <View preset={["row wrap"]}>
            {["Red", "Green", "Black", "Blue"].map((color, index) => (
              <CustomTouchBtn
                key={index}
                onPress={() => {
                  setActiveColor(color);
                  console.log("hello press");
                }}
                preset={[
                  `center  border_1 mr_10 mt_10 ph_15 ${
                    activeColor === color ? "active" : ""
                  }`,
                ]}
                style={{width: scale(85), height: scale(48)}}>
                <Text
                  preset={[
                    ` ${activeColor === color && "text_white "}  fs_16`,
                  ]}>
                  {color}
                </Text>
              </CustomTouchBtn>
            ))}
          </View>
        </View>

        <View style={{height: scale(200)}}></View>
      </ScrollView>
    </Mainlayout>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
