import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {SgdhhViewHandler} from './services/SgdhhViewHandler';
@Component
export class MainVueComponent extends Vue {
  //data
  zoom1 = 0; //屏幕宽高比
  yellowText: any = null; //按钮文本
  pinkText: any = null; //按钮文本
  buleText: any = null; //按钮文本
  violetText: any = null; //按钮文本
  yelloAm = false; //按钮开关
  pinkAm = false; //按钮开关
  buleAm = false; //按钮开关
  violetAm = false; //按钮开关
  isOpinion1: any = null; //正确错误提示
  isOpinion2: any = null; //正确错误提示
  isOpinion3: any = null; //正确错误提示
  isOpinion4: any = null; //正确错误提示
  buttonBox: any = ['化合反应', '分解反应', '置换反应', '复分解反应'];
  timer: any; //定时器
  timerYellow: any;
  timerPink: any;
  timerBlue: any;
  timerViolet: any;
  //created
    created() {
      const viewOption = new ViewOption();
       viewOption.mobilePanelAlpha = true;
       viewOption.showMobileExpandIco = false;
       viewOption.controlPanelAnimationDelay = 1000;
       ViewController.getInstance(new SgdhhViewHandler(this), viewOption);
       ViewController.getInstance().viewHandler.beforeRenderElement(); 
    }

  //mounted
    mounted() {
      this.resize();
      window.addEventListener('resize', () => {
          this.resize();
      });
      ViewController.getInstance().domReady(); 
    }

    //H5坐标转为THREE场景坐标
    transitionPos(left: number, right: number, top: number, bottom: number) {
      return (ViewController.getInstance().viewHandler as SgdhhViewHandler).sgdhhModel.transitionPos(left, right, top, bottom);
    }
    //初始化提示按钮
    addTiShi() {
      (ViewController.getInstance().viewHandler as SgdhhViewHandler).sgdhhModel.addTiShi();
    }
    //删除提示
    deleteTiShi() {
      (ViewController.getInstance().viewHandler as SgdhhViewHandler).sgdhhModel.deleteTiShi();
    }
    //重置
    reset() {
      (ViewController.getInstance().viewHandler as SgdhhViewHandler).reset();
    }
    //适配
resize() {
  const W1 = window.innerWidth;
  const H1 = window.innerHeight;
  if (W1 > 1200) {
    this.zoom1 = 1;
  } else {
    this.zoom1 = H1 / W1;
  }
}
}
