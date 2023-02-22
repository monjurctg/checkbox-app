import {StyleSheet, View as RnView} from "react-native";
import React from "react";
import {pressetData} from "../../../utils/funtions";

const View = ({preset = [], children, style}) => {
  const Style = StyleSheet.compose(pressetData(preset), style);
  return <RnView style={Style}>{children}</RnView>;
};

export default View;

const styles = StyleSheet.create({});
