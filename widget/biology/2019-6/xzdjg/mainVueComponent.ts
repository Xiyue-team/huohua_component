import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {SgdhhViewHandler} from './services/SgdhhViewHandler';
import * as bg from './sub_static/bg.png';
@Component
export class MainVueComponent extends Vue {
  //data
  title = window.env.browserInfo.lang.title;
  zoom1 = 0; //屏幕宽高比
  buttonBoxLeft: any = ['上腔静脉', '下腔静脉', '右心房', '右心室', '左肺动脉', '右肺动脉'];
  buttonBoxRight: any = ['左肺静脉', '右肺静脉', '左心房', '左心室', '主动脉'];
  realTextArr = ['上腔静脉', '右肺动脉', '右肺静脉', '右心房', '右心室', '下腔静脉', '主动脉', '左肺动脉', '左肺静脉', '左心房', '左心室'];
  errorRighttimer: any; //定时器
  backImg: any = null; //背景图片
  rejectArr = [{text: "", src: ""}, {text: "", src: ""}, {text: "", src: ""}, {text: "", src: ""}, {text: "", src: ""}, {text: "", src: ""},
  {text: "", src: ""}, {text: "", src: ""}, {text: "", src: ""}, {text: "", src: ""}, {text: "", src: ""}]; //存储text src
  textArr: any = ""; //获取文本数组
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
      this.backImg = bg;
      this.resize();
      window.addEventListener('resize', () => {
          this.resize();
      });
      ViewController.getInstance().domReady(); 
    }

    //H5坐标转为THREE场景坐标
    transitionPos(left: number, top: number) {
      return (ViewController.getInstance().viewHandler as SgdhhViewHandler).sgdhhModel.transitionPos(left, top);
    }
    //删除提示
    deleteTiShi() {
      (ViewController.getInstance().viewHandler as SgdhhViewHandler).sgdhhModel.deleteTiShi();
    }
    onPan(isDrag: boolean) {
      (ViewController.getInstance().viewHandler as SgdhhViewHandler).sgdhhModel.onPan(isDrag);
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
