import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const dragcontrols = require('three-dragcontrols').default;
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);

import * as tuodongdian from '../sub_static/tuodong.png';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Power3, TweenMax } from 'gsap';
import * as FNImg from '../sub_static/FN.png';
import * as FfImg from '../sub_static/Ff.png';
import * as FN2Img from '../sub_static/FN2.png';
import * as GImg from '../sub_static/G.png';
import { CircleLineUtils } from '../../../../../src/three/component/CircleLineUtils';

export class Tylxl3dModel extends ThreeBase {

    private controls: any;
    img: any = [];
    //拖拽点
    F1Area: any;

    theta = 0;
    thetaText: any;

    //旋转点，用于正方形旋转
    rotatePoint: any;
    //三个力交点
    centerPoint: any;
    //反作用力顶点
    bottomPoint: any;
    //正方形
    movePlane: any;
    //旋转地面
    slopeLine: any;
    //动画对象
    animation: any;
    dragControls: any;
    //力箭头
    fArrow: any = [];
    group = new THREE.Group();
    //重力箭头组
    gForceGroup = new THREE.Group();
    //角度弧线
    arcLine: any;
    private circleLineUtil = new CircleLineUtils();

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
        this.renderer.render( this.scene,  this.camera );
    }

    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.createBackground();
        this.addDragPoint();
        this.createDragPlane();
        this.drawSlopeLine();
        this.bindEvent();
        this.createForceArrow(0);
        this.createGravityForce();
        this.createAntiForce(0);
        this.slideDownAnimation(1);
        this.hideOrShowForceArrow(false, this.fArrow[2]);
        this.render();
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( '#F0F0F0' );
    }

    initLight() {

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

    //绘制拖动的正方形面
    createDragPlane() {
        this.movePlane = ThreeUtil.createPlane(30, 30, '#55ADA9', 1);
        this.movePlane.position.set(120, 15, -1);
        this.group.add(this.movePlane);
        this.rotatePoint = ThreeUtil.createPoint(3, 'red', -100, -38.5, 0);
        this.scene.add(this.rotatePoint);
        this.rotatePoint.add(this.group);

        //fnImg
        this.img[0] = ThreeUtil.createImg(13, 13, FNImg, 130, 35, 0);

        //fn2Img
        this.img[1] = ThreeUtil.createImg(13, 13, FN2Img, 130, -20, 0);

        //ffImg
        this.img[2] = ThreeUtil.createImg(13, 13, FfImg, 140, 20);

        this.group.add(this.img[0]);
        this.group.add(this.img[1]);
        this.group.add(this.img[2]);

        this.centerPoint = ThreeUtil.createImg(6, 6, tuodongdian, 0, 0, 2);
        this.movePlane.add(this.centerPoint);
        this.bottomPoint = ThreeUtil.createImg(6, 6, tuodongdian, 0, -16, 2);
        this.movePlane.add(this.bottomPoint);
        this.centerPoint.visible = false;
        this.hideOrShowForceImg(false);
    }

    //添加拖动点图片
    addDragPoint() {
        this.img[0] = ThreeUtil.createImg(13.5, 13.5, tuodongdian, 0, 0, 1);
        //增大拖动点识别区域
        this.F1Area = ThreeUtil.createPoint(20, '#fff', 40, -38.5, 0.001);
        this.F1Area.add(this.img[0]);
        this.scene.add(this.F1Area);
    }

    bindEvent() {
      //左焦点F1
      this.dragControls = new dragcontrols([this.F1Area], this.camera, this.renderer.domElement);
      this.dragControls.addEventListener('dragstart', () => {
          this.controls.enabled = false;
          this.animation.pause();
          this.animation.progress(0);
      });

      this.dragControls.addEventListener('drag', () => {

            //限定拖拽范围
            this.F1Area.position.y = this.F1Area.position.y >= -38.5 ? this.F1Area.position.y : -38.5;
            this.F1Area.position.y = this.F1Area.position.y <= 101.5 ? this.F1Area.position.y : 101.5;
            this.F1Area.position.x = Math.sqrt(Math.pow(140, 2) - Math.pow(this.F1Area.position.y + 38.5, 2)) - 100;

            //计算旋转的角度
            const dist = (this.F1Area.position.y - (-38.5)) / 140;
            this.theta = Math.asin(dist);
            this.rotatePoint.rotation.z = this.theta;

            //作用力和摩擦力
            if ((window as any).viewHandler.viewModel.$data.showCtrl) {
              this.deleteObject(this.fArrow[0], this.fArrow[3]);
              this.createForceArrow(this.theta);
            }

            //反作用力
            if ((window as any).viewHandler.viewModel.$data.showAntiForce) {
              this.deleteObject(this.fArrow[2]);
              this.createAntiForce(this.theta);
            }

            //更新角度弧线
            if (Math.round(this.theta * 180 / Math.PI) > 0) {
              this.setArrowTransparent(false, 1);
              this.gForceGroup.rotation.z = -this.theta;
              this.deleteArcLine();
              this.drawArcLine(this.theta);
            } else {
              if ((window as any).viewHandler.viewModel.$data.showAntiForce) {
                this.setArrowTransparent(true, 0.5);
              }
              this.deleteArcLine();
            }
      });

      this.dragControls.addEventListener('dragend', () => {
           this.controls.enabled = true;

           //角度超过30度后开始运动
           if (this.theta * 180 / Math.PI > 30) {
               this.slideDownAnimation(5 * Math.cos(this.theta / 1.1));
               this.animation.play();
               this.dragControls.deactivate();
               this.F1Area.children[0].material.opacity = 0.5;
           }

           //重力跟随旋转
          this.gForceGroup.rotation.z = -this.theta;
      });
    }

    //绘制斜面直线
    drawSlopeLine() {
        this.slopeLine = ThreeUtil.createPlane(140, 3, '#2B3546', 1);
        this.slopeLine.position.set(70, 0, 0);
        this.rotatePoint.add(this.slopeLine);
    }

    //绘制背景面
    createBackground() {
        const background = ThreeUtil.createPlane(this.width, 100, '#B99B73', 1);
        background.position.set(0, -88.5, 0);
        this.scene.add(background);
    }

    //添加作用力以及摩擦力箭头
    createForceArrow(angle: number) {
      const color = '#F38383';
      const purpleColor = '#6087F0';
      const distance = (30 - 30 * Math.cos(angle)) / 2;
      let ffArrow: any;
      let fnArrow: any;

      //FN箭头
      this.fArrow[0] = ThreeUtil.createLine(1, 30 * Math.cos(angle), color);
      this.fArrow[0].position.set(this.movePlane.position.x, 30 - distance, 1);

      //90度时消失
      if (Math.round(angle * 180 / Math.PI) === 90) {
        fnArrow = ThreeUtil.createTriangle(-3, 15 - distance, 3, 15 - distance, 0, 15 - distance, color);
      } else {
        fnArrow = ThreeUtil.createTriangle(-3, 15 - distance, 3, 15 - distance, 0, 20 - distance, color);
      }

      this.fArrow[0].add(fnArrow);
      this.group.add(this.fArrow[0]);

      //Ff箭头
      //0到30时越来越大
      if (angle * 180 / Math.PI <= 30 && angle * 180 / Math.PI >= 0) {

        const dist = (30 - 30 * Math.sin(angle)) / 2;
        this.fArrow[3] = ThreeUtil.createLine(30 * Math.sin(angle), 1, purpleColor);
        this.fArrow[3].position.set(15 - dist, 0, 1);

        //0度时摩擦力为0
        if (Math.round(angle * 180 / Math.PI) === 0) {
          ffArrow = ThreeUtil.createTriangle(-3, 15 - dist, 3, 15 - dist, 0 , 15 - dist, purpleColor);
          this.img[2].visible = false;
        } else {
          ffArrow = ThreeUtil.createTriangle(-3, 15 - dist, 3, 15 - dist, 0 , 20 - dist, purpleColor);
          this.img[2].visible = true;
          ffArrow.rotation.z = -Math.PI / 2;
        }

        this.fArrow[3].add(ffArrow);

        //30到90度时越来越小
      } else if (angle * 180 / Math.PI > 30 && angle * 180 / Math.PI <= 90) {

        const dist = (15 - 15 * Math.cos(angle)) / 2;
        this.fArrow[3] = ThreeUtil.createLine(15 * Math.cos(angle), 1, purpleColor);
        this.fArrow[3].position.set(7.5 - dist, 0, 1);

        if (Math.round(angle * 180 / Math.PI) === 90) {

          ffArrow = ThreeUtil.createTriangle(-3, 7.5 - dist, 3, 7.5 - dist, 0 , 7.5 - dist, purpleColor);
          this.hideOrShowForceImg(false);

        } else {

          ffArrow = ThreeUtil.createTriangle(-3, 7.5 - dist, 3, 7.5 - dist, 0 , 12.5 - dist, purpleColor);
          this.img[0].visible = true;
          this.img[2].visible = true;
          if ((window as any).viewHandler.viewModel.$data.showAntiForce) {
            this.img[1].visible = true;
            this.bottomPoint.visible = true;
          }

        }

        ffArrow.rotation.z = -Math.PI / 2;
        this.fArrow[3].add(ffArrow);
      }

      this.movePlane.add(this.fArrow[3]);
    }

    //绘制反作用力
    createAntiForce(angle: number) {
      const color = '#F38383';
      let fn2Arrow: any;
      const distance = (30 - 30 * Math.cos(angle)) / 2;
      //FN'箭头
      this.fArrow[2] = ThreeUtil.createLine(1, 30 * Math.cos(angle), color);
      this.fArrow[2].position.set(this.movePlane.position.x, -16.5 + distance, 1);

      //90度时消失
      if (Math.round(angle * 180 / Math.PI) === 90) {
        fn2Arrow = ThreeUtil.createTriangle(-3, -15 + distance, 3, -15 + distance, 0, -15 + distance, color);
      } else {
        fn2Arrow = ThreeUtil.createTriangle(-3, -15 + distance, 3, -15 + distance, 0, -20 + distance, color);
      }
      this.fArrow[2].add(fn2Arrow);
      this.group.add(this.fArrow[2]);
    }

    //重力箭头
    createGravityForce() {
        this.fArrow[1] = ThreeUtil.createLine(1, 30, '#E7CB6E');
        this.fArrow[1].position.set(0, -15, 1);
        const gArrow = ThreeUtil.createTriangle(-3, -15, 3, -15, 0, -20, '#E7CB6E');
        const gImg = ThreeUtil.createImg(13, 13, GImg, -5, -10, 0);
        this.fArrow[1].add(gImg);
        this.fArrow[1].add(gArrow);

        this.gForceGroup.add(this.fArrow[1]);
        this.gForceGroup.position.set(120, 15, 0);
        this.group.add(this.gForceGroup);
    }

    //绘制角度弧线
    drawArcLine(num: number) {
      this.arcLine = this.circleLineUtil.addEllipseLine(40, '#2B3546', 3, 1, num);
      this.scene.add(this.arcLine);
      this.thetaText = ThreeUtil.createNewRomanText('θ', 0, 0, 0, '#2B3546', 0.15);
      this.thetaText.position.set(45, 40 * Math.sin(num), 0);
      this.arcLine.add(this.thetaText);
      this.arcLine.position.set(-100, -38.5, 0);

    }

    //正方形面滑下动画
    slideDownAnimation(time: number) {
      const tween = {
        x: this.movePlane.position.x
      };

      this.animation = TweenMax.to(tween, time, {
        x: 15,
        onUpdate: () => {
            this.fArrow[0].position.x = tween.x;
            this.fArrow[2].position.x = tween.x;
            this.movePlane.position.x = tween.x;
            this.gForceGroup.position.x = tween.x;
            this.img[0].position.x = tween.x + 10;
            this.img[1].position.x = tween.x + 10;
            this.img[2].position.x = tween.x + 20;
        },
        ease: Power3.easeIn,
        onComplete: () => {
            this.dragControls.activate();
            this.fArrow[0].position.x = tween.x;
            this.fArrow[2].position.x = tween.x;
            this.F1Area.children[0].material.opacity = 1;
        },
        paused: true
      });
    }

    //删除绘制的对象
    deleteObject(obj1?: any, obj2?: any) {
      if (obj1) {
        obj1.geometry.dispose();
        obj1.material.dispose();
        this.group.remove(obj1);
      }
      if (obj2) {
        obj2.geometry.dispose();
        obj2.material.dispose();
        this.movePlane.remove(obj2);
      }
    }

    //隐藏或显示箭头和文字
    hideOrShowForceArrow(flag: boolean, obj?: any) {
      this.fArrow[0].visible = flag;
      this.fArrow[1].visible = flag;
      this.fArrow[3].visible = flag;
      if (obj) {
        obj.visible = flag;
      }
    }

    //隐藏或显示力图片
    hideOrShowForceImg(flag: boolean) {
        this.img[0].visible = flag;
        this.img[1].visible = flag;
        this.img[2].visible = flag;
        this.bottomPoint.visible = flag;
    }

    //设置箭头透明度
    setArrowTransparent(flag: boolean, opacity: number) {
      this.fArrow[1].material.transparent = flag;
      this.fArrow[1].material.opacity = opacity;
      this.fArrow[1].children[1].material.transparent = flag;
      this.fArrow[1].children[1].material.opacity = opacity;
    }

    //删除弧线
    deleteArcLine() {
      if (this.arcLine) {
        this.arcLine.geometry.dispose();
        this.arcLine.material.dispose();
        this.scene.remove(this.arcLine);
      }
    }

    reset() {
        this.theta = 0;
        this.animation.pause();
        this.animation.progress(0);
        this.rotatePoint.rotation.z = 0;
        this.gForceGroup.rotation.z = 0;
        this.F1Area.position.x = 40;
        this.F1Area.position.y = -38.5;
        this.deleteArcLine();
        this.deleteObject(this.fArrow[0], this.fArrow[3]);
        this.createForceArrow(0);
        this.centerPoint.visible = false;
        this.dragControls.activate();
        this.F1Area.children[0].material.opacity = 1;
        this.setArrowTransparent(false, 1);
        this.hideOrShowForceImg(false);
        this.hideOrShowForceArrow(false);
        this.fArrow[2].visible = false;
    }

}




