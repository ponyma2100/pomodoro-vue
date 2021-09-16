<template>
  <div class="weather">
    <section class="weather-dash" @click="handleClick">
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
    </section>
    <section class="weather-card" v-show="showCard">
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
      </div>
      <div class="weather-card-description">
        <span class="weather-icon">{{ currentWeatherData.description }}</span>
        <span class="weather-temp">{{ currentWeatherData.temperature }}°</span>
      </div>

      <div class="weather-forecast">
        <WeatherForecast
          :dailyWeather="dailyWeather"
          :date="date"
          :currentWeatherCode="currentWeatherCode"
          :weatherDay="weatherDay"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import getWeather from "../composables/getWeather";
import cityLocation from "../../data/cityData";
import WeatherForecast from "./WeatherForecast.vue";

export default {
  components: { WeatherForecast },
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
    const date = ref([]);
    const currentWeatherCode = ref([]);
    const currentWeatherIcon = ref([]);

    cityData.value = cityLocation;

    const handleClick = () => {
      showCard.value = !showCard.value;
    };

    const handleSubmit = (cityName) => {
      dailyWeather.value = [];
      currentWeatherIcon.value = [];

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

    // forecast data

    const weatherDay = computed(() => {
      dailyWeather.value = [];
      date.value = [];
      currentWeatherCode.value = [];
      Object.entries(forecastWeatherGroupBy.value).forEach(([key, value]) => {
        date.value.push(key.slice(5, 10));
        dailyWeather.value.push(value);
        currentWeatherCode.value.push(value[2][1].value);
      });

      return [dailyWeather, date, currentWeatherCode];
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
      dailyWeather,
      weatherDay,
      date,
      currentWeatherCode,
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
  background: whitesmoke;
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

.weather-card-description {
  margin: 1rem 0;
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.weather-forecast {
  display: flex;
  border-top: 1px solid #80808078;
  border-bottom: 1px solid #80808078;
  padding: 0.5rem 0;
  font-size: 0.5rem;
}

.weather-forecast-daily .daily-detail {
  display: flex;
  margin: 5px;
}
.weather-forecast-daily .day {
  margin: 2px;
}

form > select {
  border: none;
  background-color: whitesmoke;
  font-size: 1.2rem;
}

svg {
  width: 20px;
  height: 20px;
}
</style>