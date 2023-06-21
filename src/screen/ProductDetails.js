import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Mainlayout from "../components/layout/Mainlayout";
import { height, scale, width } from "../../utils/funtions";
import Text from "../components/tags/Text";
import { colors } from "../theme/colors";
import View from "../components/tags/View";
import CustomTouchBtn from "../components/tags/CustomTouchBtn";
import love from "../../assets/icons/love.png";
import img1 from "../../assets/img/shoe-red.png";
import img2 from "../../assets/img/camera.png";

import img3 from "../../assets/img/shoe1.png";
import { AntDesign } from "@expo/vector-icons";
import ClientReview from "../components/product-details/ClientReview";
import { BottomSheet } from "react-native-btr";
import SingleCart from "../components/cart/SingleCart";
import { CheckboxContext } from "../context/CheckboxProvider";
import { useDispatch, useSelector } from "react-redux";
import { setDetailsBottomSheet } from "../redux/reducers/utilsSlice";
import { useRoute } from "@react-navigation/native";
import productServices from "../services/productServices";
import SingleProductScreenSkeleton from "../components/loader/SingleProductScreenSkeleton";

// import { AntDesign } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import Rating from "../components/Rating";
import Tags from "../components/product-details/Tags";
const ProductDetails = ({ navigation }) => {
  let [activeColor, setActiveColor] = useState("Red");
  const [bigImg, setBigImg] = useState();
  const [loading, setLoading] = useState(false);

  const [singleProduct, setSingleProduct] = useState({});
  const dispatch = useDispatch();
  const route = useRoute();
  const [reviews, setReviews] = useState([]);
  const { productId } = route.params ?? {};

  const { detailsBottomSheet } = useSelector((state) => state.utils);
  const [variant, setVariant] = useState({});
  const [variantDetails, setVariantDetails] = useState([]);

  useEffect(() => {
    setLoading(true);
    productServices
      .singleProduct(productId)
      .then((res) => {
        // console.log(res.data.data.thumbnail_image,"singleproduct")
        setBigImg(res.data.data.thumbnail_image);
        setLoading(false);
        setSingleProduct(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
      });

    productServices
      .getReviews(productId, 1)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {});
  }, []);

  if (loading) {
    return <SingleProductScreenSkeleton />;
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
            },
            right: scale(6),
            top: scale(6),
            zIndex: 9999,
            borderRadius: 32,
            backgroundColor: "white",
          }}
        >
          <Image source={love} />
        </CustomTouchBtn>
        <Image
          style={{
            width: scale(330),
            height: scale(500),
            resizeMode: "contain",
            marginBottom: scale(10),
            alignSelf: "center",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            // borderRadius:10
          }}
          source={{ uri: bigImg }}
        />

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {singleProduct?.photos?.map((photo, index) => (
            <TouchableOpacity onPress={() => setBigImg(photo?.path)}>
              <Image
                style={{
                  height: scale(70),
                  width: scale(56),
                  marginRight: scale(5),
                  resizeMode: "stretch",
                }}
                source={{ uri: photo?.path }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* <View preset={[`  mt_20`]}>
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
            }}
          >
            <Text preset={["p3"]} style={{ color: colors.primary_3 }}>
              Copy Text
            </Text>
            <Image source={require("../../assets/icons/copy.png")} />
          </TouchableOpacity>
          
        </View> */}
        <Text preset={["fw_700 fs_20 mt_15"]}>{singleProduct?.name}</Text>
        <View preset={["row  mt_10 "]} style={{ alignItems: "center" }}>
          <Text preset={["fs_14  "]}>Sold by</Text>
          <Text preset={["ml_5 fw_700 fs_16 mr_10"]}>Inter Active</Text>
          <Entypo name="emoji-happy" size={24} color="black" />
          <Text preset={["fs_14"]}> 92%</Text>
        </View>
        <Text preset={["h2 bold mt_10"]}>
          {singleProduct?.currency_symbol}
          {singleProduct?.price?.calculable_price}
        </Text>
        <View preset={[" row mt_5"]}>
          {/* <Text>{singleProduct?.rating?.rating_count}</Text> */}
          <Rating
            from={"details"}
            defaultStars={singleProduct?.rating?.rating}
            maxStars={5}
          />
          <Text preset={["p1"]}>
            ({singleProduct?.rating?.rating_count} stars) • 10 reviews
          </Text>
        </View>
        <View preset={["row"]} style={styles.text}>
          <Text preset={["p1 fs_20 "]}>M.S.R.P : </Text>
          <Text preset={[" fs_20  text_second3"]}>{singleProduct?.msrp}</Text>
        </View>

        <CustomTouchBtn
          preset={["row mt_10 radius_5 center   border_1 "]}
          style={{ height: scale(48), width: "100%" }}
        >
          <Image source={require("../../assets/icons/dload.png")} />
          <Text preset={["p1 ml_10 fw_325"]}>Download Product Details</Text>
        </CustomTouchBtn>
        <CustomTouchBtn
          preset={["row mt_10  radius_5 center border_1 "]}
          style={{ height: scale(48), width: "100%" }}
        >
          <Image source={require("../../assets/icons/facebook.png")} />
          <Text preset={["p1 ml_10 fw_325 "]}>Post in Facebook</Text>
        </CustomTouchBtn>

        {/* size */}
        {/* <View preset={["mt_10"]}>
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
                  `center   mr_10 mt_10 ph_15 ${
                    activeSize === size ? "active" : ""
                  }`,
                ]}
                style={{ width: scale(67), height: scale(35),borderWidth:1, }}
              >
                <Text
                  preset={[` ${activeSize === size && "text_white "}  fs_16`]}
                >
                  {size}
                </Text>
              </CustomTouchBtn>
            ))}
          </View>
        </View> */}

        {/* color */}
        {singleProduct?.variation_attributes?.map((variation, index) => (
          <Tags
            variant={variantDetails}
            variantLength={index}
            setVariant={setVariantDetails}
            title={variation?.title}
            options={variation?.options}
            key={index}
          />
        ))}

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
              }}
            >
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
              }}
            >
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
          }}
        >
          {/* <View
            preset={[" ph_10  p_10  mt_20"]}
            style={{ backgroundColor: "#414042" }}
          >
            <View preset={["d_flex row jc_between  "]}>
              <Text preset={[" text_white fs_20 fw_700"]}>Details</Text>

              <CustomTouchBtn
                preset={["row center ml_10 border_1 radius_5 "]}
                style={{ padding: 5 }}
              >
                <Text preset={["text_white fs_11 mr_10"]}>
                  Copy Product Details
                </Text>
              
              </CustomTouchBtn>
            </View>
       
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
          </View> */}
        </View>

        {/* client review */}
        <View preset={[" mt_20"]}>
          <Text preset={["fs_16 fw_700"]}>Product Reviews</Text>
          <View preset={["mt_5"]}>
            {reviews.length == 0 ? (
              <View
                style={{
                  height: 150,
                  width: "100%",
                  backgroundColor: "gray",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white" }}>
                  No review found for this product
                </Text>
              </View>
            ) : (
              reviews.map((review, index) => (
                <>
                  <ClientReview rating={5} key={index} review={review} />
                  <View
                    preset={["row d_flex   mt_10"]}
                    style={{ alignItems: "center" }}
                  >
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
                </>
              ))
            )}
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

        <View style={{ height: scale(220) }}></View>
      </ScrollView>

      <View style={styles.container}></View>

      <TouchableOpacity style={styles.addToCart}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
            paddingTop: scale(10),
          }}
        >
          <AntDesign
            name="shoppingcart"
            size={22}
            style={{ fontWeight: "bold" }}
            color="white"
          />
          <Text style={{ color: colors.white, fontWeight: "500" }}>
            Add To Cart
          </Text>
        </View>
      </TouchableOpacity>
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
  addToCart: {
    backgroundColor: colors.primary_2,
    height: scale(160),
    width: width,
    position: "absolute",
    bottom: 0,
  },
});
