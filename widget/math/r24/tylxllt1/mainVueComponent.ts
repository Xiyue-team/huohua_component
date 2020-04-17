import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic from './sub_static/analytic.png';
const viewOptionConfig = require('./meta.json');
import {TylxlltViewHandler} from './services/TylxlltViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };

    created() {
        const config = {
            question : {
                title : '椭圆离心率典型例题1',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                      { coverImage: analytic , call: () => {

                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;

        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as TylxlltViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
        viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
        viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
        viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
        viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
        viewOption.showReset = viewOptionConfig.config.showReset;
        ViewController.getInstance(new TylxlltViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as TylxlltViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

}

