<template>
  <div class="quote-container">
    <span>{{ quote.text }}</span>
  </div>
</template>

<script>
import getQuote from "../composables/getQuote";

export default {
  setup() {
    const { loadQuote, quote } = getQuote();

    loadQuote();

    return { quote };
  },
};
</script>

<style scoped>
.quote-container {
  position: fixed;
  left: 0;
  bottom: 1rem;
  width: 100%;
}
.quote-container span {
  font-size: 1.125rem;
  color: white;
}
</style>