/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */
import * as THREE from 'three';
import {AnimationAction, AnimationMixer, Clock, Group, Mesh, Object3D, WebGLRenderer} from "three";
import {TweenMax,Power0} from 'gsap'
import {ThreeBase} from "../../../src/three/template/ThreeBase";
import {CommonUtil} from "../../../src/util/CommonUtil";

var OBJLoader = require('three-obj-loader');
var OrbitControls = require('three-orbitcontrols')
OBJLoader(THREE);

import * as xPath from "../sub_static/x.png";
import * as xPointPath from "../sub_static/point.png";

import * as zmxPath from "../sub_static/nucleus/yzh/zmx.gltf";
import * as zmxBin from "../sub_static/nucleus/yzh/zmx.bin";
import * as ym27 from "../sub_static/nucleus/yzh/Material27_baseColor.png";
import * as ym28 from "../sub_static/nucleus/yzh/Material28_baseColor.png";

import * as dzPath from "../sub_static/nucleus/beta/dz.gltf";
import * as dzBin from "../sub_static/nucleus/beta/dz.bin";
import * as fzPath from "../sub_static/nucleus/beta/fzzzwz.gltf";
import * as fzBin from "../sub_static/nucleus/beta/fzzzwz.bin";
import * as bm29 from "../sub_static/nucleus/beta/Material29_baseColor.png";
import * as bm30 from "../sub_static/nucleus/beta/Material30_baseColor.png";

import * as alzPath from "../sub_static/nucleus/alpha/alz.gltf";
import * as alzBin from "../sub_static/nucleus/alpha/alz.bin";
import * as alM27 from "../sub_static/nucleus/alpha/Material27_baseColor.png";
import * as alM28 from "../sub_static/nucleus/alpha/Material28_baseColor.png";


export class Nucleus3DModel extends ThreeBase{



    //原子核
    nucleusModel:any;
    //α粒子
    alphaModel:any;
    //电子
    private electronModel:any;
    //反电子中微子
    private antineutrinoModel:any;

    //磁感线X
    private magneticX:any = [];
    //磁感线圆点
    private magneticPoint:any = [];
    //磁感线本身
    private magneticLine:any = [];

    //alpha 动画对象
    private alphaTweenAnimation:any;
    //电子 动画对象
    private electronTweenAnimation:any;
    //反电子中微子动画对象
    private antineutrinoTweenAnimation:any;

    private mixer:AnimationMixer;
    action:AnimationAction;
    private clock:Clock = new THREE.Clock();

    //是否是匀强磁场
    uniformMagnetic:boolean = false;

    //磁场的起始点
    magneticBeginX:number = -25;
    magneticBeginY:number  = 15;

    //运动轨迹半径
    radius = 6;

    /**
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
        this.init();

    }

    async init(){
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initMagentic();
        this.initGltfLoader();
        this.initWebGLRenderer();
        this.initControl();
        this.preload();
        this.render();
    }

    initScene():void{
        this.scene = new THREE.Scene();
    }

    cameraX:number;
    cameraY:number;
    cameraZ:number;

    /**
     * 初始化镜头
     */
    initCamera():void{

        let left    = this.width / - 50;
        let right   = this.width / 50;
        let top     = this.height / 50;
        let bottom  = this.height / - 50;
        let near    = - 500;
        let far     = 1000;

        console.log("left:"+left);
        console.log("right:"+right);
        console.log("top:"+top);
        console.log("bottom:"+bottom);
        console.log("near:"+near);
        console.log("far:"+far);

        this.camera =  new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 55);

