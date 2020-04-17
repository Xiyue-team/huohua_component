/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 18-10-20 上午10:05
 */
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';

import magneticBg from '../sub_static/circle.png';
import electronImg from '../sub_static/electron.png';
import grayArrowImg from '../sub_static/grayArrow.png';
import playButtonImg from '../sub_static/playButton.png';
import blueArrowImg from '../sub_static/blueArrow.png';
import redArrowImg from '../sub_static/redArrow.png';
import greenArrowImg from '../sub_static/greenArrow.png';
import O1Img from '../sub_static/O1.png';
import O2Img from '../sub_static/O2.png';
import O3Img from '../sub_static/O3.png';
import vImg from '../sub_static/V.png';
import { DrawArcHelper } from './DrawArcHelper';
import { ImageUtil } from '../../../../../src/util/ImageUtil';

const createjs = require('createjs-npm');
const preloadjs = require('preload-js');

const Stage = createjs.Stage;
const Shape = createjs.Shape;

export class ElectronViewHandler extends CommonViewHandler implements ViewHandler {

    //加载队列
    imageMap: any;
    //舞台
    stage: any;
    //容器
    container: any;
    magnetic: any;
    //磁场
    magneticBmp: any;
    //电子
    electronBmp: any;
    //灰色箭头
    grayArrowBmp: any;
    //播放按钮
    playButtonBmp: any;
    O1Bmp: any;
    O2Bmp: any;
    O3Bmp: any;
    vBmp: any;
    electron: any;
    blueArrow: any;
    redArrow: any;
    greenArrow: any;
    //蓝色箭头
    blueArrowBmp: any;
    //红色箭头
    redArrowBmp: any;
    //绿色箭头
    greenArrowBmp: any;
    electronContainer = new createjs.Container();
    blueArrowContainer = new createjs.Container();
    //蓝色弧
    blueArcArray: any = [];
    //红色弧
    redArcArray: any = [];
    //绿色弧
    greenArcArray: any = [];
    //虚线
    dashLine: any = [];
    devicePixelRatio = 2;
    w: any;
    h: any;
    ctrl = false;

    constructor(vm: Vue) {
        super(vm);
    }

    domReady() {
        const resources = [magneticBg, electronImg, grayArrowImg, playButtonImg,
          redArrowImg, greenArrowImg, O1Img, O2Img, vImg, blueArrowImg, O3Img];
        console.log(resources.length);
        this.initResources();
    }

    async initResources()  {
        this.initContainer();
        const manifest = [
            {src: magneticBg, id: 'magnetic'},
            {src: electronImg, id: 'electron'},
            {src: grayArrowImg, id: 'grayArrow'},
            {src: playButtonImg, id: 'playButton'},
            {src: blueArrowImg, id: 'blueArrow'},
            {src: redArrowImg, id: 'redArrow'},
            {src: greenArrowImg, id: 'greenArrow'},
            {src: O1Img, id: 'O1'},
            {src: O2Img, id: 'O2'},
            {src: O3Img, id: 'O3'},
            {src: vImg, id: 'v'},
        ];
        this.imageMap = await ImageUtil.loadImages(manifest);
        this.handleComplete();
    }

