import * as THREE from 'three';
import {Mesh, PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
const Interaction = require('three.interaction');
OBJLoader(THREE);

import {AxisUtil} from '../../../../../src/three/util/AxisUtil';
import {SliderControlLine} from '../../../../../src/three/component/SliderControlLine';
import * as huadongdian from '../sub_static/huadong.png';
import * as tuodongdian from '../sub_static/tuodong.png';

export class Zxypwx3dModel extends ThreeBase {


    planeMesh: Mesh;
    private controls: any;
    private sliderControlLine: any;
    private rotatePoint: THREE.Mesh;
    private tiltAngle: number;
    private slope: number;
    private intersection1: THREE.Mesh;
    private intersection2: THREE.Mesh;
    private functionText: any;
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

    static loadImg() {
        const imgArray = [huadongdian, tuodongdian];
        console.log(imgArray);
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
        this.createAxis();
        this.drawParabola();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.createRotateLine();
        this.createText();
        this.createIntersection();
        this.setMove();
        this.drawingIntersections();
        this.render();
    }


    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xFFFFFF );
    }

    initLight() {
        this.lights = [];
        this.lights.push(new THREE.AmbientLight( 0xffffff, 0.4));
        this.scene.add(this.lights[0]);
        const directionalLight4 = new THREE.HemisphereLight( '#ffffff', '#ffffff', 0.7 );
        directionalLight4.color.setHSL(.6, 1, .6);
        directionalLight4.groundColor.setHSL(.095, 1, .75);
        directionalLight4.position.set(0, 0, 0);
        this.scene.add( directionalLight4 );
        const c = new THREE.DirectionalLight('#F0F0F0', 0.05);
        c.position.set(200, 200, 100);
        const u = new THREE.DirectionalLight('#F0F0F0', 0.05);
        u.position.set(-200, -200, -100);
        this.scene.add( c );
        this.scene.add( u );
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

    //创建坐标轴
    createAxis() {
        this.scene.add(AxisUtil.createAxis({ isTicks: true, AxisXNumArray: ['1', '', '', '', '5', '', '', '', '', '10'] } as any));
    }

    //计算坐标绘制抛物线
    drawParabola() {
        //计算坐标
        const parabolaY = [];
        const parabolaX = [];
        const point = [];
        const point1 = [];
        const scale = 10;
        let i: number;
        let j: number;
        for (i = 14; i >= 0; i -= 0.25) {
            parabolaY.push(i);
            parabolaX.push((Math.pow(i, 2)) / 12);
        }

        for (j = 0; j < parabolaX.length; j++) {
            point.push(new THREE.Vector3(parabolaX[j] * scale, parabolaY[j] * scale, -0.5));
            point1.push(new THREE.Vector3(parabolaX[j] * scale, -parabolaY[j] * scale, -0.5));
        }
        const curve = ThreeUtil.createTube(point, 0.5, point.length, '#000000');
        const curve1 = ThreeUtil.createTube(point1, 0.5, point.length, '#000000');
        this.scene.add(curve);
        this.scene.add(curve1);
    }

    //绘制可以旋转拖动的直线并计算直线的倾斜角
    createRotateLine() {
        const width = 12.6;
        const height = 12.6;
        const line = ThreeUtil.createLine(1, 800, '#EC5D57');
        const huadong = ThreeUtil.createImg(width, height, huadongdian, 0, 0, 0);
        const huadong1 = ThreeUtil.createImg(150, 150, huadongdian, 0, 90, 0);
        (huadong1.material as any).opacity = 0;
        huadong.rotateZ(Math.PI / 2);
        line.rotateZ(-30 * Math.PI / 180);
        this.rotatePoint = ThreeUtil.createImg(width, height, tuodongdian, 0, 0, 0);
        huadong1.add(huadong);
        line.add(huadong1);
        this.rotatePoint.add(line);
        //用此方法前先导入事件包
        this.sliderControlLine = new SliderControlLine(line, huadong1, this.rotatePoint, huadong);
        this.sliderControlLine.initEvent(this.camera, this.renderer, this.controls);
        this.scene.add(this.rotatePoint);
    }

    //获取直线的倾斜角绘制交点
    drawingIntersections() {
        //倾斜角 倾斜角 = 初始角 + 旋转角 倾斜角取值范围为0 - 180
        this.tiltAngle = parseFloat(((60 * Math.PI / 180 + this.sliderControlLine.angle) % Math.PI).toFixed(2));
        if (this.tiltAngle < 0) {
            this.tiltAngle = Math.PI + this.tiltAngle;
        }

        //斜率 斜率 = tan(倾斜角)
        this.slope = (this.tiltAngle <= 90.5 * Math.PI / 180 &&
            this.tiltAngle >= 89.5 * Math.PI / 180) ? undefined : Math.tan(this.tiltAngle);

        const n = 12;
        //截距b
        const intercept = -this.slope * (this.rotatePoint.position.x / 10) + (this.rotatePoint.position.y / 10);

        const a = Math.pow(this.slope, 2);
        const b = (2 * this.slope * intercept) - n;
        const c = Math.pow(intercept, 2);

        const intersectionX1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
        const intersectionX2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
        const intersectionY1 = this.slope * intersectionX1 + intercept;
        const intersectionY2 = this.slope * intersectionX2 + intercept;

        //将斜率带入直线方程，求出交点
        if (this.slope !== undefined) {
            //当斜率存在且不等于0时 通过b^2-4ac判断交点个数 且a不等于0
            if (Math.pow((2 * this.slope * intercept) - n, 2)
                - 4 * Math.pow(this.slope, 2) * Math.pow(intercept, 2) < 9 &&
                Math.pow((2 * this.slope * intercept) - n, 2)
                - 4 * Math.pow(this.slope, 2) * Math.pow(intercept, 2) > -9
                && Math.pow(this.slope, 2) !== 0 && intersectionX1 && intersectionY1 ) {

                this.setIntersection(1, ((intersectionX1 * 10) + (intersectionX2 * 10)) / 2,
                    ((intersectionY1 * 10) + (intersectionY2 * 10)) / 2,  1, ((intersectionX1 * 10) + (intersectionX2 * 10)) / 2,
                    ((intersectionY1 * 10) + (intersectionY2 * 10)) / 2) ;

                this.resetWord(this.slope, intercept, 1);
                this.setText('存在', 'Δ = 0', '相切', '一个');
            } else if ((Math.pow((2 * this.slope * intercept) - n, 2)
                - 4 * Math.pow(this.slope, 2) * Math.pow(intercept, 2)) > 0 && Math.pow(this.slope, 2) !== 0) {
               this.setIntersection(1, intersectionX1 * 10, intersectionY1 * 10,
                   1, intersectionX2 * 10, intersectionY2 * 10) ;
                this.resetWord(this.slope, intercept, 1);
                this.setText('存在', 'Δ > 0', '相交', '两个');
            } else if ((Math.pow((2 * this.slope * intercept) - n, 2)
                - 4 * Math.pow(this.slope, 2) * Math.pow(intercept, 2)) < 0 && Math.pow(this.slope, 2) !== 0) {
                //将点隐藏
                this.setIntersection(0, 0, 0, 0, 0, 0);
                this.resetWord(this.slope, intercept, 1);
                this.setText('存在', 'Δ < 0', '相离', '零个');
            } else if (Math.pow(this.slope, 2) === 0) {
                const x = Math.pow(-intercept, 2) / n;
                this.setIntersection(1, x * 10, intercept * 10, 0, 0, 0);
                this.resetWord(this.slope, intercept, 1);
                this.setText('存在', 'Δ不存在', '相交', '一个');
            }
        } else {
            //当斜率不存在时与该抛物线的交点
            if ((this.rotatePoint.position.x / 10) > 0) {

                const x = this.rotatePoint.position.x;
                const y1 = Math.sqrt(n * x / 10);
                const y2 = -Math.sqrt(n * x / 10);
                this.setIntersection(1, x, y1 * 10, 1, x, y2 * 10);
                this.setText('不存在', 'Δ > 0', '相交', '两个');
                this.functionText.text = 'l: x = ' + (this.rotatePoint.position.x / 10).toFixed(2);
            }  else if ((this.rotatePoint.position.x / 10) === 0) {
                this.setIntersection(1, 0, 0, 0, 0, 0);
                this.setText('不存在', 'Δ = 0', '相切', '一个');
                this.functionText.text = 'l: x = ' + (this.rotatePoint.position.x / 10).toFixed(2);
            } else {
                this.setIntersection(0, 0, 0, 0, 0, 0);
                this.setText('不存在', 'Δ < 0', '相离', '零个');
                this.functionText.text = 'l: x = ' + (this.rotatePoint.position.x / 10).toFixed(2);
            }
        }
    }

    setText(slope: string, deleta: string, position: string, intersection: string) {

        (window as any).viewHandler.viewModel.$data.delta = deleta;
        (window as any).viewHandler.viewModel.$data.slope = slope;
        (window as any).viewHandler.viewModel.$data.position = position;
        (window as any).viewHandler.viewModel.$data.intersection = intersection;
    }

    //创建交点
    createIntersection() {
        const color = '#0199ff';
        this.intersection1 = ThreeUtil.createPoint(1.5, color, 0, 0, 0);
        this.intersection2 = ThreeUtil.createPoint(1.5, color, 0, 0, 0);
        const point = ThreeUtil.createPoint(1.5, color, 30, 0, 1);
        this.scene.add(this.intersection1);
        this.scene.add(this.intersection2);
        this.scene.add(point);
    }

    //设置交点状态
    setIntersection(opacity: number, intersectionX: number, intersectionY: number,
                    opacity2?: number, intersectionX2?: number, intersectionY2?: number) {
        (this.intersection1.material as any).opacity = opacity;
        this.intersection1.position.x = intersectionX;
        this.intersection1.position.y = intersectionY;

        (this.intersection2.material as any).opacity = opacity2;
        this.intersection2.position.x = intersectionX2;
        this.intersection2.position.y = intersectionY2;

    }

    createText() {
        const zuobiao = ThreeUtil.createNormalText('F(3,0)', 30, 10, 0, '#000000', 0.12);
        this.functionText = ThreeUtil.createNewRomanText('l:' + 5.77 + 'x ' + '+ y + '
            + 0 + ' = 0', 50, 100, 0, '#000000', 0.12);

        const paowuxian = ThreeUtil.createNewRomanText('y² = ', 100, 100, 0, '#000000', 0.12);
        const paowuxian1 = ThreeUtil.createNormalText('12', 110, 100, 0, '#000000', 0.12);
        const paowuxian2 = ThreeUtil.createNewRomanText('x', 115, 100, 0, '#000000', 0.12);
        this.scene.add(paowuxian);
        this.scene.add(paowuxian1);
        this.scene.add(paowuxian2);
        this.scene.add(zuobiao);
        this.rotatePoint.add(this.functionText);
    }

    resetWord(slope: number, intercept: number , b: number, x?: number) {
        if (b === 0) {
            this.functionText.text = x ? 'x = ' + x.toFixed(2) : 'x = ' + 0;
        } else if (intercept <= 0 && b !== 0) {
            this.functionText.text = 'l: ' + -slope.toFixed(2) + 'x ' + '+ y + ' + -intercept.toFixed(2) + ' = 0';
        } else if (intercept > 0 && b !== 0) {
            this.functionText.text = 'l: ' + -slope.toFixed(2) + 'x ' + '+ y - ' + Math.abs(intercept).toFixed(2) + ' = 0';
        }
    }

    //设置move事件内容
    setMove() {
        this.sliderControlLine.sliderPointMouseMoveCallback = () => {
            this.drawingIntersections();
        };
        this.sliderControlLine.sliderPointTouchMoveCallback = () => {
            this.drawingIntersections();
        };
        this.sliderControlLine.controlPointDragCallback = () => {
            this.drawingIntersections();
        };
    }

    reset() {
        this.rotatePoint.rotateZ(-this.sliderControlLine.angle);
        this.sliderControlLine.angle = 0;
        this.rotatePoint.position.set(0, 0, 0);
        this.drawingIntersections();
    }

}




