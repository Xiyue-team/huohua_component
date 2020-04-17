export class YzddxConfig {

  width = window.innerWidth;
  height = window.innerHeight;

  scale1 = this.width / this.height < 16 / 9 ? this.height / 675 : this.width / 1200;

  earth = {
    left: this.width * 0.5 - 810 * 0.5 * this.scale1,
    top: this.height * 0.5 - 675 * 0.5 * this.scale1,
    width: 810 * 2 ,
    height: 675 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
  };

  //////////////////高原////////////////////////

  plateauImage1 = {
    left: this.earth.left + 136 * this.scale1,
    top: this.earth.top + 338 * this.scale1,
    width: 85 * 2 ,
    height: 51 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plateauImage2 = {
    left: this.earth.left + 325 * this.scale1,
    top: this.earth.top + 377 * this.scale1,
    width: 96 * 2 ,
    height: 25 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plateauImage3 = {
    left: this.earth.left + 438 * this.scale1,
    top: this.earth.top + 260 * this.scale1,
    width: 104 * 2 ,
    height: 25 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plateauImage4 = {
    left: this.earth.left + 268 * this.scale1,
    top: this.earth.top + 476 * this.scale1,
    width: 24 * 2 ,
    height: 100 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plateauImage5 = {
    left: this.earth.left + 59 * this.scale1,
    top: this.earth.top + 324 * this.scale1,
    width: 47 * 2 ,
    height: 128 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plateauImage6 = {
    left: this.earth.left + 385 * this.scale1,
    top: this.earth.top + 84 * this.scale1,
    width: 116 * 2 ,
    height: 25 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plateauImage7 = {
    left: this.earth.left + 219 * this.scale1,
    top: this.earth.top + 315 * this.scale1,
    width: 85 * 2 ,
    height: 25 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  ///////////////////山地//////////////////////

  hillyArea1 = {
    left: this.earth.left + 287 * this.scale1,
    top: this.earth.top + 292 * this.scale1,
    width: 77 * 2 ,
    height: 25 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  hillyArea2 = {
    left: this.earth.left + 302 * this.scale1,
    top: this.earth.top + 348 * this.scale1,
    width: 72 * 2 ,
    height: 27 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  hillyArea3 = {
    left: this.earth.left + 281 * this.scale1,
    top: this.earth.top + 376 * this.scale1,
    width: 118 * 2 ,
    height: 74 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  hillyArea4 = {
    left: this.earth.left + 346 * this.scale1,
    top: this.earth.top + 227 * this.scale1,
    width: 86 * 2 ,
    height: 68 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  hillyArea5 = {
    left: this.earth.left + 495.3 * this.scale1,
    top: this.earth.top + 41 * this.scale1,
    width: 122.7 * 2 ,
    height: 49 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  hillyArea6 = {
    left: this.earth.left + 241 * this.scale1,
    top: this.earth.top + 78 * this.scale1,
    width: 66 * 2 ,
    height: 90 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  //////////////////平原///////////////////////

  plainImage1 = {
    left: this.earth.left + 276 * this.scale1,
    top: this.earth.top + 126.2 * this.scale1,
    width: 117 * 2,
    height: 45 * 2,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plainImage2 = {
    left: this.earth.left + 514 * this.scale1,
    top: this.earth.top + 356 * this.scale1,
    width: 108 * 2 ,
    height: 62 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plainImage3 = {
    left: this.earth.left + 553 * this.scale1,
    top: this.earth.top + 290.9 * this.scale1,
    width: 29.6 * 2 ,
    height: 79.1 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plainImage4 = {
    left: this.earth.left + 585 * this.scale1,
    top: this.earth.top + 204 * this.scale1,
    width: 31.2 * 2 ,
    height: 79 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plainImage5 = {
    left: this.earth.left + 200 * this.scale1,
    top: this.earth.top + 368 * this.scale1,
    width: 68 * 2 ,
    height: 82 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  plainImage6 = {
    left: this.earth.left + 305 * this.scale1,
    top: this.earth.top + 435 * this.scale1,
    width: 73 * 2 ,
    height: 35 * 2 ,
    selectable: false,
    scaleX: 0.5 * this.scale1,
    scaleY: 0.5 * this.scale1,
    visible: false
  };

  //////////////////高原拖动按钮//////////////////

  scale = this.width / this.height < 16 / 9 ? this.width / 1200 : this.width / 1400;

  plateauButton = [
  // 1
  {
    left: this.width * 0.823,
    top: this.height * 0.233,
    width: 96 * this.scale,
    height: 38 * this.scale,
    text: '伊朗高原',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 4,
  },
  // 2
  {
    left: this.width * 0.823,
    top: this.height * 0.313,
    width: 96 * this.scale,
    height: 38 * this.scale,
    text: '青藏高原',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 4,
  },
  // 3
  {
    left: this.width * 0.823,
    top: this.height * 0.393,
    width: 96 * this.scale,
    height: 38 * this.scale,
    text: '蒙古高原',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 4,
  },
  // 4
  {
    left: this.width * 0.823,
    top: this.height * 0.473,
    width: 96 * this.scale,
    height: 38 * this.scale,
    text: '德干高原',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 4,
  },
  // 5
  {
    left: this.width * 0.823 + 96 * this.scale - 112 * this.scale,
    top: this.height * 0.553,
    width: 112 * this.scale,
    height: 38 * this.scale,
    text: '阿拉伯高原',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 5,
  },
  // 6
  {
    left: this.width * 0.823 + 96 * this.scale - 144 * this.scale,
    top: this.height * 0.633,
    width: 144 * this.scale,
    height: 38 * this.scale,
    text: '中西伯利亚高原',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 7,
  },
  // 7
  {
    left: this.width * 0.823 + 96 * this.scale - 112 * this.scale,
    top: this.height * 0.713,
    width: 112 * this.scale,
    height: 38 * this.scale,
    text: '帕米尔高原',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 5,
  }];

  //////////////////山地拖动按钮//////////////////

  hillyAreaButton = [
  // 1
  {
    left: this.width * 0.823,
    top: this.height * 0.273,
    width: 96 * this.scale,
    height: 38 * this.scale,
    text: '天山山脉',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 4,
  },
  // 2
  {
    left: this.width * 0.823,
    top: this.height * 0.353,
    width: 96 * this.scale,
    height: 38 * this.scale,
    text: '昆仑山脉',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 4,
  },
  // 3
  {
    left: this.width * 0.823 + 96 * this.scale - 128 * this.scale,
    top: this.height * 0.433,
    width: 128 * this.scale,
    height: 38 * this.scale,
    text: '喜马拉雅山脉',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 6,
  },
  // 4
  {
    left: this.width * 0.823 + 96 * this.scale - 112 * this.scale,
    top: this.height * 0.513,
    width: 112 * this.scale,
    height: 38 * this.scale,
    text: '阿尔泰山脉',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 5,
  },
  // 5
  {
    left: this.width * 0.823 + 96 * this.scale - 144 * this.scale,
    top: this.height * 0.593,
    width: 144 * this.scale,
    height: 38 * this.scale,
    text: '东西伯利亚山地',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 7,
  },
  // 6
  {
    left: this.width * 0.823 + 96 * this.scale - 112 * this.scale,
    top: this.height * 0.673,
    width: 112 * this.scale,
    height: 38 * this.scale,
    text: '乌拉尔山脉',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 5,
  }];

  ////////////////平原拖动按钮///////////////////

  plainButton = [
  // 1
  {
    left: this.width * 0.823 + 96 * this.scale - 144 * this.scale,
    top: this.height * 0.273,
    width: 144 * this.scale,
    height: 38 * this.scale,
    text: '西西伯利亚平原',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 7,
  },
  // 2
  {
    left: this.width * 0.823 + 96 * this.scale - 144 * this.scale,
    top: this.height * 0.353,
    width: 144 * this.scale,
    height: 38 * this.scale,
    text: '长江中下游平原',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 7,
  },
  // 3
  {
    left: this.width * 0.823,
    top: this.height * 0.433,
    width: 96 * this.scale,
    height: 38 * this.scale,
    text: '华北平原',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 4,
  },
  // 4
  {
    left: this.width * 0.823,
    top: this.height * 0.513,
    width: 96 * this.scale,
    height: 38 * this.scale,
    text: '东北平原',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 4,
  },
  // 5
  {
    left: this.width * 0.823 + 96 * this.scale - 112 * this.scale,
    top: this.height * 0.593,
    width: 112 * this.scale,
    height: 38 * this.scale,
    text: '印度河平原',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 5,
  },
  // 6
  {
    left: this.width * 0.823,
    top: this.height * 0.673,
    width: 96 * this.scale,
    height: 38 * this.scale,
    text: '恒河平原',
    fill: '#ffffff',
    fontSize: 16 * this.scale,
    textNum: 4,
  }];

  // 三个按钮 高原
  showPlateauButton = {
    left: this.width * 0.92,
    top: this.height * 0.381,
    width: 72 * this.scale,
    height: 42 * this.scale,
    text: '高原',
    fill: '#3d3d3d',
    fontSize: 16 * this.scale,
    rx: 42 * this.scale * 0.5,
    textFill: '#ffffff',
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
    fill: '#3d3d3d',
    fontSize: 16 * this.scale,
    rx: 42 * this.scale * 0.5,
    textFill: '#ffffff',
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
    fill: '#3d3d3d',
    fontSize: 16 * this.scale,
    rx: 42 * this.scale * 0.5,
    textFill: '#ffffff',
    textNum: 2,
    visible: true
  };

  // 高原卡片
  plateauCardImage = {
    left: this.width * 0.713,
    top: this.height * 0.5 - 510 * this.scale * 0.5,
    width: 350 * 2 ,
    height: 510 * 2 ,
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







