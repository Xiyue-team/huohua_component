
const tailColor = ['black', 'blackwhite', 'gray', 'white', 'yellow', 'yellowwhite'];
const lq_tail: any = [];
const bx_tail: any = [];
const dn_tail: any = [];
const jw_tail: any = [];
const kj_tail: any = [];
const ss_tail: any = [];

for (let i = 0; i < 6; i++) {
  lq_tail[i] = [];
  bx_tail[i] = [];
  dn_tail[i] = [];
  jw_tail[i] = [];
  kj_tail[i] = [];
  ss_tail[i] = [];

  for (let j = 0; j < 5; j++) {
    lq_tail[i][j] = require('./../sub_static/dogs/liequan/tail/' + tailColor[i] + '/type' + (j + 1) + '.png');
    bx_tail[i][j] = require('./../sub_static/dogs/bixiong/tail/' + tailColor[i] + '/type' + (j + 1) + '.png');
    dn_tail[i][j] = require('./../sub_static/dogs/douniu/tail/' + tailColor[i] + '/type' + (j + 1) + '.png');
    jw_tail[i][j] = require('./../sub_static/dogs/jiwawa/tail/' + tailColor[i] + '/type' + (j + 1) + '.png');
    kj_tail[i][j] = require('./../sub_static/dogs/keji/tail/' + tailColor[i] + '/type' + (j + 1) + '.png');
    ss_tail[i][j] = require('./../sub_static/dogs/songshi/tail/' + tailColor[i] + '/type' + (j + 1) + '.png');
  }
}


export class DogTail {
  dogTailImage: Array<object>;

  // 猎犬耳朵颜色
  lqTailImage: Array<Object>;

  // 比熊耳朵颜色
  bxTailImage: Array<Object>;

  // 斗牛
  dnTailImage: Array<Object>;

  // 吉娃娃
  jwTailImage: Array<Object>;

  // 柯基
  kjTailImage: Array<Object>;

  // 松狮
  ssTailImage: Array<Object>;

  constructor() {
    this.lqTailImage = this.loadTailImage(lq_tail);
    this.bxTailImage = this.loadTailImage(bx_tail);
    this.dnTailImage = this.loadTailImage(dn_tail);
    this.jwTailImage = this.loadTailImage(jw_tail);
    this.kjTailImage = this.loadTailImage(kj_tail);
    this.ssTailImage = this.loadTailImage(ss_tail);

    this.dogTailImage = [
      {
        type: '猎犬',
        character: '尾巴',
        src: this.lqTailImage
      },
      {
        type: '比熊',
        character: '尾巴',
        src: this.bxTailImage
      },
      {
        type: '斗牛',
        character: '尾巴',
        src: this.dnTailImage
      },
      {
        type: '吉娃',
        character: '尾巴',
        src: this.jwTailImage
      },
      {
        type: '柯基',
        character: '尾巴',
        src: this.kjTailImage
      },
      {
        type: '松狮',
        character: '尾巴',
        src: this.ssTailImage
      },
    ];

  }

  loadTailImage(imageArray: Array<any>) {
    const black = [];
    const blackWhite = [];
    const gray = [];
    const white = [];
    const yellow = [];
    const yellowWhite = [];

    for (let i = 0; i < 5; i++) {
      black.push({
        style: i + 1,
        src: imageArray[0][i],
      });
      blackWhite.push({
        style: i + 1,
        src: imageArray[1][i],
      });
      gray.push({
        style: i + 1,
        src: imageArray[2][i],
      });
      white.push({
        style: i + 1,
        src: imageArray[3][i],
      });
      yellow.push({
        style: i + 1,
        src: imageArray[4][i],
      });
      yellowWhite.push({
        style: i + 1,
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

  // 获取狗尾巴
  /**
   * @param {string} type 狗类型
   * @param {string} color  狗颜色
   * @returns {any[]}
   */
  getDogTailImage(type: string, color: string) {
    const dogTail = [];
    for (let i = 0; i < this.dogTailImage.length; i++) {
      // 判断哪种狗尾巴
      if ((this.dogTailImage[i] as any).type === type) {
        for (let j = 0; j < (this.dogTailImage[i] as any).src.length; j++) {
          // 判断哪种颜色
          if ((this.dogTailImage[i] as any).src[j].color === color) {
            for (let k = 0; k < (this.dogTailImage[i] as any).src[j].src.length; k++) {
              const dog = {
                type: type,
                character: '尾巴',
                color: (this.dogTailImage[i] as any).src[j].color,
                style: k + 1,
                src: (this.dogTailImage[i] as any).src[j].src[k].src
              };
              dogTail[k] = dog;
            }
            return dogTail;
          }
        }
      }
    }
  }


  // 获取单个狗尾巴
  /**
   * @param {string} type 狗类型
   * @param {string} color  狗颜色
   * @param {string} style  狗尾巴款式
   */
  getOneDogTailImage(type: string, color: string, style: number) {
    for (let i = 0; i < this.dogTailImage.length; i++) {
      // 判断哪种狗尾巴
      if ((this.dogTailImage[i] as any).type === type) {
        for (let j = 0; j < (this.dogTailImage[i] as any).src.length; j++) {
          // 判断哪种颜色
          if ((this.dogTailImage[i] as any).src[j].color === color) {
            for (let k = 0; k < (this.dogTailImage[i] as any).src[j].src.length; k++) {
              if ((this.dogTailImage[i] as any).src[j].src[k].style === style) {
                const dog = {
                  type: type,
                  character: '尾巴',
                  color: (this.dogTailImage[i] as any).src[j].color,
                  style: k + 1,
                  src: (this.dogTailImage[i] as any).src[j].src[k].src
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












