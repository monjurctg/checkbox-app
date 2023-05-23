import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SingleProductSkeleton = () => {
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
    <View style={styles.container}>
      <Animated.View style={[styles.shimmerImage, { transform: [{ translateX }] }]} />
      <View style={styles.detailsContainer}>
        <Animated.View
          style={[styles.shimmerText, { opacity: shimmerAnimatedValue }]}
        />
        <Animated.View
          style={[styles.shimmerText, { opacity: shimmerAnimatedValue, width: '60%' }]}
        />
        <Animated.View style={{
           width: "100%",
           alignSelf:"center",
          //  position:"absolute",
          opacity:shimmerAnimatedValue,
       
           height: (45),
          //  bottom:0,
          marginTop:60,
       
           borderRadius: 5,
    backgroundColor: '#E0E0E0',

          //  borderColor: colors.primary_2,
        }}>

        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginRight: 5,
    width: "48%",
    height: 310,
    backgroundColor: '#FFFFFF',
    borderColor: '#F2E9E9',
    borderRadius: 5,
  },
  shimmerImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  detailsContainer: {
    padding: 5,
  },
  shimmerText: {
    width: '100%',
    height: 18,
    marginTop: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
});

export default SingleProductSkeleton;
