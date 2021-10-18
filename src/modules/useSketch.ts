import { ref, reactive } from 'vue';
import P5 from 'p5';
import defaultSketch from '@/sketches/default/sketch';

import worldWideSketch from '@/sketches/worldwide/sketch';

const sketches = [
  defaultSketch,
  worldWideSketch,
];

const sketchState = reactive({
  sketchContainer: {} as HTMLElement,
});

const activeSketch = ref(0);

enum Sketch { Default, WorldWide }

const setContainer = (element: HTMLElement) => { sketchState.sketchContainer = element; };

let p5: P5;

// new P5 initiates the p5 with 2 Parameters. One is the sketch the other the container
const useSketch = (sketchId: number) => {
  sketchState.sketchContainer.innerHTML = '';
  activeSketch.value = sketchId;
  p5 = new P5(
    sketches[sketchId](
      sketchState.sketchContainer.offsetHeight, sketchState.sketchContainer.offsetWidth,
    ), sketchState.sketchContainer,
  );
  return p5;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).p5 = P5;

export {
  Sketch, setContainer, useSketch, activeSketch,
};
