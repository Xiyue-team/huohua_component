import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {SqxViewHandler} from './services/SqxViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';

@Component
export class ViewModel extends Vue {

    XAxisTitle = '焦点在x轴';
    YAxisTitle = '焦点在y轴';
    XAxiscolor = true;
    YAxiscolor = false;

    created() {
      const viewOption = new ViewOption();
      viewOption.mobilePanelAlpha = true;
      viewOption.showMobileExpandIco = false;
      viewOption.controlPanelAnimationDelay = 1000;
      ViewController.getInstance(new SqxViewHandler(this), viewOption);
      ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

   xAxis() {
        this.XAxiscolor = true;
        this.YAxiscolor = false;
        const leftFormula = document.getElementById('leftFormula');
        leftFormula.style.opacity = '1';
        const rightFormula = document.getElementById('rightFormula');
        rightFormula.style.opacity = '0.3';
        (ViewController.getInstance().viewHandler as SqxViewHandler).sqx.obj1.visible = true;
        (ViewController.getInstance().viewHandler as SqxViewHandler).sqx.obj2.visible = false;
    }

    yAxis() {
        this.YAxiscolor = true;
        this.XAxiscolor = false;
        const leftFormula = document.getElementById('leftFormula');
        leftFormula.style.opacity = '0.3';
        const rightFormula = document.getElementById('rightFormula');
        rightFormula.style.opacity = '1';
        (ViewController.getInstance().viewHandler as SqxViewHandler).sqx.obj1.visible = false;
        (ViewController.getInstance().viewHandler as SqxViewHandler).sqx.obj2.visible = true;
    }

}

