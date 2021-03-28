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
  <div class="overlay" :class="menuClass">
    <div class="menu" :class="menuClass">
      <span class="menu-item menu-indicator" :class="menuClass">
        <svg viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M53.848 30.48L27.924 2.584 2 30.48"
            stroke="#fff" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </span>
      <span class="menu-item menu-toggle" :class="menuClass" @click="toggleMenu">
        <p>Menu</p>
      </span>
      <category :title="'About The Table'" :class="menuClass"
        :category="Categories.About"
        :openCategory="openCategory"
        @setOpenCategory="setOpenCategory(Categories.About)" />
      <category :title="'Interactive Projects'" :class="menuClass"
        :category="Categories.InteractiveProjects"
        :openCategory="openCategory"
        @setOpenCategory="setOpenCategory(Categories.InteractiveProjects)" />
      <category :title="'Projects'" :class="menuClass"
        :category="Categories.Projects"
        :openCategory="openCategory"
        @setOpenCategory="setOpenCategory(Categories.Projects)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

    &.menu-open {
      backdrop-filter: blur(40px);
    }

    .menu {
      height: 100vh;

      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;

      transform: translateY(25.5vh);

      &.menu-open {
        transform: translateY(0);
        box-shadow: none;
      }

      .menu-item {
        $margin: 2.5vh;
        height: 125px;
        width: 600px;

        pointer-events: auto;

        &.menu-open {
          box-shadow: none;
        }

        &.menu-toggle {
          height: 113px;
          width: 214px;
          margin: 0;
          &.menu-open {
            margin-bottom: $margin;
          }
        }

        &.menu-indicator {
          height: 3vh;
          width: 3vh;
          background: none;
           &.menu-open {
            display: none;
          }
        }

        margin-bottom: $margin;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        background: linear-gradient(143.71deg,
        rgba(100, 100, 100, 0.4) 0%,
        rgba(67, 67, 67, 0.4) 76.92%,
        rgba(40, 40, 40, 0.4) 152.65%);
        box-shadow: inset -1px -1px 1px rgba(115, 115, 115, 0.5),
          inset 1px 1px 2px rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(100px);
        border-radius: 25px;
      }
    }
  }
</style>
