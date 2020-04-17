import * as THREE from 'three';
import {
  WebGLRenderer
} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {Mesh} from 'three';
import {PerspectiveCamera} from 'three';
const dragcontrols = require('three-dragcontrols').default;
const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
import * as l1 from '../sub_static/todong.png';
import * as l2 from '../sub_static/huizhi.png';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Line } from '../../../../../src/three/component/Line';
import commonForThree from '../../../../../widget_sw/math/r16/tydderdy/services/commonForThree';
import { Helper } from './Helper';
import { TweenMax } from 'gsap';

OBJLoader(THREE);
export class Sqxddy3dModel extends ThreeBase {
    planeMesh: Mesh;
    browserInfo: BrowserInfo;
    private controls: any;
    private interact: any;
    private canDrag = true;
    private line1: any;
    private line2: any;
    private lineHelper = new Line();
    private  img: any;
    private  img1: any;
    private  img2: any;
    private point4: any;
    private dargControls1: any;
    private dargControls2: any;
    private dargControls3: any;
    private dargControls4: any;
    private pointGroup: THREE.Mesh[] = [];
    private count = 0;
    public val: number;
    private textF1Pos: any;
    private textF2Pos: any;
    private textF1: any;
    private textF2: any;
    private animationimg1: any;
    private animationimg2: any;
    private animationimg3: any;
    private animationimg4: any;
    private  startPoint: any;
    private plan: any;
    private plan1: any;
    private splineObjectLeft4: any;
    private splineObjectRight4: any;
    private splineObjectLeft5: any;
    private splineObjectRight5: any;
    private splineObjectRight6: any;
    private splineObjectLeft6: any;
    private splineObjectLeft7: any;
    private splineObjectRight7: any;
    private splineObjectLeft8: any;
    private splineObjectRight8: any;
    private splineObjectLeft9: any;
    private splineObjectRight9: any;
    private splineObjectLeft10: any;
    private splineObjectRight10: any;

     private render = () => {
        requestAnimationFrame( this.render );
        this.controls.update();
        this.renderer.render( this.scene,  this.camera );
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
        this.val = 5;
        this.init();
    }

