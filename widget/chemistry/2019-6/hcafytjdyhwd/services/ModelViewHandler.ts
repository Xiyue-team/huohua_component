import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';
const eCharts = require('echarts');
export class ModelViewHandler extends CommonViewHandler implements ViewHandler {
    // 创建控制柱状图的变量
    myChart: any;
    // 添加监控单位体积内活化分子数和反应速率的变量
    number1 = 5;
    number2 = 5;
    // 添加监控单位体积内活化分子数和反应速率的定时器
    timer1: any;
    timer2: any;
    constructor(vm: Vue) {
        super(vm);
    }
    domReady() {
        super.domReady();
        ViewController.getInstance().hideLoading();
        this.histogram();
    }
    resize(): void {
        super.resize();
    }
    // 点击按钮事件
    getEvent1(index: number) {
        if (index === 1) {
            clearTimeout(this.timer2);
            (this.viewModel as any).active1 = true;
            this.changeEChart(50, 7, 3, );
            this.timer1 = setTimeout( () => {
                this.changeEChart(3500, 5, 5, );
            }, 300);
        } else if (index === 2) {
            clearTimeout(this.timer1);
            (this.viewModel as any).active1 = false;
            this.changeEChart(50, 7, 11, );
            this.timer2 = setTimeout( () => {
                this.changeEChart(2500, 9, 9, );
            }, 300);
        }
    }
    // 柱状图变化函数
    changeEChart (timer: number, num1: number, num2: number, ) {
        this.myChart.setOption({
            animationDurationUpdate: timer,
            series: [{
                data: ['', num1, num2, ''],
            }]
        });
    }
    // 设置柱状图样式
    histogram() {
        this.myChart = eCharts.init(document.getElementById('eCharts'));
        const option = {
            animationDuration: 2000,
            xAxis: {
                data: ['', '', '', ''],
                name: '',
                nameTextStyle: {
                    fontSize: 30
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    inside: true,
                    length: 0
                },
                axisLine: {
                    show: false,
                    symbol: ['none', 'arrow'],
                    symbolOffset: 9,
                    symbolSize: [ 8, 10],
                    lineStyle: {
                        color: '#000',
                        width: 3
                    },
                    textStyle: {
                        color: '#EDEDED',
                        fontWeight: 'normal',
                        fontSize: 30
                    },
                },
                axisLabel: {
                    fontSize: 18,
                },
                boundaryGap: false,
            },
            // 设置柱状图向左或者向右偏移多少位置
            grid: {
                right: '15%',
            },
            yAxis: {
                type: 'value',
                max: 12,
                min: 0,
                splitNumber: 1,
                name: '',
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
                    show: false,
                    symbol: ['none', 'arrow'],
                    symbolOffset: 9,
                    symbolSize: [ 8, 10],
                    lineStyle: {
                        color: '#000',
                        width: 3
                    },
                },
            },
            series: [{
                data: ['', this.number1, this.number2, ''],
                type: 'bar',
                barWidth : 30,
                itemStyle: {
                    //通常情况下：
                    normal: {
                        //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                        color: function (params: any) {
                            const colorList = ['', '#204cbc', '#d17830', ''];
                            return colorList[params.dataIndex];
                        }
                    },
                },
            }]
        };
        this.myChart.setOption(option);
    }
    reset(): void {
        if ((this.viewModel as any).mark === true) {
            return;
        }
        (this.viewModel as any).active1 = true;
        this.changeEChart(50, 5, 5);
        (this.viewModel as any).clearTimer();
        (this.viewModel as any).playXhEvent(0, 29, 150);
        (this.viewModel as any).mark = false;
        clearTimeout(this.timer1);
        clearTimeout(this.timer2);
    }

}
