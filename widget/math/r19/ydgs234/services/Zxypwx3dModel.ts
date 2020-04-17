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
import * as p from '../sub_static/p.png';
import * as p1 from '../sub_static/p1.png';
import * as p2 from '../sub_static/p2.png';
import * as p3 from '../sub_static/p3.png';
import * as p1text from '../sub_static/p1text.png';
import * as p2text from '../sub_static/p2text.png';
import * as p3text from '../sub_static/p3text.png';
import * as formula from '../sub_static/moren.png';
import {CircleLineUtils} from '../../../../../src/three/component/CircleLineUtils';
import {SpriteText2D} from 'three-text2d';

export class Zxypwx3dModel extends ThreeBase {


    planeMesh: Mesh;
    private controls: any;
    private sliderControlLine: any;
    private rotatePoint1: THREE.Mesh;
    private rotatePoint2: THREE.Mesh;
    private rotatePoint3: THREE.Mesh;


    private redLine: THREE.Mesh;
    private yellowLine: THREE.Mesh;
    private purpleLine: THREE.Mesh;
    private greenLine: THREE.Mesh;

    private redText: any;
    private yellowText: any;
    private purpleText: any;
    private greenText: any;

    private p: THREE.Mesh;
    private p1: THREE.Mesh;
    private p2: THREE.Mesh;
    private p3: THREE.Mesh;

    private pText: THREE.Mesh;
    private p1Text: THREE.Mesh;
    private p2Text: THREE.Mesh;
    private p3Text: THREE.Mesh;

    private clickPoint1: THREE.Mesh;
    private clickPoint2: THREE.Mesh;
    private clickPoint3: THREE.Mesh;
    private clickPoint4: THREE.Mesh;
    private arc: THREE.Mesh;
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

    //为了防止图片打包时丢失，加载图片
    imgLoad() {
        const imgArray = [huadongdian, tuodongdian, p, p1, p2, p3];
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
        this.imgLoad();
        this.createAxis();
        this.createCircle();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.createRotateLine();
        this.createArc();
        this.createRotatePoint();
        this.createText();
        this.initMoveEvent();
        this.createClickPoint();
        this.createLineText();
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
        this.scene.add(AxisUtil.createAxis({ isTicks: false } as any));
        const text1 = ThreeUtil.createNormalText('1', 52, -2, 0, '#000000', 0.12);
        const text2 = ThreeUtil.createNormalText('-1', -53, -2, 0, '#000000', 0.12);
        const text3 = ThreeUtil.createNormalText('1', -3, 56, 0, '#000000', 0.12);
        const text4 = ThreeUtil.createNormalText('-1', -3, -51, 0, '#000000', 0.12);
        this.scene.add(text1);
        this.scene.add(text2);
        this.scene.add(text3);
        this.scene.add(text4);
    }


