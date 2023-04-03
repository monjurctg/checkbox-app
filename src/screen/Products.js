import {ScrollView, View} from "react-native";
import React, {useState} from "react";
import Mainlayout from "../components/layout/Mainlayout";

import Cards from "../components/products/Cards";
import {scale} from "../../utils/funtions";
import FullScreenLoader from "../components/loader/FullScreenLoader ";

const Products = ({navigation}) => {
  // console.log(navigation, "products navigatio");
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  if (loading) {
    return <FullScreenLoader visible={loading} />;
  }

  return (
    <Mainlayout navigation={navigation}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Cards name={"New Products"} navigation={navigation} />
        <Cards name={"Top Rated"} navigation={navigation} />
        <Cards name={"Most Reviewed"} navigation={navigation} />
        <View style={{height: scale(280)}}></View>
      </ScrollView>
    </Mainlayout>
  );
};

export default Products;
