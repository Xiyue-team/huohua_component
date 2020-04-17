import {fabric} from 'fabric';
export class OvaryConfig {

  initImageConfig = {
    originY: 'center',
    originX: 'center',
    left: 510,
    top: 288,
    hoverCursor: 'pointer',
    scaleX: 0.25,
    scaleY: 0.25,
    opacity: 0,
    selectable: false
  } as fabric.IImageOptions;

  zoomOutConfig = {
    scaleX: 0.5,
    scaleY: 0.5,
    left: 510,
    top: 60
  };

  textConfig = [{
    originY: 'center',
    originX: 'right',
    left: 260,
    top: 298,
    fontSize: 20,
    fill: 'white',
    selectable: false
  }, {
    originY: 'center',
    originX: 'right',
    left: 260,
    top: 362,
    fontSize: 20,
    fill: 'white',
    selectable: false
  }, {
    originY: 'center',
    originX: 'right',
    left: 260,
    top: 415,
    fontSize: 20,
    fill: 'white',
    selectable: false
  }];

  textLineConfig = [{
    fill: '#ffffff',
    stroke: '#ffffff',
    strokeWidth: 2,
    strokeLineCap: 'round',
    selectable: false,
    evented: false,
  }];
}
