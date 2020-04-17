import Vue from 'vue';
import Component from 'vue-class-component';
import { ViewController } from '../../../../src/core/ViewController';
import { TydbzfcViewHandler } from './services/TydbzfcViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';
import $ from 'jquery-ts';
// const Vconsole = require('vconsole');
// const vConsole = new Vconsole();
// export default vConsole;


@Component
export class MainVueComponent extends Vue {
  //data
  title = window.env.browserInfo.lang.title;
  buttonBox = window.env.browserInfo.lang.buttonBox;
  textBox = window.env.browserInfo.lang.textBox; 
  selectTxet = window.env.browserInfo.lang.selectTxet;
  width: any;
  isBox = false;
  value = 2;
  value1 = 1;
  value2 = 1;
  value3 = -1;
  axImg: any;
  logImg: any;
  text: any = '相切';
  disVlaue: any = '2.5';
  isHave = false;
  scrollTimer: any = null;
  sliderOption0 = {
    width: 180, height: 2, min: 0 , max: 5, tooltip: 'always',
    dotSize: [24, 24], process: true, speed: 0.01, interval: 0.1
  };  
  sliderOption1 = {
    width: 180, height: 2, min: -5 , max: 5, tooltip: 'always',
    dotSize: [24, 24], process: true, speed: 0.01, interval: 0.1
  }; 
  sliderOption2 = {
    width: 180, height: 2, min: -5 , max: 5, tooltip: 'always',
    dotSize: [24, 24], process: true, speed: 0.01, interval: 0.1
  }; 
  sliderOption3 = {
    width: 180, height: 2, min: -5 , max: 5, tooltip: 'always',
    dotSize: [24, 24], process: true, speed: 0.01, interval: 0.1
  }; 
  isChange1 = false;
  isChange2 = false;
  zoom1 = 0;
  ow: any;
  //created
  created() {
    const viewOption = new ViewOption();
    viewOption.mobilePanelAlpha = true;
    viewOption.showMobileExpandIco = false;
    viewOption.controlPanelAnimationDelay = 1000;
    ViewController.getInstance(new TydbzfcViewHandler(this), viewOption);
    ViewController.getInstance().viewHandler.beforeRenderElement();
  }

