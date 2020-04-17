import {fabric} from 'fabric';

const mainImg = require('../sub_static/main.png');
const ballImg = require('../sub_static/ball.png');
const foilImg = require('../sub_static/foil.png');
const conductorRodImg = require('../sub_static/conductorRod.png');
const positiveChargeLegend = require('../sub_static/p2.png');
const negativeChargeLegend = require('../sub_static/n2.png');

export interface IPositon {
    left: number;   // 距离左边位置
    top: number;    // 距离顶部位置
    type?: number;  // 类型 0不分左右，-1左金属箔片上电荷，1右金属箔片上电荷
}
export class Gyqd2dModel {
    private canvas: fabric.StaticCanvas;                // 场景
    private scaleValue = new ScaleValue();              // 场景缩放比例
    private middleX: number;                            // 场景水平中心点的数值
    private middleY: number;                            // 场景竖直中心点的数值
    private rightFoil: fabric.Image;                    // 向右偏移的金属箔片
    private leftFoil: fabric.Image;                     // 向左偏移的金属箔片
    private conductorRod: fabric.Image;                 // 可拖动的导体帮
    private tipText: fabric.Text;                       // 提示文字
    private dragRange: {
        minLeft: number,
        minTop: number,
        maxLeft: number,
        maxTop: number };                               // 可拖动范围
    // 顶部小球位置
    private topChargePosition: IPositon[] = [
        {left: 0, top: 7, type: 0},
        {left: -16, top: 21, type: 0},
        {left: 16, top: 21, type: 0},
        {left: 0, top: 37, type: 0}
    ];
    // 中间部分小球位置
    private centerChargePosition: IPositon[] = [
        {left: 0, top: 63, type: 0},
        {left: 0, top: 114, type: 0}
    ];
    // 底部箔片小球位置
    private bottomChargePosition: IPositon[] = [
        {left: 0, top: 155, type: -1},
        {left: 0, top: 192, type: -1},
        {left: 0, top: 228, type: -1},
        {left: 0, top: 264, type: -1},
        {left: 0, top: 300, type: -1},
        {left: 0, top: 155, type: 1},
        {left: 0, top: 192, type: 1},
        {left: 0, top: 228, type: 1},
        {left: 0, top: 264, type: 1},
        {left: 0, top: 300, type: 1}
    ];

    private topCharges: fabric.Group[] = [];             // 顶部负电荷
    private centerCharges: fabric.Group[] = [];          // 中间负电荷
    private bottomCharges: fabric.Group[] = [];          // 底部负电荷
    /**
     * 构造函数
     * @param {string} canvas       载体 canvas容器id
     */
    constructor(canvas: string) {
        console.log('init Simple2DModel constructor');
        this.initStage(canvas);
        this.initLayer();
    }
    
