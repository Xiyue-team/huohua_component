import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1 from './sub_static/analysis1.png';
import * as analytic2 from './sub_static/analysis2.png';
import * as analytic3 from './sub_static/analysis3.png';
import * as analytic4 from './sub_static/analysis4.png';
import {Jtjs3ViewHandler} from './services/Jtjs3ViewHandler';


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

    isActive2 = false;
    clickNumber2 = true;

    isActive3 = false;
    clickNumber3 = true;

    showButton1 = false;
    showButton2 = false;

    disable = false;
    disable2 = false;

    num1 = 0;
    num2 = 0;
    created() {
        const config = {
            question : {
                title : '离子晶体1',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    {
                        coverImage: analytic1, call: () => {
                            if (!this.ctrl1) {
                                return;
                            }

                            this.ctrl1 = false;
                            this.ctrl2 = true;
                            this.ctrl3 = true;
                            this.ctrl4 = true;

                            this.showButton1 = false;
                            this.showButton2 = false;

                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.resetCamera();
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj1.visible = true;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj2.visible = false;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj2s.visible = false;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj3.visible = false;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj4.visible = false;
                        }
                    },

                    {
                        coverImage: analytic2, call: () => {
                            if (!this.ctrl2) {
                                return;
                            }
                            this.ctrl1 = true;
                            this.ctrl2 = false;
                            this.ctrl3 = true;
                            this.ctrl3 = true;

                            this.showButton1 = true;
                            this.showButton2 = false;

                            this.num1 = 0;


                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.resetCamera();
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj1.visible = false;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj2.visible = true;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj2s.visible = false;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj3.visible = false;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj4.visible = false;
                        }
                    },
                    {
                        coverImage: analytic3, call: () => {
                            if (!this.ctrl3) {
                                return;
                            }
                            this.ctrl1 = true;
                            this.ctrl2 = true;
                            this.ctrl3 = false;
                            this.ctrl4 = true;


                            this.showButton1 = false;
                            this.showButton2 = true;



                            this.num2 = 0;


                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.resetCamera();
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj1.visible = true;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj2.visible = false;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj2s.visible = false;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj3.visible = false;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj4.visible = false;
                        }
                    },
                    {
                        coverImage: analytic4, call: () => {
                            if (!this.ctrl4) {
                                return;
                            }
                            this.ctrl1 = true;
                            this.ctrl2 = true;
                            this.ctrl3 = true;
                            this.ctrl4 = false;


                            this.showButton1 = false;
                            this.showButton2 = false;


                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.resetCamera();
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj1.visible = false;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj2.visible = false;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj2s.visible = false;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj3.visible = false;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj4.visible = true;
                        }
                    },
                ]
            }],

        };
        this.exerciseOption.exercise = config;

        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new Jtjs3ViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }


    cuttingEvent() {
        this.disable = true;
        (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj2.visible = false;
        (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj2s.visible = true;
    }

    //堆积
    duijiEvent() {
        this.disable2 = true;
        (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj1.visible = false;
        (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj3.visible = true;
    }


    get stepArry() {
        return [
            () => {(ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.hideModel1(); },
            () => {(ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.hideModel2(); },
        ];
    }

    get stepArry1() {
        return [
            () => {(ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.hideModel3(); },
            () => {(ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.hideModel4(); },
        ];
    }
}