    private handleComplete(): void {
      this.loadMagneticBg();
      this.electron    = this.imageMap['electron'];
      const grayArrow   = this.imageMap['grayArrow'];
      const playButton   = this.imageMap['playButton'];
      this.blueArrow   = this.imageMap['blueArrow'];
      this.redArrow   = this.imageMap['redArrow'];
      this.greenArrow   = this.imageMap['greenArrow'];

      this.electronBmp = new createjs.Bitmap(this.electron);
      this.grayArrowBmp = new createjs.Bitmap(grayArrow);
      this.playButtonBmp = new createjs.Bitmap(playButton);
      this.blueArrowBmp = new createjs.Bitmap(this.blueArrow);
      this.redArrowBmp = new createjs.Bitmap(this.redArrow);
      this.greenArrowBmp = new createjs.Bitmap(this.greenArrow);

      this.grayArrowBmp.x = (this.w - this.magnetic.width) / 2;
      this.grayArrowBmp.y = (this.h - this.electron.height) / 2 - 20;

      this.playButtonBmp.x = (this.w - playButton.width) / 2;
      this.playButtonBmp.y = (this.h - playButton.height) / 2 - 20;

      //蓝色弧线
      this.blueArrowContainer.x = this.magneticBmp.x + 30;
      this.blueArrowContainer.y = this.magneticBmp.y + this.magnetic.height + 110;

      this.blueArrowContainer.addChild(this.greenArrowBmp);
      this.blueArrowContainer.addChild(this.redArrowBmp);
      this.blueArrowContainer.addChild(this.blueArrowBmp);
      this.blueArrowContainer.addChild(this.electronBmp);

      //设置电子的旋转中心点
      this.electronBmp.regX = this.electron.width / 2;
      this.electronBmp.regY = this.electron.height / 2;

      //蓝色弧线
      this.electronBmp.rotation = 4;
      this.electronBmp.x = 36 - this.electron.width / 2;
      this.electronBmp.y = 6 - 180 * this.devicePixelRatio - 10;

      //蓝色箭头
      this.blueArrowBmp.rotation = 90;
      this.blueArrowBmp.x = 30 + this.blueArrow.height;
      this.blueArrowBmp.y = 0 - this.blueArrow.width / 2 - 180 * this.devicePixelRatio;
      this.blueArrowContainer.rotation = -4;

      this.blueArrowBmp.visible = false;
      this.redArrowBmp.visible = false;
      this.greenArrowBmp.visible = false;

      this.electronContainer.addChild(this.grayArrowBmp);
      this.electronContainer.addChild(this.playButtonBmp);
      this.stage.addChild(this.electronContainer);
      this.stage.addChild(this.blueArrowContainer);

      this.bindEvent();
    }

    //改变箭头位置
    private changeBArrowLoc(x: number, y: number) {
        this.blueArrowContainer.x = x;
        this.blueArrowContainer.y = y;
    }

    private initContainer(): void {
        const height = document.getElementById('magneticContainer').clientHeight;
        const width  = document.getElementById('magneticContainer').clientWidth;
        const magneticCanvasDom = document.getElementById('magneticCanvas') as HTMLCanvasElement;

        magneticCanvasDom.width = width * this.devicePixelRatio;
        magneticCanvasDom.height = height * this.devicePixelRatio;

        magneticCanvasDom.style.width = width + 'px'  ;
        magneticCanvasDom.style.height = height + 'px'   ;

        this.stage = new Stage('magneticCanvas');
        this.w = this.stage.canvas.width;
        this.h = this.stage.canvas.height;

        this.container = new createjs.Container();
        this.stage.addChild(this.container);

        this.initTick();
    }

    private loadMagneticBg(): void {
        //创建磁场背景
        this.magnetic    = this.imageMap['magnetic'];
        this.magneticBmp = new createjs.Bitmap(this.magnetic);
        this.magneticBmp.x = (this.w - this.magnetic.width) / 2;
        this.magneticBmp.y = (this.h - this.magnetic.height) / 2 - 20;

        const O1   = this.imageMap['O1'];
        const O2   = this.imageMap['O2'];
        const O3   = this.imageMap['O3'];
        const v   = this.imageMap['v'];

        this.O1Bmp = new createjs.Bitmap(O1);
        this.O2Bmp = new createjs.Bitmap(O2);
        this.O3Bmp = new createjs.Bitmap(O3);
        this.vBmp = new createjs.Bitmap(v);

        this.O1Bmp.x = this.magneticBmp.x - O1.width;
        this.O1Bmp.y = this.magneticBmp.y + 560;

        this.O2Bmp.x = this.magneticBmp.x - O2.width;
        this.O2Bmp.y = this.magneticBmp.y + 450;

        this.O3Bmp.x = this.magneticBmp.x - O3.width;
        this.O3Bmp.y = this.magneticBmp.y + 370;

        //蓝色运动轨迹
        this.blueArcPath();

        //红色运动轨迹
        this.redArcPath();

        //绿色运动轨迹
        this.greenArcPath();

        //虚线
        this.createDashLine();

        this.container.addChild(this.O1Bmp);
        this.container.addChild(this.O2Bmp);
        this.container.addChild(this.O3Bmp);

        this.O1Bmp.visible = false;
        this.O2Bmp.visible = false;
        this.O3Bmp.visible = false;
        this.container.addChild(this.magneticBmp);
        //设置容器(或容器中的子节点)的层级
        this.container.setChildIndex(this.magneticBmp, 1);
        this.stage.update();
    }

