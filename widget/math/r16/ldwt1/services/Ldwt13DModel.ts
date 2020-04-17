import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');

OBJLoader(THREE);
import { AxisUtil } from '../../../../../src/three/util/AxisUtil';
import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
import { Line } from '../../../../../src/three/component/Line';
import * as point from '../sub_static/point.png';
import * as oneInTwo from '../sub_static/oneInTwo.png';
import * as twoInThree from '../sub_static/twoInThree.png';
import * as threeInFour from '../sub_static/threeInFour.png';
import * as fourInFive from '../sub_static/fourInFive.png';
import * as formula1 from '../sub_static/formula1.png';
import * as formula2 from '../sub_static/formula2.png';
import * as formula3 from '../sub_static/formula3.png';
import * as formula4 from '../sub_static/formula4.png';
import * as formula5 from '../sub_static/formula5.png';
import * as formula6 from '../sub_static/formula6.png';
import * as formula7 from '../sub_static/formula7.png';
import { SliderControlLine } from '../../../../../src/three/component/SliderControlLine';


export class Ldwt13DModel extends ThreeBase {

    private controls: any;

    sliderControlerLine: any = [];
    line: Line;
    axis: any;

    group1: THREE.Group;
    group2: THREE.Group;

    point1: any;
    point2: any;

    slider: any;
    slider2: any;

    formulaLine: any = [];
    functionLine: any = [];
    imgControl: any;

    formulaImg: any = [];

    blueColor = '#0199FF';
    whiteColor = '#FFFFFF';

    private render = () => {
        requestAnimationFrame( this.render );
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
          this.init();

      }
      init() {
          this.initScene();
          this.initCamera();
          this.initLight();
          this.initWebGLRenderer();
          this.initControl();

          this.createSpecialAxis();
          this.createFirstCurve();
          this.createMultiCurve();
          this.createHidingLine();
          this.createDragLine();
          this.addImage();
          this.createRotateLine();

          this.createAxis();
          this.createDotLine();
          this.setMove();
          this.resetSliderctrl('right');
          const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
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
          const near    = 0.1;
          const far     = 2000;
          this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
          this.camera.lookAt(new THREE.Vector3(0,  0,  0));
          this.camera.position.set(0,  0,  350);
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
        (this.renderer as WebGLRenderer).setClearColor(this.whiteColor, 1 );

        this.renderer.setSize(this.width , this.height);
        this.domElement.appendChild(this.renderer.domElement);

    }

      /**
       * 初始化控制器
       */
      initControl(): void {
        this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 3;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = false;
        this.controls.noPan = false;
        this.controls.noRotate = true;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
    }

      /**
       * 初始化光源
       */
      initLight(): void {

      }

      //解法一
      //创建坐标轴一
      createSpecialAxis() {
        this.group1 = new THREE.Group();
        const scale = 0.25;
        const color = '#000000';
        const Xline = ThreeUtil.createPlane(240, 1, color, 1);
        const Yline = ThreeUtil.createPlane(1, 140, color, 1);
        Yline.position.set(-100, 30, 0);
        Xline.position.set(-20, 0, 0);
        const Array = ['-1', '.', '1', '2', '3', '4', '5'];
        let k = -135;
        for (let i = 0; i < 7; i++) {
          const xTickLine = ThreeUtil.createLine(0.5,  3,  color);
          const xTickNumber = ThreeUtil.createNumber( Array[i], k,
            -5, 0, color, scale);
          xTickLine.position.set(k, 3 / 2, 0);
          k += 35;
          this.group1.add(xTickLine);
          this.group1.add(xTickNumber);
        }
        const line_1 = ThreeUtil.createLine(3, 0.5, color);
        line_1.position.set(-98.5, -35, 0);
        this.group1.add(line_1);
        this.group1.add(ThreeUtil.createNumber('-1', -105, -30, 0, color, scale));
        const yTickLine = ThreeUtil.createLine(3,  0.5,  color);
        yTickLine.position.set(-98.5, 35, 0);
        const yTickNumber = ThreeUtil.createNumber('1' , -105, 38, 0, color , scale);
        const xAxisTriangle = ThreeUtil.createTriangle(100, 2.5, 100, -2.5, 110, 0, color);
        const yAxisTriangle = ThreeUtil.createTriangle(-97.5, 100, -102.5, 100, -100, 110, color);
        const xText = ThreeUtil.createNewRomanText('x', 110, 1, 0, color, scale);
        const yText = ThreeUtil.createNewRomanText('y', -105, 115, 0, color, scale);
        const oText = ThreeUtil.createNewRomanText('o', -105, 0, 0, color, scale);
        this.group1.add(Xline);
        this.group1.add(Yline);
        this.group1.add(yTickLine);
        this.group1.add(yTickNumber);
        this.group1.add(xAxisTriangle);
        this.group1.add(yAxisTriangle);
        this.group1.add(xText);
        this.group1.add(yText);
        this.group1.add(oText);
        this.scene.add(this.group1);
        this.group1.position.setY(-50);
    }

