const createjs = require('createjs-npm');
const preloadjs = require('preload-js');

export class DrawArcHelper {

      //画弧
    static drawArcMethod(color: string, x: number, y: number, startAngle: number, endAngel: number): any {
        const arc = new createjs.Shape();
        arc.graphics.ss(10, 0, 0, 0, true).s(color);
        arc.graphics.arc(x, y, 180 * 2, startAngle, endAngel) ;
        return arc;
    }

    static drawDashLine(x1: number, y1: number, x2: number, y2: number): any {
        const dashLine = new createjs.Shape();
        dashLine.graphics.setStrokeStyle(3);
        dashLine.graphics.setStrokeDash([20, 10], 10);
        dashLine.graphics.beginStroke('#999999');
        dashLine.graphics.moveTo(x1, y1);
        dashLine.graphics.lineTo(x2, y2);
        return dashLine;
    }
}

