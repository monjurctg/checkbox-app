import { StyleSheet, Image, FlatList } from "react-native";
import React from "react";
import { scale } from "../../../utils/funtions";
import Text from "../tags/Text";
import CustomTouchBtn from "../tags/CustomTouchBtn";
import View from "../tags/View";
// import { ScrollView } from "react-native-web";

const CollectionItems = ({ navigation, name, products = [] ,from,slug}) => {
  // console.log(navigation, "navigation");
  console.log(products,"productssdsd",from)
  

  const renderItem = ({ item }) => {
    let data = []
    if(from=="allCollection"){
      data=item.data

    }else{
      data=JSON.parse(item?.data);
    }
    // console.log(data)

  //  console.log(data.thumbnail_image)
    
    return <CustomTouchBtn
    onPress={()=>{
      navigation.navigate("product-details",{productId:data?.id});
    }}
      // preset={["center"]}
      // key={index}
      style={{
        width: scale(128),
        height: scale(170),
        borderWidth:1,
        marginEnd:10,
        padding:0,
        // marginTop:10,
        paddingTop:5,
        borderRadius:7,
        // elevation:4,
        backgroundColor:"#FFF",
        borderColor:"#e6dada"
      }}
    >
      <Image
        source={{ uri: data?.thumbnail_image }}
        style={{
          height: scale(100),
          width: scale(118),
          resizeMode: "cover",
          // borderRadius: 7,
          alignSelf:"center",
          
          borderTopRightRadius:7,
          borderTopLeftRadius:7
        }}
      />
      <Text numberOfLines={2} ellipsizeMode="tail"   style={{ }} preset={["p3 p_5  lh_14 mt_5"]}>
        {data?.name}
      </Text>
      {data?.price?.main_price && (
            <Text
            preset={["p3   lh_14"]}
              color="#c4312e"
              style={{
                // fontFamily: "Lexend",
                fontSize: 13,
                fontWeight: "600",
                paddingLeft:7





              }}
              // className="p4"
            >
              {data?.price?.main_price}
            </Text>
          )}


    </CustomTouchBtn>
  }

  return (
    <View>
      {/* <View style={styles.newProducts}>
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
      </View> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: scale(20),
          // borderWidth: 1,
          // borderColor: "#eee5e5",
          height: scale(50),
          alignItems: "center",
          // paddingVertical: scale(8),
          paddingHorizontal: scale(8),
          borderRadius: 20,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          backgroundColor:"#FFF",
        }}>
        <Text preset={["p3 bold"]} style={{fontWeight: "bold"}}>
          {name}
        </Text>
        <CustomTouchBtn
          preset={["row center"]}
          style={{backgroundColor:"#c4312e",paddingHorizontal:8,paddingVertical:4,borderRadius:7}}
          onPress={() =>
            navigation.navigate("filter", {data: { collection_slug: slug.slug },})
          }
        >
          <Text style={{color:"#FFF"}} preset={["p3 mr_5"]}>View More</Text>
          {/* <Image source={require("../../../assets/icons/right-icon.png")} /> */}
        </CustomTouchBtn>
        
      
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={{
          backgroundColor:"#FFF",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          zIndex:999,
          padding:10,
          paddingVertical:20

        }}
      />

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
