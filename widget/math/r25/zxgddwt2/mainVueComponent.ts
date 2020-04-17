import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { Zxgddwt2ViewHandler } from './services/Zxgddwt2ViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
const viewOptionConfig = require('./meta.json');
import * as questionCoverImg from './sub_static/question.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';

@Component
export class MainVueComponent extends Vue {

  exerciseOption = {
    exercise: {},
    resizeCall: {},
    analyticArray: ['直线过定点问题-2015年江苏理(10)']
  };

  ctrl1 = true;
  ctrl2 = true;

  // created
  created() {
    const config = {
      question: {
        title: '直线过定点问题-2015年江苏理(10)',
        coverImage: questionCoverImg
      },
      analyticArray: [
        {
          title: '直线过定点问题-2015年江苏理(10)',
          stepArray: [
            //解法一
            {
              coverImage: analytic1Img, call: () => {
                if (!this.ctrl1) {
                  return;
                }
                this.ctrl1 = false;
                this.ctrl2 = true;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd2.segmentOM.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd2.verticalLine.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd2.group.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd2.textA.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd2.verticalLine.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd2.bigPointM.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd2.textM.text = 'M';
              }
            },
            {
              coverImage: analytic2Img, call: () => {
                if (!this.ctrl2) {
                  return;
                }
                this.ctrl1 = true;
                this.ctrl2 = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd2.segmentOM.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd2.verticalLine.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd2.group.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd2.textA.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd2.verticalLine.visible = true;
                if ((ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd2.distance >= Math.sqrt(2) * 10) {
                    (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd2.bigPointM.visible = true;
                    (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd2.textA.visible = false;
                    (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd2.textM.text = 'A,M';
                }
              }
            }]
        },
      ]
    };
    this.exerciseOption.exercise = config;

    this.exerciseOption.resizeCall = () => {
      (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).moveDiv();
    };

    (window as any).noMobile = true;
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;
    ViewController.getInstance(new Zxgddwt2ViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  // mounted
  mounted() {
    const width1 = document.getElementById('pinmu').clientWidth;
    const model = document.getElementById('3dContainer');
    model.style.width = width1 + 'px';
    model.style.height = '100%';

    (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).moveDiv();
    ViewController.getInstance().domReady();
  }

}

