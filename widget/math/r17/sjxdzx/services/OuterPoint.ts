import * as THREE from 'three';
import common from './CommonForThree';
import * as console from 'console';
export default class CenterPoint {
    private a_pos = [0, 40 * Math.tan(50 * Math.PI / 180) - 30, 0];
    private b_pos = [-40, -30, 0];
    private c_pos = [40, -30, 0];
    private o_pos = [0, 0, 0];
    private perpendicularArr = [
        null, null, null
    ];
    private ctrlPoint: any;
    private dian: any;
    private ft = false;
    private triangleArr = [
        common.drawTriangle({ color: '#FFFF00' }),
        common.drawTriangle({ color: '#FF4500' }),
        common.drawTriangle({ color: '#008CFF' }),

        common.drawTriangle({ color: '#FFFF00' }),
        common.drawTriangle({ color: '#FF4500' }),
        common.drawTriangle({ color: '#008CFF' }),
    ];
    private triangleGroup = new THREE.Group();
    private textA = common.createText('A', [10, 35, 0]);
    private textH = common.createText('H', [0, 0, -1]);
    private textB = common.createText('B', [-45, -30, 0]);
    private textC = common.createText('C', [45, -30, 0]);
    private textO = common.createText('G  ', [5, 4, 0], { color: '#008CFF' });
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
        color: '#FF4500',
        isDash: false,
    });
    private line_ob = common.drawUnitLine({
        color: '#FFD700',
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
        color: '#000',
        isDash: false,
    });
    private line_oh = common.drawUnitLine({
        color: '#000',
        isDash: false,
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
  private line_os = common.drawUnitLine({
    color: '#FF4500',
    isDash: false,
  });
  private line_ot = common.drawUnitLine({
    color: '#7CFC00',
    isDash: false,
  });
  private line_ou = common.drawUnitLine({
    color: '#FF4500',
    isDash: true,
  });
  private line_ov = common.drawUnitLine({
    color: '#FFD700',
    isDash: true,
  });
  private line_ow = common.drawUnitLine({
    color: '#008CFF',
    isDash: true,
  });
    private group1 = new THREE.Group();
    private group2 = new THREE.Group();
    private group3 = new THREE.Group();
    private groupRightAngle = new THREE.Group();
    private groupInnerPoint = new THREE.Group;
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
        this.group1.add(this.line_ob, this.line_oa, this.line_oc, this.triangleGroup, this.line_ou, this.line_ov);
        
        this.group2.add(this.line_od, this.line_oe, this.line_of, this.groupRightAngle, this.groupInnerPoint, this.groupTwoLine);
        this.group3.add(this.textD, this.textE, this.textC);
        this.groupRightAngle.add(this.textD, this.textE, this.textF);
        this.scene.add(this.line_bc, this.line_ab, this.line_ac, this.textA, this.textB, this.textC, 
            this.group1, this.group2, this.circle, this.line_ow);
        this.group1.visible = false;
        this.group2.visible = false;
        this.circle.visible = false;
        this.line_ou.visible = false;
        this.line_ov.visible = false;
        this.line_ow.visible = false;
        this.scaleLine();

    }
  getOuterPoint() {
    //重心坐标
    const [x1, y1] = this.a_pos;
    const [x2, y2] = this.b_pos;
    const [x3, y3] = this.c_pos;
    const x  = (x1 + x2 + x3) / 3;
    const y  = (y1 + y2 + y3) / 3;
    this.o_pos = [x, y, 0];

    this.groupInnerPoint.position.set(this.o_pos[0], this.o_pos[1], 1);
  }
    calcPerpendicular() {
        //直线中心坐标
        this.perpendicularArr[0] = common.zhongDian(this.c_pos, this.b_pos);
        this.perpendicularArr[1] = common.zhongDian(this.a_pos, this.b_pos);
        this.perpendicularArr[2] = common.zhongDian(this.a_pos, this.c_pos);

    }
//做中线
  drawOuterPoint() {
    this.line_od.visible = true;
    this.line_of.visible = true;
    this.line_oe.visible = true;
    this.calcPerpendicular();
    this.setRightAngle();
    this.setTwoLinePosAndRotate();
    this.group2.visible = true;
    this.groupRightAngle.visible = false;
    this.groupInnerPoint.visible = false;
    this.getOuterPoint();
    (window as any).viewHandler.viewModel.$data.disabledClick = true;

    Promise.all([
      common.lineAni(this.a_pos, this.perpendicularArr[0].pos, this.line_od),
      common.lineAni(this.c_pos, this.perpendicularArr[1].pos, this.line_oe),
      common.lineAni(this.b_pos, this.perpendicularArr[2].pos, this.line_of),
    ]).then(() => {
      this.groupRightAngle.visible = true;
      this.groupInnerPoint.visible = true;
      (window as any).viewHandler.viewModel.$data.disabledClick = false;
    });
  }
    setRightAngle() {
      this.calcPerpendicular();

        this.textD.position.set(this.perpendicularArr[0].pos[0] - 3, this.perpendicularArr[0].pos[1] - 2, 0);
        this.textE.position.set(this.perpendicularArr[1].pos[0] - 4, this.perpendicularArr[1].pos[1] + 4, 0);
        this.textF.position.set(this.perpendicularArr[2].pos[0] + 4, this.perpendicularArr[2].pos[1] + 4, 0);
    }
    //计算向量
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
            mesh.rotation.z = resRotate[index]+Math.PI/2;
        });
    }
    scaleLine() {
        this.calcPerpendicular();
        this.getOuterPoint();
        this.setRightAngle();
        this.textA.position.set(this.a_pos[0] + 10, this.a_pos[1] + 5, 0);
        this.line_bc = common.scaleLine(this.b_pos, this.c_pos, this.line_bc);
        this.line_ac = common.scaleLine(this.a_pos, this.c_pos, this.line_ac);
        this.line_ab = common.scaleLine(this.a_pos, this.b_pos, this.line_ab);

        if ((window as any).viewHandler.viewModel.$data.active2) {
          this.calcPerpendicular();
          this.group2.visible = true;
          this.groupRightAngle.visible = true;
          this.groupInnerPoint.visible = true;
          this.getOuterPoint();

            this.line_od = common.scaleLine(this.a_pos, this.perpendicularArr[0].pos, this.line_od);
            this.line_of = common.scaleLine(this.b_pos, this.perpendicularArr[2].pos, this.line_of);
            this.line_oe = common.scaleLine(this.c_pos, this.perpendicularArr[1].pos, this.line_oe);
        }

        if ((window as any).viewHandler.viewModel.$data.active3 || (window as any).viewHandler.viewModel.$data.active4) {
            this.line_ob = common.scaleLine(this.b_pos, this.o_pos, this.line_ob);
            this.line_oa = common.scaleLine(this.a_pos, this.o_pos, this.line_oa);
            this.line_oc = common.scaleLine(this.c_pos, this.o_pos, this.line_oc);
            this.calcCircleRadius();
            if ((window as any).viewHandler.viewModel.$data.active4) {
                const one = common.pxsbx(this.a_pos, this.b_pos, this.o_pos);
                this.triangleArr[1].position.set(...this.a_pos);
                this.triangleArr[0].position.set(...this.b_pos);
                this.triangleArr[2].position.set(...this.c_pos);
                this.triangleArr[4].position.set(...one);
                this.triangleArr[3].position.set(...one);
                this.triangleArr[5].position.set(...one);
                this.triangleArr[1].rotation.z = this.calcTriangleRotate(this.o_pos, this.a_pos);
                this.triangleArr[0].rotation.z = this.calcTriangleRotate(this.o_pos, this.b_pos);
                this.triangleArr[2].rotation.z = this.calcTriangleRotate(this.o_pos, this.c_pos);
                this.triangleArr[4].rotation.z = this.calcTriangleRotate(this.o_pos, this.a_pos);
                this.triangleArr[3].rotation.z = this.calcTriangleRotate(this.o_pos, this.b_pos);
                this.triangleArr[5].rotation.z = this.calcTriangleRotate(this.o_pos, one);
            }
        }
    }
    hide () {
         this.line_ob.visible = false;
         this.line_oa.visible = false;
         this.line_oc.visible = false;
         this.triangleArr[0].visible = false;
         this.triangleArr[1].visible = false;
         this.triangleArr[2].visible = false;
     }
    visible () {
        this.line_ob.visible = true;
        this.line_oa.visible = true;
        this.line_oc.visible = true;
        this.triangleArr[0].visible = true;
        this.triangleArr[1].visible = true;
        this.triangleArr[2].visible = true;
    }
    //三等分点
  connectMidPoint() {
      if (!(window as any).viewHandler.viewModel.$data.active4) {
        this.line_ow.visible = false;
        this.textH.visible = false;
        this.scene.remove(this.line_og);
        this.scene.remove(this.line_oh);
      }
      this.line_of.visible = true;
      this.line_od.visible = false;
      this.scene.remove(this.dian);
      this.triangleArr[5].visible = false;
      this.getOuterPoint();
      this.calcPerpendicular();
      this.line_os = common.scaleLine(this.o_pos, this.a_pos, this.line_os);
      this.line_ot = common.scaleLine(this.o_pos, this.perpendicularArr[0].pos, this.line_ot);
      const x1 = this.perpendicularArr[0].pos[0] + 2 * (this.a_pos[0] - this.perpendicularArr[0].pos[0]) / 3;
      const y1 = this.perpendicularArr[0].pos[1] + 2 * (this.a_pos[1] - this.perpendicularArr[0].pos[1]) / 3;
      const z1 = 2;
      this.dian = common.drawCircle(1, {color: '#000', position: [x1, y1 , z1]}),
      this.line_os.position.z = 0.05;
      this.line_ot.position.z = 0.05;
      this.scene.add(this.line_os, this.line_ot, this.dian);

      if ((window as any).viewHandler.viewModel.$data.active3) {
        this.triangleArr[4].visible = false;
        this.triangleArr[3].visible = false;
        this.line_ou.visible = false;
        this.line_ov.visible = false;
      }
    }

    //做向量
    connectOuterAni() {
        this.scene.remove(this.line_os, this.line_ot, this.dian);
        this.line_od.visible = true;
        this.triangleArr[5].visible = false;
        this.group1.visible = true;
        this.circle.visible = false;
        const showArrow = (window as any).viewHandler.viewModel.$data.active4;
        this.triangleGroup.visible = showArrow;
        (window as any).viewHandler.viewModel.$data.disabledClick = true;
        const one = common.pxsbx(this.a_pos, this.b_pos, this.o_pos);
        this.line_oh = common.scaleLine(this.o_pos, this.perpendicularArr[0].pos, this.line_oh);
        this.scene.add(this.line_oh);
        this.line_od.position.z = -0.2;
        this.line_oe.position.z = -0.2;
        this.line_of.position.z = -0.2;

        Promise.all([
            common.lineAni(this.o_pos, this.b_pos, this.line_ob, showArrow && this.triangleArr[0]),
            common.lineAni(this.o_pos, this.a_pos, this.line_oa, showArrow && this.triangleArr[1]),
            common.lineAni(this.o_pos, this.b_pos, this.line_ou, showArrow && this.triangleArr[3]),
            common.lineAni(this.o_pos, this.a_pos, this.line_ov, showArrow && this.triangleArr[4]),
            common.lineAni(this.o_pos, this.c_pos, this.line_oc, showArrow && this.triangleArr[2]),
        ]).then(() => {
            this.line_of.visible = false;
            this.line_ou.visible = true;
            this.line_ov.visible = true;
            this.line_od.visible = false;
            this.triangleArr[3].visible = true;
            this.triangleArr[4].visible = true;  
            this.line_og = common.scaleLine(this.o_pos, this.perpendicularArr[2].pos, this.line_og);
            this.scene.add(this.line_og);
            (window as any).viewHandler.viewModel.$data.disabledClick = false;

            //平行四边形另外一点
            const startPos1 = this.triangleArr[4].position;
            const startPos2 = this.triangleArr[3].position;
            common.scaleLine(this.o_pos, this.a_pos, this.line_ou);
            common.scaleLine(this.o_pos, this.b_pos, this.line_ov);
            common.linePushAlin(one, this.b_pos, this.o_pos, this.a_pos, this.line_ou, this.line_ov, 
            startPos2, startPos1, one, this.triangleArr[3], this.triangleArr[4]);
            Promise.all([
                this.line_ow.visible = true,
                this.triangleArr[5].visible = true,
                common.lineAni(this.o_pos, one, this.line_ow, this.triangleArr[5])
            ]).then(() => {
                this.textH.visible = true,
                this.textH.position.set(one[0] - 4, one[1] + 3, one[2]);
                this.scene.add(this.textH);
            });
        });
    }

    calcCircleRadius() {
        let dis = Math.hypot(this.o_pos[0] - this.a_pos[0], this.o_pos[1] - this.a_pos[1]);
        this.circle.position.set(...this.o_pos);
        this.circle.scale.set(dis / 10, dis / 10, dis / 10);
    }

    arrowEvt() {
        if ((window as any).viewHandler.viewModel.$data.active4) {
            const one = common.pxsbx(this.a_pos, this.b_pos, this.o_pos);
            this.textH.position.set(one[0] - 4, one[1] + 3, one[2]);
            this.line_ou.visible = true;
            this.line_ov.visible = true;
            this.triangleArr[4].visible = true;
            this.triangleArr[3].visible = true;
            this.line_og = common.scaleLine(this.o_pos, this.perpendicularArr[2].pos, this.line_og);
            this.line_oh = common.scaleLine(this.o_pos, this.perpendicularArr[0].pos, this.line_oh);  
            common.scaleLine(this.a_pos, one, this.line_ov);
            common.scaleLine(this.b_pos, one, this.line_ou);
            common.scaleLine(this.o_pos, one, this.line_ow);
        }
    }
    ctrlPointEvt(pos: Object) {
        this.a_pos = [pos.x, pos.y, 0];
        this.scaleLine();
        this.setTwoLinePosAndRotate();
        if ((window as any).viewHandler.viewModel.$data.tf) {
            this.connectMidPoint();
        }
        this.arrowEvt();
        this.line_od.position.z = -0.2;
        this.line_oe.position.z = -0.2;
        this.line_of.position.z = -0.2;

        (window as any).viewHandler.viewModel.$data.triangleText = common.basicTriangleInfo(this.a_pos, this.b_pos, this.c_pos).info;
    }
    //按钮二重置
    reset() {
        (window as any).viewHandler.viewModel.$data.disabledClick = false;
        (window as any).viewHandler.viewModel.$data.tf = false;
        this.line_ou.position.set(0, 0, 0);
        this.line_ov.position.set(0, 0, 0);
        this.line_ou.visible = false;
        this.line_ov.visible = false;
        this.triangleArr[1].position.set(0, 17.234, 0);
        this.triangleArr[0].position.set(-39.6, -29.841, 0); 
        this.scene.remove(this.line_od);
        this.scene.remove(this.line_oe);
        this.scene.remove(this.line_of);
        this.scene.remove(this.line_om);
        this.scene.remove(this.line_on);
        this.scene.remove(this.line_oo);
        this.scene.remove(this.line_op);
        this.scene.remove(this.line_oj);
        this.scene.remove(this.line_og);
        this.scene.remove(this.line_oh);
        this.scene.remove(this.line_ok);
        this.scene.remove(this.line_ol);
        this.scene.remove(this.line_oi);
        this.scene.remove(this.line_oq);
        this.scene.remove(this.line_or);
        this.scene.remove(this.line_os);
        this.scene.remove(this.line_ot);
        this.line_ow.visible = false;
        this.scene.remove(this.textH);
        this.scene.remove(this.dian);
        this.group1.visible = false;
        this.group2.visible = false;
        this.circle.visible = false;
        (window as any).viewHandler.viewModel.$data.active3 = false;
        (window as any).viewHandler.viewModel.$data.active4 = false;
        this.scaleLine();
    }
    //整体重置
    allReset() {
        (window as any).viewHandler.viewModel.$data.active1 = false;
        this.a_pos = [0, 40 * Math.tan(50 * Math.PI / 180) - 30, 0];
        this.b_pos = [-40, -30, 0];
        this.c_pos = [40, -30, 0];
        this.o_pos = [0, 0, 0];
        this.ctrlPoint.position.set(-0, 40 * Math.tan(50 * Math.PI / 180) - 30, 2);
        this.reset();
    }
}