      //创建第一段曲线
      createFirstCurve() {
      const blueLine = ThreeUtil.createLine(31.5, 1, this.blueColor);
      blueLine.position.set(-82, 0, 1);
      this.group1.add(blueLine);

      const rBigBluePoint = ThreeUtil.createPoint(2, this.blueColor, -65, 0, 1);
      const rWhitePoint = ThreeUtil.createPoint(1.3, this.whiteColor, 0, 0, 1);
      const lBigBluePoint = ThreeUtil.createPoint(2, this.blueColor, -100, 0, 1);
      const lWhitePoint = ThreeUtil.createPoint(1.3, this.whiteColor, 0, 0, 1);
      rBigBluePoint.add(rWhitePoint);
      rBigBluePoint.position.z = -1;
      lBigBluePoint.add(lWhitePoint);
      lBigBluePoint.position.z = -1;
      this.group1.add(rBigBluePoint);
      this.group1.add(lBigBluePoint);
    }

      //创建多段曲线
      createMultiCurve() {
            //创建第二段曲线
            this.createCurve(-65, 35, -30, 17.5, -65, 35, -55, 25, -45, 20, -30, 17.5);

            //创建第三段曲线
            this.createCurve(-30, 35, 5, 23.34, -30, 35, -20, 28, -10, 26, 5, 23.34);

            //创建第四段曲线
            this.createCurve(5, 35, 40, 26.25, 5, 35, 15, 30, 25, 28, 40, 26.25);

            //创建第五段曲线
            this.createCurve(40, 35, 75, 28, 40, 35, 50, 32, 60, 29, 75, 28);
      }

      //画曲线
      createCurve(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number,
                  y4: number, x5: number, y5: number, x6: number, y6: number) {
            const smallBluePoint = ThreeUtil.createPoint(2, this.blueColor, x1, y1, 1);
            const bluePoint = ThreeUtil.createPoint(2, this.blueColor, x2, y2, 1);
            const whitePoint = ThreeUtil.createPoint(1.5, this.whiteColor, 0, 0, 1);
            bluePoint.add(whitePoint);
            const curveObject = ThreeUtil.createBezierCurve({
              x1: x3,
              y1: y3,
              z1: 0,
              x2: x4,
              y2: y4,
              z2: 0,
              x3: x5,
              y3: y5,
              z3: 0,
              x4: x6,
              y4: y6,
              z4: 0,
            });
            this.group1.add(curveObject);
            this.group1.add(bluePoint);
            this.group1.add(smallBluePoint);
      }

