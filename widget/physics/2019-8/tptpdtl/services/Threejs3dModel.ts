import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
const TrackballControls = require('three-trackballcontrols');
import trayBalanceBase from '../sub_static/img/trayBalanceBase.png';
import pointerImage from '../sub_static/img/pointerImage.png';
import trayImage from '../sub_static/img/trayImage.png';
import cylinderImage from '../sub_static/img/cylinderImage.png';
import nutImage from '../sub_static/img/nutImage.png';
import riderImage from '../sub_static/img/riderImage.png';

export class Threejs3dModel extends ThreeBase {

    private controls: any;

    // 指针 和 刻度盘
    pointer: THREE.Mesh;

    // 左右托盘
    leftTray: THREE.Mesh;
    rightTray: THREE.Mesh;

    // 左右螺母
    leftNut: THREE.Mesh;
    rightNut: THREE.Mesh;

    // 游码
    rider: THREE.Mesh;

    // 左右螺母的重量
    leftNutWeight = 0;
    rightNutWeight = 0;

    // 游码的重量
    riderWeight = 0;

    // 旋转角度
    lastAngle = 0;
    newAngle = 0;

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
        this.initWebGLRenderer();
        this.initControl();
        this.addImage();
        this.render();
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x2d2d2d );
        this.scene.position.x = -100;
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near    = 0.1;
        const far     = 2000;
        this.camera = new PerspectiveCamera(50, (this.width / 2) / (this.height / 2), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        if (window.env.browserInfo.isIpad) {
            this.camera.position.set(0, 0, 450);
        } else {
            this.camera.position.set(0, 0, 400);
        }
    }

    //重置摄像机位置
    resetCamera() {
        this.controls.reset();
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer( { antialias:  true } );
        }  else  {
            this.renderer = new (THREE as any).CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        this.controls = new TrackballControls( this.camera, this.renderer.domElement );
        this.controls.rotateSpeed = 3;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = true;
        this.controls.noPan = true;
        this.controls.noRotate = true;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
    }

    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }


    // 添加托盘图片
    addImage() {
        // 添加底座 22.5
        const trayBalanceBaseImage = ThreeUtil.createImg(609 / 2, 462 / 2, trayBalanceBase, 1, 21);
        this.scene.add(trayBalanceBaseImage);
        const leftCylinder = ThreeUtil.createImg(14 / 2, 70 / 2, cylinderImage, -110, -46.5);
        this.scene.add(leftCylinder);
        const rightCylinder = ThreeUtil.createImg(14 / 2, 70 / 2, cylinderImage, 110, -46.5);
        this.scene.add(rightCylinder);

        // 添加指针
        const pointerImg = ThreeUtil.createImg(629 / 2, 359 / 2, pointerImage, 0.25, 48.75);
        const geometry = new THREE.SphereBufferGeometry( 1, 32, 32 );
        const material = new THREE.MeshBasicMaterial( {color: '#0199ff', transparent: true, opacity: 0} );
        this.pointer = new THREE.Mesh( geometry, material );
        this.pointer.add(pointerImg);
        this.scene.add( this.pointer );

        // 添加左右托盘
        this.leftTray = ThreeUtil.createImg(237 / 2, 139 / 2, trayImage, -110, -16);
        this.pointer.add( this.leftTray );
        this.rightTray = ThreeUtil.createImg(237 / 2, 139 / 2, trayImage, 110, -16);
        this.pointer.add( this.rightTray );

        // 左右螺母
        this.leftNut = ThreeUtil.createImg(10 / 2, 32 / 2, nutImage, -153.5, -21);
        this.pointer.add( this.leftNut );
        this.rightNut = ThreeUtil.createImg(10 / 2, 32 / 2, nutImage, 129.5, -21);
        this.pointer.add( this.rightNut );

        // 游码
        this.rider = ThreeUtil.createImg(18 / 2, 49 / 2, riderImage, -71, -22.5);
        this.pointer.add( this.rider );

        // 添加文字提示
        const tipText = ThreeUtil.createNormalText(window.env.browserInfo.lang.tipText, 0, -100, 0, '#ffffff', 0.15);
        tipText.visible = false;
        this.scene.add(tipText);

        this.dragLeftNut(0);
        this.dragRightNut(0);
        this.dragRider(0);
    }

    // 移动左螺母 两个螺母的最大质量差是2g
    dragLeftNut(value: number) {
        this.leftNut.position.x = -153.5 + 24 * value / 50;

        this.leftNutWeight = (50 - value) / 50 * 2;

        this.getAngle();
    }

    // 移动右螺母
    dragRightNut(value: number) {
        this.rightNut.position.x = 129.5 + 24 * value / 50;

        this.rightNutWeight = value / 50 * 2;

        this.getAngle();
    }

    // 移动游码
    dragRider(value: number) {
        this.rider.position.x = -71 + 151 * value / 50;

        this.riderWeight = value / 50 * 5;

        this.getAngle();
    }

    // 旋转指针
    getAngle() {
        // 获取重量差值
        let weight = this.leftNutWeight - this.rightNutWeight - this.riderWeight;

        if (weight >= 1) {
          weight = 1;
        } else if (weight <= -1) {
          weight = -1;
        }

        this.newAngle = weight * Math.PI / 1800 * 70;
        this.pointer.rotateZ(this.newAngle - this.lastAngle);
        this.leftTray.rotateZ(-(this.newAngle - this.lastAngle));
        this.rightTray.rotateZ(-(this.newAngle - this.lastAngle));


        this.lastAngle = this.newAngle;
    }
}




