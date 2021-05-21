<script lang="ts">
import {
  defineComponent, computed, ref, reactive,
} from 'vue';

import useContent from '@/modules/useContent';

import Card from '@/components/Card.vue';
import scrollArrow from '@/components/SwipeControl.vue';

export default defineComponent({
  name: 'Category',
  components: {
    Card,
    scrollArrow,
  },
  props: {
    title: { type: String, required: true },
    category: { type: Number, required: true },
    openCategory: { type: Number, required: true },
  },
  setup(props) {
    const categoryElement = ref({} as HTMLElement);
    const categoryClass = computed(() => (props.openCategory === props.category ? 'open' : ''));
    const cards = reactive(useContent().getCards(props.category));

    /* onMounted(() => {
      if (categoryElement.value) {
        categoryElement.value.scrollLeft += 3840;
        console.log(categoryElement.value.scrollLeft);
      }
    });

    async function updateSort(el: HTMLElement) {
      const { scrollWidth } = el;
      const { scrollLeft } = el;
      const width = el.offsetWidth;
      const scrollDistance = el.offsetWidth;
      const items = el.children;

      /* if (scrollLeft <= width) {
        el.prepend(items[items.length - 1]);
        el.scrollLeft = scrollLeft + width;
        console.log('scroll left');
      }
      if (scrollWidth - scrollLeft <= width * 2) {
        const card = items[0].cloneNode();
        el.appendChild(card);
        console.log('append right');
      }
    }

    const categoryScroll = (event: Event) => {
      const element = event.target as HTMLElement;

      if (element) {
        updateSort(element);
      }
    }; */

    const activeCard = ref(0);

    const onCategoryScroll = () => {
      const {
        scrollLeft,
        scrollWidth,
      } = categoryElement.value;

      activeCard.value = Math.round(scrollLeft / (scrollWidth
        / cards.length));

      console.log(scrollLeft);
    };

    const scrollDistance = 2906;
    const autoScroll = (direction: string) => {
      if (categoryElement.value) {
        categoryElement.value.scrollTo({
          left: (activeCard.value + (direction === 'right' ? 1 : -1)) * scrollDistance,
          behavior: 'smooth',
        });
      }
    };

    return {
      categoryElement,
      onCategoryScroll,
      autoScroll,
      activeCard,
      categoryClass,
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
        <div class="category"
          :class="categoryClass"
          @scroll="onCategoryScroll"
          ref="categoryElement">
          <div class="previous arrow" @click="autoScroll('left')"
            :class="activeCard === 0 ? 'hidden': ''">
            <scroll-arrow :direction="'left'" />
          </div>
          <div class="next arrow" @click="autoScroll('right')"
            :class="activeCard === cards.length -1 ? 'hidden': ''">
            <scroll-arrow :direction="'right'" />
          </div>
          <card class="card card-element"
            v-for="card in cards"
            :card="card"
            :key="card.title + cards.indexOf(card)"
            :category="title" />
        </div>
      <!--</transition>-->
    </div>
</template>

<style lang="scss" scoped>
.menu-item {
  &.open {
    height: 1000px !important;
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

    visibility: collapse;

    scroll-snap-type: x mandatory;
    &.open {
      visibility: visible;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    .arrow {
      position: absolute;
      height: 1000px;
      max-height: 1000px;
      width: 316px;
      &.previous {
        left: 316px;
      }
      &.next {
        right: 316px;
      }

      &.hidden {
        visibility: hidden;
      }

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
