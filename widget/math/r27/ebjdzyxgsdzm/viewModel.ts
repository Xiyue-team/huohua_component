import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ViewController} from '../../../../src/core/ViewController';
import {TemplateViewHandler} from './services/TemplateViewHandler';
import * as title from './sub_static/title.png';
import * as analysis1 from './sub_static/analysis1.png';
import * as analysis2 from './sub_static/analysis2.png';
import * as analysis3 from './sub_static/analysis3.png';
import * as analysis4 from './sub_static/analysis4.png';
const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解法一']
    };

    created() {
        const config = {
            question: {
                title: '二倍角的正弦公式的证明',
                coverImage: title
            },
            analyticArray: [{

                title: '解法一',
                stepArray: [
                  {coverImage: analysis1 , call: () => {
                    (ViewController.getInstance().viewHandler as TemplateViewHandler).temp.answerGraphy(1);
                  }},
                  {coverImage: analysis2 , call: () => {
                      (ViewController.getInstance().viewHandler as TemplateViewHandler).temp.answerGraphy(1);
                  }},
                  {coverImage: analysis3 , call: () => {
                    (ViewController.getInstance().viewHandler as TemplateViewHandler).temp.answerGraphy(2);
                  }},
                  {coverImage: analysis4 , call: () => {
                      (ViewController.getInstance().viewHandler as TemplateViewHandler).temp.answerGraphy(2);
                  }},
                ]
            }],
        };
        this.exerciseOption.exercise = config;
        this.exerciseOption.resizeCall = (value: string) => {
            (ViewController.getInstance().viewHandler as TemplateViewHandler).moveDiv();
        };

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
        viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
        viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
        viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
        viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
        viewOption.showReset = viewOptionConfig.config.showReset;
        ViewController.getInstance(new TemplateViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dContainer');
        model.style.width = width1 + 'px';
        model.style.height = '100%';
        (ViewController.getInstance().viewHandler as TemplateViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    resetEvent() {
    }
}
