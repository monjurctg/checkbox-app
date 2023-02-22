import {StyleSheet, Text as RnText, View} from "react-native";
import React from "react";
import {presset} from "./text.preset";
import {pressetData} from "../../../utils/funtions";

export default function Text({children, preset = ["default"], style}) {
  const textStyle = StyleSheet.compose(pressetData(preset), style);
  return <RnText style={textStyle}>{children}</RnText>;
}

const styles = StyleSheet.create({});
