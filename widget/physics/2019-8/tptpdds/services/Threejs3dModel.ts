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
import wuti from '../sub_static/img/wuti.png';
import weights5g from '../sub_static/img/weights5g.png';
import weights10g from '../sub_static/img/weights10g.png';
import weights20g from '../sub_static/img/weights20g.png';
import weights50g from '../sub_static/img/weights50g.png';

export class Threejs3dModel extends ThreeBase {

    private controls: any;

    // 指针 和 刻度盘
    pointer: THREE.Mesh;

    // 左右托盘
    leftTray: THREE.Mesh;
    rightTray: THREE.Mesh;

    // 游码
    rider: THREE.Mesh;

    // 游码的重量
    riderWeight = 0;

    // 旋转角度
    lastAngle = 0;
    newAngle = 0;

    // 5个物体
    stone: Array<THREE.Mesh> = [];

    // 物体的重量
    stoneWeight = 17;

    // 四个砝码
    weightImage: Array<THREE.Mesh> = [];

    // 右侧托盘内的重量
    rightTrayWeight = 0;

    // 砝码排布的长度
    weightWith = 0;

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

    // 添加图片
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

        // 17g物体
        this.stone[0] = ThreeUtil.createImg(49, 31, wuti, 0, 139 / 4 + 31 / 2 - 1);
        this.leftTray.add( this.stone[0] );

        // 38g
        this.stone[1] = ThreeUtil.createImg(49 * 1.2, 31 * 1.2, wuti, 0, 139 / 4 + 31  * 1.2 / 2 - 1);
        this.leftTray.add( this.stone[1] );

        // 59g
        this.stone[2] = ThreeUtil.createImg(49 * 1.5, 31 * 1.5, wuti, 0, 139 / 4 + 31  * 1.5 / 2 - 1);
        this.leftTray.add( this.stone[2] );

        // 71g
        this.stone[3] = ThreeUtil.createImg(49 * 1.7, 31 * 1.7, wuti, 0, 139 / 4 + 31  * 1.7 / 2 - 1);
        this.leftTray.add( this.stone[3] );

        // 90g
        this.stone[4] = ThreeUtil.createImg(49 * 2, 31 * 2, wuti, 0, 139 / 4 + 31  * 2 / 2 - 1.25);
        this.leftTray.add( this.stone[4] );

        // 5g砝码
        this.weightImage[0] = ThreeUtil.createImg(30  / 2, 68 / 2, weights5g, -45.5, 139 / 4 + 68 / 4 - 2);
        this.rightTray.add( this.weightImage[0] );

        // 10g 砝码
        this.weightImage[1] = ThreeUtil.createImg(36  / 2, 82 / 2, weights10g, -19, 139 / 4 + 82 / 4 - 2);
        this.rightTray.add( this.weightImage[1] );

        // 20g 砝码
        this.weightImage[2] = ThreeUtil.createImg(42  / 2, 96 / 2, weights20g, 10.5, 139 / 4 + 96 / 4 - 2);
        this.rightTray.add( this.weightImage[2] );

        // 50g 砝码
        this.weightImage[3] = ThreeUtil.createImg(50  / 2, 114 / 2, weights50g, 43.5, 139 / 4 + 114 / 4 - 2);
        this.rightTray.add( this.weightImage[3] );


        // 左右螺母
        const leftNut = ThreeUtil.createImg(10 / 2, 32 / 2, nutImage, -130, -21);
        this.pointer.add( leftNut );
        const rightNut = ThreeUtil.createImg(10 / 2, 32 / 2, nutImage, 130, -21);
        this.pointer.add( rightNut );

        // 游码
        this.rider = ThreeUtil.createImg(18 / 2, 49 / 2, riderImage, -71, -22.5);
        this.pointer.add( this.rider );

        // 添加文字提示
        const tipText = ThreeUtil.createNormalText(window.env.browserInfo.lang.tipText, 0, -100, 0, '#ffffff', 0.15);
        tipText.visible = false;
        this.scene.add(tipText);
        
        this.stone[1].visible = false;
        this.stone[2].visible = false;
        this.stone[3].visible = false;
        this.stone[4].visible = false;

