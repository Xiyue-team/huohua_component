import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { Zxgddwt2ViewHandler } from './services/Zxgddwt2ViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';
const viewOptionConfig = require('./meta.json');
import * as questionCoverImg from './sub_static/question.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import * as analytic11Img from './sub_static/analytic11.png';
import * as analytic22Img from './sub_static/analytic22.png';
import * as analytic111Img from './sub_static/analytic111.png';
import * as analytic222Img from './sub_static/analytic222.png';

@Component
export class MainVueComponent extends Vue {

  // data
  sliderOneNumber = 1.8;
  sliderTwoNumber = 45;
  sliderThreeNumber = 1;
  sliderOneShow = true;
  sliderTwoShow = false;
  sliderThreeShow = false;
  sliderOption = {
    lazy: false,
    width: '180px',
    height: 2,
    min: -10,
    max: 10,
    interval: 0.01,
    piecewise: false,
    reverse: false,
    tooltip: 'always',
    bgStyle: {
      'backgroundColor': '#CCCCCC',
    },
    processStyle: {
      'backgroundColor': '#CCCCCC',
    },
    tooltipStyle: {
      'box-shadow': 'none',
      'border': 'none'
    },
  };

  sliderOption2 = {
    lazy: false,
    width: '180px',
    height: 2,
    min: 0,
    max: 359,
    interval: 1,
    piecewise: false,
    reverse: false,
    tooltip: 'always',
    bgStyle: {
      'backgroundColor': '#CCCCCC',
    },
    processStyle: {
      'backgroundColor': '#CCCCCC',
    },
    tooltipStyle: {
      'box-shadow': 'none',
      'border': 'none'
    },
  };

  sliderOption3 = {
    lazy: false,
    width: '180px',
    height: 2,
    min: -10,
    max: 10,
    interval: 0.1,
    piecewise: false,
    reverse: false,
    tooltip: 'always',
    bgStyle: {
      'backgroundColor': '#CCCCCC',
    },
    processStyle: {
      'backgroundColor': '#CCCCCC',
    },
    tooltipStyle: {
      'box-shadow': 'none',
      'border': 'none'
    },
  };

  exerciseOption = {
    exercise: {},
    resizeCall: {},
    analyticArray: ['题目一', '题目二', '题目三']
  };

  ctrl1 = true;
  ctrl2 = true;
  ctrl3 = true;
  ctrl4 = true;

  ctrl5 = true;
  ctrl6 = true;

  analyticCtrl = false;

