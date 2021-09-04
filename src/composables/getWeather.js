import { ref } from "vue"

const authorization = 'CWB-042511E5-4B1B-4F0B-B0E0-678048C3471E'


const getWeather = () => {
  const locationData = ref([])
  const currentWeatherData = ref({})
  const forecastWeatherData = ref({})


  const getCurrentWeather = async (city) => {
    const base = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001`
    const query = `?Authorization=${authorization}&locationName=${city}`

    try {
      const res = await fetch(base + query)
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

  const getForecastWeather = async (city) => {
    const base = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091`
    const query = `?Authorization=${authorization}&locationName=${city}`
    const locationData = ref([])

    try {
      const response = await fetch(base + query)
      const data = await response.json()
      locationData.value = data.records.locations[0].location[0].weatherElement

      const weatherElements = locationData.value.reduce((needElements, item) => {
        if (['MaxT', 'MinT', 'Wx'].includes(item.elementName)) {
          const weekWeather = item.time.filter(element => {
            return element.startTime.includes('06:00')
          })
          needElements[item.elementName] = weekWeather
        }

        return needElements
      }, [])


      forecastWeatherData.value = [
        weatherElements.MaxT,
        weatherElements.MinT,
        weatherElements.Wx
      ]


      // console.log("🚀 ~ file: getWeather.js ~ line 86 ~ getForecastWeather ~ forecastWeatherData.value", forecastWeatherData.value)

    } catch (error) {
      console.log(error)
    }


  }
  return { currentWeatherData, getCurrentWeather, getForecastWeather, forecastWeatherData }
}



export default getWeather