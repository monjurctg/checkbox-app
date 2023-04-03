import React from "react";
import {View, ActivityIndicator, StyleSheet} from "react-native";
import {scale} from "../../../utils/funtions";

const FullScreenLoader = ({visible}) => {
  return (
    <View style={styles.container}>
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: scale(70),
    height: scale(70),
    borderRadius: 55,
    backgroundColor: "#ab0f29",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});

export default FullScreenLoader;
