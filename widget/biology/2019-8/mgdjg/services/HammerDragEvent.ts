/**
 * 拖拽事件类
 *@since 2.0
 *@Date 2018/8/20 10:22
 */
import * as Hammer from 'hammerjs';
import $ from 'jquery-ts';
export class HammerDragEvent {
    transform: any;
    el: any;
    timer: any;
    ticking = false;
    // 鼠标初始位置的X/Y值
    startX: any;
    startY: any;
    initScale = 1;
    // cache指当前滑块所处的scope值
    cache = 0;
    // 滑动条滑动的范围值。i9ko9ADFJKLS|:
    scope = [150, 930];
    item = 0;
    num = 424;

    constructor(id: string, scaleY: number, hitCall?: any) {
        document.querySelector('.control-panel_div_rt');
        this.el = document.getElementById(id);

        const width1 = document.documentElement.clientWidth;
        if (width1 > 854) {
            this.startX = 150;
        } else if (width1 <= 854) {
            this.startX = 96;
        }
        this.startY = 0;
        const mc = new Hammer.Manager(this.el);
        //水平方向平移
        mc.add(new Hammer.Pan({
            direction: Hammer.DIRECTION_ALL,
            threshold: 0,
            pointers: 0
        }));
        //水平方向的快速滑动
        mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
        //旋转
        mc.add(new Hammer.Rotate({
            threshold: 0
        })).recognizeWith(mc.get('pan'));
        //捏放
        mc.add(new Hammer.Pinch({
            threshold: 0
        })).recognizeWith([mc.get('pan'), mc.get('rotate')] as any);
        //长按
        mc.add(new Hammer.Tap({
            event: 'doubletap',
            taps: 2
        }));
        mc.add(new Hammer.Tap());

        mc.on('panstart panmove', (evt) => {
            this.onPan(evt);
            hitCall(this.cache);
        });
        mc.on('rotatestart rotatemove', (evt) => {
        });
        mc.on('pinchstart pinchmove', (evt) => {
            this.onPinch(evt);
        });
        mc.on('panend', (evt) => {
            this.startX = this.transform.translate.x;
            this.startY = this.transform.translate.y;
            hitCall(this.cache);
            this.resetElement();
        });
        mc.on('swipe', (evt) => {
            this.onSwipe(evt);
        });
        mc.on('tap', () => {
            this.onTap();
        });
        mc.on('hammer.input', (ev) => {
            if (ev.isFinal) {
            }
        });
        this.resetElement();
    }
    reqAnimationFrame(callback: any) {
        window.setTimeout(callback, 1000 / 60);
    }
    updateElementTransform() {
        if (this.transform.translate.y === 0 && this.transform.translate.x === 0) {
            setTimeout(() => {
                this.el.style.display = 'block';
            }, 300);
        }
        let value = [
            'translate3d(0, ' + this.transform.translate.y + 'px, 0)',
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
    onPan(ev: any) {
        const sliderPosX = this.transform.translate.x;

        this.cache = (this.startX + ev.deltaX);
        this.el.classList.remove('animate');
        this.transform.translate = {
            x: this.cache,
            y: 0,
        };
        console.log(this.cache, ev.deltaX, ev.startX);
        const width = document.documentElement.clientWidth;
        $('#thermometerBg2').css('z-index', 0);
        $('#thermometerBg').css('width', sliderPosX + 22);
        // if (width1 > 980) {
        //
        //
        //
        //     this.sliderleft(width1 - 150, 150, sliderPosX);
        // }
        // if ( width>=1920 ) {
        //     this.sliderleft(1800, 150, sliderPosX);
        // } else if(width<=1920 && width>1540) {
        //     this.sliderleft(1700, 150, sliderPosX);
        // }
        // else if(width<=1920 && width>1540) {
        //     this.sliderleft(1700, 150, sliderPosX);
        // }
        // else if(width<=1920 && width>1540) {
        //     this.sliderleft(1700, 150, sliderPosX);
        // }
        // else if(width<=1920 && width>1540) {
        //     this.sliderleft(1700, 150, sliderPosX);
        // }
        // else if(width<=1920 && width>1540) {
        //     this.sliderleft(1700, 150, sliderPosX);
        // }
        if(width<=1024){
            this.sliderleft(width-130, 96, sliderPosX)
        } else if(width>1024){
            this.sliderleft(width-200, 150, sliderPosX)
        }
        // switch (width) {
        //
        //     // case 2048:
        //     //     // //滑条与后面背景向左距离
        //     //     // $('#thermometerBg').css('width', sliderPosX - this.num - 80);
        //     //     // //滑条与后面背景向右距离
        //     //     // $('#thermometerBg2').css('width', sliderPosX + 37);
        //     //     this.sliderleft(1800, 150, sliderPosX);
        //     //     break;
        //     case 1920:
        //         this.sliderleft(1700, 150, sliderPosX);
        //         break;
        //     case 1544:
        //         this.sliderleft(1350, 150, sliderPosX)
        //         break;
        //     case 1536:
        //         this.sliderleft(1350, 150, sliderPosX)
        //         break;
        //     case 1280:
        //         this.sliderleft(1100, 150, sliderPosX)
        //         break;
        //     case 1231:
        //         this.sliderleft(1000, 150, sliderPosX)
        //         break;
        //     case 1226:
        //         this.sliderleft(1000, 150, sliderPosX)
        //         break;
        //     case 1027:
        //     case 1024:
        //         this.sliderleft(860, 145, sliderPosX)
        //         break;
        //     case 854:
        //         this.sliderleft(715, 96, sliderPosX)
        //         break;
        //     case 812:
        //     case 818:
        //         this.sliderleft(700, 96, sliderPosX)
        //         break;
        //     case 806:
        //         this.sliderleft(700, 96, sliderPosX)
        //         break;
        //     case 730:
        //         this.sliderleft(590, 96, sliderPosX)
        //         break;
        //     case 667:
        //         this.sliderleft(530, 96, sliderPosX)
        //         break;
        //     case 640:
        //         this.sliderleft(510, 96, sliderPosX)
        //         break;
        // }
        this.requestElementUpdate();
    }
    // 滑条范围
    sliderleft(max: any, min: any, posX: any) {
        if (this.cache > max) {
            $('#slider1').css('left', max);
            $('#slider').css('left', max);
            this.transform.translate.x = max
        } else if (this.cache > min) {
            $('#slider1').css('left', posX);
            $('#slider').css('left', posX);
            console.log(1);
        } else if (this.cache <= min) {
            $('#slider1').css('left', min);
            $('#slider').css('left', min);
            this.transform.translate.x = min
        }

    }
    onPinch(ev: any) {
        if (ev.type === 'pinchstart') {
            this.initScale = this.transform.scale || 1;
        }
        this.el.classList.remove('animate');
        this.transform.scale = this.initScale * ev.scale;
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
        this.transform.rx = 1;
        this.transform.angle = 25;
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
                x: this.startX,
                y: this.startY
            },
            scale: 1,
            angle: 0,
            rx: 0,
            ry: 0,
            rz: 0
        };
        this.requestElementUpdate();
    }
    restPosition() {
        // this.startX = 370;
        this.startY = 0;

        const width1 = document.documentElement.clientWidth;
        if (width1 > 854) {
            this.transform.translate.x = 150;
            this.cache = 150;
            this.startX = 150;
        } else if (width1 <= 854) {
            this.transform.translate.x = 96;
            this.cache = 96;
            this.startX = 96;
        }
        // this.resetElement();
        // $('#bgbox').css('width', 0);
        // $('#thermometerBg2').css('width', 0);
        // $('#thermometerBg').css('width', 0);
        // $('#btnboximg').css('width', 0);
    }

}
