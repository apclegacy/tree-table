<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Background',
});
</script>

<template>
  <div class="sketch-container" />
</template>

<style lang="scss" scoped>
.sketch-container {
  height: 100vh;
  width: 100vw;
  background-color: aqua;
}
</style>
