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
    <overlay />
    <earth-viewer />
</template>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;

  p {
    font-size: 27px;
    line-height: 34px;
    font-style: normal;
    margin: 20px;
  }

  h1 {
    font-size: 100px;
    font-weight: 800;
    line-height: 137px;
    font-style: normal;
    margin: 0;
  }

  h2 {
    font-size: 45px;
    font-weight: 500;
    line-height: 61px;
    font-style: normal;
    margin: 50px;
  }

}
</style>
