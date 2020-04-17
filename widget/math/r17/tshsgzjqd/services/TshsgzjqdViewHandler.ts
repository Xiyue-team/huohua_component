import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {ViewController} from '../../../../../src/core/ViewController';


export class TshsgzjqdViewHandler extends CommonViewHandler implements ViewHandler {


  constructor(vm: Vue) {
    super(vm);

  }

  domReady() {
    super.domReady();
    this.init();
    ViewController.getInstance().hideLoading();
  }


  init() {

  }


  resize(): void {
    super.resize();
  }


//创建重置原函数的显示隐藏
  resetimgs(): void {
    this.viewModel.$data.display1 = true;
    this.viewModel.$data.display2 = true;
    this.viewModel.$data.display3 = true;
    this.viewModel.$data.display4 = true;
    this.viewModel.$data.display5 = true;
    this.viewModel.$data.display6 = true;
  }
//创建重置高亮方法
  resetgaoliang(): void {
    this.viewModel.$data.gaoliang1 = false;
    this.viewModel.$data.gaoliang1s = false;
    this.viewModel.$data.gaoliang2 = false;
    this.viewModel.$data.gaoliang2s = false;
    this.viewModel.$data.gaoliang3 = false;
    this.viewModel.$data.gaoliang3s = false;
    this.viewModel.$data.gaoliang4 = false;
    this.viewModel.$data.gaoliang4s = false;
    this.viewModel.$data.gaoliang5 = false;
    this.viewModel.$data.gaoliang5s = false;
    this.viewModel.$data.gaoliang6 = false;
    this.viewModel.$data.gaoliang6s = false;

  }
//创建重置求导 查看按钮方法
  resetbutton(): void {
    this.viewModel.$data.displayqiu1 = false;
    this.viewModel.$data.displayview1 = false;

    this.viewModel.$data.displayqiu2 = false;
    this.viewModel.$data.displayview2 = false;

    this.viewModel.$data.displayqiu3 = false;
    this.viewModel.$data.displayview3 = false;

    this.viewModel.$data.displayqiu4 = false;
    this.viewModel.$data.displayview4 = false;

    this.viewModel.$data.displayqiu5 = false;
    this.viewModel.$data.displayview5 = false;

    this.viewModel.$data.displayqiu6 = false;
    this.viewModel.$data.displayview6 = false;

    this.viewModel.$data.displaydao1 = false;
    this.viewModel.$data.displaydao2 = false;
    this.viewModel.$data.displaydao3 = false;
    this.viewModel.$data.displaydao4 = false;
    this.viewModel.$data.displaydao5 = false;
    this.viewModel.$data.displaydao6 = false;


  }
//创建重置判断过程方法
  resetdecide(): void {
    this.viewModel.$data.decide1  = true;
    this.viewModel.$data.decide2  = true;
    this.viewModel.$data.decide3  = true;
    this.viewModel.$data.decide4  = true;
    this.viewModel.$data.decide5  = true;
    this.viewModel.$data.decide6  = true;

  }
//创建重置导数方法
  resetimgdao(): void {
    this.viewModel.$data.displaydao1 = false;
    this.viewModel.$data.displaydao2 = false;
    this.viewModel.$data.displaydao3 = false;
    this.viewModel.$data.displaydao4 = false;
    this.viewModel.$data.displaydao5 = false;
    this.viewModel.$data.displaydao6 = false;

    this.viewModel.$data.displaydao1s = false;
    this.viewModel.$data.displaydao2s = false;
    this.viewModel.$data.displaydao3s = false;
    this.viewModel.$data.displaydao4s = false;
    this.viewModel.$data.displaydao5s = false;
    this.viewModel.$data.displaydao6s = false;

  }
    reset(): void {

    this.viewModel.$data.displayer = true;

    this.resetimgs();
    this.resetgaoliang();
    this.resetbutton();
    this.resetdecide();
    this.resetimgdao();

  }

}
