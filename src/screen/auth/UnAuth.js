import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "../../theme/colors";
import { WebView } from 'react-native-webview';

import Text from "../../components/tags/Text";
import { height, scale, width } from "../../../utils/funtions";
import View from "../../components/tags/View";
// import {CheckboxContext} from "../context/CheckboxProvider";
import FullScreenLoader from "../../components/loader/FullScreenLoader ";
import { CheckboxContext } from "../../context/CheckboxProvider";
import Rating from "../../components/Rating";


const ContactCardSmall = ({ title, des }) => {
  return (
    <View style={styles.contactCard}>
      <Text style={styles.title}>{title}</Text>
      {
        title == "সামাজিক" ? <View style={{flexDirection:"row",marginTop:10}}>
          <TouchableOpacity>
            <Image style={{height:50,width:50,borderRadius:25}} source={{uri:"https://blog.hubspot.com/hubfs/image8-2.jpg"}}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={{height:50,width:50,borderRadius:25}} source={{uri:"https://img.freepik.com/premium-vector/purple-gradiend-social-media-logo_197792-1883.jpg"}}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={{height:50,width:50,borderRadius:25}} source={{uri:"https://img.freepik.com/premium-vector/blue-social-media-logo_197792-1759.jpg"}}/>
          </TouchableOpacity>
        </View> : <Text style={styles.contactAddress}>{des}</Text>
      }

    </View>
  );
};

