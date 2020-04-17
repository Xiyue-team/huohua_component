export class MyCanvasConfig {

  width = window.innerWidth;
  height = window.innerHeight;

  scale = (this.width / this.height > 1024 / 576 ? this.height / 576 : this.width / 1024);

  background = {
    left: this.width * 0.4375,
    top: this.height * 0.5305,
    width: 703 * 2 ,
    height: 391 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
    originX: 'center',
    originY: 'center',
  };

  rightRect = {
    width: 194 * this.scale,
    height: 388 * this.scale,
    left: this.width * 0.8925,
    top: this.height * 0.5305,
    fill: '#d8d8d8',
    selectable: false,
    originX: 'center',
    originY: 'center',
    opacity: 0.5
  };

  leftLine = {
    width: 4 * this.scale,
    height: 411 * this.scale,
    left: this.width * 0.4375 - 703 * 0.5 * this.scale + 39 * this.scale,
    top: this.height * 0.5305,
    fill: '#EE7F35',
    selectable: false,
    originX: 'center',
    originY: 'center',
    visible: false
  };

  rightLine = {
    width: 4 * this.scale,
    height: 411 * this.scale,
    left: this.width * 0.4375 - 703 * 0.5 * this.scale + 26 * 25 * this.scale + 13 * this.scale,
    top: this.height * 0.5305,
    fill: '#EE7F35',
    selectable: false,
    originX: 'center',
    originY: 'center',
    visible: false
  };

  tipsText = {
    left: this.width * 0.4375,
    top: this.height * 0.5305 - 391 * 0.5 * this.scale + 431 * this.scale,
    fill: '#000000',
    selectable: false,
    hasBorders: false,
    hasControls: false,
    fontSize: 12 * this.scale < 12 ? 12 : 12 * this.scale,
    opacity: 0.5,
    originX: 'center',
    originY: 'center',
  };

  whiteLine = {
    width: 4 * this.scale,
    height: 411 * this.scale,
    left: this.width * 0.4375,
    top: this.height * 0.5305 - 391 * 0.5 * this.scale + 411 * 0.5 * this.scale,
    fill: '#ffffff',
    selectable: false,
    originX: 'center',
    originY: 'center',
    strokeWidth: 1,
    stroke: 'rgba(0,0,0,0.06)',
    shadow: {
      offsetX: 1,
      offsetY: 4,
      color: 'rgba(0,0,0,0.10)'
    }
  };

  whiteCircle = {
    left: 0,
    top: 0,
    radius: 15,
    fill: '#fff',
    opacity: 0.72,
    shadow: {color: 'rgba(0,0,0,0.3)', offsetX: 0.1, offsetY: 0.1},
    strokeWidth: 1,
    stroke: 'rgba(0,0,0,0.06)',
    scaleX: this.scale,
    scaleY: this.scale,
    hasBorders: false,
    hasControls: false,
  };

  blueCircle = {
    left: 10 * this.scale,
    top: 10 * this.scale,
    radius: 5,
    fill: '#0199ff',
    scaleX: this.scale,
    scaleY: this.scale,
    hasBorders: false,
    hasControls: false,
  };

  whiteLineButton = {
    left: this.width * 0.4375,
    top: this.height * 0.5305 - 391 * 0.5 * this.scale + 411 * this.scale,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center'
  };

  rightButton1 = {
    left: this.width * 0.8925 - 194 * 0.5 * this.scale + 88 * 0.5 * this.scale + 19 * this.scale,
    top: this.height * 0.5305 - 388 * 0.5 * this.scale + 40 * 0.5 * this.scale + 19 * this.scale,
    width: 88 * this.scale,
    height: 40 * this.scale,
    text: '地方时',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 3,
    rx: 21 * this.scale,
    selectable: false,
  };

  rightButton2 = {
    left: this.width * 0.8925 - 194 * 0.5 * this.scale + 88 * 0.5 * this.scale + 19 * this.scale,
    top: this.height * 0.5305 - 388 * 0.5 * this.scale + 40 * 0.5 * this.scale + 73 * this.scale,
    width: 88 * this.scale,
    height: 40 * this.scale,
    text: '时区',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 2,
    rx: 21 * this.scale,
    selectable: false,
  };

  rightButton3 = {
    left: this.width * 0.8925 - 194 * 0.5 * this.scale + 88 * 0.5 * this.scale + 19 * this.scale,
    top: this.height * 0.5305 - 388 * 0.5 * this.scale + 40 * 0.5 * this.scale + 127 * this.scale,
    width: 88 * this.scale,
    height: 40 * this.scale,
    text: '区时',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 2,
    rx: 21 * this.scale,
    selectable: false,
  };

  rightButton4 = {
    left: this.width * 0.8925 - 194 * 0.5 * this.scale + 88 * 0.5 * this.scale + 19 * this.scale,
    top: this.height * 0.5305 - 388 * 0.5 * this.scale + 40 * 0.5 * this.scale + 181 * this.scale,
    width: 88 * this.scale,
    height: 40 * this.scale,
    text: '世界时',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 3,
    rx: 21 * this.scale,
    selectable: false,
  };

  longitudeButton = {
    left: this.width * 0.4375,
    top: this.height * 0.5305 - 388 * 0.5 * this.scale - 27 * this.scale,
    width: 88 * this.scale,
    height: 40 * this.scale,
    text: '0°',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 3,
    rx: 21 * this.scale,
    selectable: false,
  };

  rightText1 = {
    left: this.width * 0.8925 - 194 * 0.5 * this.scale + 127 * this.scale,
    top: this.height * 0.5305 - 388 * 0.5 * this.scale + 31 * this.scale,
    fill: '#525252',
    selectable: false,
    hasBorders: false,
    hasControls: false,
    fontSize: 16 * this.scale,
  };

  rightText2 = {
    left: this.width * 0.8925 - 194 * 0.5 * this.scale + 127 * this.scale,
    top: this.height * 0.5305 - 388 * 0.5 * this.scale + 85 * this.scale,
    fill: '#525252',
    selectable: false,
    hasBorders: false,
    hasControls: false,
    fontSize: 16 * this.scale,
  };

  rightText3 = {
    left: this.width * 0.8925 - 194 * 0.5 * this.scale + 127 * this.scale,
    top: this.height * 0.5305 - 388 * 0.5 * this.scale + 139 * this.scale,
    fill: '#525252',
    selectable: false,
    hasBorders: false,
    hasControls: false,
    fontSize: 16 * this.scale,
  };

  rightText4 = {
    left: this.width * 0.8925 - 194 * 0.5 * this.scale + 127 * this.scale,
    top: this.height * 0.5305 - 388 * 0.5 * this.scale + 193 * this.scale,
    fill: '#525252',
    selectable: false,
    hasBorders: false,
    hasControls: false,
    fontSize: 16 * this.scale,
  };

  rightButtonText1 = {
    left: this.width * 0.8925 - 194 * 0.5 * this.scale + 4 * this.scale,
    top: this.height * 0.5305 - 388 * 0.5 * this.scale + 236 * this.scale,
    width: 187 * 2 ,
    height: 114 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
    visible: false
  };

  rightButtonText2 = {
    left: this.width * 0.8925 - 194 * 0.5 * this.scale + 4 * this.scale,
    top: this.height * 0.5305 - 388 * 0.5 * this.scale + 236 * this.scale,
    width: 187 * 2 ,
    height: 114 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
    visible: false
  };

  rightButtonText3 = {
    left: this.width * 0.8925 - 194 * 0.5 * this.scale + 4 * this.scale,
    top: this.height * 0.5305 - 388 * 0.5 * this.scale + 236 * this.scale,
    width: 187 * 2 ,
    height: 114 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
    visible: false
  };

  rightButtonText4 = {
    left: this.width * 0.8925 - 194 * 0.5 * this.scale + 4 * this.scale,
    top: this.height * 0.5305 - 388 * 0.5 * this.scale + 236 * this.scale,
    width: 187 * 2 ,
    height: 136 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
    visible: false
  };
}







