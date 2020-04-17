import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img1 from './sub_static/analytic1.png';
import * as analytic1Img2 from './sub_static/analytic2.png';
import * as analytic1Img3 from './sub_static/analytic3.png';
import * as analytic1Img4 from './sub_static/analytic4.png';


// import {JingBaoViewHandler} from './services/JingBaoViewHandler';
import {CrystalViewHandler} from './services/CrystalViewHander';


@Component
export class MainVueComponent extends Vue {
    isStep1 = true;
    isStep3 = false;
    isStep4 = false;
    Cw = 0;
    Ch = 0;
    Cw1 = 0;
    Ch1 = 0;
    exerciseOption = {
        exercise: {
            question: {
                title: '混合晶体1',
                coverImage: questionCoverImg
            },

            analyticArray: [
                {
                    title: '解析一',
                    stepArray: [
                        {
                            coverImage: analytic1Img1, call: () => {
                                this.doStep1();
                            }
                        },
                        {
                            coverImage: analytic1Img2, call: () => {
                                this.doStep2();
                            }
                        },
                        {
                            coverImage: analytic1Img3, call: () => {
                                this.doStep3();
                            }
                        },
                        {
                            coverImage: analytic1Img4, call: () => {
                                this.doStep4();
                            }
                        }

                    ],

                }

            ]
        },
        resizeCall: {},
        analyticArray: ['解析一']
    };


    created() {
        const config = {
            question: {
                title: '混合晶体1',
                coverImage: questionCoverImg
            },

            analyticArray: [
                {
                    title: '解析一',
                    stepArray: [
                        {
                            coverImage: analytic1Img1, call: () => {

                            }
                        },
                        {
                            coverImage: analytic1Img2, call: () => {

                            }
                        },
                        {
                            coverImage: analytic1Img3, call: () => {

                            }
                        },
                        {
                            coverImage: analytic1Img4, call: () => {

                            }
                        },
                    ]
                },

            ],

        };
        // this.exerciseOption.exercise = config;
        this.exerciseOption.resizeCall = () => {
            this.moveDiv();
        };
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new CrystalViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');


        model.style.width = width1 + 'px';
        model.style.height = '100%';

        this.moveDiv();

        ViewController.getInstance().domReady();
    }

    // get stepArry() {
    //     return [
    //         () => (ViewController.getInstance().viewHandler as CrystalViewHandler).step1(1),
    //         () => (ViewController.getInstance().viewHandler as CrystalViewHandler).step1(2),
    //         () => (ViewController.getInstance().viewHandler as CrystalViewHandler).step1(3)
    //     ];
    // }


    moveDiv() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const width2 = document.getElementById('box').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.left = (width2 - width1) / 2 + 'px';
    }


    doStep1() {
        (ViewController.getInstance().viewHandler as CrystalViewHandler).handleEve1();
    }

    doStep2() {
        (ViewController.getInstance().viewHandler as CrystalViewHandler).handleEve2();
    }

    doStep3() {
        (ViewController.getInstance().viewHandler as CrystalViewHandler).handleEve3();
    }

    doStep4() {
        (ViewController.getInstance().viewHandler as CrystalViewHandler).handleEve4();
    }

}

