import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
const {width,height}=Dimensions.get("screen")
import { AntDesign } from '@expo/vector-icons';
const InputLayout = ({children}) => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
       <View style={{alignItems:"center",flexDirection:"row",justifyContent:"space-between",display:"flex"}}>
       {/* <AntDesign name="back" size={24} color="black" /> */}
                <Image source={require("../../../assets/logo.png")}/>
            </View>
         <View style={styles.container}>
           
  <View style={{display:"flex",justifyContent:"center",alignSelf:"center"}}>
  {children}
  </View>
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