<script lang="ts">
import { defineComponent, ref } from 'vue';

import PlayButton from '@/components/PlayButton.vue';

export default defineComponent({
  name: 'Card',
  components: {
    PlayButton,
  },
  props: {
    card: {},
    category: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const scrollIndicatorList = ref({} as HTMLElement);
    const mediaContainer = ref({} as HTMLElement);
    const mediaScroll = (event: Event) => {
      if (event.target) {
        const { scrollTop, scrollHeight } = event.target as HTMLElement;

        const activeItem = Math.floor(scrollTop / (scrollHeight
          / (props.card as any).media.length));

        if (mediaContainer.value) {
          const videoElements = mediaContainer.value.getElementsByClassName('video-element');
          if (videoElements) {
            Array.from(videoElements).forEach((videoElement) => {
              (videoElement as HTMLVideoElement).pause();
              (videoElement as HTMLVideoElement).currentTime = 0;
            });
          }
          const videoElement = mediaContainer.value.children[activeItem].getElementsByClassName('video-element')[0];
          if (videoElement) (videoElement as HTMLVideoElement).play();
        }

        if (scrollIndicatorList.value) {
          const indicators = Array.from(scrollIndicatorList.value.children);
          indicators.forEach((indicator) => {
            indicator.classList.remove('active');
            if (indicators.indexOf(indicator) === activeItem) {
              indicator.classList.add('active');
            }
          });
        }
      }
    };

    const playVideo = (videoId: string) => {
      if (mediaContainer.value) {
        const video = mediaContainer.value.getElementsByClassName(videoId)[0] as HTMLVideoElement;
        const videoPlayButton = mediaContainer.value.getElementsByClassName(`play-${videoId}`)[0] as HTMLVideoElement;
        videoPlayButton.classList.add('invisible');
        video.play();
      }
    };
    const pauseVideo = (videoId: string) => {
      if (mediaContainer.value) {
        const video = mediaContainer.value.getElementsByClassName(videoId)[0] as HTMLVideoElement;
        const videoPlayButton = mediaContainer.value.getElementsByClassName(`play-${videoId}`)[0] as HTMLVideoElement;
        videoPlayButton.classList.remove('invisible');
        video.pause();
      }
    };
    return {
      scrollIndicatorList,
      mediaScroll,
      mediaContainer,
      playVideo,
      pauseVideo,
    };
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
          <span class="scroll-indicator-list" ref="scrollIndicatorList">
            <span class="indicator"
              :class="card.media.indexOf(media) === 0 ? 'active' : ''"
              v-for="media in card.media" :key="media.title" />
          </span>
          <div class="container" @scroll="mediaScroll" ref="mediaContainer">
            <div class="item" v-for="media in card.media" :key="media.title">
              <img v-if="media.type==='img'" :src="require(`@/assets/cards/img/${media.title}`)"/>
              <div v-else class="video">
                <video class="video-element" :src="require(`@/assets/cards/vid/${media.title}`)"
                  @click="pauseVideo(media.title)"
                  :class="media.title"
                  playsinline
                  muted />
                <span class="play invisible"
                  @click="playVideo(media.title)" :class="`play-${media.title}`">
                  <play-button />
                </span>
              </div>
            </div>
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

        position: relative;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        opacity: 1 !important;

        .container {
          height: 90%;
          width: 95%;

          position: relative;

          border-radius: 25px;

          overflow-y: scroll;
          scroll-snap-type: y mandatory;

          background: none;

          display: block;
          .item, img, .video, video {
            width: 100%;
            object-fit: contain;
            scroll-snap-align: center;
            position: inherit;
          }

          .play {
            position: absolute;
            height: 81px;
            width: 81px;
            top: 45%;
            left: 50%;
            transform: translate(-50%);

            &.invisible {
              display: none;
            }
          }
        }
        .scroll-indicator-list {
          position: absolute;

          top: 0;
          left: 3%;
          width: 5%;
          height: 100%;

          z-index: 99;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .indicator {
            border-radius: 100%;
            width: 25px;
            height: 25px;
            border: 3px solid #00FF75;

            margin-bottom: 10px;

            transition: background-color 0.1s ease;

            &.active {
              background-color: #00FF75;
            }
          }
        }
      }
    }
  }
}
</style>
