<template>
  <div class="timer">
    <span v-if="showTime">{{ display }}</span>
    <div v-else class="input-time">
      <input v-model="setTime" type="text" placeholder="25" />
      <span>:00</span>
    </div>
    <button v-if="!showTime" class="start-button" @click="handleStart">
      Start
    </button>
    <button v-else class="stop-button" @click="handleStop">Stop</button>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {
  setup() {
    const display = ref("");
    const seconds = ref("");
    const minutes = ref("");
    const setTime = ref("25");
    const showTime = ref(false);
    let countdownActive;

    const handleStart = () => {
      startTimer(setTime.value * 60);
    };

    const startTimer = (minutes) => {
      const second = 1000;
      // const minute = second * 60;
      const now = Date.now();
      const countdownValue = now + minutes * second;
      showTime.value = true;
      countdownActive = setInterval(() => {
        const remaining = Math.round((countdownValue - Date.now()) / 1000);

        if (remaining < 0) {
          clearInterval(countdownActive);
          showTime.value = false;
        } else {
          render(remaining);
        }
      }, 1000);
    };

    const handleStop = () => {
      clearInterval(countdownActive);
      showTime.value = false;
      display.value = "";
    };

    const render = (totalTime) => {
      minutes.value = Math.floor(totalTime / 60);
      seconds.value = totalTime % 60;
      display.value = `${minutes.value}:${String(seconds.value).padStart(
        2,
        0
      )}`;
    };

    return {
      startTimer,
      handleStart,
      handleStop,
      display,
      setTime,
      showTime,
    };
  },
};
</script>

<style scoped>
.timer {
  max-width: 500px;
  font-size: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.timer span {
  color: white;
}

.input-time {
  display: flex;
  font-size: 100px;
  max-width: 300px;
}
.timer input {
  width: 120px;
  font-size: 100px;
  text-align: right;
  border: none;
  background: transparent;
  color: white;
}

.start-button,
.stop-button {
  font-family: "Lato", "Source Sans Pro", "Noto Sans TC", sans-serif;
  width: 100px;
  height: 35px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid whitesmoke;
  border-radius: 20px;
  font-size: 20px;
  color: whitesmoke;
  cursor: pointer;
}

.start-button:hover,
.stop-button:hover {
  filter: brightness(1.5);
}
</style>>

