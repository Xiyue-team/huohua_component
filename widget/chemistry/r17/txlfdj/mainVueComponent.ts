import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TxlfdjViewHandler} from './services/TxlfdjViewHandler';
import {ViewController} from '../../../../src/core/ViewController';

@Component
export class MainVueComponent extends Vue {
  angleDirection =  '';
  leftPageGrayShow =  true;
  leftPageBlueShow =  false;
  rightPageGrayShow =  true;
  rightPageBlueShow =  false;
  buttonGrayShow1 =  true;
  buttonBlueShow1 =  false;
  buttonGrayShow2 = true;
  buttonBlueShow2 =  false;
  numberPage =  1;
  flag =  true;
  coordinationDisable =  false;
  auxiliaryLineDisable =  true;


  created() {
    const viewOption = new ViewOption();
    viewOption.controlPanelAnimationDelay = 1000;
    ViewController.getInstance(new TxlfdjViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }


  resetEvent() {
    // 重置场景
    (ViewController.getInstance().viewHandler as TxlfdjViewHandler).txlfdj3DModel.reset();

    // 重置页数
    this.numberPage = 1;
    document.getElementById('numberPage').innerText = this.numberPage + '/5';

    // 重置按钮配位数
    this.buttonGrayShow1 = true;
    this.buttonBlueShow1 = false;

    // 重置按钮辅助线
    this.buttonGrayShow2 = true;
    this.buttonBlueShow2 = false;

    this.coordinationDisable = false;
    this.auxiliaryLineDisable = true;
  }

  leftPage_mousedown() {
    this.leftPageGrayShow = false;
    this.leftPageBlueShow = true;
  }

  leftPage_mouseup() {
    this.leftPageGrayShow = true;
    this.leftPageBlueShow = false;

    if ( this.flag ) {
      setTimeout(() => {
        this.flag = true;
      }, 200);

      if (this.numberPage > 1) {
        this.numberPage --;
        (ViewController.getInstance().viewHandler as TxlfdjViewHandler).txlfdj3DModel.showObj(this.numberPage);
        // 点击后两个按钮变回原样
        this.buttonGrayShow1 = true;
        this.buttonBlueShow1 = false;

        this.buttonGrayShow2 = true;
        this.buttonBlueShow2 = false;
      }
      document.getElementById('numberPage').innerText = this.numberPage + '/5';

    }
    this.flag = false;

    // 置灰配位数按钮
    if (this.numberPage === 1 || this.numberPage === 4) {
      this.coordinationDisable = false;
    } else {
      this.coordinationDisable = true;
    }

    //置灰辅助线按钮
    if (this.numberPage === 5) {
      this.auxiliaryLineDisable = false;
    } else {
      this.auxiliaryLineDisable = true;
    }
  }

  rightPage_mousedown() {
    this.rightPageGrayShow = false;
    this.rightPageBlueShow = true;
  }

  rightPage_mouseup() {
    this.rightPageGrayShow = true;
    this.rightPageBlueShow = false;

    if ( this.flag ) {
      setTimeout(() => {
        this.flag = true;
      }, 200);

      if (this.numberPage < 5) {
        this.numberPage ++;
        (ViewController.getInstance().viewHandler as TxlfdjViewHandler).txlfdj3DModel.showObj(this.numberPage);

        // 点击后两个按钮变回原样
        this.buttonGrayShow1 = true;
        this.buttonBlueShow1 = false;

        this.buttonGrayShow2 = true;
        this.buttonBlueShow2 = false;
      }
      document.getElementById('numberPage').innerText = this.numberPage + '/5';

    }
    this.flag = false;

    // 置灰配位数按钮
    if (this.numberPage === 1 || this.numberPage === 4) {
      this.coordinationDisable = false;
    } else {
      this.coordinationDisable = true;
    }

    //置灰辅助线按钮
    if (this.numberPage === 5) {
      this.auxiliaryLineDisable = false;
    } else {
      this.auxiliaryLineDisable = true;
    }
  }

  leftPage_mouseout() {
    this.leftPageGrayShow = true;
    this.leftPageBlueShow = false;
  }

  rightPage_mouseout() {
    this.rightPageGrayShow = true;
    this.rightPageBlueShow = false;
  }

  coordination() {
    (ViewController.getInstance().viewHandler as TxlfdjViewHandler).txlfdj3DModel.coordinationNumberClick(this.buttonGrayShow1);

    if (this.buttonGrayShow1) {
      this.buttonGrayShow1 = false;
      this.buttonBlueShow1 = true;
    } else {
      this.buttonGrayShow1 = true;
      this.buttonBlueShow1 = false;
    }


  }

  auxiliaryLine() {
    (ViewController.getInstance().viewHandler as TxlfdjViewHandler).txlfdj3DModel.auxiliaryLineClick(this.buttonGrayShow2);
    if (this.buttonGrayShow2) {
      this.buttonGrayShow2 = false;
      this.buttonBlueShow2 = true;
    } else {
      this.buttonGrayShow2 = true;
      this.buttonBlueShow2 = false;
    }
  }

}

