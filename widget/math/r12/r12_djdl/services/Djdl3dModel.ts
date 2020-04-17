import * as THREE from 'three';
import {
    WebGLRenderer
} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {Mesh} from 'three';
import {PerspectiveCamera} from 'three';
import {DjdlUtils} from './DjdlUtils';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import {Line} from '../../../../../src/three/component/Line';

const dragcontrols = require('three-dragcontrols').default;



const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');

OBJLoader(THREE);
export class Djdl3dModel extends ThreeBase {

    planeMesh: Mesh;
    private utils = new DjdlUtils();
    private movingPoint1: any;
    private movingPoint2: any;
    private slider1: any;
    private slider2: any;
    private center: any;
    private line1: any;
    private line2: any;
    private line3: any;
    private line4: any;
    private controls: any;
    private text1: any;
    private text2: any;
    private text3: any;
    private text4: any;
    private texta: any;
    private textb: any;
    private textc: any;
    private angleText1: any;
    private angleText2: any;
    private angleText3: any;

    private dashLine1 = new Line();

    private render = () => {


        requestAnimationFrame( this.render );
        this.controls.update();
        this.renderer.render( this.scene,  this.camera );
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
        this.initLight();
        this.initWebGLRenderer();
        this.tbctrl();
        this.movingPoint1 = [];
        this.movingPoint2 = [];
        this.center = [];
        //赋初始值
        this.movingPoint1.push(200, 100, 50);
        this.movingPoint2.push(-200, 0, 50);
        this.center.push(0, 0, 50);

        //初始化网格
        this.createGirdding();
        //初始化场景内容
        this.createWord();
        this.render();
        this.initSc();

    }


    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near    = 0.1;
        const far     = 2000;
        this.camera = new PerspectiveCamera(50, (this.width / 4) / (this.height / 4), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(-280,  259,  645);
    }


