import {Context, Shape} from 'konva';

export class MyConfig {

  gridLine = {
    points: [0 , 0],
    stroke: '#C0E4DC',
    strokeWidth: 0.75
  };

  originLine = {
    points: [0 , 0],
    stroke: '#C0E4DC',
    strokeWidth: 4,
    visible: false
  };

  currentLine = {
    points: [0 , 0],
    stroke: '#F8EFAB',
    strokeWidth: 4,
    draggable: true,
    dragBoundFunc: (pos: any) => ({x: 0, y: 0}),
    hitFunc: (con: Context , shape: Shape ) => {}
  };

  dashLineStart = {
    points: [0 , 0],
    stroke: '#ECF5ED',
    strokeWidth: 3,
    dash: [5, 5]
  };

  dashLineEnd = {
    points: [0 , 0],
    stroke: '#ECF5ED',
    strokeWidth: 3,
    dash: [5, 5]
  };
}







