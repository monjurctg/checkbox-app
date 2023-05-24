import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import Text from "../tags/Text";
import { scale } from "../../../utils/funtions";

const SearchSkeleton = ({}) => {
  const shimmerAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(shimmerAnimatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };

  const translateX = shimmerAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0.8],
  });

  return (
    <View style={{marginTop:30,}}>
      <View>
        <View
          style={{
            // marginTop: 40,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            padding: 10,
            // columnGap:10
          }}
        >
           
          <Animated.View
            style={[
              styles.shimmerText,
              { opacity: shimmerAnimatedValue },
            ]}
          />

        </View>
      </View>

      <View >
        {[1, 2, 3].map((sk, index) => (
          <View key={index} style={styles.container}>
            <View style={styles.detailsContainer}>
            <Animated.View
            style={[
              styles.shimmerText,
              { opacity: shimmerAnimatedValue ,width:30},
            ]}
          />
              <Animated.View
                style={[styles.shimmerText, { opacity: shimmerAnimatedValue }]}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 10,
    marginRight: 5,
    paddingVertical:10,
    width: "50%",
    // height: 140,
    backgroundColor: '#FFFFFF',
    borderColor: "#F2E9E9",
    borderRadius: 5,
  },
  
  detailsContainer: {
    paddingLeft: 10,
    flexDirection:"row",columnGap:10
  },
  shimmerText: {
    width: "100%",
    height: 30,
    marginTop: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    alignSelf: "center",
  },
});

export default SearchSkeleton;
