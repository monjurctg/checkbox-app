import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import InputLayout from '../../components/layout/InputLayout';
import InputTestCustom from '../../components/Input/InputTestCustom';
import { height, scale, width } from '../../../utils/funtions';
import authServices from '../../services/authServices';
import { showMessage } from 'react-native-flash-message';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { setAuth } from '../../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';

const UserInfo = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [shopName, setShopName] = useState('');
  // const [phone, setPhone] = useState("")
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const { phone } = route?.params ?? {};
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [districtList, setDistrictList] = useState([]);
  const [district, setDistrict] = useState('');

  let fetchDistrictList = async () => {
    let res = await authServices.getDistricts();

    if (res?.data?.data) {
      setDistrictList([...res?.data?.data]);
    }
  };

  useEffect(() => {
    fetchDistrictList();
  }, []);

  const checkError = () => {
    if (!name) {
      showMessage({
        style: { alignItems: 'center' },
        message: 'Name is required',
        type: 'danger',
        position: 'top',
        statusBarHeight: scale(20),
      });
      return true;
    } else if (!email) {
      showMessage({
        style: { alignItems: 'center' },
        message: 'Email is required',
        type: 'danger',
        position: 'top',
        duration: 2500,
        statusBarHeight: scale(20),
      });
      return true;
    } else if (!gender) {
      showMessage({
        style: { alignItems: 'center' },
        message: 'Gender is required',
        type: 'danger',
        position: 'top',
        duration: 2500,
        statusBarHeight: scale(20),
      });
      return true;
    } else if (!dob) {
      showMessage({
        style: { alignItems: 'center' },
        message: 'Date of birth is required',
        type: 'danger',
        position: 'top',
        duration: 2500,
        statusBarHeight: scale(20),
      });
      return true;
    } else if (!district) {
      showMessage({
        style: { alignItems: 'center' },
        message: 'District of birth is required',
        type: 'danger',
        position: 'top',
        duration: 2500,
        statusBarHeight: scale(20),
      });
      return true;
    }
  };

  const handleUserInfo = async () => {
    const error = checkError();

    //     district_id: e?.district,
    // gender: e.gender,
    // name: e.name,
    // date_of_birth: dob,
    // phone: registrationData?.phone,
    // email: e.email,

    if (error) return;
    let data = {
      name: name,
      email: email,
      gender: gender,
      date_of_birth: dob,
      phone: phone,
      district_id: district,
    };

    const res = await authServices.nidVerify(data);
    if (res.status === 200) {
      setLoading(false);
      dispatch(setAuth(true));
      await AsyncStorage.setItem('token', res.data?.data?.access_token);

      showMessage({
        style: { alignItems: 'center' },
        message: res?.data?.message || 'api message changed',
        type: 'success',
        position: 'top',
        statusBarHeight: scale(20),
      });
      navigation.navigate('home');
    } else {
      setLoading(false);

      showMessage({
        style: { alignItems: 'center' },
        message: res?.data?.message || 'api message changed',
        type: 'danger',
        position: 'top',
        statusBarHeight: scale(20),
      });
    }
  };

  return (
    <InputLayout>
      <View style={{ marginVertical: scale(20) }}>
        <Text
          style={{
            fontSize: 24,
            lineHeight: 24,
            fontWeight: '700',
            textAlign: 'center',
          }}
        >
          User Info
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputTestCustom
          placeholder={'Name'}
          label={'Name'}
          value={name}
          onChange={(text) => setName(text)}
        />
        <InputTestCustom
          placeholder={'Email'}
          label={'Email'}
          value={email}
          onChange={(text) => setEmail(text)}
        />
        <InputTestCustom
          type={'date'}
          label={'Date of Birth'}
          value={dob}
          editable={true}
          onChange={(text) => setDob(text)}
        />
        <InputTestCustom
          type={'dropdown'}
          option={['male', 'female']}
          label={'Gender'}
          value={gender}
          onChange={(text) => setGender(text)}
        />

        {/* <InputTestCustom
          type={'dropdown'}
          option={['male', 'female']}
          label={'District'}
          value={district}
          onChange={(text) => console.log(text)}
        /> */}
        <View style={styles.container}>
          <Text style={styles.label}>
            <Text style={{ color: 'red' }}>*</Text> Select District:
          </Text>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={district}
              style={{ height: 10, width: 340 }}
              onValueChange={(itemValue, itemIndex) => setDistrict(itemValue)}
              placeholder="Select district"
            >
              {districtList.map((option, index) => (
                <Picker.Item
                  key={index}
                  label={option.name}
                  value={option.id}
                />
              ))}
            </Picker>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleUserInfo}
          style={{
            backgroundColor: '#BE202E',
            height: scale(45),
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            width: scale(320),
          }}
        >
          {loading ? (
            <ActivityIndicator
              color="white"
              size="small"
              style={styles.spinner}
            />
          ) : (
            <Text style={{ fontSize: 18, fontWeight: '400', color: '#FFFFFF' }}>
              Submit
            </Text>
          )}
        </TouchableOpacity>
        <View style={{ height: scale(100) }}></View>
      </ScrollView>
    </InputLayout>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    width: scale(320),
    marginBottom: 8,
  },
  label: {
    fontWeight: '400',
    marginBottom: 4,
    fontSize: 16,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderColor: 'hsla(0,0%,50%,.28)',
    borderWidth: 1,
    height: scale(55),
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 15,
  },
  textInput: {
    flex: 1,
  },
  dropdownValue: {
    flex: 1,
  },
  dropdownContainer: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    // borderWidth: 1,
  },
  option: {
    padding: 8,
    // borderBottomWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    margin: 2,
    borderBottomColor: '#000000',
  },
});
