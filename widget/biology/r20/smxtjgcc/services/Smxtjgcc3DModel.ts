import * as THREE from 'three';
import * as pointImage from '../sub_static/pointImage.png';
import * as earthImage from '../sub_static/earthImage.jpg';
import * as ecosystemImage from '../sub_static/ecosystemImage.jpg';
import * as populationAndCommunityImage from '../sub_static/populationAndCommunityImage.jpg';
import * as tortoiseImage from '../sub_static/tortoiseImage.jpg';
import * as bloodCirculatorySystemImage from '../sub_static/bloodCirculatorySystemImage.jpg';
import * as heartImage from '../sub_static/heartImage.jpg';
import * as myocardialTissueImage from '../sub_static/myocardialTissueImage.png';
import * as cardiomyocytesImage from '../sub_static/CardiomyocytesImage.jpg';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Linear, TweenMax } from 'gsap';
export class Smxtjgcc3DModel {

  scene: any;
  camera: any;
  renderer: any;

  // 地球
  earth: any;
  // 生态系统
  ecosystem: any;
  // 种群和群落
  populationAndCommunity: any;
  // 乌龟
  tortoise: any;
  // 血液循环系统
  bloodCirculatorySystem: any;
  // 心脏
  heart: any;
  // 心肌组织
  myocardialTissue: any;
  // 心肌细胞
  cardiomyocytes: any;

  // 按钮图片
  pointImage: any = [];

  imageAnimation: any = [];

  constructor(scene?: any , camrea?: any, renderer?: any) {
    this.scene = scene;
    this.camera = camrea;
    this.renderer = renderer;
    this.initImage();
    this.initPointImage();
    this.initAnimation();
    this.initClickEvent();
  }

  // 添加图片
  initImage() {
    this.earth = ThreeUtil.createImg(1024, 576, earthImage, 0, 0, 0);
    this.scene.add(this.earth);

    const scale = 0.1;
    this.ecosystem = ThreeUtil.createImg(1024 * scale, 576 * scale, ecosystemImage, 0, 0, 0);
    this.scene.add(this.ecosystem);

    this.populationAndCommunity = ThreeUtil.createImg(1024 * scale, 576 * scale, populationAndCommunityImage, 0, 0, 0);
    this.scene.add(this.populationAndCommunity);

    this.tortoise = ThreeUtil.createImg(1024 * scale, 576 * scale, tortoiseImage, 0, 0, 0);
    this.scene.add(this.tortoise);

    this.bloodCirculatorySystem = ThreeUtil.createImg(1024 * scale, 576 * scale, bloodCirculatorySystemImage, 0, 0, 0);
    this.scene.add(this.bloodCirculatorySystem);

    this.heart = ThreeUtil.createImg(1024 * scale, 576 * scale, heartImage, 0, 0, 0);
    this.scene.add(this.heart);

    this.myocardialTissue = ThreeUtil.createImg(1024 * scale, 576 * scale, myocardialTissueImage, 0, 0, 0);
    this.scene.add(this.myocardialTissue);

    this.cardiomyocytes = ThreeUtil.createImg(1024 * scale, 576 * scale, cardiomyocytesImage, 0, 0, 0);
    this.scene.add(this.cardiomyocytes);

    this.ecosystem.visible = false;
    this.populationAndCommunity.visible = false;
    this.tortoise.visible = false;
    this.bloodCirculatorySystem.visible = false;
    this.heart.visible = false;
    this.myocardialTissue.visible = false;
    this.cardiomyocytes.visible = false;
  }

  // 添加按钮
  initPointImage() {
    this.pointImage[0] = ThreeUtil.createImg(48, 48, pointImage, -23, 31, 0);
    this.scene.add(this.pointImage[0]);

    this.pointImage[1] = ThreeUtil.createImg(48, 48, pointImage, -194, -55, 0);
    this.scene.add(this.pointImage[1]);

    this.pointImage[2] = ThreeUtil.createImg(48, 48, pointImage, -16, -24, 0);
    this.scene.add(this.pointImage[2]);

    this.pointImage[3] = ThreeUtil.createImg(48, 48, pointImage, 31, -16, 0);
    this.scene.add(this.pointImage[3]);

    this.pointImage[4] = ThreeUtil.createImg(48, 48, pointImage, -31, -30, 0);
    this.scene.add(this.pointImage[4]);

    this.pointImage[5] = ThreeUtil.createImg(48, 48, pointImage, 0, 0, 0);
    this.scene.add(this.pointImage[5]);

    this.pointImage[6] = ThreeUtil.createImg(48, 48, pointImage, 0, 0, 0);
    this.scene.add(this.pointImage[6]);

    this.pointImage[1].visible = false;
    this.pointImage[2].visible = false;
    this.pointImage[3].visible = false;
    this.pointImage[4].visible = false;
    this.pointImage[5].visible = false;
    this.pointImage[6].visible = false;
  }

