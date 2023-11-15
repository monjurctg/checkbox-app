import { StyleSheet } from "react-native";
import React from "react";
import CustomTouchBtn from "../tags/CustomTouchBtn";
import Text from "../tags/Text";
import View from "../tags/View";
import { scale } from "../../../utils/funtions";
import { colors } from "../../theme/colors";

const Tags = ({ variant, setVariant, variantLength, options, title }) => {
  // console.log(title)
  const handleVariant = (item, name) => {
    if (title === name) {
      setVariant({ ...variant, [variantLength]: item });
    }
  };

  const active = (item, name) => {
    if (title === name) {
      return item == variant?.[variantLength];
    }
  };

  return (
    <View preset={["mt_10"]} >
      <Text preset={["fs_16 RB "]}>Select {title}</Text>
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
              borderColor:"#ededed",
              // back
              backgroundColor: active(option, title)
                ? colors.primary_2
                : "white",
            }}
          >
            <Text
              preset={[` ${active(option, title) && "text_white "} RR  fs_14`]}
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
