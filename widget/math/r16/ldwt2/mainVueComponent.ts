import Vue from 'vue';
import Component from 'vue-class-component';
import * as questionCoverImg from './sub_static/question.png';
import * as analytic2Img from './sub_static/analytic2.png';
import * as analytic3Img from './sub_static/analytic3.png';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ViewController} from '../../../../src/core/ViewController';
import {Ldwt2ViewHandler} from './services/Ldwt2ViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解法一']
    };
    ctrl = false;

    created() {
        const config = {
            question: {
                title: '零点问题2',
                coverImage: questionCoverImg
            },
            analyticArray: [{

                title: '解法一',
                stepArray: [
                    {
                        coverImage: analytic2Img, call: () => {
                            if (this.ctrl) {
                                this.ctrl = false;
                                (ViewController.getInstance().viewHandler as Ldwt2ViewHandler).gltf.hideOrShowAllLine(false);
                                (ViewController.getInstance().viewHandler as Ldwt2ViewHandler).gltf.hideOrShowAllImg(false);
                                (ViewController.getInstance().viewHandler as Ldwt2ViewHandler).gltf.resetRotation();
                            }
                        }
                    },
                    {
                        coverImage: analytic3Img, call: () => {
                            this.ctrl = true;
                            (ViewController.getInstance().viewHandler as Ldwt2ViewHandler).gltf.hideOrShowAllLine(true);
                            (ViewController.getInstance().viewHandler as Ldwt2ViewHandler).gltf.hideOrShowAllImg(true);
                        }
                    },
                ]
            }],
        };
        this.exerciseOption.exercise = config;

        this.exerciseOption.resizeCall = (value: string) => {
            (ViewController.getInstance().viewHandler as Ldwt2ViewHandler).gltf.resetSliderctrl(value);
            (ViewController.getInstance().viewHandler as Ldwt2ViewHandler).moveDiv();
        };

        (window as any).noMobile = true;
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new Ldwt2ViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dContainer');
        model.style.width = width1 + 'px';
        model.style.height = '100%';
        (ViewController.getInstance().viewHandler as Ldwt2ViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }


    resetEvent() {
        (ViewController.getInstance().viewHandler as Ldwt2ViewHandler).reset();
    }
}
