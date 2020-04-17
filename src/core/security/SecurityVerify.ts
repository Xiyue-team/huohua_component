/**
 *效验点
 *@since 2.0
 *@author zhiguo
 *@Date 2019/1/2 14:31
 */
import { SecretUtil } from '../../util/SecretUtil';
const UA = require('ua-device');
export class SecurityVerify {

  private static partners = [
    'huohua', 'daite', 'partner'
  ];

  private static clientTokens = [
    'partner_huohua_website',
    'partner_huohua_website_detail',
    'partner_huohua_website_courseware',
    'partner_huohua_website_component',

    'partner_huohua_editor',
    'partner_huohua_editor_player',
    'partner_huohua_editor_detail',
    'partner_huohua_editor_offline',
    'partner_huohua_editor_micro',
    'partner_huohua_editor_edit',
    'partner_huohua_editor_collection',
    'partner_huohua_editor_ebook',

    'partner_huohua_player',
    'partner_huohua_player_mobile_player',
    'partner_huohua_player_mobile_detail',
    'partner_huohua_player_mobile_offline',
    'partner_huohua_player_mobile_collection',
    'partner_huohua_player_mobile_ebook',
    'partner_huohua_player_pad_player',
    'partner_huohua_player_pad_detail',
    'partner_huohua_player_pad_offline',
    'partner_huohua_player_pad_collection',
    'partner_huohua_player_pad_ebook',

    'partner_daite_beike'
  ];

  //火花ua验证,如果不指定ua 则匹配所有partner 的ua
  static ua(partner?: string): boolean {
    const validPartners = partner ? [partner] : SecurityVerify.partners;
    const length = validPartners.length;
    for (let i = 0; i < length; i++) {
      if (window.navigator.userAgent.indexOf(validPartners[i]) >= 0) {
        return true;
      }
    }
    return false;
  }


  //验证浏览器引擎
  static engine(): boolean {

    const uaPaser = new UA(window.navigator.userAgent);
    const browsserVersion = Number.parseInt(uaPaser.browser.version.original);
    const os = uaPaser.os.name.toLowerCase();
    const engineName = uaPaser.engine.name.toLowerCase();
    const browserName = uaPaser.browser.name.toLowerCase();

    //如果是iphone 或者ios 跳过引擎验证
    if (browserName.indexOf('chrome') === -1 && ( os === 'iphone' || os === 'mac os x')) {
      return true;
    }

    if (uaPaser.engine && engineName === 'webkit' &&  browsserVersion >= 53) {
      return true;
    }
    return false;
  }

  //验证clientToken
  static token(): boolean {

    //(window as any).clientToken = 'E56CA8185658DC54D89903C0209D0C29E783D441E745858C119B3814DDD8E5EC';
    const clientToken = (window as any).clientToken;
/*      || (window as any).parent.clientToken
      || (window as any).top.clientToken;*/

    if (!clientToken) {
      return false;
    }

    const client = SecretUtil.Decrypt(clientToken);
    //判断token是否永久有效
    /*const isIllegal = SecurityVerify.clientTokens.indexOf(client) >= 0;

    if ( isIllegal ) {
      return true;
    }*/
    //如果token非永久有效则判断token是否过期
    const clientArry = client.split('_');
    if (clientArry.length < 3) {
      return false;
    }


    if (SecurityVerify.partners.indexOf(clientArry[0]) === -1 ) {
      return false;
    }


    //只有在客户端环境下才进行ua验证
    /*if (!SecurityVerify.ua(clientArry[1]) && self === top  ) {
      return false;
    }*/
    //token有效期
    const nowDate = new Date();
    const limitDate = new Date(Date.parse(clientArry[2]));
    if (limitDate instanceof Date  && nowDate > limitDate) {
      return false;
    }

    return true;
  }

}
