import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { EthaneViewHandler } from './services/EthaneViewHandler';
import { BrowserUtil } from '../../../../src/util/BrowserUtil';
import * as img from './sub_static/air1.png';
import * as img1 from './sub_static/water1.png';
import * as img2 from './sub_static/air3.png';
import * as img3 from './sub_static/Group4.png';
import * as img4 from './sub_static/water3.png';
import * as img5 from './sub_static/Group5.png';
import { Watch } from 'vue-property-decorator';

@Component
export class MainVueComponent extends Vue {

    show = false;
    isshow = false;
    img = img;
    img1 = img1;
    img2 = img2;
    img3 = img3;
    img4 = img4;
    img5 = img5;
    material1 = '空气';
    material2 = '水';
    n1 = 1;
    n2 = 1.33;
    isPC = true;

      created() {

        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        viewOption.controlPanelAnimationDelay = 1000;
        ViewController.getInstance(new EthaneViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
      }

      mounted() {
        if (BrowserUtil.getBrowserInfo().isSmallDevice) {
          this.isPC = false;
          document.getElementById('upButton').style.bottom = '0px';
          document.getElementById('downButton').style.bottom = '0px';
          document.getElementById('airButton').style.top = '10%';
          document.getElementById('waterButton').style.top = '10%';
          document.getElementById('alcoholButton').style.top = '10%';
          document.getElementById('glassButton').style.top = '10%';
          document.getElementById('eryangButton').style.top = '10%';
          document.getElementById('baoshiButton').style.top = '10%';
          document.getElementById('air2Button').style.top = '10%';
          document.getElementById('water2Button').style.top = '10%';
          document.getElementById('alcohol2Button').style.top = '10%';
          document.getElementById('glass2Button').style.top = '10%';
          document.getElementById('eryang2Button').style.top = '10%';
          document.getElementById('baoshi2Button').style.top = '10%';
        }

        ViewController.getInstance().domReady();
      }

        anniu() {
          this.img = require('./sub_static/air1.png');
          this.img2 = require('./sub_static/air3.png');
          this.img3 = require('./sub_static/Group4.png');
          this.material1 = '空气';
        }

        anniu1() {
          this.img = require('./sub_static/water1.png');
          this.img2 = require('./sub_static/water3.png');
          this.img3 = require('./sub_static/Group5.png');
          this.material1 = '水';
        }

        anniu2() {
          this.img = require('./sub_static/alcohol1.png');
          this.img2 = require('./sub_static/alcohol3.png');
          this.img3 = require('./sub_static/Group6.png');
          this.material1 = '酒精';
        }

        anniu3() {
          this.img = require('./sub_static/glass1.png');
          this.img2 = require('./sub_static/glass3.png');
          this.img3 = require('./sub_static/Group7.png');
          this.material1 = '玻璃';
        }

        anniu4() {
          this.img = require('./sub_static/eryanghuadian1.png');
          this.img2 = require('./sub_static/eryanghuadian3.png');
          this.img3 = require('./sub_static/Group8.png');
          this.material1 = '二碘甲烷';
        }
        anniu5() {
          this.img = require('./sub_static/mystery1.png');
          this.img2 = require('./sub_static/mystery3.png');
          this.img3 = require('./sub_static/Group9.png');
          this.material1 = '红宝石';
        }

        anniu6() {
          this.img1 = require('./sub_static/air1.png');
          this.img4 = require('./sub_static/air3.png');
          this.img5 = require('./sub_static/Group4.png');
          this.material2 = '空气';
        }

        anniu7() {
          this.img1 = require('./sub_static/water1.png');
          this.img4 = require('./sub_static/water3.png');
          this.img5 = require('./sub_static/Group5.png');
          this.material2 = '水';
        }

        anniu8() {
          this.img1 = require('./sub_static/alcohol1.png');
          this.img4 = require('./sub_static/alcohol3.png');
          this.img5 = require('./sub_static/Group6.png');
          this.material2 = '酒精';
        }

        anniu9() {
          this.img1 = require('./sub_static/glass1.png');
          this.img4 = require('./sub_static/glass3.png');
          this.img5 = require('./sub_static/Group7.png');
          this.material2 = '玻璃';
        }

        anniu10() {
          this.img1 = require('./sub_static/eryanghuadian1.png');
          this.img4 = require('./sub_static/eryanghuadian3.png');
          this.img5 = require('./sub_static/Group8.png');
          this.material2 = '二碘甲烷';
        }

        anniu11() {
          this.img1 = require('./sub_static/mystery1.png');
          this.img4 = require('./sub_static/mystery3.png');
          this.img5 = require('./sub_static/Group9.png');
          this.material2 = '红宝石';
        }


      @Watch('material1')
      getMaterial1 (value: any) {
        switch (value) {
          case '空气':
            this.n1 = 1;
            break;
          case '水':
            this.n1 = 1.33;
            break;
          case '酒精':
            this.n1 = 1.38;
            break;
          case '玻璃':
            this.n1 = 1.5;
            break;
          case '二碘甲烷':
            this.n1 = 1.74;
            break;
          case '红宝石':
            this.n1 = 1.77;
            break;
          default:
        }
        (ViewController.getInstance().viewHandler as EthaneViewHandler).shiNengCanvas.getNumber(this.n1, this.n2);
      }

    @Watch('material2')
    getMaterial2 (value: any) {
      switch (value) {
        case '空气':
          this.n2 = 1;
          break;
        case '水':
          this.n2 = 1.33;
          break;
        case '酒精':
          this.n2 = 1.38;
          break;
        case '玻璃':
          this.n2 = 1.5;
          break;
        case '二碘甲烷':
          this.n2 = 1.74;
          break;
        case '红宝石':
          this.n2 = 1.77;
          break;
        default:
      }
      (ViewController.getInstance().viewHandler as EthaneViewHandler).shiNengCanvas.getNumber(this.n1, this.n2);
    }

}

