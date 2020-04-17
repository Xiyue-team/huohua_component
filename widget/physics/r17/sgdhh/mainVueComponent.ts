import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {SgdhhViewHandler} from './services/SgdhhViewHandler';
import * as bg from './sub_static/bg.png';
@Component
export class MainVueComponent extends Vue {
  //data
  zoom1 = 0;
  bg: any = null;
  //created
    created() {
      const viewOption = new ViewOption();
       viewOption.mobilePanelAlpha = true;
       viewOption.showMobileExpandIco = false;
       viewOption.controlPanelAnimationDelay = 1000;
       this.bg = bg;
       ViewController.getInstance(new SgdhhViewHandler(this), viewOption);
       ViewController.getInstance().viewHandler.beforeRenderElement(); 
    }

  //mounted
    mounted() {
      this.resize();
      window.addEventListener('resize', () => {
          this.resize();
      });
      ViewController.getInstance().domReady(); 
    }

    //适配
resize() {
  const W1 = window.innerWidth;
  const H1 = window.innerHeight;
  if (W1 / H1 < 1024 / 750) {
       this.zoom1 = W1 / 1024;
  }
  if (W1 / H1 > 1.334) {
      if ((navigator.userAgent.match(
        // tslint:disable-next-line:max-line-length
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
     this.zoom1 = H1 / 590;
  } 
} else {
   this.zoom1 = 1;
}
}

reset(): void {
  
}
}
