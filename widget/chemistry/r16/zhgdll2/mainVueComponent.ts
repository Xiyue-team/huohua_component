import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1 from './sub_static/analytic1.png';
import * as analytic2 from './sub_static/analytic2.png';
import * as analytic3 from './sub_static/analytic3.png';
import * as analytic4 from './sub_static/analytic4.png';
import {ZhgdViewHandler} from './services/ZhgdViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };
      ctrl1 = true;
      ctrl2 = true;
      ctrl3 = true;
      ctrl4 = true;

    created() {
        const config = {
            question : {
                title : '杂化轨道理论2',
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
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.resetCamera();
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.obj1.visible = true;
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.obj2.visible = false;
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.obj3.visible = false;
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.obj4.visible = false;
                        }},

                      { coverImage: analytic2 , call: () => {
                          if (!this.ctrl2) {
                            return;
                          }
                          this.ctrl1 = true;
                          this.ctrl2 = false;
                          this.ctrl3 = true;
                          this.ctrl4 = true;
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.resetCamera();
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.obj1.visible = false;
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.obj2.visible = true;
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.obj3.visible = false;
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.obj4.visible = false;
                        }},

                      { coverImage: analytic3 , call: () => {
                          if (!this.ctrl3) {
                            return;
                          }
                          this.ctrl1 = true;
                          this.ctrl2 = true;
                          this.ctrl3 = false;
                          this.ctrl4 = true;
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.resetCamera();
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.obj1.visible = false;
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.obj2.visible = false;
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.obj3.visible = true;
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.obj4.visible = false;
                        }},

                      { coverImage: analytic4 , call: () => {
                          if (!this.ctrl4) {
                            return;
                          }
                          this.ctrl1 = true;
                          this.ctrl2 = true;
                          this.ctrl3 = true;
                          this.ctrl4 = false;
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.resetCamera();
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.obj1.visible = false;
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.obj2.visible = false;
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.obj3.visible = false;
                          (ViewController.getInstance().viewHandler as ZhgdViewHandler).gltf.obj4.visible = true;
                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;

        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as ZhgdViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new ZhgdViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as ZhgdViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

}

