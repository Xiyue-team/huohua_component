import {fabric} from 'fabric';
export class IntestineConfig {

  intestineImageConfig = {
    originY: 'center',
    originX: 'center',
    left: 512,
    top: 288,
    scaleX: 0.5,
    scaleY: 0.5,
    opacity: 1,
    selectable: false
  } as fabric.IImageOptions;

  imageConfig = [{
    originY: 'center',
    originX: 'center',
    left: 512,
    top: 288,
    scaleX: 0.5,
    scaleY: 0.5,
    opacity: 1,
    selectable: false
  }, {
    originY: 'center',
    originX: 'center',
    left: 503,
    top: 340,
    scaleX: 0.04,
    scaleY: 0.04,
    opacity: 0,
    selectable: false
  }, {
    originY: 'center',
    originX: 'center',
    left: 464.5,
    top: 330,
    scaleX: 0.035,
    scaleY: 0.035,
    opacity: 0,
    selectable: false
  }, {
    originY: 'center',
    originX: 'center',
    left: 412,
    top: 328,
    scaleX: 0.035,
    scaleY: 0.035,
    opacity: 0,
    selectable: false
  }, {
    originY: 'center',
    originX: 'center',
    left: 400,
    top: 168,
    scaleX: 0.04,
    scaleY: 0.04,
    opacity: 0,
    selectable: false
  }];
  smallImageConfig = {
    left: 55,
    top: 360,
    scaleX: 0.4,
    scaleY: 0.4,
    opacity: 0,
  } as fabric.IImageOptions;

  zoomInConfig = {
    scaleX: 0.1,
    scaleY: 0.1,
    left: 78,
    top: 400
  } as fabric.IImageOptions;

  lineConfig = {
    fill: '#ffffff',
    stroke: '#ffffff',
    strokeWidth: 1,
    strokeLineCap: 'round',
    selectable: false,
    evented: false,
  };

  circleConfig = [{
    radius: 6,
    fill: 'rgba(0,0,0,0)',
    left: 357,
    top: 332,
    stroke: '#fff',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 6,
    fill: 'rgba(0,0,0,0)',
    left: 302,
    top: 324,
    stroke: '#fff',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 6,
    fill: 'rgba(0,0,0,0)',
    left: 233,
    top: 322,
    stroke: '#fff',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 6,
    fill: 'rgba(0,0,0,0)',
    left: 233,
    top: 162,
    stroke: '#fff',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }];

  clickCircleConfig = [{
    radius: 12,
    fill: 'rgba(0,0,0,0)',
    left: 351,
    top: 326,
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 12,
    fill: 'rgba(0,0,0,0)',
    left: 296,
    top: 318,
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 12,
    fill: 'rgba(0,0,0,0)',
    left: 227,
    top: 316,
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 12,
    fill: 'rgba(0,0,0,0)',
    left: 227,
    top: 156,
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }];

  titleConfig = {
    originY: 'center',
    originX: 'center',
    left: 512,
    top: 540,
    fontSize: 18,
    fill: 'white',
    selectable: false
  };
}
