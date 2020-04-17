
export class LsConfig {
  width = window.innerWidth;
  height = window.innerHeight;

  scale = (this.width / this.height > 1024 / 576 ? this.height / 576 : this.width / 1024);

  fontFamily = '-apple-system, BlinkMacSystemFont, \'Helvetica Neue\', ' +
    '\'PingFang SC\', \'Microsoft YaHei\', \'Source Han Sans SC\', ' +
    '\'Noto Sans CJK SC\', \'WenQuanYi Micro Hei\', sans-serif';

  xText = {
    x: this.width * 0.466 + 230 * this.scale,
    y: this.height * 0.538,
    text: 'x',
    fontSize: 20 * this.scale ,
    fill: '#ffffff',
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    opacity: 0.4
  };

  yText = {
    x: this.width * 0.466 - 20 * this.scale,
    y: this.height * 0.535 - 230 * this.scale,
    text: 'y',
    fontSize: 20 * this.scale ,
    fill: '#ffffff',
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    opacity: 0.4
  };

  oText = {
    x: this.width * 0.466 - 13 * this.scale,
    y: this.height * 0.535 ,
    text: 'o',
    fontSize: 20 * this.scale ,
    fill: '#ffffff',
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
  };

  whiteCircle = {
    x: 0,
    y: 0,
    radius: 14,
    fill: 'rgba(255,255,255,0.36)',
    opacity: 0.72,
    shadow: {color: 'rgba(0,0,0,0.3)', offsetX: 0.1, offsetY: 0.1},
    strokeWidth: 1,
    stroke: 'rgba(0,0,0,0.06)',
    scaleX: this.scale,
    scaleY: this.scale,
  };

  blueCircle = {
    x: 0 * this.scale,
    y: 0 * this.scale,
    radius: 5,
    fill: '#ffffff',
    scaleX: this.scale,
    scaleY: this.scale,
  };

  whitePoint = [
    // 0
    {
      x: this.width * 0.326 + this.width * 0.0185,
      y: this.height * 0.672 + this.height * 0.0325,
      draggable: true,
      name: 'a'
    },
    // 1
    {
      x: this.width * 0.378 + this.width * 0.0185,
      y: this.height * 0.371 + this.height * 0.0325,
      draggable: true,
      name: '1'
    },
    // 22
    {
      x: this.width * 0.416 + this.width * 0.0185,
      y: this.height * 0.592 + this.height * 0.0325,
      draggable: true,
      name: '2'
    },
    // 3
    {
      x: this.width * 0.456 + this.width * 0.0185,
      y: this.height * 0.442 + this.height * 0.0325,
      draggable: true,
      name: '3'
    },
    // 4
    {
      x: this.width * 0.502 + this.width * 0.0185,
      y: this.height * 0.671 + this.height * 0.0325,
      draggable: true,
      name: '4'
    },
    // 5
    {
      x: this.width * 0.545 + this.width * 0.0185,
      y: this.height * 0.261 + this.height * 0.0325,
      draggable: true,
      name: '5'
    },
    // 6
    {
      x: this.width * 0.604 + this.width * 0.0185,
      y: this.height * 0.593 + this.height * 0.0325,
      draggable: true,
      name: 'b'
    },

  ];

  yellowPoint0 = {
    x: this.width * 0.326 + this.width * 0.0185,
    y: this.height * 0.535,
    draggable: true,
    fill: '#FFD621'
  };

  yellowPoint1 = {
    x: this.width * 0.604 + this.width * 0.0185,
    y: this.height * 0.535,
    draggable: true,
    fill: '#FFD621'
  };


  x1Text = {
    x: this.whitePoint[1].x - 18 * 0.5 * this.scale,
    y: this.height * 0.535,
    text: 'x₁',
    fontSize: 18 * this.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff',
  };

  x2Text = {
    x: this.whitePoint[2].x - 18 * 0.5 * this.scale,
    y: this.height * 0.535 - 18 * this.scale,
    text: 'x₂',
    fontSize: 18 * this.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff',
  };

  x3Text = {
    x: this.whitePoint[3].x,
    y: this.height * 0.535,
    text: 'x₃',
    fontSize: 18 * this.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff',
  };

  x4Text = {
    x: this.whitePoint[4].x - 18 * 0.5 * this.scale,
    y: this.height * 0.535 - 18 * this.scale,
    text: 'x₄',
    fontSize: 18 * this.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff',
  };

  x5Text = {
    x: this.whitePoint[5].x - 18 * 0.5 * this.scale,
    y: this.height * 0.535,
    text: 'x₅',
    fontSize: 18 * this.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff',
  };


  aText = {
    x: this.yellowPoint0.x - 18 * 0.3 * this.scale,
    y: this.yellowPoint0.y - 25 * this.scale,
    text: 'a',
    fontSize: 18 * this.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff',
  };

  bText = {
    x: this.yellowPoint1.x - 18 * 0.3 * this.scale,
    y: this.yellowPoint1.y - 25 * this.scale,
    text: 'b',
    fontSize: 18 * this.scale,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fill: '#ffffff',
  };


