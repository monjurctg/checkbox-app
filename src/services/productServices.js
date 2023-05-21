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

productServices.bestSeller = () => {
  let url = "product-listing-page/products/best-seller";
  return api
    .get(url)
    .then((res) => res)
    .catch((err) => err);
};
productServices.productList = (page) => {
  let url = `products/all?page=${page}`;
  return api
    .get(url)
    .then((res) => res)
    .catch((err) => err);
};

productServices.singleProduct = (productId) => {
  let url = `/products/${productId}`;
  return api
    .get(url)
    .then((res) => res)
    .catch((err) => err);
};

export default productServices;
