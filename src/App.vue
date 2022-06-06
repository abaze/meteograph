<template>
  <v-app>
    <v-app-bar color="secondary" clipped-left fixed app dark flat>
      <v-toolbar-title>
        <img alt="Granular logo" src="./assets/granular-logo.png" />
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-row>
        <v-col cols="8" md="4" offset="2" offset-md="4">
          <p class="text-center my-12 text-h4">Is it 🌞 today?</p>
          <div class="mt-5"><cities-selector /></div>
        </v-col>
      </v-row>
      <v-row v-if="selected_cities.length"><WeatherForecast /></v-row>
    </v-main>

    <v-footer app>
      <div class="text-center" style="width: 100%">
        Granular Energy &copy; {{ new Date().getFullYear() }}
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import WeatherForecast from "./components/WeatherForecast.vue";
import CitiesSelector from "./components/CitiesSelector.vue";

export default {
  name: "App",
  components: {
    WeatherForecast,
    CitiesSelector,
  },
  computed: {
    ...mapState({
      selected_cities: (state) => state.cities.selected_cities,
    }),
  },
};
</script>

<style lang="scss">
.v-app-bar {
  img {
    max-height: 2.5rem;
    display: block;
  }
}
</style>
