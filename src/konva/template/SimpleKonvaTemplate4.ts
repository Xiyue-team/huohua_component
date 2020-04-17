/**
 *konva模板类 为地理公开课热力环流原理
 *@since 2.0
 *@author zhiguo
 *@Date 2018/6/7 9:47
 */
import {default as Konva, ImageConfig, Layer, Stage} from 'konva';



export class SimpleKonvaTemplate4 {

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
    const scale = this.scaleValue.scale;
    // const scale = 1.25;

    Konva.pixelRatio = window.devicePixelRatio;
    this.stage = new Konva.Stage({
      container: this.domId,
      width: window.innerWidth,
      height: window.innerHeight
    });
    //
    // this.stage.scale({x: scale, y: scale});
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

  scale: number;

  x = 0;
  x2 = 0;

  constructor() {

    // if ((window as any)['env'].browserInfo.isPc) {
    //   this.scale = (window.innerHeight / 576 );
    // } else if ((window as any)['env'].browserInfo.isElectron) {
    //   this.scale = (window.innerHeight / 576 ) - 0.3;
    // } else {
    //   this.scale = (window.innerHeight / 576 ) - 0.1;
    // }

    if ((window as any)['env'].browserInfo.os === 'Windows') {
      this.scale = 1.875;
      this.x = 20;
      this.x2 = 30;
    } else {
      // this.scale = 1.26;
      this.scale = (window.innerHeight / 576 ) - 0.1;
      this.x = 20;
      this.x2 = 30;
    }
  }
}
