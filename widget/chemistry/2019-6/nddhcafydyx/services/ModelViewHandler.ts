import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
export class ModelViewHandler extends CommonViewHandler implements ViewHandler {
    // 设置定时器变量
    timer: any;
    timer1: any;
    timer2: any;
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
    }
    resize(): void {
        super.resize();
    }
    // 点击按钮事件
    getEvent1(index: number) {
        if (index === 1) {
            this.pictureShow();
            (this.viewModel as any).active1 = true;
        } else if (index === 2) {
            this.pictureShow();
            (this.viewModel as any).active2 = true;
        } else if (index === 3) {
            this.pictureShow();
            (this.viewModel as any).active3 = true;
        }
        (this.viewModel as any).show3 = true;
        (this.viewModel as any).show4 = true;
        this.changeEvent();
        this.twinkleEvent();
    }
    //控制正逆反应变化曲线显示函数
    changeEvent () {
        const blackCover = document.getElementById('blackCover');
        // 正在反应时的反应速度
        const timeFun = () => {
            if ((this.viewModel as any).widthNumber < 437) {
                cancelAnimationFrame(this.timer1);
                (this.viewModel as any).show3 = true;
                (this.viewModel as any).show4 = false;
                document.getElementById('text1').style.opacity = '1';
                //控制达到平衡后线条的显示进度速度
                const timeFun1 = () => {
                    if ((this.viewModel as any).widthNumber < 8) {
                        clearTimeout(this.timer2);
                        return;
                    }
                    if ((this.viewModel as any).widthNumber < 260) {
                        if ((this.viewModel as any).active1 === true) {
                            (this.viewModel as any).show1 = true;
                        } else if ((this.viewModel as any).active2 === true) {
                            (this.viewModel as any).show2 = true;
                        } else if ((this.viewModel as any).active3 === true) {
                            (this.viewModel as any).show5 = true;
                        }
                    }
                    (this.viewModel as any).widthNumber --;
                    blackCover.style.width = (this.viewModel as any).widthNumber + 'px';
                    this.timer2 = setTimeout(timeFun, 12);
                };
                timeFun1();
                clearTimeout(this.timer);
                return;
            }
            (this.viewModel as any).widthNumber --;
            blackCover.style.width = (this.viewModel as any).widthNumber + 'px';
            this.timer = setTimeout(timeFun, 36);
        };
        timeFun();
    }
    //控制添加分子后提示图片闪烁的事件
    twinkleEvent () {
        const text1 = document.getElementById('text1');
        const text2 = document.getElementById('text2');
        text1.style.opacity = '1';
        text2.style.opacity = '1';
        const op = 0.016;
        let tou = 1;
        const thiz = this;
        function animate() {
            tou -= op;
            text1.style.opacity = String(tou);
            text2.style.opacity = String(tou);
            if (text1.style.opacity < '0.1') {
                tou = 1;
            }
            thiz.timer1 = requestAnimationFrame(animate);
        }
        animate();
    }
    // 重置各图片的显示隐藏及取消定时器事件
    pictureShow () {
        (this.viewModel as any).active1 = false;
        (this.viewModel as any).active2 = false;
        (this.viewModel as any).active3 = false;
        (this.viewModel as any).show2 = false;
        (this.viewModel as any).show1 = false;
        (this.viewModel as any).show3 = false;
        (this.viewModel as any).show4 = false;
        (this.viewModel as any).show5 = false;
        (this.viewModel as any).widthNumber = 530;
        clearTimeout(this.timer);
        clearTimeout(this.timer2);
        cancelAnimationFrame(this.timer1);
        document.getElementById('blackCover').style.width = 530 + 'px';
    }
    //重置事件
    reset(): void {
        this.pictureShow();
    }

}
