import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";
import React, { Suspense, useContext, useRef, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { scale, width } from "../../utils/funtions";
import { colors } from "../theme/colors";
import Text from "../components/tags/Text";
import Home from "../screen/Home";
import Products from "../screen/Products";
import homeActive from "../../assets/icons/home-active.png";
import homeNotActive from "../../assets/icons/blackHome.png";
import productActive from "../../assets/icons/products-active.png";
import productNotActive from "../../assets/icons/blackProduct.png";
import dash from "../../assets/icons/dash.png";
import dashActive from "../../assets/icons/dash-active.png";
import orders from "../../assets/icons/orders.png";
import ordersActive from "../../assets/icons/orders-active.png";
import * as Linkings from "expo-linking";
// const Products = React.lazy(() => import("../screen/Products"));

// const ProductList = React.lazy(() => import(""));
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Orders from "../screen/Orders";
import FullScreenLoader from "../components/loader/FullScreenLoader ";
import UnAuth from "../screen/auth/UnAuth";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuth, setUser } from "../redux/reducers/authSlice";
import HomeSVG from "../components/svg/HomeSVG";
import RoketSVG from "../components/svg/RoketSVG";
import DashboardSvg from "../components/svg/DashboardSvg";
import ProductsSVG from "../components/svg/ProductsSVG";
import OrdersSVG from "../components/svg/OrdersSVG";
import ActiveProductSVG from "../components/svg/ActiveProductSVG";
import ActiveHome from "../components/svg/ActiveHome";
import authServices from "../services/authServices";
import { useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import AllCollection from "../screen/AllCollection";
import FilterIndex from "../screen/filter/FilterIndex";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProductsStack = createNativeStackNavigator();
const OrdersStack = createNativeStackNavigator();
const DashStack = createNativeStackNavigator();
const Dash = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("")
  const getToken = async () => {
    let token = await AsyncStorage.getItem("token")
    setToken(token)
    setLoading(false)


  }
  useEffect(() => {
    getToken()
  }, [])

  // setTimeout(()=>{
  //   setLoading(false)
  // },1000)

  // if (loading) {
  //   return <FullScreenLoader visible={loading} />;
  // }

  // console.log("https://cb-next-reseller-omega.vercel.app/?token=" +token )
  let url = "https://checkbox-rosy.vercel.app/test_facebok/product-list/5182"
  // let url = "https://cb-next-reseller-omega.vercel.app/?token=" + token
  const handleNavigationStateChange = (navState) => {
    console.log('Current URL:', navState.url);

    // Check if the URL contains a specific string indicating the Facebook popup
    if (navState.url.includes('facebook-popup-url')) {
      // setPopupUrl(navState.url);
    }

    // setLoading(navState.loading);
  };
  return (
    <>
      <View style={{ flex: 1, }}>
      <WebView

      javaScriptEnabled={true}
      source={{ uri: 'https://checkbox-rosy.vercel.app/test_facebok/product-list/5182' }}
      onNavigationStateChange={handleNavigationStateChange}
      onShouldStartLoadWithRequest={(event) => {
        console.log(event.url);
        return true;
      }}
      javaScriptCanOpenWindowsAutomatically={true}
      renderLoading={() => (
        <View style={{ position: 'absolute', top: '50%', left: '50%' }}>
          {/* You might want to customize or replace FullScreenLoader */}
          <FullScreenLoader visible={loading} />
        </View>
      )}
      startInLoadingState={true}
      style={{ flex: 1 }}
      // Set the custom WebView engine for Android
      //androidHardwareAccelerationDisabled={true} // Disable hardware acceleration to use Chrome
      //androidLayerType="software" // Use software rendering for better compatibility
    />

        {/* <WebView
          renderLoading={() => <View style={{ position: "absolute", top: "50%", left: "50%" }}><FullScreenLoader visible={loading} /></View>}
          startInLoadingState={true} source={{ uri: "https://checkbox-rosy.vercel.app/test_facebok/product-list/5182" }} style={{ flex: 1 }} /> */}
      </View>
    </>
  );
};

function HomeScreen() {


  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <HomeStack.Screen name="/" component={Home} />
      </HomeStack.Navigator>
    </Suspense>
  );
}

function AllCartsScreen() {
  return (
    <OrdersStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <OrdersStack.Screen name="/" component={Orders} />
    </OrdersStack.Navigator>
  );
}

function DashScreen() {
  return (
    <DashStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <DashStack.Screen name="/" component={Dash} />
    </DashStack.Navigator>
  );
}

