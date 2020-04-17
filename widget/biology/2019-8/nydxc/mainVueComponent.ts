import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { DzdyViewHandler } from './services/DzdyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';

import * as img1 from './sub_static/UI/poster1.png';
import * as img2 from './sub_static/UI/poster2.png';

import $ from 'jquery-ts';

@Component
export class MainVueComponent extends Vue {
  // 国际化
  title = window.env.browserInfo.lang.title;
  buttonArr = window.env.browserInfo.lang.buttonArr;
  textArr = window.env.browserInfo.lang.textArr;
  liArr = window.env.browserInfo.lang.liArr;
  //data
  zoom1 = 1; //控制界面
  have = true; //初始化按钮样式
  ischecked1 = false;
  ischecked2 = false;
  ischecked3 = false;
  ischecked4 = false;
  showVideo1 = false;
  showVideo2 = false;
  showVideo3 = false;
  msg = 1;
  ishave1 = true;
  ishave2 = true;
  showMonban = false;
  changeColor = false;
  picture1 = img1;
  picture2 = img2;
  //created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new DzdyViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  //监听事件
  @Watch('msg')
  onChildChanged(val: number) {
    if (this.msg === 2) {
      this.ishave1 = false;
      this.changeColor = true;
    }
    if (this.msg === 1) {
      this.ishave1 = true;
      this.changeColor = false;
    }
  }

  //点击botton按钮切换图片
  clickButton(offset: any) {
    if (offset === 1) {
      if (this.ischecked3 || this.ischecked4) {
        return;
      }
      this.ischecked1 = !this.ischecked1;
    } else if (offset === 2) {
      this.ischecked2 = !this.ischecked2;
      this.showVideo1 = true;
      (ViewController.getInstance().viewHandler as DzdyViewHandler).clickButton(2);
      if (!this.ischecked2) {
        this.showVideo1 = false;
        this.showVideo2 = false;
        this.showVideo3 = false;
        this.ischecked3 = false;
        this.ischecked4 = false;
        this.showMonban = false;
        this.msg = 1;
        document.getElementById('btn1').classList.remove('greyColor');
      }
    } else if (offset === 3) {
      this.ischecked3 = true;
      this.ischecked4 = false;
      this.ischecked1 = false;
      this.showMonban = true;
      this.changeColor = true;
      this.msg = 2;
      if( !this.showVideo2) {
        (ViewController.getInstance().viewHandler as DzdyViewHandler).clickButton(3);
      }
    } else if (offset === 4) {
      this.ischecked4 = true;
      this.ischecked3 = false;
      this.ischecked1 = false;
      this.showMonban = true;
      this.changeColor = true;
      this.msg = 2;
      if( !this.showVideo3){
        (ViewController.getInstance().viewHandler as DzdyViewHandler).clickButton(4);
      }
    }
  }
  //点击删除按钮
  del( offset : any ){
     if( offset === 1) {
       this.showVideo2 = false;
       this.showMonban = false;
       this.ischecked3 = false;
       this.ischecked4 = false;
       (ViewController.getInstance().viewHandler as DzdyViewHandler).play1.play();
       this.changeColor = false;
     }
    if( offset === 2) {
      this.showVideo3 = false;
      this.showMonban = false;
      this.ischecked3 = false;
      this.ischecked4 = false;
      (ViewController.getInstance().viewHandler as DzdyViewHandler).play1.play();
      this.changeColor = false;
    }
  }






  // 重置
  reset() {
    this.ischecked1 = false;
    this.ischecked2 = false;
    this.ischecked3 = false;
    this.ischecked4 = false;
    this.showVideo1 = false;
    this.showVideo2 = false;
    this.showVideo3 = false;
    this.msg = 1;
    this.ishave1 = true;
    this.ishave2 = true;
    this.showMonban = false;
    this.changeColor = false;
  }
  //适配窗口用的函数
  resize() {
    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    if (W1 / H1 > 1024 / 576) {
      this.zoom1 = H1 / 576;
    } else {
      this.zoom1 = W1 / 1024;
    }
    if (H1 < 400) {
      document.getElementById('buttonBox').style.transform = 'scale(0.6) translate(40px,-40px)';
    }
  }
}

