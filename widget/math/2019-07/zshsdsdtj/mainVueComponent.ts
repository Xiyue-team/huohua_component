import Vue from 'vue';
import {Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelViewHandler} from './services/ModelViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as formula1 from './sub_static/UI/formula1.png';
import * as formula2 from './sub_static/UI/formula2.png';
import $ from 'jquery-ts';
@Component

export class MainVueComponent extends Vue {
    title = window.env.browserInfo.lang.title;
    textStyle: any;
    value = 2;
    formula = formula1;
    sliderOption = {width: 180, height: 2, min: 0, max: 5, tooltip: 'always',
        dotSize: [24, 24], process: false, speed: 0.01, interval: 0.1, railStyle: { backgroundColor: '#737373', }};
    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new ModelViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
        if ((window as any)['env'].browserInfo.isSmallDevice) {
            this.sliderOption.width = window.innerWidth * 0.15;
            this.sliderOption.dotSize = [16, 16];
        }
        setTimeout( () => {
            this.textStyle = document.getElementsByClassName('vue-slider-dot-tooltip-text')[0];
            (this.textStyle as any).style.fontFamily = 'TimesNewRomanPS-ItalicMT';
        }, 100);
    }

    // mounted
    mounted() {
        ViewController.getInstance().domReady();
    }
    // 监听事件
    //a值改变监听事件
    @Watch('value')
    onChildChanged1(val: number) {
        this.value = val;
        if (this.value === 2.7) {
            $('.vue-slider-dot-tooltip-text').text('e');
            (this.textStyle as any).style.fontStyle = 'italic';
            this.formula = formula2;
        } else {
            $('.vue-slider-dot-tooltip-text').text(`${this.value}`);
            (this.textStyle as any).style.fontStyle = '';
            this.formula = formula1;
        }
        (ViewController.getInstance().viewHandler as ModelViewHandler).Model.changeSlider();
    }
    // 重置
    reset() {
        this.value = 2;
    }
}

