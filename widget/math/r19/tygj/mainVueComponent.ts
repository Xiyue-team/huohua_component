import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {TygjViewHandler} from './services/TygjViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionImage from './sub_static/image1.png';
import * as stepCover1 from './sub_static/image2.png';
import * as stepCover2 from './sub_static/image3.png';
import * as stepCover3 from './sub_static/image4.png';

@Component
export class MainVueComponent extends Vue {
    showDraw = false;
    currentStep = 'step1';
    exerciseOption = {
        exercise: {
            question : {
                title : '椭圆轨迹',
                coverImage : questionImage
            },
            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: stepCover1 , call: () => { this.stepChange('step1'); } },
                    { coverImage: stepCover2 , call: () => { this.stepChange('step2'); } },
                    { coverImage: stepCover3 , call: () => { this.stepChange('step3'); } },
                ]
            }]
        },
        resizeCall: this.resize,
        analyticArray: ['解析一']
    };

    stepChange (type: string) {
        if (type !== this.currentStep) {
            this.currentStep = type;
            (ViewController.getInstance().viewHandler as TygjViewHandler).stepChange(this.currentStep);
            this.showDraw = false;
            if (type === 'step3') {
                this.showDraw = true;
            }
        }
    }

    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new TygjViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    // mounted
    mounted() {
        ViewController.getInstance().domReady();
        this.resize();
        window.addEventListener('resize', this.resize);
    }

    drawEllipse () {
        (ViewController.getInstance().viewHandler as TygjViewHandler).Model.drawEllipse();
    }

    resize() {
        (ViewController.getInstance().viewHandler as TygjViewHandler).resize();
    }
}

