import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelViewHandler} from './services/ModelViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import $ from 'jquery-ts';
@Component

export class MainVueComponent extends Vue {
    lang = window.env.browserInfo.lang;
    //创建按钮是否激活的变量
    active1 = false;
    active2 = false;
    active3 = false;
    active4 = false;
    btn1 = false;
    btn2 = false;
    btn3 = false;
    btn4 = false;
    btn5 = false;
    btn6 = false;
    btn7 = false;
    // 控制反应结束状态图片的提示
    show1 = false;
    show2 = false;
    show3 = false;
    show4 = false;
    show5 = false;
    // 控制反应方向结束状态图片的显示
    show = false;
    textShow1 = false;
    textShow2 = false;
    textShow3 = false;
    //遮罩的宽度
    widthNumber = 530;
    // 改变的条件汉字提示
    pushSth: any;
    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new ModelViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    // mounted
    mounted() {
        ViewController.getInstance().domReady();
        this.pushSth = $('#pushSth');
    }
    getEvent(index: number) {
        if (index === 1) {
            this.eventBtn(1, this.active1, 1, this.lang.text[9]);
            this.textShow1 = true;
        } else if (index === 2) {
            this.eventBtn(1, this.active2, 2, this.lang.text[10]);
        } else if (index === 3) {
            this.eventBtn(1, this.active3, 3, this.lang.text[12]);
        } else if (index === 4) {
            this.eventBtn(1, this.active4, 4, this.lang.text[14]);
        }
    }
    // 按钮点击事件
    eventBtn (val: number, act: any, index: number, pushSth: any) {
        if (act === true) {
            return;
        }
        this.pushSth.text(pushSth);
        this.pushSth.css('left', 213 + 'px');
        if (val === 1) {
            // 父按钮点击事件
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(index);
        } else {
            // 子按钮点击事件
            (ViewController.getInstance().viewHandler as ModelViewHandler).getSonEvent1(index);
        }

    }

    getSonEvent (index: number) {
        switch (index) {
            case 1:
                this.eventBtn(2, this.btn1, 1, this.lang.text[10]);
                break;
            case 2:
                this.eventBtn(2, this.btn2, 2, this.lang.text[11]);
                break;
            case 3:
                this.eventBtn(2, this.btn3, 3, this.lang.text[12]);
                break;
            case 4:
                this.eventBtn(2, this.btn4, 4, this.lang.text[13]);
                break;
            case 5:
                this.eventBtn(2, this.btn5, 5, this.lang.text[14]);
                this.pushSth.css('left', 230 + 'px');
                break;
            case 6:
                this.eventBtn(2, this.btn6, 6, this.lang.text[15]);
                this.pushSth.css('left', 230 + 'px');
                break;
            case 7:
                this.eventBtn(2, this.btn7, 7, this.lang.text[16]);
                this.pushSth.css('left', 223 + 'px');
                break;
        }
    }
}

