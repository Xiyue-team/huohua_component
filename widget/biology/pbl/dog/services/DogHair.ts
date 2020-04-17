
const dogColor = ['black', 'blackwhite', 'gray', 'white', 'yellow', 'yellowwhite'];
const lq_legs_straight: any = [];
const bx_legs_straight: any = [];
const dn_legs_straight: any = [];
const jw_legs_straight: any = [];
const kj_legs_straight: any = [];
const ss_legs_straight: any = [];

const lq_legs_curly: any = [];
const bx_legs_curly: any = [];
const dn_legs_curly: any = [];
const jw_legs_curly: any = [];
const kj_legs_curly: any = [];
const ss_legs_curly: any = [];

const lq_shape_straight: any = [];
const bx_shape_straight: any = [];
const dn_shape_straight: any = [];
const jw_shape_straight: any = [];
const kj_shape_straight: any = [];
const ss_shape_straight: any = [];

const lq_shape_curly: any = [];
const bx_shape_curly: any = [];
const dn_shape_curly: any = [];
const jw_shape_curly: any = [];
const kj_shape_curly: any = [];
const ss_shape_curly: any = [];

for (let i = 0; i < 6; i++) {
  // 颜色
  lq_legs_straight[i] = [];
  bx_legs_straight[i] = [];
  dn_legs_straight[i] = [];
  jw_legs_straight[i] = [];
  kj_legs_straight[i] = [];
  ss_legs_straight[i] = [];

  lq_legs_curly[i] = [];
  bx_legs_curly[i] = [];
  dn_legs_curly[i] = [];
  jw_legs_curly[i] = [];
  kj_legs_curly[i] = [];
  ss_legs_curly[i] = [];

  lq_shape_straight[i] = [];
  bx_shape_straight[i] = [];
  dn_shape_straight[i] = [];
  jw_shape_straight[i] = [];
  kj_shape_straight[i] = [];
  ss_shape_straight[i] = [];

  lq_shape_curly[i] = [];
  bx_shape_curly[i] = [];
  dn_shape_curly[i] = [];
  jw_shape_curly[i] = [];
  kj_shape_curly[i] = [];
  ss_shape_curly[i] = [];

  for (let j = 0; j < 5; j++) {
    // 身体毛长
    lq_shape_straight[i][j] = require('./../sub_static/dogs/liequan/shape/' + dogColor[i] + '/straight/length0' + (j + 1) + '.png');
    bx_shape_straight[i][j] = require('./../sub_static/dogs/bixiong/shape/' + dogColor[i] + '/straight/length0' + (j + 1) + '.png');
    dn_shape_straight[i][j] = require('./../sub_static/dogs/douniu/shape/' + dogColor[i] + '/straight/length' + (j + 1) + '.png');
    jw_shape_straight[i][j] = require('./../sub_static/dogs/jiwawa/shape/' + dogColor[i] + '/straight/length' + (j + 1) + '.png');
    kj_shape_straight[i][j] = require('./../sub_static/dogs/keji/shape/' + dogColor[i] + '/straight/length' + (j + 1) + '.png');
    ss_shape_straight[i][j] = require('./../sub_static/dogs/songshi/shape/' + dogColor[i] + '/straight/length' + (j + 1) + '.png');


    // 直毛腿长度
    lq_legs_straight[i][j] = [];
    bx_legs_straight[i][j] = [];
    dn_legs_straight[i][j] = [];
    jw_legs_straight[i][j] = [];
    kj_legs_straight[i][j] = [];
    ss_legs_straight[i][j] = [];

    // 卷毛腿长度
    lq_legs_curly[i][j] = [];
    bx_legs_curly[i][j] = [];
    dn_legs_curly[i][j] = [];
    jw_legs_curly[i][j] = [];
    kj_legs_curly[i][j] = [];
    ss_legs_curly[i][j] = [];

    for (let k = 0; k < 5; k++) {
      lq_legs_straight[i][j][k] = require('./../sub_static/dogs/liequan/legs/' + dogColor[i]
        + '/straight/length' + (j + 1) + '/type' + (k + 1) + '.png');
      bx_legs_straight[i][j][k] = require('./../sub_static/dogs/bixiong/legs/' + dogColor[i]
        + '/straight/length' + (j + 1) + '/type' + (k + 1) + '.png');
      dn_legs_straight[i][j][k] = require('./../sub_static/dogs/douniu/legs/' + dogColor[i]
        + '/straight/length' + (j + 1) + '/type' + (k + 1) + '.png');
      jw_legs_straight[i][j][k] = require('./../sub_static/dogs/jiwawa/legs/' + dogColor[i]
        + '/straight/length' + (j + 1) + '/type' + (k + 1) + '.png');
      kj_legs_straight[i][j][k] = require('./../sub_static/dogs/keji/legs/' + dogColor[i]
        + '/straight/length' + (j + 1) + '/type' + (k + 1) + '.png');
      ss_legs_straight[i][j][k] = require('./../sub_static/dogs/songshi/legs/' + dogColor[i]
        + '/straight/length' + (j + 1) + '/type' + (k + 1) + '.png');
    }

    for (let k = 0; k < 2; k++) {
      lq_legs_curly[i][j][k] = require('./../sub_static/dogs/liequan/legs/' + dogColor[i]
        + '/curly/length' + (j + 1) + '/type' + (k + 1) + '.png');
      bx_legs_curly[i][j][k] = require('./../sub_static/dogs/bixiong/legs/' + dogColor[i]
        + '/curly/length' + (j + 1) + '/type' + (k + 1) + '.png');
      dn_legs_curly[i][j][k] = require('./../sub_static/dogs/douniu/legs/' + dogColor[i]
        + '/curly/length' + (j + 1) + '/type' + (k + 1) + '.png');
      jw_legs_curly[i][j][k] = require('./../sub_static/dogs/jiwawa/legs/' + dogColor[i]
        + '/curly/length' + (j + 1) + '/type' + (k + 1) + '.png');
      kj_legs_curly[i][j][k] = require('./../sub_static/dogs/keji/legs/' + dogColor[i]
        + '/curly/length' + (j + 1) + '/type' + (k + 1) + '.png');
      ss_legs_curly[i][j][k] = require('./../sub_static/dogs/songshi/legs/' + dogColor[i]
        + '/curly/length' + (j + 1) + '/type' + (k + 1) + '.png');
    }


  }

  for (let j = 0; j < 2; j++) {

    // 身体卷毛长
    lq_shape_curly[i][j] = require('./../sub_static/dogs/liequan/shape/' + dogColor[i] + '/curly/length0' + (j + 1) + '.png');
    bx_shape_curly[i][j] = require('./../sub_static/dogs/bixiong/shape/' + dogColor[i] + '/curly/length0' + (j + 1) + '.png');
    dn_shape_curly[i][j] = require('./../sub_static/dogs/douniu/shape/' + dogColor[i] + '/curly/length' + (j + 1) + '.png');
    jw_shape_curly[i][j] = require('./../sub_static/dogs/jiwawa/shape/' + dogColor[i] + '/curly/length' + (j + 1) + '.png');
    kj_shape_curly[i][j] = require('./../sub_static/dogs/keji/shape/' + dogColor[i] + '/curly/length' + (j + 1) + '.png');
    ss_shape_curly[i][j] = require('./../sub_static/dogs/songshi/shape/' + dogColor[i] + '/curly/length' + (j + 1) + '.png');

  }
}


