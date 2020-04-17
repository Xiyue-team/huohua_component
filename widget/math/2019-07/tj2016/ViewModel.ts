import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {YzxViewHandler} from './services/YzxViewHandler';
import $ from 'jquery-ts';
import * as questionCoverImg from './sub_static/title.png';
import * as analytic1Img from './sub_static/analytic1Img_1.png';
import * as analytic1Img_2 from './sub_static/analytic1Img_2.png';
import * as analytic2Img from './sub_static/analytic2Img_1.png';
import * as analytic2Img_2 from './sub_static/analytic2Img_2.png';
import { CoordinateSystem } from './services/CoordinateSystem'



@Component
export class ViewModel extends Vue {
  showImage = true;
  step = 1;
  width = 0;
  height = 0;
  // canvas 边
  layerBorder = 0;
  // 宽高差
  differ = 0;
  // 刻度长
  length = 10;
  coordinateSystem;
  // 函数线
  configLine1 = {points:[0,0,0,0]}
  configLine2 = {points:[0,0,0,0]}
  configLine3 = {points:[0,0,0,0]}
  //圆点
  circle1 = {}
  circle2 = {}
  circle3 = {}
  // 三角形
  triangle = {}
  // 虚线
  dotLine = {points:[0,0,0,0]}
  // 拖动点
  dragDot = {}
  // 拖动开始位置
  startX = 0;
  startY = 0;
  // 斜率
  value = 0;

  
  configStage = {
    width: this.width,
    height: this.height
  }
  configLayer = {
    x:0,
    y:0,
    height: 0,
    width:0
  }

  configX = {}
  configY = {}

  exerciseOption = {
    exercise: {
      question: {
        title: '晶胞原子数的计算1',
        coverImage: questionCoverImg
      },
      analyticArray: [{
        title: '解析一',
        stepArray: [
            {
                coverImage: analytic1Img, call: () => {
                    this.Answer(1);
                }
            },
            {
                coverImage: analytic2Img, call: () => {
                    this.Answer(2);
                } 
            },
            {
              coverImage: analytic1Img_2, call: () => {
                  this.Answer(3);
              }
            },
            {
              coverImage: analytic2Img_2, call: () => {
                  this.Answer(4);
              }
            }
        ]
      }]
    },
    resizeCall: () => { },
    analyticArray: ['解析一']
  };

  created() {
    const viewOption = new ViewOption();
    ViewController.getInstance(new YzxViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
    this.width = $('#3dContainer').width()
    this.height = $('#3dContainer').height()
    console.log(this.width)
    console.log(this.height)
    this.differ = Math.abs(this.width-this.height)
    // layer 边
    this.layerBorder = Math.min(this.width,this.height)
    this.configStage = {
      width: this.width,
      height: this.height
    }
    this.coordinateSystem = new CoordinateSystem(this.width,this.height,this.length)
    // 画x, y 轴
    this.configX = this.coordinateSystem.drawCoordinate()[0]
    this.configY = this.coordinateSystem.drawCoordinate()[1]
    // 画线
    this.configLine1 = this.coordinateSystem.drawSimpleLine(-0.33,5,4,-1.5,true,'#8BC052')
    this.configLine2 = this.coordinateSystem.drawSimpleLine(-4,-2,2,4,false,'#AA8374')
    this.configLine3 = this.coordinateSystem.drawSimpleLine(-3,4,5,-1.33,true,'#5F9BEE')
    console.log(this.configLine1)
    // 画圆点
    this.circle1 = this.coordinateSystem.drawCircle(0, 2)
    this.circle2 = this.coordinateSystem.drawCircle(1, 3)
    this.circle3 = this.coordinateSystem.drawCircle(3, 0)
    // 画三角
    this.triangle = this.coordinateSystem.drawTriangle(0,2,1,3,3,0,'#AA8374')

    this.dotLine = this.coordinateSystem.drawDotLine(-3,1.2,3,-1.2)[0]
    this.dragDot = this.coordinateSystem.drawDotLine(-3,1.2,3,-1.2)[1]
    console.log(  this.dragDot)

    var btnOpen = document.getElementById('expandOpenBtn')
    var reset = document.getElementById('reset')
    var konva = document.getElementsByClassName('konvajs-content')
    konva[0].style.margin = 'auto'
    if (reset)
      reset.style.display = 'none'
    if (btnOpen)
      btnOpen.style.display = 'none'

  }

  handleDragStart(e) {
    this.startX = e.target.attrs.x
    this.startY = e.target.attrs.y
    console.log('handleDragStart')
  }
  // 拖动事件
  handleDragMove(e){
  
    e.target.attrs.y -= (2.5 * (e.target.attrs.x - this.startX));
    e.target.attrs.x += 15
    e.target.attrs.y += 15
    console.log('handleDragMove x',e.target.attrs.x)
    console.log('handleDragMove y',e.target.attrs.y)
    let x = (e.target.attrs.x - this.width / 2) / ((this.layerBorder-40) / 10)
    let y = (this.height / 2 -  e.target.attrs.y) / ((this.layerBorder-40) / 10)
    this.value = ((y + 0.4 * x) * 5).toFixed(0);
    console.log(x);
    console.log(y);
    // e.target.attrs.x -= 15;
    // this.dotLine.points[3] = e.target.attrs.y;
 
    this.dotLine.x = e.target.attrs.x+15;
    this.dotLine.y = e.target.attrs.y+15;
  }
  handleDragEnd(e) {
    console.log('x',e.target.attrs.x)
    console.log('y',e.target.attrs.y)
  }



  Answer(i: number) {
    console.log('Answer')
    if (this.step !== i) {
        this.step = i;
    }
    if (i == 1){
      // this.dotLine = this.coordinateSystem.drawDotLine(2,4)[0]
      // this.dragDot = this.coordinateSystem.drawDotLine(2,4)[1]
      this.value = 2
    }
  }

}
