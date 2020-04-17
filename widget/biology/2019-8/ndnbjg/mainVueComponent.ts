import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { DzdyViewHandler } from './services/DzdyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as img0 from './sub_static/UI/st.png';
import * as img1 from './sub_static/UI/1.png';
import * as img2 from './sub_static/UI/2.png';
import * as img3 from './sub_static/UI/3.png';
import * as img4 from './sub_static/UI/4.png';

@Component
export class MainVueComponent extends Vue {
  // 国际化
  title = window.env.browserInfo.lang.title;
  buttonArr = window.env.browserInfo.lang.buttonArr;
  textareaArr = window.env.browserInfo.lang.textareaArr;
  text_titleArr = window.env.browserInfo.lang.text_titleArr;
  imgtitleArr = window.env.browserInfo.lang.imgtitleArr;
  //data
  zoom1 = 1; //控制界面
  have = true; //初始化按钮样式
  showStImg = true;
  ishave = 6; //动态的类绑定属性值
  stImg = img0;
  showBtn1_list = false;
  showBtn2_list = false;
  showTextArea = false;
  msg: any = null;
  showVideo1 = false;
  showVideo2 = false;
  picture11 = img3;
  picture22 = img4;

  ischecked1 = false;
  ischecked2 = false;
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
    // (ViewController.getInstance().viewHandler as DzdyViewHandler).play1.addEventListener("canplaythrough", function () {
    // //要执行的函数内容
    //   alert("视频加载完毕");
    // });
  }

  //点击botton按钮切换图片
  clickButton(offset: any) {
    this.ishave = offset;
    this.showTextArea = true;
    this.showBtn1_list = false;
    this.showBtn2_list = false;
    if (offset === 0) {
      this.showStImg = true;
      this.stImg = img1;
      this.showBtn1_list = true;
      this.msg = this.textareaArr[0];
      this.showVideo1 = false;
      this.showVideo2 = false;
      this.ischecked1 = false;
      this.ischecked2 = false;
    } else if (offset === 1) {
      this.showStImg = true;
      this.stImg = img2;
      this.showBtn2_list = true;
      this.msg = this.textareaArr[1];
      this.showVideo1 = false;
      this.showVideo2 = false;
      this.ischecked1 = false;
      this.ischecked2 = false;
    } else if (offset === 2) {
      this.showStImg = false;
      this.msg = this.textareaArr[2];
      this.showVideo2 = false;
      this.ischecked1 = false;
      this.ischecked2 = false;
      if( !this.ischecked1) {
        (ViewController.getInstance().viewHandler as DzdyViewHandler).clickButton(3);
        this.ischecked1 = true;
        this.showVideo1 = true;
      }
    } else if (offset === 3) {
      this.showStImg = false;
      this.msg = this.textareaArr[3];
      this.showVideo1 = false;
      this.ischecked1 = false;
      this.ischecked2 = false;
      if( !this.ischecked2) {
        (ViewController.getInstance().viewHandler as DzdyViewHandler).clickButton(4);
        this.ischecked2 = true;
        this.showVideo2 = true;
      }
    }
  }

  // 重置
  reset() {
    this.ishave = 6;
    this.stImg = img0;
    this.showBtn1_list = false;
    this.showBtn2_list = false;
    this.showTextArea = false;
    this.msg = null;
    this.showVideo1 = false;
    this.showVideo2 = false;
    this.showStImg = true;
    this.ischecked1 = false;
    this.ischecked2 = false;
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
    if( H1 < 400){
      document.getElementById('buttonBox').style.transform = 'scale(0.6) translate(0,60px)';
    }
  }
}

