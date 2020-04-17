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

import * as image01 from '../sub_static/model/image01.png';
import * as image02 from '../sub_static/model/image02.png';
import * as ballBin1 from '../sub_static/model/2.bin';
import * as ballGltf1 from '../sub_static/model/2.gltf';
import * as ballBin2 from '../sub_static/model/3.bin';
import * as ballGltf2 from '../sub_static/model/3.gltf';
import * as ballBin3 from '../sub_static/model/4.bin';
import * as ballGltf3 from '../sub_static/model/4.gltf';
import * as ballBin4 from '../sub_static/model/5.bin';
import * as ballGltf4 from '../sub_static/model/5.gltf';
import * as ballBin6 from '../sub_static/model/6.bin';
import * as ballGltf6 from '../sub_static/model/6.gltf';
import * as ballBin7 from '../sub_static/model/7.bin';
import * as ballGltf7 from '../sub_static/model/7.gltf';
import * as ballBin8 from '../sub_static/model/6.bin';
import * as ballGltf8 from '../sub_static/model/6.gltf';
import * as ballBin9 from '../sub_static/model/8.bin';
import * as ballGltf9 from '../sub_static/model/8.gltf';
import * as ballBin11 from '../sub_static/model/1.bin';
import * as ballGltf11 from '../sub_static/model/1.gltf';
import * as ballBin12 from '../sub_static/model/8.bin';
import * as ballGltf12 from '../sub_static/model/8.gltf';
import * as lineBin1 from '../sub_static/model/xian.bin';
import * as lineGltf1 from '../sub_static/model/xian.gltf';

import {Scene} from 'three';
import {TweenMax} from 'gsap';

export class Txlfdj3DModel extends ThreeBase {
    browserInfo: BrowserInfo;

    private orbit: any;

    private obj1 = new THREE.Object3D();
    private obj2 = new THREE.Object3D();
    private obj3 = new THREE.Object3D();
    private obj4 = new THREE.Object3D();
    private obj = new THREE.Object3D();
    // 用于存储文字线条
    private obj6 = new THREE.Object3D();

    protected animation: any = [];

    private clearTimeout: any = [];

    private tween = {
        opacity: 1,
        opacity2: 0,
    };

    // 画斜体字
    static createText(texts: any , x: number, y: number, z: number, color: any): SpriteText2D {
        const textStyle = {font: 'italic 96px "Times New Roman"' , fillStyle: color, antialias: false};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(0.05, 0.05, 0.05);
        text.position.set(x, y, z);
        text.material.depthTest = false;
        return text;
    }

    static preload() {
        const modelArray = [ballBin1, ballGltf1, image01, ballBin2, ballGltf2, ballBin3, ballGltf3,
            ballBin4, ballGltf4, ballBin6, ballGltf6, ballBin7, ballGltf7,
            ballBin8, ballGltf8, ballBin9, ballGltf9, ballBin11, ballGltf11, image02, ballBin12, ballGltf12, lineBin1, lineGltf1];
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
        this.camera.position.set(200, 200, 200);
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {

        if ( this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true});
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

        this.orbit = new OrbitControls( this.camera,  this.renderer.domElement );
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;

        //设置相机距离原点的最远距离
        this.orbit.minDistance = 200;
        this.orbit.maxDistance = 400;

        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //是否自动旋转
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;

        this.orbit.maxPolarAngle = Math.PI;

        //是否开启右键拖拽
        this.orbit.enablePan = false;

    }

