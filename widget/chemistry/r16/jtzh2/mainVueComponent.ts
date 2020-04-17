import * as console from 'console';
import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/timu.png';
import * as analytic1Img from './sub_static/1.png';
import * as analytic2Img from './sub_static/2.png';
import * as analytic3Img from './sub_static/3.png';
import {Jtzh2ViewHandler} from './services/Jtzh2ViewHandler';

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

    isActive = true;
    isActive1 = false;
    isActive2 = false;
    zoom1 = 0;
    data1 = 0;
    data1_1 = 0;
    data1_2 = 0;
    one = false;
    one1 = true;
    one2 = true;


    created() {
        const config = {
            question : {
                title : '晶体综合2',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {
                       this.isActive = true;
                       this.isActive1 = false;
                       this.isActive2 = false;
                       if (!this.one) {
                           return;
                       }
                       this.one = false;
                       this.one1 = true;
                       this.one2 = true;
                        (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.initLight1(0);
                        (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.hideScene();
                    
                        (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj1.visible = true;
                        (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.orbit.reset();
                       this.data1 = 0;
                    }},

                    { coverImage: analytic2Img , call: () => {
                        this.isActive = false;
                        this.isActive1 = false;
                        this.isActive2 = false;
                        if (!this.one1) {
                            return;
                        }
                        this.one = true;
                        this.one1 = false;
                        this.one2 = true;

                       (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.initLight1(0);
                       (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.hideScene();
                       (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj2.visible = true;
                       (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.orbit.reset();
                        }},

                    { coverImage: analytic3Img , call: () => {
                        this.isActive = false;
                        this.isActive1 = false;
                        this.isActive2 = true;
                        if (!this.one2) {
                            return;
                        }
                        this.one = true;
                        this.one1 = true;
                        this.one2 = false;

                       (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.initLight1(1);
                       (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.hideScene();
                       (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.visible = true;
                       (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.children[0].visible = true;
                       (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.children[1].visible = false;
                       (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.children[2].visible = false;
                       (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.children[3].visible = false;
                       (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.orbit.reset();

                       this.data1_2 = 0;
                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new Jtzh2ViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        this.resize();
            window.addEventListener('resize', () => {
                this.resize();
            });
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    //第一个切换按钮
    get stepArry() {
        return [
            () => {
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj1.visible = true;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj1.children[0].visible = true;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj1.children[1].visible = false;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj1.children[2].visible = false;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.orbit.reset();
            },
            () =>  {
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj1.visible = true;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj1.children[0].visible = false;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj1.children[1].visible = true;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj1.children[2].visible = false;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.orbit.reset();
            },
            () =>  {
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.modelAnimation.resetAnimation();
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj1.visible = true;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj1.children[0].visible = false;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj1.children[1].visible = false;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj1.children[2].visible = true;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.startAnimation();
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.orbit.reset();
            }
        ];
    }

    //第三个切换按钮
    get stepArry2() {
        return[
            () => {
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.modelAnimation.resetAnimation();
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.visible = true;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.children[0].visible = true;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.children[1].visible = false;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.children[2].visible = false;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.children[3].visible = false;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.orbit.reset();
            },
            () => {
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.modelAnimation.resetAnimation();
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.visible = true;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.children[0].visible = false;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.children[1].visible = true;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.children[2].visible = false;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.orbit.reset();
            },
            () => {
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.modelAnimation.resetAnimation();
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.visible = true;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.children[1].visible = false;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.children[2].visible = true;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.children[3].visible = false;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.orbit.reset();
            },
            () => {
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.modelAnimation.resetAnimation();
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.visible = true;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.children[2].visible = false;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.model.obj3.children[3].visible = true;
                (ViewController.getInstance().viewHandler as Jtzh2ViewHandler).gltf.orbit.reset();
            }
        ];
    }
    resize() {

        const W1 = window.innerWidth;
        const H1 = window.innerHeight;
        if (W1 / H1 > 1024 / 750) {
            this.zoom1 = H1 / 650;
        } else {
            this.zoom1 = W1 / 1024;
        }

    }
}

