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
  const dispatch = useDispatch()
  const [topProducts, setTopProducts] = useState([])
  const [summary, setSummary] = useState([])



  // setTimeout(() => {
  //   setLoading(false);
  // }, 1000);
  const fecthTopProducts = async () => {
    const res = await api.get("product-listing-page/products/best-seller")
    setTopProducts(res.data.data)
    // console.log(res.data.data)
  }


  const fetchDashSummary = async () => {
    const res = await api.get("/reseller/dashboard/summary")
    console.log(res.data.data, "dfdkjfk")
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
      try {
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
          else {
            dispatch(setAuth(false));

          }
        }
      } catch (err) {
        console.log(err)
        dispatch(setAuth(false));



      }
      finally {
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
            flexWrap: "wrap",
            gap: 10,

            // backgroundColor: '#EDEDED',
            // borderColor: '#C7C7C7',
            borderRadius: 8, marginTop: 10
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
            height:90,
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
        <View style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',gap:10, borderRadius: 8, marginTop: 10,flexWrap:"wrap"
          }}
        >
{
  summary.map((s,i)=>{
    return <View key={i}
      style={{alignItems: 'center',justifyContent: "center", width: "48%",height: 90, backgroundColor: '#fff', borderRadius: 10 }} >
      <Text style={{fontStyle: 'normal',fontWeight: '400',fontSize: 13,color: '#231F20',}}>
        {s?.title}
      </Text>
      <Text style={{ fontStyle: 'normal',fontWeight: '700', fontSize: 20,  lineHeight: 28,color: '#BE202E'}}>
        {s?.value}
      </Text>
    </View>
  })
}
          {/* <View
            style={{

              alignItems: 'center',
              justifyContent: "center",
              width: "48%",
              height: 90,
              backgroundColor: '#fff',
              borderRadius: 10
            }}
          >
            <Text
              style={{
                // fontFamily: "Gotham",
                fontStyle: 'normal',
                fontWeight: '400',
                // width:100,
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
              {summary[1]?.current_balance}
            </Text>
          </View> */}
        </View>


        {/* statistic */}


<View style={{backgroundColor:"#FFF",marginTop:20,padding:10,borderRadius:10}}>

<View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: scale(15),
          }}
        >
          <TouchableOpacity
          onPress={()=>navigation.navigate("redirectweb",{url:"announcement"})}
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Image source={require('../../assets/icons/product.png')} />
            <Text preset={['p3']} style={{ marginTop: scale(10),textAlign:"center" }}>
              Announcement
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={()=>navigation.navigate("redirectweb",{url:"my-products"})}
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Image source={require('../../assets/icons/product.png')} />
            <Text preset={['p3']} style={{ marginTop: scale(10),textAlign:"center" }}>
              Frequently Ordered
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Image source={require('../../assets/icons/customers.png')} />
            <Text preset={['p3']} style={{ marginTop: scale(10),textAlign:"center" }}>
            Payment
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
              onPress={()=>navigation.navigate("redirectweb",{url:"profile"})}

            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Image source={require('../../assets/icons/earning.png')} />
            <Text preset={['p3']} style={{ marginTop: scale(10),textAlign:"center" }}>
            Profile
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: scale(25),
          }}
        >
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={()=>navigation.navigate("redirectweb",{url:"payments"})}

          >
            <Image source={require('../../assets/icons/product.png')} />
            <Text preset={['p3']} style={{ marginTop: scale(10),width:80,textAlign:"center" }}>
              Payment
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={()=>navigation.navigate("redirectweb",{url:"review"})}

          >
            <Image source={require('../../assets/icons/customers.png')} />
            <Text preset={['p3']} style={{ marginTop: scale(10),textAlign:"center" }}>
              Review
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={()=>navigation.navigate("redirectweb",{url:"support"})}

          >
            <Image source={require('../../assets/icons/earning.png')} />
            <Text preset={['p3']} style={{ marginTop: scale(10),textAlign:"center" }}>
              Ticket
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={()=>navigation.navigate("redirectweb",{url:"orders"})}

          >
            <Image source={require('../../assets/icons/earning.png')} />
            <Text preset={['p3']} style={{ marginTop: scale(10),textAlign:"center" }}>
              Orders
            </Text>
          </TouchableOpacity>
        </View>


</View>




        {/* <Slider /> */}
        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
          <Image
            style={{
              marginTop: 32,
              width: 300,
              height: 100,
              borderRadius:10,
              resizeMode:"contain",
              borderWidth:1,borderColor:"#DDD"
            }}
            source={require('../../assets/img/banner_2.png')}
          />
           <Image
            style={{
              marginTop: 32,
              width: 300,
              height: 100,
              borderRadius:10,
              resizeMode:"contain",
              borderWidth:1,borderColor:"#DDD",
              marginLeft:10
            }}
            source={require('../../assets/img/banner_2.png')}
          />
           <Image
            style={{
              marginTop: 32,
              width: 300,
              height: 100,
              borderRadius:10,
              resizeMode:"contain",
              marginLeft:10,

              borderWidth:1,borderColor:"#DDD"
            }}
            source={require('../../assets/img/banner_2.png')}
          />

        </ScrollView>

        <Text style={{ marginVertical: 20,fontFamily:"RB"}}> Weekly Top Selling</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", alignSelf: "center", alignItems: "center", justifyContent: "center" }}>

          {
            topProducts.map((item, i) => {
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
