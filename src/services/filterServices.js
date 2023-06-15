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

  // console.log(data,"search api filter")
  return api.get( `search`,{
    // data:{
    //   category_ids:data?.category_ids,
    // },
    
    params:{
      category_slug:data?.category_slug,
      page:data?.page,
      // collection_slug:data?.collection_slug,
      // keyword:data?.keyword,
      // brand_ids:data?.brand_ids,
      category_ids:data?.category_ids,
      // min_price:data?.min_price,
      // max_price:data?.max_price,
      sort_by:"price_high_to_low",
      // color_codes:data?.color_codes,
      // selected_attribute_values:data?.selected_attribute_values
      

    }
  }
    
  );
};

export default filterServices;
