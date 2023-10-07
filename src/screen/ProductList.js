import {
  DrawerLayoutAndroid,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import Mainlayout from "../components/layout/Mainlayout";
import Filters from "../components/products/Filters";
import SingleProduct from "../components/products/SingleProduct";
import View from "../components/tags/View";
import { scale } from "../../utils/funtions";
import img1 from "../../assets/img/redShoe.png";
import img2 from "../../assets/img/camera.png";
import img3 from "../../assets/img/headphone.png";
import img4 from "../../assets/img/sunglass.png";
import img5 from "../../assets/img/watch.png";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import img6 from "../../assets/img/shoe1.png";
import { BottomSheet } from "react-native-btr";
import CustomTouchBtn from "../components/tags/CustomTouchBtn";
import Text from "../components/tags/Text";
import SingleCart from "../components/cart/SingleCart";
import { colors } from "../theme/colors";
import FullScreenLoader from "../components/loader/FullScreenLoader ";
import { SafeAreaView } from "react-native-safe-area-context";
import { filterData } from "../../utils/filterData";
import Checkbox from "../components/Input/Checkbox";
import filterServices from "../services/filterServices";
import { useEffect } from "react";
import { FlatList } from "react-native";
import SingleProductSkeleton from "../components/loader/SingleProductSkeleton";
import Categories from "../components/products/Categories";
import CategorySkeleton from "../components/loader/CategorySkeleton";
import Dropdown from "../components/Input/Dropdown";
import AttributeDropdown from "../components/Input/AttributeDropdown";

const ProductList = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const drawerRef = useRef(null);
  const { data } = route.params ?? {};
  const [searchData, setSearchData] = useState();
  const [searchProducts, setSearchProducts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(300);
  const [oldCategory, setOldCategory] = useState();
  let [isFiter, setIsFilter] = useState(false);
 
  // let [filter, setFilter] = useState({
  //   page: currentPage,
  //   category_slug: data?.category_slug ?? "",
  //   collection_slug: data?.collection_slug ?? "",
  //   brand_ids: [],
  //   category_ids: [],
  //   min_price: null,
  //   max_price: null,
  //   keyword: data?.keyword ?? "",
  //   sort_by: "",
  //   color_codes: [],
  //   selected_attribute_values: {},
  // });

  const fetchData = () => {
    // let filter={
    //   page:currentPage,
    //   category_slug :data?.category_slug,
    //   collection_slug : data?.collection_slug,
    //   brand_ids : [],
    //   category_ids : [],
    //   min_price:null,
    //   max_price:null,
    //   keyword:data?.keyword,
    //   sort_by:"",color_codes:[],
    //   selected_attribute_values:{},
    // }
    setLoading(true);
    filterServices
      .search(filter)
      .then((res) => {
        console.log(res.data.data.data[0],"res");
        if (isFiter) {
          setSearchProducts([]);
          setTimeout(() => {
            setFilter({ ...filter, page: 1 });
            setLoading(false);
            setIsFilter(false);
            setSearchProducts([
              ...searchProducts,
              ...res.data.data.data,
            ]);
          }, 1000);
        } else {
          setSearchData(res.data.data.data);
          setSearchProducts([
            ...searchProducts,
            ...res.data.data.products.data,
          ]);
          setLoading(false);
          setIsFilter(false);
          setFilter({ ...filter, page: filter.page + 1 });
          // setLastPage(res.data.data.meta.last_page);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // fetchData();
  }, [isFiter]);

  // const handleCategoryChange = (cateId) => {
  //   setIsFilter(true);
  //   setFilter({ ...filter, page: 1 });
  //   const isInids = filter.category_ids.find((id) => id === cateId);
  //   if (!isInids) {
  //     setFilter({
  //       ...filter,
  //       category_ids: [...filter.category_ids, cateId],
  //     });
  //   } else {
  //     const restIds = filter.category_ids.filter((id) => id !== cateId);
  //     setFilter({
  //       ...filter,
  //       category_ids: restIds,
  //     });
  //   }
  // };
  
  const openDrawer = () => {
    drawerRef.current.openDrawer();
  };

  const closeDrawer = () => {
    drawerRef.current.closeDrawer();
  };

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   // setLoading(true)
  //   setSearchData([]);
  //   setSearchProducts([]);
  //   setCurrentPage(1);

  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 1000);
  //   fetchData();
  // }, []);

  // const onCategoryPress = (slug) => {

  //   setSearchData([]);
  //   setSearchProducts([]);
  //   setSearchProducts([]);

  //   setFilter({ ...filter, category_slug: slug, page: 1 });

  // };
 
  const categoriesDrop = (
    <View>
      {searchData?.search_attributes?.categories.length > 0 && (
        <Dropdown
          title={"Categories"}
          checkBoxHandle={handleCategoryChange}
          options={searchData?.search_attributes?.categories}
          // handleChange={handleValueChange}
          state={"category_ids"}
        />
      )}
    </View>
  );

  const brandDrop = (
    <View>
      {searchData?.search_attributes?.brands.length > 0 && (
        <Dropdown
          checkBoxHandle={handleCategoryChange}
          title={"Brands"}
          options={searchData?.brands?.categories}
          // handleChange={handleValueChange}
        />
      )}
    </View>
  );

  const colorsDrop = (
    <View>
      {searchData?.search_attributes?.colors.length > 0 && (
        <Dropdown title={"Colors"} options={searchData?.colors?.categories} />
      )}
    </View>
  );

  const attributesDrop = (
    <View>
      {searchData?.search_attributes?.attributes?.length > 0 &&
        searchData?.search_attributes?.attributes.map((item, index) => (
          <AttributeDropdown
            key={index}
            title={item?.name}
            options={item?.attribute_values}
            // handleChange={handleValueChange}
            state={"color_codes"}
          />
        ))}
    </View>
  );

  const navigationView = (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ alignItems: "center", display: "flex", marginBottom: 20 }}>
        <Image
          style={{ resizeMode: "cover" }}
          source={require("../../assets/logo.png")}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {categoriesDrop}
        {brandDrop}
        {colorsDrop}
        {attributesDrop}
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
  const Header = () => {
    return (
      <>
        <Categories
          title={"Top Categories"}
          onCategoryPress={onCategoryPress}
          data={searchData?.search_attributes?.categories}
        />
        {loading && searchData?.search_attributes?.categories?.length == 0 && (
          <CategorySkeleton />
        )}
        {/* <CollectionSkeleton/> */}
        <Filters navigation={navigation} onFilterClick={openDrawer} />
      </>
    );
  };

  const renderItem = ({ item }) => (
    <SingleProduct
      id={item?.id}
      from={"product"}
      navigation={navigation}
      name={item?.name}
      src={item.thumbnail_image}
      // toggleBottomNavigationView={onBottomSheetOpen}
      visible={visible}
      price={item?.price?.main_price}
      rate={item?.rating?.rating}
      sales={item?.sales}
      item={item}
    />
  );

  // console.log(filterData)
  const renderFooter = () => {
    if (!loading)
      return (
        <View style={{ height: scale(200), marginTop: 20 }}>
          {currentPage > lastPage && (
            <Text style={{ textAlign: "center", color: "red" }}>
              No more data
            </Text>
          )}
        </View>
      );

    return (
      <View
        style={{
          paddingBottom: 200,
        }}
      >
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
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={() => navigationView}
    >
      <Mainlayout navigation={navigation}>
        {/* <ScrollView showsVerticalScrollIndicator={false}>
          
          <View preset={["mt_10 d_flex row wrap jc_between"]}></View>

          <View style={{ height: scale(270) }}></View>
        </ScrollView> */}
        <FlatList
          ListHeaderComponent={Header}
          refreshControl={
            <RefreshControl
              colors={["red"]}
              tintColor="red"
              title="Refreshing..."
              titleColor="red"
              refreshing={refreshing}
              // onRefresh={onRefresh}
            />
          }
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={searchProducts}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={fetchData}
          onEndReachedThreshold={0.6}
        />
      </Mainlayout>
    </DrawerLayoutAndroid>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#E0F7FA",
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
  productType: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  resetContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxes: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  checkBox: {
    marginRight: 10,
    marginBottom: 10,
    flexDirection: "row",
  },
  viewMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 6,
  },
  smallText: {
    fontSize: 12,
    marginLeft: 20,
  },
  icon: {
    width: 12,
    height: 6,
  },
});
