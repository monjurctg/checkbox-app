import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway';

// import {  } from 'expo-status-bar';
// import { Text, View, LogBox, Dimensions, TouchableOpacity, Alert, BackHandler } from 'react-native';

import { Linking, StyleSheet,StatusBar, View, LogBox, Dimensions, TouchableOpacity, Alert, BackHandler  } from 'react-native';
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
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';


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



const { height } = Dimensions.get("screen");
const height_center = height / 2;
const toastConfig = {
	wellcome: () => (

		<View style={{
			minHeight: 200,
			width: '80%',
			backgroundColor: '#fff',
			borderRadius: 10,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 6,
			},
			top: 200,
			shadowOpacity: 2.22,
			shadowRadius: 2.22,
			elevation: 15,
			marginTop: height_center - 140,
			justifyContent: 'center',
			alignItems: 'center',
			padding: 15,
			flex: 1,
			borderColor: 'rgba(0, 0, 0, 0.1)',
		}}>
			<View style={{
				height: 60,
				width: 60,
				backgroundColor: '#154CCB',
				borderWidth: 5,
				borderColor: '#fff',
				borderRadius: 50,
				shadowColor: "#000",

				position: 'absolute',
				justifyContent: 'center',
				alignItems: 'center',
				padding: 10,
				top: -30,
				alignSelf: 'center'
			}}>
				<FontAwesome name="check" size={24} color="#fff" />
			</View>
			<View style={{ width: '100%', padding: 10, alignItems: 'center' }}>
				<View style={{ borderBottomColor: '#eee', borderBottomWidth: 1, width: '100%', alignItems: 'center' }}>
					<Text style={{ color: '#000', fontSize: 16, fontWeight: '600', paddingHorizontal: 10, paddingVertical: 15, textAlign: 'justify' }}>WELLCOME TO</Text>
				</View>
				<Text style={{ flex: 1, fontSize: 22, color: '#154CCB', fontWeight: '700', textAlign: 'center' }}>SELFTECH FAMILY</Text>
			</View>

			<TouchableOpacity
				style={{
					backgroundColor: '#154CCB',
					width: '95%',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 7,
					paddingVertical: 10,
					paddingHorizontal: 20
				}}
				onPress={() => {
					Toast.hide({
						onHide: () => { }
					})
				}}
			>

				<Text style={{ fontWeight: '700', fontSize: 16, color: '#FFF' }}>OK</Text>
			</TouchableOpacity>
		</View>




	),
	success: ({ text1, text2, props }) => (

		<View style={{
			minHeight: 200,
			width: '80%',
			backgroundColor: '#fff',
			borderRadius: 10,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 6,
			},
			top: 200,
			shadowOpacity: 2.22,
			shadowRadius: 2.22,
			elevation: 15,
			//marginTop: height_center - 140,
			justifyContent: 'center',
			alignItems: 'center',
			padding: 15,
			flex: 1,
			borderColor: 'rgba(0, 0, 0, 0.1)',
		}}>
			<View style={{
				height: 60,
				width: 60,
				backgroundColor: '#28E687',
				borderWidth: 5,
				borderColor: '#fff',
				borderRadius: 50,
				shadowColor: "#000",

				position: 'absolute',
				justifyContent: 'center',
				alignItems: 'center',
				padding: 10,
				top: -30,
				alignSelf: 'center'
			}}>
				<FontAwesome name="check" size={24} color="#fff" />
			</View>
			<View style={{ width: '100%', padding: 10, marginTop: 20, alignItems: 'center' }}>
				<View style={{ borderBottomColor: '#eee', borderBottomWidth: 1, width: '100%', alignItems: 'center' }}>
					<Text style={{ flex: 1, fontSize: 24, color: '#28E687', fontWeight: '700' }}>{text1}</Text>
				</View>
				<Text style={{ color: '#000', fontSize: 16, fontWeight: '600', paddingHorizontal: 10, paddingVertical: 15, textAlign: 'center' }}>{text2}</Text>
			</View>

			<TouchableOpacity
				style={{
					backgroundColor: '#28E687',
					width: '95%',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 7,
					paddingVertical: 10,
					paddingHorizontal: 20
				}}
				onPress={() => {
					Toast.hide({
						onHide: () => { }
					})
				}}
			>

				<Text style={{ fontWeight: '700', fontSize: 16, color: '#FFF' }}>OK</Text>
			</TouchableOpacity>
		</View>




	),
	error: ({ text1, text2, props }) => (
		<View style={{
			minHeight: 200,
			width: '80%',
			backgroundColor: '#fff',
			borderRadius: 10,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 6,
			},
			top: 200,
			shadowOpacity: 2.22,
			shadowRadius: 2.22,
			elevation: 15,
			//marginTop: height_center - 140,
			justifyContent: 'center',
			alignItems: 'center',
			padding: 15,
			flex: 1
		}}>
			<View style={{
				height: 60,
				width: 60,
				backgroundColor: '#F54118',
				borderWidth: 5,
				borderColor: '#fff',
				borderRadius: 50,
				shadowColor: "#000",

				position: 'absolute',
				justifyContent: 'center',
				alignItems: 'center',
				padding: 10,
				top: -30,
				alignSelf: 'center'
			}}>
				<FontAwesome name="close" size={24} color="#fff" />
			</View>
			<View style={{ width: '100%', padding: 10, marginTop: 20, alignItems: 'center' }}>
				<View style={{ borderBottomColor: '#eee', borderBottomWidth: 1, width: '100%', alignItems: 'center' }}>
					<Text style={{ flex: 1, fontSize: 24, color: '#F54118', fontWeight: '700' }}>{text1}</Text>
				</View>
				<Text style={{ color: '#000', fontSize: 16, fontWeight: '600', paddingHorizontal: 10, paddingVertical: 15, textAlign: 'center' }}>{text2}</Text>
			</View>

			<TouchableOpacity
				style={{
					backgroundColor: '#F54118',
					width: '95%',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 7,
					paddingVertical: 10,
					paddingHorizontal: 20
				}}
				onPress={() => {
					Toast.hide({
						onHide: () => { }
					})
				}}
			>

				<Text style={{ fontWeight: '700', fontSize: 16, color: '#FFF' }}>CLOSE</Text>
			</TouchableOpacity>

		</View>
	),
	info: ({ text1, text2, props }) => (
		<View style={{
			minHeight: 200,
			width: '80%',
			backgroundColor: '#fff',
			borderRadius: 10,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 6,
			},
			top: 200,
			shadowOpacity: 2.22,
			shadowRadius: 2.22,
			elevation: 15,
			//marginTop: height_center - 140,
			justifyContent: 'center',
			alignItems: 'center',
			padding: 15,
			flex: 1
		}}>
			<View style={{
				height: 60,
				width: 60,
				backgroundColor: '#FEC800',
				borderWidth: 5,
				borderColor: '#fff',
				borderRadius: 50,
				shadowColor: "#000",

				position: 'absolute',
				justifyContent: 'center',
				alignItems: 'center',
				padding: 10,
				top: -30,
				alignSelf: 'center'
			}}>
				<FontAwesome name="info" size={26} color="#fff" />
			</View>
			<View style={{ width: '100%', padding: 10, marginTop: 20, alignItems: 'center' }}>
				<View style={{ borderBottomColor: '#eee', borderBottomWidth: 1, width: '100%', alignItems: 'center' }}>
					<Text style={{ flex: 1, fontSize: 24, color: '#FEC800', fontWeight: '700' }}>{text1}</Text>
				</View>
				<Text style={{ color: '#000', fontSize: 16, fontWeight: '600', paddingHorizontal: 10, paddingVertical: 15, textAlign: 'center' }}>{text2}</Text>
			</View>

			<TouchableOpacity
				style={{
					backgroundColor: '#FEC800',
					width: '95%',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 7,
					paddingVertical: 10,
					paddingHorizontal: 20
				}}
				onPress={() => {
					Toast.hide({
						onHide: () => { }
					})
				}}
			>

				<Text style={{ fontWeight: '700', fontSize: 16, color: '#FFF' }}>CLOSE</Text>
			</TouchableOpacity>

		</View>
	),
	confirm: ({ text1, text2, props }) => (
		<View style={{
			minHeight: 200,
			width: '80%',
			backgroundColor: '#fff',
			borderRadius: 10,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 6,
			},
			top: 200,
			shadowOpacity: 2.22,
			shadowRadius: 2.22,
			elevation: 15,
			//marginTop: height_center - 140,
			justifyContent: 'center',
			alignItems: 'center',
			padding: 15,
			flex: 1
		}}>
			<View style={{
				height: 60,
				width: 60,
				backgroundColor: '#FEC800',
				borderWidth: 5,
				borderColor: '#fff',
				borderRadius: 50,
				shadowColor: "#000",

				position: 'absolute',
				justifyContent: 'center',
				alignItems: 'center',
				padding: 10,
				top: -30,
				alignSelf: 'center'
			}}>
				<FontAwesome name="info" size={26} color="#fff" />
			</View>
			<View style={{ width: '100%', padding: 10, marginTop: 20, alignItems: 'center' }}>
				<View style={{ borderBottomColor: '#eee', borderBottomWidth: 1, width: '100%', alignItems: 'center' }}>
					<Text style={{ flex: 1, fontSize: 24, color: '#FEC800', fontWeight: '700' }}>{text1}</Text>
				</View>
				<Text style={{ fontSize: 16, fontWeight: '600', paddingHorizontal: 10, paddingVertical: 15, textAlign: 'center' }}>{text2}</Text>
			</View>

			<View>
				<TouchableOpacity
					style={{
						backgroundColor: '#FEC800',
						width: '95%',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 7,
						paddingVertical: 10,
						paddingHorizontal: 20
					}}
					onPress={() => {
						Toast.hide({
							onHide: () => { }
						})
					}}
				>

					<Text style={{ fontWeight: '700', fontSize: 16, color: '#FFF' }}>CLOSE</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						backgroundColor: '#28E687',
						width: '95%',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 7,
						paddingVertical: 10,
						paddingHorizontal: 20
					}}
					onPress={() => {

					}}
				>

					<Text style={{ fontWeight: '700', fontSize: 16, color: '#FFF' }}>OK</Text>
				</TouchableOpacity>
			</View>


		</View>
	)
};


export default function App() {

  const [fontsLoaded, error] = useFonts({
    RR: Raleway_400Regular,
    RM: Raleway_600SemiBold,
    RB: Raleway_700Bold
  });

  if (!fontsLoaded) {
    return <Text>Loading..</Text>; // Or render a loading indicator
  }
  // console.log(fontsLoaded,error)



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
    <Provider store={store} >
     

     <StatusBar backgroundColor={"#f2f2f2"} />
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
      <Toast style={{ zIndex: 1000000 }} config={toastConfig} type="wellcome" visibilityTime={1000} autoHide={true}  hide />

      
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
