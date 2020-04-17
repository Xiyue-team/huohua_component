
import * as THREE from 'three';
import {
    WebGLRenderer
} from 'three';
import {
    ThreeBase
} from '../../../../../src/three/template/ThreeBase';
import {
    PerspectiveCamera
} from 'three';
const OBJLoader = require('three-obj-loader');
const Interaction = require('three.interaction');
import {
    BrowserInfo
} from '../../../../../src/model/BrowserInfo';
import {
    BrowserUtil
} from '../../../../../src/util/BrowserUtil';
import {
    SliderControlLine
} from './SliderControlLine';

const OrbitControls = require('three-orbitcontrols');

import common from './CommonForThree';
import * as hongshou from '../sub_static/hongshou.png';
import * as hongguang from '../sub_static/hongguang.png';
import * as lvshou from '../sub_static/lvshou.png';
import * as lvguang from '../sub_static/lvguang.png';
import * as lanshou from '../sub_static/lanshou.png';
import * as languang from '../sub_static/languang.png';
import * as one from '../sub_static/point.png';
import * as text from '../sub_static/text.png';

import * as console from 'console';


let thiz: any = null;
OBJLoader(THREE);
export class SgdhhModel extends ThreeBase { 
    browserInfo: BrowserInfo;
    private controls: any;
    private orbit: any;

    private sliderControlLine: SliderControlLine;

    private hongshou = common.createImg([140, 50, 0], 58.4, 25.6, hongshou);
    private hongguang = common.createImg([8, 23, 0], 220, 75, hongguang);

    private lvshou = common.createImg([143, -7, 0], 58.4, 25.6, lvshou);
    private lvguang = common.createImg([40, 1.5, 0], 190, 60, lvguang);

    private lanshou = common.createImg([140, -64, 0], 58.4, 25.6, lanshou);
    private languang = common.createImg([8, -33.5, 0], 220, 75, languang);

    private textImag = common.createImg([140, 70, 0], 54, 8.7, text); 
  
    //中间
    private one = common.createImg([130, -7, 0], 20, 20, one);
    //上部
    private one1 = common.createImg([128, 51, 0], 20, 20, one);
    //下部
    private one2 = common.createImg([128, -65.5, 0], 20, 20, one);

    private zuobiao: number;
    private zuobiao1: number;
    private zuobiao2: number;

    private light1: any;
    private light2: any;
    private light3: any;


    private line_0 = common.drawUnitLine({
        width: 12,
        color: '#B3EE9D',
        isDash: false,
    });

    private line_1 = common.drawUnitLine({
        width: 11,
        color: '#FE9A9A',
        isDash: false,
    });

    private line_2 = common.drawUnitLine({
        width: 11,
        color: '#9ED3E5',
        isDash: false,
    });
    private line = common.scaleLine([130, 0, 0], [130, 0, 0], this.line_0);
    private line1 = common.scaleLine([130, 46, 0], [130, 46, 0], this.line_1);
    private line2 = common.scaleLine([128, -46.5, 0], [128, -46.5, 0], this.line_2);

