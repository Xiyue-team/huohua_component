const _lodash = require('lodash');

export class GeneticCombination {

  constructor () {

  }

  // 获取子代
  getChild(pf: Option, pm: Option) {

    const hair = this.getHairType(pf.hairGene, pm.hairGene);

    const dog = {
      shape: this.getShapeGene(pf.shape, pm.shape),
      color: this.getColorGene(pf.color, pm.color),
      ear: this.getEarsGene(pf.ear, pm.ear),
      legsLength: this.getLegsLength(pf.legsLength, pm.legsLength),
      tail: this.getTailGene(pf.tail, pm.tail),
      hair: hair[0],
      hairGene: hair[1],
      hairLength: 0
    };
    let hairLength: number;

    if (pf.hair === pm.hair) {
      if (pf.hair === '直毛') {
        hairLength = this.getStraightHairLength(pf.hairLength, pm.hairLength);
      } else {
        hairLength = this.getCurlyHairLength(pf.hairLength, pm.hairLength);
      }
    } else {
      // 不同毛发种类的狗毛发长度随父母
      if (dog.hair === pf.hair) {
        hairLength = pf.hairLength;
      } else {
        hairLength = pm.hairLength;
      }
    }

    dog.hairLength = hairLength;

    return dog;
  }

  /**
   * 获取相似度
   * @param {Dog} dog 比较的狗
   * @param {Dog} myDog 我的狗
   * @returns {number} 相似度
   */
  getSimilarity(dog: Option, myDog: Option) {

    let similarity = 0;
    if ( dog.shape === myDog.shape ) {
      similarity += 1;
    }

    if (dog.color === myDog.color) {
      similarity += 1;
    }

    if (dog.legsLength === myDog.legsLength) {
      similarity += 1;
    } else {
      similarity += (5 - Math.abs(dog.legsLength - myDog.legsLength)) / 5;
    }

    if (dog.ear === myDog.ear) {
      similarity += 1;
    }

    if (dog.tail === myDog.tail) {
      similarity += 1;
    }

    if (dog.hair === myDog.hair) {
      if (dog.hair === '直毛') {
        similarity += (5 - Math.abs(dog.hairLength - myDog.hairLength)) / 5;
      } else {
        similarity += (2 - Math.abs(dog.hairLength - myDog.hairLength)) / 2;
      }
    }

    return Math.floor(similarity / 6 * 100);
  }

