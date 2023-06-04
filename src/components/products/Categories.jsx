import { Image, StyleSheet,Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale } from "../../../utils/funtions";
// import Text from "../tags/Text";


const Categories = ({ data, title, onCategoryPress }) => {
  console.log(data)
  return (
    <View>
      <Text
        style={{
          // fontFamily: "Gotham",
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: 18,
          lineHeight: 22,
          color: "#000000",
          marginVertical:15
        }}
      >
    {title}
      </Text>
      <View style={styles.products}>
        {data?.map((cate, index) => (
          <TouchableOpacity
          onPress={()=>onCategoryPress(cate?.slug)}
            key={index}
            style={{
              alignItems: "center",
              width: "23%",
              backgroundColor:"#FFFFFF",
              borderRadius:5,
              padding:2
              // marginRight: scale(12),
            }}
          >
            <Image
              source={{uri:cate?.icon_path}}
              style={{
                width: "90%",
                height: scale(80),
                resizeMode: "contain",
              }}
            />
            <Text numberOfLines={2}style={{fontSize:11,textAlign:"center",padding:2}}>{cate?.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  products: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    columnGap:7,
    rowGap:7
  
    // justifyContent: "space-between",
  },
});
