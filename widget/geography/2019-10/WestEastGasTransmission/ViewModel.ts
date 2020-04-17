import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
const viewOptionConfig = require('./meta.json');
import front01 from './sub_static/image/front01.png';
import front02 from './sub_static/image/front02.png';

import bg from './sub_static/image/bg.png';
@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    btntext = this.lang.btntext;
    picbg = bg;
    pic = [front01, front02]; //温度带贴图
    //前景切换
    showList = [{
        id: 0,
        offsetL: 0,
        offsetT: 0.5,
        left: 30,
        top: 50,
        text: this.lang.text[0][2]
    }, {
        id: 1,
        offsetL: 0,
        offsetT: 0.5,
        left: 30,
        top: 50,
        text: this.lang.text[1][2]
    }];

    //地点提示
    locationList = [{
        id: 0,
        showIndex: 0,
        offsetL: 0.256,
        offsetT: 0.31,
        left: 10,
        top: 10,
        text: this.lang.text[0][0],
        maL: -350,
        maT: 0,
        class: 'leftC',
        active: false
    }, {
        id: 1,
        showIndex: 0,
        offsetL: 0.855,
        offsetT: 0.62,
        left: 10,
        top: 20,
        text: this.lang.text[0][1],
        maL: 50,
        maT: -250,
        class: 'rightC',
        active: false
    }, {
        id: 2,
        showIndex: 1,
        offsetL: 0.202,
        offsetT: 0.184,
        left: 10,
        top: 10,
        text: this.lang.text[1][0],
        maL: -350,
        maT: 0,
        class: 'leftC',
        active: false
    }, {
        id: 3,
        showIndex: 1,
        offsetL: 0.71,
        offsetT: 0.848,
        left: 10,
        top: 20,
        text: this.lang.text[1][1],
        maL: 50,
        maT: -200,
        class: 'rightC',
        active: false
    }];

    selectMode = -1;

    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
        viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
        viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
        viewOption.showReset = viewOptionConfig.config.showReset;
        ViewController.getInstance(new AssembleViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().domReady();
        this.resizeOffset();
    }
    resize() {
        this.resizeOffset();
    }
    resizeOffset() {
        let offsetW = 0, offsetH = 0;
        let w = document.getElementById('block').clientWidth,
            h = document.getElementById('block').clientHeight;
        if (w > h * 1695 / 1350) {
            offsetW = (w - h * 1695 / 1350) / 2;
            w = h * 1695 / 1350;
            offsetH = 0;
        } else {
            offsetH = (h - w * 1350 / 1695) / 2;
            h = w * 1350 / 1695;
            offsetW = 0;
        }
        for (let i = 0; i < this.locationList.length; i++) {
            this.locationList[i].left = this.locationList[i].offsetL * w + offsetW;
            this.locationList[i].top = this.locationList[i].offsetT * h + offsetH;
        }
        for (let i = 0; i < this.showList.length; i++) {
            this.showList[i].left = this.showList[i].offsetL * w + offsetW;
            this.showList[i].top = this.showList[i].offsetT * h + offsetH;
        }
    }

    selectModeEvent(index: number) {
        this.selectMode = index;
        for (let i = 0; i < this.locationList.length; i++) {
            this.locationList[i].active = false;
        }
    }

    buttonEvent(index: number) {
        this.locationList[index].active = !this.locationList[index].active;
    }

    resetEvent() {
        this.selectModeEvent(-1);
    }
}