        this.weightImage[0].visible = false;
        this.weightImage[1].visible = false;
        this.weightImage[2].visible = false;
        this.weightImage[3].visible = false;

        this.dragRider(0);
    }

    // 移动游码
    dragRider(value: number) {
        this.rider.position.x = -71 + 151 * value / 50;

        this.riderWeight = value / 50 * 5;

        this.rotatePointer();
    }

    // 旋转指针
    rotatePointer() {
        // 获取重量差值
        let weight = this.stoneWeight - this.riderWeight - this.rightTrayWeight;

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

        this.moveWeight();
    }

    // 添加砝码
    addWeight5g(isShowWeight: boolean) {
        this.weightImage[0].visible = isShowWeight;

        if (isShowWeight) {
            this.rightTrayWeight += 5;
            this.weightWith += 15;
        } else {
            this.rightTrayWeight -= 5;
            this.weightWith -= 15;
        }

        this.rotatePointer();
    }

    // 添加砝码
    addWeight10g(isShowWeight: boolean) {
        this.weightImage[1].visible = isShowWeight;

        if (isShowWeight) {
            this.rightTrayWeight += 10;
            this.weightWith += 18;
        } else {
            this.rightTrayWeight -= 10;
            this.weightWith -= 18;
        }

        this.rotatePointer();
    }

    // 添加砝码
    addWeight20g(isShowWeight: boolean) {
        this.weightImage[2].visible = isShowWeight;

        if (isShowWeight) {
            this.rightTrayWeight += 20;
            this.weightWith += 21;
        } else {
            this.rightTrayWeight -= 20;
            this.weightWith -= 21;
        }

        this.rotatePointer();
    }

    // 添加砝码
    addWeight50g(isShowWeight: boolean) {
        this.weightImage[3].visible = isShowWeight;

        if (isShowWeight) {
            this.rightTrayWeight += 50;
            this.weightWith += 25;
        } else {
            this.rightTrayWeight -= 50;
            this.weightWith += 25;
        }

        this.rotatePointer();
    }

    // 移动砝码的位置
    moveWeight() {

        // 四个砝码的位置 5g 10g 20g 50g
        let weightPosition1 = 0;
        let weightPosition2 = 0;
        let weightPosition3 = 0;
        let weightPosition4 = 0;

        if (this.weightImage[0].visible) {
            weightPosition1 = 15;
        }
        if (this.weightImage[1].visible) {
            weightPosition2 = 18;
        }
        if (this.weightImage[2].visible) {
            weightPosition3 = 21;
        }
        if (this.weightImage[3].visible) {
            weightPosition4 = 25;
        }

        this.weightImage[0].position.x = -(weightPosition2 + weightPosition3 + weightPosition4) / 2;
        this.weightImage[1].position.x = -(weightPosition2 + weightPosition3 + weightPosition4) / 2
          + weightPosition2 / 2 + weightPosition1 / 2;
        this.weightImage[2].position.x = -(weightPosition2 + weightPosition3 + weightPosition4) / 2
          + weightPosition2 + weightPosition1 / 2 + weightPosition3 / 2;
        this.weightImage[3].position.x = -(weightPosition2 + weightPosition3 + weightPosition4) / 2
          + weightPosition2 + weightPosition1 / 2 + weightPosition3 + weightPosition4 / 2;
    }

    // 更换物体重量  随机出现
    replaceStone() {
        this.stone[0].visible = false;
        this.stone[1].visible = false;
        this.stone[2].visible = false;
        this.stone[3].visible = false;
        this.stone[4].visible = false;

        const random = Math.floor(Math.random() * 100);

        if (random < 20) {
            this.stone[0].visible = true;
            this.stoneWeight = 17;
        } else if (random < 40 && random >= 20) {
            this.stone[1].visible = true;
            this.stoneWeight = 38;
        } else if (random < 60 && random >= 40) {
            this.stone[2].visible = true;
            this.stoneWeight = 59;
        } else if (random < 80 && random >= 60) {
            this.stone[3].visible = true;
            this.stoneWeight = 71;
        } else {
            this.stone[4].visible = true;
            this.stoneWeight = 90;
        }
        this.rotatePointer();
    }
}




