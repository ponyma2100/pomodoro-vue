
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


export default { weatherTypes, weatherIcons }