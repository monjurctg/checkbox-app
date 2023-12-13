import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";
import FullScreenLoader from './loader/FullScreenLoader ';


const RedirectWeb = ({navigation,route}) => {
    const {url}=route.params
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("")
    const getToken = async () => {
      let token = await AsyncStorage.getItem("token")
      setToken(token)
      setLoading(false)
    }
    useEffect(() => {
      getToken()
    }, [])

    let url2 = "https://cb-next-reseller-omega.vercel.app/?token=" +token+"&dir=/"+url+"&from=app"
  return (
    <>

       <View style={{ flex: 1, }}>
      <WebView

      javaScriptEnabled={true}
      source={{ uri: url2 }}
    //   onNavigationStateChange={handleNavigationStateChange}
      onShouldStartLoadWithRequest={(event) => {
        console.log(event.url);
        return true;
      }}
      javaScriptCanOpenWindowsAutomatically={true}
      renderLoading={() => (
        <View style={{ position: 'absolute', top: '50%', left: '50%' }}>
          {/* You might want to customize or replace FullScreenLoader */}
          <FullScreenLoader visible={loading} />
        </View>
      )}
      startInLoadingState={true}
      style={{ flex: 1 }}
      // Set the custom WebView engine for Android
      //androidHardwareAccelerationDisabled={true} // Disable hardware acceleration to use Chrome
      //androidLayerType="software" // Use software rendering for better compatibility
    />

        {/* <WebView
          renderLoading={() => <View style={{ position: "absolute", top: "50%", left: "50%" }}><FullScreenLoader visible={loading} /></View>}
          startInLoadingState={true} source={{ uri: "https://checkbox-rosy.vercel.app/test_facebok/product-list/5182" }} style={{ flex: 1 }} /> */}
      </View>
    </>
  )
}

export default RedirectWeb

const styles = StyleSheet.create({})