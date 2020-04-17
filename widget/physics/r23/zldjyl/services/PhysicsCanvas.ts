import {fabric} from 'fabric';

import {IImageOptions} from 'fabric/fabric-impl';

import * as switchOnImg from '../sub_static/switchOn.png';
import * as switchImg from '../sub_static/switchOff.png';
import * as batteryImg from '../sub_static/battery.png';
import * as arrowImg from '../sub_static/arrow.png';

import * as resistanceBlue from '../sub_static/resistanceBlue.png';
import * as resistanceRed from '../sub_static/resistanceRed.png';
import * as rotaion from '../sub_static/rotaion.png';
import * as slider from '../sub_static/slider.png';
import * as spriteRoation from '../sub_static/longRotaion.png';
import * as tipImg from '../sub_static/tip.png';

import * as force_one from '../sub_static/force_one.svg';
import * as force_two from '../sub_static/force_two.svg';
import * as force_three from '../sub_static/force_three.svg';
import * as force_four from '../sub_static/force_four.svg';
import * as force_five from '../sub_static/force_five.svg';
import * as force_six from '../sub_static/force_six.svg';
import * as force_seven from '../sub_static/force_seven.svg';
import * as force_eight from '../sub_static/force_eight.svg';

import {svgStr} from './SvgConfig';
import { ViewController } from "../../../../../src/core/ViewController";


export default class PhysicsCanvas {

    myCanvas: fabric.Canvas;
    topSwitch = 'off';
    bottomSwitch = 'off';
    topEArray: any[] = [];
    bottomEArray: any[] = [];
    even = 0;

    zoom = 1;

    resistanceBlue: fabric.Rect;
    resistanceRed: fabric.Rect;
    rotaion: fabric.Image;
    slider: fabric.Image;

    tipArrowfabImg: fabric.Image;
    topTipText: any;
    topTipfabImg: fabric.Image;

    flag: boolean;
    prevPosition: any;

    repeatPatternImage: fabric.Pattern;

    rotaionSprite: any;

    forceSprite_one: any;
    forceSprite_two: any;
    forceSprite_three: any;
    forceSprite_four: any;
    forceSprite_five: any;
    forceSprite_six: any;
    forceSprite_seven: any;
    forceSprite_eight: any;


    forceIntensity: number;

    electronInstensity: number;

    isElectorn: boolean;

    isPlayElectron = true;

    forceIntval: number;

    constructor() {
        this.forceIntensity = 20;
        this.electronInstensity = 2;
        this.isElectorn = false;
        this.forceIntval = 5;
        const radito = window.innerWidth / window.innerHeight;
        const uiRadito = 16 / 9;
        let width;
        let height;
        if (radito > uiRadito) {
            height = window.innerHeight;
            width = 16 * height / 9;
            this.zoom = height / 675;
        } else {
            width = window.innerWidth;
            height = 9 * width / 16;
            this.zoom = width / 1200;
        }

        document.getElementById('canvas').width = width;
        document.getElementById('canvas').height = height;

        this.myCanvas = new fabric.Canvas('canvas');
        this.myCanvas.selection = false;
        //this.myCanvas.setBackgroundColor('rgba(255,255,255, 1)', () => {});

        this.createSpriteClass();
        this.initResource();
        this.initCanvasScale();

    }

    initCanvasScale() {


        //this.zoom = this.zoom > 1 ? 1 : this.zoom;
        console.log('zoom', this.zoom);

        /*const p = new fabric.Point(1200 / 2 * this.zoom , 675 / 2 * this.zoom);
        console.log(p);
        this.myCanvas.zoomToPoint(p, this.zoom);*/
        this.myCanvas.setZoom(this.zoom);

    }

