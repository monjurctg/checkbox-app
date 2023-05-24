import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale } from "../../../utils/funtions";


const Categories = ({ categories, title, onCategoryPress }) => {
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
        {categories?.map((cate, index) => (
          <TouchableOpacity
          onPress={onCategoryPress}
            key={index}
            style={{
              alignItems: "center",
              width: "23%",
              backgroundColor:"#FFFFFF",
              borderRadius:5,
              padding:5
              // marginRight: scale(12),
            }}
          >
            <Image
              source={{uri:cate?.icon_path}}
              style={{
                width: "90%",
                height: scale(90),
                resizeMode: "contain",
              }}
            />
            <Text preset={["p3"]}>Camera</Text>
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
