import { PointCharge } from './PointCharge';
import { Position } from './Position';
import { default as Konva, SizeConfig } from 'konva';

const negativeCharge = require('../sub_static/negative_charge.png');
const positiveCharge = require('../sub_static/positive_charge.png');

export class Dhdc2dModel {
    private stage: Konva.Stage;
    private lineLayer: Konva.Layer;
    private chargeLayer: Konva.Layer;
    private tipLayer: Konva.Layer;
    private ctx: CanvasRenderingContext2D;
    private chargeArray: PointCharge[] = []; // 电荷数组
    private currentChargeId = 1000; // 当前电荷编号
    // 静电力常量
    private electrostaticForce = 9 * Math.pow(10, 9); 
    private scaleValue = new ScaleValue();  // 场景缩放比例
    private tip: Konva.Text;                // 提示文字

    // 每个线段长度
    private distanceLine = 1;


    private  minX = -20;    //最小X点坐标
    private minY = -20;     //最小Y点坐标
    private maxX: number;   //最大X点坐标
    private maxY: number;   //最大Y点坐标

    /**
     * 
     * @param {string} container 载体
     */
    constructor(container: string) {
        console.log('init Dlxcyl2DModel constructor');
        this.initStage(container);
        this.initLayer();
        this.chargeArray.push(new PointCharge(10, {
            x: this.stage.width() / 4,
            y: this.stage.height() / 2
        }, -1, this.currentChargeId++));
        this.chargeArray.push(new PointCharge(10, {
            x: this.stage.width() * 3 / 4,
            y: this.stage.height() / 2
        }, 1, this.currentChargeId++));
        this.initialize();
    }
    /**
     * 初始化舞台
     * @param container 容器
     */
    private initStage(container: string) {
        Konva.pixelRatio = window.devicePixelRatio;
        const dom = document.getElementById(container);
        const width = dom.clientWidth;
        const height = dom.clientHeight;
        this.stage = new Konva.Stage({
            container,
            width: width,
            height: height
        });
        this.maxX = this.stage.width() + 20;
        this.maxY = this.stage.width() + 20;
    }

    private initLayer() {
        this.lineLayer = new Konva.Layer();
        this.chargeLayer = new Konva.Layer();
        this.tipLayer = new  Konva.Layer();
        this.stage.add(this.lineLayer).add(this.chargeLayer).add(this.tipLayer);

    }
    private initialize() {
        this.ctx = this.lineLayer.getCanvas().getContext();
        // 点电荷曲线
        this.drawChangeLines();
        this.drawCharge();
        this.drawTip();
    }

    /**
     * 绘制提示文字
     */
    private drawTip() {
        this.tip = new Konva.Text({
            y: this.stage.height() / 5,
            fontSize: 24 * this.scaleValue.scale,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: 'white',
            text: window.env.browserInfo.lang.tip
        });

        this.tip.setAttrs({
            x: (this.stage.width() - this.tip.width()) / 2
        });

        this.tipLayer.add(this.tip);
        this.tipLayer.draw();
    }

    private async drawCharge() {
        this.chargeLayer.removeChildren();
        const chargeArray = this.chargeArray;
        for (let i = 0; i < chargeArray.length; i++) {
            const currentElement = chargeArray[i];
            const position = currentElement.getPosition();
            let imgUrl = negativeCharge;
            if (currentElement.getPolarity() === 1) {
                imgUrl = positiveCharge;
            }
            const imageObj = new Image(60, 60);
            imageObj.onload = () => {
                const charge = new Konva.Circle({
                    id: currentElement.getId().toString(),
                    x: position.x,
                    y: position.y,
                    radius: 60,
                    scale: {x: 0.5, y: 0.5},
                    fillPatternImage: imageObj,
                    fillPatternOffset: { x: 60, y: 60 },
                    draggable: true,
                });
                charge.on('mouseover', () => {
                    document.body.style.cursor = 'pointer';
                });
                charge.on('mouseout', () => {
                    document.body.style.cursor = 'default';
                });
                charge.on('dragmove', (e) => {
                    this.tip.hide();
                    this.tipLayer.draw();
                    // 设置点的新坐标
                    const obj = this.getPositonAndJudgeIsDrage(e.currentTarget.id(), e.currentTarget.x(), e.currentTarget.y());
                    if (obj.isDrage) {
                        // 设置点的新坐标
                        this.chargeArray[obj.index].setPosition({x: Number(e.currentTarget.x()), y:  Number(e.currentTarget.y())});
                        this.drawChangeLines();
                    } else {
                        e.currentTarget.setAttrs({
                            x: obj.x,
                            y: obj.y
                        });
                    }
                });
                this.chargeLayer.add(charge);
                this.chargeLayer.draw();
            };
            imageObj.src = imgUrl;
            
        }
    }

