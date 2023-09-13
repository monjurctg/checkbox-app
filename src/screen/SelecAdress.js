import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Mainlayout from "../components/layout/Mainlayout";
import authServices from "../services/authServices";
import { colors } from "../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { setSelectDistricts, setThana } from "../redux/reducers/utilsSlice";

const SelecAdress = ({ navigation, route }) => {
  const { from } = route.params;
  const { customerSelectedDistricts, customerSelectedThana } = useSelector(
    (state) => state.utils
  );
  const dispatch = useDispatch();

  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);

  const getDistricsts = () => {
    authServices.getDistricts().then((res) => {
      //   console.log(res.data.data, "data from country");
      setDistricts(res.data.data);
    });
  };
  const getThana = () => {
    authServices.getThanas(customerSelectedDistricts.id).then((res) => {
      //   console.log(res.data, "data from country");
      setThanas(res.data);
    });
  };
  useEffect(() => {
    if (from == "Districts") {
      getDistricsts();
    } else if (from == "Thana") {
      getThana();
    }
  }, []);

  let district = districts.map((c, i) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(setSelectDistricts(c));
          navigation.goBack();
        }}
        key={i}
        style={{
          marginTop: 10,
          paddingHorizontal: 20,
          borderWidth: 1,
          borderColor:
            c == customerSelectedDistricts ? colors.primary_4 : "#Ddd",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "black", fontSize: 16, fontWeight: "500" }}>
          {c?.name}
        </Text>
      </TouchableOpacity>
    );
  });

  let thana = thanas.map((t, i) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(setThana(t));
          navigation.goBack();
        }}
        key={i}
        style={{
          marginTop: 10,
          paddingHorizontal: 20,
          borderWidth: 1,
          borderColor: t == customerSelectedThana ? colors.primary_4 : "#Ddd",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "black", fontSize: 16, fontWeight: "500" }}>
          {t.name}
        </Text>
      </TouchableOpacity>
    );
  });
  return (
    <Mainlayout>
      <Text
        style={{
          marginTop: 20,
          backgroundColor: colors.primary_4,
          padding: 10,
          textAlign: "center",
          color: "#FFF",
          borderRadius: 5,
        }}
      >
        Select {from}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {districts.length > 0 && district}
        {thana}
        <View style={{ height: 300 }}></View>
      </ScrollView>
    </Mainlayout>
  );
};

export default SelecAdress;

const styles = StyleSheet.create({});
