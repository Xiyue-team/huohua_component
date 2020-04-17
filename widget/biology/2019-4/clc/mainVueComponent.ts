import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {MyViewHandler} from './services/MyViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';

@Component
export class MainVueComponent extends Vue {
    //data
    zoom1 = 0;
    img_left: any = "";
    img_right: any = "";
    arr: any = [];
    imgArr: any = [];
    img_Arr: any = [];
    actived1 = false;
    actived2 = false;
    actived3 = false;
    actived4 = false;
    actived5 = false;
    actived6 = false;
    actived7 = false;
    actived8 = false;
    actived9 = false;
    actived10 = false;
   // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        //图片预加载
        for (let i = 0; i < 21; i++) {
          this.arr.push(i);
        }
        const promises = this.arr.map((vlaue: any, index: any) => {
          const img1 = require(`./sub_static/UI/${index}.png`);
          return this.preloadImage(img1).then((image: any) => {
            this.imgArr[index] = image.getAttribute('src');
          });
        });
        Promise.all(promises).then(() => {
          this.img_Arr = this.imgArr;
          this.img_right = this.img_Arr[0];
        });
        ViewController.getInstance(new MyViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    // mounted
    mounted() {
      document.addEventListener('gesturestart', function (event) {
        event.preventDefault();
      }, false);
      document.addEventListener('touchmove', function (event) {
        event.preventDefault();
      }, false);
      window.onload = function () {
        document.addEventListener('touchstart', function (event) {
          if (event.touches.length > 1) {
            event.preventDefault();
          }
        })
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
          const now  = (new Date()).getTime();
          if ( now - lastTouchEnd <= 300 ) {
            event.preventDefault();
          }
          lastTouchEnd = now;
        },  false);
      };
      this.resize();
      window.addEventListener('resize', () => {
        this.resize();
      });
      ViewController.getInstance().domReady();
    }
//点击按钮自身的变化,及切换图片
  getEvent(offset: any) {
      this.buttonChange();
      if (offset === 1) {
        this.actived1 = true;
        this.img_right = this.img_Arr[1];
        this.img_left = this.img_Arr[2];
      } else if (offset === 2) {
        this.actived2 = true;
        this.img_right = this.img_Arr[3];
        this.img_left = this.img_Arr[4];
      } else if (offset === 3) {
        this.actived3 = true;
        this.img_right = this.img_Arr[5];
        this.img_left = this.img_Arr[6];
      } else if (offset === 4) {
        this.actived4 = true;
        this.img_right = this.img_Arr[7];
        this.img_left = this.img_Arr[8];
      } else if (offset === 5) {
        this.actived5 = true;
        this.img_right = this.img_Arr[9];
        this.img_left = this.img_Arr[10];
      } else if (offset === 6) {
        this.actived6 = true;
        this.img_right = this.img_Arr[19];
        this.img_left = this.img_Arr[20];
      } else if (offset === 7) {
        this.actived7 = true;
        this.img_right = this.img_Arr[17];
        this.img_left = this.img_Arr[18];
      } else if (offset === 8) {
        this.actived8 = true;
        this.img_right = this.img_Arr[15];
        this.img_left = this.img_Arr[16];
      } else if (offset === 9) {
        this.actived9 = true;
        this.img_right = this.img_Arr[13];
        this.img_left = this.img_Arr[14];
      } else if (offset === 10) {
        this.actived10 = true;
        this.img_right = this.img_Arr[11];
        this.img_left = this.img_Arr[12];
      }
  }
  //图片预加载
    preloadImage(path: any) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = path;
        image.onload = () => resolve(image);
        image.onerror = reject;
      });
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
    }
    buttonChange() {
      this.actived1 = false;
      this.actived2 = false;
      this.actived3 = false;
      this.actived4 = false;
      this.actived5 = false;
      this.actived6 = false;
      this.actived7 = false;
      this.actived8 = false;
      this.actived9 = false;
      this.actived10 = false;
    }
    // 重置
    reset() {
        this.img_left = "";
        this.buttonChange();
        this.img_right = this.img_Arr[0];
    }

}

