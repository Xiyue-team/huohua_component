import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import * as analytic4Img from './sub_static/analytic4.png';
import * as analytic5Img from './sub_static/analytic5.png';
import * as analytic6Img from './sub_static/analytic6.png';
import {DlnViewHandler} from './services/DlnViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };

    analysisShow1 = true;
    analysisShow2 = true;
    analysisShow3 = true;
    analysisShow4 = true;
    analysisShow5 = true;




    created() {
        const config = {
            question : {
                title : '电离能和电负性1',
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
                            this.analysisShow3 = true;
                            this.analysisShow4 = true;
                            this.analysisShow5 = true;
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.hideGroup();
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.group1.visible(true);
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.staticLayer.draw();
                        }},
                    { coverImage: analytic2Img , call: () => {
                            if (this.analysisShow2 === false) {
                                return;
                            }
                            this.analysisShow1 = true;
                            this.analysisShow2 = false;
                            this.analysisShow3 = true;
                            this.analysisShow4 = true;
                            this.analysisShow5 = true;
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.hideGroup();
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.hideImage();
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.group2.visible(true);
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.staticLayer.draw();
                        }},
                    { coverImage: analytic4Img , call: () => {
                            if (this.analysisShow3 === false) {
                                return;
                            }
                            this.analysisShow1 = true;
                            this.analysisShow2 = true;
                            this.analysisShow3 = false;
                            this.analysisShow4 = true;
                            this.analysisShow5 = true;
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.hideGroup();
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.hideImage();
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.group3.visible(true);
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.staticLayer.draw();
                        }},
                    { coverImage: analytic5Img , call: () => {
                            if (this.analysisShow4 === false) {
                                return;
                            }
                            this.analysisShow1 = true;
                            this.analysisShow2 = true;
                            this.analysisShow3 = true;
                            this.analysisShow4 = false;
                            this.analysisShow5 = true;
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.hideGroup();
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.hideImage();
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.group4.visible(true);
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.staticLayer.draw();
                        }},
                    { coverImage: analytic6Img , call: () => {
                            if (this.analysisShow5 === false) {
                                return;
                            }
                            this.analysisShow1 = true;
                            this.analysisShow2 = true;
                            this.analysisShow3 = true;
                            this.analysisShow4 = true;
                            this.analysisShow5 = false;
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.hideGroup();
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.hideImage();
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.group5.visible(true);
                            (ViewController.getInstance().viewHandler as DlnViewHandler).bjsCanvas.staticLayer.draw();
                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as DlnViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new DlnViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as DlnViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

}

