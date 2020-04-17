import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as questionCoverImg from './sub_static/subject.png';
import * as analytic1Img from './sub_static/analytic1.png';
import * as analytic2Img from './sub_static/analytic2.png';
import * as analytic3Img from './sub_static/analytic3.png';
import * as analytic4Img from './sub_static/analytic4.png';
import {BallViewHandler} from './services/BallViewHandler';
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
                      console.log('1111');
                      (ViewController.getInstance().viewHandler as BallViewHandler).qmjljwd.hideScece();
                      (ViewController.getInstance().viewHandler as BallViewHandler).qmjljwd.oneScece();
                    }},
                  { coverImage: analytic2Img , call: () => {
                      console.log('2222');
                      (ViewController.getInstance().viewHandler as BallViewHandler).qmjljwd.hideScece();
                      (ViewController.getInstance().viewHandler as BallViewHandler).qmjljwd.twoScece();
                    }},
                  { coverImage: analytic3Img , call: () => {
                      console.log('333');
                      (ViewController.getInstance().viewHandler as BallViewHandler).qmjljwd.hideScece();
                      (ViewController.getInstance().viewHandler as BallViewHandler).qmjljwd.threeScece();
                    }},
                  { coverImage: analytic4Img , call: () => {
                      console.log('4444');
                      (ViewController.getInstance().viewHandler as BallViewHandler).qmjljwd.hideScece();
                      (ViewController.getInstance().viewHandler as BallViewHandler).qmjljwd.fourScece();
                    }}
                ]
            }],

        };
        this.exerciseOption.exercise = config;


        this.exerciseOption.resizeCall = () => { (ViewController.getInstance().viewHandler as BallViewHandler).moveDiv(); };

        (window as any).noMobile = true;

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new BallViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.width = width1 + 'px';
        model.style.height = '100%';

        (ViewController.getInstance().viewHandler as BallViewHandler).moveDiv();
        ViewController.getInstance().domReady();
    }

}

