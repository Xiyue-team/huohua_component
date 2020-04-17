import * as THREE from 'three';
import { OrthographicCamera, WebGLRenderer, PerspectiveCamera, Scene, Color } from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');

OBJLoader(THREE);
let thiz: any = null;
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import common from './CommonForThree';
import {SliderControlLine} from './SliderControlLine';
import * as jt from '../sub_static/jt.png';

export class Jtzh33DModel extends ThreeBase {

    browserInfo: BrowserInfo;
    sliderControlLine: SliderControlLine;

    private linea_c: any = common.drawUnitLine({width: 1, color: '#DC143C', isDash: false});
    private linea_c_t: any = common.drawUnitLine({width: 1, color: '#F0E68C', isDash: false});
    private linea_b: any = common.drawUnitLine({width: 1, color: '#4ACBC9', isDash: false});
    private linea_b_copy: any = common.drawUnitLine({width: 1, color: '#4ACBC9', isDash: true});
    private linea_b1: any = common.drawUnitLine({width: 1, color: '#4ACBC9', isDash: false});
    private linea_b_copy1: any = common.drawUnitLine({width: 1, color: '#4ACBC9', isDash: true});

    private line_sb = common.scaleLine([100, 0, 100], [100, 100, -100], this.linea_b, 1, 1);
    private line_sb_copy = common.scaleLine([100, 0, 100], [100, 100, -100], this.linea_b_copy, 1, 1);
    private line_sb1 = common.scaleLine([100, 0, 100], [100, -100, -100], this.linea_b1, 1, 1);
    private line_sb_copy1 = common.scaleLine([100, 0, 100], [100, -100, -100], this.linea_b_copy1, 1, 1);

    private line_ac = common.scaleLine([-100, -100, 100], [100, -100, -100], this.linea_c);
    private line_act = common.scaleLine([-100, 100, -100], [100, 100, 100], this.linea_c_t);
    private line_ab1 = common.drawDresh([-100, 100, -100], [100, -100, -100], {color: '#F0E68C'});
    private line_ab1_copy = common.drawDashOrLine(
      [{x: -100, y: 100, z: -100}, {x: 100, y: -100, z: -100}], {color: '#F0E68C', isDash: true});
    private circle_a = common.drawSphere(2, {color: '#0199FF'});
    private circle_a_plane = common.drawSphere(30, {color: '#0199FF', position: [-100, -100, -100]});
    private circle_c = common.drawSphere(2, {color: '#0199FF'});
    private circle_c_plane = common.drawSphere(30, {color: '#0199FF', position: [100, 100, 100]});
    private circle_c1 = common.drawSphere(2, {color: '#0199FF'});
    private circle_c1plane = common.drawSphere(30, {color: '#0199FF', position: [100, -100, 100]});
    private janitor = common.createImg([0, 0, 0], 32, 32, jt); //C1
    private mesh = common.createImg([0, 0, 0], 32, 32, jt); //A1
    private mesh_mesh = common.createImg([0, 0, 0], 32, 32, jt); //C
    private circles = common.drawSphere(2, {color: '#4ACBC9', position: [100, 0, 100]});

    private ow: any;
    private vertices: any = [];
    private face: any = [];

    private cube: any;
    private timer: any;
    private material: any;
    private geometry: any;
    private c_group: any = new THREE.Group(); //C1组
    private a_group: any = new THREE.Group(); //A1组
    private c_group_t: any = new THREE.Group(); //C组

    private step3group: any = new THREE.Group(); //第三步实线组
    private step3_group_hide: any = new THREE.Group(); //第三步虚线组

    private num: any = -100;
    private longArr: any = [];

    private isMake: any = false;
    private num_came: any;
    private sil_der_point_a_arr: any = [];
    private sil_der_point_a_arr1: any = [];

    private sil_der_point_a1: any;
    private sil_der_point_a1c1: any;
    private sil_der_point_c: any = [];
    private sil_der_point_c1: any = 100;

    private line_text: any;
    private line_text1: any = -100;
    private line_text2: any;
    private line_text3: any = -100;

    private line_ac_ani1: any;
    private line_ab_ani2: any;

    //拖动变换填充
    private drag_num_a1: any = -100;
    private drag_num_c: any = 100;
    private drag_num_c1: any = -100;

    private y_pos1: any;
    private y_pos2: any;
    private y_pos3: any;
    private ji_shu: any = -100;

    private vit_ec_s: any = [];
    private faces: any = [];
    private cube_plane: any;
    private is_make: any = true;

