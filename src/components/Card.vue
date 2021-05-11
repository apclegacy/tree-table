<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Card',
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
    return {
      scrollIndicatorList,
      mediaScroll,
      mediaContainer,
      playVideo,
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
          <div class="container" @scroll="mediaScroll" ref="mediaContainer">
            <span class="scroll-indicator-list" ref="scrollIndicatorList">
              <span class="indicator" v-for="media in card.media" :key="media.title" />
            </span>
            <div class="item" v-for="media in card.media" :key="media.title">
              <img v-if="media.type==='img'" :src="require(`@/assets/cards/img/${media.title}`)"/>
              <div v-else class="video">
                <video :src="require(`@/assets/cards/vid/${media.title}`)"
                  :class="media.title"
                  playsinline />
                <span class="play" @click="playVideo(media.title)" :class="`play-${media.title}`">
                  <svg width="81" height="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.8">
                    <circle cx="40.0156"
                      cy="40.4219"
                      r="38.5" fill="#303030" fill-opacity="0.7" stroke="#00FF75" stroke-width="3"/>
                    </g>
                    <path
                      d="M37.0047 33.8557L45.527 41.7754L37.0047 49.695L37.0047 33.8557Z"
                      fill="white" stroke="white" stroke-width="3" stroke-linecap="round"/>
                    <defs>
                    <filter id="filter0_bii"
                      x="-49.9844" y="-49.5781"
                      width="180" height="180"
                      filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feGaussianBlur in="BackgroundImage" stdDeviation="25"/>
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur"/>
                    <feBlend mode="normal"
                      in="SourceGraphic"
                      in2="effect1_backgroundBlur" result="shape"/>
                    <feColorMatrix in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dx="1" dy="1"/>
                    <feGaussianBlur stdDeviation="1"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix"
                      values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow"/>
                    <feColorMatrix in="SourceAlpha"
                      type="matrix"
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

          .scroll-indicator-list {
            position: sticky;
            top: 0;
            left: 0;
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
}
</style>
