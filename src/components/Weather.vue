<template>
  <div class="weather">
    <div class="weather-dash" @click="handleClick">
      <div class="weather-dash-data">
        <span class="weather-dash-icon">{{
          currentWeatherData.description
        }}</span>
        <span class="weather-dash-temp">{{
          currentWeatherData.temperature
        }}</span>
        <span class="weather-dash-degree">°</span>
      </div>
      <div class="weather-location">
        <span>{{ cityName }}</span>
      </div>
    </div>
    <div class="weather-card" v-show="showCard">
      <div class="weather-card-location">
        <form @change.prevent="handleSubmit(cityName)">
          <select v-model="cityName">
            <option
              v-for="city in cityData"
              :key="city.cityName"
              :value="city.cityName"
            >
              {{ city.cityName }}
            </option>
          </select>
        </form>
        <span>{{ cityName }}</span>
      </div>
      <div class="weather-card-description">
        <span class="weather-icon">{{ currentWeatherData.description }}</span>
        <span class="weather-temp">{{ currentWeatherData.temperature }}</span>
        <div
          class="weather-forecast-date"
          v-for="forecast in weekDate"
          :key="forecast"
        >
          <span>{{ forecast }}</span>
        </div>

        <div class="weather-forecast">
          <div
            class="weather-forecast-daily"
            v-for="forecast in weatherDay[1]"
            :key="forecast"
          >
            <span>{{ forecast[0].value }}</span>
          </div>
          <div
            class="weather-forecast-daily"
            v-for="forecast in weatherDay[2]"
            :key="forecast"
          >
            <span>{{ forecast[0].value }}</span>
          </div>
          <div
            class="weather-forecast-daily"
            v-for="forecast in weatherDay[3]"
            :key="forecast"
          >
            <span>{{ forecast[0].value }}</span>
          </div>
          <div
            class="weather-forecast-daily"
            v-for="forecast in weatherDay[4]"
            :key="forecast"
          >
            <span>{{ forecast[0].value }}</span>
          </div>
          <div
            class="weather-forecast-daily"
            v-for="forecast in weatherDay[5]"
            :key="forecast"
          >
            <span>{{ forecast[0].value }}</span>
          </div>
          <div
            class="weather-forecast-daily"
            v-for="forecast in weatherDay[6]"
            :key="forecast"
          >
            <span>{{ forecast[0].value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import getWeather from "../composables/getWeather";
import cityLocation from "../../data/cityData";

export default {
  setup() {
    const {
      currentWeatherData,
      forecastWeatherData,
      getCurrentWeather,
      getForecastWeather,
      forecastWeatherGroupBy,
    } = getWeather();

    const showCard = ref(false);
    const city = ref("臺北");
    const cityData = ref([]);
    const cityName = ref("臺北市");
    const dailyWeather = ref([]);

    cityData.value = cityLocation;

    const handleClick = () => {
      showCard.value = !showCard.value;
    };

    const handleSubmit = (cityName) => {
      dailyWeather.value = [];
      getForecastWeather(cityName);
      cityData.value.filter((city) => {
        if (city.cityName === cityName) {
          city.value = city.locationName;
          getCurrentWeather(city.value);
          return city.locationName;
        }
      });
    };

    getCurrentWeather(city.value);
    getForecastWeather(cityName.value);

    // forecast date
    const weekDate = computed(() => {
      return Object.keys(forecastWeatherGroupBy.value).map((day) =>
        day.slice(5, 10)
      );
    });

    // forecast data
    const weatherDay = computed(() => {
      for (const key in forecastWeatherGroupBy.value) {
        dailyWeather.value.push(forecastWeatherGroupBy.value[key]);
      }
      return dailyWeather.value;
    });

    return {
      currentWeatherData,
      handleClick,
      showCard,
      city,
      handleSubmit,
      forecastWeatherData,
      cityData,
      cityName,
      forecastWeatherGroupBy,
      weekDate,
      dailyWeather,
      weatherDay,
      dailyWeather,
    };
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
  margin: 5px;
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  padding: 1rem;
}

.weather-card span {
  color: black;
}
</style>