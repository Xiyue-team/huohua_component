import Vue from 'vue';
import Component from 'vue-class-component';

import { ViewController } from '../../../../src/core/ViewController';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { YzxViewHandler } from './services/YzxViewHandler';

import $ from 'jquery-ts';
// @ts-ignore
import * as questionImg from './sub_static/img/question.png';
// @ts-ignore
import * as analysisImg1 from './sub_static/img/analysis-1.png';
// @ts-ignore
import * as analysisImg2 from './sub_static/img/analysis-2.png';
// @ts-ignore
import * as analysisImg3 from './sub_static/img/analysis-3.png';

import JXG from 'jsxgraph';


@Component
export class ViewModel extends Vue {
  showImage = true;
  step = 3;

  board = null;


  exerciseOption = {
    exercise: {
      question: {
        title: '奔驰定理',
        coverImage: questionImg
      },
      analyticArray: [{
        title: '解析一',
        stepArray: [
          {
            coverImage: analysisImg1, call: () => {
              this.Answer(1);
            }
          },
          {
            coverImage: analysisImg2, call: () => {
              this.Answer(2);
            }
          },
          {
            coverImage: analysisImg3, call: () => {
              this.Answer(3);
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
   
    this.board = JXG.JSXGraph.initBoard("board-container", {
      boundingbox: [-9, 8, 7, -2],
      keepaspectratio: true,
      // 有坐标就一定有网格
      // axis: true,
      showCopyright:false,
      // grid:false,
      showNavigation:false
    });
    this.init(this.board);
  }

  Answer(i: number) {
    if (this.step !== i) {
      this.step = i;
    }
    console.log('Answer: '+i);
  }

  init(board) {

    const pointA = board.create('point', [-4.60, 0], { name: 'A', size: 4});
    board.on('move', function () { pointA.moveTo([pointA.X(), 0]);  });
  
    let xPointA = pointA.X(), yPointA = pointA.Y();
  
  
    const pointB = board.create('point', [3.62, 0], { name: 'B', size: 4 });
    board.on('move', function () { pointB.moveTo([pointB.X(), 0]); });
    let xPointB = pointB.X(), yPointB = pointB.Y();
  
    const pointC = board.create('point', [0.78, 6.54], { name: 'C', size: 4 });
    let xPointC = pointC.X(), yPointC = pointC.Y();
  
  // 初始化P点，但是不依赖
    const xPointP = ((xPointA + xPointB) / 2.0 + xPointC) / 2.0;
    const yPointP = yPointC / 2.0;
    const pointP = board.create('point', [xPointP, yPointP], { name: 'P', size: 4 });
  
    const polyABC = board.createElement('polygon', [pointA, pointB, pointC],{fillColor: 'white',highlightFillColor: '#ffffff',borders:{
      strokeWidth:3,
      highlightStrokeWidth: 3,
      strokeColor:'#000000',
      highlightStrokeColor:'#000000'
    }});
    // polyABC.setAttribute({strokecolor:'#000000'});
    // console.log(polyABC.getAttributes());
    const lineAP = board.create('line', ["A", "P"], { strokeColor: '#19A1FF', strokeWidth: 2, straightFirst: false, straightLast: false });
    const lineBP = board.create('line', ["B", "P"], { strokeColor: '#19A1FF', strokeWidth: 2, straightFirst: false, straightLast: false });
    const lineCP = board.create('line', ["C", "P"], { strokeColor: '#19A1FF', strokeWidth: 2, straightFirst: false, straightLast: false });
  
  
    let xPointDFun = () => {
      // 已知两点求斜率
      let gradCP = 1.0 * (pointC.Y() - pointP.Y()) / (pointC.X() - pointP.X());
      // 求两个直线的交点
      let xPointD = pointC.X() - 1.0 * pointC.Y() / gradCP;
      return xPointD;
    };
  
    const pointD = board.create('point', [xPointDFun, 0], { name: 'D', size: 4 });
    const linePD =  board.create('line',['P','D'], { strokeColor: '#FF5A5A',dash:2, strokeWidth: 3, straightFirst: false, straightLast: false });
  
  // 求一个点与一条直线的垂直交点
    let xPointMFun = () => {
      // 已知两点求斜率
      let gradCP = 1.0 * (pointC.Y() - pointP.Y()) / (pointC.X() - pointP.X());
      // 已知两个直线，求交点
      let xPointM = (pointB.Y() - pointC.Y() + pointC.X() * gradCP + pointB.X() / gradCP) / (gradCP + 1.0 / gradCP)
      return xPointM;
    }
  
    let yPointMFun = ()=>{
      // 已知两点求斜率
      let gradCP = 1.0 * (pointC.Y() - pointP.Y()) / (pointC.X() - pointP.X());
       // 已知两个直线，求交点
      let yPointM = 1.0 * pointC.Y() + gradCP * ( xPointMFun() - pointC.X()); 
      return yPointM;
    }
  
    const pointM = board.create('point', [xPointMFun, yPointMFun], { name: 'M', size: 4 });
    const lineBM =  board.create('line',['B','M'], { strokeColor: '#FF5A5A',dash:2, strokeWidth: 3, straightFirst: false, straightLast: false });
    const lineDM =  board.create('line',['D','M'], { strokeColor: '#FF5A5A',dash:2, strokeWidth: 3, straightFirst: false, straightLast: false });
  
}

}
