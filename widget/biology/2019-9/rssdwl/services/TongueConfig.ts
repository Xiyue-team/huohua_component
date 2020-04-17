import {fabric} from 'fabric';
export class TongueConfig {

  tongueImageConfig = {
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
    left: 463,
    top: 277,
    scaleX: 0.05,
    scaleY: 0.05,
    opacity: 0,
    selectable: false
  }, {
    originY: 'center',
    originX: 'center',
    left: 470,
    top: 348,
    scaleX: 0.07,
    scaleY: 0.07,
    opacity: 0,
    selectable: false
  }, {
    originY: 'center',
    originX: 'center',
    left: 468,
    top: 170,
    scaleX: 0.097,
    scaleY: 0.097,
    opacity: 0,
    selectable: false
  }];

  zoomInConfig = {
    scaleX: 0.2,
    scaleY: 0.2,
    left: 95,
    top: 480
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
    left: 338,
    top: 269,
    stroke: '#fff',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 6,
    fill: 'rgba(0,0,0,0)',
    left: 308,
    top: 339,
    stroke: '#fff',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 6,
    fill: 'rgba(0,0,0,0)',
    left: 243,
    top: 164,
    stroke: '#fff',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }];

  clickCircleConfig = [{
    radius: 12,
    fill: 'rgba(0,0,0,0)',
    left: 332,
    top: 263,
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 12,
    fill: 'rgba(0,0,0,0)',
    left: 302,
    top: 333,
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 12,
    fill: 'rgba(0,0,0,0)',
    left: 237,
    top: 158,
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }];
}