    //点击播放按钮
    bindEvent() {
       this.playButtonBmp.addEventListener('click', () => {
          this.viewModel.$data.sliderOption.disabled = true;
          this.blueArrowBmp.visible = true;
          this.playButtonBmp.visible = false;
          this.grayArrowBmp.visible = false;
          this.initAnimation1(this.blueArcArray[0].graphics.command, 1000);
       });
    }

    //蓝色弧线运动轨迹
    private blueArcPath(): void {

        this.blueArcArray[0] = DrawArcHelper.drawArcMethod('#00AAFF', this.magneticBmp.x + 30,
          this.magneticBmp.y + this.magnetic.height + 110, -Math.PI / 18 * 9.4, -Math.PI / 18 * 9.4);

        this.blueArcArray[1] = DrawArcHelper.drawArcMethod('#00AAFF', this.magneticBmp.x + this.magnetic.width + 180,
          this.magneticBmp.y + this.magnetic.height / 2, -Math.PI / 18 * 21.4, -Math.PI / 18 * 21.4);

        this.blueArcArray[2] = DrawArcHelper.drawArcMethod('#00AAFF', this.magneticBmp.x + 40,
          this.magneticBmp.y - 135, Math.PI / 18 * 2.85, Math.PI / 18 * 2.85);

        this.container.addChild(this.blueArcArray[0]);
        this.container.addChild(this.blueArcArray[1]);
        this.container.addChild(this.blueArcArray[2]);
    }

    //红色弧线运动轨迹
    private redArcPath(): void {
       this.redArcArray[0] = DrawArcHelper.drawArcMethod('#FF4747', this.magneticBmp.x - 100,
         this.magneticBmp.y + this.magnetic.height + 95, -Math.PI / 18 * 7.3, -Math.PI / 18 * 7.3);

      this.redArcArray[1] = DrawArcHelper.drawArcMethod('#FF4747', this.magneticBmp.x + this.magnetic.width + 110,
        this.magneticBmp.y + this.magnetic.height + 95, -Math.PI / 18 * 16.4, -Math.PI / 18 * 16.4);

      this.redArcArray[2] = DrawArcHelper.drawArcMethod('#FF4747', this.magneticBmp.x + this.magnetic.width + 110,
        this.magneticBmp.y - 110, Math.PI / 18 * 10.9, Math.PI / 18 * 10.9);

      this.redArcArray[3] = DrawArcHelper.drawArcMethod('#FF4747', this.magneticBmp.x - 90,
        this.magneticBmp.y - 120, Math.PI / 18 * 2, Math.PI / 18 * 2);

       this.container.addChild(this.redArcArray[0]);
       this.container.addChild(this.redArcArray[1]);
       this.container.addChild(this.redArcArray[2]);
       this.container.addChild(this.redArcArray[3]);
    }

