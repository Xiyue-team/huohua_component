import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { Zxgddwt1ViewHandler } from './services/Zxgddwt1ViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';
const viewOptionConfig = require('./meta.json');
import * as questionCoverImg from './sub_static/question.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import * as analytic3Img from './sub_static/analytic3.png';
import * as analytic4Img from './sub_static/analytic4.png';
import * as analytic11Img from './sub_static/analytic11.png';
import * as analytic22Img from './sub_static/analytic22.png';
import * as analytic111Img from './sub_static/analytic111.png';
import * as analytic222Img from './sub_static/analytic222.png';

@Component
export class MainVueComponent extends Vue {

  // data
  sliderOneNumber = -0.7;
  sliderTwoNumber = -0.1;
  sliderThreeNumber = -0.1;
  sliderOneShow = true;
  sliderTwoShow = false;
  sliderThreeShow = false;
  sliderOption = {
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

  ctrl7 = true;
  ctrl8 = true;

  analyticCtrl = false;

  // created
  created() {
    const config = {
      question: {
        title: window.env.browserInfo.lang.title,
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
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group1.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group2.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group3.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.pPoint[0].visible = false;
                this.ctrl1 = false;
                this.ctrl2 = true;
                this.ctrl3 = true;
                this.ctrl4 = true;

                this.ctrl5 = true;
                this.ctrl6 = true;

                this.ctrl7 = true;
                this.ctrl8 = true;

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
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group1.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group2.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group3.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.pPoint[0].visible = true;
                this.analyticCtrl = true;
                this.ctrl1 = true;
                this.ctrl2 = false;
                this.ctrl3 = true;
                this.ctrl4 = true;

                this.ctrl5 = true;
                this.ctrl6 = true;

                this.ctrl7 = true;
                this.ctrl8 = true;

              }
            },
            {
              coverImage: analytic3Img, call: () => {
                if (!this.ctrl3) {
                  return;
                }
                setTimeout(() => {
                  (this as any).$refs.slider1th.refresh();
                }, 100);
                this.sliderOneShow = true;
                this.sliderTwoShow = false;
                this.sliderThreeShow = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group1.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group2.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group3.visible = false;
                if (this.analyticCtrl) {
                  this.sliderOneNumber = -0.7;
                  (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.pPoint[0].visible = false;
                }

                this.analyticCtrl = true;
                this.ctrl1 = true;
                this.ctrl2 = true;
                this.ctrl3 = false;
                this.ctrl4 = true;

                this.ctrl5 = true;
                this.ctrl6 = true;

                this.ctrl7 = true;
                this.ctrl8 = true;

              }
            },
            {
              coverImage: analytic4Img, call: () => {
                if (!this.ctrl4) {
                  return;
                }
                setTimeout(() => {
                  (this as any).$refs.slider1th.refresh();
                }, 100);
                this.sliderOneShow = true;
                this.sliderTwoShow = false;
                this.sliderThreeShow = false;
                this.analyticCtrl = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group1.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group2.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group3.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.pPoint[0].visible = true;
                this.ctrl1 = true;
                this.ctrl2 = true;
                this.ctrl3 = true;
                this.ctrl4 = false;

                this.ctrl5 = true;
                this.ctrl6 = true;

                this.ctrl7 = true;
                this.ctrl8 = true;

              }
            }
          ]
        },
        {
          title: '题目二',
          stepArray: [
            {
              coverImage: analytic11Img, call: () => {
                if (!this.ctrl5) {
                  return;
                }
                this.sliderOneShow = false;
                this.sliderTwoShow = true;
                this.sliderThreeShow = false;
                setTimeout(() => {
                  (this as any).$refs.slider2th.refresh();
                }, 100);
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group1.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group2.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group3.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.pPoint[1].visible = false;
                this.ctrl1 = true;
                this.ctrl2 = true;
                this.ctrl3 = true;
                this.ctrl4 = true;

                this.ctrl5 = false;
                this.ctrl6 = true;

                this.ctrl7 = true;
                this.ctrl8 = true;

              }
            },
            {
              coverImage: analytic22Img, call: () => {
                if (!this.ctrl6) {
                  return;
                }
                setTimeout(() => {
                  (this as any).$refs.slider2th.refresh();
                }, 100);
                this.sliderOneShow = false;
                this.sliderTwoShow = true;
                this.sliderThreeShow = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group1.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group2.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group3.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.pPoint[1].visible = true;
                this.ctrl1 = true;
                this.ctrl2 = true;
                this.ctrl3 = true;
                this.ctrl4 = true;

                this.ctrl5 = true;
                this.ctrl6 = false;

                this.ctrl7 = true;
                this.ctrl8 = true;

              }
            }]
        },

        {
          title: '题目三',
          stepArray: [
            //解法三
            {
              coverImage: analytic111Img, call: () => {
                if (!this.ctrl7) {
                  return;
                }
                this.sliderOneShow = false;
                this.sliderTwoShow = false;
                this.sliderThreeShow = true;
                setTimeout(() => {
                  (this as any).$refs.slider3th.refresh();
                }, 100);
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group1.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group2.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group3.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.pPoint[2].visible = false;
                this.ctrl1 = true;
                this.ctrl2 = true;
                this.ctrl3 = true;
                this.ctrl4 = true;

                this.ctrl5 = true;
                this.ctrl6 = true;

                this.ctrl7 = false;
                this.ctrl8 = true;
              }
            },
            {
              coverImage: analytic222Img, call: () => {
                if (!this.ctrl8) {
                  return;
                }
                setTimeout(() => {
                  (this as any).$refs.slider3th.refresh();
                }, 100);
                this.sliderOneShow = false;
                this.sliderTwoShow = false;
                this.sliderThreeShow = true;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group1.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group2.visible = false;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group3.visible = true;
                (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.pPoint[2].visible = true;
                this.ctrl1 = true;
                this.ctrl2 = true;
                this.ctrl3 = true;
                this.ctrl4 = true;

                this.ctrl5 = true;
                this.ctrl6 = true;

                this.ctrl7 = true;
                this.ctrl8 = false;

              }
            }]
        }
      ]
    };
    this.exerciseOption.exercise = config;

