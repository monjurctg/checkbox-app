import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WebView from "react-native-webview";

const WebViewUrl = ({ navigation, route }) => {
  const { url } = route.params;
  console.log(url);
  return (
    <View>
      {/* <Text>WebViewUrl</Text> */}
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </View>
  );
};

export default WebViewUrl;

const styles = StyleSheet.create({});
