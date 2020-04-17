import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import {JingBaoViewHandler} from './services/JingBaoViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };

    isActive1 = false;
    clickNumber1 = true;

    isActive2 = false;
    clickNumber2 = true;

    buttonDisable = true;



    created() {
        const config = {
            question : {
                title : '晶胞原子数的计算1',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {

                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as JingBaoViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new JingBaoViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as JingBaoViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    cuttingEvent() {
        if (this.clickNumber2 === true) {
            console.log('执行了1');
            this.buttonDisable = true;
            this.isActive1 = false;
            this.clickNumber1 = true;
            (ViewController.getInstance().viewHandler as JingBaoViewHandler).gltf.resetCuttingAnimation();
        } else {
            console.log('执行了2');
            // this.buttonDisable = false;
            (ViewController.getInstance().viewHandler as JingBaoViewHandler).gltf.startCuttingAnimation();
        }

    }

    juxtapositionEvent() {
        if (this.clickNumber1 === true) {
            console.log('执行了1');
            (ViewController.getInstance().viewHandler as JingBaoViewHandler).gltf.resetJuxtapositionAnimation();
        } else {
            console.log('执行了2');
            (ViewController.getInstance().viewHandler as JingBaoViewHandler).gltf.startJuxtapositionAnimation();
        }
    }
}