    async initResource() {
        const config = {
            left: 767,
            top: 456,
            selectable: false
        } as fabric.IImageOptions;

        const switchFabImage = await this.loadImage(switchImg as any, config);
        switchFabImage.name = 'switch';
        switchFabImage.set('custom' as any, 'topSwitch');
        switchFabImage.set('status' as any, 'off');

        const config2 = {
            left: 176,
            top: 539,
            selectable: false
        } as fabric.IImageOptions;

        const batteryFabImg = await this.loadImage(batteryImg as any, config2);

        const config3 = {
            left: 756,
            top: 219,
            selectable: false
        };

        const BlueImgae = await this.loadImage(resistanceBlue as any, config3);

        this.repeatPatternImage = new fabric.Pattern({
            source: BlueImgae.getElement(),
            repeat: 'no-repeat'
        });

        this.resistanceBlue = new fabric.Rect({
          left: 756,
          top: 219,
          fill: this.repeatPatternImage,
          width: 135,
          height: 136,
          name: 'stage2',
          selectable: false
        });

        const config4 = {
            left: 756,
            top: 219,
            selectable: false
        };

        this.resistanceRed = await this.loadImage(resistanceRed as any, config4);

        const config5 = {
            left: 191,
            top: 103,
            selectable: false
        };

        this.rotaion = await this.loadImage(rotaion as any, config5);

        //最远959 初始872 最远785
        const config6 = {
            left: 872,
            top: 227,
            selectable: true,
            hasControls: false,
            hasBorders: false,
            lockMovementY: true
        };

        this.slider = await this.loadImage(slider as any, config6);
        this.slider.name = 'slider';

        const config7 = {
          left: 191,
          top: 103,
          selectable: false
        };

        const spriteRoationImg = await this.loadImage(spriteRoation as any, config7);

        this.rotaionSprite = new fabric.Sprite(spriteRoationImg.getElement(), {
            left: 191,
            top: 103,
            selectable: false
        });

      const config8 = {
        left: 191,
        top: 103,
        selectable: false
      };
        const spriteForceImg_one    = await this.loadImage(force_one as any, config8);
        const spriteForceImg_two    = await this.loadImage(force_two as any, config8);
        const spriteForceImg_three  = await this.loadImage(force_three as any, config8);
        const spriteForceImg_four   = await this.loadImage(force_four as any, config8);
        const spriteForceImg_five    = await this.loadImage(force_six as any, config8);
        const spriteForceImg_six  = await this.loadImage(force_seven as any, config8);
        const spriteForceImg_seven  = await this.loadImage(force_eight as any, config8);
        const spriteForceImg_eight   = await this.loadImage(force_five as any, config8); // 原始图最长

        this.forceSprite_one = new fabric.Sprite(spriteForceImg_one.getElement(), {
          left: 191,
          top: 103,
          opacity: 0,
          selectable: false
        });
        this.forceSprite_two = new fabric.Sprite(spriteForceImg_two.getElement(), {
        left: 191,
        top: 103,
        opacity: 0,
        selectable: false
      });
      this.forceSprite_three = new fabric.Sprite(spriteForceImg_three.getElement(), {
        left: 191,
        top: 103,
        opacity: 0,
        selectable: false
      });
      this.forceSprite_four = new fabric.Sprite(spriteForceImg_four.getElement(), {
        left: 191,
        top: 103,
        opacity: 0,
        selectable: false
      });
      this.forceSprite_five = new fabric.Sprite(spriteForceImg_five.getElement(), {
        left: 191,
        top: 103,
        opacity: 0,
        selectable: false
      });
      this.forceSprite_six = new fabric.Sprite(spriteForceImg_six.getElement(), {
        left: 191,
        top: 103,
        opacity: 0,
        selectable: false
      });
      this.forceSprite_seven = new fabric.Sprite(spriteForceImg_seven.getElement(), {
        left: 191,
        top: 103,
        opacity: 0,
        selectable: false
      });
      this.forceSprite_eight = new fabric.Sprite(spriteForceImg_eight.getElement(), {
        left: 191,
        top: 103,
        opacity: 0,
        selectable: false
      });

        this.myCanvas.add(batteryFabImg);
        this.myCanvas.add(switchFabImage);
        this.myCanvas.add(this.resistanceRed);
        this.myCanvas.add(this.resistanceBlue);

        this.myCanvas.add(this.rotaion);
        this.myCanvas.add(this.slider);
        this.myCanvas.add(this.rotaionSprite);
        this.myCanvas.add(this.forceSprite_one);
        this.myCanvas.add(this.forceSprite_two);
        this.myCanvas.add(this.forceSprite_three);
        this.myCanvas.add(this.forceSprite_four);
        this.myCanvas.add(this.forceSprite_five);
        this.myCanvas.add(this.forceSprite_six);
        this.myCanvas.add(this.forceSprite_seven);
        this.myCanvas.add(this.forceSprite_eight);

        const text4 = new fabric.Text('N', { left: 215, top: 225, fontSize: 24, fill: 'white', selectable: false});
        this.myCanvas.add(text4);

        const text5 = new fabric.Text('S', { left: 515, top: 225, fontSize: 24, fill: 'white', selectable: false});
        this.myCanvas.add(text5);

        this.topTipText = new fabric.Text('左右滑动试试', { left: 830, top: 145, fontSize: 24, fill: 'white', selectable: false});
        this.myCanvas.add(this.topTipText);

        const text1 = new fabric.Text('E₁', { left: 350, top: 620, fontSize: 20, fill: 'white' , selectable: false});
        this.myCanvas.add(text1);

        const text2 = new fabric.Text('S₁', { left: 880, top: 620, fontSize: 20, fill: 'white', selectable: false});
        this.myCanvas.add(text2);

        const text3 = new fabric.Text('R₁', { left: 880, top: 350, fontSize: 20, fill: 'white', selectable: false});
        this.myCanvas.add(text3);

        const tipArrowConfig = {
          left: 870,
          top: 450,
          selectable: false
        } as fabric.IImageOptions;
        this.tipArrowfabImg = await  this.loadImage(tipImg as any, tipArrowConfig);
        this.tipArrowfabImg.scale(0.6);
        this.myCanvas.add(this.tipArrowfabImg);

        this.topTipfabImg = fabric.util.object.clone(this.tipArrowfabImg);
        this.topTipfabImg.set('left', 870);
        this.topTipfabImg.set('top', 180);
        this.myCanvas.add(this.topTipfabImg);

          this.myCanvas.on('mouse:down', (options: any) => {

            if (options.target && options.target.hasOwnProperty('name') && options.target.name === 'slider') {
                this.topTipfabImg.opacity = 0;
                this.topTipText.opacity = 0;
                this.flag = true;
                this.prevPosition = this.slider.left;
            } else {
                this.flag = false;
            }

            if (options.target && options.target.hasOwnProperty('name') && options.target.name === 'switch') {
                 console.log('click switch image ', options.target);
                 if ( options.target.get('custom') === 'topSwitch') {
                     this.tipArrowfabImg.opacity = 0;
                 }

                if (options.target.status === 'off') {
                    options.target.setSrc(switchOnImg);
                    options.target.set('status', 'on');
                    (this as any)[options.target.custom as any] = 'on';
                    this.rotaionSprite.play();
                    this.forcePlay();
                    this.isPlayElectron = true;
                    //this.initElectronAnimation();
                    this.setforceopacity();

                    if ((window as any).viewHandler.viewModel.switchOn) {
                      this.setforceEnable();
                    }
                    (window as any).viewHandler.viewModel.enableFEvent();
                    document.querySelector('.forcePlay_button').classList.remove('event_disabled');

                } else {
                    (window as any).viewHandler.viewModel.disableFEvent();

                    options.target.setSrc(switchImg);
                    options.target.set('status', 'off');
                    (this as any)[options.target.custom as any] = 'off';
                    this.rotaionSprite.stop();
                    this.forceStop();
                    this.isPlayElectron = false;
                    this.setforceopacity();
                    this.topElectricAnimation();
                    document.querySelector('.forcePlay_button').classList.remove('active');
                    document.querySelector('.forcePlay_button').classList.add('event_disabled');
                }
            }

        });
          this.myCanvas.on('mouse:move', (option: any) => {

              if (this.slider.left >= 959) {
                this.slider.left = 959;
              } else if (this.slider.left <= 785) {
                this.slider.left = 785;
              }

              const distance = this.slider.left - 785;

              this.resistanceBlue.width = 49 + distance;
              this.resistanceBlue.setPatternFill(this.repeatPatternImage, null);

              const percent = this.resistanceBlue.width / 270;

              this.forceIntensity = percent * 50;
              this.electronInstensity = percent * 4;

              const interval = Math.floor(percent * 10 );

              this.forceIntval = interval;

              if (this.topSwitch === 'on' && (window as any).viewHandler.viewModel.switchOn) {
                this.setforceopacity();
                this.setforceEnable();
              }

              this.rotaionSprite.frame = this.forceIntensity;
              this.forceFrame();
              this.myCanvas.renderAll();
          });

          this.myCanvas.on('mouse:up', () => {
            this.flag = false;
            this.myCanvas.renderAll();
          });
          
        this.initLine();
        this.topElectron();
        this.initElectronAnimation();
      ViewController.getInstance().hideLoading(1000);
    }

