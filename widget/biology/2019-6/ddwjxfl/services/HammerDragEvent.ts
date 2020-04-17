/**
 * 拖拽事件类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/5/21 10:22
 */
import * as Hammer from 'hammerjs';
import $ from 'jquery-ts';
export class HammerDragEvent {
    transform: any;
    el: any;
    timer: any;
    ticking = false;
    START_X: any;
    START_Y: any;
    initScale = 1;
    initAngle = 0;
    letter: any;
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
            this.onPan(evt, vm);
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

    onPress() {
        this.requestElementUpdate();
    }
    //拖拽事件
    onPanend(vm: any) {
        clearTimeout(vm.timer);
        vm.isMake = true;
        this.opationMake(vm);
    }

    opationMake(dom: any) {
        this.retroactionPanend(-240, -211, -39, -99, 'index4', 'imgbox1', dom, 1);
        this.retroactionPanend(-204, -175, -39, -99, 'index11', 'imgbox2', dom, 2);
        this.retroactionPanend(-168, -139, -39, -99, 'index8', 'imgbox3', dom, 3);
        this.retroactionPanend(-133, -104, -39, -99, 'index2', 'imgbox4', dom, 4);
        this.retroactionPanend(-99, -70, -39, -99, 'index5', 'imgbox5', dom, 5);
        this.retroactionPanend(-63, -34, -39, -99, 'index9', 'imgbox6', dom, 6);
        this.retroactionPanend(-23, 5, -39, -99, 'index10', 'imgbox7', dom, 7);
        this.retroactionPanend(13, 42, -39, -99, 'index7', 'imgbox8', dom, 8);
        this.retroactionPanend(50, 80, -39, -99, 'index1', 'imgbox9', dom, 9);
        this.retroactionPanend(86, 117, -39, -99, 'index3', 'imgbox10', dom, 10);
        this.retroactionPanend(124, 154, -39, -99, 'index6', 'imgbox11', dom, 11);
    }
    retroactionPanend(leftx: number, rightx: number, topy: number, bottomy: number,
        id: string, imgId: string, vm: any, num: number) {
        const posSgd = (window as any).viewHandler.viewModel;
        const xLeft = this.el.getBoundingClientRect().left * posSgd.zoom1; /**拖拽图片的left坐标**/
        const xRight = this.el.getBoundingClientRect().right * posSgd.zoom1; /**拖拽图片的right坐标**/
        const top = this.el.getBoundingClientRect().top * posSgd.zoom1; /**拖拽图片的top坐标**/
        const bottom = this.el.getBoundingClientRect().bottom * posSgd.zoom1; /**拖拽图片的bottom坐标**/
        const leftVectPos = posSgd.transitionPos(xLeft, top); //div左顶点 左边position 上边position
        const rightVectPos = posSgd.transitionPos(xRight, top); //div右顶点 右边position
        const bottomVectPos = posSgd.transitionPos(xLeft, bottom); //div左下顶点 下边position
        //    console.info(leftVectPos,rightVectPos,bottomVectPos);
        const indexId = this.el.id;
        if ($(`#imgbox${num}`).css('visibility') === 'visible') {
            if (leftVectPos.x < rightx && rightVectPos.x > leftx && leftVectPos.y > bottomy && bottomVectPos.y < topy) {
                if (vm.srcArr[num].src) {
                    return;
                }
                if (vm.isMake) {
                    const elIndex = parseInt(this.el.id.replace('index', ""));

                    $(`#${imgId}`).css('opacity', '1');
                    if (indexId === id) {

                        $(`#${this.el.id}`).css('visibility', 'hidden');
                        vm.srcArr[num].src = this.el.src;
                        vm.optionTextleft[num - 1] = vm.buttonBox1[elIndex - 1].name;
                        vm.buttonBox1[elIndex - 1].name = "";
                        const W = window.innerWidth;
                        if (W > 730) {
                            $(`#${this.el.id}`).css('visibility', 'hidden');
                        } else {
                            $(`#${this.el.id}`).parent().hide(); //实现自动滚动
                        }
                    } else {
                        $(`#${imgId}`).css('backgroundColor', '#B17173');
                        vm.timer = setTimeout(() => {
                            $(`#${imgId}`).css('opacity', '0.3');
                            $(`#${imgId}`).css('backgroundColor', '#FFF');
                        }, 400);
                    }
                } else {
                    $(`#${imgId}`).css('opacity', '0.8');
                }
            } else {
                if (vm.srcArr[num].src) {
                    return;
                }
                $(`#${imgId}`).css('opacity', '0.3');
            }
        }

    }
    sortBy(field: any) {
        return function (a: any, b: any) {
            return a[field] - b[field];
        };
    }
    onPan(ev: any, vm: any) {
        const userAgent = navigator.userAgent;
        const isEdge = userAgent.indexOf('Edge') > -1;
        const isIE = userAgent.indexOf('.NET') > -1;
        vm.isMake = false;
        this.opationMake(vm);
        if (isEdge || isIE) {
            this.transform.translate = {
                x: this.START_X + ev.deltaX,
                y: this.START_Y + ev.deltaY
            };
        } else {
            this.transform.translate = {
                x: (this.START_X + ev.deltaX) / (window as any).viewHandler.viewModel.$data.zoom1,
                y: (this.START_Y + ev.deltaY) / (window as any).viewHandler.viewModel.$data.zoom1
            };
        }
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
