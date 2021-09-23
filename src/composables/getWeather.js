import { ref } from "vue"

const authorization = 'CWB-042511E5-4B1B-4F0B-B0E0-678048C3471E'


const getWeather = () => {
  const locationData = ref([])
  const currentWeatherData = ref({})
  const forecastWeatherData = ref([])
  const forecastWeatherGroupBy = ref([])

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
      }, {})

      forecastWeatherData.value = [
        ...weatherElements.MaxT,
        ...weatherElements.MinT,
        ...weatherElements.Wx
      ]

      //Group by startTime
      forecastWeatherGroupBy.value = forecastWeatherData.value.reduce((elements, item) => {
        elements[item.startTime] = elements[item.startTime] || [];
        elements[item.startTime].push(item.elementValue);
        return elements;
      }, {})




    } catch (error) {
      console.log(error)
    }
  }



  return { currentWeatherData, getCurrentWeather, getForecastWeather, forecastWeatherData, forecastWeatherGroupBy }
}




export default getWeather