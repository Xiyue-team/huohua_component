import {default as Konva, ImageConfig, Layer, Rect, Shape} from 'konva';
import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import {Grid} from './prefab/Grid';
import {Parallelogram} from './shape/Parallelogram';
import {PointsConfig} from './prefab/PointsConfig';

import * as knifePng from '../sub_static/knife@2x.png';
import * as knifeActivePng from '../sub_static/knife_active@2x.png';
import * as _ from 'lodash';
import {Environment} from '../../../../../src/core/Environment';


import * as p1Png from '../sub_static/p1@2x.png';
import * as p1ActivePng from '../sub_static/p1_active@2x.png';
import * as p2Png from '../sub_static/p2@2x.png';
import * as p2ActivePng from '../sub_static/p2_active@2x.png';
import * as p3Png from '../sub_static/p3@2x.png';
import * as p3ActivePng from '../sub_static/p3_active@2x.png';
import * as p4Png from '../sub_static/p4@2x.png';
import * as p4ActivePng from '../sub_static/p4_active@2x.png';


/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/11/24 14:58
 */

export class CanvasStage extends SimpleKonvaTemplate {

    width = window.innerWidth;
    height = window.innerHeight;

    knifeLayer: Konva.Layer;

    //网格块大小
    blockSnapSize = 30;
    //平行四边形点
    points1 = new Array<number>();

    //切割标识
    splitSign = false;
    //开始点
    beginPoint: any;
    endPoint: any;

    dragSign = false;

    segmentLineBeginPoint: any;

    //平行四边
    parallelogram: Parallelogram;

    constructor() {
        super('canvasContainer');
        if (((window as any)['env'] as Environment).browserInfo.isMobile ) {
            this.blockSnapSize = 20;
        }
        this.initPrefab();
        this.initParallelogram();
    }

    //初始化平行四边形
    private async initParallelogram() {

        const knifeX = Math.floor((this.width - (48 + 22) ) / this.blockSnapSize - 1) * this.blockSnapSize;
        const halfY = Math.floor(this.height / this.blockSnapSize) / 2 - 4;

        //三种平行四边形
        const p1 = await this.loadImage(p1Png as any,  { width: 48, height: 48, id: 'p1Ico', draggable: false,
            x: knifeX, y: (halfY + 2) *  this.blockSnapSize } as any);
        const p1Active = await this.loadImage(p1ActivePng as any,  { width: 48, height: 48, id: 'p1Active', draggable: false,
            visible: false, x: knifeX, y: (halfY + 2) *  this.blockSnapSize } as any);

        const p2 = await this.loadImage(p2Png as any,  { width: 48, height: 48, id: 'p2Ico', draggable: false,
            x: knifeX, y: (halfY + 4) * this.blockSnapSize } as any);
        const p2Active = await this.loadImage(p2ActivePng as any,  { width: 48, height: 48, id: 'p2Active', draggable: false,
            visible: false, x: knifeX, y: (halfY + 4) * this.blockSnapSize } as any);

        const p3 = await this.loadImage(p3Png as any,  { width: 48, height: 48, id: 'p3Ico', draggable: false,
            x: knifeX, y: (halfY + 6) * this.blockSnapSize } as any);
        const p3Active = await this.loadImage(p3ActivePng as any,  { width: 48, height: 48, id: 'p3Active', draggable: false,
            visible: false, x: knifeX, y: (halfY + 6) * this.blockSnapSize } as any);

        const p4 = await this.loadImage(p4Png as any,  { width: 48, height: 48, id: 'p4Ico', draggable: false,
            x: knifeX, y: (halfY + 8) * this.blockSnapSize } as any);
        const p4Active = await this.loadImage(p4ActivePng as any,  { width: 48, height: 48, id: 'p4Active', draggable: false,
            visible: false, x: knifeX, y: (halfY + 8) * this.blockSnapSize } as any);


        p1.on('mousedown touchstart', () => {
            this.createParallelogram(PointsConfig.points1(this.blockSnapSize), 'p1');
            p1Active.show();
            p1.hide();
            this.knifeLayer.draw();
        });

        p2.on('mousedown touchstart', () => {
            this.createParallelogram(PointsConfig.points2(this.blockSnapSize), 'p2');
            p2Active.show();
            p2.hide();
            this.knifeLayer.draw();
        });

        p3.on('mousedown touchstart', () => {
            this.createParallelogram(PointsConfig.points3(this.blockSnapSize), 'p3');
            p3Active.show();
            p3.hide();
            this.knifeLayer.draw();
        });

        p4.on('mousedown touchstart', () => {
            this.createParallelogram(PointsConfig.points4(this.blockSnapSize), 'p4');
            p4Active.show();
            p4.hide();
            this.knifeLayer.draw();
        });

        this.knifeLayer.add(p1);
        this.knifeLayer.add(p2);
        this.knifeLayer.add(p3);
        this.knifeLayer.add(p4);
        this.knifeLayer.add(p1Active);
        this.knifeLayer.add(p2Active);
        this.knifeLayer.add(p3Active);
        this.knifeLayer.add(p4Active);
        this.knifeLayer.draw();
    }

