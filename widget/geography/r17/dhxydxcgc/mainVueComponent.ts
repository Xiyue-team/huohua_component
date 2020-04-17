import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import { EthaneViewHandler } from './services/EthaneViewHandler';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';
import { EthaneViewHandlerForMobile } from './services/EthaneViewHandlerForMobile';
import { Watch } from 'vue-property-decorator';


@Component
export class MainVueComponent extends Vue {

      isPC = true;
      isMobile = false;
      frame1 = false;
      frame2 = true;
      frame3 = true;
      frame4 = true;
      ctrl1 = true;
      ctrl2 = false;
      ctrl3 = false;
      ctrl4 = false;
      ctrl5 = false;
      ctrl6 = false;
      isEnd1 = false;
      isEnd2 = false;
      isEnd3 = false;
      animationButtonCtrl: number[] = [1];

      slow_speed = {
        showSlider: true,
        animationName: 'step1',
        zipUrl: require('./sub_static/slow_speed.zip'),
        imageNum: 151,
        opacity: 0.001,
        sliderIsDisable: true
      };

      fast_speed = {
        showSlider: true,
        animationName: 'step2',
        zipUrl: require('./sub_static/fast_speed.zip'),
        imageNum: 121,
        opacity: 0.001,
        sliderIsDisable: true
      };

      large_temp = {
        showSlider: true,
        animationName: 'step3',
        zipUrl: require('./sub_static/large_temp.zip'),
        imageNum: 151,
        opacity: 0.001,
        sliderIsDisable: true
      };

      spit_circle = {
        showSlider: true,
        animationName: 'step4',
        zipUrl: require('./sub_static/spit_circle.zip'),
        imageNum: 31,
        isInfinite: true,
        opacity: 0.001,
        sliderIsDisable: true
      };

      mid_circle = {
        showSlider: true,
        animationName: 'step5',
        zipUrl: require('./sub_static/mid_circle.zip'),
        imageNum: 31,
        isInfinite: true,
        opacity: 0.001,
      };

      heavy_circle = {
        showSlider: true,
        animationName: 'step6',
        zipUrl: require('./sub_static/heavy_circle.zip'),
        imageNum: 31,
        isInfinite: true,
        opacity: 0.001,
        sliderIsDisable: true
      };

      created() {
        if (BrowserUtil.getBrowserInfo().os === 'Windows' || BrowserUtil.getBrowserInfo().os === 'Mac OS X') {
          this.isPC = true;
          ViewController.getInstance(new EthaneViewHandler(this));

        } else {
          this.isPC = false;
          ViewController.getInstance(new EthaneViewHandlerForMobile(this));
        }
          ViewController.getInstance().viewHandler.beforeRenderElement();
      }

      mounted() {
        //进入时自动播放
        if (this.isPC) {
            (ViewController.getInstance().viewHandler as EthaneViewHandler).playAnimation1();
        } else {
          if (BrowserUtil.getBrowserInfo().isSmallDevice) {
            this.isMobile = true;
          }
          (this.$refs.slowSpeed as any).play();
        }
        ViewController.getInstance().domReady();
      }

