import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import {YszqbViewHandler} from './services/YszqbViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {
            question : {
                title : '元素周期表和元素周期律1',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {

                        }},
                ]
            }]
        },
        resizeCall: {},
        analyticArray: ['解析一']
    };

    created() {
      (window as any)['direction'] = 'right';
        const config = {
            question : {
                title : '元素周期表喝元素周期律1',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {

                        }},
                    { coverImage: analytic2Img , call: () => {

                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;

        this.exerciseOption.resizeCall = (directionPos: any) => {
          (ViewController.getInstance().viewHandler as YszqbViewHandler).bjsCanvas.expandImage(directionPos);
          (ViewController.getInstance().viewHandler as YszqbViewHandler).bjsCanvas.resize();
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
      ViewController.getInstance().domReady();
    }

}

