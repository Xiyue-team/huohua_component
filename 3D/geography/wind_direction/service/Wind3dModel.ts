/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */
import * as THREE from 'three';
const Interaction  = require('three.interaction');
import {
    AnimationAction,
    AnimationActionLoopStyles,
    AnimationClip, AnimationMixer, Bone, Clock, ColladaLoader, ColladaModel, CTMLoader, LoopRepeat, Material,
    MeshBasicMaterial,
    MTLLoader,
    Scene,
    WebGLRenderer
} from "three";
var GLTFLoader = require('three-gltf-loader');
import {ThreeBase} from "../../../src/three/template/ThreeBase";
import {Geometry} from "three";
import {Mesh} from "three";
import {Vector2} from "three";
import {ParametricGeometry} from "three";
import {Texture} from "three";
import {Flag} from "./Flag";
import {PerspectiveCamera} from "three";


var OBJLoader = require('three-obj-loader');


var OrbitControls = require('three-orbitcontrols')
OBJLoader(THREE);

import * as gltf1 from "../sub_static/flag/01.gltf";
import * as bin1 from "../sub_static/flag/01.bin";

import * as gltf2 from "../sub_static/flag/02.gltf";
import * as bin2 from "../sub_static/flag/02.bin";

import * as gltf3 from "../sub_static/flag/03.gltf";
import * as bin3 from "../sub_static/flag/03.bin";

import * as gltf4 from "../sub_static/flag/04.gltf";
import * as bin4 from "../sub_static/flag/04.bin";

import * as gltf5 from "../sub_static/flag/05.gltf";
import * as bin5 from "../sub_static/flag/05.bin";

import * as gltf6 from "../sub_static/flag/06.gltf";
import * as bin6 from "../sub_static/flag/06.bin";

import * as m54 from "../sub_static/flag/Material54_baseColor.png";

import * as redFlag from "../sub_static/red.png";
import * as gress from "../sub_static/gress.jpg";

import * as fwGltf from "../sub_static/wind/FW.gltf";
import * as fwBin from "../sub_static/wind/FW.bin";

import * as jtGltf from "../sub_static/wind/JT01.gltf";
import * as jtBin from "../sub_static/wind/JT01.bin";

import * as m27 from "../sub_static/wind/Material27_baseColor.png";
import * as mcolor from "../sub_static/wind/Material_baseColor.png";

export class Wind3dModel extends ThreeBase{


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
    private flags:any = [];
    private clothGeometry:ParametricGeometry;
    private object:Mesh;
    interaction:any;
    group = new THREE.Group();

    flag:Flag;
  /*  clothFun:ClothFun = new ClothFun();*/

    lastTime = new Date().getTime();
    private render = ()=>{
        requestAnimationFrame( this.render );


        if(this.flags.length == 6 && (new Date().getTime() - this.lastTime)>200){
            this.lastTime = new Date().getTime();
            if(this.currentModel){
                this.flags[0].visible = false;
                this.flags[2].visible = false;
                this.flags[4].visible = false;

                this.flags[1].visible = true;
                this.flags[3].visible = true;
                this.flags[5].visible = true;
            }else{
                this.flags[0].visible = true;
                this.flags[2].visible = true;
                this.flags[4].visible = true;

                this.flags[1].visible = false;
                this.flags[3].visible = false;
                this.flags[5].visible = false;
            }
            this.currentModel = !this.currentModel
        }

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
        this.initMaterial();
        this.initDirectionGltfLoader();
        this.initArrowGltfLoader();
        /*this.initPoles();*/
        this.initWebGLRenderer();
        //this.initControl();
        //this.initRotateEvent();
        this.windowHalfX = this.width / 2;
        this.windowHalfY = this.height/ 2;
        this.interaction = new Interaction.Interaction(this.renderer, this.scene, this.camera);
       //this.initFlag();
        this.flag = new Flag();
        this.flag.init(this.scene,this.camera,this.renderer,this.group);

        this.preload();

        this.initFlag(gltf1 as any,1);
        this.initFlag(gltf2 as any,2);
        this.initFlag(gltf3 as any,3);
        this.initFlag(gltf4 as any,4);
        this.initFlag(gltf4 as any,5);
        this.initFlag(gltf4 as any,6);
        /*this.initFlag("HQ05.gltf",5);*/
        this.render();

    }

