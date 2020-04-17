

export class DlnConfig {

    scale = (window.innerWidth / 1024 - 0.03);

    // 步骤1
    step1Config = {
        width :  1890 / 3 * this.scale,
        height :  1260 / 3 * this.scale,
        opacity : 1,
        x : 200  * this.scale,
        y : 72 * this.scale,
    };

    // 元素图片
    bElementConfig = {
        width :  170 * this.scale,
        height :  44 * this.scale,
        opacity : 1,
        x : (200 + 201) * this.scale,
        y : 346 * this.scale,
        visible: false
    };

    beElementConfig = {
        width :  106 * this.scale,
        height :  54.4 * this.scale,
        opacity : 1,
        x : (200 + 84) * this.scale,
        y : 278 * this.scale,
        visible: false
    };

    liElementConfig = {
        width :  300 / 3 * this.scale,
        height :  174 / 3 * this.scale,
        opacity : 1,
        x : (200 + 105) * this.scale,
        y : 390 * this.scale,
        visible: false
    };

    siElementConfig = {
        width :  516 / 3 * this.scale,
        height :  132 / 3 * this.scale,
        opacity : 1,
        x : (200 + 235) * this.scale,
        y : 309 * this.scale,
        visible: false
    };

    pElementConfig = {
        width :  468 / 3 * this.scale,
        height :  180 / 3 * this.scale,
        opacity : 1,
        x : (200 + 432) * this.scale,
        y : 251 * this.scale,
        visible: false
    };

    alElementConfig = {
        width :  468 / 3 * this.scale,
        height :  186 / 3 * this.scale,
        opacity : 1,
        x : (200 + 350) * this.scale,
        y : 380 * this.scale,
        visible: false
    };

    nElementConfig = {
        width :  498 / 3 * this.scale,
        height :  186 / 3 * this.scale,
        opacity : 1,
        x : (200 + 102) * this.scale,
        y : 202 * this.scale,
        visible: false
    };

    oElementConfig = {
        width :  468 / 3 * this.scale,
        height :  192 / 3 * this.scale,
        opacity : 1,
        x : (200 + 116) * this.scale,
        y : 287 * this.scale,
        visible: false
    };

    fElementConfig = {
        width :  492 / 3 * this.scale,
        height :  132 / 3 * this.scale,
        opacity : 1,
        x : (200 + 298) * this.scale,
        y : 231 * this.scale,
        visible: false
    };

    li2ElementConfig = {
        width :  300 / 3 * this.scale,
        height :  186 / 3 * this.scale,
        opacity : 1,
        x : (200 + 63) * this.scale,
        y : 390 * this.scale,
        visible: false
    };

    naElementConfig = {
        width :  318 / 3 * this.scale,
        height :  180 / 3 * this.scale,
        opacity : 1,
        x : (200 + 288) * this.scale,
        y : 319 * this.scale,
        visible: false
    };

    kElementConfig = {
        width :  282 / 3 * this.scale,
        height :  168 / 3 * this.scale,
        opacity : 1,
        x : (200 + 523) * this.scale,
        y : 403 * this.scale,
        visible: false
    };

    // 元素点
    liPointConfig = {
        x: (200 + 125) * this.scale,
        y: 380 * this.scale,
        width: 44 * this.scale,
        height: 44 * this.scale,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 4,
        opacity: 0.01
    };

    bePointConfig = {
        x :  (200 + 140) * this.scale,
        y :  (310) * this.scale,
        width: 44 * this.scale,
        height: 44 * this.scale,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 4,
        opacity: 0.01
    };

    bPointConfig = {
        x :  (200 + 192) * this.scale,
        y :  (340) * this.scale,
        width: 44 * this.scale,
        height: 44 * this.scale,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 4,
        opacity: 0.01
    };

    alPointConfig = {
        x :  (200 + 360) * this.scale,
        y :  (370) * this.scale,
        width: 44 * this.scale,
        height: 44 * this.scale,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 4,
        opacity: 0.01
    };

    siPointConfig = {
        x :  (200 + 375) * this.scale,
        y :  (320) * this.scale,
        width: 44 * this.scale,
        height: 44 * this.scale,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 4,
        opacity: 0.01
    };

    pPointConfig = {
        x :  (200 + 425) * this.scale,
        y :  (290) * this.scale,
        width: 44 * this.scale,
        height: 44 * this.scale,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 4,
        opacity: 0.01
    };

    nPointConfig = {
        x :  (200 + 210) * this.scale,
        y :  (248) * this.scale,
        width: 44 * this.scale,
        height: 44 * this.scale,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 4,
        opacity: 0.01
    };

    oPointConfig = {
        x :  (200 + 260) * this.scale,
        y :  (265) * this.scale,
        width: 44 * this.scale,
        height: 44 * this.scale,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 4,
        opacity: 0.01
    };

    fPointConfig = {
        x :  (200 + 270) * this.scale,
        y :  (210) * this.scale,
        width: 44 * this.scale,
        height: 44 * this.scale,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 4,
        opacity: 0.01
    };

    li2PointConfig = {
        x :  (200 + 125) * this.scale,
        y :  (365) * this.scale,
        width: 44 * this.scale,
        height: 44 * this.scale,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 4,
        opacity: 0.01
    };

    naPointConfig = {
        x :  (200 + 315) * this.scale,
        y :  (365) * this.scale,
        width: 44 * this.scale,
        height: 44 * this.scale,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 4,
        opacity: 0.01
    };

    kPointConfig = {
        x :  (200 + 510) * this.scale,
        y :  (375) * this.scale,
        width: 44 * this.scale,
        height: 44 * this.scale,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 4,
        opacity: 0.01
    };
}







