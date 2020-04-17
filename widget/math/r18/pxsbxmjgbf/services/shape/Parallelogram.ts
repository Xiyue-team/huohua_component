/**
 *平行四边形
 *@since 2.0
 *@author zhiguo
 *@Date 2018/11/26 11:19
 */
import * as Konva from 'konva';
import * as _ from 'lodash';

export class Parallelogram {

    //构成点
    points: Array<number>;
    lineShape: Konva.Line;

    //边界范围
    edgeRange = 30;

    //四条线段
    segmentsLines: any;


    constructor(points: Array<number>, id: string) {
        this.points = points;
        this.createParallelogram(id);
        this.initSegmentsLines();
    }

    initSegmentsLines() {
        this.segmentsLines = [
            {
                beginPoint : {x: this.points[0] + this.lineShape.x(), y: this.points[1] + this.lineShape.y() , index: 1},
                endPoint   : {x: this.points[2] + this.lineShape.x(), y: this.points[3] + this.lineShape.y() , index: 2}
            },
            {
                beginPoint : {x: this.points[2] + this.lineShape.x(), y: this.points[3] + this.lineShape.y(), index: 2},
                endPoint   : {x: this.points[4] + this.lineShape.x(), y: this.points[5] + this.lineShape.y(), index: 3 }
            },
            {
                beginPoint : {x: this.points[4] + this.lineShape.x(), y: this.points[5] + this.lineShape.y() , index: 3},
                endPoint   : {x: this.points[6] + this.lineShape.x(), y: this.points[7] + this.lineShape.y(),  index: 4}
            },
            {
                beginPoint : {x: this.points[6] + this.lineShape.x(), y: this.points[7] + this.lineShape.y(), index: 4},
                endPoint   : {x: this.points[0] + this.lineShape.x(), y: this.points[1] + this.lineShape.y(), index: 1}
            }
        ];
    }

    //创建平行四边形
    createParallelogram(id: string): Konva.Line {
        const scale = 1;
        this.lineShape = new Konva.Line({
            points: this.points,
            fill: '#FFE357',
            closed : true,
            name : 'parallelogram',
            id: id,
            opacity: 0.6,
            listening: true,
            draggable: false
        });
        return this.lineShape;
    }


    //对齐网格
    setPositionOnGrid(width: number, height: number, blockSize: number, borderWidth: number) {
        const x = Math.floor((width / 2  - this.lineShape.width() / 2) / blockSize) * blockSize;
        const y = Math.floor((height / 2 - this.lineShape.height() / 2) / blockSize) * blockSize;
        console.log(x + '--' + y);
        //console.log(this.points)
        this.lineShape.x(x + borderWidth / 2);
        this.lineShape.y(y + borderWidth / 2);
        this.initSegmentsLines();
    }

    hide() {
        this.lineShape.hide();
    }

    show() {
        this.lineShape.show();
    }

    //need override
    //获取当前点附近的边界点
    getEdgePosition(position: any) {

        const data = this.getNearPoint(position);
        if ( data.h > this.edgeRange) {
            data.outrange = true;
        }

        return data;

    }

    /**
     * 获取最近的点
     * @param position
     */
    getNearPoint(p: any) {
        console.log(this.lineShape.x() + '--' + this.lineShape.y());
        //四个点
        const a = {
            x: this.points[0] + this.lineShape.x() ,
            y: this.points[1] + this.lineShape.y(),
            index: 1
        };
        const b = {
            x: this.points[2] + this.lineShape.x(),
            y: this.points[3] + this.lineShape.y(),
            index: 2
        };
        const c = {
            x: this.points[4] + this.lineShape.x(),
            y: this.points[5] + this.lineShape.y(),
            index: 3
        };
        const d = {
            x: this.points[6] + this.lineShape.x(),
            y: this.points[7] + this.lineShape.y(),
            index: 4
        };
        const array = [];
        array.push({p1: a, p2: b, area: this.triangleArea(a, b, p)});
        array.push({p1: a, p2: d, area: this.triangleArea(a, d, p)});
        array.push({p1: c, p2: b, area: this.triangleArea(c, b, p)});
        array.push({p1: c, p2: d, area: this.triangleArea(c, d, p)});
        const points = _.minBy(array, 'area');
        console.log(p);
        //console.info('points', points);
       /* const k = (points.p1.y - points.p2.x) / (points.p1.x - points.p2.x);

        const _b = (points.p1.x * points.p2.y - points.p2.x * points.p1.y) / (points.p1.x - points.p2.x);*/
        //计算高
        /*const h = Math.abs((points.p1.y - points.p2.y) * p.x + (points.p2.x - points.p1.x) * p.y
        + ( points.p1.x * points.p2.y - points.p2.x * points.p1.y))
        / Math.sqrt(( (points.p1.y - points.p2.y) * 2 + (points.p2.x - points.p1.x) * 2));*/
        const h = Math.abs(
            (points.p1.y - points.p2.y) * p.x
            - (points.p1.x - points.p2.x) * p.y
            + points.p2.y * (points.p1.x - points.p2.x)
            - points.p2.x * (points.p1.y - points.p2.y)
             )
            / Math.sqrt(
                ( Math.pow((points.p1.y - points.p2.y) , 2)
                    + Math.pow((points.p1.x - points.p2.x) , 2)));
            //|(y1-y2)x3+(x2-x1)y3+(x1y2-x2y1)|/[(y1-y2)2+(x2-x1)2]1/2

        // y = kx + _b (p1，p2点的直线方程)
        const k = (points.p1.y - points.p2.y) / (points.p1.x - points.p2.x);
        const _b = points.p1.y - points.p1.x * k ;

        console.log('k + b' + k + '-' + _b);


        let x , y;
        console.log('斜率： '  + k);
        //如果斜率为0
        if (k === 0 ) {
            console.log('k = 0' );
            if (points.p1.y === points.p2.y) {
                x = p.x;
                if (points.p1.y > p.y) {
                    y = p.y + h;
                } else {
                    y = p.y - h;
                }
            } else {
                y = p.y;
                if (points.p1.x > p.x) {
                    x = p.x + h;
                } else {
                    x = p.x - h;
                }
            }


        } else {
            console.log('k != 0' );
            // y = k1x + b1 (p1，p2边的垂线方程)
            const k1 = - 1 / k ;
            const b1 = p.y - k1 * p.x;
            console.log('k1 : b1 ' + k1 + ':' + b1);
            //两条直线方程联解
            x = (_b - b1) / (k1 - k );
            y = k1 * x + b1;
        }



        const data = {
            x: x,
            y: y,
            h: h,
            p1: points.p1.index,
            p2: points.p2.index,
            index: this.getIndex(points.p1.index , points.p2.index ),
            split: true,
            outrange: false
        };
        return data;
    }