      //创建固定隐藏显示的直线
      createHidingLine() {
          this.line = new Line();
          //虚线一
          this.formulaLine[0] = this.line.createLine({
            startPoint: new THREE.Vector3(-110, 26.25, 0),
            endPoint: new THREE.Vector3(100, 26.25, 0),
            dashLine: true,
            lineWidth: 500,
            dashSize: 1,
            gapSize: 2,
            lineWidthScale: 1 / 500
          });
          this.formulaLine[0].visible = false;
          this.group1.add(this.formulaLine[0]);

          //实线一
          this.formulaLine[1] = this.line.createLine({
            startPoint: new THREE.Vector3(-110, 28, 0),
            endPoint: new THREE.Vector3(100, 28, 0),
            lineWidth: 500,
            lineWidthScale: 1 / 500
          });
          this.formulaLine[1].visible = false;
          this.group1.add(this.formulaLine[1]);

          //虚线二
          this.formulaLine[2] = this.line.createLine({
            startPoint: new THREE.Vector3(-110, 0, 0),
            endPoint: new THREE.Vector3( 100, 0, 0),
            lineWidth: 500,
            dashLine: true,
            dashSize: 1,
            gapSize: 3,
            lineWidthScale: 1 / 500
          });
          this.formulaLine[2].rotation.z = Math.atan( 3 / 4);
          this.formulaLine[2].visible = false;

          //实线二
          this.formulaLine[3] = this.line.createLine({
            startPoint: new THREE.Vector3(-110, 0, 0),
            endPoint: new THREE.Vector3( 100, 0, 0),
            lineWidth: 1000,
            lineWidthScale: 1 / 500
          });

          this.formulaLine[3].rotation.z = Math.atan( 4 / 5);
          this.formulaLine[3].visible = false;

          this.scene.add(this.formulaLine[2]);
          this.scene.add(this.formulaLine[3]);
      }

      //添加图片
      addImage() {
          const img1 = ThreeUtil.createImg(8, 19, oneInTwo, -22, 18);
          const img2 = ThreeUtil.createImg(8, 19, twoInThree, 10, 18);
          const img3 = ThreeUtil.createImg(8, 19, threeInFour, 45, 20);
          const img4 = ThreeUtil.createImg(8, 19, fourInFive, 82, 25);

          this.formulaImg[0] = ThreeUtil.createImg(24, 17, formula1, 95, 17);
          this.formulaImg[1] = ThreeUtil.createImg(24, 17, formula2, 95, 40);

          this.formulaImg[2] = ThreeUtil.createImg(20.5, 7, formula3, 0, 15);

          this.formulaImg[3] = ThreeUtil.createImg(45.5, 10, formula4, 70, 50);

          this.formulaImg[4] = ThreeUtil.createImg(28, 17, formula5, 100, 60);
          this.formulaImg[5] = ThreeUtil.createImg(28, 17, formula6, 90, 75);

          this.formulaImg[6] = ThreeUtil.createImg(25.5, 7, formula7, 110, 15);
          this.group1.add(img1);
          this.group1.add(img2);
          this.group1.add(img3);
          this.group1.add(img4);

          this.formulaImg[3].visible = false;
          this.formulaImg[4].visible = false;
          this.formulaImg[5].visible = false;

          this.formulaLine[0].add(this.formulaImg[0]);
          this.formulaLine[1].add(this.formulaImg[1]);

          this.point1.add(this.formulaImg[2]);
          this.scene.add(this.formulaImg[3]);
          this.scene.add(this.formulaImg[4]);
          this.scene.add(this.formulaImg[5]);
      }

