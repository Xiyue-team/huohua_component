import * as THREE from 'three';
import common from './CommonForThree';
export default class EsCenter {
    // 创建A/B/C 三个点
    private a_pos = [0, 40 * Math.tan(50 * Math.PI / 180) - 30, 0];
    private b_pos = [-40, -30, 0];
    private c_pos = [40, -30, 0];
    private textA = common.createText('A', [10, 35, 0]);
    private textB = common.createText('B', [-45, -30, 0]);
    private textC = common.createText('C', [45, -30, 0]);
    // 三边延长线两边上任一点的坐标
    private extendedPoint1 = [null, null, null];
    private extendedPoint2 = [null, null, null];
    private extendedPoint3 = [null, null, null];
    private extendedPoint4 = [null, null, null];
    private extendedPoint5 = [null, null, null];
    private extendedPoint6 = [null, null, null];
    // O1/O2/O3的坐标
    private O1_pos = [null, null, null];
    private O2_pos = [null, null, null];
    private O3_pos = [null, null, null];
    // 创建三角形三边
    private line_bc = common.drawUnitLine({ color: '#000', isDash: false });
    private line_ac = common.drawUnitLine({ color: '#000', isDash: false });
    private line_ab = common.drawUnitLine({ color: '#000', isDash: false });
    // 创建AB/AC/BC的延长虚线
    private line_aby = common.drawUnitLine({ color: '#000', isDash: true });
    private line_acy = common.drawUnitLine({ color: '#000', isDash: true });
    private line_bcy = common.drawUnitLine({ color: '#000', isDash: true });
    private line_bay = common.drawUnitLine({ color: '#000', isDash: true });
    private line_cay = common.drawUnitLine({ color: '#000', isDash: true });
    private line_cby = common.drawUnitLine({ color: '#000', isDash: true });
    //  作角A的旁心，创建角A的角平分线，角B/C的外角平分线
    private line_ao1 = common.drawUnitLine({ color: '#000', isDash: false });
    private line_bo1 = common.drawUnitLine({ color: '#000', isDash: false });
    private line_co1 = common.drawUnitLine({ color: '#000', isDash: false });
    //  作角B的旁心，创建角B的角平分线，角C/A的外角平分线
    private line_ao2 = common.drawUnitLine({ color: '#000', isDash: false });
    private line_bo2 = common.drawUnitLine({ color: '#000', isDash: false });
    private line_co2 = common.drawUnitLine({ color: '#000', isDash: false });
    //  作角C的旁心，创建角C的角平分线，角B/A的外角平分线
    private line_ao3 = common.drawUnitLine({ color: '#000', isDash: false });
    private line_bo3 = common.drawUnitLine({ color: '#000', isDash: false });
    private line_co3 = common.drawUnitLine({ color: '#000', isDash: false });
    // 创建 放线段的六个组
    private o1LineGroup1 = new THREE.Group();
    private o1LineGroup2 = new THREE.Group();
    private o2LineGroup1 = new THREE.Group();
    private o2LineGroup2 = new THREE.Group();
    private o3LineGroup1 = new THREE.Group();
    private o3LineGroup2 = new THREE.Group();
    // 创建三个旁心位置组
    private groupO1Point = new THREE.Group;
    private groupO2Point = new THREE.Group;
    private groupO3Point = new THREE.Group;
    private innerPoint1 = common.drawCircle(2, { color: '#008CFF' });
    private innerPoint2 = common.drawCircle(2, { color: '#008CFF' });
    private innerPoint3 = common.drawCircle(2, { color: '#008CFF' });
    private textO1 = common.createText('O₁', [5, 4, 1]);
    private textO2 = common.createText('O₂', [5, 4, 1]);
    private textO3 = common.createText('O₃', [5, 4, 1]);
    // 创建三个不同旁心角平分线扇形数组
    private sectorArr1 = [null, null, null];
    private sectorArr2 = [null, null, null];
    private sectorArr3 = [null, null, null];
    // 创建三个旁切圆
    private circle1 = common.createStrokeCircle(1, { color: '#008CFF' });
    private circle2 = common.createStrokeCircle(1, { color: '#008CFF' });
    private circle3 = common.createStrokeCircle(1, { color: '#008CFF' });
    private timer1: any;
    private timer2: any;
    private timer3: any;
    private timer4: any;
    private timer5: any;
    private timer6: any;

