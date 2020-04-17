import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelViewHandler} from './services/ModelViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as mgStartGif from './sub_static/UI/mg/tansuan_Mg_1.gif';
import * as caStartGif from './sub_static/UI/ca/tansuan_Ca_1.gif';
import * as srStartGif from './sub_static/UI/sr/tansuan_Sr_1.gif';
import * as baStartGif from './sub_static/UI/ba/tansuan_Ba_1.gif';
import * as thermometerBg1 from './sub_static/UI/402.png';
import * as thermometerBg2 from './sub_static/UI/900.png';
import * as thermometerBg3 from './sub_static/UI/1172.png';
import * as thermometerBg4 from './sub_static/UI/1360.png';
@Component

export class MainVueComponent extends Vue {
    title = window.env.browserInfo.lang.title;
    text = window.env.browserInfo.lang.text;
    // 四个切换按钮是否选中变量
    active1 = true;
    active2 = false;
    active3 = false;
    active4 = false;
    //控制未进行反应四种状态下gif动画显示隐藏变量
    show = true;
    //控制不同物质反应状态下gif动画显示隐藏变量
    show1 = false;
    show2 = false;
    show3 = false;
    show4 = false;
    show5 = false;
    show6 = false;
    show7 = false;
    show8 = false;
    //进行反应四种状态下gif动画
    molecularMotion = mgStartGif;
    // 四种物质热分解对应的温度计
    thermometerBg = thermometerBg1;
    //文字提示变化变量
    resolveShow = false;
    //温度值
    number = 402;
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
    // 按钮点击事件
    getEvent(index: number) {
        if (index === 1) {
            this.molecularMotion = mgStartGif;
            this.thermometerBg = thermometerBg1;
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(1);
        } else if (index === 2) {
            this.molecularMotion = caStartGif;
            this.thermometerBg = thermometerBg2;
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(2);
        } else if (index === 3) {
            this.molecularMotion = srStartGif;
            this.thermometerBg = thermometerBg3;
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(3);
        } else if (index === 4) {
            this.molecularMotion = baStartGif;
            this.thermometerBg = thermometerBg4;
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(4);
        }
    }
}

