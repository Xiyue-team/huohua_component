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
import * as ballBin1 from '../sub_static/model/1.bin';
import * as ballGltf1 from '../sub_static/model/1.gltf';
import * as ballBin2 from '../sub_static/model/2.bin';
import * as ballGltf2 from '../sub_static/model/2.gltf';
import * as ballBin3 from '../sub_static/model/3.bin';
import * as ballGltf3 from '../sub_static/model/3.gltf';
import * as ballBin4 from '../sub_static/model/4.bin';
import * as ballGltf4 from '../sub_static/model/4.gltf';
import * as ballBin5 from '../sub_static/model/5.bin';
import * as ballGltf5 from '../sub_static/model/5.gltf';
import * as ballBin6 from '../sub_static/model/6.bin';
import * as ballGltf6 from '../sub_static/model/6.gltf';
import * as ballBin7 from '../sub_static/model/7.bin';
import * as ballGltf7 from '../sub_static/model/7.gltf';
import * as ballBin8 from '../sub_static/model/8.bin';
import * as ballGltf8 from '../sub_static/model/8.gltf';
import * as ballBin9 from '../sub_static/model/9.bin';
import * as ballGltf9 from '../sub_static/model/9.gltf';
import * as ballBin10 from '../sub_static/model/10.bin';
import * as ballGltf10 from '../sub_static/model/10.gltf';
import * as ballBin11 from '../sub_static/model/xian.bin';
import * as ballGltf11 from '../sub_static/model/xian.gltf';
import * as ballBin12 from '../sub_static/model/x7.bin';
import * as ballGltf12 from '../sub_static/model/x7.gltf';

import {Scene} from 'three';
import {TweenMax} from 'gsap';

export class Mxlfdj3DModel extends ThreeBase {
    browserInfo: BrowserInfo;

    private orbit: any;

    // 加载模型
    private obj1 = new THREE.Object3D();
    private obj2 = new THREE.Object3D();
    private obj3 = new THREE.Object3D();
    private obj4 = new THREE.Object3D();
    private obj5 = new THREE.Object3D();
    private obj6 = new THREE.Object3D();
    // 用于储存线条和文字
    private obj7 = new THREE.Object3D();

    private animation: any = [];

    private clearTimeout: any = [];

    // 用于修改所有模型的材质
    private materialSphFill = new THREE.MeshPhongMaterial({color : '#8f98a3', specular: '#ffffff', shininess: 30,
        side: THREE.FrontSide, transparent: true});

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
        const modelArray = [image01, ballBin1, ballGltf1, ballBin2, ballGltf2, ballBin3, ballGltf3,
            ballBin4, ballGltf4, ballBin5, ballGltf5, ballBin6, ballGltf6, ballBin7, ballGltf7,
            ballBin8, ballGltf8, ballBin9, ballGltf9, ballBin10, ballGltf10, ballBin11, ballGltf11, ballBin12, ballGltf12];
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

