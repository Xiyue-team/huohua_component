import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';


const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
import * as h3 from '../sub_static/3h.png';
import * as he3 from '../sub_static/3he.png';
import * as group from '../sub_static/Group.png';
import * as timeAxis from '../sub_static/timeAxis.png';
import * as tubiao from '../sub_static/tubiao.png';
import * as zhizi from '../sub_static/zhizi.png';
import * as zhongzi from '../sub_static/zhongzi.png';
import * as dtext from '../sub_static/dtext.png';
import * as htext from '../sub_static/htext.png';
import { Linear, TweenMax } from 'gsap';
OBJLoader(THREE);
export class Bsq3dModel extends ThreeBase {

    private controls: any;
    private h20: THREE.Mesh;
    private timeAxisGroup: THREE.Group;
    private text1: any;
    private text2: any;
    private hArray: THREE.Mesh[] = [];
    private heArray: THREE.Mesh[] = [];
    private animationArray: any[] = [];
    private randomNumber: number[] = [];
    private zhiziRandomNumber: number[] = [];
    private zhongziRandomNumber: number[] = [];
    private xNum: number[] = [];
    private yNum: number[] = [];
    private animationControl: boolean[] = [];
    private drophe: THREE.Mesh[] = [];
    private dropAnimation: any[] = [];
    private moveAnimation: any[] = [];
    private zhizi: THREE.Mesh[] = [];
    private zhongzi: THREE.Mesh[] = [];
    private blowoutAnimation: any[] = [];
    private animationTimeLineControl: boolean[] = [true, true, true];
    private completeAnimation = false;
    private circleLength = 17;
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
        this.init();

    }
    init() {
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.initControl();
        this.loadImage();
        this.initSceneImage();
        this.render();
    }

    //加载图片
    loadImage() {
        const imageArray = [h3, he3, group, timeAxis, tubiao, zhizi, zhongzi, dtext, htext];
        console.log(imageArray);
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x000000 );
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near    = 0.1;
        const far     = 2000;
        this.camera = new PerspectiveCamera(50, (this.width / 2) / (this.height / 2), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(0,  0,  403);
    }


    //重置摄像机位置
    resetCamera() {
        this.controls.reset();
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
        this.controls = new TrackballControls( this.camera, this.renderer.domElement );
        this.controls.rotateSpeed = 3;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = true;
        this.controls.noPan = true;
        this.controls.noRotate = true;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
    }


    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    //初始化场景
    initSceneImage() {
        const scale = (window as any)['env'].browserInfo.isSmallDevice ? 3 : 2;
        //上方时间轴
        this.timeAxisGroup = new THREE.Group();
        this.timeAxisGroup.position.set(0, 100, 0);
        const timeAxisImage = ThreeUtil.createImg(204.8 * 2.5 , 51.2 * 2.5, timeAxis);
        timeAxisImage.position.set(0, -5, -0.2);
        //时间轴上的组合元素
        this.h20 = ThreeUtil.createImg(8.4 * 2, 8.4 * 2, group, -132, 30, 0);
        //汉字图片
        const textd = ThreeUtil.createImg(12.6 * 2, 10.2 * 2, dtext, -170, -5, 0);
        const texth = ThreeUtil.createImg(12.6 * 2, 10.2 * 2, htext, -170, 30, 0);
        //可以控制的数字
        this.text1 = ThreeUtil.createNormalText('20', -150, 35, 0, '#0d47fc', 0.25);
        this.text2 = ThreeUtil.createNormalText('0', -150, 0, 0, '#ff2a28', 0.25);
        this.timeAxisGroup.add(timeAxisImage, this.h20, textd, texth, this.text1, this.text2);
        //下方的氢原子坐标
        this.xNum.push( -10, 5, -105, -90, 80, 100, -80, -80, -55,
          -40, -25,  20, 35, 45, -125, -120, 60, 75, 115, 125);
        this.yNum.push( -18, -60, -50, -125, -50, -125, -12.5, -45,
          -87.5, -18, -75, -12.5,  -125, -45, -87.5, -12.5, -75, -12.5, -20, -87.5);

      //创建时间轴上掉落的图片
        for (let i = 0; i < this.circleLength; i++) {
            this.drophe[i] = ThreeUtil.createImg(8.4 , 8.1, tubiao);
            (this.drophe[i].material as any).opacity = 0;
            this.timeAxisGroup.add(this.drophe[i]);
        }

        //创建中子和质子的图片
        for (let i = 0; i < this.circleLength; i++) {
          this.zhizi[i] = ThreeUtil.createImg(4.5, 4.8, zhizi);
          this.zhongzi[i] = ThreeUtil.createImg(4.8, 5.1, zhongzi);
          (this.zhizi[i].material as any).opacity = 0;
          (this.zhongzi[i].material as any).opacity = 0;
          this.scene.add(this.zhizi[i], this.zhongzi[i]);
        }

        //创建氢原子和氮原子图片
        for (let i = 0; i < 20; i++) {
            this.hArray[i] = ThreeUtil.createImg(6.4 * scale, 6.4 * scale, h3, this.xNum[i], this.yNum[i], 0);
            this.heArray[i] = ThreeUtil.createImg(6.4 * scale, 6.4 * scale, he3, this.xNum[i], this.yNum[i], 0);
            (this.heArray[i].material as any).opacity = 0;

            this.scene.add(this.hArray[i], this.heArray[i]);
            this.getRandomNumber();

            //创建时间轴上的动画
            this.moveAnimation[0] = this.createGroupMoveAnimation2(122, 178, this.h20);
            this.moveAnimation[1] = this.createGroupMoveAnimation1(-8, 122, this.h20, () => {
                this.moveAnimation[0].play();
            });
            this.moveAnimation[2] = this.createGroupMoveAnimation(-132, -8, this.h20, () => {
                this.moveAnimation[1].play();
            });
        }

        for (let i = 0; i < 20; i += 5) {
          //创建抖动动画
            this.animationArray[i] = this.createShockAnimation(this.xNum[i], this.yNum[i],
              this.xNum[i] + 0.5, this.yNum[i], this.hArray[i]);

            this.animationArray[i + 1] = this.createShockAnimation(this.xNum[i + 1], this.yNum[i + 1],
              this.xNum[i + 1], this.yNum[i + 1] + 0.5, this.hArray[i + 1]);

            this.animationArray[i + 2] = this.createShockAnimation(this.xNum[i + 2], this.yNum[i + 2],
              this.xNum[i + 2] + 0.5, this.yNum[i + 2] - 0.5, this.hArray[i + 2]);

            this.animationArray[i + 3] = this.createShockAnimation(this.xNum[i + 3], this.yNum[i + 3],
              this.xNum[i + 3] - 0.5, this.yNum[i + 3] + 0.5, this.hArray[i + 3]);

            this.animationArray[i + 4] = this.createShockAnimation(this.xNum[i + 4], this.yNum[i + 4],
              this.xNum[i + 4] + 0.5, this.yNum[i + 4] + 0.5, this.hArray[i + 4]);
        }

        this.scene.add(this.timeAxisGroup);
    }

    //创建原子震动的动画
    createShockAnimation(x: number, y: number, x1: number, y1: number, obj: THREE.Mesh, delay?: number) {
      delay = delay ? delay : 0;
      const tween = {
        x: x,
        y: y,
      };

      const animation = TweenMax.to(tween, 0.2, {
        x: x1,
        y: y1,
        opacity: 0,
        onUpdate: () => {
          obj.position.set(tween.x, tween.y, 1);
        },
        onComplete: () => {

        },
        paused: true,
        ease:  Linear.easeNone, //线性动画
        delay: delay, //延迟N秒执行
        repeat: -1 //执行次数 -1 等于infinite
      });
      return animation;
    }

    //创建group移动的动画
    createGroupMoveAnimation(x: number, x1: number, obj: THREE.Mesh, callback?: any) {
      const tween = {
        x: x,
      };

      const animation = TweenMax.to(tween, 10, {
        x: x1,
        onUpdate: () => {
          obj.position.x = tween.x;
          this.animationOnupdate(animation.progress(), tween.x, 0, 10);

        },
        onComplete: () => {
            if (callback) {
              callback();
              this.animationTimeLineControl[0] = false;
            }
        },
        paused: true,
        ease:  Linear.easeNone, //线性动画
      });
      return animation;
    }

    //半衰期后的第一段动画
    createGroupMoveAnimation1 (x: number, x1: number, obj: THREE.Mesh, callback?: any) {
      const tween = {
        x: x,
      };

      const animation = TweenMax.to(tween, 10, {
        x: x1,
        onUpdate: () => {
          obj.position.x = tween.x;
          this.animationOnupdate(animation.progress(), tween.x, 10, 15);

        },
        onComplete: () => {
          if (callback) {
            callback();
            this.animationTimeLineControl[1] = false;
          }
        },
        paused: true,
        ease:  Linear.easeNone, //线性动画
      });
      return animation;
    }

    //动画更新时创建动画
    animationOnupdate(animation: number, tween: number , start: number, end: number) {
      for (let i = start; i < end; i++) {
        if (this.animationControl[i] && animation >= this.randomNumber[i]) {
          this.dropAnimation[i] = this.createSphereDropAnimation(tween, this.drophe[i]);
          this.animationControl[i] = false;
          this.text1.text = (parseInt(this.text1.text) - 1).toString();
          this.text2.text = (20 - parseInt(this.text1.text)).toString();
          this.blowoutAnimation[i] = this.createSphereBlowoutAnimation(this.xNum[i], this.yNum[i],
            this.xNum[i] + this.zhiziRandomNumber[i], this.yNum[i] + this.zhongziRandomNumber[i],
            this.xNum[i] + this.zhongziRandomNumber[i], this.yNum[i] + this.zhiziRandomNumber[i],
            this.zhizi[i], this.zhongzi[i], this.hArray[i], this.heArray[i]);
          this.dropAnimation[i].play();
          this.blowoutAnimation[i].play();
        }
      }
    }

    //最后一段移动的动画
    createGroupMoveAnimation2 (x: number, x1: number, obj: THREE.Mesh, callback?: any) {
      const tween = {
        x: x,
      };

      const animation = TweenMax.to(tween, 5, {
        x: x1,
        onUpdate: () => {
            obj.position.x = tween.x;
            if (this.animationControl[15] && animation.progress() >= this.randomNumber[15]) {
              this.dropAnimation[15] = this.createSphereDropAnimation(tween.x, this.drophe[15]);
              this.animationControl[15] = false;
              this.text1.text = (parseInt(this.text1.text) - 1).toString();
              this.text2.text = (20 - parseInt(this.text1.text)).toString();
              this.blowoutAnimation[15] = this.createSphereBlowoutAnimation(this.xNum[15], this.yNum[15],
                this.xNum[15] + this.zhiziRandomNumber[15], this.yNum[15] + this.zhongziRandomNumber[15],
                this.xNum[15] + this.zhongziRandomNumber[15], this.yNum[15] + this.zhiziRandomNumber[15],
                this.zhizi[15], this.zhongzi[15], this.hArray[15], this.heArray[15]);
              this.dropAnimation[15].play();
              this.blowoutAnimation[15].play();
            }
        },
        onComplete: () => {
          this.animationTimeLineControl[2] = false;
          for (let i = 0; i < this.animationArray.length; i++) {
            this.animationArray[i].pause();
          }
          setTimeout(() => {
            (window as any).viewHandler.viewModel.$data.isPlay = false;
            this.completeAnimation = true;
          }, 1000);
        },
        paused: true,
        ease:  Linear.easeNone, //线性动画
      });
      return animation;
    }

    //创建小球掉落的动画
    createSphereDropAnimation(x: number, obj: THREE.Mesh) {
      const tween = {
        x: x,
        y: 20
      };

      const animation = TweenMax.to(tween, 1, {
        x: x,
        y: -10,
        onUpdate: () => {
          obj.position.x = tween.x;
          obj.position.y = tween.y;
          (obj.material as any).opacity = 1;

        },
        onComplete: () => {

        },
        paused: true,
        ease: Linear.easeNone, //线性动画
      });
      return animation;
    }

    //创建元素炸裂的动画
  //质子初始位置，质子结束位置，质子，中子，3h，3he
    createSphereBlowoutAnimation( x: number, y: number, x1: number, y1: number, x2: number, y2: number,
                                  obj1: THREE.Mesh, obj2: THREE.Mesh, obj3: THREE.Mesh, obj4: THREE.Mesh) {
      const tween = {
        x: x,
        y: y,
        x1: x,
        y1: y,
        opacity: 1,
      };

      const animation = TweenMax.to(tween, 1, {
        x: x1,
        y: y1,
        x1: x2,
        y2: y2,
        opacity: 0,
        onUpdate: () => {
          obj1.position.set(tween.x, tween.y, 0);
          obj2.position.set(tween.x1, tween.y1, 0);
          (obj1.material as any).opacity = tween.opacity;
          (obj2.material as any).opacity = tween.opacity;
          (obj3.material as any).opacity = 0;
          (obj4.material as any).opacity = 1;
        },
        onComplete: () => {

        },
        paused: true,
        ease: Linear.easeNone, //线性动画
      });
      return animation;
    }

    getRandomNumber() {
        for (let i = 0 ; i < this.circleLength; i++) {
            this.randomNumber[i] = Math.random();
            this.zhiziRandomNumber[i] = ThreeUtil.getRandomNumber(-100, 100);
            this.zhongziRandomNumber[i] = ThreeUtil.getRandomNumber(-100, 100);
            this.animationControl[i] = true;
        }
    }

    //重置场景方法
    reset() {
      //重置爆炸动画和掉落动画
      for (let i = 0; i < this.circleLength; i++) {
        if (this.blowoutAnimation[i]) {
          this.blowoutAnimation[i].pause();
          this.blowoutAnimation[i].progress(0);
        }
        if (this.dropAnimation[i]) {
          this.dropAnimation[i].pause();
          this.dropAnimation[i].progress(0);
        }
        this.animationControl[i] = true;
      }

      //重置时间轴移动的动画
      for (let i = 0; i < 3; i++) {
        this.moveAnimation[i].pause();
        this.moveAnimation[i].progress(0);
      }

      //重置掉落小球透明度
      for (let i = 0; i < this.drophe.length; i++) {
        (this.drophe[i].material as any).opacity = 0;
      }

      //重置3h和3he的透明度
      for (let i = 0; i < this.hArray.length; i++) {
        (this.hArray[i].material as any).opacity = 1;
        (this.heArray[i].material as any).opacity = 0;
      }

      //暂停小球抖动动画
      for (let i = 0; i < this.animationArray.length; i++) {
        this.animationArray[i].pause();
      }

      //重置时间轴控制器
      for (let i = 0; i < this.animationTimeLineControl.length; i++) {
        this.animationTimeLineControl[i] = true;
      }

      this.text1.text = '20';
      this.text2.text = '0';
      this.blowoutAnimation.splice(0, this.blowoutAnimation.length);
      this.dropAnimation.splice(0, this.dropAnimation.length);
      //重新获取随机数
      this.getRandomNumber();
    }

    //按钮触发的方法
  play() {
      if (this.completeAnimation) {
        this.reset();
        this.completeAnimation = false;
        this.play();
      }
    if (this.animationTimeLineControl[0] === true) {
      this.moveAnimation[2].play();
      for (let i = 0; i < 10; i++) {
        if (this.blowoutAnimation[i]) {
          this.blowoutAnimation[i].play();
        }
        if (this.dropAnimation[i]) {
          this.dropAnimation[i].play();
        }
      }
    } else if (this.animationTimeLineControl[1] === true) {
      this.moveAnimation[1].play();
      for (let i = 0; i < 15; i++) {
        if (this.blowoutAnimation[i]) {
          this.blowoutAnimation[i].play();
        }
        if (this.dropAnimation[i]) {
          this.dropAnimation[i].play();
        }
      }
    } else if (this.animationTimeLineControl[2] === true) {
      this.moveAnimation[0].play();
      for (let i = 0; i < 16; i++) {
        if (this.blowoutAnimation[i]) {
          this.blowoutAnimation[i].play();
        }
        if (this.dropAnimation[i]) {
          this.dropAnimation[i].play();
        }
      }
    }

    for (let i = 0; i < this.animationArray.length; i++) {
      this.animationArray[i].play();
    }
  }

  pause() {

      //暂停移动的动画
    for (let i = 0; i < this.moveAnimation.length; i++) {
      this.moveAnimation[i].pause();
    }

    //暂停抖动的动画
    for (let i = 0; i < this.animationArray.length; i++) {
      this.animationArray[i].pause();
    }

    //暂停爆炸和下落的动画
    for (let i = 0; i < this.circleLength; i++) {
      if (this.blowoutAnimation[i]) {
        this.blowoutAnimation[i].pause();
      }
      if (this.dropAnimation[i]) {
        this.dropAnimation[i].pause();
      }
    }
  }
}




