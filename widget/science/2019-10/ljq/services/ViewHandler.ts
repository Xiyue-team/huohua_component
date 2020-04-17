import Hilo from 'hilojs';
import { Util } from './Util';

import { Vue } from 'vue/types/vue';
import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { Detector } from '../../../../../src/util/Detector';
import { ViewController } from '../../../../../src/core/ViewController';

import * as rulerImgPath from '../sub_static/ruler.png';
import * as pointImgPath from '../sub_static/point.png';


export class ViewHandler extends CommonViewHandler implements ViewHandler {

  gameWidth = 1200;
  gameHeight = 675;
  stageScaleX: number;
  stageScaleY: number;
  stage: Hilo.Stage;

  POINTER_END = (Hilo.event as Hilo.EventType).POINTER_END;
  POINTER_START = (Hilo.event as Hilo.EventType).POINTER_START;
  POINTER_MOVE = (Hilo.event as Hilo.EventType).POINTER_MOVE;

  constructor(vm: Vue) {
    super(vm);

    if (navigator.maxTouchPoints > 0) {
      this.POINTER_START = 'touchstart';
      this.POINTER_END = 'touchend';
      this.POINTER_MOVE = 'touchmove';
    } else if (this.POINTER_START === 'touchstart') {
      this.POINTER_START = 'mousedown';
      this.POINTER_END = 'mouseup';
      this.POINTER_MOVE = 'mousemove';
    }
  }

  domReady(): void {
    super.domReady();
    this.init();
    ViewController.getInstance().hideLoading();
  }




  /**
   * 响应界面大小变化
   */
  resize(): void {
    Detector.forceMobildLandscape();

    const widthToHeight = this.gameWidth / this.gameHeight;

    let newWidth = window.innerWidth,
      newHeight = window.innerHeight;

    const newWidthToHeight = newWidth / newHeight;
    // scale the canvas
    if (newWidthToHeight > widthToHeight) {
      newWidth = newHeight * widthToHeight;
    } else {
      newHeight = newWidth / widthToHeight;
    }

    this.stage.scaleX = newWidth / this.gameWidth;
    this.stage.scaleY = newHeight / this.gameHeight;
  }



  init() {
    this.stageScaleX = document.getElementById('2dContainer').clientWidth / this.gameWidth;
    this.stageScaleY = document.getElementById('2dContainer').clientHeight / this.gameHeight;


    this.stage = new Hilo.Stage({
      renderType: 'canvas',
      container: document.getElementById('2dContainer'),
      width: this.gameWidth,
      height: this.gameHeight
    });
    this.resize();

    const ticker = new Hilo.Ticker(60);
    ticker.addTick(this.stage);
    ticker.start();


    //尺子
    const ruler = new Hilo.Bitmap({
      image: rulerImgPath
    }).addTo(this.stage);
    ruler.scaleX = 0.5;
    ruler.scaleY = 0.5;
    ruler.x = 197;
    ruler.y = 114;


    // 文字
    const tipText = new Hilo.Text({
      id: 'score',
      color: '#FFFFFF',
      text: '0°',
      x: 122,
      y: 504,
      font: '18px arial'
    }).addTo(this.stage);

    // 点
    const point = new Hilo.Bitmap({
      image: pointImgPath
    }).addTo(this.stage);
    point.x = 147;
    point.y = 494;

    let status = false;


    const center = {
      X: 597,
      Y: 514
    };
    const endP = {
      X: 197,
      Y: 514
    };

    /*绑定鼠标拖拽事件*/
    point.on(this.POINTER_START, () => {
      status = true;
    });
    const line = new Hilo.Graphics({ width: 120, height: 150, x: 0, y: 0, lineCap: 'round' });
    let svgPath = `M165 514 L596.9 512`;
    line.lineStyle(2, '#FFD621').drawSVGPath(svgPath).closePath().endFill().addTo(this.stage);

    this.stage.on(this.POINTER_MOVE, (e: any) => {
      if (e.eventTarget.id === 'Bitmap3') {
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'default';
      }
      if (status === true) {

        const insertPoints = Util.getInsertPointBetweenCircleAndLine(e.stageX, e.stageY, 597, 514, 597, 514, 435);
        point.x = insertPoints[0].x - 20;
        point.y = insertPoints[0].y - 20;

        line.clear();
        svgPath = `M${insertPoints[0].x} ${insertPoints[0].y} L596.9 512`;
        line.lineStyle(2, '#FFD621').drawSVGPath(svgPath).closePath().endFill().addTo(this.stage);


        const begin = {
          X: insertPoints[0].x,
          Y: insertPoints[0].y
        };

        const angle = Util.getAngle(center, begin, endP);
        if (angle.toFixed(1) === '0.1') {
          (tipText as Hilo.Text).text = '0°';
        } else if (angle.toFixed(1) === '179.9') {
          (tipText as Hilo.Text).text = '180°';
        } else {
          (tipText as Hilo.Text).text = angle.toFixed(1) + '°';
        }

        if ( angle > 160 ) {
          tipText.x = point.x - (40 + (160 - angle) * 2);
        } else {
          tipText.x = point.x - 40;
        }



        tipText.y = point.y - 40;
      }
      e.preventDefault();
      e.stopPropagation();
    });

    this.stage.on(this.POINTER_END, () => {
      status = false;

    });


    this.stage.enableDOMEvent(this.POINTER_START, true);
    this.stage.enableDOMEvent(this.POINTER_MOVE, true);
    this.stage.enableDOMEvent(this.POINTER_END, true);


    window.addEventListener('resize', () => {
      this.resize();
    });

  }
}
