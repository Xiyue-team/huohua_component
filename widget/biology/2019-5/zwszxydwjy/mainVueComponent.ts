import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {MyViewHandler} from './services/MyViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';

@Component
export class MainVueComponent extends Vue {
    //data
    zoom1 = 1;
    textArr = ['缺含钾的无机盐', '缺含磷的无机盐', '缺含氮的无机盐'];
    have = true;
    ishave = 10;
    nomal_0 = true;
    nomal_1 = true;
    nomal_2 = true;
    k_0 = false;
    k_1 = false;
    k_2 = false;
    p_0 = false;
    p_1 = false;
    p_2 = false;
    n_0 = false;
    n_1 = false;
    n_2 = false;
   // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        //图片预加载

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
        });
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
        this.ishave = offset;
        this.allStyle();
        if (offset === 0 ) {
          this. k_0 = true;
          this. k_1 = true;
          this. k_2 = true;
        }
        if (offset === 1 ) {
          this. p_0 = true;
          this. p_1 = true;
          this. p_2 = true;
        }
        if (offset === 2 ) {
          this. n_0 = true;
          this. n_1 = true;
          this. n_2 = true;
        }
      }
    //适配窗口用的函数
      resize() {
        const W1 = window.innerWidth;
        const H1 = window.innerHeight;
        if (W1 / H1 > 1024 / 576) {
          this.zoom1 = H1 / 576;
        } else if (H1 < 361) {
          document.getElementById('btn_box').style.transform = 'translateX(-50%)  scale(0.8)';
          document.getElementById('box').style.zoom = '0.6';
        } else {
          this.zoom1 = W1 / 1024;
        }
      }
       allStyle() {
         this.nomal_0 = false;
         this.nomal_1 = false;
         this.nomal_2 = false;
         this. k_0 = false;
         this. k_1 = false;
         this. k_2 = false;
         this. p_0 = false;
         this. p_1 = false;
         this. p_2 = false;
         this. n_0 = false;
         this. n_1 = false;
         this. n_2 = false;
       }
    // 重置
    reset() {
          this.allStyle();
          this.ishave = 10;
          this.nomal_0 = true;
          this.nomal_1 = true;
          this.nomal_2 = true;
    }
}

