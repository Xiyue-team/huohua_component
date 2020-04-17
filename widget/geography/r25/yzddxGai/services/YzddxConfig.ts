import { fabric } from "fabric";

export class YzddxConfig {

  width = window.innerWidth;
  height = window.innerHeight;

  scale1 = this.width / this.height > 16 / 9 ? this.height / 675 : this.width / 1200;

  earth = {
    left: 0,
    top: this.height * 0.5 - 675 * 0.5 * this.scale1,
    width: 770 * 2 ,
    height: 675 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
  };

  //////////////////高原////////////////////////

  plateauImage1 = {
    left: this.earth.left + 128 * this.scale1,
    top: this.earth.top + 364 * this.scale1,
    width: 77 * 2 ,
    height: 19 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false
  };

  plateauImage2 = {
    left: this.earth.left + 339 * this.scale1,
    top: this.earth.top + 365 * this.scale1,
    width: 67 * 2 ,
    height: 18 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false,
  };

  plateauImage3 = {
    left: this.earth.left + 414 * this.scale1,
    top: this.earth.top + 248 * this.scale1,
    width: 67 * 2 ,
    height: 19 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false
  };

  plateauImage4 = {
    left: this.earth.left + 291 * this.scale1,
    top: this.earth.top + 464 * this.scale1,
    width: 20 * 2 ,
    height: 78 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false
  };

  plateauImage5 = {
    left: this.earth.left + 31.7 * this.scale1,
    top: this.earth.top + 368 * this.scale1,
    width: 46 * 2 ,
    height: 113 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false
  };

  plateauImage6 = {
    left: this.earth.left + 343 * this.scale1,
    top: this.earth.top + 110 * this.scale1,
    width: 113 * 2 ,
    height: 18 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false
  };

  plateauImage7 = {
    left: this.earth.left + 228 * this.scale1,
    top: this.earth.top + 325 * this.scale1,
    width: 83 * 2 ,
    height: 19 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false
  };

  ///////////////////山地//////////////////////

  hillyArea1 = {
    left: this.earth.left + 262 * this.scale1,
    top: this.earth.top + 287 * this.scale1,
    width: 103 * 2 ,
    height: 41 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false
  };

  hillyArea2 = {
    left: this.earth.left + 324 * this.scale1,
    top: this.earth.top + 337 * this.scale1,
    width: 67 * 2 ,
    height: 20 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false
  };

  hillyArea3 = {
    left: this.earth.left + 290 * this.scale1,
    top: this.earth.top + 367 * this.scale1,
    width: 149 * 2 ,
    height: 55 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false,
  };

  hillyArea4 = {
    left: this.earth.left + 329.4 * this.scale1,
    top: this.earth.top + 225.6 * this.scale1,
    width: 77 * 2 ,
    height: 53 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false
  };

  hillyArea5 = {
    left: this.earth.left + 468 * this.scale1,
    top: this.earth.top + 64 * this.scale1,
    width: 114 * 2 ,
    height: 46 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false
  };

  hillyArea6 = {
    left: this.earth.left + 215 * this.scale1,
    top: this.earth.top + 115 * this.scale1,
    width: 51 * 2 ,
    height: 95 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false
  };

  //////////////////平原///////////////////////

  plainImage1 = {
    left: this.earth.left + 244 * this.scale1,
    top: this.earth.top + 175 * this.scale1,
    width: 124 * 2,
    height: 19 * 2,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false
  };

  plainImage2 = {
    left: this.earth.left + 472 * this.scale1,
    top: this.earth.top + 338 * this.scale1,
    width: 115 * 2 ,
    height: 55 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false
  };

  plainImage3 = {
    left: this.earth.left + 522.4 * this.scale1,
    top: this.earth.top + 278.4 * this.scale1,
    width: 36 * 2 ,
    height: 78 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false
  };

  plainImage4 = {
    left: this.earth.left + 528.7 * this.scale1,
    top: this.earth.top + 189 * this.scale1,
    width: 39 * 2 ,
    height: 89 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false
  };

  plainImage5 = {
    left: this.earth.left + 228 * this.scale1,
    top: this.earth.top + 367 * this.scale1,
    width: 59 * 2 ,
    height: 86 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false
  };

  plainImage6 = {
    left: this.earth.left + 300 * this.scale1,
    top: this.earth.top + 412.7 * this.scale1,
    width: 65 * 2 ,
    height: 34 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    perPixelTargetFind: true,
    visible: false
  };

