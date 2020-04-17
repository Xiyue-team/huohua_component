import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as dianLFBX from '../sub_static/dianliu.fbx';
import * as imgTu from '../sub_static/tu.jpg';
import { Model3dAnimation } from '../../../../../src/three/component/Model3dAnimation';

export class Aplfx3dModel extends ThreeBase {

    private orbit: any;
    bArrow: any;
    fArrow: any;
    fCone: any;
    fText: any;
    //模型动画对象
    animation: any;

      static preload() {
        const modelArray = [dianLFBX, imgTu];
        console.log(modelArray.length);
      }

    /**
     *
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */

    constructor(domElement: Element, fov?: number, width?: number, height?: number, near?: number, far?: number) {
        super();
        this.fov     = !fov    ? this.fov       :  fov;
        this.near    = !near   ? this.near      :  near;
        this.far     = !far    ? this.far       :  fov;
        this.width   = !width  ? window.innerWidth     :  width;
        this.height  = !height ? window.innerHeight    :  height;
        this.domElement = domElement;
        console.log('init Simple3DModel constructor');
        this.init();
    }

    private render = () => {
        requestAnimationFrame(this.render);
          if (this.animation) {
            this.animation.renderModel();
          }
        this.renderer.render( this.scene,  this.camera );
    }

    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.initFBXLoader();
        this.createBArrow();
        this.createFArrow(Math.PI / 2);
        this.render();
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x4B4B4B);
    }

    initLight() {
          const ambientLight = new THREE.AmbientLight( 0xffffff, 1);
          this.scene.add(ambientLight);

          const dirLight = new THREE.DirectionalLight( '#ffffff', 0.5);
          dirLight.position.set( 100, 100, 100 );
          this.scene.add( dirLight );

          const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.4);
          dirLight2.position.set( -100, -100, -100 );
          this.scene.add( dirLight2 );
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near    = 0.1;
        const far     = 2000;
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(30,  50,  450);
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer( { antialias:  true } );
        }  else  {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    /**
     * 初始化控制器
     */
    initControl(): void {
      this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
      this.orbit.enableZoom = true;
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.orbit.enableDamping = true;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      //controls.dampingFactor = 0.25;
      //是否可以缩放
      this.orbit.enableZoom = false;
      //是否自动旋转
      this.orbit.autoRotate = true;
      //设置相机距离原点的最远距离
      this.orbit.minDistance = 1;
      //设置相机距离原点的最远距离
      this.orbit.maxDistance = 4000;
      //是否开启右键拖拽
      this.orbit.enablePan = false;
      //是否开启左键旋转
      this.orbit.enableRotate = true;
    }

      // 加载模型
      async initFBXLoader()  {
        const dianL_FBX: any = await this.fbxLoader(dianLFBX as any);
        dianL_FBX.scale.set(3, 3, 3);
        this.scene.add(dianL_FBX);

        this.animation = new Model3dAnimation(dianL_FBX);
        this.animation.playAnimation(0);
      }

    //绘制带箭头的线段B
    createBArrow() {
        const pinkColor = '#FF5858';
        const bCone = ThreeUtil.createCone(3, 20, pinkColor, 0, 100, 0);
        this.bArrow = ThreeUtil.createCylinder(1, 1, 200, pinkColor, 0, 13, 0);
        this.bArrow.rotateX(-Math.PI / 2);
        this.bArrow.rotateZ(-Math.PI / 2);
        const bText = ThreeUtil.createNewRomanText('B', 20, 90, 0, pinkColor, 0.3);
        const iText = ThreeUtil.createNewRomanText('I', 120, 10, 20, '#FFF701', 0.3);
        this.scene.add(iText);
        this.bArrow.add(bText);
        this.bArrow.add(bCone);
        this.scene.add(this.bArrow);

    }

    //绘制带箭头的线段F
    createFArrow(angle: number) {
        const whiteColor = '#FFFFFF';
        const B = 10;
        const I = 10;
        const L = 1;
        this.fArrow = ThreeUtil.createCylinder(1, 1, B * I * L * Math.sin(angle), whiteColor);
        this.fCone = ThreeUtil.createCone(3, 10, whiteColor, 0, B * I * L * Math.sin(angle) / 2, 0);
        this.fText = ThreeUtil.createNewRomanText('F', -20, B * I * L * Math.sin(angle) / 2 + 20, 0, whiteColor, 0.3);

        this.fArrow.visible = false;
        this.fCone.visible = false;
        this.fText.visible = false;

        //超过180度后箭头向下
        if (angle > Math.PI && angle < Math.PI * 2) {
           this.fCone.rotateX(Math.PI);
        } else if (angle > Math.PI * 2) {
          this.fCone.rotateX(0);
        }

        this.fArrow.add(this.fCone);
        this.fArrow.add(this.fText);
        this.fCone.position.set(0, B * I * L * Math.sin(angle) / 2, 0);
        this.fArrow.position.set(0, B * I * L * Math.sin(angle) / 2 + 13, 0);
        this.scene.add(this.fArrow);
    }

    //删除对象
    deleteFArrow(obj: any) {
        if (obj) {
          obj.geometry.dispose();
          obj.material.dispose();
          this.scene.remove(obj);
        }
    }

    //旋转右侧箭头带动箭头B旋转
    rotatebArrowByNedle(angle: number) {
        this.bArrow.rotateZ(angle / 180 * Math.PI);
    }

    //旋转右侧箭头改变箭头F的长度
    changeFArrowLength(angle: number) {
          this.deleteFArrow(this.fArrow);
          this.createFArrow(angle / 180 * Math.PI);
          const deg = Math.round(angle);

          if (deg === 180 || deg === 0) {
            this.fArrow.visible = false;
            this.fCone.visible = false;
            this.fText.visible = false;
          } else {
            this.fArrow.visible = true;
            this.fCone.visible = true;
            this.fText.visible = true;
          }
    }

    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

      resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(-20, 20, 0);

        for (let i = 0; i < 11; i++) {
          this.orbit.reset();
        }
      }

    reset() {
          this.fArrow.visible = false;
          this.fCone.visible = false;
          this.fText.visible = false;
          this.deleteFArrow(this.bArrow);
          this.createBArrow();
          this.resetCamera();
    }

}




