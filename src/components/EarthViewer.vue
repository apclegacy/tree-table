<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import useSketches from '@/modules/useSketches';

export default defineComponent({
  name: 'EarthViewer',
  setup() {
    // is a reference to a html element. the ref() function wrappes
    // the content into a reactive object which tells vue to rerender the dom
    // as soon as the value changes. thus reactive.
    const sketchContainer = ref({} as HTMLElement);

    // onMounted is a lifecycle event which is hooked right after the Whole Component
    // including the dome is created and inserted into the app
    // we need this event because before onMounted the HtmlElement does not exist.
    // onMounted(() => useSketches(sketchContainer.value));

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
