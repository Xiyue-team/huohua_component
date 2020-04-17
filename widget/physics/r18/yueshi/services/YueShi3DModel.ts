/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera, WebGLRenderer } from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
const TrackballControls = require('three-trackballcontrols');
const dragcontrols = require('three-dragcontrols').default;
OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';

import * as image01 from '../sub_static/model/sun.jpg';
import * as image02 from '../sub_static/model/earth.jpg';
import * as image03 from '../sub_static/model/moon.jpg';
import * as image04 from '../sub_static/model/sun2.png';
import * as image05 from '../sub_static/sunguangyun.png';
import * as sunModel from '../sub_static/model/sun.fbx';
import * as earthModel from '../sub_static/model/earth.fbx';
import * as moonModel from '../sub_static/model/moon.fbx';
import * as starrySky from '../sub_static/starrySky.jpg';

import { YueShiHelper } from './YueShiHelper';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';


const Lensflare = require('../../../../../src/libs/three/Lensflare');
Lensflare(THREE);

export class YueShi3DModel extends ThreeBase {
    browserInfo: BrowserInfo;

    private controls: any;

    private riShiHelper: YueShiHelper;

    // 上投影区域切线
    private equationLine: any;
    private equationLine2: any;

    // 下投影区域切线
    private equationLine3: any;
    private equationLine4: any;

    // 投影区域上
    private triangle1 = new THREE.Object3D();

    // 投影区域下
    private triangle2 = new THREE.Object3D();

    // 月球
    private moon: any;

    // 月球阴影
    private moonShadow: any;

    // 地球
    private earth: any;

    private camera2: any;

    renderTime = 28;

    insetWidth = window.innerWidth / 4;
    insetHeight = window.innerHeight / 4;

    static preload() {
        const modelArray = [image01, image02, image03, sunModel, earthModel, moonModel, starrySky, image04];
        console.log(modelArray.length);
    }

    private render = () => {
      this.controls.update();
      setTimeout(this.render, 72);

      (this.renderer as WebGLRenderer).setClearColor( '#fff', 0.5 );
      (this.renderer as WebGLRenderer).setViewport( 0, 0, this.width, this.height );
      this.renderer.render( this.scene, this.camera );

      (this.renderer as WebGLRenderer).setClearColor( '#fff', 1 );
      (this.renderer as WebGLRenderer).clearDepth();
      (this.renderer as WebGLRenderer).setScissorTest( true );
      if ((window as any)['env'].browserInfo.isSmallDevice) {
        (this.renderer as WebGLRenderer).setScissor( window.innerWidth - this.insetWidth + 10, 50, this.insetWidth, this.insetHeight );
        (this.renderer as WebGLRenderer).setViewport( window.innerWidth - this.insetWidth + 10, 50, this.insetWidth, this.insetHeight );
      } else {
        (this.renderer as WebGLRenderer).setScissor( window.innerWidth - this.insetWidth - 50, 50, this.insetWidth, this.insetHeight );
        (this.renderer as WebGLRenderer).setViewport( window.innerWidth - this.insetWidth - 50, 50, this.insetWidth, this.insetHeight );
      }

      this.camera2.rotateZ(Math.PI / 2);
      if (!!this.moon) {
        this.camera2.rotateY(Math.PI + Math.asin(this.moon.position.y / 40));
      }


      this.renderer.render( this.scene, this.camera2 );
      (this.renderer as WebGLRenderer).setScissorTest( false );
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
     async init() {
        await this.initScene();
        await this.initCamera();
        await this.initLight();
        await this.initWebGLRenderer();
        await this.initControl();
        await this.init3DModel();

        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        await this.render();
    }


    /**
     *
     * 初始化场景
     */
    initScene(): void {
        this.scene = new THREE.Scene();
        // this.scene.background = new THREE.Color( '#fff' );
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        let scale = window.innerWidth / 160;
        if ((window as any)['env'].browserInfo.isIpad) {
          scale = window.screen.width / 120;
        } else if ((window as any)['env'].browserInfo.isIphone) {
          scale = 4.5;
        }

        const left    = this.width / - scale;
        const right   = this.width / scale;
        const top     = this.height / scale;
        const bottom  = this.height / - scale;
        const near    = -500;
        const far     = 1000;
        this.camera =  new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.position.set(0, 0, 200);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.camera2 = new THREE.PerspectiveCamera( 20, this.width / this.height, 1, 1000 );
        this.camera2.position.set( 40, 0, 0 );
        this.camera2.lookAt(new THREE.Vector3(80, 80, 0));
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if ( this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true,  alpha: true });
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor('#FFFFFF' , 1 );

        this.renderer.setSize(this.width , this.height);
        (this.renderer as any).shadowMap.enabled = true;
        (this.renderer as any).shadowMap.type = THREE.PCFSoftShadowMap;
        this.domElement.appendChild(this.renderer.domElement);


        // 设置帧率
        if ((window as any)['env'].browserInfo.isPc) {
            this.renderTime = 28;
        } else {
            this.renderTime = 72;
        }
    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        this.controls = new TrackballControls(this.camera2, this.renderer.domElement);

        this.controls.rotateSpeed = 3;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = true;
        this.controls.noPan = true;
        this.controls.noRotate = true;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
    }

