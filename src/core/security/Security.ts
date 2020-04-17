/**
 * 安全检查类
 * 防止微件再非法环境运行
 *@since 2.0
 *@author zhiguo
 *@Date 2018/12/20 9:54
 *
 */
import { addListener, lanuch, stop } from 'devtools-detector';
import { SecurityVerify } from './SecurityVerify';
import { SecretUtil } from '../../util/SecretUtil';
import { SystemTip } from '../SystemTip';

export class Security {
  private static instance: Security;

  //监测间隔
  private interval =  1000 * 10;
  private timer: any;
  private condition: Map<string, Function>;



  /**
   * 1.开发模式下不做任何检验[http://xxx#dev#token,token=encrySecurity(yyyyMd)]；
   * 2.构造检验条件（ua检查，浏览器引擎检查，token检查,...）；
   * 3.禁用控制台；
   * 4.延迟检查
   */
  constructor() {
    console.log('init security');
    /*const pwd = SecretUtil.Encrypt('partner_test_2018/01/18');
    console.log(pwd);*/

    this.receiveParentMessage();
    if (this.checkIsDevModel()) {
      console.log('当前是开发模式');
      return;
    }
    //构造验证条件
    this.condition = new Map<string, Function>();
    this.condition.set('token' , SecurityVerify.token);
    //如果是在非IFrame中（web环境） 则增加ua和 引擎验证
    if ( self === top ) {
       this.condition.set('ua', SecurityVerify.ua);
       this.condition.set('engine', SecurityVerify.engine);
    }


      //监测是否打开开发者工具
    this.devtoolsDetect();

    if (this.timerThreshold()) {
      console.log('验证时间未开始');
      return;
    }
    //this.verify();
    this.verifyTimer();
  }

  static getInstance (): Security {
    if (!this.instance) {
      this.instance = new Security();
    }
    return this.instance;
  }

  /**
   * 当是iframe窗口嵌入微件时，接收父窗口的消息
   */
  receiveParentMessage() {
    window.addEventListener('message', function(event) {
      if (event.source !== window.parent) {
        return;
      }
      console.log('event');
      for (const name of Object.keys(event.data)) {
        (window as any)[name] = event.data[name];
      }
      console.log(event);
    });
  }

  /** 检查是否是开发模式 **/
  checkIsDevModel(): boolean {
    const date = new Date();
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth() + 1;
    const d = date.getDate();
    const decryStr = y + '' + m + '' + d;
    try {
      const hashs = location.hash.split('#');

      const token =  SecretUtil.Decrypt(hashs[2] + '');
      if (hashs[1] === 'dev' && decryStr === token) {
        return true;
      }
    } catch (e) {
    }
    return false;
  }

  /** 到达指定日期再进行验证 **/
  timerThreshold(): boolean {
    let limitTime = '2019-05-01 09:00';
    limitTime = limitTime.replace('-', '/');
    const nowDate = new Date();
    const limitDate = new Date(Date.parse(limitTime));
    if (nowDate > limitDate) {
       return false;
    }
    return true;
  }

  /** 效验计时器  **/
  verifyTimer(): void {
    this.timer = setTimeout(() => {
        this.verifyCondition();
    }, this.interval );
  }

  /** 监测客户端环境 **/
  verifyCondition() {
    this.condition.forEach((value , key) => {
      if ( value() === false) {
        console.error(key + ' check illegal');
        this.illegalAction(key);
        //clearInterval(this.timer);
      }
    });
  }

  /** 监测调试窗口是否打开 **/
  devtoolsDetect() {
    addListener(
      (status) => {
          if (status) {
            //setTimeout( () => (stop(), console.clear()), 100 );
             while (1 === 1) {
              debugger;
            }
            this.illegalAction('devtools');
          }
      }
    );
    //根据是否在iframe中切换不同的控制台验证方法
    if (self === top) {
      lanuch();
    } else {
      setInterval(() => {debugger; }, 2000);
    }

  }

  /** 如果监测客户端非法执行的操作**/
  illegalAction(key?: string) {
     //document.removeChild(document.documentElement);
     SystemTip.expiredTip(key);
     //throw new Error('illegal client');
  }




}



