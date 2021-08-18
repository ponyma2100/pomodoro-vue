<template>
  <div
    class="container"
    :style="{ 'background-image': `url('${backgroundImage}')` }"
  >
    <Timer />
  </div>
</template>

<script>
import Timer from "./components/Timer";
import { ref } from "vue";
// import getImage from "./composables/getImage";

export default {
  name: "App",
  components: { Timer },
  setup() {
    const backgroundImage = ref("");
    const image = [
      "https://images.unsplash.com/photo-1483121149918-c04fb05c1e43?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      "https://images.unsplash.com/34/BA1yLjNnQCI1yisIZGEi_2013-07-16_1922_IMG_9873.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80",
    ];
    // const { backgroundImage, load } = getImage();

    // load();
    backgroundImage.value = image[Math.floor(Math.random() * 3)];
    return { backgroundImage };
  },
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-size: cover;
}
</style>
