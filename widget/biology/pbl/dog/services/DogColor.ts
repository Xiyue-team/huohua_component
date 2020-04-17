
import * as lq_shape_black from './../sub_static/dogs/liequan/shape/black/straight/length01.png';
import * as lq_shape_blackWhite from '../sub_static/dogs/liequan/shape/blackwhite/straight/length01.png';
import * as lq_shape_gray from './../sub_static/dogs/liequan/shape/gray/straight/length01.png';
import * as lq_shape_white from './../sub_static/dogs/liequan/shape/white/straight/length01.png';
import * as lq_shape_yellow from '../sub_static/dogs/liequan/shape/yellow/straight/length01.png';
import * as lq_shape_yellowWhite from '../sub_static/dogs/liequan/shape/yellowwhite/straight/length01.png';

import * as bx_shape_black from './../sub_static/dogs/bixiong/shape/black/straight/length01.png';
import * as bx_shape_blackWhite from './../sub_static/dogs/bixiong/shape/blackWhite/straight/length01.png';
import * as bx_shape_gray from './../sub_static/dogs/bixiong/shape/gray/straight/length01.png';
import * as bx_shape_white from './../sub_static/dogs/bixiong/shape/white/straight/length01.png';
import * as bx_shape_yellow from '../sub_static/dogs/bixiong/shape/yellow/straight/length01.png';
import * as bx_shape_yellowWhite from './../sub_static/dogs/bixiong/shape/yellowWhite/straight/length01.png';

import * as dn_shape_black from './../sub_static/dogs/douniu/shape/black/straight/length1.png';
import * as dn_shape_blackWhite from './../sub_static/dogs/douniu/shape/blackWhite/straight/length1.png';
import * as dn_shape_gray from './../sub_static/dogs/douniu/shape/gray/straight/length1.png';
import * as dn_shape_white from './../sub_static/dogs/douniu/shape/white/straight/length1.png';
import * as dn_shape_yellow from '../sub_static/dogs/douniu/shape/yellow/straight/length1.png';
import * as dn_shape_yellowWhite from './../sub_static/dogs/douniu/shape/yellowWhite/straight/length1.png';

import * as jw_shape_black from './../sub_static/dogs/jiwawa/shape/black/straight/length1.png';
import * as jw_shape_blackWhite from '../sub_static/dogs/jiwawa/shape/blackWhite/straight/length1.png';
import * as jw_shape_gray from './../sub_static/dogs/jiwawa/shape/gray/straight/length1.png';
import * as jw_shape_white from './../sub_static/dogs/jiwawa/shape/white/straight/length1.png';
import * as jw_shape_yellow from '../sub_static/dogs/jiwawa/shape/yellow/straight/length1.png';
import * as jw_shape_yellowWhite from '../sub_static/dogs/jiwawa/shape/yellowWhite/straight/length1.png';

import * as kj_shape_black from './../sub_static/dogs/keji/shape/black/straight/length1.png';
import * as kj_shape_blackWhite from '../sub_static/dogs/keji/shape/blackWhite/straight/length1.png';
import * as kj_shape_gray from './../sub_static/dogs/keji/shape/gray/straight/length1.png';
import * as kj_shape_white from './../sub_static/dogs/keji/shape/white/straight/length1.png';
import * as kj_shape_yellow from '../sub_static/dogs/keji/shape/yellow/straight/length1.png';
import * as kj_shape_yellowWhite from '../sub_static/dogs/keji/shape/yellowWhite/straight/length1.png';

import * as ss_shape_black from './../sub_static/dogs/songshi/shape/black/straight/length1.png';
import * as ss_shape_blackWhite from '../sub_static/dogs/songshi/shape/blackWhite/straight/length1.png';
import * as ss_shape_gray from './../sub_static/dogs/songshi/shape/gray/straight/length1.png';
import * as ss_shape_white from './../sub_static/dogs/songshi/shape/white/straight/length1.png';
import * as ss_shape_yellow from '../sub_static/dogs/songshi/shape/yellow/straight/length1.png';
import * as ss_shape_yellowWhite from '../sub_static/dogs/songshi/shape/yellowWhite/straight/length1.png';


export class DogColor {

  dogColorImage: Array<object>;

  // 猎犬身体颜色
  lqColorImage: Array<Object>;