    /**
     * 初始化光源
     */
    initLight(): void {
      const intensity = 1.5;
      const spotLight = new THREE.SpotLight( 0xffffff, intensity );
      spotLight.position.set( -100, 38, 0 );
      spotLight.castShadow = true;
      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;
      spotLight.shadow.camera.near = 1;
      spotLight.shadow.camera.far = 500;
      spotLight.shadow.camera.fov = 30;
      this.scene.add( spotLight );

      const spotLight2 = new THREE.SpotLight( 0xffffff, intensity );
      spotLight2.position.set( -100, -38, 0 );
      spotLight2.castShadow = true;
      spotLight2.shadow.mapSize.width = 1024;
      spotLight2.shadow.mapSize.height = 1024;
      spotLight2.shadow.camera.near = 1;
      spotLight2.shadow.camera.far = 500;
      spotLight2.shadow.camera.fov = 30;
      this.scene.add( spotLight2 );
    }


    init3DModel() {
        this.riShiHelper = new YueShiHelper();

        this.initModelLoad();
        this.initBackgroundImage();
        this.addRing();
    }


    // 加载模型
    async initModelLoad() {
        const sphereGeo = new THREE.SphereGeometry(48, 50, 50);

        const sunTexture = THREE.ImageUtils.loadTexture(image01 as any);
        const sunMaterial = new THREE.MeshBasicMaterial({
          map: sunTexture,
        });

        const sun = new THREE.Mesh(sphereGeo, sunMaterial);
        sun.position.x = -180;
        this.scene.add(sun);

        // 大视角光晕
        const guangyun = THREE.ImageUtils.loadTexture(image05 as any);
        const geometry = new THREE.CircleBufferGeometry( 180, 50 );
        const material = new THREE.MeshBasicMaterial({
          map: guangyun,
          transparent: true,
          opacity: 0.7
        });
        const plane = new THREE.Mesh( geometry, material );
        plane.position.x = -180;
        plane.position.z = -100;
        this.scene.add( plane );

        const guangyun2 = THREE.ImageUtils.loadTexture(image04 as any);
        const geometry3 = new THREE.CircleBufferGeometry( 105, 50 );
        const material3 = new THREE.MeshBasicMaterial({
          map: guangyun2,
          transparent: true,
          opacity: 0.7
        });
        const plane3 = new THREE.Mesh( geometry3, material3 );
        plane3.position.x = -180;
        plane3.position.z = -100;
        this.scene.add( plane3 );

        // 小视角光晕
        const material2 = new THREE.MeshBasicMaterial({
          map: guangyun,
          transparent: true,
          opacity: 0.5
        });
        const geometry2 = new THREE.CircleBufferGeometry( 180, 50 );
        const plane2 = new THREE.Mesh( geometry2, material2 );
        plane2.position.x = -180;
        plane2.rotateY(Math.PI / 2);
        this.scene.add( plane2 );

        const earth: any = await this.fbxLoader(earthModel as any);
        earth.children[0].scale.set(0.6, 0.6, 0.6);
        earth.position.x = 40;
        earth.children[0].rotateX(Math.PI / 2);
        earth.children[0].rotateZ(Math.PI / 1.2);
        this.earth = earth.children[0];
        this.earth.castShadow = true;
        this.scene.add(earth);

        const moon: any = await this.fbxLoader(moonModel as any);
        moon.children[0].scale.set(0.5, 0.5, 0.5);

        this.moon = moon.children[0];
        this.moon.position.x = 80;

        const geometrySphere = new THREE.SphereGeometry( 5.04, 32, 32);
        const materialSphere = new THREE.ShadowMaterial({transparent: true, opacity: 0.0, });
        this.moonShadow = new THREE.Mesh( geometrySphere, materialSphere );
        this.scene.add( this.moonShadow );
        this.moonShadow.position.copy(this.moon.position);

        this.scene.add(moon);
        this.moon.receiveShadow = true;

        this.moonDragEvent();
    }

