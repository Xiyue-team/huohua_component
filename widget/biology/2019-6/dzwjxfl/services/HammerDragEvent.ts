/**
 * 拖拽事件类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/5/21 10:22
 */
import * as Hammer from 'hammerjs';
import $ from 'jquery-ts' ;
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
    constructor(vm: any, id: string, hitCall?: any ) {
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
        clearTimeout(vm.timer);
        vm.isMake = true;
        this.opationMake(vm);
    }
    //拖拽反馈
    opationMake(dom: any) {
        this.retroactionPanend(-182, -146, -82, -108, 'dragImg1', 'getimg0', dom, 0);
        this.retroactionPanend(-127, -91, -82, -108, 'dragImg5', 'getimg1', dom, 1);
        this.retroactionPanend(-77, -41, -82, -108, 'dragImg2', 'getimg2', dom, 2);
        this.retroactionPanend(-27, 9, -82, -108, 'dragImg3', 'getimg3', dom, 3);
        this.retroactionPanend(33, 69, -82, -108, 'dragImg0', 'getimg4', dom, 4);
        this.retroactionPanend(103, 139, -82, -108, 'dragImg4', 'getimg5', dom, 5);
    }
    //正确错误反馈
    retroactionPanend(leftx: number, rightx: number, topy: number, bottomy: number,
         id: string, getId: string, vm: any, num: number) {
        const posSgd = (window as any).viewHandler.viewModel;    
        const xLeft = this.el.getBoundingClientRect().left; /**拖拽图片的left坐标**/
        const xRight = this.el.getBoundingClientRect().right; /**拖拽图片的right坐标**/
        const top = this.el.getBoundingClientRect().top; /**拖拽图片的top坐标**/
        const bottom = this.el.getBoundingClientRect().bottom; /**拖拽图片的bottom坐标**/
        const leftVectPos = posSgd.transitionPos(xLeft, top); //div左顶点 左边position 上边position
        const rightVectPos = posSgd.transitionPos(xRight, top); //div右顶点 右边position
        const bottomVectPos = posSgd.transitionPos(xLeft, bottom); //div左下顶点 下边position
        const dragId = this.el.id;
        if ($(`#getimg${num}`).css('visibility') === 'visible') {
            if (leftVectPos.x < rightx && rightVectPos.x > leftx && leftVectPos.y > bottomy && bottomVectPos.y < topy) {
                if (vm.srcArr[num].src) {
                    return;
                }
                if (vm.isMake) { 
                    const elIndex = parseInt(this.el.id.replace('dragImg', ""));
                    $(`#${getId}`).css('opacity', '1');
                    if (dragId === id) {
                        $(`#${this.el.id}`).css('visibility', 'hidden');
                        vm.srcArr[num].src = this.el.src;
                        vm.optionTextleft[num] = vm.optionText[elIndex];
                        vm.optionText[elIndex] = "";
                    } else {
                        $(`#${getId}`).css('backgroundColor', '#B17173');
                        vm.timer = setTimeout(() => {
                            $(`#${getId}`).css('opacity', '0.3');
                            $(`#${getId}`).css('backgroundColor', '#FFF');
                        }, 400);
                    }
                } else {
                    $(`#${getId}`).css('opacity', '0.8');
                }
            } else {
                if (vm.srcArr[num].src) {
                    return;
                }
                $(`#${getId}`).css('opacity', '0.3');
            }
        }
    }
    //数组排序方法
    sortBy(field: any) {
        return function(a: any, b: any) {
            return a[field] - b[field];
        };
    }
    onPan(ev: any, vm: any) {
        vm.isMake = false;
        this.opationMake(vm);
        this.transform.translate = {
            x: this.START_X + (ev.deltaX),
            y: this.START_Y + (ev.deltaY)
        };
        this.requestElementUpdate();
    }
    onPinch(ev: any) {
        if (ev.type === 'pinchstart') {
            // this.initScale = this.transform.scale || 1;
        }
        this.el.classList.remove('animate');
        // this.transform.scale = this.initScale * ev.scale;

        this.requestElementUpdate();
    }

    onRotate(ev: any) {
        if (ev.type === 'rotatestart') {
            // this.initAngle = this.transform.angle || 0;
        }
        this.el.classList.remove('animate');
        // this.transform.rz = 1;
        // this.transform.angle = this.initAngle + ev.rotation;

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