  //mounted
  mounted() {
    // this.isHave = true;
    // const myh = $('#jsBox2');
    // myh.css({
    //   opacity: 0
    // });
    // console.log(document.documentElement.clientHeight, document.documentElement.clientWidth);
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid || isiOS) {
      // $('.mf_container').css({
      //   overflow: 'auto'
      // });
    } else {
      $('.mf_container').css({
        overflow: 'hidden'
      });
    }
    const thiz: any = this;
    this.resize();
    for (let i = 0; i < 4; i++) {
      $(`.sliderBox${i}`).css('width', `${$(`.sliderBox${i}`).width() * this.zoom1}`);
      thiz[`sliderOption${i}`].width = 180 * this.zoom1;
      thiz[`sliderOption${i}`].dotSize = [24 * this.zoom1, 24 * this.zoom1];
    }
    window.addEventListener('resize', () => {
      this.resize();
    });
    const W = window.innerWidth;
    const H = window.innerHeight;
    this.width = W;
    if (W === 1024 && H === 768) {
      $('.disBox').css('right', '22%');
      $('.disValue').css('right', '16%');
      $('.jlBox').css('right', '25vw');
    } else if (W === 1024 && H === 698) {
      $('.disBox').css('right', '21%');
      $('.disValue').css('right', '16%');
      $('.jlBox').css('right', '26vw');
    } else if (W === 818 && H === 510) {
      $('.disBox').css({
        'right': '23%',
        'top': '68.5%',
      });
      $('.disValue').css({
        'right': '17%',
        'top': '67.5%'
      });
      $('.jlBox').css({
        'right': '31vw',
        'top': '74%'
      });
    } else if (W === 806 && H === 510 || W === 854 && H === 534) {
      $('.disBox').css({
        'right': '23.5%',
        'top': '68.5%'
      });
      $('.disValue').css({
        'right': '17%',
        'top': '67.5%'
      });
      $('.jlBox').css({
        'right': '19.5%',
        'top': '74.5%'
      });
    } else if (W === 806 && H === 534) {
      $('.jlBox').css({
        'right': '31vw',
        'top': '72%'
      });
      $('.disBox').css({
        'top': '66.5%',
        'right': '24%',
      });
      $('.disValue').css({
        'right': '18%',
        'top': '65.5%'
      });
    }  else if (W > 1200) {
      if (H > 670 && H < 810) {
        $('.disBox').css({
          'right': '23.5%',
        });
        $('.disValue').css({
          'right': '18%',
        });
        $('.jlBox').css({
          'right': '20vw',
          'top': '67%'
        });
      }
    }
    if (W === 1280 && H === 677) {
      $('.sliderBox0').css('top', '21.5%');
    }
    ViewController.getInstance().domReady();
    this.ow = (ViewController.getInstance().viewHandler as TydbzfcViewHandler).threeModel;
  }
  changeButton() {
    this.isHave = !this.isHave;
    this.ineones();
  }

  ineones() {
    // const myh = $('#jsBox2');
    // if (this.isHave) {
    //   myh.css({
    //     visibility: 'visible'
    //   });
    // } else {
    //   myh.css({
    //     visibility: 'hidden'
    //   });
    // }
    const thiz = this;
    function doScroll() {
      const el = document.getElementById('jsBox2');
      clearTimeout(thiz.scrollTimer);
      if (el.style.display !== 'none') { return; };
      if (thiz.isHave) {
        thiz.scrollTimer = setTimeout(() => {
          const _el = document.getElementById('mf_container');   
          _el.scrollTop = 20000;
          doScroll();
        }, 10);
      }
    };
    doScroll();
    if (this.isHave) {
      const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    } else {
      const el = document.getElementById('mf_container');
      el.scrollTop = 0;
    }
    const W = window.innerWidth;
    const H = window.innerHeight;
    if (this.isHave) {
      if (W === 1024 && H === 768 || H === 698) {
        $('.jlBox').css({
          'right': '16vw',
          'top': '31%'
        });
        $('.jsBox').css({
          'right': '0.5vw',
          'top': '39%'
        });
      } else if (W === 818 && H === 510) {
        $('.jlBox').css({
          'right': '25vw',
          'top': '30%'
        });
        $('.jsBox').css({
          'right': '0.5vw',
          'top': '37%'
        });
      } else if (W === 806 && H === 510) {
        $('.jlBox').css({
          'right': '24vw',
          'top': '29.5%'
        });
        $('.jsBox').css({
          'right': '0.5vw',
          'top': '37%'
        });
      } else if (W === 854 && H === 534) {
        $('.jlBox').css({
          'right': '24vw',
          'top': '30%'
        });
        $('.jsBox').css({
          'right': '0.5vw',
          'top': '36%'
        });
      } else if (W === 806 && H === 534) {
        $('.jlBox').css({
          'right': '24vw',
          'top': '48%'
        });
        $('.jsBox').css({
          'right': '0.5vw',
          'top': '54%'
        });
      } else if (W > 1200) {
        if (H === 800 || H === 803) {
          $('.jsBox').css({
            'top': '74%'
          });
        } else if (H > 670 && H < 810) {
          $('.jlBox').css({
            'right': '13.2vw',
            'top': '34%'
          });
          $('.jsBox').css({
            'top': '41%'
          });
        }
      }
      if (W === 1280) {
        this.width = 1200;
      }
    } else {
      if (W === 1024 && H === 768) {
        $('.jlBox').css({
          'right': '25vw',
          'top': '65%'
        });
      } else if (W === 1024 && H === 698) {
        $('.jlBox').css({
          'right': '26vw',
          'top': '65%'
        });
      } else if (W === 818 && H === 510) {
        $('.jlBox').css({
          'right': '31vw',
          'top': '74%'
        });
      } else if (W === 806 && H === 510) {
        $('.jlBox').css({
          'right': '19.5%',
          'top': '74.5%'
        });
      } else if (W === 854 && H === 534) {
        $('.jlBox').css({
          'right': '19.5%',
          'top': '74.5%'
        });
      } else if (W === 806 && H === 534) {
        $('.jlBox').css({
          'right': '31vw',
          'top': '72%'
        });
      } else if (W > 1200) {
        if (H > 670 && H < 810) {
          $('.disBox').css({
            'right': '23.5%',
          });
          $('.jlBox').css({
            'right': '20vw',
            'top': '67%'
          });
        }
      }
    }
  }

  reset() {
    const el = document.getElementById('mf_container');
    el.scrollTop = 0;
  }

  @Watch('value')
  changeR() {
     this.ow.dragCreatCricle();
  }
  @Watch('value1')
  changeA() {
     this.ow.dragCreatLine();
  }@Watch('value2')
  changeB() {
    this.ow.dragCreatLine();
  }@Watch('value3')
  changeC() {
    this.ow.dragCreatLine();
  }
  
//适配
  resize() {
    const W1 = window.innerWidth;
    const H1 = window.innerHeight;
    $('#3dContainer').css('background-color', '#282828');
    if (W1 > 1200) {
      this.zoom1 = 1;
    } else {
      this.zoom1 = H1 / W1;
    }
}
}
