import { StyleSheet } from "react-native";
import React from "react";
import CustomTouchBtn from "../tags/CustomTouchBtn";
import Text from "../tags/Text";
import View from "../tags/View";
import { scale } from "../../../utils/funtions";

const Tags = ({ variant, setVariant, variantLength, options, title }) => {
  const handleVariant = (item, name) => {
    // console.log(item);
    // console.log("variation item",name);
    // debugger
    // alert(indexOfVarient)

    if (title === name) {
      // setVariant({ ...variant, [name.toLowerCase()]: item });
      setVariant({ ...variant, [variantLength]: item });
    }

    // else if (title === "Size") {
    //   setVariant({...variant, size: item});
    // }
  };

  const active = (item, name) => {
    // console.log("variation",item, title);
    if (title === name) {
      return item == variant?.[variantLength];
    }
  };

  return (
    <View preset={["mt_10"]}>
      <Text preset={["fs_16 bold "]}>Select {title}</Text>
      <View preset={["row wrap"]}>
        {options?.map((option, index) => (
          <CustomTouchBtn
            key={index}
            onPress={() => {
              handleVariant(option, title);
            }}
            preset={[`center ph_10  mr_10 mt_10`]}
            style={{
              // width: scale(85),
              height: scale(30),
              borderRadius: 4,
              borderWidth: 1,
              // back
              backgroundColor: active(option, title) ? "black" : "white",
            }}
          >
            <Text
              preset={[` ${active(option, title) && "text_white "}  fs_14`]}
            >
              {option}
            </Text>
          </CustomTouchBtn>
        ))}
      </View>
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({});
