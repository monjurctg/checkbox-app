import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Mainlayout from "../components/layout/Mainlayout";

import Cards from "../components/products/Cards";
import { scale } from "../../utils/funtions";

import { AntDesign } from "@expo/vector-icons";
import SingleProduct from "../components/products/SingleProduct";
import productServices from "../services/productServices";

import SingleProductSkeleton from "../components/loader/SingleProductSkeleton";
import { BottomSheet } from "react-native-btr";

import BottomSheetCart from "../components/cart/BottomSheetCart";
import Categories from "../components/products/Categories";
import CategorySkeleton from "../components/loader/CategorySkeleton";
import CollectionSkeleton from "../components/loader/CollectionSkeleton";

const Products = ({ navigation }) => {
  // console.log(navigation, "products navigatio");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoriLoading, setCategoryLoading] = useState(false);
  const [collectionLoading, setCollectionLoading] = useState(false);

  const [lastPage, setLastPage] = useState();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [bottomSheetItem, setBottomSheetItem] = useState({});
  // const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const flatListRef = useRef(null);
  const [refreshing, setRefreshing] = React.useState(false);

  // apis
  const fetchCollection = () => {
    // alert("calling")
    setCollectionLoading(true);
    productServices
      .productCollection()
      .then((res) => {
        // console.log(res.data.data, "top Selling ");
        setCollections(res.data.data);
        setCollectionLoading(false);
      })
      .catch((err) => {
        setCollectionLoading(false);
      });
  };
  const fetchTopCategories = () => {
    setCategoryLoading(true);
    productServices
      .topCategories()
      .then((res) => {
        // console.log(res.data,"categories")
        setCategories(res.data.data);
        setCategoryLoading(false);
      })
      .catch((err) => {
        setCategoryLoading(false);
      });
  };
  useEffect(() => {
    // fetchData();
    fetchCollection();
    fetchTopCategories();
  }, [refreshing]);

  const fetchData = () => {
    setLoading(true);
    productServices
      .productList(page, 20)
      .then((res) => {
        // setLoading(false);
        // flatListRef.current.scrollToEnd({ animated: false });
        console.log(res.data.meta.last_page, page);
        if (res.data.data.length > 0) {
          setData([...data, ...res.data.data]);
          setLoading(false);
          setPage(page + 1);
          setLastPage(res.data.meta.last_page);
        } else {
          setLoading(false);

          // setData([...data,{id}])
        }
      })
      .catch((err) => {
        setLoading(false);
      });
    // console.log(res.data.meta, "product apo");
  };
  // const fetchData = async () => {
  //   setLoading(true);

  //   try {
  //     const res = await productServices.productList(page);
  //     console.log(res.data.meta.last_page, page);

  //     if (res.data.data.length > 0) {
  //       setData((prevData) => [...prevData, ...res.data.data]);
  //       setLoading(false);
  //       setPage((prevPage) => prevPage + 1);
  //       setLastPage(res.data.meta.last_page);
  //     } else {
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  const onBottomSheetOpen = (item) => {
    setVisible(true);
    setBottomSheetItem(item);
  };
  const onBottomSheetCloose = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(false);
    setBottomSheetItem({});
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    setData([]);
    setCategories([]);
    setCollections([]);
    fetchCollection();
    fetchData();
    fetchTopCategories();
    setPage(1);
  }, []);
  const renderItem = ({ item }) => (
    <SingleProduct
      id={item?.id}
      from={"product"}
      navigation={navigation}
      name={item?.name}
      src={item.thumbnail_image}
      toggleBottomNavigationView={onBottomSheetOpen}
      visible={visible}
      price={item?.price?.main_price}
      rate={item?.rating?.rating}
      sales={item?.sales}
      item={item}
    />
  );

  const renderFooter = () => {
    if (!loading)
      return (
        <View style={{ height: scale(350), marginTop: 20 }}>
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <SingleProductSkeleton />
            <SingleProductSkeleton />
            <SingleProductSkeleton />
            <SingleProductSkeleton />
            <SingleProductSkeleton />
            <SingleProductSkeleton />
          
          </View>
        </ScrollView>
      </View>
    );
  };
  
  const onCategoryPress = (slug)=>{
    // alert(slug)
    navigation.navigate("products-filter", { data:{category_slug:slug} })
  }
  
  const Header = () => {
    return (
      <>
        <Categories onCategoryPress={onCategoryPress} title={"Top Categories"} data={categories} />
        {categoriLoading && categories.length == 0 && <CategorySkeleton />}
        {/* <CollectionSkeleton/> */}

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
        {collectionLoading && collections.length == 0 && (
          <View>
            <CollectionSkeleton />
            <CollectionSkeleton />
          </View>
        )}

        {/* <Cards name={"Tech Collection"} navigation={navigation} /> */}
        {collections.map((collection, index) => (
          <Cards
          slug={collection?.slug}
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
                fontSize: 18,
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
        {data.length <= 0 && (
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                flexWrap: "wrap",
              }}
            >
              <SingleProductSkeleton />
              <SingleProductSkeleton />
            </View>
          </ScrollView>
        )}
      </>
    );
  };

  return (
    <Mainlayout navigation={navigation}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <FlatList
        ListHeaderComponent={Header}
        refreshControl={
          <RefreshControl
            colors={["red"]}
            tintColor="red"
            title="Refreshing..."
            titleColor="red"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchData}
        onEndReachedThreshold={0.7}
      />

      {/* </ScrollView> */}

      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={onBottomSheetCloose}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={onBottomSheetCloose}
        //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}
        <BottomSheetCart
          onBottomSheetClose={onBottomSheetCloose}
          item={bottomSheetItem}
        />
      </BottomSheet>
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