  blueLine = {
    points: [ this.whitePoint[0].x, this.whitePoint[0].y,
              this.whitePoint[1].x, this.whitePoint[1].y,
              this.whitePoint[2].x, this.whitePoint[2].y,
              this.whitePoint[3].x, this.whitePoint[3].y,
              this.whitePoint[4].x, this.whitePoint[4].y,
              this.whitePoint[5].x, this.whitePoint[5].y,
              this.whitePoint[6].x, this.whitePoint[6].y,
    ],
    stroke: '#18A2FF',
    strokeWidth: 3 * this.scale,
    lineCap: 'round',
    lineJoin: 'round',
    tension: 0.3
  };

  topWhiteLine = {
    points: [
      - 460 * 0.5 * this.scale, 0,
      460 * 0.5 * this.scale, 0
    ],
    stroke: '#ffffff',
    strokeWidth: 3 * this.scale,
    lineCap: 'round',
    lineJoin: 'round',
    tension: 0.5,
    dash: [10, 10],
    x: this.width * 0.466,
    y: this.whitePoint[5].y,
    visible: false
  };

  bottomWhiteLine = {
    points: [
      - 460 * 0.5 * this.scale, 0,
      460 * 0.5 * this.scale, 0
    ],
    stroke: '#ffffff',
    strokeWidth: 3 * this.scale,
    lineCap: 'round',
    lineJoin: 'round',
    tension: 0.5,
    dash: [10, 10],
    x: this.width * 0.466,
    y: this.whitePoint[0].y,
    visible: false
  };

  yellowLine1 = {
    points: [
      this.yellowPoint0.x, this.yellowPoint0.y,
      this.whitePoint[0].x, this.whitePoint[0].y,
    ],
    stroke: '#FFD621',
    strokeWidth: 3 * this.scale,
    lineCap: 'round',
    lineJoin: 'round',
    tension: 0.5,
    dash: [10, 10]
  };

  yellowLine2 = {
    points: [
      this.yellowPoint1.x, this.yellowPoint1.y,
      this.whitePoint[6].x, this.whitePoint[6].y,
    ],
    stroke: '#FFD621',
    strokeWidth: 3 * this.scale,
    lineCap: 'round',
    lineJoin: 'round',
    tension: 0.5,
    dash: [10, 10]
  };

  buttonRect1 = {
    x: 0,
    y: 0,
    width: 72 * this.scale > 72 ? 72 : 72 * this.scale,
    height: 42 * this.scale > 42 ? 42 : 42 * this.scale,
    fill: '#ffffff',
    cornerRadius: 21 * this.scale > 21 ? 21 : 21 * this.scale,
  };

  buttonText1 = {
    x: this.buttonRect1.width * 0.5 - (16 * this.scale > 16 ? 16 : 16 * this.scale),
    y: this.buttonRect1.height * 0.5 - (16 * this.scale > 16 ? 16 : 16 * this.scale) * 0.5,
    text: '极值',
    fontSize: 16 * this.scale > 16 ? 16 : 16 * this.scale,
    fill: '#000000',
    align: 'center'
  };

  button1 = {
    x: this.width - this.buttonRect1.width - 28 * this.scale,
    y: this.height * 0.70
  };

  buttonRect2 = {
    x: 0,
    y: 0,
    width: 72 * this.scale > 72 ? 72 : 72 * this.scale,
    height: 42 * this.scale > 42 ? 42 : 42 * this.scale,
    fill: '#ffffff',
    cornerRadius: 21 * this.scale > 21 ? 21 : 21 * this.scale,
  };

  buttonText2 = {
    x: this.buttonRect1.width * 0.5 - (16 * this.scale > 16 ? 16 : 16 * this.scale),
    y: this.buttonRect1.height * 0.5 - (16 * this.scale > 16 ? 16 : 16 * this.scale) * 0.5,
    text: '最值',
    fontSize: 16 * this.scale > 16 ? 16 : 16 * this.scale,
    fill: '#000000',
    align: 'center'
  };

  button2 = {
    x: this.width - this.buttonRect1.width - 28 * this.scale,
    y: this.height * 0.896
  };

  explainText1 = {
    x: this.width - this.buttonRect1.width - 28 * this.scale - 278 * this.scale,
    y: this.height * 0.70 - 74 * 0.5 * this.scale + (42 * this.scale > 42 ? 42 : 42 * this.scale) * 0.5,
    visible: false
  };

  explainText1Rect = {
    x: 0,
    y: 0,
    width: 276 * this.scale,
    height: 74 * this.scale,
    fill: 'rgba(81,81,81,0.50)',
    stroke: 'rgba(255,255,255,0.20)',
    strokeWidth: 1,
    cornerRadius: 21 * this.scale,
};

  explainTextContent1 = {
    x: 14 * this.scale,
    y: 14 * this.scale
  };

  explainTextContent2 = {
    x: 14 * this.scale,
    y: 14 * this.scale + 30 * this.scale
  };


  explainText2 = {
    x: this.width - this.buttonRect1.width - 28 * this.scale - 212 * this.scale,
    y: this.height * 0.896 - 74 * 0.5 * this.scale + (42 * this.scale > 42 ? 42 : 42 * this.scale) * 0.5,
    visible: false
  };


  explainText2Rect = {
    x: 0,
    y: 0,
    width: 210 * this.scale,
    height: 74 * this.scale,
    fill: 'rgba(81,81,81,0.50)',
    stroke: 'rgba(255,255,255,0.20)',
    strokeWidth: 1,
    cornerRadius: 21 * this.scale,
  };
}







