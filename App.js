import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Linking, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from './src/components/tags/Text';

import ProducDetailsTab from './src/navigations/SingleProductNavigation';
import TabScreen from './src/navigations/TabNavigation';
import Cart from './src/screen/Cart';
import ProductDetails from './src/screen/ProductDetails';
import { Updates } from 'expo';
import UnAuth from './src/screen/auth/UnAuth';
import { useContext, useEffect } from 'react';
import Checkout from './src/screen/Checkout';
import InputTestCustom from './src/components/Input/InputTestCustom';
// import Login from "./src/screen/SignUp";
import CustomDatePicker from './src/components/Input/CustomDatePicker';
import SiginUp from './src/screen/auth/SignUp';
import Login from './src/screen/auth/Login';
import NidVerify from './src/screen/auth/NidVerify';
import SellerRegister from './src/screen/auth/SellerRegister';
import OTPVerification from './src/screen/auth/OTPVerification';
import FlashMessage from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store';
import { setAuth } from './src/redux/reducers/authSlice';
import Search from './src/screen/Search';
import ProductList from './src/screen/ProductList';
import CustomerDetails from './src/screen/CustomerDetails';
import ConfirmOrder from './src/screen/ConfirmOrder';
import ForgetPassword from './src/screen/auth/ForgetPassword';
import UserInfo from './src/screen/auth/UserInfo';
import SelecAdress from './src/screen/SelecAdress';
import WebViewUrl from './src/screen/WebViewUrl';
import AllCollection from './src/screen/AllCollection';
import FilterIndex from './src/screen/filter/FilterIndex';
import OTPForgetPassword from './src/screen/auth/OTPForgetPassword';
import ResetPassword from './src/screen/auth/ResetPassword';

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
  // const dispatch = useDispatch()

  // console.log(setAuth,"set")

  function confirm(message) {
    return new Promise((resolve) => {
      if (confirmDialogSupported()) {
        resolve(window.confirm(message));
      } else {
        resolve(alert(message));
      }
    });
  }

  function confirmDialogSupported() {
    return window.confirm && typeof window.confirm === 'function';
  }
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const config = {
    animation: 'spring',
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
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerMode: 'screen',
          }}
        >
          {/* <Stack.Screen name="search" component={Search} /> */}
          {/* I am trying to fixed the git issues */}
          {/* <Stack.Screen name="confirm-order" component={ConfirmOrder} /> */}
          

          <Stack.Screen name="tab" component={TabScreen} />
          <Stack.Screen name="cart" component={Cart} />
          <Stack.Screen name="confirm-order" component={ConfirmOrder} />
          <Stack.Screen name="cart-information" component={CustomerDetails} />
          <Stack.Screen name="select-address" component={SelecAdress} />

          <Stack.Screen name="product-details" component={ProductDetails} />
          <Stack.Screen name="all-collection" component={AllCollection} />
          <Stack.Screen name="otp_verify" component={OTPVerification} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="checkout" component={Checkout} />
          {/* <Stack.Screen name="login" component={Login} /> */}
          <Stack.Screen name="signup" component={SiginUp} />
        
          <Stack.Screen name="nid_verify" component={NidVerify} />
          {/* <Stack.Screen name="user_info" component={SellerRegister} /> */}
          <Stack.Screen name="search" component={Search} />
          <Stack.Screen name="products-filter" component={ProductList} />
          <Stack.Screen name="send" component={WebViewUrl} />
          <Stack.Screen name="forget_password" component={ForgetPassword} />
          <Stack.Screen name="filter" component={FilterIndex} />

          <Stack.Screen name="reset_password" component={ResetPassword} />
          <Stack.Screen name="user_info" component={UserInfo} />
          <Stack.Screen
            name="otp_forget_password"
            component={OTPForgetPassword}
          />
        </Stack.Navigator>

        {/* <StatusBar style="auto" /> */}
      </NavigationContainer>

      <FlashMessage position={'bottom'} />
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
