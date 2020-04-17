import * as THREE from 'three';
import common from './CommonForThree';
import * as console from 'console';
import { Line3dModel } from './Line3dModel';
export default class CenterPoint {
    private a_pos = [0, 40 * Math.tan(50 * Math.PI / 180) - 30, 0];
    private b_pos = [-40, -30, 0];
    private c_pos = [40, -30, 0];
    private o_pos = [0, 0, 0];
    private perpendicularArr = [
        null, null, null
    ];
    private ctrlPoint: any;
    private triangleArr = [
        common.drawTriangle({ color: '#008CFF' }),
        common.drawTriangle({ color: '#008CFF' }),
        common.drawTriangle({ color: '#008CFF' })
    ]
    private triangleGroup = new THREE.Group();
    private textA = common.createText('A', [10, 35, 0]);
    private textB = common.createText('B', [-45, -30, 0]);
    private textC = common.createText('C', [45, -30, 0]);
    private textO = common.createText1('O4', [5, 4, 0], { color: '#008CFF' });
    private textD = common.createText('D', [0, 0, 0]);
    private textE = common.createText('E', [0, 0, 0]);
    private textF = common.createText('F', [0, 0, 0]);
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

    private line_og = common.drawUnitLine({
        color: '#008CFF',
        isDash: true,
    });
    private line_oh = common.drawUnitLine({
        color: '#008CFF',
        isDash: true,
    });
    private line_oi = common.drawUnitLine({
        color: '#008CFF',
        isDash: true,
    });
    private line_oj = common.drawUnitLine({
        color: '#008CFF',
        isDash: true,
    });
    private line_ok = common.drawUnitLine({
        color: '#008CFF',
        isDash: true,
    });
    private line_ol = common.drawUnitLine({
        color: '#008CFF',
        isDash: true,
    });
    private line_om = common.drawUnitLine({
        color: '#000',
        isDash: false,
    });
    private line_on = common.drawUnitLine({
        color: '#000',
        isDash: false,
    });
    private line_oo = common.drawUnitLine({
        color: '#000',
        isDash: false,
    });
    private line_op = common.drawUnitLine({
        color: '#000',
        isDash: false,
    });
    private line_oq = common.drawUnitLine({
        color: '#000',
        isDash: false,
    });
    private line_or = common.drawUnitLine({
        color: '#000',
        isDash: false,
    });
    private group1 = new THREE.Group();
    private group2 = new THREE.Group();
    private group3 = new THREE.Group();
    private groupRightAngle = new THREE.Group();
    private groupInnerPoint = new THREE.Group;
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
        // common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos);
        this.groupInnerPoint.add(this.textO, this.innerPoint);
        this.triangleGroup.add(...this.triangleArr);
        this.group1.add(this.line_ob, this.line_oa, this.line_oc, this.triangleGroup);

