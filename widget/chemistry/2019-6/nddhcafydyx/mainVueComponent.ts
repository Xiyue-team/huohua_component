import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelViewHandler} from './services/ModelViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as textImg from './sub_static/UI/addH2.png';
import * as textImg1 from './sub_static/UI/addN2.png';
import * as textImg2 from './sub_static/UI/addNH3.png';
import * as tipImg from './sub_static/UI/tip2.png';
import * as tipImg1 from './sub_static/UI/tip1.png';
@Component

export class MainVueComponent extends Vue {
    title = window.env.browserInfo.lang.title;
    buttonTitle = window.env.browserInfo.lang.buttonTitle;
    //创建按钮是否激活的变量
    active1 = false;
    active2 = false;
    active3 = false;
    // 控制反应结束状态图片及压强增大减小图片的提示
    show1 = false;
    show2 = false;
    show3 = false;
    show4 = false;
    show5 = false;
    //遮罩的宽度
    widthNumber = 530;
    // 提示图片变量
    textImg = textImg;
    tipImg = tipImg;
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
    }
    //点击按钮事件
    getEvent(index: number) {
        if (index === 1) {
            if (this.active1 === true) {
                return;
            }
            this.textImg = textImg;
            this.tipImg = tipImg;
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(1);
        } else if (index === 2) {
            if (this.active2 === true) {
                return;
            }
            this.textImg = textImg1;
            this.tipImg = tipImg;
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(2);
        } else if (index === 3) {
            if (this.active3 === true) {
                return;
            }
            this.textImg = textImg2;
            this.tipImg = tipImg1;
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(3);
        }
    }
}

