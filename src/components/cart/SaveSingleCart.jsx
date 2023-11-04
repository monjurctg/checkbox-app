import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import View from "../tags/View";
import Text from "../tags/Text";
import {scale} from "../../../utils/funtions";
import CustomTouchBtn from "../tags/CustomTouchBtn";

import {FontAwesome,AntDesign} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SaveSingleCart = ({title,cart}) => {
  const navigation = useNavigation()
  // console.log(cart?.name,"djkfjdkjfkdjk")
  const dateTime= new Date(cart?.created_at).toISOString().split("T")
  // console.log(dateTime)
  const date = dateTime[0]
  const time=dateTime[1].split(".000Z")[0]
  return (
    <View
      preset={[" p_10 mt_5 "]}
      style={{
        borderWidth: 1,
        borderColor: "#DDDDDD",
        paddingBottom: scale(5),
        elevation:4,backgroundColor:"#FFF",borderRadius:10
      }}>
      <View preset={["row jc_between ac"]}>
        <Text preset={["RM lh_20   fs_16"]} numberOfLines={1} style={{color:"#be202e",width:200}}>{cart?.name}</Text>
        <View style={{flexDirection:"row",gap:10}}>
        <CustomTouchBtn onPress={()=>{
          navigation.navigate("")
          
        }}>
        <AntDesign name="eyeo" size={22} color="black" />
        </CustomTouchBtn>

        <CustomTouchBtn>
          <FontAwesome name="edit" size={20} color="black" />
        </CustomTouchBtn>
        <CustomTouchBtn>
        <AntDesign name="delete" size={20} color="black" />
        </CustomTouchBtn>
        </View>
      </View>
      <View style={{flexDirection:"row",gap:10}}>
        <Text preset={["fs_13 ph_10 "]} style={{paddingVertical:5, backgroundColor:"#4caf50",marginTop:10,color:"#FFF",borderRadius:5}}>items {cart?.itemsCount}</Text>
        <Text preset={["fs_13 ph_10 "]} style={{paddingVertical:5, backgroundColor:"#ff9800",marginTop:10,color:"#FFF",borderRadius:5}}>৳{cart?.price}</Text>

      </View>
      <Text preset={[" RR mt_10 lh_14 fs_11"]} style={{color: "#58595B"}}>
        {date}  at {time}
      </Text>
      <View style={{flexDirection:"row",gap:10,alignItems:"center",marginTop:10}}>
        <TouchableOpacity style={{backgroundColor:"#DDD",padding:7,borderRadius:10}}>
          <Text style={{fontSize:14}}>Copy Cart Link</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:"#be202e",justifyContent:"center",alignItems:"center",padding:7,borderRadius:10}}>
          <Text preset={["fs_13"]} style={{color:"#FFF"}}>Proceed to Customer Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SaveSingleCart;

const styles = StyleSheet.create({});
