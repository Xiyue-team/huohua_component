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

import * as xqBin from '../sub_static/photo/zuqiu01.bin';
import * as xqGltf from '../sub_static/photo/zuqiu01.gltf';
import * as zqBin from '../sub_static/photo/zuqiu02.bin';
import * as zqGltf from '../sub_static/photo/zuqiu02.gltf';

import * as xqImage1 from '../sub_static/photo/image01.jpg';
import * as xqImage2 from '../sub_static/photo/image02.jpg';
import * as xqImage3 from '../sub_static/photo/image03.jpg';
import * as xqImage4 from '../sub_static/photo/image04.jpg';


import {Scene} from 'three';

export class Football3DModel extends ThreeBase {


    browserInfo: BrowserInfo;

    private orbit: any;

    private obj1 = new THREE.Object3D();
    private obj2 = new THREE.Object3D();
    private obj3 = new THREE.Object3D();

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
        const modelArray = [xqBin, xqGltf, zqBin, zqGltf, xqImage1, xqImage2, xqImage3, xqImage4];
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
        Football3DModel.preload();
        this.initWebGLRenderer();
        this.initControl();
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
        this.camera.position.set(0, 100, 400);
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {

        if ( this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
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

        this.lights = [];

        this.lights.push(new THREE.AmbientLight( 0xffffff, 1));

        this.scene.add(this.lights[0]);

        const directionalLight4 = new THREE.HemisphereLight( '#ffffff', '#ffffff', 0.1 );
        directionalLight4.color.setHSL(.6, 1, .6);
        directionalLight4.groundColor.setHSL(.095, 1, .75);
        directionalLight4.position.set(0, 0, 0);
        this.scene.add( directionalLight4 );

        const c = new THREE.DirectionalLight('#F0F0F0', 0.5);
        c.position.set(0, 2000, 0);
        this.scene.add( c );
    }

    // 加载模型
    async initGltfLoader()  {

        const jt: any = await this.gltfLoader(xqGltf as any);
        jt.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                // (child.children[0] as any).material.transparent = true;
                // (child.children[0] as any).material.opacity = 0;

                (child.children[1] as any).material.transparent = true;
                (child.children[1] as any).material.opacity = 0.8;
                this.obj1.add(child);
                this.obj3.add(child.children[1]);

                this.scene.add(this.obj1);
                this.scene.add(this.obj3);

                this.obj1.visible = false;
            }
        });


        const jt2: any = await this.gltfLoader(zqGltf as any);
        jt2.scene.traverse((child: any) => {
            if (child instanceof Scene) {

                (child.children[0] as any).material.transparent = true;
                (child.children[0] as any).material.opacity = 0.8;
                this.obj2.add(child);
                this.scene.add(this.obj2);
                this.obj2.visible = false;
            }
        });

    }

    hideObj() {
        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
    }

    showObj1() {
        this.obj1.visible = true;
    }

    showObj2() {
        this.obj2.visible = true;
    }

    showObj3() {
        this.obj3.visible = true;
    }

    init3DModel() {
        this.addText();
    }


    // 添加字母
    addText() {
        // 给模型1 添加字母
        const f1text =  Football3DModel.createText('F₁', -30, 80, 0, '#000000');
        this.obj1.add(f1text);

        const f2text =  Football3DModel.createText('F₂', 0, 90, 30, '#000000');
        this.obj1.add(f2text);

        const f3text =  Football3DModel.createText('F₃', 30, 80, 0, '#000000');
        this.obj1.add(f3text);

        const mgtext =  Football3DModel.createText('G', 0, -20, 0, '#000000');
        this.obj1.add(mgtext);


        // 给模型2添加字母
        const f4text =  Football3DModel.createText('f', 0, 20, 0, '#000000');
        this.obj2.add(f4text);

        const f5text =  Football3DModel.createText('N', 10, 90, 10, '#000000');
        this.obj2.add(f5text);
        //
        const f6text =  Football3DModel.createText('F₁\'', 30, -10, 25, '#000000');
        this.obj2.add(f6text);

        const mg2text =  Football3DModel.createText('G', 10, -30, 10, '#000000');
        this.obj2.add(mg2text);
    }



    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(0, 100, 400);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }

}
