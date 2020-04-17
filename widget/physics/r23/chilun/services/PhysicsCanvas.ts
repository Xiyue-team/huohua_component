import {fabric} from 'fabric';

import {IImageOptions} from 'fabric/fabric-impl';

import * as liantiao from '../sub_static/liantiao.png';
import * as liantiaoBg from '../sub_static/liantiaobg.png';
import * as bigClImg from '../sub_static/bigCl.png';
import * as smallClImg from '../sub_static/smallCl.png';
import * as singleBrightImg from '../sub_static/singleBrightChain.png';
import * as singleDarkImg from '../sub_static/singleDarkChain.png';
import { ImgConfig } from './ImgConfig';

export default class PhysicsCanvas {

    myCanvas: fabric.Canvas;
    topSwitch = 'off';
    bottomSwitch = 'off';
    topEArray: any[] = [];
    bottomEArray: any[] = [];
    even = 0;

    topLight: fabric.Image;
    bottomLight: fabric.Image;
    zoom = 1;

    darkChains: any = [];
    brightChains: any = [];
    wQDarkChains: any = [];
    wQBrightChains: any = [];
    config: any;

    width = window.innerWidth;
    height = window.innerHeight;
    scale = this.width / this.height < 16 / 9 ? this.height / 675 : this.width / 1200;

    constructor() {
        // const radito = window.innerWidth / window.innerHeight;
        // const uiRadito = 16 / 9;
        // let width;
        // let height;
        // if (radito > uiRadito) {
        //     height = window.innerHeight;
        //     width = 16 * height / 9;
        //     this.zoom = height / 675;
        // } else {
        //     width = window.innerWidth;
        //     height = 9 * width / 16;
        //     this.zoom = width / 1200;
        // }

      (document.getElementById('canvas') as any).width = this.width;
      (document.getElementById('canvas') as any).height = this.height;

        this.myCanvas = new fabric.Canvas('canvas');
        this.myCanvas.selection = false;
        //this.myCanvas.setBackgroundColor('rgba(255,255,255, 1)', () => {});

        this.config = new ImgConfig();

        this.initResource();
        this.initCanvasScale();
        console.log(this.myCanvas);
    }

    initCanvasScale() {
        this.zoom = this.zoom > 1 ? 1 : this.zoom;
        console.log('zoom', this.zoom);

        /*const p = new fabric.Point(1200 / 2 * this.zoom , 675 / 2 * this.zoom);
        console.log(p);
        this.myCanvas.zoomToPoint(p, this.zoom);*/
        this.myCanvas.setZoom(this.zoom);
    }

    async initResource() {
      const scale = this.width / this.height < 16 / 9 ? this.height / 675 : this.width / 1200;

        const config = {
            left: 90,
            top: 70,
            selectable: false
        } as fabric.IImageOptions;

        const config2 = {
            left: 10.4,
            top: 238,
            selectable: false
        } as fabric.IImageOptions;

          const config3 = {
            left: this.width * 0.525,
            top: this.height * 0.301,
            width: 554,
            height: 554,
            selectable: false,
            scaleX: 0.5 * scale,
            scaleY: 0.5 * scale
          } as fabric.IImageOptions;

          const config4 = {
            left: this.width * 0.231,
            top: this.height * 0.394,
            width: 296,
            height: 298,
            selectable: false,
            scaleX: 0.5 * scale,
            scaleY: 0.5 * scale
          } as fabric.IImageOptions;

        // const bg = await this.loadImage(liantiaoBg as any, config2);
        // this.myCanvas.add(bg);

        const bigClImage = await this.loadImage(bigClImg as any, config3);
        this.myCanvas.add(bigClImage);

        const smallClImage = await this.loadImage(smallClImg as any, config4);
        this.myCanvas.add(smallClImage);

        this.createSingleDarkChain();

        //加载单个链条
        // this.chains[0] = await this.loadImage(singleDarkImg as any, this.config.chain[1]);
        // this.chains[0].rotate(-9);
        // this.myCanvas.add(this.chains[0]);
        //
        // this.chains[1] = await this.loadImage(singleDarkImg as any, this.config.chain[3]);
        // this.chains[1].rotate(-9);
        // this.myCanvas.add(this.chains[1]);
        //
        // this.chains[2] = await this.loadImage(singleBrightImg as any, this.config.chain[0]);
        // this.chains[2].rotate(-9);
        // this.myCanvas.add(this.chains[2]);
        //
        // this.chains[3] = await this.loadImage(singleBrightImg as any, this.config.chain[2]);
        // this.chains[3].rotate(-9);
        // this.myCanvas.add(this.chains[3]);
        //
        // this.chains[4] = await this.loadImage(singleBrightImg as any, this.config.chain[4]);
        // this.chains[4].rotate(-9);
        // this.myCanvas.add(this.chains[4]);

        // const lianTiao = new LianTiao(config, this.myCanvas);
    }

