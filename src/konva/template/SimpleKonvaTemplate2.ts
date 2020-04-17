/**
 *konva模板类 和1的区别在 添加了场景stage放大倍数
 *@since 2.0
 *@author zhiguo
 *@Date 2018/6/7 9:47
 */
import {ImageConfig, Layer, Stage} from 'konva';
import { ScaleValue } from './ScaleValue';
import * as Konva from 'konva';


export class SimpleKonvaTemplate2 {

  //动画层
  animationLayer: Layer;
  //静态层
  staticLayer: Layer;

  stage: Stage;

  domId: string;

  scaleValue: ScaleValue;

  defaultWidth: number;
  defaultHeight: number;

  constructor(domId: string, defaultWidth: number = 1024, defaultHeight: number = 576) {
    this.domId = domId;
    this.defaultWidth = defaultWidth;
    this.defaultHeight = defaultHeight;

    this.scaleValue = new ScaleValue();
    this.initStage();
    this.initLayer();
  }

  private initStage(): void {
    const scale = this.scaleValue.scale;

    Konva.pixelRatio = window.devicePixelRatio;
    this.stage = new Konva.Stage({
      container: this.domId,
      width: this.defaultWidth * scale,
      height: this.defaultHeight * scale
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
