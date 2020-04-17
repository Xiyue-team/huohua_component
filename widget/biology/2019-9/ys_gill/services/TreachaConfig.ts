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

  tongueImage2Config = {
    originY: 'center',
    originX: 'center',
    left: 512,
    top: 288,
    scaleX: 1,
    scaleY: 1,
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
    opacity: 0,
    selectable: false
  }, {
    originY: 'center',
    originX: 'center',
    left: 343,
    top: 300,
    scaleX: 0.08,
    scaleY: 0.08,
    opacity: 0,
    selectable: false
  }, {
    originY: 'center',
    originX: 'center',
    left: 595,
    top: 300,
    scaleX: 0.08,
    scaleY: 0.08,
    opacity: 0,
    selectable: false
  }, {
    originY: 'center',
    originX: 'center',
    left: 586,
    top: 178,
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

  lineStepImgConfig = [{
    originY: 'center',
    originX: 'center',
    left: 517,
    top: 275,
    scaleX: 0.5,
    scaleY: 0.5,
    opacity: 1,
    selectable: false
  }];

  zoomInConfig = {
    scaleX: 0.2,
    scaleY: 0.2,
    left: 130,
    top: 480
  } as fabric.IImageOptions;

  clickCircleConfig = [{
    radius: 16,
    fill: 'rgba(0,0,0,0)',
    left: 154,
    top: 283,
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 16,
    fill: 'rgba(0,0,0,0)',
    left: 290,
    top: 280,
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }, {
    radius: 16,
    fill: 'rgba(0,0,0,0)',
    left: 286,
    top: 163,
    stroke: 'rgba(0,0,0,0)',
    strokeWidth: 1,
    selectable: false,
    hoverCursor: 'pointer',
  }];

  annotation_TextConfig = [{
    fill: '#fff',
    fontSize: 20,
    left: 735,
    top: 175,
    visible: false,
    selectable: false
  },
    {
      fill: '#fff',
      fontSize: 20,
      left: 735,
      top: 227,
      visible: false,
      selectable: false
    },
    {
      fill: '#fff',
      fontSize: 20,
      left: 629,
      top: 415,
      visible: false,
      selectable: false
    },

    {
      fill: '#fff',
      fontSize: 20,
      left: 310.9,
      top: 100.4,
      visible: false,
      selectable: false
    },
    {
      fill: '#fff',
      fontSize: 20,
      left: 583.4,
      top: 77.8,
      visible: false,
      selectable: false
    },
    {
      fill: '#fff',
      fontSize: 20,
      left: 735.9,
      top: 310.4,
      visible: false,
      selectable: false
    }];
}
