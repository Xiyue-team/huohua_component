import { fabric } from 'fabric';

export class MyConfig {
  rect = {
    left: 0,
    top: 0,
    width: 921,
    height: 396,
    fill: '#000000',
    strokeWidth: 2,
    stroke: '#ffffff',
    selectable: false,
    opacity: 0.7,
    visible: false,
  };

  cardConfig = [
    {
      left: 0,
      top: 0
    },
    {
      left: 136 + 21,
      top: 0
    },
    {
      left: 136 + 21 + 136 + 21,
      top: 0
    },
    {
      left: 136 + 21 + 136 + 21 + 136 + 21,
      top: 0
    },
    {
      left: 136 + 21 + 136 + 21 + 136 + 21 + 136 + 21,
      top: 0
    },
    {
      left: 136 + 21 + 136 + 21 + 136 + 21 + 136 + 21 + 136 + 21,
      top: 0
    },
    // 第二排
    {
      left: 0,
      top: 188 + 20
    },
    {
      left: 136 + 21,
      top: 188 + 20
    },
    {
      left: 136 + 21 + 136 + 21,
      top: 188 + 20
    },
    {
      left: 136 + 21 + 136 + 21 + 136 + 21,
      top: 188 + 20
    },
    {
      left: 136 + 21 + 136 + 21 + 136 + 21 + 136 + 21,
      top: 188 + 20
    },
    {
      left: 136 + 21 + 136 + 21 + 136 + 21 + 136 + 21 + 136 + 21,
      top: 188 + 20
    },
  ];

  cardImage = {
    left: 0,
    top: 0,
    width: 136 * 2,
    height: 188 * 2,
    scaleX: 0.5,
    scaleY: 0.5,
    hasControls: false,
    hasBorders: false,
  };

}







