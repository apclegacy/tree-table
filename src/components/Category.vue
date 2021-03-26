<script lang="ts">
import {
  defineComponent, computed, ref, watchEffect,
} from 'vue';

import useContent from '@/modules/useContent';

export default defineComponent({
  name: 'Category',
  props: {
    title: { type: String, required: true },
    category: { type: Number, required: true },
    openCategory: { type: Number, required: true },
  },
  setup(props) {
    const categoryClass = computed(() => (props.openCategory === props.category ? 'open' : ''));
    const { getCards } = useContent();
    const cards = ref(getCards(props.category));

    const transitionName = ref('');
    const currentCardIndex = ref(0);
    const previousCardIndex = ref(0);
    const nextCardIndex = ref(0);
    const previousCard = ref({});
    const currentCard = ref({});
    const nextCard = ref({});

    watchEffect(() => { previousCard.value = cards.value[previousCardIndex.value]; });
    watchEffect(() => { currentCard.value = cards.value[currentCardIndex.value]; });
    watchEffect(() => { nextCard.value = cards.value[nextCardIndex.value]; });

    const slide = (forward: boolean) => {
      transitionName.value = forward ? 'slide-next' : 'slide-prev';
      const direction = forward ? 1 : -1;
      const { length } = cards.value;
      currentCardIndex.value = (currentCardIndex.value + direction + length) % length;
      nextCardIndex.value = (nextCardIndex.value + (direction + 1) + length) % length;
      previousCardIndex.value = (previousCardIndex.value + (direction - 1) + length) % length;
    };

    return {
      categoryClass,
      transitionName,
      previousCardIndex,
      currentCardIndex,
      nextCardIndex,
      slide,
      cards,
    };
  },
});
</script>

<template>
  <div class="menu-item open-category" :class="categoryClass" @click="$emit('setOpenCategory')">
    <h2>{{ title }}</h2>
    <div class="category" :class="categoryClass">
        <div class="card previous">
          <h1>{{ cards[previousCardIndex].title }}</h1>
        </div>
        <div class="card current">
          <h1>{{ cards[currentCardIndex].title }}</h1>
        </div>
        <div class="card next">
          <h1>{{ cards[nextCardIndex].title }}</h1>
        </div>
      <div class="previous arrow" @click="slide(false)" />
      <div class="next arrow" @click="slide(true)" />
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
  display: none;

  &.open {
    height: 1356px !important;
    width: 100vw !important;
    display: flex;
  }

  flex-direction: row;
  overflow: hidden;

  .arrow {
    position: absolute;
    height: 100%;
    border: 1px solid red;
    width: 264px;
    &.previous {
      left: 368px;
    }
    &.next {
      left: calc(((100vw - 2576px) / 2) + 2576px);
    }
  }
}

.card {
  height: 1356px;
  width: 2576px;
  min-width: 2576px;

  position: absolute;
  left: calc((100vw - 2576px) / 2);

  background: linear-gradient(
    135deg, rgba(120, 120, 120, 0.4) 18.62%, rgba(56, 56, 56, 0.4) 97.79%);
  backdrop-filter: blur(400px);
  border-radius: 60px;

  &.previous {
    left: -2208px;
  }

  &.next {
    left: 3472px;
  }
}
</style>
