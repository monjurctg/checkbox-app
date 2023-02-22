import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import product from "../../assets/icons/product.png";
import cart from "../../assets/icons/cart.png";
import home from "../../assets/icons/blackHome.png";

import prod from "../../assets/icons/blackProduct.png";
import left from "../../assets/icons/arrow-left-o.png";
import right from "../../assets/icons/arrow-right-o.png";

import React, {useRef, useState} from "react";
import {scale, width} from "../../utils/funtions";
import Text from "./tags/Text";

const Slider = ({rightClic, leftClick}) => {
  const [currnetIndex, setCurrentIndex] = useState(0);
  const ref = useRef();
  console.log(currnetIndex, "currnetIndex");

  const data = [
    {
      src: product,
      title: "my Products",
    },
    {
      src: product,
      title: "Customers",
    },
    {
      src: home,
      title: "Home helo",
    },
    {
      src: prod,
      title: "Prod world",
    },
    {
      src: product,
      title: "My Products",
    },
    {
      src: product,
      title: "Customers",
    },
    {
      src: home,
      title: "Home helo",
    },
    {
      src: product,
      title: "My Products",
    },
    {
      src: product,
      title: "Customers",
    },
    {
      src: home,
      title: "Home helo",
    },
    {
      src: prod,
      title: "Prod world",
    },
    {
      src: product,
      title: "My Products",
    },
    {
      src: product,
      title: "Customers",
    },
    {
      src: home,
      title: "Home helo",
    },
  ];
  //   console.log(ref, "ref");
  const rightArrowClick = () => {
    if (parseInt(currnetIndex) > data.length - 3) {
      setCurrentIndex(data.length);
      ref.current.scrollToIndex({
        animated: true,
        index: data?.length,
      });
      return;
    }
    setCurrentIndex(parseInt(currnetIndex) + 3);
    ref.current.scrollToIndex({
      animated: true,
      index: parseInt(currnetIndex) + 3,
    });
  };
  const leftArrowClick = () => {
    console.log("left");
    if (parseInt(currnetIndex) <= 3) {
      setCurrentIndex(0);
      ref.current.scrollToIndex({
        animated: true,
        index: 0,
      });
      return;
    }
    setCurrentIndex(parseInt(currnetIndex) - 3);
    ref.current.scrollToIndex({
      animated: true,
      index: parseInt(currnetIndex) - 3,
    });
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: scale(20),
          borderWidth: 1,
          borderColor: "#CEE3EA",
          height: scale(40),
          alignItems: "center",
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 5,
        }}>
        <Text preset={["p1"]} style={{fontWeight: "bold"}}>
          Our service
        </Text>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={leftArrowClick}>
            <Image
              source={require("../../assets/icons/arrow-left-o.png")}
              style={{marginRight: scale(40)}}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={rightArrowClick}>
            <Image
              source={require("../../assets/icons/arrow-right-o.png")}
              //   style={{marginRight: scale(10)}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        ref={ref}
        onScroll={(e) => {
          const x = e.nativeEvent.contentOffset.x / (width / 3);
          setCurrentIndex(parseFloat(x).toFixed(0));
        }}
        renderItem={({item, index}) => {
          //   console.log(item?.src, "item");
          return (
            <Animated.View
              key={index}
              style={{
                width: width / 4 + 10,
              }}>
              <TouchableOpacity
                style={{justifyContent: "center", alignItems: "center"}}>
                <Image source={item?.src} />
                <Text preset={["p3"]} style={{marginTop: scale(10)}}>
                  {item?.title} {index}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
        style={{
          // flexDirection: "row",

          marginTop: scale(15),
        }}
      />
    </>
  );
};

export default Slider;

const styles = StyleSheet.create({});
