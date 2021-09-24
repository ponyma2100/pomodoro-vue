<template>
  <div class="progress-container">
    <div class="progress" :style="{ width: `${width}%` }"></div>
  </div>
  <div class="timer">
    <div class="showdisplay" v-show="showTime">{{ display }}</div>
    <div v-show="!showTime" class="input-time">
      <input
        v-model="setTime"
        type="number"
        placeholder="25"
        max="60"
        min="1"
      />
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
    const setTime = ref(25);
    const showTime = ref(false);
    let countdownActive;

    const width = ref(0);
    const perSec = ref(0);
    let progressActive;

    const getProgress = (miniutes) => {
      perSec.value = 100 / miniutes;

      progressActive = setInterval(() => {
        if (width.value >= 100) {
          clearInterval(progressActive);
          width.value = 0;
        } else {
          width.value += perSec.value;
        }
      }, 1000);
    };

    const handleStart = () => {
      if (!setTime.value || isNaN(setTime.value)) {
        setTime.value = "25";
        alert("請輸入正確時間");
      } else {
        startTimer(setTime.value * 60);
        getProgress(setTime.value * 60);
      }
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
          alert("Time's up!");
        } else {
          render(remaining);
        }
      }, 1000);
    };

    const handleStop = () => {
      clearInterval(countdownActive);
      clearInterval(progressActive);
      showTime.value = false;
      display.value = "";
      width.value = 0;
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
      width,
    };
  },
};
</script>

<style scoped>
.timer {
  max-width: 600px;
  font-size: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.timer span {
  color: white;
}

.input-time {
  display: flex;
  font-size: 8rem;
}
.timer input {
  width: 10rem;
  font-size: 8rem;
  text-align: right;
  border: none;
  background: transparent;
  color: white;
  outline-style: none;
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

.progress-container {
  background-color: rgba(0, 0, 0, 0.1);
  height: 0.4rem;
  max-width: 600px;
  width: 18rem;
}

.progress {
  height: 0.4rem;
  background-color: white;
  transition: width 0.4s ease;
}

.showdisplay {
  height: 150px;
  width: 360px;
  color: white;
}
</style>>

