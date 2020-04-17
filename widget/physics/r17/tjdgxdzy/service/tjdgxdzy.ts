import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';

// const Interaction = require('three.interaction');
const dragcontrols = require('three-dragcontrols').default;
const TrackballControls = require('three-trackballcontrols');
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import * as concaveLens from '../sub_static/concaveLens.png';
import * as convexLens from '../sub_static/convexLens.png';
import * as dragePoint from '../sub_static/drag.png';
import * as lightBg from '../sub_static/lightBg.png';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {Utils} from './Utils';
import {ViewController} from '../../../../../src/core/ViewController';
import {Line} from '../../../../../src/three/component/Line';
// import {Vector3} from 'three';
import {Camera} from 'three';
import {Renderer} from 'three';

export class tjdgxdzy extends ThreeBase {

    browserInfo: BrowserInfo;
    private controls: any;
    private concaveLens: any;
    private convexLens: any;
    private circlePointLeft: any;
    private circlePointRight: any;
    private dragePoint: any;
    // private dragePointSelect: boolean;
    // private interact: any;
    private incidentLight: any;
    dragControls: any;
    private reflectedLight1: any;
    private reflectedLight2: any;
    private dragY: number;
    private saveArr:Array<THREE.Group> = [];
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
                maxY = 71.5;
            } else {
                maxY = 60.6;
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

    //获取鼠标位置并转换成三维世界坐标
    // getMousePosition(x: number, y: number) {
    //     const vector = new Vector3();
    //
    //     vector.set((x / this.windowWidth) * 2 - 1,
    //         (-y / this.windowHeight) * 2 + 1, 0);
    //
    //     vector.unproject(this.camera);
    //
    //     const dir = vector.sub(this.camera.position).normalize();
    //
    //     const distance = -this.camera.position.z / dir.z;
    //
    //     return this.camera.position.clone().add(dir.multiplyScalar(distance));
    // }

    //添加拖动事件
    // addEventToDragPoint(): void {
    //     //鼠标按下时获取鼠标坐标
    //     (this.dragePoint as any).on('mousedown', (event: Event) => {
    //         this.dragePointSelect = true;
    //     });
    //
    //     (this.dragePoint as any).on('mouseup', () => {
    //         this.dragePointSelect = false;
    //     });
    //
    //     (this.dragePoint as any).on('mouseout', () => {
    //         this.dragePointSelect = false;
    //     });
    //
    //     (this.dragePoint as any).on('mousemove', (event: Event) => {
    //         if (this.dragePointSelect) {
    //             const pointX = (event as any).data.originalEvent.clientX;
    //             const pointY = (event as any).data.originalEvent.clientY;
    //             this.dragY = this.getMousePosition(pointX, pointY).y;
    //             this.move();
    //         }
    //     });
    //     (this.dragePoint as any).on('touchstart', (event: Event) => {
    //         this.dragePointSelect = true;
    //     });
    //
    //     (this.dragePoint as any).on('touchend', () => {
    //         this.dragePointSelect = false;
    //     });
    //
    //     (this.dragePoint as any).on('touchmove', (event: Event) => {
    //         if (this.dragePointSelect) {
    //             const pointX = (event as any).data.originalEvent.changedTouches[0].clientX;
    //             const pointY = (event as any).data.originalEvent.changedTouches[0].clientY;
    //             this.dragY = this.getMousePosition(pointX, pointY).y;
    //             this.move();
    //         }
    //     });
    // }

    //拖动进行的计算
    move(): void {
        const concave = ViewController.getInstance().viewHandler.viewModel.$data.concave;
        this.dragePoint.position.x = -140;
        if (concave) {
            if (this.dragY > 57) {
                this.dragY = 57;
            } else if (this.dragY < -57) {
                this.dragY = -57;
            }
            this.dragePoint.position.y = this.dragY;
            this.incidentLight.position.y = this.dragY;
            // 10.8是 -140 拖拽点位置减去虚拟圆的位置 -129.3
            const incidentLightLength = Math.sqrt(123 * 123 - this.dragY * this.dragY) + 10.8;
            //入射光线
            this.incidentLight.scale.set(incidentLightLength, 1, 1);
            const incidentLightX = incidentLightLength / 2 - 140;
            this.incidentLight.position.set(incidentLightX, this.dragY, -1);
            //第一次折射光线
            const reflectedLight1H = this.dragY / 15;
            //第一次折射，出射的x
            const reflectedLight1X = Math.sqrt(123 * 123 - (this.dragY + reflectedLight1H) * (this.dragY + reflectedLight1H)) + 10.8;
            const x1 = 140 - reflectedLight1X;
            //第一次折射，入射的x
            const x2 = incidentLightLength - 140;

            //第一次折射，入射的长度
            const reflectedLight1Length = Math.sqrt((x1 - x2) * (x1 - x2) + reflectedLight1H * reflectedLight1H);
            this.reflectedLight1.scale.set(reflectedLight1Length, 1, 1);
            //第一次折射，中点坐标
            this.reflectedLight1.position.set((x1 + x2) / 2, (2 * this.dragY + reflectedLight1H) / 2, 0);
            //第一次折射入射的斜率
            const reflectedLight1K = Math.tan((reflectedLight1H / (x1 - x2)));
            this.reflectedLight1.rotation.z = reflectedLight1K;

            //第二次折射斜率
            const reflectedLight2K = this.dragY / (x1 + 70);
            const reflectedLight2Tan = Math.atan(reflectedLight2K);
            this.reflectedLight2.rotation.z = reflectedLight2Tan;

            //结束点坐标
            const endX = x1 + Math.cos(reflectedLight2Tan) * 1000;
            const endY = this.dragY + reflectedLight1H + Math.sin(reflectedLight2Tan) * 1000;
            //第二次折射中点位置
            this.reflectedLight2.position.set((x1 + endX) / 2 - 0.5, (this.dragY + reflectedLight1H + endY) / 2, -1);
        } else {
            if (this.dragY > 59) {
                this.dragY = 59;
            } else if (this.dragY < -59) {
                this.dragY = -59;
            }
            this.dragePoint.position.y = this.dragY;
            this.incidentLight.position.y = this.dragY;

            // 39是 -140 拖拽点位置减去虚拟圆的位置 -101,
            const incidentLightLength = 241 - Math.sqrt(14400 - this.dragY * this.dragY);
            this.incidentLight.scale.set(incidentLightLength, 1, 1);
            this.incidentLight.position.set(incidentLightLength / 2 - 140, this.dragY, -1);

            const incidentLightX = Math.sqrt(14400 - this.dragY * this.dragY) + 39;
            const x1 = 140 - incidentLightX;
            //入射点
            // this.circlePointLeft.position.set(x1, this.dragY, 0);

            //第一次折射光线
            const x = this.dragY / 15;
            const reflectedLight1X = Math.sqrt(14400 - (this.dragY - x) * (this.dragY - x)) + 39;
            const x2 = reflectedLight1X - 140;
            //折射点
            // this.circlePointRight.position.set(x2, this.dragY - x, 0);
            //第一次折射，入射的长度
            const reflectedLight1Length = Math.sqrt((x1 - x2) * (x1 - x2) + x * x);
            this.reflectedLight1.scale.set(reflectedLight1Length + 1, 1, 1);
            //第一次折射，中点坐标
            this.reflectedLight1.position.set((x1 + x2) / 2, (2 * this.dragY - x) / 2, 0);
            //第一次折射入射的斜率
            const reflectedLight1K = Math.tan((x / (x1 - x2)));
            this.reflectedLight1.rotation.z = reflectedLight1K;

            //第二次折射斜率
            const reflectedLight2K = (this.dragY - x) / (x2 - 75);
            const reflectedLight2Tan = Math.atan(reflectedLight2K);
            this.reflectedLight2.rotation.z = reflectedLight2Tan;

            //结束点坐标
            const endX = x2 + Math.cos(reflectedLight2Tan) * 1000;
            const endY = this.dragY - x + Math.sin(reflectedLight2Tan) * 1000;
            //第二次折射中点位置
            this.reflectedLight2.position.set((x2 + endX) / 2 - 0.5, (this.dragY - x + endY) / 2, -1);
        }
    }

    //凸面镜凹面镜
    createMirror(): void {
        this.concaveLens = Utils.createImg(0, 0, 0, 49.5, 127.5, concaveLens);
        this.convexLens = Utils.createImg(0, 0, 0, 49.5, 127.5, convexLens);
        this.scene.add(this.concaveLens);
    }

    //创建场景内基本物体
    initObj(): void {
        //凹面镜的两圆
        // const geometry = new THREE.CircleBufferGeometry(123, 128);
        // const material = new THREE.MeshBasicMaterial({color: 0xffff00});
        // const circle = new THREE.Mesh(geometry, material);
        // circle.position.x = -129.3;
        //
        // const geometry1 = new THREE.CircleBufferGeometry(123, 128);
        // const material1 = new THREE.MeshBasicMaterial({color: 0xffff00});
        // const circle1 = new THREE.Mesh(geometry1, material1);
        // circle1.position.x = 129.3;

        //凸面镜的两圆
        // const geometry = new THREE.CircleBufferGeometry(120, 128);
        // const material = new THREE.MeshBasicMaterial({color: '#b6ffd4'});
        // const circle = new THREE.Mesh(geometry, material);
        // circle.position.x = -101;
        // const geometry1 = new THREE.CircleBufferGeometry(120, 128);
        // const material1 = new THREE.MeshBasicMaterial({color: 0xffff00});
        // const circle1 = new THREE.Mesh(geometry1, material1);
        // circle1.position.x = 101;
        // this.scene.add(circle, circle1);
        //左右焦点
        // this.circlePointLeft = Utils.createPoint(2, '#ffffff', -70, 0);
        // this.circlePointRight = Utils.createPoint(2, '#ffffff', 70, 0);

        //中间的虚线
        // const line = new Line();
        // const lineMesh = line.createLine({
        //     startPoint: new THREE.Vector3(-150, 0, -1),
        //     endPoint: new THREE.Vector3(150, 0, -1),
        //     color: '#8b8b8b',
        //     lineWidth: 400,
        //     dashSize: 1,
        //     gapSize: 7,
        //     depthTest: true
        // });

        //拖动的点
        this.dragePoint = Utils.createImg(-140, 50, 1, 20, 20, dragePoint);

        //入射光线单位向量
        this.incidentLight = Utils.createImg(0, 0, 0, 1, 5, lightBg);

        //反射光线单位向量
        this.reflectedLight1 = Utils.createImg(0, 0, 0, 1, 5, lightBg);
        this.reflectedLight2 = Utils.createImg(0, 0, 0, 1000, 5, lightBg);

        this.dragY = 50;
        this.move();
        this.scene.add(  this.dragePoint,  this.incidentLight, this.reflectedLight1, this.reflectedLight2);
    }
    save() {
       if(this.saveArr.length>2) {
           let meshGroup = this.saveArr.shift();
           this.scene.remove(meshGroup);
       }
       let group = new THREE.Group();
       let incidentLight = this.incidentLight.clone();
       let reflectedLight1 = this.reflectedLight1.clone();
       let reflectedLight2 = this.reflectedLight2.clone();
       group.add(incidentLight,reflectedLight1,reflectedLight2);
       this.saveArr.push(group);
       this.scene.add(group); 

    }
    resize(width: number, height: number): void {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    reset(): void {
        ViewController.getInstance().viewHandler.viewModel.$data.concave = true;
        this.dragY = 50;
        this.move();
        // this.circlePointLeft.position.x = -70;
        // this.circlePointRight.position.x = 70;
        this.scene.add(this.concaveLens);
        this.scene.remove(this.convexLens);

        this.scene.remove(...this.saveArr);
        this.saveArr = [];
    }

    btnEvent(): void {
        this.scene.remove(...this.saveArr);
        this.saveArr = [];
        const concave = ViewController.getInstance().viewHandler.viewModel.$data.concave;
        this.dragY = 50;
        this.move();
        if (concave) {
            // this.circlePointLeft.position.x = -70;
            // this.circlePointRight.position.x = 70;
            this.scene.add(this.concaveLens);
            this.scene.remove(this.convexLens);
        } else {
            // this.circlePointLeft.position.x = -75;
            // this.circlePointRight.position.x = 75;
            this.scene.add(this.convexLens);
            this.scene.remove(this.concaveLens);
        }
    }
}




