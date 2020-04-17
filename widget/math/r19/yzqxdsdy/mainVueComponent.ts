import Vue from 'vue';
import { Watch } from 'vue-property-decorator';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {YzqxdsdyViewHandler} from './services/YzqxdsdyViewHandler';
import { BrowserUtil } from '../../../../src/util/BrowserUtil' ;

@Component
export class MainVueComponent extends Vue {
    // data
    listData = Array.from([ '0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1', '1.33', '1.67',
      '2', '2.33', '2.67', '3', '3.33', '∞']);
      // {length: 7}, (value, index) => parseFloat(((4 / 3) + (index / 3) ).toFixed(2)));
    selectParameter =  { parameter1: 2 };
    showSymbol = false;
    showEquation = true;
    isActive = false;
    initEquation = true;
    e = '1.67';
    gaoliang = false;
    isMobile = false;
    disable = false;
    disable2 = true;
    color1 =  false;
    color2 = false;
    title =  '展示';
    title1 = '绘制';

    created() {
      ViewController.getInstance(new YzqxdsdyViewHandler(this));
      ViewController.getInstance().viewHandler.beforeRenderElement();
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
      this.color2 =  !this.color2;
      (ViewController.getInstance().viewHandler as YzqxdsdyViewHandler).button1();

    }

    button2() {
      this.disable2 = true;
      this.color1 =  !this.color1;
      (ViewController.getInstance().viewHandler as YzqxdsdyViewHandler).yzqxdsdy.line1.visible = false;
      (ViewController.getInstance().viewHandler as YzqxdsdyViewHandler).yzqxdsdy.line2.visible = false;
      (ViewController.getInstance().viewHandler as YzqxdsdyViewHandler).yzqxdsdy.point1.visible = false;
      (ViewController.getInstance().viewHandler as YzqxdsdyViewHandler).yzqxdsdy.point2.visible = false;
      (ViewController.getInstance().viewHandler as YzqxdsdyViewHandler).yzqxdsdy.point3.visible = false;
      (ViewController.getInstance().viewHandler as YzqxdsdyViewHandler).yzqxdsdy.point4.visible = false;
      (ViewController.getInstance().viewHandler as YzqxdsdyViewHandler).yzqxdsdy.slider1.visible = false;
      (ViewController.getInstance().viewHandler as YzqxdsdyViewHandler).yzqxdsdy.slider2.visible = false;

      (ViewController.getInstance().viewHandler as YzqxdsdyViewHandler).yzqxdsdy.line3.visible = true;
      (ViewController.getInstance().viewHandler as YzqxdsdyViewHandler).yzqxdsdy.line4.visible = true;
      (ViewController.getInstance().viewHandler as YzqxdsdyViewHandler).yzqxdsdy.pointM1.visible = true;
      (ViewController.getInstance().viewHandler as YzqxdsdyViewHandler).yzqxdsdy.pointM2.visible = true;
      (ViewController.getInstance().viewHandler as YzqxdsdyViewHandler).yzqxdsdy.sliderM1.visible = true;
      (ViewController.getInstance().viewHandler as YzqxdsdyViewHandler).yzqxdsdy.sliderM2.visible = true;
      (ViewController.getInstance().viewHandler as YzqxdsdyViewHandler).yzqxdsdy.point5.visible = true;


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
        (ViewController.getInstance().viewHandler as YzqxdsdyViewHandler).yzqxdsdy.changeFoucsPoint(val);
    }



}

