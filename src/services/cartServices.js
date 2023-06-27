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
  let url = "carts/update-product/" + data?.id;
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
