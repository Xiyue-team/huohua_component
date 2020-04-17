import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {AxisViewHandler} from './services/AxisViewHandler';
import {Watch} from 'vue-property-decorator';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;

    sliderValueLeft = -4;
    //定义滑杆a,b上的值
    aSliderNum = -4;
    bSliderNum = 4;

    // 定义滑条的样式
    sliderOption1 = {
        lazy: false,
        width: 200,
        height: 8,
        min: -10,
        max: 10,
        interval: 0.1,
        tooltip: 'always',
        dotSize: 20,
        processStyle: {
            backgroundColor: '#179df5',
        },
        railStyle: {
            backgroundColor: '#ffffff',
        },
        tooltipStyle: {
            'box-shadow': 'none',
            'border': 'none',
            backgroundColor: '#FFFFFF',
            'color': '#2D2D2D',
            'tip': false,
        },
    };
    sliderValueRight = 4;
    sliderOption2 = {
        lazy: false,
        width: 200,
        height: 8,
        min: -10,
        max: 10,
        interval: 0.1,
        reverse: false,
        tooltip: 'always',
        piecewise: false,
        dotSize: 20,
        processStyle: {
            backgroundColor: '#179df5',
        },
        railStyle: {
            backgroundColor: '#ffffff',
        },
        tooltipStyle: {
            'box-shadow': 'none',
            'border': 'none',
            backgroundColor: '#FFFFFF',
            'color': '#2D2D2D',
            'tip': false,
        },
    };
    //按钮自定义事件
    isActive1 = true;
    clickNumber1 = false;
    isActive2 = false;
    clickNumber2 = true;

    // 判断是否是手机
    isPhone = false;

    //页面文字描述
    title: string;
    buttonTitle1: string;
    buttonTitle2: string;

    //定义一个标志用于改变按钮状态
    SignBDS = true;
    SignBDSZ = false;

    //是否显示
    slider1Show = true;
    slider2Show = true;

    //符号参数
    defaultSymbolLeft = '>';
    defaultSymbolRight = '<';
    symbolLeft = '';
    symbolRight = '';
    symbolLeftIndex = 0;
    symbolRightIndex = 0;

    //slider值记录
    sliderValueLeftIndex = 0;
    sliderValueRightIndex = 0;
    //下拉列表区域显示的标志
    list1show = false;
    list2show = false;

    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.adapterMobilePanel = false;
        ViewController.getInstance(new AxisViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();

        //初始化slider后，设置100毫秒后隐藏
        setTimeout(() => {
            this.slider2Show = false;
        }, 300);

        this.resize();
    }

    mounted() {
        ViewController.getInstance().domReady();
    }


    resize() {
        //页面缩放改变slider宽度
        if (window.innerWidth < 900) {
            this.sliderOption1.width = 90;
            this.sliderOption2.width = 90;
            this.sliderOption1.height = 6;
            this.sliderOption2.height = 6;
            this.sliderOption1.dotSize = 20;
            this.sliderOption2.dotSize = 20;
        } else {
            this.sliderOption1.width = 200;
            this.sliderOption2.width = 200;
            this.sliderOption1.height = 8;
            this.sliderOption2.height = 8;
            this.sliderOption1.dotSize = 20;
            this.sliderOption2.dotSize = 20;
        }
    }

    resetEvent() {
        this.isActive1 = true;
        this.clickNumber1 = false;
        this.isActive2 = false;
        this.clickNumber2 = true;
        this.list1show = false;
        this.list2show = false;

        //判断不等式组按钮是否点开，点开则复原相关参数
        if (this.slider2Show) {
            this.slider2Show = false;
            this.isActive2 = false;
            this.clickNumber2 = true;
            this.SignBDSZ = false;
        }
        (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
        //默认值还原
        this.sliderValueLeft = -4;
        (ViewController.getInstance().viewHandler as any).dmCanvas.getSliderValueLeft(-4);
        this.sliderValueRight = 4;
        (ViewController.getInstance().viewHandler as any).dmCanvas.getSliderValueRight(4);
        //默认符号还原
        this.defaultSymbolLeft = '>';
        this.symbolLeftIndex = 0;
        this.defaultSymbolRight = '<';
        this.symbolRightIndex = 0;
    }

    //不等式组显示控制
    buttonClickEvent1() {
        this.isActive2 = false;
        this.clickNumber2 = true;
        this.slider2Show = false;
        this.SignBDSZ = false;
        (ViewController.getInstance().viewHandler as any).dmCanvas.activeButton(false);
        this.isActive1 = true;
        this.clickNumber1 = false;
    }

    //不等式显示控制
    buttonClickEvent2() {
        this.slider2Show = true;
        this.SignBDSZ = true;
        this.isActive2 = true;
        this.clickNumber2 = false;
        (ViewController.getInstance().viewHandler as any).dmCanvas.activeButton(true);
        this.isActive1 = false;
        this.clickNumber1 = true;
    }

    @Watch('sliderValueLeft')
    getSliderValueLeft(valueLeft: number) {
        (ViewController.getInstance().viewHandler as any).dmCanvas.getSliderValueLeft(this.sliderValueLeft);
        this.sliderValueLeftIndex = this.sliderValueLeft;
        this.hideArea();
    }

    @Watch('sliderValueRight')
    getSliderValueRight(valueRight: number) {
        (ViewController.getInstance().viewHandler as any).dmCanvas.getSliderValueRight(this.sliderValueRight);
        this.sliderValueRightIndex = this.sliderValueRight;
        this.hideArea();
    }

    //左选择面板开启
    listLeftArea() {
        this.list1show = !this.list1show;
        if (this.list2show) {
            this.list2show = false;
        }
    }

    //右侧选择面板开启
    listRightArea() {
        this.list2show = !this.list2show;
        if (this.list1show) {
            this.list1show = false;
        }
    }

    //点击处下拉菜单外区域关闭下拉菜单
    hideArea() {
        this.list1show = false;
        this.list2show = false;
    }


    changeSymbolLeft(symbolLeft: string, symbolLeftIndex: number) {
        switch (symbolLeftIndex) {
            case 0:
                this.symbolLeft = '<';
                break;
            case  1:
                this.symbolLeft = '>';
                break;
            case  2:
                this.symbolLeft = '≤';
                break;
            case  3:
                this.symbolLeft = '≥';
                break;
        }

        this.symbolLeftIndex = symbolLeftIndex;
        (ViewController.getInstance().viewHandler as any).dmCanvas.changeSymbolLeft(this.symbolLeft, this.symbolLeftIndex);
        this.defaultSymbolLeft = symbolLeft;
    }

    changeSymbolRight(symbolRight: string, symbolRightIndex: number) {
        this.symbolRight = symbolRight;
        this.symbolRightIndex = symbolRightIndex;
        (ViewController.getInstance().viewHandler as any).dmCanvas.changeSymbolRight(this.symbolRight, this.symbolRightIndex);
        this.defaultSymbolRight = this.symbolRight;
    }

}
