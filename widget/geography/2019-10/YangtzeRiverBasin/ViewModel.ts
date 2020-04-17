import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { SrcUtils } from './SrcUtils';
const viewOptionConfig = require('./meta.json');
import back from './sub_static/image/back.png';
import close from './sub_static/image/close.png';
@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    btntext = this.lang.btntext;
    slidertext = this.lang.slidertext;
    assemble: any;
    picback = back;
    picclose = close;
    selectMode = -1;
    buttonActived = -1;
    SrcUtilss: SrcUtils;
    showList = [];
    item: {
        text: string,
        bg: string
    } = null;
    value = 0;

    top = 80; //页上边距
    bottom = 100; //页下边距
    isBigScreen = true;
    container3D: HTMLElement; //canvas父容器
    bottomContainer: HTMLElement; //底部容器
    
    sliderOption = {
        width: '100%',
        height: '4px',
        min: 0,
        max: 50,
        piecewise: false,
        marks: {
            '0': this.slidertext[0],
            '31.7': this.slidertext[1],
            '43.8': this.slidertext[2],
            '50': this.slidertext[3]
        },
        tooltip: 'none',
        piecewiseLabel: false,
        speed: 0,
        dotSize: 24,
        interval: 0.1,
        dotStyle: {
            'backgroundColor': '#ffffff',
            'box-shadow': '0 0 0 2px rgba(0,0,0,0.08)',
            'visibility': 'visible',
            'width': '24px',
            'height': '24px'
        },
        stepStyle: {
            'width': '100%',
            'height': '100%',
            'border-radius': '50%',
            'box-shadow': '0 0 0 3px #ccc',
            'background-color': '#fff',
        },
        stepActiveStyle: {
            'box-shadow': '0 0 0 3px #3498db',
            'background-color': '#3498db',
        },
        processStyle: {
            'backgroundColor': '#0091FF',
        },
        bgStyle: {
            'backgroundColor': '#5D5D5D',
        }
    };

    created() {
        this.SrcUtilss = new SrcUtils();
        this.showList = this.SrcUtilss.showList;
        if (window.screen.height < 449) {
            this.sliderOption.dotSize = 18;
            this.sliderOption.dotStyle = {
                'backgroundColor': '#ffffff',
                'box-shadow': '0 0 0 2px rgba(0,0,0,0.08)',
                'visibility': 'visible',
                'width': '18px',
                'height': '18px'
            };
            this.isBigScreen = false;
            this.bottom = 60;
            this.top = 70;
        } else if (window.screen.height < 599) {
            this.isBigScreen = false;
        } else if (window.screen.height < 800) {
            this.isBigScreen = false;
        }

        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
        viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
        viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
        viewOption.showReset = viewOptionConfig.config.showReset;
        ViewController.getInstance(new AssembleViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        this.container3D = document.getElementById('Container3d');
        this.bottomContainer = document.getElementById('bottomContainer');
        this.resizeOffset();
        ViewController.getInstance().domReady();
        this.assemble = (ViewController.getInstance().viewHandler as any).assemble;
    }

    resize() {
        this.resizeOffset();
    }

    resizeOffset() {
        const w = document.getElementById('Container').clientWidth,
            h = document.getElementById('Container').clientHeight;
        const conW = (h - this.top - this.bottom) * 1920 / 895;
        let bottom = this.bottom;
        if (conW < w) {
            this.container3D.style.left = this.container3D.style.right = `${(w - conW) / 2}px`;
            this.container3D.style.bottom = `${this.bottom}px`;
        } else {
            this.container3D.style.left = this.container3D.style.right = '0px';
            const conH = this.container3D.clientWidth * 895 / 1920;
            this.container3D.style.bottom = `${h - conH - this.top}px`;
            bottom = h - conH - this.top;
        }
        this.bottomContainer.style.top = `${h - bottom}px`;
    }

    selectModeEvent(i: number) {
        this.selectMode = i;
        if (this.assemble) {
            this.assemble.selectModeEvent(this.selectMode);
        }
    }

    buttonEvent(i: number) {
        if (this.assemble) {
            this.assemble.buttonEvent(i);
        }
    }

    formatter(e: string) {
        if (this.assemble) { this.assemble.formatter(Number(e)); }
    }

    resetEvent() {
        this.buttonActived = -1;
        this.selectMode = -1;
    }


}

