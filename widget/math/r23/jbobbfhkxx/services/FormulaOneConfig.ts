import { GetScaleValue } from './GetScaleValue';

export class FormulaOneConfig {

  width = window.innerWidth;
  height = window.innerHeight;

  scale = new GetScaleValue().getScale();

  line = {
    width: (560 - 14) * this.scale,
    height: 2 * this.scale,
    left: this.width * 0.343,
    top: this.height * 0.5,
    fill: '#888888',
    selectable: false,
    originX: 'center',
    originY: 'center',
  };

  arrow = {
    left: this.width * 0.343 + (560 - 14) * 0.5 * this.scale,
    top: this.height * 0.5,
    width: 14 * this.scale,
    height: 16 * this.scale,
    fill: '#888888',
    selectable: false,
    originX: 'center',
    originY: 'center',
  };

  circleLine = {
    left: this.width * 0.343,
    top: this.height * 0.5,
    radius: 180 * this.scale,
    fill: '',
    strokeWidth: 2 * this.scale,
    stroke: '#AC84FF',
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    selectable: false,
  };

  smallCircleDragPoint = {
    width: 44 * 2,
    height: 44 * 2,
    left: this.width * 0.343 + (180) * this.scale * Math.sin(45 * Math.PI / 180),
    top: this.height * 0.5 - (180) * this.scale * Math.cos(45 * Math.PI / 180),
    selectable: true,
    hasBorders: false,
    hasControls: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
    originX: 'center',
    originY: 'center',
  };

  violetSolidLine = {
    fill: '#AC84FF',
    stroke: '#AC84FF',
    strokeWidth: 3 * this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center',
  };

  violetDottedLine = {
    fill: '#AC84FF',
    stroke: '#AC84FF',
    strokeWidth: 3 * this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center',
    strokeDashArray: [5 , 5]
  };

  blueLine = {
    stroke: '#18A2FF',
    strokeWidth: 3 * this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center',
  };

  yellowLine = {
    stroke: '#FFD621',
    strokeWidth: 3 * this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center',
  };

  greenLine = {
    stroke: '#9BF23B',
    strokeWidth: 3 * this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center',
  };

  screwGreenLine = {
    fill: '',
    stroke: '#9BF23B',
    strokeWidth: 3 * this.scale,
    selectable: false,
  };

  screwBlueLine = {
    fill: '',
    stroke: '#0199ff',
    strokeWidth: 3 * this.scale,
    selectable: false,
  };

  screwLine = {
    fill: '',
    stroke: '#0199ff',
    strokeWidth: 1 * this.scale,
    selectable: false,
  };

  rightAngle = {
    fill: '',
    stroke: '#D96C00',
    strokeWidth: 2 * this.scale,
    selectable: false,
    originX: 'center',
    originY: 'center',
  };

  pText = {
    left: this.width * 0.47,
    top: this.height * 0.342,
    fill: '#ffffff',
    fontStyle: 'italic',
    selectable: false,
    fontSize: 20 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  paiText = {
    left: this.width * 0.47,
    top: this.height * 0.342,
    fill: '#ffffff',
    // fontStyle: 'italic',
    selectable: false,
    fontSize: 20 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  redLine = {
    left: this.width * 0.343,
    top: this.height * 0.5,
    radius: 80 * this.scale,
    fill: '',
    strokeWidth: 2 * this.scale,
    stroke: '#D96C00',
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    selectable: false,
    startAngle: 0,
    endAngle: Math.PI
  };

  pai = {
    width: 13 * 2,
    height: 30 * 2,
    left: this.width * 0.343 + (72) * this.scale * Math.sin(-10 * Math.PI / 180),
    top: this.height * 0.5 - (72) * this.scale * Math.cos(-10 * Math.PI / 180),
    selectable: true,
    hasBorders: false,
    hasControls: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
    originX: 'center',
    originY: 'center',
  };

  xText = {
    left: this.width * 0.343 + (560 - 14) * 0.5 * this.scale,
    top: this.height * 0.545,
    fill: '#ffffff',
    fontStyle: 'italic',
    selectable: false,
    fontSize: 20 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  yText = {
    left: this.width * 0.323,
    top: this.height * 0.5 - (560 - 14) * 0.5 * this.scale,
    fill: '#ffffff',
    fontStyle: 'italic',
    selectable: false,
    fontSize: 20 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  oText = {
    left: this.width * 0.330,
    top: this.height * 0.536,
    fill: '#ffffff',
    fontStyle: 'italic',
    selectable: false,
    fontSize: 20 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  numberText1 = {
    left: this.width * 0.343 + (190) * this.scale,
    top: this.height * 0.5 + (10) * this.scale,
    fill: '#ffffff',
    selectable: false,
    fontSize: 20 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  numberText2 = {
    left: this.width * 0.343 + (-190) * this.scale,
    top: this.height * 0.5 + (10) * this.scale,
    fill: '#ffffff',
    selectable: false,
    fontSize: 20 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  numberText3 = {
    left: this.width * 0.343 + (-10) * this.scale,
    top: this.height * 0.5 + (-190) * this.scale,
    fill: '#ffffff',
    selectable: false,
    fontSize: 20 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  numberText4 = {
    left: this.width * 0.343 + (-10) * this.scale,
    top: this.height * 0.5 + (190) * this.scale,
    fill: '#ffffff',
    selectable: false,
    fontSize: 20 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  
}