  // 高原点
  plateauPoint = [
    {
      left: this.earth.left + 156 * this.scale1,
      top: this.earth.top + 343 * this.scale1,
    },

    {
      left: this.earth.left + 390 * this.scale1,
      top: this.earth.top + 370 * this.scale1,
    },

    {
      left: this.earth.left + 447 * this.scale1,
      top: this.earth.top + 254 * this.scale1,
    },

    {
      left: this.earth.left + 299 * this.scale1,
      top: this.earth.top + 494 * this.scale1,
    },

    {
      left: this.earth.left + 47 * this.scale1,
      top: this.earth.top + 420 * this.scale1,
    },

    {
      left: this.earth.left + 379 * this.scale1,
      top: this.earth.top + 130 * this.scale1,
    },

    {
      left: this.earth.left + 253 * this.scale1,
      top: this.earth.top + 317 * this.scale1,
    },
  ];

  hillyAreaPoint = [
    {
      left: this.earth.left + 305 * this.scale1,
      top: this.earth.top + 290 * this.scale1,
    },

    {
      left: this.earth.left + 335 * this.scale1,
      top: this.earth.top + 340 * this.scale1,
    },

    {
      left: this.earth.left + 327 * this.scale1,
      top: this.earth.top + 400 * this.scale1,
    },

    {
      left: this.earth.left + 335.4 * this.scale1,
      top: this.earth.top + 248.6 * this.scale1,
    },

    {
      left: this.earth.left + 523 * this.scale1,
      top: this.earth.top + 87 * this.scale1,
    },

    {
      left: this.earth.left + 225 * this.scale1,
      top: this.earth.top + 157 * this.scale1,
    },
  ];

  plainPoint = [
    {
      left: this.earth.left + 310 * this.scale1,
      top: this.earth.top + 185 * this.scale1,
    },

    {
      left: this.earth.left + 531 * this.scale1,
      top: this.earth.top + 363 * this.scale1,
    },

    {
      left: this.earth.left + 533 * this.scale1,
      top: this.earth.top + 319.4 * this.scale1,
    },

    {
      left: this.earth.left + 533 * this.scale1,
      top: this.earth.top + 224 * this.scale1,
    },

    {
      left: this.earth.left + 264 * this.scale1,
      top: this.earth.top + 398 * this.scale1,
    },

    {
      left: this.earth.left + 347.9 * this.scale1,
      top: this.earth.top + 439.7 * this.scale1,
    },
  ];

  scale = this.width / this.height < 16 / 9 ? this.width / 1200 : this.width / 1400;

  // 三个按钮 高原
  showPlateauButton = {
    left: this.width * 0.715,
    top: this.height * 0.902,
    width: 72 * this.scale,
    height: 42 * this.scale,
    text: '高原',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    rx: 42 * this.scale * 0.5,
    textFill: '#000000',
    textNum: 2,
    visible: true
  };
  // 山地
  showHillyAreaButton = {
    left: this.width * 0.792,
    top: this.height * 0.902,
    width: 72 * this.scale,
    height: 42 * this.scale,
    text: '山地',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    rx: 42 * this.scale * 0.5,
    textFill: '#000000',
    textNum: 2,
    visible: true
  };
  // 平原
  showPlainButton = {
    left: this.width * 0.868,
    top: this.height * 0.902,
    width: 72 * this.scale,
    height: 42 * this.scale,
    text: '平原',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    rx: 42 * this.scale * 0.5,
    textFill: '#000000',
    textNum: 2,
    visible: true
  };

  // 高原卡片
  plateauCardImage = {
    left: this.width * 0.67,
    top: this.height * 0.5 - 535 * 0.5 * this.scale,
    width: 342 * 2,
    height: 513 * 2,
    selectable: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
    shadow: new fabric.Shadow({
      color: 'rgba(0,0,0,0.03)',
      offsetX: 2.5 * this.scale,
      offsetY: 5.5 * this.scale,
    }),
    visible: false
  };

  tipsText1 = {
    left: this.width * 0.5 - 14 * this.scale * 12 * 0.5,
    top: this.height * 0.926,
    fill: '#FFFFFF',
    fontSize: 14 * this.scale,
    selectable: false,
    visible: false
  };

  tipsText2 = {
    left: this.width * 0.5 - 14 * this.scale * 10 * 0.5,
    top: this.height * 0.926,
    fill: '#FFFFFF',
    fontSize: 14 * this.scale,
    selectable: false,
    visible: false
  };

}







