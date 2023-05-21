import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import productServices from "../services/productServices";
import { FlatList } from "react-native";
import SingleProductSkeleton from "../components/loader/SingleProductSkeleton";

const Products = ({ navigation }) => {
  // console.log(navigation, "products navigatio");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState();

  const [data, setData] = useState([]);
  const [collections, setCollections] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const flatListRef = useRef(null);

  const fetchCollection = () => {
    productServices.productCollection().then((res) => {
      console.log(res.data.data, "top Selling ");
      setCollections(res.data.data);
    });
  };
  useEffect(() => {
    // fetchData();
    fetchCollection();
  }, []);

  const fetchData =  () => {
    setLoading(true);
     productServices.productList(page).then((res)=>{
      // setLoading(false);
      // flatListRef.current.scrollToEnd({ animated: false });
      console.log(res.data.meta.last_page, page);
      if(res.data.data.length>0){
        setData([...data, ...res.data.data]);
        setLoading(false);
        setPage(page + 1);
        setLastPage(res.data.meta.last_page);  

      }
      else{
        setLoading(false)
      } 

                                  
    }).catch((err=>{
      setLoading(false)

    }))
    // console.log(res.data.meta, "product apo");

   
  };

  const renderItem = ({ item }) => (
    <SingleProduct
    id={item?.id}
      from={"product"}
      navigation={navigation}
      name={item?.name}
      src={item.thumbnail_image}
      toggleBottomNavigationView={toggleBottomNavigationView}
      visible={visible}
      price={item?.price?.main_price}
      rate={item?.rating?.rating}
      sales={item?.sales}
    />
  );

  const renderFooter = () => {
    if (!loading)
      return (
        <View style={{ height: scale(280), marginTop: 20 }}>
          {page > lastPage && (
            <Text style={{ textAlign: "center", color: "red" }}>
              No more data
            </Text>
          )}
        </View>
      );

    return (
      <View
        style={{
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          paddingBottom: 200,
          // height: scale(500),
          // marginBottom:20
        }}
      >
        {/* <ActivityIndicator size="large" color={"red"} /> */}
        <ScrollView>
        <View style={{flexDirection:"row",justifyContent:"space-around" ,flexWrap:"wrap"}}>
        <SingleProductSkeleton/>
        <SingleProductSkeleton/>
        <SingleProductSkeleton/>

        <SingleProductSkeleton/>



        </View>
        </ScrollView>
        
      </View>
    );
  };
  // loading
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
  // console.log(data, "res from product api");

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const Header = () => {
    return (
      <>
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
            Top Categories
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
        {/* <Cards name={"Tech Collection"} navigation={navigation} /> */}
        {collections.map((collection, index) => (
          <Cards
            key={index}
            collections={collection?.selectedProducts}
            img={collection?.coverImage}
            name={collection?.name}
            navigation={navigation}
          />
        ))}

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
        </View>
      </>
    );
  };

  return (
    <Mainlayout navigation={navigation}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <FlatList
        ListHeaderComponent={Header}
        // ref={flatListRef}
        // renderScrollComponent={Header}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchData}
        // onEndReachedThreshold={0.5}
      />

      {/* </ScrollView> */}
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

