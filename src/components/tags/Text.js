import {StyleSheet, Text as RnText, View} from "react-native";
import React from "react";
import {presset} from "./text.preset";
import {pressetData} from "../../../utils/funtions";

export default function Text({children, preset = ["default"], style,numberOfLines,ellipsizeMode}) {
  const textStyle = StyleSheet.compose(pressetData(preset), style);
  return <RnText numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode} style={textStyle}>{children}</RnText>;
}

const styles = StyleSheet.create({});
