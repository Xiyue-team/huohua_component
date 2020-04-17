import {fabric} from 'fabric';
export class PenicilliumConfig {

  penicilliumImageConfig = {
    originY: 'center',
    originX: 'center',
    left: 548,
    top: 262,
    scaleX: 0.5,
    scaleY: 0.5,
    opacity: 1,
    selectable: false
  } as fabric.IImageOptions;

  orangeImageConfig = {
    originY: 'center',
    originX: 'center',
    left: 507,
    top: 284,
    scaleX: 0.5,
    scaleY: 0.5,
    selectable: false
  } as fabric.IImageOptions;

  circlePointConfig = [{
    radius: 6,
    originY: 'center',
    originX: 'center',
    fill: '#FFC100',
    left: 573,
    top: 197,
    stroke: '#fff',
    strokeWidth: 1,
    visible: true,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 6,
    originY: 'center',
    originX: 'center',
    fill: 'rgba(0,0,0,0)',
    left: 769,
    top: 158,
    stroke: '#fff',
    strokeWidth: 1,
    visible: false,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 6,
    originY: 'center',
    originX: 'center',
    fill: '#FFC10000',
    left: 796,
    top: 282,
    stroke: '#fff',
    strokeWidth: 1,
    visible: false,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 6,
    originY: 'center',
    originX: 'center',
    fill: '#FFC10000',
    left: 749,
    top: 407,
    stroke: '#fff',
    strokeWidth: 1,
    visible: false,
    selectable: false,
    hoverCursor: 'pointer',
  }];

  clickPointConfig = [{
    radius: 12,
    originY: 'center',
    originX: 'center',
    fill: 'rgba(0,0,0,0)',
    left: 573,
    top: 197,
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 1,
    visible: true,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 12,
    originY: 'center',
    originX: 'center',
    fill: 'rgba(0,0,0,0)',
    left: 769,
    top: 158,
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 1,
    visible: false,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 12,
    originY: 'center',
    originX: 'center',
    fill: 'rgba(0,0,0,0)',
    left: 796,
    top: 282,
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 1,
    visible: false,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 12,
    originY: 'center',
    originX: 'center',
    fill: 'rgba(0,0,0,0)',
    left: 749,
    top: 407,
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 1,
    visible: false,
    selectable: false,
    hoverCursor: 'pointer',
  }];

  lineConfig = {
    fill: '#ffffff',
    stroke: '#ffffff',
    strokeWidth: 1,
    strokeLineCap: 'round',
    visible: false,
    selectable: false,
    evented: false,
  };

  titleConfig = [{
    left: 780,
    top: 147,
    fontSize: 18,
    fill: 'white',
    visible: false,
    selectable: false
  }, {
    left: 808,
    top: 272,
    fontSize: 18,
    fill: 'white',
    visible: false,
    selectable: false
  }, {
    left: 760,
    top: 395,
    fontSize: 18,
    fill: 'white',
    visible: false,
    selectable: false
  }];

  detailConfig = [{
    left: 781,
    top: 175,
    fontSize: 12,
    fill: 'white',
    visible: false,
    selectable: false
  }, {
    left: 809,
    top: 300,
    fontSize: 12,
    fill: 'white',
    visible: false,
    selectable: false
  }, {
    left: 761,
    top: 424,
    fontSize: 12,
    fill: 'white',
    visible: false,
    selectable: false
  }];


}