    //绿色弧线运动轨迹
    private greenArcPath(): void {

      this.greenArcArray[0] = DrawArcHelper.drawArcMethod('#6CCF00', this.magneticBmp.x - 220,
        this.magneticBmp.y + this.magnetic.height + 35, -Math.PI / 18 * 5.1, -Math.PI / 18 * 5.1);

      this.greenArcArray[1] = DrawArcHelper.drawArcMethod('#6CCF00', this.magneticBmp.x + this.magnetic.width / 2 + 20,
        this.magneticBmp.y + this.magnetic.height + 305, -Math.PI / 18 * 11, -Math.PI / 18 * 11);

      this.greenArcArray[2] = DrawArcHelper.drawArcMethod('#6CCF00', this.magneticBmp.x + this.magnetic.width + 230,
        this.magneticBmp.y + this.magnetic.height + 30, -Math.PI / 18 * 16.9, -Math.PI / 18 * 16.9);

      this.greenArcArray[3] = DrawArcHelper.drawArcMethod('#6CCF00', this.magneticBmp.x + this.magnetic.width + 230,
        this.magneticBmp.y - 40, Math.PI / 18 * 13, Math.PI / 18 * 13);

      this.greenArcArray[4] = DrawArcHelper.drawArcMethod('#6CCF00', this.magneticBmp.x + this.magnetic.width / 2,
        this.magneticBmp.y - 300, Math.PI / 18 * 7, Math.PI / 18 * 7);

      this.greenArcArray[5] = DrawArcHelper.drawArcMethod('#6CCF00', this.magneticBmp.x - 230,
        this.magneticBmp.y - 40, Math.PI / 18 * 1.2, Math.PI / 18 * 1.2);

      this.container.addChild(this.greenArcArray[0]);
      this.container.addChild(this.greenArcArray[1]);
      this.container.addChild(this.greenArcArray[2]);
      this.container.addChild(this.greenArcArray[3]);
      this.container.addChild(this.greenArcArray[4]);
      this.container.addChild(this.greenArcArray[5]);
    }

    //画虚线
    private createDashLine(): void {

      this.dashLine[0] = DrawArcHelper.drawDashLine(this.magneticBmp.x,
        this.magneticBmp.y + 220, this.magneticBmp.x, this.magneticBmp.y + 605);

      this.dashLine[1] = DrawArcHelper.drawDashLine(this.magneticBmp.x + 330,
        this.magneticBmp.y + 460, this.magneticBmp.x, this.magneticBmp.y + 600);

      this.dashLine[2] = DrawArcHelper.drawDashLine(this.magneticBmp.x + this.magnetic.width / 2,
        this.magneticBmp.y + this.magnetic.height, this.magneticBmp.x, this.magneticBmp.y + this.magnetic.height);

      this.dashLine[3] = DrawArcHelper.drawDashLine(this.magneticBmp.x + 145,
        this.magneticBmp.y + 455, this.magneticBmp.x, this.magneticBmp.y + 400);

      this.container.addChild(this.dashLine[0]);
      this.container.addChild(this.dashLine[1]);
      this.container.addChild(this.dashLine[2]);
      this.container.addChild(this.dashLine[3]);

      this.dashLine[0].visible = false;
      this.dashLine[1].visible = false;
      this.dashLine[2].visible = false;
      this.dashLine[3].visible = false;
    }

    //动画过程中箭头和电子旋转
    electronAndArrowRot(event: any): void {
        const angle = event.currentTarget.target.endAngle * 180 / Math.PI;
        this.blueArrowContainer.rotation = angle + 90;
        this.electronBmp.rotation = -angle;
    }

    //蓝色弧动画
    private initAnimation1(target: any, duration: number): void {
       createjs.Tween.get(target)
        .wait(100)
        .to({endAngle: -Math.PI / 18 * 2.4}, duration)
        .call(() => {
          this.changeBArrowLoc(this.magneticBmp.x + this.magnetic.width + 180, this.magneticBmp.y + this.magnetic.height / 2);
          this.blueArrowBmp.visible = false;
          this.electronBmp.visible = false;
          this.initAnimation2(this.blueArcArray[1].graphics.command, 1000);
        })
        .addEventListener('change', (event: any) => {
          this.electronAndArrowRot(event);
        });
    }

