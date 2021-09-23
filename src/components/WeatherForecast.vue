<template>
  <section class="date">
    <h3 v-for="day in date" :key="day">{{ day }}</h3>
  </section>
  <section class="forecast-daily">
    <div
      class="forecast-daily-detail"
      v-for="forecast in dailyWeather"
      :key="forecast"
    >
      <div class="daily-detail" v-for="week in forecast" :key="week">
        <div class="daily" v-for="day in week" :key="day">
          <span>{{ day.value }}</span>
        </div>
      </div>
    </div>
  </section>
  <WeatherIcon
    :currentWeatherCode="currentWeatherCode"
    :currentWeatherIcon="currentWeatherIcon"
    :weatherDay="weatherDay"
  />
</template>

<script>
import WeatherIcon from "./WeatherIcon.vue";

export default {
  components: { WeatherIcon },
  props: ["dailyWeather", "date", "currentWeatherIcon"],
  setup(props) {},
};
</script>

<style>
</style>