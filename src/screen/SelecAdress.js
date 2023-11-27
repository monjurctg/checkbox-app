import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import Mainlayout from "../components/layout/Mainlayout";
import authServices from "../services/authServices";
import { colors } from "../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { setSelectDistricts, setThana as setSelectThana, } from "../redux/reducers/utilsSlice";

const SelecAdress = ({ navigation, route }) => {
  const { from } = route.params;
  const { customerSelectedDistricts, customerSelectedThana } = useSelector((state) => state.utils);
  const dispatch = useDispatch();
  const [districts, setDistricts] = useState([]);
  const [filterDistricts, setFilterDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);
  const [filterThans, setFilterThans] = useState([]);
  const [text, onChangeText] = useState("");
  const[loading,setLoading]=useState(true)

  const getDistricsts = () => {
    authServices.getDistricts().then((res) => {
      setDistricts(res.data.data);
      setLoading(false)
      setFilterDistricts(res.data.data);
    });
  };

  const getThana = () => {
    authServices.getThanas(customerSelectedDistricts?.id).then((res) => {
      setThanas(res.data.data);
      setFilterThans(res.data.data);
      setLoading(false)
    });
  };

  useEffect(() => {
    if (from === "Districts") {
      getDistricsts();
    } else if (from === "Thana") {
      getThana();
    }
  }, []);

  const handleSearch = (text) => {
    onChangeText(text);
    if (from === "Districts") {
      const filtered = districts.filter((district) => district?.name?.toLowerCase().includes(text?.toLowerCase()));
      setFilterDistricts(filtered);
    } else if (from === "Thana") {
      const filtered = thanas.filter((thana) => thana?.name.toLowerCase().includes(text.toLowerCase()));
      setFilterThans(filtered);
    }
  };

  const renderDistricts = filterDistricts.map((district, i) => (
    <TouchableOpacity key={i} onPress={() => {
        dispatch(setSelectDistricts(district));
        if (district.name === customerSelectedDistricts?.name) {
          navigation.goBack();
        } else {
          dispatch(setSelectThana({ name: "Select Thana", key: "cc" }));
          navigation.goBack();
        }
      }}
      style={{ marginTop: 10, paddingHorizontal: 20, borderWidth: 1, borderColor: district?.name === customerSelectedDistricts?.name ? colors.primary_4 : "#Ddd", padding: 10, borderRadius: 5, }}>
      <Text style={{ color: "black", fontSize: 16, fontWeight: "500" }}>{district?.name}</Text>
    </TouchableOpacity>
  ));

  const renderThanas = filterThans?.map((thana, i) => (
    <TouchableOpacity key={i} onPress={() => {
        dispatch(setSelectThana(thana));
        navigation.goBack();
      }}
      style={{ marginTop: 10, paddingHorizontal: 20, borderWidth: 1, borderColor: thana?.name === customerSelectedThana?.name ? colors.primary_4 : "#Ddd", padding: 10, borderRadius: 5, }}>
      <Text style={{ color: "black", fontSize: 16, fontWeight: "500" }}>{thana.name}</Text>
    </TouchableOpacity>
  ));

  return (
    <Mainlayout>
      <Text style={{ marginTop: 20, padding: 10, borderRadius: 5, fontSize: 18, fontWeight: "500" }}>
        Select {from}
      </Text>
      <View>
        <TextInput style={{ borderWidth: 1, padding: 10 }}
          value={text}
          placeholder={`Search ${from}`}
          onChangeText={handleSearch}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          loading && <View style={{marginTop:100,justifyContent:"center",alignItems:"center"}}>

            <Text style={{color:colors.primary_1}}>Loading...</Text>
          </View>
        }
        {districts.length > 0 && renderDistricts}
        {thanas.length > 0 && renderThanas}
        <View style={{ height: 300 }}></View>
      </ScrollView>
    </Mainlayout>
  );
};

export default SelecAdress;

const styles = StyleSheet.create({});
