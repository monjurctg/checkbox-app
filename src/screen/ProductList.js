import {ScrollView, StyleSheet} from "react-native";
import React from "react";
import Mainlayout from "../components/layout/Mainlayout";
import Filters from "../components/products/Filters";
import SingleProduct from "../components/products/SingleProduct";
import View from "../components/tags/View";
import {scale} from "../../utils/funtions";
import img1 from "../../assets/img/redShoe.png";
import img2 from "../../assets/img/camera.png";
import img3 from "../../assets/img/headphone.png";
import img4 from "../../assets/img/sunglass.png";
import img5 from "../../assets/img/watch.png";

import img6 from "../../assets/img/shoe1.png";

const ProductList = ({navigation}) => {
  return (
    <Mainlayout navigation={navigation}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Filters navigation={navigation} />
        <View preset={["mt_10 d_flex row wrap jc_between"]}>
          <SingleProduct navigation={navigation} src={img1} />
          <SingleProduct navigation={navigation} src={img2} />
          <SingleProduct navigation={navigation} src={img3} />
          <SingleProduct navigation={navigation} src={img4} />
          <SingleProduct navigation={navigation} src={img5} />
          <SingleProduct navigation={navigation} src={img6} />
        </View>
        <View style={{height: scale(270)}}></View>
      </ScrollView>
    </Mainlayout>
  );
};

export default ProductList;

const styles = StyleSheet.create({});