        this.group2.add(this.line_od, this.line_oe, this.line_of, this.groupRightAngle);
        this.group3.add(this.textD, this.textE, this.textC);
        this.groupRightAngle.add(this.rightAngleE, this.rightAngleD, this.rightAngleF, this.textD, this.textE, this.textF);
        this.scene.add(this.group1, this.group2, this.groupInnerPoint);
        this.group1.visible = false;
        this.group2.visible = false;
        this.groupInnerPoint.visible = false;
        this.circle.visible = false;
        this.scaleLine();

    }
    getOuterPoint() {
        //垂心坐标
        const [x1, y1] = this.a_pos;
        const [x2, y2] = this.b_pos;
        const [x3, y3] = this.c_pos;
        const y0 = (x3 - x1 + y3 * ((y2 - y1) / (x2 - x1)) - y1 *
            ((y3 - y2) / (x3 - x2))) / ((y2 - y1) / (x2 - x1) - (y3 - y2) / (x3 - x2));
        const x = x3 - (y2 - y1) / (x2 - x1) * (y0 - y3);
        const y = y0;
        this.o_pos = [x, y, 0];

        this.groupInnerPoint.position.set(this.o_pos[0], this.o_pos[1], 1);
    }
    calcPerpendicular() {
        //直线垂足坐标
        this.perpendicularArr[0] = common.perpendicularPoint(this.c_pos, this.b_pos, this.a_pos);
        this.perpendicularArr[1] = common.perpendicularPoint(this.a_pos, this.c_pos, this.b_pos);
        this.perpendicularArr[2] = common.perpendicularPoint(this.a_pos, this.b_pos, this.c_pos);

        //钝角画虚线
        if ((window as any).viewHandler.viewModel.$data.active4) {
            this.setRightAngle(1);
            const dushu = common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos);
            this.scene.remove(this.line_og);
            this.scene.remove(this.line_oh);
            this.scene.remove(this.line_oi);
            this.scene.remove(this.line_oj);
            this.scene.remove(this.line_ok);
            this.scene.remove(this.line_ol);
            this.scene.remove(this.line_om);
            this.scene.remove(this.line_on);
            this.scene.remove(this.line_oo);
            this.scene.remove(this.line_op);
            this.scene.remove(this.line_oq);
            this.scene.remove(this.line_or);
            if (dushu.a.angle > 90) {
                common.scaleLine(this.a_pos, this.perpendicularArr[1].pos, this.line_og, 2);
                common.scaleLine(this.a_pos, this.perpendicularArr[2].pos, this.line_oj, 2);
                this.scene.add(this.line_oj);
                this.scene.add(this.line_og);
            } else if (dushu.b.angle > 90) {
                this.setRightAngle(3);
                common.scaleLine(this.b_pos, this.perpendicularArr[0].pos, this.line_oh, 1);
                common.scaleLine(this.b_pos, this.perpendicularArr[2].pos, this.line_ok, 1);
                common.scaleLine(this.o_pos, this.b_pos, this.line_om);
                common.scaleLine(this.o_pos, this.a_pos, this.line_on);
                common.scaleLine(this.o_pos, this.c_pos, this.line_oq);
                this.line_oq.position.set((this.o_pos[0] + this.c_pos[0]) / 2, (this.o_pos[1] + this.c_pos[1]) / 2, -0.2);
                this.scene.add(this.line_oh);
                this.scene.add(this.line_ok);
                this.scene.add(this.line_oq);
                this.line_om.position.set((this.o_pos[0] + this.b_pos[0]) / 2, (this.o_pos[1] + this.b_pos[1]) / 2, -0.2);
                this.line_on.position.set((this.o_pos[0] + this.a_pos[0]) / 2, (this.o_pos[1] + this.a_pos[1]) / 2, -0.2);
                this.scene.add(this.line_om);
                this.scene.add(this.line_on);
            } else if (dushu.c.angle > 90) {
                this.setRightAngle(2);
                common.scaleLine(this.c_pos, this.perpendicularArr[0].pos, this.line_oi, 1);
                common.scaleLine(this.c_pos, this.perpendicularArr[1].pos, this.line_ol, 1);
                common.scaleLine(this.o_pos, this.c_pos, this.line_oo);
                common.scaleLine(this.o_pos, this.a_pos, this.line_op);
                common.scaleLine(this.o_pos, this.b_pos, this.line_or);
                this.line_or.position.set((this.o_pos[0] + this.b_pos[0]) / 2, (this.o_pos[1] + this.b_pos[1]) / 2, -0.2);
                this.scene.add(this.line_oi);
                this.scene.add(this.line_ol);
                this.scene.add(this.line_or);
                this.line_oo.position.set((this.o_pos[0] + this.c_pos[0]) / 2, (this.o_pos[1] + this.c_pos[1]) / 2, -0.2);
                this.line_op.position.set((this.o_pos[0] + this.a_pos[0]) / 2, (this.o_pos[1] + this.a_pos[1]) / 2, -0.2);
                this.scene.add(this.line_oo);
                this.scene.add(this.line_op);
            }

            if (dushu.b.angle !== 90) {
                this.textF.visible = true;
                this.textD.visible = true;
                this.rightAngleF.visible = true;
            } else if (dushu.b.angle === 90) {
                this.textF.visible = false;
                this.textD.visible = false;
                this.rightAngleF.visible = false;
            }

            if (dushu.c.angle !== 90) {
                // this.textD.visible = true;
                this.textE.visible = true;
                this.textC.visible = true;
                this.rightAngleD.visible = true;
            } else if (dushu.c.angle === 90) {
                this.textD.visible = false;
                this.textE.visible = false;
                this.textC.visible = false;
                this.rightAngleD.visible = false;
            }

            if (dushu.a.angle !== 90) {
                this.textA.visible = true;
                this.textE.visible = true;
                this.textF.visible = true;
                this.rightAngleE.visible = true;
            } else if (dushu.a.angle === 90) {
                this.textA.visible = false;
                this.textE.visible = false;
                this.textF.visible = false;
                this.rightAngleE.visible = false;
            }
        }
    }

    drawOuterPoint(val: Boolean) {
        if (!val) {
            this.groupInnerPoint.visible = false;
            Line3dModel.chooseShowText();
            return;
        }
        this.calcPerpendicular();
        this.group2.visible = true;
        this.groupRightAngle.visible = false;
        this.groupInnerPoint.visible = false;
        this.getOuterPoint();
        (window as any).viewHandler.viewModel.$data.disabledClick = true;

        Promise.all([
            common.lineAni(this.a_pos, this.perpendicularArr[0].pos, this.line_od),
            common.lineAni(this.b_pos, this.perpendicularArr[1].pos, this.line_oe),
            common.lineAni(this.c_pos, this.perpendicularArr[2].pos, this.line_of),
        ]).then(() => {

            this.groupRightAngle.visible = true;
            // this.groupInnerPoint.visible = true;

            Line3dModel.chooseShowText();
            setTimeout(() => {
                this.group2.visible = false;
                (window as any).viewHandler.viewModel.$data.disabledClick = false;
                this.scene.remove(this.line_og);
                this.scene.remove(this.line_oh);
                this.scene.remove(this.line_oi);
                this.scene.remove(this.line_oj);
                this.scene.remove(this.line_ok);
                this.scene.remove(this.line_ol);
                this.scene.remove(this.line_om);
                this.scene.remove(this.line_on);
                this.scene.remove(this.line_oo);
                this.scene.remove(this.line_op);
                this.scene.remove(this.line_oq);
                this.scene.remove(this.line_or);
            }, 1000)
        });
    }
    setRightAngle(num: number) {
        if (num === 1) {
            common.setPerpendicularPosAndRotate(this.perpendicularArr[0], this.rightAngleD, 1);
            common.setPerpendicularPosAndRotate(this.perpendicularArr[1], this.rightAngleE, 2);
            common.setPerpendicularPosAndRotate(this.perpendicularArr[2], this.rightAngleF, 3);
        } else if (num === 2) {
            common.setPerpendicularPosAndRotate(this.perpendicularArr[0], this.rightAngleD, 4);
            common.setPerpendicularPosAndRotate(this.perpendicularArr[1], this.rightAngleE, 2);
            common.setPerpendicularPosAndRotate(this.perpendicularArr[2], this.rightAngleF, 3);
        } else {
            common.setPerpendicularPosAndRotate(this.perpendicularArr[2], this.rightAngleF, 5);
        }
        this.textD.position.set(this.perpendicularArr[0].pos[0] - 3, this.perpendicularArr[0].pos[1] - 2, 0);
        this.textE.position.set(this.perpendicularArr[1].pos[0] + 4, this.perpendicularArr[1].pos[1] + 4, 0);
        this.textF.position.set(this.perpendicularArr[2].pos[0] - 4, this.perpendicularArr[2].pos[1] + 4, 0);
    }
    calcTriangleRotate(startPos: any, endPos: any) {
        const rad = Math.atan2(startPos[1] - endPos[1], startPos[0] - endPos[0]);
        return rad + Math.PI;
    }
    scaleLine() {
        // this.calcPerpendicular();
        this.getOuterPoint();
        // this.textA.position.set(this.a_pos[0] + 10, this.a_pos[1] + 5, 0);
        // this.line_bc = common.scaleLine(this.b_pos, this.c_pos, this.line_bc);
        // this.line_ac = common.scaleLine(this.a_pos, this.c_pos, this.line_ac);
        // this.line_ab = common.scaleLine(this.a_pos, this.b_pos, this.line_ab);

        // if ((window as any).viewHandler.viewModel.$data.active4) {
        //     this.calcPerpendicular();
        //     this.group2.visible = true;
        //     this.groupRightAngle.visible = true;
        //     this.groupInnerPoint.visible = true;
        //     this.getOuterPoint();
        //     // this.setRightAngle(1);
        //     this.line_od = common.scaleLine(this.a_pos, this.perpendicularArr[0].pos, this.line_od);
        //     this.line_oe = common.scaleLine(this.b_pos, this.perpendicularArr[1].pos, this.line_oe);
        //     this.line_of = common.scaleLine(this.c_pos, this.perpendicularArr[2].pos, this.line_of);
        // }


    }
    connectOuterAni() {
        // this.group1.visible = true;
        // this.circle.visible = false;
        // let showArrow = (window as any).viewHandler.viewModel.$data.active4;
        // this.triangleGroup.visible = showArrow;
        // (window as any).viewHandler.viewModel.$data.disabledClick = true;
        // Promise.all([
        //     common.lineAni(this.o_pos, this.b_pos, this.line_ob, showArrow && this.triangleArr[0]),
        //     common.lineAni(this.o_pos, this.a_pos, this.line_oa, showArrow && this.triangleArr[1]),
        //     common.lineAni(this.o_pos, this.c_pos, this.line_oc, showArrow && this.triangleArr[2]),
        // ]).then(() => {
        //     this.calcCircleRadius();
        //     (window as any).viewHandler.viewModel.$data.disabledClick = false;
        //     // this.circle.visible = true;//出现圆
        // });
    }
    calcCircleRadius() {
        let dis = Math.hypot(this.o_pos[0] - this.a_pos[0], this.o_pos[1] - this.a_pos[1]);
        this.circle.position.set(...this.o_pos);
        this.circle.scale.set(dis / 10, dis / 10, dis / 10);
    }
    ctrlPointEvt(pos: Object) {
        this.a_pos = [pos.x, pos.y, 0];
        this.scaleLine();
    }
    reset() {
        this.a_pos = [0, 40 * Math.tan(50 * Math.PI / 180) - 30, 0];
        this.group1.visible = this.group2.visible = false;
        this.scaleLine();
    }

    allReset() {}
}