import { Axios } from "./axios.service";

// get weather for a selected city
const getWeather = (city_name) => {
  return Axios.get(`/forecast?q=${city_name.replace("-", " ")}`);
};

export const weatherService = {
  getWeather,
};
