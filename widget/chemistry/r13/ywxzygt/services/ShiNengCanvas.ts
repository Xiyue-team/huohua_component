import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as Konva from 'konva';

export class ShiNengCanvas extends SimpleKonvaTemplate {

    //控制鼠标是否按下或是否触摸
    private control = false;

    //当前角度
    private cureentTheta = 0;

    //旋转的角度差
    private diffAngle: number;

    //旋转到的最终角度
    public theta = 0;

    //实时显示图片宽度
    public waveImg = document.getElementById('waveImg');

    public arrowImage = document.getElementById('arrowImg');

    public gXiang = document.getElementById('gXiang');

    public gXText = document.getElementById('text');

    public orgColor = '#FF7746';
    public skyBlueColor = '#29CDDB';
    public blueColor = '#4E8AFA';

    public text1 = '重叠型构象';
    public text2 = '交叉型构象';
    public text3 = '扭曲型构象';

    constructor() {
        super('kCanvas');
        this.initImage();
    }


    async initImage() {

        const rect = new Konva.Rect({
            x: 30,
            y: 0,
            width: 180,
            height: 180,
        });

        this.staticLayer.add(rect);
        this.stage.add(this.staticLayer);

        this.dragImg();
    }


    //拖拽指针图片旋转
    dragImg() {

        //拖拽事件
        this.staticLayer.on('mousedown touchstart', () => {

            this.control = true;
        });

        this.staticLayer.on('mouseup touchend', () => {
            this.control = false;
        });

        this.staticLayer.on('mouseleave', () => {
            this.control = false;
        });

        let angle = null;
        let disPlayWidth = null;

        this.staticLayer.on('mousemove touchmove', () => {
            if (!this.control) {
                return;
            }
            //当前旋转角度
            angle = this.getAngle();

            //两次旋转的角度差(用于模型旋转)
            this.diffAngle = this.theta - this.cureentTheta;

            //前一次旋转角度
            this.cureentTheta = this.theta;

            if (this.getMousePos().x - 120 < 0) {

                this.theta = 360 - (angle / Math.PI * 180);

            } else {

                this.theta = angle / Math.PI * 180;

            }
            this.arrowImage.style.transform = 'rotate(' + this.theta + 'deg)';

            //根据转动角度显示图片宽度
            disPlayWidth = (this.theta / 360) * 157;

            //实时改变图片宽度
            this.waveImg.style.width = disPlayWidth + 'px';

            // 转到一定角度，产生吸附效果
            if ((window as any)['env'].browserInfo.os === 'Mac OS X') {
                this.setAdorsptionForIOS(this.theta);
            } else {
                this.setAdorsption(this.theta);
            }

            //根据指针旋转角度旋转模型
            (window as any).viewHandler.model.setModelRotation(-this.diffAngle);
        });
    }

    //获取旋转到的角度
    getAngle(): number {
        const eP = {
            x: this.getMousePos().x,
            y: this.getMousePos().y
        };
        const a = Math.sqrt(Math.pow(((120 - 120) - (eP.x - 120)), 2) + Math.pow(((90 - 90) - (eP.y - 90)), 2));
        const b = Math.sqrt(Math.pow(((120 - 120) - (eP.x - 120)), 2) + Math.pow(((10 - 90) - (eP.y - 90)), 2));
        const c = 80;
        return  Math.acos((a * a + c * c - b * b) / (2 * a * c));
    }

    //获取鼠标当前坐标
    getMousePos() {
        const mousePos = this.stage.getPointerPosition();
        return {
            x: mousePos.x,
            y: mousePos.y
        };
    }

    //根据模型旋转角度旋转指针
    rotNedle(theat: number) {

        this.diffAngle = theat - this.cureentTheta;
        this.cureentTheta = theat;
        this.arrowImage.style.transform = 'rotate(' + theat + 'deg)';

        //转到一定角度，产生吸附效果
      if ((window as any)['env'].browserInfo.os === 'Mac OS X') {
        this.setAdorsptionForIOS(theat);
      } else {
        this.setAdorsption(theat);
      }

        //根据转动角度显示图片宽度
        const disPlayWidth = (theat / 360) * 157;

        //实时改变图片宽度
        this.waveImg.style.width = disPlayWidth + 'px';
    }

    //特定角度产生吸附
    setAdorsption(angle: number) {
          if (angle >= 357 || angle <= 3) {

            this.changeStyle(1, this.orgColor, this.text1);

          } else if (angle >= 117 && angle <= 123) {

            this.changeStyle(121, this.orgColor, this.text1);

          } else if (angle >= 237 && angle <= 243) {

            this.changeStyle(239, this.orgColor, this.text1);

          } else if (angle >= 57 && angle <= 63) {

            this.changeStyle(61, this.skyBlueColor, this.text2);

          } else if (angle >= 177 && angle <= 183) {

            this.changeStyle(180, this.skyBlueColor, this.text2);

          } else if (angle >= 297 && angle <= 303) {

            this.changeStyle(299, this.skyBlueColor, this.text2);

          } else {

            this.gXiang.style.backgroundColor = this.blueColor;
            this.gXText.innerText = this.text3;
          }
    }

  //为safari做适配
      setAdorsptionForIOS(angle: number): void {
              if (angle >= 357 || angle <= 3) {

                this.changeStyle(0, this.orgColor, this.text1);

              } else if (angle >= 117 && angle <= 124) {

                this.changeStyle(123, this.orgColor, this.text1);

              } else if (angle >= 236 && angle <= 243) {

                this.changeStyle(237, this.orgColor, this.text1);

              } else if (angle >= 57 && angle <= 64) {

                this.changeStyle(63, this.skyBlueColor, this.text2);

              } else if (angle >= 177 && angle <= 183) {

                this.changeStyle(180, this.skyBlueColor, this.text2);

              } else if (angle >= 296 && angle <= 303) {

                this.changeStyle(297, this.skyBlueColor, this.text2);

              } else {

                this.gXiang.style.backgroundColor = this.blueColor;
                this.gXText.innerText = this.text3;
              }
      }


    changeStyle(angle: number, color: string, text: string) {

        this.arrowImage.style.transform = 'rotate(' + angle + 'deg)';
        this.waveImg.style.width = angle / 360 * 157 + 'px';
        this.gXiang.style.backgroundColor = color;
        this.gXText.innerText = text;

    }


}
