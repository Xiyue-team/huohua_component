
import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import * as analytic3Img from './sub_static/analytic3.png';
import * as analytic4Img from './sub_static/analytic4.png';
import * as analytic6Img from './sub_static/analytic6.png';
import {Jtzh3ViewHandler} from './services/Jtzh3ViewHandler';

@Component
export class MainVueComponent extends Vue {
    zoom1 = 0;
    left: any = true;
    have = false;
    isMake = false;
    ishave1 = true;
    ishave2 = true;
    ishave3 = true;
    ishave4 = true;
    ishave5 = true;
    ishave6 = false;
    exerciseOption = {
        exercise: {
            question : {
                title : '三视图还原-提点法',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {
                        if (!this.ishave1) {
                            return;
                        }
                        this.ishave1 = false;
                        this.ishave2 = true;
                        (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).gltf.Scene1();
                    }},
                    { coverImage: analytic2Img , call: () => {
                        if (!this.ishave2) {
                            return;
                        }
                        this.ishave2 = false;
                        this.ishave1 = true;
                        this.ishave3 = true;
                      (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).gltf.Scene2();
                    }},
                    { coverImage: analytic3Img , call: () => {
                        if (!this.ishave3) {
                            return;
                        }
                        this.ishave3 = false;
                        this.ishave2 = true;
                        this.ishave4 = true;
                      (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).gltf.Scene3();
                    }},
                    { coverImage: analytic4Img , call: () => {
                        if (!this.ishave4) {
                            return;
                        }
                        this.ishave4 = false;
                        this.ishave3 = true;
                        this.ishave5 = true;
                        this.isMake = false;
                        this.have = false;
                        (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).gltf.Scene4();
                    }},
                    { coverImage: analytic6Img , call: () => {
                        this.have = true;
                        if (!this.ishave5) {
                            return;
                        }
                        this.ishave5 = false;
                        this.ishave4 = true;
                        (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).gltf.Scene6();
                    }},
                ]
            }],

        },
        resizeCall: {},
        analyticArray: ['解析一'],
        showAnalytic: true,
        showSwitch2: false,
    };
    created() {
        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).moveDiv(); };
        (window as any).noMobile = true;
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new Jtzh3ViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';
        (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).moveDiv();
        ViewController.getInstance().domReady();
        
    }

    change() {
        this.isMake = true;
        (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).gltf.drawAni();
    }
}