  /**
   * 获取子代颜色   （不需要区分父本母本）
   * @param {string} pfColor 父本颜色
   * @param {string} pmColor 母本颜色
   */
  getColorGene(pfColor: string, pmColor: string) {
    const color = [
      {
        pf: '黑',
        pm: '白',
        child: [{
            color: '黑',
            min: 0,
            max: 60
          },
          {
            color: '白',
            min: 60,
            max: 90
          },
          {
            color: '黑白',
            min: 90,
            max: 100
          }]
      },

      {
        pf: '黑',
        pm: '黄',
        child: [{
            color: '黑',
            min: 0,
            max: 65
          },
          {
            color: '黄',
            min: 65,
            max: 100
          }],
      },

      {
        pf: '黑',
        pm: '灰',
        child: [{
            color: '黑',
            min: 0,
            max: 35
          },
          {
            color: '灰',
            min: 35,
            max: 100
          }],
      },

      {
        pf: '黑',
        pm: '黑',
        child: [{
            color: '黑',
            min: 0,
            max: 100
          }],
      },

      {
        pf: '黑',
        pm: '黑白',
        child: [{
            color: '黑',
            min: 0,
            max: 60
          },
          {
            color: '黑白',
            min: 60,
            max: 90
          },
          {
            color: '白',
            min: 90,
            max: 100
          }],
      },

      {
        pf: '黑',
        pm: '黄白',
        child: [{
          color: '黑',
          min: 0,
          max: 60
        },
          {
            color: '黄白',
            min: 60,
            max: 90
          },
          {
            color: '黄',
            min: 90,
            max: 100
          }],
      },

      {
        pf: '白',
        pm: '白',
        child: [{
            color: '白',
            min: 0,
            max: 100
          }],
      },

      {
        pf: '白',
        pm: '黄',
        child: [{
            color: '白',
            min: 0,
            max: 60
          },
          {
            color: '黄',
            min: 60,
            max: 90
          },
          {
            color: '黄白',
            min: 90,
            max: 100
          }],
      },

      {
        pf: '白',
        pm: '灰',
        child: [{
            color: '白',
            min: 0,
            max: 35
          },
          {
            color: '灰',
            min: 35,
            max: 100
          }],
      },

      {
        pf: '白',
        pm: '黑白',
        child: [{
            color: '白',
            min: 0,
            max: 60
          },
          {
            color: '黑白',
            min: 60,
            max: 90
          },
          {
            color: '黑',
            min: 90,
            max: 100
          }],
      },

      {
        pf: '白',
        pm: '黄白',
        child: [{
            color: '白',
            min: 0,
            max: 60
          },
          {
            color: '黄白',
            min: 60,
            max: 90
          },
          {
            color: '黄',
            min: 90,
            max: 100
          }],
      },

      {
        pf: '灰',
        pm: '灰',
        child: [{
            color: '灰',
            min: 0,
            max: 100
          }],
      },

      {
        pf: '灰',
        pm: '黄',
        child: [{
            color: '灰',
            min: 0,
            max: 70
          },
          {
            color: '黄',
            min: 70,
            max: 100
          }],
      },

      {
        pf: '灰',
        pm: '黑白',
        child: [{
            color: '灰',
            min: 0,
            max: 60
          },
          {
            color: '黑白',
            min: 60,
            max: 90
          },
          {
            color: '黑',
            min: 90,
            max: 95
          },
          {
            color: '白',
            min: 95,
            max: 100
          }],
      },

      {
        pf: '灰',
        pm: '黄白',
        child: [{
          color: '灰',
          min: 0,
          max: 60
        },
        {
          color: '黄白',
          min: 60,
          max: 90
        },
        {
          color: '黄',
          min: 90,
          max: 95
        },
        {
          color: '白',
          min: 95,
          max: 100
        }],
      },

      {
        pf: '黄',
        pm: '黄',
        child: [{
          color: '黄',
          min: 0,
          max: 100
        }],
      },

      {
        pf: '黄',
        pm: '黑白',
        child: [{
            color: '黄',
            min: 0,
            max: 30
          },
          {
            color: '黑白',
            min: 30,
            max: 90
          },
          {
            color: '黑',
            min: 90,
            max: 95
          },
          {
            color: '白',
            min: 95,
            max: 100
          }],
      },

      {
        pf: '黄',
        pm: '黄白',
        child: [{
            color: '黄',
            min: 0,
            max: 30
          },
          {
            color: '黄白',
            min: 30,
            max: 90
          },
          {
            color: '黄',
            min: 90,
            max: 95
          },
          {
            color: '白',
            min: 95,
            max: 100
          }],
      },

      {
        pf: '黄白',
        pm: '黄白',
        child: [{
            color: '黄白',
            min: 0,
            max: 60
          },
          {
            color: '黄',
            min: 60,
            max: 70
          },
          {
            color: '白',
            min: 70,
            max: 100
          }],
      },

      {
        pf: '黑白',
        pm: '黑白',
        child: [{
            color: '黑白',
            min: 0,
            max: 60
          },
          {
            color: '黑',
            min: 60,
            max: 90
          },
          {
            color: '白',
            min: 90,
            max: 100
          }],
      },

      {
        pf: '黑白',
        pm: '黄白',
        child: [{
            color: '黑白',
            min: 0,
            max: 60
          },
          {
            color: '黄白',
            min: 60,
            max: 90
          },
          {
            color: '黑',
            min: 90,
            max: 100
          },
          {
            color: '黄',
            min: 90,
            max: 100
          },
          {
            color: '白',
            min: 90,
            max: 100
          }],
      },
    ];

    const random = Math.floor(Math.random() * 100);

    for (let i = 0; i < color.length; i++) {
      if ((color[i].pf === pfColor && color[i].pm === pmColor) || (color[i].pf === pmColor && color[i].pm === pfColor)) {
        for (let j = 0; j < color[i].child.length; j++) {
          if (color[i].child[j].min <= random && color[i].child[j].max > random) {

            return color[i].child[j].color;
          }
        }
      }
    }
  }

