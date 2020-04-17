/**
 *konva模板类 为地理公开课热力环流原理
 *@since 2.0
 *@author zhiguo
 *@Date 2018/6/7 9:47
 */
import {default as Konva, ImageConfig, Layer, Stage} from 'konva';



export class SimpleKonvaTemplate {

  //动画层
  animationLayer: Layer;
  //静态层
  staticLayer: Layer;
  // 图片放大层
  scaleImageLayer: Layer;

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
      height: window.innerHeight,
    });
  }

  private initLayer(): void {
    this.staticLayer = new Layer({name: 'staticLayer'});
    this.animationLayer = new Layer({name: 'animationLayer'});
    this.scaleImageLayer = new Layer({name: 'scaleImageLayer'});
    this.stage.add(this.staticLayer, this.animationLayer, this.scaleImageLayer);
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

  scale: number;

  constructor() {
    this.scale = (window.innerWidth / 1200);

    if (window.innerWidth / window.innerHeight > 1200 / 675) {
      this.scale = (window.innerWidth / 1200);
    } else {
      this.scale = (window.innerHeight / 675);
    }
  }

}
