/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */
import * as THREE from 'three';
import {AnimationAction, AnimationMixer, Clock, Scene, WebGLRenderer, Group, Mesh} from 'three';
import {ThreeBase} from '../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);

import * as jtPath from '../sub_static/JT.gltf';
import * as jtBin from '../sub_static/JT.bin';

import * as xbPath from '../sub_static/XB.gltf';
import * as xbBin from '../sub_static/XB.bin';

import * as xbhPath from '../sub_static/XBH.gltf';
import * as xbhBin from '../sub_static/XBH.bin';

import * as xgPath from '../sub_static/XG.gltf';
import * as xgBin from '../sub_static/XG.bin';


import * as m223 from '../sub_static/Material223_baseColor.png';
import * as m224 from '../sub_static/Material224_baseColor.png';
import * as m225 from '../sub_static/Material225_baseColor.png';
import * as m226 from '../sub_static/Material226_baseColor.png';
import * as m229 from '../sub_static/Material229_baseColor.png';
import * as m230 from '../sub_static/Material230_baseColor.png';
import * as m342 from '../sub_static/Material342_baseColor.png';
import * as m343 from '../sub_static/Material343_baseColor.png';
import * as m344 from '../sub_static/Material344_baseColor.png';
import * as m523 from '../sub_static/Material523_baseColor.png';
import {D3Control} from '../../../src/three/util/3DControl';

import * as white from '../../../static/images/white.png';
import * as black from '../../../static/images/black.png';
import * as tran from '../../../static/images/tran.png';
import {PerspectiveCamera} from 'three';


export class Lymph3DModel extends ThreeBase {

    private mixer: AnimationMixer;
    action: AnimationAction;
    private clock: Clock = new THREE.Clock();

    xbVisible: Boolean = false;
    xbhVisible: Boolean = false;
    xgVisible: Boolean = false;
    jtVisible: Boolean = false;


