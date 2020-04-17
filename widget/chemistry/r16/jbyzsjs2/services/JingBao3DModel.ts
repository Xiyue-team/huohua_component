import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const OrbitControls = require('three-orbitcontrols');

OBJLoader(THREE);
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';

import * as yellow from '../sub_static/model/yellow_baseColor.png';
import * as blue from '../sub_static/model/blue_baseColor.png';
import * as darkBlue from '../sub_static/model/darkblue_baseColor.png';

import * as jb1BinA from '../sub_static/model/jingbao1.bin';
import * as jb1GltfA from '../sub_static/model/jingbao1.gltf';

import * as jb2BinA from '../sub_static/model/jingbao2-A.bin';
import * as jb2GltfA from '../sub_static/model/jingbao2-A.gltf';

import * as jb3BinA from '../sub_static/model/jingbao3-A.bin';
import * as jb3GltfA from '../sub_static/model/jingbao3-A.gltf';

import * as jb1BinB from '../sub_static/model/jingbao1-B.bin';
import * as jb1GltfB from '../sub_static/model/jingbao1-B.gltf';

import * as jb2BinB from '../sub_static/model/jingbao2-B.bin';
import * as jb2GltfB from '../sub_static/model/jingbao2-B.gltf';

import * as jb3BinB from '../sub_static/model/jingbao3-B.bin';
import * as jb3GltfB from '../sub_static/model/jingbao3-B.gltf';

import * as jb1BinC from '../sub_static/model/jingbai1-C.bin';
import * as jb1GltfC from '../sub_static/model/jingbai1-C.gltf';

import * as jb2BinC from '../sub_static/model/jingbao2-C.bin';
import * as jb2GltfC from '../sub_static/model/jingbao2-C.gltf';

import * as jb3FBXC from '../sub_static/model/jingbao3-C.fbx';
import * as hImg from '../sub_static/model/H.png';
import * as slImg from '../sub_static/model/SL.png';

import * as jb1BinD from '../sub_static/model/jingbao1-D.bin';
import * as jb1GltfD from '../sub_static/model/jingbao1-D.gltf';

import * as jb2BinD from '../sub_static/model/jingbao2-D.bin';
import * as jb2GltfD from '../sub_static/model/jingbao2-D.gltf';

import * as jb3FBXD from '../sub_static/model/jingbao3-D.fbx';

import {Scene} from 'three';
import { ModelAnimationGroup } from '../../../../../src/three/component/ModelAnimationGroup';
import { TweenMax } from 'gsap';
import { Model3dAnimation } from '../../../../../src/three/component/Model3dAnimation';

export class JingBao3DModel extends ThreeBase {

    browserInfo: BrowserInfo;

    private orbit: any;

    // 晶胞切割动画
    private cuttingAnimation1: any;
    private cuttingAnimation2: any;
    private cuttingAnimation3: any;
    private cuttingAnimation4: any;

    animation1: any;
    animation2: any;
    animation3: any;
    animation4: any;

    obj1 = new THREE.Object3D();
    obj2 = new THREE.Object3D();
    obj3 = new THREE.Object3D();
    obj4 = new THREE.Object3D();

    static preload() {
        const modelArray = [jb1BinA, jb1GltfA, darkBlue, jb2BinA, jb2GltfA, yellow, jb3BinA,
          jb3GltfA, jb1BinB, jb1GltfB, jb2BinB, jb2GltfB, jb3BinB, jb3GltfB, jb1BinC, jb1GltfC,
          jb2BinC, jb2GltfC, jb3FBXC, hImg, slImg, jb1BinD, jb1GltfD, jb2BinD, jb2GltfD, jb3FBXD, blue];
        console.log(modelArray.length);
    }

    private render = () => {
        requestAnimationFrame( this.render );
          if (this.animation1) {
            this.animation1.renderModel();
          }
          if (this.animation2) {
            this.animation2.renderModel();
          }

          if (this.animation3) {
            this.animation3.renderModel();
          }

          if (this.animation4) {
            this.animation4.renderModel();
          }
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
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.init();
    }

