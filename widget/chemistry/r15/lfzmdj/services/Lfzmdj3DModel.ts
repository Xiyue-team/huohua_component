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
import * as image03 from '../sub_static/model/image03.png';
import * as ballBin1 from '../sub_static/model/E01.bin';
import * as ballGltf1 from '../sub_static/model/E01.gltf';
import * as ballBin2 from '../sub_static/model/E02.bin';
import * as ballGltf2 from '../sub_static/model/E02.gltf';
import * as ballBin3 from '../sub_static/model/E03.bin';
import * as ballGltf3 from '../sub_static/model/E03.gltf';
import * as ballBin4 from '../sub_static/model/E04.bin';
import * as ballGltf4 from '../sub_static/model/E04.gltf';
import * as ballBin5 from '../sub_static/model/E05.bin';
import * as ballGltf5 from '../sub_static/model/E05.gltf';
import * as ballBin6 from '../sub_static/model/x5.bin';
import * as ballGltf6 from '../sub_static/model/x5.gltf';
import * as ballBin7 from '../sub_static/model/E07.bin';
import * as ballGltf7 from '../sub_static/model/E07.gltf';
import * as ballBin8 from '../sub_static/model/6.bin';
import * as ballGltf8 from '../sub_static/model/6.gltf';
import * as ballBin9 from '../sub_static/model/E09.bin';
import * as ballGltf9 from '../sub_static/model/E09.gltf';
import * as ballBin10 from '../sub_static/model/E010.bin';
import * as ballGltf10 from '../sub_static/model/E010.gltf';
import * as ballBin11 from '../sub_static/model/x6.bin';
import * as ballGltf11 from '../sub_static/model/x6.gltf';

import * as lineBin1 from '../sub_static/model/xian2.bin';
import * as lineltf1 from '../sub_static/model/xian2.gltf';
import * as lineBin2 from '../sub_static/model/xian1.bin';
import * as lineltf2 from '../sub_static/model/xian1.gltf';


import {Scene} from 'three';
import {TweenMax} from 'gsap';

export class Lfzmdj3DModel extends ThreeBase {
    browserInfo: BrowserInfo;

    private orbit: any;

    obj = new THREE.Object3D();
    obj1 = new THREE.Object3D();
    obj2 = new THREE.Object3D();
    obj3 = new THREE.Object3D();
    obj4 = new THREE.Object3D();
    obj5 = new THREE.Object3D();
    obj6 = new THREE.Object3D();
    obj7 = new THREE.Object3D();

    // 用于储存场景6线条和文字
    private obj9 = new THREE.Object3D();


    protected animation: any = [];

    private clearTimeout: any = [];

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
        const modelArray = [ballBin1, ballGltf1, image01, image02, ballBin2, ballGltf2, ballBin3, ballGltf3,
            ballBin4, ballGltf4, ballBin5, ballGltf5, ballBin6, ballGltf6, ballBin7, ballGltf7, ballBin8, ballGltf8, ballBin11, ballGltf11,
            ballBin9, ballGltf9, ballBin10, ballGltf10, image03, lineBin1, lineltf1, lineBin2, lineltf2];
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

