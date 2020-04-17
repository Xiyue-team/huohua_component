import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {MyCanvas} from './services/MyCanvas';
import {RectangleViewHandler} from './services/RectangleViewHandler';
import { Watch } from 'vue-property-decorator';

@Component
export class ViewModel extends Vue {
    lang = window.env.browserInfo.lang;

    dmCanvas: MyCanvas;
    title: string;
    isShowLabel = false;

    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.adapterMobilePanel = false;
        ViewController.getInstance(new RectangleViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().domReady();
        this.resize();
    }

    resize() {
    }

    resetEvent() {
        //控制事件初始化，默认为不显示
        (ViewController.getInstance().viewHandler as any).dmCanvas.reset();
        this.isShowLabel = false;
    }

    @Watch('isShowLabel')
    formulaControl(value: boolean) {
        (ViewController.getInstance().viewHandler as RectangleViewHandler).dmCanvas.isShowFormula(value);
    }
}
