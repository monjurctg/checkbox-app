import api from "./api";

const filterServices = {};

filterServices.search = (data) => {
  // let data = {
  //     category_slug: "electronic-devices-gadgets",
  //     collection_slug: "",
  //     brand_ids : [1, 4],
  //     category_ids : [5, 308, 302],
  //     min_price : null,
  //     max_price : null,
  //     keyword: "iphone 12 pro max",
  //     sort_by : "price_high_to_low",
  //     color_codes : ["#A52A2A"],
  //     selected_attribute_values: {
  //         "1": ["M", "L"],
  //         "3": ["One"]
  //     }
  // }

  console.log(data,"search api filter")
  return api.request({
    method: 'GET',
    url: `search?page=${data?.page}`,
    data: data,
  });
};

export default filterServices;
