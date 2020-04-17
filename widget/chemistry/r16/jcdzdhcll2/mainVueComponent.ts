import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/tm.png';
import * as analytic1Img from './sub_static/cj1.png';
import * as analytic2Img from './sub_static/cj2.png';
import * as analytic3Img from './sub_static/cj3.png';
import * as analytic4Img from './sub_static/cj4.png';
import {Jcdzdhcll2ViewHandler} from './services/Jcdzdhcll2ViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };

    created() {
        const config = {
            question : {
                title : '价层电子对互斥理论2',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {
                            (ViewController.getInstance().viewHandler as Jcdzdhcll2ViewHandler).gltf.hideModel1();
                        }},

                    { coverImage: analytic2Img , call: () => {
                            (ViewController.getInstance().viewHandler as Jcdzdhcll2ViewHandler).gltf.hideModel2();
                        }},

                    { coverImage: analytic3Img , call: () => {
                            (ViewController.getInstance().viewHandler as Jcdzdhcll2ViewHandler).gltf.hideModel3();
                        }},

                    { coverImage: analytic4Img , call: () => {
                            (ViewController.getInstance().viewHandler as Jcdzdhcll2ViewHandler).gltf.hideModel4();
                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as Jcdzdhcll2ViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new Jcdzdhcll2ViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dContainer');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as Jcdzdhcll2ViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

}

