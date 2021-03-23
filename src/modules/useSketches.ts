import P5 from 'p5';
import defaultSketch from '@/sketches/defaultSketch';

// in this module will all the logic of switching the sketches be.
// this module is empty at the moment.
// new P5 initiates the p5 with 2 Parameters. One is the sketch the other the container
const useSketches = (container: HTMLElement) => new P5(
  defaultSketch(container.offsetHeight, container.offsetWidth), container,
);

export default useSketches;
