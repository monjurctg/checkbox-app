import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
    baseURL: 'https://phpstack-924353-3259330.cloudwaysapps.com/api/v2',
   
  });
  
  api.defaults.headers["Accept"] = "application/json";
  api.defaults.headers.post["Content-Type"] =
    "multipart/form-data; charset=utf-8";
  api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  api.defaults.headers.common[
    "checkbox-api-v2-key"
  ] = `83324867-6668-4c04-bf36-91714ea8b3e3`;

  // axios.defaults.headers.common[
  //   "Authorization"
  // ] = `Bearer 58|otkRAF3CbkWpLTCei1l0Q1Y5yUCp6W8ezSeazywT`;
  
  // Set up an interceptor to add the token to the request headers
  api.interceptors.request.use(async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = token?`Bearer ${token}`:null;
      }
    } catch (error) {
      console.error('Error retrieving token from AsyncStorage:', error);
    }
    return config;
  });



  


  export default api
  