export class MyConfig {
  lang = window.env.browserInfo.lang;

  rect = {
    left: 265,
    top:  119,
    width: 593,
    height: 438.6,
    fill: '#FFD0BC',
    selectable: false,
  };

  mask1 = {
    left: 265 + 593,
    top:  110,
    width: 246,
    height: 450,
    fill: '#ffffff',
    selectable: false,
    opacity: 0.7,
  };

  mask2 = {
    left: 265 + 593,
    top:  110,
    width: 203,
    height: 450,
    fill: '#ffffff',
    selectable: false,
    opacity: 0.7,
  };

  tipsText = [
    {
      left: 204 - this.lang.tipText[0].length * 28,
      top: 193,
      fill: '#55607F',
      fontSize: 28,
    },
    {
      left: 204 - this.lang.tipText[1].length * 28,
      top: 318,
      fill: '#55607F',
      fontSize: 28,
    },
    {
      left: 779,
      top: 233,
      fill: '#55607F',
      fontSize: 28,
    },
    {
      left: 779,
      top: 283,
      fill: '#55607F',
      fontSize: 28,
    },
    {
      left: 879,
      top: 283,
      fill: '#55607F',
      fontSize: 28,
    },
  ];

  tipsLine = [
    {
      left: 211,
      top:  207.8,
      width: 108,
      height: 1,
      fill: '#55607f',
      selectable: false,
    },
    {
      left: 211,
      top:  330.8,
      width: 223,
      height: 1,
      fill: '#55607f',
      selectable: false,
    },
    {
      left: 629.1,
      top:  247.8,
      width: 143.9,
      height: 1,
      fill: '#55607f',
      selectable: false,
    },
    {
      left: 629.1,
      top:  297.8,
      width: 143.9,
      height: 1,
      fill: '#55607f',
      selectable: false,
    },
    {
      left: 727,
      top:  297.8,
      width: 146,
      height: 1,
      fill: '#55607f',
      selectable: false,
    },
  ];

  tipsPoint = [
    {
      radius: 4,
      fill: '#55607f',
      left: 313,
      top: 204,
    },
    {
      radius: 4,
      fill: '#55607f',
      left: 428,
      top: 327,
    },
    {
      radius: 4,
      fill: '#55607f',
      left: 622,
      top: 244,
    },
    {
      radius: 4,
      fill: '#55607f',
      left: 622,
      top: 294,
    },
    {
      radius: 4,
      fill: '#55607f',
      left: 723,
      top: 294,
    },
  ];
}







