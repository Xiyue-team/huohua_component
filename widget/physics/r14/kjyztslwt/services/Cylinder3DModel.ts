/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */
import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { SpriteText2D} from 'three-text2d';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');

OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';

import * as yzBin1 from '../sub_static/photo/yuanzhuX.bin';
import * as yzGltf1 from '../sub_static/photo/yuanzhuX.gltf';

import * as jtBin from '../sub_static/photo/jiantou.bin';
import * as jtGltf from '../sub_static/photo/jiantou.gltf';

import * as xqImage1 from '../sub_static/photo/image01.png';
import * as xqImage2 from '../sub_static/photo/image02.png';

import {Scene} from 'three';

export class Cylinder3DModel extends ThreeBase {


    browserInfo: BrowserInfo;

    private orbit: any;

    private obj1 = new THREE.Object3D();
    private obj2 = new THREE.Object3D();

    // 画斜体字
    static createText(texts: any , x: number, y: number, z: number, color: any): SpriteText2D {
        const textStyle = {font: 'italic 96px "Times New Roman"' , fillStyle: color, antialias: false};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.1, 0.1, 0.1);
        text.position.set(x, y, z);
        text.material.depthTest = false;
        return text;
    }

    static preload() {
        const modelArray = [yzBin1, yzGltf1, jtBin, jtGltf, xqImage1, xqImage2];
        console.log(modelArray.length);
    }

    private render = () => {
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene, this.camera );
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
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();

         Cylinder3DModel.preload();
         this.initGltfLoader();

         this.init3DModel();

        this.render();
    }


    /**
     *
     * 初始化场景
     */
    initScene(): void {
        this.scene = new THREE.Scene();
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {

        this.camera =  new THREE.PerspectiveCamera(45, this.width / this.height, 1, 5000);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(-400, 150, -100);
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {

        if ( this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true  });
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor('#FFFFFF' , 1 );

        this.renderer.setSize(this.width , this.height);
        this.domElement.appendChild(this.renderer.domElement);

    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        this.orbit.enableZoom = true;
        //是否自动旋转
        this.orbit.autoRotate = true;
        //设置相机距离原点的最远距离
        this.orbit.minDistance = 1;
        //设置相机距离原点的最远距离
        this.orbit.maxDistance = 4000;
        //是否开启右键拖拽
        this.orbit.enablePan = false;
    }

    /**
     * 初始化光源
     */
    initLight(): void {

        const c = new THREE.DirectionalLight('#F0F0F0', 1);
        c.position.set(-100, 100, 0);
        this.scene.add( c );
        //
        const w = new THREE.DirectionalLight('#F0F0F0', 0.7);
        w.position.set(0, -100, 100);
        this.scene.add( w );

        const a = new THREE.DirectionalLight('#F0F0F0', 1);
        a.position.set(100, 100, 0);
        this.scene.add( a );

        const w2 = new THREE.DirectionalLight('#F0F0F0', 0.5);
        w2.position.set(0, -100, -100);
        this.scene.add( w2 );
    }

    // 加载模型
    async initGltfLoader()  {
        const jt: any = await this.gltfLoader(jtGltf as any);
        jt.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
            }
        });

        const yz: any = await this.gltfLoader(yzGltf1 as any);
        yz.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                (child.children[0] as any).material.transparent = true;
                (child.children[0] as any).material.opacity = 0.6;
                this.obj1.add(child);
            }
        });

        this.scene.add(this.obj1);
    }

    hideObj() {
        this.obj1.visible = false;
        this.obj2.visible = false;
    }

    showObj1() {
        this.obj1.visible = true;
    }

    init3DModel() {
        this.addText();
    }


    // 添加字母
    addText() {
        // 给模型1 添加字母
        const f1text =  Cylinder3DModel.createText('f₁', -35, 40, 40, '#000000');
        this.obj1.add(f1text);

        const f2text =  Cylinder3DModel.createText('f₁', 35, 40, 40, '#000000');
        this.obj1.add(f2text);

        const f3text =  Cylinder3DModel.createText('f₀', -25, 20, 70, '#000000');
        this.obj1.add(f3text);

        const f4text =  Cylinder3DModel.createText('f₀', 25, 20, 70, '#000000');
        this.obj1.add(f4text);

        const Ftext =  Cylinder3DModel.createText('F', 0, 30, -25, '#000000');
        this.obj1.add(Ftext);

        const Gtext =  Cylinder3DModel.createText('G', 0, -35, 40, '#000000');
        this.obj1.add(Gtext);

        const n1text =  Cylinder3DModel.createText('N', -35, 70, 40, '#000000');
        this.obj1.add(n1text);

        const n2text =  Cylinder3DModel.createText('N', 35, 70, 40, '#000000');
        this.obj1.add(n2text);

        const wtext =  Cylinder3DModel.createText('ω', 8, -1, -75, '#000000');
        this.obj1.add(wtext);

        const w2text =  Cylinder3DModel.createText('ω', -18, -1, -75, '#000000');
        this.obj1.add(w2text);
    }

    revertDiv() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const width2 = document.getElementById('box').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.left = (width2 - width1) / 2 + 'px' ;

        for (let i = 0; i <= 10; i++) {
            this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
            this.orbit.object.position.set(-400, 150, -100);
        }
    }

    // 切换视角
    moveCamera() {

        const width1 = document.getElementById('pinmu').clientWidth;
        const width2 = document.getElementById('box').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.left = (width2 - width1) * 3 / 4 + 'px' ;

        for (let i = 0; i <= 10; i++) {
            this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
            this.orbit.object.position.set(0, 0, 400);
        }
    }

    moveDiv2() {
        const width1 = document.getElementById('pinmu').clientWidth;
        const width2 = document.getElementById('box').clientWidth;
        const model = document.getElementById('3dModel');
        model.style.left = (width2 - width1) * 3 / 4 + 'px' ;
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(-20, 20, 0);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }

}
