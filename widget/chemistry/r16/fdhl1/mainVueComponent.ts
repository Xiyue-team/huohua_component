import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/tm.png';
import * as analytic1Img from './sub_static/jx1.png';
import * as analytic2Img from './sub_static/jx2.png';
import * as analytic3Img from './sub_static/jx3.png';
import {Fdhl1ViewHandler} from './services/Fdhl1ViewHandler';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';
const bodymovin = require('lottie-web');
const animationData = require('./sub_static/data.json');
const animationData1 = require('./sub_static/data1.json');
const animationData2 = require('./sub_static/data2.json');

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一'],
        enterCall: () => {
             setTimeout(() => {
                 (window as any)['animation1'].goToAndPlay(0, true);
             }, 300);
        }
    };

    ismobile = false;
    isElectron = false;
    animationCtrl1 = true;
    animationCtrl2 = false;
    animationCtrl3 = false;

    ctrl1 = true;
    ctrl2 = false;
    ctrl3 = false;

    created() {
        const config = {
            question : {
                title : '范德华力1',
                coverImage : questionCoverImg,
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {
                            if (this.ctrl1) {
                                return;
                            }
                            this.ctrl1 = true;
                            this.ctrl2 = false;
                            this.ctrl3 = false;
                            this.animationCtrl1 = true;
                            this.animationCtrl2 = false;
                            this.animationCtrl3 = false;
                            (window as any)['animation1'].goToAndPlay(0, true);
                            (window as any)['animation2'].stop();
                            (window as any)['animation3'].stop();
                        }},

                    { coverImage: analytic2Img , call: () => {
                            if (this.ctrl2) {
                                return;
                            }
                            this.ctrl1 = false;
                            this.ctrl2 = true;
                            this.ctrl3 = false;
                            this.animationCtrl1 = false;
                            this.animationCtrl2 = true;
                            this.animationCtrl3 = false;
                            console.log((window as any)['animation2']);
                            (window as any)['animation1'].stop();
                            (window as any)['animation2'].goToAndPlay(0, true);
                            (window as any)['animation3'].stop();
                        }},

                    { coverImage: analytic3Img , call: () => {
                            if (this.ctrl3) {
                                return;
                            }
                            this.ctrl1 = false;
                            this.ctrl2 = false;
                            this.ctrl3 = true;
                            this.animationCtrl1 = false;
                            this.animationCtrl2 = false;
                            this.animationCtrl3 = true;
                            (window as any)['animation1'].stop();
                            (window as any)['animation2'].stop();
                            (window as any)['animation3'].goToAndPlay(0, true);
                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as Fdhl1ViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new Fdhl1ViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();

    }

    mounted() {
        if (BrowserUtil.getBrowserInfo().isSmallDevice) {
            this.ismobile = true;
        } else {
            this.ismobile = false;
        }

        if (BrowserUtil.getBrowserInfo().isElectron) {
            this.isElectron = true;
        } else {
            this.isElectron = false;
        }

        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dContainer');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as Fdhl1ViewHandler).moveDiv();
        ViewController.getInstance().domReady();

        (window as any)['animation1'] = bodymovin.loadAnimation({
            container: document.getElementById('lottie'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: animationData
        });
        (window as any)['animation2'] = bodymovin.loadAnimation({
            container: document.getElementById('lottie1'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: animationData1
        });
        (window as any)['animation3'] = bodymovin.loadAnimation({
            container: document.getElementById('lottie2'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: animationData2
        });

    }

}

