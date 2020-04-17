const CryptoJS = require('crypto-js');

/**
 * 密钥工具类
 *@since 2.0
 *@author zhiguo
 *@Date 2019/1/2 14:27
 */
export class SecretUtil {

  //密钥
  private static key = CryptoJS.enc.Utf8.parse('BE5391696F815E7A');

  //偏移量
  private static iv = CryptoJS.enc.Utf8.parse('84524711D4D5060D');


  //解密方法
  static Decrypt(word: string) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(srcs, this.key, { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }

  //加密方法
  static Encrypt(word: string) {
    const srcs = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(srcs, this.key, { iv: this.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
  }

}
