<script lang="ts">
import {
  computed, defineComponent, ref, watchEffect,
} from 'vue';

import Category from '@/components/Category.vue';

export default defineComponent({
  name: 'Overlay',
  components: {
    Category,
  },
  setup() {
    enum Categories { About, InteractiveProjects, Projects, None }
    const menuOpen = ref(false);
    const openCategory = ref(Categories.None);

    const toggleMenu = () => { menuOpen.value = !menuOpen.value; };
    const menuClass = computed(() => (menuOpen.value ? 'menu-open' : ''));

    watchEffect(() => {
      openCategory.value = !menuOpen.value ? Categories.None : openCategory.value;
    });
    const setOpenCategory = (category: Categories) => { openCategory.value = category; };

    return {
      menuOpen,
      toggleMenu,
      menuClass,

      Categories,
      openCategory,
      setOpenCategory,
    };
  },
});
</script>

<template>
  <div class="overlay">
    <transition name="pop-backdrop">
      <div class="backdrop" v-if="menuClass" />
    </transition>
    <div class="logos">
      <img src="../assets/eth.png" alt="eth crowther lab">
      <img src="../assets/zhdk.png" alt="zhdk">
    </div>
    <div class="menu" :class="menuClass">
      <transition-group tag="div"
        class="menu-items menu-toggle" name="pop-menu-toggle" mode="out-in">
         <!--<span v-if="!menuOpen" class="menu-item menu-indicator"
          :key="`indicator-${menuClass}`">
          <svg viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M53.848 30.48L27.924 2.584 2 30.48"
              stroke="#fff" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </span>-->
        <span v-if="!menuOpen" class="menu-item menu-toggle" :class="menuClass"
          :key="`toggle-${menuClass}`"
          @click="toggleMenu">
          <p>Menu</p>
        </span>
      </transition-group>
      <transition-group tag="div" class="menu-items" name="pop-stagger" mode="in-out">
        <span v-if="menuOpen" class="menu-item menu-toggle close" :class="menuClass"
          :key="`toggle-${menuClass}`"
          :style="{'--position': 4}"
          @click="toggleMenu">
          <p>X</p>
        </span>
        <category v-if="menuOpen" :title="'About The Table'" :class="menuClass"
          :category="Categories.About"
          :openCategory="openCategory"
          :key="`about-${menuClass}`"
          :style="{'--position': 3}"
          @setOpenCategory="setOpenCategory(Categories.About)" />
        <category v-if="menuOpen" :title="'Interactive Projects'" :class="menuClass"
          :category="Categories.InteractiveProjects"
          :openCategory="openCategory"
          :key="`interactive-${menuClass}`"
          :style="{'--position': 2}"
          @setOpenCategory="setOpenCategory(Categories.InteractiveProjects)" />
        <category v-if="menuOpen" :title="'Projects'" :class="menuClass"
          :category="Categories.Projects"
          :openCategory="openCategory"
          :key="`projects-${menuClass}`"
          :style="{'--position': 1}"
          @setOpenCategory="setOpenCategory(Categories.Projects)" />
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  // styles
  .overlay {
    width: 100vw;
    height: 100vh;

    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;

    pointer-events: none;

    .backdrop {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      backdrop-filter: blur(40px);
    }

    .logos {
      padding: 3vh 0 0 3vh;
      position: absolute;
      z-index: 99;
      top: 0;
      img{
        float: left;
        display: block;
        margin-right: 3vh;
      }
    }

    .menu {
      height: 100vh;

      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;

      .menu-items {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &.menu-toggle {
          position: absolute;
        }

        .menu-item {
          $margin: 2.5vh;
          height: 80px;
          width: 320px;

          pointer-events: auto;

          &.menu-open {
            box-shadow: none;
          }

          &.menu-toggle {
              margin-bottom: $margin;
            &.menu-open {
              width: 80px;
              border-radius: 100%;
            }
          }

          &.menu-indicator {
            height: 3vh;
            width: 3vh;
            background: none;
            border: none;
          }

          margin-bottom: $margin;

          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          /* background */
          background: rgba(48, 48, 48, 0.7);
          /* stroke */
          border: 3px solid #00FF75;
          box-sizing: border-box;
          /* final */
          box-shadow: inset -1px -1px 1px rgba(115, 115, 115, 0.5),
            inset 1px 1px 2px rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(400px);
          border-radius: 25px;
        }
      }
    }
  }

  .pop-backdrop {
    &-enter-active {
      transition: opacity 0.3s ease-out;
      transition-delay: 0.1s;
    }
    &-leave-active {
      transition: opacity 0.3s ease-in;
      transition-delay: 0.1s;
    }
    &-enter-from, &-leave-to  { opacity: 0; }
  }

  // animations
  $pop-in: opacity 0.03s ease-in;
  $pop-out: opacity 0.03s ease-out;

  .pop-menu-toggle {
    &-enter-active {
      transition: $pop-in;
      transition-delay: 4s;
    }
    &-enter-from, &-leave-to  { opacity: 0; }
  }

  .pop-stagger {
    &-enter-active {
      transition: $pop-in;
      transition-delay: calc(0.03s * var(--position) + 0.03s);
    }
    &-leave-active {
      transition: $pop-out;
      transition-delay: calc(0.03s * (5 - var(--position)));
      //transition-delay: calc(0.01s * (1 - var(--position)) + calc(0.1s * (4 - var(--position))));
    }
    &-enter-from, &-leave-to  { opacity: 0; }
  }
</style>
