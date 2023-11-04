import {
  FlatList,
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
import { Feather } from '@expo/vector-icons';

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
import cartServices from "../services/cartServices";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCartSize } from "../redux/reducers/cartSlice";
import Collections from "../components/Collections";
const ProductDetails = ({ navigation }) => {
  let [activeColor, setActiveColor] = useState("Red");
  const [bigImg, setBigImg] = useState();
  const [loading, setLoading] = useState(false);

  const [singleProduct, setSingleProduct] = useState({});
  const dispatch = useDispatch();
  const route = useRoute();
  const [reviews, setReviews] = useState([]);
  const { productId } = route.params ?? {};
  const { cartSize } = useSelector((state) => state.cart);
  const { detailsBottomSheet } = useSelector((state) => state.utils);
  const [variant, setVariant] = useState({});
  const [variantDetails, setVariantDetails] = useState([]);
  const [quantity, setQuantity] = useState(1);

  let addingToCart = async () => {
    // setLoading(true);
    const cart_id = await AsyncStorage.getItem("cart_id");
    let d = {
      product_id: productId,
      quantity: quantity,
      variant: Object.values(variantDetails).join("-"),
      cart_id: cart_id || null,
    };

    let res = await cartServices.addProductToCart(d);
    if (res.status === 200) {
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

      dispatch(setCartSize(cartSize + 1));

      await AsyncStorage.setItem(
        "cart_id",
        JSON.stringify(res.data?.data?.items[0]?.cart_id)
      );
      // successNotification("Added to Cart", "top-right");
      // localStorage.setItem(
      //   "cart_id",
      //   JSON.stringify(res.data?.data?.items[0]?.cart_id)
      // );
      // dispatch(singlecart(res.data?.data?.items[0]?.cart_id));
      // dispatch(cartNumberChanged());
    } else {
      setLoading(false);
      if (res?.data?.message === "User is not logged in") {
        // router.push("/login");
        // console.log("Something wrong happen");
      } else if (res.data.message == "Cart is assigned to an order") {
        await AsyncStorage.removeItem("cart_id");
      }
      showMessage({
        style: {
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 15,
        },
        message: res?.data?.message,
        type: "danger",
        position: "top",
        duration: 2500,
        icon: "danger",

        statusBarHeight: scale(40),
      });

      // errorNotification(res?.data?.message, "top-right");
    }
  };

  useEffect(() => {
    setLoading(true);
    productServices
      .singleProduct(productId)
      .then((res) => {
        // console.log(res.data.data.thumbnail_image,"singleproduct")
        // setBigImg(res.data.data.thumbnail_image);
        setBigImg(res.data.data?.photos[0].path ?? res.data.data.thumbnail_image)
        setLoading(false);
        setSingleProduct(res.data.data);
        // console.log()
      })
      .catch((err) => {
        setLoading(false);
      });

    productServices
      .getReviews(productId, 1)
      .then((res) => {
        // console.log(res,"res review")
        setReviews(res.data);
      })
      .catch((err) => { });
  }, [productId]);
  const renderItem = ({ item }) => {
    return <ClientReview rating={5} review={item} />
  }

  console.log(productId)
  if (loading) {
    return <SingleProductScreenSkeleton />;
  }
  return (
    <Mainlayout>
      <ScrollView showsVerticalScrollIndicator={false}>
    
        <View style={{ alignSelf: "center", elevation: 1, width: scale(330), backgroundColor: "#FFF", padding: 10, marginTop: 20, borderRadius: 10, paddingVertical: 20 }}>



          <Image
            style={{
              width: scale(310),
              height: scale(320),
              resizeMode: "contain",
              // marginBottom: scale(10),
              alignSelf: "center"
              , borderWidth: 1, borderColor: "#DDD"
            }}
            source={{ uri: bigImg }}
          />

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {singleProduct?.photos?.map((photo, index) => (
              <TouchableOpacity key={index} onPress={() => setBigImg(photo?.path)}>
                <Image
                  style={{
                    height: scale(70),
                    width: scale(70),
                    
                    // marginRight: scale(5),
                    resizeMode: "contain"
                    , borderWidth: 1, borderColor: "#DDD"
                    // borderRadius:10
                  }}
                  source={{ uri: photo?.path }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text preset={[" fs_20 mt_15"]} style={{fontFamily:"RB"}}>{singleProduct?.name}</Text>
          <View preset={["row  mt_10 "]} style={{ alignItems: "center" }}>
            <Text preset={["fs_14 RM "]} style={{backgroundColor:"#4caf50",paddingHorizontal:10,paddingVertical:5,color:"#FFF"}}>Sold by</Text>
            <Text preset={["ml_5 RB fs_16 RB  mr_10"]} style={{}}>Inter Active</Text>
            {/* <Text preset={["ml_5 RB fs_16 mr_10"]}>Inter Active</Text> */}
 
            <Entypo name="emoji-happy" size={24} color="black" />
            <Text preset={["fs_14"]}> 92%</Text>
          </View>
          <Text style={{color:"#be202e"}} preset={["h2 RB bold mt_10"]}>
            {singleProduct?.currency_symbol}
            {singleProduct?.price?.calculable_price}
          </Text>
          <View preset={[" row mt_5 "]} style={{ alignItems: "center", gap: 3 }}>
            {/* <Text>{singleProduct?.rating?.rating_count}</Text> */}
            <Rating
              from={"details"}
              defaultStars={singleProduct?.rating?.rating}
              maxStars={5}
            />
            <Text preset={["p1 RR"]}>
              ({singleProduct?.rating?.rating_count} stars) • 10 reviews
            </Text>
          </View>
          <View preset={["row"]} style={styles.text}>
            <Text preset={["p1 fs_20 RR "]}>M.S.R.P : </Text>
            <Text preset={[" fs_20  text_second3"]}>{singleProduct?.msrp}</Text>
          </View>

          <CustomTouchBtn
            preset={["row mt_10 radius_5 center   border_1 "]}
            style={{ height: scale(48), width: "100%" }}
          >
            <Image source={require("../../assets/icons/dload.png")} />
            <Text preset={["p1 ml_10 RR"]} style={{ fontWeight: "300" }}>Download Product Details</Text>
          </CustomTouchBtn>
          <CustomTouchBtn
            preset={["row mt_10  radius_5 center border_1 "]}
            style={{ height: scale(48), width: "100%",backgroundColor:"#bd212f" }}
          >
            {/* <Image source={require("../../assets/icons/facebook.png")} /> */}
            <Feather name="facebook" size={18} color="#FFF" />
            <Text preset={["p1 ml_10 fw_325 RR "]} style={{color:"#FFF"}}>Post in Facebook</Text>
          </CustomTouchBtn>

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
            <Text preset={["fs_16 bold RB "]}>Qty</Text>
            {/* <View preset={["row mt_5 "]} style={{}}>
            <CustomTouchBtn
              onPress={() => {
                if (quantity >= 2) {
                  setQuantity(quantity - 1);
                }
              }}
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
            <Text preset={["m_5 fs_16 bold"]}>{quantity}</Text>
            <CustomTouchBtn
              onPress={() => {
                setQuantity(quantity + 1);
              }}
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
          </View> */}
            <View preset={["mt_10"]} style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => {
                if (quantity >= 2) {
                  setQuantity(quantity - 1);
                }

              }} style={{ borderWidth: 1, borderColor: "#DDD", width: scale(60), height: 40, justifyContent: "center", alignItems: "center" }}><AntDesign name="minus" size={24} color="black" /></TouchableOpacity>
              <View style={{ borderWidth: 1, width: scale(60), height: 40, justifyContent: "center", alignItems: "center", borderColor: "#DDD" }}>
                <Text>{quantity}</Text>
              </View>

              <TouchableOpacity onPress={() => {
                setQuantity(quantity + 1);

              }} style={{ borderWidth: 1, width: scale(60), height: 40, justifyContent: "center", alignItems: "center", borderColor: "#DDD" }}><AntDesign name="plus" size={24} color="black" /></TouchableOpacity>

            </View>
          </View>


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
            <Text preset={["fs_16 fw_700 RB"]}>Product Reviews</Text>
            <View preset={["mt_5"]}>
              {reviews?.length == 0 ? (
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
                // reviews?.map((review, index) => (
                //   <View key={index}>
                //     <ClientReview rating={5}  review={review} />
                //     {/* <View
                //       preset={["row d_flex   mt_10"]}
                //       style={{ alignItems: "center" }}
                //     >
                //       <Text preset={["fs_18"]}>See More</Text>
                //       <AntDesign
                //         style={{
                //           marginLeft: scale(20),
                //           fontSize: scale(18),
                //           lineHeight: scale(30),
                //         }}
                //         name="down"
                //         size={18}
                //         color="black"
                //       />
                //     </View> */}
                //   </View>
                // ))
                <FlatList horizontal={true}
                  // numColumns={2}
                  showsHorizontalScrollIndicator={false}
                  data={reviews}
                  renderItem={renderItem}
                  onEndReachedThreshold={0.5}
                />
              )}
            </View>
          </View>
        </View>
        <Collections  navigation={navigation}/>




        <View style={{ height: scale(220) }}></View>
      </ScrollView>

      <View style={styles.container}></View>

      <TouchableOpacity onPress={() => addingToCart()} style={styles.addToCart}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
            // paddingTop: scale(10),
          }}
        >
          <AntDesign
            name="shoppingcart"
            size={22}
            style={{ fontWeight: "bold" }}
            color="white"
          />
          <Text
            style={{
              color: colors.white,
              fontWeight: "500",
              fontSize: scale(14),
            }}
          >
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
    backgroundColor: colors.primary_1,
    height: scale(50),
    marginBottom: scale(height <= 760 ? 115 : 100),
    width: width,
    position: "absolute",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
