import Vue from 'vue';
import Component from 'vue-class-component';

import { Watch } from 'vue-property-decorator';
import { ViewController } from '../../../../src/core/ViewController';
import { TydbzfcViewHandler } from './services/TydbzfcViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { Line3dModel } from './services/Line3dModel';

@Component
export class MainVueComponent extends Vue {
    //data
    active1 = false;
    active2 = false;
    active3 = false;
    active4 = false;
    active5 = false;
    showEquation = true;
    triangleText = '锐角三角形';
    disabledClick = false;
    //created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        // viewOption.controlPanelAnimationDelay = 1000;

        ViewController.getInstance(new TydbzfcViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    //mounted
    mounted() {
        this.resize();
        window.addEventListener('resize', () => {
            this.resize();
        });
        ViewController.getInstance().domReady();
    }
    @Watch('triangleText')
    onChildChanged0(val: string) {
        if (val !== '等边三角形') {

            this.active5 = false;
        }
    }
    @Watch('active1')
    onChildChanged1(val: Boolean) {
        (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.gravityPoint.drawOuterPoint(val);
    }
    @Watch('active2')
    onChildChanged2(val: Boolean) {
        (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.innerPoint.connectInnerAni(val);
    }
    @Watch('active3')
    onChildChanged3(val: Boolean) {
        (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.outerPoint.drawOuterPoint(val);
    }
    @Watch('active4')
    onChildChanged4(val: Boolean) {
        (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.orthocenter.drawOuterPoint(val);
    }
    //methods
    btnEvent(v: number) {
        if (v === 3 && this.active2 && !this.active3) {

            (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.innerPoint.perpendicularAni();
            this.active3 = true;
            this.active4 = false;
        } else if (v === 4 && this.active2 && !this.active4) {
            this.active4 = true;
            this.active3 = false;
            (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.innerPoint.hiddenGroup2();
        }

    }
    handleClick() {
        this.active5 = !this.active5;
        Line3dModel.chooseShowText();
    }
    //适配
    resize() {

    }

}