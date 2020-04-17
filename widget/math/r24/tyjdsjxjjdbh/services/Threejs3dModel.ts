import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import * as point from '../sub_static/point.png';
import * as changedAngle from '../sub_static/changedAngle.png';
import { Line } from '../../../../../src/three/component/Line';
const TrackballControls = require('three-trackballcontrols');
const dragcontrols = require('three-dragcontrols').default;
export class Threejs3dModel extends ThreeBase {

    private controls: any;
    private line: Line;
    private ellipse: any;
    private dragImageP: any;
    private a = 40;
    private b = 30;
    private c = Math.sqrt(Math.pow(this.a, 2) - Math.pow(this.b, 2));
    private linePF1: any;
    private linePF2: any;
    private changedAngleText: any;

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
        this.initAxis();
        this.initEllipse();
        this.addStaticTexts();
        this.addDragPoint();
        this.bindEvent();
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
        this.camera = new PerspectiveCamera(50, (this.width / 2) / (this.height / 2), near, far);
        this.camera.lookAt(new THREE.Vector3(0,  0,  0));
        this.camera.position.set(0,  0,  280);
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

    //加载坐标轴
    initAxis() {
      const axis = AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10']} as any);
      this.scene.add(axis);
    }

    //加载椭圆
    initEllipse() {
          const curve = new THREE.EllipseCurve(
            0,  0,
            this.a, this.b,
            0,   2 * Math.PI,
            true,
            0
          );
          const path = new THREE.Path( curve.getPoints( 3000 ) );
          const geometry = path.createPointsGeometry( 3000 );
          this.ellipse = ThreeUtil.createTube(geometry.vertices, 0.3, geometry.vertices.length, '#000000');
          this.scene.add(this.ellipse);
    }

    //加载静态文字
    addStaticTexts() {
        const aText = ThreeUtil.createNewRomanText('A', 45, 8, 0, '#ED2CE8', 0.15);
        const bText = ThreeUtil.createNewRomanText('B', -5, 38, 0, '#ED2CE8', 0.15);
        const f1Text = ThreeUtil.createNewRomanText('F', -25, -5, 0, '#FFA72D', 0.15);
        const oneText = ThreeUtil.createNormalText('₁', 20, -5, 0, '#FFA72D', 1);
        const f2Text = ThreeUtil.createNewRomanText('F', 25, -5, 0, '#FFA72D', 0.15);
        const twoText = ThreeUtil.createNormalText('₂', 20, -5, 0, '#FFA72D', 1);
        f1Text.add(oneText);
        f2Text.add(twoText);
        this.scene.add(aText);
        this.scene.add(bText);
        this.scene.add(f1Text);
        this.scene.add(f2Text);
    }

    //加载拖拽点P及创建初始线段PF1和PF2
    addDragPoint() {
         this.dragImageP = ThreeUtil.createImg(14, 14, point);
         const textP = ThreeUtil.createNewRomanText('P', 7, 10, 2, '#FFA72D', 0.15);
         this.dragImageP.add(textP);
         this.dragImageP.position.set(this.b, Math.sqrt(Math.pow(this.b, 2) -
           ((Math.pow(this.b, 2) * Math.pow(this.b, 2))) / Math.pow(this.a, 2)), 1);
         this.scene.add(this.dragImageP);
         this.linePF1 = this.addSegment(-this.c, this.dragImageP);
         this.linePF2 = this.addSegment(this.c, this.dragImageP);
         this.scene.add(this.linePF1);
         this.scene.add(this.linePF2);
         const angleText = this.getAngle(this.dragImageP);
         //添加∠F1PF2图片及文字
         const changedAngleImg = ThreeUtil.createImg(103 / 2, 28 / 2, changedAngle, -90, -70, 0);
         this.changedAngleText = ThreeUtil.createNormalText((angleText * 180 / Math.PI).toFixed(0) + '°', 35, 5, 0, '#000', 0.18);
         changedAngleImg.add(this.changedAngleText);
         this.scene.add(changedAngleImg);
    }

    //绘制PF1、PF2线段
    addSegment(num: number, movePoint: any) {
        const line = this.line.createLine({
           startPoint: new THREE.Vector3(num, 0, 0),
           endPoint: new THREE.Vector3(movePoint.position.x, movePoint.position.y, movePoint.position.z),
           color: '#FFA72D',
           dashLine: false,
           lineWidth: 1000,
           lineWidthScale: 1 / 500
        });
        return line;
    }

    //限定P点在椭圆上移动
     bindEvent() {
       const dragControls = new dragcontrols([this.dragImageP], this.camera, this.renderer.domElement);
       dragControls.addEventListener('drag', () => {
         //限定P点拖动轨迹
         this.dragImageP.position.x = this.dragImageP.position.x < 40 ? this.dragImageP.position.x : 40;
         this.dragImageP.position.x = this.dragImageP.position.x > -40 ? this.dragImageP.position.x : -40;
         if (this.dragImageP.position.y >= 0) {
           this.dragImageP.position.y = Math.sqrt((Math.pow(this.b, 2) - (Math.pow(this.b, 2) /
             Math.pow(this.a, 2)) * Math.pow(this.dragImageP.position.x, 2)));
         } else {
           this.dragImageP.position.y = -Math.sqrt((Math.pow(this.b, 2) - (Math.pow(this.b, 2) /
             Math.pow(this.a, 2)) * Math.pow(this.dragImageP.position.x, 2)));
         }

         //删除并重绘线段
         this.deleteSegment(this.linePF1);
         this.deleteSegment(this.linePF2);
         this.linePF1 = this.addSegment(-this.c, this.dragImageP);
         this.linePF2 = this.addSegment(this.c, this.dragImageP);
         this.scene.add(this.linePF1);
         this.scene.add(this.linePF2);

         //改变显示角度
         const angle = this.getAngle(this.dragImageP);
         this.changedAngleText.text = (angle * 180 / Math.PI).toFixed(0) + '°';
       });
     }

     //删除线段
    deleteSegment(obj: any) {
      if (obj) {
        obj.geometry.dispose();
        obj.material.dispose();
        this.scene.remove(obj);
      }
    }

    //根据三角形三边求夹角
    getAngle(movePoint: any) {
        const pF1Segment = Math.sqrt((Math.pow((movePoint.position.x + this.c), 2) + Math.pow((movePoint.position.y - 0), 2)));
        const pF2Segment = Math.sqrt((Math.pow((movePoint.position.x - this.c), 2) + Math.pow((movePoint.position.y - 0), 2)));
        const f1F2Segment = 2 * this.c;
        const angleNum = (Math.pow(pF1Segment, 2) + Math.pow(pF2Segment, 2) - Math.pow(f1F2Segment, 2)) / (2 * pF1Segment * pF2Segment);
        return Math.acos(angleNum);
    }

    resize(width: number, height: number)  {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    reset() {
        this.dragImageP.position.set(this.b, Math.sqrt(Math.pow(this.b, 2) -
          ((Math.pow(this.b, 2) * Math.pow(this.b, 2))) / Math.pow(this.a, 2)), 1);
        this.deleteSegment(this.linePF1);
        this.deleteSegment(this.linePF2);
        this.linePF1 = this.addSegment(-this.c, this.dragImageP);
        this.linePF2 = this.addSegment(this.c, this.dragImageP);
        this.scene.add(this.linePF1);
        this.scene.add(this.linePF2);
        this.changedAngleText.text = '61°';
    }
}