function MyTabBar({ state, descriptors, navigation, children }) {
  const { tabShow } = useSelector((state) => state.utils);
  // alert(tabShow)

  return (
    <View style={{ ...styles.footerWraper, display: tabShow ? "flex" : "none" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        let src;
        let color;
        let bg;
        let icon;
        let label2;

        if (label === "home") {
          label2 = "Home";
          if (isFocused) {
            color = colors.primary_1;
            icon = <ActiveHome />;
          } else {
            src = homeNotActive;
            color = colors.black;
            bg = colors.notActive;
            icon = <HomeSVG title={label} size={24} />;
          }
        } else if (label === "Products") {
          label2 = "Products";
          if (isFocused) {
            // src = productActive;
            color = colors.primary_1;
            bg = colors.primary_1;
            icon = <ActiveProductSVG />;
          } else {
            // src = productNotActive;
            color = colors.black;
            bg = colors.notActive;
            icon = <ProductsSVG color={color} />;
          }
        } else if (label === "dashboard") {
          label2 = "Dashboard";
          if (isFocused) {
            // src = dashActive;
            color = colors.primary_1;
            icon = <DashboardSvg color={color} size={24} />;
          } else {
            src = dash;
            color = colors.black;
            bg = colors.notActive;
            icon = <DashboardSvg size={24} />;
          }
        } else if (label === "carts") {
          label2 = "Carts";
          if (isFocused) {
            // src = ordersActive;
            color = colors.primary_4;
            icon = <AntDesign name="shoppingcart" size={24} color={color} />;
          } else {
            src = orders;
            color = colors.black;
            bg = colors.notActive;
            icon = <AntDesign name="shoppingcart" size={24} color={color} />;
          }
        }

        const onPress = () => {
          // alert("cl")
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            key={index}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}
          >
            {label === "unauth" ? (
              <TouchableOpacity
                onPress={() => navigation.navigate("signup")}
                style={styles.unauthButton}
              >
                <View style={styles.unauthButtonBackground}>
                  <Text preset={["p1 RM"]} style={styles.unauthButtonText}>
                    Signup Now
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={[styles.authButtonContainer]}>
                <Animated.View style={[styles.authButtonContent]}>
                  {icon}
                  <Text preset={["fs_12 fw_500 RR"]} style={{ color: color }}>
                    {label2}
                  </Text>
                </Animated.View>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
function ProductsScreen({ route, navigation }) {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProductsStack.Screen
        initialParams={route.params}
        name="/"
        component={Products}
      />

      <ProductsStack.Screen
        initialParams={route.params}
        name="all-collection"
        component={AllCollection}
      />
      <ProductsStack.Screen
        initialParams={route.params}
        name="filter"
        component={FilterIndex}
      />


    </ProductsStack.Navigator>
  );
}



const Stack = createNativeStackNavigator();

export default function TabScreen({ route }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { auth, user } = useSelector((state) => state.auth);
  const url = Linkings.useURL();
  if (url) {
    const { hostname, path, queryParams } = Linkings.parse(url);
    // console.log(hostname, "hostname", url);
  }

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const res = await authServices.getUserinfo();
          if (res.status == 200) {
            dispatch(setUser(res.data.data));
            dispatch(setAuth(true));
            // setLoading(false);
          }
          else {
            dispatch(setAuth(false));


          }
        }
        else {
          dispatch(setAuth(false))
        }
      } catch (err) {
        dispatch(setAuth(false));



      }
      finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);


  // console.log("user",loading);

  if (auth == null) {

    return <FullScreenLoader />
  }

  return (
    <>
      {!auth ? (
        <Tab.Navigator



          screenOptions={{
            headerShown: false,


          }}
          tabBar={(props) => <MyTabBar {...props} />}
        >
          <Tab.Screen name="unauth" component={UnAuth} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
          tabBar={(props) => <MyTabBar {...props} />}
        >
          <Tab.Screen name="home" component={HomeScreen} />
          <Tab.Screen name="Products" component={ProductsScreen} />
          <Tab.Screen name="carts" component={AllCartsScreen} />
          <Tab.Screen name="dashboard" component={DashScreen} />
        </Tab.Navigator>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  footerWraper: {
    flexDirection: "row",
    height: scale(55),
    width: "95%",

    // borderWidth: 1,
    backgroundColor: "#FFFFFF",
    // borderTopColor: colors.border,
    // borderColor:colors.border,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
    // paddingVertical:4
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  unauthButton: {
    height: scale(48),
    width: width,
    display: "flex",
    justifyContent: "center",
  },
  unauthButtonBackground: {
    backgroundColor: colors.primary_1,
    height: scale(55),
    marginHorizontal: scale(7),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7

  },
  unauthButtonText: {
    color: colors.white,
  },
  authButtonContainer: {
    height: scale(50),
    borderRadius: scale(7),
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  authButtonContent: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
