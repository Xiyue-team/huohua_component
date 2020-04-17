/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/4/8 13:36
 */
export class CommonUtil {

    /**
     * 获取指定范围内整数
     * @param {number} n
     * @param {number} m
     * @returns {number}
     */
    static getRandomInt(n: number, m: number, degs: number = 0) {
        const c = m - n + 1;
        if ( degs !== 0 ) {
            return Number.parseFloat((Math.random() * c + n).toFixed(degs));
        } else {
            return Math.floor(Math.random() * c + n);
        }
    }

    /**
     * 获取制定范围内的小数
     * @param m 0-m
     * @param n 小数位数
     */
    static getRandomDecimal(m: number , n: number) {
        return Math.round(m * Math.pow(10, n)) / Math.pow(10, n);
    }

    static unfreeze(o: any) {
        let oo: any = null;
        if ( o instanceof Array) {
            oo = [];
            const clone = function(v: any) { oo.push(v); };
            o.forEach(clone);
        } else if (o instanceof String) {
            oo = o.toString();
        } else  if ( typeof o === 'object' ) {

            oo = {};
            for (const property in o) {
                if (  !property) {
                    continue;
                }
                oo[property] = o[property];
            }


        }
        return oo;
    }

    static uuid(len: number, radix: number) {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        const uuid = [];
        let i = 0;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }
        } else {
            // rfc4122, version 4 form
            let r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 || Math.random() * 16;
                    uuid[i] = chars[(i === 19) ? ( r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    }

    //取精度
    static strip(num: number, precision = 12) {
        return +parseFloat(num.toPrecision(precision));
    }
}
