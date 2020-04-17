import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import { Detector } from '../../../../../src/util/Detector';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    titleContent: any;
    videoAnnotationText: any;
    show_posterContent: any;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        ViewController.getInstance().hideLoading();
        this.titleContent = document.getElementsByClassName('title_text')[0];
        this.videoAnnotationText = document.getElementsByClassName('video_annotation')[0];
        this.show_posterContent = document.getElementsByClassName('show_poster')[0];
        this.resize();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const scaleX = window.innerWidth / (1096);
        const scaleY = window.innerHeight / (404);
        if ((404) * scaleX <= window.innerHeight) {

          this.titleContent.style.transform = 'scale(' + (scaleX + 0.1) + ')';
          this.show_posterContent.style.transform = 'scale(' + (scaleX - 0.1) + ')';
          this.videoAnnotationText.style.transform = 'scale(' + (scaleX - 0.1) + ')';

        } else if ((1096) * scaleY <= window.innerWidth) {

          this.titleContent.style.transform = 'scale(' + (scaleY + 0.1) + ')';
          this.show_posterContent.style.transform = 'scale(' + (scaleY - 0.1) + ')';
          this.videoAnnotationText.style.transform = 'scale(' + (scaleY - 0.1) + ')';

        }
    }
}