    private createParallelogram(points: any, id: string) {
        this.reset();
        const width  = this.stage.width();
        const height = this.stage.height();
        this.parallelogram = new Parallelogram(points, id);
        this.parallelogram.setPositionOnGrid(width, height, this.blockSnapSize, 2);
        this.parallelogram.lineShape.setZIndex(0);
        this.knifeLayer.add(this.parallelogram.lineShape);
        this.knifeLayer.draw();

      /*  this.parallelogram.lineShape.on('mouseenter', () => {
            const pos = this.stage.getPointerPosition();
            this.drawStart(pos);
        });

        this.parallelogram.lineShape.on('mouseleave', () => {
            const pos = this.stage.getPointerPosition();
            this.drawStart(pos);
        });*/

    }

    private initPrefab() {

        this.knifeLayer = new Konva.Layer();
        //创建网格
        const grid = new Grid(this.stage.width(), this.stage.height(), this.blockSnapSize);
        const gridLayer = grid.createGrid();
        this.stage.add(gridLayer);
        this.stage.add(this.knifeLayer);
        this.initResources();
        //this.animation();
    }


    private async initResources() {

        const knifeX = Math.floor((this.width - (48 + 22) ) / this.blockSnapSize - 1) * this.blockSnapSize;
        const halfY = Math.floor(this.height / this.blockSnapSize) / 2 - 4;

        //小刀
        const knife = await this.loadImage(knifePng as any,  { width: 48, height: 48, id: 'knife', draggable: false,
            x: knifeX, y: halfY *  this.blockSnapSize } as any);
        //激活的小刀
        const knifeActive = await this.loadImage(knifeActivePng as any,  { width: 48, height: 48, id: 'activeKnife', draggable: false,
            x: knifeX, y: halfY *  this.blockSnapSize } as any);
        knifeActive.hide();
        //绑定小刀事件
        knife.on('mouseup touchend', () => {
            console.log('knife');
            knife.hide();
            knifeActive.show();
            this.knifeLayer.draw();
            this.splitSign = true;
            console.log(this.splitSign);
        });

        this.knifeLayer.add(knife);
        this.knifeLayer.add(knifeActive);

        //分割小刀样式
        /*const knifeSplitShape = await this.loadImage(knifeSplitPng as any,
            { width: 48, height: 48, id: 'knifeSplit', draggable: true } as any);
        knifeSplitShape.hide();
        this.knifeLayer.add(knifeSplitShape);*/

        this.stage.add(this.knifeLayer);

        //当鼠标移动在平行四边行时 ，动态连线
        this.stage.on('mousemove touchmove', (e: any) => {
            const pos = this.stage.getPointerPosition();
            const shape = this.knifeLayer.getAllIntersections(pos);
            const splitLine = this.knifeLayer.findOne('#splitLine');

            if (this.splitSign && this.segmentLineBeginPoint) {
                //console.log(this.segmentLineBeginPoint, pos);
                const point = this.parallelogram.getIntersection(this.segmentLineBeginPoint, pos);

                //动态画线
                if (this.beginPoint  ) {
                    this.drawSplitLine( this.endPoint ? this.endPoint : pos);
                }
                //console.log(point);
                if (point) {
                    if ( !this.beginPoint) {
                       this.beginPoint = point;
                    } else if ( !this.endPoint) {
                        this.endPoint = point;
                        this.end();
                    }
                    //this.drawStart(point);
                    console.error('get begin point ');
                    console.error(point);
                }


            }
            //console.log('splitsign ' + this.splitSign);
           // console.log('beginPoint ' + this.hitShape(shape));


        });

        //获取起始点
        this.stage.on('mousedown touchstart', (e: any) => {
            console.log('mousedown');
            const pos = this.stage.getPointerPosition();
            const shape = this.knifeLayer.getAllIntersections(pos);

            if (this.splitSign && this.hitShape(shape) === false) {

                //knifeSplitShape.show();
                //knifeSplitShape.position(pos);
                this.knifeLayer.draw();
                this.segmentLineBeginPoint = pos;

               // const h = this.parallelogram.getNearPoint(pos);
                //console.info('h', h);
                //计算起始点
                /*const y = this.knifeLayer.findOne('#p1').position().y;
                const x = Math.round(pos.x / this.blockSnapSize) * this.blockSnapSize;*/
                //console.log("outrange: " + h.outrange);

            }

        });

        //鼠标松开
        this.stage.on('mouseup touchend', (e: any) => {
            //console.log('mouseup');

        });

    }

