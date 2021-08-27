<template>
  <div class="weather">
    <div class="weather-dash" @click="handleClick">
      <div class="weather-data">
        <span class="weather-icon">{{ currentWeatherData.description }}</span>
        <span class="weather-temp">{{ currentWeatherData.temperature }}</span>
        <span class="weather-degree">°</span>
      </div>
      <div class="weather-location">
        <span>{{ currentWeatherData.locationName }}</span>
      </div>
    </div>
    <div class="weather-card" v-show="showCard">
      <span>{{ currentWeatherData.locationName }}</span>
      <span class="weather-icon">{{ currentWeatherData.description }}</span>
      <span class="weather-temp">{{ currentWeatherData.temperature }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import getWeather from "../composables/getWeather";
export default {
  setup() {
    const { currentWeatherData, getCurrentWeather } = getWeather();
    const showCard = ref(false);
    const handleClick = () => {
      showCard.value = !showCard.value;
      console.log(
        "🚀 ~ file: Weather.vue ~ line 26 ~ handleClick ~ showCard.value",
        showCard.value
      );
    };
    getCurrentWeather();
    return { currentWeatherData, handleClick, showCard };
  },
};
</script>

<style scoped>
.weather-dash {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-self: flex-end;
}
span {
  color: white;
  font-weight: bolder;
}

.weather-card {
  width: 80%;
  border-radius: 20px;
  background: white;
  text-align: center;
  padding: 110px 0;
  margin: 5px;
  align-self: flex-end;
}

.weather-card span {
  color: black;
}
</style>