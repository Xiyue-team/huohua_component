import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/ti.png';
import * as analytic1Img from './sub_static/a.png';
import * as analytic2Img from './sub_static/b.png';
import * as analytic3Img from './sub_static/c.png';
import * as analytic4Img from './sub_static/d.png';
import {YzViewHandler} from './services/YzViewHandler';
import { Material } from 'three';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {
            question : {
                title : '原子结构模型1',
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

    isActive = false;
    isActive1 = false;
    isActive2 = true;
    zoom1 = 0;
    data1 = 0;
    data1_1 = 0;
    data1_2 = 0;
    imgHeightLight = false;
    open = false;
    draw = true;
    show = true;

    created() {
        const config = {
            question : {
                title : '原子结构模型1',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {
                            (ViewController.getInstance().viewHandler as YzViewHandler).gltf.initImage(false);
                            (ViewController.getInstance().viewHandler as YzViewHandler).gltf.remove1();
                        this.isActive = false;
                        this.isActive1 = false;
                        this.isActive2 = true;
                        this.open = false;
                        this.draw = true;
                        this.show = true
                    }},

                    { coverImage: analytic2Img , call: () => {
                            (ViewController.getInstance().viewHandler as YzViewHandler).gltf.initImage(false)
                        this.isActive = true;
                        this.isActive1 = false;
                        this.isActive2 = false;
                            this.open = true;
                            this.draw = true
                            this.show = true

                        }},

                    { coverImage: analytic3Img , call: () => {

                        this.isActive = false;
                        this.isActive1 = true;
                        this.isActive2 = false;

                            this.open = false;
                            this.show = true;

                            if(this.draw){

                                (ViewController.getInstance().viewHandler as YzViewHandler).gltf.remove1();
                                (ViewController.getInstance().viewHandler as YzViewHandler).gltf.drawEllipseHandle();
                                (ViewController.getInstance().viewHandler as YzViewHandler).gltf.initImage(true);
                                this.draw = false
                            }


                        }},


                    { coverImage: analytic4Img , call: () => {
                        if(this.show ){
                            this.show = false;
                            (ViewController.getInstance().viewHandler as YzViewHandler).gltf.initImage(false);
                            (ViewController.getInstance().viewHandler as YzViewHandler).gltf.remove1();
                            (ViewController.getInstance().viewHandler as YzViewHandler).gltf.addBall();
                        }


                        this.isActive = false;
                        this.isActive1 = false;
                        this.isActive2 = false;
                            this.open = false;
                            this.draw = true

                       }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as YzViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new YzViewHandler(this), viewOption);
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
        const buttonCS = document.getElementById('cs');
        (ViewController.getInstance().viewHandler as YzViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    //第二个切换按钮
    resize() {

        const W1 = window.innerWidth;
        const H1 = window.innerHeight;
        if (W1 / H1 > 1024 / 750) {
            this.zoom1 = H1 / 650;
        } else {
            this.zoom1 = W1 / 1024;
        }

    }
    cc(){
        (ViewController.getInstance().viewHandler as YzViewHandler).gltf.add1()
    }
    aa(){
        (ViewController.getInstance().viewHandler as YzViewHandler).gltf.tabF = false

    }
}

