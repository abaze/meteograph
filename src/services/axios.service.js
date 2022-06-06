import axios from "axios";

export const Axios = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5`,
});

// before request sent, we add some other the request params (appid, units, lang...)
Axios.interceptors.request.use(
  (config) => {
    config.params = {
      lang: "en",
      units: "metric", // convert to Celsius degrees
      cnt: 7, // number of hours we want
      appid: process.env.VUE_APP_API_KEY,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