    createRotateLine() {
        const alpha = 60;
        const width = 12.6;
        const height = 12.6;
        const lineHeight = 100;

        this.redLine = ThreeUtil.createLine(1, lineHeight, '#FF4B4B');
        this.greenLine = ThreeUtil.createLine(1, lineHeight, '#49F0CA');

        const huadong = ThreeUtil.createImg(width, height, huadongdian, 0, 0, 0);
        const huadong1 = ThreeUtil.createImg(500, 500, huadongdian, 0, 50, 0);
        (huadong1.material as any).opacity = 0;
        huadong.rotateZ(Math.PI / 2);
        //设置几条直线的初始角度和位置
        this.redLine.rotateZ(-(90 - alpha) * Math.PI / 180);
        this.redLine.position.set(((lineHeight / 2) * Math.sin((90 - alpha) * Math.PI / 180)) / Math.sin(Math.PI / 2),
            (lineHeight * Math.sin(((90 - (90 - alpha)) * Math.PI) / 180)) / Math.sin(Math.PI / 2) / 2, 0);
        this.greenLine.rotateZ(( 180 + alpha - 90) * Math.PI / 180);
        this.greenLine.position.set(-((lineHeight / 2) * Math.sin((90 - alpha) * Math.PI / 180)) / Math.sin(Math.PI / 2),
            -(lineHeight * Math.sin(((90 - (90 - alpha)) * Math.PI) / 180)) / Math.sin(Math.PI / 2) / 2, 0);
        this.rotatePoint1 = ThreeUtil.createPlane(0.01, 0.01, '#000000', 0);
        huadong1.add(huadong);
        this.redLine.add(huadong1);

        this.rotatePoint1.add(this.redLine);
        this.rotatePoint1.add(this.greenLine);
        //用此方法前先导入事件包
        this.sliderControlLine = new SliderControlLine(this.redLine, huadong1, this.rotatePoint1, huadong);
        this.sliderControlLine.initEvent(this.camera, this.renderer, this.controls);
        this.scene.add(this.rotatePoint1);

        //设置几条直线的初始角度和位置
        this.rotatePoint2 = ThreeUtil.createPlane(0.01, 0.01, '#000000', 0);
        this.yellowLine = ThreeUtil.createLine(1, lineHeight, '#FF9D1E');
        this.purpleLine = ThreeUtil.createLine(1, lineHeight, '#BD1DE9');
        this.purpleLine.rotateZ((90 + 180 - alpha) * Math.PI / 180);
        this.purpleLine.position.set(((lineHeight / 2) * Math.sin((90 - alpha) * Math.PI / 180)) / Math.sin(Math.PI / 2),
            -(lineHeight * Math.sin(((90 - (90 - alpha)) * Math.PI) / 180)) / Math.sin(Math.PI / 2) / 2, 0);
        this.yellowLine.rotateZ((180 - (alpha + 90)) * Math.PI / 180);
        this.yellowLine.position.set(-((lineHeight / 2) * Math.sin((90 - alpha) * Math.PI / 180)) / Math.sin(Math.PI / 2),
            (lineHeight * Math.sin(((90 - (90 - alpha)) * Math.PI) / 180)) / Math.sin(Math.PI / 2) / 2, 0);
        this.rotatePoint2.add(this.yellowLine);
        this.rotatePoint2.add(this.purpleLine);
        this.scene.add(this.rotatePoint2);
        this.purpleLine.visible = false;
        this.yellowLine.visible = false;
        this.greenLine.visible = false;
    }

    //设置move事件内容
    initMoveEvent() {
        this.sliderControlLine.sliderPointMouseMoveCallback = () => {
            this.initEvent();
        };
        this.sliderControlLine.sliderPointTouchMoveCallback = () => {
            if (this.scene.children[10].name === 'rotatePoint1') {
                this.resetAdditon();
            }
            this.initEvent();
        };

        //为了解决mouse事件遮挡的问题 判断在鼠标按下时交换Mesh位置
        this.sliderControlLine.sliderPointMouseDownCallback = () => {
            if (this.scene.children[10].name === 'rotatePoint1') {
                this.resetAdditon();
            }
        };

        this.sliderControlLine.sliderPointMouseUpCallback = () => {
            if (this.scene.children[10].name === 'rotatePoint2') {
                this.resetAdditon();
            }
        };

        // this.sliderControlLine.controlPointDragEndCallback = () => {
        //     if (this.scene.children[10].name === 'rotatePoint2') {
        //         this.resetAdditon();
        //     }
        // };

        this.sliderControlLine.sliderPointTouchEndCallback = () => {
            if (this.scene.children[10].name === 'rotatePoint2') {
                this.resetAdditon();
            }
        };

    }


    //设置事件内容
    initEvent() {
        this.rotatePoint2.rotation.z = -this.sliderControlLine.angle;
        this.p.rotation.z = -this.sliderControlLine.angle + 30 * Math.PI / 180;
        this.p1.rotation.z = this.sliderControlLine.angle + 150 * Math.PI / 180;
        this.p2.rotation.z = this.sliderControlLine.angle + 330 * Math.PI / 180;
        this.p3.rotation.z = -this.sliderControlLine.angle + 210 * Math.PI / 180;
        this.p1Text.rotation.z = this.sliderControlLine.angle + 150 * Math.PI / 180;
        this.p2Text.rotation.z = this.sliderControlLine.angle + 330 * Math.PI / 180;
        this.p3Text.rotation.z = -this.sliderControlLine.angle + 210 * Math.PI / 180;
        this.rotatePoint3.rotation.z = (((Math.PI * 2) + this.sliderControlLine.angle + (60 * Math.PI / 180)) % (2 * Math.PI)) / 2;
        if ((this.sliderControlLine.angle + (60 * Math.PI / 180)) <= 0) {
            this.resetArc(((Math.PI * 2) + this.sliderControlLine.angle + (60 * Math.PI / 180)) % (2 * Math.PI));
        } else {
            this.resetArc((this.sliderControlLine.angle + (60 * Math.PI / 180)) % (2 * Math.PI));
        }
    }

