import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {SqxjbjViewHandler} from './services/SqxjbjViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionImage from './sub_static/UI/image.png';
import * as stepCover1 from './sub_static/UI/image1.png';
import * as stepCover2 from './sub_static/UI/image2.png';
import * as stepCover3 from './sub_static/UI/image3.png';
import * as stepCover4 from './sub_static/UI/image4.png';
import {setTimeout} from 'timers';

@Component

export class MainVueComponent extends Vue {
    showDraw = true;
    currentStep = 'step1';
    mark = true;
    exerciseOption = {
        exercise: {
            question: {
                title: '双曲线焦半径的应用',
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
                ]
            }]
        },
        resizeCall: this.resize,
        analyticArray: ['解析一'],
        showAnalytic: true,
        showSwitch2: false,
    };
    created() {
        const viewOption = new ViewOption();
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new SqxjbjViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    stepChange (type: string) {
        if (type !== this.currentStep) {
            this.currentStep = type;
            (ViewController.getInstance().viewHandler as SqxjbjViewHandler).Model.stepChange(this.currentStep);
        }
    }
    mounted() {
        ViewController.getInstance().domReady();
        this.resize();
        window.addEventListener('resize', this.resize);
        const one = document.getElementsByClassName('begin_button')[0];
        one.addEventListener('click', () => {
            this.goBack();
        });
    }
    goBack() {
        setTimeout(() => {
            this.exerciseOption.showAnalytic = false;
        }, 1000);
    }
    changeEvent() {
        this.mark = !this.mark;
        if (this.mark) {
            (ViewController.getInstance().viewHandler as SqxjbjViewHandler).Model.changeEvt(1);
        } else {
            (ViewController.getInstance().viewHandler as SqxjbjViewHandler).Model.changeEvt(2);
        }
    }

    resize() {
        (ViewController.getInstance().viewHandler as SqxjbjViewHandler).resize();
    }

}

