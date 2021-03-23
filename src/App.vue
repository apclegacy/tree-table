<script lang="ts">
import { defineComponent } from 'vue';

import EarthViewer from '@/components/EarthViewer.vue';
import Overlay from '@/components/Overlay.vue';

export default defineComponent({
  name: 'App',
  components: {
    EarthViewer,
    Overlay,
  },
});
</script>

<template>
  <div>
    <overlay />
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
  color: white;

  p {
    font-size: 250%;
  }

  h2 {
    font-size: 350%;
  }
}
</style>
