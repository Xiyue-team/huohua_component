import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {SsthyfViewHandler} from './services/SsthyfViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionImage from './sub_static/UI/image.png';
import * as stepCover1 from './sub_static/UI/image1.png';
import * as stepCover2 from './sub_static/UI/image2.png';
@Component


export class MainVueComponent extends Vue {
    currentStep = 'step1';
    exerciseOption = {
        exercise: {
            question: {
                title: '三视图还原-截面法',
                coverImage: questionImage
            },
            analyticArray: [{
                title: '解析一',
                stepArray: [
                    {
                        coverImage: stepCover1, call: () => {
                            this.stepChange('step1');
                        }
                    },
                    {
                        coverImage: stepCover2, call: () => {
                            this.stepChange('step2');
                        }
                    },
                ]
            }]
        },
        resizeCall: {},
        analyticArray: ['解析一'],
        showAnalytic: true,
        enterCall: {},
    };
    created() {
        this.exerciseOption.resizeCall = () => {(ViewController.getInstance().viewHandler as SsthyfViewHandler).moveDiv(); };
        this.exerciseOption.enterCall = () => {(ViewController.getInstance().viewHandler as SsthyfViewHandler).Model.analysisAni(); };
        (window as any).noMobile = true;
        const viewOption = new ViewOption();
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new SsthyfViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    stepChange (type: string) {
        if (type !== this.currentStep) {
            this.currentStep = type;
            (ViewController.getInstance().viewHandler as SsthyfViewHandler).Model.stepChange(this.currentStep);
        }
    }
    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dContainer');
        model.style.width = width1 + 'px';
        model.style.height = '100%';
        (ViewController.getInstance().viewHandler as SsthyfViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }
}

