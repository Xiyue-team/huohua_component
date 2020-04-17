import Vue from 'vue';
import {Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {YshcsddlViewHandler} from './services/YshcsddlViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {Environment} from '../../../../src/core/Environment';
import * as bgImg from './sub_static/UI/background.png';

const eCharts = require('echarts');
// const Vconsole = require('./services/vconsole.min');
// const vConsole = new Vconsole();
// export default vConsole;
// const vconsole = require('vconsole');
// new vconsole();
@Component

export class MainVueComponent extends Vue {
    bg = '';
    show = false;
    show1 = false;
    show2 = false;
    show3 = false;
    show4 = true;
    show5 = true;
    myChart: any;
    number1 = 15;
    number2 = 1;
    number3 = 1;
    number4 = 0;
    number5 = 0;
    number6 = 0;
    timer1: any;
    timer2: any;
    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new YshcsddlViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    // mounted
    mounted() {
        this.bg = bgImg as any;
        ViewController.getInstance().domReady();
        const environment = new Environment();
        const Player = environment.browserInfo.isHuohuaPlayer;
        if (Player && window.screen.width < 900 && window.screen.width > 800) {
            document.getElementById('eChart_box').className = 'player';
        } else {
            document.getElementById('eChart_box').className = 'eChart_box';
        }
    }
    // 设置电离柱状图样式
    histogram1() {
        this.myChart = eCharts.init(document.getElementById('eCharts'));
        const option = {
            xAxis: {
                // type: 'category',
                data: ['', '', '', '', ],
                name: '粒子',
                nameTextStyle: {
                    fontSize: 20
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    inside: true,
                    length: 0
                },
                axisLine: {
                    symbol: ['none', 'arrow'],
                    symbolOffset: 9,
                    symbolSize: [ 8, 10],
                    lineStyle: {
                        color: '#EDEDED',
                        width: 3
                    },
                    textStyle: {
                        color: '#EDEDED',
                        fontWeight: 'normal',
                        fontSize: 18
                    },
                },

            },
            // 设置柱状图向左或者向右偏移多少位置
            grid: {
                right: '15%',
            },
            yAxis: {
                type: 'value',
                max: 15,
                min: 0,
                splitNumber: 1,
                name: '浓度/c',
                nameTextStyle: {
                    fontSize: 20
                },
                // 隐藏y轴横向网格线
                splitLine: {
                    show: false
                },
                axisTick: {
                    inside: true,
                    length: 0
                },
                // 隐藏y轴上数字
                axisLabel: {
                    show: false,
                },
                // axisLine坐标轴箭头及线条样式
                axisLine: {
                    symbol: ['none', 'arrow'],
                    symbolOffset: 9,
                    symbolSize: [ 8, 10],
                    lineStyle: {
                        color: '#EDEDED',
                        width: 3
                    },
                },
            },
            series: [{
                data: [this.number1, this.number2, this.number3, this.number4, ],
                type: 'bar',
                barWidth : 20,
                // barGap: 40,
                itemStyle: {
                    //通常情况下：
                    normal: {
                        //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                        color: function (params: any) {
                            const colorList = ['#EDEDED', ];
                            return colorList[params.dataIndex];
                        }
                    },
                },
            }]
        };
        this.myChart.setOption(option);
    }
    //盐酸电离各粒子浓度变化柱状图情况
    concentrationChange1 () {
        const thiz = this;
        thiz.number1 = 15;
        thiz.number2 = 1;
        thiz.number3 = 1;
        thiz.number4 = 0;
        thiz.timer1 = setInterval(function () {
            // thiz.number1 = (ViewController.getInstance().viewHandler as YshcsddlViewHandler).Model.dataH2O;
            thiz.number2 = (ViewController.getInstance().viewHandler as YshcsddlViewHandler).Model.dataH3O;
            thiz.number4 = (ViewController.getInstance().viewHandler as YshcsddlViewHandler).Model.dataCl;
            thiz.myChart.setOption({
                xAxis: {
                    data: ['', '', '', '', ],
                },
                series: [{
                    data: [thiz.number1, thiz.number2, thiz.number3, thiz.number4, ],
                }]
            });
        }, 400);
    }
   //醋酸电离各粒子浓度变化柱状图情况
    concentrationChange2 () {
        const thiz = this;
        thiz.number1 = 15;
        thiz.number2 = 1;
        thiz.number3 = 1;
        thiz.number5 = 0;
        thiz.number6 = 0;
        thiz.timer2 = setInterval(function () {
            // thiz.number1 = (ViewController.getInstance().viewHandler as YshcsddlViewHandler).Model.dataH2O;
            thiz.number2 = (ViewController.getInstance().viewHandler as YshcsddlViewHandler).Model.dataH3O;
            thiz.number5 = (ViewController.getInstance().viewHandler as YshcsddlViewHandler).Model.dataCH3COOH;
            thiz.number6 = (ViewController.getInstance().viewHandler as YshcsddlViewHandler).Model.dataCH3COO;
            thiz.myChart.setOption({
                xAxis: {
                    data: ['', '', '', '', '', ],
                },
                series: [{
                    data: [thiz.number1, thiz.number2, thiz.number3, thiz.number5, thiz.number6, ],
                }]
            });
        }, 400);
    }
    // 点击杯子事件
    changeEvent (val: number) {
        if (this.show) {
            return;
        }
        this.show = true;
        this.show1 = true;
        this.show4 = false;
        this.show5 = false;

        if (val === 0) {
            this.show2 = true;
            this.show3 = false;
            this.concentrationChange1();
            clearTimeout(this.timer2);
            (ViewController.getInstance().viewHandler as YshcsddlViewHandler).Model.ysEvent();
        } else {
            this.show3 = true;
            this.show2 = false;
            this.concentrationChange2();
            clearTimeout(this.timer1);
            (ViewController.getInstance().viewHandler as YshcsddlViewHandler).Model.csEvent();
        }
    }

    // 鼠标移动到烧杯上翻转事件
    hoverEvent1 () {
        document.getElementById('text1').style.opacity = '1';
        document.getElementById('flex_box12').style.opacity = '1';
    }

    leaveEvent1 () {
        document.getElementById('text1').style.opacity = '0.6';
        document.getElementById('flex_box12').style.opacity = '0.6';
    }
    hoverEvent2 () {
        document.getElementById('text2').style.opacity = '1';
        document.getElementById('flex_box22').style.opacity = '1';
    }

    leaveEvent2 () {
        document.getElementById('text2').style.opacity = '0.6';
        document.getElementById('flex_box22').style.opacity = '0.6';
    }
    // 返回及重置事件
    reset() {
        this.number1 = 15;
        this.number2 = 1;
        this.number3 = 1;
        this.number4 = 0;
        this.number5 = 0;
        this.number6 = 0;
        this.show3 = false;
        this.show2 = false;
        this.show = false;
        this.show1 = false;
        this.show4 = true;
        this.show5 = true;
        clearTimeout(this.timer1);
        clearTimeout(this.timer2);
        (ViewController.getInstance().viewHandler as YshcsddlViewHandler).Model.reset();
    }
}

