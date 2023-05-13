import { View, TouchableOpacity, Image } from "react-native";
import { WebView } from "react-native-webview";
import React, { useContext, useEffect, useState } from "react";
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

import ProductList from "../screen/ProductList";
import {
  AntDesign,
  Entypo,
  Feather,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import Orders from "../screen/Orders";
import { SafeAreaView } from "react-native-safe-area-context";
import FullScreenLoader from "../components/loader/FullScreenLoader ";
import { CheckboxContext } from "../context/CheckboxProvider";
import Login from "../screen/auth/Login";
import SiginUp from "../screen/auth/SignUp";
import OTPVerification from "../screen/auth/OTPVerification";
import NidVerify from "../screen/auth/NidVerify";
import UnAuth from "../screen/auth/UnAuth";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuth } from "../redux/reducers/authSlice";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProductsStack = createNativeStackNavigator();
const OrdersStack = createNativeStackNavigator();
const DashStack = createNativeStackNavigator();
const Dash = () => {
  const [loading, setLoading] = useState(true);
  
  if (loading) {
    return <FullScreenLoader visible={loading} />;
  }
  return (
    <>
      <View style={{ flex: 1, marginTop: 30 }}>
        <WebView source={{ uri: "https://google.com" }} style={{ flex: 1 }} />
      </View>
    </>
  );
};

function HomeScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{ 
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="/" component={Home} />
    </HomeStack.Navigator>
  );
}

function OrderScreen() {
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

function ProductsScreen() {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProductsStack.Screen name="/" component={Products} />
      <ProductsStack.Screen name="ProductList" component={ProductList} />
    </ProductsStack.Navigator>
  );
}
function MyTabBar({ state, descriptors, navigation, children }) {
  return (
    <View
      style={{
        flexDirection: "row",
        height: scale(60),
        borderTopWidth: 1,
        backgroundColor: "white",
        borderTopColor: colors.border,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        console.log(isFocused);

        let src;
        let color;
        let bg;
        let icon;
        let fontSize;

        if (label === "home") {
          if (isFocused) {
            src = homeActive;
            color = colors.primary_4;
            icon = <FontAwesome5 name="home" size={30} color={color} />;

            // bg = colors.primary_1;
          } else {
            src = homeNotActive;
            color = colors.black;
            bg = colors.notActive;
            icon = (
              <FontAwesome5
                name="home"
                style={{ color: color }}
                size={24}
                color={color}
              />
            );
          }
        } else if (label === "Products") {
          if (isFocused) {
            src = productActive;
            color = colors.primary_4;
            bg = colors.primary_1;

            // icon = <FontAwesome5 name="box" size={24} color={color} />;
            icon = <Ionicons name="cube-outline" size={30} color={color} />;
          } else {
            src = productNotActive;
            color = colors.black;
            bg = colors.notActive;
            // icon = <FontAwesome5 name="box" size={24} color={color} />;
            icon = <Ionicons name="cube-outline" size={24} color={color} />;
          }
        } else if (label === "dashboard") {
          if (isFocused) {
            src = dashActive;
            color = colors.primary_4;
            // bg = colors.primary_1;
            icon = (
              <MaterialCommunityIcons
                name="view-dashboard-outline"
                size={30}
                color={color}
              />
            );
          } else {
            src = dash;
            color = colors.black;
            bg = colors.notActive;
            icon = (
              <MaterialCommunityIcons
                name="view-dashboard-outline"
                size={24}
                color={color}
              />
            );
          }
        } else if (label === "orders") {
          if (isFocused) {
            src = ordersActive;
            color = colors.primary_4;
            // bg = colors.primary_1;
            icon = (
              <MaterialCommunityIcons
                name="notebook-check"
                size={30}
                color={color}
              />
            );
          } else {
            src = orders;
            color = colors.black;
            bg = colors.notActive;
            icon = (
              <MaterialCommunityIcons
                name="notebook-check"
                size={24}
                color={color}
              />
            );
          }
        }
        if (label === "login") {
        }

        const onPress = () => {
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
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {label === "unauth" ? (
              <TouchableOpacity
              onPress={()=>navigation.navigate("signup")}
                style={{
                  height: scale(48),
                  width: width,
                  display: "flex",
                  justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: colors.primary_1,
                    height: scale(48),
                    // marginBottom: scale(10),
                    marginHorizontal: scale(7),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text preset={["p1"]} style={{ color: colors.white }}>
                    Signup Now
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  // flexDirection: "row",
                  height: scale(48),

                  borderRadius: scale(7),
                  // marginRight: scale(7),
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  // backgroundColor: "white",
                }}
              >
                {/* <Image
                  source={src}
                  style={{
                    height: scale(25),
                    width: scale(25),
                    resizeMode: "contain",
                  }}
                /> */}
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  {icon}
                  <Text preset={["p3"]} style={{ color: color }}>
                    {label}
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const Stack = createNativeStackNavigator();

export default function TabScreen() {
  const dispatch = useDispatch()
  // const { auth } = useContext(CheckboxContext); 
  const [loading, setLoading] = useState(true);
  
  const{auth}=useSelector((state)=>state.auth)

  useEffect(() => {
    // checkForUpdates();
    

    const checkToken=async()=>{
      setLoading(true)
      const token = await AsyncStorage.getItem('token');
      if(token){
        setLoading(false)
        console.log(token,"token")
        
        dispatch(setAuth(true))
      }
      else{
        setLoading(false)
        console.log(token,"token else")
      }

    }

    checkToken()


  }, [auth]);
  // console.log(auth,"redux auth")
  
  if (loading) {
    return <FullScreenLoader visible={loading} />;
  }
  return (
    <>
      {!auth ?  <>
          
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
            }}
            tabBar={(props) => <MyTabBar {...props} />}
          >
            <Tab.Screen name="unauth" component={UnAuth} />
          </Tab.Navigator >
          
      
        </>
      : (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
          tabBar={(props) => <MyTabBar {...props} />}
        >
          <Tab.Screen name="home" component={HomeScreen} />
          <Tab.Screen name="Products" component={ProductsScreen} />
          <Tab.Screen name="orders" component={OrderScreen} />
          <Tab.Screen name="dashboard" component={DashScreen} />
        </Tab.Navigator>
      )}
    </>
  );
}
