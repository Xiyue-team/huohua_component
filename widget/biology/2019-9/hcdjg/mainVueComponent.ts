import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { WormViewHandler } from './services/WormViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as imgSt from './sub_static/worm.png';
import * as img1 from './sub_static/mouth.png';
import * as img2 from './sub_static/tharm.png';
import * as img3 from './sub_static/reproductiveOrgan.png';
import * as img4 from './sub_static/anus.png';

@Component
export class MainVueComponent extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  textTitle = window.env.browserInfo.lang.textTitle;
  text_Detail = window.env.browserInfo.lang.text_Detail;
  //data
  scale = 1;
  have = true;
  initTextShow = true;
  ischecked1 = false;
  ischecked2 = false;
  ischecked3 = false;
  ischecked4 = false;
  isshow1 = false;
  isshow2 = false;
  isshow3 = false;
  isshow4 = false;
  startImg = imgSt;
  isMouthDetail = true;
  isAnusDetail = true;
  // created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new WormViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    if (window.env.browserInfo.isIpad) {
      (document.querySelector('.initImg') as any).style.top = window.innerHeight * 0.073 +
        (window.innerHeight - 576) / 2 + 'px';
      (document.querySelector('.text') as any).style.top = window.innerHeight * 0.073 +
        (window.innerHeight - 576) / 2 + 'px';


    }
  }

  //点击热点按钮触发事件
  getEvent(offset: any) {
    this.allStyle();
    switch (offset) {
      case 1 :
        this.isshow1 = true;
        this.ischecked1 = true;
        this.startImg = img1;
        break;
      case 2:
        this.isshow2 = true;
        this.ischecked2 = true;
        this.startImg = img2;
        break;
      case 3:
        this.isshow3 = true;
        this.ischecked3 = true;
        this.startImg = img3;
        break;
      case 4:
        this.isshow4 = true;
        this.ischecked4 = true;
        this.startImg = img4;
        break;
    }
  }
  // 统一样式
  allStyle() {
    this.ischecked1 = this.isshow1 =  false;
    this.ischecked2 = this.isshow2 =  false;
    this.ischecked3 = this.isshow3 =  false;
    this.ischecked4 = this.isshow4 =  false;
    this.initTextShow = false;
  }


  //适配窗口用的函数
  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width / height > 1024 / 576) {
      this.scale = height / 576;
    } else {
      this.scale = width / 1024;
    }
  }
  reset() {
    this.allStyle();
    this.initTextShow = true;
    this.startImg = imgSt;
  }
}

