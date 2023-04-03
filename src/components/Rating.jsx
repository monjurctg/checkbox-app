import React, {useState} from "react";
import {StyleSheet, TouchableWithoutFeedback} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {scale} from "../../utils/funtions";
import View from "./tags/View";
import Text from "./tags/Text";

const Rating = ({maxStars, defaultStars, onRate}) => {
  const [stars, setStars] = useState(defaultStars);

  const handleStarPress = (rating) => {
    setStars(rating);
    onRate(rating);
  };

  return (
    <View preset={["row"]}>
      <View style={styles.container}>
        {[...Array(maxStars)].map((_, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => handleStarPress(index + 1)}>
            <Ionicons
              name={index < stars ? "star" : "star-outline"}
              size={scale(16)}
              color="#E77C40"
            />
          </TouchableWithoutFeedback>
        ))}
        <Text preset={["ml_10"]}>(34)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: scale(10),
  },
});

export default Rating;
