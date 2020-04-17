import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ZsmtdlqqViewHandler} from './services/ZsmtdlqqViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionImage from './sub_static/UI/image.png';
import * as stepCover1 from './sub_static/UI/image1.png';
import * as stepCover2 from './sub_static/UI/image2.png';
import * as stepCover3 from './sub_static/UI/image3.png';
import * as stepCover4 from './sub_static/UI/image4.png';
import * as stepCover5 from './sub_static/UI/image5.png';
@Component

export class MainVueComponent extends Vue {
    currentStep = 'step1';
    exerciseOption = {
        exercise: {
            question: {
                title: '正四面体的棱切球-定义法',
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
                    {
                        coverImage: stepCover3, call: () => {
                            this.stepChange('step3');
                        }
                    },
                    {
                        coverImage: stepCover4, call: () => {
                            this.stepChange('step4');
                        }
                    },
                    {
                        coverImage: stepCover5, call: () => {
                            this.stepChange('step5');
                        }
                    },
                ]
            }]
        },
        resizeCall: {},
        analyticArray: ['解析一'],
        showAnalytic: true,
    };
    created() {
        this.exerciseOption.resizeCall = () => {(ViewController.getInstance().viewHandler as ZsmtdlqqViewHandler).moveDiv(); };
        (window as any).noMobile = true;
        const viewOption = new ViewOption();
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new ZsmtdlqqViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    stepChange (type: string) {
        if (type !== this.currentStep) {
            this.currentStep = type;
            (ViewController.getInstance().viewHandler as ZsmtdlqqViewHandler).Model.stepChange(this.currentStep);
        }
    }
    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dContainer');
        model.style.width = width1 + 'px';
        model.style.height = '100%';
        (ViewController.getInstance().viewHandler as ZsmtdlqqViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }
}