    end() {
        if (this.splitSign && this.beginPoint && this.endPoint) {

            this.beginPoint.split = true;
            this.endPoint.split = true;

            //校正吸附90°
            this.adsorbentAngle(this.beginPoint, this.endPoint);

            //构造点
            const points = this.parallelogram.getPoints();


            if ( this.beginPoint.index > this.endPoint.index) {
                this.beginPoint.index ++;

                points.splice(this.endPoint.index, 0 , this.endPoint);
                points.splice(this.beginPoint.index , 0 , this.beginPoint);
            } else {
                this.endPoint.index++;

                points.splice(this.beginPoint.index , 0 , this.beginPoint);
                points.splice(this.endPoint.index, 0 , this.endPoint);
            }

            const splitLine = this.knifeLayer.findOne('#splitLine');
            splitLine.hide();

        /*    points.push(this.beginPoint, this.endPoint);*/
            console.log('before', points);
            //const newpoints =  this.clockwiseSortPoints(points);
            //console.log('after', newpoints);

            //隐藏原平行四边形
            this.parallelogram.lineShape.hide();

            //分割图形
            this.createShape(points);

            //显示分割线
            const showLine = new Konva.Line({
                points: [this.beginPoint.x, this.beginPoint.y, this.endPoint.x, this.endPoint.y],
                stroke: '#4b4b4b',
                id: 'showLine',
                strokeWidth: 2
            });
            this.knifeLayer.add(showLine);
            this.knifeLayer.draw();

            this.beginPoint = null;
            this.endPoint  = null;
            this.splitSign = false;
        }
    }




    adsorbentAngle(p1: any, p2: any) {

        const h = Math.abs(p1.y - p2.y);
        const distance = Math.tan(Math.PI / 36) * h ;

        const contrast = p1.x - p2.x;
        if (Math.abs(contrast) <= distance) {
            p2.x = p1.x;
        }
    }


    reset() {
        this.splitSign = false;
        this.beginPoint = null;
        this.endPoint = null;
        this.segmentLineBeginPoint = null;
        /*let splitLine = this.knifeLayer.findOne('#splitLine');
        splitLine.hide();*/
        //重置平行四边形
        if (this.parallelogram) {
            this.parallelogram.lineShape.hide();
            this.parallelogram.lineShape.destroy();
            this.parallelogram = null;
        }

        this.knifeLayer.findOne('#p1Ico').show();
        this.knifeLayer.findOne('#p1Active').hide();
        this.knifeLayer.findOne('#p2Ico').show();
        this.knifeLayer.findOne('#p2Active').hide();
        this.knifeLayer.findOne('#p3Ico').show();
        this.knifeLayer.findOne('#p3Active').hide();
        this.knifeLayer.findOne('#p4Ico').show();
        this.knifeLayer.findOne('#p4Active').hide();


        //隐藏激活的小刀
        this.knifeLayer.findOne('#activeKnife').hide();
        //显示未激活的小刀
        this.knifeLayer.findOne('#knife').show();
        //隐藏分割线
        if ( this.knifeLayer.findOne('#showLine')) {
            this.knifeLayer.findOne('#showLine').destroy();
        }
        //销毁分割后的图形
        const shapes = this.knifeLayer.find('.splitShape');
        for (const shape of shapes) {
            shape.destroy();
        }
        this.knifeLayer.draw();
    }


    createShape(pointsMap: any) {
        const shape1Arry = [];
        const shape2Arry = [];
        const newPointMap = _.concat(pointsMap, pointsMap);
        let splitSign = 0;
        let shape1Sign = true;
        let shape2Sign = true;
        for (const point of newPointMap) {
            if (point.split) {
                splitSign ++;
            }
            if ( splitSign >= 1 && splitSign <= 2 && shape1Sign) {
                if (splitSign === 2) {
                    shape1Sign = false;
                }
                shape1Arry.push(point);
            }
            if ( splitSign >= 2 && splitSign <= 3 && shape2Sign) {
                if (splitSign === 3) {
                    shape2Sign = false;
                }
                shape2Arry.push(point);
            }
        }

        this.drawShape(shape1Arry);
        this.drawShape(shape2Arry, '#65CBFD');

    }

    drawShape(pointMap: any, color?: string) {
        const points = [];
        for (const point of pointMap) {
            points.push(point.x);
            points.push(point.y);
        }

        const lineShape = new Konva.Line({
            points: points,
            name: 'splitShape',
            fill: color ? color : '#FFE357',
            opacity: 0.6,
            closed : true,
            draggable: true
        });
        lineShape.on('dragstart', () => {
            if ( this.knifeLayer.findOne('#showLine') ) {
                this.knifeLayer.findOne('#showLine').destroy();
            }

        } );
        this.knifeLayer.add(lineShape);
        this.knifeLayer.draw();
    }


    private hitShape(shapes: any): boolean {
        for (let i = 0 ; i < shapes.length; i++) {
            const shape = shapes[i];
            const name = shape.getAttr('name');
            if ( 'parallelogram' === name ) {
                return true;
            }
             //parallelogram
        }
        return false;
    }

    private drawSplitLine(end: any) {
        let splitLine = this.knifeLayer.findOne('#splitLine');
        //console.log(splitLine);
        if ( !splitLine ) {
            splitLine = new Konva.Line({
                points: [this.beginPoint.x, this.beginPoint.y, end.x, end.y],
                stroke: '#000000',
                id: 'splitLine',
                strokeWidth: 2
            });
            this.knifeLayer.add(splitLine);
        } else {
            splitLine.show();
            (splitLine as Konva.Line).points([this.beginPoint.x, this.beginPoint.y, end.x, end.y]);
        }
        splitLine.setZIndex(99);
        //console.log(splitLine);

        this.knifeLayer.draw();
    }



}

