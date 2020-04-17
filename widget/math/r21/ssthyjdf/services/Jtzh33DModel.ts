import * as THREE from 'three';
import { OrthographicCamera, WebGLRenderer, PerspectiveCamera} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');

OBJLoader(THREE);
let thiz: any = null;
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import common from './CommonForThree';
const MeshLineMaterial = require('three.meshline').MeshLineMaterial;
const MeshLine = require('three.meshline').MeshLine;

export class Jtzh33DModel extends ThreeBase {
    browserInfo: BrowserInfo;
    private ow: any;
    private vertices: any = [];
    private face: any = [];
    private cube: any;
    private material: any;
    private geometry: any;
    private longArr: any = [];

    private num_came: any;

    private line1_group = new THREE.Group();
    private line2_group = new THREE.Group();
    private line1_group1: any = new THREE.Group();
    private line2_group1: any = new THREE.Group();

    private text_group = new THREE.Group();
    private drawRightAngle: any; //直角
    private drawRightAngle1: any; //直角
    private drawRightAngle_group1: any = new THREE.Group();
    private line_group: any = new THREE.Group();

    private curvePointArrayOnXAxis: any = [];
    private curvePointArrayOnXAxis1: any = [];

    private jiantou: any;
    //四个箭头
    private jiantoua: any;
    private jiantoub: any;
    private jiantous: any;
    private jiantoub_min: any;
    private jiantou_group: any = new THREE.Group();
    private dirLight: any;
    
    private line_da: any = common.drawUnitLine({color: '#EF334A', isDash: false});
    private line_cb: any = common.drawUnitLine({color: '#EF334A', isDash: false});
    private line_sf: any = common.drawUnitLine({color: '#EF334A', isDash: false});
    private line_cb_min: any = common.drawUnitLine({color: '#EF334A', isDash: false});
    private text_on: any = common.createText('正视方向', [-120, 120, 300], {color: '#EF334A'});
    
    private line_ab: any = common.drawUnitLine({color: '#F5A623', isDash: false});
    private line_ab_min: any = common.drawUnitLine({color: '#F5A623', isDash: false});
    private line_es: any = common.drawUnitLine({color: '#F5A623', isDash: false});

    private line_aa_min: any = common.drawUnitLine({color: '#5EE3C5', isDash: false});
    private line_bb_min: any = common.drawUnitLine({color: '#5EE3C5', isDash: false});
    private line_cc_min: any = common.drawUnitLine({color: '#5EE3C5', isDash: false});
   
    //出现四个点
    private circlea: any = common.drawSphere(4, {color: '#5EE3C5', position: [-100, 100, -100]});
    private circleb: any = common.drawSphere(4, {color: '#5EE3C5', position: [100, 100, -100]});
    private circles: any = common.drawSphere(4, {color: '#5EE3C5', position: [100, 0, 100]});
    private circleb_min: any = common.drawSphere(4, {color: '#5EE3C5', position: [100, -100, -100]});
    
    //定时器
    private timer: any;
    private timer_next: any;
    private timer_three: any;
    private timer_four: any;

    private color: any;
    private isMake: any = true;
    private resolution: any;
    private matLine: any;
    private color_text: any;

    //画线
    private lineas = common.drawLine([-100, 100, -100], [100, 0, 100], {color: '#000'});
    private lineab = common.drawLine([-100, 100, -100], [100, 100, -100], {color: '#000'});
    private lineab_min = common.drawLine([-100, 100, -100], [100, -100, -100], {color: '#000'});
    private linebs = common.drawLine([100, 100, -100], [100, 0, 100], {color: '#000'});
    private linebb_min = common.drawLine([100, 100, -100], [100, -100, -100], {color: '#000'});
    private linesb_min = common.drawLine([100, 0, 100], [100, -100, -100], {color: '#000'});
    
    private lineArr: any = new THREE.Group();

    private stepf_line = common.drawDresh([-100, 100, -100], [100, 0, -100], {color: '#0199FF'});
    private stepf_line_c = common.drawDresh([100, 0, 100], [100, 0, -100], {color: '#0199FF'});
    private pot: any = {
        'A': [-100, 100, 100],
        'B': [100, 100, 100],
        'C': [100, 100, -100],
        'D': [-100, 100, -100],
        'a': [-100, -100, 100],
        'b': [100, -100, 100],
        'c': [100, -100, -100],
        'd': [-100, -100, -100],
    };
    private pot1: any = {
        'D': [-108, 108, 108],
        'C': [108, 108, 108],
        'B': [108, 108, -108],
        'A': [-108, 108, -108],
        'D1': [-105, -105, 105],
        'C1': [105, -105, 105],
        'B1': [105, -105, -105],
        'A1': [-105, -105, -105],
        'S': [105, 8, 108],
        'O': [105, 8, -105],
        'F': [105, 8, -105],
        'E': [-105, 8, 105]
    };
    private pot2: any = {
        'A': [-100, 100, -100],
        'B': [100, 100, -100],
        'b': [100, -100, -100],
        'S': [100, 0, 100],
    };
    private potArr: any = [];
    
