import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import {MianXinViewHandler} from './services/MianXinViewHandler';
import {Watch} from 'vue-property-decorator';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };

    switch2Option = {
        datas: ['球棍', '比例'],
    };

    switch2Model = '球棍';

    newTitle = '晶胞切割';

    isActive1 = false;
    clickNumber1 = true;

    isActive2 = false;
    clickNumber2 = true;

    buttonDisable = true;

    disable = false;

    created() {
        const config = {
            question : {
                title : '面心立方堆积1',
                coverImage : questionCoverImg
            },

            analyticArray:  [{
                title : '解析一',
                stepArray : [
                    { coverImage: analytic1Img , call: () => {

                        }},
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as MianXinViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new MianXinViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as MianXinViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    cuttingEvent() {
        this.disable = true;
        if (this.switch2Model === '球棍') {
            (ViewController.getInstance().viewHandler as MianXinViewHandler).gltf.startStickModelAnimation();
        } else {
            (ViewController.getInstance().viewHandler as MianXinViewHandler).gltf.startProportionalModelAnimation();
        }
    }

    @Watch('switch2Model')
    onSwitch2ModelChange(value: any) {
        this.disable = false;
        this.newTitle = '晶胞切割';
        if (value === '球棍') {
            (ViewController.getInstance().viewHandler as MianXinViewHandler).gltf.obj1.visible = true;
            (ViewController.getInstance().viewHandler as MianXinViewHandler).gltf.obj2.visible = false;
        } else {
            (ViewController.getInstance().viewHandler as MianXinViewHandler).gltf.obj1.visible = false;
            (ViewController.getInstance().viewHandler as MianXinViewHandler).gltf.obj2.visible = true;
        }

        (ViewController.getInstance().viewHandler as MianXinViewHandler).gltf.resetAnimation();
    }
}

