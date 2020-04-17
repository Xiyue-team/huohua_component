import Vue from 'vue';
import {Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelViewHandler} from './services/ModelViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
// const Vconsole = require('vconsole');
// const vConsole = new Vconsole();
// export default vConsole;
@Component

export class MainVueComponent extends Vue {
    title = window.env.browserInfo.lang.title;
    buttonTitle = window.env.browserInfo.lang.buttonTitle;
    text = window.env.browserInfo.lang.text;
    active1 = true;
    active2 = false;
    active3 = false;
    show = true;
    value1 = 20;
    value2 = 0;
    value3 = 0;
    sliderOption1 = {width: 180, height: 2, min: 20, max: 42, tooltip: 'none',
        dotSize: [24, 24], process: false, speed: 0.01, interval: 1, railStyle: { backgroundColor: '#737373', }};
    sliderOption2 = {width: 180, height: 2, min: 0, max: 60, tooltip: 'none',
        dotSize: [24, 24], process: false, speed: 0.01, interval: 1, railStyle: { backgroundColor: '#737373', }};
    sliderOption3 = {width: 180, height: 2, min: 0, max: 80, tooltip: 'none',
        dotSize: [24, 24], process: false, speed: 0.01, interval: 1, railStyle: { backgroundColor: '#737373', }};
    // 判断是否是手机
    isPhone = false;
    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new ModelViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
        if ((window as any)['env'].browserInfo.isSmallDevice) {
            this.isPhone = true;
            this.sliderOption1.width = window.innerWidth * 0.15;
            this.sliderOption1.dotSize = [16, 16];
            this.sliderOption2.width = window.innerWidth * 0.15;
            this.sliderOption2.dotSize = [16, 16];
            this.sliderOption3.width = window.innerWidth * 0.15;
            this.sliderOption3.dotSize = [16, 16];
        }
    }
    // mounted
    mounted() {
        const clientHeight = document.documentElement.clientHeight;
        const flex_box1 = document.getElementById('flex_box1');
        if (clientHeight < 800 && clientHeight > 750 && (window as any)['env'].browserInfo.isHuohuaPlayer) {
            flex_box1.style.height = '19vh !important';
            flex_box1.style.right = '33vw';
            flex_box1.style.bottom = '20.5vh';
        }
        if (clientHeight < 550 && clientHeight > 450 && navigator.userAgent.indexOf('huohua') !== -1) {
            flex_box1.style.height = '20vh !important';
            flex_box1.style.right = '31vw';
            flex_box1.style.bottom = '20.5vh';
            document.getElementById('flex_box').style.height = '25vh !important';
            document.getElementById('flex_box').style.top = '20vh';
            document.getElementById('btn1').style.transform = 'scale(' + 0.6 + ')';
            document.getElementById('btn2').style.transform = 'scale(' + 0.6 + ')';
            document.getElementById('btn3').style.transform = 'scale(' + 0.6 + ')';
        }
        ViewController.getInstance().domReady();
    }
    getEvent(index: number) {
        if (index === 1) {
            this.show = true;
            if (this.active1) {
                return;
            }
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(1);
        } else if (index === 2) {
            this.show = true;
            if (this.active2) {
                return;
            }
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(2);
        } else if (index === 3) {
            this.show = false;
            if (this.active3) {
                return;
            }
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(3);
        }
    }
    // 监听事件
    //粒子的数目改变监听事件
    @Watch('value1')
    onChildChanged1(val: number) {
        this.value1 = val;
        this.value2 = 0;
        this.value3 = 0;
        (ViewController.getInstance().viewHandler as ModelViewHandler).Model.getParticleNumber();
    }
    //粒子的大小改变监听事件
    @Watch('value2')
    onChildChanged2(val: number) {
        this.value2 = val;
        this.value1 = 20;
        this.value3 = 0;
        (ViewController.getInstance().viewHandler as ModelViewHandler).Model.getParticleSize();
        if (this.value2 === 0 || this.active1 || this.active2) {
            ((ViewController.getInstance().viewHandler as ModelViewHandler) as any).Model.tipText1.visible = false;
        } else {
            ((ViewController.getInstance().viewHandler as ModelViewHandler) as any).Model.tipText1.visible = true;
        }
    }
    //粒子间的距离改变监听事件
    @Watch('value3')
    onChildChanged3(val: number) {
        this.value3 = val;
        this.value2 = 0;
        this.value1 = 20;
        (ViewController.getInstance().viewHandler as ModelViewHandler).Model.getParticleDistance();
        if (this.value3 === 0 || this.active3) {
            ((ViewController.getInstance().viewHandler as ModelViewHandler) as any).Model.tipText.visible = false;
        } else {
            ((ViewController.getInstance().viewHandler as ModelViewHandler) as any).Model.tipText.visible = true;
        }
    }
    // 重置
    reset() {
        this.active1 = true;
        this.active2 = false;
        this.active3 = false;
        (ViewController.getInstance().viewHandler as ModelViewHandler).Model.reset();
    }
}