    private line1_group = new THREE.Group();
    private line2_group = new THREE.Group();
    private line2_group1: any = new THREE.Group();

    private text_group = new THREE.Group();
    private stepf_line = common.drawDresh([-100, 100, -100], [100, 0, -100], {color: '#0199FF'});
    private stepf_line_c = common.drawDresh([100, 0, 100], [100, 0, -100], {color: '#0199FF'});
    private drawRightAngle: any; //直角
    private drawRightAngle1: any; //直角
    private drawRightAngle_group1: any = new THREE.Group();

    private curvePointArrayOnXAxis: any = [];
    private curvePointArrayOnXAxis1: any = [];

    private is_draga: any = false;
    private is_dragc: any = false;
    private is_dragc_min: any = false;

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
        'O': [105, 8, -105]
    };
    private pot2: any = {
        'A': [-100.5, 100.5, -100.5],
        'B': [100.5, 100.5, -100.5],
        'b': [100.5, -100.5, -100.5],
        'S': [100.5, 0, 100.5],
    };
    
    public orbit: any;
    public obj: any = [];
    public objX: any = [];
    public obj1: any = [];
    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene, this.camera );
        this.ow = (window as any).viewHandler.viewModel.$data;
        if (this.ow.isMake4) {
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
       if (this.isMake) {
        if (!this.obj[10].visible) {
            this.step3_group_hide.visible = false;
            this.step3group.visible = true;
           } else {
            this.step3_group_hide.visible = true;
            this.step3group.visible = false;
           }
           if (!this.obj[11].visible) {
            this.line_ab1.visible = true;
            this.line_ab1_copy.visible = false;
           } else {
            this.line_ab1.visible = false;
            this.line_ab1_copy.visible = true;
           }
       }
       this.sil_der_point_c = [
        new THREE.Vector3(-100, 100, -100),
        new THREE.Vector3(100, this.sil_der_point_c1, 100)
    ];
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
        this.initLine(); 
        this.initSw();
        this.initEvt();
        this.drawPlane();
        this.ow = (window as any).viewHandler.viewModel.$data;
        console.warn = function () {
        };
    }
    initScene(): void {
        this.scene = new THREE.Scene();
    }

    initCamera(): void {
        const W = window.innerWidth;
        if (W < 900) {
            this.num_came = 1.5;
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
        this.camera.position.set(100, 100, 250);
        this.scene.add(this.camera);
    }

    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    initControl(): void {
        this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
        this.orbit.saveState();
        this.orbit.enableZoom = false;
        this.orbit.enableDamping = true;
        this.orbit.enableDamping = true;
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;
        this.orbit.enablePan = false;
        this.orbit.enableRotate = true;
    }

    //初始化场景
    initSw() {
        this.circle_c1plane.name = 'C1';
        this.circle_a_plane.name = 'A1';
        this.circle_c_plane.name = 'C';
    }
    initPoint() {
        this.vertices = [
            new THREE.Vector3(-100, this.drag_num_a1, -100), //A1
            new THREE.Vector3(100, -100, -100), //B1
            new THREE.Vector3(100, this.drag_num_c1, 100), //C1
            new THREE.Vector3(-100, -100, 100), //D1
            new THREE.Vector3(-100, this.num, -100), //A1上的点
            new THREE.Vector3(100, this.num, -100), //B1上的点
            new THREE.Vector3(100, this.drag_num_c, 100), //C1上的点
            new THREE.Vector3(-100, this.num, 100), //D1上的点
        ];
        this.face = [
            new THREE.Face3(0, 1, 2),
            new THREE.Face3(0, 2, 6),
            new THREE.Face3(0, 4, 6),
            new THREE.Face3(4, 5, 6),
            new THREE.Face3(0, 4, 5),
            new THREE.Face3(0, 1, 5),
            new THREE.Face3(1, 2, 5),
            new THREE.Face3(2, 6, 5),
        ];
        this.vit_ec_s = [
            new THREE.Vector3(-100, 100, -100), 
            new THREE.Vector3(100, 100, -100),
            new THREE.Vector3(100, 0, 100), 
            new THREE.Vector3(100, -100, -100), 
        ];
        this.faces = [
            new THREE.Face3(0, 2, 1),
            new THREE.Face3(0, 2, 3),
            new THREE.Face3(0, 1, 3),
            new THREE.Face3(1, 2, 3),
        ];
    }

    initVerpoint(num: number, numb: number) {
        this.line_text = [
            new THREE.Vector3(-100, this.line_text1, -100),
            new THREE.Vector3(100, numb, num)
        ];
    }

    initVerpoint1() {
        this.sil_der_point_a_arr = [
            new THREE.Vector3(100, this.drag_num_c, 100),
            new THREE.Vector3(100, 100, -100)
        ];
    }

    initVerpoint2() {
        this.sil_der_point_a_arr1 = [
            new THREE.Vector3(100, this.ji_shu, 100),
            new THREE.Vector3(100, -100, -100)
        ];
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
            opacity: 0.3,
        });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);
    }
    Scene1() {
        this.text_group.children[9].visible = false;
        this.orbit.reset();
        this.text_group.children[8].visible = false;
        this.text_group.children[9].visible = false;
        clearTimeout(this.timer);
        this.num = -100;
        this.drag_num_c = 100;
        this.initPoint();
        this.scene.remove(this.line_ac, this.line_act);
        this.scene.remove(this.cube, this.c_group, this.a_group, this.c_group_t);
    }
    Scene2() {
        this.orbit.reset();
        this.line_act.visible = true;
        this.line_ac.visible = true;
        this.is_draga = false;
        this.is_dragc = false;
        this.is_dragc_min = false;
        this.line_act.rotation.y = -Math.PI / 4;
        this.text_group.children[8].visible = false;
        this.text_group.children[9].visible = false;
        this.scene.remove(this.circle_c1plane, this.circle_a_plane, this.circle_c_plane,
          this.circles, this.step3group, this.step3_group_hide);
        this.scene.remove(this.line_text2, this.line_ab_ani2, this.line_ac_ani1);
        this.scene.remove(this.sil_der_point_a1, this.sil_der_point_a1c1);
        this.scene.remove(this.cube);
        this.c_group.add(this.circle_c1);
        this.a_group.add(this.circle_a);
        this.c_group_t.add(this.circle_c);
        this.c_group.position.set(100, -100, 100);
        this.a_group.position.set(-100, -100, -100);
        this.c_group_t.position.set(100, 100, 100);
        this.c_group.remove(this.janitor);
        this.a_group.remove(this.mesh);
        this.c_group_t.remove(this.mesh_mesh);
        this.scene.add(this.line_ac, this.line_act);
        this.scene.add(this.a_group, this.c_group_t, this.c_group);
        this.initModel();
        this.initVerpoint(100, -100);
        this.line_text2 = this.drawLine(this.line_text);
        this.initVerpoint(-100, -100);
        this.line_ab_ani2 = this.drawLine(this.line_text);
        this.line_ac_ani1 = this.drawLine(this.line_text);
        this.initVerpoint1();
        this.sil_der_point_a1 = this.drawLine(this.sil_der_point_a_arr);
        this.initVerpoint2();
        this.sil_der_point_a1c1 = this.drawLine(this.sil_der_point_a_arr1);
        this.sil_der_point_a1.visible = false;
        this.sil_der_point_a1c1.visible = false;
        this.line_ac_ani1.visible = false;
        this.line_ab_ani2.visible = false;
        this.line_text2.visible = false; 
        this.scene.add(this.line_text2, this.line_ab_ani2, this.line_ac_ani1);
        this.scene.add(this.sil_der_point_a1, this.sil_der_point_a1c1);
        this.num = -100;
        this.drag_num_c = 100;
        this.y_pos1 = -100;
        this.y_pos2 = 100;
        this.y_pos3 = -100;
        this.drag_num_a1 = -100;
        this.drag_num_c1 = -100;
        this.drag_num_c = -100;
        function planeAni() {
            const geometry = new THREE.Geometry();
            if (thiz.num > 100) {
                clearTimeout(thiz.timer);
                return;
            }
                thiz.initPoint();
                geometry.vertices = thiz.vertices;
                geometry.faces = thiz.face;
                geometry.computeFaceNormals();
                thiz.cube.geometry = geometry;
                thiz.num += 2;
                thiz.drag_num_c += 2;
                thiz.timer = setTimeout(planeAni, 30);   
        }
        planeAni();
    }

    Scene3() {
        this.orbit.reset();
        for (let i = 0; i < 8; i++) {
            if (~['A1', 'C', 'C1', 'D', 'D1'].indexOf(this.text_group.children[i].name)) {
                this.text_group.children[i].visible = true;
            }
        }
        this.is_make = true;
        this.scene.remove(this.cube_plane, this.line2_group1);
        this.text_group.children[9].visible = false;
        this.text_group.children[8].visible = true;
        this.scene.add(this.cube, this.line1_group, this.line2_group, this.text_group);
        this.scene.add(this.a_group, this.c_group_t, this.c_group);
        this.scene.add(this.line_ac, this.line_act);
        this.scene.add(this.line_text2, this.line_ab_ani2, this.line_ac_ani1);
        this.isMake = true;
        this.line_text3 = -100;
        this.sil_der_point_c1 = 100;
        this.line_text1 = -100;
        this.line_ac.visible = true;
        this.line_act.visible = true;
        this.c_group.position.set(100, -100, 100);
        this.a_group.position.set(-100, -100, -100);
        this.c_group_t.position.set(100, 100, 100);
        this.c_group.remove(this.janitor);
        this.a_group.remove(this.mesh);
        this.c_group_t.remove(this.mesh_mesh);
        this.step3group.add(this.line_sb, this.line_sb1);
        this.step3_group_hide.add(this.line_sb_copy, this.line_sb_copy1);
        this.janitor.rotation.z = Math.PI / 2;
        this.mesh.rotation.z = Math.PI / 2;
        this.mesh_mesh.rotation.z = Math.PI / 2;
        this.circle_c1plane.position.set(100, -100, 100);
        this.circle_a_plane.position.set(-100, -100, -100);
        this.circle_c_plane.position.set(100, 100, 100);
        (this.circle_c1plane.material as any).transparent = true;
        (this.circle_c1plane.material as any).opacity = 0;
        (this.circle_a_plane.material as any).transparent = true;
        (this.circle_a_plane.material as any).opacity = 0;
        (this.circle_c_plane.material as any).transparent = true;
        (this.circle_c_plane.material as any).opacity = 0;
        this.sil_der_point_a1.visible = false;
        this.sil_der_point_a1c1.visible = false;
        this.line_ac_ani1.visible = false;
        this.line_ab_ani2.visible = false;
        this.line_text2.visible = false;    
        this.scene.add(this.circle_c1plane, this.circle_a_plane, this.circle_c_plane, this.circles, this.step3group, this.step3_group_hide);
        this.c_group.add(this.janitor);
        this.a_group.add(this.mesh);
        this.c_group_t.add(this.mesh_mesh);
        this.initVerpoint(100, -100);
        clearTimeout(this.timer);
        this.num = 100;
        this.drag_num_c = 100;
        this.drag_num_a1 = -100;
        this.drag_num_c1 = -100;
        this.initPoint();
        const geometry = new THREE.Geometry();
        geometry.vertices = thiz.vertices;
        geometry.faces = thiz.face;
        geometry.computeFaceNormals();
        this.cube.geometry = geometry;
    }

    Scene4() {
        this.step5Color(4, '#F89E08');
        this.step5Color(8, '#4ACBC9');
        for (let i = 4; i < 8; i++) {
            this.line2_group1.children[i].material.color = new THREE.Color('#F89E08');
        }
        this.text_group.children[9].visible = false;
        this.orbit.reset();
        this.is_draga = false;
        this.is_dragc = false;
        this.is_dragc_min = false;
        //清空场景
       if (this.stepf_line) {
        this.scene.remove(this.stepf_line, this.stepf_line_c);
       }
        this.scene.remove(this.drawRightAngle_group1);
        this.scene.remove(this.cube, this.c_group, this.a_group, this.c_group_t);
        this.scene.remove(this.line_ac, this.line_act);
        this.scene.remove(this.circle_c1plane,
          this.circle_a_plane, this.circle_c_plane, this.circles, this.step3group, this.step3_group_hide);
        this.scene.remove(this.line_text2, this.line_ab_ani2, this.line_ac_ani1);
        this.scene.remove(this.sil_der_point_a1, this.sil_der_point_a1c1);
        this.scene.remove(this.cube, this.line1_group, this.line2_group);
        if (this.is_make) {
            this.scene.add(this.cube_plane);
            this.scene.add(this.line2_group1);
        } 
        for (let i = 0; i < 8; i++) {
            if (~['A1', 'C', 'C1', 'D', 'D1'].indexOf(this.text_group.children[i].name)) {
                this.text_group.children[i].visible = false;
            }
        }
    }

    Scene5() {
        for (let i = 4; i < 12; i++) {
            this.line2_group1.children[i].material.color = new THREE.Color('#000');
        }
        this.orbit.reset();
        this.is_make = false;
        this.text_group.children[9].visible = true;
        this.drawAngle();
        this.scene.add(this.stepf_line, this.stepf_line_c);
    }

    step5Color(num: number, color: any) {
        for (let i = num; i < num + 4; i++) {
            this.line2_group1.children[i].material.color = new THREE.Color(color);
        }
    }
    //画面
    drawPlane() {
        this.step4LineLod();
         const geometry = new THREE.Geometry();
         geometry.vertices = [
            new THREE.Vector3(-100, 100, -100), 
            new THREE.Vector3(100, 100, -100),
            new THREE.Vector3(100, 0, 100), 
            new THREE.Vector3(100, -100, -100), 
         ];
         geometry.faces = [
            new THREE.Face3(0, 2, 1),
            new THREE.Face3(0, 2, 3),
            new THREE.Face3(0, 1, 3),
            new THREE.Face3(1, 2, 3),
         ];
         //生成法向量
         geometry.computeFaceNormals();
         const material = new THREE.MeshBasicMaterial({
            color: '#ffffff', 
            side: THREE.DoubleSide,
        });
        this.cube_plane = new THREE.Mesh(geometry, material);
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
        this.drawRightAngle_group1.rotation.y = 7 * Math.PI / 8;
        this.drawRightAngle_group1.rotation.x = Math.PI / 2;
        this.scene.add(this.drawRightAngle_group1);
    }
    //第三部拖动填充
    getFill() {
        this.initPoint();
        const geometry = new THREE.Geometry();
        geometry.vertices = thiz.vertices;
        geometry.faces = thiz.face;
        geometry.computeFaceNormals();
        this.cube.geometry = geometry;
    }
    createLine (start: any, end: any, name: any) {
        let line1: any = common.drawUnitLine({ width: 2, color: '#000', isDash: true });
        let line2: any = common.drawUnitLine({ width: 2, color: '#000', isDash: false });
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
        const lineDashedMaterial = new THREE.LineDashedMaterial({
            color: '#DC143C',
            opacity: 0.8,
            dashSize: 8,
            gapSize: 5,
            depthTest: false,
    });
        const lineMesh = new THREE.LineSegments(geometry, lineDashedMaterial);
        lineMesh.computeLineDistances();
        return lineMesh;
    }
    // // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine(
            [this.circle_a_plane, this.circle_c1plane, this.circle_c_plane]).initEvent(this.camera, this.renderer);
    }

    drawAni(obj: any, num: number, numb: number) {
        const geometry = new THREE.Geometry();
        this.initVerpoint(num, numb);
        geometry.vertices = this.line_text;
        obj.geometry = geometry;
        obj.computeLineDistances();
    }

    drawAni1(obj: any) {
        const geometry = new THREE.Geometry();
        this.initVerpoint1();
        geometry.vertices = this.sil_der_point_a_arr;
        obj.geometry = geometry;
        obj.computeLineDistances();
    }

    drawAni2(obj: any) {
        const geometry = new THREE.Geometry();
        this.initVerpoint2();
        geometry.vertices = this.sil_der_point_a_arr1;
        obj.geometry = geometry;
        obj.computeLineDistances();
    }

    //点击拖动 结束
    // tslint:disable-next-line:member-ordering
    static cilckslider(num: number) {
        thiz.orbit.enableRotate = num !== 0;
    }
    //移动动点位置
    // tslint:disable-next-line:member-ordering
    static moveHandle(pos: any, name: string): void {
        const y = pos.y;
        if (name === 'A1') {
            thiz.y_pos3 = y < 100 ? y < -100 ? -100 : y : 100;
            thiz.line_ab_ani2.visible = true;
            thiz.line_ac.visible = false;
            thiz.line_text2.visible = true;          
            if (thiz.y_pos3 < -99) {
                thiz.line_ab_ani2.visible = false;
            }
            if (thiz.y_pos3 === 100) {
                thiz.is_draga = true;
                thiz.scene.remove(thiz.a_group);
            }
            if (thiz.is_draga) {
                thiz.y_pos3 = 100;
            }
            thiz.line_text1 = thiz.y_pos3;
            thiz.drag_num_a1 = thiz.y_pos3;
            thiz.initPoint();
            thiz.getFill();
            thiz.drawAni(thiz.line_text2, 100, thiz.line_text3);
            thiz.drawAni(thiz.line_ab_ani2, -100, -100);
            thiz.dragScope(thiz.circle_a_plane, thiz.a_group, thiz.y_pos3, -100);
        }
        if (name === 'C') {
            thiz.y_pos2 = y < 100 ? y < 0 ? 0 : y : 100;
            thiz.sil_der_point_a1.visible = true;
            if (thiz.y_pos2 === 0) {
                thiz.is_dragc = true;
                thiz.scene.remove(thiz.c_group_t);
            }
            if (thiz.is_dragc) {
                thiz.y_pos2 = 0;
            }
            if (thiz.y_pos2 > 99 || thiz.y_pos2 < 2) {
                thiz.sil_der_point_a1.visible = false;
            }
            thiz.sil_der_point_c1 = thiz.y_pos2;
            thiz.drag_num_c = thiz.y_pos2;
            thiz.initPoint();
            thiz.getFill();
            thiz.drawAni1(thiz.sil_der_point_a1);
            thiz.line_ac_ani1.visible = true;
            thiz.line_act.visible = false;
            const geometry = new THREE.Geometry();
            geometry.vertices = thiz.sil_der_point_c;
            thiz.line_ac_ani1.geometry = geometry;
            thiz.line_ac_ani1.computeLineDistances();
            thiz.dragScope(thiz.circle_c_plane, thiz.c_group_t, thiz.y_pos2, 100);
        }
        if (name === 'C1') {
            thiz.line_text2.visible = true; 
            thiz.line_ac.visible = false;
            thiz.y_pos1 = y < 0 ? y < -100 ? -100 : y : 0;
            thiz.sil_der_point_a1c1.visible = true;
            if (thiz.y_pos1 === 0) {
                thiz.is_dragc_min = true;
                thiz.scene.remove(thiz.c_group);
            }
            if (thiz.is_dragc_min) {
                thiz.y_pos1 = 0;
            }
            if (thiz.y_pos1 > -2 || thiz.y_pos1 < -99) {
                thiz.sil_der_point_a1c1.visible = false;
            }
            thiz.line_text3 = thiz.y_pos1;
            thiz.ji_shu = thiz.y_pos1;
            thiz.drag_num_c1 = thiz.y_pos1;
            thiz.initPoint();
            thiz.getFill();
            thiz.drawAni2(thiz.sil_der_point_a1c1);
            thiz.drawAni(thiz.line_text2, 100, thiz.line_text3);
            thiz.dragScope(thiz.circle_c1plane, thiz.c_group, thiz.y_pos1, 100);
        }
    } 
    // tslint:disable-next-line:member-ordering
    static downHandle(name: string) {
        return name;
    }

    //拖拽范围
    dragScope(obj: any, group: any, num: number, pos: number) {
            obj.position.set(pos, num, pos);
            group.position.set(pos, num, pos);
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

    initLine(): void {
        const pot: any = this.pot;

        this.createLine(pot.A, pot.B, 'AB');
        this.createLine(pot.A, pot.D, 'AD');
        this.createLine(pot.A, pot.a, 'Aa');

        this.createLine(pot.B, pot.C, 'BC');
        this.createLine(pot.B, pot.b, 'Bb');

        this.createLine(pot.C, pot.D, 'CD');
        this.createLine(pot.C, pot.c, 'Cc');

        this.createLine(pot.D, pot.d, 'Dd');

        this.createLine(pot.a, pot.b, 'ab');
        this.createLine(pot.a, pot.d, 'ad');

        this.createLine(pot.b, pot.c, 'bc');


        this.createLine(pot.c, pot.d, 'cd');

        for (const i of Object.keys(this.pot1)) {
            const text = this.creratText(i, this.pot1[i], i);
            this.text_group.add(text);
            this.scene.add(this.text_group);
       }}

    creratText (text: any, pos: any, name: any) {
      return common.createText1(text, pos, name, { 'color': '#000'});
    }

    addLine(start: any, end: any, {color = '#000'}) {
        const line1: any = common.drawDresh(start, end, {color: color});
        this.line2_group1.add(line1);
        const line2: any = common.drawLine(start, end, {color: color});
        this.line2_group1.add(line2);
    }
    //第四步线条加载
    step4LineLod() {
        const pot: any = this.pot2;
        this.addLine(pot.A, pot.B, {color: '#000'});
        this.addLine(pot.B, pot.b, {color: '#000'});
        this.addLine(pot.A, pot.b, {color: '#F89E08'});
        this.addLine(pot.A, pot.S, {color: '#F89E08'});
        this.addLine(pot.S, pot.B, {color: '#4ACBC9'});
        this.addLine(pot.S, pot.b, {color: '#4ACBC9'});  
    }

    resize(width: number, height: number) {
        this.renderer.setSize(width, height);
    }

}
