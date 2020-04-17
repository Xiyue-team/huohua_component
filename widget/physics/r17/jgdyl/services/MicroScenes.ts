/**
 * 微观类
 *@since 2.0
 *@author zhiguo
 *@Date 18-10-27 上午9:41
 *
 */

import * as THREE from 'three';
import { Linear, TweenMax } from 'gsap';

import * as xPointPath from '../sub_static/point.png';
import * as xPath from '../sub_static/x.png';
import * as ballImg from '../sub_static/dianZiImage.png';

import * as decompose from '../sub_static/decompose.png';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Line } from '../../../../../src/three/component/Line';
import { ViewModel } from '../ViewModel';

export class MicroModel {


  group: THREE.Group;


  sphere: any;

  // 圆周运动
  circleAnimation: any;
  // 螺旋线运动
  spiralCurveAnimation: any;

  private circleTrajectory: THREE.Mesh;
  // 螺旋曲线
  private spiralCurve: THREE.Mesh;
  private nMax: number;

  //磁场的起始点
  magneticBeginX = -30;
  magneticBeginZ  = 30;

  //磁感线X
  private magneticX: any = [];
  //磁感线圆点
  private magneticPoint: any = [];
  //磁感线本身
  private magneticLine: any = [];

  decomposeButton: any;

  // 文字
  text: any;

  // 虚线
  dashLine: any;

  // 控制器
  controls: any;

  viewModel = new ViewModel();

  constructor(scene: THREE.Scene, controls: any) {
    this.controls = controls;
    this.group = new THREE.Group();
    this.text = new THREE.Group();
    scene.add(this.group);

    this.initLight();
    this.initDecomposeButton();
    this.initHelixCurve();
    this.initBall();
    this.initText();
    this.initBallAnimation();
    this.initMagentic();
    this.initCircle();
    this.initDashLine();
  }

  initLight() {

    const lightAm = new THREE.AmbientLight( 0xffffff, 1);
    this.group.add(lightAm);

    const directionalLight4 = new THREE.HemisphereLight( '#ffffff', '#ffffff', 0.3 );
    directionalLight4.color.setHSL(.6, 1, .6);
    directionalLight4.groundColor.setHSL(.095, 1, .75);
    directionalLight4.position.set(0, 0, 0);
    this.group.add( directionalLight4 );

   /* const c = new THREE.DirectionalLight('#F0F0F0', 0.05);
    c.position.set(200, 2000, 100);
    const u = new THREE.DirectionalLight('#F0F0F0', 0.05);
    u.position.set(-200, -2000, -100);
    this.group.add( c );
    this.group.add( u );*/
  }

  // 速度分解按钮
  initDecomposeButton() {
      this.decomposeButton = ThreeUtil.createImg(56 / 4, 56 / 4, decompose, 0, 0);
      this.group.add(this.decomposeButton);
      this.decomposeButton.position.set(21, 24, 31);

      const text = ThreeUtil.createNormalText('速度分解', 18, 2, 0, '#FFFFFF');
      text.scale.set(0.1, 0.1, 0.1);
      //this.decomposeButton.add(text);

      this.decomposeButton.on('mousedown', () => {
        console.log('111111');
        this.sphere.children[1].visible = true;
        this.sphere.children[2].visible = true;

        this.decomposeButton.visible = false;

        // 显示vx vy 提示文字可旋转
        this.text.children[2].visible = true;
        this.text.children[3].visible = true;
        this.text.children[4].visible = true;

        // 显示虚线
        this.dashLine.visible = true;

        // 设置场景可选装
        this.controls.enableRotate = true;
      });

      this.decomposeButton.on('touchstart', () => {
      console.log('111111');
      this.sphere.children[1].visible = true;
      this.sphere.children[2].visible = true;

      this.decomposeButton.visible = false;

      // 显示vx vy 提示文字可旋转
      this.text.children[2].visible = true;
      this.text.children[3].visible = true;
      this.text.children[4].visible = true;

      // 显示虚线
      this.dashLine.visible = true;

      // 设置场景可选装
      this.controls.enableRotate = true;
    });
  }

