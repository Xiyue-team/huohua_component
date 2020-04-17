


export class Util {


    /**
     * 求圆和直线之间的交点
     * 直线方程：y = kx + b
     * 圆的方程：(x - m)² + (x - n)² = r²
     * x1, y1 = 线坐标1, x2, y2 = 线坐标2, m, n = 圆坐标, r = 半径
     */
    public static getInsertPointBetweenCircleAndLine(x1, y1, x2, y2, m, n, r) {
        // console.log(x1, y1, x2, y2, m, n, r)
        const kbArr = this.binaryEquationGetKB(x1, y1, x2, y2);
        const k = kbArr[0];
        const b = kbArr[1];

        const aX = 1 + k * k;
        const bX = 2 * k * (b - n) - 2 * m;
        const cX = m * m + (b - n) * (b - n) - r * r;

        const insertPoints = [];
        const xArr = this.quadEquationGetX(aX, bX, cX);
        xArr.forEach(x => {
            const y = k * x + b;
            if ( y <= n ) {
                insertPoints.push({ x: x, y: y });
            }
        });
        return insertPoints;
    }
    /**
     * 求二元一次方程的系数
     * y1 = k * x1 + b => k = (y1 - b) / x1
     * y2 = k * x2 + b => y2 = ((y1 - b) / x1) * x2 + b
     */
    public static binaryEquationGetKB(x1: number , y1: number , x2: number , y2: number ) {
        const k = (y1 - y2) / (x1 - x2);
        const b = (x1 * y2 - x2 * y1) / (x1 - x2);
        return [k, b];
    }

    /**
     * 一元二次方程求根
     * ax² + bx + c = 0
     */
    public static quadEquationGetX(a: number, b: number, c: number) {
        const xArr = [];
        const result = Math.pow(b, 2) - 4 * a * c;
        if (result > 0) {
            xArr.push((-b + Math.sqrt(result)) / (2 * a));
            xArr.push((-b - Math.sqrt(result)) / (2 * a));
        } else if (result === 0) {
            xArr.push(-b / (2 * a));
        }
        return xArr;
    }
    
    public static getAngle(cen, first, second) {
            let dx1, dx2, dy1, dy2;
            let angle;
 
            dx1 = first.X - cen.X;
            dy1 = first.Y - cen.Y;
 
            dx2 = second.X - cen.X;
 
            dy2 = second.Y - cen.Y;
 
            const c = Math.sqrt(dx1 * dx1 + dy1 * dy1) *  Math.sqrt(dx2 * dx2 + dy2 * dy2);
 
            if (c === 0) {
                return -1;
            }
 
            angle =  Math.acos((dx1 * dx2 + dy1 * dy2) / c);
 
 
 
 
            return (angle * 180 / Math.PI);
        }
}
