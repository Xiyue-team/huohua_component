import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import * as  dragon1 from '../sub_static/dragon1.png';
import * as  dragon2 from '../sub_static/dragon2.png';
import * as  dragon3 from '../sub_static/dragon3.png';
import * as  dragon4 from '../sub_static/dragon4.png';
import * as  medal1 from '../sub_static/medal1.png';
import * as  medal2 from '../sub_static/medal2.png';
import * as  medal3 from '../sub_static/medal3.png';
import * as  medal4 from '../sub_static/medal4.png';
import * as  disableMedal from '../sub_static/disableMedal.png';
import * as  drag from '../sub_static/drag.png';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import { Linear, TweenMax } from 'gsap';
const Interaction = require('three.interaction');
const dragcontrols = require('three-dragcontrols').default;

export class Model extends ThreeBase {
  private controls: any;

  background = ThreeUtil.createPlane(1000, 1000, '#fff', 0); //#FFDEEE

  disableMedalImage1 = ThreeUtil.createImg(24.5, 34.5, disableMedal, 5, -50, 0.2);
  disableMedalImage2 = ThreeUtil.createImg(24.5, 34.5, disableMedal, 0, -65, 0.4);
  disableMedalImage3 = ThreeUtil.createImg(24.5, 34.5, disableMedal, 0, -70, 0.6);
  disableMedalImage4 = ThreeUtil.createImg(24.5, 34.5, disableMedal, -25, -50, 0.8);

  dragImage1 = ThreeUtil.createImg(33, 33, drag, 100, 120, 1.1);
  dragImage2 = ThreeUtil.createImg(33, 33, drag, 120, -60, 1.3);
  dragImage3 = ThreeUtil.createImg(33, 33, drag, -100, -45, 1.7);
  dragImage4 = ThreeUtil.createImg(33, 33, drag, -80, 120, 2.5);

  medalImage1 = ThreeUtil.createImg(24.5, 34.5, medal1, 320, 75, 4);
  medalImage2 = ThreeUtil.createImg(24.5, 34.5, medal2, 320, 25, 4);
  medalImage3 = ThreeUtil.createImg(24.5, 34.5, medal3, 320, -25, 4);
  medalImage4 = ThreeUtil.createImg(24.5, 34.5, medal4, 320, -75, 4);

  returnAnimation: any;
  medalPositionX = 320;
  medalTitle: any;
  dragTitle: any;

  lineGroup = new THREE.Group();


  initMaterial = this.disableMedalImage1.material;

  text: any;

   private render = () => {
     requestAnimationFrame(this.render);
     this.updateBackgroundPosition();
     this.controls.update();
     this.renderer.render(this.scene, this.camera);
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
    this.text = window.env.browserInfo.lang.medalText;
    this.init();
  }

  init(): void {
     this.initScene();
     this.initCamera();
     this.initWebGLRenderer();
     this.initControl();
     this.initImage();
     this.initDragEvent();
     const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
     this.resize();
     this.render();
  }

