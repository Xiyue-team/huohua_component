/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */
import * as THREE from 'three';
import {AnimationAction, AnimationMixer, Clock, Material, Mesh, MeshPhongMaterial, Scene, ShaderMaterial, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);

import * as bllqhtPath from '../sub_static/ballqht.gltf';
import * as bllqhtBin from '../sub_static/bi.bin';

import * as lqhtPath from '../sub_static/lqht.gltf';
import * as lqhtBin from '../sub_static/mm.bin';

import * as mColor from '../sub_static/C_baseColor.png';
import * as m243 from '../sub_static/Material243_baseColor.png';
import * as m244 from '../sub_static/Material244_baseColor.png';
import * as m245 from '../sub_static/Material245_baseColor.png';
import {ViewHandler} from '../../../src/core/CoreInterface';
import {ViewController} from '../../../src/core/ViewController';



export class Ferric3DModel extends ThreeBase {

    ballModel: any ;
    stickModel: any ;

    public animation: any;

    private mixer: AnimationMixer;
    private action: AnimationAction;
    private clock: Clock = new THREE.Clock();


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

        ViewController.getInstance().hideLoading();

    }

    async init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initGltfLoader();
        this.initWebGLRenderer();
        this.initControl();
        this.preload();

        this.render();
    }

    preload() {
        console.log(bllqhtPath);
        console.log(bllqhtBin);

        console.log(lqhtPath);
        console.log(lqhtBin);

        console.log(mColor);
        console.log(m243);
        console.log(m244);
        console.log(m245);

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
        this.camera.position.set(0, 0, 100);

    }


    /**
     * 加载模型
     * @returns {Promise<void>}
     */
    async initGltfLoader()  {

        const loader2 = new THREE.ObjectLoader();

        const loadedMesh = loader2.parse('');
        this.scene.add(loadedMesh);
        console.log(loadedMesh);

        this.mixer = new AnimationMixer(loadedMesh);
        this.action = this.mixer.clipAction((loadedMesh as any).animations[0]);

        (window as any)['action'] = this.action;
        (window as any)['mixer'] = this.mixer;

        // (window as any).action._clip.duration = 0.3;
        // (window as any).action.timeScale = 0.2;
        this.action.play();
         /*const xb: any = await this.gltfLoader(bllqhtPath as any);
        xb.scene.traverse((child: any) => {
             if ( child instanceof Scene) {
                 this.ballModel = child;

                 this.scene.add(child);
             }
         });

        const xbh: any = await this.gltfLoader(lqhtPath as any);
        xbh.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.stickModel = child;
                this.stickModel.visible = false;
                this.scene.add(child);
            }
        });
*/




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
        orbit.minDistance = 1;
        //设置相机距离原点的最远距离
        orbit.maxDistance = 4000;


     /*   orbit.minDistance = 70;
        orbit.maxDistance = 200;*/


        //orbit.maxPolarAngle = Math.PI/100; // radians
        //是否开启右键拖拽
        orbit.enablePan = false;
    }

    /**
     * 初始化光源
     */
    initLight(): void {
        this.lights = [];

        this.scene.add( new THREE.AmbientLight( 0xFFFFFF ) );

        this.lights[0] = new THREE.DirectionalLight( 0xdfebff, .5 );
        this.lights[0].position.set( 50, 200, 100 );
        this.lights[0].position.multiplyScalar( 1.3 );



       /* (this.lights[0] as any).shadow.camera.left = - d;
        (this.lights[0] as any).shadow.camera.right = d;
        (this.lights[0] as any).shadow.camera.top = d;
        (this.lights[0] as any).shadow.camera.bottom = - d;
        (this.lights[0] as any).shadow.camera.far = 1000;*/

       this.lights[1] = new THREE.DirectionalLight( 0xffffff, .5 );
        this.lights[1].position.set( 0, -200, 0 );
        this.lights[1].position.multiplyScalar( 1.3 );

        this.lights[2] = new THREE.DirectionalLight( 0xffffff, .5 );
        this.lights[2].position.set( 0, 0, 200 );
        this.lights[2].position.multiplyScalar( 1.3 );

        this.lights[3] = new THREE.DirectionalLight( 0xffffff, .5 );
        this.lights[3].position.set( 0, 0, -200 );
        this.lights[3].position.multiplyScalar( 1.3 );


        this.lights[4] = new THREE.DirectionalLight( 0xffffff, .5 );
        this.lights[4].position.set( 200, 0, 0);
        this.lights[4].position.multiplyScalar( 1.3 );

        this.lights[5] = new THREE.DirectionalLight( 0xffffff, .5 );
        this.lights[5].position.set( -200, 0, 0);
        this.lights[5].position.multiplyScalar( 1.3 );



       /* this.scene.add( this.lights[5]);
        this.scene.add( this.lights[4]);
        this.scene.add( this.lights[3]);
        this.scene.add( this.lights[2]);*/
        this.scene.add( this.lights[1]);
       this.scene.add( this.lights[0] );

    }

    private render = () => {
        requestAnimationFrame( this.render );


        const delta = this.clock.getDelta();

        if (this.mixer) {
            this.mixer.update(delta);

        }
        this.renderer.render( this.scene, this.camera );
    }


}
