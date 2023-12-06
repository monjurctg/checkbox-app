import { StyleSheet, Text, View, ScrollView, Image, DrawerLayoutAndroid, TouchableOpacity, FlatList, BackHandler } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import productServices from '../../services/productServices';
import Mainlayout from '../../components/layout/Mainlayout';
import { SafeAreaView } from "react-native-safe-area-context";
import Dropdown from '../../components/Input/Dropdown';
import AttributeDropdown from '../../components/Input/AttributeDropdown';
import RenderHtml from 'react-native-render-html';
import * as Clipboard from 'expo-clipboard';

// import {  } from 'react-native';
import SingleProduct from '../../components/products/SingleProduct';
import Categories from '../../components/products/Categories';
import CategorySkeleton from '../../components/loader/CategorySkeleton';
import SingleProductSkeleton from '../../components/loader/SingleProductSkeleton';
import Filters from '../../components/products/Filters';
import { filterCategories, scale } from '../../../utils/funtions';
import { ActivityIndicator } from 'react-native';
import { setTabShow } from '../../redux/reducers/utilsSlice';
import { useDispatch } from 'react-redux';
import { AntDesign, Feather } from '@expo/vector-icons';
import axios from 'axios';
import api from '../../services/api';

let scroll = 0
let clickCount = 0;

