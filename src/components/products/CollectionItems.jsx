import { StyleSheet, Image, FlatList } from "react-native";
import React from "react";
import { scale } from "../../../utils/funtions";
import Text from "../tags/Text";
import CustomTouchBtn from "../tags/CustomTouchBtn";
import View from "../tags/View";
// import { ScrollView } from "react-native-web";

const CollectionItems = ({ navigation, name, products = [] }) => {
  // console.log(navigation, "navigation");
  // console.log(products,"products")

  const renderItem = ({ item }) => {
    let data = JSON.parse(item?.data);
    // console.log(data)
   
    
    return <CustomTouchBtn
      // preset={["center"]}
      // key={index}
      style={{
        width: scale(108),
        // height: scale(180),
        borderWidth:1,
        marginEnd:10,
        padding:0,
        marginTop:10,
        borderRadius:7,
        elevation:4,
        backgroundColor:"#FFF",
        borderColor:"#DDD"
      }}
    >
      <Image
        source={{ uri: data?.thumbnail_image, cache: "only-if-cached" }}
        style={{
          height: scale(90),
          width: scale(106),
          resizeMode: "center",
          borderRadius: 7,
        }}
      />
      <Text numberOfLines={2} ellipsizeMode="tail"   style={{ }} preset={["p3 p_5  lh_14 mt_5"]}>
        {data?.name}
      </Text>
    </CustomTouchBtn>
  }

  return (
    <View>
      <View style={styles.newProducts}>
        <Text preset={["p3 bold"]}>{name}</Text>
        <CustomTouchBtn
          preset={["row center"]}
          onPress={() =>
            navigation.navigate("products-filter", {
              data: { collection_slug: slug },
            })
          }
        >
          <Text preset={["p3 mr_5"]}>Explore all</Text>
          <Image source={require("../../../assets/icons/right-icon.png")} />
        </CustomTouchBtn>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* <ScrollView style={styles.products} horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          collections.map((col,index)=>{
            return  <CustomTouchBtn
            preset={["center"]}
            key={index}
            style={{
              width: scale(108),
            }}>
            <Image source={{uri:col?.thumbnail_image}} style={{height:scale(90),width:scale(90)}} />
            <Text preset={["p3 lh_14 mt_5"]}>{col?.name}
            </Text>
          </CustomTouchBtn>

          })
        }
      
      </ScrollView> */}
    </View>
  );
};

export default CollectionItems;

const styles = StyleSheet.create({
  newProducts: {
    padding: scale(12),
    marginTop: scale(15),
    backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    // borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#E5E5E5",
  },

  products: {
    flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between",
    // marginTop: 12,
    columnGap: 10,
    padding: 12,
    // backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});
