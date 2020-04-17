/**
 *宏观类
 *@since 2.0
 *@author zhiguo
 *@Date 18-10-27 上午9:41
 *
 */

import * as THREE from 'three';
import {Camera, Geometry, Group, Object3D, Scene, TrackballControls, Vector2, Vector3, WebGLRenderer} from 'three';
import * as earthAtmos from '../sub_static/earth_atmos_4096.jpg';
import * as earthClouds from '../sub_static/earth_clouds_2048.png';
import * as earthLights from '../sub_static/earth_lights_2048.png';
import * as earthSpecular from '../sub_static/earth_specular_2048.jpg';

import * as darkSNx from '../sub_static/dark-s_nx.jpg';
import * as darkSNy from '../sub_static/dark-s_ny.jpg';
import * as darkSNz from '../sub_static/dark-s_nz.jpg';
import * as darkSPx from '../sub_static/dark-s_px.jpg';
import * as darkSPy from '../sub_static/dark-s_py.jpg';
import * as darkSPz from '../sub_static/dark-s_pz.jpg';
import * as model1 from '../sub_static/1.fbx';
import * as model2 from '../sub_static/2.fbx';
import * as model3 from '../sub_static/3.fbx';
import * as modelImg1 from '../sub_static/N.jpg';
import * as modelImg2 from '../sub_static/C.jpg';
import * as whitePng from '../sub_static/white.png';

import EffectComposer, {RenderPass, ShaderPass} from 'three-effectcomposer-es6';
import {Glow} from './Glow';
import TWEEN from '@tweenjs/tween.js';
import {Earth} from './prefabs/Earth';
import {Cloud} from './prefabs/Cloud';
import {Light} from './prefabs/Light';
import {Background} from './prefabs/Background';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {Model3dAnimation} from '../../../../../src/three/component/Model3dAnimation';
import {ElectronAnimation} from './ElectronAnimation';
import {AuroraViewHandler} from './AuroraViewHandler';

const OrbitControls = require('three-orbitcontrols');
const TrackballControls = require('three-trackballcontrols');
const Curves = require('../../../../../src/three/component/Curves.js');
const QuickHull = require('../../../../../src/three/component/QuickHull.js');
const ConvexGeometry = require('../../../../../src/three/component/ConvexGeometry.js');



export class MacroModel extends ThreeBase {

    scene: Scene;
    camera: Camera;
    width: number;
    height: number;
    domElement: Element;
    renderer: WebGLRenderer;

    earthGroup: THREE.Group;
    hasGlow = false;
    autoRotate = true;
    rotationSpeed = 0.001;
    cloudSpeed = -0.0003;


    parentGroup: Group;

    blurScene: Scene;
    glowGroup: THREE.Group;
    blurComposer: EffectComposer;
    sceneComposer: EffectComposer;
    controls: TrackballControls;

    tween: TWEEN.Tween;

    earth: THREE.Mesh;
    cloud1: THREE.Mesh;
    cloud2: THREE.Mesh;
    spotLight: THREE.SpotLight;

    step = 0;


    params = {
        scale: 2,
        extrusionSegments: 300,
        radiusSegments: 12,
        closed: false,
        animationView: false,
        lookAhead: false,
        cameraHelper: false,
    };

    parent: any;
    tubeGeometry: any;
    mesh: any;

    modelAnimation1: any;
    modelAnimation2: any;
    modelAnimation3: any;

    totalCount = 0;

    g1: Group;
    g3: Group;
    g5: Group;

    constructor(scene: Scene, camera: Camera , width: number, height: number, domElement: Element, renderer: WebGLRenderer) {
        super();
        const preload = [ earthAtmos, earthClouds, earthLights, earthSpecular, darkSNx, darkSNy, darkSNz, darkSPx, darkSPy,
            darkSPz, model1, model2, model3, modelImg1, modelImg2, whitePng];
        console.log('load images : ' + preload.length);
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.camera = camera;
        this.domElement = domElement;
        this.renderer = renderer;
        this.init();
        //this.createEarth();
        //setTimeout(_ => {this.createAnimation()}, 800)
    }

