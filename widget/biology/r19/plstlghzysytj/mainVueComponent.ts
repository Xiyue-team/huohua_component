import Vue from 'vue';

import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { PlstlViewHandler } from './services/PlstlViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

import * as sun from './sub_static/assets/sun.png';
import * as glasssun from './sub_static/assets/glass-sun.png';

@Component

export class MainVueComponent extends Vue {
  //动画初始图片
  bg_mouse = '';
  bg_mouse1 = '';
  bg_plant = '';
  bg_plant1 = '';
  bg_candel = '';
  bg_candel1 = '';

  //动画初始图片透明度
  candelopacity = '0';
  candel1opacity = '0';
  plantopacity = '0';
  plant1opacity = '0';
  mouseopacity = '0';
  mouse1opacity = '0';

  //渐隐渐现效果初始
  candelactive = false;
  candel1active = false;
  plantactive = false;
  plant1active = false;
  mouseactive = false;
  mouse1active = false;
  //按钮、玻璃罩、标题、桌子、右下角物体框，天空背景图，初始值或者初始透明度
  fs_glass = glasssun;
  fs_sunbtn = sun;
  activeColor = '#444444';
  bgColor = '#FFECB2';
  xianShi = 'none';
  pointerEvents = 'auto';
  stoppacity = '1';
  skyopacity = '1';
  //根据value值切换图片
  value = 0;
  value1 = 0;
  value2 = 1;
  value3 = 1;
  value4 = 0;
  value5 = 1;
  //定时器  本动画都是用定时器做的
  timer: any;
  timer1: any;
  timer2: any;
  timer3: any;
  timer4: any;
  timer5: any;
  timer6: any;
  timer7: any;
  //物体选择状态
  active1 = false;
  active2 = false;
  active3 = false;
  //选择的物体集合
  listZ: any = [];
  //初始阳光
  sunshine = true;
  //适配缩放
  zoom = 1;
  wHeight = window.innerHeight;

  // created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new PlstlViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();

  }

  // mounted
  mounted() {
    ViewController.getInstance().domReady();
    //适配问题，当页面高度小于580px时
    if (this.wHeight < 580) {
      document.getElementById('glass').style.zoom = '0.5';
      document.getElementById('options').style.zoom = '0.5';
      document.getElementById('table').style.zoom = '0.5';
      document.getElementById('stop').style.zoom = '0.5';
    }
  }

  // methods
  //点击添加右下角物体框
  addobject() {
    (ViewController.getInstance().viewHandler as PlstlViewHandler).Photosynthesis.addObject();
  }

  //右下角点击添加物体时的判断
  chooseobject(i: any, b: any) {
    //每一次点击新的动画都要清除上一次动画的所有值
    (ViewController.getInstance().viewHandler as PlstlViewHandler).Photosynthesis.delAnimation();

    //点击判断最多选俩物体
    if (this.listZ.length >= 2 && b === true) {
      return;
    }
    //判断点击的哪一个并传入数组，之后将选中的进行相应的动画
    //蜡烛时
    if (i === 0) {
      this.active1 = !this.active1;
      if (this.active1) {
        this.listZ.length = this.listZ.length + 1;
      } else {
        this.listZ.length = this.listZ.length - 1;
      }
    }
    //小鼠时
    if (i === 1) {
      this.active2 = !this.active2;
      if (this.active2) {
        this.listZ.length = this.listZ.length + 1;
      } else {
        this.listZ.length = this.listZ.length - 1;
      }
    }
    //绿色植物时
    if (i === 2) {
      this.active3 = !this.active3;
      if (this.active3) {
        this.listZ.length = this.listZ.length + 1;
      } else {
        this.listZ.length = this.listZ.length - 1;
      }
    }
  }

  //改变有无光照
  changelight() {
    //每一次改变阳光时也要清除上一次动画的所有值
    (ViewController.getInstance().viewHandler as PlstlViewHandler).Photosynthesis.delAnimation();
    //执行改变光照方法
    (ViewController.getInstance().viewHandler as PlstlViewHandler).Photosynthesis.changeLight();
  }

  //点击确定之后执行的动画
  Performanimation() {
    (ViewController.getInstance().viewHandler as PlstlViewHandler).Photosynthesis.performAnimation();
  }

  // 重置
  reset() {
    //界面恢复初始状态
    (ViewController.getInstance().viewHandler as PlstlViewHandler).Photosynthesis.reset();
  }
}
