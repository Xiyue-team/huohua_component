import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ViewHandler} from './services/ViewHandler';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    //按钮自定义事件
    isActive1 = false;
    clickNumber1 = true;
    isActive2 = false;
    clickNumber2 = true;

    // 判断是否是手机
    isPhone = false;

    title: string;
    buttonTitle1: string;
    buttonTitle2: string;

    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.adapterMobilePanel = false;
        ViewController.getInstance(new ViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();

        this.resize();
    }

    mounted() {
        ViewController.getInstance().domReady();
    }

    //数字比大小显示
    buttonClickEvent1() {
        this.isActive1 = true;
        this.isActive2 = false;
        (ViewController.getInstance().viewHandler as any).dmCanvas.showNumbers(this.isActive1);
        (ViewController.getInstance().viewHandler as any).dmCanvas.showAbsoluteNumbers(this.isActive2);
    }
    //绝对值比大小显示
    buttonClickEvent2() {
        this.isActive1 = false;
        this.isActive2 = true;
        (ViewController.getInstance().viewHandler as any).dmCanvas.showAbsoluteNumbers(this.isActive2);
        (ViewController.getInstance().viewHandler as any).dmCanvas.showNumbers(this.isActive1);
    }

    resize() {
        if (window.innerWidth <= 1100 && window.innerWidth > 900) {

        } else if (window.innerWidth <= 900) {

        } else {
        }
    }

    resetEvent() {
        this.resetButton(0);
        this.isActive1 = false;
        this.clickNumber1 = true;
        this.isActive2 = false;
        this.clickNumber2 = true;
        (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
    }

    resetButton(value: number) {

    }
}