        this.orbit.maxPolarAngle = Math.PI; // radians

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
        //
        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.05);
        dirLight2.color.setHSL( 0.1, 1, 0.95 );
        dirLight2.position.multiplyScalar( 30 );
        dirLight2.position.set( 100, -200, 1 );
        this.scene.add( dirLight2 );
    }

    // 加载模型
    async initGltfLoader()  {
        this.scene1();
        this.scene2();
        this.scene3();
        this.scene4();
        this.scene5();
        this.scene6();
        this.lineGltf();
        this.addText();
        this.scene.add(this.obj1);
        this.scene.add(this.obj2);
        this.scene.add(this.obj3);
        this.scene.add(this.obj4);
        this.scene.add(this.obj5);
        this.scene.add(this.obj6);
        this.scene.add(this.obj7);

        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = false;
        this.obj6.visible = false;
        this.obj7.visible = false;
    }

    //场景1
    async scene1() {
        // 三个模型  有内到外放入到obj1
        const ball1: any = await this.gltfLoader(ballGltf1 as any);
        ball1.scene.traverse((child: any) => {
            if (child instanceof Scene) {

                this.obj1.add(child);
                this.obj1.add(child.clone());
            }
        });

        const ball2: any = await this.gltfLoader(ballGltf2 as any);
        ball2.scene.traverse((child: any) => {
            if (child instanceof Scene) {

                this.obj1.add(child);
            }
        });

        const ball3: any = await this.gltfLoader(ballGltf3 as any);
        ball3.scene.traverse((child: any) => {
            if (child instanceof Scene) {

                this.obj1.add(child);
            }
        });

        const material = new THREE.MeshPhongMaterial({color : '#5b5b4d', specular: '#ffffff', shininess: 30,
            side: THREE.FrontSide, transparent: true, opacity: 0});

        (this.obj1.children[0].children[0] as any).material = material;
        (this.obj1.children[1].children[0] as any).material = this.materialSphFill;
        (this.obj1.children[2].children[0] as any).material = this.materialSphFill.clone();
        (this.obj1.children[3].children[0] as any).material = this.materialSphFill.clone();

        this.scene1Animation();
    }

    //场景2
    async scene2() {
        const ball1: any = await this.gltfLoader(ballGltf4 as any);
        ball1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj2.add(child);
            }
        });
        (this.obj2.children[0].children[0] as any).material = this.materialSphFill.clone();
    }

    //场景3
    async scene3() {
        const ball1: any = await this.gltfLoader(ballGltf5 as any);
        ball1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj3.add(child);
            }
        });

        (this.obj3.children[0].children[0] as any).material = this.materialSphFill.clone();
    }

    //场景4
    async scene4() {

        const ball12: any = await this.gltfLoader(ballGltf12 as any);
        ball12.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj4.add(child);
                this.obj4.add(child.clone());
            }
        });

        const ball1: any = await this.gltfLoader(ballGltf7 as any);
        ball1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj4.add(child);
            }
        });

        const ball2: any = await this.gltfLoader(ballGltf6 as any);
        ball2.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj4.add(child);
            }
        });

        const material = new THREE.MeshPhongMaterial({color : '#5b5b4d', specular: '#ffffff', shininess: 30,
            side: THREE.FrontSide, transparent: true, opacity: 0});

        (this.obj4.children[2].children[0] as any).visible = false;
        (this.obj4.children[0].children[0] as any).material = material;
        (this.obj4.children[1].children[0] as any).material = this.materialSphFill.clone();
        (this.obj4.children[2].children[0] as any).material = this.materialSphFill.clone();
        (this.obj4.children[3].children[0] as any).material = this.materialSphFill.clone();


        this.scene4Animation();
    }

    //场景5
    async scene5() {
        const ball1: any = await this.gltfLoader(ballGltf8 as any);
        ball1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj5.add(child);
            }
        });

        (this.obj5.children[0].children[0] as any).material = this.materialSphFill.clone();
    }

    //场景6场景7
    async scene6() {
        const ball1: any = await this.gltfLoader(ballGltf10 as any);
        ball1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj6.add(child);
            }
        });

        const ball2: any = await this.gltfLoader(ballGltf9 as any);
        ball2.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj6.add(child);
            }
        });

        (this.obj6.children[0].children[0] as any).material = this.materialSphFill.clone();
        (this.obj6.children[1].children[0] as any).material = this.materialSphFill.clone();

        this.scene7Animation();
        this.auxiliaryLineAnimation();
    }

    //加载线条
    async lineGltf() {
        const ball1: any = await this.gltfLoader(ballGltf11 as any);
        ball1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj7.add(child);
            }
        });

        (this.obj7.children[2].children[0] as any).material.depthTest = false;
    }

    // 添加文字
    addText() {
        const rText = Mxlfdj3DModel.createText('4r', -8, 0, 40, '#000000');
        const aText = Mxlfdj3DModel.createText('a', -8, -25, 40, '#000000');
        this.obj7.add(rText);
        this.obj7.add(aText);
    }

    hideObj () {
        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = false;
        this.obj7.visible = false;
    }

    showObj(sceneID: number) {
        this.hideObj();

        switch (sceneID) {
            case 1:
                // 显示场景1
                this.obj1.visible = true;
                this.animation[0].progress(0);
                this.animation[0].pause();
                break;
            case 2:
                // 显示场景2
                this.obj2.visible = true;
                break;
            case 3:
                // 显示场景3
                this.obj3.visible = true;
                break;
            case 4:
                // 显示场景4
                this.obj4.visible = true;
                (this.obj4.children[2].children[0] as any).visible = false;
                (this.obj4.children[3].children[0] as any).visible = true;
                this.animation[1].progress(0);
                this.animation[1].pause();
                break;
            case 5:
                // 显示场景5
                this.obj5.visible = true;
                this.obj6.visible = false;
                this.animation[4].progress(0);
                this.animation[4].pause();
                clearTimeout(this.clearTimeout[2]);
                break;
            case 6:
                // 显示场景6
                this.obj6.visible = true;
                (this.obj6.children[0].children[0] as any).visible = false;
                (this.obj6.children[1].children[0] as any).visible = true;
                this.animation[2].progress(0);
                this.animation[2].pause();
                clearTimeout(this.clearTimeout[0]);
                clearTimeout(this.clearTimeout[1]);
                this.clearTimeout[2] = setTimeout(() => {
                    this.animation[4].play();
                }, 500);
                break;
            case 7:
                // 显示场景7
                (this.obj6.children[0].children[0] as any).visible = true;
                this.animation[2].play();
                this.animation[3].progress(0);
                this.animation[3].pause();
                this.obj7.visible = false;
                this.clearTimeout[0] = setTimeout(() => {
                    (this.obj6.children[1].children[0] as any).visible = false;
                }, 1000);
                break;
        }
    }

    // 配位数按钮点击
    coordinationNumberClick(visible: boolean) {

        if (visible) {
            //场景1按钮被点击
            if (this.obj1.visible === true) {
                this.animation[0].play();
            }

            //场景4按钮被点击
            if (this.obj4.visible === true) {
                (this.obj4.children[2].children[0] as any).visible = true;
                this.animation[1].play();
            }
        } else {
            // 重置场景1配位数动画
            if (this.obj1.visible === true) {
                this.animation[0].progress(0);
                this.animation[0].pause();
            }

            // 重置场景4配位数动画
            if (this.obj4.visible === true) {
                (this.obj4.children[2].children[0] as any).visible = false;
                this.animation[1].progress(0);
                this.animation[1].pause();
            }
        }
    }

    // 辅助线按钮点击
    auxiliaryLineClick(visible: boolean) {
        if (visible) {
            this.animation[3].play();
            this.clearTimeout[1] = setTimeout(() => {
                this.obj7.visible = true;
            }, 1000);
        } else {
            this.animation[3].progress(0);
            this.animation[3].pause();
            this.obj7.visible = false;
            clearTimeout(this.clearTimeout[1]);
        }
    }

    // 场景1配位数点击动画
    scene1Animation() {
        const tween = {
            opacity1: 0,
            opacity2: 1,
            opacity3: 1,
        };

        // 外围小球变透明动画
        this.animation[0] = TweenMax.to(tween, 0.1, {
            opacity1: 1,
            opacity2: 0,
            opacity3: 0.3,
            onUpdate: () => {
                // 外围小球变透明
                (this.obj1.children[0].children[0] as any).material.opacity = tween.opacity1;
                (this.obj1.children[1].children[0] as any).material.opacity = tween.opacity2;
                (this.obj1.children[3].children[0] as any).material.opacity = tween.opacity3;
            },
            paused: true
        });
    }

    // 场景4配位数点击动画
    scene4Animation() {
        const tween = {
            opacity1: 0,
            opacity2: 1,
        };

        // 外围小球变透明动画
        this.animation[1] = TweenMax.to(tween, 2, {
            opacity1: 1,
            opacity2: 0,
            onUpdate: () => {
                // 外围小球变透明
                (this.obj4.children[1].children[0] as any).material.opacity = tween.opacity2;
                (this.obj4.children[3].children[0] as any).material.opacity = tween.opacity2;
                // 中心小球变黑
                (this.obj4.children[0].children[0] as any).material.opacity = tween.opacity1;
            },
            paused: true
        });
    }

    // 场景6过度到场景7动画
    scene7Animation() {
        const tween = {
            opacity2: 1,
        };

        // 外围小球变透明动画
        this.animation[2] = TweenMax.to(tween, 1, {
            opacity2: 0,
            onUpdate: () => {
                // 外围小球变透明
                (this.obj6.children[1].children[0] as any).material.opacity = tween.opacity2;
            },
            paused: true
        });

        const tween2 = {
            x: 0,
            y: 0,
            angleX: 0,
            angleZ: 0,
        };
        // 外围小球变透明动画
        this.animation[4] = TweenMax.to(tween2, 1, {
            x: -6,
            y: 13,
            angleX: Math.PI / 4,
            angleZ: Math.PI / 5,
            onUpdate: () => {
                (this.obj6.children[1].children[0] as any).rotation.z = tween2.angleZ;
                (this.obj6.children[1].children[0] as any).rotation.x = tween2.angleX;
                (this.obj6.children[1].children[0] as any).position.x = tween2.x;
                (this.obj6.children[1].children[0] as any).position.y = tween2.y;
            },
            paused: true
        });

    }

    // 辅助线按钮被点击动画
    auxiliaryLineAnimation() {
        const tween = {
            opacity1: 1,
        };

        // 外围小球变透明动画
        this.animation[3] = TweenMax.to(tween, 1, {
            opacity1: 0.5,
            onUpdate: () => {
                // 外围小球变透明
                (this.obj6.children[0].children[0] as any).material.opacity = tween.opacity1;
            },
            paused: true
        });
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    reset() {

        // 显示场景1
        this.obj1.visible = true;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = false;
        this.obj6.visible = false;
        this.obj7.visible = false;

        // 重置动画
        for (let i = 0; i < this.animation.length; i++) {
            this.animation[i].progress(0);
            this.animation[i].pause();
        }

        clearTimeout(this.clearTimeout[0]);
        clearTimeout(this.clearTimeout[1]);

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
