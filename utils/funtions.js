import {Dimensions, Text} from "react-native";
import {presset} from "../src/components/tags/text.preset";
import AsyncStorage from "@react-native-async-storage/async-storage";
const {width, height} = Dimensions.get("window");

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
let filterCategories =[]

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const pressetData = (data) => {
  return data.map((p) => p.split(" ").map((st) => presset[st]));
};
{
  /* <Text style={{flexWrap:"wrap"}}></Text> */
}

 function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


let setSwichCartIdInLocal = async(id)=>{
  const cartId = JSON.parse(id)
// console.log(JSON.stringify(cartId),"id fromo async askdj",JSON.parse(id))
    await AsyncStorage?.setItem("cart_id",JSON.stringify(cartId))



}


export {scale, verticalScale, moderateScale, height, width, pressetData,formatDate,setSwichCartIdInLocal,filterCategories};
