<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import {
  Sketch, setContainer, useSketch,
} from '@/modules/useSketch';

export default defineComponent({
  name: 'SketchContainer',
  setup() {
    const sketchContainer = ref({} as HTMLElement);

    onMounted(() => {
      setContainer(sketchContainer.value);
      useSketch(Sketch.WorldWide);
    });
    // return the ref to the virtual dom
    return {
      sketchContainer,
    };
  },
});
</script>

<template>
  <div class="sketch-container" ref="sketchContainer" />
</template>

<style lang="scss" scoped>
.sketch-container {
  height: 100vh;
  width: 100vw;
  background-color: black;
}
</style>
