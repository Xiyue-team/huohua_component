/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */
import * as THREE from 'three';
import { Material, MTLLoader, WebGLRenderer } from "three";
import {ThreeBase} from "../../../src/three/template/ThreeBase";
import {Mesh} from "three";
import {PerspectiveCamera} from "three";

const Interaction  = require('three.interaction');

var GLTFLoader = require('three-gltf-loader');
var OBJLoader = require('three-obj-loader');
var OrbitControls = require('three-orbitcontrols')
OBJLoader(THREE);


import * as gltf1 from "../sub_static/mountain/01.gltf";
import * as bin1 from "../sub_static/mountain/01.bin";

import * as gltf2 from "../sub_static/mountain/02.gltf";
import * as bin2 from "../sub_static/mountain/02.bin";

import * as gltf3 from "../sub_static/mountain/03.gltf";
import * as bin3 from "../sub_static/mountain/03.bin";

import * as gltf4 from "../sub_static/mountain/04.gltf";
import * as bin4 from "../sub_static/mountain/04.bin";

import * as gltf5 from "../sub_static/mountain/05.gltf";
import * as bin5 from "../sub_static/mountain/05.bin";

import * as gltf6 from "../sub_static/mountain/06.gltf";
import * as bin6 from "../sub_static/mountain/06.bin";

import * as gltf7 from "../sub_static/mountain/07.gltf";
import * as bin7 from "../sub_static/mountain/07.bin";

import * as gltf8 from "../sub_static/mountain/08.gltf";
import * as bin8 from "../sub_static/mountain/08.bin";

import * as gltf9 from "../sub_static/mountain/09.gltf";
import * as bin9 from "../sub_static/mountain/09.bin";

import * as gltf10 from "../sub_static/mountain/10.gltf";
import * as bin10 from "../sub_static/mountain/10.bin";

import * as gltf11 from "../sub_static/mountain/11.gltf";
import * as bin11 from "../sub_static/mountain/11.bin";

import * as gltf12 from "../sub_static/mountain/12.gltf";
import * as bin12 from "../sub_static/mountain/12.bin";

import * as m26 from "../sub_static/mountain/Material26_baseColor.png";
import * as m27 from "../sub_static/mountain/Material27_baseColor.png";
import * as m28 from "../sub_static/mountain/Material28_baseColor.png";
import * as m29 from "../sub_static/mountain/Material29_baseColor.png";
import * as m30 from "../sub_static/mountain/Material30_baseColor.png";
import * as m31 from "../sub_static/mountain/Material31_baseColor.png";
import * as mBg from "../sub_static/mountain/mountaion_bg.png";

export class Mountaion3dModel extends ThreeBase{

    planeMesh:Mesh
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



    interaction:any;

  /*  clothFun:ClothFun = new ClothFun();*/

    private render = ()=>{
        requestAnimationFrame( this.render );
        this.renderer.render( this.scene, this.camera );
        //this.flag.animation();
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

        this.initWebGLRenderer();
        this.initControl();
        this.interaction = new Interaction.Interaction(this.renderer, this.scene, this.camera);


        this.initFlag(gltf1,1);
        this.initFlag(gltf2,2);
        this.initFlag(gltf3,3);
        this.initFlag(gltf4,4);
        this.initFlag(gltf5,4);
        this.initFlag(gltf6,4);
        this.initFlag(gltf7,4);
        this.initFlag(gltf8,4);
        this.initFlag(gltf9,4);
        this.initFlag(gltf10,4);
        this.initFlag(gltf11,4);
        this.initFlag(gltf12,4);
        //this.initFlag("13.gltf",4);
        this.initBackgountMesh();
        /*this.initFlag("HQ05.gltf",5);*/
        this.render();

        this.preload();
    }

    preload(){
        let data = [
            gltf1,gltf2,gltf3,gltf4,gltf5,gltf6,gltf7,gltf8,gltf9,gltf10,gltf11,gltf12,
            bin1,bin2,bin3,bin4,bin5,bin6,bin7,bin8,bin9,bin10,bin11,bin12,
            m26,m27,m28,m29,m30,m31,mBg
        ]
        for(let i=0;i<data.length;i++){
            console.log(data[i]);
        }
    }