    init() {

     /*   AxisUtil.createAxis(new AxisOption())*/

        this.parentGroup = new Group();
        this.controls = new TrackballControls(this.camera, this.renderer.domElement);

        /*
        this.controls.rotateSpeed = 0.3;
        this.controls.noRotate = false;
        this.controls.staticMoving = true;
        this.controls.noZoom = true;
        this.controls.noPan = true;
        this.controls.enabled = true;
*/

        this.controls.rotateSpeed = 1;
        this.controls.autoRotate = false;
        this.controls.noZoom = true;
        this.controls.noPan = true;
        this.controls.noRotate = true;
        this.controls.enabled = true;
        //this.controls.staticMoving = true;


        //this.scene.add(Background.createBg());
        //this.scene.background = new THREE.Color(0x2B3279);
        const earthObj = new Earth();

        this.earthGroup = new THREE.Group();

        this.parentGroup.add(this.earthGroup);

        this.scene.add(this.parentGroup);

        this.earth = earthObj.createEarth();
        this.cloud1 = Cloud.createCloud(25.3, 'cloud1');
        this.cloud2 = Cloud.createCloud(25.6, 'cloud2');
        this.cloud2.rotation.y = Math.PI;

        this.earthGroup.add(this.earth);
        this.earthGroup.add(this.cloud1);
        this.earthGroup.add(this.cloud2);



        this.parentGroup.add(Light.createAmbient());
        //this.parentGroup.add();

        this.spotLight = Light.createSpot();

        this.camera.add(Light.createDirectional());
        this.parentGroup.add(this.camera);

        this.createOutGlow();


        this.createEarthMF();

        this.createLineM();
        //
        //this.addModel();
    }

    createLineM() {
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( 0, 50, 0) );
        geometry.vertices.push(new THREE.Vector3( 0, 0, 0) );
        geometry.vertices.push(new THREE.Vector3( 0, -50, 0) );


        const arrow0 = this.createArrow(3, 15, 0x00E3E3, 0.5, 0.1);
        const arrow1 = this.createArrow(3, 15, 0x00E3E3, 0.5, 0.1);

        arrow0.position.set(0, 40, 0);

        arrow0.rotation.z += Math.PI ;

        arrow1.position.set(0, -40, 0);
        arrow1.rotation.z += Math.PI ;

