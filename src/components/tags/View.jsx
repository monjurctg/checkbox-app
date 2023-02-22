import {StyleSheet, View as RnView} from "react-native";
import React from "react";

const View = ({preset, children, style}) => {
  return <RnView>{children}</RnView>;
};

export default View;

const styles = StyleSheet.create({});
