import {fabric} from 'fabric';
export class GillConfig {
  uiRadito = 16 / 9;
  radito = window.innerWidth / window.innerHeight;
  fullscale = (this.radito > this.uiRadito) ? (window.innerHeight / 576) : (window.innerWidth / 1024);
  gillDetailScale = (this.radito > this.uiRadito) ? (window.innerWidth * 0.424 / 868) : (window.innerHeight * 0.762 / 878);
  backgroundConfig = {
    left: 0,
    top: 0,
    scaleX: (window.innerWidth / 2048),
    scaleY: (window.innerHeight / 1152),
    selectable: false
  } as fabric.IImageOptions;

  gillImageConfig = {
    left: (window.innerWidth * 0.356),
    top: (window.innerHeight * 0.24),
    scaleX: this.fullscale * 0.5,
    scaleY: this.fullscale * 0.5,
    visible: false,
    selectable: false
  } as fabric.IImageOptions;

  gillDetailImageConfig = {
    left: (window.innerWidth * 0.306),
    top: (window.innerHeight * 0.167),
    scaleX: 0.5 * this.fullscale,
    scaleY: 0.5 * this.fullscale,
    visible: false,
    selectable: false
  } as fabric.IImageOptions;

  circleConfig = [{
    radius: 15 * this.fullscale,
    fill: 'rgba(0,0,0,0)',
    left: (window.innerWidth * 0.356 - 7.5 * this.fullscale),
    top: (window.innerHeight * 0.24 + 626 * 0.5 * this.fullscale / 2 - 7.5 * this.fullscale ),
    stroke: 'rgba(0,0,0,0.0)',
    visible: false,
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 15 * this.fullscale,
    fill: 'rgba(0,0,0,0)',
    left: (window.innerWidth * 0.306 - 7.5 * this.fullscale),
    top: (window.innerHeight * 0.167 + 95.5 * this.fullscale),
    stroke: 'rgba(0,0,0,0)',
    visible: false,
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }];

  gillText = [{
    left: (window.innerWidth * 0.361 + 428 * this.fullscale),
    top: (window.innerHeight * 0.24 + 42 * this.fullscale),
    fontSize: 24 * this.fullscale,
    fill: 'white',
    visible: false,
    selectable: false
  }, {
    left: (window.innerWidth * 0.361 + 428 * this.fullscale),
    top: (window.innerHeight * 0.24 + 95 * this.fullscale),
    fontSize: 24 * this.fullscale,
    fill: 'white',
    visible: false,
    selectable: false
  }, {
    left: (window.innerWidth * 0.356 + 327 * this.fullscale),
    top: (window.innerHeight * 0.24 + 280 * this.fullscale),
    fontSize: 24 * this.fullscale,
    fill: 'white',
    visible: false,
    selectable: false
  }, {
    left: (window.innerWidth * 0.306 + 28 * this.fullscale),
    top: (window.innerHeight * 0.167 + 25 * this.fullscale),
    fontSize: 24 * this.fullscale,
    fill: 'white',
    visible: false,
    selectable: false
  }, {
    left: (window.innerWidth * 0.306 + 280 * this.fullscale),
    top: (window.innerHeight * 0.167 + 6 * this.fullscale),
    fontSize: 24 * this.fullscale,
    fill: 'white',
    visible: false,
    selectable: false
  }, {
    left: (window.innerWidth * 0.306 + 440 * this.fullscale),
    top: (window.innerHeight * 0.167 + 236 * this.fullscale),
    fontSize: 24 * this.fullscale,
    fill: 'white',
    visible: false,
    selectable: false
  }, {
    originX: 'center',
    left: 585 * this.fullscale,
    top: window.innerHeight * 0.82,
    fontSize: 24 * this.fullscale,
    fill: 'white',
    visible: false,
    selectable: false
  }];
}