        const material = new THREE.LineBasicMaterial( { color : 0x5CAEFD} );
        const lineM = new THREE.Line( geometry, material );
        lineM.add(arrow0);
        lineM.add(arrow1);
        this.parentGroup.add(lineM);
    }

    render() {
        this.controls.update();
        /*this.blurComposer.render();
        this.sceneComposer.render();*/
        if (this.modelAnimation1) {
            this.modelAnimation1.renderModel();
        }
        if (this.modelAnimation2) {
            this.modelAnimation2.renderModel();
        }
        if (this.modelAnimation3) {
            this.modelAnimation3.renderModel();
        }

        this.cloud1.rotation.y -= 0.002 / 4;
        this.cloud2.rotation.y -= 0.001 / 4;
    }

    async addModel(group: Group ) {
        const model5: any = await this.fbxLoader(model1 as any);
        console.log(model5)
        model5.position.x += 7;
        model5.position.y += 17.5;
        model5.name = 'ball';
        model5.visible = false;
       // model5.scale.set(0.8 , 0.8 , 0.8 );
        group.add(model5);



        //modelAnimation.playModelAnimation();

        const model6: any = await this.fbxLoader(model2 as any);
        model6.position.x += 7;
        model6.position.y += 17.5;
        model6.name = 'line';
        // model6.scale.set(0.8 , 0.8 , 0.8 );
        group.add(model6);

        //(model6.children[0].geometry as any).setDrawRange( 0, this.totalCount / 2);

        return this.createAnimation(model5, model6);

        /*const model7: any = await this.fbxLoader(model3 as any);
        group.add(model7);
        model7.position.x += 7;
        model7.position.y += 17.5;*/
    }

    createAnimation(ball: any, line: any) {
        let limit = 0.19;
        this.totalCount =  (line.children[0].geometry as any).attributes.position.count;
        const modelAnimation = new Model3dAnimation(ball, (perfect: number) => {


            if ( perfect > 0.14 && perfect < 0.15) {

                setTimeout(() => {
                    modelAnimation.pauseModelAnimation();
                }, 200);

                //显示微观
                (window as any).viewHandler.viewModel.$data.isActive1 = false;
                /*(window as any).viewHandler.auroraScenes.microModel.showScene();
                this.hideScene();*/
            }
            modelAnimation.setAnimationDoubleSpeed(1  - perfect);
            let currentCount = perfect > limit  ? this.totalCount * (perfect - limit  ) : 0;

            if (perfect > 0.62) {
                limit -= 0.00025;
                currentCount = this.totalCount * (perfect -  limit + 0.01 );
                modelAnimation.setAnimationDoubleSpeed(0.15);
            }
            (line.children[0].geometry as any).setDrawRange( 0, currentCount);

        });
        modelAnimation.setLoopOne();
        modelAnimation.setAnimationDoubleSpeed(0.9);
        return modelAnimation;
    }


    play() {

        this.modelAnimation1.resetModel();
        this.modelAnimation2.resetModel();
        this.modelAnimation3.resetModel();

        this.modelAnimation1.fbx.visible = true;
        this.modelAnimation2.fbx.visible = true;
        this.modelAnimation3.fbx.visible = true;

        this.modelAnimation1.setAnimationDoubleSpeed(0.9);
        this.modelAnimation2.setAnimationDoubleSpeed(0.9);
        this.modelAnimation3.setAnimationDoubleSpeed(0.9);

        this.modelAnimation1.playModelAnimation();
        this.modelAnimation2.playModelAnimation();
        this.modelAnimation3.playModelAnimation();
    }

    resume() {
        this.modelAnimation1.playModelAnimation();
        this.modelAnimation2.playModelAnimation();
        this.modelAnimation3.playModelAnimation();
    }

    createOutGlow () {
        this.blurScene = new THREE.Scene();
        this.glowGroup = Glow.createOuterGlow();
        this.blurScene.add(this.glowGroup);

        const blurRenderTarget = new THREE.WebGLRenderTarget(this.width, this.height, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            stencilBuffer: true
        });

        const blurRenderPass = new RenderPass(this.blurScene, this.camera);
        const sceneRenderPass = new RenderPass(this.scene, this.camera);

        this.blurComposer = new EffectComposer(this.renderer, blurRenderTarget);
        this.blurComposer.addPass(blurRenderPass);
        this.sceneComposer = new EffectComposer(this.renderer, blurRenderTarget);
        this.sceneComposer.addPass(sceneRenderPass);

        const effectBlend = new ShaderPass(Glow.AdditiveBlendShader, 'tSampler1');
        effectBlend.uniforms['tSampler2'].value = this.blurComposer.renderTarget2.texture;
        effectBlend.renderToScreen = true;

        this.sceneComposer.addPass(effectBlend);
        this.hasGlow = true;
    }



    hideScene() {
        this.parentGroup.visible = false;
    }

    showScene() {
        console.log('show Macro');
        this.parentGroup.visible = true;
        ((window as any).viewHandler as AuroraViewHandler).viewModel.showPlay = true;
    }

    reset() {
        this.parentGroup.visible = true;
        this.controls.noRotate = true;

        console.log('----reset----');
        this.modelAnimation1.resetModelAnimation();
        this.modelAnimation2.resetModelAnimation();
        this.modelAnimation3.resetModelAnimation();

        console.log('----visible----');
        this.modelAnimation1.fbx.visible = false;
        this.modelAnimation2.fbx.visible = false;
        this.modelAnimation3.fbx.visible = false;

        console.log('----speeed----');
        this.modelAnimation1.setAnimationDoubleSpeed(0.9);
        this.modelAnimation2.setAnimationDoubleSpeed(0.9);
        this.modelAnimation3.setAnimationDoubleSpeed(0.9);

        console.log('----drawRange----');
        this.modelAnimation1 = this.createAnimation(this.g1.getObjectByName('ball'), this.g1.getObjectByName('line') );
        this.modelAnimation2 = this.createAnimation(this.g3.getObjectByName('ball'), this.g3.getObjectByName('line') );
        this.modelAnimation3 = this.createAnimation(this.g5.getObjectByName('ball'), this.g5.getObjectByName('line') );

        (this.g1.getObjectByName('line').children[0].geometry as any).setDrawRange( 0, 0);
        (this.g3.getObjectByName('line').children[0].geometry as any).setDrawRange( 0, 0);
        (this.g5.getObjectByName('line').children[0].geometry as any).setDrawRange( 0, 0);

        this.controls.reset();
        //this.controls.object.position.set( 0, 0, 100 );
        //this.controls.object.rotation.set( 0, 0, 0 );
    }



    createLine() {


        this.parent = new THREE.Object3D();
        this.parentGroup.add( this.parent );


        if ( this.mesh !== undefined ) {
            this.parent.remove( this.mesh );
            this.mesh.geometry.dispose();
        }
        const extrudePath = new THREE.Curves.HelixCurve();
        this.tubeGeometry = new THREE.TubeBufferGeometry( extrudePath, this.params.extrusionSegments, 2,
            this.params.radiusSegments, this.params.closed );

        this.addGeometry( this.tubeGeometry );
        const scale = 0.2;
        this.mesh.position.x = -55;
        this.mesh.position.y = 20;
        this.mesh.rotation.x += Math.PI / 2;
        this.mesh.rotation.y += Math.PI / 13;
        this.mesh.scale.set( scale, scale, scale );
        //this.setScale();

    }

    async createEarthMF() {
        const group = new Object3D();
        this.parentGroup.add(group);

        const mf0 = this.createMF(2, 0, 45, 41, Math.PI / 2 , 3 / 2 * Math.PI, false, 35);
        const mf1 = this.createMF(0, 0, 40, 35, 0, 2 * Math.PI, false, 30);
        const mf2 = this.createMF(0, 0, 35, 32, 0, 2 * Math.PI, false, 25);
        const mf3 = this.createMF(0, 0, 30, 29, 0, 2 * Math.PI, false, 20);
        const mf4 = this.createMF(0, 0, 25, 26, 0, 2 * Math.PI, false, 15);

        const arrow0 = this.createArrow(3, 15, 0x00E3E3, 0.5, 0.1);
        const arrow1 = this.createArrow(3, 15, 0x00E3E3, 0.5, 0.1);
        const arrow2 = this.createArrow(3, 15, 0x00E3E3, 0.5, 0.1);
        const arrow3 = this.createArrow(3, 15, 0x00E3E3, 0.5, 0.1);
        const arrow4 = this.createArrow(3, 15, 0x00E3E3, 0.5, 0.1);
        const arrow5 = this.createArrow(3, 15, 0x00E3E3, 0.5, 0.1);

        arrow0.position.set(5, 0, 0);
        arrow1.position.set(20, 0, 0);
        arrow2.position.set(35, 0, 0);
        arrow3.position.set(50, 0, 0);
        arrow4.position.set(6, 38, 0);
        arrow4.rotation.z += Math.PI *  ( 105  / 180);

        arrow5.position.set(6, -38, 0);
        arrow5.rotation.z -= Math.PI *  ( 110  / 180);
        //arrow4.rotation.x += Math.PI / 4 ;


        mf0.add(arrow0);
        mf1.add(arrow1);
        mf2.add(arrow2);
        mf3.add(arrow3);
        mf4.add(arrow4);
        mf4.add(arrow5);


        group.add(mf0);
        group.add(mf1);
        group.add(mf2);
        group.add(mf3);
        group.add(mf4);

        this.g1 = group;
        //console.log(group);
       // this.scene.add(mf1);


        const points = this.getTopPoint((mf1.geometry as Geometry).vertices as any);
        for (let i = 0 ; i < points.length; i++) {
            const k = this.getPointK(points[i], group, 30);
        }

        //this.createScrew(points);


        const g1 = group.clone();
        const g2 = group.clone();
        this.g3 = group.clone();
        const g4 = group.clone();
        this.g5 = group.clone();
        const g6 = group.clone();
        const g7 = group.clone();

      /*  const g8 = group.clone();
        const g9 = group.clone();

        const g10 = group.clone();
        const g11 = group.clone();

        const g12 = group.clone();
        const g13 = group.clone();

        const g14 = group.clone();
        const g15 = group.clone();

        const g16 = group.clone();
        const g17 = group.clone();

        const g18 = group.clone();
        const g19 = group.clone();

        const g20 = group.clone();
        const g21 = group.clone();

        const g22 = group.clone();
        const g23 = group.clone();*/

        g1.rotation.y = Math.PI *  3 / 4 ;
        g2.rotation.y = Math.PI / 2 ;
        this.g3.rotation.y = Math.PI / 4 ;

        g4.rotation.y = Math.PI ;

        g7.rotation.y = Math.PI * 5 / 4 ;
        g6.rotation.y = Math.PI * 3 / 2 ;
        this.g5.rotation.y = Math.PI * 7 / 4;

        /*g8.rotation.y = Math.PI * ( 15 / 180);
        g9.rotation.y = Math.PI * ( 30 / 180);*/

       /* g10.rotation.y = Math.PI * ( 60 / 180);
        g11.rotation.y = Math.PI * ( 75 / 180);

        g12.rotation.y = Math.PI * ( 105 / 180);
        g13.rotation.y = Math.PI * ( 120 / 180);

        g14.rotation.y = Math.PI * ( 150 / 180);
        g15.rotation.y = Math.PI * ( 165 / 180);

        g16.rotation.y = Math.PI * ( (180 + 15) / 180);
        g17.rotation.y = Math.PI * ( (180 + 30) / 180);

        g18.rotation.y = Math.PI * ( (180 + 60) / 180);
        g19.rotation.y = Math.PI * ( (180 + 75) / 180);


        g20.rotation.y = Math.PI * ( (105 + 180 ) / 180);
        g21.rotation.y = Math.PI * ( (120 + 180 ) / 180);

        g22.rotation.y = Math.PI * ( (150 + 180 ) / 180);
        g23.rotation.y = Math.PI * ( (165 + 180 ) / 180);*/

        this.parentGroup.add(g1);
        this.parentGroup.add(g2);
        this.parentGroup.add(this.g3);
        this.parentGroup.add(g4);
        this.parentGroup.add(this.g5);
        this.parentGroup.add(g6);
        this.parentGroup.add(g7);

        /*this.parentGroup.add(g8);
        this.parentGroup.add(g9);

        this.parentGroup.add(g10);
        this.parentGroup.add(g11);
        this.parentGroup.add(g12);
        this.parentGroup.add(g13);

        this.parentGroup.add(g14);
        this.parentGroup.add(g15);

        this.parentGroup.add(g16);
        this.parentGroup.add(g17);

        this.parentGroup.add(g18);
        this.parentGroup.add(g19);

        this.parentGroup.add(g20);
        this.parentGroup.add(g21);
        this.parentGroup.add(g22);
        this.parentGroup.add(g23);*/

        this.modelAnimation1 = await this.addModel(this.g1);
        this.modelAnimation2 = await this.addModel(this.g3);
        this.modelAnimation3 = await this.addModel(this.g5);

        /**/
        //console.log(group, g3, g5);

        /*const electronAnimation = new ElectronAnimation(group, g3, g5);*/
        (window as any).electron = this;
    }


    getPointK(pointK: any, group: any, radius = 0.5) {
        const k = pointK.y / pointK.x;
        const x0 = pointK.x - radius;
        const y0 = k * x0;

        //line1
        const geometry = new THREE.PlaneGeometry( 1, 1, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        const plane = new THREE.Mesh( geometry, material );

        plane.position.set(pointK.x, pointK.y, 0);
        plane.position.x += 30;

        const x1 = pointK.x + radius;
        const y1 = k * x1;
    }

    /** 获取弧上的点 **/
    getTopPoint(topPoints: any) {
        const points = [];
        for ( let i = 0 ; i < topPoints.length; i++ ) {
            if ( topPoints[i].x > 0 && topPoints[i].y > 0  ) {
                points.push(topPoints[i]);
            }
        }
        return points;
    }

    createMF(aX: number, aY: number, xR: number, yR: number, startAngle: number, endAngle: number, clockWise: boolean, x: number) {
        /*椭圆*/
        const curve = new THREE.EllipseCurve(
            aX,  aY,            // ax, aY
            xR, yR,           // xRadius, yRadius
            startAngle,  endAngle,  // aStartAngle, aEndAngle
            clockWise,            // aClockwise
            0                 // aRotation
        );
        const points = curve.getPoints( 361 );

        const geometry = new THREE.Geometry().setFromPoints( points );
        const material = new THREE.LineBasicMaterial( { color : 0x5CAEFD, linewidth: 2 } );
        const ellipse = new THREE.Line( geometry, material );
        //25
        ellipse.position.x = x;
        //ellipse.rotation.y += Math.PI / 4 ;

        //this.scene.add(ellipse);
        return ellipse;
    }


    addGeometry( geometry: any ) {
        const material = new THREE.MeshLambertMaterial( { color: 0x04D8E4 } );
        const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.3, wireframe: true, transparent: true } );
        // 3D shape
        this.mesh = new THREE.Mesh( geometry, material );
        const wireframe = new THREE.Mesh( geometry, wireframeMaterial );
        //this.mesh.add( wireframe );
        this.parent.add( this.mesh );



        const numPoints = 100;
   /*     const start = new THREE.Vector3(0, 25, -25);
        const middle = new THREE.Vector3(-50, 0, -25);
        const end = new THREE.Vector3(0, -25, -25);

        const curveQuad = new THREE.QuadraticBezierCurve3(start, middle, end);*/



        const curve = new THREE.CubicBezierCurve3(
            new THREE.Vector3( 0, 25, 0 ),
            new THREE.Vector3( -30, 30, 0 ),
            new THREE.Vector3( -30, -30, 0 ),
            new THREE.Vector3( 0, -25, 0)
        );

        const tube = new THREE.TubeGeometry(curve, numPoints, 0.5, 20, false);
        const mesh = new THREE.Mesh(tube, new THREE.MeshNormalMaterial({
            opacity: 0.9,
            transparent: true
        }));
        mesh.position.setX(50);
        this.parentGroup.add(mesh);



      /*  const points = curve2.getPoints( 50 );
        const geometry2 = new THREE.BufferGeometry().setFromPoints( points );

        const material2 = new THREE.LineBasicMaterial( { color : 0xff0000 } );

        const ellipse = new THREE.Line( geometry2, material2 );
        ellipse.position.x = 27;
        this.scene.add(ellipse);
*/

        //画圆柱
       /* const v3Points = this.transformV2toV3(points);
        console.log(v3Points);

        const curve3 = new THREE.CatmullRomCurve3( v3Points);
        const tube = new THREE.TubeGeometry(curve3, numPoints, 0.2, 50, false);
        const mesh = new THREE.Mesh(tube, new THREE.MeshNormalMaterial({
            opacity: 0.9,
            transparent: true
        }));
        mesh.position.x = 27;
        this.scene.add(mesh);*/

        /*const dirLight = new THREE.DirectionalLight( '#ffffff', 0.05);
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( -100, 200, 1 );
        dirLight.position.multiplyScalar( 30 );
        this.scene.add( dirLight );
*/

        /*const sphereSize = 10;
        const pointLightHelper0 = new THREE.PointLightHelper( dirLight, sphereSize );
        this.scene.add( pointLightHelper0 );*/

        //this.createScrew();
    }

    transformV2toV3(v2: any, z = 0) {
        const v3 = [];
        for (let i = 0 ; i < v2.length; i ++) {
            const vector2 = v2[i] as Vector2;
            const vector3 = new Vector3(vector2.x, vector2.y, z);
            v3.push(vector3);
        }
        return v3;

    }


    /**
     * 创建螺旋形
     */
    createScrew(points: any) {
        const group = new THREE.Object3D();
        const colours = [
            0x0000ff,
            0xaa00aa,
            0x00ff00
        ];


        const material3 = new THREE.LineBasicMaterial({
            color: colours[2],
            linewidth: 3,
            fog: true
        });

        const material2 = new THREE.LineBasicMaterial({
            color: colours[0],
            linewidth: 3,
            fog: true
        });

        const geometry3 = new THREE.Geometry();
        const geometry2 = new THREE.Geometry();

        const line2 = new THREE.Line(geometry2, material2);
        const line3 = new THREE.Line(geometry3, material3);

        geometry3.vertices = [];
        geometry2.vertices = [];

        const sp1 = this.createSpiral(15, 10, (index: any, segments: any) => {
            //螺旋线中心点半径 40 - 35
            let diameter = 40;
            const perfect = index / segments;
            //diameter = 80 - ( 1 - perfect) * 60;

            let angle = ((Math.PI ) / segments) * index;
            //let angle = this.getAngle(perfect);
            angle += this.step * 0.01;
            const x = Math.sin(angle) * diameter;
            const y = Math.cos(angle) * diameter;
            return new THREE.Vector3(x, y, 0);
        });

        const sp0 = (index: any, segments: any) => {
            const perfect = index / segments;
            const i = Math.floor( points.length * perfect);
            return points[i];
        };

        const sp2 = this.createSpiral(25, 50, sp0);


        for (let i = 0; i < 150; i++) {
            geometry3.vertices.push(sp1(i, 300));
        }


        geometry3.verticesNeedUpdate = true;
        line3.scale.set(0.5, 0.5, 0.5);

        group.add(line3);
        group.position.x = 30 + 40 - 20;
        this.scene.add(group);

        this.createCir(points);
    }


    createCir(points: any) {
        const numPoints = 30;
        const v3Points = this.transformV2toV3(points);
        //console.log(v3Points);

        const curve3 = new THREE.CatmullRomCurve3( v3Points);
        const tube = new THREE.TubeGeometry(curve3, numPoints, 3, 10, false);
        const mesh = new THREE.Mesh(tube, new THREE.MeshNormalMaterial({
            opacity: 0.9,
            transparent: true
        }));
        mesh.position.x = 30;
        //console.log(tube.vertices);
        this.scene.add(mesh);

    }

    getAngle(perfect: number) {
        if ( perfect <= 0.5) {
          //-90 = 0
            return Math.PI * perfect;
        } else {
          //0 = 90
            return Math.PI * perfect - Math.PI;

        }
    }


    createSpiral = (diameter: any, density: any, guideSpiral: any) => {
        return (index: any, segments: any) => {
            let normal;
            let a;
            let b;
            let c;
            if (guideSpiral) {
                //console.info('seg', segments);
                a = guideSpiral(index + 4, segments);
                b = guideSpiral(index + 2, segments);
                c = guideSpiral(index, segments);
                normal = new THREE.Vector3().lerpVectors(a, c, 0.5).sub(b).normalize();
            } else {
                const scale = 0.1;
                const initial = index * scale;
                a = new THREE.Vector3(0, 0, initial + scale * 2);
                b = new THREE.Vector3(0, 0, initial + scale);
                c = new THREE.Vector3(0, 0, initial);
                normal = new THREE.Vector3(1, 0, 0);
            }
            const axis = new THREE.Vector3().subVectors(c, a).normalize();
            normal.applyAxisAngle(
                axis, (
                (index * (
                    (Math.PI * 2) / segments)) * density
            ) - (this.step * (1 / diameter * density * 0.02))
            );
            normal.multiplyScalar(diameter).add(b);
            return normal;
        };
    }


    createArrow(coneLength: number, cylinderLength: number, color?: any, coneRadius?: number, cylinderRadius?: number) {
        coneRadius = !coneRadius ?  2 : coneRadius;
        cylinderRadius = !cylinderRadius ?  1 : cylinderRadius;
        color = !color ?  0x000000 : color;

        const geometry = new THREE.ConeBufferGeometry( coneRadius, coneLength, 32 );
        const material = new THREE.MeshBasicMaterial( {color: color} );
        const cone = new THREE.Mesh( geometry, material );




        return cone;
    }

}
