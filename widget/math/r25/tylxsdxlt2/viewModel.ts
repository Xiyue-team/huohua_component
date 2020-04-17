import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ViewController} from '../../../../src/core/ViewController';
import {TemplateViewHandler} from './services/TemplateViewHandler';
import * as questionImage from './sub_static/title.png';
import * as analysis1 from './sub_static/analysis1.png';
import * as analysis2 from './sub_static/analysis2.png';
@Component
export class ViewModel extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解法一']
    };

    created() {
        const config = {
            question: {
                title: '椭圆离心率典型例题2',
                coverImage: questionImage,
            },
            analyticArray: [{

                title: '解法一',
                stepArray: [
                  {coverImage: analysis1 , call: () => {
                      (ViewController.getInstance().viewHandler as TemplateViewHandler).tylxs.isShowDashLine(true);
                    }},
                  {coverImage: analysis2 , call: () => {
                      (ViewController.getInstance().viewHandler as TemplateViewHandler).tylxs.isShowDashLine(false);
                    }},
                  ]
            }],
        };
        this.exerciseOption.exercise = config;

        this.exerciseOption.resizeCall = (value: string) => {
            (ViewController.getInstance().viewHandler as TemplateViewHandler).moveDiv();
        };

        const viewOption = new ViewOption();
         viewOption.showMobileExpandIco = false;
          viewOption.adapterMobilePanel = true;
          viewOption.mobilePanelAlpha = true;
          viewOption.showMobileResetIco = false;
          viewOption.controlPanelAnimationDelay = 0;
          viewOption.showReset = false;
        ViewController.getInstance(new TemplateViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
      const width1 = document.getElementById('pinmu').clientWidth;
      const model = document.getElementById('3dContainer');
      model.style.width = width1 + 'px';
      model.style.height = '100%';
      (ViewController.getInstance().viewHandler as TemplateViewHandler).moveDiv();
       ViewController.getInstance().domReady();

    }


    resetEvent() {
    }
}
