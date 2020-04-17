
import * as THREE from 'three';
import {WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';
import {PerspectiveCamera} from 'three';
const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');

import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {SliderControlLine} from './SliderControlLine';
const OrbitControls = require('three-orbitcontrols');
import { Vector2, Vector3, Raycaster} from 'three';
import common from './CommonForThree';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';

import * as cola from '../sub_static/cola.png';
import * as hamburger from '../sub_static/hamburger.png';
import * as juice from '../sub_static/juice.png';
import * as pizza from '../sub_static/pizza.png';
import * as sandwich from '../sub_static/sandwich.png';
import * as delete_ from '../sub_static/delete.png';
let thiz: any = null;
OBJLoader(THREE);
export class SgdhhModel extends ThreeBase { 
    browserInfo: BrowserInfo;
    private controls: any;
    private orbit: any;
    private lineGroup = new THREE.Group();
    private foodGroup = new THREE.Group();

    private cola = common.createImg([200, 70 , 0], 26, 26, cola);
    private coffee = common.createImg([200, 30 , 0], 26, 26, juice);
    private hamburger = common.createImg([200, -10 , 0], 26, 26, hamburger);
    private pizza = common.createImg([200, -50 , 0], 26, 26, pizza);
    private sandwich = common.createImg([200, -90 , 0], 26, 26, sandwich);
    private cola1 = common.createImg([200, 70 , 0], 26, 26, cola);
    private coffee1 = common.createImg([200, 30 , 0], 26, 26, juice);
    private hamburger1 = common.createImg([200, -10 , 0], 26, 26, hamburger);
    private pizza1 = common.createImg([200, -50 , 0], 26, 26, pizza);
    private sandwich1 = common.createImg([200, -90 , 0], 26, 26, sandwich);

    private delete_ = common.createImg([0, 0, 0], 17.55, 12.05, delete_);

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
    private selectline: any;
    private i: any = 0;
    private nameArr: any = [];
    private ow: any;
    private plane = ThreeUtil.createPlane(60, 1000, '#171616', 1);
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
        this.ow = (window as any).viewHandler.viewModel.$data;
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
        this.plane.position.z = -1;
        this.group.push(this.cola, this.coffee, this.hamburger, this.pizza, this.sandwich);
        this.group1.push(this.cola1, this.coffee1, this.hamburger1, this.pizza1, this.sandwich1);
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
        this.cola.name = 'cola';
        this.coffee.name = 'coffee';
        this.hamburger.name = 'hamburger';
        this.pizza.name = 'pizza';
        this.sandwich.name = 'sandwich';
        this.raycaster = new THREE.Raycaster();
        this.foodGroup.add(this.cola1, this.coffee1, this.hamburger1, this.pizza1, this.sandwich1);
        for (let i = 0; i < 5; i++) {
            (this.foodGroup.children[i] as any).material.opacity = 0.3;
        }
        this.selectobjs.push(this.cola, this.coffee, this.hamburger, this.pizza, this.sandwich);
        this.scene.add(this.cola, this.coffee, this.hamburger, this.pizza, this.sandwich, this.plane, this.foodGroup);
    }
    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine(
            [this.cola, this.coffee, this.hamburger, this.pizza,
                 this.sandwich]).initEvent(this.camera, this.renderer);
    }
    
    // 获取拖动点坐标
    // tslint:disable-next-line:member-ordering
    static downHandle(pos: any, obj: any) {
        const {x, y} = pos;
        thiz.ow.text_show = false;
        if (x > -thiz.pos.x - 60) {
            thiz.isMake = true;
        }
        thiz.posX = obj.position.x;
        thiz.posY = obj.position.y;
    }
    //移动动点位置
    // tslint:disable-next-line:member-ordering
    static moveHandle(pos: any, name: string): void {
    }

    // tslint:disable-next-line:member-ordering
    static MouseUp(pos: any, obj: any) {
        const { x, y} = pos;
            if (x > -thiz.pos.x - 60 && thiz.isMake) {
                obj.position.set(thiz.posX, thiz.posY , 0);
            } else {
                if (thiz.isMake) {
                    obj.position.set(x, y , 0);
                } else {
                    thiz.isMake = false;
                    obj.position.set(thiz.posX, thiz.posY , 0);
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
            thiz.selectline = intersects1[0].object;
            thiz.delete_.position.set(thiz.mousdown_pos.x, thiz.mousdown_pos.y + 5, 2);
            thiz.scene.add(thiz.delete_);
            thiz.delete_Arr.push(thiz.delete_);

        }
        if (intersects2.length > 0) {
            const selectobj = intersects2[0].object;
            thiz.scene.remove(selectobj);
            thiz.lineGroup.remove(thiz.selectline);
            thiz.lineArr.splice(thiz.lineArr.indexOf(thiz.selectline), 1);
            thiz.delete_Arr = [];
        }
    }
      
      onDocumentMouseUp(event: any) { 
        event.preventDefault();
        thiz.mousup_pos = thiz.getMousePos(event.clientX, event.clientY, window.innerWidth, window.innerHeight);
        const x = thiz.mousdown_pos.x - thiz.mousup_pos.x;
        const y = thiz.mousdown_pos.y - thiz.mousup_pos.y;
        const dis = Math.sqrt(x * x + y * y);    
        if (thiz.make && thiz.mousup_pos.x < -thiz.pos.x - 60 && dis > 10) {
                const line = common.drawDashOrLine([{x: thiz.mousdown_pos.x, y: thiz.mousdown_pos.y, z: 2},
                    {x: thiz.mousup_pos.x, y: thiz.mousup_pos.y, z: 2}], {color: '#fff'});
               line.name = `line${thiz.i}`;  
               thiz.i++;
               thiz.lineGroup.add(line);
               thiz.nameArr.push(line.name);
               thiz.scene.add(thiz.lineGroup); 
               thiz.lineArr.push(line);
            }
    } 

    //移动
    onDocumentTouchstart(event: any) { 
        event.preventDefault();
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
                thiz.selectline = intersects1[0].object;
                thiz.delete_.position.set(thiz.mousdown_pos.x, thiz.mousdown_pos.y + 5, 2);
                thiz.scene.add(thiz.delete_);
                thiz.delete_Arr.push(thiz.delete_);

            }
            if (intersects2.length > 0) {
                const selectobj = intersects2[0].object;
                thiz.scene.remove(selectobj);
                thiz.lineGroup.remove(thiz.selectline);
                thiz.lineArr.splice(thiz.lineArr.indexOf(thiz.selectline), 1);
                thiz.delete_Arr = [];
            }
      }

      onDocumentTouchend(event: any) { 
        event.preventDefault();
        thiz.mousup_pos = thiz.getMousePos(event.changedTouches[0].clientX,
        event.changedTouches[0].clientY, window.innerWidth, window.innerHeight);   
        const x = thiz.mousdown_pos.x - thiz.mousup_pos.x;
        const y = thiz.mousdown_pos.y - thiz.mousup_pos.y;
        const dis = Math.sqrt(x * x + y * y);
        if (thiz.make && thiz.mousup_pos.x < -thiz.pos.x - 60 && dis > 10) {
                const line = common.drawDashOrLine([{x: thiz.mousdown_pos.x, y: thiz.mousdown_pos.y, z: 2},
                    {x: thiz.mousup_pos.x, y: thiz.mousup_pos.y, z: 2}], {color: '#fff'});
                    line.name = `line${thiz.i}`;  
                    thiz.i++;
                    thiz.lineGroup.add(line);
                    thiz.nameArr.push(line.name);
                    thiz.scene.add(thiz.lineGroup); 
                    thiz.lineArr.push(line);
            }
    } 

    initWebGLRenderer(): void {
        if (this.webglAvailable()) {
            this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true}); 
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }
        (this.renderer as WebGLRenderer).setClearColor('#343131');
        (this.renderer as WebGLRenderer).setPixelRatio(window.devicePixelRatio);
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
        this.resetPos();
        this.scene.remove(this.lineGroup);
        this.lineGroup = new THREE.Group();
    }

    resetPos() {
        this.cola.position.set(200, 70 , 0);
        this.coffee.position.set(200, 30 , 0);
        this.hamburger.position.set(200, -10 , 0);
        this.pizza.position.set(200, -50 , 0);
        this.sandwich.position.set(200, -90 , 0);
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
