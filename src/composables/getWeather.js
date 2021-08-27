import { ref } from "vue"

const authorization = 'CWB-042511E5-4B1B-4F0B-B0E0-678048C3471E'
const apiUrl = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authorization}&locationName=臺北`


const getWeather = () => {
  const locationData = ref([])
  const currentWeatherData = ref({})

  const getCurrentWeather = async () => {
    try {
      const res = await fetch(apiUrl)
      const data = await res.json()

      locationData.value = data.records.location[0]

      const weatherElements = locationData.value.weatherElement.reduce((needElements, item) => {
        if (['TEMP', "Weather"].includes(item.elementName)) {
          needElements[item.elementName] = item.elementValue
        }
        return needElements
      })

      currentWeatherData.value = {
        locationName: locationData.value.locationName,
        description: weatherElements.Weather,
        temperature: weatherElements.TEMP
      }

      // console.log("🚀 ~ file: getWeather.js ~ line 12 ~ getWeather ~ data.value", currentWeatherData.value)
    } catch (error) {
      console.log(error)
    }
  }

  return { currentWeatherData, getCurrentWeather }

}



export default getWeather