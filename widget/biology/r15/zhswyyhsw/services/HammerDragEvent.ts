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
    obj: any;
    letter: any;

    constructor(vm: any, id: string, hitCall?: any) {

        document.querySelector('.control-panel_div_rt');
        this.el = document.getElementById(id);

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
            this.onPan(evt, hitCall);
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
        mc.on('panend', (evt) => {
            /**设置目标容器位置**/
            const userAgent = navigator.userAgent;
            const isEdge = userAgent.indexOf('Edge') > -1;
            const isIE = userAgent.indexOf('.NET') > -1;
            const op = (window as any).viewHandler.viewModel.$data.zoom1;
        if (isEdge || isIE) {
            const HORIZONTAL_BOX1 = document.getElementById('box1').getBoundingClientRect().left;
            const VERTICAL_BOX1 = $('.box1').height() * op;
            const VERTICAL_BOX1_WIDTH = $('.box1').width() * op;
            const VERTICAL_BOX1_HEIGHT = document.getElementById('box1').getBoundingClientRect().top;
        
            const HORIZONTAL_BOX2 = document.getElementById('box2').getBoundingClientRect().left;
            const VERTICAL_BOX2 = $('.box2').height() * op;
            const VERTICAL_BOX2_WIDTH = $('.box2').width() * op;
            const VERTICAL_BOX2_WIDTH_HEIGHT = document.getElementById('box2').getBoundingClientRect().top;
            const BOX_WIDTH = $('.img').width() * 1.2 * op;

            this.obj = {
                box1: {
                    minOffsetLeft: HORIZONTAL_BOX1 - BOX_WIDTH,
                    minOffsetTop: VERTICAL_BOX1_HEIGHT - BOX_WIDTH,
                    maxOffsetLeft: HORIZONTAL_BOX1 + VERTICAL_BOX1_WIDTH,
                    maxOffsetTop: VERTICAL_BOX1_HEIGHT + VERTICAL_BOX1
                },
                box2: {
                    minOffsetLeft: HORIZONTAL_BOX2 - BOX_WIDTH,
                    minOffsetTop: VERTICAL_BOX2_WIDTH_HEIGHT - BOX_WIDTH,
                    maxOffsetLeft: HORIZONTAL_BOX2  + VERTICAL_BOX2_WIDTH  ,
                    maxOffsetTop: VERTICAL_BOX2_WIDTH_HEIGHT  + VERTICAL_BOX2  ,
                },
            };
        } else {
            const HORIZONTAL_BOX1 = document.getElementById('box1').getBoundingClientRect().left;
            const VERTICAL_BOX1 = $('.box1').height();
            const VERTICAL_BOX1_WIDTH = $('.box1').width();
            const VERTICAL_BOX1_HEIGHT = document.getElementById('box1').getBoundingClientRect().top;
            
            const HORIZONTAL_BOX2 = document.getElementById('box2').getBoundingClientRect().left;
            const VERTICAL_BOX2 = $('.box2').height();
            const VERTICAL_BOX2_WIDTH = $('.box2').width();
            const VERTICAL_BOX2_WIDTH_HEIGHT = document.getElementById('box2').getBoundingClientRect().top;
            const BOX_WIDTH = $('.img').width() * 1.2;

            this.obj = {
                box1: {
                    minOffsetLeft: HORIZONTAL_BOX1 - BOX_WIDTH,
                    minOffsetTop: VERTICAL_BOX1_HEIGHT - BOX_WIDTH,
                    maxOffsetLeft: HORIZONTAL_BOX1 + VERTICAL_BOX1_WIDTH,
                    maxOffsetTop: VERTICAL_BOX1_HEIGHT + VERTICAL_BOX1
                },
                box2: {
                    minOffsetLeft: HORIZONTAL_BOX2 - BOX_WIDTH,
                    minOffsetTop: VERTICAL_BOX2_WIDTH_HEIGHT - BOX_WIDTH,
                    maxOffsetLeft: HORIZONTAL_BOX2  + VERTICAL_BOX2_WIDTH  ,
                    maxOffsetTop: VERTICAL_BOX2_WIDTH_HEIGHT  + VERTICAL_BOX2  ,
                },
            };
        }
            const x1 = this.el.getBoundingClientRect().left; /**拖拽图片的x坐标**/
            const y1 = this.el.getBoundingClientRect().top; /**拖拽图片的y坐标**/
            const x = x1 ;
            const y = y1 ;
            /* tslint:disable:no-bitwise */
            const ACQUIRE_PRICE = [];
            for (let i = 0; i < 5; i++) {
                const p = $(`#leftMinDiv${i}`).find('img').attr('src');
                ACQUIRE_PRICE.push(p);
            }
            if (x > this.obj.box1.minOffsetLeft && y > this.obj.box1.minOffsetTop &&
                x < this.obj.box1.maxOffsetLeft && y < this.obj.box1.maxOffsetTop &&
                ~['image0', 'image1', 'image6', 'image8', 'image9'].indexOf(this.el.id)) {
                    if (ACQUIRE_PRICE[0] === '') {
                        this.changeBackground(vm , 0, 0);
                    }
                    if (ACQUIRE_PRICE[0] !== '') {
                        this.coverChange(vm, 0);
                    }

            }
            if (x > this.obj.box1.minOffsetLeft && x < this.obj.box1.maxOffsetLeft &&
                y > this.obj.box1.minOffsetTop && y < this.obj.box1.maxOffsetTop &&
                ~['image2', 'image3', 'image4', 'image5', 'image7'].indexOf(this.el.id)) {
                this.backBackground(0);
            }

            const ACQUIRE_PRICE_RIGHT = [];
            for (let i = 0; i < 5; i++) {
                const p = $(`#rightMinDiv${i}`).find('img').attr('src');
                ACQUIRE_PRICE_RIGHT.push(p);
            }
            if (x > this.obj.box2.minOffsetLeft &&
                x < this.obj.box2.maxOffsetLeft && y > this.obj.box2.minOffsetTop &&
                y < this.obj.box2.maxOffsetTop &&
                ~['image2', 'image3', 'image4', 'image5', 'image7'].indexOf(this.el.id)) {
                if (ACQUIRE_PRICE_RIGHT[0] === '') {
                    this.changeBackground(vm , 0, 1);
                }
                if (ACQUIRE_PRICE_RIGHT[0] !== '') {
                    this.coverChange(vm, 1);
                }
            }
            if (x > this.obj.box2.minOffsetLeft &&
                x < this.obj.box2.maxOffsetLeft && y > this.obj.box2.minOffsetTop &&
                y < this.obj.box2.maxOffsetTop &&
                ~['image0', 'image1', 'image6', 'image8', 'image9'].indexOf(this.el.id)) {
                this.backBackground(1);
            }
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

    changeBackground (vm: any, index: any, num: number) {
        const elIndex = this.el.id.replace('image', '');
        if (num === 0) {
            vm.imgArr[index].src = vm.allImagArr[elIndex];
            vm.imgArr[index].text = vm.textArr[elIndex];

            setTimeout(() => {
                $('.box1').css({
                    backgroundColor: '#E6E6E6'
                });
                setTimeout(() => {
                        $('.box1').css({
                            backgroundColor: '#E0F3FF'
                        });
                    }
                );
                setTimeout(() => {{
                    $('.box1').css({
                        backgroundColor: '#F6F6F6'
                    });
                }}, 600);
            });
        } else {
            vm.imgArr1[index].src = vm.allImagArr[elIndex];
            vm.imgArr1[index].text = vm.textArr[elIndex];

            setTimeout(() => {
                $('.box2').css({
                    backgroundColor: '#E6E6E6'
                });
                setTimeout(() => {
                        $('.box2').css({
                            backgroundColor: '#E0F3FF'
                        });
                    }
                );
                setTimeout(() => {{
                    $('.box2').css({
                        backgroundColor: '#F6F6F6'
                    });
                }}, 600);
            });
        }
        $(`#${this.el.id}`).css('opacity', '0');
        $(`#${this.el.id}`).next().find('.textTexee').css({opacity: '0'});
    }

    coverChange (vm: any, numb: number) {
        if (numb === 0) {
            const ACQUIRE_PRICE = [];
            for (let i = 0; i < 5; i++) {
                const p = $(`#leftMinDiv${i}`).find('img').attr('src');
                ACQUIRE_PRICE.push(p);
            }
            if ( ACQUIRE_PRICE[0] === '') {
                this.changeBackground(vm , 0, 0);
            } else if ( ACQUIRE_PRICE[1] === '') {
                this.changeBackground(vm , 1, 0);
            } else if (ACQUIRE_PRICE[2] === '') {
                this.changeBackground(vm , 2, 0);
            } else if (ACQUIRE_PRICE[3] === '') {
                this.changeBackground(vm , 3, 0);
            } else if (ACQUIRE_PRICE[4] === '') {
                this.changeBackground(vm , 4, 0);
            }
        }
        if (numb === 1) {
            const ACQUIRE_PRICE_RIGHT = [];
            for (let i = 0; i < 5; i++) {
                const p = $(`#rightMinDiv${i}`).find('img').attr('src');
                ACQUIRE_PRICE_RIGHT.push(p);
                if ( ACQUIRE_PRICE_RIGHT[0] === '') {
                    this.changeBackground(vm , 0, 1);
                } else if ( ACQUIRE_PRICE_RIGHT[1] === '') {
                    this.changeBackground(vm , 1, 1);
                } else if (ACQUIRE_PRICE_RIGHT[2] === '') {
                    this.changeBackground(vm , 2, 1);
                } else if (ACQUIRE_PRICE_RIGHT[3] === '') {
                    this.changeBackground(vm , 3, 1);
                } else if (ACQUIRE_PRICE_RIGHT[4] === '') {
                    this.changeBackground(vm , 4, 1);
                }
            }
        }

    }

    backBackground (num: number) {
            if (num === 0 ) {
                setTimeout(() => {
                    $('.box1').css({
                        backgroundColor: '#FFCBCB'
                    });
                    setTimeout(() => {
                        $('.box1').css({
                            backgroundColor: '#F6F6F6'
                        });
                    }, 400 );
                });
            } else {
                setTimeout(() => {
                    $('.box2').css({
                        backgroundColor: '#FFCBCB'
                    });
                    setTimeout(() => {
                        $('.box2').css({
                            backgroundColor: '#F6F6F6'
                        });
                    }, 400 );
                });
            }
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

    onPress() {
        this.transform.scale = 1.2;
        this.requestElementUpdate();
    }

    onPan(ev: any, hitCall: any) {
        //this.el.className = '';
        this.el.classList.remove('animate');
        const userAgent = navigator.userAgent;
        const isEdge = userAgent.indexOf('Edge') > -1;
        const isIE = userAgent.indexOf('.NET') > -1;
        if (isEdge || isIE) {
            this.transform.translate = {
                x: this.START_X + ev.deltaX,
                y: this.START_Y + ev.deltaY
            };
        } else {
            this.transform.translate = {
                x: this.START_X + (ev.deltaX / (window as any).viewHandler.viewModel.$data.zoom1),
                y: this.START_Y + (ev.deltaY / (window as any).viewHandler.viewModel.$data.zoom1)
            };
        }
        hitCall(this.el.getBoundingClientRect().left, this.el.getBoundingClientRect().top);

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
        // this.transform.rx = 1;
        // this.transform.angle = 25;
        this.transform.scale = 1.2;

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
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
