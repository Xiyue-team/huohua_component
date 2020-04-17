import { CommonViewHandler } from '../../../../../src/core/CommonViewHandler';
import { ViewHandler } from '../../../../../src/core/CoreInterface';
import { Vue } from 'vue/types/vue';
import { ViewController } from '../../../../../src/core/ViewController';
export class ModelViewHandler extends CommonViewHandler implements ViewHandler {
    timer: any;
    // 控制循环播放的定时器
    timer1: any;
    timer2: any;
    timer3: any;
    timer4: any;
    // 预加载图片组
    imgArr: any = [];
    imgArr1: any = [];
    //图片预加载
    preload() {
        for (let i = 1; i <= 152; i++) {
            const img = require(`../sub_static/UI/imgsArr1/${i}.png`);
            this.imgArr.push(img);
        }
        for (let i = 1; i <= 152; i++) {
            const img = require(`../sub_static/UI/imgsArr2/${i}.png`);
            this.imgArr1.push(img);
        }
        for (const img of this.imgArr) {
            const image = new Image();
            image.src = img;
        }
        for (const img of this.imgArr1) {
            const image = new Image();
            image.src = img;
        }
    }
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
        this.preload();
        this.playXhEvent(0, 19, 150, this.imgArr);
    }

    resize(): void {
        super.resize();
    }
    //切换物质种类播放对应的分子动画
    changeThing(val: number) {
        this.clearTimer();
        if (val === 1) {
            this.playXhEvent(0, 19, 150, this.imgArr);
        } else {
            this.playXhEvent(0, 19, 150, this.imgArr1);
        }
    }

    // 点击按钮事件
    getEvent1(index: number) {
        if (index === 0) {
            this.buttonEvent((this.viewModel as any).active1);
            (this.viewModel as any).active1 = true;
            this.riseTemNum(1);
        } else if (index === 1) {
            this.buttonEvent((this.viewModel as any).active2);
            (this.viewModel as any).active2 = true;
            clearTimeout(this.timer);
        } else if (index === 2) {
            this.buttonEvent((this.viewModel as any).active3);
            (this.viewModel as any).active3 = true;
            this.riseTemNum(2);
        }
    }
    // 改变温度条函数
    riseTemNum(val: number) {
        clearTimeout(this.timer);
        const timeFun = () => {
            if ((this.viewModel as any).heightNum >= 255) {
                clearTimeout(this.timer);
                (this.viewModel as any).heightNum = 254;
                return;
            } else if ((this.viewModel as any).heightNum <= 0) {
                (this.viewModel as any).heightNum = 1;
                clearTimeout(this.timer);
                return;
            }
            if (val === 1) {
                (this.viewModel as any).heightNum++;
            } else {
                (this.viewModel as any).heightNum--;
            }
            this.timer = setTimeout(timeFun, 100);
        };
        timeFun();
    }
    // 稳定状态下循环播放动画函数
    playXhEvent(val: number, val1: number, timer: number, imgArr: any) {
        let value = val;
        const thiz = this;
        function add() {
            value++;
            (thiz.viewModel as any).reactionImg = imgArr[value];
            if (value >= val1) {
                clearInterval(thiz.timer1);
                thiz.timer2 = setInterval(sub, timer);
            }
        }
        function sub() {
            value--;
            (thiz.viewModel as any).reactionImg = imgArr[value];
            if (value <= val) {
                clearInterval(thiz.timer2);
                thiz.timer1 = setInterval(add, timer);
            }
        }
        thiz.timer1 = setInterval(add, timer);
    }
    // 稳定状态下循环播放动画函数
    playXhEvent1(val: number, val1: number, timer: number, imgArr: any) {
        let value = val;
        const thiz = this;
        function add() {
            value++;
            (thiz.viewModel as any).reactionImg = imgArr[value];
            if (value >= val) {
                clearInterval(thiz.timer1);
                thiz.timer2 = setInterval(sub, timer);
            }
        }
        function sub() {
            value--;
            (thiz.viewModel as any).reactionImg = imgArr[value];
            if (value <= val1) {
                clearInterval(thiz.timer2);
                thiz.timer1 = setInterval(add, timer);
            }
        }
        thiz.timer2 = setInterval(sub, timer);
    }
    // 点击升温状态分子反应函数
    playPassEvent(val: number, val1: number, val2: number) {
        let value = val;
        const thiz = this;
        clearInterval(thiz.timer1);
        clearInterval(thiz.timer2);
        clearInterval(thiz.timer4);
        function add() {
            value++;
            if ((thiz.viewModel as any).show1) {
                (thiz.viewModel as any).reactionImg = thiz.imgArr[value];
            } else {
                (thiz.viewModel as any).reactionImg = thiz.imgArr1[value];
            }
            if (value >= val1) {
                clearInterval(thiz.timer3);
                if ((thiz.viewModel as any).show1) {
                    thiz.playXhEvent(val1 + 1, val2, 150, thiz.imgArr);
                } else {
                    thiz.playXhEvent(val1 + 1, val2, 150, thiz.imgArr1);
                }
            }
        }
        thiz.timer3 = setInterval(add, 150);
    }
    // 点击降温分子反应函数
    playPassFEvent(val: number, val1: number, val2: number, ) {
        let value = val;
        const thiz = this;
        clearInterval(thiz.timer1);
        clearInterval(thiz.timer2);
        clearInterval(thiz.timer3);
        function reduce() {
            value--;
            if ((thiz.viewModel as any).show1) {
                (thiz.viewModel as any).reactionImg = thiz.imgArr[value];
            } else {
                (thiz.viewModel as any).reactionImg = thiz.imgArr1[value];
            }
            if (value <= val1) {
                clearInterval(thiz.timer4);
                if ((thiz.viewModel as any).show1) {
                    thiz.playXhEvent1(val1 - 1, val2, 150, thiz.imgArr);
                } else {
                    thiz.playXhEvent1(val1 - 1, val2, 150, thiz.imgArr1);
                }
            }
        }
        thiz.timer4 = setInterval(reduce, 150);
    }
    // 点击不同按钮触发的事件函数
    buttonEvent(act: any) {
        if (act === true) {
            return;
        }
        (this.viewModel as any).active1 = false;
        (this.viewModel as any).active2 = false;
        (this.viewModel as any).active3 = false;
    }
    // 清除定时器
    clearTimer() {
        clearInterval(this.timer1);
        clearInterval(this.timer2);
        clearTimeout(this.timer);
        (this.viewModel as any).active1 = false;
        (this.viewModel as any).active2 = true;
        (this.viewModel as any).active3 = false;
        clearInterval(this.timer3);
        clearInterval(this.timer4);
    }
    //重置
    reset(): void {
        (this.viewModel as any).reset();
        (this.viewModel as any).show1 = true;
        (this.viewModel as any).show2 = false;
        this.clearTimer();
        this.playXhEvent(0, 19, 150, this.imgArr);
    }

}
