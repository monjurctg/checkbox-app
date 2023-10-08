// import api from "api";

import api from "./api";

const cartServices = {};
cartServices.addProductToCart = (data) => {
  let url = "carts/add-product";
  //   console.log(data,"add producut")
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

cartServices.orderStore = (data) => {
  let url = "order/store";
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

cartServices.getAllCarts = () => {
  let url = "/carts";
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

cartServices.switchCart = (id) => {
  let url = "/carts/switch/" + id;
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

cartServices.getSingleCarts = (id) => {
  // const cartid = JSON.parse(id)
  // console.log(JSON.parse(id),"before api call")
  let url = "/carts/" + JSON.parse(id);
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
cartServices.updateCartBilling = (data) => {
  let url = "carts/update/" + data?.cart_id;
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
cartServices.saveCart = (data) => {
  let url;
  if (data?.id) {
    url = `carts/update/${data?.id}`;
  } else {
    url = "carts/update/1";
  }
  // let url = "carts/save-cart";
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

cartServices.removeProductFromCart = (data) => {
  let url = "carts/remove-product/" + data?.id;
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

cartServices.removeCart = (data) => {
  let url = "carts/delete/" + data?.id;
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

cartServices.updateProductFromCart = (data) => {
  // console.log(data?.id,"id")
  let url = "/carts/update-product/" + data?.id;
  let res = api
    .post(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      // console.log(err, "error frm");
      return err.response;
    });
  return res;
};
cartServices.getCustomer = async () => {
  let url = "/get-customers";
  let res = await api
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
  // console.log("datassss", res);
  return res;
};
cartServices.getOtherFees = (id) => {
  let url = "carts/get-other-fees/" + id;
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

cartServices.orderStore = (data) => {
  let url = "order/store";
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
cartServices.voucherApply = (data) => {
  let url = "coupon-apply";
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

cartServices.payWithSsl = (data) => {
  let url = "sslcommerz/begin";
  Object.keys(data).forEach((key) => {
    if (url.indexOf("?") === -1) {
      url += `?${key}=${data[key]}`;
    } else {
      url += `&${key}=${data[key]}`;
    }
  });

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
cartServices.couponRemove = (data) => {
  let url = "coupon-remove";
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
export default cartServices;
