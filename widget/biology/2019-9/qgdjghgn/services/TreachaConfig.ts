import {fabric} from 'fabric';
export class TreachaConfig {

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
    left: 505,
    top: 215,
    scaleX: 0.02,
    scaleY: 0.02,
    opacity: 0,
    selectable: false
  }, {
    originY: 'center',
    originX: 'center',
    left: 515,
    top: 430,
    scaleX: 0.07,
    scaleY: 0.07,
    opacity: 0,
    selectable: false
  }, {
    originY: 'center',
    originX: 'center',
    left: 514,
    top: 128,
    scaleX: 0.04,
    scaleY: 0.04,
    opacity: 0,
    selectable: false
  }];

  lineImgConfig = {
    originY: 'center',
    originX: 'center',
    left: 512,
    top: 288,
    scaleX: 0.5,
    scaleY: 0.5,
    opacity: 1,
    selectable: false
  };

  zoomInConfig = {
    scaleX: 0.2,
    scaleY: 0.2,
    left: 130,
    top: 480
  } as fabric.IImageOptions;

  clickCircleConfig = [{
    radius: 16,
    fill: 'rgba(0,0,0,0)',
    left: 673,
    top: 200,
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 16,
    fill: 'rgba(0,0,0,0)',
    left: 682,
    top: 472,
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 16,
    fill: 'rgba(0,0,0,0)',
    left: 697,
    top: 80,
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }];

  annotation_TextConfig = [{
    fill: '#fff',
    fontSize: 20,
    left: 355,
    top: 175,
    visible: true,
    selectable: false
  },
    {
      fill: '#fff',
      fontSize: 20,
      left: 610,
      top: 83,
      visible: true,
      selectable: false
    },
    {
      fill: '#fff',
      fontSize: 20,
      left: 612,
      top: 131,
      visible: true,
      selectable: false
    },

    {
      fill: '#fff',
      fontSize: 20,
      left: 686,
      top: 129,
      visible: false,
      selectable: false
    },
    {
      fill: '#fff',
      fontSize: 20,
      left: 725,
      top: 332,
      visible: false,
      selectable: false
    },
    {
      fill: '#fff',
      fontSize: 20,
      left: 726,
      top: 178,
      visible: false,
      selectable: false
    },
    {
      fill: '#fff',
      fontSize: 20,
      left: 726,
      top: 248,
      visible: false,
      selectable: false
    },
    {
      fill: '#fff',
      fontSize: 20,
      left: 726,
      top: 321,
      visible: false,
      selectable: false
    },
    {
      fill: '#fff',
      fontSize: 20,
      left: 726,
      top: 419,
      visible: false,
      selectable: false
    }];
}
