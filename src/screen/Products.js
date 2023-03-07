import {ScrollView, View} from "react-native";
import React from "react";
import Mainlayout from "../components/layout/Mainlayout";

import Cards from "../components/products/Cards";
import {scale} from "../../utils/funtions";

const Products = () => {
  return (
    <Mainlayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Cards name={"New Products"} />
        <Cards name={"Top Rated"} />
        <Cards name={"Most Reviewed"} />
        <View style={{height: scale(280)}}></View>
      </ScrollView>
    </Mainlayout>
  );
};

export default Products;
