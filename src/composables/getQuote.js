import { ref } from "vue"

const apiUrl = 'https://type.fit/api/quotes'

const getQuote = () => {
  const data = ref('')
  const quote = ref('')

  const loadQuote = async () => {
    try {
      const response = await fetch(apiUrl)
      data.value = await response.json()
      quote.value = data.value[Math.floor(Math.random() * data.value.length)]
      // console.log("🚀 ~ file: getQuote.js ~ line 12 ~ getQuote ~ quote.value", quote.value)
      // console.log(data.value[0])
    } catch (error) {
      console.log(error)
    }
  }

  return { loadQuote, quote }
}


export default getQuote