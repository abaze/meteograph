import Vue from "vue";
import Vuex from "vuex";

import citiesModule from "./modules/cities";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cities: citiesModule,
  },
});