    initLine() {

        const pathLine_one = new fabric.Path('M773 475 C 810 475, 840 475, 820 275, 810 230, 800 220, 785 190');
        pathLine_one.set({left: 971, top: 294,  selectable: false, fill: 'rgba(0,0,0,0)',
            stroke: '#B31400', strokeLineJoin: 'round', strokeWidth: 3});

        const pathLine_two = new fabric.Path('M215 370 C 100 370, 100 320, 100 275, 104 230, 104 200, 285 185');
        pathLine_two.set({left: 104, top: 394,  selectable: false, fill: 'rgba(0,0,0,0)',
            stroke: '#B31400', strokeLineJoin: 'round', strokeWidth: 3});

        const pathLine_three = new fabric.Path('M55 665 C 250 675, 250 510, 340 490, 360 490, 377 490, 377 510');
        pathLine_three.set({left: 455, top: 218,  selectable: false, fill: 'rgba(0,0,0,0)',
            stroke: '#B31400', strokeLineJoin: 'round', strokeWidth: 3});

        this.myCanvas.add(pathLine_one);
        this.myCanvas.add(pathLine_two);
        this.myCanvas.add(pathLine_three);

        this.myCanvas.add(this.makeLine([522, 579 , 810, 579]));
    }

    makeLine(coords: any) {
        return new fabric.Line(coords, {
            fill: '#B31400',
            stroke: '#B31400',
            strokeWidth: 3,
            selectable: false,
            evented: false,
        });
    }

