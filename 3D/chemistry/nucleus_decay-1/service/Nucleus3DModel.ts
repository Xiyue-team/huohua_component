/**
 *gltf模型加载类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/2/26 16:52
 */
import * as THREE from 'three';
import { Group, Mesh, Object3D, WebGLRenderer} from 'three';
import {TweenMax, Power0} from 'gsap';
import {ThreeBase} from '../../../src/three/template/ThreeBase';
import {CommonUtil} from '../../../src/util/CommonUtil';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);

import * as xPath from '../sub_static/x.png';
import * as xPointPath from '../sub_static/point.png';

import * as zmxPath from '../sub_static/nucleus/yzh/zmx.gltf';
import * as zmxBin from '../sub_static/nucleus/yzh/zmx.bin';
import * as ym27 from '../sub_static/nucleus/yzh/Material27_baseColor.png';
import * as ym28 from '../sub_static/nucleus/yzh/Material28_baseColor.png';

import * as dzPath from '../sub_static/nucleus/beta/dz.gltf';
import * as dzBin from '../sub_static/nucleus/beta/dz.bin';
import * as fzPath from '../sub_static/nucleus/beta/fzzzwz.gltf';
import * as fzBin from '../sub_static/nucleus/beta/fzzzwz.bin';
import * as bm29 from '../sub_static/nucleus/beta/Material29_baseColor.png';
import * as bm30 from '../sub_static/nucleus/beta/Material30_baseColor.png';

import * as alzPath from '../sub_static/nucleus/alpha/alz.gltf';
import * as alzBin from '../sub_static/nucleus/alpha/alz.bin';
import * as alM27 from '../sub_static/nucleus/alpha/Material27_baseColor.png';
import * as alM28 from '../sub_static/nucleus/alpha/Material28_baseColor.png';



export class Nucleus3DModel extends ThreeBase {

    //原子核
    nucleusModel: any;
    //α粒子
    alphaModel: any;
    //电子
    private electronModel: any;
    //反电子中微子
    private antineutrinoModel: any;

    //磁感线X
    private magneticX: any = [];
    //磁感线圆点
    private magneticPoint: any = [];
    //磁感线本身
    private magneticLine: any = [];

    //alpha 动画对象
    private alphaTweenAnimation: any;
    //电子 动画对象
    private electronTweenAnimation: any;
    //反电子中微子动画对象
    private antineutrinoTweenAnimation: any;

    //是否是匀强磁场
    uniformMagnetic = false;

    //磁场的起始点
    magneticBeginX = -25;
    magneticBeginY = 15;

    //运动轨迹半径
    radius = 6;

    //粒子显示区域
    magneticRangeX = -31;
    magneticRangeY = 21;

    cameraX: number;
    cameraY: number;
    cameraZ: number;


    private betaCricleAnim: any;

    //螺旋初始点
    private startPosition: any;


    /*
    * alpha粒子衰变动画
    * */
    //alphal粒子螺旋动画初始值
    private alphaTween = {
      x: 0,
      y: 0,
      angle: Math.PI,
      z: 0
    };
    //非匀强磁场随机射出粒子动画
    alphaRandomTween: any;

    //匀强磁场螺旋动画
    alphaCircleTween: any;

    //匀强磁场切线动画
    alphaLineTween: any;

    /*
    * Beta粒子衰变动画
    * */
    //Beta电子螺旋运动初始值
    private betaTween = {
      x: 0,
      y: 0,
      angle: Math.PI,
      z: 0
    };
    //反电子中微子动画
    antineutrinoTween: any;

