import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Mainlayout from "../components/layout/Mainlayout";
import {scale} from "../../utils/funtions";

const Home = () => {
  return (
    <Mainlayout>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: scale(15),
          }}>
          <TouchableOpacity
            style={{justifyContent: "center", alignItems: "center"}}>
            <Image source={require("../../assets/icons/product.png")} />
            <Text style={{marginTop: scale(10)}}>My Products</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{justifyContent: "center", alignItems: "center"}}>
            <Image source={require("../../assets/icons/customers.png")} />
            <Text style={{marginTop: scale(10)}}>My Products</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{justifyContent: "center", alignItems: "center"}}>
            <Image source={require("../../assets/icons/earning.png")} />
            <Text style={{marginTop: scale(10)}}>My Products</Text>
          </TouchableOpacity>
        </View>
        {/* out service */}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: scale(15),
              borderWidth: 1,
              borderColor: "#CEE3EA",
              height: scale(40),
              alignItems: "center",
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 5,
            }}>
            <Text>Our service</Text>
            <View style={{flexDirection: "row"}}>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/icons/arrow-left-o.png")}
                  style={{marginRight: scale(20)}}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  source={require("../../assets/icons/arrow-right-o.png")}
                  //   style={{marginRight: scale(10)}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Mainlayout>
  );
};

export default Home;

const styles = StyleSheet.create({});
