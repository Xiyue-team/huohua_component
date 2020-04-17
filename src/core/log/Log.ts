
/**
 *日志记录类
 *@since 2.0
 *@author zhiguo
 *@Date 2019/1/3 9:17
 */

export class Log {

  private static instance: Log;

  private url = 'https://prod.huohuaschool.com/api-website/client/info';

  constructor() {
    window.addEventListener('unload', () => {
      this.uploadLog();
    }, false);
  }

  static getInstance (): Log {
    if (!this.instance) {
      this.instance = new Log();
    }
    return this.instance;
  }

  uploadLog() {
    const formData = new FormData();

    const mobileHardware = (window as any).env && (window as any).env.mobileHardware
      ? JSON.stringify((window as any).env.mobileHardware) : '';

    const hardware = (window as any).env && (window as any).env.hardware
      ? JSON.stringify((window as any).env.hardware) : '';

    const meta = process.env && process.env.component
      ? JSON.stringify(process.env.component) : '';

    formData.set('url', window.location.href);
    formData.set('token', (window as any).clientToken);
    formData.set('mobileHardware', mobileHardware );
    formData.set('hardware', hardware);
    formData.set('meta', meta);
    formData.set('ua',  navigator.userAgent);
    navigator.sendBeacon( this.url, formData);
  }





}
