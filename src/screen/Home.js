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

const Home = ({ navigation }) => {
  // console.log(navigation, "home navigation");
  // navigation.navigate("")
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  // setTimeout(() => {
  //   setLoading(false);
  // }, 1000);

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
  }, []);

  // if (loading) {
  //   return <CategorySkeleton/>;
  // }

  return (
    <Mainlayout navigation={navigation}>
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        {/* statistic */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 18,
            backgroundColor: '#EDEDED',
            borderColor: '#C7C7C7',
            borderRadius: 8,
          }}
        >
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 80,
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
              Delivered
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
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 80,
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
              InProgress
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
              432
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 80,
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
              500
            </Text>
          </View>
        </View>
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
              My Products
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

        {/* out service */}

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
          {/* <View
          style={{
            flexDirection: "row",
            marginTop: scale(20),

            justifyContent: "flex-start",
          }}
        >
          <Image
            source={require("../../assets/img/fifty.png")}
            style={{
              marginRight: scale(10),
              width: scale(100),
              resizeMode: "contain",
            }}
          />
          <Image
            source={require("../../assets/img/special.png")}
            style={{
              marginRight: scale(10),
              width: scale(100),
              resizeMode: "contain",
            }}
          />
          <Image
            source={require("../../assets/img/mega.png")}
            style={{
              marginRight: scale(10),
              width: scale(100),
              resizeMode: "contain",
            }}
          />
        </View> */}
        </View>
        {/* new product */}
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: scale(20),
            borderWidth: 1,
            borderColor: "#E5E5E5",
            height: scale(40),
            alignItems: "center",
            // paddingVertical: scale(8),
            paddingHorizontal: scale(16),
            borderRadius: 5,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <Text preset={["p2 bold"]}>New Collections</Text>

          <TouchableOpacity
            style={{
              flexDirection: "row",
            }}
          >
            <Text preset={["p3 "]}>View all</Text>
            <Image
              source={require("../../assets/icons/arrow-right-o.png")}
              style={{ marginLeft: scale(10) }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            borderWidth: 1,
            borderColor: "#E5E5E5",
            padding: scale(12),
            borderTopWidth: 0,

            // marginTop: scale(15),
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginRight: scale(20),
            }}
          >
            <Image
              source={require("../../assets/img/camera.png")}
              style={{
                width: scale(70),
                height: scale(70),
                resizeMode: "contain",
              }}
            />
            <Text preset={["p3"]}>Camera</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              marginRight: scale(20),
            }}
          >
            <Image
              source={require("../../assets/img/headphone.png")}
              style={{
                width: scale(70),
                height: scale(70),
                resizeMode: "contain",
              }}
            />
            <Text preset={["p3"]}>Head phone</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              marginRight: scale(20),
              width: scale(70),
              height: scale(70),
            }}
          >
            <Image
              source={require("../../assets/img/sunglass.png")}
              style={{
                width: scale(70),
                height: scale(70),
                resizeMode: "contain",
              }}
            />
            <Text preset={["p3"]}>Sun Glass</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              marginRight: scale(20),
              width: scale(70),
              height: scale(70),
            }}
          >
            <Image
              source={require("../../assets/img/redShoe.png")}
              style={{
                width: scale(70),
                height: scale(70),
                resizeMode: "contain",
              }}
            />
            <Text preset={["p3"]}>Red shoe</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              marginRight: scale(20),
              width: scale(70),
              height: scale(70),
            }}
          >
            <Image
              source={require("../../assets/img/shoe1.png")}
              style={{
                width: scale(70),
                height: scale(70),
                resizeMode: "contain",
              }}
            />
            <Text preset={["p3"]}> shoe</Text>
          </View>
        </ScrollView> */}

        {/* explore all  */}
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: scale(20),
            borderWidth: 1,
            borderColor: "#E5E5E5",
            height: scale(40),
            alignItems: "center",
            // paddingVertical: scale(8),
            paddingHorizontal: scale(16),
            borderRadius: 5,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <Text preset={["p2 bold"]}>Categories</Text>

          
        </View> */}
        {loading && <CategorySkeleton />}
        {/* <View style={styles.products}>
          {
            categories.map((cate,index)=>{
              return<TouchableOpacity key={index} style={styles.product}>
              <Image
                source={require("../../assets/img/shoe1.png")}
                style={{ width: "100%", height: scale(100) }}
              />
              <Text preset={["p3 lh_14"]}>{cate.name}</Text>
            </TouchableOpacity>
            })
          }
          
       
         
        </View> */}
        <Categories
          title={'Categories'}
          onCategoryPress={onCategoryPress}
          data={categories}
        />
        <View style={{ height: scale(300) }}></View>
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
