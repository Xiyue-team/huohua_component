import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1 from './sub_static/analytic1.png';
import * as analytic2 from './sub_static/analytic2.png';
import {JingTiViewHandler} from './services/JingTiViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };
    data1 = 0;
    data2 = 0;
    isActive1 = true;
    isActive2 = false;
    ctrl1 = true;
    ctrl2 = true;
    created() {
        const config = {
            question : {
                title : '离子晶体3',
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
                        this.isActive1 = true;
                        this.isActive2 = false;
                        if ((ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1) {
                            (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.visible = true;
                            (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.hideScene();
                            (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.resetModelPos();
                            this.data1 = 0;
                        }
                    }},

                    { coverImage: analytic2 , call: () => {
                        if (!this.ctrl2) {
                            return;
                        }
                        this.ctrl1 = true;
                        this.ctrl2 = false;
                        this.isActive1 = false;
                        this.isActive2 = true;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.hideScene();
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.visible = false;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj4.visible = true;
                        (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.resetModelPos();
                        this.data2 = 0;
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
    get stepArry1() {
        return [
            () => {
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.visible = true;
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj2.visible = false;
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj3.visible = false;
            },
            () =>  {
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.visible = false;
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj2.visible = true;
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj3.visible = false;
            },
            () =>  {
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj1.visible = false;
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj2.visible = false;
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj3.visible = true;
            }
        ];
    }
    get stepArry2() {
        return [
            () => {
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj4.visible = true;
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj5.visible = false;
            },
            () =>  {
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj4.visible = false;
                (ViewController.getInstance().viewHandler as JingTiViewHandler).gltf.obj5.visible = true;
            }
        ];
    }


}

