import * as console from 'console';
import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import * as analytic3Img from './sub_static/analytic3.png';
import * as analytic4Img from './sub_static/analytic4.png';
import * as analytic5Img from './sub_static/analytic5.png';
import {Yzjgmx2ViewHandler} from './services/Yzjgmx2ViewHandler';
import { Material } from 'three';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {
            question : {
                title : '晶胞原子数的计算1',
                coverImage : questionCoverImg
            },

            analyticArray:  [
                {
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {

                        }},
                ]
            }
        ]
        },
        resizeCall: {},
        analyticArray: ['解析一']
    };

    one = false;
    one1 = true;
    one2 = true;
    one3 = true;
    one4 = true;
    one5 = true;
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
                        if (!this.one1) {
                            return;
                        }
                        this.one1 = false;
                        this.one2 = true;
                        this.one3 = true;
                        this.one4 = true;
                        this.one5 = true;
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.hideScene();
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.initLight2(2);
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.Opencomposer = false;
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj1.visible = true;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj2.visible = false;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj3.visible = false;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj4.visible = false;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj5.visible = false;
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.orbit.reset(); 
                    }},

                    { coverImage: analytic2Img , call: () => {
                        
                        if (!this.one2) {
                            return;
                        }
                        this.one1 = true;
                        this.one2 = false;
                        this.one3 = true;
                        this.one4 = true;
                        this.one5 = true;
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.initLight2(1);
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.hideScene();
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.Opencomposer = false;
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj1.visible = false;
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj2.visible = true;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj3.visible = false;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj4.visible = false;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj5.visible = false;
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.orbit.reset(); 

                     }},
                    { coverImage: analytic3Img , call: () => {

                        if (!this.one3) {
                            return;
                        }
                        this.one1 = true;
                        this.one2 = true;
                        this.one3 = false;
                        this.one4 = true;
                        this.one5 = true;
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.hideScene();
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.initLight2(1);
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.resetAnimation1(1);
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.Opencomposer = false;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj1.visible = false;
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj2.visible = false;
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj3.visible = true;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj4.visible = false;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj5.visible = false;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.init3DModel(1);
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.orbit.reset(); 
    
                     }},
                    { coverImage: analytic4Img , call: () => {

                        if (!this.one4) {
                            return;
                        }
                        this.one1 = true;
                        this.one2 = true;
                        this.one3 = true;
                        this.one4 = false;
                        this.one5 = true;
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.hideScene();
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.initLight2(1);
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.resetAnimation1(2);
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.Opencomposer = false;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj1.visible = false;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj2.visible = false;
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj3.visible = false;
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj4.visible = true;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj5.visible = false;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.init3DModel(2);
                        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.orbit.reset();
        
                    }},
                    { coverImage: analytic5Img , call: () => {

                        if (!this.one5) {
                            return;
                        }
                        this.one1 = true;
                        this.one2 = true;
                        this.one3 = true;
                        this.one4 = true;
                        this.one5 = false;

                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.hideScene();
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.initLight2(1);
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.Opencomposer = true;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj1.visible = false;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj2.visible = false;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj3.visible = false;
                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.model.obj4.visible = false;

                            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.orbit.reset();
                    }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new Yzjgmx2ViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';
        (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    //第二个切换按钮
    get stepArry() {
        return [
            () => {
               
                (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.orbit.reset();
            },
            () =>  {
                (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.orbit.reset();
            }
        ];
    }

    //第三个切换按钮
    get stepArry1() {
        return [
            () => {
            
            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.orbit.reset();
            },
            () =>  {
           
            (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.orbit.reset();
            }
        ];
    }

    //第一个切换按钮
    get stepArry2() {
        return[
            () => {
                
                (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.orbit.reset();
            },
            () => {
               
                (ViewController.getInstance().viewHandler as Yzjgmx2ViewHandler).gltf.orbit.reset();
            }
        ];
    }
}

