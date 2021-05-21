<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SwipeControl',
});
</script>

<template>
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
</template>
