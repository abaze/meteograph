import { weatherService } from "@/services";

export default {
  namespaced: true,

  state() {
    return {
      selected_cities: [],
      isStoreReady: false,
    };
  },

  // MUTATIONS
  mutations: {
    // Set seletected_cities
    SET_SELECTED_CITIES(state, cities) {
      state.selected_cities = cities;
    },
    // Set isStoreReady (true/false)
    SET_STORE_READY(state, bool) {
      state.isStoreReady = bool;
    },
  },

  // ACTIONS
  actions: {
    // function to add a selected city to the store and add api weather for each city
    async setSelectedCities({ commit }, cities) {
      // we notify that the store is not yet ready
      commit("SET_STORE_READY", false);

      // array of the selected cities
      const selected_cities = [];

      // for each city, we'll get weather data from api
      cities.forEach(async (city) => {
        // get weather data api for each city
        const res = await weatherService.getWeather(city.id);
        const lists = res.data.list;
        const weather = lists.map((list) => {
          return {
            date: list.dt_txt,
            main: list.main,
          };
        });
        // push each data into the selected cities's array
        selected_cities.push({
          city,
          weather,
        });
      });
      // set cities into the store
      commit("SET_SELECTED_CITIES", selected_cities);

      // notify that the store is ready to use
      commit("SET_STORE_READY", true);
    },
  },

  /* GETTERS */
  getters: {
    // return the x axis labels (in this case, we show hours from the returned date)
    getXAxisCategories: (state) => {
      // when store is ready
      if (state.isStoreReady) {
        // we returned an array of all hours from the returned date
        return state.selected_cities.map((city) => {
          if (city.weather) {
            return city.weather.map((day) => {
              // each date is formated to extract a 2 digits hours:minutes (fixed to 00 min)
              return new Date(day.date)
                .getHours()
                .toString()
                .padStart(2, "0")
                .concat(":00");
            });
          } else {
            return [];
          }
        })[0];
      }
    },
    // return the view data (one of temp, min_temp, max_temp, humidity) of a city
    getSeriesData: (state) => (id, view) => {
      // when store is ready
      if (state.isStoreReady) {
        // we return datas for the city and view specified in params (ex : ('paris', 'humidity'))
        return state.selected_cities
          .find((data) => data.city.id === id)
          .weather.map((day) => {
            if (day) {
              return day.main[view];
            } else {
              return [];
            }
          });
      }
    },
  },
};
