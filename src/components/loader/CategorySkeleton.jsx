import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

const CategorySkeleton = ({}) => {
  const shimmerAnimatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(shimmerAnimatedValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  };

  const translateX = shimmerAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0.8],
  });

  return (
    <View style={{ flexDirection: "row", columnGap: 7, flexWrap: "wrap" }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((sk, index) => (
        <View key={index} style={styles.container}>
          <View style={styles.detailsContainer}>
            <Animated.View
              style={{
                width: "100%",
                //  alignSelf:"center",
                //  position:"absolute",
                opacity: shimmerAnimatedValue,

                height: 60,
                borderRadius: 5,
                backgroundColor: "#E0E0E0",
              }}
            ></Animated.View>

            <Animated.View
              style={[styles.shimmerText, { opacity: shimmerAnimatedValue }]}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginRight: 5,
    width: "22%",
    height: 100,
    backgroundColor: "#FFFFFF",
    borderColor: "#F2E9E9",
    borderRadius: 5,
  },
  shimmerImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
  },
  detailsContainer: {
    padding: 5,
  },
  shimmerText: {
    width: "100%",
    height: 18,
    marginTop: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    alignSelf: "center",
  },
});

export default CategorySkeleton;
