import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import * as analytic4Img from './sub_static/analytic3.png';
import {HwdzViewHandler} from './services/HwdzViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一'],
        showSwitch2: false
    };

    newTitle1 = 'ns²np¹';
    newTitle2 = 'ns²np⁴';

    actived1 = false;
    actived2 = false;


    analysisShow1 = true;
    analysisShow2 = true;
    analysisShow3 = true;

    created() {

        const config = {
            question : {
                title : '核外电子排布规律1',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {
                            if (this.analysisShow1 === false) {
                                return;
                            }
                            this.analysisShow1 = false;
                            this.analysisShow2 = true;
                            this.analysisShow3 = true;
                        }},
                    { coverImage: analytic2Img , call: () => {
                            if (this.analysisShow2 === false) {
                                return;
                            }
                            this.analysisShow1 = true;
                            this.analysisShow2 = false;
                            this.analysisShow3 = true;
                        }},
                    { coverImage: analytic4Img , call: () => {
                            if (this.analysisShow3 === false) {
                                return;
                            }
                            this.analysisShow1 = true;
                            this.analysisShow2 = true;
                            this.analysisShow3 = false;
                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as HwdzViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new HwdzViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as HwdzViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    clickEvent1() {
        (ViewController.getInstance().viewHandler as HwdzViewHandler).bjsCanvas.showWhiteImageLeft();
        this.actived1 = true;
    }

    clickEvent2() {
        (ViewController.getInstance().viewHandler as HwdzViewHandler).bjsCanvas.showWhiteImageLeftRight();
        this.actived2 = true;
    }
}