    /**
     * 初始化场景
     * @param canvas 载体 canvas容器id
     */
    private initStage(canvas: string) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.canvas = new fabric.Canvas(canvas, {selection: false, preserveObjectStacking: true});
        this.canvas.setHeight(height);
        this.canvas.setWidth(width);
        this.canvas.setZoom(this.scaleValue.scale);
        this.middleX = this.canvas.getWidth() / this.scaleValue.scale / 2;
        this.middleY = this.canvas.getHeight() / this.scaleValue.scale / 2;
        this.dragRange = {
            minLeft: this.middleX + 30,
            maxLeft: this.middleX + 318,
            minTop: this.middleY - 284,
            maxTop: this.middleY - 206
        };
    }

    /**
     * 初始化实验场景
     */
    private async initLayer() {
        this.addElectroscope();
        this.initLegendAndTipText();
    }

    /**
     * 加载负电荷
     */
    private addNegativeCharge() {
        this.topCharges = this.initNegativeCharge(this.topChargePosition);
        this.centerCharges = this.initNegativeCharge(this.centerChargePosition);
        this.bottomCharges = this.initNegativeCharge(this.bottomChargePosition);
        this.canvas.add(...this.topCharges, ...this.centerCharges, ...this.bottomCharges);
        const dotCircle = this.createCircle(3, '#6b6b6b');
        dotCircle.set('top', this.middleY - 266 + 141);
        dotCircle.set('left', this.middleX);
        this.canvas.add(dotCircle);
    }
    /**
     * 初始化负电荷
     * @param positon 电荷位置
     */
    private initNegativeCharge(positon: IPositon[]) {
        const chargeArr: fabric.Group[] = [];
        positon.forEach((cp, index) => {
            const circle = this.createCircle(8, '#FFFFFF', 0.5);
            const rect = this.createRect(12, 4, '#00AAFF', 2);
            const group = new fabric.Group([circle, rect], {
                left: this.middleX - 8 + cp.left,
                top: this.middleY - 266 + cp.top,
                data: index
            });
            chargeArr.push(group);
        });
        return chargeArr;
    }

    /**
     * 初始化图例
     */
    private async initLegendAndTipText() {
         // 图例图片
        const imgConf = {
            left: this.middleX - 460,
            width: 32,
            height: 32,
            selectable: false,
            hoverCursor: 'default'
        };
        const positiveChargeLegendImg = await this.loadImage(positiveChargeLegend, Object.assign({top: this.middleY + 120}, imgConf));
        this.canvas.add(positiveChargeLegendImg);
        const negativeChargeLegendImg = await this.loadImage(negativeChargeLegend, Object.assign({top: this.middleY + 170}, imgConf));
        this.canvas.add(negativeChargeLegendImg);

        // 图例文字
        const legendTextConf = {
            left: this.middleX - 420,
            fontSize: 24,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: '#000000',
            selectable: false,
            hoverCursor: 'default'
        };
        const positiveChargeLegendText = new fabric.Text(window.env.browserInfo.lang.tips1,
            Object.assign({top: this.middleY + 123}, legendTextConf));
        const negativeChargeLegendText = new fabric.Text(window.env.browserInfo.lang.tips2,
            Object.assign({top: this.middleY + 173}, legendTextConf));

        // 添加提示文字
        this.tipText = new fabric.Text(window.env.browserInfo.lang.tips3, {
            left: this.middleX + 318,
            top: this.middleY - 172,
            fontSize: 20,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: '#8A8A8A',
            selectable: false,
            hoverCursor: 'default'
        });
        this.canvas.add(positiveChargeLegendText).add(negativeChargeLegendText).add(this.tipText);
    }

    /**
     * 添加验电器
     */
    private async addElectroscope() {
        // 添加顶部部分
        const ball = await this.loadImage(ballImg, {
            left: this.middleX - 30,
            top : this.middleY - 266,
            width: 120,
            height: 296,
            selectable: false,
            scaleX: 0.5,
            scaleY: 0.5,
            hoverCursor: 'default'
        });
        this.canvas.add(ball);
        this.addFoil();
    }

    /**
    * 添加验电器中金属箔片
     * @param direction 偏移的方向：left(向左偏移)，right(向右偏移)
     */
    private async addFoil() {
        const conf = {
            left: this.middleX,
            top:  this.middleY - 133,
            width: 40,
            height: 392,
            originX: 'center', 
            originY: 'top',
            selectable: false,
            scaleX: 0.5,
            scaleY: 0.5,
            hoverCursor: 'default',
        };

        this.leftFoil = await this.loadImage(foilImg, conf);
        this.rightFoil = await this.loadImage(foilImg, conf);
        this.canvas.add(this.rightFoil, this.leftFoil);
        this.addNegativeCharge();
        const main = await this.loadImage(mainImg, {
            left: this.middleX - 155,
            top : this.middleY - 266 + 74,
            width: 620,
            height: 918,
            selectable: false,
            scaleX: 0.5,
            scaleY: 0.5,
            hoverCursor: 'default'
        });
        this.canvas.add(main);
        this.addDraggindRod();
    }

    /**
     * 添加可拖动的导体棒
     */
    private async addDraggindRod() {

        this.conductorRod = await this.loadImage(conductorRodImg, {
            left: this.middleX + 260,
            top: this.middleY - 230,
            width: 404,
            height: 68,
            scaleX: 0.5,
            scaleY: 0.5,
            hoverCursor: 'pointer',
            moveCursor: 'pointer',
            hasControls: false,
            hasBorders: false,
            hasRotatingPoint: false
        });
        this.canvas.add(this.conductorRod);
        // 给导体帮添加拖动事件
        this.conductorRod.on('moving', (e: fabric.IEvent) => {
            // 隐藏提示文字
            if (this.tipText.visible) {
                this.tipText.visible = false;
            }
            const obj = e.target;
            if (obj.left < this.dragRange.minLeft) {
                obj.left = this.dragRange.minLeft;
            }
            if (obj.left > this.dragRange.maxLeft) {
                obj.left = this.dragRange.maxLeft;
            }
            if (obj.top < this.dragRange.minTop) {
                obj.top = this.dragRange.minTop;
            }
            if (obj.top > this.dragRange.maxTop) {
                obj.top = this.dragRange.maxTop;
            }
            this.conductorRodMoving();

        });
    }

    /**
     * 可偏移金属棒和电荷的动画
     */
    private conductorRodMoving() {
        const maxLeftDistance = 155; // 金属棒最大左移动距离
        const maxOpenAngle = 20;   // 容器内金属棒最大打开角度
        const dLeft = this.conductorRod.left; // 金属棒距离左边位置
        /** 超出感应范围，负电荷电荷归位 */
        if (this.conductorRod.left > this.middleX + 155) {
            // 重置电荷和金属箔片
            this.restFoilAndNegativeChargePostion();
            return;
        }
        const ratio = (this.middleX + 155 - dLeft) / maxLeftDistance;
        if (dLeft >= this.middleX && dLeft <= this.middleX + 155) { // 导体棒影响电荷的区域
            const angle = maxOpenAngle * ratio;
            this.leftFoil.set('angle', angle);
            this.rightFoil.set('angle', -angle);
            this.calcChargePositon(ratio, angle);
        }
    }

    /** 
     * 计算电荷位置 
     * 
     * @param ratio 运动比率
     * @param angle 箔片旋转角度
     */
    private calcChargePositon (ratio: number, angle: number) {
        const rodPosLeft = this.conductorRod.left; // 金属棒距离左边位置距离
        const rodPosTop = this.conductorRod.top; // 金属棒距离顶部位置距离
        const rodPost = {
            left: rodPosLeft,
            top: rodPosTop
        };
        this.topCharges.forEach(charge => {
            const location = this.topChargePosition[charge.data]; 
            const position = this.calcTopChargePosition(rodPost, location, ratio, charge); 
            charge.set('left', position.left);
            charge.set('top', position.top);
        });
        this.centerCharges.forEach(charge => {
            const location = this.centerChargePosition[charge.data]; 
            const position = this.calcCenterChargePosition(rodPost, location, ratio, charge); 
            charge.set('left', position.left);
            charge.set('top', position.top);
        });
        this.bottomCharges.forEach(charge => {
            const location = this.bottomChargePosition[charge.data]; 
            const position = this.calcBottomChargePosition(rodPost, location, ratio, angle, charge); 
            charge.set('left', position.left);
            charge.set('top', position.top);
        });
    }
    
    /**
     * 顶部电荷位置计算
     * @param rodPos 导体棒位置
     * @param point 电荷位置
     * @param ratio 移动比率
     */
    private calcTopChargePosition(rodPos: IPositon, chargePos: IPositon, ratio: number, charge: fabric.Group) {
        const oLeft = this.middleX - 8 + chargePos.left;
        let oTop = this.middleY - 266 + chargePos.top;

        if (oTop > this.middleY - 225) {
            oTop = this.middleY - 225;
            ratio = ratio * 40 / chargePos.top;
        }
        // left = 原始坐标 + 最大移动位置 * 比例
        const left = oLeft + (20 - chargePos.left) * ratio;
        // 根据金属棒位置 小球原属位置作新位置的left计算top
        const top = (rodPos.top - oTop) * (left - oLeft) / (rodPos.left - oLeft) + oTop;
        // 计算是否在顶部元范围内
        const r = Math.pow(left + 8 - this.middleX, 2) + Math.pow(top + 8 - (this.middleY - 236), 2); 
        // 电荷在小球内，且边界超过圆球的边界 位置不变化
        if (charge.top < this.middleY - 225 && r >= 484) {
            return {
                left: charge.left,
                top: charge.top
            };
        }
        return {left, top};
    }

    /**
     * 中间电荷位置计算
     * @param rodPos 导体棒位置
     * @param point 电荷位置
     * @param ratio 移动比率
     */
    private calcCenterChargePosition(rodPos: IPositon, chargePos: IPositon, ratio: number, charge: fabric.Group) {
        const oLeft = this.middleX - 8 + chargePos.left;
        const oTop = this.middleY - 266 + chargePos.top;
        const top = oTop - chargePos.top * ratio * 0.85;
        if ( top < rodPos.top &&  top > this.middleY - 225) {
            return {left: oLeft, top: rodPos.top};
        }
        if (top > this.middleY - 225) {
            // 导体帮在远离，并且最近位置到达离开小球的位置
            return {left: oLeft, top};
        } else if (charge.top <= this.middleY - 225 || top <= rodPos.top) {
            // 判断电荷是否进入小球内部了
           return this.calcTopChargePosition(rodPos, chargePos, ratio, charge);
        }
        return {left: oLeft, top};
    }

    /**
     * 金属箔片电荷位置计算
     * @param rodPos 导体棒位置
     * @param point 电荷位置
     * @param ratio 移动比率
     * @param angle 偏移角度
     */
    private calcBottomChargePosition(rodPos: IPositon, chargePos: IPositon, ratio: number, angle: number, charge: fabric.Group) {
        const nAngle = chargePos.type === 1 ? angle : -angle;
        if (charge.top < this.middleY - 125) {
            return this.calcCenterChargePosition(rodPos, chargePos, ratio, charge);
        }
        const position = this.calcCenterChargePosition(rodPos, chargePos, ratio, charge);
        const point = this.pointRotate({
            left: this.middleX,
            top: this.middleY - 125
        }, position, nAngle);
        return point;
    }

    /**
     * 计算点按照圆心旋转一定角度后的坐标
     * @param center 圆心坐标
     * @param point 原点坐标
     * @param angle 旋转角度
     */
    private pointRotate(center: IPositon, point: IPositon, angle: number) {
        const radian = angle * Math.PI / 180;
        const left = (point.left + 8 - center.left) * Math.cos(radian) + (point.top + 8 - center.top) * Math.sin(radian) + center.left - 8;
        const top = (point.top + 8 - center.top) * Math.cos(radian) - (point.left + 8 - center.left) * Math.sin(radian) + center.top - 8;
        return {left, top};
    }

    /**
     * 重置金属箔片和负电荷位置
     */
    private restFoilAndNegativeChargePostion() {
        this.resetChargePosition(this.topCharges, this.topChargePosition);
        this.resetChargePosition(this.centerCharges, this.centerChargePosition);
        this.resetChargePosition(this.bottomCharges, this.bottomChargePosition);
        this.leftFoil.set('angle', 0);
        this.rightFoil.set('angle', 0);
    }

    /**
     *  重置电荷位置
     * @param charges 需要重置的电荷
     * @param postion 重置后的位置
     */
    private resetChargePosition(charges: fabric.Group[], postion: IPositon[]) {
        charges.forEach(charge => {
            const pos = postion[charge.data];
            charge.set('left', this.middleX - 8 + pos.left);
            charge.set('top', this.middleY - 266 + pos.top);
        });
    }


    /**
     * 重置
     */
    reset() {
        if (this.tipText.visible) {
            return;
        }
        this.tipText.visible = true;
        this.restFoilAndNegativeChargePostion();
        this.conductorRod.set({
            left: this.middleX + 260,
            top: this.middleY - 230
        });
        this.conductorRod.setCoords();

        this.canvas.renderAll();
    }


    /**
     * 窗口重置
     */
    resize() {
        const middleX = this.middleX;
        const middleY = this.middleY;
        //设置 canvas相关参数
        this.scaleValue = new ScaleValue();
        this.canvas.setWidth(window.innerWidth);
        this.canvas.setHeight(window.innerHeight);
        this.canvas.setZoom(this.scaleValue.scale);
        this.middleX = this.canvas.getWidth() / this.scaleValue.scale / 2;
        this.middleY = this.canvas.getHeight() / this.scaleValue.scale / 2;
        this.canvas.getObjects().forEach(obj => {
            obj.left = obj.left - middleX + this.middleX;
            obj.top = obj.top - middleY + this.middleY;
            obj.setCoords();
        });
        this.dragRange = {
            minLeft: this.middleX + 30,
            maxLeft: this.middleX + 318,
            minTop: this.middleY - 284,
            maxTop: this.middleY - 206
        };
        this.canvas.renderAll();
    }


    /**
     * 创建圆
     * @param radius 宽度
     * @param fill 填充颜色
     */
    private createCircle(radius: number, fill: string = '#FFFFFF', opacity: number = 1): fabric.Circle {
        return new fabric.Circle({
            radius,
            fill,
            opacity,
            originX: 'center',
            originY: 'center'
        });
    }

    /**
     * 创建矩形
     * @param width 宽度
     * @param height 高度
     * @param fill 填充颜色
     */
    private createRect(width: number, height: number, fill: string = '#FFFFFF', borderRadius: number = 0): fabric.Rect {
        return new fabric.Rect({
            width, 
            height, 
            fill,
            rx: borderRadius,
            ry: borderRadius,
            originX: 'center',
            originY: 'center' 
        });
    }

    /**
     * 加载图片
     * @param src 图片路径
     * @param imageConfig 图片配置属性
     */
    private loadImage(src: string, imageConfig: fabric.IImageOptions): Promise<fabric.Image> {
        return new Promise<fabric.Image>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const imgObj = new fabric.Image(img, imageConfig);
                resolve(imgObj);
            };
            img.src = src;
        });
    }

}

export class ScaleValue {
    public scale: number;
    constructor() {
        const ratio = window.innerWidth / window.innerHeight;
        this.scale = window.innerWidth / 1200;
        if (ratio > (16 / 9)) {
            this.scale = (window.innerHeight * 16 / 9) / 1200;
        }
    }
}
