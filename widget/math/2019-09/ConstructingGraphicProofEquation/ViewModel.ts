import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/title.png';
import * as analytic1Img from './sub_static/analytic1Img.png';
import * as analytic2Img from './sub_static/analytic2Img.png';

const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {
    buttonTitle = window.env.browserInfo.lang.btntext;
    step = 1;
    styleContainer3d = { width: window.innerWidth * 0.58 + 'px', height: '100%' };
    exerciseOption = {
        exercise: {
            question: {
                title: window.env.browserInfo.lang.title,
                coverImage: questionCoverImg
            },

            analyticArray: [{
                title: '解析一',
                stepArray: [
                    {
                        coverImage: analytic1Img,
                        call: () => { this.Answer(1); }
                    }, {
                        coverImage: analytic2Img,
                        call: () => { this.Answer(2); }
                    }
                ]
            }]
        },
        resizeCall: () => {
     
        },
        analyticArray: ['解析一']
    };

    assemble: any;
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
        this.assemble = (ViewController.getInstance().viewHandler as any).assemble;
    }
    Answer(i: number) {
        if (this.step !== i) {
            this.step = i;
            this.assemble.Answer(i);
        }
    }
    resize() {
        this.styleContainer3d = { width: window.innerWidth * 0.58 + 'px', height: '100%' };
        if (this.assemble) {
            this.assemble.resize();
        }
    }
    resetEvent() {

    }
}

