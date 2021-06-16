import { ref } from 'vue';
import P5 from 'p5';
import defaultSketch from '@/sketches/default/sketch';

import worldWideSketch from '@/sketches/worldwide/sketch';

const sketches = [
  defaultSketch,
  worldWideSketch,
];

const activeSketch = ref(0);

enum Sketch { Default, WorldWide }

let sketchContainer: HTMLElement;

const setContainer = (element: HTMLElement) => { sketchContainer = element; };

// new P5 initiates the p5 with 2 Parameters. One is the sketch the other the container
const useSketch = (sketchId: number) => {
  activeSketch.value = sketchId;
  return new P5(
    sketches[sketchId](sketchContainer.offsetHeight, sketchContainer.offsetWidth), sketchContainer,
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).p5 = P5;

export {
  Sketch, setContainer, useSketch, activeSketch,
};
