import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
import $ from 'jquery-ts';
export class ModelViewHandler extends CommonViewHandler implements ViewHandler {
    // 设置定时器变量
    timer: any;
    timer1: any;
    timer2: any;
    // 获取顶部反应方向提示图片
    textDirection = document.getElementsByClassName('text1');
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
        this.hiddenBtn();
        this.pictureShow();
        if (index === 1) {
            (this.viewModel as any).active1 = true;
            (this.viewModel as any).show3 = true;
            $('#reactionBoxChj').css('display', 'block');
            this.changeEvent(1, 25, 8);
            this.twinkleEvent(0);
        } else if (index === 2) {
            (this.viewModel as any).active2 = true;
            $('#wenDu').css('display', 'block');
            $('#reactionBoxWd').css('display', 'block');
        } else if (index === 3) {
            (this.viewModel as any).active3 = true;
            $('#yaQiang').css('display', 'block');
            $('#reactionBoxYq').css('display', 'block');
        } else if (index === 4) {
            (this.viewModel as any).active4 = true;
            $('#nongDu').css('display', 'block');
            $('#reactionBoxNd').css('display', 'block');
        }

    }
    // 子按钮点击按钮事件
    getSonEvent1(index: number) {
        this.pictureShow();
        (this.viewModel as any).show3 = true;
        switch (index) {
            case 1:
                (this.viewModel as any).btn1 = true;
                (this.viewModel as any).textShow3 = true;
                this.twinkleEvent(2);
                break;
            case 2:
                (this.viewModel as any).btn2 = true;
                (this.viewModel as any).textShow2 = true;
                this.twinkleEvent(1);
                break;
            case 3:
                (this.viewModel as any).btn3 = true;
                (this.viewModel as any).textShow2 = true;
                this.twinkleEvent(1);
                break;
            case 4:
                (this.viewModel as any).btn4 = true;
                (this.viewModel as any).textShow3 = true;
                this.twinkleEvent(2);
                break;
            case 5:
                (this.viewModel as any).btn5 = true;
                (this.viewModel as any).textShow2 = true;
                this.twinkleEvent(1);
                break;
            case 6:
                (this.viewModel as any).btn6 = true;
                (this.viewModel as any).textShow2 = true;
                this.twinkleEvent(1);
                break;
            case 7:
                (this.viewModel as any).btn7 = true;
                (this.viewModel as any).textShow3 = true;
                this.twinkleEvent(2);
                break;
        }
        this.changeEvent(2, 36, 12, );
    }
    // 重置按钮隐藏及激活事件
    hiddenBtn () {
        // 子按钮
        $('#wenDu').css('display', 'none');
        $('#yaQiang').css('display', 'none');
        $('#nongDu').css('display', 'none');
        //父按钮
        (this.viewModel as any).active1 = false;
        (this.viewModel as any).active2 = false;
        (this.viewModel as any).active3 = false;
        (this.viewModel as any).active4 = false;
        // 反应区
        $('#reactionBoxChj').css('display', 'none');
        $('#reactionBoxWd').css('display', 'none');
        $('#reactionBoxYq').css('display', 'none');
        $('#reactionBoxNd').css('display', 'none');
    }

    //控制正逆反应变化曲线显示函数
    changeEvent (val: number, time1: number, time2: number) {
        const blackCover = $('.blackCover');
        // 正在反应时的反应速度
        const timeFun = () => {
            if ((this.viewModel as any).widthNumber < 437) {
                cancelAnimationFrame(this.timer1);
                if (val === 1) {
                    (this.textDirection[0] as any).style.opacity = '1';
                } else if (val === 2) {
                    if ((this.viewModel as any).btn1 === true || (this.viewModel as any).btn4 === true
                        || (this.viewModel as any).btn7 === true ) {
                        (this.textDirection[2] as any).style.opacity = '0';
                    } else if ((this.viewModel as any).btn2 === true || (this.viewModel as any).btn3 === true
                        || (this.viewModel as any).btn5 === true || (this.viewModel as any).btn6 === true) {
                        (this.textDirection[1] as any).style.opacity = '0';
                    }
                }
                $('.textTip').css('opacity', '1');
                if (val === 1) {
                    (this.viewModel as any).textShow1 = true;
                } else if (val === 2) {
                    (this.viewModel as any).show3 = true;
                    (this.viewModel as any).textShow2 = false;
                    (this.viewModel as any).textShow3 = false;
                }
                //控制达到平衡后线条的显示进度速度
                const timeFun1 = () => {
                    if ((this.viewModel as any).widthNumber < 8) {
                        clearTimeout(this.timer2);
                        return;
                    }
                    if ((this.viewModel as any).widthNumber < 260) {
                        if (val === 1) {
                            (this.viewModel as any).show = true;
                        } else if (val === 2) {
                            (this.viewModel as any).show = true;
                            if ((this.viewModel as any).btn1 === true || (this.viewModel as any).btn3 === true
                                || (this.viewModel as any).btn5 === true ) {
                                (this.viewModel as any).show1 = true;
                            } else if ((this.viewModel as any).btn2 === true || (this.viewModel as any).btn4 === true
                                || (this.viewModel as any).btn6 === true) {
                                (this.viewModel as any).show2 = true;
                            } else if ((this.viewModel as any).btn7 === true ) {
                                (this.viewModel as any).show5 = true;
                            }
                        }
                    }
                    (this.viewModel as any).widthNumber --;
                    blackCover.css('width', (this.viewModel as any).widthNumber + 'px');
                    this.timer2 = setTimeout(timeFun, time2);
                };
                timeFun1();
                clearTimeout(this.timer);
                return;
            }
            (this.viewModel as any).widthNumber --;
            blackCover.css('width', (this.viewModel as any).widthNumber + 'px');
            this.timer = setTimeout(timeFun, time1);
        };
        timeFun();
    }
    //控制添加催化剂提示图片闪烁的事件
    twinkleEvent (index: number) {
        const text1 = this.textDirection[index];
        const text2 = $('.textTip');
        (text1 as any).style.opacity = '1';
        text2.css('opacity', '1');
        const op = 0.016;
        let tou = 1;
        const thiz = this;
        function animate() {
            tou -= op;
            (text1 as any).style.opacity = String(tou);
            text2.css('opacity', String(tou));
            if ((text1 as any).style.opacity < '0.1') {
                tou = 1;
            }
            thiz.timer1 = requestAnimationFrame(animate);
        }
        animate();
    }
    // 重置各图片的显示隐藏及取消定时器事件
    pictureShow () {
        (this.viewModel as any).show = false;
        (this.viewModel as any).show1 = false;
        (this.viewModel as any).show2 = false;
        (this.viewModel as any).show3 = false;
        (this.viewModel as any).show4 = true;
        (this.viewModel as any).show5 = false;
        (this.viewModel as any).widthNumber = 530;
        clearTimeout(this.timer);
        clearTimeout(this.timer2);
        cancelAnimationFrame(this.timer1);
        $('.blackCover').css('width', 530 + 'px');
        (this.viewModel as any).btn1 = false;
        (this.viewModel as any).btn2 = false;
        (this.viewModel as any).btn3 = false;
        (this.viewModel as any).btn4 = false;
        (this.viewModel as any).btn5 = false;
        (this.viewModel as any).btn6 = false;
        (this.viewModel as any).btn7 = false;
        (this.viewModel as any).textShow1 = false;
        (this.viewModel as any).textShow2 = false;
        (this.viewModel as any).textShow3 = false;
    }
    //重置事件
    reset(): void {
        this.pictureShow();
        this.hiddenBtn();
        $('#reactionBoxChj').css('display', 'block');
        (this.viewModel as any).show3 = false;
    }

}
