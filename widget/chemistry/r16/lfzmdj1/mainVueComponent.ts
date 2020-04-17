import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import {LiuFangViewHandler} from './services/LiuFangViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };

    disable = false;

    created() {
        const config = {
            question : {
                title : '六方最密堆积1',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {

                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as LiuFangViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new LiuFangViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as LiuFangViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    get stepArry() {
        return [
            () => {
                (ViewController.getInstance().viewHandler as LiuFangViewHandler).liuFang3DModel.resetAnimation1();
                (ViewController.getInstance().viewHandler as LiuFangViewHandler).liuFang3DModel.hideScene();
                (ViewController.getInstance().viewHandler as LiuFangViewHandler).liuFang3DModel.obj1.visible = true;

            },
            () => {
                (ViewController.getInstance().viewHandler as LiuFangViewHandler).liuFang3DModel.resetAnimation2();
                (ViewController.getInstance().viewHandler as LiuFangViewHandler).liuFang3DModel.hideScene();
                (ViewController.getInstance().viewHandler as LiuFangViewHandler).liuFang3DModel.obj2.visible = true;
                (ViewController.getInstance().viewHandler as LiuFangViewHandler).liuFang3DModel.hideAnimation1.play();
            },
            () => {
                (ViewController.getInstance().viewHandler as LiuFangViewHandler).liuFang3DModel.hideScene();
                (ViewController.getInstance().viewHandler as LiuFangViewHandler).liuFang3DModel.obj3.visible = true;
                (ViewController.getInstance().viewHandler as LiuFangViewHandler).liuFang3DModel.hideAnimation2.play();
            }
        ];
    }
}