    //创建线上的字体
    createLineText() {
        this.redText = this.createNewRomanText('α', 0, 70, 0, '#FF4B4B', 0.15);
        this.yellowText = this.createNewRomanText('π-α',  -5, 70, 0, '#FF9D1E', 0.15);
        this.greenText = this.createNewRomanText('π+α', - 5, 70, 0, '#50E3C2', 0.15);
        this.purpleText = this.createNewRomanText('-α', 0, 70, 0, '#BD1DE9', 0.15);
        this.redLine.add(this.redText);
        this.yellowLine.add(this.yellowText);
        this.greenLine.add(this.greenText);
        this.purpleLine.add(this.purpleText);
    }

    //创建字的方法
    createNewRomanText(texts: string, x: number, y: number, z: number, color: string, scale: number): SpriteText2D {
        const textStyle = { font: 'italic 50px "Times New Roman"', fillStyle: color, antialias: true, shadowColor: color};
        const text = new SpriteText2D(texts, textStyle);
        text.scale.set(scale, scale, scale);
        text.position.set(x, y, z);
        text.material.depthTest = false;
        return text;
    }



    //创建角度弧
    createArc() {
        const geometry = new THREE.CircleBufferGeometry(10, 32, 0, this.sliderControlLine.angle + (60 * Math.PI / 180));
        const material = new THREE.MeshBasicMaterial({ transparent: true, color: 0xffaeae, opacity: 0.5 });
        this.arc = new THREE.Mesh(geometry, material);
        this.scene.add(this.arc);
    }

    //重新设置弧的大小
    resetArc(angle: number) {
      this.removeArc();
        const geometry = new THREE.CircleBufferGeometry(10, 32, 0, angle);
        const material = new THREE.MeshBasicMaterial({ transparent: true, color: 0xffaeae, opacity: 0.5 });
        this.arc = new THREE.Mesh(geometry, material);
        this.scene.add(this.arc);
    }

    //删除弧的方法
    removeArc() {
        this.scene.remove(this.arc);
        this.arc.geometry.dispose();
        (this.arc.material as any).dispose();
        this.arc = null;
    }

    //创建一个圆
    createCircle() {
        const circleHelper = new CircleLineUtils();
        this.scene.add(circleHelper.addEllipseLine(50, 0x000000, 3, 1.2, 2 * Math.PI));
    }

    //控制直线显示隐藏
    showHideLine(number: number, isShow: boolean) {
        switch (number) {
            case 1:
                this.purpleLine.visible = isShow;
                break;
            case 2:
                this.yellowLine.visible = isShow;
                break;
            case 3:
                this.greenLine.visible = isShow;
                break;
        }
    }

    //创建文字
    createText() {
        this.p = ThreeUtil.createImg(17.4, 7.8, p, 10, 10, 0);
        this.p2 = ThreeUtil.createImg(28.8, 10.2, p2, 15, 10, 0);
        this.p1 = ThreeUtil.createImg(24, 10.2, p1, 10, 10, 0);
        this.p3 = ThreeUtil.createImg(28, 10.2, p3, 15, 12, 0);

        this.p1Text = ThreeUtil.createImg(6.6, 9, p1text, 10, 10, 0);
        this.p2Text = ThreeUtil.createImg(6.6, 9, p2text, 10, 10, 0);
        this.p3Text = ThreeUtil.createImg(6.6, 9, p3text, 10, 10, 0);


        this.p.rotation.z = 30 * Math.PI / 180;
        this.p2Text.rotation.z = 330 * Math.PI / 180;
        this.p2.rotation.z = 330 * Math.PI / 180;
        this.p1Text.rotation.z = 150 * Math.PI / 180;
        this.p1.rotation.z = 150 * Math.PI / 180;
        this.p3Text.rotation.z = 210 * Math.PI / 180;
        this.p3.rotation.z = 210 * Math.PI / 180;

        this.p1.visible = false;
        this.p2.visible = false;
        this.p3.visible = false;

        const a = ThreeUtil.createNewRomanText('α',  12, 3, 0, '#000000', 0.15);
        this.redLine.add(this.p);
        this.redLine.add(this.pText);
        this.yellowLine.add(this.p2);
        this.yellowLine.add(this.p2Text);
        this.purpleLine.add(this.p1);
        this.purpleLine.add(this.p1Text);
        this.greenLine.add(this.p3);
        this.greenLine.add(this.p3Text);
        this.rotatePoint3.add(a);
        this.rotatePoint3.rotation.z = 30 * Math.PI / 180;
    }

