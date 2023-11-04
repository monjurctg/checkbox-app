import {Image, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import Rating from "../Rating";
import View from "../tags/View";
import Text from "../tags/Text";
import { scale } from "../../../utils/funtions";

const ClientReview = ({rating, auther, review, date}) => {
  // console.log(review)
  return (
    <TouchableOpacity  style={{borderWidth:1,borderColor:"#DDD",marginRight:10,borderRadius:10,padding:10,marginTop:10,width:scale(270)}}>
     <View preset={[""]} style={{flexDirection:"row",alignItems:"center",gap:10}}>
     <Image source={{uri:review?.avatar}} style={{width:50,height:50,borderRadius:25}} />
      <Rating maxStars={5} defaultStars={review?.rating} />
     </View>
      <Text numberOfLines={3} ellipsizeMode={"tail"} preset={["lh_24 mt_5 fs_16 RR fw_400"]}>
     {review?.comment}
      </Text>
      <View preset={["row   mt_15"]}>
        <Text preset={["fs_14 lh_24 fw_400 RR"]}>by </Text>
        <Text preset={["  fs_14 lh_24 fw_500 RM "]}> {review?.user_name} </Text>
        <Text preset={["  fs_14 fw_400 lh_24 fw_499 "]}> on {review?.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ClientReview;

const styles = StyleSheet.create({});
