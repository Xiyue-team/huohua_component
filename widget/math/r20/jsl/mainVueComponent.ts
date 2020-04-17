import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { JslViewHandler } from './services/JslViewHandler';

import questionCoverImg from './sub_static/title.png';
import analytic1Img from './sub_static/first.png';
import analytic2Img from './sub_static/second.png';
import analytic3Img from './sub_static/third.png';

@Component
export class MainVueComponent extends Vue {
  exerciseOption = {
    exercise: {
      question: {
        title: '2012年江苏理（19）',
        coverImage: questionCoverImg
      },
      analyticArray: [
        {
          title: '解析一',
          stepArray: [
            {
              coverImage: analytic1Img, call: () => {
              }
            }
          ]
        }
      ]
    },
    resizeCall: {},
    analyticArray: ['解析一'],
    showAnalytic: true
  };

  zoom1 = 0;
  left: any = true;
  isMake: boolean;

  created() {
    const config = {
      question: {
        title: '椭圆',
        coverImage: questionCoverImg
      },

      analyticArray: [{
        title: '解析一',
        stepArray: [
          {
            coverImage: analytic1Img, call: () => {
              this.isMake = true;
              (ViewController.getInstance().viewHandler as JslViewHandler).gltf.remove();
            }
          },
          {
            coverImage: analytic2Img, call: () => {
              if (!this.isMake) {
                return;
              }
              this.isMake = false;
              (ViewController.getInstance().viewHandler as JslViewHandler).gltf.second();
            }
          },
          {
            coverImage: analytic3Img, call: () => {
              this.isMake = true;
              (ViewController.getInstance().viewHandler as JslViewHandler).gltf.third();
            }
          }
        ]
      }]
    };
    this.exerciseOption.exercise = config;

    this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as JslViewHandler).moveDiv(); };

    (window as any).noMobile = true;

    const viewOption = new ViewOption();
      viewOption.showMobileExpandIco = false;
      viewOption.showReset = false;
      viewOption.showMobileResetIco = false;
      ViewController.getInstance(new JslViewHandler(this), viewOption);
    }

  mounted() {
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    const width1 = document.getElementById('pinmu').clientWidth;
    const model = document.getElementById('3dModel');
    model.style.width = width1 + 'px';
    model.style.height = '100%';
    (ViewController.getInstance().viewHandler as JslViewHandler).moveDiv();
    ViewController.getInstance().domReady();
  }
  resize() {
    const W1 = window.innerWidth;
    if (W1 > 1200) {
      this.zoom1 = 1;
    } else {
      this.zoom1 = 0.5;
    }
  }
}

