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
    // 滑动条滑动的范围值
    scope = [0, -378];
    item = 0;
    constructor(id: string, scaleY: number, hitCall?: any) {
        document.querySelector('.control-panel_div_rt');
        this.el = document.getElementById(id);
        this.startX = 0;
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
        if (document.documentElement.clientHeight < 802 && document.documentElement.clientHeight > 600) {
            ev.deltaY = ev.deltaY / 0.7;
        } else if (document.documentElement.clientHeight < 600 && document.documentElement.clientHeight > 450) {
            ev.deltaY = ev.deltaY / 0.5;
        } else if (document.documentElement.clientHeight < 450 ) {
            ev.deltaY = ev.deltaY / 0.4;
        }
        if (this.startY + ev.deltaY >= this.scope[0] && this.item === 0) {
            this.cache = this.scope[0];
        } else if (this.startY + ev.deltaY < this.scope[1]) {
            this.cache = this.scope[1];
            this.item = 1;
        } else {
            this.item = 1;
            if (this.startY + ev.deltaY > this.cache) {
                const cache = this.cache;
                this.cache = cache;
            } else {
                this.cache = (this.startY + ev.deltaY);
            }
        }
        this.el.classList.remove('animate');
        this.transform.translate = {
            x: this.startX + ev.deltaX,
            y: this.cache
        };
        const sliderPosY = this.transform.translate.y;
        $('#thermometerBg').css('bottom', -sliderPosY);
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

    onSwipe(ev: any) {
        const angle = 0;
        this.transform.ry = ( ev.direction && Hammer.DIRECTION_HORIZONTAL ) ? 1 : 0;
        this.transform.rx = ( ev.direction && Hammer.DIRECTION_VERTICAL) ? 1 : 0;
        this.transform.angle = ( ev.direction && ( Hammer.DIRECTION_RIGHT || Hammer.DIRECTION_UP )) ? angle : -angle;
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
        this.startX = 0;
        this.startY = 0;
        this.cache = 0;
        this.item = 0;
        this.resetElement();
        $('#thermometerBg').css('bottom', 0);
    }

}
