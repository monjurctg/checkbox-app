import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import InputLayout from '../components/layout/InputLayout'
import InputTestCustom from '../components/Input/InputTestCustom'
import { height, scale, width } from '../../utils/funtions'

const SiginUp = () => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [option, setOption] = useState("")
    const [date, setDate] = useState()

    return (
        <InputLayout>
            <View style={{ marginVertical: 20 }}>
                <Text style={{ fontSize: 24, lineHeight: 24, fontWeight: "700", textAlign: "center" }}>Sign Up</Text>
                <Text style={{ fontSize: 16, lineHeight: 24, fontWeight: "400", textAlign: "center" }}> Lorem ipsum dolor sit amet adipiscing elit.</Text>
            </View>
            <InputTestCustom  placeholder={"Name"} label={"Name"} value={name} onChange={(text) => setName(text)} />
            <InputTestCustom placeholder={"Phone Nmuber"} label={"Phone Number"} value={phone} onChange={(text) => setPhone(text)} />
            {/* <InputTestCustom placeholder={"Name"} label={"Name*"} value={name} onChange={(text) => setName(text)} /> */}
            {/* <InputTestCustom placeholder={"Phone Nmuber"} label={"Phone Number*"} value={phone} onChange={(text) => setPhone(text)} /> */}
            <InputTestCustom type={"date"}  label={"Select Date"} value={date} onChange={(text) => setDate(text)} />

            <InputTestCustom type={"dropdown"} option={["True","False"]}  label={"User Type"} value={option} onChange={(text) => setOption(text)} />


            <TouchableOpacity style={{ backgroundColor: "#BE202E", height: 52, justifyContent: "center", alignItems: "center", marginTop: 10, width: scale(320) }}>
                <Text style={{ fontSize: 18, fontWeight: "400", color: "#FFFFFF" }}>Sign Up</Text>
            </TouchableOpacity>

           <View style={{flexDirection:"row",justifyContent:"center",marginTop:20}}>
           <Text >Already have an Account?</Text>
            <TouchableOpacity><Text>Log In</Text></TouchableOpacity>
           </View>

        </InputLayout>
    )
}

export default SiginUp

const styles = StyleSheet.create({})