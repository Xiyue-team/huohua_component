import {fabric} from 'fabric';
export class MatterConfig {

  frameImageConfig = {
    originY: 'center',
    originX: 'center',
    left: 600,
    top: 300,
    scaleX: 0.5,
    scaleY: 0.5,
    opacity: 1,
    selectable: false
  } as fabric.IImageOptions;

  tableImageConfig = {
    originY: 'center',
    originX: 'center',
    left: 600,
    top: 615,
    scaleX: 0.5,
    scaleY: 0.5,
    opacity: 1,
    selectable: true
  } as fabric.IImageOptions;

  matterImageConfig = [{
    left: 366,
    top: 525,
    hoverCursor: 'pointer',
    moveCursor: 'pointer',
    selectable: true,
    hasControls: false,
    hasBorders: false,
  }, {
    left: 466,
    top: 525,
    hoverCursor: 'pointer',
    moveCursor: 'pointer',
    selectable: true,
    hasControls: false,
    hasBorders: false,
  }, {
    left: 566,
    top: 525,
    hoverCursor: 'pointer',
    moveCursor: 'pointer',
    selectable: true,
    hasControls: false,
    hasBorders: false,
  }, {
    left: 666,
    top: 525,
    hoverCursor: 'pointer',
    moveCursor: 'pointer',
    selectable: true,
    hasControls: false,
    hasBorders: false,
  }, {
    left: 766,
    top: 525,
    hoverCursor: 'pointer',
    moveCursor: 'pointer',
    selectable: true,
    hasControls: false,
    hasBorders: false,
  }];

  imageConfig = {
    originY: 'center',
    originX: 'center',
    scaleX: 0.5,
    scaleY: 0.5,
    left: 0,
    top: 0,
    opacity: 1,
    selectable: false
  } as fabric.IImageOptions;

  titleConfig = {
    originY: 'center',
    originX: 'center',
    left: 0,
    top: 58,
    scaleX: 0.5,
    scaleY: 0.5,
    fontSize: 32,
    fill: 'white',
    selectable: false
  };

  rectConfig = {
    left: 42.5,
    top: 218.5,
    fill: '#fff',
    width: 74,
    height: 119,
    rx: 2,
    selectable: false
  };
}
