<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

import useContent from '@/modules/useContent';

import Card from '@/components/Card.vue';

export default defineComponent({
  name: 'Category',
  components: {
    Card,
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
            <svg width="81" height="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7" filter="url(#filter0_bii)">
                <circle cx="40.8672" cy="40.582"
                  r="38.5" fill="#303030" fill-opacity="0.7" stroke="#00FF75" stroke-width="3"/>
              </g>
              <path d="M44.3539 29.3402L32.3539 40.5402L44.3539 51.7402"
                stroke="white" stroke-width="3" stroke-linecap="round"/>
              <defs>
                <filter id="filter0_bii" x="-49.1328" y="-49.418" width="180"
                  height="180" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feGaussianBlur in="BackgroundImage" stdDeviation="25"/>
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur"/>
                  <feBlend mode="normal"
                    in="SourceGraphic" in2="effect1_backgroundBlur" result="shape"/>
                  <feColorMatrix in="SourceAlpha" type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dx="1" dy="1"/>
                  <feGaussianBlur stdDeviation="1"/>
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
                  <feBlend mode="normal" in2="shape" result="effect2_innerShadow"/>
                  <feColorMatrix in="SourceAlpha" type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dx="-1" dy="-1"/>
                  <feGaussianBlur stdDeviation="0.5"/>
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                  <feColorMatrix type="matrix"
                    values="0 0 0 0 0.45098 0 0 0 0 0.45098 0 0 0 0 0.45098 0 0 0 0.5 0"/>
                  <feBlend mode="normal" in2="effect2_innerShadow" result="effect3_innerShadow"/>
                </filter>
              </defs>
            </svg>
          </div>
          <div class="next arrow" @click="slide(true)">
            <svg width="81" height="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7" filter="url(#filter0_bii)">
                <circle cx="40.8672" cy="40.582"
                  r="38.5" fill="#303030" fill-opacity="0.7" stroke="#00FF75" stroke-width="3"/>
              </g>
              <path d="M37.0906 52.7906L49.0906 41.5906L37.0906 30.3906"
                stroke="white" stroke-width="3" stroke-linecap="round"/>
              <defs>
                <filter id="filter0_bii" x="-49.1328" y="-49.418" width="180"
                  height="180" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feGaussianBlur in="BackgroundImage" stdDeviation="25"/>
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur"/>
                  <feBlend mode="normal"
                    in="SourceGraphic" in2="effect1_backgroundBlur" result="shape"/>
                  <feColorMatrix in="SourceAlpha" type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dx="1" dy="1"/>
                  <feGaussianBlur stdDeviation="1"/>
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
                  <feBlend mode="normal" in2="shape" result="effect2_innerShadow"/>
                  <feColorMatrix in="SourceAlpha" type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dx="-1" dy="-1"/>
                  <feGaussianBlur stdDeviation="0.5"/>
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                  <feColorMatrix type="matrix"
                    values="0 0 0 0 0.45098 0 0 0 0 0.45098 0 0 0 0 0.45098 0 0 0 0.5 0"/>
                  <feBlend mode="normal" in2="effect2_innerShadow" result="effect3_innerShadow"/>
                </filter>
              </defs>
            </svg>
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

    scroll-snap-type: x mandatory;

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