    async topElectron() {

        const config4 = {
            left: 465,
            top: 399,
            opacity: 0,
            selectable: false
        };

        const eFabImg = await this.loadImage(arrowImg as any, config4);
        eFabImg.scale(0.8);
        eFabImg.set('angle', 170).setCoords();
        this.myCanvas.add(eFabImg);

        this.topEArray.push(eFabImg);
        const cloneEImg = (x: number, y: number, angle ?: number) => {
            const eFabImgClone = fabric.util.object.clone(eFabImg);
            eFabImgClone.set('left', x);
            eFabImgClone.set('top', y);
            eFabImgClone.set('angle', angle).setCoords();
            this.myCanvas.add(eFabImgClone);
            return eFabImgClone;
        };

        const pos = [
            {x: 500, y: 398 , angle: 170},
            {x: 540, y: 390 , angle: 160},
            {x: 580, y: 375 , angle: 155},
            {x: 620, y: 347 , angle: 153},
            {x: 660, y: 297 , angle: 130},
            {x: 700, y: 249 , angle: 153},
            {x: 740, y: 225 , angle: 165},

            {x: 983, y: 307 , angle: -110},
            {x: 1000, y: 340 , angle: -110},
            {x: 1013, y: 380 , angle: -100},
            {x: 1018, y: 430 , angle: -100},
            {x: 1021, y: 475 , angle: -100},
            {x: 1020, y: 525 , angle: -100},
            {x: 995, y: 575 , angle: -60},

            {x: 790, y: 575 , angle: 0},
            {x: 750, y: 575 , angle: 0},
            {x: 710, y: 575 , angle: 0},
            {x: 670, y: 575 , angle: 0},
            {x: 630, y: 575 , angle: 0},
            {x: 590, y: 575 , angle: 0},
            {x: 550, y: 575 , angle: 0},

            {x: 190, y: 573 , angle: 0},
            {x: 150, y: 565 , angle: 20},
            {x: 117, y: 538 , angle: 40},
            {x: 112, y: 500 , angle: 90},
            {x: 113, y: 460 , angle: 90},
            {x: 135, y: 430 , angle: 120},
            {x: 180, y: 415 , angle: 155},
            {x: 220, y: 407 , angle: 160},
            {x: 260, y: 403 , angle: 165},


        ];

        for (let i = 0; i < pos.length; i++) {
            this.topEArray.push(cloneEImg(pos[i].x, pos[i].y, pos[i].angle));
        }
    }

