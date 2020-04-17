import * as THREE from 'three';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OBJLoader = require('three-obj-loader');
const TrackballControls = require('three-trackballcontrols');
OBJLoader(THREE);

import * as cell from '../sub_static/cell.png';
import * as co2 from '../sub_static/co2.png';
import * as co2Axis from '../sub_static/co2Axis.png';
import * as jghAxis from '../sub_static/jghAxis.png';
import * as tuli from '../sub_static/tl.png';
import * as sun from '../sub_static/sun.png';
import * as sunshine from '../sub_static/sunshine.png';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
import {AnimationHelper} from './animationHelper';
import {MathHelper} from '../../../../../src/util/MathHelper';
import {Line} from '../../../../../src/three/component/Line';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
export class Zghjghyhxsl3dModel extends ThreeBase {


    private controls: any;
    private sunLight: THREE.Mesh;
    private circleImage: THREE.Mesh;
    private group: THREE.Group;
    private fromGroup: THREE.Group;
    private fromImage1: THREE.Mesh;
    private fromImage2: THREE.Mesh;
    private co2Image: Array<THREE.Mesh> = [];
    private animation: Array<any> = [];
    private point: THREE.Mesh;
    private pointCoodinate: Array<number> = [];
    private dashLine: any;
    private redLine: any;
    private redLine1: any;
    private text: any;
    private bText: any;
    private cText: any;

    private legend: THREE.Mesh;
    rectangle: THREE.Mesh;

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

