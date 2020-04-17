import Vue from 'vue';
import {Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelViewHandler} from './services/ModelViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
@Component

export class MainVueComponent extends Vue {
    lang = window.env.browserInfo.lang;
    value1 = 3;
    value2 = 3;
    active = false;
    active1 = false;
    active2 = false;
    sliderOption1 = {width: 180, height: 2, min: 0, max: 5, tooltip: 'always',
        dotSize: [24, 24], process: false, speed: 0.01, interval: 0.1, railStyle: { backgroundColor: '#737373', }};
    sliderOption2 = {width: 180, height: 2, min: 0, max: 5, tooltip: 'always',
        dotSize: [24, 24], process: false, speed: 0.01, interval: 0.1, railStyle: { backgroundColor: '#737373', }};
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
            this.sliderOption1.width = window.innerWidth * 0.14;
            this.sliderOption1.dotSize = [16, 16];
            this.sliderOption2.width = window.innerWidth * 0.14;
            this.sliderOption2.dotSize = [16, 16];
        }
    }

    // mounted
    mounted() {
        ViewController.getInstance().domReady();
    }

    getEvent(index: number) {
        if (index === 0) {
            this.active1 = !this.active1;
            (ViewController.getInstance().viewHandler as ModelViewHandler).Model.showLineEvt();
        } else {
            this.active2 = !this.active2;
            if (this.active2) {
                this.active = true;
            } else {
                this.active = false;
            }
        }
    }
    // 监听事件
    //圆1的半径改变监听事件
    @Watch('value1')
    onChildChanged1(val: number) {
        this.value1 = val;
        (ViewController.getInstance().viewHandler as ModelViewHandler).Model.getCircleNumber(1);
    }
    //圆2的半径改变监听事件
    @Watch('value2')
    onChildChanged2(val: number) {
        this.value2 = val;
        (ViewController.getInstance().viewHandler as ModelViewHandler).Model.getCircleNumber(2);
    }
    // 重置
    reset() {
        this.value1 = 3;
        this.value2 = 3;
        this.active1 = false;
        this.active2 = false;
        this.active = false;
        (ViewController.getInstance().viewHandler as ModelViewHandler).Model.reset();
    }
}

