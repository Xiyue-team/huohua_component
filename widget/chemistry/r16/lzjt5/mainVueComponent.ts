import * as console from 'console';
import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import {Lzjt5ViewHandler} from './services/Lzjt5ViewHandler';

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
    one = true;
    one1 = true;
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
                        if (!this.one) {
                            return;
                        }
                        this.one = false;
                        this.one1 = true;
                        (ViewController.getInstance().viewHandler as Lzjt5ViewHandler).gltf.resetAnimation();
                        (ViewController.getInstance().viewHandler as Lzjt5ViewHandler).gltf.hideScene();
                        (ViewController.getInstance().viewHandler as Lzjt5ViewHandler).gltf.model.obj1.visible = true;
                        (ViewController.getInstance().viewHandler as Lzjt5ViewHandler).gltf.orbit.reset();
                        (ViewController.getInstance().viewHandler as Lzjt5ViewHandler).gltf.startAnimation1();  
                    }},

                    { coverImage: analytic2Img , call: () => {
                        if (!this.one1) {
                            return;
                        }
                        this.one = true;
                        this.one1 = false;
                        (ViewController.getInstance().viewHandler as Lzjt5ViewHandler).gltf.resetAnimation();
                        (ViewController.getInstance().viewHandler as Lzjt5ViewHandler).gltf.hideScene();
                        (ViewController.getInstance().viewHandler as Lzjt5ViewHandler).gltf.model.obj2.visible = true;
                        (ViewController.getInstance().viewHandler as Lzjt5ViewHandler).gltf.startAnimation();
                        (ViewController.getInstance().viewHandler as Lzjt5ViewHandler).gltf.orbit.reset();

                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as Lzjt5ViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new Lzjt5ViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';
        const one = document.getElementsByClassName('begin_button')[0];
        one.addEventListener('click', () => {
            (ViewController.getInstance().viewHandler as Lzjt5ViewHandler).gltf.resetAnimation();
            (ViewController.getInstance().viewHandler as Lzjt5ViewHandler).gltf.startAnimation1();
        });
        (ViewController.getInstance().viewHandler as Lzjt5ViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }
}

