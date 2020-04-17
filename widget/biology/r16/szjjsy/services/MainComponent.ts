import Vue from 'vue';
import Component from 'vue-class-component';
import {GraftViewHandler} from './GraftViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import {ViewOption} from '../../../../../src/core/CoreInterface';

@Component
export class MainComponent extends Vue {
    //控制按钮
    hat = true;
    //控制帽
    hat1 = true;
    isChange = false;
    isNormal = true;
    isCover1 = false;
    descTxt = '地中海伞藻';
    descTxt1 = '红圆齿伞藻';
    timer: any;
    blueHat = require(`../sub_static/images/blueHat.png`);
    greenHat = require(`../sub_static/images/greenHat.png`);
    greenSrc = require(`../sub_static/images/greenHat.png`);
    blueSrc = require(`../sub_static/images/blueHat.png`);
    zoom = 1;
    fg1 = false;
    fg2 = false;
    hasTxt1 = true;
    hasTxt = true;

    created() {
        const viewOption = new ViewOption();

        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        viewOption.controlPanelAnimationDelay = 1000;
        ViewController.getInstance(new GraftViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
        this.resize();
    }

    mounted() {
        window.addEventListener('resize', () => {
            this.resize();
        });
        ViewController.getInstance().domReady();
    }

    preloadImage(path: any) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image.src);
            image.onerror = reject;
            image.src = path;
        });
    }

    init() {

    }

    beginGraft() {
        this.hat = false;
        this.hat1 = false;
        (ViewController.getInstance().viewHandler as GraftViewHandler).doGraft();

    }

    resetEvent() {

        (ViewController.getInstance().viewHandler as GraftViewHandler).reset();
    }

    resize() {
        const W = window.innerWidth;
        const H = window.innerHeight;


        if (W / H > 1024 / 650) {
            this.zoom = H / 650;

        } else {
            this.zoom = W / 1024;
        }
    }


    //重置页面
    reset() {

    }


}
