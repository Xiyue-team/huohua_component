
export class DdcxConfig {
    scale = (window.innerWidth / 1024 - 0.03);

    whitePointConfig = {
        width :  50 * this.scale,
        height :  50 * this.scale,
        opacity : 1,
        x : 246 * this.scale,
        y : 266 * this.scale,
        // draggable: true
    };

    guideLineConfig = {
        width :  172 * this.scale,
        height :  25 * this.scale,
        opacity : 1,
        x : 426 * this.scale,
        y : 276 * this.scale,
        visible: true
    };


}

