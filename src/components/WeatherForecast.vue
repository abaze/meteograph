<template>
  <v-container fluid px-6>
    <v-row>
      <v-col cols="12" md="4" offset-md="4">
        <v-select
          v-model="selectedSeries"
          :items="series"
          item-text="label"
          item-value="id"
          return-object
          label="Select the data to show"
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row
      ><v-col
        ><highcharts
          v-if="chartOptions"
          :options="chartOptions"
        ></highcharts></v-col
    ></v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import cities from "@/store/modules/cities";
import { Chart } from "highcharts-vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      series: [
        { id: "temp", label: "Temperatures (°C)" },
        { id: "temp_min", label: "Temperatures min (°C)" },
        { id: "temp_max", label: "Temperatures max (°C)" },
        { id: "humidity", label: "Humidity (%)" },
      ],
      selectedSeries: { id: "temp", label: "Températures (°C)" },
    };
  },
  computed: {
    ...mapState({
      cities: (state) => state.cities.selected_cities,
      isStoreReady: (state) => state.cities.isStoreReady,
    }),
    ...mapGetters({
      xAxisCategories: "cities/getXAxisCategories",
      getSeriesData: "cities/getSeriesData",
    }),
    // update chart options with a computed
    chartOptions() {
      const title = { text: "" /*this.selectedSeries?.label*/ };

      // get series data with the getter 'getSeriesData' params (id of city, id of series)
      const series = this.cities.map((data) => {
        const data_weather = this.getSeriesData(
          data.city.id,
          this.selectedSeries.id
        );
        // the returned {name, data}
        return {
          name: data.city.label,
          data: data_weather,
        };
      });
      // labels of the x axis
      const xAxis = {
        categories: this.xAxisCategories,
      };
      // label of the y axis
      const yAxis = {
        title: { text: this.selectedSeries?.label },
      };
      // we returned labels of x/y axis and the datas
      return {
        title,
        xAxis,
        yAxis,
        series,
      };
    },
  },
};
</script>
