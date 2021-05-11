<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

import useContent from '@/modules/useContent';

import Card from '@/components/Card.vue';
import SwipeControl from '@/components/SwipeControl.vue';

export default defineComponent({
  name: 'Category',
  components: {
    Card,
    SwipeControl,
  },
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
    const currentCard = ref(1);
    const nextCard = ref(2);

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
    <div class="menu-item" :class="categoryClass">
      <div class="toggle-category"
        v-show="(categoryClass === '')"
        @click="$emit('setOpenCategory')">
        <h2>{{ title }}</h2>
      </div>
      <!--<transition name="pop">-->
        <div class="category" v-show="(categoryClass !== '')">
          <div class="previous arrow" @click="slide(false)">
            <swipe-control :direction="'left'" />
          </div>
          <div class="next arrow" @click="slide(true)">
            <swipe-control :direction="'right'" />
          </div>
          <card
            v-for="card in cards"
            :card="card"
            :key="card.title"
            :category="title" />
        </div>
      <!--</transition>-->
    </div>
</template>

<style lang="scss" scoped>
.menu-item {
  &.open {
    height: 1180px !important;
    width: 100vw !important;
    background: none !important;
    border: none !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
    }

    // transition: width 0s;
    // transition-delay: 0.1s;

  .toggle-category { h2 { opacity: 1; }  transition: none !important;}

  .category {
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    scrollbar-width: none;

    scroll-snap-type: x mandatory;
    &::-webkit-scrollbar {
      display: none;
    }
    .arrow {
      position: absolute;
      height: 1180px;
      width: 264px;
      &.previous {
        left: 368px;
      }
      &.next {
        left: calc(((100vw - 2576px) / 2) + 2576px);
      }

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
