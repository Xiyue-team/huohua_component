import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { ViewController } from '../../../../src/core/ViewController';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { CrystalViewHandler } from './services/CrystalViewHander';
import $ from 'jquery-ts';
@Component
export class MainVueComponent extends Vue {
    Model: CrystalViewHandler;
    value1 = 0;
    value2 = 0;
    value3 = 0;
    zoom1 = 0;
    title = window.env.browserInfo.lang.title;
    //吸引力
    width = 10 + '%';
    sliderOption1 = {
        width: 300, height: 2, min: 0, max: 255, tooltip: 'always',
        dotSize: [24, 24], process: true, speed: 0.01, interval: 1
    };

    sliderOption2 = {
        width: 300, height: 2, min: 0, max: 255, tooltip: 'always',
        dotSize: [24, 24], process: true, speed: 0.01, interval: 1
    };
    sliderOption3 = {
        width: 300, height: 2, min: 0, max: 255, tooltip: 'always',
        dotSize: [24, 24], process: true, speed: 0.01, interval: 1
    };

    // 判断是否是手机
    isPhone = false;
    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.showReset = false;
        viewOption.showMobileResetIco = false;
        ViewController.getInstance(new CrystalViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
        if ((window as any)['env'].browserInfo.isSmallDevice) {
            this.isPhone = true;
            this.sliderOption1.width = window.innerWidth * 0.15;
            this.sliderOption1.dotSize = [16, 16];
            this.sliderOption2.width = window.innerWidth * 0.15;
            this.sliderOption2.dotSize = [16, 16];
            this.sliderOption3.width = window.innerWidth * 0.15;
            this.sliderOption3.dotSize = [16, 16];

        }
        setTimeout(() => {
            const box = document.getElementsByClassName('vue-slider-dot-tooltip-inner');
            const spanbox = document.getElementsByClassName('vue-slider-dot-tooltip-inner-top');
            const line = document.getElementsByClassName('vue-slider-process');
            const circle = document.getElementsByClassName('vue-slider-dot-handle');
            (circle[0] as any).style.backgroundColor = '#FF5B5B';
            (circle[1] as any).style.backgroundColor = '#6DD400';
            (circle[2] as any).style.backgroundColor = '#18A3FF';
            for (let i = 0; i < 3; i++) {
                (box[i] as any).style.backgroundColor = 'transparent';
                (box[i] as any).style.fontSize = '1.1vw';
                (box[i] as any).style.marginBottom = '-10px';
                (spanbox[i] as any).style.borderTopColor = 'transparent';
                (line[i] as any).style.backgroundColor = '#EEE';
                (circle[i] as any).style.boxShadow = '0px 0px 0px 0px rgba(0,0,0,0)';
            }
        }, 100);
        setInterval(() => {
            document.getElementById('box').style.backgroundColor =
                'rgb(' + `${this.value1}` + ',' + `${this.value2}` + ',' + `${this.value3}` + ')';
        }, 100);
    }

    mounted() {
        ViewController.getInstance().domReady();
    }
    @Watch('value1')
    onChildChanged1(val: number) {
        this.value1 = val;
    }
    @Watch('value2')
    onChildChanged2(val: number) {
        this.value2 = val;
    }
    @Watch('value3')
    onChildChanged3(val: number) {
        this.value3 = val;
    }
    reset(): void {
        this.Model.reset();
    }
    resize1(): void {
        this.Model.resize();
    }

}

