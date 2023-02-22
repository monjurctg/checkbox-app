import {ScrollView, View} from "react-native";
import React from "react";
import Mainlayout from "../components/layout/Mainlayout";

import Cards from "../components/products/Cards";

const Products = () => {
  return (
    <Mainlayout>
      <ScrollView style={{}}>
        <Cards name={"New Products"} />
        <Cards name={"Top Rated"} />
        <Cards name={"Most Reviewed"} />
      </ScrollView>
    </Mainlayout>
  );
};

export default Products;