export class DogHair {

  shapeStraightHair: Array<Object>;
  shapeCurlyHair: Array<Object>;

  legsStraightHair: Array<Object>;
  legsCurlyHair: Array<Object>;

  constructor() {
    this.initLegsStraightHair();
    this.initLegsCurlyHair();
    this.initShapeStraightHair();
    this.initShapeCurlyHair();
  }

  // 添加狗腿直毛
  initLegsStraightHair() {
    const lqLegsImage = this.loadLegsStraightImage(lq_legs_straight);
    const bxLegsImage = this.loadLegsStraightImage(bx_legs_straight);
    const dnLegsImage = this.loadLegsStraightImage(dn_legs_straight);
    const jwLegsImage = this.loadLegsStraightImage(jw_legs_straight);
    const kjLegsImage = this.loadLegsStraightImage(kj_legs_straight);
    const ssLegsImage = this.loadLegsStraightImage(ss_legs_straight);

    this.legsStraightHair = [
      {
        type: '猎犬',
        character: '腿',
        src: lqLegsImage
      },
      {
        type: '比熊',
        character: '腿',
        src: bxLegsImage
      },
      {
        type: '斗牛',
        character: '腿',
        src: dnLegsImage
      },
      {
        type: '吉娃',
        character: '腿',
        src: jwLegsImage
      },
      {
        type: '柯基',
        character: '腿',
        src: kjLegsImage
      },
      {
        type: '松狮',
        character: '腿',
        src: ssLegsImage
      },
    ];
  }

