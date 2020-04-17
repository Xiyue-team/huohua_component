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
    obj1: any;
    ow: any;
    // tslint:disable-next-line:member-ordering
    static seleteArr: any = [];

    constructor(vm: any, id: string, hitCall?: any) {

        document.querySelector('.control-panel_div_rt');
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
            this.onPan(evt, hitCall, vm);
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
        const box = document.getElementById('leftPanel').getBoundingClientRect().right;
        const userAgent = navigator.userAgent;
        const isEdge = userAgent.indexOf('Edge') > -1;
        const isIE = userAgent.indexOf('.NET') > -1;
        const op = (window as any).viewHandler.viewModel.$data.zoom1;
        if (isEdge || isIE) {
            this.obj = $('.img').height() * op;
            this.obj1 = $('.head').height() * op;
        } else {
            this.obj = $('.img').height();
            this.obj1 = $('.head').height();
        } 
        const x1 = this.el.getBoundingClientRect().left; /**拖拽图片的x坐标**/
        const x = x1 ;

        const ACQUIRE_PRICE = [];
        for (let i = 0; i < 7; i++) {
            const p = $(`#topMinDiv${i}`).find('img').attr('src'); //返回被选元素的属性值
            ACQUIRE_PRICE.push(p);
        }
        if (Math.floor(x) <= Math.floor(box)) {
            this.panAni(vm);
            this.changeBackground(vm, 0, 0);
            this.delete(vm);
            HammerDragEvent.seleteArr.push($(`#${this.el.id}`));
            $(`#${this.el.id}`).css('visibility', 'hidden');
        } else {
            $(`#${this.el.id}`).css('visibility', 'visible');
        }
    }

    //点击删除
    clickDelete() {
        HammerDragEvent.seleteArr[HammerDragEvent.seleteArr.length - 1].css('visibility', 'visible');
        HammerDragEvent.seleteArr.pop();
    }

    //重置
     clearArr() {
        HammerDragEvent.seleteArr = [];
    }

    //删除判断按钮
    delete(vm: any) {
        vm.srcArr = [];
        for (let i = 0; i < 10; i++) {
            const src = vm.minBox_Arr[i].find('img').attr('src');
            vm.srcArr.push(src);
          }
        if (!vm.srcArr[0]) {
            vm.deleteArr[0].css('visibility', 'visible');
        } else if (!vm.srcArr[1]) {
            vm.deleteArr[0].css('visibility', 'hidden');
            vm.deleteArr[1].css('visibility', 'visible');
        } else if (!vm.srcArr[2]) {
            vm.deleteArr[1].css('visibility', 'hidden');
            vm.deleteArr[2].css('visibility', 'visible');  
        } else if (!vm.srcArr[3]) {
            vm.deleteArr[2].css('visibility', 'hidden');
            vm.deleteArr[3].css('visibility', 'visible'); 
        } else if (!vm.srcArr[4]) {
            vm.deleteArr[3].css('visibility', 'hidden');
            vm.deleteArr[4].css('visibility', 'visible'); 
        } else if (!vm.srcArr[5]) {
            vm.deleteArr[4].css('visibility', 'hidden');
            vm.deleteArr[5].css('visibility', 'visible'); 
        } else if (!vm.srcArr[6]) {
            vm.deleteArr[5].css('visibility', 'hidden');
            vm.deleteArr[6].css('visibility', 'visible'); 
        } else if (!vm.srcArr[7]) {
            vm.deleteArr[6].css('visibility', 'hidden');
            vm.deleteArr[7].css('visibility', 'visible'); 
        } else if (!vm.srcArr[8]) {
            vm.deleteArr[7].css('visibility', 'hidden');
            vm.deleteArr[8].css('visibility', 'visible'); 
        } else if (!vm.srcArr[9]) {
            vm.deleteArr[8].css('visibility', 'hidden');
            vm.deleteArr[9].css('visibility', 'visible'); 
        }
    }

    changeBackground(vm: any, index: any, num: number) {
        const elIndex = this.el.id.replace('image', '');
        const tasks_arrows = $('#topMinDiv20').find('img').attr('src');
        const batterylow_arrows = $('#topMinDiv22').find('img').attr('src');
        const ACQUIRE_PRICE = [];
        const ACQUIRE_PRICE1 = [];
        for (let i = 0; i < 7; i += 2) {
            const p = $(`#topMinDiv${i}`).find('img').attr('src');
            const q = $(`#topMinDiv1${i}`).find('img').attr('src');
            ACQUIRE_PRICE.push(p);
            ACQUIRE_PRICE1.push(q);
        }
        if (ACQUIRE_PRICE[0] === '') {
            vm.imgArr[0].src = vm.allImagArr[elIndex];
            vm.imgArr[0].text = vm.textArr[elIndex];
        } else if (ACQUIRE_PRICE[1] === '') {
            vm.imgArr[2].src = vm.allImagArr[elIndex];
            vm.imgArr[2].text = vm.textArr[elIndex];
            vm.allradey = true;
        } else if (ACQUIRE_PRICE[2] === '') {
            vm.imgArr[4].src = vm.allImagArr[elIndex];
            vm.imgArr[4].text = vm.textArr[elIndex];
        } else if (ACQUIRE_PRICE[3] === '') {
            vm.imgArr[6].src = vm.allImagArr[elIndex];
            vm.imgArr[6].text = vm.textArr[elIndex];
        } else if (ACQUIRE_PRICE1[3] === '') {
            vm.imgArr1[6].src = vm.allImagArr[elIndex];
            vm.imgArr1[6].text = vm.textArr[elIndex];   
        } else if (ACQUIRE_PRICE1[2] === '') {
            vm.imgArr1[4].src = vm.allImagArr[elIndex];
            vm.imgArr1[4].text = vm.textArr[elIndex];
        } else if (ACQUIRE_PRICE1[1] === '') {
            vm.imgArr1[2].src = vm.allImagArr[elIndex];
            vm.imgArr1[2].text = vm.textArr[elIndex];
        } else if (ACQUIRE_PRICE1[0] === '') {
            vm.imgArr1[0].src = vm.allImagArr[elIndex];
            vm.imgArr1[0].text = vm.textArr[elIndex];
        } else if (tasks_arrows === '') {
            vm.imgArr2[0].src = vm.allImagArr[elIndex];
            vm.imgArr2[0].text = vm.textArr[elIndex];
        } else if (batterylow_arrows === '') {
            vm.imgArr2[2].src = vm.allImagArr[elIndex];
            vm.imgArr2[2].text = vm.textArr[elIndex]; 
        }
    }

    //判断开始拖动
    panAni(vm: any) {
        const ACQUIRE_PRICE = [];
        const ACQUIRE_PRICE1 = [];
        
        const tasks_arrows = $('#topMinDiv20').find('img').attr('src');
        const batterylow_arrows = $('#topMinDiv22').find('img').attr('src');
        for (let i = 0; i < 7; i += 2) {
            const p = $(`#topMinDiv${i}`).find('img').attr('src');
            const q = $(`#topMinDiv1${i}`).find('img').attr('src');
            ACQUIRE_PRICE.push(p);
            ACQUIRE_PRICE1.push(q);
        }
        const box = document.getElementById('leftPanel').getBoundingClientRect().right;
        const x = this.el.getBoundingClientRect().left; /**拖拽图片的x坐标**/
        if (Math.floor(x) <= Math.floor(box) && ACQUIRE_PRICE[0] === '') {
            $('#topMinDiv0').css('opacity', '1');
        } else if (Math.floor(x) <= Math.floor(box) && ACQUIRE_PRICE[1] === '') {
            $('#topMinDiv1').css('opacity', '1');
            $('#topMinDiv2').css('opacity', '1');
        } else if (Math.floor(x) <= Math.floor(box) && ACQUIRE_PRICE[2] === '') {
            $('#topMinDiv4').css('opacity', '1');
            $('#topMinDiv3').css('opacity', '1');
        } else if (Math.floor(x) <= Math.floor(box) && ACQUIRE_PRICE[3] === '') {
            $('#topMinDiv6').css('opacity', '1');
            $('#topMinDiv5').css('opacity', '1');
        } else if (Math.floor(x) <= Math.floor(box) && ACQUIRE_PRICE1[3] === '') {
            $('#topMinDiv16').css('opacity', '1');
            vm.caseShow1 = true;
        } else if (Math.floor(x) <= Math.floor(box) && ACQUIRE_PRICE1[2] === '') {
            $('#topMinDiv14').css('opacity', '1');
            $('#topMinDiv15').css('opacity', '1');
        } else if (Math.floor(x) <= Math.floor(box) && ACQUIRE_PRICE1[1] === '') {
            $('#topMinDiv12').css('opacity', '1');
            $('#topMinDiv13').css('opacity', '1');
        } else if (Math.floor(x) <= Math.floor(box) && ACQUIRE_PRICE1[0] === '') {
            $('#topMinDiv10').css('opacity', '1');
            $('#topMinDiv11').css('opacity', '1');
            $('#batterylow_arrows').css('opacity', '1');
        } else if (Math.floor(x) <= Math.floor(box) && tasks_arrows === '') {
            vm.caseShow2 = true;
            $('#topMinDiv20').css('opacity', '1');
        } else if (Math.floor(x) <= Math.floor(box) && batterylow_arrows === '') {
            $('#topMinDiv21').css('opacity', '1');
            $('#topMinDiv22').css('opacity', '1');
        } else if (Math.floor(x) > Math.floor(box) && ACQUIRE_PRICE[0] === '') {
            $('#topMinDiv0').css('opacity', '0');
        } else if (Math.floor(x) > Math.floor(box) && ACQUIRE_PRICE[1] === '') {
            $('#topMinDiv2').css('opacity', '0');
            $('#topMinDiv1').css('opacity', '0');
        } else if (Math.floor(x) > Math.floor(box) && ACQUIRE_PRICE[2] === '') {
            $('#topMinDiv4').css('opacity', '0');
            $('#topMinDiv3').css('opacity', '0');
        } else if (Math.floor(x) > Math.floor(box) && ACQUIRE_PRICE[3] === '') {
            $('#topMinDiv6').css('opacity', '0');
            $('#topMinDiv5').css('opacity', '0');
        } else if (Math.floor(x) > Math.floor(box) && ACQUIRE_PRICE1[3] === '') {
            $('#topMinDiv16').css('opacity', '0');
            vm.caseShow1 = false;
        } else if (Math.floor(x) > Math.floor(box) && ACQUIRE_PRICE1[2] === '') {
            $('#topMinDiv14').css('opacity', '0');
            $('#topMinDiv15').css('opacity', '0');
        } else if (Math.floor(x) > Math.floor(box) && ACQUIRE_PRICE1[1] === '') {
            $('#topMinDiv12').css('opacity', '0');
            $('#topMinDiv13').css('opacity', '0');
        } else if (Math.floor(x) > Math.floor(box) && ACQUIRE_PRICE1[0] === '') {
            $('#topMinDiv10').css('opacity', '0');
            $('#topMinDiv11').css('opacity', '0');
            $('#batterylow_arrows').css('opacity', '0');
        } else if (Math.floor(x) > Math.floor(box) && tasks_arrows === '') {
            $('#topMinDiv20').css('opacity', '0');
            vm.caseShow2 = false;
        } else if (Math.floor(x) > Math.floor(box) && batterylow_arrows === '') {
            $('#topMinDiv22').css('opacity', '0');
            $('#topMinDiv21').css('opacity', '0');
        }
    }

    onPan(ev: any, hitCall: any, vm: any) {
        (window as any).viewHandler.viewModel.$data.tishi = false;
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
        this.panAni(vm);
        this.requestElementUpdate();
    }

    reset() {
        for (let i = 0; i < 10; i++) {
            $(`#image${i}`).css('visibility', 'visible');
            
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
