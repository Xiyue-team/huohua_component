import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {AxisViewHandler} from './services/AxisViewHandler';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    //按钮自定义事件
    isActive1 = false;
    clickNumber1 = true;
    isActive2 = false;
    clickNumber2 = true;
    isActive3 = false;
    clickNumber3 = true;

    // 判断是否是手机
    isPhone = false;

    //页面文字描述
    title: string;
    buttonTitle1: string;
    buttonTitle2: string;
    buttonTitle3: string;


    //定义一个标志用于改变按钮状态
    SignOrign = true;
    SignDrag = true;
    SignUnit = true;


    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.adapterMobilePanel = false;
        ViewController.getInstance(new AxisViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();

        if ((window as any)['env'].browserInfo.isSmallDevice) {
            this.isPhone = true;
        }
        //文字加入vue中
        this.title = this.lang.title;
        this.buttonTitle1 = this.lang.buttonTitle1;
        this.buttonTitle2 = this.lang.buttonTitle2;
        this.buttonTitle3 = this.lang.buttonTitle3;
    }

    mounted() {
        ViewController.getInstance().domReady();
    }

    resetEvent() {
        this.isActive1 = false;
        this.clickNumber1 = true;
        this.isActive2 = false;
        this.clickNumber2 = true;
        this.isActive3 = false;
        this.clickNumber3 = true;
        //控制事件初始化，默认为不显示

        (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
        (ViewController.getInstance().viewHandler as any).dmCanvas.controllerBtn.showRedOrign(false);
        (ViewController.getInstance().viewHandler as any).dmCanvas.controllerBtn.showArrowRed(false);
        (ViewController.getInstance().viewHandler as any).dmCanvas.controllerBtn.showUnitLength(false);
    }

    //原点显示控制
    buttonClickEvent1() {
        if (this.SignOrign) {
            this.isActive1 = true;
            (ViewController.getInstance().viewHandler as any).dmCanvas.controllerBtn.showRedOrign(this.isActive1);
            this.clickNumber1 = false;
            this.SignOrign = false;
        } else {
            this.isActive1 = false;
            (ViewController.getInstance().viewHandler as any).dmCanvas.controllerBtn.showRedOrign(this.isActive1);
            this.clickNumber1 = true;
            this.SignOrign = true;
        }
    }

    //正方向显示控制
    buttonClickEvent2() {
        if (this.SignDrag) {
            this.isActive2 = true;
            (ViewController.getInstance().viewHandler as any).dmCanvas.controllerBtn.showArrowRed(this.isActive2);
            this.clickNumber2 = false;
            this.SignDrag = false;
        } else {
            this.isActive2 = false;
            (ViewController.getInstance().viewHandler as any).dmCanvas.controllerBtn.showArrowRed(this.isActive2);
            this.clickNumber2 = true;
            this.SignDrag = true;
        }
    }

    //单位长度显示控制
    buttonClickEvent3() {
        if (this.SignUnit) {
            this.isActive3 = true;
            (ViewController.getInstance().viewHandler as any).dmCanvas.controllerBtn.showUnitLength(this.isActive3);
            this.clickNumber3 = false;
            this.SignUnit = false;
        } else {
            this.isActive3 = false;
            (ViewController.getInstance().viewHandler as any).dmCanvas.controllerBtn.showUnitLength(this.isActive3);
            this.clickNumber3 = true;
            this.SignUnit = true;
        }

    }

}
