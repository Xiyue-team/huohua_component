/**
 *gltf模型加载类
 *@since 2.0
 *@author chaoyang
 *@Date 2018/7/9 16:52
 */
import * as THREE from 'three';
import {PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');

OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import * as fe1bl1 from '../sub_static/fe1/bl/jingbao1/jingbao1.gltf';
import * as fe1bl2 from '../sub_static/fe1/bl/jingbao2/jingbao2.gltf';
import * as fe1bl3 from '../sub_static/fe1/bl/jingbao3/jingbao3.gltf';
import * as fe1qg1 from '../sub_static/fe1/qg/jingbao1/jingbao1.gltf';
import * as fe1qg2 from '../sub_static/fe1/qg/jingbao2/jingbao2.gltf';
import * as fe1qg3 from '../sub_static/fe1/qg/jingbao3/jingbao3.gltf';
import * as fe1bin1 from '../sub_static/fe1/bl/jingbao1/jingbao1.bin';
import * as fe1bin2 from '../sub_static/fe1/bl/jingbao2/jingbao2.bin';
import * as fe1bin3 from '../sub_static/fe1/bl/jingbao3/jingbao3.bin';
import * as fe1bin4 from '../sub_static/fe1/qg/jingbao1/jingbao1.bin';
import * as fe1bin5 from '../sub_static/fe1/qg/jingbao2/jingbao2.bin';
import * as fe1bin6 from '../sub_static/fe1/qg/jingbao3/jingbao3.bin';
import * as fe2bl1 from '../sub_static/fe2/bl/jingbao1/jingbao1.gltf';
import * as fe2bl2 from '../sub_static/fe2/bl/jingbao2/jingbao2.gltf';
import * as fe2bl3 from '../sub_static/fe2/bl/jingbao3/jingbao3.gltf';
import * as fe2qg1 from '../sub_static/fe2/qg/jingbao1/jingbao1.gltf';
import * as fe2qg2 from '../sub_static/fe2/qg/jingbao2/jingbao2.gltf';
import * as fe2qg3 from '../sub_static/fe2/qg/jingbao3/jingbao3.gltf';
import * as fe2bin1 from '../sub_static/fe2/bl/jingbao1/jingbao1.bin';
import * as fe2bin2 from '../sub_static/fe2/bl/jingbao2/jingbao2.bin';
import * as fe2bin3 from '../sub_static/fe2/bl/jingbao3/jingbao3.bin';
import * as fe2bin4 from '../sub_static/fe2/qg/jingbao1/jingbao1.bin';
import * as fe2bin5 from '../sub_static/fe2/qg/jingbao2/jingbao2.bin';
import * as fe2bin6 from '../sub_static/fe2/qg/jingbao3/jingbao3.bin';
import * as pwsBig from '../sub_static/peiweishu/4ceng.gltf';
import * as pwsAni from '../sub_static/peiweishu/donghua.gltf';
import * as pwsSma from '../sub_static/peiweishu/peiweishu.gltf';
import * as pwsBigbin from '../sub_static/peiweishu/4ceng.bin';
import * as pwsAnibin from '../sub_static/peiweishu/donghua.bin';
import * as pwsSmabin from '../sub_static/peiweishu/peiweishu.bin';

import {ModelAnimationGroup} from '../../../../../src/three/component/ModelAnimationGroup';
import {TweenMax} from 'gsap';


export class Jsjt23DModel extends ThreeBase {

    browserInfo: BrowserInfo;

    private orbit: any;
    fe1bl1 = new THREE.Object3D();
    fe1bl2 = new THREE.Object3D();
    fe1bl3 = new THREE.Object3D();
    fe1qg1 = new THREE.Object3D();
    fe1qg2 = new THREE.Object3D();
    fe1qg3 = new THREE.Object3D();
    fe2bl1 = new THREE.Object3D();
    fe2bl2 = new THREE.Object3D();
    fe2bl3 = new THREE.Object3D();
    fe2qg1 = new THREE.Object3D();
    fe2qg2 = new THREE.Object3D();
    fe2qg3 = new THREE.Object3D();
    pwsBig = new THREE.Object3D();
    pwsAni = new THREE.Object3D();
    pwsSma = new THREE.Object3D();
    private animation1: any;
    private animation2: any;
    private animation3: any;
    private animation4: any;
    private animation5: any;
    private fe1qgOpacityAnimation: any;
    private fe1blOpacityAnimation: any;
    private fe2qgOpacityAnimation: any;
    private fe2blOpacityAnimation: any;
    private peiweishuAnimation: any;
    private peiweishuAnimation1: any;

    static preload() {
        const modelArray = [fe1bl1, fe1bl2, fe1bl3, fe1qg1, fe1qg2, fe1qg3, fe1bin1, fe1bin2, fe1bin3, fe1bin4, fe1bin5, fe1bin6,
                            fe2bl1, fe2bl2, fe2bl3, fe2qg1, fe2qg2, fe2qg3, fe2bin1, fe2bin2, fe2bin3, fe2bin4, fe2bin5, fe2bin6,
                            pwsBig, pwsAni, pwsSma, pwsBigbin, pwsAnibin, pwsSmabin];
        console.log(modelArray);
    }

    private render = () => {
        requestAnimationFrame( this.render );
        if (this.animation1) {
            this.animation1.renderModel();
        }

        if (this.animation2) {
            this.animation2.renderModel();
        }

        if (this.animation3) {
            this.animation3.renderModel();
        }

        if (this.animation4) {
            this.animation4.renderModel();
        }

        if (this.animation5) {
            this.animation5.renderModel();
        }

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
        this.loadModel();

        this.render();
    }


    /**
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
        this.camera.position.set(199, 0, -5);
        // this.camera.position.set(0, 0, 200);
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
        // //是否可以缩放
        this.orbit.enableZoom = false;
        //是否自动旋转
        // this.orbit.autoRotate = true;
        //设置相机距离原点的最远距离
        this.orbit.minDistance = 1;
        //设置相机距离原点的最远距离
        this.orbit.maxDistance = 4000;

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

    //加载模型
    async loadModel() {
        const bl1 = await this.gltfLoader(fe1bl1 as any);
        bl1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                child.scale.x = 1.5;
                child.scale.y = 1.5;
                child.scale.z = 1.5;
                this.fe1bl1.add(child);
                this.fe1bl1.visible = false;
            }
        });
        const bl2 = await this.gltfLoader(fe1bl2 as any);
        bl2.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                child.scale.x = 1.5;
                child.scale.y = 1.5;
                child.scale.z = 1.5;
                this.fe1bl2.add(child);
                this.fe1bl2.visible = false;
            }
        });

        const bl3 = await this.gltfLoader(fe1bl3 as any);
        bl3.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                child.scale.x = 1.5;
                child.scale.y = 1.5;
                child.scale.z = 1.5;
                this.fe1bl3.add(child);
                this.fe1bl3.visible = false;
            }
        });


        const qg1: any = await this.gltfLoader(fe1qg1 as any);
        qg1.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.fe1qg1.add(child);
            }
        });

        const qg2: any = await this.gltfLoader(fe1qg2 as any);
        qg2.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.fe1qg2.add(child);
                this.fe1qg2.visible = false;
            }
        });

        const qg3: any = await this.gltfLoader(fe1qg3 as any);
        qg3.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.fe1qg3.add(child);
                this.fe1qg3.visible = false;
            }
        });


        const bl4: any = await this.gltfLoader(fe2bl1 as any);
        bl4.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                child.scale.x = 1.2;
                child.scale.y = 1.2;
                child.scale.z = 1.2;
                this.fe2bl1.add(child);
                this.fe2bl1.visible = false;
            }
        });

        const bl5: any = await this.gltfLoader(fe2bl2 as any);
        bl5.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                child.scale.x = 1.2;
                child.scale.y = 1.2;
                child.scale.z = 1.2;
                this.fe2bl2.add(child);
                this.fe2bl2.visible = false;
            }
        });

        const bl6: any = await this.gltfLoader(fe2bl3 as any);
        bl6.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                child.scale.x = 1.2;
                child.scale.y = 1.2;
                child.scale.z = 1.2;
                this.fe2bl3.add(child);
                this.fe2bl3.visible = false;
            }
        });

        const qg4: any = await this.gltfLoader(fe2qg1 as any);
        qg4.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.fe2qg1.add(child);
                this.fe2qg1.visible = false;
            }
        });

        const qg5: any = await this.gltfLoader(fe2qg2 as any);
        qg5.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.fe2qg2.add(child);
                this.fe2qg2.visible = false;
            }
        });

        const qg6: any = await this.gltfLoader(fe2qg3 as any);
        qg6.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.fe2qg3.add(child);
                this.fe2qg3.visible = false;
            }
        });

        const pws4c: any = await this.gltfLoader(pwsBig as any);
        pws4c.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.pwsBig.add(child);
                this.pwsBig.visible = false;
            }
        });

        const pwsdh: any = await this.gltfLoader(pwsAni as any);
        pwsdh.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.pwsAni.add(child);
                this.pwsAni.visible = false;
            }
        });

        const pwsxiao: any = await this.gltfLoader(pwsSma as any);
        pwsxiao.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.pwsSma.add(child);
                this.pwsSma.visible = false;
            }
        });


        //创建渐隐动画
        this.fe1qgOpacityAnimation = this.opacityAnimation(1, 0, 1.6, this.fe1qg2.children[0].children[0]);
        this.fe1blOpacityAnimation = this.opacityAnimation(1, 0, 1.6, this.fe1bl2.children[0].children[0]);
        this.fe2qgOpacityAnimation = this.opacityAnimation(1, 0, 1.6, this.fe2qg2.children[0].children[0]);
        this.fe2blOpacityAnimation = this.opacityAnimation(1, 0, 1.6, this.fe2bl2.children[0].children[0]);
        this.peiweishuAnimation = this.opacityAnimation(1, 0, 1.6, this.pwsAni.children[0].children[0]);
        this.peiweishuAnimation1 = this.opacityAnimation(1, 0.9, 1.6, this.pwsSma.children[0].children[1]);


        this.scene.add(this.fe1bl1);
        this.scene.add(this.fe1bl2);
        this.scene.add(this.fe1bl3);
        this.scene.add(this.fe1qg1);
        this.scene.add(this.fe1qg2);
        this.scene.add(this.fe1qg3);
        this.scene.add(this.fe2bl1);
        this.scene.add(this.fe2bl2);
        this.scene.add(this.fe2bl3);
        this.scene.add(this.fe2qg1);
        this.scene.add(this.fe2qg2);
        this.scene.add(this.fe2qg3);
        this.scene.add(this.pwsSma);
        this.scene.add(this.pwsBig);
        this.scene.add(this.pwsAni);
        this.animation1 = this.createAnimation(bl2);
        this.animation2 = this.createAnimation(qg2);
        this.animation3 = this.createAnimation(bl5);
        this.animation4 = this.createAnimation(qg5);
        this.animation5 = this.createAnimation(pwsdh);
        this.setMaterial();

    }

    //给模型上色
    setMaterial() {
        const materialSphFill = new THREE.MeshPhongMaterial({color : '#8f98a3', specular: '#ffffff', shininess: 30, transparent: true});
        const fe1blclone = materialSphFill.clone();
        const fe1qgclone = materialSphFill.clone();
        const fe2blclone = materialSphFill.clone();
        const fe2qgclone = materialSphFill.clone();
        const pwsclone = materialSphFill.clone();
        const pwssClone = materialSphFill.clone();
        //fe1比例模型设置材质
        (this.fe1bl1.children[0].children[0].children[0] as any).material = materialSphFill;
        (this.fe1bl1.children[0].children[1] as any).material = materialSphFill;

        for (let i = 0; i < 8; i++) {
            (this.fe1bl2.children[0].children[i] as any).material = fe1blclone;
        }

        (this.fe1bl3.children[0].children[0].children[0] as any).material = materialSphFill;

        //fe2比例模型设置材质

        (this.fe2bl1.children[0].children[0] as any).material = materialSphFill;

        for (let i = 0; i < 14; i++) {
            (this.fe2bl2.children[0].children[i] as any).material = fe2blclone;
        }

        (this.fe2bl3.children[0].children[0] as any).material = materialSphFill;

        //fe1球棍模型设置材质
        (this.fe1qg1.children[0].children[0].children[0] as any).material = materialSphFill;
        (this.fe1qg1.children[0].children[0].children[1] as any).material = materialSphFill;

        for (let i = 0; i < 8; i++) {
            (this.fe1qg2.children[0].children[i] as any).material = fe1qgclone;
        }

        (this.fe1qg3.children[0].children[0] as any).material = materialSphFill;

        //fe2球棍模型设置材质

        for (let i = 0; i < 2; i++) {
            (this.fe2qg1.children[0].children[i] as any).material = materialSphFill;
        }

        for (let i = 0; i < 14; i++) {
            (this.fe2qg2.children[0].children[i] as any).material = fe2qgclone;
        }

        (this.fe2qg3.children[0].children[0] as any).material = materialSphFill;

        (this.pwsBig.children[0].children[0] as any).material = materialSphFill;
        (this.pwsBig.children[0].children[1] as any).material = materialSphFill;
        for (let i = 0; i < 35; i++) {
            (this.pwsAni.children[0].children[i] as any).material = pwsclone;
        }
        (this.pwsSma.children[0].children[0] as any).material = materialSphFill;
        (this.pwsSma.children[0].children[1] as any).material = pwssClone; //配位数中心小球颜色
    }

    //fe1动画方法
    createAnimation(model: any) {
        const animation = new ModelAnimationGroup(model);

        animation.setLoopOne(0);
        animation.setAnimationDoubleSpeed(0, 0.3);
        return animation;
    }

    resetAnimation(animation: any) {
        animation.resetAnimation();
    }

    resetOpacityAnimation(animation: any) {
        animation.progress(0);
        animation.pause();
    }

    resetAnimationAll() {
        this.resetAnimation(this.animation1);
        this.resetAnimation(this.animation2);
        this.resetAnimation(this.animation3);
        this.resetAnimation(this.animation4);
        this.resetAnimation(this.animation5);
        this.resetOpacityAnimation(this.fe1qgOpacityAnimation);
        this.resetOpacityAnimation(this.fe1blOpacityAnimation);
        this.resetOpacityAnimation(this.fe2qgOpacityAnimation);
        this.resetOpacityAnimation(this.fe2blOpacityAnimation);
        this.resetOpacityAnimation(this.peiweishuAnimation);
        this.resetOpacityAnimation(this.peiweishuAnimation1);
    }

    opacityAnimation(start: number, end: number, duration: number, model: any) {
        const tween = {
            opacity: start,
        };
        // 外围小球变透明动画
        const animation = TweenMax.to(tween, duration, {
            opacity: end,
            onUpdate: () => {
                (model as any).material.opacity = tween.opacity;
            },
            paused: true
        });
        return animation;
    }



    //启动动画的方法
    fe1PlayqgOpacityAnimation() {
        this.fe1qgOpacityAnimation.play();
    }

    fe1PlayblOpacityAnimation() {
        this.fe1blOpacityAnimation.play();
    }

    fe2PlayqgOpacityAnimation() {
        this.fe2qgOpacityAnimation.play();
    }

    fe2PlayblOpacityAnimation() {
        this.fe2blOpacityAnimation.play();
    }

    peiweishuOpacityAnimation() {
        this.peiweishuAnimation.play();
        this.peiweishuAnimation1.play();
    }


    fe1BlAnimationPlay() {
        this.fe1bl1.visible = false;
        this.fe1bl2.visible = true;
        this.fe1bl3.visible = true;
        this.animation1.playAnimation(0);

    }

    fe1QgAnimationPlay() {
        this.fe1qg1.visible = false;
        this.fe1qg2.visible = true;
        this.fe1qg3.visible = true;
        this.animation2.playAnimation(0);
    }

    fe2BlAnimationPlay() {
        this.fe2bl1.visible = false;
        this.fe2bl2.visible = true;
        this.fe2bl3.visible = true;
        this.animation3.playAnimation(0);

    }

    fe2QgAnimationPlay() {
        this.fe2qg1.visible = false;
        this.fe2qg2.visible = true;
        this.fe2qg3.visible = true;
        this.animation4.playAnimation(0);
    }

    peiweishuPlay() {
        this.pwsBig.visible = false;
        this.pwsAni.visible = true;
        this.pwsSma.visible = true;
        this.animation5.playAnimation(0);
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(0, 50, 200);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }

}
