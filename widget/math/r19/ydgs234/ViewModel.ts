import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ZxypwxViewHandler} from './services/ZxypwxViewHandler';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';
import {Watch} from 'vue-property-decorator';
import {ViewOption} from '../../../../src/core/CoreInterface';
@Component
export class ViewModel extends Vue {
    buttonTitle1 = '-α 角度';
    buttonTitle2 = 'π-α角度';
    buttonTitle3 = 'π+α角度';
    buttonTitle4 = '三角函数值';
    buttonTitle5 = '-α';
    buttonTitle6 = 'π-α';
    buttonTitle7 = 'π+α';
    isClickButton1 = false;
    isClickButton2 = false;
    isClickButton3 = false;
    isClickButton4 = false;
    isClickButton5 = false;
    isClickButton6 = false;
    isClickButton7 = false;
    animateControl = false;
    isMobile: boolean;
    backAnimateControl = false;

    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha  = true;
        ViewController.getInstance(new ZxypwxViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
        this.isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;
    }


    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    //-α角度 按钮事件
    buttonEvent1() {
        this.isClickButton1 = !this.isClickButton1;
        (ViewController.getInstance() as any).viewHandler.zxypwx.showHideLine(1, this.isClickButton1);
    }

    //π-α角度 按钮事件
    buttonEvent2() {
        this.isClickButton2 = !this.isClickButton2;
        (ViewController.getInstance() as any).viewHandler.zxypwx.showHideLine(2, this.isClickButton2);
    }

    //π+α角度 按钮事件
    buttonEvent3() {
        this.isClickButton3 = !this.isClickButton3;
        (ViewController.getInstance() as any).viewHandler.zxypwx.showHideLine(3, this.isClickButton3);
    }

    //三角函数值 按钮事件
    buttonEvent4() {
        this.isClickButton4 = !this.isClickButton4;
    }

    @Watch('isClickButton4')
    resetButton() {
        if (this.animateControl) {
                this.backAnimateControl = true;
        } else {
                this.backAnimateControl = false;
        }
        this.animateControl = !this.animateControl;
        if (this.isClickButton4 === false) {
            this.isClickButton5 = false;
            this.isClickButton6 = false;
            this.isClickButton7 = false;
        }
    }

    buttonEvent5() {
        this.isClickButton5 = !this.isClickButton5;
        this.isClickButton6 = false;
        this.isClickButton7 = false;
    }

    buttonEvent6() {
        this.isClickButton6 = !this.isClickButton6;
        this.isClickButton5 = false;
        this.isClickButton7 = false;
    }

    buttonEvent7() {
        this.isClickButton7 = !this.isClickButton7;
        this.isClickButton5 = false;
        this.isClickButton6 = false;
    }

}

