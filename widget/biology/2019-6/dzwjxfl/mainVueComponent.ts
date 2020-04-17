import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {SgdhhViewHandler} from './services/SgdhhViewHandler';
import * as backImg from './sub_static/bg.png';
import * as yumi from './sub_static/1.png';
import * as haidai from './sub_static/2.png';
import * as saluo from './sub_static/3.png';
import * as sutie from './sub_static/4.png';
import * as xiangrikui from './sub_static/5.png';
import * as diqian from './sub_static/6.png';
@Component
export class MainVueComponent extends Vue {
  //data
  title = window.env.browserInfo.lang.title;
  zoom1 = 0; //屏幕宽高比
  backImg: any = null;
  isShow = true;
  isTextShow0 = true;
  imgBox: any = [yumi, haidai, saluo, sutie, xiangrikui, diqian];
  textArr: any = [{text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, 
  {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}, {text: ""}];
  textAllArr: any = ['无种子', '有种子', '无茎叶', '有茎叶', 
  '种子无果皮包被', '种子有果皮包被', '无根', '无根(假根)', '有根', 
  '叶脉为平行脉<br/>(一片叶子)', '叶脉为网状脉<br/>(两片叶子)', '藻类植物', '苔藓植物', '蕨类植物', '裸子植物', '单子叶植物', '双子叶植物'];
  srcArr: any = [{src: ""}, {src: ""}, {src: ""}, {src: ""}, {src: ""}, {src: ""}];
  optionText: any = [];
  optionTextleft: any = ["", "", "", "", "", ""];
  timer: any; //定时器
  isMake = false; //判断拖动
  isImgShow = false;
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
      this.backImg = backImg;
      for (let i = 0; i < 6; i++) {
      }
      ViewController.getInstance().domReady(); 
  }
  //点击事件
  appearSubordinate(index: number) {
      (ViewController.getInstance().viewHandler as SgdhhViewHandler).sgdhhModel.clickButton(index);
  }
  //屏幕坐标转为THREE场景坐标
  transitionPos(left: number, top: number) {
      return (ViewController.getInstance().viewHandler as SgdhhViewHandler).sgdhhModel.transitionPos(left, top);
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
