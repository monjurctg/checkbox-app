import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Mainlayout from '../components/layout/Mainlayout';
import { height, scale } from '../../utils/funtions';
import Slider from '../components/Slider';
import Text from '../components/tags/Text';
import productServices from '../services/productServices';
import CategorySkeleton from '../components/loader/CategorySkeleton';
import Categories from '../components/products/Categories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setAuth, setUser } from '../redux/reducers/authSlice';
import authServices from '../services/authServices';
import axios from 'axios';
import api from '../services/api';
import SingleProduct from '../components/products/SingleProduct';
import { setTabShow } from '../redux/reducers/utilsSlice';

const Home = ({ navigation }) => {
  // console.log(navigation, "home navigation");
  // navigation.navigate("")
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch=useDispatch()
  const [topProducts,setTopProducts]=useState([])
  const[summary,setSummary]=useState([])
 

  
  // setTimeout(() => {
  //   setLoading(false);
  // }, 1000);
const fecthTopProducts = async()=>{
  const res =await api.get("product-listing-page/products/best-seller")
  setTopProducts(res.data.data)
  // console.log(res.data.data)
}


const fetchDashSummary = async()=>{
  const res = await api.get("/reseller/dashboard/summary")
  console.log(res.data.data,"dfdkjfk")
  setSummary(res.data.data)
}
  const allCategories = () => {
    productServices
      .getAllCategories()
      .then((res) => {
        // console.log(res.data, "res from api categoried");
        if (res.status == 200) {
          setCategories(res.data.data);
          // console.log(res.data.data)
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err, "error from api categoried");
      });
  };

  const onCategoryPress = (slug) => {
    // alert(slug)
    navigation.navigate('filter', { data: { category_slug: slug } });
  };

  useEffect(() => {
    allCategories();
    fecthTopProducts()
    dispatch(setTabShow(true))
    fetchDashSummary()
  }, []);
  useEffect(() => {
    const checkToken = async () => {
      // setLoading(true);
     try{
      const token = await AsyncStorage.getItem("token");
      // console.log(token)
      if (token) {
        const res = await authServices.getUserinfo();
        // console.log(res.data,"fjdjf")
        if (res.status == 200) {
         
          dispatch(setUser(res.data.data));
          dispatch(setAuth(true));
          // setLoading(false);
        } 
      }
     }catch(err){
      console.log(err)
      

     }
     finally{
      setLoading(false);
     }
    };
    checkToken();
  }, []);

  
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // fetchSingCart();
    dispatch(setTabShow(true))


    });
    return unsubscribe;
  }, [navigation]);


  // if (loading) {
  //   return <CategorySkeleton/>;
  // }
  // console.log(summary[0]?.all_orders_count )

  return (
    <Mainlayout navigation={navigation}>
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
      <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap:"wrap",
            gap:10,
           
            // backgroundColor: '#EDEDED',
            // borderColor: '#C7C7C7',
            borderRadius: 8,marginTop:10
          }}
        >
          
          
         
       {/* {
        summary.map((sum,i)=>{
          return   <View key={i}
            style={{
              flexDirection:"row",
              justifyContent: "space-around",
              alignItems: 'center',
              width: "48%",
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingVertical: 18,
            height:100,
            borderRadius:10
            // gap:10

            }}
          >
            <Text
              style={{
                // fontFamily: "Gotham",
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 16,
                color: '#231F20',
                marginBottom: 8,
                width:100
              }}
            >
              Current Balance
            </Text>
            <Text
              style={{
                // fontFamily: "Gotham",
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: 24,
                lineHeight: 28,
                color: '#BE202E',
              }}
            >
              500
            </Text>
          </View>
        })
       } */}
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          
            // backgroundColor: '#EDEDED',
            // borderColor: '#C7C7C7',
            borderRadius: 8,marginTop:10
          }}
        >
         
          <View
            style={{
              display: 'flex',
              flexDirection:"row",
              
              justifyContent: "space-between",
              alignItems: 'center',
              width: "48%",
              height:100,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingVertical: 18,
            borderRadius:10
            }}
          >
            <Text
              style={{
                // fontFamily: "Gotham",
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 16,
                color: '#231F20',
                marginBottom: 8,
                width:100
              }}
            >
              Total Orders
            </Text>
            <Text
              style={{
                // fontFamily: "Gotham",
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: 20,
                lineHeight: 28,
                color: '#BE202E',
              }}
            >
         {  summary[0]?.all_orders_count}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection:"row",
              
              justifyContent: "space-between",
              alignItems: 'center',
              width: "48%",
              height:100,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingVertical: 18,
            borderRadius:10
            }}
          >
            <Text
              style={{
                // fontFamily: "Gotham",
                fontStyle: 'normal',
                fontWeight: '400',
                width:100,
                fontSize: 14,
                // lineHeight: 16,
                color: '#231F20',
                marginBottom: 8,
              }}
            >
              Current Balance
            </Text>
            <Text
              style={{
                // fontFamily: "Gotham",
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: 20,
                lineHeight: 28,
                color: '#BE202E',
              }}
            >
         {  summary[1]?.current_balance}
            </Text>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          
            // backgroundColor: '#EDEDED',
            // borderColor: '#C7C7C7',
            borderRadius: 8,marginTop:10
          }}
        >
         
          <View
            style={{
              display: 'flex',
              flexDirection:"row",
              
              justifyContent: "space-between",
              alignItems: 'center',
              width: "48%",
              height:100,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingVertical: 18,
            borderRadius:10
            }}
          >
            <Text
              style={{
                // fontFamily: "Gotham",
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 16,
                color: '#231F20',
                marginBottom: 8,
                width:100
              }}
            >
              
              Last Payment Amount
            </Text>
            <Text
              style={{
                // fontFamily: "Gotham",
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: 24,
                lineHeight: 28,
                color: '#BE202E',
              }}
            >
            {  summary[2]?.last_payment_amount}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection:"row",
              
              justifyContent: "space-between",
              alignItems: 'center',
              width: "48%",
              height:100,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingVertical: 18,
            borderRadius:10
            }}
          >
            <Text
              style={{
                // fontFamily: "Gotham",
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 16,
                color: '#231F20',
                marginBottom: 8,
              }}
            >
              Delivered Orders
            </Text>
            <Text
              style={{
                // fontFamily: "Gotham",
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: 24,
                lineHeight: 28,
                color: '#BE202E',
              }}
            >
              {  summary[3]?.delivered_orders}
            </Text>
          </View>
        </View>

      <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
           
            borderRadius: 8,
            marginTop:20
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection:"row",
              
              justifyContent: "space-between",
              alignItems: 'center',
              width: "48%",
              height:100,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingVertical: 18,
            borderRadius:10
            }}
          >
            <Text
              style={{
                fontFamily: "RB",
                // fontStyle: 'normal',
                // fontWeight: '400',
              
                fontSize: 14,
                lineHeight: 16,
                color: '#231F20',
                marginBottom: 8,
              }}
            >
              In-transit
            </Text>
            <Text
              style={{
                // fontFamily: "Gotham",
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: 24,
                lineHeight: 28,
                color: '#BE202E',
              }}
            >
             {  summary[4]?.in_transit_orders}
            </Text>
          </View>
         
          <View
            style={{
              display: 'flex',
              flexDirection:"row",
              
              justifyContent: "space-between",
              alignItems: 'center',
              width: "48%",
              height:100,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingVertical: 18,
            borderRadius:10
            }}
          >
            <Text
              style={{
                // fontFamily: "Gotham",
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 16,
                color: '#231F20',
                marginBottom: 8,
              }}
            >
              Returned
            </Text>
            <Text
              style={{
                // fontFamily: "Gotham",
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: 24,
                lineHeight: 28,
                color: '#BE202E',
              }}
            >
             {  summary[5]?.returned_orders}
              
            </Text>
          </View>
        </View>
        {/* statistic */}
       
     

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: scale(15),
          }}
        >
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Image source={require('../../assets/icons/product.png')} />
            <Text preset={['p3']} style={{ marginTop: scale(10) }}>
            Frequently Ordered
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Image source={require('../../assets/icons/customers.png')} />
            <Text preset={['p3']} style={{ marginTop: scale(10) }}>
              My Orders
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Image source={require('../../assets/icons/earning.png')} />
            <Text preset={['p3']} style={{ marginTop: scale(10) }}>
              My Earnings
            </Text>
          </TouchableOpacity>
        </View>

 

        {/* <Slider /> */}
        <View>
          <Image
            style={{
              marginTop: 32,
              width: '100%',
              height: 80,
            }}
            source={require('../../assets/img/banner_2.png')}
          />
         
        </View>
        
        <Text style={{marginTop:10}}>Top Products</Text>
      <View style={{flexDirection:"row",flexWrap:"wrap",alignSelf:"center",alignItems:"center",justifyContent:"center"}}>

      {
          topProducts.map((item,i)=>{
            return <SingleProduct
            key={i}
            id={item?.id}
            from={"home"}
            navigation={navigation}
            name={item?.name}
            src={item.thumbnail_image}
            // toggleBottomNavigationView={onBottomSheetOpen}
            // visible={visible}
            price={item?.price?.main_price}
            rate={item?.rating?.rating}
            sales={item?.sales}
            item={item}
          />
          })
        }
      </View>
      

       
       
      
       
        
        <View style={{ height: scale(200) }}></View>
      </ScrollView>
    </Mainlayout>
  );
};

export default Home;

const styles = StyleSheet.create({
  products: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    padding: scale(5),
    borderTopWidth: 0,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  product: {
    width: scale(100),
    marginBottom: scale(15),
  },
});
