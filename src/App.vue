<script lang="ts">
import { computed, defineComponent } from 'vue';

import SketchContainer from '@/components/sketch/Container.vue';
import Overlay from '@/components/Overlay.vue';

export default defineComponent({
  name: 'App',
  components: {
    SketchContainer,
    Overlay,
  },
  setup() {
    const envClass = computed(() => process.env.NODE_ENV);
    return { envClass };
  },
});
</script>

<template>
  <div class="env" :class="envClass">
    <sketch-container />
    <overlay />
  </div>
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

  .env {
    &.production {
      cursor: pointer;
      user-select: none;
    }
  }

  p {
    font-size: 20px;
    line-height: 30px;
    font-style: normal;
    font-weight: 300;
    margin: 0;
  }

  h1 {
    font-size: 100px;
    font-weight: 700;
    line-height: 100px;
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
