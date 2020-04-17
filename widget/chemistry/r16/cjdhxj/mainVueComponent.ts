import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subjects.png';
import * as analytic1 from './sub_static/analysis1.png';
import {CjhxjViewHandler} from './services/CjhxjViewHandler';


@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };
    ctrl1 = true;
    ctrl2 = true;
    ctrl3 = true;
    ctrl4 = true;

    isActive2 = false;
    clickNumber2 = true;

    isActive3 = false;
    clickNumber3 = true;

    showButton1 = true;
    showButton2 = false;

    disable = false;
    disable2 = false;

    num1 = 0;
    num2 = 0;

    created() {
        const config = {
            question : {
                title : '常见的化学键',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    {
                        coverImage: analytic1, call: () => {
                            if (!this.ctrl1) {
                                return;
                            }

                            this.ctrl1 = false;
                            this.ctrl2 = true;
                            this.ctrl3 = true;
                            this.ctrl4 = true;

                            this.showButton1 = true;


                            (ViewController.getInstance().viewHandler as CjhxjViewHandler).gltf.resetCamera();
                            (ViewController.getInstance().viewHandler as CjhxjViewHandler).gltf.obj1.visible = true;
                            (ViewController.getInstance().viewHandler as CjhxjViewHandler).gltf.obj2.visible = false;
                            (ViewController.getInstance().viewHandler as CjhxjViewHandler).gltf.obj3.visible = false;
                            (ViewController.getInstance().viewHandler as CjhxjViewHandler).gltf.obj4.visible = false;
                            (ViewController.getInstance().viewHandler as CjhxjViewHandler).gltf.obj5.visible = false;
                            (ViewController.getInstance().viewHandler as CjhxjViewHandler).gltf.obj6.visible = false;
                            (ViewController.getInstance().viewHandler as CjhxjViewHandler).gltf.obj7.visible = false;
                        }
                    },

                ]
            }],

        };
        this.exerciseOption.exercise = config;

        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as CjhxjViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new CjhxjViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as CjhxjViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    get stepArry() {
        return [
            () => {(ViewController.getInstance().viewHandler as CjhxjViewHandler).gltf.hideModel(); },
            () => {(ViewController.getInstance().viewHandler as CjhxjViewHandler).gltf.hideModel2(); },
            () => {(ViewController.getInstance().viewHandler as CjhxjViewHandler).gltf.hideModel3(); },
            () => {(ViewController.getInstance().viewHandler as CjhxjViewHandler).gltf.hideModel4(); },
            () => {(ViewController.getInstance().viewHandler as CjhxjViewHandler).gltf.hideModel5(); },
            () => {(ViewController.getInstance().viewHandler as CjhxjViewHandler).gltf.hideModel6(); },
            () => {(ViewController.getInstance().viewHandler as CjhxjViewHandler).gltf.hideModel7(); },
        ];
    }

}