        // 加载场景1中心小球
        const ball1: any = await this.gltfLoader(ballGltf1 as any);
        ball1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
                const child2 = child.clone();
                this.obj1.add(child2);
            }
        });

        //加载6个小球模型
        const ball2: any = await this.gltfLoader(ballGltf2 as any);
        ball2.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj.add(child);
            }
        });

        // 加载场景1模型
        const ball3: any = await this.gltfLoader(ballGltf3 as any);
        ball3.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
            }
        });

        // 加载场景2模型
        const ball4: any = await this.gltfLoader(ballGltf4 as any);
        ball4.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj2.add(child);
            }
        });

        // 加载场景3模型
        const ball5: any = await this.gltfLoader(ballGltf5 as any);
        ball5.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj3.add(child);
            }
        });

        // 加载场景4模型
        const ball11: any = await this.gltfLoader(ballGltf11 as any);
        ball11.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj4.add(child);
                this.obj4.add(child.clone());
            }
        });

        const ball8: any = await this.gltfLoader(ballGltf8 as any);
        ball8.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj4.add(child);
            }
        });


        const ball6: any = await this.gltfLoader(ballGltf6 as any);
        ball6.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj4.add(child);
            }
        });

        // 加载场景5模型
        const ball7: any = await this.gltfLoader(ballGltf7 as any);
        ball7.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj5.add(child);
            }
        });

        // 加载场景7模型
        const ball10: any = await this.gltfLoader(ballGltf10 as any);
        ball10.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj6.add(child);
            }
        });

        // 加载场景6模型
        const ball9: any = await this.gltfLoader(ballGltf9 as any);
        ball9.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj6.add(child);
            }
        });

        // 加载线条
        const line1: any = await this.gltfLoader(lineltf1 as any);
        line1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj9.add(child);
            }
        });

        const line2: any = await this.gltfLoader(lineltf2 as any);
        line2.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj9.add(child);
            }
        });

        const h1Text = Lfzmdj3DModel.createText('h', 2, -30, 0, '#000000');
        this.obj9.add(h1Text);

        this.scene.add(this.obj);
        this.scene.add(this.obj1);
        this.scene.add(this.obj2);
        this.scene.add(this.obj3);
        this.scene.add(this.obj4);
        this.scene.add(this.obj5);
        this.scene.add(this.obj6);
        this.scene.add(this.obj9);

        // 初始化显示场景1
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = false;
        this.obj6.visible = false;

        const materialSphFill = new THREE.MeshPhongMaterial({color : '#8f98a3', specular: '#ffffff', shininess: 30,
            side: THREE.FrontSide, transparent: true});
        const material2 = new THREE.MeshPhongMaterial({color : '#5b5b4d', specular: '#ffffff', shininess: 30,
            side: THREE.FrontSide, transparent: true, opacity: 0});

        // 修改模型材质
        (this.obj.children[0].children[0] as any).material = materialSphFill;
        (this.obj1.children[0].children[0] as any).material = materialSphFill.clone();
        (this.obj1.children[1].children[0] as any).material = material2;
        (this.obj1.children[2].children[0] as any).material = materialSphFill.clone();
        (this.obj2.children[0].children[0] as any).material = materialSphFill.clone();
        (this.obj3.children[0].children[0] as any).material = materialSphFill.clone();
        (this.obj4.children[0].children[0] as any).material = material2.clone();
        (this.obj4.children[1].children[0] as any).material = materialSphFill.clone();
        (this.obj4.children[2].children[0] as any).material = materialSphFill.clone();
        (this.obj4.children[3].children[0] as any).material = materialSphFill.clone();
        (this.obj5.children[0].children[0] as any).material = materialSphFill.clone();
        (this.obj6.children[0].children[0] as any).material = materialSphFill.clone();
        (this.obj6.children[1].children[0] as any).material = materialSphFill.clone();


        //修改模型初始位置
        (this.obj6.children[0].children[0] as any).position.z = -22;
        (this.obj6.children[0].children[0] as any).position.x = 2;

        (this.obj6.children[1].children[0] as any).position.z = -22;
        (this.obj6.children[1].children[0] as any).position.x = 2;

        (this.obj9.children[0].children[0] as any).position.z = -22;
        (this.obj9.children[0].children[0] as any).position.x = 2;
        (this.obj9.children[1].children[0] as any).position.z = -22;
        (this.obj9.children[1].children[0] as any).position.x = 2;
        (this.obj9.children[1].children[0] as any).position.y = -2;

        // 初始隐藏线条
        (this.obj9.children[0].children[0] as any).visible = false;
        (this.obj9.children[1].children[0] as any).visible = false;
        (this.obj9.children[2].children[0] as any).visible = false;
        // 设置先渲染
        (this.obj9.children[0].children[0] as any).material.depthTest = false;
        (this.obj9.children[1].children[0] as any).material.depthTest = false;

        // 初始化动画
        this.initAnimation();
    }

    initAnimation() {
        // 初始化动画
        this.obj1Animation();
        this.obj5Animation();
        this.obj6Animation();
        this.obj7Animation();
        this.auxiliaryAnimation();
        // this.addText();
    }

    hideObj () {
        this.obj1.visible = false;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = false;
    }

    showObj(sceneID: number) {
        this.hideObj();

        switch (sceneID) {
            case 1:
                this.animation[0].progress(0);
                this.animation[0].pause();
                // 显示场景1
                this.obj1.visible = true;
                break;
            case 2:
                // 显示场景2
                this.obj2.visible = true;
                break;
            case 3:
                // 显示场景3
                this.obj3.visible = true;
                this.obj.visible = true;
                break;
            case 4:
                // 重置动画
                this.animation[1].progress(0);
                this.animation[1].pause();
                this.animation[3].progress(0);
                this.animation[3].pause();
                // 隐藏6个小球模型
                this.obj.visible = false;
                // 显示场景4
                this.obj4.visible = true;
                // 隐藏配位数模型
                (this.obj4.children[2].children[0] as any).visible = false;
                break;
            case 5:
                this.animation[1].play();
                this.animation[2].progress(0);
                this.animation[2].pause();
                this.animation[5].progress(0);
                this.animation[5].pause();

                // 显示场景5
                this.obj5.visible = true;
                // 隐藏场景6
                this.obj6.visible = false;
                break;
            case 6:
                // 重置动画
                this.animation[2].play();
                this.animation[1].progress(0);
                this.animation[1].pause();
                this.animation[3].progress(0);
                this.animation[3].pause();
                this.animation[4].progress(0);
                this.animation[4].pause();
                this.animation[6].progress(0);
                this.animation[6].pause();
                // 显示场景6
                this.obj6.visible = true;
                // 隐藏场景7
                (this.obj6.children[0].children[0] as any).visible = false;
                clearTimeout(this.clearTimeout[0]);
                clearTimeout(this.clearTimeout[1]);
                break;
            case 7:
                this.animation[5].progress(0);
                this.animation[5].pause();

                this.clearTimeout[0] = setTimeout(() => {
                    // 显示场景7
                    (this.obj6.children[0].children[0] as any).visible = true;
                    // 执行过度动画
                    this.animation[4].play();
                }, 200);
                clearTimeout(this.clearTimeout[2]);
                break;

        }

        // 隐藏线条
        (this.obj9.children[0].children[0] as any).visible = false;
        (this.obj9.children[1].children[0] as any).visible = false;
        (this.obj9.children[2].children[0] as any).visible = false;
    }

    // 配位数按钮点击
    coordinationNumberClick(visible: boolean) {

        if (visible) {
            // 场景1按钮被点击
            if (this.obj1.visible === true) {
                this.animation[0].play();
            }

            // 场景4按钮被点击
            if (this.obj4.visible === true) {
                (this.obj4.children[2].children[0] as any).visible = true;
                this.animation[3].play();
            }
        } else {
            this.animation[0].progress(0);
            this.animation[0].pause();

            this.animation[3].progress(0);
            this.animation[3].pause();

            (this.obj4.children[2].children[0] as any).visible = false;
        }

    }

    // 辅助线按钮点击
    auxiliaryLineClick(visible: boolean) {
        if (visible === true) {
            // 场景7显示辅助线
            if ((this.obj6.children[0].children[0] as any).visible === true) {
                this.animation[6].play();
                this.clearTimeout[1] = setTimeout(() => {
                    (this.obj9.children[1].children[0] as any).visible = true;
                    (this.obj9.children[2].children[0] as any).visible = true;
                }, 1000);

            }

            // 场景6显示辅助线
            if ((this.obj6.children[1].children[0] as any).material.opacity === 1) {
                this.animation[5].play();
                this.clearTimeout[2] = setTimeout(() => {
                    (this.obj9.children[0].children[0] as any).visible = true;
                    (this.obj9.children[2].children[0] as any).visible = true;
                }, 1000);
            }
        } else {
            // 隐藏虚线
            (this.obj9.children[0].children[0] as any).visible = false;
            (this.obj9.children[1].children[0] as any).visible = false;
            (this.obj9.children[2].children[0] as any).visible = false;

            // 重置场景6虚线动画
            if ((this.obj6.children[1].children[0] as any).material.opacity !== 0) {
                this.animation[5].progress(0);
                this.animation[5].pause();
            }

            // 重置场景7虚线动画
            this.animation[6].progress(0);
            this.animation[6].pause();

            clearTimeout(this.clearTimeout[1]);
            clearTimeout(this.clearTimeout[2]);
        }

        console.log((this.obj6.children[1].children[0] as any).material.opacity);
    }

    // 场景1动画
    obj1Animation() {
        const tween = {
            opacity: 1,
            opacity2: 0,
            opacity3: 1,
        };

        // 外围小球变透明动画
        this.animation[0] = TweenMax.to(tween, 0.1, {
            opacity: 0.3,
            opacity2: 1,
            opacity3: 0,
            onUpdate: () => {
                // 外围小球变透明
                (this.obj1.children[0].children[0] as any).material.opacity = tween.opacity3;
                (this.obj1.children[2].children[0] as any).material.opacity = tween.opacity;

                // 内部小球变成黑色
                (this.obj1.children[1].children[0] as any).material.opacity = tween.opacity2;
            },
            paused: true
        });
    }

    // 场景5动画
    obj5Animation() {
        const tween = {
            x: 0,
            y: 0,
            z: 0,
        };

        // 模型向原点移动动画
        this.animation[1] = TweenMax.to(tween, 1, {
            x: 2,
            y: 0,
            z: -22,
            onUpdate: () => {
                (this.obj5.children[0].children[0] as any).position.x = tween.x;
                (this.obj5.children[0].children[0] as any).position.z = tween.z;
            },
            paused: true
        });

        // 场景4配位数模型动画效果
        const tween2 = {
            opacity1: 0,
            opacity2: 1,
        };

        this.animation[3] = TweenMax.to(tween2, 3, {
            opacity1: 1,
            opacity2: 0,
            scale: 1,
            onUpdate: () => {
                // 外围小球变透明
                (this.obj4.children[1].children[0] as any).material.opacity = tween2.opacity2;
                (this.obj4.children[3].children[0] as any).material.opacity = tween2.opacity2;
                // 中心小球变黑
                (this.obj4.children[0].children[0] as any).material.opacity = tween2.opacity1;
            },
            paused: true
        });


    }

    // 场景6动画
    obj6Animation() {
        const tween = {
            x: 2,
            y: 0,
            z: -22,
        };

        // 模型向原点移动动画
        this.animation[2] = TweenMax.to(tween, 1, {
            x: -16,
            y: 0,
            z: -32,
            onUpdate: () => {
                (this.obj6.children[0].children[0] as any).position.x = tween.x;
                (this.obj6.children[0].children[0] as any).position.z = tween.z;

                (this.obj6.children[1].children[0] as any).position.x = tween.x;
                (this.obj6.children[1].children[0] as any).position.z = tween.z;

                (this.obj9.children[0].children[0] as any).position.x = tween.x;
                (this.obj9.children[0].children[0] as any).position.z = tween.z;

                (this.obj9.children[1].children[0] as any).position.x = tween.x;
                (this.obj9.children[1].children[0] as any).position.z = tween.z;
            },
            paused: true
        });

    }

    // 场景7动画
    obj7Animation() {
        const tween = {
            opacity2: 1,
        };

        // 场景6向场景7过度动画
        this.animation[4] = TweenMax.to(tween, 1, {
            opacity2: 0,
            onUpdate: () => {
                (this.obj6.children[1].children[0] as any).material.opacity = tween.opacity2;
            },
            paused: true
        });
    }

    // 辅助线按钮点击动画
    auxiliaryAnimation() {
        const tween = {
            opacity1: 1,
            opacity2: 1,
        };

        // 场景6辅助线
        this.animation[5] = TweenMax.to(tween, 1, {
            opacity1: 0.5,
            onUpdate: () => {
                (this.obj6.children[1].children[0] as any).material.opacity = tween.opacity1;
            },
            paused: true
        });

        // 场景7辅助线
        this.animation[6] = TweenMax.to(tween, 1, {
            opacity2: 0.5,
            onUpdate: () => {
                (this.obj6.children[0].children[0] as any).material.opacity = tween.opacity2;
            },
            paused: true
        });
    }

    addText() {
        const h1Text = Lfzmdj3DModel.createText('h', 0, 0, 0, '#000000');
        (this.obj9.children[1].children[0] as any).add(h1Text);
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    reset() {

        // 重置动画
        this.animation[0].progress(0);
        this.animation[0].pause();
        this.animation[1].progress(0);
        this.animation[1].pause();
        this.animation[2].progress(0);
        this.animation[2].pause();
        this.animation[3].progress(0);
        this.animation[3].pause();
        this.animation[4].progress(0);
        this.animation[4].pause();
        this.animation[5].progress(0);
        this.animation[5].pause();
        this.animation[6].progress(0);
        this.animation[6].pause();

        // 显示场景1
        this.obj.visible = true;
        this.obj1.visible = true;
        this.obj2.visible = false;
        this.obj3.visible = false;
        this.obj4.visible = false;
        this.obj5.visible = false;
        this.obj6.visible = false;

        // 隐藏辅助线
        (this.obj9.children[0].children[0] as any).visible = false;
        (this.obj9.children[1].children[0] as any).visible = false;
        (this.obj9.children[2].children[0] as any).visible = false;

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
