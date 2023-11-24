import {Image, ScrollView, StyleSheet, TextInput} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import View from "../components/tags/View";
import Text from "../components/tags/Text";
import {scale} from "../../utils/funtions";
import CustomTouchBtn from "../components/tags/CustomTouchBtn";
import {colors} from "../theme/colors";
import img1 from "../../assets/img/redShoe.png";
import SingleCart from "../components/cart/SingleCart";
import {Feather} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import SaveSingleCart from "../components/cart/SaveSingleCart";
import FullScreenLoader from "../components/loader/FullScreenLoader ";
import api from "../services/api";
import cartServices from "../services/cartServices";

const Orders = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [carts,setCarts]=useState([])
  setTimeout(() => {
    setLoading(false);
  }, 1000);


  const fetchCarts = async ()=>{
    try{
      // setLoading()
    const res = await api.get("/carts")
    setCarts(res.data.data)
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }

  }
  useEffect(()=>{
    fetchCarts()
  },[])

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
     fetchCarts()

    });
    return unsubscribe;
  }, [navigation]);




  if (loading) {
    return <FullScreenLoader visible={loading} />;
  }
  return (
    <SafeAreaView>
      <ScrollView style={{paddingHorizontal: scale(10)}}>
        <View
          preset={["row jc_between ph_10 mt_5 "]}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#DDDDDD",
            paddingBottom: scale(5),
          }}>
          <Text preset={["RB fs_16"]}>Saved Cart ({carts.length})</Text>
          <CustomTouchBtn onPress={()=>navigation.goBack()}>
            <AntDesign name="closecircleo" size={scale(20)} color="black" />
          </CustomTouchBtn>
        </View>

        <View preset={["mt_10 "]}>
          {
            carts.map((cart,index)=>  <SaveSingleCart key={index} cart={cart} refatch={fetchCarts} />)
          }


        </View>

        <View style={{height: scale(60)}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({});
