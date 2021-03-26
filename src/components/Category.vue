<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

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
    const previousCard = ref(0);
    const currentCard = ref(0);
    const nextCard = ref(0);

    const slide = (forward: boolean) => {
      transitionName.value = forward ? 'slide-next' : 'slide-prev';
      const direction = forward ? 1 : -1;
      const { length } = cards.value;
      previousCard.value = (previousCard.value + (direction) + length) % length;
      currentCard.value = (currentCard.value + direction + length) % length;
      nextCard.value = (nextCard.value + (direction) + length) % length;
    };

    return {
      categoryClass,
      transitionName,
      previousCard,
      currentCard,
      nextCard,
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
          <h1>{{ cards[previousCard].title }}</h1>
        </div>
        <div class="card current">
          <h1>{{ cards[currentCard].title }}</h1>
        </div>
        <div class="card next">
          <h1>{{ cards[nextCard].title }}</h1>
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