    topElectricAnimation() {
        if (this.topSwitch !== 'on') {
            const temp = this.topEArray.concat(this.bottomEArray);
            for (let i = 0; i < temp.length; i++) {
                (temp[i] as fabric.Image).opacity = 0;
            }
            return;
        }
        for (let i = 0; i < this.topEArray.length; i++) {
            const eElemFab = this.topEArray[i] as fabric.Image;
            if (i % 2 === 0) {
                eElemFab.opacity = this.even;
            } else {
                eElemFab.opacity = this.even === 1 ? 0 : 1;
            }
        }
    }

    initElectronAnimation(onlyRun?: boolean) {


        const fps = this.electronInstensity;
        let now;
        let then = Date.now();
        // const interval = 1000 / fps;
        let delta;

        const animate = () => {

            fabric.util.requestAnimFrame(animate);

            now = Date.now();
            delta = now - then;
            const interval = 1000 / this.electronInstensity;
            if (delta > interval && this.isPlayElectron) {
                then = now - (delta % interval);

                    this.topElectricAnimation();
                    this.even = this.even === 1 ? 0 : 1;


            }
            this.myCanvas.renderAll();
        };
        animate();
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

    reset() {
        this.topTipfabImg.opacity = 1;
        this.topTipText.opacity = 1;
        this.tipArrowfabImg.opacity = 1;

        this.topSwitch = 'off';

        this.rotaionSprite.isPlay = false;
        this.forceIsPlay(false);

        this.forceIntensity = 20;
        this.electronInstensity = 2;
        this.rotaionSprite.frame = 20;
        this.rotaionSprite.spriteIndex = 0;

        this.forceIntval = 5;
        this.setforceopacity();
        this.forceFrame();
        this.forceSpriteIndex();

        this.slider.left = 870;
        this.resistanceBlue.width  = 135;
        this.resistanceBlue.setPatternFill(this.repeatPatternImage, null);
        this.slider.setCoords();


        this.myCanvas.getObjects().forEach((o) => {
            if (o.name === 'switch') {
                o.setSrc(switchImg);
                o.set('status', 'off');

            }
        });
    }

    setforceopacity() {
      this.forceSprite_one.opacity = 0;
      this.forceSprite_two.opacity = 0;
      this.forceSprite_three.opacity = 0;
      this.forceSprite_four.opacity = 0;
      this.forceSprite_five.opacity = 0;
      this.forceSprite_six.opacity = 0;
      this.forceSprite_seven.opacity = 0;
      this.forceSprite_eight.opacity = 0;
    }

    setforceEnable() {
      if (this.forceIntval === 1) {
        this.forceSprite_one.opacity = 1;

      } else if (this.forceIntval === 2) {
        this.forceSprite_two.opacity = 1;

      } else if (this.forceIntval === 3) {
        this.forceSprite_three.opacity = 1;

      } else if (this.forceIntval === 4) {
        this.forceSprite_four.opacity = 1;

      } else if (this.forceIntval === 5) {
        this.forceSprite_five.opacity = 1;

      } else if (this.forceIntval === 6) {
        this.forceSprite_six.opacity = 1;

      } else if (this.forceIntval === 7) {
        this.forceSprite_seven.opacity = 1;

      } else if (this.forceIntval === 8) {
        this.forceSprite_eight.opacity = 1;

      }
    }

    forcePlay() {
      this.forceSprite_one.play();
      this.forceSprite_two.play();
      this.forceSprite_three.play();
      this.forceSprite_four.play();
      this.forceSprite_five.play();
      this.forceSprite_six.play();
      this.forceSprite_seven.play();
      this.forceSprite_eight.play();
    }

    forceStop() {
      this.forceSprite_one.stop();
      this.forceSprite_two.stop();
      this.forceSprite_three.stop();
      this.forceSprite_four.stop();
      this.forceSprite_five.stop();
      this.forceSprite_six.stop();
      this.forceSprite_seven.stop();
      this.forceSprite_eight.stop();
    }

    forceFrame() {
      this.forceSprite_one.frame = this.forceIntensity;
      this.forceSprite_two.frame = this.forceIntensity;
      this.forceSprite_three.frame = this.forceIntensity;
      this.forceSprite_four.frame = this.forceIntensity;
      this.forceSprite_five.frame = this.forceIntensity;
      this.forceSprite_six.frame = this.forceIntensity;
      this.forceSprite_seven.frame = this.forceIntensity;
      this.forceSprite_eight.frame = this.forceIntensity;
    }

    forceIsPlay(enanble: boolean) {
      this.forceSprite_one.isPlay   = enanble;
      this.forceSprite_two.isPlay   = enanble;
      this.forceSprite_three.isPlay = enanble;
      this.forceSprite_four.isPlay  = enanble;
      this.forceSprite_five.isPlay  = enanble;
      this.forceSprite_six.isPlay   = enanble;
      this.forceSprite_seven.isPlay = enanble;
      this.forceSprite_eight.isPlay = enanble;
    }

    forceSpriteIndex() {
      this.forceSprite_one.spriteIndex   = 0;
      this.forceSprite_two.spriteIndex   = 0;
      this.forceSprite_three.spriteIndex = 0;
      this.forceSprite_four.spriteIndex  = 0;
      this.forceSprite_five.spriteIndex  = 0;
      this.forceSprite_six.spriteIndex   = 0;
      this.forceSprite_seven.spriteIndex = 0;
      this.forceSprite_eight.spriteIndex = 0;
    }

    //创建类
    createSpriteClass() {

      fabric.Sprite = fabric.util.createClass(fabric.Image, {

        type: 'sprite',
        spriteWidth: 358,
        spriteHeight: 330,
        spriteIndex: 0,
        frame: 20,
        isPlay : false,

        initialize: function (element: any, options: any) {
          // options || (options = {});

          options.width = this.spriteWidth;
          options.height = this.spriteHeight;

          this.callSuper('initialize', element, options);

          this.createTmpCanvas();
          this.createSpriteImages();
        },

        createTmpCanvas: function () {
          this.tmpCanvasEl = fabric.util.createCanvasElement();
          this.tmpCanvasEl.width = this.spriteWidth || this.width;
          this.tmpCanvasEl.height = this.spriteHeight || this.height;
        },

        createSpriteImages: function () {
          this.spriteImages = [];

          var steps = this._element.width / this.spriteWidth;
          for (var i = 0; i < steps; i++) {
            this.createSpriteImage(i);
          }
        },

        createSpriteImage: function (i) {
          var tmpCtx = this.tmpCanvasEl.getContext('2d');
          tmpCtx.clearRect(0, 0, this.tmpCanvasEl.width, this.tmpCanvasEl.height);
          tmpCtx.drawImage(this._element, -i * this.spriteWidth, 0);

          var dataURL = this.tmpCanvasEl.toDataURL('image/png');
          var tmpImg = fabric.util.createImage();

          tmpImg.src = dataURL;

          this.spriteImages.push(tmpImg);
        },

        _render: function (ctx) {
          ctx.drawImage(
            this.spriteImages[this.spriteIndex],
            -this.width / 2,
            -this.height / 2
          );
        },

        play: function () {

          this.isPlay = true;
          this.playImage();

        },

        stop: function () {
          this.isPlay = false;
        },
        playImage() {

          let now;
          let then = Date.now();
          // const interval = 1000 / this.frame;
          let delta;


          const animate = () => {
            if (this.isPlay) {
              fabric.util.requestAnimFrame(animate);
            }
            now = Date.now();
            delta = now - then;
            const interval = 1000 / this.frame;

            if (delta > interval) {
              then = now - (delta % interval);

              this.onPlay && this.onPlay();
              this.dirty = true;
              this.spriteIndex++;
              if (this.spriteIndex === this.spriteImages.length) {
                this.spriteIndex = 0;
              }
            }
          };
          animate();
        },

        changeFrame: function(index: number) {
          this.frame = index;
          return this.frame;
        }
      });

      fabric.Sprite.async = true;
    }
}
