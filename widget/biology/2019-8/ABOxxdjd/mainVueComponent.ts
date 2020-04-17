import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { DzdyViewHandler } from './services/DzdyViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

import * as imgbt1 from './sub_static/UI/bt1.png';
import * as imgbt2 from './sub_static/UI/bt2.png';
import * as imgbt3 from './sub_static/UI/bt3.png';
import * as imgbt4 from './sub_static/UI/bt4.png';

import * as imgbt11 from './sub_static/UI/bt11.png';
import * as imgbt22 from './sub_static/UI/bt22.png';
import * as imgbt33 from './sub_static/UI/bt33.png';
import * as imgbt44 from './sub_static/UI/bt44.png';

import * as img2 from './sub_static/UI/2.png';
import * as img3 from './sub_static/UI/3.png';

import * as posterImg from './sub_static/UI/poster11.png';
@Component
export class MainVueComponent extends Vue {
  //国际化
  title = window.env.browserInfo.lang.title;
  textArr = window.env.browserInfo.lang.textArr;
  text_five = window.env.browserInfo.lang.text_five;
  text = window.env.browserInfo.lang.text;
  imgText = window.env.browserInfo.lang.imgText;
  //data
  zoom1 = 1;
  have = true;
  have2 = false;
  ischecked = false;
  ishave = 5;
  img1 = imgbt1;
  img2 = imgbt2;
  img3 = imgbt3;
  img4 = imgbt4;
  leftImg = img3;
  rightImg = img3;
  showVideo1 = false;
  showVideo2 = false;
  actived1 = false;
  actived2 = false;
  actived3 = false;
  actived4 = false;
  showTankuang = false;
  showTishi_right = false;
  showTishi_error = false;
  showAll = true;
  picture = posterImg;
  // created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    ViewController.getInstance(new DzdyViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    (document.getElementsByClassName('control-panel_div_floatRight')[0] as any).style = 'none';
    ViewController.getInstance().domReady();
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  //点击图片按钮触发事件
  clickImage(offset: any) {
    this.allStyle();
    if (offset === 1) {
      this.img1 = imgbt11;
      this.rightImg = img2;
      this.showVideo2 = false;
      if (!this.actived1) {
        this.have2 = false;
        this.ishave = 5;
        (ViewController.getInstance().viewHandler as DzdyViewHandler).clickImage1(1);
      }
      this.showVideo1 = true;
    }
    if (offset === 2) {
      this.img2 = imgbt22;
      this.showVideo1 = true;
      this.showVideo2 = true;
      if (!this.actived2) {
        this.have2 = false;
        this.ishave = 5;
        (ViewController.getInstance().viewHandler as DzdyViewHandler).clickImage1(2);
      }
    }
    if (offset === 3) {
      this.img3 = imgbt33;
      this.showVideo1 = false;
      this.leftImg = img2;
      this.showVideo2 = true;
      if (!this.actived3) {
        this.have2 = false;
        this.ishave = 5;
        (ViewController.getInstance().viewHandler as DzdyViewHandler).clickImage1(3);
      }
    }
    if (offset === 4) {
      this.img4 = imgbt44;
      this.showVideo1 = false;
      this.showVideo2 = false;
      this.leftImg = img2;
      this.rightImg = img2;
      if (!this.actived4) {
        this.have2 = false;
        this.ishave = 5;
        (ViewController.getInstance().viewHandler as DzdyViewHandler).clickImage1(4);
      }
    }
  }

