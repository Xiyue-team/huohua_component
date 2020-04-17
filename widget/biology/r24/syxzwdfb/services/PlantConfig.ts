import {fabric} from 'fabric';
export class PlantConfig {
  backgroundConfig = {
    left: 0,
    top: 0,
    selectable: false
  } as fabric.IImageOptions;

  minDesertConfig = {
    left: 180,
    top: 125,
    selectable: false
  } as fabric.IImageOptions;

  minMeadowConfig = {
    left: 370,
    top: 130,
    selectable: false
  } as fabric.IImageOptions;

  minForestConfig = {
    left: 484,
    top: 223,
    selectable: false
  } as fabric.IImageOptions;

  minRainforestConfig = {
    left: 493,
    top: 452,
    selectable: false
  } as fabric.IImageOptions;

  desertZoomOutConfig = {
    left: 215,
    top: 146,
    hoverCursor: 'pointer',
    selectable: false
  } as fabric.IImageOptions;

  meadowZoomOutConfig = {
    left: 405,
    top: 150,
    hoverCursor: 'pointer',
    selectable: false
  } as fabric.IImageOptions;

  forestZoomOutConfig = {
    left: 519,
    top: 244,
    hoverCursor: 'pointer',
    selectable: false
  } as fabric.IImageOptions;

  rainforestZoomOutConfig = {
    left: 528,
    top: 470,
    hoverCursor: 'pointer',
    selectable: false
  } as fabric.IImageOptions;

  zoomRectConfig = {
    left: 199,
    top: 70,
    width: 622,
    height: 444,
    fill: '#2b2b2b',
    selectable: false
  };

  zommInConfig = {
    left: 755,
    top: 90,
    hoverCursor: 'pointer',
    selectable: false
  }as fabric.IImageOptions;

  rightButton = {
    left: 594,
    top: 372,
    selectable: false
  } as fabric.IImageOptions;
}
