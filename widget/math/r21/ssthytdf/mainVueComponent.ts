
import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import * as analytic3Img from './sub_static/analytic3.png';
import * as analytic4Img from './sub_static/analytic4.png';
import * as analytic5Img from './sub_static/analytic5.png';
import {Jtzh3ViewHandler} from './services/Jtzh3ViewHandler';

@Component
export class MainVueComponent extends Vue {
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
                       this.isMake = true;
                       (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).gltf.Scene1();
                    }},
                    { coverImage: analytic2Img , call: () => {
                        this.isMake3 = true;
                        if (!this.isMake)  {
                            return;
                        }
                        this.isMake = false;  
                        (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).gltf.Scene2();
                    }},
                    { coverImage: analytic3Img , call: () => {  
                        this.isMake = true;
                        this.isMake4 = true;
                        if (!this.isMake3)  {
                            return;
                        }
                        this.isMake3 = false; 
                        (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).gltf.Scene3();
                    }},
                    { coverImage: analytic4Img , call: () => {  
                        this.isMake3 = true;
                        this.isMake5 = true;
                        if (!this.isMake4) {
                            return;
                        }
                        this.isMake4 = false;
                        (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).gltf.Scene4();
                    }},
                    { coverImage: analytic5Img , call: () => {  
                        this.isMake4 = true;
                        if (!this.isMake5) {
                            return;
                        }
                        this.isMake5 = false;
                        (ViewController.getInstance().viewHandler as Jtzh3ViewHandler).gltf.Scene5();
                    }}
                ]
            }],
        },
        resizeCall: {},
        analyticArray: ['解析一'],
        showAnalytic: true,
        showSwitch2: false
    };

    zoom1 = 0;
    left: any = true;
    have = true;
    ishave = false;
    show = false;
    isMake: any = true;
    isMake3: any = true;
    isMake4: any = true;
    isMake5: any = true;

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

