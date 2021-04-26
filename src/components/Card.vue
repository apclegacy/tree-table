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
  <div class="card-container">
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
  </div>
</template>

<style lang="scss" scoped>
.card-container {
  padding-left: 192px;
  padding-right: 192px;
  &:nth-child(3) {
    padding-left: 632px; }
  &:last-of-type { padding-right: 632px; }

  scroll-snap-align: center;

  .card {
    height: 1180px;
    width: 2576px;
    min-width: 2576px;

    display: flex;
    flex-direction: column;

    /* background */
    background: rgba(48, 48, 48, 0.7);
    /* final */
    box-shadow: inset -1px -1px 1px rgba(115, 115, 115, 0.5),
      inset 1px 1px 2px rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(400px);
    border-radius: 25px;

    scroll-snap-align: center;

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

          background: linear-gradient(143.71deg,
            rgba(100, 100, 100, 0.2) 0%,
            rgba(67, 67, 67, 0.2) 76.92%,
            rgba(40, 40, 40, 0.2) 152.65%);
          box-shadow: inset -1px -1px 1px rgba(115, 115, 115, 0.3),
            inset 1px 1px 1px rgba(255, 255, 255, 0.4);

          backdrop-filter: blur(200px);

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
          height: 90%;
          width: 95%;

          border-radius: 25px;

          overflow: hidden;

          box-shadow: inset -1px -1px 1px rgba(115, 115, 115, 0.5),
            inset 1px 1px 2px rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(300px);

          background: none;
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
