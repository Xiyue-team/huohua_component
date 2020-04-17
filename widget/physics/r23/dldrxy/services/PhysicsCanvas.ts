import {fabric} from 'fabric';

import {IImageOptions} from 'fabric/fabric-impl';

import * as switchOnImg from '../sub_static/switchOn.png';
import * as switchImg from '../sub_static/switchOff.png';
import * as batteryImg from '../sub_static/battery.png';
import * as bulbImg from '../sub_static/bulb.png';
import * as bulbBImg from '../sub_static/bulbB.png';
import * as tipImg from '../sub_static/tip.png';
import * as arrowImg from '../sub_static/arrow.png';
import * as tipArrowImg from '../../dldrxy/sub_static/tipArrow.png';

import * as bulbL from '../sub_static/bulbL.png';
import * as bulbBL from '../sub_static/bulbBL.png';

export default class PhysicsCanvas {

    myCanvas: fabric.Canvas;
    topSwitch = 'off';
    bottomSwitch = 'off';
    topEArray: any[] = [];
    bottomEArray: any[] = [];
    even = 0;

    topLight: fabric.Image;
    bottomLight: fabric.Image;

    topTipImg: fabric.Image;
    bottomTipImg: fabric.Image;

    tipText: fabric.Text;
    tipText2: fabric.Text;

    zoom = 1;

    constructor() {
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

        this.tipText = new fabric.Text('开关可点击', { left: 400, top: 100, fontSize: 20,  fill: 'white' , selectable: false});
        this.myCanvas.add(this.tipText);
        this.tipText2 = new fabric.Text('开关可点击', { left: 920, top: 580, fontSize: 20, fill: 'white', selectable: false});
        this.myCanvas.add(this.tipText2);


        const text1 = new fabric.Text('S₁', { left: 320, top: 230, fontSize: 20,  fill: 'white' , selectable: false});
        this.myCanvas.add(text1);

        const text2 = new fabric.Text('E₁', { left: 800, top: 230, fontSize: 20, fill: 'white' , selectable: false});
        this.myCanvas.add(text2);

        const text3 = new fabric.Text('L₁', { left: 790, top: 420, fontSize: 20, fill: 'white', selectable: false});
        this.myCanvas.add(text3);

        const text4 = new fabric.Text('L₂', { left: 320, top: 420, fontSize: 20, fill: 'white', selectable: false});
        this.myCanvas.add(text4);

        const text5 = new fabric.Text('S₂', { left: 790, top: 620, fontSize: 20, fill: 'white', selectable: false});
        this.myCanvas.add(text5);


        this.initResource();
        this.initCanvasScale();
        console.log(this.myCanvas);
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
        const tipConfig = {
            left: 310,
            top: 55,
            selectable: false
        } as fabric.IImageOptions;
        this.topTipImg = await  this.loadImage(tipImg as any, tipConfig);
        this.topTipImg.scale(0.6);


        this.bottomTipImg = fabric.util.object.clone(this.topTipImg);
        this.bottomTipImg.set('left', 776);
        this.bottomTipImg.set('top', 457);

        const config = {
            left: 210,
            top: 56,
            selectable: false
        } as fabric.IImageOptions;

        const switchFabImage = await this.loadImage(switchImg as any, config);
        switchFabImage.name = 'switch';
        switchFabImage.set('custom' as any, 'topSwitch');
        switchFabImage.set('status' as any, 'off');

        const config2 = {
            left: 604,
            top: 138,
            selectable: false
        } as fabric.IImageOptions;

        const batteryFabImg = await this.loadImage(batteryImg as any, config2);


        const config3 = {
            left: 210,
            top: 307,
            selectable: false
        };

        this.topLight = await this.loadImage(bulbImg as any, config3);


        const config4 = {
            left: 676,
            top: 315,
            selectable: false
        };

        this.bottomLight = await this.loadImage(bulbBImg as any, config4);


        const switchFabImage2 = fabric.util.object.clone(switchFabImage);
        switchFabImage2.set('custom', 'bottomSwitch');
        switchFabImage2.set('left', 676);
        switchFabImage2.set('top', 457);


        this.myCanvas.add(this.topTipImg);
        this.myCanvas.add(this.bottomTipImg);
        this.myCanvas.add(this.topLight);
        this.myCanvas.add(this.bottomLight);
        this.myCanvas.add(batteryFabImg);
        this.myCanvas.add(switchFabImage);
        this.myCanvas.add(switchFabImage2);

        this.myCanvas.on('mouse:down', (options: any) => {
            if (options.target && options.target.hasOwnProperty('name') && options.target.name === 'switch') {
                console.log('click switch image ', options.target);
                this.tipText2.opacity = 0;
                this.tipText.opacity = 0;
                if (options.target.get('custom') === 'topSwitch') {
                    this.topTipImg.opacity = 0;
                } else if (options.target.get('custom') === 'bottomSwitch') {
                    this.bottomTipImg.opacity = 0;
                }

                if (options.target.status === 'off') {
                    options.target.setSrc(switchOnImg);
                    options.target.set('status', 'on');
                    (this as any)[options.target.custom as any] = 'on';
                } else {
                    options.target.setSrc(switchImg);
                    options.target.set('status', 'off');
                    (this as any)[options.target.custom as any] = 'off';

                }

            }
        });




        this.initLine();
        this.topElectron();
        this.bottomElectron();
        this.initElectronAnimation();
    }

