import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/tm.png';
import * as analytic1Img from './sub_static/jx1.png';
import * as analytic2Img from './sub_static/jx2.png';
import * as analytic3Img from './sub_static/jx3.png';
import * as analytic4Img from './sub_static/jx4.png';
import {FzkjgxqlViewHandler} from './services/fzkjgxqlViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };

    ctrl = false;
    ctrl1 = false;
    num1 = 0;
    num2 = 0;
    ctrlNum1 = false;
    ctrlNum2 = false;
    created() {
        const config = {
            question : {
                title : '分子空间构型确立(1)',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {
                            (ViewController.getInstance().viewHandler as FzkjgxqlViewHandler).gltf.hide1Model();
                        }},

                    { coverImage: analytic2Img , call: () => {
                            this.ctrl = false;
                            this.ctrlNum1 = false;
                            (ViewController.getInstance().viewHandler as FzkjgxqlViewHandler).gltf.hide2Model();
                        }},

                    { coverImage: analytic3Img , call: () => {
                            if (this.ctrlNum1) {
                                return;
                            }
                            this.ctrlNum1 = true;
                            this.ctrlNum2 = false;
                            this.ctrl = true;
                            this.ctrl1 = false;
                            this.num1 = 0;
                            (ViewController.getInstance().viewHandler as FzkjgxqlViewHandler).gltf.hide3Model();

                        }},

                    { coverImage: analytic4Img , call: () => {
                            if (this.ctrlNum2) {
                                return;
                            }
                            this.ctrlNum2 = true;
                            this.ctrlNum1 = false;
                            this.ctrl = false;
                            this.ctrl1 = true;
                            this.num2 = 0;
                            (ViewController.getInstance().viewHandler as FzkjgxqlViewHandler).gltf.hide4Model();
                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as FzkjgxqlViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new FzkjgxqlViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dContainer');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as FzkjgxqlViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    get stepArry() {
        return [
            () => {(ViewController.getInstance().viewHandler as FzkjgxqlViewHandler).gltf.model3ArrowHide1(); },
            () => {(ViewController.getInstance().viewHandler as FzkjgxqlViewHandler).gltf.model3ArrowHide2(); },
        ];
    }

    get stepArry1() {
        return [
            () => {(ViewController.getInstance().viewHandler as FzkjgxqlViewHandler).gltf.model4ArrowHide1(); },
            () => {(ViewController.getInstance().viewHandler as FzkjgxqlViewHandler).gltf.model4ArrowHide2(); },
        ];
    }

}