    //beta电子随机发射动画
    betaRandomTween: any;
    //beta电子螺旋动画
    betaCircleTween: any;
    //beta电子切线动画
    betaLineTween: any;

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
        this.initMagentic();
        this.initGltfLoader();
        this.initWebGLRenderer();
        this.initControl();
        this.preload();
        this.render();
    }

    initScene(): void {
        this.scene = new THREE.Scene();
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {

        const left    = this.width / - 50;
        const right   = this.width / 50;
        const top     = this.height / 50;
        const bottom  = this.height / - 50;
        const near    = - 500;
        const far     = 1000;

        this.camera =  new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 55);

        this.cameraX = this.camera.position.x;
        this.cameraY = this.camera.position.y;
        this.cameraZ = this.camera.position.z;

        this.getRandomEdgePoint();
    }

    preload() {
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
    initMagentic() {
        /* 1.磁感线圆柱 */
        const line1 = new THREE.CylinderGeometry(0.2, 0.2 , 20 , 40 , 40);

        //圆柱材质
        const material = new THREE.MeshPhongMaterial( {
            color: 0x2BBCFF,
            //材质自发光颜色色
            side: THREE.DoubleSide,
            flatShading: true
        } );

        //圆柱
        const cube = new THREE.Mesh( line1, material );
        cube.rotateX(Math.PI / 2);

        /* 2.磁感线本身 */

        //圆柱顶部×  "../sub_static/x.png"
        const xMap = new THREE.TextureLoader().load(xPath as any);
        const geometry = new THREE.CircleGeometry( 0.5, 32 );

        //顶部x 材质·
        const material2 = new THREE.MeshPhongMaterial( {
            color: 0XFFFFFF,
            //材质自发光颜色色 emissive: 0x072534,
            side: THREE.FrontSide,
            map: xMap,
            flatShading: true } );

        //圆圈1
        const circle = new THREE.Mesh( geometry, material2 );
        circle.position.z = 10;

        /* 3.磁感线圆点  */
        const pMap = new THREE.TextureLoader().load(xPointPath as any);
        const pointGeometry = new THREE.CircleGeometry( 0.5, 32 );

        const pointMaterial = new THREE.MeshPhongMaterial(  {
            color: 0XFFFFFF,
            side: THREE.BackSide,
            map: pMap,
            flatShading: true } );

        const point = new THREE.Mesh( pointGeometry , pointMaterial );
        point.position.z = -10.001 ;

        const row = 6;
        const col = 8;
        for (let i = 0; i < row; i++) {
            const y = this.magneticBeginY - i * 6;
            for (let j = 0; j < col; j++) {
                const x = this.magneticBeginX + j * 7;
                //创建磁感线
                const magentCube = cube.clone();
                const magentCircle = circle.clone();
                const magentPoint  = point.clone();

                magentCircle.position.x = x;
                magentCircle.position.y = y;
                magentCircle.visible = false;

                magentCube.position.x = x;
                magentCube.position.y = y;
                magentCube.visible = false;

                magentPoint.position.x = x;
                magentPoint.position.y = y;
                magentPoint.visible = true;

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

        const gltf: any = await this.gltfLoader(zmxPath as any);
        gltf.scene.traverse((child: any) => {
             if (child instanceof Group) {
                 this.nucleusModel = child;
                 this.nucleusModel.scale.set(0.3, 0.3, 0.3);
                 this.nucleusModel.visible = false;
                 this.scene.add(this.nucleusModel);
             }
         });

        //alpha 粒子
        const alpha: any = await this.gltfLoader(alzPath as any);
        alpha.scene.traverse((child: any) => {
            if (child instanceof Group) {
                this.alphaModel = child;
                this.alphaModel.scale.set(0.3, 0.3, 0.3);
                this.alphaModel.visible = false;
                this.scene.add(this.alphaModel);
            }
        });

        //电子
        const electronModel: any = await this.gltfLoader(dzPath as any);
        electronModel.scene.traverse((child: any) => {
            if (child instanceof Mesh) {
                this.electronModel = child;
                this.electronModel.scale.set(0.3, 0.3, 0.3);
                this.electronModel.visible = false;
                this.scene.add(this.electronModel);
            }
        });

        //反电子中微子
        const antineutrinoModel: any = await this.gltfLoader(fzPath as any);
        antineutrinoModel.scene.traverse((child: any) => {
            if (child instanceof Mesh) {
                this.antineutrinoModel = child;
                this.antineutrinoModel.scale.set(0.3, 0.3, 0.3);
                this.antineutrinoModel.visible = false;
                this.scene.add(this.antineutrinoModel);
            }
        });

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

        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor('#FFFFFF' , 0);
        this.renderer.setSize(this.width, this.height);
        const element = this.domElement.appendChild(this.renderer.domElement);

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

        //显示磁感线和吸附效果
        if (this.uniformMagnetic === true) {
            this.showMagnetic();
            this.enableAdsorption();
        } else {
            this.hideMagnetic();
            this.hideMagneticX();
            this.hideMageneticPoint();
        }

        // //判断alpha粒子是否超出磁感线
        // if (this.alphaModel && this.checkPostionOutMagnetic(this.alphaModel.position.x, this.alphaModel.position.y)) {
        //     this.alphaModel.visible = false;
        //     (window as any).viewHandler.viewModel.$data.isPlay = false;
        // }

        //判断反电子中微子和电子是否超出磁感线
        // const antineutrinoIsOut = this.antineutrinoModel &&
        //     this.checkPostionOutMagnetic(this.antineutrinoModel.position.x, this.antineutrinoModel.position.y);
        // const electronIsOut = this.electronModel &&
        //     this.checkPostionOutMagnetic(this.electronModel.position.x, this.electronModel.position.y);
        //
        // if (antineutrinoIsOut) {
        //     this.antineutrinoModel.visible = false;
        // }
        // if (electronIsOut) {
        //     this.electronModel.visible = false;
        // }
        //
        // if (antineutrinoIsOut && electronIsOut) {
        //     console.log('超出界限');
        //     const edgePoints = this.getRandomEdgeSymmetricPoint();
        //
        //     this.stopAntineutrinoAnimation(edgePoints[0]);
        //     this.stopElectronAnimation(edgePoints[1]);
        //     this.notifyBetaAnimationComplete();
        //
        // }

        this.renderer.render( this.scene, this.camera );
    }

    //隐藏原子核模型
    hideNucleusModel() {
        this.nucleusModel.visible = false;
    }

    //显示原子核
    showNucleusModel() {
        this.nucleusModel.visible = true;
    }

    //隐藏alpha衰变模型
    hideAlphaModel() {

        this.alphaModel.visible = false;
        this.alphaModel.position.set(0, 0, 0);
    }

    //隐藏beta衰变模型
    hideBetaModel() {
        this.electronModel.visible = false;
        this.nucleusModel.visible = false;

        this.electronModel.position.set(0, 0, 0);
        this.nucleusModel.position.set(0, 0, 0);
    }

    killAllAnimation() {
        TweenMax.killAll();
    }

    //随机获取边缘的点
    private getRandomEdgePoint() {
        //随机点
        const xRandom = CommonUtil.getRandomInt(this.magneticRangeX, 0 - this.magneticRangeX);
        const yRandom = CommonUtil.getRandomInt(this.magneticRangeY, 0 - this.magneticRangeY);

        let x: number;
        let y: number;

        //边缘顶点
        const xVertex = [0 - this.magneticRangeX, this.magneticRangeX];
        const yVertex = [0 - this.magneticRangeY, this.magneticRangeY];

        const i = CommonUtil.getRandomInt(1, 4);
        if ( i === 1 || i === 2) {
            x = xVertex[i - 1];
            y = yRandom;
        } else {
            y = yVertex[i - 3];
            x = xRandom;
        }
        return [x, y];
    }

    //随机获取边缘的两个相对中心的对称点
    private getRandomEdgeSymmetricPoint() {
        const p1 = this.getRandomEdgePoint();
        const p2 = [0 - p1[0], 0 - p1[1]];
        return [p1, p2];
    }

    //判断坐标否超出磁感线
    private checkPostionOutMagnetic(x: number, y: number) {
        if (x <= this.magneticBeginX || x >= 0 - this.magneticBeginX || y >= this.magneticBeginY || y <= 0 - this.magneticBeginY) {
            return true;
        }
        return false;

    }

/******************重构部分*************************************************************************************/

    //是否产生吸附效果
    enableAdsorption() {
        const cameraPositionZ = this.camera.position.z;

        if (cameraPositionZ > 0 && 54.9 <= cameraPositionZ && cameraPositionZ <= 55.1) {
            this.camera.position.set(0, 0, 55);
            this.camera.rotation.set(-6.123233995736766e-17, 0, 0);
        }

        if (cameraPositionZ < 0  && -55.1 <= cameraPositionZ && cameraPositionZ <= -54.9) {
            this.camera.position.set(0, 0, -55);
            this.camera.rotation.set(-3.14, 0.015, 3.14);
        }

        if (this.camera.position.z === this.cameraZ) {
            this.showMagneticX();
            this.hideMagnetic();
        } else if (this.camera.position.z === -this.cameraZ) {
            this.showMageneticPoint();
            this.hideMagneticX();
        } else {
            this.hideMageneticPoint();
            this.hideMagneticX();
            this.showMagnetic();
        }
    }

    //显示磁感线
    private showMagnetic(): void {
        for (let i = 0; i < this.magneticLine.length; i++) {
            (this.magneticLine[i] as THREE.Object3D).visible = true;
        }
    }

    //隐藏磁感线
    private hideMagnetic(): void {
        for (let i = 0; i < this.magneticLine.length; i++) {
            (this.magneticLine[i] as THREE.Object3D).visible = false;
        }
    }

    //显示磁感线底部x
    private showMagneticX(): void {
        for (let i = 0; i < this.magneticX.length; i++) {
            (this.magneticX[i] as THREE.Object3D).visible = true;
        }
    }

    //隐藏磁感线底部X
    private hideMagneticX(): void {
        for (let i = 0; i < this.magneticX.length; i++) {
            (this.magneticX[i] as THREE.Object3D).visible = false;
        }
    }
    //显示磁感线顶部圆点
    private showMageneticPoint(): void {
        for (let i = 0; i < this.magneticPoint.length; i++) {
            (this.magneticPoint[i] as THREE.Object3D).visible = true;
        }
    }

    //显示磁感线顶部圆点
    private hideMageneticPoint(): void {
        for (let i = 0; i < this.magneticPoint.length; i++) {
            (this.magneticPoint[i] as THREE.Object3D).visible = false;
        }
    }

    // 显示α衰变
    showAlphaModel() {
        this.destoryAllAnimation();
        this.nucleusModel.visible = true;
        this.alphaModel.visible = true;

        this.electronModel.visible = false;
        this.antineutrinoModel.visible = false;
    }

    //显示β衰变
    showBetaModel() {
        this.destoryAllAnimation();
        this.nucleusModel.visible = true;
        this.electronModel.visible = true;
        this.antineutrinoModel.visible = true;

        this.alphaModel.visible = false;
        this.destoryAllAnimation();

    }


    //alphal粒子的螺旋动画
    alphaCircleAnimation() {
      this.startPosition = this.alphaModel.position.clone();
      this.alphaTween.x = this.alphaModel.position.x;
      this.alphaTween.y = this.alphaModel.position.y;
      const offsetX = this.alphaModel.position.x;
      let offsetY = this.alphaModel.position.y;

      if ( offsetX >= 0) {
        offsetY += 6;
      } else {
        this.alphaTween.angle = 0;
        offsetY -= 6;
      }

      this.alphaCircleTween = TweenMax.to(this.alphaTween, 20, {
        angle: -Math.PI * 2 * 3.7,
        z: 11,
        ease: Power0.easeNone,
        onUpdate: () => {
          const x = 6 * Math.sin(this.alphaTween.angle);
          const y = 6 * Math.cos(this.alphaTween.angle);

          this.alphaModel.position.x = x + offsetX;
          this.alphaModel.position.y = y + offsetY;
          this.alphaModel.position.z = this.alphaTween.z;
        },
        onComplete: () => {
          console.log('结束螺旋动画,进入切线动画');
          if (this.alphaLineTween && this.alphaLineTween.progress() > 0 && this.alphaLineTween.progress() < 1) {
            this.alphaLineTween.resume();
          } else {
            console.log('重新开始新动画');
            this.setAlphaLineAnimation(this.startPosition, this.alphaModel);
            this.alphaLineTween.play();
          }
        },
        paused: true
      });
    }

    //beta电子的螺旋动画
    betaCircleAnimation() {
      this.startPosition = this.electronModel.position.clone();
      this.betaTween.x = this.electronModel.position.x;
      this.betaTween.y = this.electronModel.position.y;
      const offsetX = this.electronModel.position.x;
      let offsetY = this.electronModel.position.y;

      if ( offsetX > 0) {
        offsetY -= 6;
        this.betaTween.angle = 0;
      } else {
        offsetY += 6;
      }

      this.betaCircleTween = TweenMax.to(this.betaTween, 20, {
        angle: Math.PI * 2 * 3.7,
        z: 11,
        ease: Power0.easeNone,
        onUpdate: () => {
          const x = 6 * Math.sin(this.betaTween.angle);
          const y = 6 * Math.cos(this.betaTween.angle);

          this.electronModel.position.x = x + offsetX;
          this.electronModel.position.y = y + offsetY;
          this.electronModel.position.z = this.betaTween.z;
        },
        onComplete: () => {
          console.log('beta结束螺旋动画,进入切线动画');
          if (this.betaLineTween && this.betaLineTween.progress() > 0 && this.betaLineTween.progress() < 1) {
            this.betaLineTween.resume();
          } else {
            console.log('beta重新开始新动画');
            this.setBetaLineAnimation(this.startPosition, this.electronModel);
            this.betaLineTween.play();
          }
        },
        paused: true
      });
    }

    //显示alpha衰变动画
    showAlphaAnimation() {
        this.alphaModel.visible = true;

        if (this.uniformMagnetic) {
            //开启匀强磁场动画

            //判断螺旋动画是否还在执行
            if (this.alphaCircleTween && (this.alphaCircleTween.progress() !== 0)) {
              console.log(1111);
              this.alphaCircleTween.resume();
            } else {
              console.log(2222);
              this.alphaModel.position.set(0, 0, 0);
              this.alphaTween = {x: 0, y: 0, angle: Math.PI, z: 0};
              this.alphaCircleAnimation();
              this.alphaCircleTween.play();
            }

        } else {
            //非匀强磁场动画，开启alpha粒子随机射出动画
            if (this.alphaRandomTween  && this.alphaRandomTween.progress() !== 0) {
                this.alphaRandomTween.resume();

            } else {

              const edgePoint = this.getRandomEdgePoint();
              this.alphaRandomTween = TweenMax.to(this.alphaModel.position, 3, {
                x: edgePoint[0],
                y: edgePoint[1],
                ease: Power0.easeNone,
                onComplete: () => {
                  console.log('alpha衰变非匀强磁场动画结束');
                  (window as any).viewHandler.viewModel.$data.isPlay = false;
                  //重置动画
                  this.alphaRandomTween.progress(0);
                  this.alphaRandomTween.pause();
                  this.resetAlphaModel();
                },
                paused: true
              });
              this.alphaRandomTween.play();
            }
        }
    }

    //显示beta衰变动画
    showBetaAnimation() {
      //TODO 两个模型有可能仍然有一个在运动
      const isElectronComplete = this.isElectronComplete();

      this.antineutrinoModel.visible = true;
      this.electronModel.visible = true;

      const targetPoints = this.getRandomEdgeSymmetricPoint();

        if (this.uniformMagnetic) {
            //开启匀强磁场电子动画
            if (this.betaCircleTween && this.betaCircleTween.progress() !== 0) {
              console.log('重复动画');
              this.betaCircleTween.resume();
            } else {
              console.log('播放新动画');
              this.electronModel.position.set(0, 0, 0);
              this.betaTween = {x: 0, y: 0, angle: Math.PI, z: 0};
              this.betaCircleAnimation();
              this.betaCircleTween.play();
            }

        } else {
            //非匀强磁场开启随机发射动画
          if (this.betaRandomTween  && this.betaRandomTween.progress() !== 0) {
            console.log(3333333333);
            this.betaRandomTween.resume();
          } else {
            console.log(44444444444);
            const edgePoint = this.getRandomEdgePoint();
            this.betaRandomTween = TweenMax.to(this.electronModel.position, 3, {
              x: edgePoint[0],
              y: edgePoint[1],
              ease: Power0.easeNone,
              onComplete: () => {
                console.log('beta电子非匀强磁场动画结束');
                //重置动画
                this.betaRandomTween.progress(0);
                this.betaRandomTween.pause();
                this.resetElectronModel();
                if (this.isAntiTweenComplete()) {
                  (window as any).viewHandler.viewModel.$data.isPlay = false;
                }
              },
              paused: true
            });

            this.betaRandomTween.play();
          }

        }

      if (this.antineutrinoTween && this.antineutrinoTween.progress() > 0 && this.antineutrinoTween.progress() < 1) {
          this.antineutrinoTween.resume();
      } else {
        console.log('重新反式中微子动画');
        if (isElectronComplete) {
          this.setAntineutrinoAnimation(targetPoints[1]);
          this.antineutrinoTween.play();
        }
      }
    }

    //开启匀强磁场
    enableUniformMagnetic() {
        this.uniformMagnetic = true;
        //alpha衰变
        if ((window as any).viewHandler.viewModel.$data.alpha) {
            this.switchAlphaAnimation();
        }
        //beta衰变
        if ((window as any).viewHandler.viewModel.$data.beta) {
            this.switchBetaAnimation();
        }
    }

    //关闭匀强磁场
    disableUniformMagnetic() {
        this.uniformMagnetic = false;
        //alpha粒子衰变动画
        if ((window as any).viewHandler.viewModel.$data.alpha) {

          //alpha螺旋动画转直线动画
          if (this.alphaCircleTween && this.alphaCircleTween.progress() !== 1) {
            this.alphaCircleTween.pause();
            this.setAlphaLineAnimation(this.startPosition, this.alphaModel);
            this.alphaLineTween.play();
          }
        }
        //beta衰变动画
        if ((window as any).viewHandler.viewModel.$data.beta) {

          //beta电子螺旋动画转直线动画
          if (this.betaCircleTween && this.betaCircleTween.progress() !== 1) {
            this.betaCircleTween.pause();
            this.setBetaLineAnimation(this.startPosition, this.electronModel);
            this.betaLineTween.play();
          }
        }
    }

    switchAlphaAnimation () {
        //非匀强磁场动画转换到匀强磁场动画
        if (this.alphaRandomTween && this.alphaRandomTween.isActive()) {
            this.alphaRandomTween.pause();
            this.alphaCircleAnimation();
            this.alphaCircleTween.play();
        }
    }

    switchBetaAnimation () {
      //非匀强磁场动画转换到匀强磁场动画
      if (this.betaRandomTween && this.betaRandomTween.isActive()) {
        this.betaRandomTween.pause();
        this.betaCircleAnimation();
        this.betaCircleTween.play();
      }
    }

    //设置反电子中微子动画
    setAntineutrinoAnimation(targetPoint: Array<number>) {
        this.antineutrinoTween = TweenMax.to(this.antineutrinoModel.position, 3, {
            x: targetPoint[0],
            y: targetPoint[1],
            ease: Power0.easeNone,
            onComplete: () => {
                console.log('反电子中微子结束');
                this.antineutrinoTween.progress(0);
                this.antineutrinoTween.pause();
                this.resetAntineutrinoModel();
                if (this.isElectronComplete()) {
                  (window as any).viewHandler.viewModel.$data.isPlay = false;
                }
            },
            paused: true
        });
    }

    resetAlphaModel() {
        this.alphaModel.position.set(0, 0, 0);
        this.alphaModel.visible = false;

        this.alphaTween = {
          x: 0,
          y: 0,
          angle: Math.PI,
          z: 0
        };
    }

    resetAntineutrinoModel() {
        this.antineutrinoModel.position.set(0, 0, 0);
        this.antineutrinoModel.visible = false;
    }

    resetElectronModel() {
        this.electronModel.position.set(0, 0, 0);
        this.electronModel.visible = false;
    }

    destoryAllAnimation() {

        // 重置动画
        if (this.betaRandomTween) {
            this.betaRandomTween.progress(0);
            this.betaRandomTween.pause();
        }

        if (this.betaCircleTween) {
            this.betaCircleTween.progress(0);
            this.betaCircleTween.pause();
        }

        if (this.betaLineTween) {
            this.betaLineTween.progress(0);
            this.betaLineTween.pause();
        }

        if (this.antineutrinoTween) {
            this.antineutrinoTween.progress(0);
            this.antineutrinoTween.pause();
        }

        if (this.alphaRandomTween) {
            this.alphaRandomTween.progress(0);
            this.alphaRandomTween.pause();
        }

        if (this.alphaCircleTween) {
          this.alphaCircleTween.progress(0);
          this.alphaCircleTween.pause();
        }

        if (this.alphaLineTween) {
          this.alphaLineTween.progress(0);
          this.alphaLineTween.pause();
        }

        if (this.alphaRandomTween) {
          this.alphaRandomTween.progress(0);
          this.alphaRandomTween.pause();
        }

        this.alphaModel.position.set(0, 0, 0);
        this.alphaModel.visible = false;
        this.alphaTween = {
          x: 0,
          y: 0,
          angle: Math.PI,
          z: 0
        };

      this.electronModel.position.set(0, 0, 0);
      this.electronModel.visible = false;
      this.betaTween = {
        x: 0,
        y: 0,
        angle: Math.PI,
        z: 0
      };

      this.antineutrinoModel.position.set(0, 0, 0);
      this.antineutrinoModel.visible = false;

    }

    //暂停alpha衰变动画
    pauseAlphaAnimation() {
      //非匀强磁场随机射出动画
      if (this.alphaRandomTween && this.alphaRandomTween.progress() !== 1) {
        this.alphaRandomTween.pause();
      }

      //匀强磁场螺旋动画
      if (this.alphaCircleTween && this.alphaCircleTween.progress() !== 1) {
        this.alphaCircleTween.pause();
      }

      //匀强磁场切线动画
      if (this.alphaLineTween && this.alphaLineTween.progress() !== 1) {
        this.alphaLineTween.pause();
      }
    }

    //暂停beta衰变动画
    pauseBetaAnimation() {

      //反式中微子动画
      if (this.antineutrinoTween && this.antineutrinoTween.progress() !== 1) {
        this.antineutrinoTween.pause();
      }

      //beta电子随机发射动画
      if (this.betaRandomTween && this.betaRandomTween.progress() !== 1) {
        this.betaRandomTween.pause();
      }

      //beta电子螺旋式动画
      if (this.betaCircleTween && this.betaCircleTween.progress() !== 1) {
        this.betaCircleTween.pause();
      }

      //beta电子切线动画
      if (this.betaLineTween && this.betaLineTween.progress() !== 1) {
        this.betaLineTween.pause();
      }
    }

    isElectronComplete() {
      //开启匀强磁场状态下
      if (this.uniformMagnetic) {
        if (this.betaCircleTween && this.betaCircleTween.progress() > 0 && this.betaCircleTween.progress() < 1) {
          return false;
        } else if (this.betaLineTween && this.betaLineTween.progress() > 0 && this.betaLineTween.progress() < 1) {
          return false;
        }
      } else {
        //非匀强磁场状态下
        if (this.betaRandomTween && this.betaRandomTween.progress() > 0  && this.betaRandomTween.progress() < 1) {
          return false;
        }
      }
      return true;
    }

    isAntiTweenComplete() {
      if (this.antineutrinoTween && this.antineutrinoTween > 0 && this.antineutrinoTween < 1) {
        return false;
      }
      return true;
    }

    getAlphaLinePoint(position: any, model: any) {
        //圆的中心点
        const centerPoint = {x: 0, y: 0};
        //切线交点
        const outPoint = model.position;
        //将近似为0的值取整
        outPoint.x = outPoint.x.toLocaleString();
        //最终运动点
        const finalPoint = {x: 0, y: 0, z: model.position.z};
        //圆的初始点
        if (position.x < 0) {
            centerPoint.x = position.x;
            centerPoint.y = position.y - this.radius;
        } else {
            centerPoint.x = position.x;
            centerPoint.y = position.y + this.radius;
        }
        //斜率
        const slope = -(outPoint.x - centerPoint.x) / (outPoint.y - centerPoint.y);

        if (!slope || slope === Infinity) {
          finalPoint.x = outPoint.x;
          if (outPoint.x < centerPoint.x) {
              finalPoint.y = -this.magneticRangeY;
          } else {
            finalPoint.y = this.magneticRangeY;
          }
          return finalPoint;
        }
        //截距
        const intercept = outPoint.y - (slope * outPoint.x);

        if (outPoint.x > centerPoint.x) {
          console.log('相较于上方');
          finalPoint.x = (this.magneticRangeY - intercept ) / slope;
          finalPoint.y = this.magneticRangeY;
        } else {
          finalPoint.x = (-this.magneticRangeY - intercept ) / slope;
          finalPoint.y = -this.magneticRangeY;
        }

        if (finalPoint.x < this.magneticRangeX) {

          finalPoint.x = this.magneticRangeX;
          finalPoint.y = finalPoint.x * slope + intercept;

        } else if (finalPoint.x > -this.magneticRangeX) {

          finalPoint.x = -this.magneticRangeX;
          finalPoint.y = finalPoint.x * slope + intercept;
        }

        return finalPoint;
    }

    getBetaLinePoint(position: any, model: any) {
      //圆的中心点
      const centerPoint = {x: 0, y: 0};
      //切线交点
      const outPoint = model.position;
      //将近似为0的值取整
      outPoint.x = outPoint.x.toLocaleString();
      //最终运动点
      const finalPoint = {x: 0, y: 0, z: model.position.z};

      //圆的初始点
      if (position.x <= 0) {
        centerPoint.x = position.x;
        centerPoint.y = position.y + this.radius;
      } else {
        centerPoint.x = position.x;
        centerPoint.y = position.y - this.radius;
      }
      //斜率
      const slope = -(outPoint.x - centerPoint.x) / (outPoint.y - centerPoint.y);

      if (!slope || slope === Infinity) {
        finalPoint.x = outPoint.x;
        if (outPoint.x < centerPoint.x) {
          finalPoint.y = this.magneticRangeY;
        } else {
          finalPoint.y = -this.magneticRangeY;
        }
        return finalPoint;
      }
      //截距
      const intercept = outPoint.y - (slope * outPoint.x);

      if (outPoint.x > centerPoint.x) {
        console.log('相较于下方');
        finalPoint.x = (-this.magneticRangeY - intercept ) / slope;
        finalPoint.y = this.magneticRangeY;
      } else if (outPoint.x < centerPoint.x) {
        console.log('相较于上方');
        finalPoint.x = (this.magneticRangeY - intercept ) / slope;
        finalPoint.y = this.magneticRangeY;
      } else {
        if (finalPoint.y > centerPoint.y) {
            finalPoint.x = -this.magneticRangeX;
        } else {
          finalPoint.x = this.magneticRangeX;
        }
      }

      if (finalPoint.x <= this.magneticRangeX) {
        finalPoint.x = this.magneticRangeX;
        finalPoint.y = finalPoint.x * slope + intercept;

      } else if (finalPoint.x >= -this.magneticRangeX) {

        finalPoint.x = -this.magneticRangeX;
        finalPoint.y = finalPoint.x * slope + intercept;
      }

      return finalPoint;
    }

    //设置alpha切线运动
    setAlphaLineAnimation(startPosition: any, model: any ) {
      const linePoint = this.getAlphaLinePoint(startPosition, model);
      this.alphaLineTween = TweenMax.to(this.alphaModel.position, 6, {
        x: linePoint.x,
        y: linePoint.y,
        z: linePoint.z,
        ease: Power0.easeNone,
        onComplete: () => {
          console.log('alpha切线动画结束');
          (window as any).viewHandler.viewModel.$data.isPlay = false;

          //充值螺旋动画
          this.alphaCircleTween.progress(0);
          this.alphaCircleTween.pause();

          if (this.alphaRandomTween && this.alphaRandomTween.progress() > 0 && this.alphaRandomTween.progress() < 1) {
            this.alphaRandomTween.progress(0);
            this.alphaRandomTween.pause();
          }
        },
        paused: true
      });
    }

    //设置beta切线运动
    setBetaLineAnimation(startPosition: any, model: any ) {
      const linePoint = this.getBetaLinePoint(startPosition, model);
      this.betaLineTween = TweenMax.to(this.electronModel.position, 6, {
        x: linePoint.x,
        y: linePoint.y,
        z: linePoint.z,
        ease: Power0.easeNone,
        onComplete: () => {
          console.log('beta电子切线动画结束');

          //充值螺旋动画
          this.betaCircleTween.progress(0);
          this.betaCircleTween.pause();

          if (this.betaRandomTween && this.betaRandomTween.progress() > 0 && this.betaRandomTween.progress() < 1) {
            this.betaRandomTween.progress(0);
            this.betaRandomTween.pause();
          }

          if (this.isAntiTweenComplete()) {
            (window as any).viewHandler.viewModel.$data.isPlay = false;
          }

        },
        paused: true
      });
    }

}
