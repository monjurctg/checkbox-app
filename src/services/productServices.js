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
productServices.productList = (page) => {
  let url = `products/all?page=${page}`;
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

export default productServices;
