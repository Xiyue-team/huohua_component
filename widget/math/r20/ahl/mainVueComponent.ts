
import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import * as analytic3Img from './sub_static/analytic3.png';
import {Jtzh3ViewHandler} from './services/Jtzh3ViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {
            question : {
                title : '2013年安徽理（18）',
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
    };

    zoom1 = 0;
    left: any = true;
    have = true;
    ishave = false;
    show = false;

    created() {
        const config = {
            question : {
                title : '2013年安徽理（18）',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {
                        (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).gltf.addTangentLine(2);
                    }},
                    { coverImage: analytic2Img , call: () => {  
                        (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).gltf.addTangentLine(1);
                    }},
                    { coverImage: analytic3Img , call: () => {
                        this.show = true;
                    }},
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
        (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).moveDiv();
        ViewController.getInstance().domReady();
        
    }

    change() {
        
    }

    resize() {

        const W1 = window.innerWidth;
        if (W1 > 1200) {
            this.zoom1 = 1;
        } else {
            this.zoom1 = 0.5;
        }

    }
}

