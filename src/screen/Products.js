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


import { filterCategories, scale } from "../../utils/funtions";

import { AntDesign } from "@expo/vector-icons";
import SingleProduct from "../components/products/SingleProduct";
import productServices from "../services/productServices";

import SingleProductSkeleton from "../components/loader/SingleProductSkeleton";
import { BottomSheet } from "react-native-btr";

import BottomSheetCart from "../components/cart/BottomSheetCart";
import Categories from "../components/products/Categories";
import CategorySkeleton from "../components/loader/CategorySkeleton";
import CollectionSkeleton from "../components/loader/CollectionSkeleton";
import CollectionItems from "../components/products/CollectionItems";
import Collections from "../components/Collections";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setTabShow } from "../redux/reducers/utilsSlice";
import Filters from "../components/products/Filters";
let scroll = 0

const Products = (props) => {
  // console.log(navigation, "products navigatio");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation()
  const [categoriLoading, setCategoryLoading] = useState(false);

  const dispatch = useDispatch()
  const [lastPage, setLastPage] = useState();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [collectionLoading, setCollectionLoading] = useState(false);
  const [bottomSheetItem, setBottomSheetItem] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const flatListRef = useRef(null);
  const [sort_by, setSort_by] = useState("best_seller")

  const [refreshing, setRefreshing] = React.useState(false);



  // const[offset,setOffset]=useState(0)

  // console.log(viewPosition)
  // apis

  const fetchTopCategories = () => {
    setCategoryLoading(true);
    productServices
      .getAllCategories()
      .then((res) => {
        // console.log(res.data,"categories")
        setCategories(res.data.data);
        setCategoryLoading(false);
      })
      .catch((err) => {
        setCategoryLoading(false);
      });
  };

  const fetchData = () => {
    // console.log("hitting")
    setLoadingMore(true);
    productServices
      .productList(page, 20)
      .then((res) => {
        // setLoading(false);
        // flatListRef.current.scrollToEnd({ animated: false });
        // console.log(res.data.meta.last_page, page);
        if (res.data.data.length > 0) {
          setData([...data, ...res.data.data]);
          setLoading(false);
          setPage(page + 1);
          setLastPage(res.data.meta.last_page);
        } else {
          setLoadingMore(false);

          // setData([...data,{id}])
        }
      })
      .catch((err) => {
        setLoadingMore(false);

      });
    // console.log(res.data.meta, "product apo");
  };


  useEffect(() => {
    // console.log("hello")
    fetchData();
    // fetchCollection();
    fetchTopCategories();
  }, [refreshing]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // fetchSingCart();
      dispatch(setTabShow(true))


    });
    return unsubscribe;
  }, [navigation]);




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
  const onScroll = (event) => {

    let scroll2 = 0
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - scroll;
    const dif2 = currentOffset - scroll2

    // console.log(dif2)
    if (dif2 <= 3) {
      // console.log(dif2)
      dispatch(setTabShow(true))
    }
    else if (dif <= 0) {
      dispatch(setTabShow(true))
    }
    else {
      dispatch(setTabShow(false))




    }
    //console.log('dif=',dif);

    // setOffset(currentOffset)
    scroll = currentOffset
  }

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
    // fetchCollection();
    // fetchData();
    // fetchTopCategories();
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
    if (!loadingMore)
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


          </View>
        </ScrollView>
      </View>
    );
  };


  const onCategoryPress = (slug, name) => {
    // alert(slug)
    // navigation.navigate("products-filter", { data:{category_slug:slug} })
    filterCategories.push(slug)

    navigation.navigate("filter", { data: { category_slug: slug }, from: name, nFrom: "category" })

  }


  const Header = () => {
    return (
      <>

        <Text
          style={{
            // fontFamily: "Gotham",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: 18,
            lineHeight: 22,
            color: "#000000",
            marginVertical: 15, fontFamily: "RB"
          }}
        >
          Product  Categories
        </Text>

        <Categories onCategoryPress={onCategoryPress} TYPE={"scroll"} data={categories} />
        {categoriLoading && categories.length == 0 && <CategorySkeleton />}
        {/* <CollectionSkeleton/> */}


        <View>
          <View style={{ marginTop: 40, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
            <Text style={{
              fontFamily: "RB",
              fontStyle: "normal",

              fontSize: 20,
              lineHeight: 24,
            }}
            >
              Collection
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("all-collection",)
              }}
              style={{
                borderColor: "#BE202E",
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "RR",
                  fontStyle: "normal",

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

        <Collections refreshing={refreshing} navigation={navigation} />

        <View>
          <View
            style={{
              marginTop: 40,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              // alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "RB",
                fontStyle: "normal",
                // fontWeight: 700,
                fontSize: 18,
                lineHeight: 24,

              }}
            >
              All Products
            </Text>
            {/* <TouchableOpacity
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
              <Text preset={["fs_14  lh_14 RR  fw_400 pl_5 center"]}>
                Best sellers
              </Text>
              <AntDesign name="down" size={11} color="black" />
            </TouchableOpacity> */}
            <Filters navigation={navigation} from={"products"} setSort_by={setSort_by} />

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
      <View style={{}}>
        <FlatList
          onScroll={onScroll}
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
          onEndReachedThreshold={0.5}
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
      </View>
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
