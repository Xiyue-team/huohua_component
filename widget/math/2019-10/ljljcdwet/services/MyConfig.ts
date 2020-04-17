export class MyConfig {
  width = 1200;
  height = 675;

  rect = {
    left: 2,
    top:  2,
    width: 720,
    height: 450,
    fill: '#ffffff',
    strokeWidth: 2,
    stroke: '#ffffff',
    selectable: false,
    opacity: 0.1,
    rx: 12,
    ry: 12
  };

  circle1 = {
    left: this.rect.left + ( 84 + 204 ),
    top: this.rect.top + this.rect.height * 0.5,
    radius: 84,
    fill: '#404040',
    selectable: false,
    originX: 'center',
    originY: 'center',
  };

  circle2 = {
    left: this.rect.left + ( 319 + 84 ),
    top: this.rect.top + this.rect.height * 0.5,
    radius: 84,
    fill: '#404040',
    globalCompositeOperation: '',
    selectable: false,
    originX: 'center',
    originY: 'center',
  };

  overlappingColors = {
    left: this.rect.left + ( 319 + 84 ),
    top: this.rect.top + this.rect.height * 0.5,
    radius: 84,
    fill: '#FFD621',
    selectable: false,
    originX: 'center',
    originY: 'center',
  };

  circleLine1 = {
    left: this.rect.left + ( 84 + 204 ),
    top: this.rect.top + this.rect.height * 0.5,
    radius: 84,
    fill: '',
    stroke: '#fff',
    strokeWidth: 3,
    opacity: 0.5,
    originX: 'center',
    originY: 'center',
    hasControls: false,
    hasBorders: false,
  };

  circleLine2 = {
    left: this.rect.left + ( 319 + 84 ),
    top: this.rect.top + this.rect.height * 0.5,
    radius: 84,
    fill: '',
    stroke: '#fff',
    strokeWidth: 3,
    opacity: 0.5,
    originX: 'center',
    originY: 'center',
    hasControls: false,
    hasBorders: false,
  };

  textA = {
    left: this.circle1.left,
    top: this.circle1.top,
    text: 'A',
    fontSize: 28,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff',
    originX: 'center',
    originY: 'center',
    selectable: false,
  };

  textB = {
    left: this.circle2.left,
    top: this.circle2.top,
    text: 'B',
    fontSize: 28,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff',
    originX: 'center',
    originY: 'center',
    selectable: false,
  };

  textU = {
    left: this.rect.left + this.rect.width - 28,
    top: this.rect.top + 28,
    text: 'U',
    fontSize: 28,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff',
    originX: 'center',
    originY: 'center',
    selectable: false,
    hoverCursor: 'default'
  };

  formulaImage1 = {
    left: this.rect.left + this.rect.width * 0.5 - 236 * 0.5 * 0.5,
    top: this.rect.top + this.rect.height + 27,
    width: 236,
    height: 46,
    scaleX: 0.5,
    scaleY: 0.5,
    visible: false
  };

  formulaImage2 = {
    left: this.rect.left + this.rect.width * 0.5 - 240 * 0.5 * 0.5,
    top: this.rect.top + this.rect.height + 27,
    width: 240,
    height: 46,
    scaleX: 0.5,
    scaleY: 0.5,
    visible: false
  };

  formulaImage3 = {
    left: this.rect.left + this.rect.width * 0.5 - 190 * 0.5 * 0.5,
    top: this.rect.top + this.rect.height + 27,
    width: 190,
    height: 46,
    scaleX: 0.5,
    scaleY: 0.5,
    visible: false
  };
}







