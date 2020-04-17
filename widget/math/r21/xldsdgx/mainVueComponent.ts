import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { JslViewHandler } from './services/JslViewHandler';

import questionCoverImg from './sub_static/title.png';
import analytic1Img from './sub_static/first.png';
import analytic2Img from './sub_static/second.png';
import analytic3Img from './sub_static/third.png';
import analytic4Img from './sub_static/third.png';
import jielun from './sub_static/jielun.png';

@Component
export class MainVueComponent extends Vue {
  exerciseOption = {
    exercise: {
      question: {
        title: '向量的三点共线（习题）',
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

  jl = false;
  jielun = jielun;
  isactive: any = false;
  zoom = 1;

  created() {
    const config = {
      question: {
        title: '共线',
        coverImage: questionCoverImg
      },

      analyticArray: [{
        title: '解析一',
        stepArray: [
          {
            coverImage: analytic1Img, call: () => {
              (ViewController.getInstance().viewHandler as JslViewHandler).gltf.first();
              this.isactive = false;
              this.jl = false;
            }
          },
          {
            coverImage: analytic2Img, call: () => {
              (ViewController.getInstance().viewHandler as JslViewHandler).gltf.second();
              this.isactive = false;
              this.jl = false;
            }
          },
          {
            coverImage: analytic3Img, call: () => {
              (ViewController.getInstance().viewHandler as JslViewHandler).gltf.third();
              this.isactive = false;
              this.jl = false;
            }
          },
          {
            coverImage: analytic4Img, call: () => {
              this.jl = true;
              (ViewController.getInstance().viewHandler as JslViewHandler).gltf.four();
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
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    const width1 = document.getElementById('pinmu').clientWidth;
    const height1 = document.getElementById('pinmu').clientHeight;
    const model = document.getElementById('3dModel');
    model.style.width = width1 + 'px';
    model.style.height = '100%';
    (ViewController.getInstance().viewHandler as JslViewHandler).moveDiv();
    ViewController.getInstance().domReady();
    if (height1 <= 480) {
      document.getElementById('jlun').style.zoom = '0.6';
      document.getElementById('bot').style.zoom = '0.6';
    }
  }
}
