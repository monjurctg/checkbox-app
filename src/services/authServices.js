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

authServices.resendCode = async (data) => {
  const url = "/auth/resend_code";
  return await api
    .post(url, data)
    .then((res) => res)
    .catch((err) => err.response.data);
  // console.log(res,"res")
};

authServices.addShopInfo = async (data) => {
  const url = "/auth/add-shop-information";
  return await api
    .post(url, data)
    .then((res) => res)
    .catch((err) => err.response.data);
  // console.log(res,"res")
};
authServices.addShop = async (data) => {
  let url = "auth/add-shop-information";
  // console.log(data, "data from authservice addshop");
  let res = await api
    .post(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err.code, "error");
      return err;
    });
  // console.log("res", res);
  return res;
};
authServices.nidVerify = (data) => {
  let url = "auth/add-personal-information";
  let res = api
    .post(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => err.response);

  return res;
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
authServices.getDistricts = async () => {
  let url = "get-districts";
  let res = await api.get(url);

  return res;
};

authServices.getThanas = async (district_id) => {
  let url = "get-areas?district_id=" + district_id;
  let res = await api
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
  return res.data;
};

authServices.sendForgetPasswordOtp = (data) => {
  // console.log('data', data)
  let url = "/auth/password/forget_request";
  let res = api
    .post(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
  return res;
};

authServices.reSendPasswordOtp = (data) => {
  let url = "auth/password/resend_code";
  let res = api
    .post(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });

  return res;
};

authServices.getCarousel = () => {
  let url = "/website-testimonials";
  let res = api
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
  return res;
};

authServices.resetForgetPassword = (data) => {
  //console.log("data", data);
  let url = "/auth/password/confirm_reset";
  let res = api
    .post(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
  return res;
};

export default authServices;
