import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import Text from "../tags/Text";
import { scale } from "../../../utils/funtions";

const CollectionSkeleton = ({}) => {
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
    <View style={{borderWidth:1,marginTop:30, borderColor: "#E5E5E5",}}>
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
          }}
        >
          <Animated.View
            style={[
              styles.shimmerText,
              { opacity: shimmerAnimatedValue, width: "40%" },
            ]}
          />

          <Animated.View
            style={[
              styles.shimmerText,
              { opacity: shimmerAnimatedValue, width: "40%" },
            ]}
          />
        </View>
      </View>

      <View style={{ flexDirection: "row", columnGap: 7, flexWrap: "wrap" }}>
        {[1, 2, 3].map((sk, index) => (
          <View key={index} style={styles.container}>
            <View style={styles.detailsContainer}>
              <Animated.View
                style={{
                  width: "100%",
                  //  alignSelf:"center",
                  //  position:"absolute",
                  opacity: shimmerAnimatedValue,

                  height: 90,
                  //  bottom:0,
                  // marginTop:60,

                  borderRadius: 5,
                  backgroundColor: "#E0E0E0",

                  //  borderColor: colors.primary_2,
                }}
              ></Animated.View>

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
    marginTop: 20,
    marginRight: 5,
    width: "30%",
    height: 140,
    backgroundColor: '#FFFFFF',
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

export default CollectionSkeleton;
