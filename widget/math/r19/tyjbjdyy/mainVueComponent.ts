
import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import {Jtzh3ViewHandler} from './services/Jtzh3ViewHandler';
import { setTimeout } from 'timers';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {
            question : {
                title : '椭圆焦半径的应用',
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
        analyticArray: ['解析一'],
        showAnalytic: true,
        showSwitch2: false,
    };

    zoom1 = 0;
    left: any = true;
    have = true;
    ishave = false;

    created() {
        const config = {
            question : {
                title : '椭圆焦半径的应用',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {
                        this.ishave = false;
                        this.left = true;
                        (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).gltf.change(0);
                    }},
                    { coverImage: analytic2Img , call: () => {
                        this.ishave = true;
                        this.left = false;
                        (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).gltf.change(1);
                    }}
                ]
            }],

        };
        this.exerciseOption.exercise = config;


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
        this.resize();
            window.addEventListener('resize', () => {
                this.resize();
            });
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';
        const one = document.getElementsByClassName('begin_button')[0];
        one.addEventListener('click', () => {
            this.goBack();
        });
        (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).moveDiv();
        ViewController.getInstance().domReady();
        
    }

    goBack() {
        setTimeout(() => {
        this.exerciseOption.showAnalytic = false;
        }, 1000);
    }
    change() {
        this.left = !this.left;
        this.ishave = !this.ishave;
        if (!this.left) {
            (this as any).$refs.model.switchModel =  '2';
            (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).gltf.change(1); //右圆
        } else {
            (this as any).$refs.model.switchModel =  '1';
            (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).gltf.change(0);
        }
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

