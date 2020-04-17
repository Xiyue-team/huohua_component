import * as THREE from 'three';
import common from './CommonForThree';
import CreateText from './CreateText.ts';
export default class CenterPoint {
    private a_pos = [0, 40 * Math.tan(50 * Math.PI / 180) - 30, 0];
    private b_pos = [-40, -30, 0];
    private c_pos = [40, -30, 0];
    private o_pos = [0, 0, 0];
    private perpendicularArr = [
        null, null, null
    ];
    private triangleArr = [
        common.drawTriangle({ color: '#008CFF' }),
        common.drawTriangle({ color: '#008CFF' }),
        common.drawTriangle({ color: '#008CFF' })
    ]
    private triangleGroup = new THREE.Group();
    private textA = common.createText('A', [10, 35, 0]);
    private textB = common.createText('B', [-45, -30, 0]);
    private textC = common.createText('C', [45, -30, 0]);
    private textO = common.createText('O', [5, 4, 0], { color: '#008CFF' });
    private textD = common.createText('D', [0, 0, 0], { color: '#008CFF' });
    private textE = common.createText('E', [0, 0, 0], { color: '#008CFF' });
    private textF = common.createText('F', [0, 0, 0], { color: '#008CFF' });
    private connectInnerTimerArr = [null, null, null];
    private line_bc = common.drawUnitLine({
        color: '#000',
        isDash: false,
    });
    private line_ac = common.drawUnitLine({
        color: '#000',
        isDash: false,
    });
    private line_ab = common.drawUnitLine({
        color: '#000',
        isDash: false,
    });
    private line_oa = common.drawUnitLine({
        color: '#008CFF',
        isDash: false,
    });
    private line_ob = common.drawUnitLine({
        color: '#008CFF',
        isDash: false,
    });
    private line_oc = common.drawUnitLine({
        color: '#008CFF',
        isDash: false,
    });
    private line_od = common.drawUnitLine({
        color: '#000',
        isDash: false,
    });
    private line_oe = common.drawUnitLine({
        color: '#000',
        isDash: false,
    });
    private line_of = common.drawUnitLine({
        color: '#000',
        isDash: false,
    });
    private group1 = new THREE.Group();
    private group2 = new THREE.Group();
    private groupRightAngle = new THREE.Group();
    private groupInnerPoint = new THREE.Group();
    private groupTwoLine = new THREE.Group();
    private twoLineArr = [] as any;
    private innerPoint = common.drawCircle(1, { color: '#008CFF' });
    private rightAngleE = common.drawRightAngle(2, { color: '#000' });
    private rightAngleD = common.drawRightAngle(2, { color: '#000' });
    private rightAngleF = common.drawRightAngle(2, { color: '#000' });
    private sectorArr = [null, null, null];
    private circle = common.createStrokeCircle(10, { color: '#008CFF' });
    constructor(scene: any, ctrlPoint: any) {
        this.scene = scene;
        this.ctrlPoint = ctrlPoint;
        this.initElement();
    }
    initElement() {
        // 添加表示平分的图标
        const colorArr = ['#F5A623', '#F5A623', '#008CFF', '#008CFF', '#D0021B', '#D0021B'];
        colorArr.forEach(color => {

            this.twoLineArr.push(common.twoLineIcon({ color }));
        })

        this.groupTwoLine.add(...this.twoLineArr);

        common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos);
        this.groupInnerPoint.add(this.textO, this.innerPoint);
        this.triangleGroup.add(...this.triangleArr);
        this.group1.add(this.line_ob, this.line_oa, this.line_oc, this.triangleGroup);

        this.group2.add(this.line_od, this.line_oe, this.line_of, this.groupRightAngle, this.groupInnerPoint, this.groupTwoLine);

