import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import * as analytic3Img from './sub_static/analytic3.png';
import * as analytic4Img from './sub_static/analytic4.png';
import {ThreejsViewHandler} from './services/ThreejsViewHandler';

@Component
export class ViewModel extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };

    created() {
        const config = {
            question : {
                title : '正方体的外接球',
                coverImage : questionCoverImg
            },
            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {
                        (ViewController.getInstance().viewHandler as ThreejsViewHandler).model.showFirstScene();
                    }},
                    { coverImage: analytic2Img , call: () => {
                        (ViewController.getInstance().viewHandler as ThreejsViewHandler).model.showSecondScene();
                    }},
                    { coverImage: analytic3Img , call: () => {
                        (ViewController.getInstance().viewHandler as ThreejsViewHandler).model.showThirdScene();
                    }},
                    { coverImage: analytic4Img , call: () => {
                        (ViewController.getInstance().viewHandler as ThreejsViewHandler).model.showFourthScene();
                    }},
                ]
            }],
        };

        this.exerciseOption.exercise = config;
        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as ThreejsViewHandler).moveDiv(); };
        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new ThreejsViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as ThreejsViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }
}

