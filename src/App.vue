<script lang="ts">
import { defineComponent } from 'vue';

import EarthViewer from '@/components/EarthViewer.vue';

export default defineComponent({
  name: 'App',
  components: {
    EarthViewer,
  },
});
</script>

<template>
  <div>
    <earth-viewer />
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