  // 添加狗腿卷毛
  initLegsCurlyHair() {
    const lqLegsImage = this.loadLegsCurlyImage(lq_legs_curly);
    const bxLegsImage = this.loadLegsCurlyImage(bx_legs_curly);
    const dnLegsImage = this.loadLegsCurlyImage(dn_legs_curly);
    const jwLegsImage = this.loadLegsCurlyImage(jw_legs_curly);
    const kjLegsImage = this.loadLegsCurlyImage(kj_legs_curly);
    const ssLegsImage = this.loadLegsCurlyImage(ss_legs_curly);


    this.legsCurlyHair = [
      {
        type: '猎犬',
        character: '腿',
        src: lqLegsImage
      },
      {
        type: '比熊',
        character: '腿',
        src: bxLegsImage
      },
      {
        type: '斗牛',
        character: '腿',
        src: dnLegsImage
      },
      {
        type: '吉娃',
        character: '腿',
        src: jwLegsImage
      },
      {
        type: '柯基',
        character: '腿',
        src: kjLegsImage
      },
      {
        type: '松狮',
        character: '腿',
        src: ssLegsImage
      },
    ];
  }

  // 添加身体直毛
  initShapeStraightHair() {
    const lqShapeImage = this.loadShapeStraightImage(lq_shape_straight);
    const bxShapeImage = this.loadShapeStraightImage(bx_shape_straight);
    const dnShapeImage = this.loadShapeStraightImage(dn_shape_straight);
    const jwShapeImage = this.loadShapeStraightImage(jw_shape_straight);
    const kjShapeImage = this.loadShapeStraightImage(kj_shape_straight);
    const ssShapeImage = this.loadShapeStraightImage(ss_shape_straight);

    this.shapeStraightHair = [
      {
        type: '猎犬',
        character: '身体',
        src: lqShapeImage
      },
      {
        type: '比熊',
        character: '身体',
        src: bxShapeImage
      },
      {
        type: '斗牛',
        character: '身体',
        src: dnShapeImage
      },
      {
        type: '吉娃',
        character: '身体',
        src: jwShapeImage
      },
      {
        type: '柯基',
        character: '身体',
        src: kjShapeImage
      },
      {
        type: '松狮',
        character: '身体',
        src: ssShapeImage
      },
    ];
  }

  // 添加身体卷毛
  initShapeCurlyHair() {
    const lqShapeImage = this.loadShapeCurlyImage(lq_shape_curly);
    const bxShapeImage = this.loadShapeCurlyImage(bx_shape_curly);
    const dnShapeImage = this.loadShapeCurlyImage(dn_shape_curly);
    const jwShapeImage = this.loadShapeCurlyImage(jw_shape_curly);
    const kjShapeImage = this.loadShapeCurlyImage(kj_shape_curly);
    const ssShapeImage = this.loadShapeCurlyImage(ss_shape_curly);

    this.shapeCurlyHair = [
      {
        type: '猎犬',
        character: '身体',
        src: lqShapeImage
      },
      {
        type: '比熊',
        character: '身体',
        src: bxShapeImage
      },
      {
        type: '斗牛',
        character: '身体',
        src: dnShapeImage
      },
      {
        type: '吉娃',
        character: '身体',
        src: jwShapeImage
      },
      {
        type: '柯基',
        character: '身体',
        src: kjShapeImage
      },
      {
        type: '松狮',
        character: '身体',
        src: ssShapeImage
      },
    ];
  }

