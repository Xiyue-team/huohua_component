/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */
import * as THREE from 'three';
import {ThreeBase} from "./template/ThreeBase";
import {
    AnimationAction,
    AnimationActionLoopStyles,
    AnimationClip, AnimationMixer, Bone, Clock, ColladaModel, CTMLoader, LoopRepeat, Material, MeshBasicMaterial,
    MTLLoader,
    Scene,
    WebGLRenderer
} from "three";


var OBJLoader = require('three-obj-loader');
var MtlLoader = require('three-mtl-loader');
var StlLoader = require('three-stl-loader');
var GLTFLoader = require('three-gltf-loader');

var OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);
/*require('imports?THREE=three!exports?THREE.OrbitControls!../../node_modules\/three\/examples\/js\/loaders\/OBJLoader');*/
export class Gltf3DModel extends ThreeBase {


    /* //场景
     private scene:any;
     //摄像机
     private camera:any;
     //渲染器
     private renderer:any;
     //光源
     private lights:any = [];


     private fov:number = 40;
     private near:number = 20;
     private far:number = 190;*/



    //private obj:any = null;

    private mixer:AnimationMixer;
    action:AnimationAction;
    private clock:Clock = new THREE.Clock();
    private render = ()=>{
        requestAnimationFrame( this.render );
        //this.obj.rotation.z  += 0.005;

        var delta = this.clock.getDelta();

        if(this.mixer){
            // animate Collada model
            this.mixer.update(delta);
        }


        this.renderer.render( this.scene, this.camera );
    }

    /**
     *
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */
    constructor(domElement:Element,fov?:number,width?:number,height?:number,near?:number,far?:number) {
        super();
        this.fov     = !fov    ? this.fov       : fov;
        this.near    = !near   ? this.near      : near;
        this.far     = !far    ? this.far       : fov;
        this.width   = !width  ? window.innerWidth     : width;
        this.height  = !height ? window.innerHeight    : height;
        this.domElement = domElement;
        console.log("init Simple3DModel constructor");
        this.init();

    }
    async init(){
        this.initScene();
        this.initCamera();
        this.initLight();
        let isOk = this.initGltfLoader();
         if(isOk){
            this.initWebGLRenderer();
            this.initControl();

            this.render();
        }
    }


    initScene():void{
        this.scene = new THREE.Scene();
    }


    /**
     * 初始化镜头
     */
    initCamera():void{
        this.camera = new THREE.PerspectiveCamera(this.fov,this.width/this.height,this.near, this.far);
        this.camera.position.z = 10;

    }


    enableSkinning(material:any) {
        var materials = material
        for (var i = 0,length = materials.length; i < length; i++) {
            var mat = materials[i]; mat.skinning = true;
        }
    }

    mesh:any;
    bone:any
    async initGltfLoader() {
        let loader = new GLTFLoader() as MTLLoader;

        return new Promise((resolve,reject)=>{
            loader.load('./static/index.gltf',
                (gltf)=> {
                    var scene = (gltf as any).scene;

                    scene.traverse((child:any)=> {

                        if(child instanceof Material){
                            this.enableSkinning(child);
                            this.mesh = child;
                        }
                        if(child instanceof Bone){
                            this.bone = child;
                        }
                    });

                    this.mesh = new THREE.SkinnedMesh(this.bone, new THREE.MeshFaceMaterial(this.mesh));

                    /*      var mixer;
                          var action;*/

                    this.mixer = new THREE.AnimationMixer(scene);
                    this.action = this.mixer.clipAction((gltf as any).animations[0]);
                    this.action.setLoop(THREE.LoopOnce,1);
                    this.action.clampWhenFinished = !0;
                    this.scene.add(scene);

                    this.action.play();
                    (window as any)["action"] = this.action;
                    (window as any)["mixer"] = this.mixer;

                },
                // called when loading is in progresses
                ( xhr  )=> {
                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                },
                // called when loading has errors
                ( error )=> {
                    console.error(error)
                    console.log( 'An error happened' );

                }
            );

        });
    }




    /**
     * 初始化渲染器
     */
    initWebGLRenderer():void{
        if(this.webglAvailable()){
            this.renderer = new THREE.WebGLRenderer();
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        //this.renderer = new THREE.WebGLRenderer({antialias:true});
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor("#FFFFFF" ,0.9);
        this.renderer.setSize(this.width,this.height);
        var element = this.domElement.appendChild(this.renderer.domElement);

    }

    /**
     * 初始化控制器
     */
    initControl():void{
        var orbit = new OrbitControls( this.camera, this.renderer.domElement );
        orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        orbit.enableZoom = true;
        //是否自动旋转
        orbit.autoRotate = true;
        //设置相机距离原点的最远距离
        orbit.minDistance = 1;
        //设置相机距离原点的最远距离
        orbit.maxDistance = 4000;
        //是否开启右键拖拽
        orbit.enablePan = false;
    }

    /**
     * 初始化光源
     */
    initLight():void{
        //this.lights = [new THREE.DirectionalLight( "#FFFFFF", 1 )];
        this.lights = [];
        this.lights.push(new THREE.PointLight(0xffffff,1,0));
        this.lights.push(new THREE.PointLight(0xffffff,1,0));
        this.lights.push(new THREE.PointLight(0xffffff,1,0));
        this.lights.push(new THREE.AmbientLight( 0xffffff, 0.5 ));

        this.lights[0].position.set(0, 200,0);
        this.lights[1].position.set(100, 200,100);
        this.lights[2].position.set(-100, -200, -100);

        this.scene.add(this.lights[0]);
        this.scene.add(this.lights[1]);
        this.scene.add(this.lights[2]);
        //this.scene.add(this.lights[3]);

    }


}
