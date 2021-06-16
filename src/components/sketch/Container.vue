<script lang="ts">
import WorldWide from '@/components/sketch/Worldwide.vue';
import {
  defineComponent, onMounted, ref,
} from 'vue';
import {
  Sketch, setContainer, useSketch, activeSketch,
} from '@/modules/useSketch';

export default defineComponent({
  name: 'SketchContainer',
  components: {
    WorldWide,
  },
  setup() {
    const sketchContainer = ref({} as HTMLElement);

    onMounted(() => {
      setContainer(sketchContainer.value);
      useSketch(Sketch.WorldWide);
    });
    // return the ref to the virtual dom
    return {
      sketchContainer,
      activeSketch,
      Sketch,
    };
  },
});
</script>

<template>
  <div class="sketch-container" ref="sketchContainer" />
  <world-wide v-if="activeSketch===Sketch.WorldWide" />
</template>

<style lang="scss" scoped>
.sketch-container {
  height: 100vh;
  width: 100vw;
  background-color: black;
}
</style>
