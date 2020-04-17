/**
 * 拖拽事件类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/5/21 10:22
 */
import * as Hammer from 'hammerjs';
import $ from 'jquery-ts' ;
import * as error from '../sub_static/error.png';
import * as real from '../sub_static/real.png';
export class HammerDragEvent {
    transform: any;
    el: any;
    timer: any;
    ticking = false;
    START_X: any;
    START_Y: any;
    initScale = 1;
    initAngle = 0;
    obj: any;
    letter: any;
    obj1: any;
    ow: any;
    isMake = false;
    constructor(vm: any, id: string) {
        this.el = document.getElementById(id);
        this.ow = (window as any).viewHandler.viewModel.$data;

        this.START_X = 0;
        this.START_Y = 0;

        const mc = new Hammer.Manager(this.el);
        mc.add(new Hammer.Pan({
            threshold: 0,
            pointers: 0,
        }));


        mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
        mc.add(new Hammer.Rotate({
            threshold: 0
        })).recognizeWith(mc.get('pan'));

        mc.add(new Hammer.Pinch({
            threshold: 0
        })).recognizeWith([mc.get('pan'), mc.get('rotate')] as any);

        mc.add(new Hammer.Tap({
            event: 'doubletap',
            taps: 2
        }));
        mc.add(new Hammer.Tap());
        mc.add(new Hammer.Press({
            time: 0
        }));

        mc.on('panstart panmove', (evt) => {
            this.onPan(evt);
        });
        mc.on('press', () => {  
            this.onPress();
        });
        mc.on('rotatestart rotatemove', (evt) => {
            this.onRotate(evt);
        });
        mc.on('pinchstart pinchmove', (evt) => {
            this.onPinch(evt);
        });
        //移动
        mc.on('panend', () => {
            this.onPanend();
        });

        mc.on('swipe', (evt) => {
            this.onSwipe(evt);
        });
        mc.on('tap', () => {
            this.onTap();
        });
        mc.on('hammer.input', (ev) => {
            if (ev.isFinal) {
                this.resetElement();
            }
        });
        this.resetElement();
    }

    reqAnimationFrame(callback: any) {
        window.setTimeout(callback, 0);
    }

    updateElementTransform() {
        if (this.transform.translate.y === 0 && this.transform.translate.x === 0) {
            setTimeout(() => {
                this.el.style.display = 'block';

            }, 300);
        }
        let value = [
            'translate3d(' + this.transform.translate.x + 'px, ' + this.transform.translate.y + 'px, 0)',
            'scale(' + this.transform.scale + ', ' + this.transform.scale + ')',
            'rotate3d(' + this.transform.rx + ',' + this.transform.ry + ',' + this.transform.rz + ',' + this.transform.angle + 'deg)'
        ];

        value = value.join(' ') as any;
        this.el.style.webkitTransform = value;
        this.el.style.mozTransform = value;
        this.el.style.transform = value;
        this.ticking = false;
    }

    requestElementUpdate() {
        if (!this.ticking) {
            this.reqAnimationFrame(() => {
                this.updateElementTransform();
            });
        }
    }

