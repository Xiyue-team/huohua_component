
export class YszqbConfig {

    width = document.getElementById('3dModel').clientWidth;

    scale = this.width / 632;
    // 步骤1
    tableImgConfig = {
        width :  2661 / 5 * this.scale,
        height :  1575 / 5 * this.scale,
        opacity : 1,
        x : 52 * this.scale,
        y : 120 * this.scale,
    };

    // 元素图片
    zeroImgConfig = {
        width :  438 / 5 * this.scale,
        height :  492 / 5 * this.scale,
        opacity : 1,
        x : (52 + 175) * this.scale,
        y : 120 * this.scale,
        draggable: true,
        visible: true,
    };

    oneImgConfig = {
        width :  438 / 5 * this.scale,
        height :  492 / 5 * this.scale,
        opacity : 0,
        x : (52 + 359) * this.scale,
        y : (120 + 48.5) * this.scale,
        visible: true
    };

    twoImgConfig = {
        width :  438 / 5 * this.scale,
        height :  492 / 5 * this.scale,
        opacity : 0,
        x : (52 + 387.5) * this.scale,
        y : (120 + 48.5) * this.scale,
        visible: true
    };

    threeImgConfig = {
        width :  438 / 5 * this.scale,
        height :  492 / 5 * this.scale,
        opacity : 0,
        x : (52 + 416.5) * this.scale,
        y : (120 + 48.5) * this.scale,
        visible: true
    };

    fourImgConfig = {
        width :  438 / 5 * this.scale,
        height :  492 / 5 * this.scale,
        opacity : 0,
        x : (52 + 445) * this.scale,
        y : (120 + 48.5) * this.scale,
        visible: true
    };

      tipsImgConfig = {
        width :  285 / 5 * this.scale,
        height :  84 / 5 * this.scale,
        opacity : 1,
        x : (52 + 250) * this.scale,
        y : (120 + 80) * this.scale,
        visible: true
      };
}







