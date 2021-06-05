<script lang="ts">
// this Component contains all CSS and HTML required by the Worldwide Sketch.
// since this is dumb migration this is ignored by eslint.
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Worldwide',
});
</script>

<template>
  <div class="worldwide">
    <div id="projectDrawDownInfo">
      <h3 id="projectDrawDownInfoTitle">Title</h3>
      <p id="projectDrawDownInfoDescription">
        Production of electricity must move away from fossil fuels, as quickly as possible. A spectrum of solutions can help, from small-scale/distributed to large-scale/centralized. Some solutions harvest photons from the sun. Others tap nature’s generous kinetic energy—the movement of wind and water. Still others use an alternate source of heat, such as geothermal or nuclear, for the same basic steam-turbine process.
      </p>
      <img src="imgs/guiElements/qrCodes/buildings.png" id="projectDrawDownInfoQrCode">
    </div>

    <div id="testLabel">
        <p>Earth Viewer Test</p>
    </div>

    <div id="info">
        <p id="frameRateDisplay">

        </p>
        <p>
            Press key "V" to display vector map
        </p>
        <p>
            Press key "M" to display Earth map
        </p>
        <p>
            Press key "P" to display points of interest(future cities in this case)
        </p>
        <p>
            Press key "F" to fullscreen and esc to go back
        </p>
        <p>
            Press key "C" to hide the CO2 vis
        </p>
        <p>
            Press key "K" to swap the CO2 vis mode
        </p>
        <p>
            Press key "R" to hide the Reforest vis
        </p>
        <p>
            Press key "L" to swap the Reforest vis mode
        </p>

    </div>
    <div id="first" class="infobox">
        <div id="text1">
            <h1>FOOD AGRICULTURE LAND</h1>
            <p id="border1">
                204.2–273.9 GIGATONS<br> CO2 EQUIVALENT<br> REDUCED / SEQUESTERED<br> (2020–2050)
            </p>
        </div>
    </div>
    <div id="second" class="infobox">
        <div id="line2"></div>
        <div id="text2">
            <h1>INDUSTRY</h1>
            <div id="border2"></div>
            <p>
                128.8–143.8 GIGATONS <br> CO2 EQUIVALENT<br> REDUCED / SEQUESTERED<br> (2020–2050)
            </p>
        </div>
    </div>
    <div id="third" class="infobox">
        <div id="line3"></div>
        <div id="text3">
            <h1>ELECTRICITY</h1>
            <div id="border3"></div>
            <p>200.6–440.2 GIGATONS<br> CO2 EQUIVALENT<br> REDUCED / SEQUESTERED<br> (2020–2050)
            </p>
        </div>
    </div>
    <div id="fourth" class="infobox">
        <div id="text4">
            <h1>LAND SINKS</h1>
            <div id="border4"></div>
            <p>243.1–387.8 GIGATONS<br> CO2 EQUIVALENT<br> REDUCED / SEQUESTERED<br> (2020–2050)
            </p>
        </div>

    </div>
    <div id="fifth" class="infobox">
        <div id="line5"></div>
        <div id="text5">
            <h1>BUILDINGS</h1>
            <div id="border5"></div>
            <p>73.7–141.2 GIGATONS<br> CO2 EQUIVALENT<br> REDUCED / SEQUESTERED<br> (2020–2050)
            </p>
        </div>
    </div>
    <div id="sixth" class="infobox">
        <div id="line6"></div>
        <div id="text6">
            <h1>TRANSPORTATION</h1>
            <div id="border6"></div>
            <p>58–97.4 GIGATONS<br> CO2 EQUIVALENT<br> REDUCED / SEQUESTERED<br> (2020–2050)
            </p>
        </div>
    </div>

    <div id="everyBox">
        <h3>project potential used</h3>
        <div>
            <div id="foodPercentageDisplay" class="inline">
                <p>demo</p>
            </div>
            <img class="positionthatimg" id="corn" src="icons/food.svg" width="50px">
        </div>
        <div>
            <div id="industryPercentageDisplay" class="inline">
                <p>demo</p>
            </div>
            <img  id="industryimg" class="positionthatimg" src="icons/industry.svg" width="50px">
        </div>
        <div>
            <div id="electricityPercentageDisplay" class="inline">
                <p>demo</p>
            </div>
            <img id="energyimg" class="positionthatimg" src="icons/energy.svg" width="50px">
        </div>
        <div>
            <div id="landSinksPercentageDisplay" class="inline">
                <p>demo</p>
            </div>
            <img id="landimg" class="positionthatimg" src="icons/landsinks.svg" width="50px">
        </div>
        <div>
            <div id="buildingsPercentageDisplay" class="inline">
                <p>demo</p>
            </div>
            <img id="buildingimg" class="positionthatimg" src="icons/buildings.svg" width="50px">
        </div>
        <div>
            <div id="transportationPercentageDisplay" class="inline">
                <p>demo</p>
            </div>
            <img  class="positionthatimg" id="truck" src="icons/transportation.svg" width="50px">
        </div>
        <div id="restart" style="margin-bottom: 0px">
            <p>RESET</p>
        </div>
        <div id="allTo100">
            <p>ALL 100%</p>
        </div>
    </div>

    <div id="legend">
        <p>* spikes represent the co2 emissions</p>
    </div>
  </div>
