import * as y0 from '../sub_static/image1x/y1.png';
import * as y1 from '../sub_static/image1x/y1.png';
import * as y2 from '../sub_static/image1x/y2.png';
import * as y3 from '../sub_static/image1x/y3.png';
import * as y4 from '../sub_static/image1x/y4.png';
import * as y5 from '../sub_static/image1x/y5.png';
import * as y6 from '../sub_static/image1x/y6.png';

export class YeLvTiCanvas {

  // 画布宽高
  zoom = window.innerWidth / 1024;
  width = 1024 * this.zoom;
  height = 576 * this.zoom;

  // 上层canvas数组
  canvas: any = [];
  ctx: any = [];

  // 下层canvas数组
  canvasBottom: any = [];
  ctxBottom: any = [];

  // 图片数组
  imgList: any = [];

  // 当前和上一次的图片数据
  imgNext: any = [];
  imgCur: any = [];

  // 当前和上一次的图片路径
  containerImage: any = [];
  innerImage: any = [];
  scale: any = [];

  index: number;

  static preload() {
    const modelArray = [
      y0, y1, y2, y3, y4, y5, y6
    ];
    console.log(modelArray.length);
  }

  constructor() {
    this.init();
  }

  init() {
    if ((window.innerWidth / window.innerHeight) > (1024 / 576)) {
      this.zoom = window.innerWidth / 1024;
    } else {
      this.zoom = window.innerHeight / 576;
    }
    this.width = 1024 * this.zoom;
    this.height = 576 * this.zoom;

    this.initImgList();
    this.initCanvas();
  }

  // 初始化图片数组
  initImgList() {
    this.imgList[0] = {
      link: y0,
      imgW: 1024,
      imgH: 576,
      areaW: 160,
      areaH: 90,
      areaL: 432,
      areaT: 208,
    };

    this.imgList[1] = {
      link: y1,
      imgW: 1024,
      imgH: 576,
      areaW: 160,
      areaH: 90,
      areaL: 432,
      areaT: 208,
    };

    this.imgList[2] =  {
      link: y2,
      imgW: 1024,
      imgH: 576,
      areaW: 160,
      areaH: 90,
      areaL: 479,
      areaT: 198,
    };

    this.imgList[3] =  {
      link: y3,
      imgW: 1024,
      imgH: 576,
      areaW: 160,
      areaH: 90,
      areaL: 432,
      areaT: 241,
    };

    this.imgList[4] =  {
      link: y4,
      imgW: 1024,
      imgH: 576,
      areaW: 160,
      areaH: 90,
      areaL: 419,
      areaT: 246,
    };

    this.imgList[5] =  {
      link: y5,
      imgW: 1024,
      imgH: 576,
      areaW: 160,
      areaH: 90,
      areaL: 432,
      areaT: 208,
    };

    this.imgList[6] =  {
      link: y6,
      imgW: 1024,
      imgH: 576,
      areaW: 160,
      areaH: 90,
      areaL: 432,
      areaT: 208,
    };
  }

  // 初始化画布
  initCanvas() {
    // 上面的画布
    this.canvas[0] = document.getElementById('container6');
    this.ctx[0] = (this.canvas[0] as any).getContext('2d');

    this.canvas[1] = document.getElementById('container5');
    this.ctx[1] = (this.canvas[1] as any).getContext('2d');

    this.canvas[2] = document.getElementById('container4');
    this.ctx[2] = (this.canvas[2] as any).getContext('2d');

    this.canvas[3] = document.getElementById('container3');
    this.ctx[3] = (this.canvas[3] as any).getContext('2d');

    this.canvas[4] = document.getElementById('container2');
    this.ctx[4] = (this.canvas[4] as any).getContext('2d');

    this.canvas[5] = document.getElementById('container1');
    this.ctx[5] = (this.canvas[5] as any).getContext('2d');

    // 下面的画布
    this.canvasBottom[0] = document.getElementById('containerBottom6');
    this.ctxBottom[0] = (this.canvasBottom[0] as any).getContext('2d');

    this.canvasBottom[1] = document.getElementById('containerBottom5');
    this.ctxBottom[1] = (this.canvasBottom[1] as any).getContext('2d');

    this.canvasBottom[2] = document.getElementById('containerBottom4');
    this.ctxBottom[2] = (this.canvasBottom[2] as any).getContext('2d');

    this.canvasBottom[3] = document.getElementById('containerBottom3');
    this.ctxBottom[3] = (this.canvasBottom[3] as any).getContext('2d');

    this.canvasBottom[4] = document.getElementById('containerBottom2');
    this.ctxBottom[4] = (this.canvasBottom[4] as any).getContext('2d');

    this.canvasBottom[5] = document.getElementById('containerBottom1');
    this.ctxBottom[5] = (this.canvasBottom[5] as any).getContext('2d');


    for (let i = 0; i < 6; i++) {
      this.addCanvasDraw(6 - i, this.ctx[i]);
      this.imgNext[i] = this.imgList[6 - i];
      this.imgCur[i] = this.imgList[6 - i - 1];
      this.containerImage[i] = new Image();
      this.innerImage[i] = new Image();
      this.containerImage[i].src = this.imgList[6 - i].link as any;
      this.innerImage[i].src = this.imgList[6 - i - 1].link as any;

      this.scale[i] = this.imgList[6 - i].areaW / this.imgList[6 - i - 1].imgW;
    }

    this.index = 6;
  }