    //初始化摄像机位置
    resetCamera() {
        this.controls.reset();
    }


    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias:  true } );
            // (this.renderer as THREE.WebGLRenderer).sortObjects = false;
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        // this.renderer = new CanvasRenderer.CanvasRenderer();
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }


    /**
     * 初始化控制器
     */
    tbctrl() {
        this.controls = new TrackballControls( this.camera, this.renderer.domElement );
        this.controls.rotateSpeed = 3;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = false;
        this.controls.noPan = true;
        this.controls.noRotate = false;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
    }


    /**
     * 初始化光源
     */
    initLight(): void {
        this.lights = [];
        this.scene.add( new THREE.AmbientLight( 0x666666 ) );
        this.lights[0] = new THREE.DirectionalLight( 0xdfebff,  1 );
        this.lights[0].position.set( 50,  200,  100 );
        this.lights[0].position.multiplyScalar( 1.3 );
        this.scene.add( this.lights[0] );
    }


    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    //创建点1
    createPoint1() {
        const geometry = new THREE.SphereBufferGeometry( 30, 32, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0xff1f3a,
            side:  THREE.DoubleSide, transparent: true, opacity: 0.001 /*, depthWrite : false*/} );
        const point = ThreeUtil.createSphere(10, '#ff1f3a', 1, 0, 0, 0);
        const sphere = new THREE.Mesh( geometry, material );
        sphere.add(point);
        sphere.position.x = 200;
        sphere.position.y = 100;
        sphere.position.z = 50;
        const dargControls = new dragcontrols([sphere], this.camera, this.renderer.domElement);
        dargControls.addEventListener( 'dragstart',  ( event: any ) => {
            this.controls.enabled = false;
            (point.material as THREE.Material).opacity = 0.3;
        } );
        dargControls.addEventListener( 'drag', ( event: any) => {
            this.resetLine1(sphere.position.x,
                sphere.position.y,
                sphere.position.z, );
            this.disposeLine1();
            this.changeLine1();
            this.disposeLine3();
            this.changeLine3();
            this.setAngleText();
        } );
        dargControls.addEventListener( 'dragend', ( event: any) => {
            this.controls.enabled = true;
            (point.material as THREE.Material).opacity = 1;
        } );
        sphere.add(this.text3);
        sphere.add(this.text4);
        return sphere;
    }


    //创建点2
    createPoint2() {
        const geometry = new THREE.SphereBufferGeometry( 30, 32, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0xff1f3a, side:  THREE.DoubleSide, transparent: true, opacity: 0.001} );
        const point = ThreeUtil.createSphere(10, '#ff1f3a', 1, 0, 0, 0);
        const sphere = new THREE.Mesh( geometry, material );
        sphere.add(point);
        sphere.position.x = -200;
        sphere.position.y = 0;
        sphere.position.z = 50;
        console.log(dragcontrols);
        const dargControls = new dragcontrols([sphere], this.camera, this.renderer.domElement);
        dargControls.addEventListener( 'dragstart',  ( event: any ) => {
            this.controls.enabled = false;
            (point.material as THREE.Material).opacity = 0.3;
        } );
        dargControls.addEventListener( 'drag', ( event: any) => {
            this.resetLine2(sphere.position.x,
                sphere.position.y,
                sphere.position.z, );
            this.disposeLine2();
            this.changeLine2();
            this.disposeLine4();
            this.changeLine4();
            this.setAngleText();
        } );
        dargControls.addEventListener( 'dragend', ( event: any) => {
            this.controls.enabled = true;
            (point.material as THREE.Material).opacity = 1;
        } );
        sphere.add(this.text1);
        sphere.add(this.text2);
        return sphere;
    }

    //创建可拖动直线
    changeLine1() {
        const a = new THREE.Vector3(0, 0, 50);
        const b = new THREE.Vector3( this.movingPoint1[0], this.movingPoint1[1], this.movingPoint1[2] );
        this.line1 = this.dashLine1.createLine({startPoint: a, endPoint: b, color: '#ff1f3a', lineWidth: 3000, depthTest: true});
        this.scene.add(this.line1);
    }


    changeLine2() {
        const a = new THREE.Vector3(0, 0, 50);
        const b = new THREE.Vector3(this.movingPoint2[0], this.movingPoint2[1], this.movingPoint2[2]);
        this.line2 = this.dashLine1.createLine({startPoint: a, endPoint: b, color: '#4a90e2', lineWidth: 3000, depthTest: true});
        this.scene.add(this.line2);
    }

    changeLine3() {
        const a = new THREE.Vector3(0, 0, -50);
        const b = new THREE.Vector3(this.movingPoint1[0], this.movingPoint1[1], this.movingPoint1[2] - 100);
        this.line3 = this.dashLine1.createLine({startPoint: a, endPoint: b, color: '#ff1f3a', lineWidth: 3000, depthTest: true});
        this.scene.add(this.line3);
    }

    changeLine4() {
        const a = new THREE.Vector3(-this.movingPoint2[0], -this.movingPoint2[1], (-50 * 2) - (this.movingPoint2[2] - 100));
        const b = new THREE.Vector3(this.movingPoint2[0], this.movingPoint2[1], this.movingPoint2[2] - 100);
        this.line4 = this.dashLine1.createLine({startPoint: a, endPoint: b, color: '#4a90e2', lineWidth: 3000, depthTest: true});
        this.scene.add(this.line4);
    }


    //删除重绘直线
    disposeLine1() {
        this.scene.remove(this.line1);
        this.line1.geometry.dispose();
        this.line1.material.dispose();
    }


    disposeLine2() {
        this.scene.remove(this.line2);
        this.line2.geometry.dispose();
        this.line2.material.dispose();
    }


    disposeLine3() {
        this.scene.remove(this.line3);
        this.line3.geometry.dispose();
        this.line3.material.dispose();
    }


    disposeLine4() {
        this.scene.remove(this.line4);
        this.line4.geometry.dispose();
        this.line4.material.dispose();
    }

    //将直线变为可拖动
    resetLine1(x: number, y: number, z: number) {
        this.movingPoint1[0] = x;
        this.movingPoint1[1] = y;
        this.movingPoint1[2] = z;
    }


    resetLine2(x: number, y: number, z: number) {
        this.movingPoint2[0] = x;
        this.movingPoint2[1] = y;
        this.movingPoint2[2] = z;
    }



    //初始场景
    initSc() {
        this.slider1 = this.createPoint1();
        this.slider2 = this.createPoint2();
        this.scene.add(this.slider1);
        this.scene.add(this.slider2);
        this.changeLine1();
        this.changeLine2();
        this.changeLine3();
        this.changeLine4();
    }


    //绘制网格线
    createGirdding(): void {
        // 网格的边长是500，将边长平分成20个网格
        const helper = new THREE.GridHelper( 500, 20, 0xAEAEAE, 0xAEAEAE  );
        helper.position.y = -50;
        this.scene.add( helper );

    }


    createWord() {
        this.texta = this.utils.createText('α' , 0, 20 , 50, '#000000');
        this.textb = this.utils.createText('β' , 70, 20 , -50, '#000000');
        this.textc = this.utils.createText('γ' , -10, 20 , -50, '#000000');
        this.scene.add(this.texta);
        this.scene.add(this.textb);
        this.scene.add(this.textc);
        this.text1  = this.utils.createText('l₁', -20, 10, 10, '#000000');
        this.text2  = this.utils.createText('l₂', -20, 10, -90, '#000000');
        this.text3  = this.utils.createText('l₃', 20, 20, 10, '#000000');
        this.text4  = this.utils.createText('l₄', 20, 20, -90, '#000000');
        this.angleText1 = this.utils.createTextAngle(
            this.utils.getAngleByVector(this.movingPoint1, this.movingPoint2, this.center) + '°', 0, 20 , 50, '#000000');
        this.scene.add(this.angleText1);
        this.angleText2 = this.utils.createTextAngle(
            this.utils.getAngleByVector(this.movingPoint1, this.movingPoint2, this.center) + '°', -10, 20, -50, '#000000');
        this.scene.add(this.angleText2);
        this.angleText3 = this.utils.createTextAngle(
            (180 - Number.parseFloat(this.utils.getAngleByVector(this.movingPoint1, this.movingPoint2, this.center))).toFixed(2)
            + '°', 80, 15, -50, '#000000');
        this.scene.add(this.angleText3);
        this.angleText1.visible = false;
        this.angleText2.visible = false;
        this.angleText3.visible = false;
    }


    setAngleText() {
        this.angleText1.text = this.utils.getAngleByVector(this.movingPoint1, this.movingPoint2, this.center) + '°';
        this.angleText2.text = this.utils.getAngleByVector(this.movingPoint1, this.movingPoint2, this.center) + '°';
        this.angleText3.text = (180 - Number.parseFloat(
                this.utils.getAngleByVector(
                    this.movingPoint1, this.movingPoint2, this.center
                )
            )
        ).toFixed(2) + '°';
    }

    toggleText(boolean: boolean) {
        if (boolean) {
            this.angleText1.visible = true;
            this.angleText2.visible = true;
            this.angleText3.visible = true;
            this.texta.visible = false;
            this.textb.visible = false;
            this.textc.visible = false;
        } else {
            this.angleText1.visible = false;
            this.angleText2.visible = false;
            this.angleText3.visible = false;
            this.texta.visible = true;
            this.textb.visible = true;
            this.textc.visible = true;
        }
    }


    /*
    * 重置场景
    * */
    sceneReset() {
        this.movingPoint1[0] = 200;
        this.movingPoint1[1] = 100;
        this.movingPoint1[2] = 50;
        this.movingPoint2[0] = -200;
        this.movingPoint2[1] = 0;
        this.movingPoint2[2] = 50;
        this.slider1.position.set(200, 100, 50);
        this.slider2.position.set(-200, 0, 50);
        this.disposeLine1();
        this.changeLine1();
        this.disposeLine3();
        this.changeLine3();
        this.disposeLine2();
        this.changeLine2();
        this.disposeLine4();
        this.changeLine4();
        this.setAngleText();
    }

}




