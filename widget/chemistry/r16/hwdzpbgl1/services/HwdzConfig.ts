
export class HwdzConfig {

    scale = (window.innerWidth / 1024 - 0.03);

    height = window.innerHeight;

    // 元素表
    elementFormConfig = {
        width :  632 * this.scale,
        height :  248 * this.scale,
        opacity : 1,
        x : 200  * this.scale,
        y : this.height * 0.285,
    };

    // 白底元素
    whiteConfig = {
        width :  632 * this.scale,
        height :  248 * this.scale,
        opacity : 1,
        x : 200  * this.scale,
        y : (164 / 576) * this.height,
        visible: false
    };

    // 填充底元素
    redConfig = {
        width :  632 * this.scale,
        height :  248 * this.scale,
        opacity : 1,
        x : 200  * this.scale,
        y : (164 / 576) * this.height,
        visible: false
    };

    bRectConfig = {
        x :  (200 + 202) * this.scale,
        y :  this.elementFormConfig.y + this.elementFormConfig.height * 0.43,
        width: 64 * this.scale,
        height: 70 * this.scale,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 4,
        opacity: 0.01,
        visible: false
    };

    alRectConfig = {
        x :  (200 + 202) * this.scale,
        y :  this.elementFormConfig.y + this.elementFormConfig.height * 0.71,
        width: 64 * this.scale,
        height: 70 * this.scale,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 4,
        opacity: 0.01,
        visible: false
    };

    oRectConfig = {
        x :  (200 + 202 + 195) * this.scale,
        y :  this.elementFormConfig.y + this.elementFormConfig.height * 0.43,
        width: 64 * this.scale,
        height: 70 * this.scale,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 4,
        opacity: 0.01,
        visible: false
    };

    siRectConfig = {
        x :  (200 + 202 + 195) * this.scale,
        y :  this.elementFormConfig.y + this.elementFormConfig.height * 0.71,
        width: 64 * this.scale,
        height: 70 * this.scale,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 4,
        opacity: 0.01,
        visible: false
    };

    arrow1Config = {
        width :  360 / 3 * this.scale,
        height :  96 / 3 * this.scale,
        opacity : 1,
        x : (200 + 271)  * this.scale,
        y : this.elementFormConfig.y + this.elementFormConfig.height / 2,
        visible: false
    };

    arrow2Config = {
        width :  360 / 3 * this.scale,
        height :  96 / 3 * this.scale,
        opacity : 1,
        x : (200 + 271)  * this.scale,
        y : this.elementFormConfig.y + this.elementFormConfig.height * 4 / 5,
        visible: false
    };

    arrowTilt1Config = {
        width :  366 / 3 * this.scale,
        height :  258 / 3 * this.scale,
        opacity : 1,
        x : (200 + 270)  * this.scale,
        y : this.elementFormConfig.y + this.elementFormConfig.height * 4 / 7,
        visible: false
    };

    arrowTilt2Config = {
        width :  366 / 3 * this.scale,
        height :  258 / 3 * this.scale,
        opacity : 1,
        x : (200 + 400)  * this.scale,
        y : this.elementFormConfig.y + this.elementFormConfig.height * 3 / 5,
        visible: false
    };

    // 文字
    textImageConfig = {
        width :  336 / 3 * this.scale,
        height :  54 / 3 * this.scale,
        opacity : 1,
        x : (200 + 356)  * this.scale,
        y : (196 / 576) * this.height,
        visible: false
    };
}







