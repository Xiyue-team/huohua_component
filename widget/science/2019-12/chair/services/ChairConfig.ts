import {fabric} from 'fabric';
export class ChairConfig {

  chairImageConfig = {
    originY: 'center',
    originX: 'center',
    left: 650,
    top: 300,
    scaleX: 0.5,
    scaleY: 0.5,
    opacity: 0,
    selectable: false
  } as fabric.IImageOptions;

  lineConfig = {
    fill: '#B7B7B7',
    stroke: '#B7B7B7',
    strokeWidth: 1,
    strokeLineCap: 'round',
    selectable: false,
    evented: false,
  };

  pointConfig = [{
    originY: 'center',
    originX: 'center',
    radius: 3,
    fill: '#fff',
    left: 670,
    top: 200,
    stroke: '#B7B7B7',
    strokeWidth: 1,
    selectable: false,
  }, {
    originY: 'center',
    originX: 'center',
    radius: 3,
    fill: '#fff',
    left: 620,
    top: 330,
    stroke: '#B7B7B7',
    strokeWidth: 1,
    selectable: false,
  }, {
    originY: 'center',
    originX: 'center',
    radius: 3,
    fill: '#fff',
    left: 585,
    top: 432,
    stroke: '#B7B7B7',
    strokeWidth: 1,
    selectable: false,
  }, {
    originY: 'center',
    originX: 'center',
    radius: 3,
    fill: '#fff',
    left: 700,
    top: 298,
    stroke: '#B7B7B7',
    strokeWidth: 1,
    selectable: false,
  }, {
    originY: 'center',
    originX: 'center',
    radius: 3,
    fill: '#fff',
    left: 715,
    top: 440,
    stroke: '#B7B7B7',
    strokeWidth: 1,
    selectable: false,
  }];

  rectConfig = [{
    left: 425,
    top: 180,
    fill: '#fff',
    width: 74,
    height: 40,
    rx: 21,
    stroke: '#B7B7B7',
    selectable: false
  }, {
    left: 425,
    top: 309,
    fill: '#fff',
    width: 74,
    height: 40,
    rx: 21,
    stroke: '#B7B7B7',
    selectable: false
  }, {
    left: 425,
    top: 412,
    fill: '#fff',
    width: 74,
    height: 40,
    rx: 21,
    stroke: '#B7B7B7',
    selectable: false
  }, {
    left: 830,
    top: 278,
    fill: '#fff',
    width: 74,
    height: 40,
    rx: 21,
    stroke: '#B7B7B7',
    selectable: false
  }, {
    left: 830,
    top: 420,
    fill: '#fff',
    width: 74,
    height: 40,
    rx: 21,
    stroke: '#B7B7B7',
    selectable: false
  }];

  groupRectConfig = {
    fill: '#fff',
    width: 74,
    height: 40,
    rx: 21,
    stroke: '#B7B7B7',
    selectable: false
  };
  titleConfig = {
    originY: 'center',
    originX: 'center',
    left: 37,
    top: 20,
    fontSize: 16,
    fill: '#000',
    selectable: false
  };

  groupConfig = [{
    left: 154,
    top: 170,
    hoverCursor: 'pointer',
    moveCursor: 'pointer',
    selectable: true,
    hasControls: false,
    hasBorders: false,
  }, {
    left: 154,
    top: 235,
    hoverCursor: 'pointer',
    moveCursor: 'pointer',
    selectable: true,
    hasControls: false,
    hasBorders: false,
  }, {
    left: 154,
    top: 300,
    hoverCursor: 'pointer',
    moveCursor: 'pointer',
    selectable: true,
    hasControls: false,
    hasBorders: false,
  }, {
    left: 154,
    top: 365,
    hoverCursor: 'pointer',
    moveCursor: 'pointer',
    selectable: true,
    hasControls: false,
    hasBorders: false,
  }, {
    left: 154,
    top: 430,
    hoverCursor: 'pointer',
    moveCursor: 'pointer',
    selectable: true,
    hasControls: false,
    hasBorders: false,
  }];
  trueRectConfig = {
    fill: '#64DF99',
    width: 286,
    height: 67,
    rx: 4,
    stroke: '#64DF99',
    selectable: false
  };
  trueTextConfig = {
    originY: 'center',
    originX: 'center',
    left: 143,
    top: 33.5,
    fontSize: 28,
    fill: '#fff',
    selectable: false
  };
}