    public orbit: any;
    public obj: any = [];
    public objX: any = [];
    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene, this.camera );
        this.ow = (window as any).viewHandler.viewModel.$data;
        this.longArr = [];
        for (const i of Object.keys(this.pot)) {
            this.longArr.push( this.long1(this.pot[i], i));      
        }
        this.longArr.sort(this.sortBy('long')); //数组的元素进行排序
       for (const i of Object.keys(this.obj)) {
           if ( this.obj[i].name.indexOf( this.longArr[7].name) !== -1) {
               this.obj[i].visible = false;
               this.objX[i].visible = true;
           } else {
               this.obj[i].visible = true;
               this.objX[i].visible = false;
           }
       }
    }

    /**
     *
     * @param {Element} domElement   渲染element
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */
    constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
        super();
        this.fov     = !fov    ? this.fov       : fov;
        this.near    = !near   ? this.near      : near;
        this.far     = !far    ? this.far       : fov;
        this.width   = !width  ? window.innerWidth     : width;
        this.height  = !height ? window.innerHeight    : height;
        this.domElement = domElement;
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.init();

    }
     init() {
        thiz = this;
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.initControl();
        this.render();
        this.initLight();
        this.initLine(1);
        for (let i = 8; i < 12; i++) {
            this.text_group.children[i].visible = false;
        }
        this.ow = (window as any).viewHandler.viewModel.$data;
        console.warn = function () {
        };
    }

    initControl(): void {
        this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
        this.orbit.saveState ();
        this.orbit.enableZoom = false;
        this.orbit.enableDamping = true;
        this.orbit.enableDamping = true;
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;
        this.orbit.enablePan = false;
        this.orbit.enableRotate = true;
    }

    initScene(): void {
        this.scene = new THREE.Scene();
    }

    initCamera(): void {
        const W = window.innerWidth;
        if (W < 900) {
            this.num_came = 1.2;
        } else {
            this.num_came = 3;
        }
        const left    = this.width / - this.num_came;
        const right   = this.width / this.num_came;
        const top     = this.height / this.num_came;
        const bottom  = this.height / - this.num_came;
        const near    = -500;
        const far     = 1000;
        this.camera =  new OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(200, 150, 600);
        this.scene.add(this.camera);
    }

    /**
     * 初始化光源
     */
    initLight(): void {
        const ambientLight = new THREE.AmbientLight( 0xffffff);
        this.camera.add(ambientLight);
        this.dirLight = new THREE.DirectionalLight('#000', 1);
        this.dirLight.position.set(250, 250, 250);
        this.camera.add(this.dirLight);
    }

    initWebGLRenderer(): void {
        if ( this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor('#F8F8F8' , 1 );
        this.renderer.setSize(this.width , this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }
    //初始化场景
    initSceneBox() {
        this.potArr.push(this.line_da, this.line_cb, this.line_sf, this.line_cb_min, this.line_ab,  this.line_ab_min,
            this.line_es, this.line_aa_min, this.line_bb_min, this.line_cc_min
            );
        const pos: any = [0, 0, 0];
        for (let i = 0; i < 10; i++) {
            common.lineAni(pos, pos, this.potArr[i], 3);
        }
        this.addArrows();
        this.jiantou_group.add(this.jiantoua, this.jiantoub, this.jiantoub_min, this.jiantous);
        this.jiantou_group.visible = false;
        this.line_group.add(this.circlea, this.circleb, this.circles, this.circleb_min);
        this.line_group.visible = false;
        this.lineArr.add(this.lineas, this.lineab, this.lineab_min, this.linebs, this.linebb_min, this.linesb_min);
        this.lineArr.visible = false;
        this.scene.add(this.line_da, this.line_cb, this.line_sf, this.line_cb_min);
        this.scene.add(this.line_ab, this.line_ab_min, this.line_es, this.line_group, this.lineArr);
        this.scene.add(this.line_aa_min, this.line_bb_min, this.line_cc_min, this.jiantou_group);
    }
    //生成面
    initModel() {
        this.geometry = new THREE.Geometry();
        this.geometry.vertices = this.vertices;
        this.geometry.faces = this.face;
        //生成法向量
        this.geometry.computeFaceNormals();
        this.material = new THREE.MeshBasicMaterial({
            color: '#4e72b8', 
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.3
        });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);
    }

    //创建箭头
     createArrow(color: any) {
        const jiantou = new THREE.Group();
        const material = new THREE.MeshLambertMaterial({
            color: color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1
        });
        const cylinder1 = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 100, 36, 3), material);
        cylinder1.position.set(-100, 100, 240);
        const cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(5, 0, 20, 36, 3), material);
        cylinder2.position.set(-100, 100, 180);
        jiantou.add(cylinder1, cylinder2);
        return jiantou;
    }

    //添加箭头
    addArrows() {
        this.jiantoua = this.createArrow('#258AD3');
        this.jiantoua.children[0].rotation.z = Math.PI / 4;
        this.jiantoua.children[1].rotation.z = Math.PI / 4;
        this.jiantoua.children[0].position.set(-160, 160, -100);
        this.jiantoua.children[1].position.set(-120, 120, -100);
        this.jiantoub = this.jiantoua.clone();
        this.jiantoub.rotateY(-Math.PI);
        this.jiantoub.position.set(0, 0, -200);
        this.jiantoub_min = this.jiantoub.clone();
        this.jiantoub_min.position.set(0, -200, -200);
        this.jiantous = this.jiantoub_min.clone();
        this.jiantous.position.set(0, -100, 0);
    }
    //场景二更新坐标标识
    Scene1() {
        this.text_group.children[10].visible = false;
        this.text_group.children[11].visible = false;
        this.isMake = false;
        this.initLine(1);
        this.clearTimer();
    }
    Scene2() {
        //清空场景
       if (this.stepf_line) {
        this.scene.remove(this.stepf_line, this.stepf_line_c);
       }
       for (let i = 0; i < 8; i++) {
        if (~['A1', 'C', 'C1', 'D', 'D1'].indexOf(this.text_group.children[i].name)) {
            this.text_group.children[i].visible = true;
        }
    }
        for (let i = 8; i < 12; i++) {
            this.text_group.children[i].visible = false;
        }
        this.scene.remove(this.drawRightAngle_group1, this.line1_group1, this.line2_group1);
        this.isMake = false;
        this.initLine(2);
        this.orbit.reset();
        this.initSceneBox();
        this.jiantou = this.createArrow('#EF334A');
        this.text_on.text = '正视方向';
        this.text_on.position.set(-120, 120, 230);
        this.jiantou.children[0].rotation.x = Math.PI / 2;
        this.jiantou.children[1].rotation.x = Math.PI / 2;
        common.lineAni([-100, 100, 150], [-100, 100, -150], this.line_da, 3);
        common.lineAni([100, 100, 150], [100, 100, -150], this.line_cb, 3);
        common.lineAni([100, 0, 150], [100, 0, -150], this.line_sf, 3);
        common.lineAni([100, -100, 150], [100, -100, -150], this.line_cb_min, 3);
        this.scene.add(this.jiantou, this.text_on);
        this.timer = setTimeout(() => {
            this.jiantou.children[0].rotation.z = Math.PI / 2;
            this.jiantou.children[1].rotation.z = Math.PI / 2;
            this.jiantou.children[0].position.set(-200, 80, -100);
            this.jiantou.children[1].position.set(-150, 80, -100);
            this.text_on.text = '侧视方向';
            this.text_on.position.set(-200, 100, -100);
            common.lineAni([-150, 100, -100], [150, 100, -100], this.line_ab, 1);
            common.lineAni([-150, -100, -100], [150, -100, -100], this.line_ab_min, 1);
            common.lineAni([-150, 0, 100], [150, 0, 100], this.line_es, 1);
            this.timer_next = setTimeout(() => {
                this.jiantou.children[0].rotation.y = Math.PI / 2;
                this.jiantou.children[1].rotation.y = -Math.PI / 2;
                this.jiantou.children[0].position.set(-100, 200, 100);
                this.jiantou.children[1].position.set(-100, 140, 100);
                this.text_on.text = '俯视方向';
                this.text_on.position.set(-100, 200, 100);
                common.lineAni([-100, 150, -100], [-100, -150, -100], this.line_aa_min, 2);
                common.lineAni([100, 150, -100], [100, -150, -100], this.line_bb_min, 2);
                common.lineAni([100, 150, 100], [100, -150, 100], this.line_cc_min, 2);
            this.timer_three = setTimeout(() => {
                this.line_group.visible = true;
                this.jiantou_group.visible = true;
                this.jiantou.visible = false;
                this.text_on.visible = false;
            this.timer_four = setTimeout(() => {
                this.jiantou.visible = true;
                this.text_on.visible = true;
                this.text_group.children[8].visible = true;
                this.text_group.children[10].visible = true;
                this.text_group.children[11].visible = true;
                this.lineArr.visible = true;
                this.jiantou.children[0].position.set(-100, 100, 240);
                this.jiantou.children[1].position.set(-100, 100, 180);
                this.jiantou.children[0].rotation.x = -Math.PI;
                this.jiantou.children[1].rotation.x = -Math.PI;
                this.text_on.text = '正视方向';
                this.text_on.position.set(-120, 120, 230);
            }, 1000);
            }, 2000);
            }, 2200);
        }, 2000);
    }

    Scene3() {
        this.clearTimer();
        this.orbit.reset();
        this.text_group.children[8].visible = true;
        this.text_group.children[9].visible = true;
        this.text_group.children[10].visible = false;
        this.text_group.children[11].visible = false;
        this.drawAngle();
        //清空场景
       if (this.stepf_line) {
        this.scene.remove(this.stepf_line, this.stepf_line_c);
       }
        this.scene.remove(this.cube, this.line1_group, this.line2_group);
        this.step4LineLod();
        for (let i = 0; i < 8; i++) {
            if (~['A1', 'C', 'C1', 'D', 'D1'].indexOf(this.text_group.children[i].name)) {
                this.text_group.children[i].visible = false;
            }
        }
        this.scene.add(this.stepf_line, this.stepf_line_c);
    }

    addLine(start: any, end: any, name: any, {color =  '#000'}) {
        const line1: any = common.drawDresh(start, end, {color: color});
        line1.name = name;
        const line2: any = common.drawLine(start, end, {color: color});
        line2.name = name;
        return {line1, line2};
    }

    step4LineLod() {
        const pot: any = this.pot2;
        const line1 = this.addLine(pot.A, pot.B, 'AB', {color: '#000'});
        const line2 = this.addLine(pot.B, pot.b, 'Bb', {color: '#000'});
        const line3 = this.addLine(pot.A, pot.b, 'Ab', {color: '#000'});
        const line4 = this.addLine(pot.A, pot.S, 'AS', {color: '#000'});
        const line5 = this.addLine(pot.S, pot.B, 'SB', {color: '#000'});
        const line6 = this.addLine(pot.S, pot.b, 'Sb', {color: '#000'});
        const p1 = [line3.line1];
        const p2 = [line1.line2, line2.line2, line5.line2, line6.line2, line4.line2];
        this.line1_group1.add(...p2);
        this.line2_group1.add(...p1);
        this.scene.add(this.line1_group1, this.line2_group1);
    }
    //清空定时器
    clearTimer() {
        clearTimeout(this.timer);
        clearTimeout(this.timer_next);
        clearTimeout(this.timer_three);
        clearTimeout(this.timer_four);
        this.scene.remove(this.jiantou, this.text_on);
        this.scene.remove(this.line_da, this.line_cb, this.line_sf, this.line_cb_min);
        this.scene.remove(this.line_ab, this.line_ab_min, this.line_es);
        this.scene.remove(this.line_aa_min, this.line_bb_min, this.line_cc_min);
        this.line_group.visible = false;  
        this.jiantou_group.visible = false; 
        this.lineArr.visible = false;
        this.text_group.children[8].visible = false;  
        this.text_group.children[9].visible = false;    
    }
    //画直角
    drawAngle() {
        this.curvePointArrayOnXAxis = [];
        this.curvePointArrayOnXAxis1 = [];

        this.curvePointArrayOnXAxis.push(
            new THREE.Vector3(0, 10, 0),
            new THREE.Vector3(10, 10, 0));
        this.curvePointArrayOnXAxis1.push(
            new THREE.Vector3(8, 10, 0),
            new THREE.Vector3(8, 0, 0));
        this.drawRightAngle = this.drawLine(this.curvePointArrayOnXAxis);
        this.drawRightAngle1 = this.drawLine(this.curvePointArrayOnXAxis1);
        this.drawRightAngle_group1.add(this.drawRightAngle, this.drawRightAngle1);
        this.drawRightAngle_group1.position.set(100, 0, -100);
        this.drawRightAngle_group1.rotation.y = 90.7 ;
        this.drawRightAngle_group1.rotation.x = Math.PI / 2;
        this.scene.add(this.drawRightAngle_group1);
    }

    createLine (start: any, end: any, name: any, num: number) {
        if (num === 1) {
            this.color = '#000';
        } else {
            this.color = '#258AD3';
        }
        let line1: any = common.drawUnitLine({ width: 2, color: this.color, isDash: true });
        let line2: any = common.drawUnitLine({ width: 2, color: this.color, isDash: false });
          line1 = common.scaleLine(start, end, line1);
          line1.name = name;
          line2 = common.scaleLine(start, end, line2);
          line2.name = name;
          line2.visible = false;
          this.obj.push(line1);
          this.objX.push(line2);
          this.line1_group.add(line1);
          this.line2_group.add(line2);
          this.scene.add(this.line1_group);
          this.scene.add(this.line2_group);
      }

    drawLine (obj: any) {
        const geometry = new THREE.Geometry();
        geometry.vertices = obj;
        const materity = new THREE.LineDashedMaterial({
            color: '#DC143C',
            opacity: 0.8,
            dashSize: 8,
            gapSize: 5,
            depthTest: false
    });
        const lineMesh = new THREE.LineSegments(geometry, materity);
        lineMesh.computeLineDistances();
        return lineMesh;
    }
    //数组排序方法
    sortBy(field: any) {
        return function(a: any, b: any) {
            return a[field] - b[field];
        };
    }


    long1(obj: any, name: any): any {
        const op: any = {'x': '', 'y': '', 'z': ''};
        op.x = obj[0];
        op.y = obj[1];
        op.z = obj[2];
        const cp =  this.camera.position;

        const long = Math.sqrt(((op.x - cp.x) * (op.x - cp.x)) + ((op.y - cp.y) * (op.y - cp.y)) + ((op.z - cp.z) * (op.z - cp.z)));
        return {'name': name, 'long': long};
    }

    initLine(num: number): void {
        const pot: any = this.pot;

        this.createLine(pot.A, pot.B, 'AB', num);
        this.createLine(pot.A, pot.D, 'AD', num);
        this.createLine(pot.A, pot.a, 'Aa', num);
        this.createLine(pot.B, pot.C, 'BC', num);
        this.createLine(pot.B, pot.b, 'Bb', num);
        this.createLine(pot.C, pot.D, 'CD', num);
        this.createLine(pot.C, pot.c, 'Cc', num);
        this.createLine(pot.D, pot.d, 'Dd', num);
        this.createLine(pot.a, pot.b, 'ab', num);
        this.createLine(pot.a, pot.d, 'ad', num);
        this.createLine(pot.b, pot.c, 'bc', num);
        this.createLine(pot.c, pot.d, 'cd', num);

        if (this.isMake) {
            for (const i of Object.keys(this.pot1)) {
                const text = this.creratText(i, this.pot1[i], i);
                this.text_group.add(text);
                this.scene.add(this.text_group);
           }
        }
    }
    createLineMesh(start: any, end: any, name: any, num: number, numb: number, width: any) {
        const vertices: any = [];
        vertices.push(
            new THREE.Vector3(start[0], start[1], start[2]),
            new THREE.Vector3(end[0], end[1], end[2])
        );
        const mainWidth = this.width;
        const mainHeight = this.height;
        this.resolution = new THREE.Vector2(mainWidth, mainHeight);
        if (numb === 1) {
            this.color_text = '#000';
        } else {
            this.color_text = '#258AD3';
        }
        const g = new MeshLine();
        const geometry = new THREE.Geometry();
        geometry.vertices = vertices;
        g.setGeometry(geometry);
        if (num === 2) {
            this.matLine = new MeshLineMaterial( {
                color: this.color_text,
                linewidth: width,
                resolution: this.resolution,
                dashed: false,
                dashSize : 10,
                gapSize : 10,
                dashScale: 1,
                depthTest: false,
                transparent: true
            } );
            this.matLine.defines.USE_DASH = '';
        } else if (num === 3) {
            this.matLine = new MeshLineMaterial( {
                color: this.color_text,
                linewidth: width,
                resolution: this.resolution,
                transparent: true,
                depthTest: false
            });
        } else if (num === 4) {
            this.matLine = new MeshLineMaterial( {
                color: this.color_text,
                linewidth: width,
                resolution: this.resolution,
            });
        }
        const lineMesh = new THREE.Line( geometry, this.matLine );
        lineMesh.computeLineDistances();
        lineMesh.name = name;
        this.scene.add(lineMesh);
    }

    creratText (text: any, pos: any, name: any) {
        return common.createText1(text, pos, name, { 'color': '#000'});
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

}
