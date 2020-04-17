import Vue from 'vue';
import Component from 'vue-class-component';
import {Watch} from 'vue-property-decorator';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {CrystalViewHandler} from './services/CrystalViewHander';
@Component
export class MainVueComponent extends Vue {
    title = window.env.browserInfo.lang.title;
    buttonTitle = window.env.browserInfo.lang.buttonTitle;
    text = window.env.browserInfo.lang.text;
    value1 = 1;
    value2 = 11;
    active1 = false;
    active2 = false;
    show = true;
    //吸引力
    width = 20 + '%';
    sliderOption1 = {width: 180, height: 2, min: 1, max: 4, tooltip: 'always',
        dotSize: [24, 24], process: true, speed: 0.01, interval: 1, railStyle: { backgroundColor: '#737373', }};
    sliderOption2 = {width: 180, height: 2, min: 11, max: 17, tooltip: 'always',
        dotSize: [24, 24], process: true, speed: 0.01, interval: 1, railStyle: { backgroundColor: '#737373', }};
    // 判断是否是手机
    isPhone = false;
    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new CrystalViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
        if ((window as any)['env'].browserInfo.isSmallDevice) {
            this.isPhone = true;
            this.sliderOption1.width = window.innerWidth * 0.15;
            this.sliderOption1.dotSize = [16, 16];
            this.sliderOption2.width = window.innerWidth * 0.15;
            this.sliderOption2.dotSize = [16, 16];
        }
    }

    mounted() {

        ViewController.getInstance().domReady();
    }

    getEvent(index: number) {
        if (index === 1) {
            this.active1 = true;
            this.active2 = false;
            this.show = false;
            (ViewController.getInstance().viewHandler as CrystalViewHandler).Model.getEvent1(1);
        } else if (index === 2) {
            this.active1 = false;
            this.active2 = true;
            this.show = false;
            (ViewController.getInstance().viewHandler as CrystalViewHandler).Model.getEvent1(2);
        } else if (index === 3) {
            (ViewController.getInstance().viewHandler as CrystalViewHandler).Model.resetCamera();
        }
    }
    // 监听事件
    //电子层数改变监听事件
    @Watch('value1')
    onChildChanged1(val: number) {
        this.value1 = val;
        this.value2 = 11;
        (ViewController.getInstance().viewHandler as CrystalViewHandler).Model.getNumber();
    }
    //核电荷数改变监听事件
    @Watch('value2')
    onChildChanged2(val: number) {
        this.value2 = val;
        (ViewController.getInstance().viewHandler as CrystalViewHandler).Model.getSize();
    }

}

