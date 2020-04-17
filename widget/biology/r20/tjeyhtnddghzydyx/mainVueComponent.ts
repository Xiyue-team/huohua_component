import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { CellViewHandler } from './services/CellViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as bg from './sub_static/UI/background.png';

const echarts = require('echarts');

@Component

export class MainVueComponent extends Vue {
  //data
  speed = 0;
  show: any = true;
  zoom1 = 0;
  zoom2 = 0;
  myChart: any;
  nongdu1: any;
  nongdu2: any;
  nongdu3: any;
  opacity = true;
  isClick = true;
  ishave = false;
  ishave1 = false;
  ishave2 = false;
  ow: any;
  i: any = 0;
  p: any = 0;
  numArr1: any = [];
  numArr2: any = [];
  numArr3: any = [];
  option: any;
  numAll: any;
  size: any;
  bg: any = '';
  time: any;
  timer: any;
  rad: any;
  anniuTimer: any = 0;
  // created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new CellViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();

  }

  // mounted
  mounted() {
    this.bg = bg;
    const W = window.innerWidth;
    this.numArr1 = [[1, 0], [2, 0], [3, 1], [4, 2], [5, 2], [6, 3], [7, 4], [8, 5]];
    this.numArr2 = [[1, 0], [2, 1], [3, 3], [4, 3], [5, 4], [6, 5], [7, 6], [8, 7]];
    this.numArr3 = [[1, 1], [2, 3], [3, 5], [4, 5], [5, 6], [6, 7], [7, 9], [8, 10]];
    if (W > 1200) {
      this.size = 12;
    } else {
      this.size = 6;
    }
    this.ow = (ViewController.getInstance().viewHandler as CellViewHandler);
    this.zhixian();
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    ViewController.getInstance().domReady();
  }

  // methods

  //画环
  drawCircle(ctx: any, percent: any) {
    const getcanvas = document.getElementById('process');
    const centerX = (getcanvas as any).width / 2; //Canvas中心点x轴坐标
    const centerY = (getcanvas as any).height / 2; //Canvas中心点y轴坐标
    this.rad = Math.PI * 2 / 100; //将360度分成100份，那么每一份就是rad度

    ctx.save();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, -Math.PI / 2, -Math.PI / 2 + percent * this.rad, false);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  //执行画环动画进程
  aniMation(num: number) {
    const getcanvas = document.getElementById('process');
    const ctx = (getcanvas as any).getContext('2d');

    this.time = requestAnimationFrame(() => {
      if (this.speed < 100) {
        this.aniMation(num);
      } else {
        return;
      }
    });
    ctx.clearRect(0, 0, (getcanvas as any).width, (getcanvas as any).height);
    if (num === 0) {
      this.speed += 0.223;
    } else if (num === 1) {
      this.speed += 0.21;
    } else if (num === 2) {
      this.speed += 0.24;
    }
    this.drawCircle(ctx, this.speed);
  }

  //重置画弧动画
  resetDrawHu() {
    this.show = true;
    this.speed = 0;
    this.isClick = false;
    //是否能点击下个按钮
    this.anniuTimer =  setTimeout(() => {
      this.isClick = true;
    }, 11450);
  }

  //气泡动画
  allAnimation(num: number) {
    setTimeout(() => {
      this.rad = -Math.PI / 2;
      this.aniMation(num);
    }, 2000);
  }

  //点击按钮
  clickAnniu(num: any) {
    this.allAnimation(num);
    this.ishave = num === 0 ? true : false;
    this.ishave1 = num === 1 ? true : false;
    this.ishave2 = num === 2 ? true : false;
  }

  change(num: number) {
    if (this.isClick) {
      this.resetDrawHu();
      this.opacity = false;
      this.ow.rongqiCanvas.addLight();
      if (num === 1) {
        this.show = false;
        this.ow.ani(1);
        this.clickAnniu(0);
        this.setTime(2000, this.numArr1, 0);
        setTimeout(() => {
          this.show = true;
        }, 2000);
      } else if (num === 2) {
        this.show = false;
        this.ow.ani(2);
        this.clickAnniu(1);
        this.setTime(2000, this.numArr2, 1);
        setTimeout(() => {
          this.show = true;
        }, 2000);
      } else if (num === 3) {
        this.show = false;
        this.ow.ani(3);
        this.clickAnniu(2);
        this.setTime(2000, this.numArr3, 2);
        setTimeout(() => {
          this.show = true;
        }, 2000);
      }
    }
  }

  setTime(time: number, Arr: string, num: number) {
    this.i = 0;
    this.p = 0;
    this.numAll = [];
    this.option.series[num].data  =  this.numAll;
    this.myChart.setOption(this.option);
    setTimeout(() => {
      this.timer = setInterval(() => {
        if (this.i > 8) {
          clearInterval(this.timer);
          return;
        }
        this.numAll.push(Arr[this.p]);
        this.option.series[num].data  =  this.numAll;
        this.myChart.setOption(this.option);
        this.i++;
        this.p++;
      }, 500);
    }, time);
  }

  zhixian() {
    this.myChart = echarts.init(document.getElementById('echarts'));
    this.option = {
      title: {
        text: '叶\n片\n数\n量',
        textStyle: {
          color: '#a0a0a0',
          fontWeight: 'normal',
          fontSize: 12
        },
        left: -5
      },
      tooltip: {},
      legend: {
        top: 20,
        textStyle: {
          fontSize: this.size
        },
        data: [
          {
            name: '0.03%mol/L',
            textStyle: {
              color: '#a0a0a0'
            }
          },
          {
            name: '0.1%mol/L',
            textStyle: {
              color: '#a0a0a0'
            }
          },
          {
            name: '1%mol/L',
            textStyle: {
              color: '#a0a0a0'
            }
          }
        ]
      },
      xAxis: {
        data: ['', '5', '6', '7', '8', '9', '10', '11', '12'],
        name: 't',
        axisLine: {
          symbol: ['none', 'arrow'],
          symbolOffset: 9,
          symbolSize: [8, 10],
          lineStyle: {
            color: '#a0a0a0',
            width: 2
          }
        },
        axisTick: {
          inside: true,
          length: 5
        },
        nameTextStyle: {
          fontSize: 16
        },
        axisLabel: {
          showMaxLabel: true
        },
        boundaryGap: false
      },
      yAxis: {
        data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        axisLine: {
          symbol: ['none', 'arrow'],
          symbolOffset: 8,
          symbolSize: [8, 10],
          lineStyle: {
            color: '#a0a0a0',
            width: 2
          }
        },
        axisTick: {
          inside: true,
          length: 5
        },
        boundaryGap: false
      },
      series: [
        {
          name: '0.03%mol/L',
          type: 'line',
          data: [],
          color: '#F9C786'
        },
        {
          name: '0.1%mol/L',
          type: 'line',
          data: [],
          color: '#FFD700'
        },
        {
          name: '1%mol/L',
          type: 'line',
          data: [],
          color: '#00FFFF'
        }
      ],
      animation: false
    };
    this.myChart.setOption(this.option);
  }

  // 重置
  reset() {
    clearInterval(this.timer);
    this.zhixian();
    this.speed = 0;
    this.show = false;
    cancelAnimationFrame(this.time);
    clearInterval(this.anniuTimer);
    this.anniuTimer = 0;
    this.isClick = true;
    this.ow.rongqiCanvas.resetQipao();
    if (this.isClick) {
      this.speed = 0;
      this.show = false;
      this.opacity = true;
      this.ow.rongqiCanvas.removeL();
      if (this.ishave) {
        this.ow.resetLeafPos(0);
        this.ishave = !this.ishave;
      } else if (this.ishave1) {
        this.ow.resetLeafPos(1);
        this.ishave1 = !this.ishave1;
      } else if (this.ishave2) {
        this.ow.resetLeafPos(2);
        this.ishave2 = !this.ishave2;
      }
      this.isClick = true;
    }
    if (this.isClick) {
      this.ishave = false;
      this.ishave1 = false;
      this.ishave2 = false;
    }
  }

  resize() {
    const W = window.innerWidth;

    if (W < 1500) {
      this.zoom1 = 0.5;
      this.zoom2 = 0.7;
    } else {
      this.zoom1 = 1;
    }
  }
}