  initScene(): void {
     this.scene = new THREE.Scene();
     this.scene.background = new THREE.Color( '#FFDEEE' );
  }
  /**
    * 初始化镜头
  */
  initCamera(): void {
    const near = 0.1;
    const far = 2000;
    this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, 0, 400);
  }
  /**
  * 初始化渲染器
  */
  initWebGLRenderer(): void {
      if (this.webglAvailable()) {
          this.renderer = new THREE.WebGLRenderer({antialias: true});
      } else {
          this.renderer = new (THREE as any).CanvasRenderer();
      }
      (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
      this.domElement.appendChild(this.renderer.domElement);
  }
  //初始化控制器
  initControl(): void {
    this.controls = new MapControls(this.camera as any, this.renderer.domElement);
    this.controls.enablePan = false;

    this.controls.screenSpacePanning = false; // 若为 true 则可以平移

    this.controls.enableRotate = false;

    this.controls.enableZoom = false;
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    this.controls.enableDamping = false;

    //设置相机距离原点的最远距离
    this.controls.minDistance = 150;
    this.controls.maxDistance = 700;

    // 使动画循环使用时阻尼或自转 意思是否有惯性
    this.controls.enableDamping = false;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //是否自动旋转
    this.controls.minAzimuthAngle = -Math.PI * 2;
    this.controls.maxAzimuthAngle = Math.PI * 2;

    this.controls.maxPolarAngle = Math.PI;
  }

  //初始化网格
  initGridLine() {
    for (let i = 0; i <= 50; i++) {
      //画横线
      const horizontalLine = ThreeUtil.createLine(1000, 1, '#ECCCDB');
      horizontalLine.position.y = (i * 20) - 500;
      this.lineGroup.add(horizontalLine);
      const verticalLine = ThreeUtil.createLine(1, 1000, '#ECCCDB');
      verticalLine.position.x = (i * 20) - 500;
      this.lineGroup.add(verticalLine);
    }
    this.background.add(this.lineGroup);
  }
  resetGridLine( width: number, height: number) {
    const position1 = ThreeUtil.getMousePos(' ', 0, 0, this.camera, width, height);
    const lineScale = (Math.abs(position1.x) * 2 + 300) / 1000;
    this.lineGroup.scale.set(lineScale, lineScale, lineScale);
    this.resetDragon(width, height);
  }

  resetDragon(width: number, height: number) {
    const medalX = width * 0.93, medalY = height * 0.32;
    const textX = width * 0.9, textY = height * 0.13;
    const medalPos = ThreeUtil.getMousePos(' ', medalX, medalY, this.camera, width, height);
    const textPos = ThreeUtil.getMousePos(' ', textX, textY, this.camera, width, height);

    this.medalPositionX = medalPos.x;

    this.medalTitle.position.set(textPos.x, 0, 1);
    if (window.window.env.browserInfo.isIpad) {
      this.medalTitle.scale.set(0.25, 0.25, 0.25);
    }

    this.medalImage1.position.set(this.medalPositionX, 75, 4);
    this.medalImage2.position.set(this.medalPositionX, 25, 4);
    this.medalImage3.position.set(this.medalPositionX, -25, 4);
    this.medalImage4.position.set(this.medalPositionX, -75, 4);
  }
  //初始化文字
  initText() {
    this.medalTitle = ThreeUtil.createNormalCenterRightText(this.text[0], 250, 140, 1, '#4A4A4A', 0.3);
    const text = ThreeUtil.createNormalCenterRightText(this.text[1], 0, -50, 0, '#4A4A4A', 1);
    this.dragTitle = ThreeUtil.createNormalText(this.text[2], 0, 0, 1, '#4A4A4A', 0.3);
    this.medalTitle.add(text);

    this.scene.add(this.medalTitle);
    this.scene.add(this.dragTitle);
  }

  //初始化页面图片
  initImage () {
    this.medalImage1.name = 'medal1';
    this.medalImage2.name = 'medal2';
    this.medalImage3.name = 'medal3';
    this.medalImage4.name = 'medal4';

    this.dragImage1.name = 'drag1';
    this.dragImage2.name = 'drag2';
    this.dragImage3.name = 'drag3';
    this.dragImage4.name = 'drag4';

    this.background.name  = 'background';
    const dragonImage1 = ThreeUtil.createImg(138.5, 64, dragon1, 0, -50, 0.1);
    const dragonImage2 = ThreeUtil.createImg(125.5, 69, dragon2, -10, -60, 0.3);
    const dragonImage3 = ThreeUtil.createImg(215.5, 168, dragon3, 20, -25, 0.5);
    const dragonImage4 = ThreeUtil.createImg(144.5, 115.5, dragon4, -20, -35, 0.7);

    this.disableMedalImage1.visible = this.disableMedalImage2.visible =
      this.disableMedalImage3.visible = this.disableMedalImage4.visible = false;

    this.dragImage1.add(dragonImage1);
    this.dragImage1.add(this.disableMedalImage1);

    this.dragImage2.add(dragonImage2);
    this.dragImage2.add(this.disableMedalImage2);

    this.dragImage3.add(dragonImage3);
    this.dragImage3.add(this.disableMedalImage3);

    this.dragImage4.add(dragonImage4);
    this.dragImage4.add(this.disableMedalImage4);

    this.background.add(this.dragImage1);
    this.background.add(this.dragImage2);
    this.background.add(this.dragImage3);
    this.background.add(this.dragImage4);
    this.initGridLine();
    this.initText();
    this.scene.add(this.background);
    this.scene.add(this.medalImage1, this.medalImage2, this.medalImage3, this.medalImage4);

  }

  //初始化奖章拖拽事件
  initDragEvent() {
    const dragControl = new dragcontrols([this.background, this.dragImage1, this.dragImage2, this.dragImage3,
        this.dragImage4, this.medalImage1, this.medalImage2, this.medalImage3, this.medalImage4],
      this.camera, this.renderer.domElement);
    let isDrag = false;

    dragControl.addEventListener( 'dragstart',  (event: any) => {
      this.medalTitle.visible = this.dragTitle.visible = false;
      const objectName = event.object.name;

      //判断是否是奖章
      if (objectName === 'medal1' || objectName === 'medal2'
        || objectName === 'medal3' || objectName === 'medal4') {
        isDrag = true;
        this.medalTitle.visible = false;
        this.disableMedalImage1.visible = this.disableMedalImage2.visible =
          this.disableMedalImage3.visible = this.disableMedalImage4.visible = true;
      }
    });
    dragControl.addEventListener( 'dragend',  (event: any) => {

      if (isDrag) {
        const targetOne_X = this.background.position.x + this.dragImage1.position.x + 5;
        const targetOne_Y = this.background.position.y + this.dragImage1.position.y - 50;

        const targetTwo_X = this.background.position.x + this.dragImage2.position.x;
        const targetTwo_Y = this.background.position.y + this.dragImage2.position.y - 65;

        const targetThree_X = this.background.position.x + this.dragImage3.position.x;
        const targetThree_Y = this.background.position.y + this.dragImage3.position.y - 70;

        const targetFour_X = this.background.position.x + this.dragImage4.position.x - 25;
        const targetFour_Y = this.background.position.y + this.dragImage4.position.y - 50;

        if ((this.disableMedalImage1.material as any).name && (this.disableMedalImage1.material as any).name === 'medal') {
          this.disableMedalImage1.visible = true;
        } else {
          this.disableMedalImage1.visible = false;
        }

        if ((this.disableMedalImage2.material as any).name && (this.disableMedalImage2.material as any).name === 'medal') {
          this.disableMedalImage2.visible = true;
        } else {
          this.disableMedalImage2.visible = false;
        }

        if ((this.disableMedalImage3.material as any).name && (this.disableMedalImage3.material as any).name === 'medal') {
          this.disableMedalImage3.visible = true;
        } else {
          this.disableMedalImage3.visible = false;
        }

        if ((this.disableMedalImage4.material as any).name && (this.disableMedalImage4.material as any).name === 'medal') {
          this.disableMedalImage4.visible = true;
        } else {
          this.disableMedalImage4.visible = false;
        }

        this.isCollisionWithRect(event.object, targetOne_X, targetOne_Y, this.disableMedalImage1 );
        this.isCollisionWithRect(event.object, targetTwo_X, targetTwo_Y, this.disableMedalImage2 );
        this.isCollisionWithRect(event.object, targetThree_X, targetThree_Y, this.disableMedalImage3 );
        this.isCollisionWithRect(event.object, targetFour_X, targetFour_Y, this.disableMedalImage4);

        const tween = {
          object: event.object,
          x: event.object.position.x,
          y: event.object.position.y
        };

        if (event.object.visible) {
          switch (event.object.name) {
            case 'medal1' :
              this.setReturnAnimation(tween, 0);
              break;
            case 'medal2' :
              this.setReturnAnimation(tween, 1);
              break;
            case 'medal3' :
              this.setReturnAnimation(tween, 2);
              break;
            case 'medal4' :
              this.setReturnAnimation(tween, 3);
              break;
          }
        }
      }
      isDrag = false;
    });
  }

  //更新网格位置
  updateBackgroundPosition() {
    if (this.background.position.x > 110) {
      this.background.position.x = 110;
    }
    if (this.background.position.x < -110) {
      this.background.position.x = -110;
    }
    if (this.background.position.y > 110) {
      this.background.position.y = 110;
    }
    if (this.background.position.y < -110) {
      this.background.position.y = -110;
    }
  }

  setReturnAnimation(tween: any, index: any) {
    this.returnAnimation = TweenMax.to(tween, 0.5, {
      x: this.medalPositionX,
      y: (75 - 50 * index),
      onUpdate: () => {
        tween.object.position.x = tween.x;
        tween.object.position.y = tween.y;
      },
      onComplete: () => {
        tween.object.position.z = 4;
      },
      paused: true,
      ease:  Linear.easeOut, //线性动画
      repeat: 0 //执行次数 -1 等于infinite
    });
    this.returnAnimation.play();
  }

  // 获取两张图片之间的距离函数(碰撞检测)
  isCollisionWithRect(object: any, targetX: number, targetY: number, target: any) {
    if (target.material.name && target.material.name === 'medal') {
      return false;
    }
    const dx = object.position.x - targetX;
    const dy = object.position.y - targetY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance <= 10) {
      target.visible = true;
      target.material = object.material;
      target.material.name = 'medal';
      object.visible = false;
    } else {
      return false;
    }
  }

  resize(): void {
    const dom = document.getElementById('3dContainer');
    const width = dom.clientWidth;
    const height = dom.clientHeight;
    (this.camera as PerspectiveCamera).fov = this.calculateFov(500, 512);
    (this.camera as PerspectiveCamera).aspect = width / height;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
    this.renderer.setSize(width, height);
    this.resetGridLine(width, height);
  }

  /**
   * 计算相机 fov 的函数
   * @param d : 在相机前方 d 距离
   * @param w : 想要看到最大正方形区域边长为 w
   * @param r : 屏幕宽高比
   */
  calculateFov(distance: number, width: number) {
    const vertical = width;
    return Math.atan(vertical / distance / 2 ) * 2 * (180 / Math.PI);
  }

  reset () {
    if (this.returnAnimation) {
      this.returnAnimation.progress(0);
      this.returnAnimation.pause();
      this.returnAnimation = null;
    }
    this.medalTitle.visible = this.dragTitle.visible = false;

    this.disableMedalImage1.visible = this.disableMedalImage2.visible =
      this.disableMedalImage3.visible = this.disableMedalImage4.visible = false;

    this.medalImage1.visible = this.medalImage2.visible =
      this.medalImage3.visible = this.medalImage4.visible = true;

    this.disableMedalImage1.material = this.initMaterial;
    this.disableMedalImage2.material = this.initMaterial;
    this.disableMedalImage3.material = this.initMaterial;
    this.disableMedalImage4.material = this.initMaterial;

    this.medalImage1.position.set(this.medalPositionX, 75, 4);
    this.medalImage2.position.set(this.medalPositionX, 25, 4);
    this.medalImage3.position.set(this.medalPositionX, -25, 4);
    this.medalImage4.position.set(this.medalPositionX, -75, 4);

    this.dragImage1.position.set(100, 120, 1.1);
    this.dragImage2.position.set(120, -60, 1.3);
    this.dragImage3.position.set(-120, -45, 1.7);
    this.dragImage4.position.set(-80, 120, 2.5);
    this.background.position.set(0, 0, 0);

  }
}




