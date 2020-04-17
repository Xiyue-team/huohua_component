export class MyConfig {
  width = 1200;
  height = 675;

  rect = {
    left: this.width * 0.5 - 946 * 0.5,
    top: 0,
    width: 946,
    height: 557,
    fill: '#000000',
    strokeWidth: 2,
    stroke: '#ffffff',
    selectable: false,
    opacity: 0.7,
    visible: false
  };

  leftRect = {
    left: 0,
    top: 0,
    width: this.width * 0.66,
    height: this.height,
    fill: '',
    strokeWidth: 2,
    stroke: '#000000',
    selectable: false,
    visible: false
  };

  rightRect = {
    left: this.leftRect.width,
    top: 0,
    width: this.width * 0.34,
    height: this.height,
    fill: '#000000',
    selectable: false,
    opacity: 0.1,
    visible: false
  };

  grayRect = {
    left: this.leftRect.width,
    top: 0,
    width: this.width * 0.34,
    height: this.height,
    fill: '#000000',
    selectable: false,
    opacity: 0.1,
  };

  whiteFrame = [
    [
      {
        left: 22,
        top: 196,
      },
      {
        left: 22 + 183 + 6,
        top: 196,
      },
    ],

    [
      {
        left: 22 + 183 + 6 + 183 + 14,
        top: 196,
      },
      {
        left: 22 + 183 + 6 + 183 + 14 + 6 + 183,
        top: 196,
      },
    ],

    [
      {
        left: 22,
        top: 418,
      },
      {
        left: 22 + 183 + 6,
        top: 418,
      },
    ],

    [
      {
        left: 22 + 183 + 6 + 183 + 14,
        top: 418,
      },
      {
        left: 22 + 183 + 6 + 183 + 14 + 6 + 183,
        top: 418,
      },
    ],
  ];

  imgScale = 148 / 184;

  rightImage = [
    [
      {
        left: 44,
        top: 76,
        name: '棉花'
      },
      {
        left: 44 + 148 + 18,
        top: 212,
        name: '蚕'
      },
    ],

    [
      {
        left: 44 + 148 + 18,
        top: 484,
        name: '西瓜'
      },
      {
        left: 44 + 148 + 18,
        top: 76,
        name: '鱼'
      },
    ],

    [
      {
        left: 44,
        top: 348,
        name: '树'
      },
      {
        left: 44,
        top: 484,
        name: '绿萝'
      },
    ],

    [
      {
        left: 44 + 148 + 18,
        top: 347,
        name: '橡胶'
      },
      {
        left: 44,
        top: 211,
        name: '马'
      },
    ],
  ];

  circle = {
    radius: 90,
    fill: 'rgba(255,255,255,0.20)',
    left: 0,
    stroke: '#ffffff',
    strokeWidth: 3
  };

  reselectButton = {
    left: 109,
    top: 144,
    selectable: false,
    visible: false
  };

  answerButton = {
    left: 109,
    top: 372,
    selectable: false,
    visible: false
  };

  bigText = [
    {
      left: 186 + 25,
      top: 212 + 30,
    },
    {
      left: 568 + 25,
      top: 212 + 30,
    },
    {
      left: 186 + 25,
      top: 427 + 30,
    },
    {
      left: 568 + 25,
      top: 427 + 30,
    }
  ];

  smallText = [
    {
      left: 186 + 25,
      top: 146 + 15,
    },
    {
      left: 568 + 25,
      top: 146 + 15,
    },
    {
      left: 186 + 25,
      top: 371 + 15,
    },
    {
      left: 568 + 25,
      top: 371 + 15,
    }
  ];
}







