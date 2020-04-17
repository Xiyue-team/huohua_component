import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
const TrackballControls = require('three-trackballcontrols');
import tableImage from '../sub_static/img/tableImage.png';
import laserPenImage from '../sub_static/img/LaserPenImage.png';
import rulerImage from '../sub_static/img/rulerImage.png';
import leftMirrorImage from '../sub_static/img/leftMirrorImage.png';
import rightMirrorImage from '../sub_static/img/rightMirrorImage.png';
import arrowImage from '../sub_static/img/arrowImage.png';
import { Line } from '../../../../../src/three/component/Line';

export class Threejs3dModel extends ThreeBase {
    private controls: any;

    // 桌面
    tableTop: THREE.Mesh;

    // 两个平面镜
    leftMirror: THREE.Mesh;
    rightMirror: THREE.Mesh;

    // 旋转角度
    startAngle = 0;
    endAngle = 0;

    // 三条直线
    firstLine: any;
    secondLine: any;
    thirdLine: any;

    line: Line;

    // 箭头和文字f
    arrow: THREE.Mesh;
    fText: any;

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
        this.line = new Line();
        this.addStaticImage();
        this.addTableTop();
        this.addMirror();
        this.addLine();
        this.addArrow();
        this.render();
    }

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
        this.camera = new PerspectiveCamera(50, (this.width / 2) / (this.height / 2), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        if (window.env.browserInfo.isIpad) {
            this.camera.position.set(0, 0, 450);
        } else {
            this.camera.position.set(0, 0, 360);
        }

        if (window.innerWidth < 650) {
          this.camera.position.set(0, 0, 400);
        }
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
            this.renderer = new (THREE as any).CanvasRenderer();
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

    // 添加静态图片
    addStaticImage() {
      // 添加桌子
      const table = ThreeUtil.createImg(520 / 2, 168 / 2, tableImage, 0, -100);
      this.scene.add(table);

      // 添加激光笔
      const laserPen = ThreeUtil.createImg(85 / 2, 48 / 2, laserPenImage, -183, -48);
      this.scene.add(laserPen);

      // 添加尺子
      const ruler = ThreeUtil.createImg(60 / 2, 320 / 2, rulerImage, 130 + 15 + 35, 61);
      this.scene.add(ruler);

      // 添加光点初始位置
      const circle = ThreeUtil.createPoint(1.5, '#FBCD02', 165, 111.5, 1);
      this.scene.add(circle);

      const text = ThreeUtil.createNormalCenterLeftText(window.env.browserInfo.lang.initialPosition, 200, 113, 0, '#fff', 0.15);
      this.scene.add(text);
    }

    // 添加桌面
    addTableTop() {
      // 用抛物线方程计算桌面上点的坐标 x y a c 为抛物线方程的参数
      const x = 130;
      const y = 7;
      const a = y / (x * x);
      const c = 7;
      const points = [];
      points.push( new THREE.Vector2( -x, -y - c ));
      for (let i = -x; i <= x; i++) {
        points.push( new THREE.Vector2( i, (i * i * a - c) * 0.01 ));
      }
      points.push( new THREE.Vector2( x, -y - c ));

      const tableShape = new THREE.Shape( points );
      const geometry = new THREE.ShapeGeometry( tableShape );
      const material = new THREE.MeshBasicMaterial( { color: '#FFB56C', transparent: true } );
      this.tableTop = new THREE.Mesh( geometry, material ) ;
      this.tableTop.position.y = -44;
      this.scene.add( this.tableTop );
    }

    // 添加两个平面镜
    addMirror() {
      this.leftMirror = ThreeUtil.createImg(40 / 2, 200 / 2, leftMirrorImage, -75, 6);
      this.scene.add(this.leftMirror);

      this.rightMirror = ThreeUtil.createImg(40 / 2, 144 / 2, rightMirrorImage, 75, -8);
      this.scene.add(this.rightMirror);
    }

    // 添加三条直线
    addLine() {
      // 最下面的线 从激光笔射出的这一条
      this.firstLine = this.createLine(new THREE.Vector3(-170, -46, 0), new THREE.Vector3(72, 13, 0));
      this.scene.add(this.firstLine);

      // 中间的线  左侧最低23 最高48
      this.secondLine = this.createLine(new THREE.Vector3(-72, 48, 0), new THREE.Vector3(72, 13, 0));
      this.scene.add(this.secondLine);

      // 反射到尺子上的线 右侧最高111.5 最低111.5 - 36
      this.thirdLine = this.createLine(new THREE.Vector3(-72, 48, 0), new THREE.Vector3(165, 111.5, 0));
      this.scene.add(this.thirdLine);
    }

    createLine(startPoint: THREE.Vector3, endPoint: THREE.Vector3) {
      const line = this.line.createLine({
        startPoint: startPoint,
        endPoint: endPoint,
        lineWidth: 1000,
        lineWidthScale: 0.002,
        color: '#FBCD02',
      });

      return line;
    }

    addArrow() {
      // 最小y -65
      this.arrow = ThreeUtil.createImg(30 / 2, 84 / 2, arrowImage, 0, -50);
      this.scene.add(this.arrow);
      this.arrow.visible = false;
      this.arrow.scale.set(0.3, 0.3, 1);

      this.fText = ThreeUtil.createNormalText('F', 10, -65, 0, '#fff', 0.3);
      this.fText.visible = false;
      this.scene.add(this.fText);
    }

    // 压桌面
    pressTableTop(scale: number) {
      this.endAngle = scale;
      // sclae 最小值0.01 最大值0.3
      const x = 130;
      const y = 7;
      const a = y / (x * x);
      const c = 7;

      const points = [];

      points.push( new THREE.Vector2( -x, -y - c ));

      for (let i = -x; i <= x; i++) {
        points.push( new THREE.Vector2( i, (i * i * a - c) * scale ));
      }

      points.push( new THREE.Vector2( x, -y - c ));

      this.tableTop.geometry.dispose();
      const tableShape = new THREE.Shape( points );
      this.tableTop.geometry = new THREE.ShapeGeometry( tableShape );

      // 倾斜两个平面镜
      this.leftMirror.rotateZ(-Math.PI / 180 * (this.endAngle - this.startAngle) * 5);
      this.rightMirror.rotateZ(Math.PI / 180 * (this.endAngle - this.startAngle) * 5);
      this.leftMirror.position.y = 6 - 1.5 * (scale / 0.3);
      this.rightMirror.position.y = -8 - 1.5 * (scale / 0.3);
      this.startAngle = this.endAngle;

      this.removeLine(this.secondLine);
      this.secondLine = this.createLine(new THREE.Vector3(-72, 48 - 3 * (scale / 0.3), 0), new THREE.Vector3(72, 13, 0));
      this.scene.add(this.secondLine);

      this.removeLine(this.thirdLine);
      this.thirdLine = this.createLine(
        new THREE.Vector3(-72, 48 - 3 * (scale / 0.3), 0),
        new THREE.Vector3(165, 111.5 - 36 * (scale / 0.3), 0)
      );
      this.scene.add(this.thirdLine);

      // 显示隐藏箭头
      if (scale > 0) {
        this.arrow.visible = true;
        this.fText.visible = true;
      } else {
        this.arrow.visible = false;
        this.fText.visible = false;
      }

      // 放大箭头
      this.arrow.scale.set(0.3 + 0.7 * (scale / 0.3), 0.3 + 0.7 * (scale / 0.3), 1);
      this.arrow.position.y = -50 - 16.5 * (scale / 0.3);

    }

    // 删除线
    removeLine(mesh: any) {
      mesh.geometry.dispose();
      mesh.material.dispose();
      this.scene.remove(mesh);
    }

    resize()  {
      const dom = document.getElementById('3dContainer');
      const width = dom.clientWidth;
      const height = dom.clientHeight;
      (this.camera as PerspectiveCamera).aspect = width / height;
      (this.camera as PerspectiveCamera).updateProjectionMatrix();
      this.renderer.render(this.scene, this.camera);
      this.renderer.setSize(width, height);
    }
}




