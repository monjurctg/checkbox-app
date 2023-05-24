import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InputLayout from "../components/layout/InputLayout";
import useDebounce from "../hooks/useDebounce";
import productServices from "../services/productServices";
import SearchShadowBox from "../components/search/SearchShadowBox";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const [searchText, setSearchText] = useState("");

  const handleClearSearch = () => {
    setSearchText("");
  };
  const navigation = useNavigation()

  const [clearer, setClearer] = React.useState(false);
  const [searchModal, setsearchModal] = useState(false);
  const [searchResult, setsearchResult] = useState([]);
  const [modalCat, setmodalCat] = useState(false);
  const [notItem, setNoItem] = useState("");
  // console.log('searchModal', searchModal)
  // const { md } = useBreakpoint();
  // console.log("md", md);
  const activeClearer = () => {
    setClearer(true);
  };

  // const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchText, 500);
  let searchApi = async (data) => {
    let res = await productServices.searchProducts(data);
    if (res?.status === 200) {
      if (
        res?.data?.data?.keywords?.length == 0 &&
        res?.data?.data?.categories?.length == 0
      ) {
        setsearchResult([]);
        setNoItem("No item found");
      } else {
        setsearchResult(res?.data?.data);
        setNoItem("");
      }
      // setsearchModal(true);
      // setsearchResult([]);
    } else {
      setNoItem("");

      setsearchModal(false);
      setsearchResult([]);
    }
    // console.log('res', res)
  };
  // console.log("searchResult", searchResult);
  useEffect(() => {
    searchApi(debouncedSearchTerm);
  }, [debouncedSearchTerm]);


  return (
    <InputLayout>
      <View style={styles.container}>
        <Ionicons name="search" size={24} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      {notItem && <Text>{notItem}</Text>}

      <ScrollView
        style={{ marginTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {searchResult?.keywords?.length > 0 && (
          <View style={styles.box}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Related search</Text>
            </View>
            <View style={styles.content}>
              {searchResult?.keywords?.map((item, i) => (
                <TouchableOpacity key={i} onPress={() => setSearchText(item)}>
                  <Text
                    style={{ fontSize: 14, fontWeight: 500, textAlign: "left" }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {/* categories */}
        {searchResult?.categories?.length > 0 && (
          <SearchShadowBox
            headerText={"Populer Category"}
            data={searchResult?.categories}
            onPress={()=>alert("hello")}
          />
        )}
        {/* pr */}
        {searchResult?.products?.length > 0 && (
          <SearchShadowBox
            headerText={"Products"}
            data={searchResult?.products}
            onPress={(item)=>navigation.navigate("product-details",{productId:item?.id})}

          />
        )}
        <View style={{ height: 200 }}></View>
      </ScrollView>
    </InputLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#999",
    // borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    color: "#000",
    height: 40,
  },
  box: {
    backgroundColor: "#ffffff",
    // elevation: 5,
    marginTop: 10,
    borderRadius: 4,
  },
  header: {
    backgroundColor: "gray",
    padding: 10,
    borderTopLeftRadius: 4,
  },
  headerText: { textAlign: "right", color: "#fff" },
  content: {
    paddingVertical: 10,
    rowGap: 8,
  },
});

export default Search;
