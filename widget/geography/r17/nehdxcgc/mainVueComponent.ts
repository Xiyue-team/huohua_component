import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {NehdxcgcViewHandler} from './services/NehdxcgcViewHandler';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';
const bodymovin = require('lottie-web');
const animationData = require('./sub_static/data.json');
const animationData1 = require('./sub_static/data1.json');

@Component
export class MainVueComponent extends Vue {

    isQQ = BrowserUtil.getBrowserInfo().isQQ;
    imgCtrl = false;
    ctrl = true;
    disabled = false;
    created() {
        ViewController.getInstance(new NehdxcgcViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    mounted() {
        ViewController.getInstance().domReady();

        (window as any)['animation1'] = bodymovin.loadAnimation({
            container: document.getElementById('lottie'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: animationData,

        });

        (window as any)['animation2'] = bodymovin.loadAnimation({
            container: document.getElementById('lottie1'),
            renderer: 'svg',
            loop: true,
            autoplay: false,
            animationData: animationData1
        });
        (window as any)['animation1'].addEventListener('DOMLoaded', () => {
            (window as any)['animation1'].goToAndPlay(0, true);
        });

        (window as any)['animation1'].onComplete = () => {
            this.ctrl = false;
            this.imgCtrl = false;
            this.disabled = true;
            (window as any)['animation2'].play();
        };
    }

    buttonSwitch() {
        this.imgCtrl = true;
        (window as any)['animation1'].setSpeed(1.5);
    }




}
