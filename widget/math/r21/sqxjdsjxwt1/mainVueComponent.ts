import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {SqxjdsjxViewHandler} from './services/SqxjdsjxViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionImage from './sub_static/UI/image.png';
import * as stepCover1 from './sub_static/UI/image1.png';
import * as stepCover2 from './sub_static/UI/image2.png';
import * as stepCover3 from './sub_static/UI/image3.png';
import * as stepCover4 from './sub_static/UI/image4.png';
import {setTimeout} from 'timers';
@Component

export class MainVueComponent extends Vue {
    showDraw = false;
    currentStep = 'step1';
    active1 = false;
    timer1: any;
    exerciseOption = {
        exercise: {
            question: {
                title: '双曲线焦点三角形问题1 （习题）',
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
    };
    created() {
        const viewOption = new ViewOption();
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new SqxjdsjxViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    stepChange (type: string) {
        if (type !== this.currentStep) {
            this.currentStep = type;
            (ViewController.getInstance().viewHandler as SqxjdsjxViewHandler).Model.stepChange(this.currentStep);
        }
        this.showDraw = false;
        this.active1 = false;
        if (type === 'step4') {
            this.showDraw = true;
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
            (ViewController.getInstance().viewHandler as SqxjdsjxViewHandler).Model.stepChange(this.currentStep);
        }, 500);
    }
    change() {
        this.active1 = true;
        clearInterval(this.timer1);
        clearTimeout((ViewController.getInstance().viewHandler as SqxjdsjxViewHandler).Model.timer);
        clearTimeout((ViewController.getInstance().viewHandler as SqxjdsjxViewHandler).Model.timer1);
        clearTimeout((ViewController.getInstance().viewHandler as SqxjdsjxViewHandler).Model.timer2);
        (ViewController.getInstance().viewHandler as SqxjdsjxViewHandler).Model.drawCircle();
        (ViewController.getInstance().viewHandler as SqxjdsjxViewHandler).Model.moveEvent();
        this.timer1 = setInterval(function () {
            if ((ViewController.getInstance().viewHandler as SqxjdsjxViewHandler).Model.mark === true) {
                (ViewController.getInstance().viewHandler as SqxjdsjxViewHandler).Model.moveEvent1();
                (ViewController.getInstance().viewHandler as SqxjdsjxViewHandler).Model.mark = false;
            }
        }, 100);
    }

    resize() {
        (ViewController.getInstance().viewHandler as SqxjdsjxViewHandler).resize();
    }

}