    preload(){
        console.log(gltf1);
        console.log(bin1);
        console.log(gltf2);
        console.log(bin2);
        console.log(gltf3);
        console.log(bin3);
        console.log(gltf4);
        console.log(bin4);
        console.log(gltf5);
        console.log(bin5);
        console.log(gltf6);
        console.log(bin6);

        console.log(m54);
        console.log(redFlag);
        console.log(gress);

        console.log(fwGltf);
        console.log(fwBin);
        console.log(jtGltf);
        console.log(jtBin);
        console.log(m27);
        console.log(mcolor);
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
        this.camera.position.set(135, 100, 135)
        this.camera.lookAt(new THREE.Vector3(0, 30, 0))
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
        (this.renderer as WebGLRenderer).setClearColor("#FFFFFF" ,0.9);
        this.renderer.setSize(this.width,this.height);
        var element = this.domElement.appendChild(this.renderer.domElement);

        (this.renderer as any).gammaInput = true;
        (this.renderer as any).gammaOutput = true;
        (this.renderer as any).shadowMap.enabled = true;

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
        orbit.minDistance = 100;
        orbit.maxDistance = 5000;

        // 使动画循环使用时阻尼或自转 意思是否有惯性
        orbit.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否自动旋转
        //orbit.autoRotate = true;


        //是否开启右键拖拽
        //orbit.enablePan = false;

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

        this.lights[0].castShadow = true;

        this.lights[0].shadow.mapSize.width = 1024;
        this.lights[0].shadow.mapSize.height = 1024;

        var d = 300;

        (this.lights[0] as any).shadow.camera.left = - d;
        (this.lights[0] as any).shadow.camera.right = d;
        (this.lights[0] as any).shadow.camera.top = d;
        (this.lights[0] as any).shadow.camera.bottom = - d;

        (this.lights[0] as any).shadow.camera.far = 1000;

        this.scene.add( this.lights[0] );
    }

