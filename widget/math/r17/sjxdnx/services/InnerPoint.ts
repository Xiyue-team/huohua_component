import * as THREE from 'three';
import common from './CommonForThree';
export default class CenterPoint {
    private a_pos = [0, 40 * Math.tan(50 * Math.PI / 180) - 30, 0];
    private b_pos = [-40, -30, 0];
    private c_pos = [40, -30, 0];
    private o_pos = [0, 0, 0];
    private perpendicularArr = [
        null, null, null
    ];
    private textA = common.createText('A', [10, 35, 0]);
    private textB = common.createText('B', [-45, -30, 0]);
    private textC = common.createText('C', [45, -30, 0]);
    private textO = common.createText('O', [5, 4, 0]);
    private textD = common.createText('D', [0, 0, 0], {color:'#008CFF'});
    private textE = common.createText('E', [0, 0, 0], {color:'#008CFF'});
    private textF = common.createText('F', [0, 0, 0], {color:'#008CFF'});
    private textR = common.createText('r', [0, 0, 0], {color:'#008CFF'});
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
        color: '#000',
        isDash: false,
    });
    private line_ob = common.drawUnitLine({
        color: '#000',
        isDash: false,
    });
    private line_oc = common.drawUnitLine({
        color: '#000',
        isDash: false,
    });
    private line_od = common.drawUnitLine({
        color: '#008CFF',
        isDash: false,
    });
    private line_oe = common.drawUnitLine({
        color: '#008CFF',
        isDash: false,
    });
    private line_of = common.drawUnitLine({
        color: '#008CFF',
        isDash: false,
    });
    private group1 = new THREE.Group();
    private group2 = new THREE.Group();
    private groupRightAngle = new THREE.Group();
    private groupInnerPoint = new THREE.Group;
    private innerPoint = common.drawCircle(1, { color: '#008CFF' });
    private rightAngleE = common.drawRightAngle(2, { color: '#008CFF' });
    private rightAngleD = common.drawRightAngle(2, { color: '#008CFF' });
    private rightAngleF = common.drawRightAngle(2, { color: '#008CFF' });
    private sectorArr = [null, null, null];
    private circle = common.createStrokeCircle(10, { color: '#008CFF' });
    constructor(scene: any, ctrlPoint: any) {
        this.scene = scene;
        this.ctrlPoint = ctrlPoint;
        this.initElement();
    }
    initElement() {
        this.getInnerPoint();
        this.groupInnerPoint.add(this.textO, this.innerPoint);
        this.group1.add(this.line_ob, this.line_oa, this.line_oc, this.groupInnerPoint);

        this.group2.add(this.line_od, this.line_oe, this.line_of, this.groupRightAngle);

        this.groupRightAngle.add(this.rightAngleE, this.rightAngleD, this.rightAngleF, this.textD, this.textE, this.textF, this.circle,this.textR);
        this.scene.add(this.line_bc, this.line_ab, this.line_ac, this.textA, this.textB, this.textC, this.group1, this.group2);
        this.group1.visible = false;
        this.group2.visible = false;
        this.scaleLine();

    }
    getInnerPoint() {
        let a = Math.hypot(this.c_pos[0] - this.b_pos[0], this.c_pos[1] - this.b_pos[1])
        let b = Math.hypot(this.c_pos[0] - this.a_pos[0], this.c_pos[1] - this.a_pos[1])
        let c = Math.hypot(this.a_pos[0] - this.b_pos[0], this.a_pos[1] - this.b_pos[1])
        this.o_pos[0] = (a * this.a_pos[0] + b * this.b_pos[0] + c * this.c_pos[0]) / (a + b + c);
        this.o_pos[1] = (a * this.a_pos[1] + b * this.b_pos[1] + c * this.c_pos[1]) / (a + b + c);
        this.groupInnerPoint.position.set(this.o_pos[0], this.o_pos[1], 1);
    }
    scaleLine() {
        this.textA.position.set(this.a_pos[0] + 10, this.a_pos[1] + 5, 0);
        this.line_bc = common.scaleLine(this.b_pos, this.c_pos, this.line_bc);
        this.line_ac = common.scaleLine(this.a_pos, this.c_pos, this.line_ac);
        this.line_ab = common.scaleLine(this.a_pos, this.b_pos, this.line_ab);

        if ((window as any).viewHandler.viewModel.$data.active2) {
            this.getInnerPoint();
            this.line_ob = common.scaleLine(this.b_pos, this.o_pos, this.line_ob);
            this.line_oa = common.scaleLine(this.a_pos, this.o_pos, this.line_oa);
            this.line_oc = common.scaleLine(this.c_pos, this.o_pos, this.line_oc);
            this.drawSector();
        }

        if ((window as any).viewHandler.viewModel.$data.active3) {
            this.calcPerpendicular();
            this.setRightAngle();
            this.line_od = common.scaleLine(this.o_pos, this.perpendicularArr[0].pos, this.line_od);
            this.line_oe = common.scaleLine(this.o_pos, this.perpendicularArr[1].pos, this.line_oe);
            this.line_of = common.scaleLine(this.o_pos, this.perpendicularArr[2].pos, this.line_of);
        }
    }
    ctrlPointEvt(pos: Object) {
        this.a_pos = [pos.x, pos.y, 0];
        this.scaleLine();

        (window as any).viewHandler.viewModel.$data.triangleText = common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos).info;
    }
    connectInnerAni(val) {
        if (!val) {
            this.group1.visible = false;
            this.group2.visible = false;
            return;
        }
        this.getInnerPoint();

        (window as any).viewHandler.viewModel.$data.disabledClick = true;
        this.group1.remove(...this.sectorArr);
        this.groupInnerPoint.visible = false;
        this.group1.visible = true;
        Promise.all([
            common.lineAni(this.b_pos, this.o_pos, this.line_ob),
            common.lineAni(this.a_pos, this.o_pos, this.line_oa),
            common.lineAni(this.c_pos, this.o_pos, this.line_oc),
        ]).then(() => {

            (window as any).viewHandler.viewModel.$data.disabledClick = false;
            this.groupInnerPoint.visible = true;
            this.drawSector();
        })
    }
    perpendicularAni() {
        this.calcPerpendicular();
        this.groupRightAngle.visible = false;
        this.group2.visible = true;
        (window as any).viewHandler.viewModel.$data.disabledClick = true;
        Promise.all([
            common.lineAni(this.o_pos, this.perpendicularArr[0].pos, this.line_od),
            common.lineAni(this.o_pos, this.perpendicularArr[1].pos, this.line_oe),
            common.lineAni(this.o_pos, this.perpendicularArr[2].pos, this.line_of),
        ]).then(() => {
            this.groupRightAngle.visible = true;

            (window as any).viewHandler.viewModel.$data.disabledClick = false;
            this.setRightAngle();
        })
    }
    drawSector() {
        this.group1.remove(...this.sectorArr);
        this.sectorArr[0] = common.drawSector(this.c_pos, this.b_pos, this.a_pos, { color: '#f8e71c' })
        this.sectorArr[1] = common.drawSector(this.b_pos, this.a_pos, this.c_pos, { color: '#4edfbe' })
        this.sectorArr[2] = common.drawSector(this.a_pos, this.c_pos, this.b_pos, { color: '#e986e1' })
        this.group1.add(...this.sectorArr);
    }
    calcPerpendicular() {
        this.perpendicularArr[0] = common.perpendicularPoint(this.c_pos, this.b_pos, this.o_pos);
        this.perpendicularArr[1] = common.perpendicularPoint(this.a_pos, this.c_pos, this.o_pos);
        this.perpendicularArr[2] = common.perpendicularPoint(this.a_pos, this.b_pos, this.o_pos);
    }
    setRightAngle() {
        common.setPerpendicularPosAndRotate(this.perpendicularArr[0], this.rightAngleD, 1);
        common.setPerpendicularPosAndRotate(this.perpendicularArr[1], this.rightAngleE, 2);
        common.setPerpendicularPosAndRotate(this.perpendicularArr[2], this.rightAngleF, 3);
        this.textD.position.set(this.perpendicularArr[0].pos[0], this.perpendicularArr[0].pos[1] - 2, 0);
        this.textE.position.set(this.perpendicularArr[1].pos[0] + 4, this.perpendicularArr[1].pos[1] + 4, 0);
        this.textF.position.set(this.perpendicularArr[2].pos[0] - 4, this.perpendicularArr[2].pos[1] + 4, 0);
        this.calcCircleRadius();
    }
    hiddenGroup2() {
        this.group2.visible = false;
    }
    calcCircleRadius() {
        let dis = Math.hypot(this.o_pos[0] - this.perpendicularArr[0].pos[0], this.o_pos[1] - this.perpendicularArr[0].pos[1]);
        this.circle.position.set(...this.o_pos);
        this.circle.scale.set(dis / 10, dis / 10, dis / 10);
        this.textR.position.set((this.o_pos[0] + this.perpendicularArr[2].pos[0]) / 2, (this.o_pos[1] + this.perpendicularArr[2].pos[1]) / 2, 0)
    }
    reset() {
        this.a_pos = [0, 40 * Math.tan(50 * Math.PI / 180) - 30, 0];
        this.b_pos = [-40, -30, 0];
        this.c_pos = [40, -30, 0];
        this.ctrlPoint.position.set(...this.a_pos);
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