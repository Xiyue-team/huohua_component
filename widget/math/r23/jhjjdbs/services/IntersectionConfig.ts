import { ScaleValue } from './ScaleValue';

export class IntersectionConfig {

  scaleValue = new ScaleValue();

  width = window.innerWidth;
  height = window.innerHeight;

  scale = this.scaleValue.scale;

  backgroundImage = {
    width :  window.innerWidth,
    height :  window.innerHeight,
    x : 0,
    y : 0,
  };

  rect = {
    x: 150 * this.scale,
    y: 113 * this.scale,
    width: this.width * 0.6,
    height: this.height * 0.667,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4,
    visible: false
  };

  textA = {
    x: this.width * 0.3665 + this.height * 0.275,
    y: this.height * 0.478,
    text: 'B',
    fontSize: 28 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff'
  };

  textB = {
    x: this.width * 0.354,
    y: this.height * 0.477,
    text: 'A',
    fontSize: 28 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff'
  };

  oval = {
    x: this.width * 0.3665 + this.height * 0.148 * 2,
    y: this.height * 0.501,
    radiusX: this.height * 0.2665,
    radiusY: this.height * 0.2665,
    fill: '#FFD621',
    draggable: true,
  };

  oval2 = {
    x: this.width * 0.3665,
    y: this.height * 0.501,
    radiusX: this.height * 0.148,
    radiusY: this.height * 0.148,
    fill: '#18A2FF',
    globalCompositeOperation: '',
    draggable: true,
  };

  oval3 = {
    x: this.width * 0.3665,
    y: this.height * 0.501,
    radiusX: this.height * 0.148,
    radiusY: this.height * 0.148,
    fill: '#9BF23B',
  };

  textAB = {
    x: this.width * 0.397,
    y: this.height * 0.8,
    text: 'A    B',
    fontSize: 30 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff'
  };

  textU = {
    x: this.width * 0.416,
    y: this.height * 0.8,
    text: '∩',
    fontSize: 30 * this.scaleValue.scale,
    fontFamily: 'Times New Roman',
    fill: '#ffffff'
  };


  numberAxis = {
    x: 0,
    y: 0,
    points: [this.width * 0.15, this.height * 0.591,
             this.width * 0.817, this.height * 0.591],
    pointerLength: 20,
    pointerWidth: 20,
    fill: '#707070',
    stroke: '#707070',
    strokeWidth: 4
  };

  zero = {
    x: this.width * 0.15 + (this.width * 0.817 - this.width * 0.15) / 2,
    y: this.height * 0.591,
    radiusX: this.height * 0.005,
    radiusY: this.height * 0.005,
    fill: '#ffffff',
  };

  textO = {
    x: this.width * 0.48,
    y: this.height * 0.6,
    text: 'O',
    fontSize: 28 * this.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff'
  };

  blueRect = {
    x: this.width * 0.15,
    y: this.height * 0.412,
    width: this.width * 0.433,
    height: this.height * 0.178,
    fill: '#18A2FF',
  };

  blueRectFrame = {
    points: [ this.width * 0.15, this.height * 0.412,
              this.width * 0.583, this.height * 0.412,
              this.width * 0.583, this.height * 0.590],
    stroke: '#ffffff',
    strokeWidth: 3,
    opacity: 0.8,
  };

  yellowRect = {
    x: this.width * 0.383,
    y: this.height * 0.487,
    width: this.width * 0.817 - this.width * 0.383 - 22,
    height: this.height * 0.103,
    fill: '#FFD621',
    globalCompositeOperation: 'xor',
  };

  yellowRectFrame = {
    points: [ this.width * 0.817 - 22, this.height * 0.487,
              this.width * 0.383, this.height * 0.487,
              this.width * 0.383, this.height * 0.590],
    stroke: '#ffffff',
    strokeWidth: 3,
    opacity: 0.8,
  };

  overlappingRect = {
    x: this.width * 0.383,
    y: this.height * 0.487,
    width: this.width * 0.817 - this.width * 0.383 - 22,
    height: this.height * 0.103,
    fill: '#9BF23B',
  };

  blueButtonGroup = {
    x: this.width * 0.583,
    y: this.height * 0.590,
    draggable: true,
    dragBoundFunc: (pos: any) => {
      return {
        x: pos.x,
        y: this.height * 0.590,
      };
    }
  };

  blueButtonWhitePoint = {
    x: this.width * 0,
    y: this.height * 0,
    radiusX: this.height * 0.0075,
    radiusY: this.height * 0.0075,
    fill: '#ffffff',
  };

  blueButton = {
    x: 0,
    y: 0,
    radiusX: this.height * 0.022,
    radiusY: this.height * 0.022,
    fill: '#ffffff',
    opacity: 0.36
  };

  yellowButtonGroup = {
    x: this.width * 0.383,
    y: this.height * 0.590,
    draggable: true,
    dragBoundFunc: (pos: any) => {
      return {
        x: pos.x,
        y: this.height * 0.590,
      };
    }
  };

  xaText = {
    width :  30 * this.scale,
    height :  16  * this.scale,
    x : this.width * 0.37,
    y : this.height * 0.647,
  };

  xbText = {
    width :  30 * this.scale,
    height :  16  * this.scale,
    x : this.width * 0.576,
    y : this.height * 0.647,
  };

  xaFormula = {
    width :  176 * this.scale,
    height :  26  * this.scale,
    x : this.width * 0.149,
    y : this.height * 0.354,
  };

  xbFormula = {
    width :  176 * this.scale,
    height :  26  * this.scale,
    x : this.width * 0.653,
    y : this.height * 0.425,
  };


  xaValue = {
    width :  30 * this.scale,
    height :  16  * this.scale,
    x : this.width * 0.654,
    y : this.height * 0.801,
  };

  xbValue = {
    width :  30 * this.scale,
    height :  16  * this.scale,
    x : this.width * 0.654,
    y : this.height * 0.873,
  };

  textEqualSign1 = {
    x: this.width * 0.654 + 32 * this.scale,
    y: this.height * 0.801 - 4  * this.scale,
    text: '=',
    fontSize: 28 * this.scale,
    fontFamily: 'Times New Roman',
    fill: '#ffffff'
  };

  textEqualSign2 = {
    x: this.width * 0.654 + 32 * this.scale,
    y: this.height * 0.873 - 4  * this.scale,
    text: '=',
    fontSize: 28 * this.scale,
    fontFamily: 'Times New Roman',
    fill: '#ffffff'
  };

  xaValueNumber = {
    x: this.width * 0.654 + 32 * this.scale + 20 * this.scale,
    y: this.height * 0.801 - 4  * this.scale,
    text: '-3',
    fontSize: 28 * this.scale,
    fontFamily: 'Times New Roman',
    fill: '#ffffff'
  };

  xbValueNumber = {
    x: this.width * 0.654 + 32 * this.scale + 20 * this.scale,
    y: this.height * 0.873 - 4  * this.scale,
    text: '3',
    fontSize: 28 * this.scale,
    fontFamily: 'Times New Roman',
    fill: '#ffffff'
  };

}







