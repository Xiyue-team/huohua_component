import * as analytic1Img from '../sub_static/drag.png';

export class CoordinateSystem{
    width:number;
    height:number;
    differ:number;
    length:number;
    constructor(width:number,height:number,length:number){
        this.width = width;
        this.height = height;
        this.length = length
    }

    // 画坐标系
    drawCoordinate(): object[]{
        let min = Math.min(this.width,this.height)
        this.differ = Math.abs(this.width-this.height)
        let xPoint: Array<number> = [0,0];
        let yPoint: Array<number> = new Array<number>();
        // x轴
        for (let i=1;i<this.length;i++) {
            const space = (min - 40) / this.length
            const step = space * i
            if (i == this.length / 2){
                continue;
            }
            xPoint.push(step)
            xPoint.push(0)
            xPoint.push(step)
            xPoint.push(-5)
            xPoint.push(step)
            xPoint.push(0)
            if (i == this.length-1) {
                xPoint.push(min-50)
                xPoint.push(0)
                xPoint.push(min-50)
                xPoint.push(5)
                xPoint.push(min-40)
                xPoint.push(0)
                xPoint.push(min-50)
                xPoint.push(-5)
                xPoint.push(min-50)
                xPoint.push(0)
            }
        }

        let configX = {
            x: (this.width - min) / 2 + 20,
            y: this.height / 2 - 1,
            points: xPoint,
            closed: true,
            stroke: 'black',
            strokeWidth: 2,
            fillLinearGradientStartPoint: { x: -50, y: -50 },
            fillLinearGradientEndPoint: { x: 50, y: 50 },
            fillLinearGradientColorStops: [0, 'black', 1, 'black']
        }
        // y轴
        yPoint = [0,10, -5,10, 0,0, 5,10, 0,10]
        for (let i=1;i<this.length;i++) {
            const space = (min - 40) / this.length
            const step = space * i
            if (i == this.length /2) {
                continue;
            }
            yPoint.push(0)
            yPoint.push(step)
            yPoint.push(5)
            yPoint.push(step)
            yPoint.push(0)
            yPoint.push(step)
            if ( i == this.length-1) {
                yPoint.push(0)
                yPoint.push(min-40)
            }
        }
        let configY={
            x: this.width/2 - 1,
            y: (this.height - min) / 2 + 20,
            points: yPoint,
            closed: true,
            stroke: 'black',
            strokeWidth: 2,
            fillLinearGradientStartPoint: { x: -50, y: -50 },
            fillLinearGradientEndPoint: { x: 50, y: 50 },
            fillLinearGradientColorStops: [0, 'black', 1, 'black']
        }
        return [configX,configY]
    }