    //创建单个暗色链条
    async createSingleDarkChain() {


        for (let i = 0; i < 8; i++) {

            const top = Math.tan(7.5 * Math.PI / 180) * ((this.width * 0.273 + 40 + this.width * 0.044 * i)
              - this.width * 0.2626) - this.height * 0.3323;

            this.darkChains[i] = await this.loadImage(singleDarkImg as any, {
              left: this.width * 0.273 + this.width * 0.044 * i + 40,
              top: -top + 50,
              width: 92,
              height: 38,
              selectable: false,
              scaleX: 0.5 * this.scale,
              scaleY: 0.5 * this.scale
            });
            this.darkChains[i].rotate(-9);
            this.myCanvas.add(this.darkChains[i]);
        }
        this.createWqDarkChain();
        this.createSingleBrightChain();
        this.createWqBrightChain();
    }

    //创建单个亮色链条
    async createSingleBrightChain() {

      for (let i = 0; i < 8; i++) {
        const top = Math.tan(7.5 * Math.PI / 180) * ((this.width * 0.273 + this.width * 0.044 * i)
          - this.width * 0.2626) - this.height * 0.3323;

        this.brightChains[i] = await this.loadImage(singleBrightImg as any, {
          left: this.width * 0.273 + this.width * 0.044 * i,
          top: -top + 50,
          width: 92,
          height: 38,
          selectable: false,
          scaleX: 0.5 * this.scale,
          scaleY: 0.5 * this.scale
        });
        this.brightChains[i].rotate(-9);
        this.myCanvas.add(this.brightChains[i]);
      }
    }

  //创建弯曲链条
  async createWqDarkChain() {
    for (let i = 0; i < 5; i++) {
      let angle = 0;
      // const a = this.width * 0.538 + this.width * 0.215 / 2;
      // const b = this.height * 0.323 - this.height * 0.382 / 2;
      // console.log('bbb:' + b);
      // const top = Math.sqrt(Math.pow(this.width * 0.215, 2) - Math.pow((this.width * 0.623 + this.width * 0.044 * i + 40 - a), 2)) + b;
      // console.log(top);

      angle = Math.PI / 9 * i;

      this.wQDarkChains[i] = await this.loadImage(singleDarkImg as any, {
        left: this.width * 0.622 + this.width * 0.044 * i + 40,
        top: this.height * 0.302 - 11 + this.height * 0.382 / 9 * i,
        width: 92,
        height: 38,
        selectable: false,
        scaleX: 0.5 * this.scale,
        scaleY: 0.5 * this.scale
      });
      // this.wQDarkChains[i].rotate(180 / 9);

      this.rotateObject(this.wQDarkChains[i], angle, this.wQDarkChains[i].width / 2, this.wQDarkChains[i].height / 2);
      this.myCanvas.add(this.wQDarkChains[i]);
    }
  }


    //创建弯曲链条
    async createWqBrightChain() {
      for (let i = 0; i < 5; i++) {
        this.wQBrightChains[i] = await this.loadImage(singleBrightImg as any, {
          left: this.width * 0.623 + this.width * 0.044 * i,
          top: this.height * 0.29,
          width: 92,
          height: 38,
          selectable: false,
          scaleX: 0.5 * this.scale,
          scaleY: 0.5 * this.scale
        });
        // this.myCanvas.add(this.wQBrightChains[i]);
      }
    }