  // 添加初始场景图片
  addCanvasDraw(index: number, ctx: any) {
    const containerImage = new Image();
    const innerImage = new Image();
    containerImage.src = this.imgList[index].link as any;
    innerImage.src = this.imgList[index - 1].link as any;
    const imgNext = this.imgList[index];
    const imgCur = this.imgList[index - 1];
    const scale = this.imgList[index].areaW / this.imgList[index - 1].imgW;

    containerImage.onload = () => {
      this.draw(containerImage, imgNext, innerImage, imgCur, scale, ctx);
    };
  }

  // 滑条拖动调用的放大方法
  renderAnimation(radio: number, index: number) {
    // 绘制下面的小图片
    this.renderAnimationCtxBottom(radio, this.ctxBottom[6 - index], this.containerImage[6 - index],
      this.imgNext[6 - index], this.innerImage[6 - index], this.imgCur[6 - index]);

    // 绘制上面的大图片
    this.renderAnimationCtx(radio, this.ctx[6 - index], this.containerImage[6 - index],
      this.imgNext[6 - index], this.innerImage[6 - index], this.imgCur[6 - index]);

    this.index = index;
  }

  // 绘制放大的大图片 先清空之前的画布 再绘制
  renderAnimationCtx(radio: number, ctx: any, containerImage: any, imgNext: any, innerImage: any, imgCur: any) {
    // 改变画布透明度
    ctx.globalAlpha = 1 - radio / 3;

    // 清空画布
    ctx.clearRect(0, 0, this.canvas[0].width, this.canvas[0].height);
    ctx.beginPath();

    // 绘制图片
    this.draw(containerImage, imgNext, innerImage, imgCur, radio, ctx);

    // 刷新
    ctx.stroke();
    ctx.restore();
  }

  // 绘制放大的小图片 先清空之前的画布 再绘制
  renderAnimationCtxBottom(radio: number, ctxBottom: any, containerImage: any, imgNext: any, innerImage: any, imgCur: any) {
    // 清空画布
    ctxBottom.clearRect(0, 0, this.canvas[0].width, this.canvas[0].height);
    ctxBottom.beginPath();

    // 绘制图片
    this.drawBottom(containerImage, imgNext, innerImage, imgCur, radio, ctxBottom);

    // 改变画布透明度
    if (this.index === 3) {
      ctxBottom.globalAlpha = 1;
    } else {
      ctxBottom.globalAlpha = radio;
    }

    // ctxBottom.globalAlpha = radio;

    // 刷新
    ctxBottom.stroke();
    ctxBottom.restore();
  }

  // 放大上面的大图片
  draw(containerImage: any, imgNext: any, innerImage: any, imgCur: any, radio: any, ctx: any) {
    this.drawImgOversize(
      containerImage as any,
      imgNext.imgW,
      imgNext.imgH,
      imgNext.areaW,
      imgNext.areaH,
      imgNext.areaL,
      imgNext.areaT,
      radio,
      ctx
    );
  }

  // 放大上面的xi图片
  drawBottom(containerImage: any, imgNext: any, innerImage: any, imgCur: any, radio: any, ctxBottom: any) {
    this.drawImgMinisizeBottom(
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
      ctxBottom
    );
  }

  // 大图片放大方法
  /**
   * @param {string} i  大图片路径
   * @param {number} t  大图片的宽
   * @param {number} e  大图片的高
   * @param {number} a  大图片的画布的宽
   * @param {number} s  大图片的画布的高
   * @param {number} n  大图片的画布的x坐标
   * @param {number} g  大图片的画布的x坐标
   * @param {number} r  缩放系数
   * @param {number} ctx  画布的context
   */
  drawImgOversize(i: string, t: number, e: number, a: number, s: number, n: number, g: number, r: number, ctx: any) {
      ctx.drawImage(
        i,
        n - (a / r - a) * (n / (t - a)),
        g - (s / r - s) * (g / (e - s)),
        a / r,
        s / r,
        0,
        0,
        this.width,
        this.height,
      );
  }

  // 小图片放大方法
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
   * @param {number} ctxBottom  画布的context
   */
  drawImgMinisizeBottom(i: string, t: number, e: number, a: number, s: number, n: number, g: number, r: number,
                        m: number, h: number, ctxBottom: any) {
      ctxBottom.drawImage(
        i,
        0,
        0,
        t,
        e,
        ((n / h - n) * ((r * this.zoom) / (a - n)) * h * 750) / n / 0.732,
        ((g / h - g) * ((m * this.zoom) / (s - g)) * h * 1206) / g / 2.09,
        this.width * h,
        this.height * h,
      );
  }
}
