
export class YzddxConfig {

  width = window.innerWidth;
  height = window.innerHeight;

  scale = this.width / this.height > 16 / 9 ? this.width / 1200 : this.height / 675;

  leftGroup = {
    scaleX: this.scale,
    scaleY: this.scale,
    subTargetCheck: true,
    hasBorders: false,
    hasControls: false,
  };

  map = {
    left: -2,
    top: -30,
    width: 925 * 2,
    height: 810 * 2,
    selectable: false,
    scaleX: 0.5,
    scaleY: 0.5,
  };

  // 高原原点
  bluePoint = [
    {
      left: 186,
      top: 404,
      name: '伊朗高原'
    },
    {
      left: 454,
      top: 400,
      name: '青藏高原'
    },
    {
      left: 543,
      top: 281,
      name: '蒙古高原'
    },
    {
      left: 350,
      top: 561,
      name: '德干高原'
    },
    {
      left: 454,
      top: 119,
      name: '中西伯利亚高原'
    },
    {
      left: 302,
      top: 357,
      name: '帕米尔高原'
    },
    {
      left: 58,
      top: 494,
      name: '阿拉伯高原'
    },
    {
      left: 366,
      top: 319,
      name: '天山山脉'
    },
    {
      left: 406,
      top: 378,
      name: '昆仑山脉'
    },
    {
      left: 422,
      top: 265,
      name: '阿尔泰山脉'
    },
    {
      left: 627,
      top: 75,
      name: '东西伯利亚山脉'
    },
    {
      left: 265,
      top: 169,
      name: '乌拉尔山脉'
    },
    {
      left: 406,
      top: 448,
      name: '喜马拉雅山脉'
    },
    {
      left: 358,
      top: 177,
      name: '西西伯利亚平原'
    },
    {
      left: 643,
      top: 349,
      name: '华北平原'
    },
    {
      left: 651,
      top: 249,
      name: '东北平原'
    },
    {
      left: 310,
      top: 448,
      name: '印度河平原'
    },
    {
      left: 400,
      top: 470,
      name: '恒河平原'
    },
    {
      left: 643,
      top: 400,
      name: '长江中下游平原'
    }
  ];

  plateauText = [
    {
      left: 163,
      top: 406,
      name: '伊朗高原'
    },
    {
      left: 432,
      top: 404,
      name: '青藏高原'
    },
    {
      left: 518,
      top: 281,
      name: '蒙古高原'
    },
    {
      left: 348,
      top: 530,
      name: '德干高原'
    },
    {
      left: 407,
      top: 117,
      name: '中西伯利亚高原'
    },
    {
      left: 269,
      top: 359,
      name: '帕米尔高原'
    },
    {
      left: 39,
      top: 419,
      angle: -15,
      name: '阿拉伯高原'
    },
  ];

  hillyAreaText = [
    {
      left: 335,
      top: 335,
      angle: -20,
      name: '天山山脉'
    },
    {
      left: 385,
      top: 380,
      name: '昆仑山脉'
    },
    {
      left: 410,
      top: 260,
      angle: 20,
      name: '阿尔泰山脉'
    },
    {
      left: 570,
      top: 90,
      angle: -10,
      name: '东西伯利亚山脉'
    },
    {
      left: 285,
      top: 140,
      angle: 20,
      name: '乌拉尔山脉'
    },
    {
      left: 341,
      top: 417,
      width: 149 * 2,
      height: 55 * 2,
      scaleX: 0.5,
      scaleY: 0.5,
      name: '喜马拉雅山脉'
    },
  ];

  plainText = [
    {
      left: 296,
      top: 178,
      name: '西西伯利亚平原'
    },
    {
      left: 622,
      top: 315,
      angle: -15,
      name: '华北平原'
    },
    {
      left: 630,
      top: 215,
      angle: -15,
      name: '东北平原'
    },
    {
      left: 330,
      top: 420,
      angle: 30,
      name: '印度河平原'
    },
    {
      left: 380,
      top: 460,
      angle: 20,
      name: '恒河平原'
    },
    {
      left: 577,
      top: 380,
      width: 115 * 2,
      height: 55 * 2,
      scaleX: 0.5,
      scaleY: 0.5,
      name: '长江中下游平原'
    },
  ];





}