    //加载图片
    private loadImage() {
        const imageArray = [cell, co2, co2Axis, jghAxis, sun, sunshine, tuli];
        console.log(imageArray);
    }

    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.loadImage();
        this.initImage();
        this.initCO2Image();
        this.sunshineControl(0);
        this.render();
    }


    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x2F2F31);
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

    //初始化场景图片
    initImage() {
        const lineWidth = (BrowserUtil.getBrowserInfo().os === 'iOS') ? 1 : 600;
        this.group = new THREE.Group();
        const cellImage = ThreeUtil.createImg(126, 66.3, cell, 0, 0, 1);
        this.group.add(cellImage);
        this.sunLight = ThreeUtil.createImg(152.1, 110.7, sunshine, 0, 0, 0);
        this.circleImage = ThreeUtil.createImg(27, 27, sun, 0, 60, 0);
        this.group.add(this.sunLight, this.circleImage);
        (this.sunLight.material as any).opacity = 0;
        (this.circleImage.material as any).opacity = 0;
        this.group.position.set(110, 20, 0);

        this.fromGroup = new THREE.Group();
        this.fromImage1 = ThreeUtil.createImg(28.8 * 3, 28.9 * 3, co2Axis, 0, 0, 0);
        this.fromImage2 = ThreeUtil.createImg(83.4, 80.1, jghAxis, 5.7 , 3.3, 0);
        this.point = ThreeUtil.createPoint(1.5, '#FFFFFF', -29.4, -29.4, 1);
        const redPoint = ThreeUtil.createPoint(1, '#ff0000', 0, 0, 1);
        const LineHelper = new Line();
        this.rectangle = ThreeUtil.createPlane(80, 100, '#2f2f31', 1);
        this.rectangle.position.set(10, 0, -0.05);
        this.redLine = LineHelper.createLine({startPoint: new THREE.Vector3(-29.4, -29.4, -0.1),
            endPoint: new THREE.Vector3(2, 17.5, 0), lineWidth: lineWidth, color: '#ff0000'});
        this.redLine1 = LineHelper.createLine({startPoint: new THREE.Vector3(2, 17.5, -0.1),
            endPoint: new THREE.Vector3(40, 17.5, 0), lineWidth: lineWidth, color: '#ff0000'});
        this.point.add(redPoint);
        this.dashLine = ThreeUtil.createDashLine( new THREE.Vector3(-29.4, -29.4, 0), new THREE.Vector3(-29.4, 17.5, 0), '#FFFFFF', 5, 2);
        this.fromImage2.visible = false;
        this.text = ThreeUtil.createNormalText('c', -19.4, -20, 0, '#ffffff', 0.10);
        this.text.visible = false;

        this.cText = ThreeUtil.createNormalText('C', 2, 24.5, 0, '#ffffff', 0.10);
        this.bText = ThreeUtil.createNormalText('B', -19.4, -5, 0, '#ffffff', 0.10);
        this.cText.visible = false;
        this.bText.visible = false;
        this.legend = ThreeUtil.createImg(91.8, 5.1, tuli, 0,  -41,  0);
        this.legend.visible = false;
        this.fromGroup.add(this.fromImage1, this.fromImage2, this.point, this.redLine,
            this.redLine1, this.rectangle, this.dashLine, this.text, this.bText, this.cText, this.legend);
        this.fromGroup.position.set(-90, -10, 0);
        this.scene.add(this.group, this.fromGroup);
    }

    calcMovePointCoordinate() {
        const slope = MathHelper.getSlope(55.5 * Math.PI / 180);
        let y: number;
        let x: number;
        let i: number;
        this.pointCoodinate = [];
        for (i = 0; i < 4; i++) {
            y = - 29.4 + (slope * (7.85 * i));
            x = -29.4 + (7.85 * i);
            this.pointCoodinate.push(x, y);
        }
    }

    //控制表格显示隐藏
    fromControl(boolean: boolean) {
        if (boolean) {
            this.fromImage1.visible = true;
            this.fromImage2.visible = false;
            this.legend.visible = false;
        } else {
            this.fromImage1.visible = false;
            this.fromImage2.visible = true;
            this.legend.visible = true;
        }
    }

    //初始化co2图片
    initCO2Image() {
        for (let i = 0; i < 32; i++) {
            this.co2Image[i] = ThreeUtil.createImg(9.9, 5.1, co2, 30, 0, 1);
            (this.co2Image[i].material as any).opacity = 0;
            this.group.add(this.co2Image[i]);
        }
        this.calcMovePointCoordinate();
        this.initAnimation();
    }

    //初始化动画
    initAnimation() {
        //第一段动画

        this.animation[0] = AnimationHelper.createAnimation(30, 30, 0, -50, this.co2Image[0], 2, 0);
        this.animation[1] = AnimationHelper.createAnimation(35, 30, 0, -50, this.co2Image[1], 2, 0.4);
        this.animation[2] = AnimationHelper.createAnimation(40, 32, 0, -50, this.co2Image[2], 2, 0.8);
        this.animation[3] = AnimationHelper.createAnimation(30, 36, 0, -50, this.co2Image[3], 2, 1.2);
        this.animation[4] = AnimationHelper.createAnimation(35, 34, 0, -50, this.co2Image[4], 2, 1.6);

        //第二段动画

        this.animation[5] = AnimationHelper.createAnimation(40, 32, 0, -50, this.co2Image[5], 2, 0);
        this.animation[6] = AnimationHelper.createAnimation(30, 36, 0, -50, this.co2Image[6], 2, 0.7);
        this.animation[7] = AnimationHelper.createAnimation(35, 34, 0, -50, this.co2Image[7], 2, 1.4);
        this.animation[8] = AnimationHelper.createAnimation(35, -5, 5, 0, this.co2Image[8], 2 , 0);
        this.animation[9] = AnimationHelper.createAnimation(35, -5, 8, 0, this.co2Image[9], 2 , 1);

        //第三段动画

        this.animation[10] = AnimationHelper.createAnimation(35, -5, 10, 0, this.co2Image[10], 2 , 0);
        this.animation[11] = AnimationHelper.createAnimation(35, -5, -5, 0, this.co2Image[11], 2 , 0.4);
        this.animation[12] = AnimationHelper.createAnimation(35, -5, 5, 0, this.co2Image[12], 2 , 0.8);
        this.animation[13] = AnimationHelper.createAnimation(35, -5, -10, 0, this.co2Image[13], 2 , 1.2);
        this.animation[14] = AnimationHelper.createAnimation(35, -5, 8, 0, this.co2Image[14], 2 , 1.6);

        //第四段动画
        this.animation[15] = AnimationHelper.createAnimation(35, -5, 10, 0, this.co2Image[15], 2 , 0);
        this.animation[16] = AnimationHelper.createAnimation(35, -5, -5, 0, this.co2Image[16], 2 , 0.4);
        this.animation[17] = AnimationHelper.createAnimation(35, -5, 5, 0, this.co2Image[17], 2 , 0.8);
        this.animation[18] = AnimationHelper.createAnimation(35, -5, -10, 0, this.co2Image[18], 2 , 1.2);
        this.animation[24] = AnimationHelper.createAnimation(35, -5, 8, 0, this.co2Image[19], 2 , 1.6);

        this.animation[25] = AnimationHelper.createAnimation(-10, -20, -50, 0, this.co2Image[20], 2, 0);
        this.animation[26] = AnimationHelper.createAnimation(-20, -10, -50, 0, this.co2Image[21], 2, 1);

        //第五段动画

        this.animation[27] = AnimationHelper.createAnimation(35, -5, 10, 0, this.co2Image[22], 2 , 0);
        this.animation[28] = AnimationHelper.createAnimation(35, -5, -5, 0, this.co2Image[23], 2 , 0.4);
        this.animation[29] = AnimationHelper.createAnimation(35, -5, 5, 0, this.co2Image[24], 2 , 0.8);
        this.animation[30] = AnimationHelper.createAnimation(35, -5, -10, 0, this.co2Image[25], 2 , 1.2);
        this.animation[31] = AnimationHelper.createAnimation(35, -5, 8, 0, this.co2Image[26], 2 , 1.6);

        this.animation[32] = AnimationHelper.createAnimation(-10, -20, -50, 0, this.co2Image[27], 2, 0);
        this.animation[33] = AnimationHelper.createAnimation(-20, -10, -50, 0, this.co2Image[28], 2, 0.4);
        this.animation[34] = AnimationHelper.createAnimation(-30, -20, -50, 0, this.co2Image[29], 2, 0.8);
        this.animation[35] = AnimationHelper.createAnimation(-10, -20, -50, 0, this.co2Image[30], 2, 1.2);
        this.animation[36] = AnimationHelper.createAnimation(-20, -10, -50, 0, this.co2Image[31], 2, 1.6);

        //创建点移动的动画
        this.animation[19] = AnimationHelper.createPointAnimation(this.pointCoodinate[0], this.pointCoodinate[2],
            this.pointCoodinate[1], this.pointCoodinate[3], this.point, 0.8, this.rectangle, this.dashLine, this.text);
        this.animation[20] = AnimationHelper.createPointAnimation(this.pointCoodinate[2], -17.5,
            this.pointCoodinate[3], -11.5, this.point, 0.5, this.rectangle, this.dashLine, this.text);
        this.animation[21] = AnimationHelper.createPointAnimation(-17.5, this.pointCoodinate[6],
            -11.5, this.pointCoodinate[7], this.point, 0.8, this.rectangle, this.dashLine, this.text);
        this.animation[22] = AnimationHelper.createPointAnimation(this.pointCoodinate[6], 2,
            this.pointCoodinate[7], 17.5, this.point, 0.8, this.rectangle, this.dashLine, this.text);
        this.animation[23] = AnimationHelper.createPointAnimation(2, 20,
            17.5, 17.5, this.point, 0.8, this.rectangle, this.dashLine, this.text);
    }




    //控制光的强弱的方法
    sunshineControl(value: number) {
        switch (value) {
            case 0:
                //设置太阳和光的亮度
                (this.sunLight.material as any).opacity = 0;
                (this.circleImage.material as any).opacity = 0;
                this.setAnimationStatus();
                this.animation1Play();
                this.point.position.set(-29.4, -29.4, 0);
                this.rectangle.position.set(10 + this.point.position.x + 29.4, 0, -0.05);
                this.dashLine.geometry.vertices[0] = new THREE.Vector3(-29.4, -29.4, 0);
                this.dashLine.geometry.vertices[1] = new THREE.Vector3(-29.4, -29.4, 0);
                this.dashLine.geometry.verticesNeedUpdate = true;
                this.text.visible = false;
                this.dashLine.visible = false;
                this.isShowFromText(value);
                break;
            case 1:
                //设置太阳和光的亮度
                (this.sunLight.material as any).opacity = 0.1;
                (this.circleImage.material as any).opacity = 0.59;
                this.setAnimationStatus();
                this.animation2Play();
                this.animation[19].progress(0);
                this.animation[19].pause();
                this.animation[19].play();
                this.isShowDashLineAndText();
                this.isShowFromText(value);
                break;
            case 2:
                //设置太阳和光的亮度
                (this.sunLight.material as any).opacity = 0.2;
                (this.circleImage.material as any).opacity = 0.70;
                this.setAnimationStatus();
                this.animation3Play();
                this.animation[20].progress(0);
                this.animation[20].pause();
                this.animation[20].play();
                this.isShowDashLineAndText();
                this.isShowFromText(value);
                break;
            case 3:
                //设置太阳和光的亮度
                (this.sunLight.material as any).opacity = 0.3;
                (this.circleImage.material as any).opacity = 0.80;
                this.setAnimationStatus();
                this.animation4Play();
                this.animation[21].progress(0);
                this.animation[21].pause();
                this.animation[21].play();
                this.isShowDashLineAndText();
                this.isShowFromText(value);
                break;
            case 4:
                //设置太阳和光的亮度
                (this.sunLight.material as any).opacity = 0.4;
                (this.circleImage.material as any).opacity = 0.90;
                this.setAnimationStatus();
                this.animation5Play();
                this.animation[22].progress(0);
                this.animation[22].pause();
                this.animation[22].play();
                this.isShowDashLineAndText();
                this.isShowFromText(value);
                break;
            case 5:
                //设置太阳和光的亮度
                (this.sunLight.material as any).opacity = 0.55;
                (this.circleImage.material as any).opacity = 1;
                this.setAnimationStatus();
                this.animation5Play();
                this.animation[23].progress(0);
                this.animation[23].pause();
                this.animation[23].play();
                this.isShowDashLineAndText();
                this.isShowFromText(value);
                break;
        }
    }

    //判断是否需要显示虚线和文字
    isShowDashLineAndText() {
        if ((window as any).viewHandler.viewModel.$data.isActive2 === true) {
            this.text.visible = false;
            this.dashLine.visible = false;
        } else {
            this.text.visible = true;
            this.dashLine.visible = true;
        }
    }

    //判断表格标注是否需要显示
    isShowFromText(value: number) {
        if ((window as any).viewHandler.viewModel.$data.isActive2 === true) {
            if (value > 1) {
                this.bText.visible = true;
            } else {
                this.bText.visible = false;
            }
            if (value >= 4) {
                this.cText.visible = true;
            } else {
                this.cText.visible = false;
            }
        } else {
            this.bText.visible = false;
            this.cText.visible = false;
        }
    }

    //播放第一段动画
    animation1Play() {
        for (let i = 0; i < 5; i++) {
            this.animation[i].play();
        }
    }

    //播放第二段动画
    animation2Play() {
        for (let i = 5; i < 10; i++) {
            this.animation[i].play();
        }
    }

    //播放第三段动画
    animation3Play() {
        for (let i = 10; i < 15; i++) {
            this.animation[i].play();
        }
    }

    //播放第四段动画
    animation4Play() {
        this.animation[15].play();
        this.animation[16].play();
        this.animation[17].play();
        this.animation[18].play();

        this.animation[24].play();
        this.animation[25].play();
        this.animation[26].play();
    }

    //播放第五段动画
    animation5Play() {
        for (let i = 27; i < 37; i++) {
            this.animation[i].play();
        }
    }

    //重置点移动动画的方法
    resetMovePoint() {
        for (let i = 19; i < 24; i++) {
            this.animation[i].progress(0);
            this.animation[i].pause();
        }
    }

    //设置动画状态的方法
    //将动画暂停 把用到的图的透明度设置为0
    setAnimationStatus() {
        for (let i = 0; i < 19; i++) {
            AnimationHelper.pauseAnimate(this.animation[i]);
        }
        for (let i = 24; i < 37; i++) {
            AnimationHelper.pauseAnimate(this.animation[i]);
        }
        for (let i = 0; i < 32; i++) {
            (this.co2Image[i].material as any).opacity = 0;
        }
    }

    //设置遮挡的矩形的位置
    setRectPosition() {
        this.rectangle.position.set(10 + this.point.position.x + 29.4, 0, -0.05);
    }

    reset() {
        this.fromControl(true);
        this.rectangle.position.set(10, 0, -0.05);
        this.isShowDashLineAndText();
    }

}