    private initAnimation2(target: any, duration: number): void {
      setTimeout(() => {
        this.blueArrowBmp.visible = true;
        this.electronBmp.visible = true;
        this.electronBmp.y = 0 - 180 * this.devicePixelRatio - 3;
      }, 100);
      createjs.Tween.get(target)
        .wait(100)
        .to({endAngle: -Math.PI / 18 * 14.6}, duration)
        .call(() => {
          this.changeBArrowLoc(this.magneticBmp.x + 40, this.magneticBmp.y - 135);
          this.blueArrowBmp.visible = false;
          this.electronBmp.visible = false;
          this.initAnimation3(this.blueArcArray[2].graphics.command, 1000);
        })
        .addEventListener('change', (event: any) => {
            this.electronAndArrowRot(event);
        });
      }

    private initAnimation3(target: any, duration: number): void {
      setTimeout(() => {
        this.blueArrowBmp.visible = true;
        this.electronBmp.visible = true;
      }, 100);
      createjs.Tween.get(target)
        .wait(100)
        .to({endAngle: Math.PI / 18 * 9.55}, duration)
        .call(() => {
          this.O1Bmp.visible = true;
          this.dashLine[0].visible = true;
          this.dashLine[1].visible = true;
          this.blueArrowBmp.visible = false;
          this.redArrowBmp.visible = false;
          this.viewModel.$data.sliderOption.disabled = false;
         })
        .addEventListener('change', (event: any) => {
            this.electronAndArrowRot(event);
        });
    }

    //红色弧动画
    private initAnimation4(target: any, duration: number): void {
      setTimeout(() => {
        this.redArrowBmp.visible = true;
        this.electronBmp.visible = true;
      }, 100);
      createjs.Tween.get(target)
        .wait(100)
        .to({endAngle: -Math.PI / 18 * 1.6}, duration)
        .call(() => {
          this.changeBArrowLoc(this.magneticBmp.x + this.magnetic.width + 110, this.magneticBmp.y + this.magnetic.height + 95);
          this.redArrowBmp.visible = false;
          this.electronBmp.visible = false;
          this.initAnimation5(this.redArcArray[1].graphics.command, 1500);
        })
        .addEventListener('change', (event: any) => {
            this.electronAndArrowRot(event);
        });
    }

    private initAnimation5(target: any, duration: number): void {
      setTimeout(() => {
        this.redArrowBmp.visible = true;
        this.electronBmp.visible = true;
      }, 100);
      createjs.Tween.get(target)
        .wait(100)
        .to({endAngle: -Math.PI / 18 * 10.9}, duration)
        .call(() => {
            this.changeBArrowLoc(this.magneticBmp.x + this.magnetic.width + 110, this.magneticBmp.y - 110);
            this.redArrowBmp.visible = false;
            this.electronBmp.visible = false;
            this.initAnimation6(this.redArcArray[2].graphics.command, 1500);
        })
        .addEventListener('change', (event: any) => {
            this.electronAndArrowRot(event);
        });
    }

    private initAnimation6(target: any, duration: number): void {
      setTimeout(() => {
        this.redArrowBmp.visible = true;
        this.electronBmp.visible = true;
      }, 100);
      createjs.Tween.get(target)
        .wait(100)
        .to({endAngle: Math.PI / 18 * 16.1}, duration)
        .call(() => {
            this.changeBArrowLoc(this.magneticBmp.x - 90, this.magneticBmp.y - 120);
            this.redArrowBmp.visible = false;
            this.electronBmp.visible = false;
            this.initAnimation7(this.redArcArray[3].graphics.command, 1500);
        })
        .addEventListener('change', (event: any) => {
            this.electronAndArrowRot(event);
        });
    }

    private initAnimation7(target: any, duration: number): void {
      setTimeout(() => {
        this.redArrowBmp.visible = true;
        this.electronBmp.visible = true;
      }, 100);
      createjs.Tween.get(target)
        .wait(100)
        .to({endAngle: Math.PI / 18 * 7.5}, duration)
        .call(() => {
            this.O2Bmp.visible = true;
            this.dashLine[2].visible = true;
            this.redArrowBmp.visible = false;
            this.greenArrowBmp.visible = false;
            this.viewModel.$data.sliderOption.disabled = false;
        })
        .addEventListener('change', (event: any) => {
            this.electronAndArrowRot(event);
        });
    }