    initLine() {

        const pathLine = new fabric.Path('M70 10 C 35 25, 20 35, 10 90, 10 120, 20 170, 65 210');
        pathLine.set({left: 194, top: 177,  selectable: false, fill: 'rgba(0,0,0,0)',
            stroke: '#B31400', strokeLineJoin: 'round', strokeWidth: 3});
        console.log(pathLine);
        this.myCanvas.add(pathLine);


        // this.myCanvas.add(this.makeLine([244, 177 , 246, 376]));

        this.myCanvas.add(this.makeLine([423, 177, 639, 177]));
        this.myCanvas.add(this.makeLine([945, 177, 879, 376]));
        this.myCanvas.add(this.makeLine([879, 376, 879, 578]));

        this.myCanvas.add(this.makeLine([714, 376, 714, 578]));

        this.myCanvas.add(this.makeLine([423, 376, 714, 376]));
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
            left: 222,
            top: 190,
            opacity: 0,
            selectable: false
        };

        const eFabImg = await this.loadImage(arrowImg as any, config4);
        eFabImg.scale(0.9);
        eFabImg.set('angle', -32).setCoords();
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
            {x: 204, y: 212 , angle: -62},
            {x: 195, y: 239 , angle: -84},
            {x: 190, y: 270 , angle: -90},
            {x: 196, y: 300 , angle: -99},
            {x: 208, y: 332 , angle: -110},
            {x: 224, y: 357 , angle: -120},

            {x: 433, y: 173 , angle: 0},
            {x: 453, y: 173 , angle: 0},
            {x: 473, y: 173 , angle: 0},
            {x: 493, y: 173 , angle: 0},
            {x: 513, y: 173 , angle: 0},
            {x: 533, y: 173 , angle: 0},
            {x: 553, y: 173 , angle: 0},
            {x: 573, y: 173 , angle: 0},
            {x: 593, y: 173 , angle: 0},
            {x: 613, y: 173 , angle: 0},


            {x: 946, y: 192 , angle: 107},
            {x: 935, y: 227 , angle: 107},
            {x: 923, y: 263 , angle: 107},
            {x: 912, y: 298 , angle: 107},
            {x: 902, y: 328 , angle: 107},
            {x: 894, y: 354 , angle: 107},


            {x: 433 + 15, y: 382 , angle: -180},

            {x: 473 + 15, y: 382 , angle: -180},