      //创建可拖动的直线
      createDragLine() {
          const width1 = document.getElementById('pinmu').clientWidth;
          const width2 = document.getElementById('box').clientWidth;
          const line = new Line();
          const rotateLine = line.createLine({
            startPoint: new THREE.Vector3(-110, 0, 0),
            endPoint: new THREE.Vector3( 100, 0, 0),
            lineWidth: 1000,
            lineWidthScale: 1 / 500
          });
          rotateLine.position.x = -100;
          this.point1 = ThreeUtil.createPoint(20, this.whiteColor, 100, -85, 0.001);
          const bluePoint = ThreeUtil.createPoint(2, this.blueColor, 0, 0, 1);
          this.point1.add(bluePoint);
          const circleImg = ThreeUtil.createImg(20, 20, point, 0, 0);
          circleImg.position.z = -1;
          this.point1.add(circleImg);
          this.slider = ThreeUtil.createImg(0, 0, point, 0, 0);
          rotateLine.add(this.slider);
          this.point1.add(rotateLine);
          this.sliderControlerLine[0] = new SliderControlLine(line, this.slider, this.point1);
          this.sliderControlerLine[0].initEvent(this.camera, this.renderer, this.controls, -((width2 - width1) / 2));
          this.sliderControlerLine[0].controlPointDragCallback = () => {
            this.point1.position.x = 100;
            if (this.point1.position.y >= 50) {
              this.point1.position.y = 50;
            }
            if (this.point1.position.y <= -85) {
              this.point1.position.y = -85;
            }
            if (parseFloat(this.point1.position.y.toFixed(0)) >= -24) {
                this.formulaLine[0].visible = true;
            }

            if (parseFloat(this.point1.position.y.toFixed(0)) >= -22) {
              this.formulaLine[1].visible = true;
            }
          };
          this.point1.visible = false;
          this.scene.add(this.point1);
    }

      //创建可旋转的直线
      createRotateLine() {
          const width1 = document.getElementById('pinmu').clientWidth;
          const width2 = document.getElementById('box').clientWidth;
          const line = new Line();
          const rotateLine = line.createLine({
            startPoint: new THREE.Vector3(-110, 0, 0),
            endPoint: new THREE.Vector3( 100, 0, 0),
            lineWidth: 1000,
            lineWidthScale: 1 / 500
          });
          const bluePoint = ThreeUtil.createPoint(2, this.blueColor, 0, 0, 1);
          this.point2 = ThreeUtil.createPoint(1, this.blueColor, 0, 0, 0);

          this.slider2 = ThreeUtil.createImg(200, 200, point, 100, 0);
          const slider1 = ThreeUtil.createImg(20, 20, point, 0, 0);
          slider1.position.z = -1;
          this.slider2.add(bluePoint);
          this.slider2.add(slider1);
          (this.slider2.material as any).transparent = true;
          (this.slider2.material as any).opacity = 0;

          rotateLine.add(this.slider2);
          this.point2.add(rotateLine);
          this.point2.add(this.formulaImg[6]);

          this.sliderControlerLine[1] = new SliderControlLine(line, this.slider2, this.point2, slider1);
          this.sliderControlerLine[1].initEvent(this.camera, this.renderer, this.controls, -((width2 - width1) / 2));
          this.point2.visible = false;
          this.scene.add(this.point2);
      }

        //设置move事件的操作
        setMove() {

          this.sliderControlerLine[1].sliderPointMouseMoveCallback = () => {
            this.moveMain();
            this.formulaImg[6].rotation.z = -this.sliderControlerLine[1].angle;
          };

          this.sliderControlerLine[1].sliderPointTouchMoveCallback = () => {
            this.moveMain();
            this.formulaImg[6].rotation.z = -this.sliderControlerLine[1].angle;
          };
        }

        //move事件的主要内容
        moveMain() {
          if (parseFloat((this.sliderControlerLine[1].angle * 180 / Math.PI).toFixed(1)) <= -135 ||
            parseFloat((this.sliderControlerLine[1].angle * 180 / Math.PI).toFixed(1)) >= 45 ) {
            this.formulaLine[3].visible = true;
            this.formulaImg[5].visible = true;
          }

          if (parseFloat((this.sliderControlerLine[1].angle * 180 / Math.PI).toFixed(1)) <= -143 ||
            parseFloat((this.sliderControlerLine[1].angle * 180 / Math.PI).toFixed(1)) >= 37 ) {
            this.formulaLine[2].visible = true;
            this.formulaImg[4].visible = true;
          }
        }

