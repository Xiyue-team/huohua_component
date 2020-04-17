import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import { Detector } from '../../../../../src/util/Detector';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    titleContent: any;
    show_tipsContent: any = [];

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        ViewController.getInstance().hideLoading();
        this.titleContent = document.getElementsByClassName('title_text')[0];
        for (let i = 0; i < 6; i++) {
          this.show_tipsContent.push(document.getElementsByClassName('tipsContainer')[i]);
        }
        this.resize();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const scaleX = window.innerWidth / (1920);
        const scaleY = window.innerHeight / (937);
        if ((937) * scaleX <= window.innerHeight) {

          this.titleContent.style.transform = 'scale(' + (scaleX + 0.3) + ')';
          for (let i = 0; i < 6; i++) {
            this.show_tipsContent[i].style.transform = 'scale(' + (scaleX + 0.1) + ')';
          }

        } else if ((1920) * scaleY <= window.innerWidth) {

          this.titleContent.style.transform = 'scale(' + (scaleY + 0.3) + ')';
          for (let i = 0; i < 6; i++) {
            this.show_tipsContent[i].style.transform = 'scale(' + (scaleY + 0.1) + ')';
          }
        }
    }
}
