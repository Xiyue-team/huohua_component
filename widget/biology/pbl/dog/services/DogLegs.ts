
const legsColor = ['black', 'blackwhite', 'gray', 'white', 'yellow', 'yellowwhite'];
const lq_legs: any = [];
const bx_legs: any = [];
const dn_legs: any = [];
const jw_legs: any = [];
const kj_legs: any = [];
const ss_legs: any = [];

for (let i = 0; i < 6; i++) {
  // 颜色
  lq_legs[i] = [];
  bx_legs[i] = [];
  dn_legs[i] = [];
  jw_legs[i] = [];
  kj_legs[i] = [];
  ss_legs[i] = [];

  for (let j = 0; j < 5; j++) {
    // 直毛腿长度
    lq_legs[i][j] = require('./../sub_static/dogs/liequan/legs/' + legsColor[i] + '/straight/length' + (j + 1) + '/type1.png');
    bx_legs[i][j] = require('./../sub_static/dogs/bixiong/legs/' + legsColor[i] + '/straight/length' + (j + 1) + '/type1.png');
    dn_legs[i][j] = require('./../sub_static/dogs/douniu/legs/' + legsColor[i] + '/straight/length' + (j + 1) + '/type1.png');
    jw_legs[i][j] = require('./../sub_static/dogs/jiwawa/legs/' + legsColor[i] + '/straight/length' + (j + 1) + '/type1.png');
    kj_legs[i][j] = require('./../sub_static/dogs/keji/legs/' + legsColor[i] + '/straight/length' + (j + 1) + '/type1.png');
    ss_legs[i][j] = require('./../sub_static/dogs/songshi/legs/' + legsColor[i] + '/straight/length' + (j + 1) + '/type1.png');
  }
}

export class DogLegs {

  dogLegsImage: Array<Object>;

  // 猎犬
  lqLegsImage: Array<Object>;

  // 比熊
  bxLegsImage: Array<Object>;

  // 斗牛
  dnLegsImage: Array<Object>;

  // 吉娃娃
  jwLegsImage: Array<Object>;

  // 柯基
  kjLegsImage: Array<Object>;

  // 松狮
  ssLegsImage: Array<Object>;

  constructor() {
    this.lqLegsImage = this.loadLegsImage(lq_legs);
    this.bxLegsImage = this.loadLegsImage(bx_legs);
    this.dnLegsImage = this.loadLegsImage(dn_legs);
    this.jwLegsImage = this.loadLegsImage(jw_legs);
    this.kjLegsImage = this.loadLegsImage(kj_legs);
    this.ssLegsImage = this.loadLegsImage(ss_legs);

    this.dogLegsImage = [
      {
        type: '猎犬',
        character: '腿',
        src: this.lqLegsImage
      },
      {
        type: '比熊',
        character: '腿',
        src: this.bxLegsImage
      },
      {
        type: '斗牛',
        character: '腿',
        src: this.dnLegsImage
      },
      {
        type: '吉娃',
        character: '腿',
        src: this.jwLegsImage
      },
      {
        type: '柯基',
        character: '腿',
        src: this.kjLegsImage
      },
      {
        type: '松狮',
        character: '腿',
        src: this.ssLegsImage
      },
    ];
  }

  loadLegsImage(imageArray: Array<any>) {
    const black = [];
    const blackWhite = [];
    const gray = [];
    const white = [];
    const yellow = [];
    const yellowWhite = [];

    for (let i = 0; i < 5; i++) {
      black.push({
        legsLength: i + 1,
        src: imageArray[0][i],
      });
      blackWhite.push({
        legsLength: i + 1,
        src: imageArray[1][i],
      });
      gray.push({
        legsLength: i + 1,
        src: imageArray[2][i],
      });
      white.push({
        legsLength: i + 1,
        src: imageArray[3][i],
      });
      yellow.push({
        legsLength: i + 1,
        src: imageArray[4][i],
      });
      yellowWhite.push({
        legsLength: i + 1,
        src: imageArray[5][i],
      });
    }

    return [
      {
        color: '黑',
        src: black
      },
      {
        color: '黑白',
        src: blackWhite
      },
      {
        color: '灰',
        src: gray
      },
      {
        color: '白',
        src: white
      },
      {
        color: '黄',
        src: yellow
      },
      {
        color: '黄白',
        src: yellowWhite
      }
    ];

  }

  // 获取狗腿
  /**
   * @param {string} type 狗类型
   * @param {string} color  狗颜色
   * @returns {any[]}
   */
  getDogLegImage(type: string, color: string) {
    const dogLegs = [];
    for (let i = 0; i < this.dogLegsImage.length; i++) {
      // 判断哪种狗腿
      if ((this.dogLegsImage[i] as any).type === type) {
        for (let j = 0; j < (this.dogLegsImage[i] as any).src.length; j++) {
          // 判断哪种颜色
          if ((this.dogLegsImage[i] as any).src[j].color === color) {
            for (let k = 0; k < (this.dogLegsImage[i] as any).src[j].src.length; k++) {
              const dog = {
                type: type,
                character: '腿',
                color: (this.dogLegsImage[i] as any).src[j].color,
                legsLength: (this.dogLegsImage[i] as any).src[j].src[k].legsLength,
                src: (this.dogLegsImage[i] as any).src[j].src[k].src
              };
              dogLegs[k] = dog;
            }
            return dogLegs;
          }
        }
      }
    }
  }



  getOneDogLegImage(type: string, color: string, legsLength: any) {
    for (let i = 0; i < this.dogLegsImage.length; i++) {
      // 判断哪种狗腿
      if ((this.dogLegsImage[i] as any).type === type) {
        for (let j = 0; j < (this.dogLegsImage[i] as any).src.length; j++) {
          // 判断哪种颜色
          if ((this.dogLegsImage[i] as any).src[j].color === color) {
            for (let k = 0; k < (this.dogLegsImage[i] as any).src[j].src.length; k++) {
              if ((this.dogLegsImage[i] as any).src[j].src[k].legsLength === legsLength) {
                const dog = {
                  type: type,
                  character: '腿',
                  color: (this.dogLegsImage[i] as any).src[j].color,
                  legsLength: (this.dogLegsImage[i] as any).src[j].src[k].legsLength,
                  src: (this.dogLegsImage[i] as any).src[j].src[k].src
                };
                return dog;
              }
            }
          }
        }
      }
    }
  }

}

