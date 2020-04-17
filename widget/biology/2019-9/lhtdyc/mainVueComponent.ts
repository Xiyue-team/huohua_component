import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { MyViewHandler } from './services/MyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import * as imgL from './sub_static/UI/st11.png';
import * as imgR from './sub_static/UI/st22.png';
import * as imgL1 from './sub_static/UI/L11.png';
import * as imgL2 from './sub_static/UI/L22.png';
import * as imgL3 from './sub_static/UI/L33.png';
import * as imgR1 from './sub_static/UI/R11.png';
import * as imgR2 from './sub_static/UI/R22.png';
import * as imgR3 from './sub_static/UI/R33.png';
import * as imgPoster1 from './sub_static/UI/poster1.png';
import * as imgPoster2 from './sub_static/UI/poster2.png';
import * as imgPoster3 from './sub_static/UI/poster3.png';
import { Watch } from 'vue-property-decorator';



@Component
export class MainVueComponent extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  buttonArr = window.env.browserInfo.lang.buttonArr;
  listArr = window.env.browserInfo.lang.listArr;
  //data
  zoom1 = 1;
  have = true;
  ishave = 0;
  index = 0;
  imgLeft = imgL;
  imgRight = imgR;
  showVideo = false;
  isChecked = false;
  showMonban = false;
  showPlayButton = false;
  msg = '';
  picture = imgPoster1;
  lightPath = false;
  // created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new MyViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  // mounted
  mounted() {
    //去除左侧框架自带的长条
    const test = document.getElementsByClassName('control-panel_div_floatRight')[0];
    (test as any).style.display = 'none';
    document.addEventListener('gesturestart', function(event) {
      event.preventDefault();
    });
    document.addEventListener('touchmove', function(event) {
      event.preventDefault();
    });
    window.onload = function() {
      document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      let lastTouchEnd = 0;
      document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);
    };
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    ViewController.getInstance().domReady();
  }

//点击按钮自身的变化,及切换图片
  getEvent(offset: any) {
    if (offset === 1) {
      if( this.ishave === 1 ){
        return
      }
      this.ishave = 1;
      this.imgLeft = imgL2;
      this.imgRight = imgR1;
      this.showVideo = false;
      this.showMonban = false;
      this.lightPath = false;
    } else if (offset === 2) {
      if( this.ishave === 2 ){
        return
      }
      this.ishave = 2;
      this.imgLeft = imgL3;
      this.imgRight = imgR2;
      this.showVideo = false;
      this.lightPath = false;
      this.showMonban = false;
    } else if (offset === 3) {
      if( this.ishave === 3 ){
        return
      }
      this.ishave = 3;
      this.imgLeft = imgL1;
      this.imgRight = imgR3;
      this.showVideo = false;
      this.lightPath = false;
      this.showMonban = false;
    } else if (offset === 4) {
      
    }
  }

  // 点击playButton按钮视频的事件
  clickButton() {
    this.showPlayButton = false;
    (ViewController.getInstance().viewHandler as MyViewHandler).getVideo1(4);
  }

  @Watch('lightPath')
  isShowVideo(value: boolean) {
     if( value) {
          this.showMonban = !this.showMonban;
          this.showPlayButton = false;
          if(this.ishave === 1 ){ 
            this.picture = imgPoster1;
            this.msg = this.listArr[2];
            (ViewController.getInstance().viewHandler as MyViewHandler).getVideo1(1);
          } else if( this.ishave === 2) {
            this.picture = imgPoster2;
            this.msg = this.listArr[3];
            (ViewController.getInstance().viewHandler as MyViewHandler).getVideo1(2);
          } else if( this.ishave === 3) {
            this.picture = imgPoster3;
            this.msg = this.listArr[4];
            (ViewController.getInstance().viewHandler as MyViewHandler).getVideo1(3);
          }
        } else{
          this.showVideo = false;
          this.showMonban = false;
        }
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
    if( H1 < 400 ){
      document.getElementById('buttonBox').style.transform = 'scale(0.7) translate(30%,-80%)';
    }
    if( W1 === 667){
       this.picture = null;
    }
    if( W1 === 1024){
      this.picture = null;
   }
  }
  // 重置
  reset() {
    this.have = true;
    this.index = 0;
    this.imgLeft = imgL;
    this.imgRight = imgR;
    this.ishave = 0;
    this.isChecked = false;
    this.showVideo = false;
    this.showMonban = false;
  }

}

