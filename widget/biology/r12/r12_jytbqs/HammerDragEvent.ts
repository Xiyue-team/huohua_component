/**
 * 拖拽事件类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/5/21 10:22
 */
import * as Hammer from 'hammerjs';
export class HammerDragEvent {
    transform: any;
    el: any;
    timer: any;
    ticking = false;
    START_X: any;
    START_Y: any;
    initScale = 1;
    initAngle = 0;

    constructor(id: string, hitCall?: any) {
        document.querySelector('.control-panel_div_rt');
        this.el = document.getElementById(id) ;
        this.START_X = 0;
        this.START_Y = 0;

        const mc = new Hammer.Manager(this.el);
        mc.add(new Hammer.Pan({
            threshold: 0,
            pointers: 0
        }));

        mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
        mc.add(new Hammer.Rotate({
            threshold: 0
        })).recognizeWith(mc.get('pan'));

        mc.add(new Hammer.Pinch({
            threshold: 0
        })).recognizeWith([ mc.get('pan'), mc.get('rotate')] as any);

        mc.add(new Hammer.Tap({
            event: 'doubletap',
            taps: 2
        }));
        mc.add(new Hammer.Tap());

        mc.on('panstart panmove', (evt) => {
            this.onPan(evt);
        });
        mc.on('rotatestart rotatemove', (evt) => {
            this.onRotate(evt);
        });
        mc.on('pinchstart pinchmove', (evt) => {
            this.onPinch(evt);
        });
        mc.on('panend', (evt) => {

            //TODO if letter equals set display none;
            //this.el.style.display = 'none';
            if (this.el.getBoundingClientRect().x) {
                console.log('getBoundingClientRect');
                hitCall(this.el.getBoundingClientRect().x, this.el.getBoundingClientRect().y);
            } else {
                hitCall(evt.pointers[0].pageX - 30, evt.pointers[0].pageY - 30);
            }

        });
        mc.on('swipe', (evt) => {
            this.onSwipe(evt);
        });
        mc.on('tap', () => {
            this.onTap();
        });
        mc.on('hammer.input',  (ev) => {
            if (ev.isFinal) {
                this.resetElement();
            }
        });
        this.resetElement();
    }

    reqAnimationFrame (callback: any) {
        window.setTimeout(callback, 1000 / 60);
    }

    updateElementTransform() {
        if ( this.transform.translate.y === 0 && this.transform.translate.x === 0) {
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
            //this.ticking = true;
        }
    }

    onPan(ev: any) {
        //this.el.className = '';
        this.el.classList.remove('animate');
        this.transform.translate = {
            x: this.START_X + ev.deltaX,
            y: this.START_Y + ev.deltaY
        };
        //console.log(this.transform.translate.x);
        //logEvent(ev);
        this.requestElementUpdate();
    }

    onPinch (ev: any) {
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
        this.timer = setTimeout( () => {
            this.resetElement();
        }, 200);
        this.requestElementUpdate();
    }

    resetElement() {
        //this.el.className = 'animate';

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
