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
import {SjxViewHandler} from './services/SjxViewHandler';

@Component
export class ViewModel extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };

    created() {

        const config = {
            question : {
                title : '金属晶体1',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {
                        (ViewController.getInstance().viewHandler as SjxViewHandler).sjx3DScene.coneCurve3DModel.analyticNumber = 0;
                        (ViewController.getInstance().viewHandler as SjxViewHandler).sjx3DScene.coneCurve3DModel.analyticSwitch = 0;
                        (ViewController.getInstance().viewHandler as SjxViewHandler).sjx3DScene.coneCurve3DModel.updateDPointXY(0);
                        (ViewController.getInstance().viewHandler as SjxViewHandler).sjx3DScene.coneCurve3DModel.resetTrajectory();
                        }},

                    { coverImage: analytic2Img , call: () => {
                        (ViewController.getInstance().viewHandler as SjxViewHandler).sjx3DScene.coneCurve3DModel.analyticNumber = 1;
                        (ViewController.getInstance().viewHandler as SjxViewHandler).sjx3DScene.coneCurve3DModel.updateDPointXY(1);
                        }},

                    { coverImage: analytic3Img , call: () => {
                        (ViewController.getInstance().viewHandler as SjxViewHandler).sjx3DScene.coneCurve3DModel.analyticNumber = 2;
                        (ViewController.getInstance().viewHandler as SjxViewHandler).sjx3DScene.coneCurve3DModel.updateDPointXY(2);
                        }},

                    { coverImage: analytic4Img , call: () => {
                        (ViewController.getInstance().viewHandler as SjxViewHandler).sjx3DScene.coneCurve3DModel.analyticNumber = 3;
                        (ViewController.getInstance().viewHandler as SjxViewHandler).sjx3DScene.coneCurve3DModel.updateDPointXY(3);
                        }},

                    { coverImage: analytic5Img , call: () => {
                        (ViewController.getInstance().viewHandler as SjxViewHandler).sjx3DScene.coneCurve3DModel.analyticNumber = 4;
                        (ViewController.getInstance().viewHandler as SjxViewHandler).sjx3DScene.coneCurve3DModel.updateDPointXY(4);
                      }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;

        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as SjxViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new SjxViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as SjxViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }
}

