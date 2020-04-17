import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/title.png';
import * as analytic1Img from './sub_static/analytic1Img.png';
import * as analytic2Img1 from './sub_static/analytic2Img1.png';
import * as analytic2Img2 from './sub_static/analytic2Img2.png';
import * as analytic3Img1 from './sub_static/analytic3Img1.png';
import * as analytic3Img2 from './sub_static/analytic3Img2.png';

const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {
    showImage = true;
    step = 1;
    i = 1;
    styleContainer3d = { width: window.innerWidth * 0.58 + 'px', height: '100%' };
    exerciseOption = {
        exercise: {
            question: {
                title: window.env.browserInfo.lang.title,
                coverImage: questionCoverImg
            },

            analyticArray: [{
                title: window.env.browserInfo.lang.subtitle[0],
                stepArray: [
                    {
                        coverImage: analytic1Img, call: () => {
                            this.Answer(1, 1);
                        }
                    },
                    {
                        coverImage: analytic2Img1, call: () => {
                            this.Answer(1, 2);
                        }
                    },
                    {
                        coverImage: analytic3Img1, call: () => {
                            this.Answer(1, 3);
                        }
                    }
                ]
            }, {
                title: window.env.browserInfo.lang.subtitle[1],
                stepArray: [
                    {
                        coverImage: analytic1Img, call: () => {
                            this.Answer(2, 1);
                        }
                    },
                    {
                        coverImage: analytic2Img2, call: () => {
                            this.Answer(2, 2);
                        }
                    },
                    {
                        coverImage: analytic3Img2, call: () => {
                            this.Answer(2, 3);
                        }
                    }
                ]
            }]
        },
        resizeCall: () => {
        
        },
        analyticArray: window.env.browserInfo.lang.subtitle
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

    Answer(i: number, step: number) {
        if (this.step !== step || this.i !== i) {
            this.step = step;
            this.i = i;
            this.assemble.Answer(i, step);
        }
    }

    resize() {
        this.styleContainer3d = { width: window.innerWidth * 0.58 + 'px', height: '100%' };
        if (this.assemble) {
            console.log('resize');
            this.assemble.resize();
        }
    }

    resetEvent() {

    }
}

