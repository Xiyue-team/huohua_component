import {fabric} from 'fabric';

const resistance = require('../sub_static/resistance.png');
const pick = require('../sub_static/pick.png');
export class Hdbzq2dModel {
    private canvas: fabric.Canvas; // 场景
    private pick: fabric.Image;          // 滑块
    private pickGroup: fabric.Group;     // 滑块组
    private upBox: fabric.Rect;          // 上接入电阻
    private downBox: fabric.Rect;        // 下接入电阻
    private wireLine1: fabric.Path;      // 正极
    private wireLine2: fabric.Path;    // 负极
    private tipGroup: fabric.Group;      // 首次显示提示文字

    private type = 1;                       // 接线方式 1:A、B, 2:B、D, 3:B、C, 4: A、D, 5: A、C, 6:C、D

    private showTip = true;                 // 是否显示提示文字

    private scaleValue = new ScaleValue();  // 场景缩放比例
    private left: number;
    private top: number;
    
    /**
     * 构造函数
     * @param {string} container 载体 html容器ID
     */
    constructor(container: string) {
        console.log('init Simple2DModel constructor');
        this.initStage(container);
        this.initLayer();
    }
    /**
     * 初始化场景
     * @param container  载体 html容器ID
     */
    private initStage(container: string) {
        this.canvas = new fabric.Canvas(container, {selection: false, preserveObjectStacking: true});
        this.canvas.setHeight(window.innerHeight);
        this.canvas.setWidth(window.innerWidth);
        this.canvas.setZoom(this.scaleValue.scale);
        this.left  = (this.canvas.getWidth() - 1280 * this.scaleValue.scale) * 0.5 / this.scaleValue.scale;
        this.top  = (this.canvas.getHeight() - 493 * this.scaleValue.scale) * 0.5  / this.scaleValue.scale;
    }

    /**
     * 初始化展示图层
     */
    private initLayer() {
        this.showTip = true;
        // 创建仪表背景图片
        fabric.Image.fromURL(resistance, (oImg: fabric.Image) => {
            this.canvas.add(oImg);
            // 背景加载完成再画指针，否则图片后来加载遮挡指针显示
            this.initTipGroup();
            this.initPick();
        }, {
            left: this.left,
            top: this.top,
            width: 1280,
            height: 493,
            evented: false,
            selectable: false
        });
        // A B C D接线柱文字
        const aText = new fabric.Text('A', {
            left: this.left + 280,
            top: this.top + 340,
            text: 'A',
            fontSize: 40,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: 'black',
            selectable: false
        });
        const bText = new fabric.Text('B', {
            left: this.left +  970,
            top: this.top + 340,
            text: 'B',
            fontSize: 40,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: 'black',
            selectable: false
        });
        const cText = new fabric.Text('C', {
            left: this.left +  100,
            top: this.top + 0,
            text: 'C',
            fontSize: 40,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: 'black',
            selectable: false
        });
        const dText = new fabric.Text('D', {
            left: this.left +  1150,
            top: this.top + 0,
            fontSize: 40,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: 'black',
            selectable: false
        });
        this.canvas.add(aText, bText, cText, dText);
    }
    /**
     * 初始化提示文字组
     */
    private initTipGroup() {
        const tipText = new fabric.Text(window.env.browserInfo.lang.pickTip, {
            left: 140,
            top: 40,
            fontSize: 36,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: 'black'
        });
        // 提示线
        const tipLine = new fabric.Line([ 0, 120, 150, 120], {
            left: 0,
            top: 150,
            stroke: '#999999',
            strokeWidth: 2,
            angle: 330
        });
        this.tipGroup = new fabric.Group([ tipText, tipLine ], {
            left: this.left + 600,
            top: this.top - 80,
            selectable: false
        });
        this.canvas.add(this.tipGroup);
    }
    
    /**
     * 初始化接入电阻盒子
     */
    private initConductorBox() {
        this.upBox = new fabric.Rect({
            left: 0,
            top: this.top + 86,
            width: 0,
            height: 15,
            fill: '#c51d1d',
            opacity: 0.7,
            selectable: false
        });
        this.canvas.add(this.upBox);

        this.downBox = new fabric.Rect({
            left: 0,
            top: this.top + 143,
            width: 0,
            height: 156,
            fill: '#c51d1d',
            opacity: 0.7,
            selectable: false
        });
        this.canvas.add(this.downBox);
    }