    //绿色弧动画
    private initAnimation8(target: any, duration: number): void {
      setTimeout(() => {
        this.greenArrowBmp.visible = true;
        this.electronBmp.visible = true;
      }, 100);
      createjs.Tween.get(target)
        .wait(100)
        .to({endAngle: -Math.PI / 18 * 1.05}, duration)
        .call(() => {
          this.changeBArrowLoc(this.magneticBmp.x + this.magnetic.width / 2 + 20, this.magneticBmp.y + this.magnetic.height + 305);
          this.electronBmp.visible = false;
          this.greenArrowBmp.visible = false;
          this.initAnimation9(this.greenArcArray[1].graphics.command, 2000);
        })
        .addEventListener('change', (event: any) => {
            this.electronAndArrowRot(event);
        });
    }

    private initAnimation9(target: any, duration: number): void {
        setTimeout(() => {
          this.greenArrowBmp.visible = true;
          this.electronBmp.visible = true;
        }, 100);
        createjs.Tween.get(target)
          .wait(100)
          .to({endAngle: -Math.PI / 18 * 7.5}, duration)
          .call(() => {
            this.changeBArrowLoc(this.magneticBmp.x + this.magnetic.width + 230, this.magneticBmp.y + this.magnetic.height + 30);
            this.electronBmp.visible = false;
            this.greenArrowBmp.visible = false;
            this.initAnimation10(this.greenArcArray[2].graphics.command, 2000);
          })
          .addEventListener('change', (event: any) => {
              this.electronAndArrowRot(event);
          });
      }

    private initAnimation10(target: any, duration: number): void {
      setTimeout(() => {
        this.greenArrowBmp.visible = true;
        this.electronBmp.visible = true;
      }, 100);
      createjs.Tween.get(target)
        .wait(100)
        .to({endAngle: -Math.PI / 18 * 13}, duration)
        .call(() => {
          this.changeBArrowLoc(this.magneticBmp.x + this.magnetic.width + 230, this.magneticBmp.y - 40);
          this.electronBmp.visible = false;
          this.greenArrowBmp.visible = false;
          this.initAnimation11(this.greenArcArray[3].graphics.command, 2000);
        })
        .addEventListener('change', (event: any) => {
            this.electronAndArrowRot(event);
        });
    }

    private initAnimation11(target: any, duration: number): void {
      setTimeout(() => {
        this.greenArrowBmp.visible = true;
        this.electronBmp.visible = true;
      }, 100);
      createjs.Tween.get(target)
        .wait(100)
        .to({endAngle: Math.PI / 18 * 16.8}, duration)
        .call(() => {
          this.changeBArrowLoc(this.magneticBmp.x + this.magnetic.width / 2, this.magneticBmp.y - 300);
          this.electronBmp.visible = false;
          this.greenArrowBmp.visible = false;
          this.initAnimation12(this.greenArcArray[4].graphics.command, 2000);
        })
        .addEventListener('change', (event: any) => {
            this.electronAndArrowRot(event);
        });
    }

    private initAnimation12(target: any, duration: number): void {
      setTimeout(() => {
        this.greenArrowBmp.visible = true;
        this.electronBmp.visible = true;
      }, 100);
      createjs.Tween.get(target)
        .wait(100)
        .to({endAngle: Math.PI / 18 * 11}, duration)
        .call(() => {
          this.changeBArrowLoc(this.magneticBmp.x - 230, this.magneticBmp.y - 40);
          this.electronBmp.visible = false;
          this.greenArrowBmp.visible = false;
          this.initAnimation13(this.greenArcArray[5].graphics.command, 2000);
        })
        .addEventListener('change', (event: any) => {
            this.electronAndArrowRot(event);
        });
    }

