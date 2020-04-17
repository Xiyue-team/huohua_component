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
        datas: ['0', '1', '2', '3', '4']
    };

    switch2Model = '0';

    newTitle1 = '编号';

    isActived1 = false;

    disable = true;

    showObj2 = false;

    created() {
        const config = {
            question : {
                title : '面心立方堆积2',
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

    clickEvent1() {
        (ViewController.getInstance().viewHandler as MianXinViewHandler).gltf.hideObj();

        if (this.isActived1 === false) {
            console.log('编号true');
            this.isActived1 = true;
            this.disable = false;
            this.showObj2 = true;
            (ViewController.getInstance().viewHandler as MianXinViewHandler).gltf.obj2.visible = true;
        } else {

            console.log('编号false');
            this.isActived1 = false;
            this.disable = true;
            this.showObj2 = false;
            this.switch2Model = '0';
            (ViewController.getInstance().viewHandler as MianXinViewHandler).gltf.obj1.visible = true;
        }
    }

    @Watch('switch2Model')
    onSwitch2ModelChange(value: any) {

        if (this.showObj2 === false) {
            return;
        }

        (ViewController.getInstance().viewHandler as MianXinViewHandler).gltf.hideObj();
        switch (value) {
            case '0':
                console.log('000');

                (ViewController.getInstance().viewHandler as MianXinViewHandler).gltf.obj2.visible = true;

                break;
            case '1':
                console.log('111');
                (ViewController.getInstance().viewHandler as MianXinViewHandler).gltf.obj3.visible = true;
                break;
            case '2':
                console.log('222');
                (ViewController.getInstance().viewHandler as MianXinViewHandler).gltf.obj4.visible = true;
                break;
            case '3':
                console.log('333');
                (ViewController.getInstance().viewHandler as MianXinViewHandler).gltf.obj5.visible = true;
                break;
            case '4':
                console.log('444');
                (ViewController.getInstance().viewHandler as MianXinViewHandler).gltf.obj6.visible = true;
                break;
        }

    }
}

