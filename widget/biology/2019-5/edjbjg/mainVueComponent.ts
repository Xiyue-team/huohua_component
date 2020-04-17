import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {DzdyViewHandler} from './services/DzdyViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as gif from'./sub_static/Video/2.gif';
@Component
export class MainVueComponent extends Vue {
   title = window.env.browserInfo.lang.title;
   buttonArr = window.env.browserInfo.lang.buttonArr;
   textArr = window.env.browserInfo.lang.textArr;
    //data
    zoom1 = 1;//控制界面
    have = true; //初始化按钮样式
    ishave = 6; //动态的类绑定属性值
    ishave1 = 6;//动态的类绑定属性值
    ishave2 = 6;//动态的类绑定属性值
    showVideo = false; //控制视频的显示
    isShow = false;   //控制最左边按钮
    isShow_st = true; //控制初始的图片显示
    isShow_w = false;//控制外耳的显示
    isShow_z = false;//控制中耳的显示
    isShow_n = false;//控制内耳的显示
    showVoice = false; //控制声音
    private imgs: any = [];//给预加载的图片添加一个变量
    activeMp3 = 0;//控制MP3点击的次数
    //created
    created() {
      const viewOption = new ViewOption();
      viewOption.mobilePanelAlpha = true;
      viewOption.showMobileExpandIco = false;
      ViewController.getInstance(new DzdyViewHandler(this), viewOption);
      ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    mounted() {
      (document.getElementsByClassName('control-panel_div_floatRight')[0] as any).style.display = 'none';
      ViewController.getInstance().domReady();
      this.resize();
      window.addEventListener('resize', () => {
        this.resize();
      });
    }
    //点击botton按钮切换图片
    getEvent(offset: any) {
      this.isShow = false;
      this.isShow_st = true;
      this.activeMp3 = 0;
      setTimeout(()=>{
        (document.getElementById('gifSrc') as any).src = gif;
        this.showVideo = false;
      },10);
      this.showVoice = false;
      this.buttonAllStyle();
      if (offset === 0) {
        this.ishave  = 0;
        this.ishave1 = 6;
        this.ishave2 = 6;
        this.isShow_w = true;
      } else if (offset === 1) {
        this.ishave  = 6;
        this.ishave1 = 1;
        this.ishave2 = 6;
        this.isShow_z = true;
      } else if (offset === 2) {
        this.ishave  = 6;
        this.ishave1 = 6;
        this.ishave2 = 2;
        this.isShow_n = true;
      }
    }
    //点击播放视频的按钮事件
    getPlay() {
      if(this.activeMp3!= 0){
         return
      }
      (document.getElementById('gifSrc') as any).src = gif;
      this.showVideo = true;
      setTimeout(( ) => {
        this.isShow_st = false;
        this.buttonAllStyle();
      },100);
      this.isShow = true;
      this.showVoice = true;
      this.activeMp3 = 1;
    }
    //为按钮初始化样式
    buttonAllStyle ( ) {
      this.isShow_z = false;
      this.isShow_w = false;
      this.isShow_n = false;
      this.ishave = 6;
      this.ishave1 = 6;
      this.ishave2 = 6;
    }
    // 重置
    reset()  {
      this.ishave = 6;
      this.ishave1 = 6;
      this.ishave2 = 6;
      this.buttonAllStyle();
      this.isShow_st = true;
      this.showVideo = false;
      this.isShow = false;
      this.showVoice = false;
      this.activeMp3 = 0;
      (document.getElementById('gifSrc') as any).src = gif;
    }
    //适配窗口用的函数
    resize() {
      const W1 = window.innerWidth;
      const H1 = window.innerHeight;
      if (W1 / H1 > 1024 / 576) {
        this.zoom1 = H1 / 576;
      }  else {
        this.zoom1 = W1 / 1024;
      }
    }
}

