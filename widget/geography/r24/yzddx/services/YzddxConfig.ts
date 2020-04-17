export class YzddxConfig {

  width = window.innerWidth;
  height = window.innerHeight;

  scale1 = this.width / this.height > 16 / 9 ? this.height / 675 : this.width / 1200;

  earth = {
    left: this.width * 0.5 - 806 * 0.5 * this.scale1,
    top: this.height * 0.5 - 606 * 0.5 * this.scale1,
    width: 806 * 2 ,
    height: 606 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
  };

  //////////////////高原////////////////////////

  plateauImage1 = {
    left: this.earth.left + 125 * this.scale1,
    top: this.earth.top + 346 * this.scale1,
    width: 67 * 2 ,
    height: 73 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plateauImage2 = {
    left: this.earth.left + 390 * this.scale1,
    top: this.earth.top + 380 * this.scale1,
    width: 67 * 2 ,
    height: 18 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plateauImage3 = {
    left: this.earth.left + 500 * this.scale1,
    top: this.earth.top + 224 * this.scale1,
    width: 67 * 2 ,
    height: 19 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plateauImage4 = {
    left: this.earth.left + 322 * this.scale1,
    top: this.earth.top + 490 * this.scale1,
    width: 20 * 2 ,
    height: 78 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plateauImage5 = {
    left: this.earth.left + 11 * this.scale1,
    top: this.earth.top + 358 * this.scale1,
    width: 46 * 2 ,
    height: 113 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plateauImage6 = {
    left: this.earth.left + 422 * this.scale1,
    top: this.earth.top + 77 * this.scale1,
    width: 113 * 2 ,
    height: 18 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plateauImage7 = {
    left: this.earth.left + 252 * this.scale1,
    top: this.earth.top + 312 * this.scale1,
    width: 83 * 2 ,
    height: 19 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  ///////////////////山地//////////////////////

  hillyArea1 = {
    left: this.earth.left + 363 * this.scale1,
    top: this.earth.top + 274 * this.scale1,
    width: 68 * 2 ,
    height: 19 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  hillyArea2 = {
    left: this.earth.left + 380 * this.scale1,
    top: this.earth.top + 331 * this.scale1,
    width: 67 * 2 ,
    height: 20 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  hillyArea3 = {
    left: this.earth.left + 332 * this.scale1,
    top: this.earth.top + 394 * this.scale1,
    width: 149 * 2 ,
    height: 55 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  hillyArea4 = {
    left: this.earth.left + 404 * this.scale1,
    top: this.earth.top + 205 * this.scale1,
    width: 77 * 2 ,
    height: 53 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  hillyArea5 = {
    left: this.earth.left + 593 * this.scale1,
    top: this.earth.top + 7 * this.scale1,
    width: 114 * 2 ,
    height: 46 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  hillyArea6 = {
    left: this.earth.left + 220 * this.scale1,
    top: this.earth.top + 55 * this.scale1,
    width: 62 * 2 ,
    height: 84 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  //////////////////平原///////////////////////

  plainImage1 = {
    left: this.earth.left + 272 * this.scale1,
    top: this.earth.top + 97 * this.scale1,
    width: 122 * 2,
    height: 48 * 2,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plainImage2 = {
    left: this.earth.left + 583 * this.scale1,
    top: this.earth.top + 338 * this.scale1,
    width: 116 * 2 ,
    height: 56 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plainImage3 = {
    left: this.earth.left + 624 * this.scale1,
    top: this.earth.top + 267 * this.scale1,
    width: 36 * 2 ,
    height: 78 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plainImage4 = {
    left: this.earth.left + 636 * this.scale1,
    top: this.earth.top + 175 * this.scale1,
    width: 39 * 2 ,
    height: 89 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plainImage5 = {
    left: this.earth.left + 251 * this.scale1,
    top: this.earth.top + 380 * this.scale1,
    width: 59 * 2 ,
    height: 86 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plainImage6 = {
    left: this.earth.left + 356 * this.scale1,
    top: this.earth.top + 437 * this.scale1,
    width: 65 * 2 ,
    height: 34 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  // 高原点
  plateauPoint = [
    {
      left: this.earth.left + 175 * this.scale1,
      top: this.earth.top + 368 * this.scale1,
    },

    {
      left: this.earth.left + 411 * this.scale1,
      top: this.earth.top + 397 * this.scale1,
    },

    {
      left: this.earth.left + 523 * this.scale1,
      top: this.earth.top + 240 * this.scale1,
    },

    {
      left: this.earth.left + 338 * this.scale1,
      top: this.earth.top + 517 * this.scale1,
    },

    {
      left: this.earth.left + 45 * this.scale1,
      top: this.earth.top + 400 * this.scale1,
    },

    {
      left: this.earth.left + 455 * this.scale1,
      top: this.earth.top + 94 * this.scale1,
    },

    {
      left: this.earth.left + 291 * this.scale1,
      top: this.earth.top + 294 * this.scale1,
    },
  ];

  hillyAreaPoint = [
    {
      left: this.earth.left + 390 * this.scale1,
      top: this.earth.top + 289 * this.scale1,
    },

    {
      left: this.earth.left + 403 * this.scale1,
      top: this.earth.top + 346 * this.scale1,
    },

    {
      left: this.earth.left + 346 * this.scale1,
      top: this.earth.top + 394 * this.scale1,
    },

    {
      left: this.earth.left + 418 * this.scale1,
      top: this.earth.top + 235 * this.scale1,
    },

    {
      left: this.earth.left + 637 * this.scale1,
      top: this.earth.top + 40 * this.scale1,
    },

    {
      left: this.earth.left + 223 * this.scale1,
      top: this.earth.top + 82 * this.scale1,
    },
  ];

  plainPoint = [
    {
      left: this.earth.left + 308 * this.scale1,
      top: this.earth.top + 124 * this.scale1,
    },

    {
      left: this.earth.left + 631 * this.scale1,
      top: this.earth.top + 357 * this.scale1,
    },

    {
      left: this.earth.left + 617 * this.scale1,
      top: this.earth.top + 305 * this.scale1,
    },

    {
      left: this.earth.left + 625 * this.scale1,
      top: this.earth.top + 207 * this.scale1,
    },

    {
      left: this.earth.left + 288 * this.scale1,
      top: this.earth.top + 408 * this.scale1,
    },

    {
      left: this.earth.left + 418 * this.scale1,
      top: this.earth.top + 459 * this.scale1,
    },
  ];






  //////////////////高原拖动按钮//////////////////

  scale = this.width / this.height < 16 / 9 ? this.width / 1200 : this.width / 1400;

  // 三个按钮 高原
  showPlateauButton = {
    left: this.width * 0.92,
    top: this.height * 0.381,
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
    left: this.width * 0.92,
    top: this.height * 0.47,
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
    left: this.width * 0.92,
    top: this.height * 0.559,
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
    left: this.width * 0.767,
    top: this.height * 0.5 - 510 * this.scale * 0.5,
    width: 280 * 2 ,
    height: 409 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale,
    scaleY: 0.5 * this.scale,
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







