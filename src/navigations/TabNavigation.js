import {View, TouchableOpacity, Image} from "react-native";
import React, {useContext} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import UnAuth from "../screen/UnAuth";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {scale, width} from "../../utils/funtions";
import {colors} from "../theme/colors";
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
import {CheckboxContext} from "../hooks/CheckboxProvider";
import ProductList from "../screen/ProductList";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProductsStack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="/" component={Home} />
    </HomeStack.Navigator>
  );
}

function ProductsScreen() {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ProductsStack.Screen name="/" component={Products} />
      <ProductsStack.Screen name="ProductList" component={ProductList} />
    </ProductsStack.Navigator>
  );
}

function MyTabBar({state, descriptors, navigation, children}) {
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
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
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

        if (label === "Home") {
          if (isFocused) {
            src = homeActive;
            color = colors.primary_4;
            // bg = colors.primary_1;
          } else {
            src = homeNotActive;
            color = colors.black;
            bg = colors.notActive;
          }
        } else if (label === "Products") {
          if (isFocused) {
            src = productActive;
            color = colors.primary_4;
            bg = colors.primary_1;
          } else {
            src = productNotActive;
            color = colors.black;
            bg = colors.notActive;
          }
        } else if (label === "dashboard") {
          if (isFocused) {
            src = dashActive;
            color = colors.primary_4;
            // bg = colors.primary_1;
          } else {
            src = dash;
            color = colors.black;
            bg = colors.notActive;
          }
        } else if (label === "orders") {
          if (isFocused) {
            src = ordersActive;
            color = colors.primary_4;
            // bg = colors.primary_1;
          } else {
            src = orders;
            color = colors.black;
            bg = colors.notActive;
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
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            {label === "Login" ? (
              <View
                style={{
                  height: scale(54),
                  width: width,
                  display: "flex",
                  justifyContent: "center",
                  // alignItems: "center",
                }}>
                <View
                  style={{
                    backgroundColor: colors.primary_1,
                    height: scale(54),
                    marginBottom: scale(10),
                    marginHorizontal: scale(7),
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Text preset={["p1"]} style={{color: colors.white}}>
                    Signup Now
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={{
                  // flexDirection: "row",
                  height: scale(48),
                  // width: scale(60),
                  // padding: scale(10),
                  borderRadius: scale(7),
                  // marginRight: scale(7),
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  // backgroundColor: "white",
                }}>
                <Image
                  source={src}
                  style={{
                    height: scale(25),
                    width: scale(25),
                    resizeMode: "contain",
                  }}
                />
                <Text preset={["p3"]} style={{color: color}}>
                  {label}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabScreen() {
  const {auth} = useContext(CheckboxContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <MyTabBar {...props} />}>
      {!auth ? (
        <Tab.Screen name="Login" component={UnAuth} />
      ) : (
        <>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Products" component={ProductsScreen} />
          <Tab.Screen name="orders" component={HomeScreen} />
          <Tab.Screen name="dashboard" component={ProductsScreen} />
        </>
      )}
    </Tab.Navigator>
  );
}
