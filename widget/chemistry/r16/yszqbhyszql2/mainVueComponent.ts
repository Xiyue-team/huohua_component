import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import {YszqbViewHandler} from './services/YszqbViewHandler';
import {MianXinViewHandler} from '../mxlfdj1/services/MianXinViewHandler';
import {Watch} from 'vue-property-decorator';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一'],
        enterCall: {}
    };

    newTitle2 = '过渡金属';

    switch2Option = {
        datas: ['非金属', '金属'],
    };

    switch2Model = '非金属';

    actived2 = false;
    showbutton = true;
    showPbutton = true;

    analysisShow1 = false;
    analysisShow2 = true;



    created() {

        const config = {
            question : {
                title : '元素周期表和元素周期律2',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {

                        if (this.analysisShow1 === false) {
                                return;
                            }
                            this.analysisShow1 = false;
                            this.analysisShow2 = true;
                            this.showbutton = false;
                            this.showPbutton = false;
                            this.switch2Model = '非金属';
                            (ViewController.getInstance().viewHandler as YszqbViewHandler).bjsCanvas.showStep1Image();
                    }},
                    { coverImage: analytic2Img , call: () => {
                        if (this.analysisShow2 === false) {
                            return;
                        }
                        this.analysisShow1 = true;
                        this.analysisShow2 = false;
                        this.showbutton = true;
                        this.showPbutton = false;

                        (ViewController.getInstance().viewHandler as YszqbViewHandler).bjsCanvas.showStep2Image();
                    }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;
        this.exerciseOption.enterCall = () => {
            this.showbutton = false;
            this.showPbutton = false;
        };

        this.exerciseOption.resizeCall = (leftOrRight: any) => {
            (ViewController.getInstance().viewHandler as YszqbViewHandler).moveDiv();
            (ViewController.getInstance().viewHandler as YszqbViewHandler).bjsCanvas.moveImage(leftOrRight);
        };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new YszqbViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as YszqbViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    clickEvent2() {
        // (ViewController.getInstance().viewHandler as YszqbViewHandler).bjsCanvas.showWhiteImageLeftRight();
        if (this.actived2 === false) {
            this.actived2 = true;
            console.log('1111');
            (ViewController.getInstance().viewHandler as YszqbViewHandler).bjsCanvas.step3Image.visible(false);
            (ViewController.getInstance().viewHandler as YszqbViewHandler).bjsCanvas.step4Image.visible(true);
        } else {
            this.actived2 = false;
            console.log('2222');
            (ViewController.getInstance().viewHandler as YszqbViewHandler).bjsCanvas.step3Image.visible(true);
            (ViewController.getInstance().viewHandler as YszqbViewHandler).bjsCanvas.step4Image.visible(false);
        }

        (ViewController.getInstance().viewHandler as YszqbViewHandler).bjsCanvas.staticLayer.draw();
    }

    @Watch('switch2Model')
    onSwitch2ModelChange(value: any) {
        if (value === '非金属') {
            console.log('非金属');
            this.showPbutton = false;
            this.actived2 = false;
            (ViewController.getInstance().viewHandler as YszqbViewHandler).bjsCanvas.step2Image.visible(true);
            (ViewController.getInstance().viewHandler as YszqbViewHandler).bjsCanvas.step3Image.visible(false);
            (ViewController.getInstance().viewHandler as YszqbViewHandler).bjsCanvas.step4Image.visible(false);
        } else {
            console.log('金属');
            (ViewController.getInstance().viewHandler as YszqbViewHandler).bjsCanvas.step2Image.visible(false);
            (ViewController.getInstance().viewHandler as YszqbViewHandler).bjsCanvas.step3Image.visible(true);
            this.showPbutton = true;
        }
        (ViewController.getInstance().viewHandler as YszqbViewHandler).bjsCanvas.staticLayer.draw();
    }
}

