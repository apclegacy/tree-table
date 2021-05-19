import baseP5 from 'p5';

declare module 'p5' {
  export interface p5 extends baseP5 {
    createEasyCam: functionm,
    spotLight: function,
    screenPosition: function,
  }
}
