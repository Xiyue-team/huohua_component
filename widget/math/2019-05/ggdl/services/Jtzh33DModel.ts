import * as THREE from 'three';
import { OrthographicCamera, WebGLRenderer, PerspectiveCamera, DoubleSide } from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');

OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {SliderControlLine} from './SliderControlLine';
import common from './CommonForThree'; 
require('../../../../../src/three/component/LineSegmentsGeometry.js');
import * as arrow from '../sub_static/arrow.png';
import * as b from '../sub_static/bpie.png';
import * as B from '../sub_static/b.png';
import * as c from '../sub_static/cpie.png';
import * as C from '../sub_static/c.png';
import * as d from '../sub_static/dpie.png';
import * as D from '../sub_static/d.png';
import * as a from '../sub_static/dpie.png';
export class Jtzh33DModel extends ThreeBase {
    browserInfo: BrowserInfo;
    sliderControlLine: SliderControlLine;
    private oilInt: any; //存储mainVueComponent中的变量
    private hasShow: any; //拖动点是否出现
    private longArr: any = []; //存储每条线的长度
    private numCame: any; //相机的视角
    private lineshiGroup = new THREE.Group(); //实现组
    private linexuGroup = new THREE.Group(); //虚线组
    private textGroup = new THREE.Group(); //文字组
    private dirLight: any; //灯光
    private isHave: any = false; //判断是否拖动
    private resolution: any; //存储dom宽高
    private matLine: any; //线材质
    private colorText: any; //文字颜色
    private drawCicle = common.drawSphere(5, {opacity: 0}); //拖动点
    private drawCicleMax = common.drawSphere(15, {opacity: 0}); //外围拖动点
    private pointArr: any = []; //拖动点数组
    private pointArrMax: any = []; //外围拖动点数组
    private lineAdline: any; //ad连线
    private lineAcline: any;
    private lineAbline: any;
    private lineACline: any;
    private arrowab = common.createImg([0, -50, 100], 11.25, 9, arrow); //a到b箭头 以下同理
    private arrowbc = common.createImg([100, -50, 0], 11.25, 9, arrow);
    private arrowcc = common.createImg([100, 0, -100], 11.25, 9, arrow);
    private arrowbb = common.createImg([100, 0, 100], 11.25, 9, arrow);
    private arrowad = common.createImg([-100, -50, 0], 11.25, 9, arrow);
    private arrowdd = common.createImg([-100, 0, -100], 11.25, 9, arrow);
    private arrowaa = common.createImg([-100, 0, 100], 11.25, 9, arrow);
    //顶点对象
    private pot: any = { 
        'A': [-100, 50, -100],
        'B': [100, 50, -100],
        'C': [100, 50, 100],
        'D': [-100, 50, 100],
        'a': [-100, -50, -100],
        'b': [100, -50, -100],
        'c': [100, -50, 100],
        'd': [-100, -50, 100],
    };
    //顶点位置
    private pointPos: any = [
        [-100, 50, -100],
        [100, 50, -100],
        [100, 50, 100],
        [-100, 50, 100],
        [-100, -50, -100],
        [100, -50, -100],
        [100, -50, 100],
        [-100, -50, 100],
    ];
    //文字对象
    private pot1: any = {
        'A′': [-108, 58, 108],
        'B′': [108, 58, 108],
        'C ′': [108, 58, -108],
        'D ′': [-108, 58, -108],
        'A': [-105, -58, 105],
        'B': [105, -58, 105],
        'C': [105, -58, -105],
        'D': [-105, -58, -105],
    };
    
