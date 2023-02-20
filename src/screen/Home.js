import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Mainlayout from "../components/layout/Mainlayout";
import {height, scale} from "../../utils/funtions";
import Slider from "../components/Slider";
import Text from "../components/tags/Text";

const Home = () => {
  return (
    <Mainlayout>
      <ScrollView style={{}}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: scale(15),
          }}>
          <TouchableOpacity
            style={{justifyContent: "center", alignItems: "center"}}>
            <Image source={require("../../assets/icons/product.png")} />
            <Text preset="p2" style={{marginTop: scale(10)}}>
              My Products
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{justifyContent: "center", alignItems: "center"}}>
            <Image source={require("../../assets/icons/customers.png")} />
            <Text preset="p2" style={{marginTop: scale(10)}}>
              My Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{justifyContent: "center", alignItems: "center"}}>
            <Image source={require("../../assets/icons/earning.png")} />
            <Text preset="p2" style={{marginTop: scale(10)}}>
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
            borderColor: "#CEE3EA",
            height: scale(40),
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 5,
          }}>
          <Text preset="p1" style={{fontWeight: "bold"}}>
            Our service
          </Text>

          <TouchableOpacity style={{flexDirection: "row"}}>
            <Text preset="p2">View all</Text>
            <Image
              source={require("../../assets/icons/arrow-right-o.png")}
              style={{marginLeft: scale(10)}}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginTop: scale(15)}}>
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
            <Text preset="p2">Camera</Text>
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
            <Text preset="p2">Head phone</Text>
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
            <Text preset="p2">Sun Glass</Text>
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
            <Text preset="p2">Red shoe</Text>
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
            <Text preset="p2"> shoe</Text>
          </View>
        </ScrollView>

        {/* explore all  */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: scale(20),
            borderWidth: 1,
            borderColor: "#CEE3EA",
            height: scale(40),
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 5,
          }}>
          <Text preset="p1" style={{fontWeight: "bold"}}>
            Our service
          </Text>

          <TouchableOpacity style={{flexDirection: "row"}}>
            <Text preset="p2">Explore all</Text>
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
              style={{width: "100%", height: scale(112)}}
            />
            <Text preset="p">Nike Super Red Shoe for Men</Text>
          </View>
          <View style={styles.product}>
            <Image
              source={require("../../assets/img/sunglass.png")}
              style={{width: "100%", height: scale(112)}}
            />
            <Text preset="p">Nike Super Red Shoe for Men</Text>
          </View>
          <View style={styles.product}>
            <Image
              source={require("../../assets/img/redShoe.png")}
              style={{width: "100%", height: scale(112)}}
            />
            <Text preset="p">Nike Super Red Shoe for Men</Text>
          </View>
          <View style={styles.product}>
            <Image
              source={require("../../assets/img/watch.png")}
              style={{width: "100%", height: scale(112)}}
            />
            <Text preset="p">Nike Super Red Shoe for Men</Text>
          </View>
          <View style={styles.product}>
            <Image
              source={require("../../assets/img/headphone.png")}
              style={{width: "100%", height: scale(112)}}
            />
            <Text preset="p">Nike Super Red Shoe for Men</Text>
          </View>
          <View style={styles.product}>
            <Image
              source={require("../../assets/img/camera.png")}
              style={{width: "100%", height: scale(112)}}
            />
            <Text preset="p">Nike Super Red Shoe for Men</Text>
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
    columnGap: scale(40),
    marginTop: scale(20),
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  product: {
    width: scale(105),
  },
});