            {x: 513 + 15, y: 382 , angle: -180},

            {x: 553 + 15, y: 382 , angle: -180},

            {x: 593 + 15, y: 382 , angle: -180},

            {x: 633 + 15, y: 382 , angle: -180},

            {x: 673 + 15, y: 382 , angle: -180},


        ];

        for (let i = 0; i < pos.length; i++) {
            this.topEArray.push(cloneEImg(pos[i].x, pos[i].y, pos[i].angle));
        }
    }

    async bottomElectron() {
        const config4 = {
            left: 708 + 3,
            top: 411,
            opacity: 0,
            selectable: false
        };

        const eFabImg = await this.loadImage(arrowImg as any, config4);
        eFabImg.scale(0.9);
        eFabImg.set('angle', -90).setCoords();
        this.myCanvas.add(eFabImg);

        this.bottomEArray.push(eFabImg);
        const cloneEImg = (x: number, y: number, angle ?: number) => {
            const eFabImgClone = fabric.util.object.clone(eFabImg);
            eFabImgClone.set('left', x);
            eFabImgClone.set('top', y);
            eFabImgClone.set('angle', angle).setCoords();
            this.myCanvas.add(eFabImgClone);
            return eFabImgClone;
        };

        const pos = [

            {x: 708 + 3, y: 451, angle: -90},

            {x: 708 + 3, y: 491, angle: -90},

            {x: 708 + 3, y: 531, angle: -90},



            {x: 873 + 12, y: 391, angle: 90},

            {x: 873 + 12, y: 431, angle: 90},

            {x: 873 + 12, y: 471, angle: 90},

            {x: 873 + 12, y: 511, angle: 90},

            {x: 873 + 12, y: 551, angle: 90}
        ];

        for (let i = 0; i < pos.length; i++) {
            this.bottomEArray.push(cloneEImg(pos[i].x, pos[i].y, pos[i].angle));
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

    bottomElectricAnimation() {
        if (this.topSwitch !== 'on' || this.bottomSwitch !== 'on') {
            for (let i = 0; i < this.bottomEArray.length; i++) {
                (this.bottomEArray[i] as fabric.Image).opacity = 0;
            }
            return;
        }
        for (let i = 0; i < this.bottomEArray.length; i++) {
            const eElemFab = this.bottomEArray[i] as fabric.Image;
            if (i % 2 === 0) {
                eElemFab.opacity = this.even;
            } else {
                eElemFab.opacity = this.even === 1 ? 0 : 1;
            }
        }
    }

    lightAnimation() {
        if (this.topSwitch !== 'on') {
            this.topLight.setSrc(bulbImg as any);
            this.bottomLight.setSrc(bulbBImg as any);
            return;
        }

        this.topLight.setSrc(bulbL as any);


        if (this.bottomSwitch === 'on') {
            this.bottomLight.setSrc(bulbBImg as any);
        } else {
            this.bottomLight.setSrc(bulbBL as any);
        }
    }


    async initElectronAnimation() {

        const fps = 3;
        let now;
        let then = Date.now();
        const interval = 1000 / fps;
        let delta;


        const animate = () => {


            fabric.util.requestAnimFrame(animate);
            now = Date.now();
            delta = now - then;
            if (delta > interval) {
                then = now - (delta % interval);

                this.topElectricAnimation();
                this.bottomElectricAnimation();


                this.even = this.even === 1 ? 0 : 1;
            }

            this.lightAnimation();
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
        this.topSwitch = 'off';
        this.bottomSwitch = 'off';

        this.tipText.opacity = 1;
        this.tipText2.opacity = 1;
        this.topTipImg.opacity = 1;
        this.bottomTipImg.opacity = 1;

        this.myCanvas.getObjects().forEach((o) => {
            if (o.name === 'switch') {
                o.setSrc(switchImg);
                o.set('status', 'off');

            }
        });
    }

}
