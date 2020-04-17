import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1 from './sub_static/analytic1.png';
import * as analytic2 from './sub_static/analytic2.png';
import * as analytic3 from './sub_static/analytic3.png';
import * as analytic4 from './sub_static/analytic4.png';
import {FzjtViewHandler} from './services/FzjtViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };
      num1 = 0;
      isShow = false;
      ctrl1 = true;
      ctrl2 = true;
      ctrl3 = true;
      ctrl4 = true;

    created() {
        const config = {
            question : {
                title : '分子晶体3',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                      { coverImage: analytic1 , call: () => {
                        if (!this.ctrl1) {
                            return;
                        }
                          this.ctrl1 = false;
                          this.ctrl2 = true;
                          this.ctrl3 = true;
                          this.ctrl4 = true;
                          this.isShow = false;
                          this.num1 = 0;
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.resetCamera();
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.obj1.visible = true;
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.obj2.visible = false;
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.obj3.visible = false;
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.obj4.visible = false;
                        }},

                      { coverImage: analytic2 , call: () => {
                          if (!this.ctrl2) {
                            return;
                          }
                          this.ctrl1 = true;
                          this.ctrl2 = false;
                          this.ctrl3 = true;
                          this.ctrl4 = true;
                          this.isShow = false;
                          this.num1 = 0;
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.resetCamera();
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.obj1.visible = false;
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.obj2.visible = true;
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.obj3.visible = false;
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.obj4.visible = false;
                        }},

                      { coverImage: analytic3 , call: () => {
                          if (!this.ctrl3) {
                            return;
                          }
                          this.ctrl1 = true;
                          this.ctrl2 = true;
                          this.ctrl3 = false;
                          this.ctrl4 = true;
                          this.isShow = false;
                          this.num1 = 0;
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.resetCamera();
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.obj1.visible = false;
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.obj2.visible = false;
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.obj3.visible = true;
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.obj4.visible = false;
                        }},

                      { coverImage: analytic4 , call: () => {
                          if (!this.ctrl4) {
                            return;
                          }
                          this.ctrl1 = true;
                          this.ctrl2 = true;
                          this.ctrl3 = true;
                          this.ctrl4 = false;
                          this.isShow = true;
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.resetCamera();
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.obj1.visible = false;
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.obj2.visible = false;
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.obj3.visible = false;
                          (ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.obj4.visible = true;
                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;

        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as FzjtViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new FzjtViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as FzjtViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    get stepArry() {
        return [
          () => {(ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.hideModel1(); },
          () => {(ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.hideModel2(); },
          () => {(ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.hideModel3(); },
          () => {(ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.hideModel4(); },
          () => {(ViewController.getInstance().viewHandler as FzjtViewHandler).gltf.hideModel5(); }
        ];
    }

}