    // 加载背景图片
    initBackgroundImage() {
        // 前
        const bgImage1 = ThreeUtil.createImg(500, 500, starrySky as any, 0, 0, -200);
        this.scene.add( bgImage1 );

        // 左
        const bgImage2 = ThreeUtil.createImg(500, 500, starrySky as any, 0, 0, 0);
        bgImage2.rotateY(Math.PI / 2);
        bgImage2.position.x = -200;
        this.scene.add( bgImage2 );

        // 右
        const bgImage3 = ThreeUtil.createImg(500, 500, starrySky as any, 0, 0, 0);
        bgImage3.rotateY(Math.PI / 2);
        bgImage3.position.x = 200;
        this.scene.add( bgImage3 );

        // 上
        const bgImage4 = ThreeUtil.createImg(500, 500, starrySky as any, 0, 0, 0);
        bgImage4.rotateX(Math.PI / 2);
        bgImage4.position.y = 200;
        this.scene.add( bgImage4 );

        const bgImage5 = ThreeUtil.createImg(500, 500, starrySky as any, 0, 0, 0);
        bgImage5.rotateX(Math.PI / 2);
        bgImage5.position.y = -200;
        this.scene.add( bgImage5 );
    }

    // 添加光测点和圆形轨道
    addRing() {
        // 画观测点
        const geometry1 = new THREE.SphereGeometry( 1, 32, 32 );
        const material1 = new THREE.MeshBasicMaterial( {color: '#D0104C'} );
        const sphere1 = new THREE.Mesh( geometry1, material1 );
        sphere1.position.x = 16 + 48;
        sphere1.position.z = 30;
        this.scene.add( sphere1 );

        const geometry = new THREE.RingBufferGeometry( 39.875, 40.125, 50 );
        const material = new THREE.MeshBasicMaterial( { color: '#fff' } );
        const circle = new THREE.Mesh( geometry, material );
        circle.position.x = 40;
        this.scene.add( circle );

        const geometryLine = new THREE.Geometry();
        geometryLine.vertices = [new THREE.Vector3(16 + 48, 0, 30), new THREE.Vector3(20 + 48, -15, 30)];
        const materialLine = new THREE.LineDashedMaterial({ color: '#ffffff', transparent: true, opacity: 0.8});
        const lineMesh = new THREE.LineSegments(geometryLine, materialLine);
        this.scene.add( lineMesh );

        const text = ThreeUtil.createNormalText('观测点', 20 + 48, -15, 30, '#ffffff');
        text.scale.set(0.05, 0.05, 0.05);
        this.scene.add(text);
    }

    moonDragEvent() {
        const dargControls1 = new dragcontrols([this.moon], this.camera, this.renderer.domElement);

        // 画上投影区域
        this.addTopTriangle();
        // 画下投影区域
        this.addButtomTriangle();

        dargControls1.addEventListener( 'dragstart',  () => {

        } );

        dargControls1.addEventListener( 'dragend',  () => {

        } );

        let startY = 0;
        let endY = 0;
        dargControls1.addEventListener( 'drag',  () => {
          if (this.moon.position.y > 40) {
            this.moon.position.y = 40;
          } else if (this.moon.position.y < -40) {
            this.moon.position.y = -40;
          }
          startY = this.moon.position.y;

          this.moon.position.x = Math.sqrt(40 * 40 - this.moon.position.y * this.moon.position.y) + 40;
          this.moonShadow.position.copy(this.moon.position);
          endY = startY;

          if (!!this.moon) {
            this.camera2.rotateY(Math.PI + Math.asin(this.moon.position.y / 40));
          }
        } );
    }

