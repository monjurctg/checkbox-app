import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {pressetData} from "../../../utils/funtions";

const CustomTouchBtn = ({
  children,
  preset = [],
  style,
  onPress,
  onLongPress,
  onPressOut,
}) => {
  const Style = StyleSheet.compose(pressetData(preset), style);
  return (
    <TouchableOpacity
      style={Style}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default CustomTouchBtn;

// const styles = StyleSheet.create({});
