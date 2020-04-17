import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/tm.png';
import * as analytic1Img from './sub_static/a.png';
import * as analytic2Img from './sub_static/b.png';
import * as analytic3Img from './sub_static/c.png';
import * as analytic4Img from './sub_static/d.png';
import {Jsjt2ViewHandler} from './services/Jsjt2ViewHandler';
import {Watch} from 'vue-property-decorator';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {
            question : {
                title : '金属晶体2',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {

                    }},
                ]
            }]
        },
        resizeCall: {},
        analyticArray: ['解析一']
    };
    styleCtrl = false;
    ismobile = false;
    switch1Option = {
        datas: ['δFe', 'γFe'],
    };

    switch1Model = 'δFe';

    switch2Option = {
        datas: ['球棍模型', '比例模型'],
    };
    switch2Model = '球棍模型';

    newTitle = '晶胞切割';
    newTitle1 = '配位数';
    disable = false;
    color = false;
    ispws = false;

    isActive1 = false;
    clickNumber1 = true;

    isActive2 = false;
    clickNumber2 = true;

    buttonDisable = true;
    isFe = true;
    isQg = true;

    cuttingEvent() {
        this.disable = true;
        if (this.isFe && this.isQg) {
            this.animation2();
        }

        if (this.isFe && !this.isQg) {
            this.animation1();
        }

        if (!this.isFe && this.isQg) {
            this.animation4();
        }

        if (!this.isFe && !this.isQg) {
            this.animation3();
        }
    }

    created() {
        const config = {
            question : {
                title : '晶胞原子数的计算1',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {
                        }},

                    { coverImage: analytic2Img , call: () => {
                        }},

                    { coverImage: analytic3Img , call: () => {
                        }},

                    { coverImage: analytic4Img , call: () => {
                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new Jsjt2ViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        if (BrowserUtil.getBrowserInfo().isSmallDevice) {
            this.ismobile = true;
        } else {
            this.ismobile = false;
        }
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dContainer');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    animation1() {
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1BlAnimationPlay();
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1PlayblOpacityAnimation();
    }

    animation2() {
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1QgAnimationPlay();
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1PlayqgOpacityAnimation();
    }

    animation3() {
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2BlAnimationPlay();
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2PlayblOpacityAnimation();
    }

    animation4() {
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2QgAnimationPlay();
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2PlayqgOpacityAnimation();
    }

    animation5() {
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.peiweishuPlay();
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.peiweishuOpacityAnimation();
    }

    @Watch('switch1Model')
    onSwitch1ModelChange(value: any) {
        if (value === 'δFe') {
            this.switch2Model = '球棍模型';
            this.isFe = true;
            this.ispws = false;
            this.color = false;
            this.styleCtrl = false;
        } else {
            this.switch2Model = '球棍模型';
            this.isFe = false;
            this.ispws = true;
            this.color = false;
            this.styleCtrl = true;
        }
        this.showOrHideModel();
    }

    @Watch('switch2Model')
    onSwitch2ModelChange(value: any) {
        if (value === '球棍模型') {
            this.isQg = true;
            this.color = false;
        } else {
            this.isQg = false;
            this.color = false;
        }
       this.showOrHideModel();
    }

    //控制模型显示隐藏的方法
    showOrHideModel () {
        if (this.isFe && this.isQg) {
            this.disable = false;
            this.newTitle = '晶胞切割';
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1qg1.visible = true;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1bl1.visible = false;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2qg1.visible = false;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2bl1.visible = false;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.pwsBig.visible = false;
            this.hideModel();
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.resetAnimationAll();
        }

        if (this.isFe && !this.isQg) {
            this.disable = false;
            this.newTitle = '晶胞切割';
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1qg1.visible = false;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1bl1.visible = true;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2qg1.visible = false;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2bl1.visible = false;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.pwsBig.visible = false;
            this.hideModel();
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.resetAnimationAll();
        }

        if (!this.isFe && this.isQg) {
            this.disable = false;
            this.newTitle = '晶胞切割';
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1qg1.visible = false;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1bl1.visible = false;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2qg1.visible = true;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2bl1.visible = false;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.pwsBig.visible = false;
            this.hideModel();
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.resetAnimationAll();
        }

        if (!this.isFe && !this.isQg) {
            this.disable = false;
            this.newTitle = '晶胞切割';
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1qg1.visible = false;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1bl1.visible = false;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2qg1.visible = false;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2bl1.visible = true;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.pwsBig.visible = false;
            this.hideModel();
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.resetAnimationAll();
        }

    }

    hideModel() {
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2bl2.visible = false;
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2bl3.visible = false;
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2qg2.visible = false;
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2qg3.visible = false;
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1bl2.visible = false;
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1bl3.visible = false;
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1qg2.visible = false;
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1qg3.visible = false;
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.pwsAni.visible = false;
        (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.pwsSma.visible = false;
    }


    peiweishuEvent() {
            this.disable = true;
            this.hideModel();
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.resetAnimationAll();
            this.color = true;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1qg1.visible = false;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe1bl1.visible = false;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2qg1.visible = false;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.fe2bl1.visible = false;
            (ViewController.getInstance().viewHandler as Jsjt2ViewHandler).gltf.pwsBig.visible = true;
            setTimeout(() => {
                this.animation5();
            }, 1000);
    }

}

