import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1 from './sub_static/analytic1.png';
import * as analytic2 from './sub_static/analytic2.png';
import {PhwViewHandler} from './services/PhwViewHandler';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };
      ctrl1 = true;
      ctrl2 = true;

    created() {
        const config = {
            question : {
                title : '配合物理论2',
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
                          (ViewController.getInstance().viewHandler as PhwViewHandler).gltf.resetCamera();
                          (ViewController.getInstance().viewHandler as PhwViewHandler).gltf.obj1.visible = true;
                          (ViewController.getInstance().viewHandler as PhwViewHandler).gltf.obj2.visible = false;
                          setTimeout(() => {
                            (ViewController.getInstance().viewHandler as PhwViewHandler).gltf.stopShow();
                          }, 100);
                        }},

                      { coverImage: analytic2 , call: () => {
                          if (!this.ctrl2) {
                            return;
                          }
                          this.ctrl1 = true;
                          this.ctrl2 = false;
                          (ViewController.getInstance().viewHandler as PhwViewHandler).gltf.resetCamera();
                          (ViewController.getInstance().viewHandler as PhwViewHandler).gltf.obj1.visible = true;
                          (ViewController.getInstance().viewHandler as PhwViewHandler).gltf.obj2.visible = true;
                          (ViewController.getInstance().viewHandler as PhwViewHandler).gltf.startShow();
                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;

        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as PhwViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new PhwViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as PhwViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

}

