<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'Category',
  props: {
    title: { type: String, required: true },
    category: { type: Number, required: true },
    openCategory: { type: Number, required: true },
  },
  setup(props) {
    const categoryClass = computed(() => (props.openCategory === props.category ? 'open' : ''));
    return {
      categoryClass,
    };
  },
});
</script>

<template>
  <div class="menu-item open-category" :class="categoryClass" @click="$emit('setOpenCategory')">
    <h2>{{ title }}</h2>
    <div class="category" :class="categoryClass">

    </div>
  </div>
</template>

<style lang="scss" scoped>
.open-category {
  &.open {
    height: 1356px !important;
    width: 100vw !important;
    background: none !important;
    h2 {
      display: none !important;
    }
  }
  h2 {
    opacity: 1 !important;
  }
}
.category {
  opacity: 0;
  &.open {
    height: 1356px !important;
    width: 100vw !important;
    opacity: 1;
  }
}
</style>
