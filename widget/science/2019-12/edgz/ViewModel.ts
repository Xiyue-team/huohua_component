import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {FabricViewHandler} from './services/FabricViewHandler';
import { Watch } from 'vue-property-decorator';

@Component
export class ViewModel extends Vue {
  lang = window.env.browserInfo.lang;

  suspensionStatus = false;
  upStatus = false;
  downStatus = false;
  customBtn = document.getElementsByClassName('custom_btn');


  created() {
    const viewOption = new ViewOption();
    viewOption.showMobileExpandIco = false;
    viewOption.adapterMobilePanel = false;
    ViewController.getInstance(new FabricViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();

    this.resize();
  }

  mounted() {
    ViewController.getInstance().domReady();
  }

  resize() {
  }

  resetEvent() {
    this.suspensionStatus = false;
    this.upStatus = false;
    this.downStatus = false;
    this.changeBtnColor();
    (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
  }

  externalEar() {
    this.upStatus = true;
    this.downStatus = false;
    this.suspensionStatus = false;
    this.changeBtnColor();
    (ViewController.getInstance().viewHandler as any).dmCanvas.clickExternalEar();
  }

  middleEar() {
    this.upStatus = false;
    this.downStatus = false;
    this.suspensionStatus = true;
    this.changeBtnColor();
    (ViewController.getInstance().viewHandler as any).dmCanvas.clickMiddleEar();
  }

  innerEar() {
    this.downStatus = true;
    this.upStatus = false;
    this.suspensionStatus = false;
    this.changeBtnColor();
    (ViewController.getInstance().viewHandler as any).dmCanvas.clickInnerEar();
  }

  changeBtnColor() {
    (this.customBtn[0] as any).style.backgroundColor = this.upStatus ? '#0091ff' : '#ffffff';
    (this.customBtn[0] as any).style.color = this.upStatus ? '#ffffff' : '#000000';

    (this.customBtn[1] as any).style.backgroundColor = this.suspensionStatus ? '#0091ff' : '#ffffff';
    (this.customBtn[1] as any).style.color = this.suspensionStatus ? '#ffffff' : '#000000';

    (this.customBtn[2] as any).style.backgroundColor = this.downStatus ? '#0091ff' : '#ffffff';
    (this.customBtn[2] as any).style.color = this.downStatus ? '#ffffff' : '#000000';
  }

}