  /**
   * 获取子代体型 （需要区分父本母本）
   * @param {string} pfShape  父本体型（父本的种类）
   * @param {string} pmShape  母本体型（母本种类）
   */
  getShapeGene(pfShape: string, pmShape: string) {
    const random = Math.floor(Math.random() * 100);

    // 20% 是父本的体型 80%是母本的体型
    if (random >= 0 && random < 20) {
      return pfShape;
    } else {
      return pmShape;
    }
  }

  // 获取子代毛发类型
  getHairType(pfGene: string, pmGene: string) {
    const hairType = [
      {
        pfHair: '卷毛',
        pmhair: '卷毛',
        pfGene: 'AA',
        pmGene: 'AA',
        child: [
          {
            gene: 'AA',
            hair: '卷毛',
            min: 0,
            max: 100
          }
        ],
      },

      {
        pfHair: '直毛',
        pmhair: '直毛',
        pfGene: 'aa',
        pmGene: 'aa',
        child: [
          {
            gene: 'aa',
            hair: '直毛',
            min: 0,
            max: 100
          }
        ],
      },

      {
        pfHair: '卷毛',
        pmhair: '卷毛',
        pfGene: 'AA',
        pmGene: 'Aa',
        child: [
          {
            gene: 'AA',
            hair: '卷毛',
            min: 0,
            max: 50
          },
          {
            gene: 'Aa',
            hair: '卷毛',
            min: 50,
            max: 100
          },
        ],
      },

      {
        pfHair: '卷毛',
        pmhair: '卷毛',
        pfGene: 'Aa',
        pmGene: 'Aa',
        child: [
          {
            gene: 'AA',
            hair: '卷毛',
            min: 0,
            max: 25
          },
          {
            gene: 'Aa',
            hair: '卷毛',
            min: 25,
            max: 75
          },
          {
            gene: 'aa',
            hair: '直毛',
            min: 75,
            max: 100
          },
        ],
      },

      {
        pfHair: '卷毛',
        pmhair: '直毛',
        pfGene: 'Aa',
        pmGene: 'aa',
        child: [
          {
            gene: 'Aa',
            hair: '卷毛',
            min: 0,
            max: 50
          },
          {
            gene: 'aa',
            hair: '直毛',
            min: 50,
            max: 100
          }
        ],
      },

      {
        pfHair: '卷毛',
        pmhair: '直毛',
        pfGene: 'AA',
        pmGene: 'aa',
        child: [
          {
            gene: 'Aa',
            hair: '卷毛',
            min: 0,
            max: 100
          },
        ],
      },
    ];

    const random = Math.floor(Math.random() * 100);

    for (let i = 0; i < hairType.length; i++) {
      if ((hairType[i].pfGene === pfGene && hairType[i].pmGene === pmGene)
        || (hairType[i].pfGene === pmGene && hairType[i].pmGene === pfGene)) {

        for (let j = 0; j < hairType[i].child.length; j++) {

          if (hairType[i].child[j].min <= random && hairType[i].child[j].max > random) {

            return [hairType[i].child[j].hair, hairType[i].child[j].gene];
          }

        }
      }
    }
  }

