import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';

// const Interaction = require('three.interaction');
const dragcontrols = require('three-dragcontrols').default;
const TrackballControls = require('three-trackballcontrols');
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import * as mirrorLeft from '../sub_static/left.png';
import * as mirrorRight from '../sub_static/right.png';
import * as dragePoint from '../sub_static/drag.png';
import * as lightBg from '../sub_static/lightBg.png';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {Utils} from './Utils';
import {ViewController} from '../../../../../src/core/ViewController';
import {Line} from '../../../../../src/three/component/Line';
import commonForThree from './commonForThree';
import {Camera} from 'three';
import {Renderer} from 'three';

export class qmjdgxdzy extends ThreeBase {

    browserInfo: BrowserInfo;
    private controls: any;
    private mirrorLeft: any;
    private mirrorRight: any;
    private circlePointLeft: any;
    private circlePointRight: any;
    private dragePoint: any;
    private saveArr: any;
    // private dragePointSelect: boolean;
    // private interact: any;
    private incidentLight: any;
    dragControls: any;
    private reflectedLight: any;
    private dragY: any;

    // private windowWidth = document.getElementById('3dContainer').getBoundingClientRect().width;
    // private windowHeight = document.getElementById('3dContainer').getBoundingClientRect().height;

    private render = () => {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        setTimeout(this.render, 30);
    };

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
       this.saveArr = [];
        this.fov = !fov ? this.fov : fov;
        this.near = !near ? this.near : near;
        this.far = !far ? this.far : fov;
        this.width = !width ? window.innerWidth : width;
        this.height = !height ? window.innerHeight : height;
        this.domElement = domElement;
        this.init();
    }

    init(): void {
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.initScene();
        this.initCamera();
        this.initWebGLRenderer();
        this.tbctrl();

        this.createMirror();
        this.initObj();

        // this.interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        // this.initMouseEvent();
        // this.addEventToDragPoint();
        this.initDragEvent(this.dragePoint, this.camera, this.renderer);
        this.render();
    }

    initScene(): void {
        this.scene = new THREE.Scene();

    }
    private initDragEvent(controlPoint: any, camera: Camera, renderer: Renderer) {
        this.dragControls = new dragcontrols([controlPoint], camera, renderer.domElement);
        this.dragControls.addEventListener('dragstart', () => {
            // this.controlPointDragStart(controls);
        });
        this.dragControls.addEventListener('drag', () => {
            // const mousePosArr = {} as any;
            // mousePosArr.x = controlPoint.position.x;
            // mousePosArr.y = controlPoint.position.y;
            // Line3dModel.moveHandle(mousePosArr, controlPoint.name);
            this.dragY = controlPoint.position.y;
            let maxY = 0;
            const left = ViewController.getInstance().viewHandler.viewModel.$data.left;
            if (left) {
                maxY = 85;
            } else {
                maxY = 83;
            }
            if (this.dragY > maxY) {
                this.dragY = maxY;
            } else if (this.dragY < -maxY) {
                this.dragY = -maxY;
            }
            this.move();
        })
        this.dragControls.addEventListener('dragend', () => {
            // this.controlPointDragEnd(controls);
        });
    }
    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near = 0.1;
        const far = 2000;
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 300);
    }

    //初始化摄像机位置
    resetCamera(): void {
        this.controls.reset();
    }

    /**
     * 初始化渲染器
     */
    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }

    /**
     * 初始化控制器
     * 使用该控制器需要在render中调用update方法
     */
    tbctrl(): void {
        this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 3;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = true;
        this.controls.noPan = true;
        this.controls.noRotate = true;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
    }


    //拖动进行的计算
    move(): void {
        const left = ViewController.getInstance().viewHandler.viewModel.$data.left;
        this.dragePoint.position.y = this.dragY;
        this.dragePoint.position.x = -204;
        // this.incidentLight.position.y = this.dragY;
        if (left) {
            // 80.6
            const incidentDistance = -Math.sqrt((430.5 * 430.5) - this.dragY * this.dragY) + 421.6;
            commonForThree.scaleLine([incidentDistance, this.dragY, 0], [ -204, this.dragY, 0], this.incidentLight);
            // this.incidentLight.scale.set(198 - incidentDistance, 1, 1);
            // // console.log(incidentDistance, this.dragY);
            // // //入射光线
            // const halfX = -incidentDistance / 2 ;
            // this.incidentLight.position.set(halfX, this.dragY, -1);
            // //反射光线
            const reflectedX = 421.6 - incidentDistance;
            const tanA = this.dragY / (reflectedX - (430 / 2));
            // this.reflectedLight.rotation.z = tanA;

            const endX = reflectedX - Math.cos(- Math.atan(tanA) / 2) * 1000 ;
            const endY = this.dragY - Math.sin(-Math.atan(tanA) / 2) * 1000;
            commonForThree.scaleLine([incidentDistance, this.dragY, 0], [ endX , endY, 0], this.reflectedLight);

            //反射光线位置
            // this.reflectedLight.position.set( -reflectedX + endX, (this.dragY + endY) / 2, 0);
            //结束点坐标
            // const endX = reflectedX - Math.cos(Math.atan(tanA)) * 500;
            // const endY = this.dragY - Math.sin(Math.atan(tanA)) * 500;
            // console.log(endX, (reflectedX + endX) / 2,11111111111111);
            //反射光线位置
            // this.reflectedLight.position.set(0 ,  0,0 );
        } else {
            // 71.6
            const incidentDistance = Math.sqrt((430 * 430) - this.dragY * this.dragY) - 430.6;
            commonForThree.scaleLine([incidentDistance, this.dragY, 0], [ -204, this.dragY, 0], this.incidentLight);
            // this.incidentLight.scale.set(198 - incidentDistance, 1, 1);
            // // console.log(incidentDistance, this.dragY);
            // // //入射光线
            // const halfX = -incidentDistance / 2 ;
            // this.incidentLight.position.set(halfX, this.dragY, -1);
            // //反射光线
            const reflectedX = -430.6 - incidentDistance;
            const tanA = this.dragY / (reflectedX - (430 / 2));
            // this.reflectedLight.rotation.z = tanA;

            const endX = reflectedX - Math.cos(- Math.atan(tanA) * 2) * 1000 ;
            const endY = this.dragY - Math.sin(-Math.atan(tanA) * 2) * 1000;
            commonForThree.scaleLine([incidentDistance, this.dragY, 0], [ -204.1 , 0, 0], this.reflectedLight);
            // this.reflectedLight.position.z = 10;
            console.log( this.reflectedLight.position .z);
        }
    }
    // move (): void {
    //     const left = ViewController.getInstance().viewHandler.viewModel.$data.left;
    //     this.dragePoint.position.y = this.dragY;
    //     this.incidentLight.position.y = this.dragY;
    //     if (left) {
    //     //71.6
    //     const incidentDistance = Math.sqrt(5126.55 - this.dragY * this.dragY);
    //     this.incidentLight.scale.set(incidentDistance, 1, 1);
    //     //入射光线
    //     const halfX = incidentDistance / 2 - 140;
    //     this.incidentLight.position.set(halfX, this.dragY, -1);
    //     //反射光线

    // }
    // }

    //凸面镜凹面镜
    createMirror(): void {
        this.mirrorLeft = Utils.createImg(0, 0, 2, 18, 172, mirrorLeft);
        this.mirrorRight = Utils.createImg(0, 0, 2, 18, 172, mirrorRight);
        this.scene.add(this.mirrorRight);
    }
    save(): void {
        if (this.saveArr.length > 2) {
            let meshGroup = this.saveArr.shift();
            this.scene.remove(meshGroup);
        }
        let group = new THREE.Group();
        let incidentLight = this.incidentLight.clone();
        let reflectedLight = this.reflectedLight.clone();
        // let reflectedLight2 = this.reflectedLight2.clone();
        group.add(incidentLight, reflectedLight);
        this.saveArr.push(group);
        this.scene.add(group);
    }

    //创建场景内基本物体
    initObj(): void {
        const geometry = new THREE.CircleBufferGeometry(430, 128);
        const material = new THREE.MeshBasicMaterial({color: 0xffff00});
        const circle = new THREE.Mesh(geometry, material);
        circle.position.x = -430.6;
        const geometry1 = new THREE.CircleBufferGeometry(430.5, 128);
        const material1 = new THREE.MeshBasicMaterial({color: 0xffff00});
        const circle1 = new THREE.Mesh(geometry1, material1);
        circle1.position.x = 421.6;
        // this.scene.add(circle);
        // 左右焦点
        this.circlePointLeft = Utils.createPoint(2, '#ffffff', -40, 0);
        this.circlePointRight = Utils.createPoint(2, '#ffffff', 40, 0);
        // this.scene.add( this.circlePointLeft, this.circlePointRight);

        //中间的虚线
        const line = new Line();
        const lineMesh = line.createLine({
            startPoint: new THREE.Vector3(-150, 0, -1),
            endPoint: new THREE.Vector3(150, 0, -1),
            color: '#8b8b8b',
            lineWidth: 400,
            dashSize: 1,
            gapSize: 7,
            depthTest: true
        });

        //拖动的点
        this.dragePoint = Utils.createImg(-140, 50, 1, 20, 20, dragePoint);

        //入射光线单位向量
        this.incidentLight = Utils.createImg(0, 0, -1, 2, 5, lightBg);

        //反射光线单位向量
        this.reflectedLight = Utils.createImg(0, 0, -1, 2, 5, lightBg);

        this.dragY = 50;
        this.move();
        this.scene.add( this.dragePoint, this.incidentLight, this.reflectedLight);
    }

    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    reset(): void {
        ViewController.getInstance().viewHandler.viewModel.$data.left = false;
        this.dragY = 50;
        this.move();
        this.scene.add(this.mirrorRight);
        this.scene.remove(this.mirrorLeft);
        this.scene.remove(...this.saveArr);
        this.saveArr = [];
    }

    btnEvent(): void {
        this.scene.remove(...this.saveArr);
        this.saveArr = [];
        const left = ViewController.getInstance().viewHandler.viewModel.$data.left;
        this.dragY = 50;
        this.move();
        if (left) {
            this.scene.add(this.mirrorLeft);
            this.scene.remove(this.mirrorRight);
        } else {
            this.scene.add(this.mirrorRight);
            this.scene.remove(this.mirrorLeft);
        }
    }
}