    /**
     * 初始化光源
     */
    initLight(): void {

        const light = new THREE.HemisphereLight( '#ffeeee', '#111122', 1 );
        light.position.set(0, 50, 0);
        this.scene.add( light );

        const light2 = new THREE.HemisphereLight( '#ffeeee', '#111122', 0.5 );
        light2.position.set(0, -50, 0);
        this.scene.add( light2 );


        const light3 = new THREE.AmbientLight( '#404040', 1 );
        this.scene.add( light3 );

        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.05);
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( -100, 200, 1 );
        dirLight.position.multiplyScalar( 30 );
        this.scene.add( dirLight );

        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.05);
        dirLight2.color.setHSL( 0.1, 1, 0.95 );
        dirLight2.position.multiplyScalar( 30 );
        dirLight2.position.set( 100, -200, 1 );
        this.scene.add( dirLight2 );
    }

    // 加载模型
    async initGltfLoader()  {
        // 加载4个小球模型
        const ball1: any = await this.gltfLoader(ballGltf1 as any);
        ball1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj.add(child);
            }
        });

        // 加载场景1模型
        const ball2: any = await this.gltfLoader(ballGltf11 as any);
        ball2.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
            }
        });

        const ball11: any = await this.gltfLoader(ballGltf2 as any);
        ball11.scene.traverse((child: any) => {
            if (child instanceof Scene) {

                (child.children[0] as any).material.transparent = true;
                (child.children[0] as any).material.opacity = 0.2;
                this.obj1.add(child);
            }
        });

        //加载场景2模型
        const ball3: any = await this.gltfLoader(ballGltf3 as any);
        ball3.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj2.add(child);
            }
        });

        //加载场景3模型
        const ball4: any = await this.gltfLoader(ballGltf4 as any);
        ball4.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj3.add(child);
            }
        });

        //加载场景5模型
        const ball7: any = await this.gltfLoader(ballGltf7 as any);
        ball7.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                // this.obj5.add(child);
                this.obj4.add(child);
            }
        });

        //加载场景4模型
        const ball8: any = await this.gltfLoader(ballGltf8 as any);
        ball8.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj4.add(child);
            }
        });

        const ball12: any = await this.gltfLoader(ballGltf12 as any);
        ball12.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj4.add(child);
            }
        });

        const ball9: any = await this.gltfLoader(ballGltf9 as any);
        ball9.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                (child.children[0] as any).material.transparent = true;
                (child.children[0] as any).material.opacity = 0.2;
                this.obj4.add(child);
            }
        });

        //加载线条模型
        const line: any = await this.gltfLoader(lineGltf1 as any);
        line.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj6.add(child);
            }
        });

        this.scene.add(this.obj);
        this.scene.add(this.obj1);
        this.scene.add(this.obj2);
        this.scene.add(this.obj3);
        this.scene.add(this.obj4);

        // 初始显示场景1 隐藏场景2345
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;



        const materialSphFill = new THREE.MeshPhongMaterial({color : '#8f98a3', specular: '#ffffff', shininess: 30,
            side: THREE.FrontSide, transparent: true});
        const material2 = new THREE.MeshPhongMaterial({color : '#5b5b4d', specular: '#ffffff', shininess: 30,
            side: THREE.FrontSide, transparent: true, opacity: 0});

        // 修改模型材质
        (this.obj.children[0].children[0] as any).material = materialSphFill;
        (this.obj1.children[1].children[0] as any).material = materialSphFill.clone();
        (this.obj1.children[0].children[0] as any).material = material2;
        (this.obj2.children[0].children[0] as any).material = materialSphFill.clone();
        (this.obj3.children[0].children[0] as any).material = materialSphFill.clone();
        (this.obj4.children[0].children[0] as any).material = materialSphFill.clone();
        (this.obj4.children[1].children[0] as any).material = materialSphFill.clone();
        (this.obj4.children[2].children[0] as any).material = materialSphFill.clone();
        (this.obj4.children[3].children[0] as any).material = material2.clone();

        //隐藏场景4中心小球
        (this.obj4.children[2].children[0] as any).material.opacity = 0;
        (this.obj4.children[3].children[0] as any).material.opacity = 0;

        //先渲染线条防止被遮住
        (this.obj6.children[0].children[0] as any).material.depthTest = false;

        this.init3DModel();
    }

    // 初始动画和文字
    init3DModel() {
        this.obj1Animation();
        this.obj4Animation();
        this.obj5Animation();
        this.addText();
    }

    hideObj () {
        this.obj.visible = false;
        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
    }

    showObj(value: number) {
        this.hideObj();
        switch (value) {
            case 1:
                // 显示场景1
                this.obj.visible = true;
                this.obj1.visible = true;
                break;
            case 2:
                // 显示场景2
                this.obj.visible = true;
                this.obj2.visible = true;
                break;
            case 3:
                // 显示场景3
                this.obj.visible = true;
                this.obj3.visible = true;
                // 隐藏场景4
                this.obj4.visible = false;
                // 重置场景动画
                this.animation[1].progress(0);
                this.animation[1].pause();
                break;
            case 4:
                // 显示场景4
                this.obj4.visible = true;

                this.animation[4].progress(0);
                this.animation[4].pause();
                this.animation[1].play();

                // 隐藏线条
                this.obj6.visible = false;
                clearTimeout(this.clearTimeout[0]);
                break;
            case 5:
                // 显示场景5
                (this.obj4.children[0].children[0] as any).visible = true;

                // 隐藏场景4模型中心小球
                (this.obj4.children[2].children[0] as any).material.opacity = 0;
                (this.obj4.children[3].children[0] as any).material.opacity = 0;

                this.animation[4].play();
                break;
        }

        this.resetAnimation();
    }

    // 添加文字
    addText() {
        const rText = Txlfdj3DModel.createText('r', 13, -38, 23.5, '#000000');

        const aText = Txlfdj3DModel.createText('a', 26, -23 , -23, '#000000');
        const bText = Txlfdj3DModel.createText('b', -5, -38 , 0, '#000000');
        const cText = Txlfdj3DModel.createText('c', -5, -23 , 0, '#000000');


        this.obj6.add(rText);
        this.obj6.add(aText);
        this.obj6.add(bText);
        this.obj6.add(cText);
        this.obj6.visible = false;
        this.scene.add(this.obj6);
    }

    // 配位数按钮点击
    coordinationNumberClick(value: boolean) {

        if (value) {
            if (this.obj1) {
                this.animation[0].play();
            }

            if (this.obj4.visible) {
                (this.obj4.children[0].children[0] as any).visible = false;
                (this.obj4.children[2].children[0] as any).material.opacity = 1;
                // (this.obj4.children[3].children[0] as any).material.opacity = 0;
                this.animation[2].play();
            }

        } else {
            this.animation[0].progress(0);
            this.animation[0].pause();

            this.animation[2].progress(0);
            this.animation[2].pause();
        }
    }

    // 辅助线按钮点击
    auxiliaryLineClick(value: boolean) {
        if (value) {
            this.animation[3].play();
            this.clearTimeout[0] = setTimeout(() => {
                this.obj6.visible = true;
            }, 1000);
        } else {
            this.obj6.visible = false;
            this.animation[3].progress(0);
            this.animation[3].pause();
            clearTimeout(this.clearTimeout[0]);
        }
    }

    // 场景1动画
    obj1Animation() {
        // 外围小球变透明动画
        (this.obj1.children[1].children[0] as any).material.transparent = true;
        (this.obj1.children[0].children[0] as any).material.transparent = true;
        this.animation[0] = TweenMax.to(this.tween, 0.1, {
            opacity: 0.3,
            opacity2: 1,
            onUpdate: () => {
                // 外围小球变透明
                (this.obj1.children[1].children[0] as any).material.opacity = this.tween.opacity;
                // 中心小球变蓝
                (this.obj1.children[0].children[0] as any).material.opacity = this.tween.opacity2;
            },
            paused: true
        });
    }

    // 场景4动画
    obj4Animation() {
        const tween = {
            x: 0,
            z: 0,
        };

        // 九个小球移动到坐标系中心点动画
        this.animation[1] = TweenMax.to(tween, 2, {
            x: 20.5,
            y: 0,
            z: -40,
            onUpdate: () => {
                // 场景4小球向原点移动
                (this.obj4.children[0].children[0] as any).position.x = tween.x;
                (this.obj4.children[0].children[0] as any).position.z = tween.z;

                (this.obj4.children[1].children[0] as any).position.x = tween.x;
                (this.obj4.children[1].children[0] as any).position.z = tween.z;

                (this.obj4.children[2].children[0] as any).position.x = tween.x;
                (this.obj4.children[2].children[0] as any).position.z = tween.z;

                (this.obj4.children[3].children[0] as any).position.x = tween.x;
                (this.obj4.children[3].children[0] as any).position.z = tween.z;

                (this.obj6.children[0].children[0] as any).position.x = tween.x;
                (this.obj6.children[0].children[0] as any).position.z = tween.z;
            },
            paused: true
        });

        const tweenObj4 = {
            opacity: 0,
        };

        // 中间小球变透明动画
        this.animation[2] = TweenMax.to(tweenObj4, 2, {
            opacity: 1,
            onUpdate: () => {
                // 中心小球变蓝
                (this.obj4.children[3].children[0] as any).material.opacity = tweenObj4.opacity;
            },
            paused: true
        });

    }

    // 场景5动画
    obj5Animation() {
        const tween = {
            opacity: 1
        };

        this.animation[3] = TweenMax.to(tween, 1, {
            opacity: 0.5,
            onUpdate: () => {
                // 小球变透明
                (this.obj4.children[0].children[0] as any).material.opacity = tween.opacity;
            },
            paused: true
        });

        const tween2 = {
            opacity: 1,
            opacity2: 0,
        };

        this.animation[4] = TweenMax.to(tween2, 3, {
            opacity: 0,
            opacity2: 1,
            onUpdate: () => {
                (this.obj4.children[1].children[0] as any).material.opacity = tween2.opacity;
            },
            paused: true
        });

    }

    // 切换场景重置动画
    resetAnimation() {
        this.animation[0].progress(0);
        this.animation[0].pause();

        this.animation[2].progress(0);
        this.animation[2].pause();

        this.animation[3].progress(0);
        this.animation[3].pause();
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    reset() {

        // 重置动画
        this.animation[1].progress(0);
        this.animation[1].pause();
        this.resetAnimation();
        (this.obj4.children[1].children[0] as any).visivle = true;

        // 场景恢复到场景1
        this.obj.visible  = true;
        this.obj1.visible = true;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;

        this.obj6.visible = false;

        clearTimeout(this.clearTimeout[0]);

        this.resetCamera();
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(200, 200, 200);

        for (let i = 0; i < 21; i++) {
            this.orbit.reset();
        }
    }

}
