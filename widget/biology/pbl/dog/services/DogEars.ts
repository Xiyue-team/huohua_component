const earsColor = ['black', 'blackwhite', 'gray', 'white', 'yellow', 'yellowwhite'];
const lq_ears: any = [];
const bx_ears: any = [];
const dn_ears: any = [];
const jw_ears: any = [];
const kj_ears: any = [];
const ss_ears: any = [];

for (let i = 0; i < 6; i++) {
  lq_ears[i] = [];
  bx_ears[i] = [];
  dn_ears[i] = [];
  jw_ears[i] = [];
  kj_ears[i] = [];
  ss_ears[i] = [];

  for (let j = 0; j < 5; j++) {
    lq_ears[i][j] = require('./../sub_static/dogs/liequan/ears/' + earsColor[i] + '/type' + (j + 1) + '.png');
    bx_ears[i][j] = require('./../sub_static/dogs/bixiong/ears/' + earsColor[i] + '/type' + (j + 1) + '.png');
    dn_ears[i][j] = require('./../sub_static/dogs/douniu/ears/' + earsColor[i] + '/type' + (j + 1) + '.png');
    jw_ears[i][j] = require('./../sub_static/dogs/jiwawa/ears/' + earsColor[i] + '/type' + (j + 1) + '.png');
    kj_ears[i][j] = require('./../sub_static/dogs/keji/ears/' + earsColor[i] + '/type' + (j + 1) + '.png');
    ss_ears[i][j] = require('./../sub_static/dogs/songshi/ears/' + earsColor[i] + '/type' + (j + 1) + '.png');
  }
}

export class DogEars {

  dogEarImage: Array<object>;

  // 猎犬耳朵颜色
  lqEarsImage: Array<Object>;

  // 比熊耳朵颜色
  bxEarsImage: Array<Object>;

  // 斗牛
  dnEarsImage: Array<Object>;

  // 吉娃娃
  jwEarsImage: Array<Object>;

  // 柯基
  kjEarsImage: Array<Object>;

  // 松狮
  ssEarsImage: Array<Object>;

  constructor() {
    this.lqEarsImage = this.loadEarsImage(lq_ears);
    this.bxEarsImage = this.loadEarsImage(bx_ears);
    this.dnEarsImage = this.loadEarsImage(dn_ears);
    this.jwEarsImage = this.loadEarsImage(jw_ears);
    this.kjEarsImage = this.loadEarsImage(kj_ears);
    this.ssEarsImage = this.loadEarsImage(ss_ears);

    this.dogEarImage = [
      {
        type: '猎犬',
        character: '耳朵',
        src: this.lqEarsImage
      },
      {
        type: '比熊',
        character: '耳朵',
        src: this.bxEarsImage
      },
      {
        type: '斗牛',
        character: '耳朵',
        src: this.dnEarsImage
      },
      {
        type: '吉娃',
        character: '耳朵',
        src: this.jwEarsImage
      },
      {
        type: '柯基',
        character: '耳朵',
        src: this.kjEarsImage
      },
      {
        type: '松狮',
        character: '耳朵',
        src: this.ssEarsImage
      },
    ];
  }

  /**
   * @param {string} type 狗耳朵的数组
   */
  loadEarsImage(type: any) {

    const black = [];
    const blackWhite = [];
    const gray = [];
    const white = [];
    const yellow = [];
    const yellowWhite = [];

    const blackImage = type[0];
    const blackWhiteImage = type[1];
    const grayImage = type[2];
    const whiteImage = type[3];
    const yellowImage = type[4];
    const yellowWhiteImage = type[5];

    for (let i = 0; i < 5; i++) {
      black.push({
        style: i + 1,
        src: blackImage[i],
      });

      blackWhite.push({
        style: i + 1,
        src: blackWhiteImage[i],
      });

      gray.push({
        style: i + 1,
        src: grayImage[i],
      });

      white.push({
        style: i + 1,
        src: whiteImage[i],
      });

      yellow.push({
        style: i + 1,
        src: yellowImage[i],
      });

      yellowWhite.push({
        style: i + 1,
        src: yellowWhiteImage[i],
      });
    }

    return [{
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

  // 获取狗耳朵
  /**
   * @param {string} type 狗类型
   * @param {string} color  狗颜色
   * @returns {any[]}
   */
  getDogEarImage(type: string, color: string) {
    const dogEar = [];
    for (let i = 0; i < this.dogEarImage.length; i++) {
      // 判断哪种狗耳朵
      if ((this.dogEarImage[i] as any).type === type) {
        for (let j = 0; j < (this.dogEarImage[i] as any).src.length; j++) {
          // 判断哪种颜色
          if ((this.dogEarImage[i] as any).src[j].color === color) {
            for (let k = 0; k < (this.dogEarImage[i] as any).src[j].src.length; k++) {
              const dog = {
                type: type,
                character: '耳朵',
                color: (this.dogEarImage[i] as any).src[j].color,
                style: k + 1,
                src: (this.dogEarImage[i] as any).src[j].src[k].src
              };
              dogEar[k] = dog;
            }
            return dogEar;
          }
        }
      }
    }
  }

  /** 获取具体狗耳朵
   * @param {string} type 狗类型
   * @param {string} color   狗颜色
   * @param {number} style  耳朵类型
   * @returns {{type: string; character: string; color: any; style: number; src: any}}
   */
  getOneDogEarImage(type: string, color: string, style: any) {
    for (let i = 0; i < this.dogEarImage.length; i++) {
      // 判断哪种狗耳朵
      if ((this.dogEarImage[i] as any).type === type) {
        for (let j = 0; j < (this.dogEarImage[i] as any).src.length; j++) {
          // 判断哪种颜色
          if ((this.dogEarImage[i] as any).src[j].color === color) {
            for (let k = 0; k < (this.dogEarImage[i] as any).src[j].src.length; k++) {
              if ((this.dogEarImage[i] as any).src[j].src[k].style === style) {
                // 判断那种耳朵
                const dog = {
                  type: type,
                  character: '耳朵',
                  color: (this.dogEarImage[i] as any).src[j].color,
                  style: style,
                  src: (this.dogEarImage[i] as any).src[j].src[k].src
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
