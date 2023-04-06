import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {height, scale, width} from "../../../utils/funtions";
import {colors} from "../../theme/colors";
import {SafeAreaView} from "react-native-safe-area-context";
import Text from "../tags/Text";

const Mainlayout = ({children, navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View>
          <View style={{paddingHorizontal: scale(10)}}>
            <View style={styles.headerContainer}>
              <View style={styles.left}>
                <TouchableOpacity>
                  <Image
                    source={require("../../../assets/img/monjur3.jpg")}
                    style={{
                      height: 48,
                      width: 48,
                      borderRadius: 40,
                      resizeMode: "cover",
                    }}
                  />
                </TouchableOpacity>
                <View style={{marginLeft: scale(10)}}>
                  <Text
                    preset={["fw_400"]}
                    style={{
                      marginBottom: scale(5),
                      fontSize: 14,
                      lineHeight: 16,
                    }}>
                    Monjurul alam
                  </Text>
                  <TouchableOpacity style={styles.checkBlncBtn}>
                    <Text
                      // preset={[""]}
                      style={{
                        color: colors.white,
                        fontSize: 11,
                        lineHeight: 12,
                      }}>
                      Check Balance
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.right}>
                {/* <TouchableOpacity>
                  <Image
                    style={{
                      width: scale(18),
                      height: scale(18),
                      marginRight: scale(18),
                    }}
                    source={require("../../../assets/icons/dash.png")}
                  />
                </TouchableOpacity> */}
                {/* <TouchableOpacity>
                  <Image
                    style={{
                      width: scale(18),
                      height: scale(18),
                      marginRight: scale(18),
                    }}
                    source={require("../../../assets/icons/bar.png")}
                  />
                </TouchableOpacity> */}

                <TouchableOpacity
                  onPress={() => navigation?.navigate("cart")}
                  style={{marginRight: scale(10)}}>
                  {/* <Image
                    style={{
                      width: scale(20),
                      height: scale(20),
                      marginRight: scale(7),
                    }}
                    source={require("../../../assets/icons/cart.png")}
                  /> */}
                  <Ionicons name="cart-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            {children}

            {/* <View style={{height: scale(300)}}></View> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Mainlayout;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "#211f1f",
    height: height,
    width: width,
    backgroundColor: colors.white,

    // paddingTop: scale(10),
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: scale(72),
    borderBottomColor: colors.border,
    // borderBottomWidth: 1,
  },
  left: {
    // width: 100,
    flexDirection: "row",
    width: width / 2,
    // backgroundColor: "green",
  },
  checkBlncBtn: {
    backgroundColor: colors.primary_2,
    height: 24,
    justifyContent: "center",
    width: 143,
    alignItems: "center",
    // padding: scale(5),
    borderRadius: 4,
  },
  right: {
    width: width / 3 + 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 20,
    // backgroundColor: "blue",
  },
});