    this.exerciseOption.resizeCall = () => {
      (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).moveDiv();
    };

    (window as any).noMobile = true;
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
    viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
    viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
    viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
    viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
    viewOption.showReset = viewOptionConfig.config.showReset;
    ViewController.getInstance(new Zxgddwt1ViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  // mounted
  mounted() {
    const width1 = document.getElementById('pinmu').clientWidth;
    const model = document.getElementById('3dContainer');
    model.style.width = width1 + 'px';
    model.style.height = '100%';

    (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).moveDiv();
    ViewController.getInstance().domReady();

    if ((window as any)['env'].browserInfo.isSmallDevice) {
      (document.getElementsByClassName('sliderOne_Class')[0] as HTMLElement).style.bottom = '-20px';
      (document.getElementsByClassName('sliderTwo_Class')[0] as HTMLElement).style.bottom = '-20px';
      (document.getElementsByClassName('sliderThree_Class')[0] as HTMLElement).style.bottom = '-20px';
    }
  }

  @Watch('sliderOneNumber')
  getSliderOneNumber(value: number) {
    if ((ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group1.visible === true) {
      (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.rotatePoint[0].rotation.z
        = Math.atan(-(2 * value + 1) / (value + 1));
    }
  }

  @Watch('sliderTwoNumber')
  getSliderTwoNumber(value: number) {
    if ((ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group2.visible === true) {
      (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.rotatePoint[1].rotation.z
        = Math.atan(-(value - 1) / (2 * value - 1));
    }
  }

  @Watch('sliderThreeNumber')
  getSliderThreeNumber(value: number) {
    if ((ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.group3.visible === true) {
      (ViewController.getInstance().viewHandler as Zxgddwt1ViewHandler).zxgdd.rotatePoint[2].rotation.z
        = Math.atan(-(value + 3) / (1 - 2 * value));
    }
  }
}

