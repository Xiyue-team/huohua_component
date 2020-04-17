import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/tm.png';
import * as analytic1Img from './sub_static/jx1.png';
import * as analytic2Img from './sub_static/jx2.png';
import * as analytic3Img from './sub_static/jx3.png';
import * as analytic4Img from './sub_static/jx4.png';
import {Xsxrylhsx1ViewHandler} from './services/Xsxrylhsx1ViewHandler';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };
    ismobile = false;
    isActive = false;

    ctrl1 = true;
    ctrl2 = false;
    ctrl3 = false;
    ctrl4 = false;
    buttonCtrl1 = false;
    disable = false;

    buttonCtrl = false;
    created() {
        const config = {
            question : {
                title : '相似相溶原理和手性（1）',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {
                            if (this.ctrl1) {
                                return;
                            }
                            (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.modelRotate1.resetModelPosition();
                            (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.modelRotate2.resetModelPosition();
                            (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.modelRotate3.resetModelPosition();
                            this.ctrl1 = true;
                            this.ctrl2 = false;
                            this.ctrl3 = false;
                            this.ctrl4 = false;

                            this.buttonCtrl = false;
                            this.buttonCtrl1 = false;
                            this.isActive = false;
                            (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.hideobj1();
                        }},
                    { coverImage: analytic2Img , call: () => {
                            if (this.ctrl2) {
                                return;
                            }
                            (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.modelRotate4.resetModelPosition();
                            (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.modelRotate5.resetModelPosition();
                            this.ctrl1 = false;
                            this.ctrl2 = true;
                            this.ctrl3 = false;
                            this.ctrl4 = false;
                            this.buttonCtrl = false;
                            this.buttonCtrl1 = false;
                            this.isActive = false;
                            (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.hideobj2();
                        }},
                    { coverImage: analytic3Img , call: () => {
                            if (this.ctrl3) {
                                return;
                            }
                            (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.modelRotate6.resetModelPosition();
                            this.buttonCtrl = true;
                            this.ctrl1 = false;
                            this.ctrl2 = false;
                            this.ctrl3 = true;
                            this.ctrl4 = false;
                            this.isActive = false;
                            this.buttonCtrl1 = false;
                            (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.model2.visible = false;
                            (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.model1.visible = true;
                            (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.hideobj3();
                        }},
                    { coverImage: analytic4Img , call: () => {
                            if (this.ctrl4) {
                                return;
                            }
                            this.buttonCtrl = false;
                            this.ctrl1 = false;
                            this.ctrl2 = false;
                            this.ctrl3 = false;
                            this.ctrl4 = true;
                            this.disable = false;
                            this.buttonCtrl1 = true;
                            (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.hideobj4();
                            (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.animationReset();
                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new Xsxrylhsx1ViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    modelEvent() {
        this.isActive = !this.isActive;
        if (this.isActive) {
            (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.model2.visible = true;
            (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.model1.visible = false;
        } else {
            (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.model2.visible = false;
            (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.model1.visible = true;
        }
    }

    model1Event() {
        this.disable = true;
        (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).gltf.animationPlay();
    }

    mounted() {
        if (BrowserUtil.getBrowserInfo().isSmallDevice) {
            this.ismobile = true;
        } else {
            this.ismobile = false;
        }

        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dContainer');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as Xsxrylhsx1ViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

}

