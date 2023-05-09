import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useFonts} from "expo-font";
import {StatusBar} from "expo-status-bar";
import {StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Text from "./src/components/tags/Text";
import {CheckboxProvider} from "./src/context/CheckboxProvider";
import ProducDetailsTab from "./src/navigations/SingleProductNavigation";
import TabScreen from "./src/navigations/TabNavigation";
import Cart from "./src/screen/Cart";
import ProductDetails from "./src/screen/ProductDetails";
import {Updates} from "expo";
import UnAuth from "./src/screen/UnAuth";
import {useEffect} from "react";
import Checkout from "./src/screen/Checkout";
import InputTestCustom from "./src/components/Input/InputTestCustom";
// import Login from "./src/screen/SignUp";
import CustomDatePicker from "./src/components/Input/CustomDatePicker";
import SiginUp from "./src/screen/SignUp";
import Login from "./src/screen/Login";
import NidVerify from "./src/screen/NidVerify";
import SellerRegister from "./src/screen/SellerRegister";
import OTPVerification from "./src/screen/OTPVerification";

export default function App() {
  // const [loaded, error] = useFonts({
  //   "Popins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  //   "Popins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  //   "Popins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  // });
  // if (loaded) {
  //   console.log(loaded, error);
  //   return <Text preset="h1">Font Loaded...</Text>;

  // async function checkForUpdates() {
  //   const update = await Updates.checkForUpdateAsync();
  //   if (update.isAvailable) {
  //     // Display update prompt to user
  //     const {downloadSize, updateSize, isUpToDate} = update.manifest;
  //     const message = `A new update is available. Would you like to download it? (Size: ${
  //       downloadSize / 1000000
  //     } MB)`;
  //     if (await confirm(message)) {
  //       await Updates.fetchUpdateAsync();
  //       await Updates.reloadAsync();
  //     }
  //   } else {
  //     console.log("No updates available");
  //   }
  // }

  function confirm(message) {
    return new Promise((resolve) => {
      if (confirmDialogSupported()) {
        resolve(window.confirm(message));
      } else {
        resolve(alert(message));
      }
    });
  }

  useEffect(() => {
    // checkForUpdates();
  }, []);

  function confirmDialogSupported() {
    return window.confirm && typeof window.confirm === "function";
  }
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
          <Stack.Screen name="tab" component={OTPVerification} />
          {/* <Stack.Screen name="cart" component={Cart} /> */}

          {/* <Stack.Screen name="product-details" component={ProducDetailsTab} /> */}
          {/* <Stack.Screen name="checkout" component={Checkout} /> */}

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
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
