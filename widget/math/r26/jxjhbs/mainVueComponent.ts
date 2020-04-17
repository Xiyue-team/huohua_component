import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { JxjhbsViewHandler } from './services/JxjhbsViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
const viewOptionConfig = require('./meta.json');
import * as questionCoverImg from './sub_static/question.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import * as analytic3Img from './sub_static/analytic3.png';

@Component
export class MainVueComponent extends Vue {

  exerciseOption = {
    exercise: {},
    resizeCall: {},
    analyticArray: [window.env.browserInfo.lang.title]
  };

  ctrl1 = true;
  ctrl2 = true;
  ctrl3 = true;
  buttonShow = false;
  drawColor = false;
  buttonTitle = window.env.browserInfo.lang.buttonTitle;

  // created
  created() {
    const config = {
      question: {
        title: window.env.browserInfo.lang.title,
        coverImage: questionCoverImg
      },
      analyticArray: [
        {
          title: window.env.browserInfo.lang.title,
          stepArray: [
            //解法一
            {
              coverImage: analytic1Img, call: () => {
                if (!this.ctrl1) {
                  return;
                }
                this.ctrl1 = false;
                this.ctrl2 = true;
                this.ctrl3 = true;
                this.buttonShow = false;
                this.drawColor = false;
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.segmentAB.visible = false;
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.dashLineOA.visible = false;
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.dashLineOR.visible = false;
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.rPoint.visible = false;
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.innerRightAngleImg.visible = false;
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.segmentPQ.visible = false;
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.animation.pause();
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.animation.progress(0);
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.removePoint(
                  (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.movePointArray,
                  (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.count,
                  (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.scene
                );
              }
            },
            {
              coverImage: analytic2Img, call: () => {
                if (!this.ctrl2) {
                  return;
                }
                this.ctrl1 = true;
                this.ctrl2 = false;
                this.ctrl3 = true;
                this.buttonShow = false;
                this.drawColor = false;
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.segmentAB.visible = true;
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.dashLineOA.visible = true;
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.dashLineOR.visible = true;
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.rPoint.visible = true;
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.innerRightAngleImg.visible = true;
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.segmentPQ.visible = false;
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.animation.pause();
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.animation.progress(0);
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.removePoint(
                  (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.movePointArray,
                  (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.count,
                  (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.scene
                );
              }
            },
            {
              coverImage: analytic3Img, call: () => {
                if (!this.ctrl3) {
                  return;
                }
                this.ctrl1 = true;
                this.ctrl2 = true;
                this.ctrl3 = false;
                this.buttonShow = true;
                (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.segmentPQ.visible = true;
              }
            }]
        },
      ]
    };
    this.exerciseOption.exercise = config;
    this.exerciseOption.resizeCall = () => {
      (ViewController.getInstance().viewHandler as JxjhbsViewHandler).moveDiv();
    };

    (window as any).noMobile = true;
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;
    ViewController.getInstance(new JxjhbsViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  // mounted
  mounted() {
    const width1 = document.getElementById('pinmu').clientWidth;
    const model = document.getElementById('3dContainer');
    model.style.width = width1 + 'px';
    model.style.height = '100%';

    (ViewController.getInstance().viewHandler as JxjhbsViewHandler).moveDiv();
    ViewController.getInstance().domReady();
  }

  drawEvent() {
    this.drawColor = true;
    (ViewController.getInstance().viewHandler as JxjhbsViewHandler).jxjhbs.animation.play();
  }
}

