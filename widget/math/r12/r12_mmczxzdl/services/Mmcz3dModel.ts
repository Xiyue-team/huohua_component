import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {MmczUtils} from './MmczUtils';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';


const OBJLoader = require('three-obj-loader');


const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
/*require('imports?THREE=three!exports?THREE.OrbitControls!../../node_modules\/three\/examples\/js\/loaders\/OBJLoader');*/
export class Mmcz3dModel extends ThreeBase {

    planeMesh: Mesh;
    private orbit: any;
    private text1: any;
    private text2: any;
    private text3: any;
    private text4: any;
    private lineA: any;
    private lineB: any;
    private util:  any;
    private ctrl1 = false;
    private animation: any;
    private group: any;
    browserInfo: BrowserInfo;


    private render = () => {
        requestAnimationFrame( this.render );
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
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.init();
    }
    init() {
        this.util = new MmczUtils();
        this.initScene();
        if (BrowserUtil.getBrowserInfo().isSmallDevice) {
          this.initCamera(1);
        } else if (BrowserUtil.getBrowserInfo().isIpad) {
          this.initCamera(1.8);
        } else {
          this.initCamera(3);
        }

        this.initWebGLRenderer();
        this.initControl();
        this.createWord();
        this.initSc();
        this.render();
    }


    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );
    }


    /**
     * 初始化镜头
     */
    initCamera(n: number): void {
        const left    = this.width / - n;
        const right   = this.width / n;
        const top     = this.height / n;
        const bottom  = this.height / - n;
        const near    = -600;
        const far     = 1000;
        this.camera =  new THREE.OrthographicCamera(left,  right,  top,  bottom,  near,  far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(51,  22,  -42);
    }


    //初始化摄像机位置
    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(51,  22,  -42);
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
    * */

    //初始化场景方法
    initSc() {
       const plane1 = this.util.createPlane(200, 400, 0x6FCCC9, 0.5);
       this.scene.add(plane1);
       plane1.rotateX(Math.PI / 180 * 90);
       const plane2 = this.util.createPlane(200, 400, 0x3EB4F1, 0.5);
       this.scene.add(plane2);
       const line = this.util.createLine(200, 0x000000, 2.5);
       this.scene.add(line);
       line.rotateZ(Math.PI / 180 * 90);
       this.group = new THREE.Group();
    }


    //线出现的动画方法
    lineAnimation(boolean: boolean): Promise<boolean> {
        return new Promise((resolve, reject) => {
            (window as any).viewHandler.viewModel.$data.disableCtrl = true;
            if (boolean) {
                this.lineB = this.util.createLine(0, 0xFF1F3A, 2.5);
                this.lineB.position.y = 150;
                this.lineA = this.util.createLine(0, 0xF89A00, 2.5);
                this.lineA.rotateX(Math.PI / 180 * 90);
                this.lineA.add(this.text3);
                this.text3.visible = false;
                this.group.add(this.lineB);
                this.group.add(this.lineA);
                this.scene.add(this.group);
                this.text1.visible = true;
                this.text2.visible = true;
                this.text4.visible = true;
                let height = 0;
                let heightA = 0;
                this.animation = setInterval(() => {
                    if (this.ctrl1 === false) {
                        height++;
                        this.lineB.geometry.dispose();
                        this.lineB.geometry = new THREE.CylinderBufferGeometry( 2.5, 2.5, height );
                        this.lineB.position.y = 150 - height / 2;
                        if (height === 150) {
                            this.ctrl1 = true;
                        }
                    } else {
                        heightA++;
                        this.lineA.geometry.dispose();
                        this.lineA.geometry = new THREE.CylinderBufferGeometry( 2.5, 2.5, heightA );
                        this.lineA.position.z = 0 - heightA / 2;
                        if (heightA === 50) {
                            this.lineA.material.color.set(0x000000);
                            this.lineB.material.color.set(0x000000);
                            this.text3.visible = true;
                            this.text4.visible = false;
                            clearInterval(this.animation);
                            return resolve(true);
                        }
                    }

                }, 10);
            } else {
                clearInterval(this.animation);
                this.ctrl1 = false;
                this.text1.visible = false;
                this.text2.visible = false;
                this.text4.visible = false;
                this.scene.remove(this.group);
                this.group.remove(this.lineA);
                this.group.remove(this.lineB);
                this.lineA.geometry.dispose();
                this.lineB.geometry.dispose();
                this.lineA.material.dispose();
                this.lineB.material.dispose();
            }
        } );
    }


    //拖动滑条改变线的位置的方法
    sliderSetLinePosition(number: number) {
        this.group.position.x = number;
        this.text1.position.x = number;
        this.text2.position.x = number;

    }


    //拖动滑条旋转OA
    sliderSetRotateAngle(angle: number) {
        this.group.rotateY(Math.PI / 180 * angle);
    }


    createWord() {
        if (this.browserInfo.isQQ) {
            this.text3  = this.util.createText('A', -10, -8, -10, '#000000');
        } else {
            this.text3  = this.util.createText('A', -10, -20, -10, '#000000');
        }
        // console.log(this.browserInfo.isMobile);
        const texta = this.util.createText('α', 85, 30, -190, '#000000');
        this.scene.add(texta);
        const textb = this.util.createText('β', 90, 190, -20, '#000000');
        this.scene.add(textb);
        const textc = this.util.createText('l', 110, 10, 0, '#000000');
        this.scene.add(textc);
        this.text1  = this.util.createText('B', -10, 170, -10, '#000000');
        this.scene.add(this.text1);
        this.text1.visible = false;
        this.text2  = this.util.createText('O', -10, 24, -20, '#000000');
        this.scene.add(this.text2);
        this.text2.visible = false;
        this.text4  = this.util.createText('A', -10, 25, -58, '#000000');
        this.scene.add(this.text4);
        this.text4.visible = false;

    }

}