    private initAnimation13(target: any, duration: number): void {
    setTimeout(() => {
      this.greenArrowBmp.visible = true;
      this.electronBmp.visible = true;
    }, 100);
    createjs.Tween.get(target)
      .wait(100)
      .to({endAngle: Math.PI / 18 * 5}, duration)
      .call(() => {
        this.O3Bmp.visible = true;
        this.dashLine[3].visible = true;
        this.greenArrowBmp.visible = false;
        this.viewModel.$data.sliderOption.disabled = false;
      })
      .addEventListener('change', (event: any) => {
          this.electronAndArrowRot(event);
      });
  }

    //设定蓝色箭头位置
    changeBlueArcPos(): void {
      //蓝色弧线
      this.blueArrowContainer.x = this.magneticBmp.x + 30;
      this.blueArrowContainer.y = this.magneticBmp.y + this.magnetic.height + 110;

      //蓝色弧线
      this.electronBmp.rotation = 4;
      this.electronBmp.x = 36 - this.electron.width / 2;
      this.electronBmp.y = 6 - 180 * this.devicePixelRatio;

      //蓝色箭头
      this.blueArrowBmp.rotation = 90;
      this.blueArrowBmp.x = 30 + this.blueArrow.height;
      this.blueArrowBmp.y = 0 - this.blueArrow.width / 2 - 180 * this.devicePixelRatio;
      this.blueArrowContainer.rotation = -4;
    }

    //设定红色箭头位置
    changeRedArcPos(): void {
      this.blueArrowContainer.x = this.magneticBmp.x - 100;
      this.blueArrowContainer.y = this.magneticBmp.y + this.magnetic.height + 95;
      this.blueArrowContainer.rotation = 17;
      //红色弧线的动画
      this.electronBmp.rotation = -17;
      this.electronBmp.x = 40 - this.electron.width / 2;
      this.electronBmp.y = 0 - 180 * this.devicePixelRatio;
      // //红色箭头
      this.redArrowBmp.rotation = 90;
      this.redArrowBmp.x = this.redArrow.height;
      this.redArrowBmp.y = 25 - this.redArrow.width - 180 * this.devicePixelRatio;
    }

    //设定绿色箭头位置
    changeGreenArcPos(): void {
      //绿色弧线
      this.blueArrowContainer.x = this.magneticBmp.x - 220;
      this.blueArrowContainer.y = this.magneticBmp.y + this.magnetic.height + 35;
      this.blueArrowContainer.rotation = 39;

      //绿色弧线
      this.electronBmp.rotation = -39;
      this.electronBmp.x = this.electron.width / 2 - 40;
      this.electronBmp.y = 0 - 180 * this.devicePixelRatio;

      //绿色箭头
      this.greenArrowBmp.rotation = 90;
      this.greenArrowBmp.x = this.greenArrow.height + 20;
      this.greenArrowBmp.y = -this.greenArrow.width / 2 - 180 * this.devicePixelRatio;
    }

    //改变蓝色弧的透明度
    changeBlueArcAlpha(alpha: number): void {
        this.blueArcArray[0].alpha = alpha;
        this.blueArcArray[1].alpha = alpha;
        this.blueArcArray[2].alpha = alpha;
    }

    //改变蓝色弧的结束角度
    changeBlueArcEndAngle(): void {
      this.blueArcArray[0].graphics.command.endAngle = -Math.PI / 18 * 9.4;
      this.blueArcArray[1].graphics.command.endAngle = -Math.PI / 18 * 21.4;
      this.blueArcArray[2].graphics.command.endAngle = Math.PI / 18 * 2.85;
    }

    //改变红色弧的透明度
    changeRedArcAlpha(alpha: number): void {
      this.redArcArray[0].alpha = alpha;
      this.redArcArray[1].alpha = alpha;
      this.redArcArray[2].alpha = alpha;
      this.redArcArray[3].alpha = alpha;
    }

    //改变红色弧的结束角度
    changeRedArcEndAngle(): void {
      this.redArcArray[0].graphics.command.endAngle = -Math.PI / 18 * 7.3;
      this.redArcArray[1].graphics.command.endAngle = -Math.PI / 18 * 16.4;
      this.redArcArray[2].graphics.command.endAngle = Math.PI / 18 * 10.9;
      this.redArcArray[3].graphics.command.endAngle = Math.PI / 18 * 2;
    }

