import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import * as analytic3Img from './sub_static/analytic3.png';
import * as analytic4Img from './sub_static/analytic4.png';
import {CoilViewHandler} from './services/CoilViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };

    isActive2 = false;
    clickNumber2 = true;

    isActive3 = false;
    clickNumber3 = true;

    isActive4 = false;
    clickNumber4 = true;

    isActive5 = false;
    clickNumber5 = true;

    isActive6 = false;
    clickNumber6 = true;

    showButton1 = true;
    showButton3 = false;
    showButton4 = false;

    created() {
        const config = {
            question : {
                title : '金属晶体1',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {
                            console.log('111111');
                            this.showButton1 = true;
                            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.hideScene();
                            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.model.obj1.visible = true;
                            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.resetAnimation();
                        }},

                    { coverImage: analytic2Img , call: () => {
                            console.log('222222');
                            this.showButton1 = true;
                            this.showButton3 = false;

                            this.isActive2 = false;
                            this.clickNumber2 = true;
                            this.isActive3 = false;
                            this.clickNumber3 = true;
                            this.isActive4 = false;
                            this.clickNumber4 = true;
                            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.hideScene();
                            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.model.obj2.visible = true;
                            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.resetAnimation();
                        }},

                    { coverImage: analytic3Img , call: () => {
                            console.log('333333');
                            this.showButton1 = false;
                            this.showButton3 = true;
                            this.showButton4 = false;

                            this.isActive3 = false;
                            this.clickNumber3 = true;
                            this.isActive4 = false;
                            this.clickNumber4 = true;
                            this.isActive5 = false;
                            this.clickNumber5 = true;
                            this.isActive6 = false;
                            this.clickNumber6 = true;
                            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.hideScene();
                            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.model.obj3.visible = true;
                            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.resetAnimation();
                        }},

                    { coverImage: analytic4Img , call: () => {
                            console.log('444444');
                            this.showButton3 = false;
                            this.showButton4 = true;

                            this.isActive3 = false;
                            this.clickNumber3 = true;
                            this.isActive4 = false;
                            this.clickNumber4 = true;
                            this.isActive5 = false;
                            this.clickNumber5 = true;
                            this.isActive6 = false;
                            this.clickNumber6 = true;

                            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.hideScene();
                            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.model.obj5.visible = true;
                            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.resetAnimation();
                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as CoilViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new CoilViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as CoilViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    cuttingEvent() {
        const showScene1 = (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.model.obj1.visible;
        if (this.clickNumber2 === true) {
            console.log('执行了1');
            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.resetAnimation();
        } else {
            if (showScene1 === true) {
                // 场景1 动画
                (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.startCuttingAnimation();
            } else {
                // 场景2动画
                (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.startCuttingAnimation2();
            }

        }
    }

    animation3() {
        (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.resetAnimation();
        if (this.clickNumber3 === true) {
            console.log('执行了1');

        } else {

            this.isActive4 = false;
            this.clickNumber4 = true;
            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.model.obj3.visible = true;
            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.model.obj4.visible = false;
            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.startAnimation3();
        }
    }

    animation4() {
        (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.resetAnimation();
        if (this.clickNumber4 === true) {
            console.log('执行了1');

        } else {
            console.log('执行了2');
            this.isActive3 = false;
            this.clickNumber3 = true;

            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.model.obj3.visible = false;
            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.model.obj4.visible = true;
            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.startAnimation4();
        }
    }

    animation5() {
        (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.resetAnimation();
        if (this.clickNumber5 === true) {
            console.log('执行了1');

        } else {
            console.log('执行了2');
            this.isActive6 = false;
            this.clickNumber6 = true;

            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.model.obj5.visible = true;
            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.model.obj6.visible = false;
            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.startAnimation5();
        }
    }

    animation6() {
        (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.resetAnimation();
        if (this.clickNumber6 === true) {
            console.log('执行了1');

        } else {
            console.log('执行了2');
            this.isActive5 = false;
            this.clickNumber5 = true;
            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.model.obj5.visible = false;
            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.model.obj6.visible = true;
            (ViewController.getInstance().viewHandler as CoilViewHandler).gltf.startAnimation6();
        }
    }
}

