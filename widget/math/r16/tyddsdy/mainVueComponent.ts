import Vue from 'vue';
import { Watch } from 'vue-property-decorator';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {EllipseViewHandler} from './services/EllipseViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';

@Component

export class MainVueComponent extends Vue {
    // data
    listData = Array.from({length: 9}, (value, index) => parseFloat((0.1 + index / 10).toFixed(1)));
    selectParameter =  { parameter1: 2 };
    showSymbol = false;
    timer: number;
    showEquation = true;
    isActive = false;
    initEquation = true;
    e = 0.8;
    // created
    created() {
        document.addEventListener('touchmove', function(e) { e.preventDefault(); }, {passive: false});
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        viewOption.controlPanelAnimationDelay = 1000;
        ViewController.getInstance(new EllipseViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    // mounted
    mounted() {
        ViewController.getInstance().domReady();
        setTimeout(() => {
            this.initEquation = false;
        }, 2000);
    }

    // methods
    changeIndex(el: any) {
        (this.$refs.spin as any).$el.style.zIndex = 5;
        if (el.id === 'spin') {
            (this.$refs.spin as any).$el.style.zIndex = 20;
        }
    }
    mouseOut() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            (this.$refs.spin as any).$el.style.zIndex = 5;
        }, 1000);
    }
    // 监听事件
    @Watch('isActive')
    onChildChanged(val: any) {
        (ViewController.getInstance().viewHandler as EllipseViewHandler).threeModel.drawEllipseHandle(val);
    }
    @Watch('e')
    onChanged(val: any) {
        (ViewController.getInstance().viewHandler as EllipseViewHandler).threeModel.changeFoucsPoint(val);
    }
    // 重置
    resetEvent() {
        (ViewController.getInstance().viewHandler as EllipseViewHandler).reset();
    }
}