  // 螺旋轨迹
  initHelixCurve() {
    const points = [];
    for ( let i = 0; i < 61; i ++ ) {
      points.push( new THREE.Vector3( Math.cos( i * Math.PI / -10 ), i / 18, Math.sin( i * Math.PI / -10 ) ).multiplyScalar( 15 ) );
    }

    const path = new THREE.CatmullRomCurve3( points );

    // params
    const pathSegments = 512;
    const tubeRadius = 0.5;
    const radiusSegments = 8;
    const closed = false;

    // geometry
    const geometry1 = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );

    const geometry = new THREE.BufferGeometry().fromGeometry( geometry1 );
    this.nMax = (geometry as any).attributes.position.count;

    const material = new THREE.MeshPhongMaterial( {
      color: 0xD73D1D,
      side: THREE.DoubleSide
    } );

    // mesh
    this.spiralCurve = new THREE.Mesh( geometry, material );
    this.spiralCurve.position.set(-10, 0, 15);
    this.spiralCurve.rotateY(-Math.PI / 2);
    this.group.add(this.spiralCurve);
    (this.spiralCurve.geometry as any).setDrawRange( 0, 1 );
  }

  // 圆形轨迹
  initCircle() {
    const geometry = new THREE.TorusGeometry( 15, 0.5, 16, 100, Math.PI / 180);
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    this.circleTrajectory = new THREE.Mesh( geometry, material );
    this.circleTrajectory.rotateX(Math.PI / 2);
    this.circleTrajectory.rotateZ(Math.PI / 2);
    this.circleTrajectory.position.set(-10, 0, 15);
    this.group.add( this.circleTrajectory );
  }

  // 初始化电子
  initBall() {
    const xMap = THREE.ImageUtils.loadTexture(ballImg as any, null);
    const material = new THREE.MeshPhongMaterial( {
      color: 0XFFFFFF,
      //材质自发光颜色色
      side: THREE.FrontSide,
      map: xMap,
      flatShading: true } );
    const geometry = new THREE.SphereGeometry( 2, 32, 32 );
    this.sphere = new THREE.Mesh( geometry, material );
    this.sphere.position.set(-10, 0, 30);
    this.sphere.rotateY(-Math.PI / 2);
    this.group.add( this.sphere );

    const geometryRotateArrow = new THREE.SphereGeometry( 0.01, 32, 32 );
    const materialRotateArrow = new THREE.MeshBasicMaterial( {color: 0x000000, transparent: true, opacity: 0.01} );
    const rotateArrowV = new THREE.Mesh( geometryRotateArrow, materialRotateArrow );

    const arrowV = this.createArrow(5, 24, 0xCC3000, 2, 0.5);
    arrowV.position.set(0, 12, 0);
    rotateArrowV.add( arrowV );
    rotateArrowV.rotateY(Math.PI / 2);
    rotateArrowV.rotateZ(-Math.PI / 3.95);
    this.sphere.add(rotateArrowV);

    const rotateArrowVx = new THREE.Mesh( geometryRotateArrow, materialRotateArrow );
    const arrowVx = this.createArrow(5, 16, 0xAA26CA, 2, 0.5);
    arrowVx.position.set(0, 8, 0);
    rotateArrowVx.add( arrowVx );
    rotateArrowVx.rotateY(Math.PI / 2);
    rotateArrowVx.rotateZ(-Math.PI / 2);
    this.sphere.add(rotateArrowVx);

    const rotateArrowVy = new THREE.Mesh( geometryRotateArrow, materialRotateArrow );
    const arrowVy = this.createArrow(5, 16, 0xAA26CA, 2, 0.55);
    arrowVy.position.set(0, 8, 0.5);
    rotateArrowVy.add( arrowVy );
    rotateArrowVy.rotateY(Math.PI / 2);
    this.sphere.add(rotateArrowVy);

    const rotateArrowF = new THREE.Mesh( geometryRotateArrow, materialRotateArrow );
    const arrowF = this.createArrow(5, 10, 0xCC3000, 2, 0.55);
    arrowF.position.set(0, 5, 0);
    rotateArrowF.add( arrowF );
    rotateArrowF.rotateY(Math.PI / 2);
    rotateArrowF.rotateX(-Math.PI / 2);
    this.sphere.add(rotateArrowF);

    this.sphere.children[1].visible = false;
    this.sphere.children[2].visible = false;
    console.log('this.sphere', this.sphere);
  }

  // 初始化文字
  initText() {
    const textF = ThreeUtil.createNewRomanText('F', -10, 2, 13, '#FFFFFF', 0.1);
    this.text.add(textF);

    const textV = ThreeUtil.createNewRomanText('V', 13, 23, 30, '#FFFFFF', 0.1);
    this.text.add(textV);

    const textVx = ThreeUtil.createNewRomanText('Vx', 11, 0, 30, '#FFFFFF', 0.1);
    this.text.add(textVx);

    const textVy = ThreeUtil.createNewRomanText('Vy', -14, 22, 30, '#FFFFFF', 0.1);
    this.text.add(textVy);

    const textTips = ThreeUtil.createNormalText('场景可旋转', 0, -55, 0, '#FFFFFF');
    textTips.scale.set(0.1, 0.1, 0.1);
    this.text.add(textTips);

    this.group.add(this.text);
    this.text.children[0].visible = false;
    this.text.children[2].visible = false;
    this.text.children[3].visible = false;
    this.text.children[4].visible = false;
  }

  initDashLine() {
    this.dashLine = new THREE.Group();
    const line = new Line();
    const dashlineVx = line.createLine({
      startPoint: new THREE.Vector3(11, 0, 30),
      endPoint: new THREE.Vector3(11, 20.5, 30),
      depthTest: true,
      dashLine: true,
      lineWidth: 1.5,
      color: '#FFFFFF'
    });
    this.dashLine.add(dashlineVx);

    const dashlineVy = line.createLine({
      startPoint: new THREE.Vector3(-10, 20.5, 30),
      endPoint: new THREE.Vector3(11, 20.5, 30),
      depthTest: true,
      dashLine: true,
      lineWidth: 1.5,
      color: '#FFFFFF'
    });
    this.dashLine.add(dashlineVy);
    this.dashLine.visible = false;
    this.group.add(this.dashLine);
  }

  /** 创建磁感线 **/
  initMagentic() {
    /* 1.磁感线圆柱 */
    //圆柱
    const cube = this.createArrow(5, 90, 0x00E3E3, 0.5, 0.1);

    /* 2.磁感线本身 */
    //圆柱顶部×
    const circle = ThreeUtil.createImg(5, 5, xPath, 0, 0);
    (circle as any).material.side = THREE.FrontSide;
    circle.rotateX(Math.PI / 2);
    circle.position.y = -45;


    /* 3.磁感线圆点  */
    const point = ThreeUtil.createImg(5, 5, xPointPath, 0, 0);
    (point as any).material.side = THREE.BackSide;
    point.rotateX(Math.PI / 2);
    point.position.y = 55.001 ;

    const row = 4;
    const col = 4;
    for (let i = 0; i < row; i++) {
      const z = this.magneticBeginZ - i * 20;
      for (let j = 0; j < col; j++) {
        const x = this.magneticBeginX + j * 20;
        //创建磁感线
        const magentCube = cube.clone();
        const magentCircle = circle.clone();
        const magentPoint  = point.clone();

        magentCircle.position.x = x;
        magentCircle.position.z = z;
        magentCircle.visible = false;

        magentCube.position.x = x;
        magentCube.position.z = z;
        magentCube.visible = true;

        magentPoint.position.x = x;
        magentPoint.position.z = z;
        magentPoint.visible = false;

        this.magneticX.push(magentCircle);
        this.magneticLine.push(magentCube);
        this.magneticPoint.push(magentPoint);

        this.group.add(magentCube);
        this.group.add(magentCircle);
        this.group.add(magentPoint);
      }
    }
  }

  createArrow(coneLength: number, cylinderLength: number, color?: any, coneRadius?: number, cylinderRadius?: number) {
      coneRadius = !coneRadius ?  2 : coneRadius;
      cylinderRadius = !cylinderRadius ?  1 : cylinderRadius;
      color = !color ?  0x000000 : color;
      const arrow = new THREE.Object3D();

      const geometry = new THREE.ConeBufferGeometry( coneRadius, coneLength, 32 );
      const material = new THREE.MeshBasicMaterial( {color: color} );
      const cone = new THREE.Mesh( geometry, material );

      arrow.add( cone );

      const geometryCylinder = new THREE.CylinderGeometry( cylinderRadius, cylinderRadius, cylinderLength, 32 );
      const materialCylinder = new THREE.MeshBasicMaterial( {color: color} );
      const cylinder = new THREE.Mesh( geometryCylinder, materialCylinder );
      arrow.add( cylinder );

      cone.position.set(0, cylinderLength / 2 + coneLength / 2, 0);

      return arrow;
  }

  renderShowMagnetic(camera: any) {
    if (camera.position.y > 99 || camera.position.y < -99) {
      this.hideMagnetic();
      this.showMagneticX();
    } else {
      if ((this.magneticLine[0] as THREE.Object3D).visible === false) {
        this.showMagnetic();
        this.hideMagneticX();
      }
    }

    if (camera.position.z !== 100) {
      if (this.text.children[4].visible === true) {
        this.text.children[4].visible = false;
        this.text.children[0].visible = true;
        this.text.children[1].visible = false;
        this.sphere.children[0].visible = false;
        this.dashLine.visible = false;

        (window as any).viewHandler.viewModel.$data.showButton = true;
        //(window as any).viewHandler.viewModel.$data.isActive1 = false;
      }
    }
    // console.log(camera.position);
  }

  //显示磁感线
  private showMagnetic(): void {
    for (let i = 0; i < this.magneticLine.length; i++) {
      (this.magneticLine[i] as THREE.Object3D).visible = true;
    }
  }

  // 隐藏磁感线
  private hideMagnetic(): void {
    for (let i = 0; i < this.magneticLine.length; i++) {
      (this.magneticLine[i] as THREE.Object3D).visible = false;
    }
  }

  //显示磁感线底部X
  private showMagneticX(): void {
    for (let i = 0; i < this.magneticX.length; i++) {
      (this.magneticX[i] as THREE.Object3D).visible = true;
      (this.magneticPoint[i] as THREE.Object3D).visible = true;
    }
  }

  private hideMagneticX(): void {
    for (let i = 0; i < this.magneticX.length; i++) {
      (this.magneticX[i] as THREE.Object3D).visible = false;
      (this.magneticPoint[i] as THREE.Object3D).visible = false;
    }
  }

  initBallAnimation() {
    const tween = {
      angle: Math.PI / 2,
    };

    let lastAngle = Math.PI / 2;
    let newAngle = Math.PI / 2;
    // 圆周运动
    this.circleAnimation = TweenMax.to(tween, 2, {
      angle: Math.PI / 2 - Math.PI * 2,
      onStart: () => {
        lastAngle = Math.PI / 2;
        newAngle = Math.PI / 2;

        // 隐藏箭头Vy 和 V 显示Vx F洛
        this.sphere.children[0].visible = false;
        this.sphere.children[2].visible = false;
        this.sphere.children[1].visible = true;
        this.sphere.children[3].visible = true;

        // 隐藏文字和虚线
        this.hideTextAndLine();

        this.resetSpiralCurveAnimation();
      },
      onUpdate: () => {
        // 移动电子
        this.sphere.position.set(Math.cos(tween.angle) * 15 - 10, 0, Math.sin(tween.angle) * 15 + 15);
        // 显示圆形轨迹
        this.updateCircleTrajectory(this.circleTrajectory, tween.angle - Math.PI / 2);
        // 旋转箭头
        newAngle = tween.angle;
        this.sphere.rotateY(-(newAngle - lastAngle));
        lastAngle = newAngle;
      },
      onComplete: () => {

      },
      ease:  Linear.easeNone,
      paused: true
    });

    const tween2 = {
      angle: Math.PI / 2,
      nMax: 0,
      y: 0,
    };
    let nEnd = 0;
    const nStep = 10;
    // 螺旋线运动
    this.spiralCurveAnimation = TweenMax.to(tween2, 5, {
      angle: Math.PI / 2 - Math.PI * 6,
      nMax: this.nMax,
      y: 50,
      onStart: () => {
        lastAngle = Math.PI / 2;
        newAngle = Math.PI / 2;

        // 隐藏箭头V 显示Vx Vy F洛
        this.sphere.children[0].visible = false;
        this.sphere.children[1].visible = true;
        this.sphere.children[2].visible = true;
        this.sphere.children[3].visible = true;

        // 隐藏文字和虚线
        this.hideTextAndLine();

        // 重置圆周动画
        this.resetCircleAnimation();
      },
      onUpdate: () => {
        // 显示螺旋线
        this.sphere.position.set(Math.cos(tween2.angle) * 15 - 10, tween2.y, Math.sin(tween2.angle) * 15 + 15);
        nEnd = ( nEnd + nStep ) % this.nMax;
        (this.spiralCurve.geometry as any).setDrawRange( 0, tween2.nMax );
        // 旋转箭头
        newAngle = tween2.angle;
        this.sphere.rotateY(-(newAngle - lastAngle));
        lastAngle = newAngle;
      },
      onComplete: () => {
          (window as any).viewHandler.viewModel.$data.isActive1 = false;
         /* //  隐藏微观
          this.hideScene();
        // 显示宏观
        (window as any).viewHandler.auroraScenes.macroModel.showScene();
        (window as any).viewHandler.auroraScenes.macroModel.controls.noRotate = false;*/
      },
      ease:  Linear.easeNone,
      paused: true
    });
  }

  updateCircleTrajectory(circle: THREE.Mesh, arc: number) {
    circle.geometry.dispose();
    circle.geometry = new THREE.TorusGeometry( 15, 0.5, 16, 100, arc);
  }

  hideTextAndLine() {
    // 隐藏文字
    this.text.children[0].visible = false;
    this.text.children[1].visible = false;
    this.text.children[2].visible = false;
    this.text.children[3].visible = false;
    this.text.children[4].visible = false;

    // 隐藏虚线
    this.dashLine.visible = false;
  }

  // 重置圆周运动
  resetCircleAnimation() {
    this.circleAnimation.progress(0);
    this.circleAnimation.pause();
    this.updateCircleTrajectory(this.circleTrajectory, Math.PI / 1800);
  }

  // 重置螺旋线运动
  resetSpiralCurveAnimation() {
    this.spiralCurveAnimation.progress(0);
    this.spiralCurveAnimation.pause();
  }

  showScene() {
    this.group.visible = true;

    // 禁止旋转
    this.controls.enableRotate = false;
    this.controls.enableZoom = false;
    (window as any).viewHandler.auroraScenes.macroModel.controls.noRotate = true;
    this.resetCamera();
  }

  hideScene() {
    this.group.visible = false;

    this.controls.enableZoom = false;

    // 重置按钮
    clearTimeout((window as any).viewHandler.viewModel.$data.circleTimeout);
    clearTimeout((window as any).viewHandler.viewModel.$data.spiralCurveTimeout);
    (window as any).viewHandler.viewModel.$data.showButton = false;
    (window as any).viewHandler.viewModel.$data.disableStatus = false;
    (window as any).viewHandler.viewModel.$data.startCircleAnimation = false;
    (window as any).viewHandler.viewModel.$data.startSpiralCurveAnimation = false;
  }

  resetCamera() {
    for (let i = 0; i < 31; i++) {
      this.controls.reset();
      this.controls.object.lookAt(new THREE.Vector3(0,  0,  0));
      this.controls.object.position.set(0, 0, 100);
    }
  }

  reset() {
    // 重置动画
    this.resetCircleAnimation();
    this.resetSpiralCurveAnimation();

    // 显示按钮
    this.decomposeButton.visible = true;
    this.sphere.children[0].visible = true;
    this.sphere.children[1].visible = false;
    this.sphere.children[2].visible = false;
    this.sphere.children[3].visible = true;

    // 隐藏虚线
    this.dashLine.visible = false;

    // 禁止旋转
    this.controls.enableRotate = false;

    // 显示文字
    this.text.children[0].visible = false;
    this.text.children[1].visible = true;
    this.text.children[2].visible = false;
    this.text.children[3].visible = false;
    this.text.children[4].visible = false;
  }
}
