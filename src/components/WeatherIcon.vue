<template>
  <div class="icon" v-for="icon in currentWeatherIcon" :key="icon">
    <svg>
      <use :xlink:href="icon" />
    </svg>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import "../assets/icon/day-clear.svg";
import "../assets/icon/day-cloudy-fog.svg";
import "../assets/icon/day-cloudy.svg";
import "../assets/icon/day-fog.svg";
import "../assets/icon/day-partially-clear-with-rain.svg";
import "../assets/icon/day-snowing.svg";
import "../assets/icon/day-thunderstorm.svg";

export default {
  props: ["currentWeatherCode"],
  setup(props) {
    const currentWeatherIcon = ref([]);

    const weatherTypes = {
      isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
      isClear: [1],
      isCloudyFog: [25, 26, 27, 28],
      isCloudy: [2, 3, 4, 5, 6, 7],
      isFog: [24],
      isPartiallyClearWithRain: [
        8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39,
      ],
      isSnowing: [23, 37, 42],
    };

    const weatherIcons = {
      isThunderstorm: "#day-thunderstorm",
      isClear: "#day-clear",
      isCloudyFog: "#day-cloudy-fog",
      isCloudy: "#day-cloudy",
      isCloudy: "#day-cloudy",
      isFog: "#day-fog",
      isPartiallyClearWithRain: "#day-partially-clear-with-rain",
      isSnowing: "#day-snowing",
    };

    //weatherCode weatherType mapping
    const weatherCode2Type = (weatherCode) => {
      const [weatherType] =
        Object.entries(weatherTypes).find(([weatherType, weatherCodes]) =>
          weatherCodes.includes(Number(weatherCode))
        ) || [];

      return weatherType;
    };

    //return daily weathericon
    const singleIcon = computed(() => {
      currentWeatherIcon.value = [];
      props.currentWeatherCode.map((code) => {
        currentWeatherIcon.value.push(weatherIcons[weatherCode2Type(code)]);
        return currentWeatherIcon;
      });
    });

    return {
      weatherCode2Type,
      singleIcon,
      currentWeatherIcon,
    };
  },
};
</script>

<style>
svg {
  width: 20px;
  height: 20px;
}
</style>