    private render = () => {
        requestAnimationFrame(this.render);

       
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
        (this.one as any).material.opacity = 0;
        (this.one1 as any).material.opacity = 0;
        (this.one2 as any).material.opacity = 0;
        (this.one as any).scale.set(1.5, 1.5, 1.5);
        (this.one1 as any).scale.set(1.5, 1.5, 1.5);
        (this.one2 as any).scale.set(1.5, 1.5, 1.5);
        (this.languang as any).rotateZ(-0.045);
        (this.hongguang as any).rotateZ(0.045);
        (this.textImag as any).rotateY(0.5);
        thiz = this;
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initElement(this.controls);
        this.initEvt();
        this.initModel();
        this.initControl(); 

        const interact = new Interaction.Interaction(this.renderer, this.scene, this.camera);
        this.render();
    }
    initScene(): void {
        this.scene = new THREE.Scene();
        this.scene.position.x = -30;     
    }
    /**
     * 初始化镜头
     */
    initCamera(): void {
        const near = 0.1;
        const far = 2000;
        this.camera = new PerspectiveCamera(50, (this.width) / (this.height), near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(150, 0, 270);
    }
    //初始化摄像机位置
    resetCamera() {
        this.controls.reset();
    }

    initModel() {
        const material = new THREE.MeshPhongMaterial( { color: 0x808080, dithering: true } );
        const geometry = new THREE.PlaneBufferGeometry( 190, 190 );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( -90, -3.5, -6 );
        mesh.rotateY(1.7);
        this.scene.add( mesh );
    }
    // 初始化场景元素
    initElement(controls: any) {
        this.one.name = 'dian1';
        this.one1.name = 'dian2';
        this.one2.name = 'dian3';
        this.scene.add(this.hongshou);
        this.scene.add(this.lvshou);
        this.scene.add(this.lanshou);
        this.scene.add(this.line);
        this.scene.add(this.line1);
        this.scene.add(this.line2);
        this.scene.add(this.textImag);
        this.scene.add(this.one, this.one1, this.one2);
    }
    // 初始化拖动点
    initEvt() {
        this.sliderControlLine = new SliderControlLine(
            [this.one, this.one1, this.one2]).initEvent(this.camera, this.renderer);
    }
    
    // 获取拖动点坐标
    // tslint:disable-next-line:member-ordering
    static downHandle(name: string) {

    }
    //移动动点位置
    // tslint:disable-next-line:member-ordering
    static moveHandle(pos: any, name: string): void {
        let { x, y} = pos;
        x = Math.round(x / 10) * 10;
        y = Math.round(y / 10) * 10;

        //中间
        if (name === 'dian1') {
            thiz.one.position.y = 0;
            if (thiz.one.position.x < 130) {
                thiz.one.position.x = 130;
            }
            if (thiz.one.position.x > 172) {
                thiz.one.position.x = 172;
            }
            thiz.one.position.y = -7;
            thiz.zuobiao = (1 / 42) * (thiz.one.position.x - 130);
            thiz.haveLight(1);
            thiz.drawLine(2);
            thiz.dianlight1(thiz.zuobiao);
            (thiz.textImag as any).material.opacity = 0;
        }

        //上部
        if (name === 'dian2') {
            if (thiz.one1.position.x < 128) {
                thiz.one1.position.x = 128;
            }
            if (thiz.one1.position.x > 168) {
                thiz.one1.position.x = 168;
            }
            thiz.one1.position.y = 51 + (thiz.one1.position.x - 128) * 0.11;
            thiz.zuobiao1 = (1 / 40) * (thiz.one1.position.x - 128);
            thiz.haveLight(2);
            thiz.drawLine(1);
            thiz.dianlight2(thiz.zuobiao1);
            (thiz.textImag as any).material.opacity = 0;
        }
        //下部
        if (name === 'dian3') {
            if (thiz.one2.position.x < 128) {
                thiz.one2.position.x = 128;
            }
            if (thiz.one2.position.x > 168.3) {
                thiz.one2.position.x = 168.3;
            }
            thiz.one2.position.y = -65.5 + ((thiz.one2.position.x - 128) * (-0.11));
            thiz.zuobiao2 = (1 / 40.3) * (thiz.one2.position.x - 128);
            thiz.haveLight(3);
            thiz.drawLine(3);
            thiz.dianlight3(thiz.zuobiao2);
            (thiz.textImag as any).material.opacity = 0;
        }
    }

    //画线
    drawLine (num: number) {
        const {x, y} = thiz.one.position;
        
        if (num === 1) {
            this.line1 = common.scaleLine([128, 51, 0], [thiz.one1.position.x, thiz.one1.position.y, 0], this.line_1); 
        }

        if (num === 2) {
            this.line = common.scaleLine([130, -7, 0], [x, y, 0], this.line_0);
        }

        if (num === 3) {
            this.line2 = common.scaleLine([128, -65.5, 0], [thiz.one2.position.x, thiz.one2.position.y, 0], this.line_2);
        }

        if (num === 4) {
            this.line1 = common.scaleLine([128, 51, 0], [128, 51, 0], this.line_1);
            this.line = common.scaleLine([130, -7, 0], [130, -7, 0], this.line_0);
            this.line2 = common.scaleLine([128, -65.5, 0], [128, -65.5, 0], this.line_2);
        }
    }
    
    // //光线
    haveLight(num: number) {
        if (num === 1) {
            if (this.zuobiao !== 0) {
                this.scene.add(this.lvguang);
            } else {
                this.scene.remove(this.lvguang);
            }
        }

        if (num === 2) {
            if (this.zuobiao1 !== 0) {
                this.scene.add(this.hongguang);
            } else {
                this.scene.remove(this.hongguang);
            }
        }

        if (num === 3) {
            if (this.zuobiao2 !== 0) {
                this.scene.add(this.languang);
            } else {
                this.scene.remove(this.languang);
            }
        }

        if (num === 0) {
            this.scene.remove(this.lvguang);
            this.scene.remove(this.hongguang);
            this.scene.remove(this.languang);
        }
    }

    //dianlight
    dianlight1(index: number) {
        this.scene.remove(this.light1);
        this.light1 = new THREE.SpotLight(0x00ff00, index, 0, 0.16);
        this.light1.position.set(140, 0, 25);
        this.light1.penumbra = 0.02;
        this.scene.add(this.light1);
    }

    dianlight2(index: number) {
        this.scene.remove(this.light2);
        this.light2 = new THREE.SpotLight(0xff0000, index, 0, 0.15);
        this.light2.position.set(140, -25, -20);
        this.light2.penumbra = 0.02;

        this.scene.add(this.light2);
    }

    dianlight3(index: number) {
        this.scene.remove(this.light3);
        this.light3 = new THREE.SpotLight(0X0000ff, index, 0, 0.15);
        this.light3.position.set(140, 25, -20);
        this.light3.penumbra = 0.02;
        this.scene.add(this.light3);
    }

    /**
     * 重置模型位置
     * **/
    // tslint:disable-next-line:member-ordering
    resetModelPosition() {
        this.one.position.set(130, -7, 0);
        this.one1.position.set(128, 51, 0);
        this.one2.position.set(128, -65.5, 0);

        this.zuobiao = 0;
        this.zuobiao1 = 0;
        this.zuobiao2 = 0;

        this.haveLight(0);
        this.drawLine(4);

        this.scene.remove(this.light1);
        this.scene.remove(this.light2);
        this.scene.remove(this.light3);

        (thiz.textImag as any).material.opacity = 1;
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
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = false;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        // //是否可以缩放
        this.orbit.enableZoom = false;
        //是否自动旋转
        // this.orbit.autoRotate = true;
        //设置相机距离原点的最远距离
        this.orbit.minDistance = 1;
        //设置相机距离原点的最远距离
        this.orbit.maxDistance = 4000;

        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //是否自动旋转
        this.orbit.minAzimuthAngle = -Math.PI * 2;
        this.orbit.maxAzimuthAngle = Math.PI * 2;

        this.orbit.maxPolarAngle = Math.PI;

        //是否开启右键拖拽
        this.orbit.enablePan = false;

        this.orbit.enableRotate = false;
    }
    
}
