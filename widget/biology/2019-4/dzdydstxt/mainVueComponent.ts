import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {DzdyViewHandler} from './services/DzdyViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as img1 from './sub_static/UI/poster1.png';
@Component
export class MainVueComponent extends Vue {
    title = window.env.browserInfo.lang.title;
    //data
    active1 = false;
    active2 = false;
    active3 = false;
    active4 = false;
    active5 = false;
    active6 = false;
    active7 = false;
    active8 = false;
    picture = img1;
    showVideo = false;
    private imgs: any = {};

   // created
    created() {
      const viewOption = new ViewOption();
      viewOption.mobilePanelAlpha = true;
      viewOption.showMobileExpandIco = false;
      ViewController.getInstance(new DzdyViewHandler(this), viewOption);
      ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    mounted() {
      ViewController.getInstance().domReady();
      //隐藏重置按钮
      if ((window as any)['env'].browserInfo.isSmallDevice) {
        const test1  = document.getElementById('resetBtn');
        test1.style.display = 'none';
      } else {
        const test  = document.getElementById('reset');
        test.style.display = 'none';
      }
    }
//点击按钮切换视频
  getEvent(offset: any) {
    if (offset === 1) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(1);
    } else if (offset === 2) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(2);
    } else if (offset === 3) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(3);
    } else if (offset === 4) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(4);
    } else if (offset === 5) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(5);
    } else if (offset === 6) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(6);
    } else if (offset === 7) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(7);
    } else if (offset === 8) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getEvent1(8);
    }
  }
  //点击按钮关闭视频
  getChange(offset: any) {
    if (offset === 1) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getChange1(1);
    } else if (offset === 2) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getChange1(2);
    } else if (offset === 3) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getChange1(3);
    } else if (offset === 4) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getChange1(4);
    } else if (offset === 5) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getChange1(5);
    } else if (offset === 6) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getChange1(6);
    } else if (offset === 7) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getChange1(7);
    } else if (offset === 8) {
      (ViewController.getInstance().viewHandler as DzdyViewHandler).getChange1(8);
    }
  }

}

