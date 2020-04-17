import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/tm.png';
import * as analytic1Img from './sub_static/jx.png';
import {Jsjt4ViewHandler} from './services/jsjt4ViewHandler';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';

@Component
export class MainVueComponent extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解析一']
    };
    ismobile = false;
    created() {
        const config = {
            question : {
                title : '金属晶体4',
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


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as Jsjt4ViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new Jsjt4ViewHandler(this), viewOption);
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

        (ViewController.getInstance().viewHandler as Jsjt4ViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

    get stepArry() {
        return [
            () => {(ViewController.getInstance().viewHandler as Jsjt4ViewHandler).gltf.hide1Model(); },
            () => {(ViewController.getInstance().viewHandler as Jsjt4ViewHandler).gltf.hide2Model(); },
            () => {(ViewController.getInstance().viewHandler as Jsjt4ViewHandler).gltf.hide3Model(); }
        ];
    }

}