      sWind() {
        this.animationButtonCtrl.push(1);
        if (this.isPC) {
            (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation1();
            (ViewController.getInstance().viewHandler as EthaneViewHandler).playAnimation1();
            (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation2();
            (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation3();
            (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation4();
            (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation5();
            (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation6();
        } else {

          const num = this.animationButtonCtrl[this.animationButtonCtrl.length - 2];
          switch (num) {
            case 1:
              (this.$refs.slowSpeed as any).reset();
              break;
            case 2:
              (this.$refs.fastSpeed as any).pause();
              (this.$refs.fastSpeed as any).reset();
              break;
            case 3:
              (this.$refs.slowSpeed as any).pause();
              (this.$refs.slowSpeed as any).reset();
              break;
            case 4:
              (this.$refs.largeTemp as any).pause();
              (this.$refs.largeTemp as any).reset();
              break;
          }

            (this.$refs.slowSpeed as any).play();
        }

        this.ctrl1 = true;
        this.ctrl2 = false;
        this.ctrl3 = false;
        this.ctrl4 = false;
        this.ctrl5 = false;
        this.ctrl6 = false;

        this.frame1 = false;
        this.frame2 = true;
        this.frame3 = true;
        this.frame4 = true;
      }

      fWind() {
        this.animationButtonCtrl.push(2);
        if (this.isPC) {
          (ViewController.getInstance().viewHandler as EthaneViewHandler).playAnimation2();
          (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation1();
          (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation3();
          (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation4();
          (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation5();
          (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation6();
        } else {

            const num = this.animationButtonCtrl[this.animationButtonCtrl.length - 2];
            switch (num) {
              case 1:
                (this.$refs.slowSpeed as any).pause();
                (this.$refs.slowSpeed as any).reset();
                break;
              case 2:
                (this.$refs.fastSpeed as any).reset();
                break;
              case 3:
                (this.$refs.slowSpeed as any).pause();
                (this.$refs.slowSpeed as any).reset();
                break;
              case 4:
                (this.$refs.largeTemp as any).pause();
                (this.$refs.largeTemp as any).reset();
                break;
            }

            (this.$refs.fastSpeed as any).play();

        }

          this.ctrl1 = false;
          this.ctrl2 = true;
          this.ctrl3 = false;
          this.ctrl4 = false;
          this.ctrl5 = false;
          this.ctrl6 = false;

        this.frame1 = true;
        this.frame2 = false;
        this.frame3 = true;
        this.frame4 = true;
      }

      lTemp() {
        this.animationButtonCtrl.push(3);
        if (this.isPC) {
          (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation1();
          (ViewController.getInstance().viewHandler as EthaneViewHandler).playAnimation1();
          (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation3();
          (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation2();
          (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation4();
          (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation5();
          (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation6();
        } else {

          const num = this.animationButtonCtrl[this.animationButtonCtrl.length - 2];
          switch (num) {
            case 1:
              (this.$refs.slowSpeed as any).reset();
              break;
            case 2:
              (this.$refs.fastSpeed as any).pause();
              (this.$refs.fastSpeed as any).reset();
              break;
            case 3:
              (this.$refs.slowSpeed as any).pause();
              (this.$refs.slowSpeed as any).reset();
              break;
            case 4:
              (this.$refs.largeTemp as any).pause();
              (this.$refs.largeTemp as any).reset();
              break;
          }

            (this.$refs.slowSpeed as any).play();

        }

        this.ctrl1 = true;
        this.ctrl2 = false;
        this.ctrl3 = false;
        this.ctrl4 = false;
        this.ctrl5 = false;
        this.ctrl6 = false;

        this.frame1 = true;
        this.frame2 = true;
        this.frame3 = false;
        this.frame4 = true;
      }

      hTemp() {
        this.animationButtonCtrl.push(4);
        if (this.isPC) {
          (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation3();
          (ViewController.getInstance().viewHandler as EthaneViewHandler).playAnimation3();
          (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation1();
          (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation2();
          (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation4();
          (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation5();
          (ViewController.getInstance().viewHandler as EthaneViewHandler).resetAnimation6();
        } else {

          const num = this.animationButtonCtrl[this.animationButtonCtrl.length - 2];
          switch (num) {
            case 1:
              (this.$refs.slowSpeed as any).pause();
              (this.$refs.slowSpeed as any).reset();
              break;
            case 2:
              (this.$refs.fastSpeed as any).pause();
              (this.$refs.fastSpeed as any).reset();
              break;
            case 3:
              (this.$refs.slowSpeed as any).pause();
              (this.$refs.slowSpeed as any).reset();
              break;
            case 4:
              (this.$refs.largeTemp as any).reset();
              break;
          }

            (this.$refs.largeTemp as any).play();
        }



        this.ctrl1 = false;
        this.ctrl2 = false;
        this.ctrl3 = true;
        this.ctrl4 = false;
        this.ctrl5 = false;
        this.ctrl6 = false;

        this.frame1 = true;
        this.frame2 = true;
        this.frame3 = true;
        this.frame4 = false;
      }

      @Watch('isEnd1')
      getFrame1(value: boolean) {
        if (value) {
          this.ctrl1 = false;
          this.ctrl2 = false;
          this.ctrl3 = false;
          this.ctrl5 = true;
          this.ctrl4 = false;
          this.ctrl6 = false;
          (this.$refs.fastSpeed as any).reset();
          (this.$refs.largeTemp as any).reset();

          (this.$refs.spitCircle as any).reset();
          (this.$refs.heavyCircle as any).reset();

          (this.$refs.midCircle as any).play();
        }
      }

      @Watch('isEnd2')
      getFrame2(value: boolean) {
        if (value) {
          this.animationButtonCtrl.push(2);
          this.ctrl1 = false;
          this.ctrl2 = false;
          this.ctrl3 = false;
          this.ctrl4 = true;
          this.ctrl5 = false;
          this.ctrl6 = false;
          (this.$refs.slowSpeed as any).reset();
          (this.$refs.largeTemp as any).reset();

          (this.$refs.midCircle as any).reset();
          (this.$refs.heavyCircle as any).reset();

          (this.$refs.spitCircle as any).play();
        }
      }

      @Watch('isEnd3')
      getFrame3(value: boolean) {
        if (value) {
          this.ctrl1 = false;
          this.ctrl2 = false;
          this.ctrl3 = false;
          this.ctrl3 = false;
          this.ctrl6 = true;
          this.ctrl5 = false;
          this.ctrl4 = false;

          (this.$refs.fastSpeed as any).reset();
          (this.$refs.slowSpeed as any).reset();

          (this.$refs.midCircle as any).reset();
          (this.$refs.spitCircle as any).reset();

          (this.$refs.heavyCircle as any).play();
        }
      }

}