const UnAuth = ({ navigation }) => {
  // const {setAuth} = useContext(CheckboxContext);
  const [modalShow, setModalShow] = useState(true);
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  if (loading) {
    return <FullScreenLoader visible={loading} />;
  }

  const login = () => {
    // setAuth(true);
    navigation.navigate("login")
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ backgroundColor: "#bd202e", flexDirection: "row", padding: 10, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 16, width: "75%", color: "#FFF", fontFamily: "RR" }}>Join Our Free Training Program for future Resellers</Text>
          <TouchableOpacity style={{ backgroundColor: "#FFF", paddingHorizontal: 10, paddingVertical: 5, height: 30, borderRadius: 20 }}>
            <Text style={{ color: "#000", fontSize: 14, fontFamily: "RR" }}>Get Started</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={{ fontSize: 35, fontWeight: "bold", textAlign: "center" }}>
            বাসায় বসে উপাজন করুন কোন রকম মূলধন ছাড়াই
          </Text>
          <Text style={{ fontSize: 25, textAlign: "center", marginTop: 10 }}>
            হাজার রকম হোলসেল প্রোডাক্ট বিক্রি করুন অনলাইনে ঘরে বসেইই
          </Text>
          <TextInput style={{ marginTop: 10, borderWidth: 1, padding: 15, borderColor: "gray", borderRadius: 10 }} placeholder="আপনার মোবাইল নং দিন" />
          <TouchableOpacity style={{ padding: 15, backgroundColor: "#bd202e", marginTop: 15, justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
            <Text style={{ color: "#FFF" }}>শুরু করুন</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 30, alignSelf: "center" }}>
            <View style={{ flexDirection: "row", gap: -20, alignSelf: "center" }}>
              <Image style={{ height: 60, width: 60, borderRadius: 30 }} source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8&w=1000&q=80" }} />
              <Image style={{ height: 60, width: 60, borderRadius: 30 }} source={{ uri: "https://img.freepik.com/premium-photo/young-caucasian-woman-isolated-white-background-sad-serious-face-feeling-miserable-displeased_1187-215593.jpg" }} />
              <Image style={{ height: 60, width: 60, borderRadius: 30 }} source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8&w=1000&q=80" }} />
              <Image style={{ height: 60, width: 60, borderRadius: 30 }} source={{ uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" }} />


            </View>
            <Text style={{ textAlign: "center", marginTop: 10 }}>4.0</Text>
            <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "center", alignItems: "center" }}>
              <Rating maxStars={5} defaultStars={4} />
              <Text style={{ color: "gray" }}>(১২০+ রিভিউ)</Text>
            </View>

          </View>

          <View style={{ marginTop: 20 }}>
            <WebView
              originWhitelist={['*']}
              style={{ width: '100%', minHeight: 210, alignItems: 'center', backgroundColor: 'transparent' }}
              source={{ html: '<iframe width="1000" height="580" src="https://www.youtube.com/embed/NfIlMOukA90?list=RDNfIlMOukA90" title="কোকিল কণ্ঠে মরমি গজল । Koto Janazar Porechi Namaj । Hujaifa Islam | Bangla Gojol 2020" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' }}
            />
          </View>
          {/* <Text>kdjfkdjkj</Text> */}



          {/*
        <View style={{paddingHorizontal: scale(10)}}>
          <View style={styles.header}>
            <Image
              source={require("../../../assets/img/checkbox-logo.png")}
              style={{width: scale(180), height: scale(30)}}
            />
            <TouchableOpacity style={styles.loginBtn} onPress={login}>
              <Text
                preset={["p3"]}
                style={{textAlign: "center", color: colors.white}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <Image
              style={{width: "100%", marginTop: scale(10), height: scale(140)}}
              source={require("../../../assets/img/banner_1.png")}
            />
            <View style={styles.products}>
              <View style={styles.product}>
                <Image
                  source={require("../../../assets/img/shoe1.png")}
                  style={{width: "100%", height: scale(112)}}
                />
                <Text preset={["p3"]}>Nike Super Red Shoe for Men</Text>
              </View>
              <View style={styles.product}>
                <Image
                  source={require("../../../assets/img/sunglass.png")}
                  style={{width: "100%", height: scale(112)}}
                />
                <Text preset={["p3"]}>Nike Super Red Shoe for Men</Text>
              </View>
              <View style={styles.product}>
                <Image
                  source={require("../../../assets/img/redShoe.png")}
                  style={{width: "100%", height: scale(112)}}
                />
                <Text preset={["p3"]}>Nike Super Red Shoe for Men</Text>
              </View>
              <View style={styles.product}>
                <Image
                  source={require("../../../assets/img/watch.png")}
                  style={{width: "100%", height: scale(112)}}
                />
                <Text preset={["p3"]}>Nike Super Red Shoe for Men</Text>
              </View>
              <View style={styles.product}>
                <Image
                  source={require("../../../assets/img/headphone.png")}
                  style={{width: "100%", height: scale(112)}}
                />
                <Text preset={["p3"]}>Nike Super Red Shoe for Men</Text>
              </View>
              <View style={styles.product}>
                <Image
                  source={require("../../../assets/img/camera.png")}
                  style={{width: "100%", height: scale(112)}}
                />
                <Text preset={["p3"]}>Nike Super Red Shoe for Men</Text>
              </View>
              <Image
                style={{
                  width: "100%",
                  marginTop: scale(20),
                  height: scale(114),
                }}
                source={require("../../../assets/img/map_banner.png")}
              />
            </View>
            <View style={{height: scale(150)}}></View>
          </ScrollView>
        </View> */}
        </View>

      </View>
      <View style={{ padding: 15, marginTop: 40 }}>
        <ContactCardSmall title={"ইমেইল"} des={"Monjur@gmail.com"} />
        <ContactCardSmall title={"ফোন"} des={"01883387384"} />

        <ContactCardSmall title={"সামাজিক"} />

        {/* <ContactCardSmall title={"Email"} des={"Monjur@gmail.com"} /> */}
      </View>
      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
};

export default UnAuth;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "#211f1f",
    height: height,
    width: width,

    // paddingTop: scale(10),
  },
  bodyContainer: {
    // backgroundColor: "#303030",
    marginTop: scale(10),
    paddingVertical: scale(10),
    borderRadius: scale(10),
    alignSelf: "center",
    padding: 20
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center", paddingVertical: 5
  },
  loginBtn: {
    width: scale(100),
    height: scale(30),

    backgroundColor: colors.primary_1,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  products: {
    flexDirection: "row",
    // columnGap: 10,
    rowGap: 20,
    marginTop: scale(20),
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  product: {
    width: scale(105),
  },

  contactCard: {
    alignItems: 'flex-start',
    padding: 32,
    marginVertical: 10,
    boxSizing: 'border-box',
    height: 128,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 12,
  },
  title: {
    // fontFamily: 'DM Sans',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    color: '#323c3e',
    margin: 0,
  },
  contactAddress: {
    alignItems: 'flex-start',
    padding: 0, // You can adjust this based on your design
    margin: 0,
    marginTop:10,
    color: '#000', // Adjust the color as needed
  },
});


