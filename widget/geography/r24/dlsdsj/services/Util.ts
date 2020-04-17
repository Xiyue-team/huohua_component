import {fabric} from 'fabric';

export class FabricUtil {


    static loadImage(src: string, imageConfig: fabric.IImageOptions): Promise<fabric.Image> {
        return new Promise<fabric.Image>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const imgObj = new fabric.Image(img, imageConfig);
                resolve(imgObj);
            };
            img.src = src ;
        });
    }

    static createButton (rectConfig: any) {

      const rect = new fabric.Rect({
        left: 0,
        top: 0,
        width: rectConfig.width,
        height: rectConfig.height,
        fill: rectConfig.fill,
        strokeWidth: 1,
        stroke: '#EBEBEB',
        hasBorders: false,
        hasControls: false,
        rx: !rectConfig.rx ? 21 : rectConfig.rx,
        originX: 'center',
        originY: 'center',
        shadow: {
          offsetX: 1,
          offsetY: 1,
          color: 'rgba(0,0,0,0.10)'
        }
      } as any);

      const text = new fabric.Text(rectConfig.text, {
        left: 0,
        top: 0,
        fill: !rectConfig.textFill ? '#333333' : rectConfig.textFill,
        fontSize: rectConfig.fontSize,
        originX: 'center',
        originY: 'center'
      });

      const button = new fabric.Group([rect, text], {
        left: rectConfig.left,
        top: rectConfig.top,
        hasBorders: false,
        hasControls: false,
        visible: !rectConfig.visible ? true : rectConfig.visible,
        originX: 'center',
        originY: 'center',
        selectable: rectConfig.selectable
      });

      return button;
    }
}
