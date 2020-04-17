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

import * as jtBin from '../sub_static/photo/jiantou.bin';
import * as jtGltf from '../sub_static/photo/jiantou.gltf';
import * as thBin from '../sub_static/photo/tang.bin';
import * as thGltf from '../sub_static/photo/tang.gltf';
import * as mkBin from '../sub_static/photo/bukuai.bin';
import * as mkGltf from '../sub_static/photo/bukuai.gltf';
import * as xmBin from '../sub_static/photo/xiemian.bin';
import * as xmGltf from '../sub_static/photo/xiemian.gltf';
import * as thImage1 from '../sub_static/photo/image01.png';
import * as thImage2 from '../sub_static/photo/image02.png';
import * as thImage3 from '../sub_static/photo/image03.png';
import * as thImage4 from '../sub_static/photo/image04.png';
import * as thImage5 from '../sub_static/photo/image05.png';
import * as thImage6 from '../sub_static/photo/image06.png';
import * as thImage7 from '../sub_static/photo/image07.png';
import * as thImage8 from '../sub_static/photo/image08.png';

import {Scene} from 'three';

export class Spring3DModel extends ThreeBase {
    browserInfo: BrowserInfo;

    private orbit: any;

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
        const modelArray = [jtBin, jtGltf, thBin, thGltf, mkBin, mkGltf, xmBin, xmGltf,
            thImage1, thImage2, thImage3, thImage4, thImage5, thImage6, thImage7, thImage8];
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
        this.camera.position.set(0, 0, 400);
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

        // 限制拖动
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;

        this.orbit.minPolarAngle = Math.PI * 0 / 180; // radians
        this.orbit.maxPolarAngle = Math.PI * 1 / 2; // radians
    }

    /**
     * 初始化光源
     */
    initLight(): void {

        this.lights = [];

        this.lights.push(new THREE.AmbientLight( 0xffffff, 1));

        this.scene.add(this.lights[0]);

        const directionalLight4 = new THREE.HemisphereLight( '#ffffff', '#ffffff', 0.3 );
        directionalLight4.color.setHSL(.6, 1, .6);
        directionalLight4.groundColor.setHSL(.095, 1, .75);
        directionalLight4.position.set(0, 0, 0);
        this.scene.add( directionalLight4 );

        const c = new THREE.DirectionalLight('#F0F0F0', 0.05);
        c.position.set(200, 2000, 100);
        const u = new THREE.DirectionalLight('#F0F0F0', 0.05);
        u.position.set(-200, -2000, -100);
        this.scene.add( c );
        this.scene.add( u );
    }

    // 加载模型
    async initGltfLoader()  {

        const jt: any = await this.gltfLoader(jtGltf as any);
        jt.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                // 设置初始角度旋转45度
                child.rotateY(-Math.PI / 4);
                this.scene.add(child);
            }
        });

        const th: any = await this.gltfLoader(thGltf as any);
        th.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                // 设置初始角度旋转45度
                child.rotateY(-Math.PI / 4);
                this.scene.add(child);
            }
        });

        const mk: any = await this.gltfLoader(mkGltf as any);
        mk.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                console.log('child', child);
                (child.children[0] as any).material.transform = true;
                (child.children[0] as any).material.opacity = 0.6;
                // 设置初始角度旋转45度
                child.rotateY(-Math.PI / 4);
                this.scene.add(child);
            }
        });

        const xm: any = await this.gltfLoader(xmGltf as any);
        xm.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                (child.children[0].children[0] as any).material.transform = true;
                (child.children[0].children[0] as any).material.opacity = 0.6;
                (child.children[0].children[1] as any).material.transform = true;
                (child.children[0].children[1] as any).material.opacity = 0.6;
                // 设置初始角度旋转45度
                child.rotateY(-Math.PI / 4);

                this.scene.add(child);
            }
        });

    }

    init3DModel() {
        this.addText();
    }


    // 添加文字
    addText() {
        const ftext =  Spring3DModel.createText('f₁', 80, 30, 10, '#000000');
        this.scene.add(ftext);

        const Ntext =  Spring3DModel.createText('N₁', 40, 40, 40, '#000000');
        this.scene.add(Ntext);

        const Gtext =  Spring3DModel.createText('G₁', 40, -40, 40, '#000000');
        this.scene.add(Gtext);

        const Ftext =  Spring3DModel.createText('F₁', 15, 20, 15, '#000000');
        this.scene.add(Ftext);

        const f2text =  Spring3DModel.createText('f₂', -10, 30, -80, '#000000');
        this.scene.add(f2text);

        const N2text =  Spring3DModel.createText('N₂', -40, 40, -40, '#000000');
        this.scene.add(N2text);

        const G2text =  Spring3DModel.createText('G₂', -40, -40, -40, '#000000');
        this.scene.add(G2text);

        const F2text =  Spring3DModel.createText('F₂', -15, 20, -15, '#000000');
        this.scene.add(F2text);
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
