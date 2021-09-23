<template>
  <section class="forecast-date">
    <h4 v-for="day in date" :key="day">{{ day }}</h4>
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
  <div class="forecast-icon">
    <WeatherIcon
      :currentWeatherCode="currentWeatherCode"
      :currentWeatherIcon="currentWeatherIcon"
      :weatherDay="weatherDay"
    />
  </div>
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
.forecast-date {
  display: flex;
  justify-content: space-between;
}

.forecast-daily {
  display: flex;
  justify-content: space-around;
}

.forecast-icon {
  display: flex;
  justify-content: space-around;
}
</style>