import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as Konva from 'konva';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';

export class LightCanvas extends SimpleKonvaTemplate {

    //控制鼠标是否按下或是否触摸
    private control = false;
    lastPointX: number;
    lastPointY: number;
    currentPointX: number;
    currentPointY: number;
    layer: Konva.Layer;
    n1 = 1;
    n2 = 1.33;
    centerRotationPoint = {
        x: 0,
        y: 0,
    };

    //旋转到的最终角度
    public theta = 45 / 180 * Math.PI;

    public lightImage = document.getElementsByClassName('lightRotate')[0] as any;
    public lineImage = document.getElementById('lineImg');

    public arc: Konva.Arc;
    public arc2: Konva.Arc;

    constructor() {
        super('kCanvas');
        this.initImage();
        this.createDashLine();
    }


    async initImage() {
        const rect = new Konva.Rect({
          x: 0,
          y: 0,
          width: window.innerWidth / 2 + 100,
          height: window.innerHeight / 2 + 100,
        });

        this.staticLayer.add(rect);
        this.stage.add(this.staticLayer);
        this.dragImg();
    }

    //画虚线
    createDashLine() {
        const dashLine = new Konva.Line({
            points: [window.innerWidth / 2, 0, window.innerWidth / 2, 100, window.innerWidth / 2, 200, window.innerWidth / 2, 300,
              window.innerWidth / 2, 400, window.innerWidth / 2, 500, window.innerWidth / 2, 600, window.innerWidth / 2, 700,
              window.innerWidth / 2, 800, window.innerWidth / 2, 900, window.innerWidth / 2, 1000, window.innerWidth / 2, 1100,
              window.innerWidth / 2, 1200],
            stroke: '#AAC7D9',
            strokeWidth: 1,
            lineJoin: 'round',
            dash: [15, 8],
        });
        this.staticLayer.add(dashLine);
        this.staticLayer.draw();
    }

     getNumber(n1: number, n2: number) {

          this.n1 = n1;
          this.n2 = n2;
          this.changeDegree();

       if (this.theta / Math.PI * 180 <= 0) {

         this.theta = 0;
         this.lightImage.style.transform = 'rotate(' + this.theta / Math.PI * 180 + 'deg)';

         if (this.n1 === this.n2) {
           this.integrateCode();
         }
       }

     }

    //拖拽图片旋转
    dragImg() {
        //拖拽事件
        this.staticLayer.on('mousedown touchstart', () => {
            this.lastPointX = this.getMousePos().x;
            this.lastPointY = this.getMousePos().y;
            this.control = true;
        });

        this.staticLayer.on('mouseup touchend', () => {
            this.control = false;
        });

        this.staticLayer.on('mouseleave', () => {
            this.control = false;
        });

        let angle;
        this.staticLayer.on('mousemove touchmove', () => {

            this.currentPointX = this.getMousePos().x;
            this.currentPointY = this.getMousePos().y;

            this.centerRotationPoint.x = this.getRotationPoint().x;
            this.centerRotationPoint.y = this.getRotationPoint().y;

            const isClock = ThreeUtil.isClockwise(this.centerRotationPoint, this.lastPointX,
              this.lastPointY, this.currentPointX, this.currentPointY);

            angle = ThreeUtil.getAngle(this.centerRotationPoint, this.lastPointX,
              this.lastPointY, this.currentPointX, this.currentPointY);

            if (!this.control) {
                return;
            } else {
                if (isClock) {
                  this.theta += angle;

                  if (this.theta / Math.PI * 180 >= 90) {

                      this.theta = Math.PI / 2;
                      this.lightImage.style.transform = 'rotate(' + this.theta / Math.PI * 180 + 'deg)';
                      this.lineImage.style.transform = 'rotate(' + this.theta / Math.PI * 180 + 'deg)';
                      return;

                  } else {

                    this.lightImage.style.transform = 'rotate(' + this.theta / Math.PI * 180 + 'deg)';
                  }

                } else {

                  this.theta -= angle;

                  //当上层介质的折射率>=下层介质的折射率时，入射角度为90度时，折射光线消失(旋转光线时)
                  if (this.theta / Math.PI * 180 <= 0) {

                      this.theta = 0;
                      this.lightImage.style.transform = 'rotate(' + this.theta / Math.PI * 180 + 'deg)';

                      if (this.n1 > this.n2) {

                        this.lineImage.style.opacity = '0';

                      } else if (this.n1 === this.n2) {

                        this.integrateCode();

                      }
                      return;
                  } else {

                    this.lightImage.style.transform = 'rotate(' + this.theta / Math.PI * 180 + 'deg)';

                  }
                }
              this.changeDegree();
            }

            this.lastPointX = this.currentPointX;
            this.lastPointY = this.currentPointY;
        });
    }

    //切换折射光线角度
    changeDegree() {

      if (Math.asin((Math.sin(Math.PI / 2 - this.theta) * this.n1 / this.n2)) / Math.PI * 180 < 90) {

        this.integrateCode();

      } else {

        this.lineImage.style.opacity = '0';

      }
    }

    integrateCode() {
        this.lineImage.style.opacity = '1';
        this.lineImage.style.transform =
          'rotate(' + (90 - Math.asin((Math.sin(Math.PI / 2 - this.theta) * this.n1 / this.n2)) / Math.PI * 180) + 'deg)';
      }


    //获取旋转中心点坐标
    getRotationPoint() {
        return {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        };
    }

    //获取鼠标当前坐标
    getMousePos() {
        const mousePos = this.stage.getPointerPosition();
        return {
            x: mousePos.x,
            y: mousePos.y
        };
    }
}