    initScene():void{
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xcce0ff );
        this.scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
    }


    /**
     * 初始化镜头
     */
    initCamera():void{
        this.camera = new THREE.PerspectiveCamera(45,this.width/this.height,1, 5000);
      /*  this.camera.position.set( 0, -100,700 );
        this.camera.lookAt(0, 0, 0)*/
        this.camera.position.set(0, 40, 55)
        this.camera.lookAt(new THREE.Vector3(0, 20, 0))
    }


    /**
     * 初始化渲染器
     */
    initWebGLRenderer():void{
        if(this.webglAvailable()){
            this.renderer = new THREE.WebGLRenderer({ antialias: true } );
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        //this.renderer = new THREE.WebGLRenderer({antialias:true});
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        /*(this.renderer as WebGLRenderer).setClearColor("#FFFFFF" ,0.9);*/
        this.renderer.setSize(this.width,this.height);
        var element = this.domElement.appendChild(this.renderer.domElement);

    /*    (this.renderer as any).gammaInput = true;
        (this.renderer as any).gammaOutput = true;*/
        //(this.renderer as any).shadowMap.enabled = true;

    }

    /**
     * 初始化控制器
     */
    initControl():void{
        var orbit = new OrbitControls( this.camera, this.renderer.domElement );
        orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        orbit.enableDamping = true;

        //orbit.maxPolarAngle = Math.PI * 0.5;
        //设置相机距离原点的最远距离
        orbit.minDistance = 50;
        orbit.maxDistance = 70;

        // 使动画循环使用时阻尼或自转 意思是否有惯性
        orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否自动旋转
        //orbit.autoRotate = true;
        orbit.minAzimuthAngle = -Math.PI/2;
        orbit.maxAzimuthAngle = Math.PI/2;

        //orbit.minPolarAngle = ; // radians
        orbit.maxPolarAngle = Math.PI*4/9; // radians

        //是否开启右键拖拽
        orbit.enablePan = false;

    }

    /**
     * 初始化光源
     */
    initLight():void{
        this.lights = [];

        this.scene.add( new THREE.AmbientLight( 0x666666 ) );

        this.lights[0] = new THREE.DirectionalLight( 0xdfebff, 1 );
        this.lights[0].position.set( 50, 200, 100 );
        this.lights[0].position.multiplyScalar( 1.3 );

        /*this.lights[0].castShadow = true;

        this.lights[0].shadow.mapSize.width = 1024;
        this.lights[0].shadow.mapSize.height = 1024;

        var d = 300;

        (this.lights[0] as any).shadow.camera.left = - d;
        (this.lights[0] as any).shadow.camera.right = d;
        (this.lights[0] as any).shadow.camera.top = d;
        (this.lights[0] as any).shadow.camera.bottom = - d;

        (this.lights[0] as any).shadow.camera.far = 1000;*/

        this.scene.add( this.lights[0] );
    }


    initBackgountMesh(){
        var loader = new THREE.TextureLoader();
        let scale = 0.01;
        let width = 5083*scale;
        let height = 3417*scale;

        loader.load( mBg as any,(groundTexture)=>{
            /*groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;*/
      /*      groundTexture.repeat.set( 25, 25 );*/
            groundTexture.anisotropy = 16;

            var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );

            var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( width, height ), groundMaterial );
            mesh.position.y = 5;
            mesh.position.x = 0;
            mesh.rotation.x = - Math.PI / 2;
            //mesh.receiveShadow = true;
            this.scene.add( mesh );
        });

        let material = new THREE.MeshBasicMaterial( {color: 0xE6E6FA, side: THREE.DoubleSide} );
        material.opacity = 0.6;
        material.polygonOffset=true;//开启偏移
        material.polygonOffsetFactor=-2;//与相机距离减2
        material.polygonOffsetUnits=1;//偏移的单位

        this.planeMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( width, height, 32 ), material);
        //max 17  min=5
        this.planeMesh.position.y = 5;
        this.planeMesh.position.x = 0;
        this.planeMesh.visible = false;
        this.planeMesh.rotation.x = - Math.PI / 2;
        this.scene.add(this.planeMesh);
    }

    changePlanePositionY(per:any){
        let min = 5;
        let max = 17;
        let y = per/100*(max-min)
        this.planeMesh.position.y = y+min ;
    }

    enablePlaneMesh(isVisable:any){
        this.planeMesh.visible = isVisable;
    }


    initFlag(gltfPath:any,index:any){
        let loader = new GLTFLoader() as MTLLoader;

        return new Promise((resolve,reject)=>{
            loader.load(gltfPath,
                (gltf)=> {
                    var scene = (gltf as any).scene;
                    scene.traverse((child:any)=> {
                        if(child instanceof Mesh){

                            var cubeMaterial = new THREE.MeshDepthMaterial();
                            (child.material as Material).opacity = 0.6;
                            //child.rotateX(Math.PI/2);
                         /*   /!*(child.material as Material).polygonOffset=true;//开启偏移
                            (child.material as Material).polygonOffsetFactor=-2;//与相机距离减2
                            (child.material as Material).polygonOffsetUnits=1;//偏移的单位*!/
                            (child.material as Material).depthTest=false;//偏移的单位*/
                            //(child.material as Material).depthTest=false;
                            this.scene.add(child);

                            //this.scene.op
                            //this.scene.add(obj3d);
                        }
                        //this.scene.add(this.group);
                    });

                    resolve(true);
                },
                ( xhr  )=> {
                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                },
                ( error )=> {
                    console.error(error)
                    console.log( 'An error happened' );

                }
            );

        });
    }

    resize(width:number,height:number){
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();

        this.renderer.setSize( width, height );
    }

}
