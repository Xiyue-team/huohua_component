/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/26 10:47
 */
import { CommonViewHandler } from "../../../../src/core/CommonViewHandler";
var jxg = require("../../../../src/libs/jsxgraphcore.js");
/**
 *
 * 1、创建坐标轴
 * 2、写标题
 * 3、画出横轴上的线段，限定不可动
 * 4、画出第一象限内的线段，限定起始点不可动，终点可绕轨迹移动
 * 5、画出两条线段的夹角，扇形角可随着可移动线变大变小
 * 6、给按钮绑定事件，显示隐藏坐标轴
 * 7、给终点绑定事件，移动时状态栏显示角度
 *
 */
export class JsxViewHandler extends CommonViewHandler {
    constructor(vm) {
        super(vm);
    }
    domReady() {
        super.domReady();
        this.init();
    }
    init() {
        this.initBoard();
        this.createText();
        this.drawLine();
        this.drawSector();
        this.XYAxes();
        this.createAxisScale();
    }
    // 写状态栏文字及角度数
    createText() {
        document.getElementById("statusBar").innerText = "正角";
        this.angleTxet = this.board.create('text', [1.3, 0.8, '45°'], { fontSize: 24, strokeColor: '#3494E9', fixed: 'true', highlight: false, });
    }
    //创建坐标系用于将所有元素放在坐标系上,坐标系隐藏
    initBoard() {
        jxg.Options.axis.ticks.majorHeight = 0;
        jxg.Options.axis.ticks.insertTicks = false;
        //1、创建坐标系
        this.board = JXG.JSXGraph.initBoard('box', { axis: false,
            boundingbox: [-11, 11, 11, -11],
            showcopyright: false,
            showNavigation: false,
            grid: false,
            keepAspectRatio: true,
            pan: { enabled: false },
            zoom: {
                pinchHorizontal: false,
                pinchVertical: false,
                pinchSensitivity: 1,
                min: 2,
                max: 0,
                wheel: true,
                needShift: true
            },
        });
    }
    //创建xy轴用于显示隐藏坐标系
    XYAxes() {
        // let enableAxis = this.viewModel.$data.enableAxis;
        this.xaxis = this.board.create('arrow', [[-10, 0], [10, 0]], { strokeWidth: 4, strokeColor: '#000000', fixed: true, highlight: false, visible: false, layer: 5 });
        this.yaxis = this.board.create('arrow', [[0, -10], [0, 10]], { strokeWidth: 4, strokeColor: '#000000', fixed: true, highlight: false, visible: false, layer: 5 });
    }
    //坐标轴上的刻度
    createAxisScale() {
        let strokeColor = "#000000";
        this.arrayAxisScale = [];
        let i;
        let j = -8;
        for (i = 0; i < 9; i++) {
            this.arrayAxisScale[i] = this.board.create('line', [[j, 0], [j, 0.2]], { strokeWidth: 2, strokeColor: strokeColor, fixed: true, straightFirst: false, straightLast: false, layer: 5, highlight: false, visible: false });
            j += 2;
        }
        let k = -8;
        for (i = 9; i < 18; i++) {
            this.arrayAxisScale[i] = this.board.create('line', [[0, k], [0.2, k]], { strokeWidth: 2, strokeColor: strokeColor, fixed: true, straightFirst: false, straightLast: false, layer: 5, highlight: false, visible: false });
            k += 2;
        }
        this.arrayAxisScale[18] = this.board.create('text', [1.8, -0.5, "1"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.arrayAxisScale[19] = this.board.create('text', [3.8, -0.5, "2"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.arrayAxisScale[20] = this.board.create('text', [5.8, -0.5, "3"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.arrayAxisScale[21] = this.board.create('text', [7.8, -0.5, "4"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.arrayAxisScale[22] = this.board.create('text', [-0.7, 2, "1"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.arrayAxisScale[23] = this.board.create('text', [-0.7, 4, "2"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.arrayAxisScale[24] = this.board.create('text', [-0.7, 6, "3"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.arrayAxisScale[25] = this.board.create('text', [-0.7, 8, "4"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.arrayAxisScale[26] = this.board.create('text', [-2.2, -0.5, "-1"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.arrayAxisScale[27] = this.board.create('text', [-4.2, -0.5, "-2"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.arrayAxisScale[28] = this.board.create('text', [-6.2, -0.5, "-3"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.arrayAxisScale[29] = this.board.create('text', [-8.2, -0.5, "-4"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.arrayAxisScale[30] = this.board.create('text', [-1, -2, "-1"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.arrayAxisScale[31] = this.board.create('text', [-1, -4, "-2"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.arrayAxisScale[32] = this.board.create('text', [-1, -6, "-3"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.arrayAxisScale[33] = this.board.create('text', [-1, -8, "-4"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.arrayAxisScale[34] = this.board.create('text', [10, 1, "x"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.arrayAxisScale[35] = this.board.create('text', [-1, 10, "y"], { fixed: true, fontsize: 24, highlight: false, visible: false });
        this.board.create('group', this.arrayAxisScale, { fixed: true });
    }
    // 画两条线段夹角
    drawLine() {
        //2、画出横轴上的线段，限定不可动s
        //起始点
        this.startPoint = this.board.create('point', [0, 0], { name: '', size: 3, fixed: true, visible: false });
        //横轴上线段的终点
        this.endPointX = this.board.create('point', [8.5, 0], { name: '', size: 3, fixed: true, visible: false });
        //起始点和终点的连线
        this.board.create('line', [this.startPoint, this.endPointX], { straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: '#FF5D00', layer: 7, highlight: false });
        //3、画出第一象限内的线段，限定起始点不可动，终点可绕轨迹移动
        //创建点移动轨迹圆
        //轨迹圆的圆心点
        let circleCenter = this.board.create('point', [0, 0], { fixed: true, visible: false });
        //画轨迹圆
        this.circle = this.board.create('circle', [circleCenter, [5, 5]], { visible: false });
        //画可移动点
        this.endPoint = this.board.create('glider', [5, 5, this.circle], { name: '', size: 9, showInfobox: false, face: "o", strokeColor: "#C0C0C0", fillColor: '#FFFFFF', highlight: false });
        //画原点和可移动点的连线
        this.line = this.board.create('line', [this.startPoint, this.endPoint], { straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: '#0094FF', highlight: false, });
        //画螺旋角
        this.curve = this.board.create('curve', [[0], [0]], { strokecolor: '#1B8b72', strokeWidth: 2 });
        //给移动点绑定事件鼠标移上样式变成小手
        this.endPoint.on('mouseover', () => { document.body.style.cursor = 'pointer'; });
        //给移动点绑定事件鼠标离开样式还原
        this.endPoint.on('mouseout', () => { document.body.style.cursor = 'default'; });
        //声明移动点初始坐标 用于计算移动点顺时针还是逆时针旋转
        let start = [5, 5];
        //给移动点绑定拖动事件
        this.endPoint.on('drag', () => {
            let duration = this.duration(this.startPoint, start, this.endPoint);
            //限定只能顺时针旋转
            if (duration >= 0) {
                this.endPoint.moveTo([5, 5]);
            }
            else {
                this.endPoint.moveTo([5, 5]);
            }
            start = [this.endPoint.X(), this.endPoint.Y()];
        });
    }
    //画扇形角
    drawSector() {
        //4、画出两条线段的夹角，扇形角
        // 画扇形角在横轴线段上的点 起点
        this.startSector = this.board.create('point', [Math.sqrt(2), 0], { fixed: true, visible: false });
        // 画扇形角在可移动线上的点  终点
        this.endSector = this.board.create('glider', [1, 1, this.line], { fixed: true, visible: false });
        //画扇形角
        this.sector = this.board.create('sector', [this.startPoint, this.startSector, this.endSector], { strokeWidth: 2, strokeColor: '#1B8b72', fillColor: '#75B9AA', fillOpacity: 0.6, highlight: false });
    }
    //正角
    positive() {
        this.endPoint.remove();
        this.line.remove();
        this.sector.remove();
        //画可移动点
        this.endPoint = this.board.create('glider', [5, 5, this.circle], { name: '', size: 9, showInfobox: false, face: "o", strokeColor: "#C0C0C0", fillColor: '#FFFFFF', highlight: false });
        //画原点和可移动点的连线
        this.line = this.board.create('line', [this.startPoint, this.endPoint], { straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: '#0094FF', highlight: false });
        console.log(this.angleTxet.Y());
        if (this.angleTxet.Y() < 0) {
            this.angleTxet.remove();
            this.angleTxet = this.board.create('text', [1.3, 0.8, '45°'], { fontSize: 24, strokeColor: '#3494E9', fixed: 'true', highlight: false });
        }
        else {
            this.angleTxet.setText("45°");
        }
        document.getElementById("statusBar").innerText = "正角";
        //声明移动点初始坐标 用于计算移动点顺时针还是逆时针旋转
        let start = [5, 5];
        //声明移动点初始角度 用于计算移动点旋转圈数
        this.lastAngle = 45;
        //旋转圈数
        let n = 0; //旋转圈数
        //画螺旋角
        this.curve.remove();
        this.curve = this.board.create('curve', [[0], [0]], { strokecolor: '#1B8b72', strokeWidth: 2, highlight: false });
        this.curve.updateDataArray = function () {
            let x = [0];
            let y = [0];
            let angle = 45 / 180 * Math.PI;
            for (var t = 0; t <= angle; t = t + 0.1) {
                x.push(Math.pow(t, 1 / 2) * Math.cos(t));
                y.push(Math.pow(t, 1 / 2) * Math.sin(t));
            }
            this.dataX = x;
            this.dataY = y;
        };
        this.board.update();
        //给小球绑定事件逆时针旋转
        this.endPoint.on('drag', () => {
            let duration = this.duration(this.startPoint, start, this.endPoint);
            //限定只能逆时针旋转
            if (duration < 0) {
                this.endPoint.moveTo([start[0], start[1]]);
            }
            start = [this.endPoint.X(), this.endPoint.Y()];
            this.angle = this.getAngle() + n * 360;
            //判断旋转圈数
            if (this.angle - this.lastAngle < 0) {
                n += 1;
            }
            //限定最大只能旋转到1080度
            if (this.angle >= 1080) {
                this.endPoint.moveTo([Math.sqrt(50), 0]);
                this.angle = 1080;
            }
            this.lastAngle = this.angle;
            let currentAngle = this.angle;
            //角度数
            this.angleTxet.setText(this.angle.toString() + "°");
            this.curve.updateDataArray = function () {
                let x = [0];
                let y = [0];
                let angle = currentAngle / 180 * Math.PI;
                for (var t = 0; t <= angle; t = t + 0.07) {
                    x.push(Math.pow(t, 1 / 2) * Math.cos(t));
                    y.push(Math.pow(t, 1 / 2) * Math.sin(t));
                }
                this.dataX = x;
                this.dataY = y;
            };
            this.board.update();
        });
    }
    //负角
    negative() {
        this.endPoint.remove();
        this.line.remove();
        this.sector.remove();
        this.angleTxet.remove();
        //画可移动点
        this.endPoint = this.board.create('glider', [5, -5, this.circle], { name: '', size: 9, showInfobox: false, face: "o", strokeColor: "#C0C0C0", fillColor: '#FFFFFF', highlight: false, });
        //画原点和可移动点的连线
        this.line = this.board.create('line', [this.startPoint, this.endPoint], { straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: '#0094FF', highlight: false, });
        this.angleTxet = this.board.create('text', [1.2, -1, '-45°'], { fontSize: 24, strokeColor: '#3494E9', fixed: 'true', highlightStrokeColor: '#3494E9', highlight: false, });
        document.getElementById("statusBar").innerText = "负角";
        //画螺旋角
        this.curve.remove();
        this.curve = this.board.create('curve', [[0], [0]], { strokecolor: '#1B8b72', strokeWidth: 2 });
        this.curve.updateDataArray = function () {
            let x = [0];
            let y = [0];
            let angle = -45 / 180 * Math.PI;
            for (var t = 0; t >= angle; t = t - 0.1) {
                x.push(Math.pow(-t, 1 / 2) * Math.cos(t));
                y.push(Math.pow(-t, 1 / 2) * Math.sin(t));
            }
            this.dataX = x;
            this.dataY = y;
        };
        this.board.update();
        //声明移动点初始坐标 用于计算移动点顺时针还是逆时针旋转
        let start = [5, 5];
        //声明移动点初始角度 用于计算移动点旋转圈数
        this.lastAngle = 45;
        //旋转圈数
        let n = 0; //旋转圈数
        // 给小球绑定事件顺时针旋转
        this.endPoint.on('drag', () => {
            let duration = this.duration(this.startPoint, start, this.endPoint);
            //限定只能顺时针旋转
            if (duration >= 0) {
                this.endPoint.moveTo([start[0], start[1]]);
            }
            start = [this.endPoint.X(), this.endPoint.Y()];
            this.angle = this.getAngle() + n * 360;
            //判断旋转圈数
            if (this.angle - this.lastAngle >= 180) {
                n -= 1;
            }
            this.angle = this.getAngle() + n * 360;
            //限定最大只能旋转到1080度
            if (this.angle <= -1080) {
                this.endPoint.moveTo([Math.sqrt(50), 0]);
                this.angle = -1080;
            }
            this.angleTxet.setText(this.angle.toString() + "°");
            this.lastAngle = this.angle;
            let currentAngle = this.angle;
            this.curve.updateDataArray = function () {
                let x = [0];
                let y = [0];
                let angle = currentAngle / 180 * Math.PI;
                for (var t = 0; t > angle; t = t - 0.07) {
                    x.push(Math.pow(-t, 1 / 2) * Math.cos(t));
                    y.push(Math.pow(-t, 1 / 2) * Math.sin(t));
                }
                this.dataX = x;
                this.dataY = y;
            };
            this.board.update();
        });
    }
    //零角
    zeroAngle() {
        this.endPoint.remove();
        this.line.remove();
        this.sector.remove();
        this.angleTxet.remove();
        //画可移动点
        this.endPoint = this.board.create('glider', [Math.sqrt(50), 0, this.circle], { name: '', size: 9, showInfobox: false, face: "o", strokeColor: "#C0C0C0", fillColor: '#FFFFFF', highlight: false, });
        //画原点和可移动点的连线
        this.line = this.board.create('line', [this.startPoint, this.endPoint], { straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: '#0094FF', highlight: false, });
        this.angleTxet = this.board.create('text', [1.3, 0.8, '0°'], { fontSize: 24, strokeColor: '#3494E9', fixed: 'true', highlight: false, });
        document.getElementById("statusBar").innerText = "零角";
        //画螺旋角
        this.curve.remove();
        this.curve = this.board.create('curve', [[0], [0]], { strokecolor: '#1B8b72', strokeWidth: 2 });
        let start = [Math.sqrt(50), 0];
        this.endPoint.on('drag', () => {
            let duration = this.duration(this.startPoint, start, this.endPoint);
            //限定只能顺时针旋转
            if (duration >= 0) {
                this.endPoint.moveTo([Math.sqrt(50), 0]);
            }
            else {
                this.endPoint.moveTo([Math.sqrt(50), 0]);
            }
            start = [this.endPoint.X(), this.endPoint.Y()];
        });
    }
    //判断顺时针还是逆时针旋转
    duration(point1, point2, point3) {
        // point1:圆心,point2:起始点,point3:终点
        var sp = (point1.X() - point3.X()) * (point2[1] - point3.Y()) - (point1.Y() - point3.Y()) * (point2[0] - point3.X());
        if (sp > 0.5) { //顺时针
            return 1;
        }
        else if (sp < 0) { //逆时针
            return -1;
        }
        else {
            return 0;
        }
    }
    //获取角度
    getAngle() {
        let start = {
            x: 0,
            y: 0
        };
        let end = {
            x: this.endPoint.X(),
            y: this.endPoint.Y()
        };
        let angle = this.getRotate(start, end);
        return angle;
    }
    //计算旋转角度
    getRotate(start, end) {
        var x = Math.abs(end.x - start.x);
        var y = Math.abs(end.y - start.y);
        var z = Math.sqrt(x * x + y * y);
        if (z != 0) {
            var rotat = Math.round((Math.asin(y / z) * 180 / Math.PI));
        }
        else {
            rotat = 0;
        }
        if (end.x < 0 && end.y > 0) {
            rotat = 180 - rotat;
        }
        else if (end.x < 0 && end.y < 0) {
            rotat = 180 + rotat;
        }
        else if (end.x > 0 && end.y < 0) {
            rotat = 360 - rotat;
        }
        return rotat;
    }
    // 显示隐藏XY轴
    show(value) {
        this.xaxis.setAttribute({ visible: value });
        this.yaxis.setAttribute({ visible: value });
        for (let i = 0; i < this.arrayAxisScale.length; i++) {
            this.arrayAxisScale[i].setAttribute({ visible: value });
        }
        this.board.update();
    }
    resize() {
        let width = document.getElementById("box").style.width;
        let height = document.getElementById("box").style.height;
        this.board.setBoundingBox([-12, 12, 12, -12], true);
    }
    reset() {
        //还原控制栏
        // this.viewModel.$data.angleDirection = null;
        // this.viewModel.$data.switchOption.value = false;
        //还原角度文字
        if (this.viewModel.$data.angleDirection == -1) {
            this.angleTxet.remove();
            this.angleTxet = this.board.create('text', [1.3, 0.8, '45°'], { fontSize: 24, strokeColor: '#3494E9', fixed: 'true', highlight: false });
        }
        else {
            //角度数
            this.angleTxet.setText("45°");
        }
        this.endPoint.remove();
        this.line.remove();
        this.sector.remove();
        //画可移动点
        this.endPoint = this.board.create('glider', [5, 5, this.circle], { name: '', size: 9, showInfobox: false, face: "o", strokeColor: "#C0C0C0", fillColor: '#FFFFFF', highlight: false });
        //画原点和可移动点的连线
        this.line = this.board.create('line', [this.startPoint, this.endPoint], { straightFirst: false, straightLast: false, strokeWidth: 4, strokeColor: '#0094FF', highlight: false });
        document.getElementById("statusBar").innerText = "正角";
        //画扇形角
        this.sector = this.board.create('sector', [this.startPoint, this.startSector, this.endSector], { strokeWidth: 2, strokeColor: '#1B8b72', fillColor: '#75B9AA', fillOpacity: 0.6, highlight: false });
        //画螺旋角
        this.curve.remove();
        this.curve = this.board.create('curve', [[0], [0]], { strokecolor: '#1B8b72', strokeWidth: 2 });
        let start = [5, 5];
        //给移动点绑定拖动事件
        this.endPoint.on('drag', () => {
            let duration = this.duration(this.startPoint, start, this.endPoint);
            //限定只能顺时针旋转
            if (duration >= 0) {
                this.endPoint.moveTo([5, 5]);
            }
            else {
                this.endPoint.moveTo([5, 5]);
            }
            start = [this.endPoint.X(), this.endPoint.Y()];
        });
    }
}
//# sourceMappingURL=JsxViewHandler.js.map