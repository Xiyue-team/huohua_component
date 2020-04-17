import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as Konva from 'konva';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';

export class MagneticCanvas extends SimpleKonvaTemplate {

    //控制鼠标是否按下或是否触摸
    private control = false;

    //当前角度
    private cureentTheta = 0;

    //旋转的角度差
    private diffAngle: number;

    //旋转到的最终角度
    public theta = 0;

    public arrowImage = document.getElementById('arrowImg');

    constructor() {
        super('kCanvas');
        this.initImage();
    }


    async initImage() {

        const rect = new Konva.Rect({
            x: 0,
            y: 0,
            width: 160,
            height: 160,
        });

        this.staticLayer.add(rect);
        this.stage.add(this.staticLayer);

        this.dragImg();
    }


    //拖拽指针图片旋转
    dragImg() {
        let angle = 0;

        //拖拽事件
        this.staticLayer.on('mousedown touchstart', () => {
            this.control = true;
        });

        this.staticLayer.on('mousemove touchmove', () => {
            if (!this.control) {
                return;
            }

            //两次旋转的角度差(用于模型旋转)
            this.diffAngle = this.theta - this.cureentTheta;

            //前一次旋转角度
            this.cureentTheta = this.theta;

            //判断顺时针/逆时针旋转
            angle = ThreeUtil.getAngle({x: 80, y: 80}, 80, 26, this.getMousePos().x, this.getMousePos().y);
            if (this.getMousePos().x < 80) {
              this.theta = 360 - angle * 180 / Math.PI;
            } else {
                this.theta = angle * 180 / Math.PI;
            }
            this.arrowImage.style.transform = 'rotate(' + (this.theta + (-90)) + 'deg)';

            //旋转左侧B箭头
           (window as any).viewHandler.apllfx.rotatebArrowByNedle(this.diffAngle);

           //改变箭头F长度及位置
           (window as any).viewHandler.apllfx.changeFArrowLength(this.theta);
        });

          this.staticLayer.on('mouseup touchend', () => {
            this.control = false;
          });

          this.staticLayer.on('mouseleave', () => {
            this.control = false;
          });
    }

      //获取鼠标当前坐标
      getMousePos() {
          const mousePos = this.stage.getPointerPosition();
          return {
              x: mousePos.x,
              y: mousePos.y
          };
      }

      reset () {
         this.theta = 0;
         this.cureentTheta = 0;
         this.arrowImage.style.transform = 'rotate(' + (-90) + 'deg)';
      }

}