        //动态设置属性
        resetSliderctrl( val: string) {
          if (val === 'left') {
            this.sliderControlerLine[0].setCtrl(false);
            this.sliderControlerLine[1].setCtrl(false);
          } else {
            this.sliderControlerLine[0].setCtrl(true);
            this.sliderControlerLine[1].setCtrl(true);
          }
        }

        //解法二
        //创建坐标轴二
        createAxis() {
            this.group2 = new THREE.Group();
            this.axis = AxisUtil.createAxis({
              isTicks: true,
              AxisXNumArray: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            } as any);
            this.axis.visible = false;
            this.scene.add(this.axis);
            this.scene.add(this.group2);
        }

        //创建图中函数线
        createDotLine() {

             //第一段
              const blueLine = ThreeUtil.createLine(7, 1, this.blueColor);
              blueLine.position.set(5, 0, 1);

              const bluePoint = ThreeUtil.createPoint(2, this.blueColor, 0, 0, 1);
              const whitePoint1 = ThreeUtil.createPoint(1.5, this.whiteColor, 0, 0, 1);
              bluePoint.add(whitePoint1);
              bluePoint.position.z = -1;

              const bigBluePoint = ThreeUtil.createPoint(2, this.blueColor, 10, 0, 1);
              const whitePoint = ThreeUtil.createPoint(1.5, this.whiteColor, 0, 0, 1);
              bigBluePoint.add(whitePoint);
              bigBluePoint.position.z = -1;

              this.group2.add(blueLine);
              this.group2.visible = false;
              this.group2.add(bigBluePoint);
              this.group2.add(bluePoint);


            //第二段
             this.createDottedLine(15, 10, -5, 0, 20, 10);

            //第三段
             this.createDottedLine(25, 20, -5, 0, 30, 20);

            //第四段
             this.createDottedLine(35, 30, -5, 0, 40, 30);

            //第五段
             this.createDottedLine(45, 40, -5, 0, 50, 40);
        }

        //创建解法二函数线
        createDottedLine(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {

            const blueLine = ThreeUtil.createLine(7, 1, this.blueColor);
            blueLine.position.set(x1, y1, 1);

            const bluePoint = ThreeUtil.createPoint(2, this.blueColor, x2, y2, 1);
            blueLine.add(bluePoint);

            const bigBluePoint = ThreeUtil.createPoint(2, this.blueColor, x3, y3, 1);
            const whitePoint = ThreeUtil.createPoint(1.5, this.whiteColor, 0, 0, 1);
            bigBluePoint.add(whitePoint);
            bigBluePoint.position.z = -1;

            this.group2.add(blueLine);
            this.group2.visible = false;
            this.group2.add(bigBluePoint);
        }

        //隐藏函数线
        hideFormulaLine(flag1: boolean, flag2: boolean, flag3: boolean, flag4: boolean) {
          this.formulaLine[0].visible = flag1;
          this.formulaLine[1].visible = flag2;
          this.formulaLine[2].visible = flag3;
          this.formulaLine[3].visible = flag4;
        }

        //隐藏图片
        hideFormulaImg(flag1: boolean, flag2: boolean, flag3: boolean) {
          this.formulaImg[3].visible = flag1;
          this.formulaImg[4].visible = flag2;
          this.formulaImg[5].visible = flag3;
        }

        //隐藏解法一内容
        hideAnalyticOne(flag1: boolean, flag2: boolean, flag3: boolean) {
            this.group1.visible = flag1;
            this.point1.visible = flag2;
            this.axis.visible = flag3;
        }

        //隐藏解法二内容
        hideAnalyticTwo(flag1: boolean, flag2: boolean) {
          this.group2.visible = flag1;
          this.point2.visible = flag2;
          this.sliderControlerLine[1].angle = 0;
        }

        resize(width: number, height: number) {
              (this.camera as PerspectiveCamera).aspect = width / height;
              (this.camera as PerspectiveCamera).updateProjectionMatrix();
              this.renderer.setSize(width, height);
        }

}
