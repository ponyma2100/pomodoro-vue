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
        <div class="weather-forecast">
          <div
            class="weather-maxt"
            v-for="forecast in filterMaxT"
            :key="forecast"
          >
            <span>{{ forecast.elementValue[0].value }}</span>
          </div>
          <div
            class="weather-mint"
            v-for="forecast in filterMinT"
            :key="forecast"
          >
            <span>{{ forecast.elementValue[0].value }}</span>
          </div>
          <div
            class="weather-description"
            v-for="forecast in filterDescription"
            :key="forecast"
          >
            <span>{{ forecast.elementValue[0].value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import getWeather from "../composables/getWeather";
export default {
  setup() {
    const {
      currentWeatherData,
      forecastWeatherData,
      getCurrentWeather,
      getForecastWeather,
    } = getWeather();
    const showCard = ref(false);
    const city = ref("臺北");
    const cityData = ref([]);
    const cityName = ref("臺北市");

    const handleClick = () => {
      showCard.value = !showCard.value;
    };
    2;

    const handleSubmit = (cityName) => {
      console.log(
        "🚀 ~ file: Weather.vue ~ line 86 ~ handleSubmit ~ cityName",
        cityName
      );
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

    const filterMaxT = computed(() => {
      return forecastWeatherData.value[0];
    });
    const filterMinT = computed(() => {
      return forecastWeatherData.value[1];
    });
    const filterDescription = computed(() => {
      return forecastWeatherData.value[2];
    });

    cityData.value = [
      {
        cityName: "宜蘭縣",
        locationName: "宜蘭",
      },
      {
        cityName: "嘉義市",
        locationName: "嘉義",
      },
      {
        cityName: "屏東縣",
        locationName: "恆春",
      },
      {
        cityName: "雲林縣",
        locationName: "麥寮",
      },
      {
        cityName: "臺東縣",
        locationName: "臺東",
      },
      {
        cityName: "臺北市",
        locationName: "臺北",
      },
      {
        cityName: "金門縣",
        locationName: "金門",
      },
      {
        cityName: "桃園市",
        locationName: "新屋",
      },
      {
        cityName: "彰化縣",
        locationName: "彰師大",
      },
      {
        cityName: "嘉義縣",
        locationName: "嘉義",
      },
      {
        cityName: "高雄市",
        locationName: "高雄",
      },
      {
        cityName: "基隆市",
        locationName: "基隆",
      },
      {
        cityName: "臺南市",
        locationName: "南區中心",
      },
      {
        cityName: "南投縣",
        locationName: "日月潭",
      },
      {
        cityName: "臺中市",
        locationName: "臺中",
      },
      {
        cityName: "新竹縣",
        locationName: "新竹",
      },
      {
        cityName: "花蓮縣",
        locationName: "花蓮",
      },
      {
        cityName: "連江縣",
        locationName: "馬祖",
      },
      {
        cityName: "澎湖縣",
        locationName: "澎湖",
      },
      {
        cityName: "新北市",
        locationName: "板橋",
      },
    ];
    return {
      currentWeatherData,
      handleClick,
      showCard,
      city,
      handleSubmit,
      forecastWeatherData,
      filterMaxT,
      filterMinT,
      filterDescription,
      cityData,
      cityName,
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