<template>
  <div class="date" v-for="day in date" :key="day">{{ day }}</div>
  <div
    class="weather-forecast-daily"
    v-for="forecast in dailyWeather"
    :key="forecast"
  >
    <div class="daily-detail" v-for="week in forecast" :key="week">
      <div class="daily" v-for="day in week" :key="day">
        <span>{{ day.value }}</span>
      </div>
    </div>
  </div>
  <WeatherIcon :currentWeatherCode="currentWeatherCode" />
</template>

<script>
import WeatherIcon from "./WeatherIcon.vue";

export default {
  components: { WeatherIcon },
  props: ["dailyWeather", "date", "currentWeatherCode"],
  setup(props) {},
};
</script>

<style>
</style>