const FilterIndex = ({ route, navigation }) => {
    const drawerRef = useRef(null);
    const { data, from, nFrom } = route.params ?? {};
    const [collectionData, setCollectionData] = useState("")
    const[total,setTotal]=useState()
    // console.log(from)
    const [showText, setShowText] = useState(false)

    const initialState = {
        category_slug: null,
        collection_slug: null,
        keyword: null,
        priceRange: null,
        sortBy: null,
        brand_ids: [],
        color_codes: [],
        selected_attribute_values: {},
        searchAttributes: null,
        products: null,
        productsFilterLimit: null,
        // searchResult: null
    };
    // state
    const [searchAttributes, setSearchAttributes] = useState([])
    const [loading, setLoading] = useState(false)
    const [loaidngMore, setLoadingMore] = useState(false)
    const [loadingAttribute, setLoadingAttribute] = useState(false)
    const [searchProducts, setSearchProducts] = useState([]);
    const [page, setPage] = useState(1)
    const [toalProduct, setTotalProductsCount] = useState()
    const [colorCode, setColorCode] = useState([])
    const [attributeValues, setAttributeValues] = useState({})
    const [brandIds, setBrandIds] = useState([])
    const [categorySlug, setCategorySlug] = useState(data?.category_slug)
    const dispatch = useDispatch()

    const openDrawer = () => {
        drawerRef.current.openDrawer();
    };
    const closeDrawer = () => {
        drawerRef.current.closeDrawer();
    };

    let getCollectionDetail = async () => {
        let url = `/collection/details/${data?.collection_slug}?type=facebook_post`;
        let res = await api.get(url);
        setCollectionData(res.data.data)

    };

    let getFilterData = async () => {
        let params = {
            category_slug: categorySlug,
            collection_slug: data?.collection_slug,
            keyword: data?.keyword,
        };
        setLoadingAttribute(true)
        let res = await productServices.getSearchedAttributes(params);
        // console.log("resData", res.data);
        if (res?.status === 200) {
            setSearchAttributes(res.data.data)
            setLoading(false)
        }
        else {
            setLoadingAttribute(false)
        }
    };

    const handleCategoryChange = (slug) => {
        setCategorySlug(slug)
    };


    const handleAttrChange = (id, value) => {
        const updatedState = { ...attributeValues };
        if (!updatedState.hasOwnProperty(id)) {
            updatedState[id] = [value]; // Create a new property with the id and assign an array with the value
        } else {
            const valueArray = updatedState[id];

            if (valueArray.includes(value)) {
                updatedState[id] = valueArray.filter((item) => item !== value);
                if (valueArray.length == 1) {
                    delete updatedState[`${id}`];
                }
            } else {
                updatedState[id] = [...valueArray, value];
            }
        }
        setAttributeValues(updatedState)
    };

    const handleColorChange = (color, isReset) => {
        setPage(1)
        if (colorCode.includes(color.code)) {
            const resdata = colorCode.filter((c) => c !== color.code)

            setColorCode(resdata)
        }
        else {

            setColorCode([...colorCode, color.code])

        }
    }

    const fetchCopiedText = async (text2) => {
        await Clipboard.setStringAsync(text2);
        alert("Copied")

    };
    const handleBrandChange = (brand) => {
        setPage(1)

        if (brandIds.includes(brand.id)) {
            //  console.log(brand.code,"from if")
            const resdata = colorCode.filter((b) => c !== color.id)
            //  console.log(resdata)
            setBrandIds(resdata)
        }
        else {
            //  console.log(setBrandIds.code,"from else")
            setBrandIds([...brandIds, brand.id])
            // console.log(resdata)
        }
    }
    const getSearchProducts = async () => {
        let paramms = {
            category_slug: categorySlug,
            collection_slug: data?.collection_slug,
            keyword: data?.keyword,
            brand_ids: brandIds,
            color_codes: colorCode,
            selected_attribute_values: attributeValues,
            page: 1,
        };
        setLoading(true)
        const response = await productServices.getSearchedProduct(paramms);
        // console.log("response", response.data.data.total);
        if (response?.status === 200) {
            setSearchProducts([...response.data.data.data])
            // setPage(page + 1);
            setTotal(response.data.data.total)
            setTotalProductsCount(response.data.data?.total);
            setLoading(false)

            // console.log(response.data.data.data)
            //   setloading(false);
            //   setTotalProductsCount(response.data.data?.total);
            //   setlimit(response.data?.data?.last_page);
            //   console.log(
            //     "response.data?.data?.last_page > page",
            //     response.data?.data?.last_page > page
            //   );

            //   if (response.data?.data?.last_page > 1) {
            //     sethasMore(true);
            //   } else {
            //     sethasMore(false);
            //   }
            //   dispatch(setProducts(response.data.data?.data));
        }

        else {
            setLoading(false);
        }
    };

    const fetchData = async () => {

        if (!loaidngMore) {

            if (searchProducts.length >= 8) {


                let paramms = {
                    category_slug: data?.category_slug,
                    collection_slug: data?.collection_slug,
                    keyword: data?.keyword,
                    brand_ids: brandIds,
                    color_codes: colorCode,
                    page: page + 1,
                };
                setLoadingMore(true)
                const response = await productServices.getSearchedProduct(paramms);
                if (response?.status === 200) {

                    setPage(page + 1);
                    setLoadingMore(false)

                    setSearchProducts([...searchProducts, ...response.data.data.data])
                    // setTotalProductsCount(response.data.data?.total);
                }
                else {
                    setLoadingMore(false)

                }
            }

        }


    }

    const handelReset = (TYPE) => {
        // console.log(TYPE)
        if (TYPE == "colors") {
            setColorCode([])
        }
        else if (TYPE == "brand") {
            setColorCode([])

        }

    }


    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            // fetchSingCart();
            dispatch(setTabShow(true))
            getCollectionDetail()


        });
        return unsubscribe;
    }, [navigation]);


    useEffect(() => {

        const unsubscribe = navigation.addListener("beforeRemove", (e) => {
            if (filterCategories.length > 0
            ) {

                e.preventDefault();
                if (clickCount === 0 && filterCategories.length > 1) {
                    // On the first click, pop two elements
                    filterCategories.pop()
                    const a = filterCategories.pop()
                    // console.log(a)
                    setCategorySlug(a)

                } else {
                    const a = filterCategories.pop()

                    setCategorySlug(a)
                    // console.log(a)

                }

                clickCount++;

                //
            }
            else {
                // filterCategories.pop()
                clickCount = 0


            }


        });

        return unsubscribe;
    }, []);


    useEffect(() => {
        getFilterData()


    }, [categorySlug])
    useEffect(() => {
        getSearchProducts()
    }, [colorCode, brandIds, categorySlug, attributeValues])


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


    const categoriesDrop = (
        <View>
            {searchAttributes?.categories?.length > 0 && (
                <Dropdown
                    title={"Categories"}
                    handelReset={handelReset}
                    checkBoxHandle={handleCategoryChange}
                    options={searchAttributes?.categories}
                    filterData={categorySlug}
                    from={"category"}
                    // handleChange={handleValueChange}

                    state={"category_ids"}
                />
            )}
        </View>
    );

    const brandDrop = (
        <View>
            {searchAttributes?.brands?.length > 0 && (
                <Dropdown
                    checkBoxHandle={handleBrandChange}
                    title={"Brands"}
                    from={"brand"}
                    handelReset={handelReset}
                    filterData={brandIds}
                    options={searchAttributes?.brands}

                />
            )}
        </View>
    );

    const colorsDrop = (
        <View>
            {searchAttributes?.colors?.length > 0 && (
                <Dropdown filterData={colorCode} checkBoxHandle={handleColorChange} handelReset={handelReset} from={"colors"} title={"Colors"} options={searchAttributes?.colors} />
            )}
        </View>
    );

    const attributesDrop = (
        <View>
            {searchAttributes.attributes?.length > 0 &&
                searchAttributes?.attributes.map((item, index) => (
                    <AttributeDropdown
                        key={index}
                        title={item?.name}
                        filterData={attributeValues}
                        options={item?.attribute_values}
                        handelChage={handleAttrChange}
                        handelReset={(id) => {
                            const updatedState = { ...attributeValues };
                            // if (Object.keys(updatedState).includes(id.toString())) {
                            //   updatedState[id] = [];
                            // //   dispatch(set_selected_attribute_values(updatedState));
                            // console.log(updatedState,attributeValues)
                            // }
                            // console.log(updatedState)
                            delete updatedState[`${id}`];
                            setAttributeValues(updatedState)

                        }}

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
                    source={require("../../../assets/logo.png")}
                />
            </View>
            <TouchableOpacity onPress={() => {
                setAttributeValues([])
                setBrandIds([])
                setColorCode([])
                setCategorySlug("")
            }} style={{ alignSelf: "flex-end", padding: 10, borderWidth: 1, marginRight: 10, bottom: 10, borderRadius: 10 }}>
                <Text style={{ fontFamily: "RR" }}>Reset all Filters</Text>
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
                {categoriesDrop}
                {brandDrop}
                {colorsDrop}
                {attributesDrop}
                <View style={{ height: 100 }}></View>
            </ScrollView>
        </SafeAreaView>
    );

    const renderItem = ({ item }) => (
        <SingleProduct
            id={item?.id}
            from={"product"}
            navigation={navigation}
            name={item?.name}
            src={item.thumbnail_image}
            // toggleBottomNavigationView={onBottomSheetOpen}
            //   visible={visible}
            price={item?.price?.main_price}
            rate={item?.rating?.rating}
            sales={item?.sales}
            item={item}
        />
    );


    const onCategoryPress = (slug) => {
        filterCategories.push(slug)
        setCategorySlug(slug)
    }
    const Header = () => {
        return (
            <>
                {
                    nFrom == "collection" ? <View style={{ flexDirection: "row", justifyContent: 'space-around', alignItems: 'center', height: 80, borderRadius: 4, borderWidth: 1, borderColor: "#DDD", marginTop: 20 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text
                                numberOfLines={1}
                                style={{

                                    fontStyle: "normal",
                                    fontWeight: "500",
                                    fontSize: 18,
                                    lineHeight: 22,
                                    color: "#000000",
                                    width: 100,
                                    marginVertical: 15, fontFamily: "RB"
                                }}
                            >
                                {from}
                            </Text>
                            <Text>({total})</Text>
                        </View>
                        <TouchableOpacity onPress={() => setShowText(!showText)}>
                            <AntDesign name="downcircleo" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AntDesign name="download" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name="facebook" size={24} color="black" />
                        </TouchableOpacity>
                    </View> : <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text
                            numberOfLines={1}
                            style={{

                                fontStyle: "normal",
                                fontWeight: "500",
                                fontSize: 18,
                                lineHeight: 22,
                                color: "#000000",


                                marginVertical: 15, fontFamily: "RB"
                            }}
                        >
                            {from}
                        </Text>
                        <Text>({total})</Text>
                    </View>
                }
                {
                    showText && <View style={{ minHeight: 200, width: "98%", alignSelf: 'center', borderWidth: 1, borderColor: "#DDD", marginTop: 10 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                            <Text>{from}</Text>
                            <TouchableOpacity onPress={() => fetchCopiedText(collectionData?.plain_description)}>
                                <Feather name="copy" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <RenderHtml contentWidth={350} source={{ html: collectionData?.description }} />


                        </View>
                    </View>
                }

                {loading ?
                    <CategorySkeleton /> : <Categories
                        TYPE={"scroll"}
                        // title={"Product Categories"}
                        onCategoryPress={onCategoryPress}
                        data={searchAttributes?.categories?.slice(1)}
                    />
                }

                <Filters navigation={navigation} onFilterClick={openDrawer} />
            </>
        );
    };
    const ListFooterComponent = () => {

        return (
            <View >
                <ScrollView>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", }}>
                        <View style={{
                            width: scale(35),
                            height: scale(35),
                            marginTop: 20,
                            borderRadius: 25,
                            backgroundColor: "#ab0f29",
                            justifyContent: "center",
                            alignItems: "center",
                            // position: "absolute",
                        }}>
                            <ActivityIndicator size="small" color="#fff" />
                        </View>
                    </View>
                    <Text style={{ color: "#ab0f29", textAlign: "center", fontSize: 12 }}>Loading...</Text>
                    <View style={{ height: 200 }}></View>
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
            <Mainlayout>
                {/* <Text>{toalProduct}</Text> */}


                <FlatList
                    ListHeaderComponent={Header}
                    onScroll={onScroll}


                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    data={searchProducts}
                    renderItem={renderItem}
                    //    ListFooterComponent={renderFooter}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReached={fetchData}
                    onEndReachedThreshold={0.5}
                    // ListFooterComponent={renderFooter}
                    ListFooterComponent={() => loaidngMore && <ListFooterComponent />}

                />

            </Mainlayout>
        </DrawerLayoutAndroid>
    )
}

export default FilterIndex

const styles = StyleSheet.create({})