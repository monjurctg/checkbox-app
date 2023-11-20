import api from "./api";

const productServices = {};

productServices.getAllCategories = () => {
  const url = "categories/all";
  return api
    .get(url)
    .then((res) => res)
    .catch((err) => err);
};

productServices.productCollection = () => {
  let url = "product-listing-page/collections";
  return api
    .get(url)
    .then((res) => res)
    .catch((err) => err);
};
productServices.topCategories = () => {
  let url = `product-listing-page/categories`;
  // debugger
  const data = api
    .get(url)
    .then((res) => res)
    .catch((err) => err);
  // debugger
  return data;
};
productServices.bestSeller = () => {
  let url = "product-listing-page/products/best-seller";
  return api
    .get(url)
    .then((res) => res)
    .catch((err) => err);
};
productServices.productList = (page,limit) => {
  let url = `products/all?page=${page}&limit=${limit}`;
  return api.get(url);
};

productServices.singleProduct = (productId) => {
  let url = `/products/${productId}`;
  return api
    .get(url)
    .then((res) => res)
    .catch((err) => err);
};
productServices.searchProducts = async (search) => {
  let url = `get-search-suggestions?search=${search}`;
  const data = await api
    .get(url)
    .then((res) => res)
    .catch((err) => err.response);
  return data;
};

productServices.getSearchedProduct = async ( params) => {
  // console.log(params)
  let url = "";
  url = `search`;

  const data = await api
    .get(url,{
      params:params
    })
    .then((res) => res)
    .catch((err) => {
      // console.log(err,"from ai")
    return  err.response
    });
  return data;
};

productServices.getSearchedAttributes = async (params) => {
  // console.log("params", params);
  let url = "";
  url = `search-attributes`;
  const data = await api
    .get(url, { params: params })
    .then((res) => res)
    .catch((err) => err.response);
  return data;
};


productServices.allCollection = async (page,limit) => {
  let url = `collection?page=${page}&limit=${limit}`;
  // debugger
  const data = await api
    .get(url)
    .then((res) => res)
    .catch((err) => err.response);
  // debugger
  return data;
};


productServices.getReviews = (id, page) => {
  let url = `reviews/product/${id}?page_number=${page}`;
  const data = api
    .get(url)
    .then((res) => res.data)
    .catch((err) => err);
  return data;
};

productServices.downloadProductDetails = async (id) => {
  let res = await api
    .get(
      `products/download/${id}`
      //  {
      //   responseType: "blob",
      // }
    )
    .then((res) => res)
    .catch((err) => err.response);
  return res;
};

productServices.downloadProductImages = async (id, path) => {
  let res = await api
    .get(`get-photo`, {
      params: {
        product_id: id,
        url: path,
      },
    })
    .then((res) => res)
    .catch((err) => err.response);
  return res;
};

export default productServices;
