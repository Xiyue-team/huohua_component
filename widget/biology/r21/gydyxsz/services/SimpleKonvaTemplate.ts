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
    const scale = this.scaleValue.scale;
    this.stage = new Konva.Stage({
      container: this.domId,
      width: 1024 * scale,
      height: 576 * scale
    });
  }

  private initLayer(): void {
    this.staticLayer = new Layer();
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

  scale: number;

  constructor() {
    this.scale = (window.innerWidth / 1024);

    if ((window as any)['env'].browserInfo.isPc) {
      this.scale = (window.innerHeight / 576 ) - 0.2;
    } else if ((window as any)['env'].browserInfo.isElectron) {
      this.scale = (window.innerHeight / 576 ) - 0.3;
    } else {
      this.scale = (window.innerHeight / 576 ) - 0.1;
    }

  }


}
