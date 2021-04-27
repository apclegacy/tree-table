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
      </div>
      <div class="body">
        <div class="text">
          <div class="container">
            <div class="column">
              <h2>{{ card.lead }}</h2>
              <div class="people">
                <h2>{{ card.people.title }}</h2>
                <p v-for="name in card.people.names" :key="name">{{ name }}</p>
              </div>
            </div>
            <div class="column border">
              <h2>{{ card.description.title }}</h2>
              <p>{{ card.description.text }}</p>
            </div>
          </div>
        </div>
        <div class="media">
          <div class="container">
            <!--<img v-for="media in card.media" :key="media.title"
              :src="'../assets/cards/img/' + media.title"/>-->
           <img src="../assets/cards/img/tom.png">
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
    background: rgba(48, 48, 48, 0.3);
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
        width: 40%;
        height: 100%;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .container {
          height: 90%;
          width: 98%;

          margin-left: 4%;

          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-evenly;

          border: 3px solid rgba(255, 255, 255, 0.2);
          border-radius: 25px;

          .column {
            width: 42%;
            height: 88%;

            display: flex;
            flex-direction: column;
            justify-content: space-between;

            &.border {
              border: 3px solid rgba(255, 255, 255, 0.2);
              border-radius: 25px;

              justify-content: start;

              h2 {
                margin-left: 12%;
                margin-top: 9%;
                margin-bottom: 9%;
              }
              p {
                margin-left: 12% !important;
                white-space: pre-wrap;

                max-width: 80%;
              }
            }

            h2 {
              margin: 0;
            }

            .people {
              width: 100%;
              height: 50%;

              border: 3px solid rgba(255, 255, 255, 0.2);
              border-radius: 25px;

              h2 {
                margin-left: 12%;
                margin-top: 9%;
                margin-bottom: 9%;
              }
              p {
                margin-left: 12% !important;
              }
            }
          }
        }
      }

      .media {
        width: 60%;
        height: 100%;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        opacity: 1 !important;

        .container {
          height: 90%;
          width: 95%;

          border-radius: 25px;

          overflow-y: scroll;
          scroll-snap-type: y mandatory;

          background: none;
          img {
            width: 100%;
            scroll-snap-align: center;
          }
        }
      }
    }
  }
}
</style>
