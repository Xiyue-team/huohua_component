import { fabric } from 'fabric';
import { AxisSceneConfig1 } from './AxisSceneConfig1';
import AxisScene1 from './AxisScene1';
import CircleScene2 from './CircleScene2';

export default class ShareElement {
  config: AxisSceneConfig1;
  axisScene1: AxisScene1;
  circleScene2: CircleScene2;

  myCanvas: any = [];

  constructor() {
    this.config = new AxisSceneConfig1();
    this.axisScene1 = new AxisScene1();
    this.circleScene2 = new CircleScene2();
    this.init();
  }

  async init() {
    await this.initStaticElement();
    await this.initCoverWhiteBackground();

  }


  initStaticElement() {
    const rect = new fabric.Rect(this.config.rect);
    this.myCanvas.push(rect);

    const whiteBackground = new fabric.Rect(this.config.whiteBackground as any);
    this.myCanvas.push(whiteBackground);
  }

  initCoverWhiteBackground() {
    const coverWhiteBackground = new fabric.Rect(this.config.coverWhiteBackground as any);
    this.myCanvas.push(coverWhiteBackground);
  }

}

