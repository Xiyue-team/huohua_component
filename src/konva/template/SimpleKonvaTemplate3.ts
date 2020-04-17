/**
 *konva模板类 和1的区别在 添加了场景stage放大倍数, 为公开课 植物呼吸作用的探究 做适配
 *@since 2.0
 *@author zhiguo
 *@Date 2018/6/7 9:47
 */
import {default as Konva, ImageConfig, Layer, Stage} from 'konva';

export class SimpleKonvaTemplate3 {

  //动画层
  animationLayer: Layer;
  //静态层
  staticLayer: Layer;

  stage: Stage;

  domId: string;

  scaleValue = new ScaleValue();

  constructor(domId: string) {
    this.domId = domId;

    this.initStage();
    this.initLayer();
  }

  private initStage(): void {
      Konva.pixelRatio = window.devicePixelRatio;
      this.stage = new Konva.Stage({
      container: this.domId,
      width: window.innerWidth,
      height: window.innerHeight * 1.001,
    });
  }

  private initLayer(): void {
    this.staticLayer = new Layer();
    //this.staticLayer.transformsEnabled( 'none') ;

    this.animationLayer = new Layer();
    this.stage.add(this.staticLayer, this.animationLayer);

  }

  /**
   * 封装加载konva图片
   * @param {string} src
   * @param {Konva.ImageConfig} imageConfig
   * @returns {Promise<Konva.Image>}
   */
  loadImage(src: string, imageConfig: ImageConfig): Promise<Konva.Image> {
    return new Promise<Konva.Image>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const imgObj = new Konva.Image(Object.assign({image: img}, imageConfig));
        resolve(imgObj);
      };
      img.src = src;
    });
  }


}

export class ScaleValue {
  scale = window.innerWidth / 1024;
  moveToTop = 538 * this.scale - window.innerHeight + 38;
  constructor() {
    if ((window as any)['env'].browserInfo.isSmallDevice) {
      this.moveToTop = 538 * this.scale - window.innerHeight + 14 * this.scale;
    }
  }
}


