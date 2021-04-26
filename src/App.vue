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

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap');

#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;

  p {
    font-size: 20px;
    line-height: 30px;
    font-style: normal;
    font-weight: 300;
    margin: 0;
  }

  h1 {
    font-size: 130px;
    font-weight: 700;
    line-height: 157px;
    font-style: normal;
    margin: 0;
  }

  h2 {
    font-size: 30px;
    font-weight: 500;
    line-height: 36px;
    font-style: normal;
  }

}
</style>