     init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.initGltfLoader();
        this.render();
    }

    /**
     *
     * 初始化场景
     */
    initScene(): void {
        this.scene = new THREE.Scene();
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        this.camera =  new THREE.PerspectiveCamera(45, this.width / this.height, 1, 5000);
        this.camera.lookAt(0, 0, 0);
        this.camera.position.set(0, 0, 200);
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
    }

    /**
     * 初始化光源
     */
    initLight(): void {

      this.lights = [];

      this.lights.push(new THREE.AmbientLight( 0xffffff, 0.6));

      this.scene.add(this.lights[0]);

      const directionalLight4 = new THREE.HemisphereLight( '#ffffff', '#ffffff', 0.2 );
      directionalLight4.color.setHSL(.6, 1, .6);
      directionalLight4.groundColor.setHSL(.095, 1, .75);
      directionalLight4.position.set(0, 0, 0);
      this.scene.add( directionalLight4 );

      const dirLight = new THREE.DirectionalLight( '#ffffff', 0.06);
      dirLight.position.set( 100, 0, 100 );
      this.scene.add( dirLight );

      const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.06);
      dirLight2.position.set( -100, 0, -100 );
      this.scene.add( dirLight2 );
    }

    // 加载模型
    async initGltfLoader()  {
        //选项A
        //切割后模型
        const jb1_A: any = await this.gltfLoader(jb1GltfA as any);
        jb1_A.scene.traverse((child: any) => {
            if (child instanceof Scene) {
                this.obj1.add(child);
            }
        });

        //初始模型
        const jb2_A: any = await this.gltfLoader(jb2GltfA as any);
        jb2_A.scene.traverse((child: any) => {
          if (child instanceof Scene) {
             this.obj1.add(child);
            }
          });

          //动画模型
          const jb3_A: any = await this.gltfLoader(jb3GltfA as any);
          jb3_A.scene.traverse((child: any) => {
            if (child instanceof Scene) {
              this.obj1.add(child);
            }
          });


        //   选项B
        // 切割后模型
        const jb1_B: any = await this.gltfLoader(jb1GltfB as any);
        jb1_B.scene.traverse((child: any) => {
          if (child instanceof Scene) {
            this.obj2.add(child);
          }
        });

        //初始模型
        const jb2_B: any = await this.gltfLoader(jb2GltfB as any);
        jb2_B.scene.traverse((child: any) => {
          if (child instanceof Scene) {
            this.obj2.add(child);
          }
        });

        //动画模型
        const jb3_B: any = await this.gltfLoader(jb3GltfB as any);
        jb3_B.scene.traverse((child: any) => {
          if (child instanceof Scene) {
            this.obj2.add(child);
          }
        });

          //选项C
          //切割后模型
          const jb1_C: any = await this.gltfLoader(jb1GltfC as any);
          jb1_C.scene.traverse((child: any) => {
            if (child instanceof Scene) {
              this.obj3.add(child);
            }
          });

          //初始模型
          const jb2_C: any = await this.gltfLoader(jb2GltfC as any);
          jb2_C.scene.traverse((child: any) => {
            if (child instanceof Scene) {
              this.obj3.add(child);
            }
          });

          //动画模型
          const jb3_C: any = await this.fbxLoader(jb3FBXC as any);
          this.obj3.add(jb3_C);


          //选项D
          //切割后模型
          const jb1_D: any = await this.gltfLoader(jb1GltfD as any);
          jb1_D.scene.traverse((child: any) => {
            if (child instanceof Scene) {
              this.obj4.add(child);
            }
          });

          //初始模型
          const jb2_D: any = await this.gltfLoader(jb2GltfD as any);
          jb2_D.scene.traverse((child: any) => {
            if (child instanceof Scene) {
              this.obj4.add(child);
            }
          });

          //动画模型
          const jb3_D: any = await this.fbxLoader(jb3FBXD as any);
          this.obj4.add(jb3_D);

          (window as any).viewHandler.viewModel.$data.loadModel = true;

          this.obj1.children[0].visible = false;
          this.obj1.children[1].visible = true;
          this.obj1.children[2].visible = false;
          this.scene.add(this.obj1);

          this.obj2.children[0].visible = false;
          this.obj2.children[1].visible = true;
          this.obj2.children[2].visible = false;
          this.scene.add(this.obj2);

          this.obj3.children[0].visible = false;
          this.obj3.children[1].visible = true;
          this.obj3.children[2].visible = false;
          this.scene.add(this.obj3);

          this.obj4.children[0].visible = false;
          this.obj4.children[1].visible = true;
          this.obj4.children[2].visible = false;
          this.scene.add(this.obj4);

          this.initMaterial();

          this.animation1 = new ModelAnimationGroup(jb3_A);
          this.animation1.setLoopOne(0);
          this.animation1.setAnimationDoubleSpeed(0, 0.3);

          this.animation2 = new ModelAnimationGroup(jb3_B);
          this.animation2.setLoopOne(0);
          this.animation2.setAnimationDoubleSpeed(0, 0.3);

          this.animation3 = new Model3dAnimation(jb3_C);
          this.animation3.setLoopOne(0);
          this.animation3.setAnimationDoubleSpeed(1);

          this.animation4 = new Model3dAnimation(jb3_D);
          this.animation4.setLoopOne(0);
          this.animation4.setAnimationDoubleSpeed(2);

          this.cuttingEvent();
          this.cuttingEvent2();
          this.cuttingEvent3();
          this.cuttingEvent4();
    }

    initMaterial() {
          const darkBlueMaterial = new THREE.MeshPhongMaterial({color : '#367693', specular: '#0f3b4e', shininess: 30});
          const skyBlueMaterial = new THREE.MeshPhongMaterial({color : '#43add3', specular: '#147090', shininess: 30});
          const yellowMaterial = new THREE.MeshPhongMaterial({color : '#faf2de', specular: '#ceb87d', shininess: 30});

          //选项A
          (this.obj1.children[0].children[0] as any).material = yellowMaterial.clone().clone();
          (this.obj1.children[0].children[0].children[0] as any).material = darkBlueMaterial.clone();

          (this.obj1.children[1].children[0] as any).material = yellowMaterial.clone();
          (this.obj1.children[1].children[0].children[0] as any).material = darkBlueMaterial.clone();

          (this.obj1.children[2].children[0] as any).material = darkBlueMaterial.clone();
          (this.obj1.children[2].children[1] as any).material = darkBlueMaterial.clone();
          (this.obj1.children[2].children[2] as any).material = darkBlueMaterial.clone();
          (this.obj1.children[2].children[3] as any).material = darkBlueMaterial.clone();
          (this.obj1.children[2].children[4] as any).material = darkBlueMaterial.clone();
          (this.obj1.children[2].children[5] as any).material = darkBlueMaterial.clone();
          (this.obj1.children[2].children[6] as any).material = darkBlueMaterial.clone();
          (this.obj1.children[2].children[7] as any).material = darkBlueMaterial.clone();

          for (let i = 0; i < this.obj1.children[2].children.length; i++) {
            (this.obj1.children[2].children[i] as any).material.transparent = true;
          }

          //选项B
          (this.obj2.children[0].children[0].children[0].children[0] as any).material = yellowMaterial.clone();
          (this.obj2.children[0].children[0].children[0].children[0].children[0] as any).material = darkBlueMaterial.clone();

          (this.obj2.children[1].children[0] as any).material = yellowMaterial.clone();
          (this.obj2.children[1].children[0].children[0] as any).material = darkBlueMaterial.clone();

          (this.obj2.children[2].children[0] as any).material = yellowMaterial.clone();
          (this.obj2.children[2].children[1] as any).material = darkBlueMaterial.clone();
          (this.obj2.children[2].children[2] as any).material = darkBlueMaterial.clone();
          (this.obj2.children[2].children[3] as any).material = darkBlueMaterial.clone();
          (this.obj2.children[2].children[4] as any).material = darkBlueMaterial.clone();
          (this.obj2.children[2].children[5] as any).material = yellowMaterial.clone();
          (this.obj2.children[2].children[6] as any).material = yellowMaterial.clone();
          (this.obj2.children[2].children[7] as any).material = yellowMaterial.clone();

          for (let i = 0; i < this.obj2.children[2].children.length; i++) {
            (this.obj2.children[2].children[i] as any).material.transparent = true;
          }

          //选项C
          (this.obj3.children[0].children[0] as any).material = yellowMaterial.clone();
          (this.obj3.children[0].children[0].children[0] as any).material = skyBlueMaterial.clone();
          (this.obj3.children[0].children[0].children[1] as any).material = darkBlueMaterial.clone();

          (this.obj3.children[1].children[0] as any).material = yellowMaterial.clone();
          (this.obj3.children[1].children[0].children[0] as any).material = darkBlueMaterial.clone();
          (this.obj3.children[1].children[0].children[1] as any).material = skyBlueMaterial.clone();

          (this.obj3.children[2].children[0] as any).material = yellowMaterial.clone();
          (this.obj3.children[2].children[1] as any).material = yellowMaterial.clone();
          (this.obj3.children[2].children[2] as any).material = yellowMaterial.clone();
          (this.obj3.children[2].children[3] as any).material = yellowMaterial.clone();
          (this.obj3.children[2].children[4] as any).material = yellowMaterial.clone();
          (this.obj3.children[2].children[5] as any).material = yellowMaterial.clone();
          (this.obj3.children[2].children[6] as any).material = yellowMaterial.clone();
          (this.obj3.children[2].children[7] as any).material = yellowMaterial.clone();
          (this.obj3.children[2].children[8] as any).material = darkBlueMaterial.clone();
          (this.obj3.children[2].children[9] as any).material = darkBlueMaterial.clone();
          (this.obj3.children[2].children[10] as any).material = darkBlueMaterial.clone();
          (this.obj3.children[2].children[11] as any).material = darkBlueMaterial.clone();
          (this.obj3.children[2].children[12] as any).material = darkBlueMaterial.clone();
          (this.obj3.children[2].children[13] as any).material = darkBlueMaterial.clone();

          for (let i = 0; i < 14; i++) {
            (this.obj3.children[2].children[i] as any).material.transparent = true;
          }

          //选项D
          (this.obj4.children[0].children[0] as any).material = yellowMaterial.clone();
          (this.obj4.children[0].children[0].children[0] as any).material = skyBlueMaterial.clone();
          (this.obj4.children[0].children[0].children[1] as any).material = darkBlueMaterial.clone();

          (this.obj4.children[1].children[0] as any).material = yellowMaterial.clone();
          (this.obj4.children[1].children[0].children[0] as any).material = darkBlueMaterial.clone();
          (this.obj4.children[1].children[0].children[1] as any).material = skyBlueMaterial.clone();

          (this.obj4.children[2].children[0] as any).material = yellowMaterial.clone();
          (this.obj4.children[2].children[1] as any).material = yellowMaterial.clone();
          (this.obj4.children[2].children[2] as any).material = yellowMaterial.clone();
          (this.obj4.children[2].children[3] as any).material = yellowMaterial.clone();
          (this.obj4.children[2].children[4] as any).material = yellowMaterial.clone();
          (this.obj4.children[2].children[5] as any).material = yellowMaterial.clone();
          (this.obj4.children[2].children[6] as any).material = yellowMaterial.clone();
          (this.obj4.children[2].children[7] as any).material = yellowMaterial.clone();
          (this.obj4.children[2].children[8] as any).material = darkBlueMaterial.clone();
          (this.obj4.children[2].children[9] as any).material = darkBlueMaterial.clone();
          (this.obj4.children[2].children[10] as any).material = darkBlueMaterial.clone();
          (this.obj4.children[2].children[11] as any).material = darkBlueMaterial.clone();
          (this.obj4.children[2].children[12] as any).material = darkBlueMaterial.clone();
          (this.obj4.children[2].children[13] as any).material = darkBlueMaterial.clone();
          (this.obj4.children[2].children[14] as any).material = darkBlueMaterial.clone();
          (this.obj4.children[2].children[15] as any).material = darkBlueMaterial.clone();
          (this.obj4.children[2].children[16] as any).material = darkBlueMaterial.clone();
          (this.obj4.children[2].children[17] as any).material = darkBlueMaterial.clone();
          (this.obj4.children[2].children[18] as any).material = darkBlueMaterial.clone();
          (this.obj4.children[2].children[19] as any).material = darkBlueMaterial.clone();

          for (let i = 0; i < 20; i++) {
            (this.obj4.children[2].children[i] as any).material.transparent = true;
          }
    }

        //晶胞切割动画
        cuttingEvent() {
            const tween = {
              opacity: 1
            };

            this.cuttingAnimation1 = TweenMax.to(tween, 1, {
              opacity: 0,
              onUpdate: () => {
                for (let i = 0; i < this.obj1.children[2].children.length; i++) {
                  (this.obj1.children[2].children[i] as any).material.opacity = tween.opacity;
                }
              },
              paused: true
            });
        }

          cuttingEvent2() {
            const tween = {
              opacity: 1
            };

            this.cuttingAnimation2 = TweenMax.to(tween, 1, {
              opacity: 0,
              onUpdate: () => {
                for (let i = 0; i < this.obj2.children[2].children.length; i++) {
                  (this.obj2.children[2].children[i] as any).material.opacity = tween.opacity;
                }
              },
              paused: true
            });
          }

          cuttingEvent3() {
            const tween = {
              opacity: 1
            };

            this.cuttingAnimation3 = TweenMax.to(tween, 1, {
              opacity: 0,
              onUpdate: () => {
                for (let i = 0; i < 14; i++) {
                  (this.obj3.children[2].children[i] as any).material.opacity = tween.opacity;
                }
              },
              paused: true
            });
          }

          cuttingEvent4() {
            const tween = {
              opacity: 1
            };

            this.cuttingAnimation4 = TweenMax.to(tween, 1, {
              opacity: 0,
              onUpdate: () => {
                for (let i = 0; i < 20; i++) {
                  (this.obj4.children[2].children[i] as any).material.opacity = tween.opacity;
                }
              },
              paused: true
            });
          }

        //开始切割动画
        startCuttingAnimation() {
            this.animation1.playAnimation(0);
            this.cuttingAnimation1.play();

            this.animation2.playAnimation(0);
            this.cuttingAnimation2.play();

            this.animation3.playModelAnimation();
            this.cuttingAnimation3.play();

            this.animation4.playModelAnimation();
            this.cuttingAnimation4.play();
        }

        //重置切割动画
        resetCuttingAnimation() {
            this.animation1.resetAnimation();
            this.cuttingAnimation1.progress(0);
            this.cuttingAnimation1.pause();

            this.animation2.resetAnimation();
            this.cuttingAnimation2.progress(0);
            this.cuttingAnimation2.pause();

            this.animation3.resetModelAnimation();
            this.cuttingAnimation3.progress(0);
            this.cuttingAnimation3.pause();

            this.animation4.resetModelAnimation();
            this.cuttingAnimation4.progress(0);
            this.cuttingAnimation4.pause();
        }

            //隐藏初始模型
          hideModel(model1: any, model2: any, model3: any) {
              model1.visible = true;
              model2.visible = false;
              model3.visible = false;
          }

          //显示动画模型
          showAnimationModel(model1: any, model2: any, model3: any) {
            model1.visible = false;
            model2.visible = true;
            model3.visible = true;
          }

        resize(width: number, height: number) {
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

}