    getIndex(index1: number, index2: number) {
        if ( (index1 === 4 || index2 === 4) && (index1 === 1 || index2 === 1 ) ) {
            return 4;
        } else if (index1 < index2) {
            return index1;
        } else {
            return index2;
        }
    }



    //计算三角形面积
    triangleArea(a: any, b: any, c: any) {
        const result = Math.abs((a.x * b.y + b.x * c.y + c.x * a.y - b.x * a.y
            - c.x * b.y - a.x * c.y) / 2);
        return result;
    }

    /**
     * 获取平行四边的点，绝对坐标
     * @returns {any[]}
     */
    getPoints() {
        const pointsArray = [];
        const map = {
            x: 0,
            y: 0
        };
        //console.log(this.points)
        for (let i = 0; i < this.points.length; i++) {
            const num = this.points[i];
            if ( (i + 1) % 2 === 0) {
                map.y = num + this.lineShape.position().y;
                const newObj = Object.assign({}, map);
                console.log(map);
                pointsArray.push(newObj);
            } else {
                map.x = num + this.lineShape.position().x;
            }
        }
        return pointsArray;
    }



    //获取交点
    getIntersection(beginPoint: any, endPoint: any) {
        let point;
        let index = -1;
        for ( let i = 0 ; i < this.segmentsLines.length ; i++ ) {
            const line = this.segmentsLines[i];
            point = this.segmentsIntr(beginPoint, endPoint, line.beginPoint, line.endPoint);
            if (point) {
                index = i;
                point.index = this.getIndex(line.beginPoint.index , line.endPoint.index );
                //console.info('success', point);
                break;
            }
        }
        if (index > -1) {
            this.segmentsLines.splice(index, 1);
        }
        console.log('return point', point);
        return point;
    }




    /**
     * 判断两条线段的交点
     * @param a 线段1的端点
     * @param b 线段1的端点
     * @param c 线段2的端点
     * @param d 线段2的端点
     * @returns {any}
     */
    segmentsIntr(a: any , b: any, c: any, d: any) {

        //线段ab的法线N1
        const nx1 = (b.y - a.y), ny1 = (a.x - b.x);

        //线段cd的法线N2
        const nx2 = (d.y - c.y), ny2 = (c.x - d.x);

        //两条法线做叉乘, 如果结果为0, 说明线段ab和线段cd平行或共线,不相交
        const denominator = nx1 * ny2 - ny1 * nx2;
        if (denominator === 0) {
            return false;
        }

        //在法线N2上的投影
        const distC_N2 = nx2 * c.x + ny2 * c.y;
        const distA_N2 = nx2 * a.x + ny2 * a.y - distC_N2;
        const distB_N2 = nx2 * b.x + ny2 * b.y - distC_N2;

        // 点a投影和点b投影在点c投影同侧 (对点在线段上的情况,本例当作不相交处理);
        if ( distA_N2 * distB_N2 >= 0  ) {
            return false;
        }

        //
        //判断点c点d 和线段ab的关系, 原理同上
        //
        //在法线N1上的投影
        const distA_N1 = nx1 * a.x + ny1 * a.y;
        const distC_N1 = nx1 * c.x + ny1 * c.y - distA_N1;
        const distD_N1 = nx1 * d.x + ny1 * d.y - distA_N1;
        if ( distC_N1 * distD_N1 >= 0  ) {
            return false;
        }

        //计算交点坐标
        const fraction = distA_N2 / denominator;
        const dx = fraction * ny1,
            dy = -fraction * nx1;
        return { x: a.x + dx , y: a.y + dy };
    }




}

