/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/6 16:17
 */
import {Detector} from './Detector';
import {SystemTip} from '../core/SystemTip';
import { Security } from '@huohua/security';
import { Environment, Log, BrowserInfo} from '@huohua/huohua-component-log';
import 'promise-polyfill/src/polyfill';
import { InjectParameter } from './InjectParameter';
require('es6-promise').polyfill();



export class BrowserUtil {


    static getBrowserInfo(): BrowserInfo {
        if (window.env && window.env.browserInfo) {

            return window.env.browserInfo;
        }

        const ua = navigator.userAgent;
        const boInfo = {
            browser: '',
            browserVersion: '' ,
            os: '' ,
            osVersion: ''
        };
        let tem;
        let bsInfo = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(bsInfo[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            bsInfo[1] = 'IE';
            bsInfo[2] = tem[1] || ''; // IE浏览器版本
        }

        if (bsInfo[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) {
                // return tem.slice(1).join(' ').replace('OPR', 'Opera');
                bsInfo[1] = 'Opera';
                bsInfo[2] = tem[1] || '';
            }
        }

        bsInfo = bsInfo[2] ? [bsInfo[1], bsInfo[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
            bsInfo.splice(1, 1, tem[1]);
        }

        const clientStrings = [
            { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
            { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
            { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
            { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
            { s: 'Windows Vista', r: /Windows NT 6.0/ },
            { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
            { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
            { s: 'Android', r: /Android/ },
            { s: 'Open BSD', r: /OpenBSD/ },
            { s: 'Sun OS', r: /SunOS/ },
            { s: 'Linux', r: /(Linux|X11)/ },
            { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
            { s: 'Mac OS X', r: /Mac OS X/ },
            { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
            { s: 'QNX', r: /QNX/ },
            { s: 'UNIX', r: /UNIX/ },
            { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
        ];

        let os = '';
        let osVersion = [];
        let osVersionStr = '';

        for ( const id in clientStrings) {
            /*if (clientStrings.hasOwnProperty(id)) {
                continue;
            }*/
            if ( !id) {
                continue;
            }
            const cs = clientStrings[id];

            // 注意不要用ua，ua是小写化
            if (cs.r.test(navigator.userAgent)) {
                os = cs.s;
                break;
            }

        }

        if (/Windows/.test(os)) {
            osVersionStr = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersionStr = /Mac OS X (10[\.\_\d]+)/.exec(ua)[1];
                break;

            case 'Android':
                osVersionStr = /Android ([\.\_\d]+)/.exec(ua)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.appVersion);
                osVersionStr = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] || 0);
                break;
        }

        if ( os === 'Mac OS X' || os === 'Windows' ) {

        }




        boInfo.browser = bsInfo[0];
        boInfo.browserVersion = bsInfo[1];
        boInfo.os = os;
        boInfo.osVersion = osVersionStr;

        const browserInfo = new BrowserInfo();
        browserInfo.userAgent  = window.navigator.userAgent;
        browserInfo.isMobile   = !!ua.match(/.*Mobile.*/)/* || BrowserUtil.isQQBroswer() || BrowserUtil.isRunWechat()*/;
        browserInfo.browser    = boInfo.browser;
        browserInfo.version    = boInfo.browserVersion;
        browserInfo.os         = boInfo.os;
        browserInfo.osVersion  = boInfo.osVersion;
        browserInfo.isQQ       = BrowserUtil.isQQBroswer();
        browserInfo.isWechat   = BrowserUtil.isRunWechat();
        browserInfo.isElectron = BrowserUtil.isEditor();
        browserInfo.isHuohuaPlayer   = this.isHuohuaPlayer();
        browserInfo.isHuohuaApp   = this.isHuohuaApp();
        browserInfo.devicePixelRatio = window.devicePixelRatio;
        browserInfo.screenResolution = window.screen.width + 'x' + window.screen.height;
        browserInfo.windowSize       = document.documentElement.clientWidth + 'x' + document.documentElement.clientHeight;
        browserInfo.supportWebgl     = Detector.webgl();
        browserInfo.orientation      = BrowserUtil.getOrientation();
        browserInfo.isPc      = (os === 'Mac OS X' || os === 'Windows') ? true : false;
        browserInfo.isIpad    = !!ua.match(/.*iPad.*/);
        browserInfo.isIphone  = !!ua.match(/.*iPhone.*/);
        browserInfo.isSmallDevice = window.screen.width <= 610 || window.screen.height <= 610;

        browserInfo.language = !BrowserUtil.getQueryString('lang')
            ? (
                !(navigator.language || (navigator as any)['browserLanguage']).toLowerCase().substr(0, 2)
                ? 'zh'
                : (navigator.language || (navigator as any)['browserLanguage']).toLowerCase().substr(0, 2)
              )
            : BrowserUtil.getQueryString('lang');

        return browserInfo;
    }

    //判断浏览器 横屏landscape  竖屏portrait
    static getOrientation(): string {
        let orientation = '';
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;
        if ( window.hasOwnProperty('orientation') === false) {
            if (width > height) {
                orientation = 'landscape';
            } else {
                orientation = 'portrait';
            }
        } else {
            const orientationNum = Number.parseInt( window.orientation as string );
            if (orientationNum === 0 || orientationNum === 180) {
                //竖屏
                orientation = 'portrait';
            } else if (orientationNum === 90 || orientationNum === -90) {
                //横屏
                orientation = 'landscape';
            }
        }

        return orientation;
    }

    static isQQBroswer(): boolean {
        return navigator.userAgent.indexOf('MQQBrowser') > -1; //是否QQ;
    }
    static isRunWechat(): boolean {
        return navigator.userAgent.indexOf('MicroMessenger') > -1;
    }

    //移动端ua
    static isHuohuaPlayer(): boolean {
        return navigator.userAgent.indexOf('huohua_app') > -1;
    }

    static isHuohuaApp(): boolean {
        return navigator.userAgent.indexOf('phone_huohua') > -1;
    }

    static isEditor(): boolean {
        return navigator.userAgent.indexOf('Electron') > -1;
    }

    /**
     * 浏览器准备好后执行的函数
     * @param {Function} readyCall
     */
    static async domReady(readyCall: Function) {
      (window as any).env           = <Environment>new Environment();
      // const VConsole = require('VConsole');
      // new VConsole();
      // @ts-ignore
      const viewConfig = process.env.component.config;
      (window as any).parameter = new InjectParameter();
        try {
          //安全检查
          if ( viewConfig === undefined || viewConfig.isEncryption === true || viewConfig.isEncryption === undefined) {
            Security.getInstance();
          }
          Log.getInstance();
        } catch (e) {
          console.error(e.message);
          return;
        }

        try {
          await this.initLang();
        } catch (e) {
          console.error(e);
        }

        if ( !document.documentElement.clientWidth || document.documentElement.clientWidth === 0) {
            requestAnimationFrame(() => {
                BrowserUtil.domReady(readyCall);
            });
            return;
        }

        /**
         * 1.判断是否是手机端；
         * 2.如果是手机端判断是否是竖屏；
         * 3.如果是竖屏显示提示信息，并不执行readyCall
         * 4.如果旋转至横屏则隐藏提示信息并执行readyCall
         */

        // 如果手机在竖屏状态下打开微件，然后切换至横屏状态，微件会以竖屏的方式加载出来，为了解决此问题，实现了如下方法
        // 首先判断是否是手机端，
        // 如果是竖屏，给出操作提示并且不让页面加载并重新执行domready方法，
        // 如果是横屏，隐藏提示并且将页面加载出来

      //(window as any)['env'] = env;
      if (viewConfig === undefined || viewConfig.isForcedlandscape === true) {
        console.log('强制横屏', window.env);
        if (this.getOrientation() === 'portrait' && (window.env.browserInfo.isMobile || window.env.browserInfo.isIphone)) {
          SystemTip.showOrientationTip();
          document.getElementById('orientationTip').style.zIndex = '1000';
          document.getElementById('maskContent').style.zIndex = '1000';
          requestAnimationFrame(() => {
            BrowserUtil.domReady(readyCall);
          });
          return;
        } else if (this.getOrientation() === 'landscape' && (window.env.browserInfo.isMobile || window.env.browserInfo.isIphone)) {
          SystemTip.hideOrientationTip();
        }

      } else {
        console.log('不强制横屏');
        SystemTip.hideOrientationTip();
      }
      setTimeout(() => {
        readyCall();
      }, 100);

    }

    // 初始化国际化语言包
    static async initLang() {
      // dev环境 读取json
      if ((process.env.component as any).config.dev) {
        let langStr = (process.env.component as any).langArray[window.env.browserInfo.language];
        if (!langStr) {
          langStr = (process.env.component as any).langArray['zh'];
        }
        window.env.browserInfo.lang = JSON.parse(langStr);
      } else {
        // build环境读取json
        const src = './lang/' + window.env.browserInfo.language + '.json';
        window.env.browserInfo.lang = await this.loadJson(src);
      }

      document.title = window.env.browserInfo.lang.title;
    }

    static getQueryString(name: string): string {

        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        const r = window.location.search.substr(1).match(reg);

        if (r != null) {
          return unescape(r[2]);
        }

        return null;
    }

    static loadJson(url: string): Object {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest;
        request.open('GET', url, !0);

        request.onload = () => {
          const data = JSON.parse(request.response);
          resolve(data);
        };

        request.onerror = () => {
          resolve();
        };

        request.send(null);
      });
    }
}
