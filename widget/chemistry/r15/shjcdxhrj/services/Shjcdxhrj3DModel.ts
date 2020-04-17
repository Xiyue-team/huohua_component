import * as THREE from 'three';
import {
  WebGLRenderer,
} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera, Scene} from 'three';
import * as img1 from '../sub_static/Material3825_baseColor.png';
import * as img2 from '../sub_static/Material3826_baseColor.png';
import * as img3 from '../sub_static/Material3827_baseColor.png';
import * as img4 from '../sub_static/Material3828_baseColor.png';

import * as qgModelGltf from '../sub_static/model.gltf';
import * as qgModelBin from '../sub_static/model.bin';

import * as blModelGltf from '../sub_static/bmodel.gltf';
import * as blModelBin from '../sub_static/bmodel.bin';

import {TweenMax} from 'gsap';
import { BrowserUtil } from '../../../../../src/util/BrowserUtil';

const OBJLoader = require('three-obj-loader');

const OrbitControls = require('three-orbitcontrols');
OBJLoader(THREE);

export class Shjcdxhrj3DModel extends ThreeBase {

    private obj1 = new THREE.Object3D();
    private obj2 = new THREE.Object3D();
    private orbit: any;
    private button1 = false;
    private button2 = false;

    protected animation: any = [];
    protected animationLine: any = [];

