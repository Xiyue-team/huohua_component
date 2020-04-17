import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {MyViewHandler} from './services/MyViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as bgimage from './sub_static/UI/bj.png';
@Component
export class MainVueComponent extends Vue {
    //data
     bg = "";
     show = true;
     isTrue = false;
     isShow = false;
     isShow1 = false;
     isShow2 = false;
     isShow3 = false;
     isChecked1 = false;
     isChecked2 = false;
     isChecked3 = false;
     webp = false;
     gif = false;
    // created
      created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
      const ua = navigator.userAgent;
      if (ua.indexOf('Chrome') !== -1) {
           this.webp = true;
      } else {
          this.gif = true;
      }
      ViewController.getInstance(new MyViewHandler(this), viewOption);
      ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    // mounted
    mounted() {
      this.bg = bgimage as any;
      ViewController.getInstance().domReady();
    }
   //点击事件
    getEvent() {
      (ViewController.getInstance().viewHandler as MyViewHandler).getEvent1();
    }
    getShow(index: any) {
      if (index === 1) {
        (ViewController.getInstance().viewHandler as MyViewHandler).getChange(1);
      } else if (index === 2) {
        (ViewController.getInstance().viewHandler as MyViewHandler).getChange(2);
      } else if (index === 3) {
        (ViewController.getInstance().viewHandler as MyViewHandler).getChange(3);
      }
    }
    // 重置
    reset() {
        (ViewController.getInstance().viewHandler as MyViewHandler).reset();
    }

}