    constructor(scene: any, ctrlPoint: any) {
        this.scene = scene;
        this.ctrlPoint = ctrlPoint;
        this.initElement();
    }

    initElement() {
        this.getExtendedLine();
        this.groupO1Point.add(this.textO1, this.innerPoint1);
        this.groupO2Point.add(this.textO2, this.innerPoint2);
        this.groupO3Point.add(this.textO3, this.innerPoint3);
        this.o1LineGroup1.add(this.line_aby, this.line_acy, );
        this.o1LineGroup2.add(this.line_ao1, this.line_bo1, this.line_co1, );
        this.o2LineGroup1.add(this.line_bay, this.line_bcy, );
        this.o2LineGroup2.add(this.line_ao2, this.line_bo2, this.line_co2, );
        this.o3LineGroup1.add(this.line_cay, this.line_cby, );
        this.o3LineGroup2.add(this.line_ao3, this.line_bo3, this.line_co3, );
        this.scene.add(this.line_bc, this.line_ab, this.line_ac, this.textA, this.textB, this.textC, );
        this.scene.add(this.o1LineGroup1, this.o1LineGroup2, this.o2LineGroup1,
            this.o2LineGroup2, this.o3LineGroup1, this.o3LineGroup2);
        this.o1LineGroup1.visible = false;
        this.o1LineGroup2.visible = false;
        this.o2LineGroup1.visible = false;
        this.o2LineGroup2.visible = false;
        this.o3LineGroup1.visible = false;
        this.o3LineGroup2.visible = false;
        // this.groupO1Point.visible = false;
        this.scaleLine();
    }

