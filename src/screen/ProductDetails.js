import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
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
import {AntDesign} from "@expo/vector-icons";

import img4 from "../../assets/img/sunglass.png";
import img5 from "../../assets/img/headphone.png";
import FullScreenLoader from "../components/loader/FullScreenLoader ";
import ClientReview from "../components/product-details/ClientReview";
import {BottomSheet} from "react-native-btr";
import SingleCart from "../components/cart/SingleCart";
import {CheckboxContext} from "../context/CheckboxProvider";
// import { AntDesign } from '@expo/vector-icons';

const ProductDetails = ({navigation}) => {
  let [activeSize, setActiveSize] = useState(6);
  let [activeColor, setActiveColor] = useState("Red");
  const [bigImg, setBigImg] = useState(img1);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const {auth, DetailsBottomSheet, setDetailsBottomSheet} =
    useContext(CheckboxContext);

  const toggleBottomNavigationView = () => {
    setDetailsBottomSheet(!DetailsBottomSheet);
    //Toggling the visibility state of the bottom sheet
    // setVisible(!visible);
  };
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
            container: {
              display: "flex",
              flexDirection: "column",
              // backgroundColor: "#211f1f",
              height: height,
              width: width,
              backgroundColor: colors.white,

              // paddingTop: scale(10),
            },
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
        <View preset={[`  mt_20`]}>
          <TouchableOpacity
            style={{
              position: "relative",
              left: scale(220),

              borderWidth: 1,
              flexDirection: "row",
              width: scale(100),
              borderRadius: 4,
              justifyContent: "space-around",
              alignItems: "center",
              paddingLeft: scale(6),
              borderColor: colors.primary_3,
              height: scale(25),
            }}>
            <Text preset={["p3"]} style={{color: colors.primary_3}}>
              Copy Text
            </Text>
            <Image source={require("../../assets/icons/copy.png")} />
          </TouchableOpacity>
          <Text preset={["h3"]}>Nike Super Red Commercial Shoe for Men</Text>
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
        {/* <CustomTouchBtn preset={["center bg_primary1 p_15 mt_10"]}>
          <Text preset={["text_white fs_16  fw_500"]}>Add To Cart</Text>
        </CustomTouchBtn> */}

        {/* details */}
        <View
          preset={["mt_20"]}
          style={{
            // borderTopWidth: 1,
            borderTopColor: colors.secoundary_3,
          }}>
          <View
            preset={[" ph_10  p_10  mt_20"]}
            style={{backgroundColor: "#414042"}}>
            <View preset={["d_flex row jc_between  "]}>
              <Text preset={[" text_white fs_20 fw_700"]}>Details</Text>

              <CustomTouchBtn
                preset={["row center ml_10 border_1 radius_5 "]}
                style={{padding: 5}}>
                <Text preset={["text_white fs_11 mr_10"]}>
                  Copy Product Details
                </Text>
                {/* <Image source={require("../../assets/icons/copy.png")} /> */}
              </CustomTouchBtn>
            </View>
            {/* <CustomTouchBtn>
              <Text preset={["fs_20 text_second3 mr_10"]}>+</Text>
            </CustomTouchBtn> */}
          </View>
          <View preset={["mt_10"]}>
            <View preset={["row lh_20"]}>
              <Text preset={["fs_16 fw_500"]}>Fabric</Text>
              <Text preset={["fs_16 fw_400 lh_20"]}> : Cotton Blend</Text>
            </View>
            <View preset={["row lh_20"]}>
              <Text preset={["fs_16 fw_500"]}>Sleeve Length</Text>
              <Text preset={["fs_16 fw_400 lh_20"]}> : Long Sleeves</Text>
            </View>
            <View preset={["row lh_20"]}>
              <Text preset={["fs_16 fw_500"]}>Pattern</Text>
              <Text preset={["fs_16 fw_400 lh_20"]}> : Striped</Text>
            </View>
            <View preset={["row lh_20"]}>
              <Text preset={["fs_16 fw_500"]}>Net Quantity (N)</Text>
              <Text preset={["fs_16 fw_400 lh_20"]}> : 1</Text>
            </View>
            <View preset={["row lh_20"]}>
              <Text preset={["fs_16 fw_500"]}>Sizes</Text>
              <Text preset={["fs_16 fw_400 lh_20"]}> : 11</Text>
            </View>
          </View>
        </View>

        {/* client review */}
        <View preset={[" mt_20"]}>
          <Text preset={["fs_16 fw_700"]}>Product Reviews</Text>
          <View preset={["mt_5"]}>
            <ClientReview rating={5} />
            <ClientReview rating={2} />
            <ClientReview rating={4} />

            <ClientReview rating={3} />

            <ClientReview rating={5} />
          </View>

          <View preset={["row d_flex   mt_10"]} style={{alignItems: "center"}}>
            <Text preset={["fs_18 lh_30"]}>See More</Text>
            <AntDesign
              style={{
                marginLeft: scale(20),
                fontSize: scale(18),
                lineHeight: scale(30),
              }}
              name="down"
              size={18}
              color="black"
            />
          </View>
        </View>

        {/* shipping */}
        {/* <View
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
        </View> */}

        {/* Returns */}
        {/* <View
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
        </View> */}

        <View style={{height: scale(250)}}></View>
      </ScrollView>
      <View style={styles.container}>
        <BottomSheet
          visible={DetailsBottomSheet}
          //setting the visibility state of the bottom sheet
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
                preset={["center  "]}
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
                <Text
                  preset={["fs_14 fw_500"]}
                  style={{color: colors.primary_2}}>
                  Add to My Products
                </Text>
              </CustomTouchBtn>
            </View>
          </View>
        </BottomSheet>
      </View>
    </Mainlayout>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    // display: "flex",
    // flexDirection: "column",
    // // backgroundColor: "#211f1f",
    // // height: height,
    // width: width,
    // backgroundColor: colors.white,
    // paddingTop: scale(10),
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
