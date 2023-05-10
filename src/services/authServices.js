import api from "./api"


const authServices = {}


authServices.login =async (data)=>{
    const url = "/auth/login"
    return await  api.post(url,data).then(res=>res).catch(err=>err.response.data)
    // console.log(res,"res")
}

authServices.signup =async (data)=>{
    const url = "/auth/signup"
    return await  api.post(url,data).then(res=>res).catch(err=>err.response.data)
    // console.log(res,"res")
}


authServices.confirmCode =async (data)=>{
    const url = "/auth/confirm_code"
    return await  api.post(url,data).then(res=>res).catch(err=>err.response.data)
    // console.log(res,"res")
}

authServices.resendCode =async (data)=>{
    const url = "/auth/resend_code"
    return await  api.post(url,data).then(res=>res).catch(err=>err.response.data)
    // console.log(res,"res")
}


authServices.resendCode =async (data)=>{
    const url = "/auth/resend_code"
    return await  api.post(url,data).then(res=>res).catch(err=>err.response.data)
    // console.log(res,"res")
}

authServices.verifyNid =async (data)=>{
    const url = "/auth/verify-nid"
    return await  api.post(url,data).then(res=>res).catch(err=>err.response.data)
    // console.log(res,"res")
}

authServices.addShopInfo =async (data)=>{
    const url = "/auth/add-shop-information"
    return await  api.post(url,data).then(res=>res).catch(err=>err.response.data)
    // console.log(res,"res")
}


export default authServices