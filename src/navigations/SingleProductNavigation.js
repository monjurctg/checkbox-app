import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useContext} from "react";
import {TouchableOpacity, View} from "react-native";
import {scale} from "../../utils/funtions";
import SingleProduct from "../components/products/SingleProduct";
import Text from "../components/tags/Text";
import {CheckboxContext} from "../context/CheckboxProvider";
import ProductDetails from "../screen/ProductDetails";
import {colors} from "../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { setDetailsBottomSheet } from "../redux/reducers/utilsSlice";

const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  const dispatch = useDispatch()
  
    const {detailsBottomSheet} = useSelector((state)=>state.utils)

  return (
    <View
      style={{
        flexDirection: "row",
        height: scale(48),
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

        const onPress = () => {
          // alert("hello")t
          dispatch(setDetailsBottomSheet(!detailsBottomSheet));
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
            <View
              style={{
                // flexDirection: "row",
                height: scale(48),
                // width: "100%",
                width: scale(390),
                // padding: scale(10),

                borderRadius: scale(7),
                // marginRight: scale(7),
                alignItems: "center",
                justifyContent: "space-evenly",
                backgroundColor: colors.primary_2,
              }}>
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
                }}>
                {/* {icon} */}
                <Text preset={["p2 bold"]} style={{color: colors.white}}>
                Add To Cart
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function ProducDetailsTab({route}) {
  // const {auth} = useContext(CheckboxContext);
  // console.log(route.params)
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="product_details" initialParams={route.params} component={ProductDetails} />
    </Tab.Navigator>
  );
}
