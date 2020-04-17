import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import * as analytic3Img from './sub_static/analytic3.png';
import {FenZiViewHandler} from './services/FenZiViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };

    switch2Option = {
        datas: ['球棍', '比例'],
    };
    switch2Model = '球棍';

    newTitle = '晶胞切割';

    isActive1 = false;
    clickNumber1 = true;

    isActive2 = false;
    clickNumber2 = true;

    buttonDisable = true;

    disable = false;

    created() {
        const config = {
            question : {
                title : '分子晶体1',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {
                            (ViewController.getInstance().viewHandler as FenZiViewHandler).model.hideModel();
                            (ViewController.getInstance().viewHandler as FenZiViewHandler).model.obj1.visible = true;
                        }},
                    { coverImage: analytic2Img , call: () => {
                            (ViewController.getInstance().viewHandler as FenZiViewHandler).model.hideModel();
                            (ViewController.getInstance().viewHandler as FenZiViewHandler).model.obj2.visible = true;
                        }},
                    { coverImage: analytic3Img , call: () => {
                            (ViewController.getInstance().viewHandler as FenZiViewHandler).model.hideModel();
                            (ViewController.getInstance().viewHandler as FenZiViewHandler).model.obj3.visible = true;
                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as FenZiViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new FenZiViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as FenZiViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }
}

