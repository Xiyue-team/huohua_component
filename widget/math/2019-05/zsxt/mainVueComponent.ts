import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {TydbzfcViewHandler} from './services/TydbzfcViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import $ from 'jquery-ts';
@Component
export class MainVueComponent extends Vue {
  //data
  zoom1 = 0;
  textArr: any = ['切换', '表达式', '勾股定理'];
  num: any = 3;
  ishave = false; //控制第一个蓝色按钮
  ishave1 = false; //控制第二个蓝色按钮
  ishave2 = false; //控制第三个蓝色按钮
  show = false; //表达式开关按钮
  imgShow = false; //勾股定理图片显示
  ow: any;
  textMid = true;
  //created
  created() {
       const viewOption = new ViewOption();
       viewOption.mobilePanelAlpha = true;
       viewOption.showMobileExpandIco = false;
       viewOption.controlPanelAnimationDelay = 1000;
       
       ViewController.getInstance(new TydbzfcViewHandler(this), viewOption);
       ViewController.getInstance().viewHandler.beforeRenderElement(); 
  }

  //mounted
  mounted() {
      ViewController.getInstance().domReady(); 
      this.ow = (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel;
      this.ow.transitionPosToThree(121, 30, 148, 30, 120, -15, 'button_box');
      this.ow.transitionPosToThree(121, 30, 148, 30, 121, 19, 'button1');
      this.ow.transitionPosToThree(121, 12, 148, 12, 121, 0, 'button2');
      this.ow.transitionPosToThree(121, -4, 148, -4, 121, -15, 'button3');
      this.ow.transitionPosToThree(106, -20, 157, -20, 106, -58, 'imgBox');
  }

  //methods
  clickbutton(num: number) {
    (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel.clickButton(num);
  }
}