    // 画旁心A，AB/AC延长线函数
    getExtendedLine() {
        // 画AB/AC延长线
        this.extendedPoint1[0] = (4 * this.b_pos[0] - 3 * this.a_pos[0]);
        this.extendedPoint1[1] = (4 * this.b_pos[1] - 3 * this.a_pos[1]);
        this.extendedPoint2[0] = (4 * this.c_pos[0] - 3 * this.a_pos[0]);
        this.extendedPoint2[1] = (4 * this.c_pos[1] - 3 * this.a_pos[1]);
        this.line_aby = common.scaleLine(this.b_pos, this.extendedPoint1, this.line_aby);
        this.line_acy = common.scaleLine(this.c_pos, this.extendedPoint2, this.line_acy);
        // 计算三角形三边的长度
        const a = common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos).a.length;
        const b = common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos).b.length;
        const c = common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos).c.length;
        // 计算A的旁心O1的坐标位置
        this.O1_pos[0] = (-a * this.a_pos[0] + b * this.b_pos[0] + c * this.c_pos[0]) / (-a + b + c);
        this.O1_pos[1] = (-a * this.a_pos[1] + b * this.b_pos[1] + c * this.c_pos[1]) / (-a + b + c);
        this.groupO1Point.position.set(this.O1_pos[0], this.O1_pos[1], 1);
        this.o1LineGroup2.visible = true;
    }

    // 画旁心B，BA/BC延长线函数
    getExtendedLine1() {
        // 画BA/BC延长线
        this.extendedPoint3[0] = (4 * this.a_pos[0] - 3 * this.b_pos[0]);
        this.extendedPoint3[1] = (4 * this.a_pos[1] - 3 * this.b_pos[1]);
        this.extendedPoint4[0] = (4 * this.c_pos[0] - 3 * this.b_pos[0]);
        this.extendedPoint4[1] = (4 * this.c_pos[1] - 3 * this.b_pos[1]);
        this.line_bay = common.scaleLine(this.a_pos, this.extendedPoint3, this.line_bay);
        this.line_bcy = common.scaleLine(this.c_pos, this.extendedPoint4, this.line_bcy);
        // 计算三角形三边的长度
        const a = common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos).a.length;
        const b = common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos).b.length;
        const c = common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos).c.length;
        // 计算A的旁心O2的坐标位置
        this.O2_pos[0] = (a * this.a_pos[0] - b * this.b_pos[0] + c * this.c_pos[0]) / (a - b + c);
        this.O2_pos[1] = (a * this.a_pos[1] - b * this.b_pos[1] + c * this.c_pos[1]) / (a - b + c);
        this.groupO2Point.position.set(this.O2_pos[0], this.O2_pos[1], 1);
        this.o2LineGroup2.visible = true;
    }

    // 画旁心C，CA/CB延长线函数
    getExtendedLine2() {
        // 画CA/CB延长线
        this.extendedPoint5[0] = (4 * this.a_pos[0] - 3 * this.c_pos[0]);
        this.extendedPoint5[1] = (4 * this.a_pos[1] - 3 * this.c_pos[1]);
        this.extendedPoint6[0] = (4 * this.b_pos[0] - 3 * this.c_pos[0]);
        this.extendedPoint6[1] = (4 * this.b_pos[1] - 3 * this.c_pos[1]);
        this.line_cay = common.scaleLine(this.a_pos, this.extendedPoint5, this.line_cay);
        this.line_cby = common.scaleLine(this.b_pos, this.extendedPoint6, this.line_cby);
        // 计算三角形三边的长度
        const a = common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos).a.length;
        const b = common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos).b.length;
        const c = common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos).c.length;
        // 计算A的旁心O3的坐标位置
        this.O3_pos[0] = (a * this.a_pos[0] + b * this.b_pos[0] - c * this.c_pos[0]) / (a + b - c);
        this.O3_pos[1] = (a * this.a_pos[1] + b * this.b_pos[1] - c * this.c_pos[1]) / (a + b - c);
        this.groupO3Point.position.set(this.O3_pos[0], this.O3_pos[1], 1);
        this.o3LineGroup2.visible = true;
    }

    scaleLine() {
        this.textA.position.set(this.a_pos[0] + 5, this.a_pos[1] + 5, 0);
        this.line_bc = common.scaleLine(this.b_pos, this.c_pos, this.line_bc);
        this.line_ac = common.scaleLine(this.a_pos, this.c_pos, this.line_ac);
        this.line_ab = common.scaleLine(this.a_pos, this.b_pos, this.line_ab);
        if ((window as any).viewHandler.viewModel.$data.active2) {
            if ((window as any).viewHandler.viewModel.$data.played1) {
                this.getExtendedLine();
                this.line_ao1 = common.scaleLine(this.a_pos, this.O1_pos, this.line_ao1);
                this.line_bo1 = common.scaleLine(this.b_pos, this.O1_pos, this.line_bo1);
                this.line_co1 = common.scaleLine(this.c_pos, this.O1_pos, this.line_co1);
                this.drawSectorO1();
                this.calcCircleRadius1();
            }
            if ((window as any).viewHandler.viewModel.$data.played2) {
                this.getExtendedLine1();
                this.line_ao2 = common.scaleLine(this.a_pos, this.O2_pos, this.line_ao2);
                this.line_bo2 = common.scaleLine(this.b_pos, this.O2_pos, this.line_bo2);
                this.line_co2 = common.scaleLine(this.c_pos, this.O2_pos, this.line_co2);
                this.drawSectorO2();
                this.calcCircleRadius2();
            }
            if ((window as any).viewHandler.viewModel.$data.played3) {
                this.getExtendedLine2();
                this.line_ao3 = common.scaleLine(this.a_pos, this.O3_pos, this.line_ao3);
                this.line_bo3 = common.scaleLine(this.b_pos, this.O3_pos, this.line_bo3);
                this.line_co3 = common.scaleLine(this.c_pos, this.O3_pos, this.line_co3);
                this.drawSectorO3();
                this.calcCircleRadius3();
            }
        }
    }

    // 画旁切圆函数
    calcCircleRadius1() {
        const dis = Math.hypot(this.O1_pos[1] - this.b_pos[1]);
        this.circle1.visible = true;
        this.circle1.position.set(...this.O1_pos);
        this.circle1.scale.set(dis, dis, dis);
        this.scene.add(this.circle1);
    }

    calcCircleRadius2() {
        const dis = Math.hypot(this.O2_pos[1] - this.b_pos[1]);
        this.circle2.visible = true;
        this.circle2.position.set(...this.O2_pos);
        this.circle2.scale.set(dis, dis, dis);
        this.scene.add(this.circle2);
    }

    calcCircleRadius3() {
        const dis = Math.hypot(this.O3_pos[1] - this.b_pos[1]);
        this.circle3.visible = true;
        this.circle3.position.set(...this.O3_pos);
        this.circle3.scale.set(dis, dis, dis);
        this.scene.add(this.circle3);
    }

    // 画角A旁心平分扇形标识函数
    drawSectorO1() {
        this.o1LineGroup1.remove(...this.sectorArr1);

        this.sectorArr1.forEach((item) => {
            if (!item) {return; }
            item.children[0].geometry.dispose();
            item.children[0].material.dispose();
            item = undefined;
        });
        this.sectorArr1[0] = common.drawSector(this.c_pos, this.b_pos, this.extendedPoint1, { color: '#F4A460' });
        this.sectorArr1[1] = common.drawSector(this.b_pos, this.a_pos, this.c_pos, { color: '#4EDFBE' });
        this.sectorArr1[2] = common.drawSector(this.b_pos, this.c_pos, this.extendedPoint2, { color: '#8A2BE2' });
        this.o1LineGroup1.add(...this.sectorArr1);
    }
    // 画角B旁心平分扇形标识函数
    drawSectorO2() {
        this.o2LineGroup1.remove(...this.sectorArr2);
        this.sectorArr2.forEach((item) => {
            if (!item) {return; }
            item.children[0].geometry.dispose();
            item.children[0].material.dispose();
            item = undefined;
        });
        this.sectorArr2 = [];
        this.sectorArr2[0] = common.drawSector(this.extendedPoint3, this.a_pos, this.c_pos, { color: '#7FFF00' });
        this.sectorArr2[1] = common.drawSector(this.a_pos, this.b_pos, this.c_pos, { color: '#FFFF00' });
        this.sectorArr2[2] = common.drawSector(this.a_pos, this.c_pos, this.extendedPoint4, { color: '#8A2BE2' });
        this.o2LineGroup1.add(...this.sectorArr2);
    }

    // 画角C旁心平分扇形标识函数
    drawSectorO3() {
        this.o3LineGroup1.remove(...this.sectorArr3);
        this.sectorArr3.forEach((item) => {
            if (!item) {return; }
            item.children[0].geometry.dispose();
            item.children[0].material.dispose();
            item = undefined;
        });
        this.sectorArr3 = [];
        this.sectorArr3[0] = common.drawSector(this.b_pos, this.a_pos, this.extendedPoint5, { color: '#7FFF00' });
        this.sectorArr3[1] = common.drawSector(this.a_pos, this.c_pos, this.b_pos, { color: '#FF69B4' });
        this.sectorArr3[2] = common.drawSector(this.a_pos, this.b_pos, this.extendedPoint6, { color: '#F4A460' });
        this.o3LineGroup1.add(...this.sectorArr3);
    }

    //控制点A角移动事件函数
    ctrlPointEvt(pos: Object) {
        this.a_pos = [pos.x, pos.y, 0];
        this.scaleLine();
        (window as any).viewHandler.viewModel.$data.triangleText = common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos).info;
    }

    // 画角A旁心平分线动画和扇形标识函数
    connectInnerAni1() {
        this.getExtendedLine();
        this.o1LineGroup1.visible = true;
        Promise.all([
            common.lineAni(this.b_pos, this.O1_pos, this.line_ao1),
            common.lineAni(this.a_pos, this.O1_pos, this.line_bo1),
            common.lineAni(this.c_pos, this.O1_pos, this.line_co1),
        ]).then(() => {
            this.drawSectorO1();
        });
        this.timer4 = setTimeout(() => {
            this.scene.add(this.groupO1Point);
        }, 1000);
        this.timer1 = setTimeout(() => {
            this.calcCircleRadius1();
        }, 1800);
    }

    // 清除角A旁心相关元素
    cleanUpEvent1() {
        this.scene.remove(this.groupO1Point);
        this.o1LineGroup1.visible = false;
        this.o1LineGroup2.visible = false;
        this.circle1.visible = false;
        this.o1LineGroup1.remove(...this.sectorArr1);
        clearTimeout(this.timer1);
        clearTimeout(this.timer4);
    }

    // 画角B旁心平分线动画和扇形标识函数
    connectInnerAni2() {
        this.getExtendedLine1();
        this.o2LineGroup1.visible = true;
        Promise.all([
            common.lineAni(this.b_pos, this.O2_pos, this.line_ao2),
            common.lineAni(this.a_pos, this.O2_pos, this.line_bo2),
            common.lineAni(this.c_pos, this.O2_pos, this.line_co2),
        ]).then(() => {
            this.drawSectorO2();

        });
        this.timer5 = setTimeout(() => {
            this.scene.add(this.groupO2Point);
        }, 1000);
        this.timer2 = setTimeout(() => {
            this.calcCircleRadius2();
        }, 1800);
    }

    // 清除角B旁心相关元素
    cleanUpEvent2() {
        clearTimeout(this.timer2);
        clearTimeout(this.timer5);
        this.o2LineGroup1.visible = false;
        this.o2LineGroup2.visible = false;
        this.scene.remove(this.groupO2Point);
        this.circle2.visible = false;
        this.o2LineGroup1.remove(...this.sectorArr2);
    }

    // 画角C旁心平分线动画和扇形标识函数
    connectInnerAni3() {
        this.getExtendedLine2();
        this.o3LineGroup1.visible = true;
        Promise.all([
            common.lineAni(this.b_pos, this.O3_pos, this.line_ao3),
            common.lineAni(this.a_pos, this.O3_pos, this.line_bo3),
            common.lineAni(this.c_pos, this.O3_pos, this.line_co3),
        ]).then(() => {
            this.drawSectorO3();
            // this.timer3 = setTimeout(() => {
            //     this.calcCircleRadius3();
            // }, 1000);
            // setTimeout(this.calcCircleRadius3.bind(this), 1000);
        });
        this.timer6 = setTimeout(() => {
            this.scene.add(this.groupO3Point);
        }, 1000);
        this.timer3 = setTimeout(() => {
            this.calcCircleRadius3();
        }, 1800);
    }

    // 清除角A旁心相关元素
    cleanUpEvent3() {
        clearTimeout(this.timer6);
        clearTimeout(this.timer3);
        this.o3LineGroup1.visible = false;
        this.o3LineGroup2.visible = false;
        this.scene.remove(this.groupO3Point);
        this.circle3.visible = false;
        this.o3LineGroup1.remove(...this.sectorArr3);
    }

    reset() {
        this.a_pos = [0, 40 * Math.tan(50 * Math.PI / 180) - 30, 0];
        this.b_pos = [-40, -30, 0];
        this.c_pos = [40, -30, 0];
        this.ctrlPoint.position.set(...this.a_pos);
        this.scaleLine();
        (window as any).viewHandler.viewModel.$data.triangleText = common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos).info;
        (window as any).viewHandler.viewModel.$data.played1 = false;
        (window as any).viewHandler.viewModel.$data.played2 = false;
        (window as any).viewHandler.viewModel.$data.played3 = false;
        this.cleanUpEvent1();
        this.cleanUpEvent2();
        this.cleanUpEvent3();
        (window as any).viewHandler.viewModel.$data.active1 = false;
        (window as any).viewHandler.viewModel.$data.active2 = false;
        (window as any).viewHandler.viewModel.$data.active3 = false;
        clearTimeout(this.timer1, this.timer2, this.timer3, this.timer4, this.timer5, this.timer6);
    }
}