  /**
   * 获取直毛与直毛杂交子代毛发长度
   * @param {number} pfLength 父本长度
   * @param {number} pmLength 母本长度
   * @returns {number}
   */
  getStraightHairLength(pfLength: number, pmLength: number) {
    const random = Math.floor(Math.random() * 100);
    // 长度相等狗交配
    if (pfLength === pmLength) {
      // 细分三种情况  父本母本长度为1  父本母本长度为5  及其他长度
      if (pfLength === 1) {
        if (random < 95) {
          return pfLength;
        } else {
          return pfLength + 1;
        }
      } else if (pfLength === 5) {
        if (random < 95) {
          return pfLength;
        } else {
          return pfLength - 1;
        }
      } else {
        if (random < 90) {
          return pfLength;
        } else if (random < 95 && random >= 90) {
          return pfLength - 1;
        } else {
          return pfLength + 1;
        }
      }
    } else {
      // 长度不等的狗交配
      if (pfLength < pmLength) {
        if (random < 70) {
          return pfLength;
        } else {
          return pmLength;
        }
      } else {
        if (random < 70) {
          return pmLength;
        } else {
          return pfLength;
        }
      }
    }
  }

  /**
   * 获取卷毛与卷毛杂交子代毛发长度
   * @param {number} pfLength 父本长度
   * @param {number} pmLength 母本长度
   * @returns {number}
   */
  getCurlyHairLength(pfLength: number, pmLength: number) {
    const random = Math.floor(Math.random() * 100);

    if (pfLength === pmLength) {
      return pfLength;
    } else {
      if (pfLength < pmLength) {
        if (random < 70) {
          return pfLength;
        } else {
          return pmLength;
        }
      } else {
        if (random < 70) {
          return pmLength;
        } else {
          return pfLength;
        }
      }
    }
  }

  /**
   * 获取子代耳朵类型
   * @param {string} pfEars 父本耳朵
   * @param {string} pmEars 母本耳朵
   * @returns {string}
   */
  getEarsGene(pfEars: number, pmEars: number) {
    const random = Math.floor(Math.random() * 100);
    // 50% 是父本类型 50%是母本类型
    if (random >= 0 && random < 50) {
      return pfEars;
    } else {
      return pmEars;
    }
  }

  /**
   * 获取子代尾巴
   * @param {string} pfTail 父本尾巴
   * @param {string} pmTail 母本尾巴
   * @returns {string}
   */
  getTailGene(pfTail: number, pmTail: number) {
    const random = Math.floor(Math.random() * 100);
    // 50% 是父本类型 50%是母本类型
    if (random >= 0 && random < 50) {
      return pfTail;
    } else {
      return pmTail;
    }
  }

  /**
   * 获取子代腿长
   * @param {number} pfLength 父本长度
   * @param {number} pmLength 母本长度
   * @returns {number}
   */
  getLegsLength(pfLength: number, pmLength: number) {
    const random = Math.floor(Math.random() * 100);
    // 长度相等狗交配
    if (pfLength === pmLength) {
      // 细分三种情况  父本母本长度为1  父本母本长度为5  及其他长度
      if (pfLength === 1) {
        if (random < 95) {
          return pfLength;
        } else {
          return pfLength + 1;
        }
      } else if (pfLength === 5) {
        if (random < 95) {
          return pfLength;
        } else {
          return pfLength - 1;
        }
      } else {
        if (random < 90) {
          return pfLength;
        } else if (random < 95 && random >= 90) {
          return pfLength - 1;
        } else {
          return pfLength + 1;
        }
      }
    } else {
      // 长度不等的狗交配
      if (pfLength < pmLength) {
        if (random < 70) {
          return pfLength;
        } else {
          return pmLength;
        }
      } else {
        if (random < 70) {
          return pmLength;
        } else {
          return pfLength;
        }
      }
    }
  }
}

export class Option {
  shape: string;
  color: string;
  hair: string;
  hairLength: number;
  hairGene: string;
  ear: number;
  legsLength: number;
  tail: number;
}
