/**
 *gltf模型加载类
 *@since 2.0
 *@author chaoyang
 *@Date 2018/7/9 16:52
 */
import * as THREE from 'three';
import {ColorKeywords, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {ThreeBase} from '../../../../../src/three/template/ThreeBase';

const OrbitControls = require('three-orbitcontrols');


import {TweenMax} from 'gsap';
import {Model3dAnimation} from '../../../../../src/three/component/Model3dAnimation';
import {BrowserUtil} from '../../../../../src/util/BrowserUtil';
import {BrowserInfo} from '../../../../../src/model/BrowserInfo';
import {ThreeUtil} from '../../../../../src/three/util/ThreeUtil';


export class Vbf3d2Model extends ThreeBase {

    browserInfo: BrowserInfo;

    private orbit: any;

    private blueArrow: THREE.Mesh;
    private redArrow: THREE.Mesh;
    private purpleArrow: THREE.Mesh;
    private arrow1: THREE.Mesh;
    private arrow2: THREE.Mesh;
    private arrow3: THREE.Mesh;

    private rotateCenter: THREE.Mesh;

    private animation1: any;
    private animation2: any;
    private animation3: any;
    private animation4: any;
    private animation5: any;
    private animation6: any;

    newCoordinate: number[];

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
        this.browserInfo = BrowserUtil.getBrowserInfo();
        this.init();

    }
    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initWebGLRenderer();
        this.initControl();
        this.create3DAxis();
        this.createRotateCenter();
        this.createText();
        this.render();
    }


    /**
     * 初始化场景
     */
    initScene(): void {
        this.scene = new THREE.Scene();
    }


    /**
     * 初始化镜头
     */
    initCamera(): void {
        const scale = 5;
        const left = this.width / -scale;
        const right = this.width / scale;
        const top = this.height / scale;
        const bottom = this.height / -scale;
        const near = 1;
        const far = 1000;
        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(72, 31, 91);
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
        (this.renderer as WebGLRenderer).setClearColor('#FFFFFF' , 1 );

        this.renderer.setSize(this.width , this.height);
        this.domElement.appendChild(this.renderer.domElement);

    }

    /**
     * 初始化控制器
     */
    initControl(): void {
        this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
        this.orbit.enableZoom = true;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.orbit.enableDamping = true;
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
        this.orbit.maxPolarAngle = Math.PI * 2;
        this.orbit.minPolarAngle = -Math.PI * 2;
        // 是否开启右键拖拽
        this.orbit.enablePan = false;
        //屏蔽左键旋转
        this.orbit.enableRotate = false;
    }

    /**
     * 初始化光源
     */
    initLight(): void {

        const ambientLight = new THREE.AmbientLight( 0xffffff, 1.0);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight( '#ffffff', 0.4);
        dirLight.position.set( 100, 100, 100 );
        this.scene.add( dirLight );

        const dirLight2 = new THREE.DirectionalLight( '#ffffff', 0.3);
        dirLight2.position.set( -100, 0, -100 );
        this.scene.add( dirLight2 );
    }

    //创建一个三维的坐标系
    create3DAxis() {
        const color = '#a6a6a6';
        const XAxis = ThreeUtil.createCylinder(0.5, 0.5, 150, color);
        const YAxis = ThreeUtil.createCylinder(0.5, 0.5, 150, color);
        const ZAxis = ThreeUtil.createCylinder(0.5, 0.5, 150, color);
        const XArrow = ThreeUtil.createCone(2, 5, color, 75, 0, 0);
        const YArrow = ThreeUtil.createCone(2, 5, color, 0, 75, 0);
        const ZArrow = ThreeUtil.createCone(2, 5, color, 0, 0, -75);
        YAxis.rotateZ(Math.PI / 2);
        ZAxis.rotateX(Math.PI / 2);
        XArrow.rotateZ(-Math.PI / 2);
        ZArrow.rotateX(-Math.PI / 2);
        this.scene.add(XAxis);
        this.scene.add(YAxis);
        this.scene.add(ZAxis);
        this.scene.add(XArrow);
        this.scene.add(YArrow);
        this.scene.add(ZArrow);
    }

    //创建旋转中心
    createRotateCenter() {
        this.rotateCenter = ThreeUtil.createPoint(0.1, '#a6a6a6', 0, 0, 0.01);
        this.scene.add(this.rotateCenter);
    }

    //创建箭头
    /**
     *
     * @param {string} direction  方向
     * @param {string} color      颜色
     * @param {Mesh} object       线对象
     * @param {Mesh} objectArrow  箭头对象
     */
    createArrow(direction: number[], color: string, object: THREE.Mesh, objectArrow: THREE.Mesh) {
        switch (true) {
            case direction[0] < 0:
                object = ThreeUtil.createCylinder(0.6, 0.6, 50, color, -25);
                objectArrow = ThreeUtil.createCone(2.2, 5, color, -50, 0, 0);
                object.rotateZ(Math.PI / 2);
                objectArrow.rotateZ(Math.PI / 2);
                this.rotateCenter.add(object);
                this.rotateCenter.add(objectArrow);
                break;
            case direction[0] > 0:
                object = ThreeUtil.createCylinder(0.6, 0.6, 50, color, 25);
                objectArrow = ThreeUtil.createCone(2.2, 5, color, 50, 0, 0);
                object.rotateZ(-Math.PI / 2);
                objectArrow.rotateZ(-Math.PI / 2);
                this.rotateCenter.add(object);
                this.rotateCenter.add(objectArrow);
                break;
            case direction[1] > 0:
                object = ThreeUtil.createCylinder(0.6, 0.6, 50, color, 0, 25);
                objectArrow = ThreeUtil.createCone(2.2, 5, color, 0, 50, 0);
                this.rotateCenter.add(object);
                this.rotateCenter.add(objectArrow);
                break;
            case direction[1] < 0:
                object = ThreeUtil.createCylinder(0.6, 0.6, 50, color, 0, -25);
                objectArrow = ThreeUtil.createCone(2.2, 5, color, 0, -50, 0);
                objectArrow.rotateZ(-Math.PI);
                this.rotateCenter.add(object);
                this.rotateCenter.add(objectArrow);
                break;
            case direction[2] < 0:
                object = ThreeUtil.createCylinder(0.6, 0.6, 50, color, 0, 0, -25);
                objectArrow = ThreeUtil.createCone(2.2, 5, color, 0, 0, -50);
                object.rotateX(-Math.PI / 2);
                objectArrow.rotateX(-Math.PI / 2);
                this.rotateCenter.add(object);
                this.rotateCenter.add(objectArrow);
                break;
            case direction[2] > 0:
                object = ThreeUtil.createCylinder(0.6, 0.6, 50, color, 0, 0, 25);
                objectArrow = ThreeUtil.createCone(2.2, 5, color, 0, 0, 50);
                object.rotateX(-Math.PI / 2);
                objectArrow.rotateX(Math.PI / 2);
                this.rotateCenter.add(object);
                this.rotateCenter.add(objectArrow);
                break;
        }
    }

    /**
     *
     * @param {number[]} start  B的方位坐标
     * @param {number[]} end    B'的方位坐标
     * @param {number[]} start2 V的方位坐标
     */
    rotateArrow(start: number[], end: number[], start2?: number[], end2?: number[]) {
        let angle: number;
        if (start[0] === 0 && end[0] === 0 && !this.animation1) {

            angle = this.getRotateAngleX(start, end);
            this.animation1 = this.createRotateXLineAnimation(0, angle, 2, () => {
                if (this.animation4) {
                    this.animation4.play();
                } else if (this.animation5) {
                    this.animation5.play();
                } else if (this.animation6) {
                    this.animation6.play();
                }
            });
            if (start2) {
                //计算出V在第一次旋转后的坐标
                this.newCoordinate = this.conversionVector3Coordinate(start2, [1, 0, 0], angle);
            }
            this.createRotateAnimation(start, end2, angle);
            //计算B在第一次旋转后的坐标,用于判断第二次旋转基于哪个坐标轴


        } else if (start[1] === 0 && end[1] === 0 && !this.animation2) {

            angle = this.getRotateAngleY(start, end);
            this.animation2 = this.createRotateYLineAnimation(0, angle, 2, () => {
                if (this.animation4) {
                    this.animation4.play();
                } else if (this.animation5) {
                    this.animation5.play();
                } else if (this.animation6) {
                    this.animation6.play();
                }
            });
            if (start2) {
                this.newCoordinate = this.conversionVector3Coordinate(start2, [0, 1, 0], angle);
            }

            this.createRotateAnimation(start, end2, angle);

        } else if (start[2] === 0 && end[2] === 0 && !this.animation3) {

            angle = this.getRotateAngleZ(start, end);
            this.animation3 = this.createRotateZLineAnimation(0, angle, 2, () => {
                if (this.animation4) {
                    this.animation4.play();
                } else if (this.animation5) {
                    this.animation5.play();
                } else if (this.animation6) {
                    this.animation6.play();
                }
            });
            if (start2) {
                this.newCoordinate = this.conversionVector3Coordinate(start2, [0, 0, 1], angle);
            }
            this.createRotateAnimation(start, end2, angle);
        }
    }

    //创建第二段动画的方法
    createRotateAnimation(start: number[], end: number[], oldAngle: number) {
        let angle;
        if (!this.newCoordinate) {
            this.createRotateAnimation(start, end, oldAngle);
        }
        if (start[0] !== 0) {
            if (oldAngle === Math.PI || oldAngle === -Math.PI || oldAngle === -Math.PI / 2) {
                angle = -this.getRotateAngleX(this.newCoordinate, end);
            } else {
                angle = this.getRotateAngleX(this.newCoordinate, end);
            }
            this.animation4 = this.createRotateXLineAnimation(0, angle , 2);
        } else if (start[1] !== 0) {
            if (oldAngle === Math.PI || oldAngle === -Math.PI || oldAngle === -Math.PI / 2) {
                angle = -this.getRotateAngleY(this.newCoordinate, end);
            } else {
                angle = this.getRotateAngleY(this.newCoordinate, end);
            }

            this.animation5 = this.createRotateYLineAnimation(0, angle , 2);
        } else {
            if (oldAngle === Math.PI || oldAngle === -Math.PI || oldAngle === -Math.PI / 2) {
                angle = -this.getRotateAngleZ(this.newCoordinate, end);
            } else {
                angle = this.getRotateAngleZ(this.newCoordinate, end);
            }
            this.animation6 = this.createRotateZLineAnimation(0, angle , 2);
        }
    }

    //转换向量坐标的方法
    conversionVector3Coordinate (v: number[], axis: number[] , angle: number) {
        let v3: THREE.Vector3;
        const v1 = new THREE.Vector3( v[0], v[1], v[2]);
        const v2 = new THREE.Vector3( axis[0], axis[1], axis[2]);
        let a;
        let b;
        let c;
        v3 = v1.applyAxisAngle(v2, angle);
        if (v3.x === -50 || v3.x === 50) {
            a = v3.x;
        }
        if (v3.y === -50 || v3.y === 50) {
            b = v3.y;
        }
        if (v3.z === -50 || v3.z === 50) {
            c = v3.z;
        }
        if (!a) { a = 0; }
        if (!b) { b = 0; }
        if (!c) { c = 0; }
        return [a, b, c];
    }

    //获取旋转角度的方法
    getRotateAngleZ(start: number[], end: number[]) {
        let angle: number;
        const v1 = new THREE.Vector3(start[0], start[1], start[2]);
        const v2 = new THREE.Vector3(end[0], end[1], end[2]);
        v1.cross(v2); //用于判断夹角的方向
        if (v1.z > 0) {
            angle = this.getAngle(start, end);
        } else {
            angle = - this.getAngle(start, end);
        }
        return angle;
    }
    getRotateAngleY(start: number[], end: number[]) {
        let angle: number;
        const v1 = new THREE.Vector3(start[0], start[1], start[2]);
        const v2 = new THREE.Vector3(end[0], end[1], end[2]);
        v1.cross(v2); //用于判断夹角的方向
        if (v1.y > 0) {
            angle = this.getAngle(start, end);
        } else {
            angle = - this.getAngle(start, end);
        }
        return angle;
    }
    getRotateAngleX(start: number[], end: number[]) {
        let angle: number;
        const v1 = new THREE.Vector3(start[0], start[1], start[2]);
        const v2 = new THREE.Vector3(end[0], end[1], end[2]);
        v1.cross(v2); //用于判断夹角的方向
        if (v1.x > 0) {
            angle = this.getAngle(start, end);
        } else {

            angle = - this.getAngle(start, end);
        }
        return angle;
    }

    getAngle(start: number[], end: number[]) {
        const v1 = new THREE.Vector3(start[0], start[1], start[2]);
        const v2 = new THREE.Vector3(end[0], end[1], end[2]);
        const angle = v1.angleTo(v2);
        return angle;
    }

    //创建文字
    createText() {
        const x = ThreeUtil.createNewRomanText('x', 80, 0, 0, '#a6a6a6', 0.15);
        const y = ThreeUtil.createNewRomanText('y', -5, 0, -90, '#a6a6a6', 0.15);
        const z = ThreeUtil.createNewRomanText('z', -5, 80, 0, '#a6a6a6', 0.15);
        this.scene.add(x);
        this.scene.add(y);
        this.scene.add(z);
    }

    //创建旋转线动画的方法
    createRotateYLineAnimation(start: number, end: number, time: number, callBack?: any) {
        const tween = {
            angle: start
        };
        let lastAngle = start;
        let newAngle = start;
        const animation = TweenMax.to(tween, time, {
            angle: end,
            onUpdate: () => {
                newAngle = tween.angle;
                this.rotateCenter.rotateY(newAngle - lastAngle);
                lastAngle = newAngle;
            },
            onComplete: () => {
                if (callBack) {
                    callBack();
                }
            },
            paused: true
        });
        return animation;
    }

    createRotateZLineAnimation(start: number, end: number, time: number, callBack?: any) {
        const tween = {
            angle: start
        };
        let lastAngle = start;
        let newAngle = start;
        const animation = TweenMax.to(tween, time, {
            angle: end,
            onUpdate: () => {
                newAngle = tween.angle;
                this.rotateCenter.rotateZ(newAngle - lastAngle);
                lastAngle = newAngle;
            },
            onComplete: () => {
                if (callBack) {
                    callBack();
                }
            },
            paused: true
        });
        return animation;
    }

    createRotateXLineAnimation(start: number, end: number, time: number, callBack?: any) {
        const tween = {
            angle: start
        };
        let lastAngle = start;
        let newAngle = start;
        const animation = TweenMax.to(tween, time, {
            angle: end,
            onUpdate: () => {
                newAngle = tween.angle;
                this.rotateCenter.rotateX(newAngle - lastAngle);
                lastAngle = newAngle;
            },
            onComplete: () => {
                if (callBack) {
                    callBack();
                }
            },
            paused: true
        });
        return animation;
    }

    //重置动画的方法
    resetAnimation(animation: any) {
        if (animation) {
            animation.progress(0);
            animation.pause();
        }
    }

    resize(width: number, height: number) {
        (this.camera as PerspectiveCamera).aspect = width / height;
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
        this.renderer.setSize( width,  height );
    }

    resetCamera() {
        this.orbit.object.lookAt(new THREE.Vector3(0,  0,  0));
        this.orbit.object.position.set(0, 50, 200);

        for (let i = 0; i < 11; i++) {
            this.orbit.reset();
        }
    }

    removeArrow(obj: any) {
        if (obj) {
            this.scene.remove(obj);
            obj.geometry.dispose();
            obj.material.dispose();
        }
    }

    reset1() {
        this.resetAnimation(this.animation4);
        this.resetAnimation(this.animation5);
        this.resetAnimation(this.animation6);
        setTimeout(() => {
            this.resetAnimation(this.animation1);
            this.resetAnimation(this.animation2);
            this.resetAnimation(this.animation3);
        }, 100);

    }

    play() {
        if (this.animation1) {
            this.animation1.play();
        } else if (this.animation2) {
            this.animation2.play();
        } else if (this.animation3) {
            this.animation3.play();
        }
    }

    reset() {
        this.removeArrow(this.redArrow);
        this.removeArrow(this.purpleArrow);
        this.removeArrow(this.blueArrow);
        this.removeArrow(this.arrow1);
        this.removeArrow(this.arrow2);
        this.removeArrow(this.arrow3);
        this.resetAnimation(this.animation1);
        this.resetAnimation(this.animation2);
        this.resetAnimation(this.animation3);
        this.resetAnimation(this.animation4);
        this.resetAnimation(this.animation5);
        this.resetAnimation(this.animation6);
        this.animation1 = null;
        this.animation2 = null;
        this.animation3 = null;
        this.animation4 = null;
        this.animation5 = null;
        this.animation6 = null;
        this.newCoordinate = [];
    }
}
