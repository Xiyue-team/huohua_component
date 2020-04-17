import {ViewHandler} from '../../../../../src/core/CoreInterface';
import {Vue} from 'vue/types/vue';
import {CommonViewHandler} from '../../../../../src/core/CommonViewHandler';
import {ViewController} from '../../../../../src/core/ViewController';
import { Detector } from '../../../../../src/util/Detector';
export class TemplateViewHandler extends CommonViewHandler implements ViewHandler {

    titleContent: any;
    bgContent: any;
    mapContent: any;
    boundaryLineContent: any;
    rightButtonsContent: any;

    constructor(vm: Vue) {
        super(vm);
    }

    beforeRenderElement():  void {
    }

    domReady():  void {
        super.domReady();
        ViewController.getInstance().hideLoading();
        this.titleContent = document.getElementsByClassName('title_text')[0];
        this.bgContent = document.getElementsByClassName('bg_style_class')[0];
        this.mapContent = document.getElementsByClassName('boundary_lines__map_style')[0];
        this.boundaryLineContent = document.getElementsByClassName('boundary_lines__line_style')[0];
        this.rightButtonsContent = document.getElementsByClassName('right_top_buttons')[0];
        this.resize();
    }

    resize():  void {
        Detector.forceMobildLandscape();
        const scaleX = window.innerWidth / (1006.5);
        const scaleY = window.innerHeight / (787.5);
        if ((787.5) * scaleX <= window.innerHeight) {
           this.titleContent.style.transform = 'scale(' + (scaleX - 0.1) + ')';
           this.bgContent.style.transform = 'scale(' + (scaleX - 0.1) + ')';
           this.mapContent.style.transform = 'scale(' + (scaleX - 0.1) + ')';
           this.boundaryLineContent.style.transform = 'scale(' + (scaleX - 0.1) + ')';
           this.rightButtonsContent.style.transform = 'scale(' + scaleX + ')';

        } else if ((1006.5) * scaleY <= window.innerWidth) {
           this.titleContent.style.transform = 'scale(' + (scaleY - 0.1) + ')';
           this.bgContent.style.transform = 'scale(' + (scaleY - 0.1) + ')';
           this.mapContent.style.transform = 'scale(' + (scaleY - 0.1) + ')';
           this.boundaryLineContent.style.transform = 'scale(' + (scaleY - 0.1) + ')';
           this.rightButtonsContent.style.transform = 'scale(' + scaleY + ')';

        }
    }

    reset():  void {
      (this.viewModel as any).reset();
    }
}