    init() {
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this. initControl();
        this.interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.init3dMOdel();
        this.render();
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );
    }

    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near    = 0.1;
        const far     = 2000;
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(0,  0,  270);
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({ antialias:  true } );
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    initControl(): void {
       this.controls = new TrackballControls(this.camera, this.renderer.domElement);
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

    }

    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    init3dMOdel() {
      this.createAxis();
      this.creatPoint1();
      this.creatPoint2();
      this.creatPoint3();
      this.creatPoint4();
      this.createLine();
      this.createtext();
      this.createtextpos();
      this.createFunctionLeftLine4();
      this.createFunctionRightLine4();
      this.createFunctionLeftLine5();
      this.createFunctionRightLine5();
      this.createFunctionLeftLine6();
      this.createFunctionRightLine6();
      this.createFunctionLeftLine7();
      this.createFunctionRightLine7();
      this.createFunctionLeftLine8();
      this.createFunctionRightLine8();
      this.createFunctionLeftLine9();
      this.createFunctionRightLine9();
      this.createFunctionLeftLine10();
      this.createFunctionRightLine10();
      this.splin();
      this.animationImg1();
      this.animationImg2();
      this.animationImg3();
      this.animationImg4();
    }

    //创建一个坐标系
    createAxis() {
        const axis = AxisUtil.createAxis({
          isTicks: true,
          AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'],
        } as any);
        axis.position.z = 5;
        this.scene.add(axis);

      const geometry = new THREE.PlaneGeometry( 240, 144, 32 );
      const material = new THREE.MeshBasicMaterial( {color: '#ffffff', side: THREE.DoubleSide} );
      this.plan = new THREE.Mesh( geometry, material );
      this.plan1 = new THREE.Mesh( geometry, material );
      this.plan.position.x = 120;
      this.plan.position.z = 2;
      this.plan1.position.x = -120;
      this.plan1.position.z = 2;
      this.scene.add( this.plan , this.plan1);
    }

    //创建坐标文字
    createtextpos() {
      const val = this.val;
      this.textF1Pos = commonForThree.createText(`(${-val},0)`, [10, 2, 0], {'color': '#000', 'isItalic': false, fontSize: 40});
      this.textF2Pos = commonForThree.createText(`(${val},0)`, [10, 2, 0], {'color': '#000', 'isItalic': false, fontSize: 40});
      this.textF1.add(this.textF1Pos);
      this.textF2.add(this.textF2Pos);
  }


    //创建M点与F1和F2点的文字
    createtext() {
      const textM = commonForThree.createText(`M`, [10, 5, 0], { 'color': '#000000', 'isItalic': true, fontSize: 45 });
      this.img2.add(textM);
      const textM1 = commonForThree.createText(`M`, [10, 5, 0], { 'color': '#000000', 'isItalic': true, fontSize: 45 });
      this.point4.add(textM1);
      const f1 = require('../sub_static/F1.png');
      const f2 = require('../sub_static/F2.png');
      this.textF1 = this.planeTexture(f1, 6, 8);
      this.textF2 = this.planeTexture(f2, 6, 8);
      this.textF1.position.set(-10, 10, 0);
      this.textF2.position.set(10, 10, 0);
      this.img.add(this.textF1);
      this.img1.add(this.textF2);
    }



    //创建双曲线的F1焦点与其拖动事件
    creatPoint1() {
      const point1 = ThreeUtil.createPoint(2, '#0199FF', 0, 0, 1);
      this.img = ThreeUtil.createImg(15, 15, l1, -50, 0 );
      this.img.add(point1);
      point1.position.z = 2;
      this.scene.add(this.img);
      this.img.position.z = 3;
      this.dargControls1 = new dragcontrols([this.img], this.camera, this.renderer.domElement);
      this.dargControls1.addEventListener( 'dragstart',  () => {
        this.controls.enabled = false;
      } );

      this.dargControls1.addEventListener( 'dragend', () => {
        this.controls.enabled = true;
        this.removeLine(this.line1);
        this.line1 = this.drawLine({x: this.img1.position.x, y: this.img1.position.y , z: 1},
          {x: this.img2.position.x, y: this.img2.position.y, z: 1}, 800, '#FF4747');
        this.scene.add(this.line1);
        this.removeLine(this.line2);
        this.line2 = this.drawLine({x: this.img.position.x, y: this.img.position.y , z: 1},
          {x: this.img2.position.x, y: this.img2.position.y, z: 1}, 800, '#0199FF');
        this.scene.add(this.line2);
        (window as any).viewHandler.viewModel.$data.disable = false;
      } );
      this.dargControls1.addEventListener( 'drag', () => {
        if (!this.canDrag) {
          return;
        }
        this.img.position.y = 0;
        if (this.img.position.x  < -100) {
          this.img.position.x = -100;
          this.img.visible =  true;
        } else if (this.img.position.x > -40) {
          this.img.position.x = -40;
          this.img.visible = true;
        }
        this.img.position.x = Math.round(this.img.position.x / 10 ) * 10;
        this.img1.position.x = -this.img.position.x;
        this.img2.position.y = 10 * Math.sqrt(112 / 9);
        this.removePoint(this.pointGroup);
        this.animationimg1.progress(0);
        this.animationimg1.pause();
        this.animationimg2.progress(0);
        this.animationimg2.pause();
        this.animationimg3.progress(0);
        this.animationimg3.pause();
        this.animationimg4.progress(0);
        this.animationimg4.pause();
        this.img2.visible = true;
        this.point4.visible = false;
        this.removeLine(this.line2);
        this.line2 = this.drawLine({x: this.img2.position.x, y: this.img2.position.y, z: 1},
          {x: this.img.position.x, y: this.img.position.y , z: 1}, 800, '#0199FF');
        this.scene.add(this.line2);

        this.removeLine(this.line1);
        this.img.position.x = -this.img1.position.x;
        this.line1 = this.drawLine({x: this.img2.position.x, y: this.img2.position.y, z: 1},
          {x: this.img1.position.x, y: this.img1.position.y , z: 1}, 800, '#FF4747');
        this.scene.add(this.line1);

        const val = Math.floor(Math.abs(this.img1.position.x) / 10);
        this.textF1Pos.text = `(${-val},0)`;
        this.textF2Pos.text = `(${val},0)`;
        this.img2.position.x = Math.sqrt(920 * (1 + (Math.pow(this.img2.position.y, 2) /
          Math.pow(Math.sqrt(Math.pow(this.img1.position.x, 2) - 920), 2))));
      });
    }

    //创建双曲线的F2焦点与其拖动事件
    creatPoint2() {
      const point2 = ThreeUtil.createPoint(2, '#0199FF', 0, 0, 1);
      this.img1 = ThreeUtil.createImg(15, 15, l1, 50, 0);
      this.img1.add(point2);
      point2.position.z = 2;
      this.scene.add(this.img1);
      this.img1.position.z = 3;
      this.dargControls2 = new dragcontrols([this.img1], this.camera, this.renderer.domElement);
      this.dargControls2.addEventListener( 'dragstart',  () => {
        this.controls.enabled = false;
      } );

      this.dargControls2.addEventListener( 'dragend', () => {
        this.controls.enabled = true;
        this.removeLine(this.line1);
        this.line1 = this.drawLine({x: this.img1.position.x, y: this.img1.position.y , z: 1},
          {x: this.img2.position.x, y: this.img2.position.y, z: 1}, 800, '#FF4747');
        this.scene.add(this.line1);
        this.removeLine(this.line2);
        this.line2 = this.drawLine({x: this.img.position.x, y: this.img.position.y , z: 1},
          {x: this.img2.position.x, y: this.img2.position.y, z: 1}, 800, '#0199FF');
        this.scene.add(this.line2);
        (window as any).viewHandler.viewModel.$data.disable = false;
      } );
      this.dargControls2.addEventListener( 'drag', () => {
        if (!this.canDrag) {
          return;
        }
        this.img1.position.y = 0;
        if (this.img1.position.x  > 100) {
          this.img1.position.x = 100;
          this.img1.visible = true;
        } else if (this.img1.position.x < 40) {
          this.img1.position.x = 40;
          this.img1.visible = true;
        }
        this.img2.position.y = 10 * Math.sqrt(112 / 9);
        this.removePoint(this.pointGroup);
        this.animationimg1.progress(0);
        this.animationimg1.pause();
        this.animationimg2.progress(0);
        this.animationimg2.pause();
        this.animationimg3.progress(0);
        this.animationimg3.pause();
        this.animationimg4.progress(0);
        this.animationimg4.pause();
        this.img2.visible = true;
        this.point4.visible = false;
        this.removeLine(this.line1);
        this.img1.position.x = Math.round(this.img1.position.x / 10 ) * 10;
        this.img.position.x = -this.img1.position.x;
        this.line1 = this.drawLine({x: this.img2.position.x, y: this.img2.position.y, z: 1},
          {x: this.img1.position.x, y: this.img1.position.y , z: 1}, 800, '#FF4747');
        this.scene.add(this.line1);

        this.removeLine(this.line2);
        this.img1.position.x = -this.img.position.x;
        this.line2 = this.drawLine({x: this.img2.position.x, y: this.img2.position.y, z: 1},
          {x: this.img.position.x, y: this.img.position.y , z: 1}, 800, '#0199FF');
        this.scene.add(this.line2);

        const val = Math.floor(Math.abs(this.img1.position.x) / 10);
        this.textF1Pos.text = `(${-val},0)`;
        this.textF2Pos.text = `(${val},0)`;

        this.img2.position.x = Math.sqrt(920 * (1 + (Math.pow(this.img2.position.y, 2) /
          Math.pow(Math.sqrt(Math.pow(this.img1.position.x, 2) - 920), 2))));
      });

    }

    //创建可拖动点M与其拖动事件
    creatPoint3() {
      this.img2 = ThreeUtil.createImg(15, 15, l2, 40, 10 * Math.sqrt(112 / 9) );
      this.scene.add(this.img2);
      this.img2.position.z = 3;
      this.dargControls3 = new dragcontrols([this.img2], this.camera, this.renderer.domElement);
      this.dargControls3.addEventListener( 'dragstart',  () => {
      this.controls.enabled = false;
    } );

      this.dargControls3.addEventListener( 'dragend', () => {
      this.controls.enabled = true;
        const point9 = ThreeUtil.createPoint(1, '#000', 0, 0, 1);
        this.scene.add(point9);
        point9.position.x =  this.img2.position.x;
        point9.position.y =  this.img2.position.y;
        this.pointGroup.push(point9);
        this.scene.add(this.pointGroup[this.count]);
        this.pointGroup[this.count].position.z = 3;
        this.count++;
      } );

      this.dargControls3.addEventListener( 'drag', () => {
        if (!this.canDrag) {
          return;
        }
        if (this.img2.position.y  > 70) {
          this.img2.position.y = 70;
          this.img2.visible = true;
        } else if (this.img2.position.y < -70) {
          this.img2.position.y = -70;
          this.img2.visible = true;
        }

        this.img2.position.x = Math.sqrt(920 * (1 + (Math.pow(this.img2.position.y, 2) /
          Math.pow(Math.sqrt(Math.pow(this.img1.position.x, 2) - 920), 2))));

        this.removeLine(this.line1);
        this.line1 = this.drawLine({x: this.img1.position.x, y: this.img1.position.y , z: 1},
          {x: this.img2.position.x, y: this.img2.position.y, z: 1}, 800, '#FF4747');
        this.scene.add(this.line1);

        this.removeLine(this.line2);
        this.line2 = this.drawLine({x: this.img.position.x, y: this.img.position.y , z: 1},
          {x: this.img2.position.x, y: this.img2.position.y, z: 1}, 800, '#0199FF');
        this.scene.add(this.line2);
      });

  }

  creatPoint4() {
    this.point4 = ThreeUtil.createImg(15, 15, l2, -40, 10 * Math.sqrt(112 / 9) );
    this.scene.add(this.point4);
    this.point4.position.z = 3;
    this.point4.visible  = false;
    this.dargControls4 = new dragcontrols([this.point4], this.camera, this.renderer.domElement);
    this.dargControls4.addEventListener( 'drag', () => {
      if (!this.canDrag) {
        return;
      }
      if (this.point4.position.y  > 70) {
        this.point4.position.y = 70;
        this.point4.visible = true;
      } else if (this.point4.position.y < -70) {
        this.point4.position.y = -70;
        this.point4.visible = true;
      }
      this.point4.position.x =  - Math.sqrt(920 * (1 + (Math.pow(this.point4.position.y, 2) /
        Math.pow(Math.sqrt(Math.pow(this.img.position.x, 2) - 920), 2))));


      this.removeLine(this.line1);
      this.line1 = this.drawLine({x: this.img1.position.x, y: this.img1.position.y , z: 1},
        {x: this.point4.position.x, y: this.point4.position.y, z: 1}, 800, '#FF4747');
      this.scene.add(this.line1);

      this.removeLine(this.line2);
      this.line2 = this.drawLine({x: this.img.position.x, y: this.img.position.y , z: 1},
        {x: this.point4.position.x, y: this.point4.position.y, z: 1}, 800, '#0199FF');
      this.scene.add(this.line2);
    });

  }

    //创建函数线
  createFunctionLeftLine4() {
    this.splineObjectLeft4 = Helper.createFunline(Helper.createFunctionPoint4());
    this.scene.add(this.splineObjectLeft4);
    this.splineObjectLeft4.visible = false;
  }
  createFunctionRightLine4() {
    this.splineObjectRight4 = Helper.createFunline(Helper.createFunctionPoint04());
    this.scene.add( this.splineObjectRight4);
    this.splineObjectRight4.visible = false;
  }

  createFunctionLeftLine5() {
    this.splineObjectLeft5 = Helper.createFunline(Helper.createFunctionPoint5());
    this.scene.add(this.splineObjectLeft5);
    this.splineObjectLeft5.visible = false;
  }
  createFunctionRightLine5() {
    this.splineObjectRight5 = Helper.createFunline(Helper.createFunctionPoint05());
    this.scene.add( this.splineObjectRight5);
    this.splineObjectRight5.visible = false;
  }
  createFunctionLeftLine6() {
    this.splineObjectLeft6 = Helper.createFunline(Helper.createFunctionPoint6());
    this.scene.add(this.splineObjectLeft6);
    this.splineObjectLeft6.visible = false;

  }
  createFunctionRightLine6() {
    this.splineObjectRight6 = Helper.createFunline(Helper.createFunctionPoint06());
    this.scene.add( this.splineObjectRight6);
    this.splineObjectRight6.visible = false;
  }
  createFunctionLeftLine7() {
    this.splineObjectLeft7 = Helper.createFunline(Helper.createFunctionPoint7());
    this.scene.add(this.splineObjectLeft7);
    this.splineObjectLeft7.visible = false;
  }
  createFunctionRightLine7() {
    this.splineObjectRight7 = Helper.createFunline(Helper.createFunctionPoint07());
    this.scene.add( this.splineObjectRight7);
    this.splineObjectRight7.visible = false;
  }
  createFunctionLeftLine8() {
    this.splineObjectLeft8 = Helper.createFunline(Helper.createFunctionPoint8());
    this.scene.add(this.splineObjectLeft8);
    this.splineObjectLeft8.visible = false;
  }
  createFunctionRightLine8() {
    this.splineObjectRight8 = Helper.createFunline(Helper.createFunctionPoint08());
    this.scene.add( this.splineObjectRight8);
    this.splineObjectRight8.visible = false;
  }
  createFunctionLeftLine9() {
    this.splineObjectLeft9 = Helper.createFunline(Helper.createFunctionPoint9());
    this.scene.add(this.splineObjectLeft9);
    this.splineObjectLeft9.visible = false;
  }
  createFunctionRightLine9() {
    this.splineObjectRight9 = Helper.createFunline(Helper.createFunctionPoint09());
    this.scene.add( this.splineObjectRight9);
    this.splineObjectRight9.visible = false;
  }
  createFunctionLeftLine10() {
    this.splineObjectLeft10 = Helper.createFunline(Helper.createFunctionPoint10());
    this.scene.add(this.splineObjectLeft10);
    this.splineObjectLeft10.visible = false;
  }
  createFunctionRightLine10() {
    this.splineObjectRight10 = Helper.createFunline(Helper.createFunctionPoint010());
    this.scene.add( this.splineObjectRight10);
    this.splineObjectRight10.visible = false;
  }

  //创建双曲线初始状态
  splin() {
    this.splineObjectLeft4.visible = false;
    this.splineObjectRight4.visible = false;
    this.splineObjectLeft5.visible = false;
    this.splineObjectRight5.visible = false;
    this.splineObjectLeft6.visible = false;
    this.splineObjectRight6.visible = false;
    this.splineObjectLeft7.visible = false;
    this.splineObjectRight7.visible = false;
    this.splineObjectLeft8.visible = false;
    this.splineObjectRight8.visible = false;
    this.splineObjectLeft9.visible = false;
    this.splineObjectRight9.visible = false;
    this.splineObjectLeft10.visible = false;
    this.splineObjectRight10.visible = false;
  }

    // 创建双曲线绘制动画
    animationImg1() {
    const tween = {
      y: 0,
    };
    this.animationimg1 = TweenMax.to(tween, 3, {
      y: -140,
      onUpdate: () => {
        this.plan.position.y = tween.y;
      },
      paused: true
    });
  }

    //创建双曲线绘制动画
    animationImg2() {
    this.removePoint(this.pointGroup);
    const tween = {
      y: 70,
    };
    //
    this.startPoint = new THREE.Vector3( Math.sqrt(920 * (1 + (Math.pow(100, 2) /
      Math.pow(Math.sqrt(Math.pow(this.img1.position.x, 2) - 920), 2)))), 100, 0);
    let endPoint =  new THREE.Vector3( Math.sqrt(920 * (1 + (Math.pow(100, 2) /
      Math.pow(Math.sqrt(Math.pow(this.img1.position.x, 2) - 920), 2)))), 100, 0);
    this.animationimg2 = TweenMax.to(tween, 3, {
      y: -70,
      onUpdate: () => {
        this.img2.position.y = tween.y;
        this.img2.position.x = Math.sqrt(920 * (1 + (Math.pow(tween.y, 2) /
          Math.pow(Math.sqrt(Math.pow(this.img1.position.x, 2) - 920), 2)))),
        endPoint = new THREE.Vector3(Math.sqrt(920 * (1 + (Math.pow(tween.y, 2) /
          Math.pow(Math.sqrt(Math.pow(this.img1.position.x, 2) - 920), 2)))), tween.y, 0);

        this.startPoint = endPoint;
        this.removeLine(this.line1);
        this.line1 = this.drawLine({x: this.img1.position.x, y: this.img1.position.y , z: 1},
          {x: this.img2.position.x, y: this.img2.position.y, z: 1}, 650, '#FF4747');
        this.scene.add(this.line1);

        this.removeLine(this.line2);
        this.line2 = this.drawLine({x: this.img.position.x, y: this.img.position.y , z: 1},
          {x: this.img2.position.x, y: this.img2.position.y, z: 1}, 650, '#0199FF');
        this.scene.add(this.line2);
      },
      onComplete: () => {
        this.removePoint(this.pointGroup);
        this.animationimg3.play();
        this.animationimg4.play();
        this.img2.visible = false;
        this.point4.visible = true;
      },
      paused: true
    });
  }

  animationImg3() {
    const tween = {
      y: 0,
    };
    this.animationimg3 = TweenMax.to(tween, 3, {
      y: -140,
      onUpdate: () => {
        this.plan1.position.y = tween.y;
      },
      paused: true
    });
  }

  //创建双曲线绘制动画
  animationImg4() {
    this.removePoint(this.pointGroup);
    const tween = {
      y: 70,
    };
    //
    this.startPoint = new THREE.Vector3( - Math.sqrt(920 * (1 + (Math.pow(100, 2) /
      Math.pow(Math.sqrt(Math.pow(this.img.position.x, 2) - 920), 2)))), 100, 0);
    let endPoint =  new THREE.Vector3( - Math.sqrt(920 * (1 + (Math.pow(100, 2) /
      Math.pow(Math.sqrt(Math.pow(this.img.position.x, 2) - 920), 2)))), 100, 0);
    this.animationimg4 = TweenMax.to(tween, 3, {
      y: -70,
      onUpdate: () => {
        this.point4.position.y = tween.y;
        this.point4.position.x = - Math.sqrt(920 * (1 + (Math.pow(tween.y, 2) /
          Math.pow(Math.sqrt(Math.pow(this.img.position.x, 2) - 920), 2)))),
          endPoint = new THREE.Vector3(-Math.sqrt(920 * (1 + (Math.pow(tween.y, 2) /
            Math.pow(Math.sqrt(Math.pow(this.img.position.x, 2) - 920), 2)))), tween.y, 0);

        this.startPoint = endPoint;
        this.removeLine(this.line1);
        this.line1 = this.drawLine({x: this.img1.position.x, y: this.img1.position.y , z: 1},
          {x: this.point4.position.x, y: this.point4.position.y, z: 1}, 650, '#FF4747');
        this.scene.add(this.line1);

        this.removeLine(this.line2);
        this.line2 = this.drawLine({x: this.img.position.x, y: this.img.position.y , z: 1},
          {x: this.point4.position.x, y: this.point4.position.y, z: 1}, 650, '#0199FF');
        this.scene.add(this.line2);
      },
      onComplete: () => {
        this.removePoint(this.pointGroup);
      },
      paused: true
    });
  }

    //创建M点与F2点的连线以及M点与F1点的连线
    createLine() {
    this.line1 = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(50, 0, 0),
      endPoint: new THREE.Vector3(40, 10 * Math.sqrt(112 / 9), 0),
      lineWidth: 800,
      color: '#FF4747',
      lineWidthScale: 1 / 500
    });
    this.scene.add(this.line1);

    this.line2 = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(-50, 0, 0),
      endPoint: new THREE.Vector3(40, 10 * Math.sqrt(112 / 9), 0),
      lineWidth: 800,
      color: '#0199FF',
      lineWidthScale: 1 / 500
    });
    this.scene.add(this.line2);
  }

    //删除线的方法
    removeLine(line: any) {
      line.geometry.dispose();
      line.material.dispose();
      this.scene.remove(line);
  }

    //重新绘制直线的方法
    drawLine(start: any, end: any, lineWidth: number, color: string): any {
    const line = this.lineHelper.createLine({
      startPoint: new THREE.Vector3(start.x, start.y, start.z),
      endPoint: new THREE.Vector3(end.x, end.y, end.z),
      lineWidth: lineWidth,
      color: color,
      lineWidthScale: 1 / 500
    });
    return line;
  }

    addTexture(url: any) {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(url);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

    planeTexture(src: any, W: number, H: number) {
    const map = this.addTexture(src);
    const gemo = new THREE.PlaneGeometry(W, H, 36, 36);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      map: map
    });
    const mesh = new THREE.Mesh(gemo, material);
    return mesh;
  }

    //删除点的方法
    removePoint(arr: any) {
    for (let i = 0; i < arr.length; i++) {
      (arr[i] as any).geometry.dispose();
      (arr[i] as any).material.dispose();
      this.scene.remove((arr[i] as any));
    }
    this.pointGroup = [];
    this.count = 0;
  }

    //创建双曲线绘制动画的播放方法
    huizhi1() {
      this.animationimg1.play();
      this.animationimg2.play();
      this.splin();
      if (this.img.position.x === -40) {
        this.splineObjectLeft4.visible = true;
        this.splineObjectRight4.visible = true;
      } else if (this.img.position.x === -50) {
        this.splineObjectLeft5.visible = true;
        this.splineObjectRight5.visible = true;
      } else if (this.img.position.x === -60) {
        this.splineObjectLeft6.visible = true;
        this.splineObjectRight6.visible = true;
      } else if (this.img.position.x === -70) {
        this.splineObjectLeft7.visible = true;
        this.splineObjectRight7.visible = true;
      } else if (this.img.position.x === -80) {
        this.splineObjectLeft8.visible = true;
        this.splineObjectRight8.visible = true;
      } else if (this.img.position.x === -90) {
        this.splineObjectLeft9.visible = true;
        this.splineObjectRight9.visible = true;
      } else if (this.img.position.x === -100) {
        this.splineObjectLeft10.visible = true;
        this.splineObjectRight10.visible = true;
      }
    }

    //重置按钮功能
    reset() {
      this.animationimg1.progress(0);
      this.animationimg1.pause();
      this.animationimg2.progress(0);
      this.animationimg2.pause();
      this.animationimg3.progress(0);
      this.animationimg3.pause();
      this.animationimg4.progress(0);
      this.animationimg4.pause();
      this.img.position.x = -50;
      this.img1.position.x = 50;
      this.img2.position.x = 40 ;
      this.img2.position.y = 10 * Math.sqrt(112 / 9);
      this.point4.position.x = -40 ;
      this.point4.position.y = 10 * Math.sqrt(112 / 9);
      this.textF1Pos.text = `(-5,0)`;
      this.textF2Pos.text = `(5,0)`;
      this.removePoint(this.pointGroup);
      this.removeLine(this.line1);
      this.line1 = this.drawLine({x: this.img1.position.x, y: this.img1.position.y , z: 1},
        {x: this.img2.position.x, y: this.img2.position.y, z: 1}, 800, '#FF4747');
      this.scene.add(this.line1);
      this.removeLine(this.line2);
      this.line2 = this.drawLine({x: this.img.position.x, y: this.img.position.y , z: 1},
        {x: this.img2.position.x, y: this.img2.position.y, z: 1}, 800, '#0199FF');
      this.scene.add(this.line2);
      this.img2.visible = true;
      this.point4.visible = false;
      (window as any).viewHandler.viewModel.$data.disable = false;
      (window as any).viewHandler.viewModel.$data.show = false;
    }

}


