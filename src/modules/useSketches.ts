import P5 from 'p5';
import defaultSketch from '@/sketches/defaultSketch';

const useSketches = (container: HTMLElement) => {
  const sketch = new P5(defaultSketch(container.offsetHeight, container.offsetWidth), container);
};

export default useSketches;