        this.cameraX = this.camera.position.x;
        this.cameraY = this.camera.position.y;
        this.cameraZ = this.camera.position.z;
        this.getRandomEdgePoint();
    }

    preload(){
        console.log(zmxBin);
        console.log(ym27);
        console.log(ym28);
        console.log(dzPath);
        console.log(dzBin);
        console.log(fzPath);
        console.log(fzBin);
        console.log(bm29);
        console.log(bm30);

        console.log(alzPath);
        console.log(alzBin);
        console.log(alM27);
        console.log(alM28);
    }

    /** 创建磁感线 **/
    initMagentic(){
        /* 1.磁感线圆柱 */
        let line1 = new THREE.CylinderGeometry(0.2, 0.2 ,20 ,40 ,40);
        //圆柱材质
        let material = new THREE.MeshPhongMaterial( {
            color: 0x2BBCFF,
            //材质自发光颜色色
            side: THREE.DoubleSide,
            flatShading: true
        } );
        //圆柱
        let cube = new THREE.Mesh( line1, material );
        cube.rotateX(Math.PI/2);

        /* 2.磁感线本身 */
        //圆柱顶部×  "../sub_static/x.png"
        var xMap = THREE.ImageUtils.loadTexture(xPath as any,null);
        var geometry = new THREE.CircleGeometry( 0.5, 32 );
        //顶部x 材质·
        var material2 = new THREE.MeshPhongMaterial( {
            color: 0XFFFFFF,
            //材质自发光颜色色
           /* emissive: 0x072534,*/
            side: THREE.FrontSide,
            map:xMap,
            flatShading: true } );

        //圆圈1
        var circle = new THREE.Mesh( geometry, material2 );
        circle.position.z = 10;


        /* 3.磁感线圆点  */
        var pMap = THREE.ImageUtils.loadTexture(xPointPath as any,null);
        var pointGeometry = new THREE.CircleGeometry( 0.5, 32 );
        var pointMaterial = new THREE.MeshPhongMaterial( {
            color: 0XFFFFFF,
            side: THREE.BackSide,
            map:pMap,
            flatShading: true } );
        var point = new THREE.Mesh( pointGeometry , pointMaterial );
        point.position.z = -10.001 ;



        let row = 6;
        let col = 8;
        for(let i = 0; i < row; i++){
            let y = this.magneticBeginY - i*6;
            for(let j = 0; j < col;j++){
                let x = this.magneticBeginX + j*7;
                //创建磁感线
                let magentCube = cube.clone();
                let magentCircle = circle.clone();
                let magentPoint  = point.clone();

                magentCircle.position.x = x;
                magentCircle.position.y = y;
                magentCircle.visible = false;

                magentCube.position.x = x;
                magentCube.position.y = y;
                magentCube.visible = false;

                magentPoint.position.x = x;
                magentPoint.position.y = y;
                magentPoint.visible = false;

                this.magneticX.push(magentCircle);
                this.magneticLine.push(magentCube);
                this.magneticPoint.push(magentPoint);

                this.scene.add(magentCube);
                this.scene.add(magentCircle);
                this.scene.add(magentPoint);
            }
        }


    }

    /**
     * 加载模型
     * @returns {Promise<void>}
     */
    async initGltfLoader()  {

        //"../static/nucleus/yzh/zmx.gltf"
        let gltf:any = await this.gltfLoader(zmxPath as any);
        gltf.scene.traverse((child:any)=> {
             if(child instanceof Group){
                 this.nucleusModel = child;
                 this.nucleusModel.scale.set(0.3,0.3,0.3);
                 this.nucleusModel.visible = false;
                 this.scene.add(this.nucleusModel);
             }
         });

        //alpha 粒子
        let alpha:any = await this.gltfLoader(alzPath as any);
        alpha.scene.traverse((child:any)=> {
            if(child instanceof Group){
                this.alphaModel = child;
                this.alphaModel.scale.set(0.3,0.3,0.3);
                this.alphaModel.visible = false;
                this.scene.add(this.alphaModel);
            }
        });

        //电子
        let electronModel:any = await this.gltfLoader(dzPath as any);
        electronModel.scene.traverse((child:any)=> {
            if(child instanceof Mesh){
                this.electronModel = child;
                this.electronModel.scale.set(0.3,0.3,0.3);
                this.electronModel.visible = false;
                this.scene.add(this.electronModel);
            }
        });

        //反电子中微子
        let antineutrinoModel:any = await this.gltfLoader(fzPath as any);
        antineutrinoModel.scene.traverse((child:any)=> {
            if(child instanceof Mesh){
                this.antineutrinoModel = child;
                this.antineutrinoModel.scale.set(0.3,0.3,0.3);
                this.antineutrinoModel.visible = false;
                this.scene.add(this.antineutrinoModel);
            }
        });

        this.disableUnformMagneticAnimation();
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer():void{
        if(this.webglAvailable()){
            //背景透明
            this.renderer = new THREE.WebGLRenderer({ alpha:true,antialias: true});
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }

        //this.renderer = new THREE.WebGLRenderer({antialias:true});
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor("#FFFFFF" ,0.0);
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
        orbit.autoRotate = false;
        //设置相机距离原点的最远距离
        orbit.minDistance = 1;
        //设置相机距离原点的最远距离
        orbit.maxDistance = 4000;

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

    private render = ()=>{
        requestAnimationFrame( this.render );
        //显示磁感线
        if(this.uniformMagnetic == true){
            this.showMagnetic();
            if(this.camera.position.z == this.cameraZ){
                this.showMagneticX();
            }else{
                this.hideMagneticX();
            }
        }else{
            this.hideMagnetic();
            this.hideMagneticX();
        }

        //判断alpha粒子是否超出磁感线
        if(this.alphaModel && this.checkPostionOutMagnetic(this.alphaModel.position.x,this.alphaModel.position.y)){
            this.stopAlphaAnimation();
            this.alphaModel.visible = false;
            (window as any).viewHandler.viewModel.$data.isPlay = false;
        }


        //判断反电子中微子和电子是否超出磁感线
        let antineutrinoIsOut = this.antineutrinoModel && this.checkPostionOutMagnetic(this.antineutrinoModel.position.x,this.antineutrinoModel.position.y);
        let electronIsOut = this.electronModel && this.checkPostionOutMagnetic(this.electronModel.position.x,this.electronModel.position.y);

        if(antineutrinoIsOut){
            this.antineutrinoModel.visible = false;
        }
        if(electronIsOut){
            this.electronModel.visible = false;
        }

        if(antineutrinoIsOut && electronIsOut){
            console.log("超出界限")
            const edgePoints = this.getRandomEdgeSymmetricPoint();

            this.stopAntineutrinoAnimation(edgePoints[0]);
            this.stopElectronAnimation(edgePoints[1]);
            this.notifyBetaAnimationComplete();

        }


        this.renderer.render( this.scene, this.camera );
    }

    /**
     * 开启匀强磁场
     * 改变定义动画
     */
    enableUniformMagneticAnimation(){
        this.uniformMagnetic = true;
        this.setAlphaAnimation(!TweenMax.isTweening(this.alphaModel.position));

        const targetPoints = this.getRandomEdgeSymmetricPoint();
        this.setElectronAnimation(targetPoints[0],!TweenMax.isTweening(this.electronModel.position));

        this.setAntineutrinoAnimation(targetPoints[1],!TweenMax.isTweening(this.antineutrinoModel.position));
    }

    /**
     * 关闭匀强磁场
     * 改变定义动画
     */
    disableUnformMagneticAnimation(){
        this.uniformMagnetic = false;
        this.setAlphaAnimation(!TweenMax.isTweening(this.alphaModel.position));

        const targetPoints = this.getRandomEdgeSymmetricPoint();
        this.setElectronAnimation(targetPoints[0],!TweenMax.isTweening(this.electronModel.position));
        this.setAntineutrinoAnimation(targetPoints[1],!TweenMax.isTweening(this.antineutrinoModel.position));

    }


    /**
     * 判断摄像机位置是否平行与磁感线
     * @returns {boolean}
     */
    hitRange(){
        const range:number = 0.05;
        const xMax:number = this.cameraX + range;
        const xMin:number = this.cameraX - range;

        const yMax:number = this.cameraY + range;
        const yMin:number = this.cameraY - range;

        const zMax:number = this.cameraZ + range;
        const zMin:number = this.cameraZ - range;

        const xRange:boolean = this.camera.position.x >= xMin || this.camera.position.x <= xMax;
        const yRange:boolean = this.camera.position.y >= yMin || this.camera.position.y <= yMax;
        const zRange:boolean = this.camera.position.z >= zMin || this.camera.position.z <= zMax;


        return xRange&&yRange&&zRange;
    }

    //隐藏原子核模型
    hideNucleusModel(){
        this.nucleusModel.visible = false;
    }

    //显示原子核
    showNucleusModel(){

    }

    hideAlphaModel(){

        this.alphaModel.visible = false;
        //this.alphaModel.position.set(0,0,0);
    }


    /**
     * alpha 衰变动画
     * 1.初始化类时构造动画对象
     * 2.模型超出磁感线后停止动画，重新移动模型到中心点隐藏并重新创建动画对象
     * 3.磁场改变时，重新基于模型当前点构造动画对象
     */
    showAlphaAnimation(){
        console.log(this.alphaTweenAnimation.progress());
        this.alphaModel.visible = true;
        //判断动画已绑定，并且正在进行中或者已经结束
        if(this.alphaTweenAnimation && this.alphaTweenAnimation.progress() > 0 && this.alphaTweenAnimation.progress() <= 1){
            if(this.alphaTweenAnimation.progress()!=1 ){
                this.alphaTweenAnimation.resume();
            }else{
                this.alphaTweenAnimation.restart();
            }
            return;
        }

        this.alphaTweenAnimation.play();

    }

    //暂停alpha 衰变动画
    pauseAlphaAnimation(){
        if( this.alphaTweenAnimation.progress() != 1){
            this.alphaTweenAnimation.pause();
        }
    }

    //停止alpha 动画
    stopAlphaAnimation(){
        console.log("停止动画");

        this.alphaTweenAnimation.pause();
        this.alphaModel.position.x = 0;
        this.alphaModel.position.y = 0;
        this.setAlphaAnimation();
    }

    /**
     * 设置alpha粒子动画
     */
    setAlphaAnimation(isPaused?:boolean){
        if(this.uniformMagnetic == true){
            const trackPath = this.getCurrentModelTrackPath(this.alphaModel);
            this.alphaTweenAnimation = TweenMax.to( this.alphaModel.position, 4,
                {bezier:trackPath, ease:Power0.easeNone,repeat:-1,
                    onComplete: ()=>{
                        //this.alphaModel.visible = false;
                        (window as any).viewHandler.viewModel.$data.isPlay = false;
                        //this.hideAlphaModel();
                    },
                    paused:isPaused == null ? true:isPaused });
        }else{
            if( !this.alphaTweenAnimation || !this.alphaTweenAnimation.vars.bezier || this.alphaTweenAnimation.isActive() == false) {
                const edgePoint = this.getRandomEdgePoint();
                this.alphaTweenAnimation = TweenMax.to(this.alphaModel.position, 3, {
                    x: edgePoint[0],
                    y: edgePoint[1],
                    ease: Power0.easeNone,
                    onComplete: () => {
                        //this.alphaModel.visible = false;
                        (window as any).viewHandler.viewModel.$data.isPlay = false;
                        //this.hideAlphaModel();
                    },
                    paused: isPaused == null ? true : isPaused
                });
            }else if(this.alphaTweenAnimation && this.alphaTweenAnimation.progress() > 0 && this.alphaTweenAnimation.progress() < 1 && this.alphaTweenAnimation.vars.bezier){
                this.calcFinalPoint(this.alphaTweenAnimation,this.alphaModel);
                console.info("电子动画",this.electronTweenAnimation.vars)
            }
        }
    }

    /**
     * 设电子动画
     */
    setElectronAnimation(targetPoint:Array<number>,isPaused?:boolean){
        console.log("重新设置电子动画");
        if(this.uniformMagnetic == true){
            const trackPath = this.getCurrentModelTrackPath(this.electronModel);
            console.log("电子动画路径");
            console.log(trackPath);
            this.electronTweenAnimation = TweenMax.to( this.electronModel.position, 4,
                {bezier:trackPath, ease:Power0.easeNone,repeat:-1,
                    onComplete: ()=>{
                        console.log("电子动画结束");
                        //this.alphaModel.visible = false;
                        //(window as any).viewHandler.viewModel.$data.isPlay = false;
                        //this.hideAlphaModel();
                        this.notifyBetaAnimationComplete();
                    },
                    paused:isPaused == null ? true:isPaused });
        }else{
            const edgePoint = this.getRandomEdgePoint();
            if( !this.electronTweenAnimation || !this.electronTweenAnimation.vars.bezier){
                console.log("line: " );
                this.electronTweenAnimation = TweenMax.to(this.electronModel.position, 3, {
                    x: targetPoint[0],
                    y: targetPoint[1],
                    ease:Power0.easeNone,
                    onComplete: ()=>{
                        console.log("电子动画结束");
                        this.notifyBetaAnimationComplete();
                        //this.alphaModel.visible = false;
                        // (window as any).viewHandler.viewModel.$data.isPlay = false;
                        //this.hideAlphaModel();
                    },
                    paused:isPaused == null ? true:isPaused
                });
            }else
            if(this.electronTweenAnimation && this.electronTweenAnimation.progress() > 0 && this.electronTweenAnimation.progress() < 1 && this.electronTweenAnimation.vars.bezier){
              /*  let p1 =this.electronTweenAnimation.vars.bezier[0];

                //圆的上下点
                let topP = this.electronTweenAnimation.vars.bezier[1];
                let bottomP = this.electronTweenAnimation.vars.bezier[3];
                //中心点
                let center = {x:p1.x-this.radius,y:p1.y};
                //圆上的点
                let p2 = this.electronModel.position;
                let k2 = -1/((p2.y-center.y)/(p2.x-center.x)) ;
                console.info("k:",k2);
                let b = p2.y -(k2*p2.x);
                console.info("b:",b);
                let finalP = { x:0,y:0};
                if(p2.x >topP.x && p2.y < topP.y){
                    let x = (this.magneticBeginY - b )/k2;
                    finalP.x = x;
                    finalP.y = this.magneticBeginY ;
                    //相交于上方
                }else if(p2.x < bottomP.x && p2.y > bottomP.y){
                    //相交于下方
                    let x = (0-this.magneticBeginY - b )/k2;
                    finalP.x = x;
                    finalP.y = 0-this.magneticBeginY
                }
                console.log("aaaaa");
                console.info("圆心",center);
                console.info("圆上",topP);
                console.info("圆下",bottomP);
                console.info("运动点",p2);
                console.info("计算点",finalP);
                this.electronTweenAnimation = TweenMax.to(this.electronModel.position, 3, {
                    x: finalP.x,
                    y: finalP.y,
                    ease:Power0.easeNone,
                    onComplete: ()=>{
                        //this.notifyBetaAnimationComplete();
                    },
                });*/
                this.calcFinalPoint(this.electronTweenAnimation,this.electronModel);
                console.info("电子动画",this.electronTweenAnimation.vars)
            }

            /*this.electronTweenAnimation = TweenMax.to(this.electronModel.position, 3, {
                x: targetPoint[0],
                y: targetPoint[1],
                ease:Power0.easeNone,
                onComplete: ()=>{
                    console.log("电子动画结束");
                    this.notifyBetaAnimationComplete();
                    //this.alphaModel.visible = false;
                   // (window as any).viewHandler.viewModel.$data.isPlay = false;
                    //this.hideAlphaModel();
                },
                paused:isPaused == null ? true:isPaused
            });*/
        }
    }

    /**
     * 从匀强磁场切换到非匀强磁场时候运动点计算
     * @param tweenAnimation
     * @param model
     */
    calcFinalPoint(tweenAnimation:any,model:any){
        let p1 = tweenAnimation.vars.bezier[0];

        //圆的上下点
        let topP = tweenAnimation.vars.bezier[1];
        let bottomP = tweenAnimation.vars.bezier[3];
        //中心点
        let center = {x:p1.x-this.radius,y:p1.y};
        //圆上的点
        let p2 = model.position;
        let k2 = -1/((p2.y-center.y)/(p2.x-center.x)) ;
        console.info("k:",k2);
        let b = p2.y -(k2*p2.x);
        console.info("b:",b);
        let finalP = { x:0,y:0};
        if(p2.x >topP.x && p2.y < topP.y){
            let x = (this.magneticBeginY - b )/k2;
            finalP.x = x;
            finalP.y = this.magneticBeginY ;
            //相交于上方
        }else if(p2.x < bottomP.x && p2.y > bottomP.y){
            //相交于下方
            let x = (0-this.magneticBeginY - b )/k2;
            finalP.x = x;
            finalP.y = 0-this.magneticBeginY
        }
        console.info("圆心",center);
        console.info("圆上",topP);
        console.info("圆下",bottomP);
        console.info("运动点",p2);
        console.info("计算点",finalP);
        tweenAnimation = TweenMax.to(model.position, 3, {
            x: finalP.x,
            y: finalP.y,
            ease:Power0.easeNone,
            onComplete: ()=>{
                //this.notifyBetaAnimationComplete();
            },
        });
    }




    /**
     * 停止电子动画
     */
    stopElectronAnimation(targetPoint:Array<number>){

        this.electronTweenAnimation.pause();
        this.electronModel.position.x = 0;
        this.electronModel.position.y = 0;
        //TODO need reset animation
        this.setElectronAnimation(targetPoint);
    }
    /**
     * 设置反电子中微子动画
     */
    setAntineutrinoAnimation(targetPoint:Array<number>,isPaused?:boolean){
        this.antineutrinoTweenAnimation = TweenMax.to(this.antineutrinoModel.position, 3, {
            x: targetPoint[0],
            y: targetPoint[1],
            ease:Power0.easeNone,
            onComplete: ()=>{
                //this.antineutrinoModel.visible = false;
                //(window as any).viewHandler.viewModel.$data.isPlay = false;
                this.notifyBetaAnimationComplete();
                console.log("反电子中微子结束")
            },
            paused:isPaused == null ? true:isPaused
        });
    }

    /**
     * 停止反电子中微子动画
     */
    stopAntineutrinoAnimation(targetPoint:Array<number>){

        this.antineutrinoTweenAnimation.pause();
        this.antineutrinoModel.position.x = 0;
        this.antineutrinoModel.position.y = 0;
        //TODO need reset animation
        this.setAntineutrinoAnimation(targetPoint);
    }

    notifyBetaAnimationComplete(){
        if(this.antineutrinoTweenAnimation.isActive() == false && this.electronTweenAnimation.isActive() == false ){
            (window as any).viewHandler.viewModel.$data.isPlay = false;
        }
    }

    //beta 衰变动画
    showBetaAnimation(){

        //TODO 两个模型有可能仍然有一个在运动

        this.antineutrinoModel.visible = true;
        this.electronModel.visible = true;

        //反电子中微子动画是否结束
        let antineutrinoIsEnd = this.antineutrinoTweenAnimation && this.antineutrinoTweenAnimation.progress() == 1;
        //电子动画是否结束
        let electronIsEnd = this.electronTweenAnimation && this.electronTweenAnimation.progress() == 1;

        //反电子中微子动画是否正在运行
        let antineutrinoIsRunning = this.antineutrinoTweenAnimation && this.antineutrinoTweenAnimation.progress() > 0 && this.antineutrinoTweenAnimation.progress() < 1;
        //电子动画是否正在运行
        let electronIsRunning  = this.electronTweenAnimation && this.electronTweenAnimation.progress() > 0 && this.electronTweenAnimation.progress() < 1;

        if(antineutrinoIsEnd == true && electronIsEnd == true){
            this.antineutrinoTweenAnimation.restart();
            this.electronTweenAnimation.restart();
        }else if( antineutrinoIsRunning == true || electronIsRunning == true  ){
            this.antineutrinoTweenAnimation.resume();
            this.electronTweenAnimation.resume();
        }else{
            this.antineutrinoTweenAnimation.play();
            this.electronTweenAnimation.play();
        }


        //判断动画已绑定，并且正在进行中或者已经结束
        /*if(this.antineutrinoTweenAnimation && this.antineutrinoTweenAnimation.progress() > 0 && this.antineutrinoTweenAnimation.progress() <= 1 &&
            this.electronTweenAnimation && this.electronTweenAnimation.progress() > 0 && this.electronTweenAnimation.progress() <= 1){


            if(this.antineutrinoTweenAnimation.progress()!=1 ){
                this.antineutrinoTweenAnimation.resume();
            }else{
                this.antineutrinoTweenAnimation.restart();
            }
            return;
        }

        this.antineutrinoTweenAnimation.play();
        this.electronTweenAnimation.play();*/

        /*if(this.electronTweenAnimation && this.electronTweenAnimation.paused){
            this.electronTweenAnimation.resume();
            this.antineutrinoTweenAnimation.resume();
            return;
        }

        const edgePoints = this.getRandomEdgeSymmetricPoint();

        this.electronTweenAnimation = TweenMax.to(this.electronModel.position, 3, {
            x: edgePoints[0][0],
            y: edgePoints[0][1],
            ease:Power0.easeNone,
            onComplete: ()=>{
                this.electronModel.visible = false;
            }
        });

        this.setAntineutrinoAnimation(edgePoints[1]);*/
    }

    //暂停beta 动画
    pauseBetaAnimation(){

       if(this.antineutrinoTweenAnimation.isActive()){
            this.antineutrinoTweenAnimation.pause();
       }

       if(this.electronTweenAnimation.isActive()){
            this.electronTweenAnimation.pause();
       }


    }

    killAllAnimation(){
        TweenMax.killAll();
    }


    /**
     * 显示α衰变
     */
    showAlphaModel(){
        this.nucleusModel.visible = true;
        this.alphaModel.visible = true;

        this.electronModel.visible = false;
        this.antineutrinoModel.visible = false;
    }

    /**
     * 显示β衰变
     */
    showBetaModel(){
        this.nucleusModel.visible = true;
        this.electronModel.visible = true;
        this.antineutrinoModel.visible = true;


        this.alphaModel.visible = false;
    }

    /**
     * 显示磁感线
     */
    private showMagnetic():void{
        for(let i=0; i<this.magneticLine.length; i++){
            (this.magneticLine[i] as THREE.Object3D).visible = true;
        }
    }

    /**
     * 隐藏磁感线
     */
    private hideMagnetic():void{
        for(let i=0; i<this.magneticLine.length; i++){
            (this.magneticLine[i] as THREE.Object3D).visible = false;
        }
    }


    //显示磁感线底部x
    private showMagneticX():void{
        for(let i=0; i<this.magneticX.length; i++){
            (this.magneticX[i] as THREE.Object3D).visible = true;
        }
    }


    private hideMagneticX():void{
        for(let i=0; i<this.magneticX.length; i++){
            (this.magneticX[i] as THREE.Object3D).visible = false;
        }
    }

    //随机获取边缘的点
    private getRandomEdgePoint(){
        //随机点
        const xRandom:number = CommonUtil.getRandomInt(this.magneticBeginX,0-this.magneticBeginX);
        const yRandom:number = CommonUtil.getRandomInt(this.magneticBeginY,0-this.magneticBeginY);

        let x:number;
        let y:number;

        //边缘顶点
        const xVertex = [0-this.magneticBeginX,this.magneticBeginX];
        const yVertex = [0-this.magneticBeginY,this.magneticBeginY];

        let i = CommonUtil.getRandomInt(1,4);
        if( i == 1 || i == 2){
            x = xVertex[i-1];
            y = yRandom;
        }else{
            y = yVertex[i-3];
            x = xRandom;
        }
        return [x,y];
    }

    //随机获取边缘的两个相对中心的对称点
    private getRandomEdgeSymmetricPoint(){
        const p1 = this.getRandomEdgePoint();
        const p2 = [0-p1[0],0-p1[1]];
        return [p1,p2];
    }

    //计算当前object3D生成的圆形轨迹
    private getCurrentModelTrackPath(objModel:Object3D):Array<any>{
        const x = objModel.position.x;
        const y = objModel.position.y;

        let p1 = {x:this.radius,y:this.radius};
        let p2 = {x:0,y:2*this.radius};
        let p3 = {x:-this.radius,y:this.radius};
        let p4 = {x:x,y:y};

        if(x >= 0 && y > 0){
            //第一象限  起始点p4是圆的最左边点
            p1 = {x:x+this.radius,y:y-this.radius};
            p2 = {x:p1.x+this.radius,y:p1.y+this.radius};
            p3 = {x:p2.x-this.radius,y:p2.y+this.radius};

        }else if(x <= 0 && y > 0){
            //第二象限 起始点p4是圆的最右边点
            p1 = {x:x-this.radius,y:y+this.radius};
            p2 = {x:p1.x-this.radius,y:p1.y-this.radius};
            p3 = {x:p2.x+this.radius,y:p2.y-this.radius};

        }else if(x <= 0 && y < 0){
            //第三象限 起始点p4是圆的最右边点
            p1 = {x:x-this.radius,y:y+this.radius};
            p2 = {x:p1.x-this.radius,y:p1.y-this.radius};
            p3 = {x:p2.x+this.radius,y:p2.y-this.radius};

        }else if(x >= 0 && y < 0){
            //第四象限  起始点p4是圆的最左边点
            p1 = {x:x+this.radius,y:y-this.radius};
            p2 = {x:p1.x+this.radius,y:p1.y+this.radius};
            p3 = {x:p2.x-this.radius,y:p2.y+this.radius};

        }
        return [p1,p2,p3,p4];

    }

    //判断坐标是否超出磁感线
    private checkPostionOutMagnetic(x:number,y:number){
        if(x <= this.magneticBeginX || x >= 0-this.magneticBeginX || y >= this.magneticBeginY || y <= 0-this.magneticBeginY){
            return true;
        }
        return false;

    }

}