    /**
     * 获取原始位置并判断是否可拖拽
     * @param id 
     * @param x 
     * @param y 
     */
    private getPositonAndJudgeIsDrage(id: string, x: number, y: number) {
        let isDrage = true;
        let charge = null;
        let index = 0;
        for (let i = 0; i < this.chargeArray.length; i++) {
            if (id === this.chargeArray[i].getId().toString()) {
                charge = this.chargeArray[i];
                index = i;
                continue;
            }
            const positon = this.chargeArray[i].getPosition();
            // 两个点电荷距离<60不允许拖拽
            if (this.calcPointDistance(x, y, positon.x, positon.y) < 40 || x < 10 
            || y < 10 || x > window.innerWidth - 10 || y > window.innerHeight - 10) {
                isDrage = false;
            }
        }
        return {x: charge.getPosition().x, y: charge.getPosition().y, isDrage, index};
    }

    /**
     * 计算两点距离
     * @param x1 点1x坐标
     * @param y1 点1y坐标 
     * @param x2 点2x坐标
     * @param y2 点2y坐标 
     */
    private calcPointDistance(x1: number, y1: number, x2: number, y2: number) {
        return Math.abs(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
    }

    /**
     * 设定电荷数为N
     * 起点为（x,y）终点为 (xz,yz)
     * 利用电场强度计算公式计算一个电荷在（x,y）的场强表达式 (xc, yc)
     * 由于多个电荷所以每个电荷的场强叠加，叠加后的场强为（xcn,ycn）
     * 令（xcn,ycn）单位化的一个步长（xs,ys）,从起点（x,y）出发，前进一个步长计算其坐标，与前一个坐标相连（每个30度画一个线）
     * 
     * 场强计算公式
     *  匀强电场中：E=U/d；
     *  E=kQ/(r*r)
     *  
     */
    private drawChangeLines() {
        this.lineLayer.clear();
        this.ctx.save();
        const chargeArray = this.chargeArray;
        // 初始角度 默认一个电荷从15度开始画
        let a0 = Math.PI / 12;
        /** 画每个电荷的电场线 */
        const lineColor = '#ffb653';
        const arrowColor = '#f3be59';
        const arrowStep = parseInt((200 * this.scaleValue.scale).toString()); // 生成箭头的步长
        for (let i = 0; i < chargeArray.length; i++) {
            const currentElement = chargeArray[i];
            const polarity = currentElement.getPolarity();
            const position = currentElement.getPosition();
            // 多个电荷使用向量角度就算初始角度
            if (chargeArray.length > 1) {
                a0 = this.calcStartAngle(currentElement);
            }
            for (let j = 0; j < 12; j++) {
                const $sm = a0 + j * Math.PI / 6;
                // 计算线段终点
                let startX = position.x + polarity * this.distanceLine * Math.cos($sm);
                let startY = position.y + polarity * this.distanceLine * Math.sin($sm);
                let e = this.calcElectricFieldStrength({x: startX, y: startY});
                // 计算改点到其他各点的电势
                let index = 0;
                while (this.isContinueDraw(i, startX, startY)) {
                    const endX = startX + polarity * this.distanceLine * e.fieldStrengthX / e.fieldStrength;
                    const endY = startY + polarity * this.distanceLine * e.fieldStrengthY / e.fieldStrength;
                    this.ctx.strokeStyle = lineColor;
                    this.ctx.beginPath();
                    this.ctx.moveTo(startX, startY);
                    this.ctx.lineTo(endX, endY);
                    this.ctx.stroke();
                    e = this.calcElectricFieldStrength({x: endX, y: endY});
                    index++; 
                    if (index === arrowStep) {
                        if (polarity === 1) {
                            this.drawArrow(startX, startY, endX, endY, arrowColor);
                        } else {
                            this.drawArrow(endX, endY, startX, startY, arrowColor);
                        }
                    }

                    startX = endX;
                    startY = endY;
                }
            }
        }
        this.ctx.restore();
    }
    /**
     * 判断是否继续画
     */
    private isContinueDraw(index: number, x: number, y: number) {
        // 计算点到其他电荷的距离 < 线段长度不用继续画线
        let flag = true;
        for (let i = 0; i < this.chargeArray.length; i++) {
            if (i === index) {
                continue;
            }
            const position = this.chargeArray[i].getPosition();
            const distance = this.calcPointDistance(x, y, position.x, position.y);
            if (distance < this.distanceLine) {
                flag = false;
                break;
            }
        }

        return (x >= this.minX && y >= this.minY && x <= this.maxX && y <= this.maxY) && flag; // 到达另外一个电荷则不绘制
    } 

    /**
     * 绘制线条箭头
     * @param fromX 
     * @param fromY 
     * @param toX 
     * @param toY 
     * @param color 
     */
    private drawArrow(fromX: number, fromY: number, toX: number, toY: number, color: string) {
        const angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI;
        const angle1 = (angle + 15) * Math.PI / 180;
        const angle2 = (angle - 15) * Math.PI / 180;
        const topX = 20 * Math.cos(angle1);
        const topY = 20 * Math.sin(angle1);
        const botX = 20 * Math.cos(angle2);
        const botY = 20 * Math.sin(angle2);
        this.ctx.beginPath();
        this.ctx.moveTo(toX + topX, toY + topY);
        this.ctx.lineTo(toX, toY);
        this.ctx.lineTo(toX + botX, toY + botY);
        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    /**
     * 
     * @param x 计算点在电场场强
     * @param y 
     */
    private calcElectricFieldStrength(point: Position) {
        const chargeArray = this.chargeArray;
        let fieldStrengthX = 0;
        let fieldStrengthY = 0;
        for (let i = 0; i < chargeArray.length; i++) {
            const currentElement = chargeArray[i];
            const position = currentElement.getPosition();
            const r = Math.sqrt((Math.pow((point.x - position.x), 2)) + (Math.pow((point.y - position.y), 2))); 
             //电场强度  E=kQ/(r*r)
            const e = this.electrostaticForce * currentElement.getChargeStrength() * currentElement.getPolarity() / (Math.pow(r, 2));
            fieldStrengthX += e * (point.x - position.x) / r;
            fieldStrengthY += e * (point.y - position.y) / r;
        }
        const fieldStrength = Math.sqrt((Math.pow(fieldStrengthX, 2)) + (Math.pow(fieldStrengthY, 2)));
        return {fieldStrength, fieldStrengthX, fieldStrengthY};
    }

    /**
     * 
     * @param x 计算点初始角度
     * @param y 
     */
    private calcStartAngle(element: PointCharge) {
        const chargeArray = this.chargeArray.filter(charge => {
            return charge.getId() !== element.getId();
        });
        const elePosition = element.getPosition();
        let pointX = 0;
        let pointY = 0;
        for (let i = 0; i < chargeArray.length; i++) {
            const currentElement = chargeArray[i];
            const currentPosition = currentElement.getPosition();
            pointX = pointX + (currentPosition.x - elePosition.x);
            pointY = pointY + (currentPosition.y - elePosition.y);
        }
        const atan = Math.atan2(pointY, pointX);
        const angle = atan * (180 / Math.PI);
        return (angle + 15) / (180 / Math.PI);
    }

    /**
     * 重置电荷
     */
    private resetCharge() {
        const charges = this.chargeLayer.getChildren();
        for (let i = 0; i < charges.length; i++) {
            const charge = charges[i];
            const chargePostion = this.chargeArray.filter(item => {
                return charge.getAttr('id') === item.getId().toString();
            })[0].getPosition();
            charge.setAttrs({
                x: chargePostion.x,
                y: chargePostion.y
            });
        }

        this.chargeLayer.draw();
        this.drawChangeLines();
    }



    /** 
     * 重置场景 
     */
    reset() {
        this.chargeArray[0].setPosition({
            x: this.stage.width() / 4,
            y: this.stage.height() / 2
        });
        this.chargeArray[1].setPosition({
            x: this.stage.width() * 3 / 4,
            y: this.stage.height() / 2
        });
        this.resetCharge();
        this.tip.show();
        this.tipLayer.draw();
    }

    /**
     * 封装加载konva图片
     * @param {any} src
     * @param {Konva.ImageConfig} imageConfig
     * @returns {Promise<Konva.Image>}
     */
    async loadImage(src: any, crop: SizeConfig): Promise<Konva.Image> {
        return new Promise<Konva.Image>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const imgObj = new Konva.Image({ image: img, crop });
                resolve(imgObj);
            };
            img.src = src;
        });
    }


    /**
     * 重置窗口大小
     */
    resize() {
        // 计算相对位置
        const scaleWidth = window.innerWidth / this.stage.getWidth();
        const scaleHeight = window.innerHeight / this.stage.getHeight();
        this.scaleValue.scale = window.innerWidth / 1200;
        this.stage.setWidth(window.innerWidth);
        this.stage.setHeight(window.innerHeight);

        this.maxX = this.stage.width() + 20;
        this.maxY = this.stage.width() + 20;
        this.chargeArray.forEach(charge => {
            const position = charge.getPosition();
            position.x = position.x * scaleWidth;
            position.y = position.y * scaleHeight;
            charge.setPosition(position);
        });
        this.resetCharge();

        this.tip.y(this.tip.y() * scaleHeight);
        this.tip.fontSize(this.tip.fontSize() * scaleWidth);
        this.tip.setAttrs({
            x: (this.stage.width() - this.tip.width()) / 2
        });

        this.tipLayer.draw();
    }
}

export class ScaleValue {
    scale = window.innerWidth / 1200;
}
