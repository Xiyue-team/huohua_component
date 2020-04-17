import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';
import * as img from './sub_static/air1.png';
import * as img1 from './sub_static/water1.png';
import * as img2 from './sub_static/air3.png';
import * as img3 from './sub_static/Group4.png';
import * as img4 from './sub_static/water3.png';
import * as img5 from './sub_static/Group5.png';
import { Watch } from 'vue-property-decorator';
import {AuroraViewHandler} from './services/AuroraViewHandler';
import {JingTiViewHandler} from '../../../../widget_sw/chemistry/r16/lzjt3/services/JingTiViewHandler';

@Component
export class ViewModel extends Vue {

    newTitle1 = '圆周运动';
    newTitle2 = '螺旋线运动';

    startCircleAnimation = false;
    startSpiralCurveAnimation = false;

    disableStatus = false;

    circleTimeout: any;
    spiralCurveTimeout: any;

    showButton = false;
    showPlay = true;
    isBegin = false;

    step = 0;
    isActive1 = true;
    showStep = true;

    created() {

        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        viewOption.controlPanelAnimationDelay = 1000;

        ViewController.getInstance(new AuroraViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().domReady();
        ViewController.getInstance().hideLoading(1500);
    }

    resetEvent() {
        (ViewController.getInstance().viewHandler as AuroraViewHandler).auroraScenes.reset();
        clearTimeout(this.circleTimeout);
        clearTimeout(this.spiralCurveTimeout);
        this.showButton = false;
        this.disableStatus = false;
        this.startCircleAnimation = false;
        this.startSpiralCurveAnimation = false;
        this.showPlay = true;
        this.isBegin = false;
        this.step = 0;
        this.showStep = true;
        this.isActive1 = true;
    }

    circumferenceEvent() {
        this.startSpiralCurveAnimation = false;
        if (!this.startCircleAnimation) {
          this.startCircleAnimation = true;
          this.disableStatus = true;
          (ViewController.getInstance().viewHandler as AuroraViewHandler).auroraScenes.microModel.circleAnimation.play();
          this.circleTimeout = setTimeout(() => {
            this.disableStatus = false;
          }, 2000);
        } else {
          this.startCircleAnimation = false;
          (ViewController.getInstance().viewHandler as AuroraViewHandler).auroraScenes.microModel.resetCircleAnimation();
        }


        console.log('圆周运动', this.startCircleAnimation);
    }

    screwEvent() {
        console.log('螺旋运动');
        this.startCircleAnimation = false;
        if (!this.startSpiralCurveAnimation) {
          this.startSpiralCurveAnimation = true;
          this.disableStatus = true;
          (ViewController.getInstance().viewHandler as AuroraViewHandler).auroraScenes.microModel.spiralCurveAnimation.play();
          this.spiralCurveTimeout = setTimeout(() => {
            this.disableStatus = false;
          }, 5000);
        } else {
          this.startSpiralCurveAnimation = false;
          (ViewController.getInstance().viewHandler as AuroraViewHandler).auroraScenes.microModel.resetSpiralCurveAnimation();
        }
    }

    playAnimation() {
        if ( this.isBegin === true) {
            (ViewController.getInstance().viewHandler as AuroraViewHandler).auroraScenes.macroModel.resume();
        } else {
            (ViewController.getInstance().viewHandler as AuroraViewHandler).auroraScenes.macroModel.play();
            this.isBegin = true;

        }
        this.showPlay = false;
    }

    next() {
        if ( this.step === 0 ) {
            (ViewController.getInstance().viewHandler as AuroraViewHandler).auroraScenes.microModel.showScene();
            (ViewController.getInstance().viewHandler as AuroraViewHandler).auroraScenes.macroModel.hideScene();
            this.isActive1 = true;
            this.step = 1;
        } else {
            //  隐藏微观
            (window as any).viewHandler.auroraScenes.microModel.hideScene();
            // 显示宏观
            (window as any).viewHandler.auroraScenes.macroModel.showScene();
            (window as any).viewHandler.auroraScenes.macroModel.controls.noRotate = false;
            this.showStep = false;
        }

        //this.showStep = false;
    }


}

