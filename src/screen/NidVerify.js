import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import InputLayout from '../components/layout/InputLayout'
import InputTestCustom from '../components/Input/InputTestCustom'
import { height, scale, width } from '../../utils/funtions'

const NidVerify = () => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    // const [option, setOption] = useState("")
    const [date, setDate] = useState()
    const[nid,setNid]=useState("")

    return (
        <InputLayout>
            <View style={{ marginVertical: 20 }}>
                <Text style={{ fontSize: 24, lineHeight: 24, fontWeight: "700", textAlign: "center" }}>NID Verification</Text>
               
            </View>
            <InputTestCustom  placeholder={"Name"} label={"Name"} value={name} onChange={(text) => setName(text)} />
            <InputTestCustom placeholder={"Phone Nmuber"} label={"Phone"} value={phone} onChange={(text) => setPhone(text)} />
            {/* <InputTestCustom placeholder={"Name"} label={"Name*"} value={name} onChange={(text) => setName(text)} /> */}
            {/* <InputTestCustom placeholder={"Phone Nmuber"} label={"Phone Number*"} value={phone} onChange={(text) => setPhone(text)} /> */}
            <InputTestCustom type={"date"}  label={"Date of Birth"} value={date} onChange={(text) => setDate(text)} /> 
            <InputTestCustom placeholder={"NID Number"} label={"NID Number*"} value={nid} onChange={(text) => setNid(text)} />



            <TouchableOpacity style={{ backgroundColor: "#BE202E", height: 52, justifyContent: "center", alignItems: "center", marginTop: 10, width: scale(320) }}>
                <Text style={{ fontSize: 18, fontWeight: "400", color: "#FFFFFF" }}>Next</Text>
            </TouchableOpacity>

          
        </InputLayout>
    )
}

export default NidVerify

const styles = StyleSheet.create({})