    /**
     * 找到原点坐标
     */
    getOrigin(): number[]{
        const min = Math.min(this.width,this.height)
        const space = (min - 40) / this.length
        const xBegin2px = space * (this.length / 2) + (this.width-min) / 2 + 20
        const yBegin2px = space * (this.length / 2) + (this.height-min) / 2 + 20
        return [xBegin2px,yBegin2px]
    }

    
    /**
     * 画函数线
     * @param xBegin 起始x点位置
     * @param yBegin 起始y点位置
     * @param xEnd 终点x
     * @param yEnd 重点y
     * @param k 斜率是否大于0
     * @param color 颜色
     */
    drawSimpleLine(xBegin:number,yBegin:number,xEnd:number,yEnd:number,k:boolean,color:string): object{
        const min = Math.min(this.width,this.height)
        const space = (min - 40) / this.length
        const xBegin2px = space * (xBegin + this.length / 2) + (this.width-min) / 2 + 20
        // const xBegin2px = 0
        // const yBegin2px = 0
        const yBegin2px = space * (this.length / 2 - yBegin)+ (this.height-min) / 2 + 20
        const xEnd2px = space * Math.abs(xEnd - xBegin) + xBegin2px
        const yEnd2px = k ? space * Math.abs(yEnd - yBegin) + yBegin2px : -space * Math.abs(yEnd - yBegin) + yBegin2px
        return {
            // x: xBegin2px + (this.width-min) / 2 + 20,
            // y: yBegin2px + (this.height-min) / 2 + 20,
            points: [xBegin2px,yBegin2px,xEnd2px,yEnd2px],
            strokeWidth:2,
            closed: true,
            stroke: color
        }
    }
    /**
     * 画圆点
     * @param x 圆心
     * @param y 
     */
    drawCircle(x:number,y:number){
        const min = Math.min(this.width,this.height)
        const space = (min - 40) / this.length
        const x2px = space * (x + this.length / 2) + (this.width-min) / 2 + 20
        const y2px = space * (this.length / 2 - y) + (this.height-min) / 2 + 20
        return{
            x:x2px,
            y:y2px,
            radius: 5,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 1,
        }
    }
    /**
     * 画三角形
     * @param x1 点1
     * @param y1 
     * @param x2 点2
     * @param y2 
     * @param x3 点3
     * @param y3 
     * @param fill 填充颜色
     */
    drawTriangle(x1:number,y1:number,x2:number,y2:number,x3:number,y3:number,fill:string){
        const min = Math.min(this.width,this.height)
        const space = (min - 40) / this.length
        const x1Topx = space * (x1 + this.length / 2) + (this.width-min) / 2 + 20
        const y1Topx = space * (this.length / 2 - y1) + (this.height-min) / 2 + 20
        const x2Topx = space * (x2 + this.length / 2) + (this.width-min) / 2 + 20
        const y2Topx = space * (this.length / 2 - y2) + (this.height-min) / 2 + 20
        const x3Topx = space * (x3 + this.length / 2) + (this.width-min) / 2 + 20
        const y3Topx = space * (this.length / 2 - y3) + (this.height-min) / 2 + 20
        return {
            points: [x1Topx,y1Topx,x2Topx,y2Topx,x3Topx,y3Topx],
            closed: true,
            stroke: 'black',
            strokeWidth: 1,
            fillLinearGradientStartPoint: { x: -50, y: -50 },
            fillLinearGradientColorStops: [0, '#FA8072', 1, '#FA8072']
        }
    }
    /**
     * 画虚线
     * @param endX 
     * @param endY 
     */
    drawDotLine(startX:number,startY:number,endX:number,endY:number):object[]{
        const min = Math.min(this.width,this.height)
        const space = (min - 40) / this.length
        const x2Topx = space * (endX + this.length / 2) + (this.width - min) / 2 + 20
        const y2Topx = space * (this.length / 2 - endY) + (this.height - min) / 2 + 20
        const x1Topx = space * (startX + this.length / 2) + (this.width - min) / 2 + 20
        const y1Topx = space * (this.length / 2 - startY) + (this.height - min) / 2 + 20

        // const origin = this.getOrigin();
        const dotLine = {
            x:x1Topx,
            y:y1Topx,
            points: [0, 0, x2Topx-x1Topx, y2Topx-x1Topx],
            stroke: 'black',
            strokeWidth: 2,
            lineJoin: 'round',
            dash: [10, 10],
            lineCap: 'round',
        }
        const image = new Image();
        image.src = require('../sub_static/drag.png')
        const dragDot = {
            x:x1Topx-15,
            y:y1Topx-15,
            image:image,
            width:30,
            height:30,
            draggable: true
        }

        return [dotLine,dragDot]
    }

    // 获取到圆点距离
    calcDistance(x:number,y:number): number{
        const min = Math.min(this.width,this.height)
        const space = (min - 40) / this.length
        const x1Topx = space * (x + this.length / 2) + (this.width - min) / 2 + 20
        const y1Topx = space * (this.length / 2 - y) + (this.height - min) / 2 + 20
        const origin = this.getOrigin();
        const length = Math.sqrt(Math.pow((x1Topx - origin[0]),2) + Math.pow((y1Topx - origin[1]),2))
        return length
    }

    /**
     * 求斜率
     */
    calcSlope(x:number,y:number): number{
        const origin = this.getOrigin();
        const value = (origin[1]-y) / (x-origin[0])
        return value
    }

}