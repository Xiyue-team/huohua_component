import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import { Helper } from './helper';

export class ThreejsViewHandler extends CommonViewHandler implements ViewHandler {

    private moveAnimation: any;
    private showAnimation: any[] = [];
    private helper = new Helper();

    constructor(vm: Vue) {
        super(vm);
    }

    domReady():  void {
        super.domReady();
        /*初始化红色按钮移动动画 创建其他元素的显示动画*/
        this.initAnimation();
        ViewController.getInstance().hideLoading();
    }

    /*初始化动画*/
    initAnimation() {
        const dom = document.getElementsByClassName('buttonColor1')[0];
        const purpleButton = document.getElementsByClassName('buttonColor2');
        const yellowButton = document.getElementsByClassName('buttonColor3');
        const verdantButton = document.getElementsByClassName('buttonColor4');
        const blueButton = document.getElementsByClassName('buttonColor5');
        const aquamarineButton = document.getElementsByClassName('buttonColor6');
        const greenButton = document.getElementsByClassName('buttonColor7');
        const oliveButton = document.getElementsByClassName('buttonColor8');
        const line1 = document.getElementById('line1');
        const line2 = document.getElementById('line2');
        const line3 = document.getElementById('line3');
        const line4 = document.getElementById('line4');
        const line5 = document.getElementById('line5');
        const line6 = document.getElementById('line6');
        const line7 = document.getElementById('line7');
        const smallButton = document.getElementsByClassName('smallButton');

        this.showAnimation[0] = this.helper.createShowAnimation([purpleButton[0], purpleButton[1], line1]);
        this.showAnimation.push(this.helper.createShowAnimation([yellowButton[0], yellowButton[1], line2]));
        this.showAnimation.push(this.helper.createShowAnimation([verdantButton[0], verdantButton[1], verdantButton[2],
          smallButton[0], smallButton[1], smallButton[2], line3]));
        this.showAnimation.push(this.helper.createShowAnimation([blueButton[0], blueButton[1], blueButton[2],
          smallButton[3], smallButton[4], smallButton[5], line4]));
        this.showAnimation.push(this.helper.createShowAnimation([aquamarineButton[0], aquamarineButton[1], smallButton[6], line5]));
        this.showAnimation.push(this.helper.createShowAnimation([greenButton[0], greenButton[1], greenButton[2], greenButton[3],
          smallButton[7], smallButton[8] , smallButton[9], line6]));
        this.showAnimation.push(this.helper.createShowAnimation([oliveButton[0], oliveButton[1], smallButton[10], smallButton[11], line7]));
        this.moveAnimation = this.helper.createMoveAnimation(dom, 390 , 0, () => {
            (this.viewModel as any).showTips();
            this.showAnimation[0].play();
        });
    }

    /*单击事件方法*/
    movePlay() {
      this.moveAnimation.play();
    }

    showPlay(value: number) {
      this.showAnimation[value].play();
    }

    /*关闭图片*/
    closeBanner() {
        const dom = document.getElementsByClassName('imageStyle')[0];
        (dom as any).style.display = 'none';
    }

    /*打开图片*/
    openBanner() {
      const dom = document.getElementsByClassName('imageStyle')[0];
      (dom as any).style.display = 'block';
    }

    reset() {
      this.resetHelper(this.moveAnimation);
      for (let i = 0; i < this.showAnimation.length; i++) {
          this.resetHelper(this.showAnimation[i]);
      }
      this.closeBanner();
      this.resetButton();
      const dom = document.getElementById('tips');
      dom.style.display = 'none';
      const tips = document.getElementsByClassName('clickTip')[0];
      (tips as any).style.display = 'block';
    }

    resetHelper(obj: any) {
        obj.progress(0);
        obj.pause();
    }

    resetButton() {
      const purpleButton = document.getElementsByClassName('buttonColor2');
      const yellowButton = document.getElementsByClassName('buttonColor3');
      const verdantButton = document.getElementsByClassName('buttonColor4');
      const blueButton = document.getElementsByClassName('buttonColor5');
      const aquamarineButton = document.getElementsByClassName('buttonColor6');
      const greenButton = document.getElementsByClassName('buttonColor7');
      const oliveButton = document.getElementsByClassName('buttonColor8');
      const smallButton = document.getElementsByClassName('smallButton');
      for (let i = 0; i < purpleButton.length; i++ ) { (purpleButton[i] as any).style.display = 'none'; }
      for (let i = 0; i < yellowButton.length; i++ ) { (yellowButton[i] as any).style.display = 'none'; }
      for (let i = 0; i < verdantButton.length; i++ ) { (verdantButton[i] as any).style.display = 'none'; }
      for (let i = 0; i < blueButton.length; i++ ) { (blueButton[i] as any).style.display = 'none'; }
      for (let i = 0; i < aquamarineButton.length; i++ ) { (aquamarineButton[i] as any).style.display = 'none'; }
      for (let i = 0; i < greenButton.length; i++ ) { (greenButton[i] as any).style.display = 'none'; }
      for (let i = 0; i < oliveButton.length; i++ ) { (oliveButton[i] as any).style.display = 'none'; }
      for (let i = 0; i < smallButton.length; i++ ) { (smallButton[i] as any).style.display = 'none'; }
    }
}
