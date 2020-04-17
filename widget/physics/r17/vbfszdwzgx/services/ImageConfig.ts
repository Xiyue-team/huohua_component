
export class ImageConfig {

    scale = 1;
    w = document.getElementById('3dContainer').clientWidth;
    h = document.getElementById('3dContainer').clientHeight;


    //蓝色拖动点
    bluePointImg = {
        width :  44 * this.scale,
        height :  44 * this.scale,
        opacity : 1,
        x : ((this.w as any) / 2 - 22) * this.scale,
        y : ((this.h as any) / 2 - 22) * this.scale,
        draggable: true,
        visible: true,
    };


    redPointImg = {
      width :  44 * this.scale,
      height :  44 * this.scale,
      opacity : 1,
      x : ((this.w as any) / 2 - 22) * this.scale,
      y : ((this.h as any) / 2 - 22) * this.scale,
      draggable: true,
      visible: true,
    };


    purplePointImg = {
      width :  44 * this.scale,
      height :  44 * this.scale,
      opacity : 1,
      x : ((this.w as any) / 2 - 22) * this.scale,
      y : ((this.h as any) / 2 - 22) * this.scale,
      draggable: true,
      visible: true,
    };
    


}
