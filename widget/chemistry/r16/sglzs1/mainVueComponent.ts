import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/tm.png';
import * as analytic1Img from './sub_static/jx1.png';
import * as analytic2Img from './sub_static/jx2.png';
import * as analytic3Img from './sub_static/jx3.png';
import * as analytic4Img from './sub_static/jx4.png';
import {Sglzs1ViewHandler} from './services/Sglzs1ViewHandler';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };
    ismobile = false;
    disable1 = false;
    disable2 = false;
    disable3 = false;
    disable4 = false;
    disable5 = false;
    disable6 = false;

    hideCtrl1 = false;
    hideCtrl2 = false;
    hideCtrl3 = false;
    hideCtrl4 = false;
    hideCtrl5 = false;
    hideCtrl6 = false;

    array: any = [];

    created() {
        const config = {
            question : {
                title : '四个量子数1',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {

                        }},
                    { coverImage: analytic2Img , call: () => {

                        }},
                    { coverImage: analytic3Img , call: () => {

                        }},
                    { coverImage: analytic4Img , call: () => {

                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new Sglzs1ViewHandler(this), viewOption);
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

        (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    click1() {
        this.array.push(1);
        if (this.array[0] === 1) {
            this.removeMainactive();
            this.removeMainDisable();
            this.hidetcimg();
            this.hideimg();
            this.hideCtrl1 = true;
            this.hideCtrl2 = false;
            this.hideCtrl3 = false;

            if (this.hideCtrl1 && !this.hideCtrl4 && !this.hideCtrl5 && !this.hideCtrl6) {
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj1.visible = true;
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj4.visible = true;
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj6.visible = true;
            }
        } else {
            this.hideCtrl1 = true;
            this.hideCtrl2 = false;
            this.hideCtrl3 = false;
            if (this.hideCtrl4) {
                this.hidetcimg();
                this.hideimg();
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj6.visible = true;
            } else if (this.hideCtrl5) {
                this.hideimg();
                this.hidetcimg();
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj4.visible = true;
            } else if (this.hideCtrl6) {
                this.hideimg();
                this.hidetcimg();
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj1.visible = true;
            }
        }

    }

    click2() {
        this.array.push(1);
        if (this.array[0] === 1) {
            this.removeMainactive();
            this.removeMainDisable();
            this.disable1 = true;
            this.hidetcimg();
            this.hideimg();
            this.hideCtrl1 = false;
            this.hideCtrl2 = true;
            this.hideCtrl3 = false;
            if (this.hideCtrl2 && !this.hideCtrl4 && !this.hideCtrl5 && !this.hideCtrl6) {
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj2.visible = true;
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj5.visible = true;
            }
        } else {
            this.hideCtrl1 = false;
            this.hideCtrl2 = true;
            this.hideCtrl3 = false;
            if (this.hideCtrl5) {
                this.hideimg();
                this.hidetcimg();
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj5.visible = true;
            } else if (this.hideCtrl6) {
                this.hideimg();
                this.hidetcimg();
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj2.visible = true;
            }
        }

    }

    click3() {
        this.array.push(1);
        if (this.array[0] === 1) {
            this.removeMainactive();
            this.removeMainDisable();
            this.disable1 = true;
            this.disable2 = true;
            this.hidetcimg();
            this.hideimg();
            this.hideCtrl1 = false;
            this.hideCtrl2 = false;
            this.hideCtrl3 = true;
            if (this.hideCtrl3 && !this.hideCtrl4 && !this.hideCtrl5 && !this.hideCtrl6) {
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj3.visible = true;
            }
        } else {
            this.hideCtrl1 = false;
            this.hideCtrl2 = false;
            this.hideCtrl3 = true;
            if (this.hideCtrl6) {
                this.hideimg();
                this.hidetcimg();
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj3.visible = true;
            }
        }

    }

    click4() {
        this.array.push(0);
        if (this.array[0] === 1) {

            if (this.hideCtrl1) {
                this.removeMainDisable();
                this.hideCtrl4 = true;
                this.hideCtrl5 = false;
                this.hideCtrl6 = false;
                this.hideimg();
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj6.visible = true;
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj4.visible = false;
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj1.visible = false;
            }

        } else {
            this.removeAngleactive();
            this.removeAngleDisable();
            this.hidetcimg();
            this.hideimg();
            this.disable5 = true;
            this.disable6 = true;
            this.hideCtrl4 = true;
            this.hideCtrl5 = false;
            this.hideCtrl6 = false;
            (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj6.visible = true;
        }
    }
    click5() {
        this.array.push(0);
        if (this.array[0] === 1) {

            if (this.hideCtrl1) {
                this.removeMainDisable();
                this.hideCtrl4 = false;
                this.hideCtrl5 = true;
                this.hideCtrl6 = false;
                this.hideimg();
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj6.visible = false;
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj4.visible = true;
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj1.visible = false;
            }

            if (this.hideCtrl2) {
                this.hideCtrl4 = false;
                this.hideCtrl5 = true;
                this.hideCtrl6 = false;
                this.hideimg();
                this.hidetcimg();
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj5.visible = true;
            }

        } else {
            this.removeAngleactive();
            this.removeAngleDisable();
            this.hidetcimg();
            this.hideimg();
            this.disable6 = true;
            this.hideCtrl4 = false;
            this.hideCtrl5 = true;
            this.hideCtrl6 = false;
            (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj5.visible = true;
            (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj4.visible = true;
        }
    }
    click6() {
        this.array.push(0);
        if (this.array[0] === 1) {

            if (this.hideCtrl1) {
                this.removeMainDisable();
                this.hideCtrl4 = false;
                this.hideCtrl5 = false;
                this.hideCtrl6 = true;
                this.hideimg();
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj6.visible = false;
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj4.visible = false;
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj1.visible = true;
            }

            if (this.hideCtrl2) {
                this.hideCtrl4 = false;
                this.hideCtrl5 = false;
                this.hideCtrl6 = true;
                this.hideimg();
                this.hidetcimg();
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj2.visible = true;

            }

            if (this.hideCtrl3) {
                this.hideCtrl4 = false;
                this.hideCtrl5 = false;
                this.hideCtrl6 = true;
                this.hideimg();
                this.hidetcimg();
                (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj3.visible = true;
            }
        } else {
            this.removeAngleactive();
            this.removeAngleDisable();
            this.hidetcimg();
            this.hideimg();
            this.hideCtrl4 = false;
            this.hideCtrl5 = false;
            this.hideCtrl6 = true;
            (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj1.visible = true;
            (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj2.visible = true;
            (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj3.visible = true;
        }
    }

    //去除禁用选项
    removeMainDisable() {
        this.disable1 = false;
        this.disable2 = false;
        this.disable3 = false;
    }

    removeMainactive () {
        this.hideCtrl4 = false;
        this.hideCtrl5 = false;
        this.hideCtrl6 = false;
    }

    removeAngleDisable () {
        this.disable4 = false;
        this.disable5 = false;
        this.disable6 = false;
    }

    removeAngleactive () {
        this.hideCtrl1 = false;
        this.hideCtrl2 = false;
        this.hideCtrl3 = false;
    }
    //隐藏所有小图标
    hideimg() {
        (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj1.visible = false;
        (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj2.visible = false;
        (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj3.visible = false;
        (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj4.visible = false;
        (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj5.visible = false;
        (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.xkobj6.visible = false;
    }

    hidetcimg() {
        (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj1.visible = false;
        (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj2.visible = false;
        (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj3.visible = false;
        (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj4.visible = false;
        (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj5.visible = false;
        (ViewController.getInstance().viewHandler as Sglzs1ViewHandler).gltf.tcobj6.visible = false;
    }
}

