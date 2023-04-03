import {Image, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import React, {useContext, useState} from "react";
import Mainlayout from "../components/layout/Mainlayout";
import {height, scale, width} from "../../utils/funtions";
import Text from "../components/tags/Text";
import {colors} from "../theme/colors";
import View from "../components/tags/View";
import CustomTouchBtn from "../components/tags/CustomTouchBtn";
import love from "../../assets/icons/love.png";
import img1 from "../../assets/img/shoe-red.png";
import img2 from "../../assets/img/camera.png";

import img3 from "../../assets/img/shoe1.png";

import img4 from "../../assets/img/sunglass.png";
import img5 from "../../assets/img/headphone.png";
import FullScreenLoader from "../components/loader/FullScreenLoader ";

const ProductDetails = ({navigation}) => {
  let [activeSize, setActiveSize] = useState(6);
  let [activeColor, setActiveColor] = useState("Red");
  const [bigImg, setBigImg] = useState(img1);
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  if (loading) {
    return <FullScreenLoader visible={loading} />;
  }

  return (
    <Mainlayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomTouchBtn
          preset={["center"]}
          style={{
            position: "absolute",
            width: scale(44),
            height: scale(44),
            right: scale(6),
            top: scale(6),
            zIndex: 9999,
            borderRadius: 32,
            backgroundColor: "white",
          }}>
          <Image source={love} />
        </CustomTouchBtn>
        <Image
          style={{
            width: scale(360),
            height: scale(500),
            resizeMode: "cover",
            marginBottom: scale(10),
          }}
          source={bigImg}
        />

        <View preset={["row"]}>
          <TouchableOpacity onPress={() => setBigImg(img2)}>
            <Image
              style={{
                height: scale(60),
                width: scale(62),
                marginRight: scale(5),
              }}
              source={img2}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setBigImg(img3)}>
            <Image
              style={{
                height: scale(60),
                width: scale(62),
                marginRight: scale(5),
              }}
              source={img3}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setBigImg(img4)}>
            <Image
              style={{
                height: scale(60),
                width: scale(62),
                marginRight: scale(5),
              }}
              source={img4}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setBigImg(img1)}>
            <Image
              style={{
                height: scale(60),
                width: scale(62),
                marginRight: scale(5),
              }}
              source={img1}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setBigImg(img5)}>
            <Image
              style={{
                height: scale(60),
                width: scale(62),
                marginRight: scale(5),
              }}
              source={img5}
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

        {/* quantity */}
        <View preset={["mt_10"]}>
          <Text preset={["fs_16 bold "]}>Qty</Text>
          <View preset={["row mt_5 "]} style={{}}>
            <CustomTouchBtn
              preset={[""]}
              style={{
                height: scale(30),
                width: scale(30),
                borderWidth: 2,
                borderColor: "gray",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text preset={[" bold fs_20"]}>-</Text>
            </CustomTouchBtn>
            <Text preset={["m_5 fs_16 bold"]}>1</Text>
            <CustomTouchBtn
              style={{
                height: scale(30),
                width: scale(30),
                borderWidth: 2,
                borderColor: "gray",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text preset={["fs_16 bold "]}>+</Text>
            </CustomTouchBtn>
          </View>
        </View>

        {/* add to cart btn */}
        <CustomTouchBtn preset={["center bg_primary1 p_15 mt_10"]}>
          <Text preset={["text_white fs_16  fw_500"]}>Add To Cart</Text>
        </CustomTouchBtn>

        {/* details */}
        <View
          preset={["mt_20"]}
          style={{
            borderTopWidth: 1,
            borderTopColor: colors.secoundary_3,
          }}>
          <View preset={["row center jc_between mt_20"]}>
            <View preset={["row center"]}>
              <Text preset={["fs_20 fw_700"]}>Details</Text>
              <CustomTouchBtn
                preset={["row center ml_10 border_1 radius_5 border_primary1"]}>
                <Text preset={["text_primary1 fs_11 mr_10"]}>
                  Copy Product Details
                </Text>
                <Image source={require("../../assets/icons/copy.png")} />
              </CustomTouchBtn>
            </View>
            <CustomTouchBtn>
              <Text preset={["fs_20 text_second3 mr_10"]}>+</Text>
            </CustomTouchBtn>
          </View>
          <View>
            <Text preset={["fs_16 fw_400 lh_24"]}>
              Name : Classic Fashionista Men Tshirt#Classy Retro Men Tshirts
              #Classic Elegant Men Tshirts #Stylish Elegant Men Tshirts #Trendy
              Glamorous Men Tshirts #Comfy Glamorous Men Tshirts #Classic
              Sensational Men Tshirts
            </Text>
            <Text preset={["fs_16 fw_400 lh_24"]}> Fabric : Cotton Blend</Text>
            <Text preset={["fs_16 fw_400 lh_24"]}>
              Sleeve Length : Long Sleeves
            </Text>

            <Text preset={["fs_16 fw_400 lh_24"]}>Pattern : Striped</Text>
            <Text preset={["fs_16 fw_400 lh_24"]}> Net Quantity (N) : 1 </Text>
            <Text preset={["fs_16 fw_400 lh_24"]}> Sizes :</Text>
            <Text preset={["fs_16 fw_400 lh_24"]}>
              Sizes : S (Chest Size : 36 in, Length Size: 26 in)
            </Text>
            <Text preset={["fs_16 fw_400 lh_24"]}>
              M (Chest Size : 38 in, Length Size: 27 in)
            </Text>
            <Text preset={["fs_16 fw_400 lh_24"]}>
              L (Chest Size : 40 in, Length Size: 28 in)
            </Text>
            <Text preset={["fs_16 fw_400 lh_24"]}>
              XL (Chest Size : 42 in, Length Size: 29 in)
            </Text>
            <Text preset={["fs_16 fw_400 lh_24"]}>
              Trendy Modern Men Tshirts* Fabric : Cotton Blend Sleeve Length:
              Long Sleeves Pattern: Striped Multipack: 1 Sizes: S (Chest Size:
              36 in, Length Size: 26 in) XL (Chest Size: 42 in, Length Size: 29
              in) L (Chest Size: 40 in, Length Size: 28 in) M (Chest Size: 38
              in, Length Size: 27 in) Easy Returns Available In Case Of Any
              Issue
            </Text>
            <Text preset={["fs_16 fw_400 lh_24"]}>
              Country of Origin : India
            </Text>
          </View>
        </View>

        {/* shipping */}
        <View
          preset={["mt_20"]}
          style={{
            borderTopWidth: 1,
            borderTopColor: colors.secoundary_3,
          }}>
          <View preset={["row center jc_between mt_20"]}>
            <View preset={["row center"]}>
              <Text preset={["fs_20 fw_700"]}>Shipping</Text>
            </View>
            <CustomTouchBtn>
              <Text preset={["fs_20 text_second3 mr_10"]}>+</Text>
            </CustomTouchBtn>
          </View>
          <Text preset={["fw_400 fs_16 mt_10"]} style={{lineHeight: scale(24)}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem
            imperdiet. Nunc ut sem vitae risus tristique posuere.
          </Text>
        </View>

        {/* Returns */}
        <View
          preset={["mt_20"]}
          style={{
            borderTopWidth: 1,
            borderTopColor: colors.secoundary_3,
          }}>
          <View preset={["row center jc_between mt_20"]}>
            <View preset={["row center"]}>
              <Text preset={["fs_20 fw_700"]}>Returns </Text>
            </View>
            <CustomTouchBtn>
              <Text preset={["fs_20 text_second3 mr_10"]}>+</Text>
            </CustomTouchBtn>
          </View>
          <Text preset={["fw_400 fs_16 mt_10"]} style={{lineHeight: scale(24)}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem
            imperdiet. Nunc ut sem vitae risus tristique posuere.
          </Text>
        </View>

        <View style={{height: scale(250)}}></View>
      </ScrollView>
    </Mainlayout>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