  initAnimation() {
    this.imageAnimation[0] = this.createAnimation(this.ecosystem, -23, 31, 0, this.earth, this.pointImage[1], 1, false);
    this.imageAnimation[1] = this.createAnimation(this.populationAndCommunity, -194, -55, 0, this.ecosystem, this.pointImage[2], 2, false);
    this.imageAnimation[2] = this.createAnimation(this.tortoise, -16, -24, 0, this.populationAndCommunity, this.pointImage[3], 3, false);
    this.imageAnimation[3] = this.createAnimation2(this.bloodCirculatorySystem, 31, -16, 0, this.tortoise, this.pointImage[4], 4, false);
    this.imageAnimation[4] = this.createAnimation(this.heart, -31, -30, 0, this.bloodCirculatorySystem, this.pointImage[5], 5, false);
    this.imageAnimation[5] = this.createAnimation(this.myocardialTissue, 0, 0, 0, this.heart, this.pointImage[6], 6, true);
    this.imageAnimation[6] = this.createAnimation(this.cardiomyocytes, 0, 0, 0, this.myocardialTissue, null, 7, false);
  }

  // 创建放大动画
  createAnimation(image: any, x: number, y: number, z: number, image2: any, buttonImage?: any,
                  showNameText?: number, showTitleText2?: boolean) {
    const tween = {
      x: x,
      y: y,
      z: z,
    };

    const animation = TweenMax.to(tween, 1, {
      x: 0,
      y: 0,
      z: 557,
      onStart: () => {
        image.visible = true;
        image2.visible = true;
      },
      onUpdate: () => {
        image.position.x = tween.x;
        image.position.y = tween.y;
        image.position.z = tween.z + 1;
        image2.position.z = tween.z;
      },
      onComplete: () => {
        image2.visible = false;
        animation.progress(0);
        animation.pause();
        this.updateMesh(image);
        if (!!buttonImage) {
          // 显示按钮
          buttonImage.visible = true;
        }

        if (!!showNameText) {
          (window as any).viewHandler.viewModel.$data.showNameText = showNameText;
        }
        (window as any).viewHandler.viewModel.$data.showTitleText2 = showTitleText2;
      },
      paused: true,
      ease:  Linear.easeIn,
    });

    return animation;
  }

  // 创建透明动画
  createAnimation2(image: any, x: number, y: number, z: number, image2: any, buttonImage?: any,
                   showNameText?: number, showTitleText2?: boolean) {
    const tween = {
      opacity: 1,
    };

    const animation = TweenMax.to(tween, 1, {
      opacity: 0,
      onStart: () => {
        // 显示两个图
        image.visible = true;
        image2.visible = true;
        this.updateMesh(image);
        // 设置背景图在前
        image2.position.z = 1;
        image2.material.transparent = true;
      },
      onUpdate: () => {
        image2.material.opacity = tween.opacity;
      },
      onComplete: () => {
        // 隐藏背景
        image2.position.z = 0;
        image2.visible = false;
        // 重置按阿牛
        animation.progress(0);
        animation.pause();
        this.updateMesh(image);
        if (!!buttonImage) {
          // 显示按钮
          buttonImage.visible = true;
        }

        if (!!showNameText) {
          (window as any).viewHandler.viewModel.$data.showNameText = showNameText;
        }
        (window as any).viewHandler.viewModel.$data.showTitleText2 = showTitleText2;
      },
      paused: true,
      ease:  Linear.ease,
    });

    return animation;
  }

  updateMesh(mesh: THREE.Mesh) {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.PlaneBufferGeometry( 1024, 576, 32 );
    mesh.position.set(0, 0, 0);
  }

  initClickEvent() {
    this.pointClickEvent(this.pointImage[0], this.imageAnimation[0]);
    this.pointClickEvent(this.pointImage[1], this.imageAnimation[1]);
    this.pointClickEvent(this.pointImage[2], this.imageAnimation[2]);
    this.pointClickEvent(this.pointImage[3], this.imageAnimation[3]);
    this.pointClickEvent(this.pointImage[4], this.imageAnimation[4]);
    this.pointClickEvent(this.pointImage[5], this.imageAnimation[5]);
    this.pointClickEvent(this.pointImage[6], this.imageAnimation[6]);
  }

  // 给按钮绑定事件
  pointClickEvent(point: any, animation: any) {
    point.on('click', () => {
      point.visible = false;
      animation.play();
    });
  }

  reset() {
    // 显示按钮
    this.pointImage[0].visible = true;
    this.pointImage[1].visible = false;
    this.pointImage[2].visible = false;
    this.pointImage[3].visible = false;
    this.pointImage[4].visible = false;
    this.pointImage[5].visible = false;
    this.pointImage[6].visible = false;

    // 显示第一张背景图
    this.earth.visible = true;
    this.ecosystem.visible = false;
    this.populationAndCommunity.visible = false;
    this.tortoise.visible = false;
    this.bloodCirculatorySystem.visible = false;
    this.heart.visible = false;
    this.myocardialTissue.visible = false;
    this.cardiomyocytes.visible = false;

    // 重置图片大小
    this.resetImageMesh(this.ecosystem);
    this.resetImageMesh(this.populationAndCommunity);
    this.resetImageMesh(this.tortoise);
    this.resetImageMesh(this.bloodCirculatorySystem);
    this.resetImageMesh(this.heart);
    this.resetImageMesh(this.myocardialTissue);
    this.resetImageMesh(this.cardiomyocytes);
  }

  // 重置放大图的初始大小
  resetImageMesh(mesh: THREE.Mesh) {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.PlaneBufferGeometry( 1024 * 0.1, 576 * 0.1, 32 );
    mesh.position.set(0, 0, 0);
  }
}

