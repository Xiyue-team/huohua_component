import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1 from './sub_static/analysis1.png';
import * as analytic2 from './sub_static/analysis2.png';
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

    isActive2 = false;
    clickNumber2 = true;

    isActive3 = false;
    clickNumber3 = true;

    showButton1 = true;
    showButton2 = false;

    disable = false;
    disable2 = false;
    created() {
        const config = {
            question : {
                title : '金属晶体3',
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
                            this.showButton1 = true;
                            this.showButton2 = false;
                            this.disable = false;
                            this.disable2 = true;
                            this.isActive2 = false;
                            this.clickNumber2 = true;

                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.resetCamera();
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj1.visible = true;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj3.visible = false;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj4.visible = false;
                            setTimeout(() => {
                                (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.model3dAnimation.resetModelAnimation();
                            }, 500);

                        }
                    },

                    {
                        coverImage: analytic2, call: () => {
                            if (!this.ctrl2) {
                                return;
                            }
                            this.ctrl1 = true;
                            this.ctrl2 = false;
                            this.disable = true;
                            this.disable2 = false;
                            this.showButton1 = false;
                            this.showButton2 = true;
                            this.isActive3 = false;
                            this.clickNumber3 = true;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.resetCamera();
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj1.visible = false;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj2.visible = false;
                            (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.obj3.visible = true;

                            setTimeout(() => {
                                (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.model3dAnimation2.resetModelAnimation();
                            }, 500);

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
        (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.playAnimation1();
    }

    //堆积
    duijiEvent() {
        this.disable2 = true;
        (ViewController.getInstance().viewHandler as Jtjs3ViewHandler).gltf.playAnimation2();
    }

}

