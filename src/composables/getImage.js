import { ref } from "vue"

const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}`

const getImage = () => {
  const data = ref('')
  const backgroundImage = ref("")
  const load = async () => {
    try {
      const response = await fetch(apiUrl)
      data.value = await response.json()
      backgroundImage.value = data.value.urls.regular

      // console.log(data.value.user.username)
      // console.log(data.value.urls.regular)
    } catch (error) {
      console.log(error)
    }
  }
  return { backgroundImage, load }
}





export default getImage
