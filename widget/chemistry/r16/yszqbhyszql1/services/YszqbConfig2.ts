

export class YszqbConfig2 {

    scale = (window.innerWidth / 1024 - 0.2);
    left = (window.innerWidth - 887 * this.scale) / 2;
    top = (window.innerHeight - 525 * this.scale) / 2;

    // 步骤1
    tableImgConfig = {
        width :  887 * this.scale,
        height :  525 * this.scale,
        opacity : 1,
        x : this.left,
        y : 0 * this.scale + this.top,
    };

    //拖拽图片
    zeroImgConfig = {
        width :  146 * this.scale,
        height :  164 * this.scale,
        opacity : 1,
        x : (366 - 69) * this.scale + this.left,
        y : 0 * this.scale + this.top - 2,
        draggable: true,
        visible: true,
    };

    // 元素图片
    oneImgConfig = {
        width :  146 * this.scale,
        height :  164 * this.scale,
        opacity : 1,
        x : (716 - 146 / 3 - 69) * this.scale + this.left,
        y : (27 + 164 / 3) * this.scale + this.top,
        visible: true
    };

    twoImgConfig = {
        width :  146 * this.scale,
        height :  164 * this.scale,
        opacity : 0,
        x : (715 - 69) * this.scale + this.left,
        y : (27 + 164 / 3) * this.scale + this.top,
        visible: true
    };

    threeImgConfig = {
        width :  146 * this.scale,
        height :  164 * this.scale,
        opacity : 0,
        x : (715 + 146 * 1 / 3 - 69) * this.scale + this.left,
        y : (27 + 164 / 3) * this.scale + this.top,
        visible: true
    };

    fourImgConfig = {
        width :  146 * this.scale,
        height :  164 * this.scale,
        opacity : 0,
        x : (714 + 146 * 2 / 3 - 69) * this.scale + this.left,
        y : (27 + 164 / 3) * this.scale + this.top,
        visible: true
    };

      tipsImgConfig = {
            width :  95 * this.scale,
            height :  28 * this.scale,
            opacity : 1,
            x : (715 - 300) * this.scale + this.left,
            y : 140 * this.scale + this.top,
            visible: true
      };
}