    //改变绿色弧的透明度
    changeGreenArcAlpha(alpha: number): void {
      this.greenArcArray[0].alpha = alpha;
      this.greenArcArray[1].alpha = alpha;
      this.greenArcArray[2].alpha = alpha;
      this.greenArcArray[3].alpha = alpha;
      this.greenArcArray[4].alpha = alpha;
      this.greenArcArray[5].alpha = alpha;
    }

    //改变绿色弧的结束角度
    changeGreenArcEndAngle(): void {
      this.greenArcArray[0].graphics.command.endAngle = -Math.PI / 18 * 5.1;
      this.greenArcArray[1].graphics.command.endAngle = -Math.PI / 18 * 11;
      this.greenArcArray[2].graphics.command.endAngle = -Math.PI / 18 * 16.9;
      this.greenArcArray[3].graphics.command.endAngle = Math.PI / 18 * 13;
      this.greenArcArray[4].graphics.command.endAngle = Math.PI / 18 * 7;
      this.greenArcArray[5].graphics.command.endAngle = Math.PI / 18 * 1.2;
    }

    //根据滑条改变动画速度
    changeAnimation(value: number) {
    switch (value) {
      case 0:
        this.viewModel.$data.sliderOption.disabled = true;
        this.blueArrowBmp.visible = true;
        this.changeBlueArcAlpha(1);
        this.changeRedArcAlpha(0.3);
        this.changeGreenArcAlpha(0.6);
        this.changeBlueArcEndAngle();
        this.changeBlueArcPos();
        if (this.ctrl === true) {
          this.initAnimation1(this.blueArcArray[0].graphics.command, 1000);
        }
        break;

      case 4:
        this.ctrl = true;
        this.changeBlueArcAlpha(0.3);
        this.changeRedArcAlpha(1);
        this.changeGreenArcAlpha(0.6);
        this.changeRedArcEndAngle();
        this.viewModel.$data.sliderOption.disabled = true;
        this.grayArrowBmp.visible = false;

        this.changeRedArcPos();
        this.initAnimation4(this.redArcArray[0].graphics.command, 1500);
        break;

      case 8:
        this.ctrl = true;
        this.changeBlueArcAlpha(0.3);
        this.changeRedArcAlpha(0.6);
        this.changeGreenArcAlpha(1);
        this.changeGreenArcEndAngle();
        this.viewModel.$data.sliderOption.disabled = true;

        this.changeGreenArcPos();
        this.initAnimation8(this.greenArcArray[0].graphics.command, 2000);
        break;
    }
  }

    private initTick(): void {
        createjs.Ticker.addEventListener('tick', (e: any) => {
            this.tick(e);
        });
    }

    private tick(e: any): void {
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        if (e.paused !== 1) {
            this.stage.update();  //刷新舞台
        } else {

        }
    }

    reset() {
        createjs.Tween.removeAllTweens();
        this.ctrl = false;
        this.viewModel.$data.sliderNum = 0;
        this.playButtonBmp.visible = true;
        this.viewModel.$data.sliderOption.disabled = true;
        this.grayArrowBmp.visible = true;
        this.grayArrowBmp.y = (this.h - this.electron.height) / 2 - 10;
        this.O1Bmp.visible = false;
        this.O2Bmp.visible = false;
        this.O3Bmp.visible = false;
        this.dashLine[0].visible = false;
        this.dashLine[1].visible = false;
        this.dashLine[2].visible = false;
        this.dashLine[3].visible = false;
        this.changeGreenArcPos();
        this.changeRedArcPos();
        this.changeBlueArcPos();
        this.changeBlueArcAlpha(1);
        this.changeBlueArcEndAngle();
        this.changeRedArcEndAngle();
        this.changeGreenArcEndAngle();
        setTimeout(() => {
          this.blueArrowBmp.visible = false;
          this.redArrowBmp.visible = false;
          this.greenArrowBmp.visible = false;
        }, 20);
    }

}
