import {
  Animated,
  DevSettings,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import React, { useEffect, useState } from "react";
import { height, scale, width } from "../../../utils/funtions";
import { colors } from "../../theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../tags/Text";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import FullScreenLoader from "../loader/FullScreenLoader ";
import { useDispatch, useSelector } from "react-redux";
import { setCartSize } from "../../redux/reducers/cartSlice";
import cartServices from "../../services/cartServices";
import { setAuth, setUser } from "../../redux/reducers/authSlice";

const Mainlayout = ({ children }) => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  // console.log(user,"fdfjdkfj")

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleSearchIconClick = () => {
    // setSearchVisible(!isSearchVisible);
    navigation.navigate("search");
  };
  const { cartSize } = useSelector((state) => state.cart);
  const [isMenu, setIsMenu] = useState(false);
  const animatedValue = new Animated.Value(0);

  const fetchSingCart = async () => {
    const cart_id = await AsyncStorage.getItem("cart_id");

    // console.log(cart_id, "cart id from sing");
    const res = await cartServices.getSingleCarts(cart_id);
    // console.log(res.data, "response ");
    if (res.status === 200) {
      dispatch(setCartSize(res.data.data.items.length));
    } else {
      dispatch(setCartSize(0));
    }
  };

  useEffect(() => {
    if (isMenu) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isMenu]);

  useEffect(() => {
    fetchSingCart();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0],
  });

  const handleMenu = () => {
    setIsMenu(!isMenu);
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      await AsyncStorage.clear()
      dispatch(setAuth(false))
      dispatch(setUser({}))

    } catch (err) {
      // console.log(err)
    } finally {
      // DevSettings.reload();
      setLoading(false)

    }


  };

  // console.log(user,"home")

  if (loading) {
    return <FullScreenLoader visible={loading} />;
  }
  // console.log(user.logo)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <View style={{ paddingHorizontal: scale(10) }}>
            <View style={styles.headerContainer}>
              <View style={styles.left}>
                <TouchableOpacity style={{ height: 48, width: 48, borderRadius: 25, backgroundColor: "#bd212f", justifyContent: "center", alignItems: "center" }} onPress={handleMenu}>
                  {/* <Image
                    source={require("../../../assets/img/monjur3.jpg")}
                    // source={{uri:user.logo}}
                    style={{
                      height: 48,
                      width: 48,
                      borderRadius: 40,
                      resizeMode: "cover",
                    }}
                  /> */}
                  <Text style={{ textTransform: "capitalize", color: "white" }}>{user?.name?.slice(0, 1)}</Text>
                </TouchableOpacity>

                <View style={{ marginLeft: scale(10) }}>
                  <Text
                    preset={["fw_400"]}
                    style={{
                      marginBottom: scale(5),
                      fontSize: 14,
                      lineHeight: 16,
                      textTransform: "capitalize", fontWeight: "500", fontFamily: "RM"
                    }}
                  >
                    {user?.name}
                  </Text>
                  {/* <TouchableOpacity style={styles.checkBlncBtn}>
                    <Text
                      // preset={[""]}
                      style={{
                        color: colors.white,
                        fontSize: 11,
                        lineHeight: 12,
                      }}
                    >
                      Check Balance
                    </Text>
                  </TouchableOpacity> */}
                </View>
              </View>
              <View style={styles.right}>
                {/* <TouchableOpacity>
                <Feather name="search" size={24} color="black" />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={handleSearchIconClick}>
                  <Feather name="search" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Feather name="bell" size={24} color="black" />

                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>2</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation?.navigate("cart")}
                  style={{ marginRight: scale(10) }}
                >
                  <Feather name="shopping-cart" size={24} color="black" />

                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>{cartSize}</Text>
                  </View>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => navigation?.navigate("cart")}
                  style={{marginRight: scale(10)}}>

                  <Feather name="shopping-cart" size={24} color="black" />
                </TouchableOpacity> */}
              </View>
            </View>
            {isMenu && (
              <Animated.View
                style={[
                  styles.menuContainer,
                  {
                    transform: [{ translateY }],
                    opacity: animatedValue,
                  },
                ]}
              >
                {/* Add your menu items here */}
                <TouchableOpacity style={styles.menuItem}>
                  <Ionicons
                    name="person-outline"
                    size={24}
                    color="#000"
                    style={styles.menuIcon}
                  />
                  {/* Add your profile menu content here */}
                  <Text
                    style={styles.logoutText}
                  >
                    Profile
                  </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.menuItem}>
                  <Ionicons
                    name="settings-outline"
                    size={24}
                    color={colors.primary_1}
                    style={styles.menuIcon}
                  />

                  <Text
                    style={[styles.logoutText, { color: colors.primary_1 }]}
                  >
                    Settings
                  </Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                  onPress={handleLogout}
                  style={styles.logoutButton}
                >
                  <Ionicons
                    name="log-out-outline"
                    size={24}
                    color="#000"
                    style={styles.menuIcon}
                  />
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
              </Animated.View>
            )}

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
    // backgroundColor: colors.white,

    // paddingTop: scale(10),
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: scale(55),
    // width:"100%",
    borderBottomColor: colors.border,
    // borderBottomWidth: 1,
    // backgroundColor:"#fff"
  },
  left: {
    // width: 100,
    flexDirection: "row",
    width: width / 2,
    alignItems: "center"
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
    position: "absolute",
    top: -8,
    right: -7,
    backgroundColor: colors.primary_2,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  searchField: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  menuContainer: {
    position: "absolute",
    // backgroundColor: "#d1c5c5cf",
    backgroundColor: "#fff",
    borderRadius: 10,

    top: 60,
    left: 10,
    // minHeight: 160,
    minWidth: 200,
    zIndex: 999999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: "#be202e",
  },
  menuIcon: {
    marginRight: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'center',
    // backgroundColor: "#be202e",
    paddingVertical: 10,
    paddingHorizontal: 20,
    // marginTop: 10,
  },
  logoutText: {
    // color: "#fff",
    fontSize: 16,
    fontFamily: "RM"
    // fontWeight: "600",
  },
});
