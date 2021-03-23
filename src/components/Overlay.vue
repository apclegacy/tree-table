<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

// import Category from '@/components/Category';

export default defineComponent({
  name: 'Overlay',
  /* components: {
    Category,
  }, */
  setup() {
    const menuOpen = ref(false);

    const toggleMenu = () => { menuOpen.value = !menuOpen.value; };
    const menuOpenClass = computed(() => (menuOpen.value ? 'menu-open' : ''));

    return {
      toggleMenu,
      menuOpenClass,
    };
  },
});
</script>

<template>
  <div class="overlay" :class="menuOpenClass">
    <div class="menu" :class="menuOpenClass">
      <span class="menu-item menu-indicator" :class="menuOpenClass">
        <svg viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M53.848 30.48L27.924 2.584 2 30.48"
            stroke="#fff" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </span>
      <span class="menu-item menu-toggle" :class="menuOpenClass" @click="toggleMenu">
        <p>Menu</p>
      </span>
      <span class="menu-item">
        <h2>About</h2>
      </span>
      <span class="menu-item">
        <h2>Projects</h2>
      </span>
      <span class="menu-item">
        <h2>Interactive Projects</h2>
      </span>
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

    &.menu-open {
      backdrop-filter: blur(2px);
    }

    .menu {
      height: 100vh;

      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;

      transform: translateY(31vh);

      &.menu-open {
        transform: translateY(0);
      }

      .menu-item {
        $margin: 2vh;
        height: 8vh;
        width: 20vw;

        &.menu-toggle {
          height: 7vh;
          width: 6vw;
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

        background: linear-gradient(
          131.45deg, rgba(120, 120, 120, 0.4) 25.82%, rgba(56, 56, 56, 0.4) 135.64%);;
        backdrop-filter: blur(200px);
        border-radius: 25px;
      }
    }
  }
</style>
