import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/tm.png';
import * as analytic1Img from './sub_static/jx1.png';
import * as analytic2Img from './sub_static/jx2.png';
import * as analytic3Img from './sub_static/jx3.png';
import * as analytic4Img from './sub_static/jx4.png';
import {LzjtViewHandler} from './services/LzjtViewHandler';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一'],
        enterCall: () => {
            setTimeout(() => {
                (ViewController.getInstance().viewHandler as LzjtViewHandler).gltf.playAnimation();
            }, 1000);

        }
    };
    imgCtrl = true;
    imgCtrl1 = false;
    ismobile = false;
    ctrl = false;
    created() {
        const config = {
            question : {
                title : '离子晶体2',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {
                            if (this.ctrl) {
                                return;
                            }
                            this.ctrl = true;
                            this.imgCtrl = true;
                            this.imgCtrl1 = false;
                            (ViewController.getInstance().viewHandler as LzjtViewHandler).gltf.hide1Model();
                            (ViewController.getInstance().viewHandler as LzjtViewHandler).gltf.resetCamera();
                        }},
                    { coverImage: analytic2Img , call: () => {
                            this.ctrl = false;
                            this.imgCtrl = false;
                            this.imgCtrl1 = false;
                            (ViewController.getInstance().viewHandler as LzjtViewHandler).gltf.hide2Model();
                            (ViewController.getInstance().viewHandler as LzjtViewHandler).gltf.resetCamera();
                        }},
                    { coverImage: analytic3Img , call: () => {
                            this.ctrl = false;
                            this.imgCtrl = false;
                            this.imgCtrl1 = true;
                            (ViewController.getInstance().viewHandler as LzjtViewHandler).gltf.hide3Model();
                            (ViewController.getInstance().viewHandler as LzjtViewHandler).gltf.resetCamera();
                        }},
                    { coverImage: analytic4Img , call: () => {
                            this.ctrl = false;
                            this.imgCtrl = false;
                            this.imgCtrl1 = false;
                            (ViewController.getInstance().viewHandler as LzjtViewHandler).gltf.hide4Model();
                            (ViewController.getInstance().viewHandler as LzjtViewHandler).gltf.resetCamera();
                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as LzjtViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new LzjtViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
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

        (ViewController.getInstance().viewHandler as LzjtViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }


}

