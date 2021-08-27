<template>
  <div class="weather">
    <div class="weather-dash">
      <div class="weather-data">
        <span class="weather-icon">{{ currentWeatherData.description }}</span>
        <span class="weather-temp">{{ currentWeatherData.temperature }}</span>
        <span class="weather-degree">°</span>
      </div>
      <div class="weather-location">
        <span>{{ currentWeatherData.locationName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import getWeather from "../composables/getWeather";
export default {
  setup() {
    const { currentWeatherData, getCurrentWeather } = getWeather();
    getCurrentWeather();
    return { currentWeatherData };
  },
};
</script>

<style scoped>
.weather-dash {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
span {
  color: white;
  font-weight: bolder;
}
</style>