<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import useSketches from '@/modules/useSketches';

export default defineComponent({
  name: 'EarthViewer',
  setup() {
    const sketchContainer = ref({} as HTMLElement);

    onMounted(() => {
      if (sketchContainer.value) {
        useSketches(sketchContainer.value);
      }
    });

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
  background-color: aqua;
}
</style>
