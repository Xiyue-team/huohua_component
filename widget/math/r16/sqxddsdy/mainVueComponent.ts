import Vue from 'vue';
import { Watch } from 'vue-property-decorator';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {SqxddsdyViewHandler} from './services/SqxddsdyViewHandler';
import { BrowserUtil } from '../../../../src/util/BrowserUtil' ;

@Component
export class MainVueComponent extends Vue {
    // data
    listData = Array.from({length: 7}, (value, index) => parseFloat(((4 / 3) + (index / 3) ).toFixed(2)));
    selectParameter =  { parameter1: 2 };
    showSymbol = false;
    showEquation = true;
    isActive = false;
    initEquation = true;
    e = 1.67;
  gaoliang = false;
  isMobile = false;
  disable = false;

  created() {
    // const viewOption = new ViewOption();
    // viewOption.showMobileExpandIco = false;
    // viewOption.mobilePanelAlpha = true;
    ViewController.getInstance(new SqxddsdyViewHandler(this));
    ViewController.getInstance().viewHandler.beforeRenderElement();


    // document.addEventListener('touchmove', function(e) { e.preventDefault(); }, {passive: false});
    // const viewOption = new ViewOption();
    // viewOption.mobilePanelAlpha = true;
    // viewOption.showMobileExpandIco = false;
    // viewOption.controlPanelAnimationDelay = 1000;
    // ViewController.getInstance(new SqxddsdyViewHandler(this), viewOption);
    // ViewController.getInstance().viewHandler.beforeRenderElement();
  }
  mounted() {
    if (BrowserUtil.getBrowserInfo().isSmallDevice) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }

    ViewController.getInstance().domReady();
    setTimeout(() => {
      this.initEquation = false;
    }, 2000);
  }
  button1() {
    this.disable = true;
    (ViewController.getInstance().viewHandler as SqxddsdyViewHandler).button1();
  }
    // methods
    changeIndex(el: any) {
        (this.$refs.spin as any).$el.style.zIndex = 5;
        if (el.id === 'spin') {
            (this.$refs.spin as any).$el.style.zIndex = 8;
        }
    }
    mouseOut() {
        setTimeout(() => {
            (this.$refs.spin as any).$el.style.zIndex = 5;
        }, 1000);
    }
    // 监听事件
    @Watch('e')
    onChanged(val: any) {
        console.log('11111');
        (ViewController.getInstance().viewHandler as SqxddsdyViewHandler).sqxddy.changeFoucsPoint(val);
    }



}

