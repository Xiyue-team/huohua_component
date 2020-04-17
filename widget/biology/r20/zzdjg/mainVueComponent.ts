import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { EthaneViewHandler } from './services/EthaneViewHandler';

@Component
export class MainVueComponent extends Vue {

      seedCoatTitle = '种皮';
      endospermTitle = '胚乳';
      cotyledonTitle = '子叶';
      germTitle = '胚芽';
      hypocotyTitle = '胚轴';
      radellaTitle = '胚根';

      seedCoatColor = false;
      endospermColor = false;
      cotyledonColor = false;
      germColor = false;
      hypocotylColor = false;
      radellaColor = false;

      created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = true;
        viewOption.controlPanelAnimationDelay = 1000;
        ViewController.getInstance(new EthaneViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
      }

      mounted() {
        if ((window as any)['env'].browserInfo.isSmallDevice) {
            (document.getElementsByClassName('seedCoatButton')[0] as HTMLElement).style.left = '14.5%';
            (document.getElementsByClassName('endospermButton')[0] as HTMLElement).style.left = '26.5%';
            (document.getElementsByClassName('cotyledonButton')[0] as HTMLElement).style.left = '38.5%';
            (document.getElementsByClassName('germButton')[0] as HTMLElement).style.left = '50.5%';
            (document.getElementsByClassName('hypocotylButton')[0] as HTMLElement).style.left = '62.5%';
            (document.getElementsByClassName('radellaButton')[0] as HTMLElement).style.left = '74.5%';
            (document.getElementsByClassName('seedCoatButton')[0] as HTMLElement).style.top = '18.6%';
            (document.getElementsByClassName('endospermButton')[0] as HTMLElement).style.top = '18.6%';
            (document.getElementsByClassName('cotyledonButton')[0] as HTMLElement).style.top = '18.6%';
            (document.getElementsByClassName('germButton')[0] as HTMLElement).style.top = '18.6%';
            (document.getElementsByClassName('hypocotylButton')[0] as HTMLElement).style.top = '18.6%';
            (document.getElementsByClassName('radellaButton')[0] as HTMLElement).style.top = '18.6%';
        }
        ViewController.getInstance().domReady();
        const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
        (rightPanel as HTMLElement).style.width = '100%';
      }

      //种皮
      seedCoatEvent() {
          this.seedCoatColor = true;
          this.endospermColor = false;
          this.cotyledonColor = false;
          this.germColor = false;
          this.hypocotylColor = false;
          this.radellaColor = false;
          (ViewController.getInstance().viewHandler as EthaneViewHandler).zzjgCanvas.showOrHideMethod(false, true, false,
            false, false, false, false);
      }

      //胚乳
      endospermEvent() {
        this.seedCoatColor = false;
        this.endospermColor = true;
        this.cotyledonColor = false;
        this.germColor = false;
        this.hypocotylColor = false;
        this.radellaColor = false;
        (ViewController.getInstance().viewHandler as EthaneViewHandler).zzjgCanvas.showOrHideMethod(false, false, true,
          false, false, false, false);
      }

      //子叶
      cotyledonEvent() {
        this.seedCoatColor = false;
        this.endospermColor = false;
        this.cotyledonColor = true;
        this.germColor = false;
        this.hypocotylColor = false;
        this.radellaColor = false;
        (ViewController.getInstance().viewHandler as EthaneViewHandler).zzjgCanvas.showOrHideMethod(false, false, false,
          true, false, false, false);
      }

      //胚芽
      germEvent() {
        this.seedCoatColor = false;
        this.endospermColor = false;
        this.cotyledonColor = false;
        this.germColor = true;
        this.hypocotylColor = false;
        this.radellaColor = false;
        (ViewController.getInstance().viewHandler as EthaneViewHandler).zzjgCanvas.showOrHideMethod(false, false, false,
          false, true, false, false);
      }

      //胚轴
      hypocotylEvent() {
        this.seedCoatColor = false;
        this.endospermColor = false;
        this.cotyledonColor = false;
        this.germColor = false;
        this.hypocotylColor = true;
        this.radellaColor = false;
        (ViewController.getInstance().viewHandler as EthaneViewHandler).zzjgCanvas.showOrHideMethod(false, false, false,
          false, false, true, false);
      }

      //胚根
      radellaEvent() {
        this.seedCoatColor = false;
        this.endospermColor = false;
        this.cotyledonColor = false;
        this.germColor = false;
        this.hypocotylColor = false;
        this.radellaColor = true;
        (ViewController.getInstance().viewHandler as EthaneViewHandler).zzjgCanvas.showOrHideMethod(false, false, false,
          false, false, false, true);
      }
}