  // 加载狗腿直毛
  loadLegsStraightImage (imageArray: Array<any>) {
    const black = [];
    const blackWhite = [];
    const gray = [];
    const white = [];
    const yellow = [];
    const yellowWhite = [];

    const legsLength1: any = [];
    const legsLength2: any = [];
    const legsLength3: any = [];
    const legsLength4: any = [];
    const legsLength5: any = [];
    const legsLength6: any = [];

    for (let i = 0; i < 5; i++) {
      legsLength1[i] = [];
      legsLength2[i] = [];
      legsLength3[i] = [];
      legsLength4[i] = [];
      legsLength5[i] = [];
      legsLength6[i] = [];

      for (let j = 0; j < 5; j++) {
        legsLength1[i].push({
          hairLength: j + 1,
          src: imageArray[0][i][j],
        });
        legsLength2[i].push({
          hairLength: j + 1,
          src: imageArray[1][i][j],
        });
        legsLength3[i].push({
          hairLength: j + 1,
          src: imageArray[2][i][j],
        });
        legsLength4[i].push({
          hairLength: j + 1,
          src: imageArray[3][i][j],
        });
        legsLength5[i].push({
          hairLength: j + 1,
          src: imageArray[4][i][j],
        });
        legsLength6[i].push({
          hairLength: j + 1,
          src: imageArray[5][i][j],
        });
      }

      black.push({
        legsLength: i + 1,
        src: legsLength1[i],
      });
      blackWhite.push({
        legsLength: i + 1,
        src: legsLength2[i],
      });
      gray.push({
        legsLength: i + 1,
        src: legsLength3[i],
      });
      white.push({
        legsLength: i + 1,
        src: legsLength4[i],
      });
      yellow.push({
        legsLength: i + 1,
        src: legsLength5[i],
      });
      yellowWhite.push({
        legsLength: i + 1,
        src: legsLength6[i],
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

  // 加载狗腿卷毛
  loadLegsCurlyImage (imageArray: Array<any>) {
    const black = [];
    const blackWhite = [];
    const gray = [];
    const white = [];
    const yellow = [];
    const yellowWhite = [];

    const legsLength1: any = [];
    const legsLength2: any = [];
    const legsLength3: any = [];
    const legsLength4: any = [];
    const legsLength5: any = [];
    const legsLength6: any = [];

    for (let i = 0; i < 5; i++) {
      legsLength1[i] = [];
      legsLength2[i] = [];
      legsLength3[i] = [];
      legsLength4[i] = [];
      legsLength5[i] = [];
      legsLength6[i] = [];

      for (let j = 0; j < 2; j++) {
        legsLength1[i].push({
          hairLength: j + 1,
          src: imageArray[0][i][j],
        });
        legsLength2[i].push({
          hairLength: j + 1,
          src: imageArray[1][i][j],
        });
        legsLength3[i].push({
          hairLength: j + 1,
          src: imageArray[2][i][j],
        });
        legsLength4[i].push({
          hairLength: j + 1,
          src: imageArray[3][i][j],
        });
        legsLength5[i].push({
          hairLength: j + 1,
          src: imageArray[4][i][j],
        });
        legsLength6[i].push({
          hairLength: j + 1,
          src: imageArray[5][i][j],
        });
      }

      black.push({
        legsLength: i + 1,
        src: legsLength1[i],
      });
      blackWhite.push({
        legsLength: i + 1,
        src: legsLength2[i],
      });
      gray.push({
        legsLength: i + 1,
        src: legsLength3[i],
      });
      white.push({
        legsLength: i + 1,
        src: legsLength4[i],
      });
      yellow.push({
        legsLength: i + 1,
        src: legsLength5[i],
      });
      yellowWhite.push({
        legsLength: i + 1,
        src: legsLength6[i],
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

  // 加载身体直毛
  loadShapeStraightImage(imageArray: Array<any>) {
    const black = [];
    const blackWhite = [];
    const gray = [];
    const white = [];
    const yellow = [];
    const yellowWhite = [];

    for (let i = 0; i < 5; i++) {
      black.push({
        hairLength: i + 1,
        src: imageArray[0][i],
      });
      blackWhite.push({
        hairLength: i + 1,
        src: imageArray[1][i],
      });
      gray.push({
        hairLength: i + 1,
        src: imageArray[2][i],
      });
      white.push({
        hairLength: i + 1,
        src: imageArray[3][i],
      });
      yellow.push({
        hairLength: i + 1,
        src: imageArray[4][i],
      });
      yellowWhite.push({
        hairLength: i + 1,
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

  // 加载身体卷毛
  loadShapeCurlyImage(imageArray: Array<any>) {
    const black = [];
    const blackWhite = [];
    const gray = [];
    const white = [];
    const yellow = [];
    const yellowWhite = [];

    for (let i = 0; i < 2; i++) {
      black.push({
        hairLength: i + 1,
        src: imageArray[0][i],
      });
      blackWhite.push({
        hairLength: i + 1,
        src: imageArray[1][i],
      });
      gray.push({
        hairLength: i + 1,
        src: imageArray[2][i],
      });
      white.push({
        hairLength: i + 1,
        src: imageArray[3][i],
      });
      yellow.push({
        hairLength: i + 1,
        src: imageArray[4][i],
      });
      yellowWhite.push({
        hairLength: i + 1,
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


  /**
   * @param {string} type 狗的种类
   * @param {string} color  狗的颜色
   * @param {string} hair 毛发形态
   * @param legsLength  腿长
   * @param hairLength  毛长
   */
  getDogLegImage(type: string, color: string, hair: string, legsLength: any, hairLength: any, hairGene: string) {

    let dogLegsHari: any;
    if (hair === '卷毛') {
      dogLegsHari = this.getDogLegHairImage(type, color, legsLength, hairLength, hairGene, this.legsCurlyHair);
    } else if (hair === '直毛') {
      dogLegsHari = this.getDogLegHairImage(type, color, legsLength, hairLength, hairGene, this.legsStraightHair);
    } else {
      console.log('狗腿毛发的种类不对');
    }

    return dogLegsHari;
  }

  /**
   * @param {string} type 狗的种类
   * @param {string} color  狗的颜色
   * @param {string} hair 毛发形态
   * @param hairLength  毛长
   */
  getDogShapeImage(type: string, color: string, hair: string, hairLength: any) {

    let dogLegsHari: any;
    if (hair === '卷毛') {
      dogLegsHari = this.getDogShapeHairImage(type, color, hairLength, this.shapeCurlyHair, hair);
    } else if (hair === '直毛') {
      dogLegsHari = this.getDogShapeHairImage(type, color, hairLength, this.shapeStraightHair, hair);
    } else {
      console.log('狗身体毛发的种类不对');
    }

    return dogLegsHari;
  }


  // 用于获取狗腿具体的对象
  /**
   * @param {string} type 狗的种类
   * @param {string} color  狗的颜色
   * @param legsLength  腿长
   * @param hairLength  毛长
   * @param {Array<Object>} imageArray  对应的图片数组
   * @returns {{type: string; character: string; color: string; legsLength: any; hairLength: any; src: any}}
   */
  getDogLegHairImage(type: string, color: string, legsLength: any, hairLength: any, hairGene: string, imageArray: Array<Object>) {
    for (let i = 0; i < imageArray.length; i++) {
      // 判断狗的种类
      if ((imageArray[i] as any).type === type) {
        // console.log('种类判断成功');
        for (let j = 0; j < (imageArray[i] as any).src.length; j++) {
          // 判断狗的颜色
          if ((imageArray[i] as any).src[j].color === color) {
            for (let k = 0; k < (imageArray[i] as any).src[j].src.length; k++) {
              // 判断狗腿的长度
              if ((imageArray[i] as any).src[j].src[k].legsLength === legsLength) {
                // console.log('腿长判断成功');
                for (let n = 0; n < (imageArray[i] as any).src[j].src[k].src.length; n++) {
                  if ((imageArray[i] as any).src[j].src[k].src[n].hairLength === hairLength) {
                    const dogLegs = {
                      type: type,
                      character: '腿',
                      color: color,
                      legsLength: legsLength,
                      hairLength: hairLength,
                      hairGene: hairGene,
                      src: (imageArray[i] as any).src[j].src[k].src[n].src
                    };
                    return dogLegs;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // 用于获取狗身体具体的对象
  /**
   * @param {string} type 狗的种类
   * @param {string} color  狗的颜色
   * @param hairLength  毛长
   */
  getDogShapeHairImage(type: string, color: string, hairLength: any, imageArray: Array<Object>, hairMorphology: string) {
    for (let i = 0; i < imageArray.length; i++) {
      // 判断狗的种类
      if ((imageArray[i] as any).type === type) {
        for (let j = 0; j < (imageArray[i] as any).src.length; j++) {
          // 判断狗的颜色
          if ((imageArray[i] as any).src[j].color === color) {
            for (let k = 0; k < (imageArray[i] as any).src[j].src.length; k++) {
              // 判断狗的毛长
              if ((imageArray[i] as any).src[j].src[k].hairLength === hairLength) {
                const dogShape = {
                  type: type,
                  character: '身体',
                  color: color,
                  hairLength: hairLength,
                  hairMorphology: hairMorphology,
                  src: (imageArray[i] as any).src[j].src[k].src
                };
                return dogShape;
              }
            }
          }
        }
      }
    }

  }

}



