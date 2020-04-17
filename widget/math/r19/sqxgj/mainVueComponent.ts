import Vue from 'vue';
import {Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {SqxgjViewHandler} from './services/SqxgjViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionImage from './sub_static/UI/image1.png';
import * as stepCover1 from './sub_static/UI/image2.png';
import * as stepCover2 from './sub_static/UI/image3.png';
import * as stepCover3 from './sub_static/UI/image4.png';
@Component

export class MainVueComponent extends Vue {
    showDraw = false;
    active1 = false;
    currentStep = 'step1';
    exerciseOption = {
        exercise: {
            question: {
                title: '双曲线轨迹',
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
                ]
            }]
        },
        resizeCall: this.resize,
        analyticArray: ['解析一'],
        showSwitch2: false,
    };

    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new SqxgjViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    stepChange (type: string) {
        if (type !== this.currentStep) {
            this.currentStep = type;
            (ViewController.getInstance().viewHandler as SqxgjViewHandler).stepChange(this.currentStep);
            this.showDraw = false;
            this.active1 = false;
            if (type === 'step3') {
                this.showDraw = true;
            }
        }
    }

    // mounted
    mounted() {
        ViewController.getInstance().domReady();
        this.resize();
        window.addEventListener('resize', this.resize);
    }

    drawHyperBola() {
        if (this.active1) {return; }
        this.active1 = !this.active1;
        (ViewController.getInstance().viewHandler as SqxgjViewHandler).Model.drawHyperbola();
    }

    resize() {
        (ViewController.getInstance().viewHandler as SqxgjViewHandler).resize();
    }
}

