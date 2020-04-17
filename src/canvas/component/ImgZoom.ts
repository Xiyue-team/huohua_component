/**
 * 基于Canvas的一个图片放大类
 *@since 1.0
 *@author chaoyang
 *@Date 2019/3/21 15:52
 */
export class ImgZoom {

  canvas: any;
  ctx: any;

  radio: number;
  index: number;
  imgList: Array<ImgZoomOption>;

  /**
   * @param {string} dom    id
   * @param {number} radio  缩放系数
   * @param {number} index  imgList的系数
   * @param {Array<ImgZoomOption>} imgList  图片集合
   */
  constructor(dom: string, radio: number, index: number, imgList: Array<ImgZoomOption>) {
    this.canvas = document.getElementById(dom);
    this.ctx = (this.canvas as any).getContext('2d');

    this.radio = radio;
    this.index = index;
    this.imgList = imgList;
  }

  /**
   * @param {number} radio  缩放系数
   * @param {number} index  imgList系数
   */
  renderAnimation(radio: number, index: number) {
    this.draw(this.imgList[index].link, this.imgList[index], this.imgList[index - 1].link, this.imgList[index - 1], radio);
  }


  /**
   * @param containerImage  大图片路径
   * @param imgNext         大图片数据
   * @param innerImage      小图片路径
   * @param imgCur          小图片数据
   * @param radio           缩放系数
   */
  draw(containerImage: any, imgNext: any, innerImage: any, imgCur: any, radio: any) {
    this.drawImgOversize(
      containerImage as any,
      imgNext.imgW,
      imgNext.imgH,
      imgNext.areaW,
      imgNext.areaH,
      imgNext.areaL,
      imgNext.areaT,
      radio,
    );

    this.drawImgMinisize(
      innerImage as any,
      imgCur.imgW,
      imgCur.imgH,
      imgNext.imgW,
      imgNext.imgH,
      imgNext.areaW,
      imgNext.areaH,
      imgNext.areaL,
      imgNext.areaT,
      radio,
    );
  }

  /**
   * @param {string} i  小图片路径
   * @param {number} t  小图片的宽
   * @param {number} e  小图片的高
   * @param {number} a  大图片的宽
   * @param {number} s  大图片的高
   * @param {number} n  大图片的画布的宽
   * @param {number} g  大图片的画布的高
   * @param {number} r  大图片的画布的x坐标
   * @param {number} m  大图片的画布的y坐标
   * @param {number} h  缩放系数
   */
  drawImgMinisize(i: string, t: number, e: number, a: number, s: number, n: number, g: number, r: number, m: number, h: number) {
    const img = new Image();
    img.src = i as any;
    img.onload = () => {
      this.ctx.drawImage(
        img,
        0,
        0,
        t,
        e,
        ((n / h - n) * (r / (a - n)) * h * 750) / n,
        ((g / h - g) * (m / (s - g)) * h * 1206) / g,
        750 * h,
        1206 * h,
      );
    };
  }

  /**
   * @param {string} i  大图片路径
   * @param {number} t  大图片的宽
   * @param {number} e  大图片的高
   * @param {number} a  大图片的画布的宽
   * @param {number} s  大图片的画布的高
   * @param {number} n  大图片的画布的x坐标
   * @param {number} g  大图片的画布的x坐标
   * @param {number} r  缩放系数
   */
  drawImgOversize(i: string, t: number, e: number, a: number, s: number, n: number, g: number, r: number) {
    const img = new Image();
    img.src = i as any;
    img.onload = () => {
      this.ctx.drawImage(
        img,
        n - (a / r - a) * (n / (t - a)),
        g - (s / r - s) * (g / (e - s)),
        a / r,
        s / r,
        0,
        0,
        750,
        1206,
      );
    };
  }
}


export class ImgZoomOption {

  link: string;
  imgW: number;   // 每张图的像素大小width  height
  imgH: number;
  areaW: number;  // 小图的宽高width  height
  areaH: number;
  areaL: number;  // 小图在大图中的偏移位置 left top  在大图实际大小中小图的偏移位置
  areaT: number;

}


