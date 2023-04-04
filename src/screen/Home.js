import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, {useState} from "react";
import Mainlayout from "../components/layout/Mainlayout";
import {height, scale} from "../../utils/funtions";
import Slider from "../components/Slider";
import Text from "../components/tags/Text";
import FullScreenLoader from "../components/loader/FullScreenLoader ";

const Home = ({navigation}) => {
  // console.log(navigation, "home navigation");
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  if (loading) {
    return <FullScreenLoader visible={loading} />;
  }
  return (
    <Mainlayout navigation={navigation}>
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: scale(15),
          }}>
          <TouchableOpacity
            style={{justifyContent: "center", alignItems: "center"}}>
            <Image source={require("../../assets/icons/product.png")} />
            <Text preset={["p3"]} style={{marginTop: scale(10)}}>
              My Products
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{justifyContent: "center", alignItems: "center"}}>
            <Image source={require("../../assets/icons/customers.png")} />
            <Text preset={["p3"]} style={{marginTop: scale(10)}}>
              My Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{justifyContent: "center", alignItems: "center"}}>
            <Image source={require("../../assets/icons/earning.png")} />
            <Text preset={["p3"]} style={{marginTop: scale(10)}}>
              My Products
            </Text>
          </TouchableOpacity>
        </View>
        {/* out service */}

        <Slider />
        <View
          style={{
            flexDirection: "row",
            marginTop: scale(20),

            justifyContent: "flex-start",
          }}>
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
        </View>
        {/* new product */}
        <View
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
          }}>
          <Text preset={["p1 bold"]}>New Collections</Text>

          <TouchableOpacity
            style={{
              flexDirection: "row",
            }}>
            <Text preset={["p3"]}>View all</Text>
            <Image
              source={require("../../assets/icons/arrow-right-o.png")}
              style={{marginLeft: scale(10)}}
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
          }}>
          <View
            style={{
              alignItems: "center",
              marginRight: scale(20),
            }}>
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
            }}>
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
            }}>
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
            }}>
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
            }}>
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
        </ScrollView>

        {/* explore all  */}
        <View
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
          }}>
          <Text preset={["p1 bold"]}>New Products</Text>

          <TouchableOpacity style={{flexDirection: "row"}}>
            <Text preset={["p3"]}>Explore all</Text>
            <Image
              source={require("../../assets/icons/arrow-right-o.png")}
              style={{marginLeft: scale(10)}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.products}>
          <View style={styles.product}>
            <Image
              source={require("../../assets/img/shoe1.png")}
              style={{width: "100%", height: scale(100)}}
            />
            <Text preset={["p3"]}>Nike Super Red Shoe for Men</Text>
          </View>
          <View style={styles.product}>
            <Image
              source={require("../../assets/img/sunglass.png")}
              style={{width: "100%", height: scale(100)}}
            />
            <Text preset={["p3"]}>Nike Super Red Shoe for Men</Text>
          </View>
          <View style={styles.product}>
            <Image
              source={require("../../assets/img/redShoe.png")}
              style={{width: "100%", height: scale(100)}}
            />
            <Text preset={["p3"]}>Nike Super Red Shoe for Men</Text>
          </View>
          <View style={styles.product}>
            <Image
              source={require("../../assets/img/watch.png")}
              style={{width: "100%", height: scale(100)}}
            />
            <Text preset={["p3"]}>Nike Super Red Shoe for Men</Text>
          </View>
          <View style={styles.product}>
            <Image
              source={require("../../assets/img/headphone.png")}
              style={{width: "100%", height: scale(100)}}
            />
            <Text preset={["p3"]}>Nike Super Red Shoe for Men</Text>
          </View>
          <View style={styles.product}>
            <Image
              source={require("../../assets/img/camera.png")}
              style={{width: "100%", height: scale(100)}}
            />
            <Text preset={["p3"]}>Nike Super Red Shoe for Men</Text>
          </View>
        </View>
        <View style={{height: scale(300)}}></View>
      </ScrollView>
    </Mainlayout>
  );
};

export default Home;

const styles = StyleSheet.create({
  products: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    padding: scale(5),
    borderTopWidth: 0,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  product: {
    width: scale(100),
    marginBottom: scale(15),
  },
});
