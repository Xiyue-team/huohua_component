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

import * as xqBin from '../sub_static/photo/xiaoqiu1.bin';
import * as xqGltf from '../sub_static/photo/xiaoqiu1.gltf';
import * as zqBin from '../sub_static/photo/w3.bin';
import * as zqGltf from '../sub_static/photo/w3.gltf';
import * as jtBin from '../sub_static/photo/j.bin';
import * as jtGltf from '../sub_static/photo/j.gltf';
import * as qBin from '../sub_static/photo/q1.bin';
import * as qGltf from '../sub_static/photo/q1.gltf';

import * as xqImage1 from '../sub_static/photo/image01.png';
import * as xqImage2 from '../sub_static/photo/image02.png';
import * as xqImage3 from '../sub_static/photo/image03.png';
import * as xqImage4 from '../sub_static/photo/image04.png';

import {Scene} from 'three';

export class Pellet3DModel extends ThreeBase {


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
        const modelArray = [xqBin, xqGltf, zqBin, zqGltf, jtBin, jtGltf, qBin, qGltf, xqImage1, xqImage2, xqImage3, xqImage4];
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

         Pellet3DModel.preload();
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
        this.camera.position.set(0, 100, 300);
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

        this.lights.push(new THREE.AmbientLight( 0xffffff, 0.7));

        this.scene.add(this.lights[0]);

        const directionalLight4 = new THREE.HemisphereLight( '#ffffff', '#ffffff', 0.1 );
        directionalLight4.color.setHSL(.6, 1, .6);
        directionalLight4.groundColor.setHSL(.095, 1, .75);
        directionalLight4.position.set(0, 0, 0);
        this.scene.add( directionalLight4 );

        const c = new THREE.DirectionalLight('#F0F0F0', 0.4);
        c.position.set(-100, 100, 0);
        this.scene.add( c );
        //
        const w = new THREE.DirectionalLight('#F0F0F0', 0.4);
        w.position.set(0, -100, 100);
        this.scene.add( w );

        const a = new THREE.DirectionalLight('#F0F0F0', 0.4);
        a.position.set(100, 100, 0);
        this.scene.add( a );

        const w2 = new THREE.DirectionalLight('#F0F0F0', 0.5);
        w2.position.set(0, -100, -100);
        this.scene.add( w2 );
    }

    // 加载模型
    async initGltfLoader()  {

        const jt: any = await this.gltfLoader(xqGltf as any);
        jt.scene.traverse((child: any) => {
            if (child instanceof Scene) {


                (child.children[0].children[1] as any).material.transparent = true;
                (child.children[0].children[1] as any).material.opacity = 0.6;

                child.name = '模型1';
                this.scene.add(child);
                this.scene.add(this.obj1);
                this.obj1.visible = false;
                this.scene.children[6].children[0].children[0].visible = false;

            }
        });


        const jt3: any = await this.gltfLoader(jtGltf as any);
        jt3.scene.traverse((child: any) => {
            if (child instanceof Scene) {

                this.obj2.add(child);
                this.scene.add(this.obj2);
                this.obj2.visible = false;
            }
        });

        const qiu: any = await this.gltfLoader(qGltf as any);
        qiu.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                (child.children[0] as any).material.transparent = true;
                (child.children[0] as any).material.opacity = 0.6;

                this.obj2.add(child);
                this.scene.add(this.obj2);
                this.obj2.visible = false;
            }
        });

        const jt2: any = await this.gltfLoader(zqGltf as any);
        jt2.scene.traverse((child: any) => {
            if (child instanceof Scene) {

                (child.children[0] as any).material.transparent = true;
                (child.children[0] as any).material.opacity = 0.6;

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
        this.scene.children[6].children[0].children[0].visible = false;
    }

    showObj1() {
        this.obj1.visible = true;
        this.obj3.visible = true;
        this.scene.children[6].visible = true;
        this.scene.children[6].children[0].children[0].visible = true;
    }

    showObj2() {
        this.scene.children[6].visible = false;
        this.obj2.visible = true;
    }

    init3DModel() {
        this.addText();
    }

    // 添加字母
    addText() {
        // 给模型1 添加字母
        const n1text =  Pellet3DModel.createText('N₁', -20, 70, -20, '#0067DF');
        this.obj1.add(n1text);

        const n2text =  Pellet3DModel.createText('N₂', -20, 70, 20, '#0067DF');
        this.obj1.add(n2text);

        const n3text =  Pellet3DModel.createText('N₃', 20, 70, 20, '#0067DF');
        this.obj1.add(n3text);

        const n4text =  Pellet3DModel.createText('N₄', 20, 70, -20, '#0067DF');
        this.obj1.add(n4text);

        const mgtext =  Pellet3DModel.createText('G', 0, -20, 0, '#0067DF');
        this.obj1.add(mgtext);


        // 给模型2添加字母
        const f4text =  Pellet3DModel.createText('F', -3, 60, -3, '#FF001F');
        this.obj2.add(f4text);

        const mg2text =  Pellet3DModel.createText('G', 10, -30, 10, '#FF001F');
        this.obj2.add(mg2text);

        const ntext =  Pellet3DModel.createText('N', 30, -10, 30, '#FF001F');
        this.obj2.add(ntext);
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(0, 100, 300);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }

}
