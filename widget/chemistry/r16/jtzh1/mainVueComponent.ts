import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1 from './sub_static/analytic1.png';
import * as analytic2 from './sub_static/analytic2.png';
import * as analytic3 from './sub_static/analytic3.png';
import * as analytic4 from './sub_static/analytic4.png';
import {JingTiViewHandler} from './services/JingTiViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };
    ctrl1 = true;
    ctrl2 = true;
    ctrl3 = true;
    ctrl4 = true;
    isActive1 = false;
    clickNumber1 = true;
    isActive2 = false;
    clickNumber2 = true;
    data = 0;
    showButton1 = true;
    showButton2 = false;
    showButton3 = false;
    created() {
        const config = {
            question : {
                title : '晶体综合1',
                coverImage : questionCoverImg
            },
            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1 , call: () => {
                        if (!this.ctrl1) {
                            return;
                        }
                        this.ctrl1 = false;
                        this.ctrl2 = true;
                        this.ctrl3 = true;
                        this.ctrl4 = true;
                        this.showButton1 = true;
                        this.showButton2 = false;
                        this.showButton3 = false;
                        this.clickNumber1 = true;
                        this.isActive1 = false;
                        if ((ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.children[0]) {
                            (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.visible = true;
                            (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.children[0].visible = true;
                            (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.children[1].visible = false;
                            (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.children[2].visible = false;
                            (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj2.visible = false;
                            (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj3.visible = false;
                            (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj4.visible = false;
                            (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.resetCuttingAnimation();
                        }
                    }},

                    { coverImage: analytic2 , call: () => {
                        if (!this.ctrl2) {
                            return;
                        }
                        this.ctrl1 = true;
                        this.ctrl2 = false;
                        this.ctrl3 = true;
                        this.ctrl4 = true;
                        this.showButton1 = false;
                        this.showButton2 = false;
                        this.showButton3 = false;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.visible = false;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj3.visible = false;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj4.visible = false;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj2.visible = true;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.resetCuttingAnimation();
                    }},

                    { coverImage: analytic3 , call: () => {
                        if (!this.ctrl3) {
                            return;
                        }
                        this.ctrl1 = true;
                        this.ctrl2 = true;
                        this.ctrl3 = false;
                        this.ctrl4 = true;
                        this.showButton1 = false;
                        this.showButton2 = true;
                        this.showButton3 = false;
                        this.clickNumber2 = true;
                        this.isActive2 = false;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.visible = false;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj2.visible = false;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj4.visible = false;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj3.visible = true;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.resetCuttingAnimation();
                    }},

                    { coverImage: analytic4 , call: () => {
                        if (!this.ctrl4) {
                            return;
                        }
                        this.ctrl1 = true;
                        this.ctrl2 = true;
                        this.ctrl3 = true;
                        this.ctrl4 = false;
                        this.showButton1 = false;
                        this.showButton2 = false;
                        this.showButton3 = true;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.visible = false;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj2.visible = false;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj3.visible = false;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj4.visible = true;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj4.children[0].visible = true;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj4.children[1].visible = false;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.resetCuttingAnimation();
                        this.data = 0;
                    }},
                ]
            }],
        };
        this.exerciseOption.exercise = config;
        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as JingTiViewHandler).moveDiv(); };
        (window as any).noMobile = true;
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new JingTiViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';
        (ViewController.getInstance().viewHandler as JingTiViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    get stepArry() {
        return [
            () => {
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj4.visible = true;
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj4.children[0].visible = true;
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj4.children[1].visible = false;
            },
            () => {
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj4.visible = true;
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj4.children[0].visible = false;
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj4.children[1].visible = true;
            }
        ];
    }

    cuttingEvent() {
        const showScene1 = (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.visible;
        if (this.clickNumber1 === true) {
            // console.log('执行了1');
            (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.resetCuttingAnimation();
            (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.children[0].visible = true;
            (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.children[1].visible = false;
            (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.children[2].visible = false;

        } else {
            if (showScene1 === true) {
                // 场景1 动画
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.resetCuttingAnimation();
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.visible = true;
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.children[0].visible = false;
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.children[1].visible = true;
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.children[2].visible = true;
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.startCuttingAnimation();
            }
        }
    }
    coordinationEvent() {
        if (this.clickNumber2 === true) {
            (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.resetCuttingAnimation();
            // console.log('执行了2');
        } else {
            (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.coordAnimation();
        }
    }
}

