/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/6 10:13
 */

export class BrowserInfo {

    //浏览器类型
    browser: string;
    //浏览器版本
    version: string;
    //系统
    os: string;
    //系统版本
    osVersion: string;
    //是否支持webgl
    supportWebgl: boolean;

    //像素点
    devicePixelRatio: number;
    //分辨率
    screenResolution: string;
    //window尺寸
    windowSize: string;

    //是否为移动端 (不准确)
    isMobile: boolean;

    //是否是qq/qq浏览器
    isQQ: boolean;

    //是否是微信
    isWechat: boolean;

    //是否是火花播放器
    isHuohuaPlayer: boolean;
    //是否是火花手机app
    isHuohuaApp: boolean;
    //是否是编辑器
    isElectron: boolean;
    //原始ua
    userAgent: string;
    //横屏 landscape  竖屏portrait
    orientation: string;

    isIphone: boolean;
    isIpad: boolean;
    isPc: boolean;

    //是否是小屏幕设备 物理像素 < 500
    isSmallDevice: boolean;

    // 浏览器语言
    language: string;

    // 语言包 一个json文件
    lang: any;

    path: any = [];

    print() {
    }

}



enum BrowserType {
        ie  ,
    chrome  ,
    safari  ,
    firefox
}

enum OSType {
    Windows_10      ,
    Windows_8_1     ,
    Windows_8       ,
    Windows_7       ,
    Windows_Vista   ,
    Windows_Server  ,
    Windows_XP      ,
    Android         ,
    Open_BSD        ,
    Sun_OS          ,
    Linux           ,
    iOS             ,
    Mac_OS_X        ,
    Mac_OS          ,
    QNX             ,
    UNIX            ,
    Search_Bot
}

