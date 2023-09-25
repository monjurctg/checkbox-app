import api from "./api";

const authServices = {};

authServices.login = async (data) => {
  const url = "/auth/login";
  return await api
    .post(url, data)
    .then((res) => res)
    .catch((err) => err.response.data);
  // console.log(res,"res")
};

authServices.signup = async (data) => {
  const url = "/auth/signup";
  return await api
    .post(url, data)
    .then((res) => res)
    .catch((err) => err.response.data);
  // console.log(res,"res")
};

authServices.confirmCode = async (data) => {
  const url = "/auth/confirm_code";
  return await api
    .post(url, data)
    .then((res) => res)
    .catch((err) => err.response.data);
  // console.log(res,"res")
};

authServices.resendCode = async (data) => {
  const url = "/auth/resend_code";
  return await api
    .post(url, data)
    .then((res) => res)
    .catch((err) => err.response.data);
  // console.log(res,"res")
};

authServices.verifyNid = async (data) => {
  const url = "/auth/verify-nid";
  return await api
    .post(url, data)
    .then((res) => res)
    .catch((err) => err.response.data);
  // console.log(res,"res")
};
authServices.getUserinfo = async () => {
  let url = "auth/user";
  let res = await api
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });

  return res;
};

authServices.addShopInfo = async (data) => {
  const url = "/auth/add-shop-information";
  return await api
    .post(url, data)
    .then((res) => res)
    .catch((err) => err.response.data);
  // console.log(res,"res")
};

authServices.sendForgetPasswordOtp = async (data) => {
  // console.log('data', data)
  const url = "/auth/password/forget_request";
  return await api
    .post(url, data)
    .then((res) => res)
    .catch((err) => err.response.data);
};

authServices.getDistricts = async () => {
  const url = "/get-districts";
  return await api
    .get(url)
    .then((res) => res)
    .catch((err) => err.response.data);
};

authServices.nidVerify = async (data) => {
  let url = "auth/add-personal-information";
  return await api
    .post(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => err.response);
};

authServices.getThanas = async (district_id) => {
  console.log(district_id)
  let url = "get-areas?district_id=" + district_id;
  let res = await api
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
  return res;
};

export default authServices;
