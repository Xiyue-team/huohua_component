import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {YzxViewHandler} from './services/YzxViewHandler';
import $ from 'jquery-ts';
import * as questionCoverImg from './sub_static/title.png';
import * as analytic1Img from './sub_static/analytic1Img.png';
import * as analytic2Img from './sub_static/analytic2Img.png';
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
  dotLine = {}
  // 拖动点
  dragDot = {}
  // 拖动开始位置
  startX = 0;
  startY = 0;
  // 斜率
  value = 2;

  
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
    this.configLine1 = this.coordinateSystem.drawSimpleLine(-1,5,5,-1,true,'#5F9BEE')
    this.configLine2 = this.coordinateSystem.drawSimpleLine(-2,-2,4,4,false,'#8BC052')
    this.configLine3 = this.coordinateSystem.drawSimpleLine(1,4,1,-4,true,'#AA8374')
    console.log(this.configLine1)
    // 画圆点
    this.circle1 = this.coordinateSystem.drawCircle(1, 1)
    this.circle2 = this.coordinateSystem.drawCircle(1, 3)
    this.circle3 = this.coordinateSystem.drawCircle(2, 2)
    // 画三角
    this.triangle = this.coordinateSystem.drawTriangle(1,1,1,3,2,2,'#AA8374')
    this.dotLine = this.coordinateSystem.drawDotLine(2,4)[0]
    this.dragDot = this.coordinateSystem.drawDotLine(2,4)[1]

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
    console.log('handleDragStart')
  }
  // 拖动事件
  handleDragMove(e){
    // 超出可视区 斜率小于0，点拖动到下半区
    if(e.target.attrs.y < 0){
      this.dotLine = this.coordinateSystem.drawDotLine(3,3)[0]
      this.dragDot = this.coordinateSystem.drawDotLine(2.9,2.9)[1]
      this.value = 1
      return
    } else if(this.coordinateSystem.calcSlope(e.target.attrs.x,e.target.attrs.y) < 0 && e.target.attrs.y > this.height/2){
      this.dotLine = this.coordinateSystem.drawDotLine(3,3)[0]
      this.dragDot = this.coordinateSystem.drawDotLine(2.9,2.9)[1]
      this.value = 1
      return
    } else if(this.coordinateSystem.calcSlope(e.target.attrs.x,e.target.attrs.y) < 0 || e.target.attrs.y > this.height/2){
      this.dotLine = this.coordinateSystem.drawDotLine(1.3,4)[0]
      this.dragDot = this.coordinateSystem.drawDotLine(1.333,4.01)[1]
      this.value = 3
      return
    }
    
    // 斜率小于1 或大于3
    if (this.coordinateSystem.calcSlope(e.target.attrs.x,e.target.attrs.y) < 1) {
      this.dotLine = this.coordinateSystem.drawDotLine(3,3)[0]
      this.dragDot = this.coordinateSystem.drawDotLine(2.9,2.9)[1]
      this.value = 1
      return
    } else if (this.coordinateSystem.calcSlope(e.target.attrs.x,e.target.attrs.y) > 3) {
      this.dotLine = this.coordinateSystem.drawDotLine(1.3,4)[0]
      this.dragDot = this.coordinateSystem.drawDotLine(1.333,4.01)[1]
      this.value = 3
      return
    }

    this.value = this.coordinateSystem.calcSlope(e.target.attrs.x,e.target.attrs.y).toFixed(2)
    this.dotLine.points[2] = e.target.attrs.x;
    e.target.attrs.x -= 15;
    this.dotLine.points[3] = e.target.attrs.y;
    e.target.attrs.y -= 15;
    console.log('movementX',e.evt.offsetY)
    console.log('this.dragDot',this.dragDot.x)
  }
  handleDragEnd(e) {
    if (this.value == 1) {
      this.dragDot = this.coordinateSystem.drawDotLine(3,3)[1]
      return
    } else if (this.value == 3) {
      this.dragDot = this.coordinateSystem.drawDotLine(1.33,4)[1]
      return
    }
    console.log('this.dragDot',this.dragDot.x)
    console.log('handleDragEnd')
  }



  Answer(i: number) {
    console.log('Answer')
    if (this.step !== i) {
        this.step = i;
    }
    if (i == 1){
      this.dotLine = this.coordinateSystem.drawDotLine(2,4)[0]
      this.dragDot = this.coordinateSystem.drawDotLine(2,4)[1]
      this.value = 2
    }
  }

}
