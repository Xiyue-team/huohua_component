import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {SpriteText2D} from 'three-text2d';
import {DashLine} from '../../../../../src/three/component/DashLine';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

const OBJLoader = require('three-obj-loader');


const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
/*require('imports?THREE=three!exports?THREE.OrbitControls!../../node_modules\/three\/examples\/js\/loaders\/OBJLoader');*/
export class Centrum3dModel extends ThreeBase {

    planeMesh: Mesh;
    private orbit: any;
    private cameraPosition: any;
    private cameraRotation: any;
    private pointA: any;
    private pointB: any;
    private pointC: any;
    private pointD: any;
    private x1: number;
    private x2: number;
    private x3: number;
    private y1: number;
    private y2: number;
    private y3: number;
    private z1: number;
    private z2: number;
    private z3: number;
    private text1: any;
    private text2: any;
    private text3: any;
    private text4: any;
    private lineLable1: any;
    private lineLable2: any;
    private lineLable3: any;
    private cx: number;
    private cy: number;
    private cz: number;
    private plane: any;
    private planeGeometry: any;
    private planeMaterial: any;
    private vertices: any;
    private faces: any;
    private lineAB: any = [];
    private lineDC: any = [];
    private lineCE: any = [];
    controlBlink = false;

    private dashLine1 = new DashLine();
    private dashLine2 = new DashLine();
    private dashLine3 = new DashLine();
    private dashLine4 = new DashLine();
    private dashLine5 = new DashLine();
    private dashLine6 = new DashLine();