  // 比熊身体颜色
  bxColorImage: Array<Object>;

  // 斗牛身体颜色
  dnColorImage: Array<Object>;

  // 吉娃娃身体颜色
  jwColorImage: Array<Object>;

  // 柯基身体颜色
  kjColorImage: Array<Object>;

  // 松狮身体颜色
  ssColorImage: Array<Object>;

  constructor() {

    this.lqColorImage = [
      {
        color: '黑',
        src: lq_shape_black
      },
      {
        color: '白',
        src: lq_shape_white
      },
      {
        color: '灰',
        src: lq_shape_gray
      },
      {
        color: '黑白',
        src: lq_shape_blackWhite
      },
      {
        color: '黄',
        src: lq_shape_yellow
      },
      {
        color: '黄白',
        src: lq_shape_yellowWhite
      }
    ];

    this.bxColorImage = [
      {
        color: '黑',
        src: bx_shape_black
      },
      {
        color: '白',
        src: bx_shape_white
      },
      {
        color: '灰',
        src: bx_shape_gray
      },
      {
        color: '黑白',
        src: bx_shape_blackWhite
      },
      {
        color: '黄',
        src: bx_shape_yellow
      },
      {
        color: '黄白',
        src: bx_shape_yellowWhite
      }
    ];

    this.dnColorImage = [
      {
        color: '黑',
        src: dn_shape_black
      },
      {
        color: '白',
        src: dn_shape_white
      },
      {
        color: '灰',
        src: dn_shape_gray
      },
      {
        color: '黑白',
        src: dn_shape_blackWhite
      },
      {
        color: '黄',
        src: dn_shape_yellow
      },
      {
        color: '黄白',
        src: dn_shape_yellowWhite
      }
    ];

    this.jwColorImage = [
      {
        color: '黑',
        src: jw_shape_black
      },
      {
        color: '白',
        src: jw_shape_white
      },
      {
        color: '灰',
        src: jw_shape_gray
      },
      {
        color: '黑白',
        src: jw_shape_blackWhite
      },
      {
        color: '黄',
        src: jw_shape_yellow
      },
      {
        color: '黄白',
        src: jw_shape_yellowWhite
      }
    ];

    this.kjColorImage = [
      {
        color: '黑',
        src: kj_shape_black
      },
      {
        color: '白',
        src: kj_shape_white
      },
      {
        color: '灰',
        src: kj_shape_gray
      },
      {
        color: '黑白',
        src: kj_shape_blackWhite
      },
      {
        color: '黄',
        src: kj_shape_yellow
      },
      {
        color: '黄白',
        src: kj_shape_yellowWhite
      }
    ];

    this.ssColorImage = [
      {
        color: '黑',
        src: ss_shape_black
      },
      {
        color: '白',
        src: ss_shape_white
      },
      {
        color: '灰',
        src: ss_shape_gray
      },
      {
        color: '黑白',
        src: ss_shape_blackWhite
      },
      {
        color: '黄',
        src: ss_shape_yellow
      },
      {
        color: '黄白',
        src: ss_shape_yellowWhite
      }
    ];

    this.dogColorImage = [
      {
        type: '猎犬',
        character: '身体',
        src: this.lqColorImage
      },
      {
        type: '比熊',
        character: '身体',
        src: this.bxColorImage
      },
      {
        type: '斗牛',
        character: '身体',
        src: this.dnColorImage
      },
      {
        type: '吉娃',
        character: '身体',
        src: this.jwColorImage
      },
      {
        type: '柯基',
        character: '身体',
        src: this.kjColorImage
      },
      {
        type: '松狮',
        character: '身体',
        src: this.ssColorImage
      },
    ];

  }

  // 获取狗身体的颜色
  getDogColor(type: string) {
    const dogColor = [];

    for (let i = 0; i < this.dogColorImage.length; i++) {
      if ((this.dogColorImage[i] as any).type === type) {

        for (let j = 0; j < (this.dogColorImage[i] as any).src.length; j++) {
          const dog = {
            type: type,
            character: (this.dogColorImage[i] as any).character,
            color: (this.dogColorImage[i] as any).src[j].color,
            src: (this.dogColorImage[i] as any).src[j].src
          };

          dogColor[j] = dog;
        }

        return dogColor;
      }
    }
  }


}
