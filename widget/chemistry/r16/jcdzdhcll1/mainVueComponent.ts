import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import {Jcdzd1ViewHandler} from './services/Jcdzd1ViewHandler';
import {Watch} from 'vue-property-decorator';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };

    switch1Option = {
        datas: ['VSEPR模型', '分子模型'],
    };

    switch1Model = 'VSEPR模型';
    ctrl1 = true;
    ctrl2 = true;
    modelCtrl = true;

    created() {
        const config = {
            question : {
                title : '价层电子对互斥理论1',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {
                            if (!this.ctrl1) {
                              return;
                            }
                            this.ctrl1 = false;
                            this.ctrl2 = true;
                            this.switch1Model = 'VSEPR模型';
                            this.modelCtrl = true;
                            (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.resetCamera();
                            (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.obj1.visible = true;
                            (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.obj2.visible = false;
                            (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.obj3.visible = false;
                            (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.obj4.visible = false;
                        }},

                    { coverImage: analytic2Img , call: () => {
                            if (!this.ctrl2) {
                              return;
                            }
                            this.ctrl1 = true;
                            this.ctrl2 = false;
                            this.switch1Model = 'VSEPR模型';
                            this.modelCtrl = false;
                            (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.resetCamera();
                            (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.obj1.visible = false;
                            (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.obj2.visible = false;
                            (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.obj3.visible = true;
                            (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.obj4.visible = false;
                        }},
                    ]
                }],
            };
        this.exerciseOption.exercise = config;

        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new Jcdzd1ViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dContainer');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    @Watch('switch1Model')
    onSwitch1ModelChange(value: any) {
        if (this.modelCtrl) {
              if (value === 'VSEPR模型') {
                (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.obj1.visible = true;
                (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.obj2.visible = false;
              } else {
                (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.obj1.visible = false;
                (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.obj2.visible = true;
              }
        } else {
              if (value === 'VSEPR模型') {
                (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.obj3.visible = true;
                (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.obj4.visible = false;
              } else {
                (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.obj3.visible = false;
                (ViewController.getInstance().viewHandler as Jcdzd1ViewHandler).gltf.obj4.visible = true;
              }
        }
    }
}

