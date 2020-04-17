import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {MyViewHandler} from './services/MyViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import * as bgimage from './sub_static/UI/bj.png';
@Component
export class MainVueComponent extends Vue {
    //data
   num = 0;
   isShow1 = false;
   isShow2 = true;
    bg = bgimage as any;
    msg_l = false;
    msg_r = false;
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
        ViewController.getInstance().domReady();
    }

  //点击切换图片
  getMove(offset: any) {
    if (offset === -65) {
      (ViewController.getInstance().viewHandler as MyViewHandler).getMoveChange( -65);
    } else if (offset === +65) {
      (ViewController.getInstance().viewHandler as MyViewHandler).getMoveChange( +65);
    }
    // 控制一下箭头点击后的样式
    if (offset > 0) {
      this.msg_l = true;
      this.msg_r = false;
    }
    if (offset < 0) {
      this.msg_r = true;
      this.msg_l = false;
    }
  }
  //移动端触摸切换左右按钮背景色
  getColor(offset: any ) {
    if (offset > 0) {
      this.msg_l = true;
      this.msg_r = false;
    }
    if (offset < 0) {
      this.msg_r = true;
      this.msg_l = false;
    }
  }








    // 重置
    reset() {
        (ViewController.getInstance().viewHandler as MyViewHandler).reset();

    }



}

