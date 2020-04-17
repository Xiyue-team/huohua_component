import {fabric} from 'fabric';
import { FormulaOneConfig } from './FormulaOneConfig';

export class FabricUtil {

    // static scale = new FormulaOneConfig().scale;
    constructor() {

    }

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

    static createAxis(lineConfig: Object, arrowConfig: Object) {
      const line = new fabric.Rect(lineConfig);
      const arrow = new fabric.Triangle(arrowConfig);
      arrow.rotate(90);

      const xAxis = new fabric.Group([fabric.util.object.clone(line), fabric.util.object.clone(arrow)], {selectable: false});
      const yAxis = new fabric.Group([fabric.util.object.clone(line), fabric.util.object.clone(arrow)], {selectable: false});
      yAxis.rotate(-90);

      const axis = new fabric.Group([xAxis, yAxis], {selectable: false});

      return axis;
    }


  /**
   * @param {number} startAngle 开始角度
   * @param {number} endAngle 结束角度
   * @param {number} radius 半径
   * @param {number} x  圆心坐标
   * @param {number} y
   * @param {Object} screwLineConfig  配置文件
   * @returns {Polyline}
   */
    // 当a为正角时
    static createScrewLine(startAngle: number, endAngle: number, radius: number, x: number, y: number, screwLineConfig: Object) {
      const pointArray = [];
      for (let i = startAngle; i > endAngle; i--) {
        pointArray.push({
          x: radius * Math.sin((i) * Math.PI / 180) + x,
          y: y - radius * Math.cos((i) * Math.PI / 180)
        });
        radius += 0.1;
      }
      const screwLine = new fabric.Polyline(pointArray, screwLineConfig);

      return screwLine;
    }

    static updateScrewLine(screwLine: any, startAngle: number, endAngle: number, radius: number, x: number, y: number) {
      const pointArray = [];
      for (let i = startAngle; i > endAngle; i--) {
        pointArray.push({
          x: radius * Math.sin((i) * Math.PI / 180) + x,
          y: y - radius * Math.cos((i) * Math.PI / 180)
        });
        radius += 0.06 * (new FormulaOneConfig().scale);
      }
      screwLine.set('points', pointArray);
    }

    static updateScrewLine2(screwLine: any, startAngle: number, endAngle: number, radius: number, x: number, y: number) {
      const pointArray = [];
      for (let i = startAngle; i < endAngle; i++) {
        pointArray.push({
          x: radius * Math.sin((i) * Math.PI / 180) + x,
          y: y - radius * Math.cos((i) * Math.PI / 180)
        });
        radius += 0.06 * (new FormulaOneConfig().scale);
      }
      screwLine.set('points', pointArray);
    }

    /**
     * @param {number} startAngle 开始角度
     * @param {number} endAngle 结束角度
     * @param {number} radius 半径
     * @param {number} x  圆心坐标
     * @param {number} y
     * @param {Object} screwLineConfig  配置文件
     * @returns {Polyline}
     */
    // 当a为正角时
    static createScrewLine2(startAngle: number, endAngle: number, radius: number, x: number, y: number, screwLineConfig: Object) {

      const pointArray = [];

      for (let i = startAngle; i < endAngle; i++) {
        pointArray.push({
          x: radius * Math.sin((i) * Math.PI / 180) + x,
          y: y - radius * Math.cos((i) * Math.PI / 180)
        });

        radius += 0.1;
      }

      const screwLine = new fabric.Polyline(pointArray, screwLineConfig);

      return screwLine;
    }

    /**
     * @param {number} startAngle 开始角度
     * @param {number} endAngle 结束角度
     * @param {number} radius 半径
     * @param {number} x  圆心坐标
     * @param {number} y
     * @param {Object} screwLineConfig  配置文件
     * @returns {Polyline}
     */
    static createScrewLine3(startAngle: number, endAngle: number, radius: number, x: number, y: number, screwLineConfig: Object) {

      const pointArray = [];

      for (let i = startAngle; i < endAngle; i++) {
        pointArray.push({
          x: radius * Math.sin((i) * Math.PI / 180) + x,
          y: y - radius * Math.cos((i) * Math.PI / 180)
        });
      }

      const screwLine = new fabric.Polyline(pointArray, screwLineConfig);

      return screwLine;
    }



    static createButton (rectConfig: any) {

        const rect = new fabric.Rect({
          left: 0,
          top: 0,
          width: rectConfig.width,
          height: rectConfig.height,
          fill: rectConfig.fill,
          hasBorders: false,
          hasControls: false,
          rx: !rectConfig.rx ? 21 : rectConfig.rx,
          originX: 'center',
          originY: 'center'
        });

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
          originY: 'center'
        });

        return button;
    }



  /**
   * @param {number} angle 角度
   * @param button  拖动的点或者按钮
   * @param radius  半径
   * @param x  圆心x坐标
   * @param y  圆心y
   */
  static limitButtonScope(angle: number, button: any, radius: any, x: number, y: number) {
    button.set('left', radius * Math.sin(angle * Math.PI / 180) + x).setCoords();
    button.set('top', y - radius * Math.cos(angle * Math.PI / 180)).setCoords();
  }

  // 获取旋转角度
  /**
   * @param button 拖动按钮
   * @param {number} left 圆心坐标x
   * @param {number} top  圆心坐标y
   * @returns {number}
   */
  static getButtonAngle(button: any, left: number, top: number) {
    const x = left - button.get('left');
    const y = top - button.get('top');

    const angle = Math.atan(Math.abs(x / y));

    let angle2 = -angle * 180 / Math.PI;

    if (y >= 0) {
      if (x >= 0) {
        angle2 = -angle * 180 / Math.PI;
      } else {
        angle2 = angle * 180 / Math.PI;
      }

    } else {
      if (x >= 0) {
        angle2 = -(180 - angle * 180 / Math.PI);
      } else {
        angle2 = (180 - angle * 180 / Math.PI);
      }
    }

    return Math.round(angle2);
  }
}