        this.groupRightAngle.add(this.rightAngleE, this.rightAngleD, this.rightAngleF, this.textD, this.textE, this.textF);
        this.scene.add(this.line_bc, this.line_ab, this.line_ac, this.textA, this.textB, this.textC, this.group1, this.group2, this.circle);
        this.group1.visible = false;
        this.group2.visible = false;
        this.circle.visible = false;
        this.scaleLine();

    }
    // 计算外心坐标
    getOuterPoint() {
        const [x1, y1] = this.a_pos;
        const [x2, y2] = this.b_pos;
        const [x3, y3] = this.c_pos;
        const A1 = 2 * (x2 - x1);
        const B1 = 2 * (y2 - y1);
        const C1 = x2 * x2 + y2 * y2 - x1 * x1 - y1 * y1;
        const A2 = 2 * (x3 - x2);
        const B2 = 2 * (y3 - y2);
        const C2 = x3 * x3 + y3 * y3 - x2 * x2 - y2 * y2;
        const x = ((C1 * B2) - (C2 * B1)) / ((A1 * B2) - (A2 * B1));
        const y = ((A1 * C2) - (A2 * C1)) / ((A1 * B2) - (A2 * B1));
        this.o_pos = [x, y, 0];

        this.groupInnerPoint.position.set(this.o_pos[0], this.o_pos[1], 1);
    }

    // 计算垂足坐标
    calcPerpendicular() {
        this.perpendicularArr[0] = common.perpendicularPoint(this.c_pos, this.b_pos, this.o_pos);
        this.perpendicularArr[1] = common.perpendicularPoint(this.a_pos, this.c_pos, this.o_pos);
        this.perpendicularArr[2] = common.perpendicularPoint(this.a_pos, this.b_pos, this.o_pos);
    }


    // 点击作外心显示的元素
    drawOuterPoint(val: Boolean) {
        if (!val) {

            this.group1.visible = false;
            this.group2.visible = false;
            this.circle.visible = false;
            return;
        }
        this.group2.visible = true;
        this.getOuterPoint();
        this.calcPerpendicular();
        common.scaleLine(this.o_pos, this.perpendicularArr[0].pos, this.line_od, 2);
        common.scaleLine(this.o_pos, this.perpendicularArr[1].pos, this.line_oe, 2);
        common.scaleLine(this.o_pos, this.perpendicularArr[2].pos, this.line_of, 2);
        this.setRightAngle();
        this.setTwoLinePosAndRotate();
    }

    // 设置垂足元素位置的角度
    setRightAngle() {
        common.setPerpendicularPosAndRotate(this.perpendicularArr[0], this.rightAngleD, 1);
        common.setPerpendicularPosAndRotate(this.perpendicularArr[1], this.rightAngleE, 2);
        common.setPerpendicularPosAndRotate(this.perpendicularArr[2], this.rightAngleF, 3);
        const arr1 = [this.line_od, this.line_oe, this.line_of];
        const arr2 = [this.rightAngleD, this.rightAngleE, this.rightAngleF];
        arr1.forEach((mesh, index) => {
            if (mesh.scale.x < 3) {
                arr2[index].visible = false;
            } else {
                arr2[index].visible = true;
            }
        })
        this.textD.position.set(this.perpendicularArr[0].pos[0], this.perpendicularArr[0].pos[1] - 2, 0);
        this.textE.position.set(this.perpendicularArr[1].pos[0] + 4, this.perpendicularArr[1].pos[1] + 4, 0);
        this.textF.position.set(this.perpendicularArr[2].pos[0] - 4, this.perpendicularArr[2].pos[1] + 4, 0);
    }

    // 计算向量箭头角度
    calcTriangleRotate(startPos: any, endPos: any) {
        const rad = Math.atan2(startPos[1] - endPos[1], startPos[0] - endPos[0]);
        return rad + Math.PI;
    }
    // 设置平分图标的位置和角度
    setTwoLinePosAndRotate() {
        const resa = common.getVecPos(this.b_pos, this.c_pos, [0.25, 0.75]);
        const resb = common.getVecPos(this.a_pos, this.c_pos, [0.25, 0.75]);
        const resc = common.getVecPos(this.b_pos, this.a_pos, [0.25, 0.75]);
        const resPos = [...resa, ...resb, ...resc];
        const rotatea = common.getLineAngle(this.b_pos, this.c_pos, true);
        const rotateb = common.getLineAngle(this.a_pos, this.c_pos, true);
        const rotatec = common.getLineAngle(this.b_pos, this.a_pos, true);
        const resRotate = [rotatea, rotatea, rotateb, rotateb, rotatec, rotatec];
        this.twoLineArr.forEach((mesh, index) => {
            mesh.position.set(...resPos[index]);
            mesh.rotation.z = resRotate[index] + Math.PI / 2;
        })
    }
    scaleLine() {
        this.textA.position.set(this.a_pos[0] + 10, this.a_pos[1] + 5, 0);
        this.line_bc = common.scaleLine(this.b_pos, this.c_pos, this.line_bc);
        this.line_ac = common.scaleLine(this.a_pos, this.c_pos, this.line_ac);
        this.line_ab = common.scaleLine(this.a_pos, this.b_pos, this.line_ab);

        if ((window as any).viewHandler.viewModel.$data.active2) {
            this.drawOuterPoint(true);
        }

        if ((window as any).viewHandler.viewModel.$data.active3 || (window as any).viewHandler.viewModel.$data.active4) {
            this.line_ob = common.scaleLine(this.b_pos, this.o_pos, this.line_ob);
            this.line_oa = common.scaleLine(this.a_pos, this.o_pos, this.line_oa);
            this.line_oc = common.scaleLine(this.c_pos, this.o_pos, this.line_oc);
            this.calcCircleRadius();
            if ((window as any).viewHandler.viewModel.$data.active4) {
                this.triangleArr[0].position.set(...this.a_pos);
                this.triangleArr[1].position.set(...this.b_pos);
                this.triangleArr[2].position.set(...this.c_pos);
                this.triangleArr[0].rotation.z = this.calcTriangleRotate(this.o_pos, this.a_pos);
                this.triangleArr[1].rotation.z = this.calcTriangleRotate(this.o_pos, this.b_pos);
                this.triangleArr[2].rotation.z = this.calcTriangleRotate(this.o_pos, this.c_pos);
            }
        }
    }

    // 连线动画
    connectOuterAni() {
        this.group1.visible = true;
        this.circle.visible = false;
        let showArrow = (window as any).viewHandler.viewModel.$data.active4;
        this.triangleGroup.visible = showArrow;

        (window as any).viewHandler.viewModel.$data.disabledClick = true;
        Promise.all([
            common.lineAni(this.o_pos, this.b_pos, this.line_ob, showArrow && this.triangleArr[0]),
            common.lineAni(this.o_pos, this.a_pos, this.line_oa, showArrow && this.triangleArr[1]),
            common.lineAni(this.o_pos, this.c_pos, this.line_oc, showArrow && this.triangleArr[2]),
        ]).then(() => {

            (window as any).viewHandler.viewModel.$data.disabledClick = false;
            this.calcCircleRadius();
            this.circle.visible = true;
        })
    }
    calcCircleRadius() {
        let dis = Math.hypot(this.o_pos[0] - this.a_pos[0], this.o_pos[1] - this.a_pos[1]);
        this.circle.position.set(...this.o_pos);
        this.circle.scale.set(dis / 10, dis / 10, dis / 10);
    }
    ctrlPointEvt(pos: Object) {
        this.a_pos = [pos.x, pos.y, 0];
        this.scaleLine();
        (window as any).viewHandler.viewModel.$data.triangleText = common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos).info;
    }
    reset() {
        this.a_pos = [0, 40 * Math.tan(50 * Math.PI / 180) - 30, 0];
        this.b_pos = [-40, -30, 0];
        this.c_pos = [40, -30, 0];
        this.ctrlPoint.position.set(...this.a_pos);
        this.ctrlPoint.position.z = 1;
        (window as any).viewHandler.viewModel.$data.active1 = false;
        (window as any).viewHandler.viewModel.$data.active2 = false;
        (window as any).viewHandler.viewModel.$data.active3 = false;
        (window as any).viewHandler.viewModel.$data.active4 = false;
        (window as any).viewHandler.viewModel.$data.disabledClick = false;
        this.group1.visible = this.group2.visible = false;
        this.scaleLine();
        (window as any).viewHandler.viewModel.$data.triangleText = common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos).info;
    }
}