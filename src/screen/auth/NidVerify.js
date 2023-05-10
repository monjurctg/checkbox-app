import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import InputLayout from '../../components/layout/InputLayout'
import InputTestCustom from '../../components/Input/InputTestCustom'
import { height, scale, width } from '../../../utils/funtions'
import { showMessage } from 'react-native-flash-message'
import authServices from '../../services/authServices'

const NidVerify = ({route,navigation}) => {
    // const [name, setName] = useState("")
    // const [phone, setPhone] = useState("")
    // const [option, setOption] = useState("")
    const [date, setDate] = useState()
    const[nid_number ,setNid]=useState("")
    const [loading,setLoading]=useState(false)

    const {dob,is_seller,name,phone} = route.params;
    // console.log(data,"data nid")



    const handleVerifyNid = async()=>{
        if(!nid_number){
            showMessage({
            
                style:{alignItems:"center"},
                message: "NID field required ",
                type: "danger",
                position:"top",
                // icon:"danger",
                
            
                statusBarHeight:scale(20)  
              });
        }

        let data = {
            dob,phone,name,nid_number

        }
        setLoading(true)

        const res = await authServices.verifyNid(data).then(res=>res).catch(err=>err)
        if(res.status===200){
        setLoading(false)

            navigation.navigate("user_info",{phone})
            showMessage({
            
                style:{alignItems:"center"},
                message: "NID verify successfully ",
                type: "success",
                position:"top",
                icon:"success",
                statusBarHeight:scale(20)  
              });
        }
        else{
        setLoading(false)
        console.log(res.message,"nid data res")

        showMessage({
            
            style:{alignItems:"center"},
            message: res.message?res.message:"Not verified try again",
            type: "danger",
            position:"top",
            icon:"danger",
            statusBarHeight:scale(20)  
          });


        }

         
    }

    return (
        <InputLayout>
            <View style={{ marginVertical: 20 }}>
                <Text style={{ fontSize: 24, lineHeight: 24, fontWeight: "700", textAlign: "center" }}>NID Verification</Text>
               
            </View>
            <InputTestCustom  placeholder={"Name"} label={"Name"} value={name} onChange={(text) => setName(text)} />
            <InputTestCustom placeholder={"Phone Nmuber"} label={"Phone"} value={phone} onChange={(text) => setPhone(text)} />
            {/* <InputTestCustom placeholder={"Name"} label={"Name*"} value={name} onChange={(text) => setName(text)} /> */}
            {/* <InputTestCustom placeholder={"Phone Nmuber"} label={"Phone Number*"} value={phone} onChange={(text) => setPhone(text)} /> */}
            <InputTestCustom type={"date"}  label={"Date of Birth"} value={dob} onChange={(text) => setDate(text)} /> 
            <InputTestCustom placeholder={"NID Number"} keyboardType="numeric"  label={"NID Number*"} value={nid_number} onChange={(text) => setNid(text)} />



            <TouchableOpacity  onPress={handleVerifyNid} style={{ backgroundColor: "#BE202E", height: 52, justifyContent: "center", alignItems: "center", marginTop: 10, width: scale(320) }}>
                <Text style={{ fontSize: 18, fontWeight: "400", color: "#FFFFFF" }}>Next</Text>
            </TouchableOpacity>

          
        </InputLayout>
    )
}

export default NidVerify

const styles = StyleSheet.create({})