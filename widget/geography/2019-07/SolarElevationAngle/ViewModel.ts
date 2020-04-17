import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { AssembleViewHandler } from './services/AssembleViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import downImg from './sub_static/down.png';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;
    title_text = this.lang.title;
    buttonTitle1 = this.lang.btntext2;
    message = this.lang.tip;
    value = 60;
    time = 60;
    lng = 0;
    lat = 120;
    timeOffset = 0;
    picList = [
        { type: 0, src: this.lang.text[0] },
        { type: 1, src: this.lang.text[1] },
        { type: 2, src: this.lang.text[2] }
    ];
    dropIcon = downImg;
    current = { type: 0, src: this.lang.text[0] };
    boolOpen = false;
    sliderOption = {
        width: '100%',
        height: '4px',
        min: 0,
        max: 240,
        piecewise: false,
        marks: (val: number) => val % 20 === 0 ? ({
            label: `${val / 10}:00`,
            labelStyle: {
                opacity: 1
            },
            labelActiveStyle: {
                color: '#3498db'
            }
        }) : false,
        tooltip: 'none',
        piecewiseLabel: false,
        speed: 0,
        dotSize: 14,
        dotStyle: {
            'backgroundColor': '#ffffff',
            'box-shadow': '0 0 0 2px rgba(0,0,0,0.08)',
            'visibility': 'visible',
            'width': '14px',
            'height': '14px'
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
        },

    };
    assemble: any;
    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.adapterMobilePanel = false;
        ViewController.getInstance(new AssembleViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().domReady();
        this.assemble = (ViewController.getInstance().viewHandler as any).assemble;
    }
    closeChange() {
        this.boolOpen = false;
    }
    dropDown() {
        this.boolOpen = !this.boolOpen;
    }

    selectChange(type: number) {
        if (this.assemble) { this.assemble.selectChange(type); }
        this.current = this.picList[type];
        if (type === 0) {
            this.sliderOption.marks =
                (val: number) => val % 20 === 0 ? ({
                    label: `${val / 10}:00`,
                    labelStyle: {
                        opacity: 1
                    },
                    labelActiveStyle: {
                        color: '#3498db'
                    }
                }) : false;
        } else if (type === 1) {
            this.sliderOption.marks =
                (val: number) => val % 20 === 0 ? ({
                    label: val / 2 * 3 < 180 ? `${val / 2 * 3}°E` : val / 2 * 3 === 180 ? `180°` : `${360 - val / 2 * 3}°W`,
                    labelStyle: {
                        opacity: 1
                    },
                    labelActiveStyle: {
                        color: '#3498db'
                    }
                }) : false;
        } else if (type === 2) {
            this.sliderOption.marks =
                (val: number) => val % 20 === 0 ? ({
                    label: val / 4 * 3 < 90 ? `${90 - val / 4 * 3}°N` : val / 4 * 3 === 90 ? `0°` : `${val / 4 * 3 - 90}°S`,
                    labelStyle: {
                        opacity: 1
                    },
                    labelActiveStyle: {
                        color: '#3498db'
                    }
                }) : false;
        }

    }

    formatter(e: string) {
        if (this.assemble) { this.assemble.formatter(Number(e)); }
    }


    resetEvent() {
        this.current = this.picList[0];
        this.value = 60;
        this.time = 60;
        this.timeOffset = 0;
        this.lng = 0;
        this.lat = 120;
        this.selectChange(0);
    }
}

