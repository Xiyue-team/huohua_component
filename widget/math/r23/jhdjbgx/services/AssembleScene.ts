/**
 *初始化3d场景类
 *@since 2.0
 *@author chaoyang
 *@Date 2018/12/12 10:10
 */
import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
const dragcontrols = require('three-dragcontrols').default;
OBJLoader(THREE);

const OrbitControls = require('three-orbitcontrols');
import { PerspectiveCamera } from 'three';

export class AssembleScene extends ThreeBase {

    circleA: any;
    circleB: any;
    scale: number;

    textA: any;
    textB: any;
    endTextA: any;

    pointA: any;
    pointB: any;

    opacityA: any;
    opacityB: any;

    endPointA = {
      x: 0,
      y: 0,
      radius: 0
    };

    offsetTextA = {
      x: 0,
      y: 0
    };

    private render = () => {
      requestAnimationFrame( this.render );
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
        this.init();
    }

    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.initCircle();

       this.render();
    }
    /**
     *
     * 初始化场景
     */
    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( '#2d2d2d' );
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
      const near    = 0.1;
      const far     = 2000;
      this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
      this.camera.lookAt(new THREE.Vector3(0,  0,  0));
      this.camera.position.set(0,  0,  60);
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
      const orbit = new OrbitControls(this.camera, this.renderer.domElement);

      // 使动画循环使用时阻尼或自转 意思是否有惯性
      orbit.enableDamping = true;
      //是否可以缩放
      orbit.enableZoom = false;
      //是否自动旋转
      orbit.autoRotate = false;
      //设置相机距离原点的最远距离
      orbit.minDistance = 1;
      //设置相机距离原点的最远距离
      orbit.maxDistance = 4000;
      //是否开启右键拖拽
      orbit.enablePan = false;
      //是否可以旋转
      orbit.enableRotate = false;
    }

    /**
     * 初始化光源
     */
    initLight(): void {
      const ambientLight = new THREE.AmbientLight( 0xffffff, 0.8);
      this.scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight( '#ffffff', 0.3);
      dirLight.position.set( 100, 100, 100 );
      this.scene.add( dirLight );

      const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.2);
      dirLight2.position.set( -100, 0, -100 );
      this.scene.add( dirLight2 );
    }

    reset() {
      this.circleA.scale.set(1, 1, 1);

      this.endTextA.visible = false;
      this.circleA.geometry.parameters.radius = 10;
      this.scale = this.circleA.scale.x;

      this.textA.position.set(-15, 8, 0);
      this.pointA.position.set(-13, -2, 1);
      this.pointB.position.set(-34, 0, 1);
      this.pointA.visible = true;
      this.pointB.visible = false;

      this.endPointA.x = this.pointA.position.x;
      this.endPointA.y = this.pointA.position.y;
      this.endPointA.radius = this.circleA.geometry.parameters.radius;
      this.offsetTextA.x = this.textA.position.x;
      this.offsetTextA.y = this.textA.position.y;
    }

    //初始化集合A、B圆圈
    initCircle() {
      //创建圆形B
      const geometry_B = new THREE.CircleBufferGeometry(20, 60);
      const material_B = new THREE.MeshBasicMaterial({ transparent: true, color: '#18A2FF', opacity: 1 });
      this.circleB = new THREE.Mesh(geometry_B, material_B);
      this.circleB.position.set(-15, 0, 0);
      this.scene.add(this.circleB);

      //创建圆形A
      const geometry_A = new THREE.CircleBufferGeometry(10, 60);
      const material_A = new THREE.MeshBasicMaterial({ transparent: true, color: '#FF5A5A', opacity: 1 });
      this.circleA = new THREE.Mesh(geometry_A, material_A);
      this.circleA.position.set(-15, 0, 0);
      this.scene.add(this.circleA);

      this.initText();
      this.scale = this.circleA.scale.x;
      this.endPointA.x = this.pointA.position.x;
      this.endPointA.y = this.pointA.position.y;
      this.endPointA.radius = this.circleA.geometry.parameters.radius;
      this.offsetTextA.x = this.textA.position.x;
      this.offsetTextA.y = this.textA.position.y;
    }

    //初始化集合内的文字
    initText() {
      this.textA = ThreeUtil.createNewRomanText('A', -15, 8, 0, '#FFFFFF', 0.05);
      this.textB = ThreeUtil.createNewRomanText('B', -3, 14, 0, '#FFFFFF', 0.05);
      this.endTextA = ThreeUtil.createNewRomanText('A＝∅', -15, 0, 0, '#FFFFFF', 0.05);
      this.endTextA.visible = false;
      this.scene.add(this.textA);
      this.scene.add(this.textB);
      this.scene.add(this.endTextA);
      //集合属性文字
      const pointTextA = ThreeUtil.createNewRomanText('a', -2, 1.5, 0, '#FFFFFF', 0.05);
      const pointTextB = ThreeUtil.createNewRomanText('b', -2, 1.5, 0, '#FFFFFF', 0.05);

      this.pointA = ThreeUtil.createPoint(1.2, '#FFFFFF', -13, -2, 0.5);
      this.opacityA = ThreeUtil.createPoint(0.6, '#FFFFFF', 0, 0, 1);
      this.pointB = ThreeUtil.createPoint(1.2, '#FFFFFF', -34, 0, 0.5);
      this.opacityB = ThreeUtil.createPoint(0.6, '#FFFFFF', 0, 0, 1);

      this.pointA.add(pointTextA);
      this.pointA.add(this.opacityA);
      this.pointB.add(pointTextB);
      this.pointB.add(this.opacityB);
      this.pointA.position.z = 1;
      this.pointB.position.z = 1;
      this.pointB.visible = false;

      this.scene.add(this.pointA);
      this.scene.add(this.pointB);
      this.bindEvent();
    }

    //确定a点是否在圆内
    createBoundA(point: any): boolean {
      const radius = this.circleA.geometry.parameters.radius * this.scale;
      const center = {
        x: this.circleA.position.x,
        y: this.circleA.position.y
      };

      const x = point.x;
      const y = point.y;

      const a = Math.pow((x - center.x), 2) ;
      const b = Math.pow((y - center.y) , 2);
      const c = Math.pow(radius, 2);
      const d = a + b;

      if (d <= c ) {
        return true;
      } else {
        return false;
      }
    }
    //确定a点是否在大圆内，小圆外
    createBoundB(point: any): boolean {
      //既要大于小圆，小于大圆
      const minRadius = this.circleA.geometry.parameters.radius * this.scale;
      const bigRadius = this.circleB.geometry.parameters.radius;

      const minCenter = {
        x: this.circleA.position.x,
        y: this.circleA.position.y
      };
      const maxCenter = {
        x: this.circleB.position.x,
        y: this.circleB.position.y
      };

      const minA = Math.pow((point.x - minCenter.x), 2);
      const minB = Math.pow((point.y - minCenter.y) , 2);
      const minC = Math.pow(minRadius, 2);
      const minD = minA + minB;
      const isMinCircle = minD <= minC;

      //大圆B
      const maxA = Math.pow((point.x - maxCenter.x), 2);
      const maxB = Math.pow((point.y - maxCenter.y) , 2);
      const maxC = Math.pow(bigRadius, 2);
      const maxD = maxA + maxB;
      const isMaxCircle = maxD <= maxC;

      if (isMinCircle) {
        return false;
      } else {
        return isMaxCircle;
      }
    }

    bindEvent() {
        const dargPointA = new dragcontrols([this.pointA], this.camera, this.renderer.domElement);
        const dargPointB = new dragcontrols([this.pointB], this.camera, this.renderer.domElement);

        let isDrag = false;

        const lastPointA = {
          x: this.pointA.position.x,
          y: this.pointA.position.y
        };
        const lastPointB = {
          x: this.pointB.position.x,
          y: this.pointB.position.y
        };

        dargPointA.addEventListener( 'drag',  () => {
            this.endPointA.radius = this.circleA.geometry.parameters.radius * this.scale;
            if (this.createBoundA(this.pointA.position)) {
              lastPointA.x = this.pointA.position.x;
              lastPointA.y = this.pointA.position.y;
              this.endPointA.x = this.pointA.position.x;
              this.endPointA.y = this.pointA.position.y;
            }
            this.pointA.position.x = lastPointA.x;
            this.pointA.position.y = lastPointA.y;
        });

        dargPointB.addEventListener('dragstart', () => {
                isDrag = true;
        });

        dargPointB.addEventListener( 'drag',  () => {
          if (isDrag) {
            console.log(this.createBoundB(this.pointB.position));
            if (this.createBoundB(this.pointB.position)) {
              lastPointB.x = this.pointB.position.x;
              lastPointB.y = this.pointB.position.y;
            } else {
              isDrag = false;
            }
          }
          this.pointB.position.x = lastPointB.x;
          this.pointB.position.y = lastPointB.y;

        });

      dargPointB.addEventListener('dragend', () => {
            isDrag = true;
      });
    }
}
