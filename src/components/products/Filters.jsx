import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import View from "../tags/View";
import Text from "../tags/Text";
import { scale } from "../../../utils/funtions";
import CustomTouchBtn from "../tags/CustomTouchBtn";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { setSortState } from "../../redux/reducers/utilsSlice";






const Filters = ({ navigation, onFilterClick,setSort_by }) => {
  const[filtershow,setFiltershow]=useState(false)
  const { sortState } = useSelector((state) => state.utils);

  const[activesort,setActivesort]=useState("Best Seller")
  const dispatch = useDispatch()


  const handleShortclick  = data=>{
    // setActivesort(data)
    dispatch(setSortState(data))
    setFiltershow(false)
  }
  return (
    <View preset={["mt-5"]} style={{ marginVertical: 15 }}>
      <View preset={["row jc_between "]} style={{ alignItems: "center" }}>
        {/* <View preset={["row center"]}> */}
        <CustomTouchBtn onPress={onFilterClick}>
          <Ionicons name="options" size={24} color="black" />
        </CustomTouchBtn>
        {/* <Picker
              // selectedValue={district}
              style={{ height: 10, width: 200,borderWidth:1 }}
              // onValueChange={(itemValue, itemIndex) => setDistrict(itemValue)}
              placeholder="Select district"
            >
              {[{name:"Best Seller",value:"best-seller"}].map((option, index) => (
                <Picker.Item
                  key={index}
                  label={option.name}
                  value={option.value}
                />
              ))}
            </Picker> */}
        <TouchableOpacity
       onPress={()=>setFiltershow(!filtershow)}
          style={{
            flexDirection: "row",
            width: scale(177),
            height: scale(24),
            justifyContent: "space-around",
            alignSelf: "center",
            alignItems: "center",
            marginLeft: scale(10),
            backgroundColor: "#E6E7E8",
            borderRadius: scale(4),
            paddingVertical: scale(5),
            paddingHorizontal: scale(12),
          }}>
          <Text preset={["fs_12  lh_14  fw_400 pl_5 center"]}>
            {sortState}
          </Text>
          <AntDesign name="caretdown" size={14} color="black" />
        </TouchableOpacity>
      </View>
     {
      filtershow && <View style={styles.sortby_container}>
      <TouchableOpacity onPress={()=>{
        handleShortclick("Best Seller")
        setSort_by("best_seller")
      }}>
        <Text>Best Seller</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        handleShortclick("Newest")
        setSort_by("newest")
      }

      }>
        <Text>Newest</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        handleShortclick("Oldest")
        setSort_by("oldest")
      }}>
        <Text>Oldest</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        handleShortclick("Price high to low")
        setSort_by("price_high_to_low")
      }}>
        <Text>Price high to low</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        handleShortclick("Price low to high")
        setSort_by("price_low_to_high")
      }}>
        <Text>Price low to high</Text>
      </TouchableOpacity>
    </View>

     }

    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  filterBtn: {
    height: scale(177),
    width: scale(32),
    paddingVertical: scale(4),
    paddingHorizontal: scale(12),
    /* Secondary/04 */

    background: "black",
    borderRadius: scale(4),
  },
  sortby_container: {
    height: 200,
    backgroundColor: "white",
    width: 200, alignSelf: "flex-end",
    padding: 12,
    gap: 10,

    // position:"absolute",zIndex:999,
    // elevation:10,
    top: 10
  }
});
