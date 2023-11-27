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
import { Feather, FontAwesome } from '@expo/vector-icons';

import img3 from "../../assets/img/shoe1.png";
import { AntDesign } from "@expo/vector-icons";
import ClientReview from "../components/product-details/ClientReview";
import * as Clipboard from 'expo-clipboard';
import { BottomSheet } from "react-native-btr";
import SingleCart from "../components/cart/SingleCart";
import { CheckboxContext } from "../context/CheckboxProvider";
import { useDispatch, useSelector } from "react-redux";
import { setDetailsBottomSheet } from "../redux/reducers/utilsSlice";
import { useRoute } from "@react-navigation/native";
import productServices from "../services/productServices";
import SingleProductScreenSkeleton from "../components/loader/SingleProductScreenSkeleton";
import RenderHtml from 'react-native-render-html';
// import { AntDesign } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import Rating from "../components/Rating";
import Tags from "../components/product-details/Tags";
import cartServices from "../services/cartServices";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCartSize } from "../redux/reducers/cartSlice";
import Collections from "../components/Collections";
import { Dimensions } from "react-native";
import WebView from "react-native-webview";
import Toast from "react-native-toast-message";
import { FileDownload } from "../components/FileDownload";
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
  const [variants, setVariants] = useState({});
  const [variantDetails, setVariantDetails] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const[prices,setPrices]=useState()




  const copyToClipboard = async () => {
    await Clipboard.setStringAsync('hello world');
  };


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


      dispatch(setCartSize(cartSize + 1));
      console.log(res.data.data)

      await AsyncStorage.setItem(
        "cart_id",
        JSON.stringify(res.data?.data?.items[0]?.cart_id)
      );
      Toast.show({
        type: "cartSuccess",
        text1: "Successfull",
        text2: "Added to Cart",
        visibilityTime:4000 ,
        autoHide: true,
        bottomOffset: 280,
        onShow: () => { },
        onHide: () => { },
      });

    } else {
      setLoading(false);
      if (res?.data?.message === "User is not logged in") {
        // router.push("/login");
        // console.log("Something wrong happen");
      } else if (res.data.message == "Cart is assigned to an order") {
        await AsyncStorage.removeItem("cart_id");
      }

      // showMessage({
      //   style: {
      //     alignItems: "center",
      //     justifyContent: "center",
      //     flexDirection: "column",
      //     gap: 15,
      //   },
      //   message: res?.data?.message,
      //   type: "danger",
      //   position: "top",
      //   duration: 2500,
      //   icon: "danger",

      //   statusBarHeight: scale(40),
      // });
      Toast.show({
        type: "error",
        text1: "Error",
        text2: res?.data?.message,
        visibilityTime: 4000,
        autoHide: true,

        bottomOffset: 280,
        onShow: () => { },
        onHide: () => { },
      });

      // errorNotification(res?.data?.message, "top-right");
    }
  };
  function findVariantPrice(defaultVariant) {
    // Object.values(variantDetails).join("-")
    let variant = Object.values(variantDetails).join("-")
    // console.log(variant)
    if(variants.length>0){
      const foundVariant = variants.find(v => v?.variant === variant);
      console.log(foundVariant)
    if (foundVariant) {
      setPrices(foundVariant) ;
    }
    }
  }
  // console.log(singleProduct)
  useEffect(() => {
    setLoading(true);
    productServices
      .singleProduct(productId)
      .then((res) => {
        // console.log(res.data.data.thumbnail_image,"singleproduct")
        // setBigImg(res.data.data.thumbnail_image);
        setBigImg(res.data.data?.photos[0].path ?? res.data.data.thumbnail_image)
        setLoading(false);
        // console.log(res.data.data?.variant_info)
        setVariants(res.data.data.variant_info)
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

  useEffect(()=>{
//     let variant= Object?.values(variantDetails).join("-")

// console.log(variant)
findVariantPrice()
  },[variantDetails])


  const fetchCopiedText = async (text2) => {
    await Clipboard.setStringAsync(text2);

  };
  const downloadProductDetails = async () => {

    let res = await productServices.downloadProductDetails(productId);
    if (res.status === 200) {
      let paths =res.data.paths
      if(paths?.length > 0){
        paths.forEach(async(path)=>{
          FileDownload(path)
      })
      }

    } else {
      // setdLoader(false);
      // errorNotification("Couldn't Download", "top-right");
    }
  };

  const renderItem = ({ item }) => {
    return <ClientReview rating={5} review={item} />
  }

  const toastConfig = {
    wellcome: () => {

    }, success: () => { },

    error: ({ text1, text2, props }) => (
      <View style={{
        minHeight: 200,
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        top: 200,
        shadowOpacity: 2.22,
        shadowRadius: 2.22,
        elevation: 15,
        //marginTop: height_center - 140,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        flex: 1
      }}>
        <View style={{
          height: 60,
          width: 60,
          backgroundColor: '#be202e',
          borderWidth: 5,
          borderColor: '#fff',
          borderRadius: 50,
          shadowColor: "#000",

          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          top: -30,
          alignSelf: 'center'
        }}>
          <FontAwesome name="close" size={24} color="#fff" />
        </View>
        <View style={{ width: '100%', padding: 10, marginTop: 20, alignItems: 'center' }}>
          <View style={{ borderBottomColor: '#eee', borderBottomWidth: 1, width: '100%', alignItems: 'center' }}>
            <Text style={{ flex: 1, fontSize: 24, color: '#be202e', fontWeight: '700' }}>{text1}</Text>
          </View>
          <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', paddingHorizontal: 10, paddingVertical: 15, textAlign: 'center' }}>{text2}</Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#be202e',
            width: '95%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 7,
            paddingVertical: 10,
            paddingHorizontal: 20
          }}
          onPress={() => {
            Toast.hide({
              onHide: () => { }
            })
          }}
        >

          <Text style={{ fontWeight: '700', fontSize: 16, color: '#FFF' }}>CLOSE</Text>
        </TouchableOpacity>

      </View>
    ),

    cartSuccess: ({ text1, text2, props }) => (

      <View style={{
        minHeight: 200,
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        top: 200,
        shadowOpacity: 2.22,
        shadowRadius: 2.22,
        elevation: 15,
        //marginTop: height_center - 140,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        flex: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      }}>
        <View style={{
          height: 60,
          width: 60,
          backgroundColor: '#28E687',
          borderWidth: 5,
          borderColor: '#fff',
          borderRadius: 50,
          shadowColor: "#000",

          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          top: -30,
          alignSelf: 'center'
        }}>
          <FontAwesome name="check" size={24} color="#fff" />
        </View>
        <View style={{ width: '100%', padding: 10, marginTop: 20, alignItems: 'center' }}>
          <View style={{ borderBottomColor: '#eee', borderBottomWidth: 1, width: '100%', alignItems: 'center' }}>
            <Text style={{ flex: 1, fontSize: 24, color: '#28E687', fontWeight: '700' }}>{text1}</Text>
          </View>
          <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', paddingHorizontal: 10, paddingVertical: 15, textAlign: 'center' }}>{text2}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>

          <TouchableOpacity
            style={{
              backgroundColor: '#28E687',
              width: '45%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
              paddingVertical: 10,
              paddingHorizontal: 20
            }}
            onPress={() => {
              Toast.hide({
                onHide: () => { }
              })
            }}
          >

            <Text style={{ fontWeight: '700', fontSize: 16, color: '#FFF' }}>OK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#28E687',
              width: '45%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
              paddingVertical: 10,
              paddingHorizontal: 20
            }}
            onPress={() => {
              navigation.navigate("cart")
            }}
          >

            <Text style={{ fontWeight: '700', fontSize: 16, color: '#FFF' }}>Cart Details</Text>
          </TouchableOpacity>
        </View>
      </View>




    ),

  }

  // console.log(productId)
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
          <Text preset={[" fs_20 mt_15"]} style={{ fontFamily: "RB" }}>{singleProduct?.name}</Text>
          <View preset={["row  mt_10 "]} style={{ alignItems: "center" }}>
            <Text preset={["fs_14 RM "]} style={{ backgroundColor: "#4caf50", paddingHorizontal: 10, paddingVertical: 5, color: "#FFF" }}>Sold by</Text>
            <Text preset={["ml_5 RB fs_16 RB  mr_10"]} style={{}}>Inter Active</Text>
            {/* <Text preset={["ml_5 RB fs_16 mr_10"]}>Inter Active</Text> */}

            <Entypo name="emoji-happy" size={24} color="black" />
            <Text preset={["fs_14"]}> 92%</Text>
          </View>
          <Text style={{ color: "#be202e" }} preset={["h2 RB bold mt_10"]}>
            {singleProduct?.currency_symbol}
            {prices?prices.price: singleProduct?.price?.calculable_price}
          </Text>
          <View preset={[" row mt_5 "]} style={{ alignItems: "center", gap: 3 }}>
            {/* <Text>{singleProduct?.rating?.rating_count}</Text> */}
            <Rating
              from={"details"}
              defaultStars={singleProduct?.rating?.rating}
              maxStars={5}
            />
            <Text preset={["p1 RR"]}>
              ({singleProduct?.rating?.rating} stars) • {singleProduct?.rating?.rating_count} reviews
            </Text>
          </View>
          <View preset={["row"]} style={styles.text}>
            <Text style={{ fontSize: 16, fontWeight: "500", fontFamily: "RM" }}>
              Min Selling Price:<Text> {prices?prices?.min_selling_price:singleProduct?.min_selling_price}, </Text>
              Max Selling Price:<Text> {prices?prices?.max_selling_price:singleProduct?.max_selling_price}</Text>
            </Text>
          </View>
          {/* <View
            preset={[" ph_10  p_10  mt_20"]}
            style={{ backgroundColor: "#414042" }}
          >
            <View preset={["d_flex row jc_between  "]}>
              <Text preset={[" text_white fs_16 RB"]}>Details</Text>

              <CustomTouchBtn
                preset={["row center ml_10 border_1 radius_5 "]}
                style={{ padding: 5 }}
              >
                <Text preset={["text_white RR fs_11 mr_10"]}>
                  Copy Product Details
                </Text>

              </CustomTouchBtn>
            </View>

            <WebView
          style={{flex:1,height:300}}

            originWhitelist={['*']}
            source={{ html:"<meta name= viewport content= width=device-width>" +singleProduct?.description }}
          />
       reseller_instructions
          </View> */}

          {
            singleProduct?.description &&      <View   style={{flexDirection:"row",borderWidth:1,borderColor:"#DDD",padding:10,marginTop:20}}>
            <RenderHtml contentWidth={350} source={{ html: singleProduct?.description }} />
            <TouchableOpacity style={{position:"absolute",top:5,right:5}} onPress={()=>fetchCopiedText(singleProduct?.description )}>
              {/* <Text style={{fontSize:14}}>Copy description</Text>
               */}
               <Feather name="copy" size={24} color="black" />
            </TouchableOpacity>
            </View>

          }




          {singleProduct?.variation_attributes?.length > 0 && singleProduct?.variation_attributes?.map((variation, index) => (
            <Tags
              variant={variantDetails}
              variantLength={index}
              setVariant={setVariantDetails}
              title={variation?.title}
              options={variation?.options}
              key={index}
            />
          ))}


          <CustomTouchBtn
          onPress={downloadProductDetails}
            preset={["row mt_10 radius_5 center   border_1 center "]}
            style={{ height: scale(48), width: "100%", alignItems: "center" }}
          >
            <Image source={require("../../assets/icons/dload.png")} />
            <Text preset={[" ml_10 RR"]} style={{ fontWeight: "300" }}>Download Product Details</Text>
          </CustomTouchBtn>
          <CustomTouchBtn
            preset={["row mt_10  radius_5 center  "]}
            style={{ height: scale(48), width: "100%", backgroundColor: colors.primary_2 }}
          >
            {/* <Image source={require("../../assets/icons/facebook.png")} /> */}
            <Feather name="facebook" size={18} color="#FFF" />
            <Text preset={[" ml_10 fw_325 RR "]} style={{ color: "#FFF" }}>Post in Facebook</Text>
          </CustomTouchBtn>




          {/* color */}


          {/* quantity */}

          {
            singleProduct?.reseller_instructions && <View style={{ marginTop: 10 }}>

              <Text style={{ fontSize: 22, fontFamily: "RB" }}>Reseller Instruction</Text>


              <RenderHtml contentWidth={350} source={{ html: singleProduct?.reseller_instructions }} />


            </View>
          }



          {/* details */}
          <View
            preset={["mt_20"]}
            style={{

              borderTopColor: colors.secoundary_3,
            }}
          >

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
        <Collections navigation={navigation} />



        <View style={{ height: scale(220) }}></View>
      </ScrollView>

      <View  style={styles.addToCart}>
      <View preset={[]}>
            {/* <Text preset={["fs_16 bold RB "]}>Qty</Text> */}

            <View preset={[""]} style={{ flexDirection: "row", alignSelf: "center" ,}}>
              <TouchableOpacity onPress={() => {
                if (quantity >= 2) {
                  setQuantity(quantity - 1);
                }
              }} style={{  backgroundColor: "#fff", width: scale(45), height: 46, justifyContent: "center", alignItems: "center" }}><AntDesign name="minus" size={24} color={colors.primary_2} /></TouchableOpacity>
              <View style={{backgroundColor:"#FFF", width: scale(50), height: 46, justifyContent: "center", alignItems: "center", borderColor: "#DDD" }}>
                <Text style={{color:colors.primary_2}}>{quantity}</Text>
              </View>

              <TouchableOpacity onPress={() => {
                setQuantity(quantity + 1);

              }} style={{backgroundColor:"#FFF", width: scale(45), height: 46, justifyContent: "center", alignItems: "center", borderColor: "#DDD" }}><AntDesign name="plus" size={24} color={colors.primary_2} /></TouchableOpacity>

            </View>
          </View>
        <TouchableOpacity style={{backgroundColor:colors.primary_2,height:45,justifyContent:"center",paddingHorizontal:20}} onPress={() => addingToCart()}>
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

      </View>

      <Toast style={{ zIndex: 1000000 }} config={toastConfig} type="wellcome" visibilityTime={1000} autoHide={true} hide />

      {/* <View style={styles.container}></View> */}

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
    backgroundColor:"#d2d2d2",
    elevation:5,
    justifyContent:"center",alignItems:"center",
    // bottom:20,
    height: scale(60),
    // marginBottom: scale(height <= 760 ? 125 : 110),
    width: width,
    position: "absolute",
    flexDirection:"row",
    gap:20,
    // bottom: 100,
    marginTop: Dimensions.get("window").height - scale(60),

    // display: "flex",
    // bottom:10,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
