import React, {useState} from "react";
import {StyleSheet, TouchableWithoutFeedback} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {scale} from "../../utils/funtions";
import View from "./tags/View";
import Text from "./tags/Text";

const Rating = ({maxStars, from, defaultStars,sales,onRate}) => {
  const [stars, setStars] = useState(defaultStars);
// console.log(stars)

  const handleStarPress = (rating) => {
    // setStars(rating);
    // onRate(rating);
  };

  return (
    <View preset={["row"]}>
      <View style={styles.container}>
        {[...Array(maxStars)].map((_, index) => (
          <View
          style={{}}
            key={index}
            // onPress={() => handleStarPress(index + 1)}
            >
            <Ionicons
              name={index < defaultStars ? "star" : "star-outline"}
              size={scale(12)}
              color="#E77C40"
            />
          </View>
        ))}
        {from === "product" && <Text preset={["ml_5"]}>({sales})</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // marginTop: scale(5),
    gap:2
  },
});

export default Rating;