    //创建可点击点并绑定事件
    createClickPoint() {
        const radius = (window as any)['env'].browserInfo.isSmallDevice ? 10 : 5;
        const point1 = ThreeUtil.createSphere(1.5, '#0199ff', 1, 0, 0, 0);
        const point2 = point1.clone();
        const point3 = point1.clone();
        const point4 = point1.clone();
        //因为手机上触控点太小不方便点击所以增加一个大圆
        this.clickPoint1 = ThreeUtil.createSphere(radius, '#0199ff', 1, 0, 0, 0);
        (this.clickPoint1.material as any).opacity = 0;
        this.clickPoint2 = this.clickPoint1.clone();
        this.clickPoint3 = this.clickPoint1.clone();
        this.clickPoint4 = this.clickPoint1.clone();

        this.clickPoint2.add(point2);
        this.clickPoint3.add(point3);
        this.clickPoint4.add(point4);

        (this.clickPoint2 as any).on('click', (event: any) => {
            this.p2.visible = !this.p2.visible;
            this.p2Text.visible = !this.p2Text.visible;
        });
        (this.clickPoint3 as any).on('click', (event: any) => {
            this.p3.visible = !this.p3.visible;
            this.p3Text.visible = !this.p3Text.visible;
        });
        (this.clickPoint4 as any).on('click', (event: any) => {
            this.p1.visible = !this.p1.visible;
            this.p1Text.visible = !this.p1Text.visible;
        });

        this.redLine.add(this.clickPoint1);
        this.yellowLine.add(this.clickPoint2);
        this.greenLine.add(this.clickPoint3);
        this.purpleLine.add(this.clickPoint4);

        this.rotatePoint1.name = 'rotatePoint1';
        this.rotatePoint2.name = 'rotatePoint2';
        console.log(this.scene.children);
    }

    //调换加入场景的顺序保证事件的正常触发
    //用于解决mouse事件遮挡的问题
    resetAdditon() {
        const e = this.scene.children[10];
        this.scene.children[10] = this.scene.children[11];
        this.scene.children[11] = e;
    }

    //创建旋转中心使Alpha旋转
    createRotatePoint() {
        this.rotatePoint3 = ThreeUtil.createPlane(0.01, 0.01, '#000000', 0);
        this.scene.add(this.rotatePoint3);
    }

    reset() {
        this.purpleLine.visible = false;
        this.yellowLine.visible = false;
        this.greenLine.visible = false;
        this.rotatePoint1.rotateZ(-this.sliderControlLine.angle);
        this.rotatePoint2.rotateZ(this.sliderControlLine.angle);
        this.sliderControlLine.angle = 0;
        this.resetArc(this.sliderControlLine.angle + (60 * Math.PI / 180));

        this.p.rotation.z = -this.sliderControlLine.angle + 30 * Math.PI / 180;
        this.p1.rotation.z = this.sliderControlLine.angle + 150 * Math.PI / 180;
        this.p2.rotation.z = this.sliderControlLine.angle + 330 * Math.PI / 180;
        this.p3.rotation.z = -this.sliderControlLine.angle + 210 * Math.PI / 180;

        this.p1.visible = false;
        this.p2.visible = false;
        this.p3.visible = false;

        this.p1Text.rotation.z = this.sliderControlLine.angle + 150 * Math.PI / 180;
        this.p2Text.rotation.z = this.sliderControlLine.angle + 330 * Math.PI / 180;
        this.p3Text.rotation.z = -this.sliderControlLine.angle + 210 * Math.PI / 180;

        this.p1Text.visible = true;
        this.p2Text.visible = true;
        this.p3Text.visible = true;

        this.rotatePoint3.rotation.z = 30 * Math.PI / 180;
    }

}




