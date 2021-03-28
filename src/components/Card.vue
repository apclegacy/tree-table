<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Card',
  props: {
    card: {},
    category: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="card">
    <div class="header">
      <h2>{{ category }}</h2>
      <h1>{{ card.title }}</h1>
      <p>{{ card.author }}</p>
    </div>
    <div class="body">
      <div class="text">
        <div class="container">
          <h2>About</h2>
          <p>{{ card.description }}</p>
        </div>
      </div>
      <div class="media">
        <div class="container">
          <img src="../assets/tom.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;

  .header {
    height: 25%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
  }

  .body {
    height: 75%;

    display: flex;
    flex-direction: row;

    .text {
      width: 38%;
      height: 100%;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .container {
        height: 90%;
        width: 98%;

        margin-left: 4%;

        display:flex;
        flex-direction: column;
        align-items: center;

        text-align: center;

        background: linear-gradient(
            135deg, rgba(255, 255, 255, 0.1) 18.62%, rgba(56, 56, 56, 0.1) 97.79%);
        backdrop-filter: blur(400px);
        border-radius: 25px;

        p {
          max-width: 85%;
        }
      }
    }

    .media {
      width: 62%;
      height: 100%;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .container {
        background-color: blue;
        height: 90%;
        width: 95%;

        border-radius: 25px;

        overflow: hidden;

        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
