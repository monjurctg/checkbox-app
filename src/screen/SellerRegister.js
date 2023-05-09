import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import InputLayout from '../components/layout/InputLayout'
import InputTestCustom from '../components/Input/InputTestCustom'
import { height, scale, width } from '../../utils/funtions'

const SellerRegister = () => {
    const [shopName, setShopName] = useState("")
    const [phone, setPhone] = useState("")
    const[email,setEmail]=useState("")
    const [gender, setGender] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    

    return (
        <InputLayout>
            <View style={{ marginVertical: 20 }}>
                <Text style={{ fontSize: 24, lineHeight: 24, fontWeight: "700", textAlign: "center" }}>Shop Information</Text>
               
            </View>
            <InputTestCustom  placeholder={"Shop Name"} label={"Shop Name"} value={shopName} onChange={(text) => setShopName(text)} />
                        <InputTestCustom placeholder={"Email"} label={"Email*"} value={email} onChange={(text) => setEmail(text)} />

            <InputTestCustom placeholder={"Phone Nmuber"} label={"Phone Number"} value={phone} onChange={(text) => setPhone(text)} />
            {/* <InputTestCustom placeholder={"Phone Nmuber"} label={"Phone Number*"} value={phone} onChange={(text) => setPhone(text)} /> */}
            <InputTestCustom type={"password"} placeholder={"Password"} label={"Password "} value={password} onChange={(text) => setPassword(text)} />
            <InputTestCustom type={"password"} placeholder={"Confirm Password"} label={"ConfirmPassword "} value={confirmPassword} onChange={(text) => setConfirmPassword(text)} />

            <InputTestCustom type={"dropdown"} option={["Male","Female"]}  label={"Gender"} value={gender} onChange={(text) => setGender(text)} />


            <TouchableOpacity style={{ backgroundColor: "#BE202E", height: 52, justifyContent: "center", alignItems: "center", marginTop: 10, width: scale(320) }}>
                <Text style={{ fontSize: 18, fontWeight: "400", color: "#FFFFFF" }}>Next</Text>
            </TouchableOpacity>

          

        </InputLayout>
    )
}

export default SellerRegister

const styles = StyleSheet.create({})