</template>

<style lang="scss">
  @font-face {
    font-family: Sui Generis Bold Italic;
    src: url('../../assets/sketches/worldwide/SUIGBI___.ttf')
  }

  @font-face {
    font-family: Sui Generis Italic;
    src: url('../../assets/sketches/worldwide/SUIGI___.ttf');
  }

  .worldwide {
    position: absolute;
    padding: 0;
    margin: 0;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    -webkit-overflow-scrolling: touch; /* Lets it scroll lazy */
    font-family: 'Futura-Light',Arial, sans-serif;
    /*text-transform: uppercase;*/
    /*color:rgb(255,255,100);*/
    color:#ffffff;
    /* no text selection*/
    user-select: none;
    /* disable blinking effect when tapping over DIV */
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  #testLabel{
    position: absolute;
    z-index: 1000;
    top: 0;
    left: 0;
    width:50%;
    height:20px;
    background-color: #0000ff;
    overflow: hidden;
    transition: height 0.2s;
    display: none;

  }
  #testLabel:hover{
    height:100px;

  }
  #testLabel p{
    color: #ffffff;
    /*font-family: Inconsolata;*/
    position: relative;
    left:20px;
    top: 20%;
  }
  #defaultCanvas0{
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

  }

  .trackedDivs{

    background-color: #00ff00 !important;
    width: 50px !important;
    transition: background-color 0.5s, width 0.5s;

    position :absolute;
    background-color :#ff0000;
    width :100px;
    height:100px;
    color :#ffffff;
    z-index :10000;

  }
  .trackedDivs:hover{
    background-color: #0000ff !important;
    width: 250px !important;
  }

  #info{
    display: none;
    width: 200px;
    height: 300px;
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000;
    opacity: 0.15;
    z-index: 100001;
  }
  #info:hover{
    opacity: 1.0;
  }

  h1 {
      font-size: 30px;
  }

  h2, h3, h4, h5, h6 {
      font-size: 25px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: Sui Generis Bold Italic;
    margin-bottom: 20px;
  }

  p {
    font-family: Sui Generis Italic;
      font-size: 20px;
  }

  .box{
      width: 520px;
      height: 520px;
      position: absolute;
      transform: translate(-50%,-50%);

  }
  .infobox{
      margin-top: -36px;
      margin-left: -40px;
      width: 535px;
      position: absolute;
      visibility: hidden;
      z-index: 100006;
  }

  #text1 {
      margin-top: 52px;
      margin-left: -294px;
  }

  #border1 {
      border-top: 5px solid white;
      padding-top: 15px;
      width: 535px;
  }

  #line2 {
      width:100px;
      border-top: 5px solid white;
      transform: rotate(-60deg);
      margin-top: 97px;
      margin-left: 48px;
  }

  #text2 {
      margin-left: -203px;
      margin-top: -36px;
  }

  #border2 {
      border-top: 5px solid white;
      width: 276px;
      margin-top: 11px;
  }

  #line3 {
      width: 100px;
      border-top: 5px solid white;
      transform: rotate(60deg);
      margin-top: 95px;
      margin-left: 198px;
  }

  #text3 {
      padding-left: 273px;
      margin-top: -36px;
      width: 280px;
  }

  #border3 {
      border-top: 5px solid white;
      width: 228px;
      margin-top: 11px;
  }

  #text4 {
      padding-left: 312px;
      margin-top: -105px;
      width: 280px;
  }
  #border4 {
      border-top: 5px solid white;
      width: 262px;
      margin-top: 11px;
      margin-left: -40px;
  }
  #line5 {
      width: 100px;
      border-top: 5px solid white;
      transform: rotate(-60deg);
      margin-top: -212px;
      margin-left: 200px;
  }

  #text5 {
      padding-left: 275px;
      margin-top: -120px;
      width: 360px;
  }

  #border5 {
      border-top: 5px solid white;
      width: 210px;
      margin-top: 11px;
  }

  #line6 {
      width:100px;
      border-top: 5px solid white;
      transform: rotate(60deg);
      margin-top: -262px;
      margin-left: -219px;
  }

  #text6 {
      margin-left: -511px;
      margin-top: -122px;
      width: 315px;
  }

  #border6 {
      border-top: 5px solid white;
      width: 317px;
      margin-top: 12px;
  }

  #projectDrawDownInfo {
    width: 20%;
    position: absolute;
    top: 2rem;
    left: 2rem;
    z-index: 100002;
  }

  #projectDrawDownInfo img {
      position: absolute;
    width: 100px;
  }

  #everyBox {
      display: flex;
      position: absolute;
      flex-direction: column;
      top: 2rem;
      margin-top: 1em;
      right: 2rem;
      z-index: 100005;
  }

  #everyBox > * {
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
  }

  .inline {
      display: inline;
      position: relative;
      padding-right: 32px;
      font-family: Sui Generis Italic;
      font-size: 40px;
  }

  #legend {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      text-align: right;
      z-index: 100004;
  }
</style>
