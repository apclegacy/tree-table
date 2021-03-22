<script lang="ts">
import { defineComponent } from 'vue';

import Background from '@/components/Background.vue';

export default defineComponent({
  name: 'App',
  components: {
    Background,
  },
});
</script>

<template>
  <div>
    <background />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
