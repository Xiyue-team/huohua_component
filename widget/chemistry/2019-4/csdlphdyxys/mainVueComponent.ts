import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {CsdlphViewHandler} from './services/CsdlphViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
@Component

export class MainVueComponent extends Vue {
    title = window.env.browserInfo.lang.title;
    buttonTitle = window.env.browserInfo.lang.buttonTitle;
    text = window.env.browserInfo.lang.text;
    // 按钮是否被选中变量
    active1 = false;
    active2 = false;
    active3 = false;
    active4 = false;
    active5 = false;
    active6 = false;
    active = false;
    // 提示反应向哪个方向移动的图片是否被点击变量
    tipActive = false;
    // 提示反应移动内容变量
    tipText = null as any;
    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new CsdlphViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    // mounted
    mounted() {
        ViewController.getInstance().domReady();
        setTimeout(() => {
            this.tipText = document.getElementsByClassName('tipText')[0];
        }, 100);
    }
    // 按钮点击事件
    getEvent(index: number) {
        this.active = true;
        this.tipActive = false;
        if (index === 1) {
            if (this.active1) {
                return;
            }
            this.tipText.innerHTML = this.text[0];
            (ViewController.getInstance().viewHandler as CsdlphViewHandler).getEvent1(1);
        } else if (index === 2) {
            if (this.active2) {
                return;
            }
            this.tipText.innerHTML = this.text[0];
            (ViewController.getInstance().viewHandler as CsdlphViewHandler).getEvent1(2);
        } else if (index === 3) {
            if (this.active3) {
                return;
            }
            this.tipText.innerHTML = this.text[0];
            (ViewController.getInstance().viewHandler as CsdlphViewHandler).getEvent1(3);
        } else if (index === 4) {
            if (this.active4) {
                return;
            }
            this.tipText.innerHTML = this.text[1];
            (ViewController.getInstance().viewHandler as CsdlphViewHandler).getEvent1(4);
        } else if (index === 5) {
            if (this.active5) {
                return;
            }
            this.tipText.innerHTML = this.text[1];
            (ViewController.getInstance().viewHandler as CsdlphViewHandler).getEvent1(5);
        } else if (index === 6) {
            if (this.active6) {
                return;
            }
            this.tipText.innerHTML = this.text[0];
            (ViewController.getInstance().viewHandler as CsdlphViewHandler).getEvent1(6);
        }
    }
    // 提示点击图片变化事件
    tipEvt () {
        this.tipActive = !this.tipActive;
    }
    // 重置
    reset() {
        this.active = false;
        this.tipActive = false;
        (ViewController.getInstance().viewHandler as CsdlphViewHandler).Model.reset();
    }
}

