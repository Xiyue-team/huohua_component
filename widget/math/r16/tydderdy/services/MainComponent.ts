import Vue from 'vue';
import Component from 'vue-class-component';
import {EllipseViewHandler} from './EllipseViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import {ViewOption} from '../../../../../src/core/CoreInterface';

@Component
export class MainComponent extends Vue {

    zoom = 1;
    c = 4;
    a = 5;
    active = false;

    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        viewOption.controlPanelAnimationDelay = 1000;
        ViewController.getInstance(new EllipseViewHandler(this), viewOption);
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

    drawAllEllipse() {
        (ViewController.getInstance().viewHandler as EllipseViewHandler).drawAllEllipse();
    }

    resetEvent() {


        (ViewController.getInstance().viewHandler as EllipseViewHandler).reset();
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