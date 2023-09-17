import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WebView from "react-native-webview";

const WebViewUrl = ({ navigation, route }) => {
  const { url } = route.params;
  console.log(url);
  const _onNavigationStateChange = (webViewState) => {
    const geturl = webViewState.url;
    // console.log(geturl, "geturl");
    const getsplit = geturl.split("&");
    console.log(getsplit, "geturl");

    // getsplit.map((item,index)=>{
    //     const itemsplit = item.split("=");
    //     //console.log(itemsplit[1]);
    //     if(itemsplit[0]=='status'){
    //         setPaymentStatus(itemsplit[1]);
    //     }
    // })
  };
  return (
    <WebView
      source={{ uri: url }}
      onNavigationStateChange={_onNavigationStateChange.bind(this)}
      style={{ flex: 1 }}
    />
  );
};

export default WebViewUrl;

const styles = StyleSheet.create({});