    private isMobile = BrowserUtil.getBrowserInfo().isSmallDevice;


    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene,  this.camera );
        // this.blinkLine();
    }

    /**
     *
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */
    constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
        super();
        this.fov     = !fov    ? this.fov       :  fov;
        this.near    = !near   ? this.near      :  near;
        this.far     = !far    ? this.far       :  fov;
        this.width   = !width  ? window.innerWidth     :  width;
        this.height  = !height ? window.innerHeight    :  height;
        this.domElement = domElement;
        console.log('init Simple3DModel constructor');
        this.init();

    }
    init() {
        this.initScene();
        this.initCamera();
        this.getCamera();
        // this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.createGirdding();
        this.createWord();
        this.initpoint();
        this.render();
    }


    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {
        const scale = this.isMobile ? 0.8 : 2;
        const left    = this.width / - scale;
        const right   = this.width / scale;
        const top     = this.height / scale;
        const bottom  = this.height / - scale;
        const near    = -600;
        const far     = 1000;
        this.camera =  new THREE.OrthographicCamera(left,  right,  top,  bottom,  near,  far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(80,  40,  80);
    }


    //记录摄像机初始位置
    getCamera() {
        this.cameraPosition = this.camera.position;
        this.cameraRotation = this.camera.rotation;
    }


    //初始化摄像机位置
    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(80,  40,  80);
        this.orbit.reset();
    }


    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer( { antialias:  true } );
        }  else  {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        this.orbit = new OrbitControls( this.camera,  this.renderer.domElement );
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;

        //设置相机距离原点的最远距离
        this.orbit.minDistance = 50;
        this.orbit.maxDistance = 70;

        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //是否自动旋转
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;

        this.orbit.maxPolarAngle = Math.PI; // radians

        //是否开启右键拖拽
        this.orbit.enablePan = false;
    }


    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }


    /*
    *初始化场景
    * 通过随机点连成面的方法
    * 设置面的透明度的动画效果的方法
    * 改变随机点位置的方法
    * 公理2按钮功能
    * 推论1按钮功能
    * 推论2按钮功能
    * 推论3按钮功能
    * */

    //初始化场景方法
    initpoint() {

        this.x1 = 0;
        this.x2 = 50;
        this.x3 = 100;
        this.y1 = 50;
        this.y2 = 0;
        this.y3 = 0;
        this.z1 = 0;
        this.z2 = 100;
        this.z3 = 100;
        this.cx = ((this.x2 + this.x3) / 2) * 2 - this.x1;
        this.cy = ((this.y2 + this.y3) / 2) * 2 - this.y1;
        this.cz = ((this.z2 + this.z3) / 2) * 2 - this.z1;

        const geometryA = new THREE.SphereGeometry( 5, 32, 32 );
        const geometryB = new THREE.SphereGeometry( 5, 32, 32 );
        const geometryC = new THREE.SphereGeometry( 5, 32, 32 );
        const materialA = new THREE.MeshBasicMaterial( {color: 0x4a90e2} );
        const materialB = new THREE.MeshBasicMaterial( {color: 0x4a90e2} );
        const materialC = new THREE.MeshBasicMaterial( {color: 0x4a90e2} );
        this.pointA = new THREE.Mesh( geometryA, materialA );
        this.pointB = new THREE.Mesh( geometryB, materialB );
        this.pointC = new THREE.Mesh( geometryC, materialC );
        this.scene.add( this.pointA );
        this.pointA.position.set(this.x1, this.y1, this.z1);
        this.pointA.add(this.text1);

        this.scene.add( this.pointB );
        this.pointB.position.set(this.x2, this.y2, this.z2);
        this.pointB.add(this.text2);

        this.scene.add( this.pointC );
        this.pointC.position.set(this.x3, this.y3, this.z3);
        this.pointC.add(this.text3);

        this.scene.add(this.lineLable1);
        this.scene.add(this.lineLable2);
        this.scene.add(this.lineLable3);
        this.lineLable1.visible = false;
        this.lineLable2.visible = false;
        this.lineLable3.visible = false;

    }


    //重置初始位置
    resetbutton() {
            this.x1 = 0;
            this.x2 = 50;
            this.x3 = 100;
            this.y1 = 50;
            this.y2 = 0;
            this.y3 = 0;
            this.z1 = 0;
            this.z2 = 100;
            this.z3 = 100;
            this.cx = ((this.x2 + this.x3) / 2) * 2 - this.x1;
            this.cy = ((this.y2 + this.y3) / 2) * 2 - this.y1;
            this.cz = ((this.z2 + this.z3) / 2) * 2 - this.z1;
            this.pointA.position.set(this.x1, this.y1, this.z1);
            this.pointB.position.set(this.x2, this.y2, this.z2);
            this.pointC.position.set(this.x3, this.y3, this.z3);
    }


    //将获取的随机点连成面
    changePlane() {
        this.planeGeometry = new THREE.Geometry();
        this.vertices = [
            new THREE.Vector3(this.x1, this.y1, this.z1), //v0
            new THREE.Vector3(this.x2, this.y2, this.z2), //v1
            new THREE.Vector3(this.x3, this.y3, this.z3), //v2
            new THREE.Vector3(this.cx, this.cy, this.cz), //v3
        ];
        this.planeGeometry.vertices = this.vertices;
        this.faces = [
            new THREE.Face3(1, 0, 2),
            new THREE.Face3(2, 3, 1)
        ];
        this.planeGeometry.faces = this.faces;
        //生成法向量
        this.planeGeometry.computeFaceNormals();
        this.planeMaterial = new THREE.MeshBasicMaterial( {color: 0x4a90e2, side:  THREE.DoubleSide, transparent: true, opacity: 0});
        this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
        this.scene.add(this.plane);

    }


    //将3个点连成一条线
    createLine( point1: any, point2: any, point3: any , material: any) {

        const geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( point1[0], point1[1], point1[2] ),
            new THREE.Vector3( point2[0], point2[1], point2[2] ),
            new THREE.Vector3( point3[0], point3[1], point3[2] ),
        );
        const line = new THREE.Line( geometry, material );
        return line;
    }

    /*
    * 推论1按钮效果
    * */
    deduction1Event(boolean: boolean) {
        if (boolean) {
            this.lineLable1.visible = true;
            this.lineLable1.position.x = (this.x1 + this.x2) / 2 + 10;
            this.lineLable1.position.y = (this.y1 + this.y2) / 2 + 10;
            this.lineLable1.position.z = (this.z1 + this.z2) / 2 + 10;
            this.changePlane();
            this.planeAnimation();
            this.createLineAB();
            this.controlBlink = false;
            this.blinkLine();
        } else {
            this.lineLable1.visible = false;
            this.controlBlink = true;
            this.lineAB[0].remove(this.lineLable1);
            this.removeABLine();
            this.disposePlane();
            setTimeout(() => {
                this.resetPointColor();
            }, 500);
        }
    }





    //AB点连线
    createLineAB() {
        const x = (this.x1 + this.x2) / 2;
        const y = (this.y1 + this.y2) / 2;
        const z = (this.z1 + this.z2) / 2;
         const material = new THREE.LineBasicMaterial({
            color: 0x00cd43
        });

        const geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( this.x1, this.y1, this.z1 ),
            new THREE.Vector3( x, y, z ),
            new THREE.Vector3( this.x2, this.y2, this.z2 ),

        );

        // this.lineAB = new THREE.Line( geometry, material );
        // this.scene.add( this.lineAB );

        this.lineAB[0] = this.dashLine1.addLine(new THREE.Vector3( this.x1, this.y1, this.z1 ),
            new THREE.Vector3( this.x2, this.y2, this.z2 ), '#00cd43', 6, false);
        this.lineAB[1] = this.dashLine1.addLine(new THREE.Vector3( this.x1, this.y1, this.z1 ),
            new THREE.Vector3( this.x2, this.y2, this.z2 ), '#ff1f3a', 6, false);
        this.scene.add( this.lineAB[0] );
        this.scene.add( this.lineAB[1] );

        this.lineAB[0].visible = true;
        this.lineAB[1].visible = false;
    }


    //闪烁
    blinkLine() {
          const animation = setInterval(() => {
                if (this.controlBlink) {
                    clearInterval(animation);
                }
                if ( this.pointC.material.color.getHex() === 4886754) {
                    this.pointC.material.color.set(0xff1f3a);
                    this.lineAB[0].visible = false;
                    this.lineAB[1].visible = true;
                } else {
                    this.pointC.material.color.set(0x4a90e2);
                    this.lineAB[0].visible = true;
                    this.lineAB[1].visible = false;
                }
            }, 500);

    }


    //重置球的颜色
    resetPointColor() {
        this.pointC.material.color.set(0x4a90e2);
    }


    //删除面方法
    disposePlane() {
        this.scene.remove(this.plane);
        this.plane.geometry.dispose();
        this.plane.material.dispose();
    }


    //删除AB线方法
    removeABLine() {
        this.scene.remove(this.lineAB[0]);
        this.lineAB[0].geometry.dispose();
        this.lineAB[0].material.dispose();

        this.scene.remove(this.lineAB[1]);
        this.lineAB[1].geometry.dispose();
        this.lineAB[1].material.dispose();
    }

    /*
    * 公理2按钮效果
    * */

    //设置面的透明度的动画效果
    planeAnimation() {
        let opa = 0;
        const animation = setInterval(() => {
            opa += 0.1;
            this.plane.material.opacity = opa;
            if (opa === 0.6) {
                clearInterval(animation);
            }
        }, 160);

    }


    //改变随机点位置方法
    createRandomPoint() {
        this.x1 = this.createRandomNumber();
        this.x2 = this.createRandomNumber();
        this.x3 = this.createRandomNumber();

        this.y1 = this.createRandomNumber();
        this.y2 = this.createRandomNumber();
        this.y3 = this.createRandomNumber();

        this.z1 = this.createRandomNumber();
        this.z2 = this.createRandomNumber();
        this.z3 = this.createRandomNumber();

        this.cx = ((this.x2 + this.x3) / 2) * 2 - this.x1;
        this.cy = ((this.y2 + this.y3) / 2) * 2 - this.y1;
        this.cz = ((this.z2 + this.z3) / 2) * 2 - this.z1;

        this.pointA.position.set(this.x1, this.y1, this.z1);
        this.pointB.position.set(this.x2, this.y2, this.z2);
        this.pointC.position.set(this.x3, this.y3, this.z3);

        // this.changePlane();
    }


    //公理2按钮功能
    /*axiom() {
        this.changePlane();
    }
*/

    /*
    * 推论2按钮效果
    * */
    //创建D点
    createPointD() {
        const x = (this.x1 + this.x2) / 2;
        const y = (this.y1 + this.y2) / 2;
        const z = (this.z1 + this.z2) / 2;
        const geometryD = new THREE.SphereGeometry( 7, 32, 32 );
        const materialD = new THREE.MeshBasicMaterial( {color: 0x4a90e2} );
        this.pointD = new THREE.Mesh( geometryD, materialD );
        this.pointD.add(this.text4);
        this.scene.add( this.pointD );
        this.pointD.position.set(x, y, z);
    }


    //创建DC线段
    createDCLine() {
        const xd = (this.x1 + this.x2) / 2;
        const yd = (this.y1 + this.y2) / 2;
        const zd = (this.z1 + this.z2) / 2;
        const xcdz = (xd + this.x3) / 2;
        const ycdz = (yd + this.y3) / 2;
        const zcdz = (zd + this.z3) / 2;
        const pointCposition = [];
        const pointDposition = [];
        const pointCDcenter  = [];
        pointCposition.push(this.x3, this.y3, this.z3);
        pointDposition.push(xd, yd, zd);
        pointCDcenter.push(xcdz, ycdz, zcdz);
        const materialDC = new THREE.MeshBasicMaterial( {color: 0x00cd43} );
        // this.lineDC = this.createLine(pointDposition, pointCDcenter, pointCposition, materialDC);
        //
        // this.scene.add(this.lineDC);

        this.lineDC[0] = this.dashLine2.addLine(new THREE.Vector3( xd, yd, zd ),
            new THREE.Vector3( this.x3, this.y3, this.z3 ), '#00cd43', 6, false);

        this.lineDC[1] = this.dashLine3.addLine(new THREE.Vector3( xd, yd, zd ),
            new THREE.Vector3( this.x3, this.y3, this.z3 ), '#ff1f3a', 6, false);

        this.scene.add(this.lineDC[0]);
        this.scene.add(this.lineDC[1]);

        this.lineDC[0].visible = true;
        this.lineDC[1].visible = false;
    }


    //删除DC线段
    removeDCLine() {
        this.scene.remove(this.lineDC[0]);
        this.lineDC[0].geometry.dispose();
        this.lineDC[0].material.dispose();

        this.scene.remove(this.lineDC[1]);
        this.lineDC[1].geometry.dispose();
        this.lineDC[1].material.dispose();
    }


    //删除点D
    removePointD() {
        this.scene.remove(this.pointD);
        this.pointD.geometry.dispose();
        this.pointD.material.dispose();
    }


    //推论2高亮动画效果
    deduction2Animation() {
        this.controlBlink = false;
        const animation = setInterval(() => {
            if (this.controlBlink) {
                clearInterval(animation);
            }
            if ( this.lineAB[1].visible === false) {
                this.lineAB[0].visible = false;
                this.lineAB[1].visible = true;

                this.lineDC[0].visible = false;
                this.lineDC[1].visible = true;
            } else {
                this.lineAB[0].visible = true;
                this.lineAB[1].visible = false;

                this.lineDC[0].visible = true;
                this.lineDC[1].visible = false;
            }
        }, 500);
    }


    deduction2Event(boolean: boolean) {
        const xd = (this.x1 + this.x2) / 2 + 10;
        const yd = (this.y1 + this.y2) / 2 + 20;
        const zd = (this.z1 + this.z2) / 2 + 10;
        const xcdz = (xd + this.x3) / 2;
        const ycdz = (yd + this.y3) / 2;
        const zcdz = (zd + this.z3) / 2;
            if (boolean) {
                this.lineLable2.visible = true;
                this.lineLable2.position.x = xcdz;
                this.lineLable2.position.y = ycdz;
                this.lineLable2.position.z = zcdz;
                this.createPointD();
                this.changePlane();
                this.planeAnimation();
                this.createLineAB();
                this.createDCLine();
                this.deduction2Animation();
            } else {
                this.lineLable2.visible = false;
                this.controlBlink = true;
                this.removeDCLine();
                this.removeABLine();
                this.removePointD();
                this.disposePlane();
            }


    }


    /*
    * 推论3按钮效果
    * */
    deduction3Event(boolean: boolean) {
        const xcec = (this.x3 + this.cx) / 2;
        const ycec = (this.y3 + this.cy) / 2;
        const zcec = (this.z3 + this.cz) / 2;
        if (boolean) {
            this.lineLable3.visible = true;
            this.lineLable3.position.x = xcec + 10;
            this.lineLable3.position.y = ycec + 20;
            this.lineLable3.position.z = zcec + 10;
            this.changePlane();
            this.planeAnimation();
            this.createLineAB();
            this.createCELine();
            this.deduction3Animation();
        } else {
            this.lineLable3.visible = false;
            this.controlBlink = true;
            this.removeABLine();
            this.disposePlane();
            this.removeCELine();
        }
    }


    //获取第四个点的坐标并连线
    createCELine() {
        const xcec = (this.x3 + this.cx) / 2;
        const ycec = (this.y3 + this.cy) / 2;
        const zcec = (this.z3 + this.cz) / 2;
        const pointCposition = [];
        const pointEposition = [];
        const pointCEcenter  = [];
        pointCposition.push(this.x3, this.y3, this.z3);
        pointEposition.push(this.cx, this.cy, this.cz);
        pointCEcenter.push(xcec, ycec, zcec);
        const materialDC = new THREE.MeshBasicMaterial( {color: 0x00cd43} );
        // this.lineCE = this.createLine(pointCposition, pointCEcenter, pointEposition, materialDC);
        // this.scene.add(this.lineCE);

        this.lineCE[0] = this.dashLine4.addLine(new THREE.Vector3( this.x3, this.y3, this.z3 ),
            new THREE.Vector3( this.cx, this.cy, this.cz ), '#00cd43', 6, false);

        this.lineCE[1] = this.dashLine5.addLine(new THREE.Vector3( this.x3, this.y3, this.z3 ),
            new THREE.Vector3( this.cx, this.cy, this.cz ), '#ff1f3a', 6, false);


        this.scene.add(this.lineCE[0]);
        this.scene.add(this.lineCE[1]);

        this.lineCE[0].visible = true;
        this.lineCE[1].visible = false;
    }


    //删除CE线
    removeCELine() {
        this.scene.remove(this.lineCE[0]);
        this.lineCE[0].geometry.dispose();
        this.lineCE[0].material.dispose();

        this.scene.remove(this.lineCE[1]);
        this.lineCE[1].geometry.dispose();
        this.lineCE[1].material.dispose();
    }


    //推论3高亮动画效果
    deduction3Animation() {
        this.controlBlink = false;
        const animation = setInterval(() => {
            if (this.controlBlink) {
                clearInterval(animation);
            }
            if ( this.lineAB[1].visible === false) {
                this.lineAB[0].visible = false;
                this.lineAB[1].visible = true;

                this.lineCE[0].visible = false;
                this.lineCE[1].visible = true;
            } else {
                this.lineAB[0].visible = true;
                this.lineAB[1].visible = false;

                this.lineCE[0].visible = true;
                this.lineCE[1].visible = false;
            }
        }, 500);
    }


    //绘制网格线
    createGirdding(): void {
        // 网格的边长是500，将边长平分成20个网格
        const helper = new THREE.GridHelper( 500, 20, 0xAEAEAE, 0xAEAEAE  );
        this.scene.add( helper );
    }

    //获取随机数方法
    createRandomNumber() {

            const min = Math.ceil(-200);
            const max = Math.floor(200);

            return Math.floor(Math.random() * (max - min + 1)) + min;

    }


    //创建场景文字的方法
    createText(texts: any , x: any, y: any, z: any, color: any ) {
        const textStyle = {font:  'italic 50px "Times New Roman"' , fillStyle: color, antialias: true};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.3, 0.3, 0.3);
        text.position.set(x, y, z);
        return text;
    }

    createWord() {
         this.text1 = this.createText('A' , 10, 10, 0, '#000000');
         this.text2 = this.createText('B' , 10, 10, 0, '#000000');
         this.text3 = this.createText('C' , 10, 10, 0, '#000000');
         this.text4 = this.createText('D' , 10, 10, 0, '#000000');
         this.lineLable1 = this.createText('l₁' , 0, 0, 0, '#000000');
         this.lineLable2 = this.createText('l₂' , 0, 0, 0, '#000000');
         this.lineLable3 = this.createText('l₃' , 0, 0, 0, '#000000');
    }

}




