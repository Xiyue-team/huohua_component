export class YzddxConfig {

  width = window.innerWidth;
  height = window.innerHeight;

  scale = this.width / this.height < 16 / 9 ? this.height / 675 : this.width / 1200;

  blueRect = {
    width: 260 * this.scale,
    height: 260 * this.scale,
    originX: 'center',
    originY: 'center',
    left: this.width * 0.5,
    top: this.height * 0.5,
    fill: '#0091ff',
    selectable: false,
    stroke: '#ffffff',
    strokeWidth: 2
  };

  yellowRect = {
    width: 110 * this.scale,
    height: 110 * this.scale,
    originX: 'center',
    originY: 'center',
    left: this.width * 0.5 - 260 * 0.5 * this.scale + 110 * 0.5 * this.scale,
    top: this.height * 0.5  - 260 * 0.5 * this.scale + 110 * 0.5 * this.scale,
    fill: '#ffd621',
    selectable: false,
  };

  greenRect = {
    width: 150 * this.scale,
    height: 150 * this.scale,
    originX: 'center',
    originY: 'center',
    left: this.width * 0.5 + 260 * 0.5 * this.scale - 150 * 0.5 * this.scale,
    top: this.height * 0.5 + 260 * 0.5 * this.scale - 150 * 0.5 * this.scale,
    fill: '#9BF23B',
    selectable: false,
  };

  leftButton = {
    width: 44 * 2,
    height: 44 * 2,
    left: this.width * 0.5 - 260 * 0.5 * this.scale,
    top: this.height * 0.5  - 260 * 0.5 * this.scale + 110 * this.scale,
    selectable: true,
    hasBorders: false,
    hasControls: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
    originX: 'center',
    originY: 'center',
  };

  rightButton = {
    width: 44 * 2 ,
    height: 44 * 2 ,
    left: this.width * 0.5 + 260 * 0.5 * this.scale,
    top: this.height * 0.5 + 260 * 0.5 * this.scale,
    selectable: true,
    hasBorders: false,
    hasControls: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
    originX: 'center',
    originY: 'center',
  };

  abText = {
    left: this.width * 0.5,
    top: this.height * 0.5 - 260 * 0.5 * this.scale - 24 * this.scale * 0.5 - 3,
    fill: '#ffffff',
    fontStyle: 'italic',
    selectable: false,
    fontSize: 24 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  aText = {
    left: this.width * 0.5 - 260 * 0.5 * this.scale - 24 * this.scale * 0.5,
    top: this.height * 0.5 - 260 * 0.5 * this.scale + 110 * this.scale * 0.5,
    fill: '#ffffff',
    fontStyle: 'italic',
    selectable: false,
    fontSize: 24 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  bText1 = {
    left: this.width * 0.5 - 260 * 0.5 * this.scale - 24 * this.scale * 0.5,
    top: this.height * 0.5 - 260 * 0.5 * this.scale + 110 * this.scale + 150 * this.scale * 0.5,
    fill: '#ffffff',
    fontStyle: 'italic',
    selectable: false,
    fontSize: 24 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  bText2 = {
    left: this.width * 0.5 - 260 * 0.5 * this.scale + 110 * this.scale + 150 * this.scale * 0.5,
    top: this.height * 0.5 + 260 * 0.5 * this.scale + 24 * this.scale * 0.5 + 3,
    fill: '#ffffff',
    fontStyle: 'italic',
    selectable: false,
    fontSize: 24 * this.scale,
    originX: 'center',
    originY: 'center'
  };

  a2Text = {
    left: this.width * 0.5 - 260 * 0.5 * this.scale + 110 * 0.5 * this.scale,
    top: this.height * 0.5  - 260 * 0.5 * this.scale + 110 * 0.5 * this.scale,
    fill: '#000000',
    fontStyle: 'italic',
    selectable: false,
    fontSize: 24 * this.scale,
    originX: 'center',
    originY: 'center',
    visible: false
  };

  b2Text = {
    left: this.width * 0.5 + 260 * 0.5 * this.scale - 150 * 0.5 * this.scale,
    top: this.height * 0.5 + 260 * 0.5 * this.scale - 150 * 0.5 * this.scale,
    fill: '#000000',
    fontStyle: 'italic',
    selectable: false,
    fontSize: 24 * this.scale,
    originX: 'center',
    originY: 'center',
    visible: false
  };

  abText2 = {
    left: this.width * 0.5 + 260 * 0.5 * this.scale - 150 * 0.5 * this.scale,
    top: this.height * 0.5  - 260 * 0.5 * this.scale + 110 * 0.5 * this.scale,
    fill: '#000000',
    fontStyle: 'italic',
    selectable: false,
    fontSize: 24 * this.scale,
    originX: 'center',
    originY: 'center',
    visible: false
  };

  abText3 = {
    left: this.width * 0.5 - 260 * 0.5 * this.scale + 110 * 0.5 * this.scale,
    top: this.height * 0.5 + 260 * 0.5 * this.scale - 150 * 0.5 * this.scale,
    fill: '#000000',
    fontStyle: 'italic',
    selectable: false,
    fontSize: 24 * this.scale,
    originX: 'center',
    originY: 'center',
    visible: false
  };

  explainButton = {
    left: this.width * 0.943,
    top: this.height * 0.921,
    width: 72 * this.scale,
    height: 42 * this.scale,
    text: '说明',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    rx: 21 * this.scale,
    textFill: '#000000',
    textNum: 2,
    visible: true,
    name: 'decisionRule'
  };

  explainImage = {
    left: this.width * 0.885,
    top: this.height * 0.809,
    width: 214 * 2 ,
    height: 92 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
    visible: false,
    name: 'explainImage',
    originX: 'center',
    originY: 'center'
  };
}