    private render = () => {
        this.renderer.render(this.scene, this.camera);
        setTimeout(this.render, 28);
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
        this.fov = !fov ? this.fov : fov;
        this.near = !near ? this.near : near;
        this.far = !far ? this.far : fov;
        this.width = !width ? window.innerWidth : width;
        this.height = !height ? window.innerHeight : height;
        this.domElement = domElement;
        console.log('init Simple3DModel constructor');
        this.init();

    }

    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.preload();
        this.initGltfLoader();
        this.render();

    }

    preload() {
      const temp = [];
      temp.push(img1);
      temp.push(img2);
      temp.push(img3);
      temp.push(img4);

      temp.push(qgModelGltf);
      temp.push(qgModelBin);
      temp.push(blModelGltf);
      temp.push(blModelBin);

      console.log('resources count:' + temp.length);
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xFFFFFF);
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {
        const left = this.width / -10;
        const right = this.width / 10;
        const top = this.height / 10;
        const bottom = this.height / -10;
        const near = 1;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 100);

        //适配手机端
        if (BrowserUtil.getBrowserInfo().isSmallDevice) {
            (this.camera as THREE.OrthographicCamera).zoom = 0.4;
            (this.camera as THREE.OrthographicCamera).updateProjectionMatrix();
        }

    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true});
        } else {
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
        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
        //是否开启右键拖拽
        this.orbit.enablePan = false;
        //是否开启左键旋转
        this.orbit.enableRotate = true;
        //启用或禁用缩放
        this.orbit.enableZoom = true;
        this.orbit.minZoom = 0.5;
        this.orbit.maxZoom = 1.5;
    }


    /**
     * 初始化光源
     */
    initLight(): void {
      this.lights = [];
      this.lights[0] = new THREE.DirectionalLight('#ffffff', 0.6);
      this.lights[0].position.set(0, 200, 200);
      this.lights[0].position.multiplyScalar( 30 );
      this.scene.add(this.lights[0]);
      this.lights[1] = new THREE.DirectionalLight('#ffffff', 0.5);
      this.lights[1].position.set(0, -200, -200);
      this.lights[1].position.multiplyScalar( 30 );
      this.scene.add(this.lights[1]);

      const light = new THREE.HemisphereLight( '#ffffff', '#f0f0f0', 0.8 );
      this.scene.add( light );
    }

    /*
    * 加载3d模型
    * */
    async initGltfLoader() {

       const qgModel = await this.gltfLoader(qgModelGltf as any);
       qgModel.scene.traverse((child: any) => {
         if (child instanceof Scene) {
           (child as any).position.set(0, 0, 0 ) ;
           //从左至右隐藏
           const lineMaterial =  (child.children[16] as any).material;
           const hBallMaterial = (child.children[11].children[0] as any).material;
           const oBallMaterial = (child.children[11].children[1] as any).material;
           const cBallMaterial = (child.children[11].children[2] as any).material;

           (child.children[16] as any).material = lineMaterial.clone();

           (child.children[9].children[0] as any).material = hBallMaterial.clone();
           (child.children[9].children[1] as any).material = oBallMaterial.clone();

           (child.children[0] as any).material = lineMaterial.clone();

           (child.children[11].children[0] as any).material = hBallMaterial.clone();
           (child.children[11].children[1] as any).material = oBallMaterial.clone();
           (child.children[11].children[2] as any).material = cBallMaterial.clone();

           (child.children[1] as any).material = lineMaterial.clone();

           (child.children[13].children[0] as any).material = hBallMaterial.clone();
           (child.children[13].children[1] as any).material = oBallMaterial.clone();

           (child.children[2] as any).material = lineMaterial.clone();

           (child.children[15].children[0] as any).material = hBallMaterial.clone();
           (child.children[15].children[1] as any).material = oBallMaterial.clone();
           (child.children[15].children[2] as any).material = cBallMaterial.clone();

           (child.children[3] as any).material = lineMaterial.clone();

           (child.children[10].children[0] as any).material = hBallMaterial.clone();
           (child.children[10].children[1] as any).material = oBallMaterial.clone();
           (child.children[10].children[2] as any).material = cBallMaterial.clone();

           (child.children[4] as any).material = lineMaterial.clone();

           (child.children[8].children[0] as any).material = hBallMaterial.clone();
           (child.children[8].children[1] as any).material = oBallMaterial.clone();

           (child.children[5] as any).material = lineMaterial.clone();

           (child.children[14].children[0] as any).material = hBallMaterial.clone();
           (child.children[14].children[1] as any).material = oBallMaterial.clone();
           (child.children[14].children[2] as any).material = cBallMaterial.clone();

           (child.children[6] as any).material = lineMaterial.clone();

           (child.children[12].children[0] as any).material = hBallMaterial.clone();
           (child.children[12].children[1] as any).material = oBallMaterial.clone();


           this.hideModel(child.children[16]);

           this.hideModel(child.children[9].children[0], child.children[9].children[1]);

           this.hideModel(child.children[0]);

           this.hideModel(child.children[11].children[0], child.children[11].children[1], child.children[11].children[2]);

           this.hideModel(child.children[1]);

           this.hideModel(child.children[13].children[0], child.children[13].children[1]);

           this.hideModel(child.children[2]);

           this.hideModel(child.children[15].children[0], child.children[15].children[1], child.children[15].children[2]);

           this.hideModel(child.children[3]);

           this.hideModel(child.children[10].children[0], child.children[10].children[1], child.children[10].children[2]);

           this.hideModel(child.children[4]);

           this.hideModel(child.children[8].children[0], child.children[8].children[1]);

           this.hideModel(child.children[5]);

           this.hideModel(child.children[14].children[0], child.children[14].children[1], child.children[14].children[2]);

           this.hideModel(child.children[6]);

           this.hideModel(child.children[12].children[0], child.children[12].children[1]);

           this.obj1.add(child);

         }
       });

      const blModel = await this.gltfLoader(blModelGltf as any);
        blModel.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                (child as any).position.set(0, 0, 0);
                //重新设置材质
                const lineMaterial =  (child.children[3] as any).material.clone();
                const hBallMaterial = (child.children[10].children[2] as any).material.clone();
                const oBallMaterial = (child.children[10].children[0] as any).material.clone();
                const cBallMaterial = (child.children[10].children[1] as any).material.clone();

                //重新设置线的材质
                (child.children[3] as any).material = lineMaterial.clone();
                (child.children[6] as any).material = lineMaterial.clone();
                (child.children[7] as any).material = lineMaterial.clone();
                (child.children[4] as any).material = lineMaterial.clone();
                (child.children[0] as any).material = lineMaterial.clone();
                (child.children[1] as any).material = lineMaterial.clone();
                (child.children[5] as any).material = lineMaterial.clone();
                (child.children[2] as any).material = lineMaterial.clone();

                //重新设置水的材质
                (child.children[16].children[0] as any).material = hBallMaterial.clone();
                (child.children[16].children[1] as any).material = oBallMaterial.clone();
                (child.children[9].children[0] as any).material = oBallMaterial.clone();
                (child.children[9].children[1] as any).material = hBallMaterial.clone();
                (child.children[11].children[0] as any).material = oBallMaterial.clone();
                (child.children[11].children[1] as any).material = hBallMaterial.clone();
                (child.children[15].children[0] as any).material = hBallMaterial.clone();
                (child.children[15].children[1] as any).material = oBallMaterial.clone();

                //重新设置甲醇的材质
                (child.children[10].children[0] as any).material = oBallMaterial.clone();
                (child.children[10].children[1] as any).material = cBallMaterial.clone();
                (child.children[10].children[2] as any).material = hBallMaterial.clone();
                (child.children[12].children[0] as any).material = cBallMaterial.clone();
                (child.children[12].children[1] as any).material = hBallMaterial.clone();
                (child.children[12].children[2] as any).material = oBallMaterial.clone();
                (child.children[13].children[0] as any).material = hBallMaterial.clone();
                (child.children[13].children[1] as any).material = oBallMaterial.clone();
                (child.children[13].children[2] as any).material = cBallMaterial.clone();
                (child.children[14].children[0] as any).material = hBallMaterial.clone();
                (child.children[14].children[1] as any).material = oBallMaterial.clone();
                (child.children[14].children[2] as any).material = cBallMaterial.clone();

                //隐藏比例模型
                //隐藏线
                this.hideModel(child.children[3]);
                this.hideModel(child.children[6]);
                this.hideModel(child.children[7]);
                this.hideModel(child.children[4]);
                this.hideModel(child.children[0]);
                this.hideModel(child.children[1]);
                this.hideModel(child.children[5]);
                this.hideModel(child.children[2]);
                //隐藏水
                this.hideModel(child.children[16].children[0], child.children[16].children[1]);
                this.hideModel(child.children[9].children[0], child.children[9].children[1]);
                this.hideModel(child.children[11].children[0], child.children[11].children[1]);
                this.hideModel(child.children[15].children[0], child.children[15].children[1]);
                //隐藏甲醇
                this.hideModel(child.children[10].children[0], child.children[10].children[1], child.children[10].children[2]);
                this.hideModel(child.children[12].children[0], child.children[12].children[1], child.children[12].children[2]);
                this.hideModel(child.children[13].children[0], child.children[13].children[1], child.children[13].children[2]);
                this.hideModel(child.children[14].children[0], child.children[14].children[1], child.children[14].children[2]);

                this.obj2.add(child);
            }
        });

        this.scene.add(this.obj1);
        this.scene.add(this.obj2);
        this.obj2.visible = false;

        this.initAnimation();

    }

    //初始隐藏模型
    hideModel(obj: any , obj1?: any, obj2?: any) {
        (obj as any).material.transparent = true;
        (obj as any).material.opacity = 0;
        obj.visible = false;
        if (obj1) {
            (obj1 as any).material.transparent = true;
            (obj1 as any).material.opacity = 0;
            obj1.visible = false;
        }
        if (obj2) {
            (obj2 as any).material.transparent = true;
            (obj2 as any).material.opacity = 0;
            obj2.visible = false;
        }
    }

    changeToQGModel() {
        this.obj1.visible = true;
        this.obj2.visible = false;
    }

    changeToBLModel() {
        this.obj1.visible = false;
        this.obj2.visible = true;
    }

    //显示隐藏的模型
    //计数器一
    showHidedModel1(value: number) {
        switch (value) {
          case 1:
              this.animation[0].play();
              this.animation[8].play();
              break;
          case 2:
            this.animation[3].play();
            this.animation[13].play();
              break;
          case 3:
            this.animation[4].play();
            this.animation[10].play();
              break;
          case 4:
            this.animation[7].play();
            this.animation[15].play();
              break;

        }
    }

  //计数器二
    showHidedModel2(value: number) {
    switch (value) {
      case 1:
          this.animation[1].play();
        this.animation[12].play();
        break;
      case 2:
        this.animation[2].play();
        this.animation[9].play();
        break;
      case 3:
        this.animation[5].play();
        this.animation[14].play();
        break;
      case 4:
        this.animation[6].play();
        this.animation[11].play();
        break;

    }
  }


    initAnimation() {
        //左一水
        this.animationLine[0] = this.lineAnimation((this.obj1.children[0].children[16] as any), 1);
        this.animation[0] = this.hidingModelEasingOut(this.animationLine[0], (this.obj1.children[0].children[9].children[0] as any),
          (this.obj1.children[0].children[9].children[1] as any), );

        //右一甲基
        this.animationLine[1] = this.lineAnimation((this.obj1.children[0].children[3] as any), 1);
        this.animation[1] = this.hidingModelEasingOut(this.animationLine[1], (this.obj1.children[0].children[10].children[0] as any),
          (this.obj1.children[0].children[10].children[1] as any), (this.obj1.children[0].children[10].children[2] as any));

        //左二甲基
        this.animationLine[2] = this.lineAnimation((this.obj1.children[0].children[0] as any), 1);
        this.animation[2] = this.hidingModelEasingOut(this.animationLine[2], (this.obj1.children[0].children[11].children[0] as any),
        (this.obj1.children[0].children[11].children[1] as any), (this.obj1.children[0].children[11].children[2] as any));

        //右二水
        this.animationLine[3] = this.lineAnimation((this.obj1.children[0].children[4] as any), 1);
        this.animation[3] = this.hidingModelEasingOut(this.animationLine[3], (this.obj1.children[0].children[8].children[0] as any),
        (this.obj1.children[0].children[8].children[1] as any), );

        //左三水
        this.animationLine[4] = this.lineAnimation((this.obj1.children[0].children[1] as any), 1);
        this.animation[4] = this.hidingModelEasingOut(this.animationLine[4], (this.obj1.children[0].children[13].children[0] as any),
        (this.obj1.children[0].children[13].children[1] as any), );

        //右三甲基
        this.animationLine[5] = this.lineAnimation((this.obj1.children[0].children[5] as any), 1);
        this.animation[5] = this.hidingModelEasingOut(this.animationLine[5], (this.obj1.children[0].children[14].children[0] as any),
        (this.obj1.children[0].children[14].children[1] as any), (this.obj1.children[0].children[14].children[2] as any));


        //左四甲基
        this.animationLine[6] = this.lineAnimation((this.obj1.children[0].children[2] as any), 1);
        this.animation[6] = this.hidingModelEasingOut(this.animationLine[6], (this.obj1.children[0].children[15].children[0] as any),
        (this.obj1.children[0].children[15].children[1] as any), (this.obj1.children[0].children[15].children[2] as any));

        //右四水
        this.animationLine[7] = this.lineAnimation((this.obj1.children[0].children[6] as any), 1);
        this.animation[7] = this.hidingModelEasingOut(this.animationLine[7], (this.obj1.children[0].children[12].children[0] as any),
        (this.obj1.children[0].children[12].children[1] as any), );


        //比例左一水
        this.animationLine[8] = this.lineAnimation((this.obj2.children[0].children[3] as any), 1);
        this.animation[8] = this.hidingModelEasingOut(this.animationLine[8], (this.obj2.children[0].children[16].children[0] as any),
          (this.obj2.children[0].children[16].children[1] as any));

        //左二甲基
        this.animationLine[9] = this.lineAnimation((this.obj2.children[0].children[6] as any), 1);
        this.animation[9] = this.hidingModelEasingOut(this.animationLine[9], (this.obj2.children[0].children[10].children[0] as any),
        (this.obj2.children[0].children[10].children[1] as any), (this.obj2.children[0].children[10].children[2] as any));

        //左三水
        this.animationLine[10] = this.lineAnimation((this.obj2.children[0].children[7] as any), 1);
        this.animation[10] = this.hidingModelEasingOut(this.animationLine[10], (this.obj2.children[0].children[9].children[0] as any),
        (this.obj2.children[0].children[9].children[1] as any));

        //左四甲基
        this.animationLine[11] = this.lineAnimation((this.obj2.children[0].children[4] as any), 1);
        this.animation[11] = this.hidingModelEasingOut(this.animationLine[11], (this.obj2.children[0].children[12].children[0] as any),
        (this.obj2.children[0].children[12].children[1] as any), (this.obj2.children[0].children[12].children[2] as any));

        //右一甲基
        this.animationLine[12] = this.lineAnimation((this.obj2.children[0].children[0] as any), 1);
        this.animation[12] = this.hidingModelEasingOut(this.animationLine[12], (this.obj2.children[0].children[13].children[0] as any),
        (this.obj2.children[0].children[13].children[1] as any), (this.obj2.children[0].children[13].children[2] as any));

        //右二水
        this.animationLine[13] = this.lineAnimation((this.obj2.children[0].children[1] as any), 1);
        this.animation[13] = this.hidingModelEasingOut(this.animationLine[13], (this.obj2.children[0].children[11].children[0] as any),
        (this.obj2.children[0].children[11].children[1] as any));

        //右三甲基
        this.animationLine[14] = this.lineAnimation((this.obj2.children[0].children[5] as any), 1);
        this.animation[14] = this.hidingModelEasingOut(this.animationLine[14], (this.obj2.children[0].children[14].children[0] as any),
        (this.obj2.children[0].children[14].children[1] as any), (this.obj2.children[0].children[14].children[2] as any));

        //右四水
        this.animationLine[15] = this.lineAnimation((this.obj2.children[0].children[2] as any), 1);
        this.animation[15] = this.hidingModelEasingOut(this.animationLine[15], (this.obj2.children[0].children[15].children[0] as any),
        (this.obj2.children[0].children[15].children[1] as any));
    }

    //隐藏模型淡出
    hidingModelEasingOut(anim: any, obj1?: any, obj2?: any, obj3?: any) {
      const tween = {
        opacity: 0,
      };
      const animation = TweenMax.to(tween, 1, {
        opacity: 1,
        onUpdate: () => {
          if (obj1) {
            obj1.visible = true;
            obj1.material.opacity = tween.opacity;
          }
          if (obj2) {
            obj2.visible = true;
            obj2.material.opacity = tween.opacity;
          }
          if (obj3) {
            obj3.visible = true;
            obj3.material.opacity = tween.opacity;
          }
        },

        onComplete: () => {
          anim.play();
        },
        paused: true
      });
       return animation;
    }

    //线模型淡出
    lineAnimation(mesh: THREE.Mesh, time: number) {
      const tween = {
        opacity: 0,
      };

      const tweenAnimation = TweenMax.to(tween, time, {
        opacity: 1,
        onStart: () => {
          mesh.visible = true;
        },

        onUpdate: () => {
          (mesh as any).material.opacity = tween.opacity;
        },

        onComplete: () => {
          if (!((window as any).viewHandler.viewModel.$data.counterNum2 === 4 &&
            (window as any).viewHandler.viewModel.$data.counterNum1 === 4)) {
            if (this.button1) {
              (window as any).viewHandler.viewModel.$data.disabled2 = false;
              (window as any).viewHandler.viewModel.$data.disabled4 = false;
            }
            if (this.button2) {
              (window as any).viewHandler.viewModel.$data.disabled1 = false;
              (window as any).viewHandler.viewModel.$data.disabled3 = false;
            }
          }
        },

        paused: true
      });

      return tweenAnimation;
    }

    ctrlButton(buttonCtrl1: boolean, buttonCtrl2: boolean) {
      this.button1 = buttonCtrl1;
      this.button2 = buttonCtrl2;
    }


    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    //重置隐藏模型
    hideTransparentModel(obj1: any, obj2?: any, obj3?: any) {
      (obj1 as any).visible = false;
      if (obj2) {
       (obj2 as any).visible = false;
      }
      if (obj3) {
      (obj3 as any).visible = false;
      }
  }

    clickEvent1 () {
      (window as any).viewHandler.viewModel.counterPlus1();
      (window as any).viewHandler.viewModel.$data.disabled2 = true;
      (window as any).viewHandler.viewModel.$data.disabled4 = true;
      (window as any).viewHandler.viewModel.$data.disabled1 = true;
      (window as any).viewHandler.viewModel.$data.disabled3 = true;
    }

    clickEvent2 () {
      (window as any).viewHandler.viewModel.counterPlus2();
      (window as any).viewHandler.viewModel.$data.disabled2 = true;
      (window as any).viewHandler.viewModel.$data.disabled4 = true;
      (window as any).viewHandler.viewModel.$data.disabled1 = true;
      (window as any).viewHandler.viewModel.$data.disabled3 = true;
    }

  reset() {
      this.orbit.reset();
      this.obj1.visible = true;
      this.obj2.visible = false;
    for (let i = 0; i < 16; i++) {
      this.animation[i].progress(0);
      this.animation[i].pause();
      this.animationLine[i].progress(0);
      this.animationLine[i].pause();
    }

    //球棍模型
    this.hideTransparentModel(this.obj1.children[0].children[16]);
    this.hideTransparentModel(this.obj1.children[0].children[9].children[0], this.obj1.children[0].children[9].children[1]);
    this.hideTransparentModel(this.obj1.children[0].children[0]);
    this.hideTransparentModel(this.obj1.children[0].children[11].children[0], this.obj1.children[0].children[11].children[1]);
    this.hideTransparentModel(this.obj1.children[0].children[1]);
    this.hideTransparentModel(this.obj1.children[0].children[13].children[0], this.obj1.children[0].children[13].children[1]);
    this.hideTransparentModel(this.obj1.children[0].children[2]);
    this.hideTransparentModel(this.obj1.children[0].children[15].children[0], this.obj1.children[0].children[15].children[1],
      this.obj1.children[0].children[15].children[2]);
    this.hideTransparentModel(this.obj1.children[0].children[3]);
    this.hideTransparentModel(this.obj1.children[0].children[10].children[0], this.obj1.children[0].children[10].children[1],
      this.obj1.children[0].children[10].children[2]);
    this.hideTransparentModel(this.obj1.children[0].children[4]);
    this.hideTransparentModel(this.obj1.children[0].children[8].children[0], this.obj1.children[0].children[8].children[1]);
    this.hideTransparentModel(this.obj1.children[0].children[5]);
    this.hideTransparentModel(this.obj1.children[0].children[14].children[0], this.obj1.children[0].children[14].children[1],
      this.obj1.children[0].children[14].children[2]);
    this.hideTransparentModel(this.obj1.children[0].children[6]);
    this.hideTransparentModel(this.obj1.children[0].children[12].children[0], this.obj1.children[0].children[12].children[1]);

    //比例模型
    this.hideTransparentModel(this.obj2.children[0].children[0]);
    this.hideTransparentModel(this.obj2.children[0].children[1]);
    this.hideTransparentModel(this.obj2.children[0].children[2]);
    this.hideTransparentModel(this.obj2.children[0].children[3]);
    this.hideTransparentModel(this.obj2.children[0].children[4]);
    this.hideTransparentModel(this.obj2.children[0].children[5]);
    this.hideTransparentModel(this.obj2.children[0].children[6]);
    this.hideTransparentModel(this.obj2.children[0].children[7]);

    this.hideTransparentModel(this.obj2.children[0].children[9].children[0], this.obj2.children[0].children[9].children[1]);
    this.hideTransparentModel(this.obj2.children[0].children[10].children[0], this.obj2.children[0].children[10].children[1],
      this.obj2.children[0].children[10].children[2]);
    this.hideTransparentModel(this.obj2.children[0].children[11].children[0], this.obj2.children[0].children[11].children[1]);
    this.hideTransparentModel(this.obj2.children[0].children[12].children[0], this.obj2.children[0].children[12].children[1],
      this.obj2.children[0].children[12].children[2]);
    this.hideTransparentModel(this.obj2.children[0].children[13].children[0], this.obj2.children[0].children[13].children[1],
      this.obj2.children[0].children[13].children[2]);
    this.hideTransparentModel(this.obj2.children[0].children[14].children[0], this.obj2.children[0].children[14].children[1],
      this.obj2.children[0].children[14].children[2]);
    this.hideTransparentModel(this.obj2.children[0].children[15].children[0], this.obj2.children[0].children[15].children[1]);
    this.hideTransparentModel(this.obj2.children[0].children[16].children[0], this.obj2.children[0].children[16].children[1]);

  }
}