  // created
  created() {
    const config = {
      question: {
        title: '直线过定点问题2',
        coverImage: questionCoverImg
      },
      analyticArray: [
        {
          title: '题目一',
          stepArray: [
            //解法一
            {
              coverImage: analytic1Img, call: () => {
                if (!this.ctrl1) {
                  return;
                }
                this.sliderOneShow = true;
                this.sliderTwoShow = false;
                this.sliderThreeShow = false;
                setTimeout(() => {
                  (this as any).$refs.slider1th.refresh();
                }, 100);
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group1.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group2.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group3.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.pointOne[1].visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.pointOne[2].visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.linePq.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.dashLineOnePA.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.dashLineOneQA.visible = false;
                this.ctrl1 = false;
                this.ctrl2 = true;
                this.ctrl3 = true;
                this.ctrl4 = true;

                this.ctrl5 = true;
                this.ctrl6 = true;
              }
            },
            {
              coverImage: analytic2Img, call: () => {
                if (!this.ctrl2) {
                  return;
                }
                setTimeout(() => {
                  (this as any).$refs.slider1th.refresh();
                }, 100);
                this.sliderOneShow = true;
                this.sliderTwoShow = false;
                this.sliderThreeShow = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group1.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group2.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group3.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.pointOne[1].visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.pointOne[2].visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.linePq.visible = true;
                this.analyticCtrl = true;
                this.ctrl1 = true;
                this.ctrl2 = false;
                this.ctrl3 = true;
                this.ctrl4 = true;

                this.ctrl5 = true;
                this.ctrl6 = true;
              }
            }
          ]
        },
        {
          title: '题目二',
          stepArray: [
            {
              coverImage: analytic11Img, call: () => {
                if (!this.ctrl3) {
                  return;
                }
                this.sliderOneShow = false;
                this.sliderTwoShow = true;
                this.sliderThreeShow = false;
                setTimeout(() => {
                  (this as any).$refs.slider2th.refresh();
                }, 100);
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group1.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group2.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group3.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.pointTwo[1].visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.pointTwo[2].visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.dashLineTwoPA.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.dashLineTwoQA.visible = false;
                this.ctrl1 = true;
                this.ctrl2 = true;
                this.ctrl3 = false;
                this.ctrl4 = true;

                this.ctrl5 = true;
                this.ctrl6 = true;
              }
            },
            {
              coverImage: analytic22Img, call: () => {
                if (!this.ctrl4) {
                  return;
                }
                setTimeout(() => {
                  (this as any).$refs.slider2th.refresh();
                }, 100);
                this.sliderOneShow = false;
                this.sliderTwoShow = true;
                this.sliderThreeShow = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group1.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group2.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group3.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.pointTwo[1].visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.pointTwo[2].visible = true;
                this.ctrl1 = true;
                this.ctrl2 = true;
                this.ctrl3 = true;
                this.ctrl4 = false;

                this.ctrl5 = true;
                this.ctrl6 = true;
              }
            }]
        },

        {
          title: '题目三',
          stepArray: [
            //解法三
            {
              coverImage: analytic111Img, call: () => {
                if (!this.ctrl5) {
                  return;
                }
                this.sliderOneShow = false;
                this.sliderTwoShow = false;
                this.sliderThreeShow = true;
                setTimeout(() => {
                  (this as any).$refs.slider3th.refresh();
                }, 100);
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group1.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group2.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group3.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.pointThree[1].visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.pointThree[2].visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.lineAb.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.dashLineThreePA.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.dashLineThreeQA.visible = false;
                this.ctrl1 = true;
                this.ctrl2 = true;
                this.ctrl3 = true;
                this.ctrl4 = true;

                this.ctrl5 = false;
                this.ctrl6 = true;
              }
            },
            {
              coverImage: analytic222Img, call: () => {
                if (!this.ctrl6) {
                  return;
                }
                setTimeout(() => {
                  (this as any).$refs.slider3th.refresh();
                }, 100);
                this.sliderOneShow = false;
                this.sliderTwoShow = false;
                this.sliderThreeShow = true;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group1.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group2.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group3.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.pointThree[1].visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.pointThree[2].visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.lineAb.visible = true;
                this.ctrl1 = true;
                this.ctrl2 = true;
                this.ctrl3 = true;
                this.ctrl4 = true;

                this.ctrl5 = true;
                this.ctrl6 = false;
              }
            }]
        }
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

    if ((window as any)['env'].browserInfo.isSmallDevice) {
      (document.getElementsByClassName('sliderOne_Class')[0] as HTMLElement).style.bottom = '-20px';
      (document.getElementsByClassName('sliderTwo_Class')[0] as HTMLElement).style.bottom = '-20px';
      (document.getElementsByClassName('sliderThree_Class')[0] as HTMLElement).style.bottom = '-20px';
    }
  }

  @Watch('sliderOneNumber')
  getSliderOneNumber(value: number) {
    if ((ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group1.visible === true) {
      (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.rotatePoint[0].rotation.z
        = Math.atan(-1 / value);
    }

    if (value === 0) {
      (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.rotatePoint[0].visible = false;
    } else {
      (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.rotatePoint[0].visible = true;
    }

    const slopePA = (-10 - 10) / (0 + 10);
    if (Number.parseFloat((-1 / value).toFixed(1)) === Number.parseFloat(slopePA.toFixed(1))) {
      if (this.ctrl1) {
        (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.dashLineOnePA.visible = true;
      }
    }

    const slopeQA = (-10 - 20) / (0 - 20);
    if (Number.parseFloat((-1 / value).toFixed(0)) === Number.parseFloat(slopeQA.toFixed(0))) {
      if (this.ctrl1) {
        (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.dashLineOneQA.visible = true;
      }
    }
  }

  @Watch('sliderTwoNumber')
  getSliderTwoNumber(value: number) {
    if ((ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group2.visible === true) {
      (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.rotatePoint[1].rotation.z
        = (value * Math.PI / 180 + Math.PI);
    }

    const slopePA = (0 + 17.3) / (30 - 0);
    if (value === Math.round(Math.atan(slopePA) * 180 / Math.PI) ||
      Math.abs(value - (Math.round(Math.atan(slopePA) * 180 / Math.PI) + 180)) <= 1) {
      if (this.ctrl3) {
        (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.dashLineTwoQA.visible = true;
      }
    }

    if (value === 90 || Math.abs(value - 270) <= 1) {
      if (this.ctrl3) {
        (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.dashLineTwoPA.visible = true;
      }
    }
  }

  @Watch('sliderThreeNumber')
  getSliderThreeNumber(value: number) {
    if ((ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.group3.visible === true) {
      (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.rotatePoint[2].rotation.z
        = (Math.atan(value) + Math.PI);
    }

    const slopePA = (30 - 10) / (10 - 20);
    if (Math.abs(value - Number.parseFloat(slopePA.toFixed(1))) <= 0.15) {
      if (this.ctrl5) {
        (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.dashLineThreePA.visible = true;
      }
    }

    const slopePB = (-10 - 10) / (-20 - 20);
    if (value === Number.parseFloat(slopePB.toFixed(1))) {
      if (this.ctrl5) {
        (ViewController.getInstance().viewHandler as Zxgddwt2ViewHandler).zxgdd.dashLineThreeQA.visible = true;
      }
    }
  }
}

