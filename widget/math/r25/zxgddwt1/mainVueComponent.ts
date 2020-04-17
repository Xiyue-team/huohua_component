import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
const viewOptionConfig = require('./meta.json');
import {ZxgddViewHandler} from './services/ZxgddViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };

    ctrl = false;

    created() {
        const config = {
            question : {
                title : '直线过定点问题-2014年四川理(14)',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                      { coverImage: analytic1Img , call: () => {

                            this.ctrl = false;
                            (ViewController.getInstance().viewHandler as ZxgddViewHandler).tylxllt.bigPointP.visible = false;

                        }},
                      { coverImage: analytic2Img , call: () => {

                            this.ctrl = true;

                        }}
                ]
            }],

        };
        this.exerciseOption.exercise = config;

        this.exerciseOption.resizeCall = (value: string) => {
            (ViewController.getInstance().viewHandler as ZxgddViewHandler).tylxllt.resetSliderctrl(value);
            (ViewController.getInstance().viewHandler as ZxgddViewHandler).moveDiv();
        };


        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
        viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
        viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
        viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
        viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
        viewOption.showReset = viewOptionConfig.config.showReset;
        ViewController.getInstance(new ZxgddViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dContainer');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as ZxgddViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

}

