import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {SliderControlLine} from './SliderControlLine';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';
const OrbitControls = require('three-orbitcontrols');
import { Vector2, Vector3, Raycaster} from 'three';
import common from './CommonForThree';
import * as watch from '../sub_static/watch.png';
import * as diamond from '../sub_static/diamond.svg';
import * as cap from '../sub_static/cap.png';
import * as square from '../sub_static/square.png';
import * as circle from '../sub_static/circle.png';
import * as triangle from '../sub_static/triangle.png';
import * as deleteButton from '../sub_static/delete.png';
let thiz: any = null;
OBJLoader(THREE);
export class SgdhhModel extends ThreeBase { 
    browserInfo: BrowserInfo;
    private controls: any;
    private orbit: any;
    private watch = ThreeUtil.createImg(16, 24, watch, 200, 75, 0);
    private diamond = ThreeUtil.createImg(19, 23, diamond, 200, 45, 0);
    private cap = ThreeUtil.createImg(19, 24, cap, 200, 15, 0);
    private square = ThreeUtil.createImg(19, 19, square, 200, -15, 0);
    private circle = ThreeUtil.createImg(19, 19, circle, 200, -45, 0);
    private triangle = ThreeUtil.createImg(19, 19, triangle, 200, -75, 0);
    private watchCopy = ThreeUtil.createImg(16, 24, watch, 200, 75, 0);
    private diamondCopy = ThreeUtil.createImg(19, 23, diamond, 200, 45, 0);
    private capCopy = ThreeUtil.createImg(19, 24, cap, 200, 15, 0);
    private squareCopy = ThreeUtil.createImg(19, 19, square, 200, -15, 0);
    private circleCopy = ThreeUtil.createImg(19, 19, circle, 200, -45, 0);
    private triangleCopy = ThreeUtil.createImg(19, 19, triangle, 200, -75, 0);
    private deleteButton = ThreeUtil.createImg(17.55, 12.05, deleteButton, 0, 0, 0);
    private plane = ThreeUtil.createPlane(60, 1000, '#171616', 1);
    private colorButton1 = common.drawCircle(7, {color: '#FF243F'});
    private colorButton2 = common.drawCircle(7, {color: '#FFF647'});
    private colorButton3 = common.drawCircle(7, {color: '#36B3FF'});
    private color = '#FF243F';
    private sliderControlLine: SliderControlLine;
    private posX: number;
    private posY: number;
    private isMake: any = true;
    private raycaster: any;
    private selectobjs: any = [];
    private flag = false;
    private make = true;
    private mousdown_pos = new THREE.Vector2(); //鼠标按下
    private mousdown_pos1 = new THREE.Vector2(); //鼠标按下
    private mousup_pos = new THREE.Vector2(); //鼠标抬起
    private mouse = new THREE.Vector2();
    private lineArr: any = [];
    private delete_Arr: any = [];
    private selectLine: any;
    private objectGroup = new THREE.Group();
    private lineGroup = new THREE.Group();
    private group: any = [];
    private group1: any = [];
    private pos: any;
    private render = () => {
        requestAnimationFrame(this.render);
        window.addEventListener( 'mouseup', this.onDocumentMouseUp, false );
        window.addEventListener( 'mousedown', this.onDocumentMousedown, false );

        window.addEventListener( 'touchend', this.onDocumentTouchend, false );
        window.addEventListener( 'touchstart', this.onDocumentTouchstart, false );
        this.renderer.render(this.scene, this.camera);
    }
    /**
     * @param {domElement} domElement
     * @param {number} fov    视角
     * @param {number} width  实际显示宽
     * @param {number} height 实际显示高
     * @param {number} near   距离镜头最近距离
     * @param {number} far    距离镜头最远距离
     */
    constructor(domElement: Element, fov ?: number, width ?: number, height ?: number, near ?: number, far ?:
        number) {
        super();
        this.fov = !fov ? this.fov : fov;
        this.near = !near ? this.near : near;
        this.far = !far ? this.far : fov;
        this.width = !width ? window.innerWidth : width;
        this.height = !height ? window.innerHeight : height;
        this.domElement = domElement;
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.init();
    }
    init() {
        thiz = this;
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initElement();       
        this.initEvt(); 
        this.initControl();
        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();
        this.pos = thiz.getMousePos(1, 1, window.innerWidth, window.innerHeight);
        this.plane.position.x = -this.pos.x - 28;
        this.group.push(this.watch, this.diamond, this.cap, this.square, this.circle, this.triangle,
        );
        this.group1.push(this.watchCopy, this.diamondCopy, this.capCopy, this.squareCopy,
            this.circleCopy, this.triangleCopy);
        for (let i = 0; i < this.group.length; i++) {
            this.group[i].position.x = -this.pos.x - 28;
            this.group1[i].position.x = -this.pos.x - 28;
        }
    }
    initScene(): void {
        this.scene = new THREE.Scene();   
    }
    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near = 0.1;
        const far = 2000;
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(0, 0, 270);
    }
    //初始化摄像机位置
    resetCamera() {
        this.controls.reset();
    }
    // 初始化场景元素
    initElement() {
        this.raycaster = new THREE.Raycaster();
        this.selectobjs.push(this.watch, this.diamond, this.cap, this.square, this.circle, this.triangle, );
        this.plane.position.set(200, 0, -1);
        this.colorButton1.name = 'button1';
        this.colorButton2.name = 'button2';
        this.colorButton3.name = 'button3';
        this.colorButton1.position.set(-60, -100, 1);
        this.colorButton2.position.set(-30, -100, 1);
        this.colorButton3.position.set(0, -100, 1);
        this.colorButton3.position.set(0, -100, 1);
        this.objectGroup.add(this.watchCopy, this.diamondCopy, this.capCopy, this.squareCopy,
            this.circleCopy, this.triangleCopy, );
        this.scene.add(this.watch, this.diamond, this.cap, this.square, this.circle, this.triangle, this.plane, this.colorButton1,
            this.colorButton2, this.colorButton3, this.objectGroup );
        for (let i = 0; i <= 5; i++) {
            (this.objectGroup.children[i] as any).material.transparent = true;
            (this.objectGroup.children[i] as any).material.opacity = 0.3;
        }
        (this.colorButton1.material as any).transparent = true;
        (this.colorButton2.material as any).transparent = true;
        (this.colorButton3.material as any).transparent = true;
        (this.colorButton2.material as any).opacity = 0.5;
        (this.colorButton3.material as any).opacity = 0.5;

    }
    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine(
            [this.watch, this.diamond, this.cap, this.square, this.circle, this.triangle,
                this.colorButton1, this.colorButton2, this.colorButton3]).initEvent(this.camera, this.renderer);
    }
    
    // 获取拖动点坐标
    // tslint:disable-next-line:member-ordering
    static downHandle(pos: any, obj: any, name: string) {
        const {x, y} = pos;
        if (x > -thiz.pos.x - 60) {
            thiz.isMake = true;
        }
        thiz.posX = obj.position.x;
        thiz.posY = obj.position.y;
        if (name === 'button1') {
            thiz.colorButton1.position.set(-60, -100, 1);
            thiz.color = '#FF243F';
        } else if (name === 'button2') {
            thiz.colorButton2.position.set(-30, -100, 1);
            thiz.color = '#FFF647';
        } else if (name === 'button3') {
            thiz.colorButton3.position.set(0, -100, 1);
            thiz.color = '#36B3FF';
        }
    }
    //移动动点位置
    // tslint:disable-next-line:member-ordering
    static moveHandle(pos: any, name: string): void {
        thiz.colorButton1.position.set(-60, -100, 1);
        thiz.colorButton2.position.set(-30, -100, 1);
        thiz.colorButton3.position.set(0, -100, 1);
    }

    // tslint:disable-next-line:member-ordering
    static MouseUp(pos: any, obj: any, name: string) {
        const { x, y} = pos;
            if (x > -thiz.pos.x - 60 && thiz.isMake) {
                obj.position.set(thiz.posX, thiz.posY, 0);
            } else {
                if (name === 'button1' || name === 'button2' || name === 'button3') {
                    obj.scale.set(1, 1, 1);
                } else {
                    (window as any).viewHandler.viewModel.$data.show = false;
                    obj.scale.set(1.35, 1.35, 1);
                }
                if (thiz.isMake) {
                    obj.position.set(x, y , 0);
                } else {
                    thiz.isMake = false;
                    obj.position.set(thiz.posX, thiz.posY, 0);
                }
                if ((window as any).viewHandler.viewModel.$data.show === false) {
                    if (name === 'button1') {
                        (thiz.colorButton1.material as any).opacity = 1;
                        (thiz.colorButton2.material as any).opacity = 0.5;
                        (thiz.colorButton3.material as any).opacity = 0.5;
                    } else if (name === 'button2') {
                        (thiz.colorButton2.material as any).opacity = 1;
                        (thiz.colorButton1.material as any).opacity = 0.5;
                        (thiz.colorButton3.material as any).opacity = 0.5;
                    } else if (name === 'button3') {
                        (thiz.colorButton3.material as any).opacity = 1;
                        (thiz.colorButton2.material as any).opacity = 0.5;
                        (thiz.colorButton1.material as any).opacity = 0.5;
                    }
                }

            }
    }
    //世界坐标转化为屏幕坐标
    getMousePosition(clientX: any, clientY: any) { 
        const vector = new THREE.Vector3(
        (clientX / window.innerWidth) * 2 - 1, 
        - (clientY / window.innerHeight) * 2 + 1, 0.5);
        this.raycaster.setFromCamera( vector, this.camera ); 
        const dir = vector.sub((this.camera as any).position).normalize(); 
        const distance = - this.camera.position.z / dir.z; 
        const pos = this.camera.position.clone().add(dir.multiplyScalar(distance)); 
        const x  = Math.round(pos.x * (window.innerWidth / 2) + (window.innerWidth / 2));  
        const y = Math.round(-pos.y * (window.innerHeight / 2) + (window.innerHeight / 2));
        const posArr = [];
        posArr.push(x, y);
        return posArr; 
    } 
    //世界坐标转化为three.js坐标
    getMousePos(MousePointX: number, MousePointY: number,  domWidth: number, domHeight: number): Vector2 {
        const vector = new Vector3();
        vector.set((MousePointX / domWidth) * 2 - 1,
          (-MousePointY / domHeight) * 2 + 1, 0);
        vector.unproject(this.camera);
        const dir = vector.sub(this.camera.position).normalize();
        const distance = -this.camera.position.z / dir.z;
        const pos = this.camera.position.clone().add(dir.multiplyScalar(distance));
        return new Vector2(pos.x, pos.y);
      }
        //世界坐标转化为three.js坐标
        //用屏幕中射线获取物体的坐标
    getMousePos1(MousePointX: number, MousePointY: number,  domWidth: number, domHeight: number): Vector2 {
        const vector = new Vector2();
        vector.set((MousePointX / domWidth) * 2 - 1,
          (-MousePointY / domHeight) * 2 + 1);
        return vector;
      }
      //pc
      onDocumentMousedown(event: any) {
        event.preventDefault();
        thiz.mousdown_pos = thiz.getMousePos(event.clientX, event.clientY, window.innerWidth, window.innerHeight);     
        thiz.mousdown_pos1 = thiz.getMousePos1(event.clientX, event.clientY, window.innerWidth, window.innerHeight);
        thiz.raycaster.setFromCamera(thiz.mousdown_pos1, thiz.camera);
        const intersects = thiz.raycaster.intersectObjects(thiz.selectobjs);
        const intersects1 = thiz.raycaster.intersectObjects(thiz.lineArr);
          const intersects2 = thiz.raycaster.intersectObjects(thiz.delete_Arr);
        if (intersects.length > 0) {
            thiz.make = false;
        } else if (thiz.mousdown_pos.x > -thiz.pos.x - 60) {
            thiz.make = false;
        } else {
            thiz.make = true;
        }
        if (intersects1.length > 0) {
            thiz.selectLine = intersects1[0].object;
            thiz.scene.add(thiz.deleteButton);
            thiz.deleteButton.position.set(thiz.mousdown_pos.x , thiz.mousdown_pos.y + 8, 1);
            thiz.delete_Arr.push(thiz.deleteButton);
        }
          if (intersects2.length > 0) {
              const selectobj = intersects2[0].object;
              thiz.scene.remove(selectobj);
              thiz.lineGroup.remove(thiz.selectLine);
              thiz.lineArr.splice(thiz.lineArr.indexOf(thiz.selectLine), 1);
              thiz.delete_Arr = [];
          }
    }
      
      onDocumentMouseUp(event: any) { 
        event.preventDefault();
        thiz.mousup_pos = thiz.getMousePos(event.clientX, event.clientY, window.innerWidth, window.innerHeight);
            if (thiz.make) {
                if (thiz.mousup_pos.x < -thiz.pos.x - 60 && thiz.mousdown_pos.x < -thiz.pos.x - 60) {
                    if (Math.hypot(thiz.mousdown_pos.x - thiz.mousup_pos.x, thiz.mousdown_pos.y - thiz.mousup_pos.y) > 10) {
                        const line = common.drawDashOrLine([{x: thiz.mousdown_pos.x, y: thiz.mousdown_pos.y, z: 2},
                            {x: thiz.mousup_pos.x, y: thiz.mousup_pos.y, z: 2}], {color: thiz.color});
                        thiz.scene.add(thiz.lineGroup);
                        thiz.lineArr.push(line);
                        thiz.lineGroup.add(line);
                    }
                }
            }
    }
    //移动
    onDocumentTouchstart(event: any) { 
        // event.preventDefault();
        thiz.mousdown_pos = thiz.getMousePos(event.changedTouches[0].clientX, event.changedTouches[0].clientY, 
            window.innerWidth, window.innerHeight);
            thiz.mousdown_pos1 = thiz.getMousePos1(event.changedTouches[0].clientX, event.changedTouches[0].clientY, 
                window.innerWidth, window.innerHeight);
            thiz.raycaster.setFromCamera(thiz.mousdown_pos1, thiz.camera);
        const intersects = thiz.raycaster.intersectObjects(thiz.selectobjs);
        const intersects1 = thiz.raycaster.intersectObjects(thiz.lineArr);
        const intersects2 = thiz.raycaster.intersectObjects(thiz.delete_Arr);
        if (intersects.length > 0) {
            thiz.make = false;
        } else if (thiz.mousdown_pos.x > -thiz.pos.x - 60) {
            thiz.make = false;
        } else {
            thiz.make = true;
        }
        if (intersects1.length > 0) {
            thiz.selectLine = intersects1[0].object;
            thiz.scene.add(thiz.deleteButton);
            thiz.deleteButton.position.set(thiz.mousdown_pos.x, thiz.mousdown_pos.y + 8, 1);
            thiz.delete_Arr.push(thiz.deleteButton);
        }
        if (intersects2.length > 0) {
            const selectobj = intersects2[0].object;
            thiz.scene.remove(selectobj);
            thiz.lineGroup.remove(thiz.selectLine);
            thiz.lineArr.splice(thiz.lineArr.indexOf(thiz.selectLine), 1);
            thiz.delete_Arr = [];
        }
      }

      onDocumentTouchend(event: any) { 
        event.preventDefault();
        thiz.mousup_pos = thiz.getMousePos(event.changedTouches[0].clientX,
             event.changedTouches[0].clientY, window.innerWidth, window.innerHeight);
          if (thiz.make) {
              if (thiz.mousup_pos.x < -thiz.pos.x - 60 && thiz.mousdown_pos.x < -thiz.pos.x - 60) {
                  if (Math.hypot(thiz.mousdown_pos.x - thiz.mousup_pos.x, thiz.mousdown_pos.y - thiz.mousup_pos.y) > 10) {
                      const line = common.drawDashOrLine([{x: thiz.mousdown_pos.x, y: thiz.mousdown_pos.y, z: 2},
                          {x: thiz.mousup_pos.x, y: thiz.mousup_pos.y, z: 2}], {color: thiz.color});
                      thiz.scene.add(thiz.lineGroup);
                      thiz.lineArr.push(line);
                      thiz.lineGroup.add(line);
                  }
              }
          }
    } 

    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true}); 
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
        (this.renderer as WebGLRenderer).setClearColor('#343131');
        this.renderer.setSize(this.width, this.height);
        this.domElement.appendChild(this.renderer.domElement);
    }
   
    /**
     * 初始化光源
     */
    initLight(): void {
        const light = new THREE.AmbientLight(0xffffff, 1);

        this.scene.add(light);
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    initControl(): void {
        this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
        this.orbit.saveState (); //记下相机的初始坐标
        this.orbit.enableZoom = false;
        this.orbit.enableDamping = false;
        this.orbit.enableZoom = false;
        this.orbit.minDistance = 1;
        this.orbit.maxDistance = 4000;
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;
        this.orbit.maxPolarAngle = Math.PI;
        this.orbit.enablePan = false;
        this.orbit.enableRotate = false;
    }
}
