import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {DzdyViewHandler} from './services/DzdyViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';

@Component
export class MainVueComponent extends Vue {
     //data
     zoom1 = 1; //适配用的窗口
     zoom2 = 1; //适配用的窗口
     showBj = true; //控制背景图显隐
     have = true; //给按钮添加类名控制视屏的显隐
     isChecked1 = false; //按钮点击之后添加类
     isChecked2 = false; //按钮点击之后添加类
     showGif = false; //控制视屏的显隐
     //created
     created() {
       // getWindow().setFormat(PixelFormat.TRANSLUCENT);
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
     //点击botton按钮切换图片(变化按钮样式)
     getEvent(offset: any) {
      if (offset === 0) {
        (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(0);
      } else if (offset === 1) {
        (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(1);
       }
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
      if ( H1 < 400 )  {
        document.getElementById('buttonBox').style.transform = 'scale(0.8)';
      }
     }
}

