import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BottomSheetCart = () => {
  return (
    <View style={styles.bottomNavigationView} preset={["p_10"]}>
    <View
      preset={["row jc_between p_10 mt_5 "]}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#DDDDDD",
        paddingBottom: scale(5),
      }}>
      <Text preset={[" fs_16"]}>Product Details</Text>
      <CustomTouchBtn onPress={() => toggleBottomNavigationView()}>
        <AntDesign name="closecircleo" size={scale(20)} color="black" />
      </CustomTouchBtn>
    </View>
    <View preset={["mt_10 "]}>
      <SingleCart src={img1} />
    </View>
    <View preset={["mt_10 center row"]}>
      <Text>Customer Rate</Text>
      <TextInput
        keyboardType="number-pad"
        style={{
          borderColor: "#E6E7E8",
          borderWidth: 1,
          marginLeft: scale(5),
          width: scale(210),
          height: scale(40),
          paddingLeft: scale(20),
          backgroundColor: "#FFFFFF",
        }}
      />
    </View>
    <View preset={["row mt_15 p_5 jc_between"]}>
      <Text preset={["bold fs_16"]}>Total</Text>
      <Text preset={["bold fs_16"]}>৳ 1220</Text>
    </View>
    <View preset={["row  mt_15"]}>
      <CustomTouchBtn
        preset={["center"]}
        style={{
          width: scale(128),
          backgroundColor: colors.primary_2,
          padding: scale(8),
          borderRadius: 4,
          // alignSelf: "center",
        }}>
        <Text preset={["fs_14 fw_500"]} style={{color: "white"}}>
          Add to Cart
        </Text>
      </CustomTouchBtn>
      <CustomTouchBtn
        onPress={() => navigation.navigate("checkout")}
        preset={["center fs_16 bold"]}
        style={{
          width: scale(194),
          borderWidth: 1,
          borderColor: colors.primary_2,
          // backgroundColor: colors.primary_2,
          padding: scale(8),
          borderRadius: 4,
          marginLeft: scale(5),
          // alignSelf: "center",
        }}>
        <Text preset={["fs_14 fw_500"]} style={{color: colors.primary_2}}>
          Checkout
        </Text>
      </CustomTouchBtn>
    </View>
  </View>
  )
}

export default BottomSheetCart

const styles = StyleSheet.create({})