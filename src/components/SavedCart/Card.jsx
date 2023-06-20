import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import CustomTouchBtn from "../tags/CustomTouchBtn";

const Card = ({
  title,
  date,
  items,
  price,
  onViewPress,
  onEditPress,
  onDeletePress,
  onCopyLinkPress,
  onProceedPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.info}>
        {date}, {items} items
      </Text>
      <Text style={styles.info}>{price}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={onViewPress}>
            <Feather name="eye" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onEditPress}>
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeletePress}>
            <Feather name="trash" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.copyButton} onPress={onCopyLinkPress}>
          <Text style={styles.copyButtonText}>Copy Cart Link</Text>
        </TouchableOpacity>
      </View>
      <CustomTouchBtn
        preset={["mt_10 center"]}
        style={styles.proceedButton}
        onPress={onProceedPress}
      >
        <Text style={styles.proceedButtonText}>
          Proceed to Customer Details
        </Text>
      </CustomTouchBtn>
    </View>
  );
};

const styles = {
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 22,
  },
  info: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    color: "#58595B",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    justifyContent: "space-between",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "30%",
  },
  copyButton: {
    borderColor: "#BE202E",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: "65%",
  },
  copyButtonText: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 12,
    color: "#BE202E",
    textAlign: "center",
  },
  proceedButton: {
    backgroundColor: "#BE202E",
    borderRadius: 4,
    padding: 8,
  },
  proceedButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default Card;