    initMaterial(){
        var loader = new THREE.TextureLoader();
        var clothTexture = loader.load( redFlag as any);
        clothTexture.anisotropy = 16;

        var clothMaterial = new THREE.MeshLambertMaterial( {
            map: clothTexture,
            side: THREE.DoubleSide,
            alphaTest: 0.5
        } );

        // cloth geometry

        /*this.clothGeometry = new THREE.ParametricGeometry( clothFunction, cloth.w, cloth.h );

        // cloth mesh

        this.object = new THREE.Mesh( this.clothGeometry, clothMaterial );
        this.object.position.set( 0, 0, 0 );
        this.object.castShadow = true;
        this.scene.add( this.object );

        (this.object as any).customDepthMaterial = new THREE.MeshDepthMaterial(( {
            depthPacking: THREE.RGBADepthPacking,
            map: clothTexture,
            alphaTest: 0.5
        } as any) );*/

        // ground

        loader.load( gress as any,(groundTexture)=>{
            groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
            groundTexture.repeat.set( 25, 25 );
            groundTexture.anisotropy = 16;

            var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );

            var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
            mesh.position.y = -100;
            mesh.rotation.x = - Math.PI / 2;
            mesh.receiveShadow = true;
            this.scene.add( mesh );
        });

    }

    initPoles(){
        // poles

        var poleGeo = new THREE.BoxBufferGeometry( 5, 375, 5 );
        var poleMat = new THREE.MeshLambertMaterial();

        var mesh = new THREE.Mesh( poleGeo, poleMat );
        mesh.position.x = - 125;
        mesh.position.y = - 62;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        this.scene.add( mesh );

        var mesh = new THREE.Mesh( poleGeo, poleMat );
        mesh.position.x = 125;
        mesh.position.y = - 62;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add( mesh );

        var mesh = new THREE.Mesh( new THREE.BoxBufferGeometry( 255, 5, 5 ), poleMat );
        mesh.position.y = - 250 + ( 750 / 2 );
        mesh.position.x = 0;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        this.scene.add( mesh );

        var gg = new THREE.BoxBufferGeometry( 10, 10, 10 );
        var mesh = new THREE.Mesh( gg, poleMat );
        mesh.position.y = - 250;
        mesh.position.x = 125;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        this.scene.add( mesh );

        var mesh = new THREE.Mesh( gg, poleMat );
        mesh.position.y = - 250;
        mesh.position.x = - 125;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        this.scene.add( mesh );
    }

    async initDirectionGltfLoader() {
        let loader = new GLTFLoader() as MTLLoader;

        return new Promise((resolve,reject)=>{
            loader.load(fwGltf as any,
                (gltf)=> {
                    var scene = (gltf as any).scene;
                    scene.traverse((child:any)=> {
                        if(child instanceof Material){
                            /*this.enableSkinning(child);
                            this.mesh = child;*/
                        }
                        if(child instanceof Bone){
                          /*  this.bone = child;*/
                        }
                    });
                    scene.position.x = -10;
                    scene.position.y = 0;
                    scene.position.z = -10;
                    //this.mesh = new THREE.SkinnedMesh(this.bone, new THREE.MeshFaceMaterial(this.mesh));
                    this.scene.add(scene);
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


    rotateStart:Vector2= new Vector2();
    mouseDown:boolean;
    async initArrowGltfLoader() {
        let loader = new GLTFLoader() as MTLLoader;

        return new Promise((resolve,reject)=>{
            loader.load(jtGltf as any,
                (gltf)=> {
                    var scene = (gltf as any).scene;
                    scene.traverse((child:any)=> {
                        if(child instanceof Mesh){
                            /*this.enableSkinning(child);
                             this.mesh = child;*/
                            child.position.x = -10;
                            child.position.y = 15;
                            child.position.z = -10;

                            this.object = child;
                            this.scene.add(child);
                           /* (this.scene as any).on('mousedown', (event:any)=>{
                                console.log(event)
                                console.log( "--" + event.data.rotationAngle + "--"+event.data.global.y)

                            });*/
                            this.initMouseEvent();
                        }
                        if(child instanceof Bone){
                            /*  this.bone = child;*/
                        }
                    });
                 /*   scene.position.x = -10;
                    scene.position.y = 15;
                    scene.position.z = -10;
                    //this.mesh = new THREE.SkinnedMesh(this.bone, new THREE.MeshFaceMaterial(this.mesh));
                    this.scene.add(scene);*/
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

    initMouseEvent(){
        (this.object as any).on('mousedown', (event:any)=> {
            this.mouseDown = true;
            this.mouseX = event.data.originalEvent.clientX;//出发事件时的鼠标指针的水平坐标

            this.rotateStart.set( event.data.originalEvent.clientX, event.data.originalEvent.clientY );;
        });

        (this.scene as any).on('touchstart', (event:any)=> {
            this.mouseDown = true;

            if((window as any)["direction"] == 0){
                this.mouseX = event.data.originalEvent.touches[0].pageX;
            }else{
                this.mouseX = event.data.originalEvent.touches[0].pageY;
            }
            //出发事件时的鼠标指针的水平坐标

            this.rotateStart.set( event.data.originalEvent.touches[0].pageX, event.data.originalEvent.touches[0].pageY );;
        });





        (this.scene as any).on('mouseup', (event:any)=> {
            this.mouseDown = false;
        });
        (this.object as any).on('mouseup', (event:any)=> {
            this.mouseDown = false;
        });

        (this.scene as any).on('touchend', (event:any)=> {
            this.mouseDown = false;
        });
        (this.object as any).on('touchend', (event:any)=> {
            this.mouseDown = false;
        });



        (this.scene as any).on('mousemove', (event:any)=> {
            if(!this.mouseDown){
                return;
            }
            var deltaX = event.data.originalEvent.clientX - this.mouseX;
            this.mouseX = event.data.originalEvent.clientX;
            this.rotateScene(deltaX);
        });
        (this.scene as any).on('touchmove', (event:any)=> {


            if(!this.mouseDown){
                return;
            }
            var deltaX;
            if((window as any)["direction"] == 0){
                deltaX = event.data.originalEvent.touches[0].pageX  - this.mouseX;
                this.mouseX = event.data.originalEvent.touches[0].pageX ;
            }else{
                deltaX = event.data.originalEvent.touches[0].pageY  - this.mouseX;
                this.mouseX = event.data.originalEvent.touches[0].pageY ;
            }

            this.rotateScene(deltaX);
            event.data.originalEvent.preventDefault();
        });
    }

    rotateScene(deltaX:any){
        //设置旋转方向和移动方向相反，所以加了个负号
        var deg = -deltaX/279;
        //deg 设置模型旋转的弧度
        this.object.rotation.y += deg*1.5;

        //this.flag.object.rotation.y += (-deg*1.5);
        this.rotateFlags(-deg*1.5)

    }

    rotateFlags(deg:any){
        for(let i in this.flags){
            this.flags[i].rotation.y += deg;
        }
        //this.group.rotation.y += deg;
    }
    changePivot(x:any,y:any,z:any,obj:any){
        let wrapper = new THREE.Object3D();
        wrapper.position.set(x,y,z);
        wrapper.add(obj);
        obj.position.set(-x,-y,-z);
        return wrapper;
    }


    mouseX = 0;
    windowHalfX = 0;
    windowHalfY = 0;

    currentModel =  true;

    wind = true;
    windStrength = 2;
    windForce = new THREE.Vector3(0, 0, 0);

    initFlag(gltfPath:any,index:any){
        let loader = new GLTFLoader() as MTLLoader;

        return new Promise((resolve,reject)=>{
            loader.load(gltfPath,
                (gltf)=> {
                    var scene = (gltf as any).scene;
                    scene.traverse((child:any)=> {

                        if(child instanceof Mesh){
                            /*this.enableSkinning(child);
                            this.mesh = child;*/
                            //40, 30, -50
                            child.scale.set(1,1,1.7);

                            if(index % 2 == 0){
                                child.rotateX(1*Math.PI);
                                child.rotateY(1*Math.PI);
                            }
                            //child.visible = false;
                            //this.group.add(child);
                            let obj3d = this.changePivot(0,0,15,child);
                            //40,43,-63
                             obj3d.position.x = 40;
                            obj3d.position.y = 43;
                            obj3d.position.z = -50;


                            this.scene.add(obj3d);

                            this.flags.push(obj3d);
                            //this.mesh = new THREE.SkinnedMesh(this.bone, new THREE.MeshFaceMaterial(this.mesh));

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