    /**
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
        this.init();

    }

    async init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initGltfLoader();
        this.initWebGLRenderer();
        this.initControl();


        this.render();
    }

    preload() {
        console.log(jtPath);
        console.log(jtBin);

        console.log(xbPath);
        console.log(xbBin);

        console.log(xbhPath);
        console.log(xbhBin);

        console.log(xgPath);
        console.log(xgBin);


        console.log(m223);
        console.log(m224);
        console.log(m225);
        console.log(m226);
        console.log(m229);
        console.log(m230);
        console.log(m342);
        console.log(m343);
        console.log(m344);
        console.log(m523);

        console.log(white);
        console.log(black);
        console.log(tran);
    }

    initScene(): void {
        this.scene = new THREE.Scene();
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {


        this.camera =  new THREE.PerspectiveCamera(this.fov, this.width / this.height, this.near, this.far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 800);
    }


    /**
     * 加载模型
     * @returns {Promise<void>}
     */
    async initGltfLoader()  {

        this.gltfLoader(xbPath as any).then((xb: any) => {
            xb.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    (child as any).opacity = 0.6;
                    child.visible = false;
                    this.xbVisible = true;


                    this.scene.add(child);
                }
            });
        });


       this.gltfLoader(xbhPath as any).then( (xbh: any) => {
           xbh.scene.traverse((child: any) => {
               if (child instanceof Scene) {
                   child.visible = false;
                   this.xbhVisible = true;
                   this.scene.add(child);
               }
           });
        });


       this.gltfLoader(xgPath as any).then((xg: any) => {
            xg.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                    child.visible = false;
                    this.xgVisible = true;
                    /*e.material = new THREE.MeshPhysicalMaterial({
                        color: a.color,
                        transparent: a.transparent,
                        opacity: a.opacity,
                        side: THREE.FrontSide,
                        map: a.map,
                        depthTest: t
                    })*/

                   /* (child.children[0] as Group).remove(child.children[0].children[0]);
                    (child.children[0] as Group).remove(child.children[0].children[0]);
                    (child.children[0] as Group).remove(child.children[0].children[0]);
                    (child.children[0] as Group).remove(child.children[0].children[0]);*/
                    //(child.children[0] as Group).remove(child.children[0].children[0]);

                    this.changeMaterialOpacity((child.children[0].children[0] as any), 1);
                    this.changeMaterialOpacity((child.children[0].children[1] as any), 2);
                    this.changeMaterialOpacity((child.children[0].children[2] as any), 3);
                    this.changeMaterialOpacity((child.children[0].children[3] as any), 4);
                    this.changeMaterialOpacity((child.children[0].children[4] as any), 5);


                    console.log((child.children[0].children[0] as Mesh).material);
                    console.log(child.children[0].children);
                    this.scene.add(child);
                }
            });
        });

       this.gltfLoader(jtPath as any).then((jt: any) => {
            jt.scene.traverse((child: any) => {
                if (child instanceof Scene) {
                }
            });

           jt.scene.visible = false;
           this.jtVisible = true;

           this.mixer = new THREE.AnimationMixer(jt.scene);
           this.action = this.mixer.clipAction((jt as any).animations[0]);
           jt.scene.position.z = -50;
           this.scene.add(jt.scene);

           this.action.play();
           (window as any)['action'] = this.action;
           (window as any)['mixer'] = this.mixer;
        });

        //this.initBgControl();
    }

    changeMaterialOpacity ( mesh: any, index: any) {
        const material = (mesh.material as any).clone();
        mesh.material = new THREE.MeshPhysicalMaterial({
            color: material.color,
            transparent: false,
            opacity: 0.5,
            side: THREE.FrontSide,
            map: material.map,
            depthTest: false,
            alphaTest : 0.5,
            depthWrite: false
        });
        mesh.renderOrder = index;
        console.log(material);

    }

    initBgControl() {
        const modelOption = {
            //点击白色背景色按钮
            changeToWhiteCall: () => {
                (this.renderer as WebGLRenderer).setClearColor('#FFFFFF' , 1);
            },
            //点击黑色背景色按钮
            changeToBlackCall: () => {
                (this.renderer as WebGLRenderer).setClearColor('#000000' , 1);
            },
            showCamera: () => {
                (this.renderer as WebGLRenderer).setClearColor('#FFFFFF' , 0);
            },
            modelBtnArry: [] as any,
            black: black,
            white: white,
            tran: tran,


        };
        const d3Control = new D3Control(modelOption);
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            //背景透明
            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true});
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }

        //this.renderer = new THREE.WebGLRenderer({antialias:true});
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor('#FFFFFF' , 0.0);
        //(this.renderer as any).sortObjects = false;

        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);

    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        const orbit = new OrbitControls( this.camera, this.renderer.domElement );
        orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        orbit.enableZoom = true;
        //是否自动旋转
        orbit.autoRotate = false;
        //设置相机距离原点的最远距离
        orbit.minDistance = 460;
        //设置相机距离原点的最远距离
        orbit.maxDistance = 1000;

        /*
                orbit.minAzimuthAngle = -Math.PI/2;
                orbit.maxAzimuthAngle = Math.PI/2;
        */

        //orbit.maxPolarAngle = Math.PI/100; // radians
        //是否开启右键拖拽
        orbit.enablePan = false;
    }

    /**
     * 初始化光源
     */
    initLight(): void {
        this.lights = [];

        this.scene.add( new THREE.AmbientLight( 0x666666 ) );

        this.lights[0] = new THREE.DirectionalLight( 0xdfebff, 1 );
        this.lights[0].position.set( 50, 200, 100 );
        this.lights[0].position.multiplyScalar( 1.3 );
        this.lights[0].castShadow = true;
        this.lights[0].shadow.mapSize.width = 1024;
        this.lights[0].shadow.mapSize.height = 1024;

        const d = 300;

        (this.lights[0] as any).shadow.camera.left = - d;
        (this.lights[0] as any).shadow.camera.right = d;
        (this.lights[0] as any).shadow.camera.top = d;
        (this.lights[0] as any).shadow.camera.bottom = - d;
        (this.lights[0] as any).shadow.camera.far = 1000;

        this.scene.add( this.lights[0] );

    }

    private render = () => {
        requestAnimationFrame( this.render );

        if ( this.xgVisible && this.xbhVisible && this.xbVisible && this.jtVisible){
            this.scene.traverse((child: any) => {
                if ( child.visible == false) {
                    child.visible = true;
                }
            });
        }

        const delta = this.clock.getDelta();

        if (this.mixer) {
            // animate Collada model
            this.mixer.update(delta);
        }
        this.renderer.render( this.scene, this.camera );
    }


    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();

        this.renderer.setSize( width, height );
    }


}
