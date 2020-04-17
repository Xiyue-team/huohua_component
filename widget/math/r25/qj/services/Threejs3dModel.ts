import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Helper } from './Helper';
import { Line } from '../../../../../src/three/component/Line';

const TrackballControls = require('three-trackballcontrols');
const dragcontrols = require('three-dragcontrols').default;
export class Threejs3dModel extends ThreeBase {

    private controls: any;
    private axisGroup = new THREE.Group();
    private helper = new Helper();
    private lineHelper = new Line();
    private leftDragPoint: THREE.Mesh;
    private rightDragPoint: THREE.Mesh;
    private redPoint1: THREE.Mesh;
    private redPoint2: THREE.Mesh;
    private leftBrackets: any;
    private rightBrackets: any;
    private blueLine: any;
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
        this.createAxis();
        this.createText();
        this.render();
    }

    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x2D2D2D );
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

    //创建轴
    createAxis() {
        const color   = '#979797';
        const color1  = '#6ECFFF';
        const color2  = '#FFFFFF';
        const color3  = '#FF5A5A';
        const testColor = '#FFFFFF';
        const length  = 200;
        const line    = ThreeUtil.createLine(length, 2, color, 1);
        const arrow   = this.helper.createArrow(4, color, 1);
        this.blueLine = ThreeUtil.createLine(66, 1.5, color1, 1);
        this.rightDragPoint = ThreeUtil.createPoint(5, testColor, 33, 0, 0.32);
        this.leftDragPoint  = ThreeUtil.createPoint(5, testColor, -33, 0, 0.32);
        const whitePoint1   = ThreeUtil.createPoint(2.6, color2, 0, 0, 1);
        const whitePoint2   = ThreeUtil.createPoint(2.6, color2, 0, 0, 1);
        this.redPoint1      = ThreeUtil.createPoint(2.2, color3, 0, 0, 1);
        this.redPoint2      = ThreeUtil.createPoint(2.2, color3, 0, 0, 1);
        arrow.position.x    = length / 2;
        this.leftDragPoint.position.z = 1;
        this.rightDragPoint.position.z = 1;
        const leftDrag = this.bindDrag(this.leftDragPoint);
        const rightDrag = this.bindDrag(this.rightDragPoint);
        leftDrag.addEventListener( 'dragstart',  ( event: any ) => { this.controls.enabled = false; rightDrag.deactivate(); } );
        leftDrag.addEventListener( 'drag', ( event: any) => {
          this.leftDragPoint.position.y = 0;
          if (this.leftDragPoint.position.x < -100) {
            this.leftDragPoint.position.x = -100;
          }
          if (this.leftDragPoint.position.x > this.rightDragPoint.position.x) {
            this.leftDragPoint.position.x = this.rightDragPoint.position.x;
          }
          this.redrawLine();
        });
        leftDrag.addEventListener( 'dragend', ( event: any) => { this.controls.enabled = true; rightDrag.activate(); } );

        rightDrag.addEventListener( 'dragstart',  ( event: any ) => { this.controls.enabled = false; leftDrag.deactivate(); } );
        rightDrag.addEventListener( 'drag', ( event: any) => {
            this.rightDragPoint.position.y = 0;
            if (this.rightDragPoint.position.x > 100) {
              this.rightDragPoint.position.x = 100;
            }
            if (this.rightDragPoint.position.x < this.leftDragPoint.position.x) {
                this.rightDragPoint.position.x = this.leftDragPoint.position.x;
            }
            this.redrawLine();
        } );
        rightDrag.addEventListener( 'dragend', ( event: any) => { this.controls.enabled = true; leftDrag.activate(); } );
        this.rightDragPoint.add(whitePoint1, this.redPoint1);
        this.leftDragPoint.add(whitePoint2, this.redPoint2);
        this.axisGroup.add(line, arrow, this.blueLine, this.rightDragPoint, this.leftDragPoint);
        this.axisGroup.position.set(-80, 0, 0);
        this.scene.add(this.axisGroup);
    }

    //创建文字
    createText() {
        const color        = '#FFFFFF';
        const textScale    = 0.25;
        const text         = ThreeUtil.createNewRomanText('a , b', 0, - 30, 0, color, textScale);
        this.leftBrackets  = ThreeUtil.createNormalText('[ ', -10, -30, 0, color, textScale);
        this.rightBrackets = ThreeUtil.createNormalText(' ]', 10, -30, 0, color, textScale);
        this.axisGroup.add(text, this.leftBrackets, this.rightBrackets);
    }

    //绑定drag事件
    bindDrag(obj: THREE.Mesh) {
        const dargControls = new dragcontrols([obj], this.camera, this.renderer.domElement);
        return dargControls;
    }

    //重绘直线
    redrawLine() {
      if (this.blueLine) {
        this.axisGroup.remove(this.blueLine);
        this.blueLine.geometry.dispose();
        (this.blueLine.material as any).dispose();
      }
      const length = Math.sqrt(Math.pow((this.leftDragPoint.position.x - this.rightDragPoint.position.x), 2));
      this.blueLine = ThreeUtil.createLine(length, 1.5, '#6ECFFF', 1);
      this.blueLine.position.x = (length / 2) + this.leftDragPoint.position.x;
      this.axisGroup.add(this.blueLine);
    }

    //点击按钮修改括号的方法
    setText(left: boolean, right: boolean) {
       if (left) {
            this.leftBrackets.text = '( ';
            this.redPoint2.visible = false;
       } else {
            this.leftBrackets.text = '[ ';
            this.redPoint2.visible = true;
       }

       if (right) {
            this.rightBrackets.text = ' )';
            this.redPoint1.visible = false;
       } else {
            this.rightBrackets.text = ' ]';
            this.redPoint1.visible = true;
       }
    }

    reset() {
        this.leftBrackets.text = '[ ';
        this.rightBrackets.text = ' ]';
        this.redPoint1.visible = true;
        this.redPoint2.visible = true;
        this.rightDragPoint.position.x = 33;
        this.leftDragPoint.position.x = -33;
        this.redrawLine();
    }



}




