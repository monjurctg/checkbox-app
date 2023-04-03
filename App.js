import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useFonts} from "expo-font";
import {StatusBar} from "expo-status-bar";
import {StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Text from "./src/components/tags/Text";
import {CheckboxProvider} from "./src/hooks/CheckboxProvider";
import TabScreen from "./src/navigations/TabNavigation";
import Cart from "./src/screen/Cart";
import ProductDetails from "./src/screen/ProductDetails";

import UnAuth from "./src/screen/UnAuth";

export default function App() {
  // const [loaded, error] = useFonts({
  //   "Popins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  //   "Popins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  //   "Popins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  // });
  // if (loaded) {
  //   console.log(loaded, error);
  //   return <Text preset="h1">Font Loaded...</Text>;
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  // }
  return (
    <CheckboxProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerMode: "screen",
          }}>
          <Stack.Screen name="tab" component={TabScreen} />
          <Stack.Screen name="cart" component={Cart} />

          <Stack.Screen name="product-details" component={ProductDetails} />

          {/* <Stack.Screen
          name="ProductListing"
          component={ProductListing}
          // options={{title: 'Welcome'}}
        /> */}
        </Stack.Navigator>

        {/* <StatusBar style="auto" /> */}
      </NavigationContainer>
      <StatusBar style="auto" />
    </CheckboxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