  //点击button按钮触发的事件
  clickButton(offset: any) {
    const thiz = this;
    if (this.have2) {
      this.ishave = offset;
      if (offset === 0) {
        if (this.actived1) {
          this.showTishi_error = true;
          this.showTishi_right = false;
          setTimeout(() => {
            this.showTishi_error = false;
          }, 1000);
        }
        if (this.actived2) {
          this.showTishi_error = true;
          this.showTishi_right = false;
          setTimeout(() => {
            this.showTishi_error = false;
          }, 1000);
        }
        if (this.actived3) {
          this.showTishi_error = false;
          this.showTishi_right = true;
          setTimeout(() => {
            this.showTishi_right = false;
          }, 1000);
        }
        if (this.actived4) {
          this.showTishi_error = true;
          this.showTishi_right = false;
          setTimeout(() => {
            this.showTishi_error = false;
          }, 1000);
        }
      }
      if (offset === 1) {
        if (this.actived1) {
          this.showTishi_error = false;
          this.showTishi_right = true;
          setTimeout(() => {
            this.showTishi_right = false;
          }, 1000);
        }
        if (this.actived2) {
          this.showTishi_error = true;
          this.showTishi_right = false;
          setTimeout(() => {
            this.showTishi_error = false;
          }, 1000);
        }
        if (this.actived3) {
          this.showTishi_error = true;
          this.showTishi_right = false;
          setTimeout(() => {
            this.showTishi_error = false;
          }, 1000);
        }
        if (this.actived4) {
          this.showTishi_error = true;
          this.showTishi_right = false;
          setTimeout(() => {
            this.showTishi_error = false;
          }, 1000);
        }
      }
      if (offset === 2) {
        if (this.actived1) {
          this.showTishi_error = true;
          this.showTishi_right = false;
          setTimeout(() => {
            this.showTishi_error = false;
          }, 1000);
        }
        if (this.actived2) {
          this.showTishi_error = false;
          this.showTishi_right = true;
          setTimeout(() => {
            this.showTishi_right = false;
          }, 1000);
        }
        if (this.actived3) {
          this.showTishi_error = true;
          this.showTishi_right = false;
          setTimeout(() => {
            this.showTishi_error = false;
          }, 1000);
        }
        if (this.actived4) {
          this.showTishi_error = true;
          this.showTishi_right = false;
          setTimeout(() => {
            this.showTishi_error = false;
          }, 1000);
        }
      }
      if (offset === 3) {
        if (this.actived1) {
          this.showTishi_error = true;
          this.showTishi_right = false;
          setTimeout(() => {
            this.showTishi_error = false;
          }, 1000);
        }
        if (this.actived2) {
          this.showTishi_error = true;
          this.showTishi_right = false;
          setTimeout(() => {
            this.showTishi_error = false;
          }, 1000);
        }
        if (this.actived3) {
          this.showTishi_error = true;
          this.showTishi_right = false;
          setTimeout(() => {
            this.showTishi_error = false;
          }, 1000);
        }
        if (this.actived4) {
          this.showTishi_error = false;
          this.showTishi_right = true;
          setTimeout(() => {
            this.showTishi_right = false;
          }, 1000);
        }
      }
    }
  }

  //点击血型鉴定表button按钮触发函数
  getShow() {
    if (this.have2) {
      this.ischecked = !this.ischecked;
      if (this.ischecked) {
        this.showAll = false;
        document.getElementById('box_top').style.opacity = '0';
        this.showTankuang = true;
      } else {
        this.showAll = true;
        document.getElementById('box_top').style.opacity = '1';
        this.showTankuang = false;
      }
    }

  }

  // 统一样式
  allStyle() {
    this.img1 = imgbt1;
    this.img2 = imgbt2;
    this.img3 = imgbt3;
    this.img4 = imgbt4;
  }

  //重置
  Reset() {
    this.have2 = false;
    this.ischecked = false;
    this.ishave = 5;
    this.leftImg = img3;
    this.rightImg = img3;
    this.showVideo1 = false;
    this.showVideo2 = false;
    this.actived1 = false;
    this.actived2 = false;
    this.actived3 = false;
    this.actived4 = false;
    this.showTankuang = false;
    this.showTishi_right = false;
    this.showTishi_error = false;
    this.showAll = true;
    document.getElementById('box_top').style.opacity = '1';
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
    // if( H1 < 1080 && H1 > 800 ){
    //   (document.getElementById('rt_box') as any).style.zoom = 1.7;
    // }
    // if( H1 < 801 ){
    //   (document.getElementById('rt_box') as any).style.zoom = 1.2;
    // }
    // if( H1 < 600 ){
    //   (document.getElementById('rt_box') as any).style.zoom = 1;
    // }
    if( H1 < 376){
      (document.getElementById('title') as any).style.zoom = 0.7;
      // (document.getElementById('rt_box') as any).style.transform = 'scale(0.7)  translate( 40px,80px)';
    }
    if( H1 < 337){
      // (document.getElementById('rt_box') as any).style.height = '380px';
    }
  }
}

