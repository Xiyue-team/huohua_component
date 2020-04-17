import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {GqgxMtwoViewHandler} from './services/GqgxMtwoViewHandler';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';
import {Watch} from 'vue-property-decorator';
import {ViewOption} from '../../../../src/core/CoreInterface';
@Component
export class ViewModel extends Vue {
    isMobile: any;
    isPc: any;
    title = '供求关系对价格曲线的影响';
    buttonTitle = '作图';
    isShowSlider = true;
    isClickButton = false;
    isShowAnimation1 = true;
    isShowAnimation2 = false;
    isShowAnimation3 = false;
    isShowAnimation4 = false;
    private dom = document.getElementsByClassName('videoStyle');
    sliderOption = {
        lazy: true,
        width: '264px',
        height: 4,
        min: 0,
        max: 3,
        dotSize: 12,
        piecewise: true,
        processDragable: true,
        piecewiseStyle: {
            'backgroundColor': '#fff',
            'visibility': 'visible',
            'border' : '2px solid #D8D8D8',
            'width': '4px',
            'height': '4px'
        },
        piecewiseActiveStyle: {
            'backgroundColor': '#3498db',
            'border' : '2px solid',
            'borderColor':  '#3498db'
        },
        reverse: false,
        tooltip: false,
        processStyle: {
            'backgroundColor': '#3498db'
        },
        bgStyle: {
            'backgroundColor': '#D8D8D8'
        }
    };

    //关键帧组件所用到的参数
    animationOption1 = {
        zipUrl: require('./sub_static/animation1.zip'),
        imageNum: 27,
        animationName: 'animation1',
        showSlider: false,
        width:  680,
        height: 383,
        interval: 122
    };
    animationOption2 = {
        zipUrl: require('./sub_static/animation2.zip'),
        imageNum: 29,
        animationName: 'animation2',
        showSlider: false,
        width:  680,
        height: 383,
        interval: 122
    };
    animationOption3 = {
        zipUrl: require('./sub_static/animation3.zip'),
        imageNum: 24,
        animationName: 'animation3',
        showSlider: false,
        width:  680,
        height: 383,
        interval: 122
    };

    animationOption4 = {
        zipUrl: require('./sub_static/animation4.zip'),
        imageNum: 49,
        animationName: 'animation4',
        showSlider: false,
        width:  680,
        height: 383,
        interval: 122
    };
    slidernumber = 0;
    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.mobilePanelAlpha  = true;
        ViewController.getInstance(new GqgxMtwoViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
        this.isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;
        this.isPc = BrowserUtil.getBrowserInfo().os === 'Windows' || BrowserUtil.getBrowserInfo().os === 'Mac OS X';
    }


    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    @Watch('slidernumber')
    animation1Control(value: number) {
        if (this.isPc) {
            switch (value) {
                case 0 :
                    this.isShowAnimation1 = true;
                    this.isShowAnimation2 = false;
                    this.isShowAnimation3 = false;
                    (this.dom[0] as HTMLVideoElement).pause();
                    (this.dom[1] as HTMLVideoElement).pause();
                    (this.dom[2] as HTMLVideoElement).pause();
                    (this.dom[0] as HTMLVideoElement).currentTime = 0;
                    break;
                case 1 :
                    (this.dom[0] as HTMLVideoElement).pause();
                    (this.dom[1] as HTMLVideoElement).pause();
                    (this.dom[2] as HTMLVideoElement).pause();
                    (this.dom[0] as HTMLVideoElement).currentTime = 0;
                    setTimeout(() => {
                        this.isShowAnimation1 = true;
                        this.isShowAnimation2 = false;
                        this.isShowAnimation3 = false;
                    }, 100);
                    (this.dom[0] as HTMLVideoElement).play();
                    break;
                case 2 :
                    (this.dom[0] as HTMLVideoElement).pause();
                    (this.dom[1] as HTMLVideoElement).pause();
                    (this.dom[2] as HTMLVideoElement).pause();
                    (this.dom[1] as HTMLVideoElement).currentTime = 0;
                    setTimeout(() => {
                        this.isShowAnimation1 = false;
                        this.isShowAnimation2 = true;
                        this.isShowAnimation3 = false;
                    }, 100);
                    (this.dom[1] as HTMLVideoElement).play();
                    break;
                case 3 :
                    (this.dom[0] as HTMLVideoElement).pause();
                    (this.dom[1] as HTMLVideoElement).pause();
                    (this.dom[2] as HTMLVideoElement).pause();
                    (this.dom[2] as HTMLVideoElement).currentTime = 0;
                    setTimeout(() => {
                        this.isShowAnimation1 = false;
                        this.isShowAnimation2 = false;
                        this.isShowAnimation3 = true;
                    }, 100);
                    (this.dom[2] as HTMLVideoElement).play();
                    break;
            }
        } else {
            switch (value) {
                case 0 :
                    this.isShowAnimation1 = true;
                    this.isShowAnimation2 = false;
                    this.isShowAnimation3 = false;
                    (this.$refs.animationControl1 as any).reset();
                    break;
                case 1 :
                    this.isShowAnimation1 = true;
                    this.isShowAnimation2 = false;
                    this.isShowAnimation3 = false;
                    (this.$refs.animationControl1 as any).reset();
                    (this.$refs.animationControl1 as any).play();
                    break;
                case 2 :
                    this.isShowAnimation1 = false;
                    this.isShowAnimation2 = true;
                    this.isShowAnimation3 = false;
                    (this.$refs.animationControl2 as any).reset();
                    (this.$refs.animationControl2 as any).play();
                    break;
                case 3 :
                    this.isShowAnimation1 = false;
                    this.isShowAnimation2 = false;
                    this.isShowAnimation3 = true;
                    (this.$refs.animationControl3 as any).reset();
                    (this.$refs.animationControl3 as any).play();
                    break;
            }
        }
    }

    buttonEvent() {
        this.isClickButton = true;
        this.isShowSlider = false;
        this.title = '价格-价值曲线';
        this.isShowAnimation1 = false;
        this.isShowAnimation2 = false;
        this.isShowAnimation3 = false;
        this.isShowAnimation4 = true;
        if (this.isPc) {
            (this.dom[0] as HTMLVideoElement).pause();
            (this.dom[1] as HTMLVideoElement).pause();
            (this.dom[2] as HTMLVideoElement).pause();
            (this.dom[3] as HTMLVideoElement).currentTime = 0;
            (this.dom[3] as HTMLVideoElement).play();

        } else {
            (this.$refs.animationControl4 as any).reset();
            (this.$refs.animationControl4 as any).play();
        }

    }
}

