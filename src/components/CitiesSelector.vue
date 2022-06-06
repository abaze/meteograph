<template>
  <div>
    <v-select
      v-model="selected_cities"
      :items="cities"
      item-text="label"
      item-value="id"
      label="Select one or severals cities"
      multiple
      chips
      return-object
      outlined
    ></v-select>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      data: [
        { label: "Paris", id: "paris" },
        { label: "London", id: "london" },
        { label: "Madrid", id: "madrid" },
        { label: "Rome", id: "rome" },
        { label: "Berlin", id: "berlin" },
        { label: "Washington D.C", id: "washington" },
        { label: "Buenos Aires", id: "buenos-aires" },
        { label: "Bangkok", id: "bangkok" },
        { label: "Cape Town", id: "cape-town" },
        { label: "Wellington", id: "wellington" },
      ],
      selected_cities: [],
    };
  },
  methods: {
    ...mapActions({
      setSelectedCities: "cities/setSelectedCities",
    }),
  },
  computed: {
    ...mapState({
      stored_cities: (state) => state.cities.selected_cities,
    }),
    cities() {
      // ordered cities in the select input
      // slice() to clone this.data and avoid direct mutate of data
      return this.data.slice().sort((a, b) => a.label.localeCompare(b.label));
    },
  },
  watch: {
    // once we selected a city, we stored all the data (id, label, weather data from api)
    selected_cities: {
      handler(value) {
        this.setSelectedCities(value);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