    onPress() {
        this.requestElementUpdate();
    }
//拖拽事件
    onPanend() {
        const op = this.ow.zoom1;
        const xLeft = this.el.getBoundingClientRect().left * op; /**拖拽图片的left坐标**/
        const xRight = this.el.getBoundingClientRect().right * op; /**拖拽图片的right坐标**/
        const top = this.el.getBoundingClientRect().top * op; /**拖拽图片的top坐标**/
        const bottom = this.el.getBoundingClientRect().bottom * op; /**拖拽图片的bottom坐标**/
        const pos = (window as any).viewHandler.viewModel.transitionPos(xLeft, xRight, top, bottom);
        if (pos[0] < 108 && pos[1] > 14 && pos[2] > 55 && pos[3] < 56) { //黄色框
            if (this.ow.yelloAm) { return; }
            if (this.ow.yellowText !== '') {
                this.ow.yelloAm = true;
            } else {
                this.ow.yelloAm = false;
            } 
            this.displayHidden(this.el.id);
        } 
        if (pos[0] < -28 && pos[1] > -54 && pos[2] > 55 && pos[3] < 56) { //粉色框
            if (this.ow.pinkAm) { return; }
            if (this.ow.pinkText !== '') {
                this.ow.pinkAm = true;  
            } else {
                this.ow.pinkAm = false;
            }
            this.displayHidden(this.el.id);
        } 
        if (pos[0] < 39 && pos[1] > -20 && pos[2] > -66 && pos[3] < -4) { //蓝色框
            if (this.ow.buleAm) { return; }
            if (this.ow.buleText !== '') {
                this.ow.buleAm = true;
            } else {
                this.ow.buleAm = false;
            }           
            this.displayHidden(this.el.id);
        }
        if (pos[0] < 39 && pos[1] > -20 && pos[2] > -160 && pos[3] < -50) { //紫色框
            if (this.ow.violetAm) { return; }
            if (this.ow.violetText !== '') {
                this.ow.violetAm = true;
            } else {
                this.ow.violetAm = false;
            }
            this.displayHidden(this.el.id);
        }
        if (this.ow.yellowText && this.ow.pinkText && this.ow.buleText && this.ow.violetText) {
            const yellow = this.ow.yellowText === '化合反应' || this.ow.yellowText === '分解反应' ? true : false;
            const pink = this.ow.pinkText === '化合反应' || this.ow.pinkText === '分解反应' ? true : false;
            const bule = this.ow.buleText === '置换反应' ? true : false;
            const violet = this.ow.violetText === '复分解反应' ? true : false;
            if (!yellow) {
               this.ow.isOpinion1 = error;
               this.ow.timerYellow = setTimeout(() => {
                this.ow.isOpinion1 = '';
                this.errorOpen(this.ow.yellowText);
                this.ow.yellowText = ''; 
                this.ow.yelloAm = false;
               }, 2000);
            } else {
                this.ow.isOpinion1 = real;
                this.ow.timerYellow = setTimeout(() => {
                    this.ow.isOpinion1 = '';
                }, 2000);
            }
            if (!pink) { 
                this.ow.isOpinion2 = error;
                this.ow.timerPink = setTimeout(() => {
                    this.ow.isOpinion2 = '';
                    this.errorOpen(this.ow.pinkText);
                    this.ow.pinkText = '';
                    this.ow.pinkAm = false;
                }, 2000);
            } else {
                this.ow.isOpinion2 = real;
                this.ow.timerPink = setTimeout(() => {
                    this.ow.isOpinion2 = '';
                }, 2000);
            }
            if (!bule) { 
                this.ow.isOpinion3 = error;
                this.ow.timerBlue = setTimeout(() => {
                    this.ow.isOpinion3 = '';
                    this.errorOpen(this.ow.buleText);
                    this.ow.buleText = '';
                    this.ow.buleAm = false;
                }, 2000);
            } else {
                this.ow.isOpinion3 = real;
                this.ow.timerBlue = setTimeout(() => {
                    this.ow.isOpinion3 = '';
                }, 2000);
            }
            if (!violet) { 
                this.ow.isOpinion4 = error;
                this.ow.timerViolet = setTimeout(() => {
                    this.ow.isOpinion4 = '';
                    this.errorOpen(this.ow.violetText);
                    this.ow.violetText = '';
                    this.ow.violetAm = false;
                }, 2000);
            } else {
                this.ow.isOpinion4 = real;
                this.ow.timerViolet = setTimeout(() => {
                    this.ow.isOpinion4 = '';
                }, 2000);
            }
            if (yellow && pink && bule && violet) {
                this.ow.isOpinion1 = real;
                this.ow.isOpinion2 = real;
                this.ow.isOpinion3 = real;
                this.ow.isOpinion4 = real;
                this.ow.timer = setTimeout(() => {
                    this.ow.isOpinion1 = '';
                    this.ow.isOpinion2 = '';
                    this.ow.isOpinion3 = '';
                    this.ow.isOpinion4 = '';
                    (window as any).viewHandler.viewModel.addTiShi();
                }, 2000);
            }
        }
    }
    //错误反馈
    errorOpen(text: any) {
        const buttonArr: any = [];
        for (let i = 0; i < 4; i++) {
            buttonArr.push($(`#index${i}`));
        }
        for (let i = 0; i < 4; i++) {
            if (buttonArr[i].text() === text) {
                buttonArr[i].css('visibility', 'visible');
            }
        }
    }
    //按钮对应消失
    displayHidden(id: string) {
        $(`#${id}`).css('visibility', 'hidden');
    }
    onPan(ev: any) {
        const op = this.ow.zoom1;
        (window as any).viewHandler.viewModel.deleteTiShi();
        const xLeft = this.el.getBoundingClientRect().left * op; /**拖拽图片的left坐标**/
        const xRight = this.el.getBoundingClientRect().right * op; /**拖拽图片的right坐标**/
        const top = this.el.getBoundingClientRect().top * op; /**拖拽图片的top坐标**/
        const bottom = this.el.getBoundingClientRect().bottom * op; /**拖拽图片的bottom坐标**/
        const pos = (window as any).viewHandler.viewModel.transitionPos(xLeft, xRight, top, bottom);
        const text = this.el.innerHTML;
            if (pos[0] < 108 && pos[1] > 14 && pos[2] > 55 && pos[3] < 56) { //黄色框
                if (this.ow.yellowText) {} else {
                    this.ow.yellowText = text;
                }
                } else {
                if (this.ow.yelloAm) {} else {
                    this.ow.yellowText = '';
                }
            if (pos[0] < -28 && pos[1] > -54 && pos[2] > 55 && pos[3] < 56) { //粉色框
                if (this.ow.pinkText) {} else {
                    this.ow.pinkText = text;
                }
                } else {
                if (this.ow.pinkAm) {} else {
                    this.ow.pinkText = '';
                }
            if (pos[0] < 39 && pos[1] > -20 && pos[2] > -66 && pos[3] < -4) { //蓝色框
                if (this.ow.buleText) {} else {
                    this.ow.buleText = text;
                }
                } else {
                if (this.ow.buleAm) {} else {
                    this.ow.buleText = '';
                }
            if (pos[0] < 39 && pos[1] > -20 && pos[2] > -160 && pos[3] < -50) { //紫色框
                if (this.ow.violetText) {} else {
                    this.ow.violetText = text;
                }
                } else {
                    if (this.ow.violetAm) {} else {
                        this.ow.violetText = '';
                    }
                }
            }
        }
    }
        this.transform.translate = {
            x: this.START_X + ev.deltaX / op,
            y: this.START_Y + ev.deltaY / op
        };
        this.requestElementUpdate();
    }
    onPinch(ev: any) {
        if (ev.type === 'pinchstart') {
            this.initScale = this.transform.scale || 1;
        }
        this.el.classList.remove('animate');
        this.transform.scale = this.initScale * ev.scale;

        this.requestElementUpdate();
    }

    onRotate(ev: any) {
        if (ev.type === 'rotatestart') {
            this.initAngle = this.transform.angle || 0;
        }
        this.el.classList.remove('animate');
        this.transform.rz = 1;
        this.transform.angle = this.initAngle + ev.rotation;

        this.requestElementUpdate();
    }

    onSwipe(ev: any) {
        const angle = 0;

        this.transform.ry = (ev.direction && Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;

        this.transform.rx = (ev.direction && Hammer.DIRECTION_VERTICAL) ? 1 : 0;
        this.transform.angle = (ev.direction && (Hammer.DIRECTION_RIGHT || Hammer.DIRECTION_UP)) ? angle : -angle;

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.resetElement();
        }, 300);

        this.requestElementUpdate();
    }

    onTap() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.resetElement();
        }, 200);
        this.requestElementUpdate();
    }
    
    resetElement() {
        this.el.classList.add('animate');
        this.transform = {
            translate: {
                x: this.START_X,
                y: this.START_Y
            },
            scale: 1,
            angle: 0,
            rx: 0,
            ry: 0,
            rz: 0
        };
        this.requestElementUpdate();
    }

}
