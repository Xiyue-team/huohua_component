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
    ow: any;
    //three左高右下坐标
    posArr: any = [
        [-98.5, 53.5, -67, 40],
        [-110.5, 37.5, -78.9, 24],
        [-116.8, 17.5, -85, 4],
        [-102, -9, -70, -23],
        [-84.5, -31, -53.5, -44.5],
        [-99.8, -50, -68.1, -63.5],
        [40.05, 53.95, 72.03, 40],
        [63, 39.9, 95, 26],
        [92.9, 27.9, 124, 14],
        [61, 13.5, 92.5, 0],
        [55, -13, 86.5, -27],
    ];
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
            this.onPan(evt, vm);
        });
        mc.on('press', () => {  
            this.onPress(vm);
        });
        mc.on('rotatestart rotatemove', (evt) => {
            this.onRotate(evt);
        });
        mc.on('pinchstart pinchmove', (evt) => {
            this.onPinch(evt);
        });
        //移动
        mc.on('panend', () => {
            this.onPanend(vm);
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

    onPress(vm: any) {
        this.requestElementUpdate();
    }
    //鼠标松开
    onPanend(vm: any) {
        clearTimeout(vm.errorRighttimer);
        const op = this.ow.zoom1;
        const xLeft = this.el.getBoundingClientRect().left * op; /**拖拽图片的left坐标**/
        const xRight = this.el.getBoundingClientRect().right * op; /**拖拽图片的right坐标**/
        const top = this.el.getBoundingClientRect().top * op; /**拖拽图片的top坐标**/
        const bottom = this.el.getBoundingClientRect().bottom * op; /**拖拽图片的bottom坐标**/
        const leftVectPos = (window as any).viewHandler.viewModel.transitionPos(xLeft, top); //div左顶点 左边position 上边position
        const rightVectPos = (window as any).viewHandler.viewModel.transitionPos(xRight, top); //div右顶点 右边position
        const bottomVectPos = (window as any).viewHandler.viewModel.transitionPos(xLeft, bottom); //div左下顶点 下边position
        const backColor = $(`#${this.el.id}`).css('background-color');
        for (let i = 0; i < 11; i++) {
              if (leftVectPos.x < this.posArr[i][2] && rightVectPos.x > this.posArr[i][0] &&
                 leftVectPos.y < this.posArr[i][1] + 5.6 && bottomVectPos.y > this.posArr[i][3] - 5.6) {
                    if (vm.rejectArr[i].text) {
                        return;
                     } 
                    $(`#button${i}`).css('background-color', backColor);
                    $(`#${this.el.id}`).css('visibility', 'hidden');
                    vm.rejectArr[i].text = vm.textArr;
                    if (vm.rejectArr[i].text === vm.realTextArr[i]) {
                        vm.rejectArr[i].src = real;
                    } else {
                        vm.rejectArr[i].src = error;
                    }
                    vm.errorRighttimer = setTimeout(() => {
                        vm.rejectArr[i].src = "";
                        if (vm.rejectArr[i].text !== vm.realTextArr[i]) {
                            vm.rejectArr[i].text = "";
                            $(`#${this.el.id}`).css('visibility', 'visible');
                        }
                        (window as any).viewHandler.viewModel.onPan(false);
                }, 500);
             }
        }
        (window as any).viewHandler.viewModel.onPan(false);
    }
    onPan(ev: any, vm: any) {
        const op = this.ow.zoom1;
        vm.textArr = this.el.innerHTML;
        (window as any).viewHandler.viewModel.onPan(true);
        (window as any).viewHandler.viewModel.deleteTiShi();
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