    rotateObject(fabObj: any, angleRadian: any, pivotX: any, pivotY: any) {
      const ty = pivotY - fabObj.height / 2.0;
      const tx = pivotX - fabObj.width / 2.0;
      if (angleRadian >= Math.PI * 2) {
        angleRadian -= Math.PI * 2;
      }
      const angle2 = Math.atan2(ty, tx);
      const angle3 = (2 * angle2 + angleRadian - Math.PI) / 2.0;
      const pdist_sq = tx * tx + ty * ty;
      const disp = Math.sqrt(2 * pdist_sq * (1 - Math.cos(angleRadian)));
      fabObj.set({transformMatrix: [
          Math.cos(angleRadian),
          Math.sin(angleRadian),
          -Math.sin(angleRadian),
          Math.cos(angleRadian),
          disp * Math.cos(angle3),
          disp * Math.sin(angle3)
        ]});
    }



    loadImage(src: string, imageConfig: fabric.IImageOptions): Promise<fabric.Image> {
        return new Promise<fabric.Image>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const imgObj = new fabric.Image(img, imageConfig);
                resolve(imgObj);
            };
            img.src = src;
        });
    }

}


class LianTiao {

    fabImg: any;
    myCanvas: any;

    constructor(config: any, myCanvas: any) {
        this.myCanvas = myCanvas;
        this.initRes(config);

    }

    async  initRes(config: any) {
        this.fabImg = await this.loadImage(liantiao as any, config);
        this.myCanvas.add(this.fabImg);

        this.step(1);
    }

    loadImage(src: string, imageConfig: fabric.IImageOptions): Promise<fabric.Image> {
        return new Promise<fabric.Image>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const imgObj = new fabric.Image(img, imageConfig);
                resolve(imgObj);
            };
            img.src = src;
        });
    }

    step(num: any) {

        this.fabImg.rotate( -11);
        this.fabImg.animate('left', this.fabImg.left + 375, {
            duration: 2000,
            onChange: () => {

                    const top = 0.16 * this.fabImg.left - 316.8;
                    this.fabImg.set('top', 0 - top);
                    this.myCanvas.renderAll();

            },
            onComplete: () => {
                //animateBtn.disabled = false;
                //this.xtSprit.stop();
                let angle = 0;
                let timer: any;
                timer = setInterval(() => {
                    angle = angle + Math.PI / 60.0;
                    console.log(angle);
                    this.rotateObject( this.fabImg, angle, this.fabImg.width / 2, 143);
                    this.myCanvas.renderAll();
                    if (angle > 3.4) {
                        this.endAnimation();
                        clearInterval(timer);
                    }
                }, 30);

            }
        });

    }

    endAnimation() {
        this.fabImg.animate('left', this.fabImg.left - 400 , {
            duration: 2000,
            onChange: () => {
                const top = -0.168 * this.fabImg.left - 316.8;
                this.fabImg.set('top', 0 - top - 145);
                this.myCanvas.renderAll();

            },
            onComplete: () => {
            }
        });
    }


    rotateObject(fabObj: any, angleRadian: any, pivotX: any, pivotY: any) {
       const ty = pivotY - fabObj.height / 2.0;
        const tx = pivotX - fabObj.width / 2.0;
        if (angleRadian >= Math.PI * 2) {
            angleRadian -= Math.PI * 2;
        }
        const angle2 = Math.atan2(ty, tx);
        const angle3 = (2 * angle2 + angleRadian - Math.PI) / 2.0;
        const pdist_sq = tx * tx + ty * ty;
        const disp = Math.sqrt(2 * pdist_sq * (1 - Math.cos(angleRadian)));
        fabObj.set({transformMatrix: [
                Math.cos(angleRadian),
                Math.sin(angleRadian),
                -Math.sin(angleRadian),
                Math.cos(angleRadian),
                disp * Math.cos(angle3),
                disp * Math.sin(angle3)
            ]});
    }


}