    /**
     * 初始化滑动变阻器滑块
     */
    private initPick(isInitOther: boolean  = true) {
        const pText = new fabric.Text('P', {
            left: 40,
            top: -70,
            fontSize: 40,
            fontFamily: 'SourceHanSansSC-Medium',
            fill: 'black',
            selectable: false
        });
        
        fabric.Image.fromURL(pick, (oImg: fabric.Image) => {
            this.pick = oImg;
            this.pick.selectable = false;
            this.pickGroup = new fabric.Group([ this.pick, pText ], {
                left: this.left + 480,
                top: this.top - 40,
                hasControls: false,
                hasBorders: false,
                hasRotatingPoint: false,
                hoverCursor: 'pointer',
                lockMovementY: true
            });
            // P移动事件
            this.pickGroup.on('moving', (e: fabric.IEvent) => {
                const obj = e.target;
                const minX = 340;
                const maxX = 820;
                this.removeTipTitle();
                const x = this.left;
                const y = this.top - 70;
                if (obj.left < minX + x) {
                    obj.left = minX + x;
                } else if (obj.left > maxX + x) {
                    obj.left = maxX + x;
                }
                this.setMarkArea();
            });
            if (isInitOther) {
                this.initConductorBox();
                this.initConductor();
    
                this.setMarkArea();
            }
            // 最后添加，防止出现遮挡
            this.canvas.add(this.pickGroup);
        }, {
            width: 118,
            height: 203
        });
    }

    /**
     * 移除 滑块上的提示文字
     */
    private removeTipTitle() {
        if (this.showTip) {
            this.tipGroup.visible = false;
            this.showTip = !this.showTip;
        }
    }

    /**
     * 初始化初始接线方式
     */
    private initConductor() {
        const config = {
            fill: '',
            stroke: 'red', 
            strokeWidth: 8 
        };
        // 导线1
        this.wireLine1 = new fabric.Path('M 0, 0 S 10, 60, 200, 80', config);
        this.canvas.add(this.wireLine1);

        // 导线2
        this.wireLine2 = new fabric.Path('M 200, 0 S 200, 60, 0, 80', config);
        this.canvas.add(this.wireLine2);
        this.setConductor();
    }

    /**
     * 根据接线方式设置导线位置 1:A、B, 2:B、D, 3:B、C, 4: A、D, 5: A、C, 6:C、D
     */
    setConductor() {
        switch (this.type) {
            case 1:
                this.setConductorPositon(915, 359, 155, 359);
                break;
            case 2:
                this.setConductorPositon(1075, 100, 715, 359);
                break;
            case 3:
                this.setConductorPositon(915, 359, 0, 100);
                break;
            case 4:
                this.setConductorPositon(1075, 100, 158, 359);
                break;
            case 5:
                this.setConductorPositon(357, 359, 0, 100);
                break;
            case 6:
                this.setConductorPositon(1075, 100, 0, 100);
                break;
        }
    }

    /**
     * 根据接线方式设置接入电阻
     */
    setMarkArea() {
        const x = this.pickGroup.left;
        const dis = this.pick.width / 2;
        switch (this.type) {
            case 1:
                this.setConductionArea(this.left + 242, 0, this.left + 378, 522);
                break;
            case 2:
                this.setConductionArea(x + dis, 800 + this.left + 242 - x - dis, x + dis, 522 + this.left + 378  - x - dis);
                break;
            case 3:
                this.setConductionArea(this.left + 242, x - dis - 120 - this.left, x + dis, 522 + this.left + 378 - x - dis);
                break;
            case 4:
                this.setConductionArea(x + dis, 800 + this.left + 242 - x - dis, this.left + 378, x - dis - 260 - this.left);
                break;
            case 5:
                this.setConductionArea(this.left + 242, x - dis - 120 - this.left, this.left + 378, x - dis - 260 - this.left);
                break;
            case 6:
                this.setConductionArea(this.left + 242, 800, this.left + 378, 0);
                break;
        }
    }
    /**
     * 设置接入电阻面积
     * @param ux 上接入电阻X位置
     * @param uw 上接入宽度
     * @param dx 下接入电阻X位置
     * @param dw 下接入宽度
     */
    setConductionArea(ux: number, uw: number, dx: number, dw: number) {
        this.upBox.set({left: Math.round(ux), width: Math.round(uw)});
        this.downBox.set({left: Math.round(dx), width: Math.round(dw)});
    }

    /**
     * 设置导线位置导线的位置
     * @param cx 负极X位置
     * @param cy 负极Y位置
     * @param ax 正极X位置
     * @param ay 正极Y位置
     */
    setConductorPositon(cx: number, cy: number, ax: number, ay: number) {
        this.wireLine1.left = this.left + cx;
        this.wireLine1.top = this.top + cy;
        this.wireLine2.left = this.left + ax;
        this.wireLine2.top = this.top + ay;
    }


    /**
     * 设置接线方式
     * @param type 接线方式 1:A、B, 2:B、D, 3:B、C, 4: A、D, 5: A、C, 6:C、D
     */
    switchConductor(type?: number) {
        this.removeTipTitle();
        if (type) {
            this.type = type;
        } else {
            if (this.type === 6 ) {
                this.type = 1;
            } else {
                this.type++;
            }
        }
        this.setConductor();
        this.setMarkArea();
        this.canvas.renderAll();
    }

    /**
     * 重置场景
     */
    reset() {
        // this.pickGroup.set({
        //     left: this.left + 480,
        //     top: this.top - 40
        // });
        this.switchConductor(1);
        if (!this.showTip) {
            this.showTip = !this.showTip;
            this.tipGroup.visible = this.showTip;
        }
        this.canvas.remove(this.pickGroup);
        this.initPick(false);
    }

}

export class ScaleValue {
    scale = window.innerWidth / 1920;
}