    public orbit: any; //控制器
    public obj: any = []; //实现数组
    public objX: any = []; //虚线数组
    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene, this.camera );
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
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.initControl();
        this.render();
        this.initLight();
        this.initLine();
        this.creatPoine();
        this.initEvt();
        this.arrowbc.rotation.x = -Math.PI / 2;
        this.arrowbc.rotation.y = -Math.PI / 1.5;
        this.arrowbc.rotation.z = Math.PI / 2;
        this.arrowcc.rotation.z = Math.PI / 2;
        this.arrowaa.rotation.z = Math.PI / 2;
        this.arrowdd.rotation.z = Math.PI / 2;
        this.arrowbb.rotation.z = Math.PI / 2;
        this.arrowad.rotation.x = -Math.PI / 2;
        this.arrowad.rotation.y = -Math.PI / 1.5;
        this.arrowad.rotation.z = Math.PI / 2;
        this.lineAdline = this.createLineMesh(this.pot.d, this.pot.A, 'lineAD1', 5, 2, 2);
        this.lineAcline = this.createLineMesh(this.pot.d, this.pot.B, 'lineAC1', 5, 2, 2);
        this.lineAbline = this.createLineMesh(this.pot.d, this.pot.C, 'lineAB1', 5, 2, 2);
        this.lineACline = this.createLineMesh(this.pot.d, this.pot.b, 'lineAC', 5, 2, 2);
        const mainWidth = this.width;
        const mainHeight = this.height;
        this.resolution = new THREE.Vector2(mainWidth, mainHeight);
        this.oilInt = (window as any).viewHandler.viewModel.$data;
        this.pointArr[2].material.opacity = 1;
        this.oilInt.imgEx = b;
        this.changeLineColor(11, '#FFD621'); //AB
        this.changeLineColor(6, '#FFD621'); //BB1
        this.scene.add(this.lineAbline, this.arrowab, this.arrowbb);
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
            this.numCame = 1.2;
        } else {
            this.numCame = 3;
        }
        const left    = this.width / - this.numCame;
        const right   = this.width / this.numCame;
        const top     = this.height / this.numCame;
        const bottom  = this.height / - this.numCame;
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
    // 初始化点
    creatPoine() {
        const pointGroup = new THREE.Group();
        for (let i = 0; i < 8; i++) {
            const point = this.drawCicle.clone();
            const pointMax = this.drawCicleMax.clone();
            point.material = new THREE.MeshBasicMaterial({
                color: '#258AD3',
                opacity: 0,
                transparent: true,
                side: DoubleSide,
            });
            point.position.set(this.pointPos[i][0], this.pointPos[i][1], this.pointPos[i][2]);
            pointMax.position.set(this.pointPos[i][0], this.pointPos[i][1], this.pointPos[i][2]);
            pointMax.name = `dian${i}`;
            pointGroup.add(point);
            this.pointArr.push(point);
            this.pointArrMax.push(pointMax);
            this.scene.add(pointGroup, ...this.pointArrMax);
        }
        this.pointArrMax.splice(7, 1);
    }
    //禁止拖动
    stopDrag() {
        for (let i = 0; i < 7; i++) {
            this.pointArrMax[i].position.set(this.pointPos[i][0], this.pointPos[i][1], this.pointPos[i][2]);
        }
    }
    //初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine(this.pointArrMax, this).initEvent(this.camera, this.renderer);
    }
    // 获取拖动点坐标
     downHandle(pos: any, name: any) {
        this.isHave = false;
        this.stopDrag();
    }
    // 获取拖动点坐标
     moveHandle(pos: any, name: any) {
        this.isHave = true;
        this.stopDrag();
    }
    //鼠标按下
     MouseUp(pos: any, name: any) {
        if (this.isHave) {
            return;
        }
        this.changeColor(name);
    }

    //点击顶点改变颜色 逻辑
    changeColor(name: any) {
        this.oilInt.imgShow = true;
        this.pointArr[2].material.opacity = 0;
        this.scene.remove(this.lineAdline, this.lineAcline, this.lineAbline, this.lineACline);
        this.scene.remove(this.arrowab, this.arrowbc, this.arrowcc, this.arrowbb, this.arrowad, this.arrowdd, this.arrowaa);
        for (let i = 0; i < 12; i++) {
            this.changeLineColor(i, 0x000000);
        }
        const elIndex = name.replace('dian', '');
        const index = parseInt(elIndex);
        if (this.hasShow + 1) {
            this.pointArr[this.hasShow].material.opacity = 0;
        }
        this.hasShow = index;
        this.pointArr[index].material.opacity = 1;
        if (index === 0) {  
            this.oilInt.imgEx = d;
            this.changeLineColor(2, '#FFD621'); //DD1
            this.changeLineColor(9, '#FFD621');
            this.scene.add(this.lineAdline, this.arrowad, this.arrowdd);
        } else if (index === 1) {
            this.oilInt.imgEx = c;
            this.changeLineColor(11, '#FFD621'); //AB
            this.changeLineColor(10, '#FFD621'); //BC
            this.changeLineColor(4, '#FFD621'); //CC1
            this.scene.add(this.lineAcline, this.arrowab, this.arrowbc, this.arrowcc);
        } else if (index === 2) {
            this.oilInt.imgEx = b;
            this.changeLineColor(11, '#FFD621'); //AB
            this.changeLineColor(6, '#FFD621'); //BB1
            this.scene.add(this.lineAbline, this.arrowab, this.arrowbb);
        } else if (index === 3) {
            this.oilInt.imgEx = a;
            this.changeLineColor(7, '#FFD621'); //DD1
            this.scene.add(this.arrowaa);
        } else if (index === 4) {
            this.oilInt.imgEx = D;
            this.changeLineColor(9, '#FFD621'); //AD
            this.scene.add(this.arrowad);
        } else if (index === 5) {
            this.oilInt.imgEx = C;
            this.changeLineColor(11, '#FFD621'); //AB
            this.changeLineColor(10, '#FFD621'); //BC
            this.scene.add(this.lineACline, this.arrowab, this.arrowbc);
        } else if (index === 6) {
            this.oilInt.imgEx = B;
            this.changeLineColor(11, '#FFD621'); //AB
            this.scene.add(this.arrowab);
        }
    }

    //改变线颜色
    changeLineColor(num: number, color: any) {
        (this.lineshiGroup.children[num] as any).material.color = new THREE.Color(color);
        (this.linexuGroup.children[num] as any).material.color = new THREE.Color(color);
    }
    //数组排序方法
    sortBy(field: any) {
        return function(a: any, b: any) {
            return a[field] - b[field];
        };
    }
    //长方体线长
    long1(obj: any, name: any): any {
        const op: any = {'x': '', 'y': '', 'z': ''};
        op.x = obj[0];
        op.y = obj[1];
        op.z = obj[2];
        const cp =  this.camera.position;

        const long = Math.sqrt(((op.x - cp.x) * (op.x - cp.x)) + ((op.y - cp.y) * (op.y - cp.y)) + ((op.z - cp.z) * (op.z - cp.z)));
        return {'name': name, 'long': long};
    }
    //初始化线
    initLine(): void {
        this.drawLine(4);
        this.drawLine(2);
        for (const i of Object.keys(this.pot1)) {
             const text = this.creratText(i, this.pot1[i], i);
             this.textGroup.add(text);
             this.scene.add(this.textGroup);
        }
    }
    //画线
    drawLine(num: number) {
        const pot: any = this.pot;
        this.createLineMesh(pot.A, pot.B, 'AB', num, 1, 2);
        this.createLineMesh(pot.A, pot.D, 'AD', num, 1, 2);
        this.createLineMesh(pot.A, pot.a, 'Aa', num, 1, 2);
        this.createLineMesh(pot.B, pot.C, 'BC', num, 1, 2);
        this.createLineMesh(pot.B, pot.b, 'Bb', num, 1, 2);
        this.createLineMesh(pot.C, pot.D, 'CD', num, 1, 2);
        this.createLineMesh(pot.C, pot.c, 'Cc', num, 1, 2);
        this.createLineMesh(pot.D, pot.d, 'Dd', num, 1, 2);
        this.createLineMesh(pot.a, pot.b, 'ab', num, 1, 2);
        this.createLineMesh(pot.a, pot.d, 'ad', num, 1, 2);
        this.createLineMesh(pot.b, pot.c, 'bc', num, 1, 2);
        this.createLineMesh(pot.c, pot.d, 'cd', num, 1, 2);
    }
    //创造线
    createLineMesh(start: any, end: any, name: any, num: number, numb: number, width: any) {
        const vertices: any = [];
        vertices.push(...start, ...end);
        if (numb === 1) {
            this.colorText = '#000';
        } else {
            this.colorText = '#258AD3';
        }
        const geometry = new THREE.LineGeometry();
        geometry.setPositions(vertices);
        if (num === 2) { //虚线
            this.matLine = new THREE.LineMaterial({
                color: this.colorText,
                linewidth: width / 1000,
                resolution: this.resolution,
                dashed: false,
                dashSize : 10,
                gapSize : 10,
                dashScale: 1,
                depthTest: false,
                transparent: false
            } );
            this.matLine.defines.USE_DASH = '';
            const lineMesh = new THREE.Line2( geometry, this.matLine );
            lineMesh.computeLineDistances();
            lineMesh.name = name;
            this.objX.push(lineMesh);
            this.linexuGroup.add(lineMesh);
            this.scene.add(this.linexuGroup);
        } else if (num === 3) {
            this.matLine = new THREE.LineMaterial({
                color: this.colorText,
                linewidth: width / 1000,
                resolution: this.resolution,
                transparent: true,
                depthTest: false
            });
        } else if (num === 4) { //实线
            this.matLine = new THREE.LineMaterial({
                color: this.colorText,
                linewidth: width / 1000,
                resolution: this.resolution,
            });
            const lineMesh = new THREE.Line2( geometry, this.matLine );
            lineMesh.computeLineDistances();
            lineMesh.name = name;
            this.obj.push(lineMesh);
            this.lineshiGroup.add(lineMesh);
            this.scene.add(this.lineshiGroup);
        } else if (num === 5) {
            this.matLine = new THREE.LineMaterial({
            color: this.colorText,
            linewidth: width / 1000,
            resolution: this.resolution,
            });
            const lineMesh = new THREE.Line2( geometry, this.matLine );
            lineMesh.computeLineDistances();
            return lineMesh;
        }
    }
    //创建文字
    creratText (text: any, pos: any, name: any) {
        return common.createText1(text, pos, name, { 'color': '#000'});
    }
    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

}
