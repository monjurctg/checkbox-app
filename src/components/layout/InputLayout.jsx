import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
const {width,height}=Dimensions.get("screen")

const InputLayout = ({children}) => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#FFFFFF"}}>
         <View style={styles.container}>
            <View>
                <Image source={require("../../../assets/logo.png")}/>
            </View>
      {children}
    </View>
    </SafeAreaView>
   
  )
}

export default InputLayout

const styles = StyleSheet.create({
    container:{
        display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    // justifyContent: 'center',
    // backgroundColor:"blue",
    
    // position: 'absolute',
    width: width,
    height:height,

    }
})