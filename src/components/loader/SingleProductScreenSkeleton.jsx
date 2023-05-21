import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import { scale } from "../../../utils/funtions";

const SingleProductScreenSkeleton = () => {
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
   
    Animated.loop(
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
  }, []);

  
    return (
      <Animated.View style={[styles.container,{opacity:fadeAnim}]}>
        <View style={styles.scrollView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          >
            {/* Placeholder components */}
            <View style={[styles.placeholderImage]} />
            <View style={[styles.placeholderRow,{height:100}]} />
            <View style={styles.placeholderText} />
            <View style={styles.placeholderText} />

            <View style={styles.placeholderText} />
            <View style={[styles.placeholderRow,{width:scale(280)}]} />
            <View style={[styles.placeholderRow,{width:scale(240)}]} />
            <View style={styles.placeholderText} />
            <View style={{flexDirection:"row",flexWrap:"wrap",columnGap:10,marginVertical:20}}>
            <View style={[styles.placeholderRow,{width:scale(70)}]} />
            <View style={[styles.placeholderRow,{width:scale(70)}]} />

            <View style={[styles.placeholderRow,{width:scale(70)}]} />

            <View style={[styles.placeholderRow,{width:scale(70)}]} />
            {/* <View style={[styles.placeholderRow,{width:scale(70)}]} /> */}

                
            </View>

            <View style={styles.placeholderText} />
            <View style={{flexDirection:"row",flexWrap:"wrap",columnGap:10,marginTop:20}}>
            <View style={[styles.placeholderRow,{width:scale(70)}]} />
            <View style={[styles.placeholderRow,{width:scale(70)}]} />

            <View style={[styles.placeholderRow,{width:scale(70)}]} />

            <View style={[styles.placeholderRow,{width:scale(70)}]} />
            {/* <View style={[styles.placeholderRow,{width:scale(50)}]} /> */}

                
            </View>




<View style={{height:200}}>

</View>

            {/* <View style={styles.placeholderText} /> */}

            {/* Add more placeholder components as needed */}
          </ScrollView>
        </View>
      </Animated.View>
    );
  

  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  scrollView: {
    flex: 2,
  },
  contentContainer: {
    padding: 20,
  },
  placeholderImage: {
    width: 350,
    height: 500,
    backgroundColor: "#E8E8E8",
    marginBottom: 10,
    borderRadius:10
  },
  placeholderRow: {
    width: "100%",
    height: 60,
    backgroundColor: "#E8E8E8",
    marginBottom: 10,
  },
  placeholderText: {
    width: "70%",
    height: 20,
    backgroundColor: "#E8E8E8",
    marginVertical: 10,
  },
});

export default SingleProductScreenSkeleton;
