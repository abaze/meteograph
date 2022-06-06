import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import store from "./store/index";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";

Vue.config.productionTip = false;
Vue.use(Vuex);

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
