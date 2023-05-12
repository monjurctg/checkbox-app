import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Modal from 'react-native-modal';
import React, { useState } from "react";
import {height, scale, width} from "../../../utils/funtions";
import {colors} from "../../theme/colors";
import {SafeAreaView} from "react-native-safe-area-context";
import Text from "../tags/Text";
import { Feather } from '@expo/vector-icons';

const Mainlayout = ({children, navigation}) => {
  const [isSearchVisible, setSearchVisible] = useState(false);

  const handleSearchIconClick = () => {
    setSearchVisible(!isSearchVisible);
  };
  
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
                <Feather name="search" size={24} color="black" />
                </TouchableOpacity> */}
                 <TouchableOpacity onPress={handleSearchIconClick}>
        <Feather name="search" size={24} color="black" />
      </TouchableOpacity>
      
               
                <TouchableOpacity >
      <Feather name="bell" size={24} color="black" />
      
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>2</Text>
        </View>
    
    </TouchableOpacity>
                 
    <TouchableOpacity  onPress={() => navigation?.navigate("cart")} style={{marginRight: scale(10)}} >
    <Feather name="shopping-cart" size={24} color="black" />
      
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>2</Text>
        </View>
    
    </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => navigation?.navigate("cart")}
                  style={{marginRight: scale(10)}}>
                 
                  <Feather name="shopping-cart" size={24} color="black" />
                </TouchableOpacity> */}

                
                
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
  notificationBadge: {
    position: 'absolute',
    top: -8,
    right: -7,
    backgroundColor: colors.primary_2,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchField: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
