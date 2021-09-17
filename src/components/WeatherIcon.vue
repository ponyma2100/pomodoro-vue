<template>
  <div class="icon" v-for="icon in currentWeatherIcon" :key="icon.index">
    <svg>
      <use :xlink:href="icon" />
    </svg>
  </div>
</template>

<script>
import "../assets/icon/day-clear.svg";
import "../assets/icon/day-cloudy-fog.svg";
import "../assets/icon/day-cloudy.svg";
import "../assets/icon/day-fog.svg";
import "../assets/icon/day-partially-clear-with-rain.svg";
import "../assets/icon/day-snowing.svg";
import "../assets/icon/day-thunderstorm.svg";

export default {
  props: ["currentWeatherIcon"],
  setup(props) {},
};
</script>

<style>
svg {
  width: 20px;
  height: 20px;
}
</style>