    // 画上投影区域
    addTopTriangle() {
        // 切线斜率
        const k = this.riShiHelper.getEquationSlope(-164, 45, 40, 0, 24);


        // 切线
        const z = -100;
        this.equationLine = this.riShiHelper.createEquationLine(new THREE.Vector3(-164, 45, z),
          new THREE.Vector3(40 + 75, k[0] * (164 + 40 + 75) + 45, z));
        this.equationLine2 = this.riShiHelper.createEquationLine(new THREE.Vector3(-164, 45, z),
          new THREE.Vector3(40 + 75, k[1] * (164 + 40 + 75) + 45, z));
        this.scene.add(this.equationLine);
        this.scene.add(this.equationLine2);

        // 切线填充
        const point1 = new THREE.Vector3(-164, 45, 0);
        const point2 = new THREE.Vector3((((this.moon.position.y + 5) - (45 + 164 * k[0])) / k[0]), this.moon.position.y + 5, 0);
        const point3 = new THREE.Vector3((((this.moon.position.y - 5) - (45 + 164 * k[1])) / k[1]), this.moon.position.y - 5, 0);

        this.triangle1.add(this.riShiHelper.createTriangle(point1, point2, point3));

        const toppoint1 = [];
        const buttompoint1 = [];
        const toppoint2 = [];
        const buttompoint2 = [];

        const length = 1.5;
        const earthX = 38;
        for (let i = 0; i < 52; i++) {
          toppoint1[i] = new THREE.Vector3(earthX + i * length, k[0] * (earthX + i * length + 164) + 45, 0);
          buttompoint1[i] = new THREE.Vector3(earthX + i * length, k[1] * (earthX + i * length + 164) + 45, 0);

          toppoint2[i] = new THREE.Vector3(earthX + (i + 1) * length,
            k[0] * (earthX + (i + 1) * length + 164) + 45, 0);

          buttompoint2[i] = new THREE.Vector3(earthX + (i + 1) * length,
            k[1] * (earthX + (i + 1) * length + 164) + 45, 0);

          if (i < 28) {
            this.triangle1.add(this.riShiHelper.createShadow(toppoint1[i], buttompoint1[i], toppoint2[i], buttompoint2[i], 0.8));
          } else {
            this.triangle1.add(this.riShiHelper.createShadow(toppoint1[i], buttompoint1[i], toppoint2[i], buttompoint2[i],
              0.8 - 0.8 * (i - 28) / (52 - 28)));
          }

        }

        this.scene.add(this.triangle1);
    }

    // 画下投影区域
    addButtomTriangle() {
        // 切线斜率
      const k = this.riShiHelper.getEquationSlope(-164, -45, 40, 0, 24);

        // 切线
        const z = -100;
        this.equationLine3 = this.riShiHelper.createEquationLine(new THREE.Vector3(-164, -45, -100),
          new THREE.Vector3(40 + 75, k[0] * (164 + 40 + 75) - 45, z));
        this.equationLine4 = this.riShiHelper.createEquationLine(new THREE.Vector3(-164, -45, -100),
          new THREE.Vector3(40 + 75, k[1] * (164 + 40 + 75) - 45, z));
        this.scene.add(this.equationLine3);
        this.scene.add(this.equationLine4);

        // 切线填充
        const point1 = new THREE.Vector3(-164, -45, 0);
        const point2 = new THREE.Vector3((((this.moon.position.y + 5) - (-45 + 164 * k[0])) / k[0]), this.moon.position.y + 5, 0);
        const point3 = new THREE.Vector3((((this.moon.position.y - 5) - (-45 + 164 * k[1])) / k[1]), this.moon.position.y - 5, 0);
        this.triangle2.add(this.riShiHelper.createTriangle(point1, point2, point3));

        const toppoint1 = [];
        const buttompoint1 = [];
        const toppoint2 = [];
        const buttompoint2 = [];

        const length = 1.5;
        const earthX = 38;
        for (let i = 0; i < 52; i++) {
          toppoint1[i] = new THREE.Vector3(earthX + i * length, k[0] * (earthX + i * length + 164) - 45, 0);
          buttompoint1[i] = new THREE.Vector3(earthX + i * length, k[1] * (earthX + i * length + 164) - 45, 0);

          toppoint2[i] = new THREE.Vector3(earthX + (i + 1) * length,
            k[0] * (earthX + (i + 1) * length + 164) - 45, 0);

          buttompoint2[i] = new THREE.Vector3(earthX + (i + 1) * length,
            k[1] * (earthX + (i + 1) * length + 164) - 45, 0);

          if (i < 28) {
            this.triangle2.add(this.riShiHelper.createShadow(toppoint1[i], buttompoint1[i], toppoint2[i], buttompoint2[i], 0.8));
          } else {
            this.triangle2.add(this.riShiHelper.createShadow(toppoint1[i], buttompoint1[i], toppoint2[i], buttompoint2[i],
              0.8 - 0.8 * (i - 28) / (52 - 28)));
          }
        }

        this.scene.add(this.triangle2);
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    reset() {
        this.moon.position.x = 80;
        this.moon.position.y = 0;
        this.moonShadow.position.copy(this.moon.position);
    }
}
