import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { EthaneViewHandler } from './services/EthaneViewHandler';

@Component
export class MainVueComponent extends Vue {

      newTitle = '高';
      color = false;

      created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        viewOption.controlPanelAnimationDelay = 1000;
        ViewController.getInstance(new EthaneViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
      }

      mounted() {
        ViewController.getInstance().domReady();
        const rightPanel = document.getElementsByClassName('control-panel_div_floatRight')[0];
        (rightPanel as HTMLElement).style.height = '0px';
      }

      high() {
        if (!this.color) {
          this.color = true;
          (ViewController.getInstance().viewHandler as any).pxsbxCanvas.group5.visible(true);
          (ViewController.getInstance().viewHandler as any).pxsbxCanvas.group6.visible(true);
          (ViewController.getInstance().viewHandler as any).pxsbxCanvas.group7.visible(true);
          (ViewController.getInstance().viewHandler as any).pxsbxCanvas.group8.visible(true);
        } else {
          this.color = false;
          (ViewController.getInstance().viewHandler as any).pxsbxCanvas.group5.visible(false);
          (ViewController.getInstance().viewHandler as any).pxsbxCanvas.group6.visible(false);
          (ViewController.getInstance().viewHandler as any).pxsbxCanvas.group7.visible(false);
          (ViewController.getInstance().viewHandler as any).pxsbxCanvas.group8.visible(false);
        }
        (ViewController.getInstance().viewHandler as any).pxsbxCanvas.staticLayer.draw();
      }

}

