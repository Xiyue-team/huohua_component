import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {Ldwt1ViewHandler} from './services/Ldwt1ViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/question.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import * as analytic3Img from './sub_static/analytic3.png';
import * as analytic11Img from './sub_static/analytic11.png';
import * as analytic22Img from './sub_static/analytic22.png';
import * as analytic33Img from './sub_static/analytic33.png';
import * as analytic44Img from './sub_static/analytic44.png';

@Component
export class MainVueComponent extends Vue {

      // data
      exerciseOption = {
            exercise: {},
            resizeCall: {},
            analyticArray : ['解法一', '解法二']
      };

      ctrl1 =  true;
      ctrl2 =  true;
      ctrl3 =  true;

      ctrl4 = true;
      ctrl5 = true;
      ctrl6 = true;
      ctrl7 = true;

      // created
      created() {
              const config = {
              question : {
                title : '零点问题1',
                coverImage : questionCoverImg
              },
              analyticArray: [
                {
                  title: '解法一',
                  stepArray: [
                    //解法一
                    { coverImage: analytic1Img , call: () => {
                      if (!this.ctrl1) {
                        return;
                      }
                        this.ctrl1 = false;
                        this.ctrl2 = true;
                        this.ctrl3 = true;

                        this.ctrl4 = true;
                        this.ctrl5 = true;
                        this.ctrl6 = true;
                        this.ctrl7 = true;

                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideFormulaLine(false, false, false, false);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideFormulaImg(false, false, false);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideAnalyticTwo(false, false);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideAnalyticOne(true, false, false);

                      }},
                    { coverImage: analytic2Img , call: () => {
                        if (!this.ctrl2) {
                          return;
                        }
                        this.ctrl1 = true;
                        this.ctrl2 = false;
                        this.ctrl3 = true;

                        this.ctrl4 = true;
                        this.ctrl5 = true;
                        this.ctrl6 = true;
                        this.ctrl7 = true;

                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideFormulaLine(false, false, false, false);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideFormulaImg(false, false, false);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideAnalyticTwo(false, false);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideAnalyticOne(true, true, false);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.point1.position.y = -85;
                      }},
                    { coverImage: analytic3Img , call: () => {
                       if (!this.ctrl3) {
                         return;
                       }
                        this.ctrl1 = true;
                        this.ctrl2 = true;
                        this.ctrl3 = false;

                        this.ctrl4 = true;
                        this.ctrl5 = true;
                        this.ctrl6 = true;
                        this.ctrl7 = true;

                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideFormulaLine(true, true, false, false);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideFormulaImg(false, false, false);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideAnalyticTwo(false, false);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideAnalyticOne(true, true, false);
                      }}]
                },


                {
                  title: '解法二',
                  stepArray : [
                    { coverImage: analytic11Img , call: () => {
                      if (!this.ctrl4) {
                          return;
                      }
                        this.ctrl1 = true;
                        this.ctrl2 = true;
                        this.ctrl3 = true;

                        this.ctrl4 = false;
                        this.ctrl5 = true;
                        this.ctrl6 = true;
                        this.ctrl7 = true;

                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideAnalyticOne(false, false, true);

                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.formulaLine[0].visible = false;
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.formulaLine[1].visible = false;

                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.formulaImg[3].visible = false;
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.group2.visible = false;
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.point2.visible = false;

                      }},
                    { coverImage: analytic22Img , call: () => {
                      if (!this.ctrl5) {
                        return;
                      }
                        this.ctrl1 = true;
                        this.ctrl2 = true;
                        this.ctrl3 = true;

                        this.ctrl4 = true;
                        this.ctrl5 = false;
                        this.ctrl6 = true;
                        this.ctrl7 = true;

                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideFormulaLine(false, false, false, false);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideFormulaImg(true, false, false);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideAnalyticTwo(true, false);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideAnalyticOne(false, false, true);

                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.slider2.visible = false;
                      }},
                    { coverImage: analytic33Img , call: () => {
                      if (!this.ctrl6) {
                        return;
                      }
                        this.ctrl1 = true;
                        this.ctrl2 = true;
                        this.ctrl3 = true;

                        this.ctrl4 = true;
                        this.ctrl5 = true;
                        this.ctrl6 = false;
                        this.ctrl7 = true;

                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideFormulaLine(false, false, false, false);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideFormulaImg(true, false, false);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideAnalyticTwo(true, true);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideAnalyticOne(false, false, true);

                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.slider2.visible = true;
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.point2.rotation.z = 0;
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.formulaImg[6].rotation.z = 0;
                      }},
                    { coverImage: analytic44Img , call: () => {
                        if (!this.ctrl7) {
                          return;
                        }
                        this.ctrl1 = true;
                        this.ctrl2 = true;
                        this.ctrl3 = true;

                        this.ctrl4 = true;
                        this.ctrl5 = true;
                        this.ctrl6 = true;
                        this.ctrl7 = false;

                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideFormulaLine(false, false, true, true);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideFormulaImg(true, true, true);
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.hideAnalyticOne(false, false, true);

                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.group2.visible = true;
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.point2.visible = true;
                        (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.slider2.visible = true;
                      }}
                    ]
                }
              ]
            };
            this.exerciseOption.exercise = config;

            this.exerciseOption.resizeCall = (value: string) => {
              (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).ldwt1.resetSliderctrl(value);
              (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).moveDiv();
            };

            (window as any).noMobile = true;

            const viewOption = new ViewOption();
            viewOption.showMobileExpandIco = false;
            viewOption.showReset = false;
            viewOption.showMobileResetIco = false;
            ViewController.getInstance(new Ldwt1ViewHandler(this), viewOption);
            ViewController.getInstance().viewHandler.beforeRenderElement();
      }

      // mounted
      mounted() {
            const width1 = document.getElementById('pinmu').clientWidth;
            const model = document.getElementById('3dContainer');
            model.style.width = width1 + 'px';
            model.style.height = '100%';

            (ViewController.getInstance().viewHandler as Ldwt1ViewHandler).moveDiv();
            ViewController.getInstance().domReady();
      }

}

